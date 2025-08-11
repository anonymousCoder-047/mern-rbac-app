import React, { useState } from "react";

import { Link } from "react-router-dom";
// import ImageWithBasePath from "../../../core/common/imageWithBasePath";
import DateRangePicker from "react-bootstrap-daterangepicker";
import { all_routes } from "../../router/all_routes";
import { useDispatch, useSelector } from "react-redux";
import CollapseHeader from "../../../core/common/collapse-header";
import Table from "../../../core/common/dataTable/index";
import { Modal } from "react-bootstrap";
import PrivateServer from "../../../helper/PrivateServer";
import { endpoints } from "../../../helper/endpoints";
import useAuth from "../../../hooks/useAuth";
import _ from "lodash";
import * as XLSX from "xlsx";

const Companies = () => {
  const { values } = useAuth();
  const [openModal, setOpenModal] = useState(false);
  const [openModal2, setOpenModal2] = useState(false);
  const [companyData, setCompanyData] = useState([]);
  const [searchData, setFilteredSearchData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [companyId, setCompanyId] = useState("");
  const [showBulkActionButton, setShowBulkActionButton] = useState(false);
  const [showBulkDeleteModal, setShowBulkDeleteModal] = useState(false);
  const [selectedRows, setSelectedRows] = useState(0);
  const [selectedIds, setSelectedIds] = useState([]);
  const [formData, setFormData] = useState({
    company_name: "",
    email: "",
    primary_phone: "",
    secondary_phone: "",
    companyId: "",
    website: "",
    description: "",
    street: "",
    country: "",
    state: "",
    city: "",
    code: "",
  });
  const [owner, setOwner] = useState(["Collab"]);
  const addTogglePopupTwo = useSelector(
    (state: any) => state?.addTogglePopupTwo
  );
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
  };
  const [selectedDate1, setSelectedDate1] = useState<Date | null>(new Date());
  const handleDateChange1 = (date: Date | null) => {
    setSelectedDate1(date);
  };

  const dispatch = useDispatch();

  const activityToggle = useSelector(
    (state: any) => state?.activityTogglePopup
  );
  const activityToggleTwo = useSelector(
    (state: any) => state?.activityTogglePopupTwo
  );

  const route = all_routes;
  const [stars, setStars] = useState<{ [key: number]: boolean }>({});

  const initializeStarsState = () => {
    const starsState: { [key: number]: boolean } = {};
    companyData.forEach((item, index) => {
      starsState[index] = false;
    });
    setStars(starsState);
  };

  const getCompanies = async () => {
    try {
      const { Companies } = endpoints;
      const response = await PrivateServer.getData(Companies?.view)
  
      if(response?.data) {
        setCompanyData([...new Set(response?.data?.map((x: any) => ({ ...x, key: x?.id?.toString() })))]);
        setFilteredSearchData([...new Set(response?.data?.map((x: any) => ({ ...x, key: x?.id?.toString() })))]);
      }
    } catch(error) {
      console.log("Error while getting companies -- E:", error?.message);
    }
  }

  // Call initializeStarsState once when the component mounts
  React.useEffect(() => {
    initializeStarsState();

    getCompanies();
  }, []);

  const handleStarToggle = (index: number) => {
    setStars((prevStars) => ({
      ...prevStars,
      [index]: !prevStars[index],
    }));
  };

  const handleClose = () => {
    setCompanyId("")
    setFormData({
      company_name: "",
      email: "",
      primary_phone: "",
      secondary_phone: "",
      companyId: "",
      website: "",
      description: "",
      street: "",
      country: "",
      state: "",
      city: "",
      code: "",
    });
  }

  const handleChange = (e, type="", _name="") => {    
    if(type == "file") {
      const { name } = e.target;
      setFormData({ ...formData, [name]: e.target?.files[0] });
    }
    else if(type == "select") {
      setFormData({ ...formData, [_name]: e?.value });
    } else {
      const { name, value } = e.target; 
      setFormData({ ...formData, [name]: value });
    }
  }

  const handleDeleteCompany = async () => {
    try {
      const { Companies } = endpoints;
      const response = await PrivateServer?.deleteData(Companies?.delete, companyId);
      if(response) getCompanies();
    } catch(err) {
      console.log("Error while deleting contact -- E: ", err?.message);
    }
  }

  const handleEditContact = (values) => {
    setFormData({ ...formData, ..._.omit(values, ["_id"]), companyId: values?._id });
  }

  const handleAddOrUpdateCompanies = async () => {
    try {
      const { Companies } = endpoints;
      const { status, data } = formData?.companyId !== "" ? await PrivateServer?.patchData(Companies.patch, formData?.companyId, formData) : await PrivateServer.postData(Companies.create, formData);

      if(status == 200) {
        if(formData?.companyId == "") setFormData({ ...formData, companyId: data?.data?._id })
        getCompanies();
      }
    } catch(err) {
      console.log("Error while saving contact -- E: ", err?.message);
    }
  }
  
  const cleanData = (data, filterKeys) => {
    return data.map(obj => {
        // Remove filterKeys from object
        const filteredObj = _.omit(obj, filterKeys);

        // Convert keys to start case
        return _.mapKeys(filteredObj, (value, key) => _.startCase(_.toLower(key.replace(/_/g, " "))));
    });
  };

  const handleExport = () => {
    try {
      // Convert data to worksheet format
      const worksheet = XLSX.utils.json_to_sheet(cleanData(companyData, ["_id", "__v"]));

      // Create a new workbook and append the worksheet
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Products");

      // Write the file and trigger download
      XLSX.writeFile(workbook, 'etisalat_companies_data.xlsx');

    } catch(err) {
      console.log("Error == ", err);
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
    } else setFilteredSearchData(searchData);
  }

  const columns = [
    {
      title: "",
      dataIndex: "",
      render: (text: string, record: any, index: number) => (
        <div
          className={`set-star rating-select ${stars[index] ? "filled" : ""}`}
          onClick={() => handleStarToggle(index)}
        >
          <i className="fa fa-star"></i>
        </div>
      ),
    },

    {
      title: "Name",
      dataIndex: "company_name",
      render: (text: any, record: any) => (
        <h2 className="d-flex align-items-center">
          {/* <Link to={route.companyDetails}
            className="avatar avatar-sm border rounded p-1 me-2"
          >
            <img
              className="w-auto h-auto"
              src={record.image}
              alt="User Image"
            />
          </Link> */}
          <Link to={route.companyDetails}
            className="d-flex flex-column fw-medium"
          >
            {record.company_name}
          </Link>
        </h2>
      ),
      sorter: (a: any, b: any) => a.name.length - b.name.length,
    },
    {
      title: "Phone",
      dataIndex: "primary_phone",
      sorter: (a: any, b: any) => a.primary_phone.length - b.primary_phone.length,
    },
    {
      title: "Phone",
      dataIndex: "secondary_phone",
      sorter: (a: any, b: any) => a.secondary_phone.length - b.secondary_phone.length,
    },

    {
      title: "Email",
      dataIndex: "email",
      sorter: (a: any, b: any) => a.email.length - b.email.length,
    },
    {
      title: "Action",
      render: (text: string, record: any) => (
        <div className="dropdown table-action">
          <Link
            to="#"
            className="action-icon "
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <i className="fa fa-ellipsis-v" />
          </Link>
          <div className="dropdown-menu dropdown-menu-right">
            {values?.permissions?.includes('update') && (<Link
              className="dropdown-item"
              to="#"
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvas_edit"
              onClick={() => handleEditContact(record)}
            >
              <i className="ti ti-edit text-blue" /> Edit
            </Link>)}
            {values?.permissions?.includes('delete') && (<Link
              className="dropdown-item"
              to="#"
              data-bs-toggle="modal"
              data-bs-target="#delete_contact"
              onClick={() => setCompanyId(record?._id)}
            >
              <i className="ti ti-trash text-danger" /> Delete
            </Link>)}
            <Link className="dropdown-item" to={route.companyDetails} state={{ ...record, totalData: companyData?.length }}><i className="ti ti-eye text-blue-light"></i> Preview</Link>
          </div>
        </div>
      ),
    },
  ];

  const initialSettings = {
    endDate: new Date("2020-08-11T12:30:00.000Z"),
    ranges: {
      "Last 30 Days": [
        new Date("2020-07-12T04:57:17.076Z"),
        new Date("2020-08-10T04:57:17.076Z"),
      ],
      "Last 7 Days": [
        new Date("2020-08-04T04:57:17.076Z"),
        new Date("2020-08-10T04:57:17.076Z"),
      ],
      "Last Month": [
        new Date("2020-06-30T18:30:00.000Z"),
        new Date("2020-07-31T18:29:59.999Z"),
      ],
      "This Month": [
        new Date("2020-07-31T18:30:00.000Z"),
        new Date("2020-08-31T18:29:59.999Z"),
      ],
      Today: [
        new Date("2020-08-10T04:57:17.076Z"),
        new Date("2020-08-10T04:57:17.076Z"),
      ],
      Yesterday: [
        new Date("2020-08-09T04:57:17.076Z"),
        new Date("2020-08-09T04:57:17.076Z"),
      ],
    },
    startDate: new Date("2020-08-04T04:57:17.076Z"), // Set "Last 7 Days" as default
    timePicker: false,
  };

  const handleBulkOperation = (selectedRows: string | any[]) => {
    if(selectedRows?.length > 0) {
      setShowBulkActionButton(true);
      setSelectedRows(selectedRows?.length)
      setSelectedIds(selectedRows)
    } else {
      setShowBulkActionButton(false);
      setSelectedRows(0)
      setSelectedIds([])
    }
  }

  const handleBulkDelete = async () => {
    const { Companies } = endpoints;
    const deleted = await PrivateServer.deleteBulkData(Companies?.delete_bulk, selectedIds)
    if(deleted) {
      setShowBulkActionButton(false);
      setShowBulkDeleteModal(false);
    }
  }

  return (
    <>
      <div className="page-wrapper">
        <div className="content">
          <div className="row">
            <div className="col-md-12">
              {/* Page Header */}
              <div className="page-header">
                <div className="row align-items-center">
                  <div className="col-8">
                    <h4 className="page-title">
                      Companies<span className="count-title">{searchTerm != "" ? searchData?.length : companyData?.length}</span>
                    </h4>
                  </div>
                  <div className="col-4 text-end">
                    <div className="head-icons">
                      <CollapseHeader />
                    </div>
                  </div>
                </div>
              </div>
              {/* /Page Header */}
              <div className="card ">
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
                          placeholder="Search Companies"
                          onChange={handleSearch}
                        />
                      </div>
                    </div>
                    <div className="col-sm-8">
                      <div className="d-flex align-items-center flex-wrap row-gap-2 justify-content-sm-end">
                        <div className="dropdown me-2">
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
                        </div>
                        {values?.permissions?.includes('create') && (<Link
                          to="#"
                          className="btn btn-primary"
                          data-bs-toggle="offcanvas"
                          data-bs-target="#offcanvas_add"
                        >
                          <i className="ti ti-square-rounded-plus me-2" />
                          Add Company
                        </Link>)}
                      </div>
                    </div>
                  </div>
                  {/* /Search */}
                </div>

                <div className="card-body">
                  {/* Search */}

                  {/* /Search */}
                  {/* Filter */}
                  <div className="d-flex align-items-center justify-content-between flex-wrap row-gap-2 mb-4">
                    <div className="d-flex align-items-center flex-wrap row-gap-2">
                      {
                        showBulkActionButton ? 
                        <button
                          className="btn btn-primary"
                          onClick={() => setShowBulkDeleteModal(!showBulkDeleteModal)}
                        >
                          Delete {selectedRows} rows
                        </button> 
                        : ""
                      }
                    </div>
                    <div className="d-flex align-items-center flex-wrap row-gap-2">
                      
                    </div>
                  </div>

                  {/* /Filter */}
                  {/* Contact List */}
                  <div className="table-responsive custom-table">
                    <Table dataSource={searchTerm != "" ? searchData : companyData} columns={columns} handleBulkAction={handleBulkOperation} />
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

      <div className="modal fade" id="delete_contact" role="dialog">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-body">
              <div className="text-center">
                <div className="avatar avatar-xl bg-danger-light rounded-circle mb-3">
                  <i className="ti ti-trash-x fs-36 text-danger" />
                </div>
                <h4 className="mb-2">Remove Companies?</h4>
                <p className="mb-0">
                  Company {formData?.company_name} from your Account.
                </p>
                <div className="d-flex align-items-center justify-content-center mt-4">
                  <Link
                    to="#"
                    className="btn btn-light me-2"
                    data-bs-dismiss="modal"
                  >
                    Cancel
                  </Link>
                  <Link to="#" className="btn btn-danger" onClick={handleDeleteCompany} data-bs-dismiss="modal">
                    Yes, Delete it
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add Company */}
      <div
        className="offcanvas offcanvas-end offcanvas-large"
        tabIndex={-1}
        id="offcanvas_add"
      >
        <div className="offcanvas-header border-bottom">
          <h5 className="fw-semibold">Add Company</h5>
          <button
            type="button"
            className="btn-close custom-btn-close border p-1 me-0 d-flex align-items-center justify-content-center rounded-circle"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
            onClick={handleClose}
          >
            <i className="ti ti-x" />
          </button>
        </div>
        <div className="offcanvas-body">
          <form>
            <div className="accordion" id="main_accordion">
              {/* Basic Info */}
              <div className="accordion-item rounded mb-3">
                <div className="accordion-header">
                  <Link
                    to="#"
                    className="accordion-button accordion-custom-button bg-white rounded fw-medium text-dark"
                    data-bs-toggle="collapse"
                    data-bs-target="#basic"
                  >
                    <span className="avatar avatar-md rounded text-dark border me-2">
                      <i className="ti ti-user-plus fs-20" />
                    </span>
                    Basic Info
                  </Link>
                </div>
                <div
                  className="accordion-collapse collapse show"
                  id="basic"
                  data-bs-parent="#main_accordion"
                >
                  <div className="accordion-body border-top">
                    <div className="row">
                      <div className="col-md-12">
                        <div className="mb-3">
                          <label className="col-form-label">Company Name</label>
                          <input name="company_name" value={formData?.company_name} onChange={handleChange} type="text" className="form-control" />
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="mb-3">
                          <div className="d-flex justify-content-between align-items-center">
                            <label className="col-form-label">
                              Email <span className="text-danger">*</span>
                            </label>
                          </div>
                          <input type="text" name="email" value={formData?.email} onChange={handleChange} className="form-control" />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="col-form-label">
                            Primary Phone <span className="text-danger">*</span>
                          </label>
                          <input type="text" name="primary_phone" value={formData?.primary_phone} onChange={handleChange} className="form-control" />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="col-form-label">Secondary Phone</label>
                          <input type="text" name="secondary_phone" value={formData?.secondary_phone} onChange={handleChange} className="form-control" />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="col-form-label">
                            Website <span className="text-danger">*</span>
                          </label>
                          <input type="text" name="website" value={formData?.website} onChange={handleChange} className="form-control" />
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="mb-0">
                          <label className="col-form-label">
                            Description <span className="text-danger">*</span>
                          </label>
                          <textarea
                            name="description" value={formData?.description} onChange={handleChange}
                            className="form-control"
                            rows={5}
                            defaultValue={""}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* /Basic Info */}

              {/* Address Info */}
              <div className="accordion-item border-top rounded mb-3">
                <div className="accordion-header">
                  <Link
                    to="#"
                    className="accordion-button accordion-custom-button rounded bg-white fw-medium text-dark"
                    data-bs-toggle="collapse"
                    data-bs-target="#address"
                  >
                    <span className="avatar avatar-md rounded text-dark border me-2">
                      <i className="ti ti-map-pin-cog fs-20" />
                    </span>
                    Address Info
                  </Link>
                </div>
                <div
                  className="accordion-collapse collapse"
                  id="address"
                  data-bs-parent="#main_accordion"
                >
                  <div className="accordion-body border-top">
                    <div className="row">
                      <div className="col-md-12">
                        <div className="mb-3">
                          <label className="col-form-label">
                            Street Address{" "}
                          </label>
                          <input type="text" name="street" value={formData?.street} onChange={handleChange} className="form-control" />
                        </div>
                      </div>

                      <div className="col-md-6">
                        <div className="mb-3 mb-md-0">
                          <label className="col-form-label">Country</label>
                          <input type="text" name="country" value={formData?.country} onChange={handleChange} className="form-control" />
                          {/* <Select
                            className="select2"
                            classNamePrefix="react-select"
                            options={countries}
                            placeholder="Choose"
                            /> */}
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="col-form-label">
                            State / Province{" "}
                          </label>
                          <input type="text" name="state" value={formData?.state} onChange={handleChange} className="form-control" />
                          {/* <Select
                            className="select2"
                            classNamePrefix="react-select"
                            options={stateChoose}
                            placeholder="Choose"
                            /> */}
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="col-form-label">City </label>
                          <input type="text" name="city" value={formData?.city} onChange={handleChange} className="form-control" />
                          {/* <Select
                            className="select2"
                            classNamePrefix="react-select"
                            options={cityChoose}
                            placeholder="Choose"
                          /> */}
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-0">
                          <label className="col-form-label">Zipcode </label>
                          <input type="text" name="code" value={formData?.code} onChange={handleChange} className="form-control" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* /Address Info */}
            </div>
            <div className="d-flex align-items-center justify-content-end">
              <button
                type="button"
                data-bs-dismiss="offcanvas"
                className="btn btn-light me-2"
                onClick={handleClose}
              >
                Cancel
              </button>
              <button
                type="button"
                data-bs-dismiss="offcanvas"
                className="btn btn-primary"
                onClick={() => {
                  setOpenModal2(true)
                  handleAddOrUpdateCompanies()
                }}
              >
                Create
              </button>
            </div>
          </form>
        </div>
      </div>
      {/* /Add Company */}

      {/* Edit Company */}
      <div
        className="offcanvas offcanvas-end offcanvas-large"
        tabIndex={-1}
        id="offcanvas_edit"
      >
        <div className="offcanvas-header border-bottom">
          <h5 className="fw-semibold">Edit Company</h5>
          <button
            type="button"
            className="btn-close custom-btn-close border p-1 me-0 d-flex align-items-center justify-content-center rounded-circle"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
            onClick={handleClose}
          >
            <i className="ti ti-x" />
          </button>
        </div>
        <div className="offcanvas-body">
          <form>
            <div className="accordion" id="main_accordion">
              {/* Basic Info */}
              <div className="accordion-item rounded mb-3">
                <div className="accordion-header">
                  <Link
                    to="#"
                    className="accordion-button accordion-custom-button bg-white rounded fw-medium text-dark"
                    data-bs-toggle="collapse"
                    data-bs-target="#basic"
                  >
                    <span className="avatar avatar-md rounded text-dark border me-2">
                      <i className="ti ti-user-plus fs-20" />
                    </span>
                    Basic Info
                  </Link>
                </div>
                <div
                  className="accordion-collapse collapse show"
                  id="basic"
                  data-bs-parent="#main_accordion"
                >
                  <div className="accordion-body border-top">
                    <div className="row">
                      <div className="col-md-12">
                        <div className="mb-3">
                          <label className="col-form-label">Company Name</label>
                          <input type="text" name="company_name" value={formData?.company_name} onChange={handleChange} className="form-control" />
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="mb-3">
                          <div className="d-flex justify-content-between align-items-center">
                            <label className="col-form-label">
                              Email <span className="text-danger">*</span>
                            </label>
                          </div>
                          <input type="text" name="email" value={formData?.email} onChange={handleChange} className="form-control" />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="col-form-label">
                            Primary phone <span className="text-danger">*</span>
                          </label>
                          <input type="text" name="primary_phone" value={formData?.primary_phone} onChange={handleChange} className="form-control" />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="col-form-label">Secondary phone</label>
                          <input type="text" name="secondary_phone" value={formData?.secondary_phone} onChange={handleChange} className="form-control" />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="col-form-label">
                            Website <span className="text-danger">*</span>
                          </label>
                          <input type="text" name="website" value={formData?.website} onChange={handleChange} className="form-control" />
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="mb-0">
                          <label className="col-form-label">
                            Description <span className="text-danger">*</span>
                          </label>
                          <textarea
                            name="description" value={formData?.description} onChange={handleChange}
                            className="form-control"
                            rows={5}
                            defaultValue={""}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* /Basic Info */}
              {/* Address Info */}
              <div className="accordion-item border-top rounded mb-3">
                <div className="accordion-header">
                  <Link
                    to="#"
                    className="accordion-button accordion-custom-button rounded bg-white fw-medium text-dark"
                    data-bs-toggle="collapse"
                    data-bs-target="#address"
                  >
                    <span className="avatar avatar-md rounded text-dark border me-2">
                      <i className="ti ti-map-pin-cog fs-20" />
                    </span>
                    Address Info
                  </Link>
                </div>
                <div
                  className="accordion-collapse collapse"
                  id="address"
                  data-bs-parent="#main_accordion"
                >
                  <div className="accordion-body border-top">
                    <div className="row">
                      <div className="col-md-12">
                        <div className="mb-3">
                          <label className="col-form-label">
                            Street Address{" "}
                          </label>
                          <input type="text" name="street" value={formData?.street} onChange={handleChange} className="form-control" />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="col-form-label">City </label>
                          <input type="text" className="form-control" />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="col-form-label">
                            State / Province{" "}
                          </label>
                          <input type="text" name="state" value={formData?.state} onChange={handleChange} className="form-control" />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-3 mb-md-0">
                          <label className="col-form-label">Country</label>
                          <input type="text" name="country" value={formData?.country} onChange={handleChange} className="form-control" />
                          {/* <Select
                            className="select2"
                            classNamePrefix="react-select"
                            options={countries}
                            placeholder="Choose"
                          /> */}
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-0">
                          <label className="col-form-label">Zipcode </label>
                          <input type="text" name="code" value={formData?.code} onChange={handleChange} className="form-control" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* /Address Info */}
            </div>
            <div className="d-flex align-items-center justify-content-end">
              <button
                type="button"
                data-bs-dismiss="offcanvas"
                className="btn btn-light me-2"
                onClick={handleClose}
              >
                Cancel
              </button>
              <button
                type="button"
                data-bs-dismiss="offcanvas"
                className="btn btn-primary"
                onClick={() => {
                  setOpenModal2(true)
                  handleAddOrUpdateCompanies()
                }}
              >
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
      {/* /Edit Company */}
     
      {/** Bulk Delete Data */}
      <Modal show={showBulkDeleteModal} onHide={() => setShowBulkDeleteModal(false)}>
        <div className="modal-header border-0 m-0 justify-content-end">
          <button
            className="btn-close"
            aria-label="Close"
            onClick={() => {
              setShowBulkDeleteModal(false)
            }}
          >
            <i className="ti ti-x" />
          </button>
        </div>
        <div className="modal-body">
          <div className="success-message text-center">
            <div className="success-popup-icon bg-light-blue">
              <i className="ti ti-user-plus" />
            </div>
            <h3>Are you sure?</h3>
            <p>delete ({selectedRows})selected rows</p>
            <div className="col-lg-12 text-center modal-btn">
              <Link
                to="#"
                className="btn btn-light"
                onClick={() => setShowBulkDeleteModal(false)}
              >
                Cancel
              </Link>
              <Link to="#" className="btn btn-primary" onClick={handleBulkDelete}>
                Delete
              </Link>
            </div>
          </div>
        </div>
      </Modal>
      {/** Bulk Delete Data */}
      {/* Add New Deals */}
      
      {/* /Add New Deals */}
      <Modal show={openModal} onHide={() => setOpenModal(false)}>

        <div className="modal-header border-0 m-0 justify-content-end">
          <button
            className="btn-close"
            aria-label="Close"
            onClick={() => setOpenModal(false)}
          >
            <i className="ti ti-x" />
          </button>
        </div>
        <div className="modal-body">
          <div className="success-message text-center">
            <div className="success-popup-icon bg-light-blue">
              <i className="ti ti-medal" />
            </div>
            <h3>Deal Created Successfully!!!</h3>
            <p>View the details of deal, created</p>
            <div className="col-lg-12 text-center modal-btn">
              <Link
                to="#"
                className="btn btn-light"
                onClick={() => setOpenModal(false)}
              >
                Cancel
              </Link>
              <Link to={route.companyDetails} className="btn btn-primary">
                View Details
              </Link>
            </div>
          </div>
        </div>
      </Modal><Modal show={openModal2} onHide={() => setOpenModal2(false)}>
        <div className="modal-header border-0 m-0 justify-content-end">
          <button
            className="btn-close"
            aria-label="Close"
            onClick={() => setOpenModal2(false)}
          >
            <i className="ti ti-x" />
          </button>
        </div>
        <div className="modal-body">
          <div className="success-message text-center">
            <div className="success-popup-icon bg-light-blue">
              <i className="ti ti-user-plus" />
            </div>
            <h3>Company  Created Successfully!!!</h3>
            <p>View the details of Company, created</p>
            <div className="col-lg-12 text-center modal-btn">
              <Link
                to="#"
                className="btn btn-light"
                onClick={() => setOpenModal2(false)}
              >
                Cancel
              </Link>
              <Link to={route.companyDetails} className="btn btn-primary">
                View Details
              </Link>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default Companies;
