import React, { useState } from "react";
// import ImageWithBasePath from "../../../core/common/imageWithBasePath";
import {
  companyName,
  initialSettings,
} from "../../../core/common/selectoption/selectoption";
import Select from "react-select";
import { Link } from "react-router-dom";
import DateRangePicker from "react-bootstrap-daterangepicker";
import Table from "../../../core/common/dataTable/index";
import { Modal } from "react-bootstrap";
import { TableData } from "../../../core/data/interface";
import { useDispatch, useSelector } from "react-redux";
import { all_routes } from "../../router/all_routes";
import DatePicker from "react-datepicker";
// import DefaultEditor from "react-simple-wysiwyg";
import CollapseHeader from "../../../core/common/collapse-header";
// import { SelectWithImage } from "../../../core/common/selectWithImage";
// import { SelectWithImage2 } from "../../../core/common/selectWithImage2";
import PrivateServer from "../../../helper/PrivateServer";
import { endpoints } from "../../../helper/endpoints";
import _ from "lodash";
import moment from "moment";
import useAuth from "../../../hooks/useAuth";
import * as XLSX from "xlsx";

const ContactList = () => {
  const route = all_routes;
  const { values } = useAuth();
  const [users, setUsers] = useState([]);
  const [sources, setSources] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [openModal2, setOpenModal2] = useState(false);
  const [contactData, setContactData] = useState([]);
  const [filteredContactData, setFilteredContactData] = useState([]);
  const [contactId, setContactId] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [showBulkActionButton, setShowBulkActionButton] = useState(false);
  const [showBulkDeleteModal, setShowBulkDeleteModal] = useState(false);
  const [selectedRows, setSelectedRows] = useState(0);
  const [selectedIds, setSelectedIds] = useState([]);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    job_title: "",
    team_leader: "",
    company_name: "",
    email: "",
    primary_phone: "",
    secondary_phone: "",
    dob: moment(new Date()).format("YYYY-MM-DD"),
    contactId: "",
    source: "",
    description: "",
    street: "",
    country: "",
    state: "",
    city: "",
    code: "",
  });
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
    setFormData({ ...formData, dob: moment(date).format('YYYY-MM-DD') });
  };

  const getContacts = async () => {
    try {
      const { Contact } = endpoints;
      const response = await PrivateServer.getData(Contact?.view)
  
      if(response?.data) {
        setContactData([...new Set(response?.data?.map((x: any) => ({ ...x, key: x?.id?.toString() })))]);
        setFilteredContactData([...new Set(response?.data?.map((x: any) => ({ ...x, key: x?.id?.toString() })))]);
      }
    } catch(error) {
      console.log("Error while getting contacts -- E:", error?.message);
    }
  }
  
  const getSources = async () => {
    try {
      const { Sources } = endpoints;
      const response = await PrivateServer.getData(Sources?.view)
  
      if(response?.data) {
        const _data: any = [...new Set(response?.data?.map((x: { source_name: any; _id: any; }) => ({ label: x?.source_name, value: x?._id })))]  
        setSources(_data);
      }
    } catch(error) {
      console.log("Error while getting sources -- E:", error?.message);
    }
  }
  
  const getCompanies = async () => {
    try {
      const { Companies } = endpoints;
      const response = await PrivateServer.getData(Companies?.view)
  
      if(response?.data) {
        const _data: any = [...new Set(response?.data?.map((x: { company_name: any; _id: any; }) => ({ label: x?.company_name, value: x?._id })))]
        setCompanies(_data);
      }
    } catch(error) {
      console.log("Error while getting companies -- E:", error?.message);
    }
  }
  
  const getUsers = async () => {
    try {
      const { Profile } = endpoints;
      const response = await PrivateServer.getData(Profile?.view)
  
      if(response?.data) {
        const _data: any = [...new Set(response?.data?.map((x: { email: any; _id: any; }) => ({ label: x?.email, value: x?._id })))]
        setUsers(_data);
      }
    } catch(error) {
      console.log("Error while getting companies -- E:", error?.message);
    }
  }

  // Call initializeStarsState once when the component mounts
  React.useEffect(() => {
    getUsers();
    getContacts();
    getSources();
    getCompanies();
  }, []);

  const handleClose = () => {
    setContactId("");
    setFormData({
      first_name: "",
      last_name: "",
      job_title: "",
      team_leader: "",
      company_name: "",
      email: "",
      primary_phone: "",
      secondary_phone: "",
      dob: moment(new Date()).format("YYYY-MM-DD"),
      contactId: "",
      source: "",
      description: "",
      street: "",
      country: "",
      state: "",
      city: "",
      code: "",
    });
  }

  const handleChange = (e: { label?: any; value: any; target?: any; }, type="", _name="") => {    
    if(type == "file") {
      const { name } = e.target;
      setFormData({ ...formData, [name]: e.target?.files[0] });
    }
    else if(type == "select") {
      setFormData({ ...formData, [_name]: e?.label });
    } else {
      const { name, value } = e.target; 
      setFormData({ ...formData, [name]: value });
    }
  }

  const handleDeleteContact = async () => {
    try {
      const { Contact } = endpoints;
      const response = await PrivateServer?.deleteData(Contact?.delete, contactId);
      if(response) getContacts();
    } catch(err) {
      console.log("Error while deleting contact -- E: ", err?.message);
    }
  }

  const handleEditContact = (values: { _id: any; }) => {
    setFormData({ ...formData, ..._.omit(values, ["_id"]), contactId: values?._id });
  }

  const handleAddOrUpdateContact = async () => {
    try {
      const { Contact } = endpoints;
      const { data } = formData?.contactId !== "" ? await PrivateServer?.patchData(Contact.patch, formData?.contactId, formData) : await PrivateServer.postData(Contact.create, formData);

      if(data) {
        if(formData?.contactId == "") setFormData({ ...formData, contactId: data?.data?._id })
        getContacts();
        handleClose();
      }
    } catch(err) {
      console.log("Error while saving contact -- E: ", err?.message);
    }
  }

  const cleanData = (data: any[], filterKeys: string[]) => {
    return data.map((obj: any) => {
        // Remove filterKeys from object
        const filteredObj = _.omit(obj, filterKeys);

        // Convert keys to start case
        return _.mapKeys(filteredObj, (value, key) => _.startCase(_.toLower(key.replace(/_/g, " "))));
    });
  };

  const handleExport = () => {
    try {
      // Convert data to worksheet format
      const worksheet = XLSX.utils.json_to_sheet(cleanData(contactData, ["_id", "__v"]));

      // Create a new workbook and append the worksheet
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Products");

      // Write the file and trigger download
      XLSX.writeFile(workbook, 'etisalat_contacts_data.xlsx');

    } catch(err) {
      console.log("Error == ", err);
    }
  }
  
  const handleSearch = (e: { target: { value: any; }; }) => {
    const { value: _searchTerm } = e?.target;
    setSearchTerm(_searchTerm);
    const _contactsData = [...contactData];

    if(searchTerm != "") {
      const searchResults = _.filter(_contactsData, (obj) =>
        _.some(obj, (value) =>
          _.isString(value) && _.includes(value.toLowerCase(), searchTerm?.toLowerCase())
        )
      );
      setFilteredContactData(searchResults)
    } else setFilteredContactData(contactData);
  }

  const columns = [
    {
      title: "Name",
      dataIndex: "first_name",
      render: (text: any, record: any, index: number) => (
        <h2 className="d-flex align-items-center" key={index}>
        {/* <Link to={route.contactDetails} className="avatar avatar-sm me-2">
          <ImageWithBasePath
            className="img-fluid"
            src={env_data?.image_base_path + record?.profile_picture}
            alt={"Customer profile picture"}
          />
        </Link> */}
        <Link to={route.contactDetails} className="d-flex flex-column">
        {record?.first_name} {record?.last_name}
          <span className="text-default">{record?.email}</span>
        </Link>
      </h2>
      ),
      sorter: (a: { [key: string]: string }, b: { [key: string]: string }) => a?.first_name?.toLowerCase().localeCompare(b?.first_name?.toLowerCase()),
    },
    {
      title: "Created By",
      dataIndex: "profileId",
      sorter: (a: any, b: any) => a.secondary_phone.length - b.secondary_phone.length,
      render: (text: any, record: any) => (
        <h2 className="d-flex align-items-center">
          <Link to={route.companies} className="d-flex flex-column">
          {record?.profileId?.username}
            <span className="text-default">{record?.profileId?.email}</span>
          </Link>
        </h2>
      ),
    },
    {
      title: "Team Leader",
      dataIndex: "team_leader",
      render: (text: any, record: any, index: number) => (
        <h2 className="d-flex align-items-center" key={index}>
        {/* <Link to={route.contactDetails} className="avatar avatar-sm me-2">
          <ImageWithBasePath
            className="img-fluid"
            src={env_data?.image_base_path + record?.profile_picture}
            alt={"Customer profile picture"}
          />
        </Link> */}
        <Link to={route.contactDetails} className="d-flex flex-column">
        {record?.team_leader}
        <span className="text-default">{record?.groupId?.group_manager?.team_leader?.email}</span>
        </Link>
      </h2>
      ),
      sorter: (a: { [key: string]: string }, b: { [key: string]: string }) => a?.team_leader?.toLowerCase().localeCompare(b?.team_leader?.toLowerCase()),
    },
    {
      title: "Phone",
      dataIndex: "primary_phone",
      sorter: (a: { [key: string]: string }, b: { [key: string]: string }) => a.primary_phone.length - b.primary_phone.length,
    },

    {
      title: "Email",
      dataIndex: "email",
      sorter: (a: TableData, b: TableData) => a.email.length - b.email.length,
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (text: any, record: any, index: number) => (
        <div className="dropdown table-action" key={index}>
          <Link
            to="#"
            className="action-icon"
            data-bs-toggle="dropdown"
            aria-expanded="true"
          >
            <i className="fa fa-ellipsis-v"></i>
          </Link>
          <div
            className="dropdown-menu dropdown-menu-right"
            style={{
              position: "absolute",
              inset: "0px auto auto 0px",
              margin: "0px",
              transform: "translate3d(-99.3333px, 35.3333px, 0px)",
            }}
            data-popper-placement="bottom-start"
          >
            {values?.permissions?.includes('update') && (<Link
              className="dropdown-item edit-popup"
              to="#"
              onClick={() => handleEditContact(record)}
              data-bs-toggle="offcanvas" data-bs-target="#offcanvas_edit"
            >
              <i className="ti ti-edit text-blue"></i> Edit
            </Link>)}
            {values?.permissions?.includes('delete') && (<Link
              className="dropdown-item"
              to="#"
              data-bs-toggle="modal"
              data-bs-target="#delete_contact"
              onClick={() => setContactId(record?._id)}
            >
              <i className="ti ti-trash text-danger"></i> Delete
            </Link>)}
            <Link className="dropdown-item" to={route.contactDetails} state={{...record, totalData: contactData?.length}}><i className="ti ti-eye text-blue-light"></i> Preview</Link>
          </div>
        </div>
      ),
    },
  ];

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
    const { Contact } = endpoints;
    const deleted = await PrivateServer.deleteBulkData(Contact?.delete_bulk, selectedIds)
    if(deleted) {
      setShowBulkActionButton(false);
      setShowBulkDeleteModal(false);
    }
  }

  return (
    <div>
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
                      Contacts<span className="count-title">{searchTerm != "" ? filteredContactData?.length : contactData?.length}</span>
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
                          placeholder="Search Contacts"
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
                        {values?.permissions?.includes('create') && (<Link
                          to="#"
                          className="btn btn-primary"
                          data-bs-toggle="offcanvas"
                          data-bs-target="#offcanvas_add"
                        >
                          <i className="ti ti-square-rounded-plus me-2" />
                          Add Contacts
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
                    <Table dataSource={searchTerm != "" ? filteredContactData : contactData} columns={columns} handleBulkAction={handleBulkOperation} />
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

        {/* Add Contact */}
        <div
          className="offcanvas offcanvas-end offcanvas-large"
          tabIndex={-1}
          id="offcanvas_add"
        >
          <div className="offcanvas-header border-bottom">
            <h5 className="fw-semibold">Add New Contact</h5>
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
                        {/* <div className="col-md-12">
                          <div className="mb-3">
                            <div className="profile-upload">
                              <div className="profile-upload-img">
                                <span>
                                  <i className="ti ti-photo" />
                                </span>
                                <img
                                  src="assets/img/profiles/avatar-20.jpg"
                                  alt="img"
                                  className="preview1"
                                />
                                <button
                                  type="button"
                                  className="profile-remove"
                                >
                                  <i className="ti ti-x" />
                                </button>
                              </div>
                              <div className="profile-upload-content">
                                <label className="profile-upload-btn">
                                  <i className="ti ti-file-broken" /> Upload
                                  File
                                  {
                                    formData?.profile_picture ?
                                    <img className="preview1" src={env_data?.image_base_path + formData?.profile_picture} alt="Customer Profile Picture" />
                                    :
                                    <input type="file" name="profile_picture" onChange={handleChange} className="input-img" />
                                  }
                                  </label>
                                <p>JPG, GIF or PNG. Max size of 50M</p>
                              </div>
                            </div>
                          </div>
                        </div> */}
                        <div className="col-md-6">
                          <div className="mb-3">
                            <label className="col-form-label">
                              First Name <span className="text-danger">*</span>
                            </label>
                            <input type="text" value={formData?.first_name} name="first_name" onChange={handleChange} className="form-control" />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="mb-3">
                            <label className="col-form-label">
                              Last Name <span className="text-danger">*</span>
                            </label>
                            <input type="text" value={formData?.last_name} name="last_name" onChange={handleChange} className="form-control" />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="mb-3">
                            <label className="col-form-label">
                              Team Leader <span className="text-danger">*</span>
                            </label>
                            <Select
                              name="team_leader"
                              onChange={(value) => handleChange(value, "select", "team_leader")}
                              value={{ label: users?.find((x: any) => x?.label == formData?.team_leader)?.label, value: formData?.team_leader }}
                              className="select2" 
                              classNamePrefix="react-select"
                              options={users}
                              placeholder="Choose"
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="mb-3">
                            <label className="col-form-label">
                              Company Name
                            </label>
                            <Select
                              name="company_name"
                              onChange={(value) => handleChange(value, "select", "company_name")}
                              value={{ label: companies?.find((x: any) => x?.label == formData?.company_name)?.label, value: formData?.company_name }}
                              className="select2" 
                              classNamePrefix="react-select"
                              options={companies}
                              placeholder="Choose"
                            />
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
                              Date of Birth
                            </label>
                            <div className="icon-form-end">
                              <span className="form-icon">
                                <i className="ti ti-calendar-event" />
                              </span>
                              <DatePicker
                                  className="form-control datetimepicker deals-details"
                                  selected={selectedDate}
                                  onChange={handleDateChange}
                                  dateFormat="dd-MM-yyyy"
                                />
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="mb-3">
                            <label className="col-form-label">
                              Source <span className="text-danger">*</span>
                            </label>
                            <Select
                                name="source"
                                onChange={(value) => handleChange(value, "select", "source")}
                                value={{ label: sources?.find((x: any) => x?.label == formData?.source)?.label, value: formData?.source }}
                                className="select2" 
                                classNamePrefix="react-select"
                                options={sources}
                                placeholder="Select an option"
                              />
                          </div>
                        </div>
                        <div className="col-md-12">
                          <div className="mb-0">
                            <label className="col-form-label">
                              Description <span className="text-danger">*</span>
                            </label>
                            <textarea
                              name="description"
                              value={formData?.description}
                              onChange={handleChange}
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
                            <input type="text" value={formData?.street} name="street" onChange={handleChange} className="form-control" />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="mb-3 mb-md-0">
                            <label className="col-form-label">Country</label>
                            <input type="text" value={formData?.country} name="country" onChange={handleChange} className="form-control" />
                            {/* <Select
                                className="select" 
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
                            <input type="text" value={formData?.state} name="state" onChange={handleChange} className="form-control" />
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
                            <input type="text" value={formData?.city} name="city" onChange={handleChange} className="form-control" />
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
                            <input type="text" value={formData?.code} name="code" onChange={handleChange} className="form-control" />
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
                  >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  data-bs-dismiss="offcanvas"
                  onClick={() => {
                    setOpenModal2(true)
                    handleAddOrUpdateContact()
                  }}
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
        {/* /Add Contact */}

        {/* Edit Contact */}
        <div
          className="offcanvas offcanvas-end offcanvas-large"
          tabIndex={-1}
          id="offcanvas_edit"
        >
          <div className="offcanvas-header border-bottom">
            <h5 className="fw-semibold">Edit Contact</h5>
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
              <div className="accordion" id="main_accordion_2">
                {/* Basic Info */}
                <div className="accordion-item rounded mb-3">
                  <div className="accordion-header">
                    <Link
                      to="#"
                      className="accordion-button accordion-custom-button bg-white rounded fw-medium text-dark"
                      data-bs-toggle="collapse"
                      data-bs-target="#basic-2"
                    >
                      <span className="avatar avatar-md rounded text-dark border me-2">
                        <i className="ti ti-user-plus fs-20" />
                      </span>
                      Basic Info
                    </Link>
                  </div>
                  <div
                    className="accordion-collapse collapse show"
                    id="basic-2"
                    data-bs-parent="#main_accordion_2"
                  >
                    <div className="accordion-body border-top">
                      <div className="row">
                        <div className="col-md-6">
                          <div className="mb-3">
                            <label className="col-form-label">
                              First Name <span className="text-danger">*</span>
                            </label>
                            <input
                              value={formData?.first_name}
                              name="first_name"
                              onChange={handleChange}
                              type="text"
                              className="form-control"
                              defaultValue="Darlee"
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="mb-3">
                            <label className="col-form-label">
                              Last Name <span className="text-danger">*</span>
                            </label>
                            <input
                              value={formData?.last_name}
                              name="last_name"
                              onChange={handleChange}
                              type="text"
                              className="form-control"
                              defaultValue="Robertson"
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="mb-3">
                            <label className="col-form-label">
                              Team Leader <span className="text-danger">*</span>
                            </label>
                            <Select
                              name="team_leader"
                              onChange={(value) => handleChange(value, "select", "team_leader")}
                              value={{ label: users?.find((x: any) => x?.label == formData?.team_leader)?.label, value: formData?.team_leader }}
                              className="select2" 
                              classNamePrefix="react-select"
                              options={users}
                              placeholder="Choose"
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="mb-3">
                            <label className="col-form-label">
                              Company Name
                            </label>
                            <Select  
                                // value={formData?.company_name}
                                name="company_name"
                                onChange={(value) => handleChange(value, "select", "company_name")}
                                value={{ label: companies?.find((x: any) => x?.label == formData?.company_name)?.label, value: formData?.company_name }}
                                className="select2" 
                                classNamePrefix="react-select"
                                options={companies}
                                placeholder="Choose"
                              />
                          </div>
                        </div>
                        <div className="col-md-12">
                          <div className="mb-3">
                            <div className="d-flex justify-content-between align-items-center">
                              <label className="col-form-label">
                                Email <span className="text-danger">*</span>
                              </label>
                            </div>
                            <input type="text" value={formData?.email} name="email" onChange={handleChange} className="form-control" />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="mb-3">
                            <label className="col-form-label">
                              Primary Phone <span className="text-danger">*</span>
                            </label>
                            <input
                              value={formData?.primary_phone}
                              name="primary_phone"
                              onChange={handleChange}
                              type="text"
                              className="form-control"
                              defaultValue={6234567890}
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="mb-3">
                            <label className="col-form-label">Secondary Phone</label>
                            <input
                              value={formData?.secondary_phone}
                              name="secondary_phone"
                              onChange={handleChange}
                              type="text"
                              className="form-control"
                              defaultValue={7234567899}
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="mb-3">
                            <label className="col-form-label">
                              Date of Birth
                            </label>
                            <div className="icon-form-end">
                              <span className="form-icon">
                                <i className="ti ti-calendar-event" />
                              </span>
                              <DatePicker
                                  className="form-control datetimepicker deals-details"
                                  selected={selectedDate}
                                  onChange={handleDateChange}
                                  dateFormat="dd-MM-yyyy"
                                />
                            </div>
                          </div>
                        </div>
                        
                        <div className="col-md-6">
                          <div className="mb-3">
                            <label className="col-form-label">
                              Source <span className="text-danger">*</span>
                            </label>
                            <Select
                                name="source"
                                onChange={(value) => handleChange(value, "select", "source")}
                                value={{ label: sources?.find((x: any) => x?.label == formData?.source)?.label, value: formData?.source }}
                                className="select2" 
                                classNamePrefix="react-select"
                                options={sources}
                                placeholder="Select an option"
                              />
                          </div>
                        </div>
                        <div className="col-md-12">
                          <div className="mb-0">
                            <label className="col-form-label">
                              Description <span className="text-danger">*</span>
                            </label>
                            <textarea
                              value={formData?.description}
                              name="description"
                              onChange={handleChange}
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
                      data-bs-target="#address-2"
                    >
                      <span className="avatar avatar-md rounded text-dark border me-2">
                        <i className="ti ti-map-pin-cog fs-20" />
                      </span>
                      Address Info
                    </Link>
                  </div>
                  <div
                    className="accordion-collapse collapse"
                    id="address-2"
                    data-bs-parent="#main_accordion_2"
                  >
                    <div className="accordion-body border-top">
                      <div className="row">
                        <div className="col-md-12">
                          <div className="mb-3">
                            <label className="col-form-label">
                              Street Address{" "}
                            </label>
                            <input
                              value={formData?.street}
                              name="street"
                              onChange={handleChange}
                              type="text"
                              className="form-control"
                              defaultValue="22, Ave Street"
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="mb-3">
                            <label className="col-form-label">City </label>
                            <input
                              value={formData?.city}
                              name="city"
                              onChange={handleChange}
                              type="text"
                              className="form-control"
                              defaultValue="Denver"
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="mb-3">
                            <label className="col-form-label">
                              State / Province{" "}
                            </label>
                            <input
                              value={formData?.state}
                              name="state"
                              onChange={handleChange}
                              type="text"
                              className="form-control"
                              defaultValue="Colorado"
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="mb-3 mb-md-0">
                            <label className="col-form-label">Country</label>
                            <input
                              value={formData?.country}
                              name="country"
                              onChange={handleChange}
                              type="text"
                              className="form-control"
                              defaultValue="Colorado"
                            />
                            {/* <Select
                                className="select" 
                                 classNamePrefix="react-select"
                                options={countries}
                                defaultValue={countries[2]}
                                placeholder="Choose"
                              /> */}
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="mb-0">
                            <label className="col-form-label">Zipcode </label>
                            <input
                              value={formData?.code}
                              name="code"
                              onChange={handleChange}
                              type="text"
                              className="form-control"
                              defaultValue={546}
                            />
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
                >
                  Cancel
                </button>
                <button type="button" data-bs-dismiss="offcanvas" onClick={handleAddOrUpdateContact} className="btn btn-primary">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
        {/* /Edit Contact */}
        
        {/* Delete Contact */}
        <div className="modal fade" id="delete_contact" role="dialog">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-body">
                <div className="text-center">
                  <div className="avatar avatar-xl bg-danger-light rounded-circle mb-3">
                    <i className="ti ti-trash-x fs-36 text-danger" />
                  </div>
                  <h4 className="mb-2">Remove Contacts?</h4>
                  <p className="mb-0">
                    Are you sure you want to remove <br /> contact you selected.
                  </p>
                  <div className="d-flex align-items-center justify-content-center mt-4">
                    <Link
                      to="#"
                      className="btn btn-light me-2"
                      data-bs-dismiss="modal"
                    >
                      Cancel
                    </Link>
                    <Link to="#" className="btn btn-danger" onClick={handleDeleteContact} data-bs-dismiss="modal">
                      Yes, Delete it
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* /Delete Contact */}

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
        
        {/* Create Contact */}
        <Modal show={openModal2} onHide={() => setOpenModal2(false)}>
          <div className="modal-header border-0 m-0 justify-content-end">
            <button
              className="btn-close"
              aria-label="Close"
              onClick={() => {
                setOpenModal2(false)
                handleClose()
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
              <h3>Contact Created Successfully!!!</h3>
              <p>View the details of contact, created</p>
              <div className="col-lg-12 text-center modal-btn">
                <Link
                  to="#"
                  className="btn btn-light"
                  onClick={() => setOpenModal2(false)}
                >
                  Cancel
                </Link>
                <Link to={route.contactDetails} className="btn btn-primary">
                  View Details
                </Link>
              </div>
            </div>
          </div>
        </Modal>
        {/* /Create Contact */}

        {/* Access */}
        <div className="modal fade" id="access_view" role="dialog">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Access For</h5>
                <button
                  className="btn-close custom-btn-close border p-1 me-0 text-dark"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  onClick={handleClose}
                >
                  <i className="ti ti-x" />
                </button>
              </div>
              <form>
                <div className="modal-body">
                  <div className="icon-form mb-3">
                    <span className="form-icon">
                      <i className="ti ti-search" />
                    </span>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Search"
                    />
                  </div>
                  <div className="access-wrap mb-0">
                    <ul>
                      <li className="select-people-checkbox">
                        <label className="checkboxs">
                          <input type="checkbox" />
                          <span className="checkmarks" />
                          <span className="people-profile">
                            <img
                              src="assets/img/profiles/avatar-19.jpg"
                              alt=""
                            />
                            <Link to="#">Darlee Robertson</Link>
                          </span>
                        </label>
                      </li>
                      <li className="select-people-checkbox">
                        <label className="checkboxs">
                          <input type="checkbox" />
                          <span className="checkmarks" />
                          <span className="people-profile">
                            <img
                              src="assets/img/profiles/avatar-20.jpg"
                              alt=""
                            />
                            <Link to="#">Sharon Roy</Link>
                          </span>
                        </label>
                      </li>
                      <li className="select-people-checkbox">
                        <label className="checkboxs">
                          <input type="checkbox" />
                          <span className="checkmarks" />
                          <span className="people-profile">
                            <img
                              src="assets/img/profiles/avatar-21.jpg"
                              alt=""
                            />
                            <Link to="#">Vaughan</Link>
                          </span>
                        </label>
                      </li>
                      <li className="select-people-checkbox">
                        <label className="checkboxs">
                          <input type="checkbox" />
                          <span className="checkmarks" />
                          <span className="people-profile">
                            <img
                              src="assets/img/profiles/avatar-01.jpg"
                              alt=""
                            />
                            <Link to="#">Jessica</Link>
                          </span>
                        </label>
                      </li>
                      <li className="select-people-checkbox">
                        <label className="checkboxs">
                          <input type="checkbox" />
                          <span className="checkmarks" />
                          <span className="people-profile">
                            <img
                              src="assets/img/profiles/avatar-16.jpg"
                              alt=""
                            />
                            <Link to="#">Carol Thomas</Link>
                          </span>
                        </label>
                      </li>
                      <li className="select-people-checkbox">
                        <label className="checkboxs">
                          <input type="checkbox" />
                          <span className="checkmarks" />
                          <span className="people-profile">
                            <img
                              src="assets/img/profiles/avatar-22.jpg"
                              alt=""
                            />
                            <Link to="#">Dawn Mercha</Link>
                          </span>
                        </label>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="modal-footer">
                  <div className="d-flex align-items-center justify-content-end m-0">
                    <button
                      type="button"
                      className="btn btn-light me-2"
                      data-bs-dismiss="modal"
                    >
                      Cancel
                    </button>
                    <button data-bs-dismiss="modal" type="button" className="btn btn-primary">
                      Confirm
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        {/* /Access */}
      
    </div>
  );
};

export default ContactList;
