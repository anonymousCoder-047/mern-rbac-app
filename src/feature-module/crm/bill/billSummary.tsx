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
import { Toast, ToastContainer } from "react-bootstrap";
import { EventSourcePolyfill } from 'event-source-polyfill';
import { env_data } from '../../../config/config';
const route = all_routes;

const { server_url, dev_server_url, env } = env_data;
const serverUrl = env == "dev" ? dev_server_url : server_url;
const BillSummary = () => {
  const { values } = useAuth();
  const [billData, setBillData] = useState([]);
  const [searchData, setFilteredSearchData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0); // 0 to 100
  const [formData, setFormData] = useState({
    bill_file: "",
    number: "",
    filename: "",
  });
  const [error, setError] = useState({
    type: "primary",
    message: ""
  });
  const [showToast, setShowToast] = useState(false);
  const [columns, setColumns] = useState([
    {
      title: "Account #",
      dataIndex: "invoiceId",
       sorter: (a: any, b: any) =>
        a.billingAccountId.length - b.billingAccountId.length,
      key: "invoiceId",
      width: "237px",
    },
    {
      title: "Party Id",
      dataIndex: "partyId",
       sorter: (a: any, b: any) =>
        a.billingAccountId.length - b.billingAccountId.length,
      key: "partyId",
      width: "237px",
    },
    {
      title: "Account Id",
      dataIndex: "billingAccountId",
       sorter: (a: any, b: any) =>
        a.billingAccountId.length - b.billingAccountId.length,
      key: "billingAccountId",
      width: "237px",
    },
    {
      title: "Account Type",
      dataIndex: "accountType",
       sorter: (a: any, b: any) =>
        a.accountType.length - b.accountType.length,
      key: "accountType",
      width: "235px",
    },
    {
      title: "Out Standing Balance",
      dataIndex: "outStandingBalance",
       sorter: (a: any, b: any) =>
        a.outStandingBalance.length - b.outStandingBalance.length,
      key: "outStandingBalance",
      width: "235px",
    },
    {
      title: "Invoice Amt",
      dataIndex: "invoiceAmount",
       sorter: (a: any, b: any) =>
        a.invoiceAmount.length - b.invoiceAmount.length,
      key: "invoiceAmount",
      width: "235px",
    },
    {
      title: "Status",
      dataIndex: "status",
       sorter: (a: any, b: any) =>
        a.status.length - b.status.length,
      key: "status",
      width: "235px",
    },
    {
      title: "Invoice #",
      dataIndex: "invoiceNumber",
       sorter: (a: any, b: any) =>
        a.invoiceNumber.length - b.invoiceNumber.length,
      key: "invoiceNumber",
      width: "235px",
    },
    {
      title: "Invoice Date",
      dataIndex: "invoiceDate",
       sorter: (a: any, b: any) =>
        a.invoiceDate.length - b.invoiceDate.length,
      key: "invoiceDate",
      width: "235px",
    },
  ]);

  const handleClose = () => {
    setFormData({
      bill_file: "",
      number: "",
      filename: "",
    });
  }

  const handleChange = (e) => {    
    const { type } = e.target;
    if(type == "file") {
      const { name, value } = e.target;
      setFormData({ ...formData, bill_file: e.target?.files[0], [name]: value });
    } else if(type == "select") {
      setFormData({ ...formData, [_name]: e?.value });
    } else {
      const { name, value } = e.target; 
      setFormData({ ...formData, [name]: value });
    }
  }

  function buildAntdColumns(staticColumns: Record<string, any>[], data: Record<string, any>[]) {
    if (!Array.isArray(data) || data.length === 0) return [];

    // 2. Extract all keys from data
    const allKeys = _.uniq(_.flatMap(data, (row) => Object.keys(row)));

    // 3. Filter out static keys
    const staticKeys = staticColumns.map((col) => col.dataIndex);
    const dynamicKeys = _.difference(allKeys, staticKeys);

    // 4. Build dynamic columns
    const dynamicColumns = dynamicKeys.map((key) => ({
      title: _.startCase(key),
      dataIndex: key,
      key,
      width: "200px",
      sorter: (a: any, b: any) => _.toString(a[key]).localeCompare(_.toString(b[key])),
      render: (text: any) => {
        if (_.isNumber(text)) {
          return text.toFixed(2);
        }
        return text;
      },
    }));

    // 5. Combine and return
    return [...dynamicColumns, ...staticColumns];
  }

  // const handleAddOrUpdateSources = async () => {
  //   try {
  //     setLoading(true);
  //     setProgress(0); // reset

  //     const { Bill } = endpoints;
  //     const _formData = new FormData();
  //     _formData.append('bill_file', formData.bill_file);

  //     setShowToast(true);
  //     setError({ type: "info", message: `Fetching bills data, please wait it takes few mins...` })

  //     const { data } = await PrivateServer.postData(
  //       Bill.find,
  //       formData.bill_file !== "" ? _formData : formData,
  //       formData.bill_file !== "" ? { headers: { 'Content-Type': 'multipart/form-data' } } : {}
  //     );

  //     // Simulate progress for UX
  //     let simulatedProgress = 0;
  //     const interval = setInterval(() => {
  //       simulatedProgress += 10; // increment 10%
  //       setProgress(Math.min(simulatedProgress, 100));
  //       if (simulatedProgress >= 100) clearInterval(interval);
  //     }, 200); // every 200ms

  //     if (data) {
  //       const _colms = buildAntdColumns(columns, data);
  //       setColumns(_colms);

  //       const uniqueData = [...new Set(data?.map((x: any) => ({ ...x, key: x?.id?.toString() })))];
  //       setBillData(uniqueData);
  //       setFilteredSearchData(uniqueData);

  //       localStorage.setItem("billData", JSON.stringify(uniqueData));

  //       setShowToast(true);
  //       setError({ type: "success", message: `(${data?.length}) Bills found` });
  //     }

  //   } catch (err) {
  //     setShowToast(true);
  //     setError({ type: "danger", message: `No bills found` });
  //     console.log("Error while saving bill summary -- E: ", err?.message);
  //   } finally {
  //     setLoading(false);
  //     setProgress(0);
  //   }
  // };

  const handleAddOrUpdateSources = async () => {
    try {
      setLoading(true);
      setProgress(0);

      const { Bill } = endpoints;
      const _formData = new FormData();
      if (formData.bill_file) _formData.append('bill_file', formData.bill_file);
      if (formData.number) _formData.append('number', formData.number);

      // 1️⃣ Start job
      const { jobId } = await fetch(`${serverUrl}${Bill.find}`, {
        method: 'POST',
        body: _formData,
      }).then(res => res.json());

      // 2️⃣ Connect to SSE to get live progress
      const sse = new EventSource(`${serverUrl}/bill/search-stream/${jobId}`);
      sse.onmessage = (event) => {
        const { progress, results } = JSON.parse(event.data);
        setProgress(progress);

        // Optional: update table with partial results
        if (results?.length) {
          const _colms = buildAntdColumns(columns, results);
          setColumns(_colms);
          const uniqueData = results.map((x: any) => ({ ...x, key: x?.invoiceId?.toString() }));
          setBillData(uniqueData);
          setFilteredSearchData(uniqueData);
        }

        if (progress >= 100) {
          setLoading(false);
          sse.close();
        }
      };

    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    const { value: _searchTerm } = e?.target;
    setSearchTerm(_searchTerm);
    const _searchData = [...searchData];

    if(_searchTerm != "") {
      const _searchTerm = e?.target?.value?.toLowerCase() || "";
      setSearchTerm(_searchTerm);

      if (_searchTerm.trim() !== "") {  
        const searchResults = billData.filter((obj) =>
          Object.values(obj).some(
            (val) =>
              typeof val === "string" &&
              val.toLowerCase().includes(_searchTerm)
          )
        );
        setShowToast(true);
        setError({ type: "success", message: `bills found` })
        setFilteredSearchData(searchResults)
        localStorage.setItem("billSearchData", JSON.stringify(searchResults));
      } else {
        setShowToast(true);
        setError({ type: "danger", message: `No Leads found` })
        localStorage.removeItem('billSearchData');
        localStorage.setItem("billData", JSON.stringify(billData));
        setFilteredSearchData(searchData);
      }
    }
  }

  const handleExport = () => {
    try {
    // Convert data to worksheet format
    const worksheet = XLSX.utils.json_to_sheet(billData);

    // Create a new workbook and append the worksheet
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Invoice Summary");

    // Write the file and trigger download
    XLSX.writeFile(workbook, `etisalat_invoice_summary_${moment(new Date()).format('YYYY-MM-DD HH:mm:i')}.xlsx`);

    } catch(err) {
      console.log("Error == ", err);
    }
}

  const handleBulkOperation = (selectedRows: string | any[]) => {}

  useEffect(() => {
    const _bill_summary = localStorage.getItem('billData');
    const _bill_search_summary = localStorage.getItem('billSearchData');
    
    if(JSON.parse(_bill_search_summary)?.length > 0) {
      setShowToast(true);
      setError({ type: "success", message: `Bills found` })
      setBillData(JSON.parse(_bill_search_summary));
    } else {
      setShowToast(true);
      setError({ type: "info", message: `Bill summary found` })
      setBillData(JSON.parse(_bill_summary));
    }
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
                    Bill Summary<span className="count-title">{searchTerm != "" ? searchData?.length : billData?.length}</span>
                  </h4>
                </div>
                <div className="col-4 text-end">
                  <div className="head-icons">
                   <CollapseHeader/>
                  </div>
                </div>
              </div>
                {
                  showToast ? 
                  <ToastContainer position="top-end">
                    <Toast show={showToast} onClose={() => setShowToast((prev) => !prev)} bg={error?.type?.toLowerCase()} delay={3000} autohide>
                      <Toast.Header>
                        <strong className="me-auto">Request {error?.type}</strong>
                      </Toast.Header>
                      <Toast.Body>{error?.message}</Toast.Body>
                    </Toast>
                  </ToastContainer> : ""
                }
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
                              localStorage.removeItem('billSearchData');
                              localStorage.removeItem('billData');
                            }}
                        >
                            <i className="ti ti-square-rounded-plus me-2" />
                            Search Invoice
                        </Link>
                        </div>
                    </div>
                  </div>
                </div>
                {/* /Search */}
              </div>
              <div className="card-body">
                {loading && (
                  <div className="mb-3">
                    <div className="progress">
                      <div
                        className="progress-bar progress-bar-striped progress-bar-animated"
                        role="progressbar"
                        style={{ width: `${progress}%` }}
                        aria-valuenow={progress}
                        aria-valuemin={0}
                        aria-valuemax={100}
                      >
                        {progress}%
                      </div>
                    </div>
                  </div>
                )}

                <div className="table-responsive custom-table">
                  <Table
                    columns={columns}
                    dataSource={loading ? [] : (searchTerm !== "" ? searchData : billData)}
                    handleBulkAction={handleBulkOperation}
                  />
                </div>
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
            <h5 className="modal-title">Search invoice</h5>
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
            <div className="modal-body">
              <div className="mb-3">
                <label className="col-form-label">
                  File Upload
                </label>
                <input type="file" name="filename" value={formData?.filename} onChange={handleChange} className="form-control" accept=".xls,.xlsx,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" />
              </div>
            </div>
            <span>or</span>
            <hr />
            <div className="modal-body">
              <div className="mb-3">
                <label className="col-form-label">
                  Account Number
                </label>
                <input type="text" name="number" value={formData?.number} onChange={handleChange} className="form-control" />
              </div>
            </div>
            <div className="modal-footer">
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
                  Search
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
    {/* /Add New Source */}
  </>
  
  );
};

export default BillSummary;
