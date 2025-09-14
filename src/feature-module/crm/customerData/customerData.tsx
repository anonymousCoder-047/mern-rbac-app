import { useEffect, useState } from "react";
import Table from "../../../core/common/dataTable/index";
import { Link } from "react-router-dom";
import { all_routes } from "../../router/all_routes";
import CollapseHeader from "../../../core/common/collapse-header";
import PrivateServer from "../../../helper/PrivateServer";
import { endpoints } from "../../../helper/endpoints";
import _ from "lodash";
import useAuth from "../../../hooks/useAuth";
import * as XLSX from "xlsx";
import moment from "moment";

const route = all_routes;

const CustomerData = () => {
  const { values } = useAuth();
  const [customerData, setCustomerData] = useState([]);
  const [searchData, setFilteredSearchData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showOTP, setShowOTP] = useState(false);
  const [showToken, setShowToken] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [formData, setFormData] = useState({
    TokenId: "",
    token: "",
    quickSearchText: "",
  });
  const [columns, setColumns] = useState([]);

  const handleClose = () => {
    setFormData({
        TokenId: "",
        token: "",
        quickSearchText: "",
    });
  }

  const handleChange = (e) => {    
    const { type } = e.target;
    if(type == "file") {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    } else {
      const { name, value } = e.target; 
      setFormData({ ...formData, [name]: value });
    }
  }

  function buildAntdColumns(
    headerRef: any[] = [],
    data: Record<string, any>[] = []
  ) {
    if (!Array.isArray(data) || data.length === 0) return [];

    // --- 1. Map headerRef → AntD column config ---
    const headerColumns = headerRef
      .filter((col) => col.visible) // only visible ones
      .map((col) => ({
        title: col.displayName || _.startCase(col.field),
        dataIndex: col.field,
        key: col.field,
        width: col.width ? `${col.width}px` : "150px",
        sorter: col.enableSorting
          ? (a: any, b: any) =>
              _.toString(_.get(a, col.field)).localeCompare(
                _.toString(_.get(b, col.field))
              )
          : false,
        render: (text: any) => {
          if (_.isNumber(text)) return text.toFixed(2);
          return text ?? "-";
        },
      }));

    // --- 2. Extract all keys from flat data (including nested) ---
    const flattenRow = (row: any, prefix = ""): Record<string, any> =>
      Object.entries(row).reduce((acc, [k, v]) => {
        const newKey = prefix ? `${prefix}.${k}` : k;
        if (_.isPlainObject(v)) {
          Object.assign(acc, flattenRow(v, newKey));
        } else if (Array.isArray(v)) {
          // handle arrays by indexing [0], [1] etc.
          v.forEach((item, idx) => {
            if (_.isPlainObject(item)) {
              Object.assign(acc, flattenRow(item, `${newKey}[${idx}]`));
            } else {
              acc[`${newKey}[${idx}]`] = item;
            }
          });
        } else {
          acc[newKey] = v;
        }
        return acc;
      }, {} as Record<string, any>);

    const allKeys = _.uniq(
      _.flatMap(data, (row) => Object.keys(flattenRow(row)))
    );

    // --- 3. Find dynamic keys not in headerRef ---
    const staticKeys = headerRef.map((c) => c.field);
    const dynamicKeys = _.difference(allKeys, staticKeys);

    const dynamicColumns = dynamicKeys.map((key) => ({
      title: _.startCase(key),
      dataIndex: key,
      key,
      width: "200px",
      sorter: (a: any, b: any) =>
        _.toString(_.get(a, key)).localeCompare(_.toString(_.get(b, key))),
      render: (text: any) => (_.isNumber(text) ? text.toFixed(2) : text ?? "-"),
    }));

    // --- 4. Merge (static first, dynamic later) ---
    return [...headerColumns, ...dynamicColumns];
  }

  const generateOTP = async () => {
    try {
      const { CustomerData } = endpoints;

      const data = await PrivateServer.postData(CustomerData.generateOTP);

      if(data) setShowOTP(true);
      else setShowOTP(false);
    } catch(err) {
      console.log("Error while saving bill summary -- E: ", err?.message);
    }
  }

  const generateToken = async () => {
    try {
      const { CustomerData } = endpoints;

      const { data } = await PrivateServer.postData(CustomerData.getToken, { TokenId: formData?.TokenId });

      if(data) { 
        localStorage.setItem("customer_data_token", data?.access_token);
        setFormData({ ...formData, token: data?.access_token });
        setShowOTP(false);
        setShowToken(true);
        setShowSearch(true);
    } else {
        setShowOTP(false);
        setShowToken(false);
        setShowSearch(false);
    }
    } catch(err) {
      console.log("Error while saving bill summary -- E: ", err?.message);
    }
  }

  const handleAddOrUpdateSources = async () => {
    try {
      const { CustomerData } = endpoints;

      const { data } = await PrivateServer.postData(CustomerData.find, { token: formData.token, quickSearchText: formData.quickSearchText });

      if(data) {
        const _colms = buildAntdColumns(columns, data?.columns)
        setColumns(_colms);
        setCustomerData([...new Set(data?.data?.map((x: any) => ({ ...x, key: x?.id?.toString() })))])
        setFilteredSearchData([...new Set(data?.data?.map((x: any) => ({ ...x, key: x?.id?.toString() })))])

        localStorage.setItem("customerData", JSON.stringify([...new Set(data?.data?.map((x: any) => ({ ...x, key: x?.id?.toString() })))]));
        localStorage.setItem("customerDataHeader", JSON.stringify(data?.columns));
        
        setShowOTP(false);
        setShowToken(false);
        setShowSearch(false);
      }
    } catch(err) {
      console.log("Error while saving bill summary -- E: ", err?.message);
    }
  }

  const handleSearch = (e) => {
    const { value: _searchTerm } = e?.target;
    setSearchTerm(_searchTerm);
    const _searchData = [...searchData];

    if(searchTerm != "") {
      const searchResults = _.filter(_searchData, (obj) =>
        _.some(obj, (value) =>
          _.isString(value) && _.includes(value.toLowerCase(), searchTerm?.toLowerCase())
        )
      );
      setFilteredSearchData(searchResults)
      localStorage.setItem("customerSearchData", JSON.stringify(searchResults));
    } else {
      localStorage.removeItem('customerSearchData');
      localStorage.setItem("customerData", JSON.stringify(customerData));
      setFilteredSearchData(searchData);
    }
  }

  const handleExport = () => {
    try {
    // Convert data to worksheet format
    const worksheet = XLSX.utils.json_to_sheet(customerData);

    // Create a new workbook and append the worksheet
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Customer Data");

    // Write the file and trigger download
    XLSX.writeFile(workbook, `etisalat_customer_data_${moment(new Date()).format('YYYY-MM-DD HH:mm:i')}.xlsx`);

    } catch(err) {
      console.log("Error == ", err);
    }
}

  const handleBulkOperation = (selectedRows: string | any[]) => {}

  useEffect(() => {
    const _customer_data_token = localStorage.getItem('customer_data_token');
    const _customer_data = localStorage.getItem('customerData');
    const _customer_data_header = localStorage.getItem('customerDataHeader');
    const _customer_search_data = localStorage.getItem('customerSearchData');

    if(_customer_data_token) setFormData({ ...formData, token: _customer_data_token });
    if(JSON.parse(_customer_data_header)?.length > 0) buildAntdColumns(columns, JSON.parse(_customer_data_header));
    if(JSON.parse(_customer_search_data)?.length > 0) setCustomerData(JSON.parse(_customer_search_data));
    else setCustomerData(JSON.parse(_customer_data));
  }, [])

  return (
    <>
        {/* Page Wrapper */}
        <div className="page-wrapper">
        <div className="content">
            <div className="row">
            <div className="col-md-12">
                {/* Page Header */}
                <div className="page-header">
                <div className="row align-items-center">
                    <div className="col-8">
                    <h4 className="page-title">
                        Customer Data<span className="count-title">{searchTerm != "" ? searchData?.length : customerData?.length}</span>
                    </h4>
                    </div>
                    <div className="col-4 text-end">
                    <div className="head-icons">
                    <CollapseHeader/>
                    </div>
                    </div>
                </div>
                </div>
                {/* /Page Header */}
                <div className="card">
                <div className="card-header">
                    {/* Search */}
                    <div className="row align-items-center">
                    <div className="col-sm-4">
                        <div className="icon-form mb-3 mb-sm-0">
                        <span className="form-icon">
                            <i className="ti ti-search" />
                        </span>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search Source"
                            onChange={handleSearch}
                        />
                        </div>
                    </div>
                    <div className="col-sm-8">
                        <div className="d-flex align-items-center flex-wrap row-gap-2 justify-content-sm-end">
                        {values?.roleId?.name?.toLowerCase() == 'admin' && (<div className="dropdown me-2">
                            <Link
                            to="#"
                            className="dropdown-toggle"
                            data-bs-toggle="dropdown"
                            >
                            <i className="ti ti-package-export me-2" />
                            Export
                            </Link>
                            <div className="dropdown-menu  dropdown-menu-end">
                            <ul>
                                <li>
                                <Link to="#" className="dropdown-item" onClick={handleExport}>
                                    <i className="ti ti-file-type-xls text-green me-1" />
                                    Export as Excel{" "}
                                </Link>
                                </li>
                            </ul>
                            </div>
                        </div>)}
                        <div className="text-sm-end">
                            <Link
                                to="#"
                                className="btn btn-primary "
                                data-bs-toggle="modal"
                                data-bs-target="#add_source"
                                onClick={() => {
                                    localStorage.removeItem('customerSearchData');
                                    localStorage.removeItem('customerData');
                                    localStorage.removeItem('customerDataHeader');
                                    localStorage.removeItem('customer_data_token');
                                }}
                            >
                                <i className="ti ti-square-rounded-plus me-2" />
                                Search Customers
                            </Link>
                            </div>
                        </div>
                    </div>
                    </div>
                    {/* /Search */}
                </div>
                <div className="card-body">
                    {/* Contact List */}
                    <div className="table-responsive custom-table">
                    <Table columns={columns} dataSource={searchTerm != "" ? searchData : customerData} handleBulkAction={handleBulkOperation} />
                    </div>
                    <div className="row align-items-center">
                    <div className="col-md-6">
                        <div className="datatable-length" />
                    </div>
                    <div className="col-md-6">
                        <div className="datatable-paginate" />
                    </div>
                    </div>
                    {/* /Contact List */}
                </div>
                </div>
            </div>
            </div>
        </div>
        </div>
        {/* /Page Wrapper */}

        {/* Add New Source */}
        <div className="modal fade" id="add_source" role="dialog">
        <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
            <div className="modal-header">
                <h5 className="modal-title">Search Customers</h5>
                <button
                className="btn-close custom-btn-close border p-1 me-0 text-dark"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={handleClose}
                >
                <i className="ti ti-x" />
                </button>
            </div>
            <form >
                {showOTP && (<div className="modal-body">
                <div className="mb-3">
                    <label className="col-form-label">
                      OTP
                    </label>
                    <input type="text" name="TokenId" value={formData?.TokenId} onChange={handleChange} className="form-control" />
                </div>
                </div>)}
                {showToken && (
                    <div className="modal-body">
                        <div className="mb-3">
                            <label className="col-form-label">
                                Token
                            </label>
                            <input type="text" name="token" value={formData?.token} onChange={handleChange} className="form-control" />
                        </div>
                    </div>
                )}
                {showSearch && (
                    <div className="modal-body">
                        <div className="mb-3">
                            <label className="col-form-label">
                                Search String
                            </label>
                            <input type="text" name="quickSearchText" value={formData?.quickSearchText} onChange={handleChange} className="form-control" />
                        </div>
                    </div>
                )}
                <div className="modal-footer">
                    {
                        showOTP ? 
                        (
                            <>
                                <div className="d-flex align-items-center justify-content-end m-0">
                                    <Link
                                    to="#"
                                    className="btn btn-light me-2"
                                    data-bs-dismiss="modal"
                                    onClick={handleClose}
                                    >
                                        Cancel
                                    </Link>
                                    <button type="button" onClick={generateToken} className="btn btn-primary">
                                        Login
                                    </button>
                                </div>
                            </>
                        ) 
                        : showSearch ?
                        (
                            <>
                                <div className="d-flex align-items-center justify-content-end m-0">
                                    <Link
                                        to="#"
                                        className="btn btn-light me-2"
                                        data-bs-dismiss="modal"
                                        onClick={handleClose}
                                    >
                                        Cancel
                                    </Link>
                                    <button type="button" data-bs-dismiss="modal" onClick={handleAddOrUpdateSources} className="btn btn-primary">
                                        Search Customers
                                    </button>
                                </div>
                            </>
                        ) 
                        : 
                        (
                            <>
                                <div className="d-flex align-items-center justify-content-end m-0">
                                    <Link
                                        to="#"
                                        className="btn btn-light me-2"
                                        data-bs-dismiss="modal"
                                        onClick={handleClose}
                                    >
                                        Cancel
                                    </Link>
                                    <button type="button" onClick={generateOTP} className="btn btn-primary">
                                        Generate OTP
                                    </button>
                                </div>
                            </>
                        )
                    }  
                </div>
            </form>
            </div>
        </div>
        </div>
        {/* /Add New Source */}
    </>
  );
};

export default CustomerData;
