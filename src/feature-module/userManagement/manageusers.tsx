import React, { useState } from "react";
import Table from "../../core/common/dataTable/index";
import Select from "react-select";
import DateRangePicker from "react-bootstrap-daterangepicker";
import { Link } from "react-router-dom";
import ImageWithBasePath from "../../core/common/imageWithBasePath";
import CollapseHeader from "../../core/common/collapse-header";
import PrivateServer from "../../helper/PrivateServer";
import { endpoints } from "../../helper/endpoints";
import moment from "moment";
import _ from "lodash";
import useAuth from "../../hooks/useAuth";
import { Modal } from "react-bootstrap";

const Manageusers = () => {
  const { values } = useAuth();
  const [passwords, setPasswords] = useState([false, false]);
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [groups, setGroups] = useState([]);
  const [searchData, setFilteredSearchData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showBulkActionButton, setShowBulkActionButton] = useState(false);
  const [showBulkDeleteModal, setShowBulkDeleteModal] = useState(false);
  const [selectedRows, setSelectedRows] = useState(0);
  const [selectedIds, setSelectedIds] = useState([]);
  const [userId, setUserId] = useState("");
  const [profileId, setProfileId] = useState("");
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    userId: "",
    date_created: moment(new Date()).format('YYYY-MM-DD'),
    password: "",
    repeatPassword: "",
    roleId: "",
    groupId: "",
  })

  const togglePassword = (index: any) => {
    const updatedPasswords = [...passwords];
    updatedPasswords[index] = !updatedPasswords[index];
    setPasswords(updatedPasswords);
  };
  const [stars, setStars] = useState<{ [key: number]: boolean }>({});

  // const initializeStarsState = () => {
  //   const starsState: { [key: number]: boolean } = {};
  //   users.forEach((item, index) => {
  //     starsState[index] = false;
  //   });
  //   setStars(starsState);
  // };

  const getUsers = async () => {
    try {
      const { User } = endpoints;
      const response = await PrivateServer.getData(User.view);
  
      if(response?.data) {
        setUsers([...new Set(response?.data?.map((x: any, idx) => ({ ...x, key: idx?.toString() })))]);
        setFilteredSearchData([...new Set(response?.data?.map((x: any) => ({ ...x, key: idx?.toString() })))]);
      }
    } catch(error) {
      console.log("Error while getting Users -- E: ", error.message);
    }
  }

  const getRoles = async () => {
    try {
      const { Role } = endpoints;
      const response = await PrivateServer.getData(Role.view);
  
      if(response?.data) {
        const _data: any = [...new Set(response?.data?.map((x) => ({ label: x?.name, value: x?._id })))]
        setRoles(_data);
      }
    } catch(error) {
      console.log("Error while getting roles -- E: ", error.message);
    }
  }

  const getGroups = async () => {
    try {
      const { Group } = endpoints;
      const response = await PrivateServer.getData(Group.view);
  
      if(response?.data) { 
        const _data: any = [...new Set(response?.data?.map((x) => ({ label: x?.group_name, value: x?._id })))]
        setGroups(_data);
      }
    } catch(error) {
      console.log("Error while getting groups -- E: ", error.message);
    }
  }

  React.useEffect(() => {
    // initializeStarsState();

    getUsers();
    getRoles();
    getGroups();
  }, []);

  const handleStarToggle = (index: number) => {
    setStars((prevStars) => ({
      ...prevStars,
      [index]: !prevStars[index],
    }));
  };
  
  const handleClose = () => {
    setUserId("");
    setProfileId("");
    setFormData({
      username: "",
      email: "",
      phone: "",
      userId: "",
      date_created: moment(new Date()).format('YYYY-MM-DD'),
      password: "",
      repeatPassword: "",
      roleId: "",
      groupId: "",
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

  const handleDeleteUser = async () => {
    try {
      const { Profile, User } = endpoints;
      const response_usr = await PrivateServer?.deleteData(User?.delete, userId);
      const response = await PrivateServer?.deleteData(Profile?.delete, profileId);
      if(response) getUsers();
    } catch(err) {
      console.log("Error while deleting profile -- E: ", err?.message);
    }
  }

  const handleEditUser = (values) => {
    setFormData({ ...formData, ..._.omit(values, ["_id"]), userId: values?._id, roleId: values?.roleId?._id, groupId: values?.groupId?._id });
  }

  const handleAddOrUpdateUser = async () => {
    try {
      const { Profile } = endpoints;
      const { data } = formData?.userId !== "" ? await PrivateServer?.patchData(Profile.patch, formData?.userId, formData) : await PrivateServer.postData(Profile.create, formData);

      if(data) {
        if(formData?.userId == "") setFormData({ ...formData, userId: data?.data?._id })
        getUsers();
        handleClose();
      }
    } catch(err) {
      console.log("Error while saving user -- E: ", err?.message);
    }
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
      title: "Username",
      render: (text: any, record: any) => (
        <h2 className="d-flex align-items-center">
          {/* <Link to="#" className="avatar avatar-sm me-2">
            <ImageWithBasePath
              className="w-auto h-auto"
              src={record.image}
              alt="User Image"
            />
          </Link> */}
          <Link to="#" className="d-flex flex-column">
            {record?.username}
            <span className="text-default">{record?.email} </span>
          </Link>
        </h2>
      ),
      sorter: true,
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
      sorter: true,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      sorter: true,
    },
    {
      title: "Team Leader",
      dataIndex: "groupId",
      sorter: (a: any, b: any) => a.secondary_phone.length - b.secondary_phone.length,
      render: (text: any, record: any) => (
        <h2 className="d-flex align-items-center">
          <Link to="#" className="d-flex flex-column">
          {record?.groupId?.group_manager?.username}
            <span className="text-default">{record?.groupId?.group_manager?.team_leader?.email}</span>
          </Link>
        </h2>
      ),
    },
    {
      title: "Date Created",
      dataIndex: "date_created",
      key: "date_created",
      sorter: true,
    },
    {
      title: "Action",
      dataIndex: "action",
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
              data-bs-target="#offcanvas_edit"
              data-bs-toggle="offcanvas"
              onClick={() => handleEditUser(record)}
            >
              <i className="ti ti-edit text-blue" /> Edit
            </Link>)}

            {values?.permissions?.includes('delete') && (<Link
              className="dropdown-item"
              to="#"
              data-bs-toggle="modal"
              data-bs-target="#delete_contact"
              onClick={() => {
                setUserId(record?._id)
                setProfileId(record?.profileId?._id)
              }
            }
            >
              <i className="ti ti-trash text-danger"></i> Delete
            </Link>)}
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
    const { User } = endpoints;
    const deleted = await PrivateServer.deleteBulkData(User?.delete_bulk, selectedIds)
    if(deleted) {
      setShowBulkActionButton(false);
      setShowBulkDeleteModal(false);
    }
  }

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
                      User<span className="count-title">{users?.length}</span>
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
                          placeholder="Search User"
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
                                <Link to="#" className="dropdown-item">
                                  <i className="ti ti-file-type-pdf text-danger me-1" />
                                  Export as PDF
                                </Link>
                              </li>
                              <li>
                                <Link to="#" className="dropdown-item">
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
                          Add user
                        </Link>)}
                      </div>
                    </div>
                  </div>
                  {/* /Search */}
                </div>
                <div className="card-body">
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
                  {/* Manage Users List */}
                  <div className="table-responsive custom-table">
                    <Table columns={columns} dataSource={searchTerm != "" ? searchData : users} handleBulkAction={handleBulkOperation} />
                  </div>
                  <div className="row align-items-center">
                    <div className="col-md-6">
                      <div className="datatable-length" />
                    </div>
                    <div className="col-md-6">
                      <div className="datatable-paginate" />
                    </div>
                  </div>
                  {/* /Manage Users List */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* /Page Wrapper */}
      {/* Add User */}
      <div
        className="offcanvas offcanvas-end offcanvas-large"
        tabIndex={-1}
        id="offcanvas_add"
      >
        <div className="offcanvas-header border-bottom">
          <h5 className="fw-semibold">Add New User</h5>
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
            <div>
              {/* Basic Info */}
              <div>
                <div className="row">
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="col-form-label">
                        {" "}
                        Username <span className="text-danger">*</span>
                      </label>
                      <input type="text" name="username" value={formData?.username} onChange={handleChange} className="form-control" />
                    </div>
                  </div>
                  <div className="col-md-6">
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
                        Role <span className="text-danger">*</span>
                      </label>
                      <Select
                        classNamePrefix="react-select"
                        className="select"
                        options={roles}
                        name="roleId" 
                        value={{ label: roles?.find((x: any) => x?.value == formData?.roleId)?.label, value: formData?.roleId }} 
                        onChange={(value) => handleChange(value, "select", "roleId")}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="col-form-label">
                        Group <span className="text-danger">*</span>
                      </label>
                      <Select
                        classNamePrefix="react-select"
                        className="select"
                        options={groups}
                        name="groupId" 
                        value={{ label: groups?.find((x: any) => x?.value == formData?.groupId)?.label, value: formData?.groupId }} 
                        onChange={(value) => handleChange(value, "select", "groupId")}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="col-form-label">
                        Phone <span className="text-danger">*</span>
                      </label>
                      <input type="text" name="phone" value={formData?.phone} onChange={handleChange} className="form-control" />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="col-form-label">
                        Password <span className="text-danger">*</span>
                      </label>
                      <div className="icon-form-end">
                        <span className="form-icon">
                          <i className="ti ti-eye-off" />
                        </span>
                        <input type="password" name="password" value={formData?.password} onChange={handleChange} className="form-control" />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="col-form-label">
                        Repeat Password <span className="text-danger">*</span>
                      </label>
                      <div className="icon-form-end">
                        <span className="form-icon">
                          <i className="ti ti-eye-off" />
                        </span>
                        <input type="password" name="repeatPassword" value={formData?.repeatPassword} onChange={handleChange} className="form-control" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* /Basic Info */}
            </div>
            <div className="d-flex align-items-center justify-content-end">
              <Link
                to="#"
                className="btn btn-light me-2"
                data-bs-dismiss="offcanvas"
                onClick={handleClose}
              >
                Cancel
              </Link>
              <button type="button" className="btn btn-primary" data-bs-dismiss="offcanvas" onClick={handleAddOrUpdateUser}>
                Create
              </button>
            </div>
          </form>
        </div>
      </div>
      {/* /Add User */}

      {/* Edit User */}
      <div
        className="offcanvas offcanvas-end offcanvas-large"
        tabIndex={-1}
        id="offcanvas_edit"
      >
        <div className="offcanvas-header border-bottom">
          <h5 className="fw-semibold">Edit User</h5>
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
            <div>
              {/* Basic Info */}
              <div>
                <div className="row">
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="col-form-label">
                        {" "}
                        Username <span className="text-danger">*</span>
                      </label>
                      <input
                        name="username"
                        value={formData?.username}
                        onChange={handleChange}
                        type="text"
                        className="form-control"
                        defaultValue="Darlee Robertson"
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <div className="d-flex justify-content-between align-items-center">
                        <label className="col-form-label">
                          Email <span className="text-danger">*</span>
                        </label>
                      </div>
                      <input
                        name="email"
                        value={formData?.email}
                        onChange={handleChange}
                        type="text"
                        className="form-control"
                        defaultValue="robertson@example.com"
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="col-form-label">
                        Role <span className="text-danger">*</span>
                      </label>
                      <Select
                        classNamePrefix="react-select"
                        className="select"
                        options={roles}
                        name="roleId" 
                        value={{ label: roles?.find((x: any) => x?.value == formData?.roleId)?.label, value: formData?.roleId }} 
                        onChange={(value) => handleChange(value, "select", "roleId")}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="col-form-label">
                        Group <span className="text-danger">*</span>
                      </label>
                      <Select
                        classNamePrefix="react-select"
                        className="select"
                        options={groups}
                        name="groupId" 
                        value={{ label: groups?.find((x: any) => x?.value == formData?.groupId)?.label, value: formData?.groupId }} 
                        onChange={(value) => handleChange(value, "select", "groupId")}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="col-form-label">
                        Phone <span className="text-danger">*</span>
                      </label>
                      <input
                        name="phone"
                        value={formData?.phone}
                        onChange={handleChange}
                        type="text"
                        className="form-control"
                        defaultValue="	+1 989757485"
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="col-form-label">
                        Password <span className="text-danger">*</span>
                      </label>
                      <div className="icon-form-end">
                        <span
                          className="form-icon"
                          onClick={() => togglePassword(0)}
                        >
                          <i
                            className={
                              passwords[0] ? "ti ti-eye" : "ti ti-eye-off"
                            }
                          ></i>
                        </span>
                        <input
                          name="password"
                          value={formData?.password}
                          onChange={handleChange}
                          type={passwords[0] ? "text" : "password"}
                          className="form-control"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="col-form-label">
                        Repeat Password <span className="text-danger">*</span>
                      </label>
                      <div className="icon-form-end">
                        <span
                          className="form-icon"
                          onClick={() => togglePassword(1)}
                        >
                          <i
                            className={
                              passwords[1] ? "ti ti-eye" : "ti ti-eye-off"
                            }
                          ></i>
                        </span>
                        <input
                          name="repeatPassword"
                          value={formData?.repeatPassword}
                          onChange={handleChange}
                          type={passwords[1] ? "text" : "password"}
                          className="form-control"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* /Basic Info */}
            </div>
            <div className="d-flex align-items-center justify-content-end">
              <Link
                to="#"
                className="btn btn-light me-2"
                data-bs-dismiss="offcanvas"
                onClick={handleClose}
              >
                Cancel
              </Link>
              <button
                type="button"
                data-bs-dismiss="offcanvas"
                className="btn btn-primary"
                onClick={handleAddOrUpdateUser}
              >
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
      {/* /Edit User */}
      {/* Delete User */}
      <div className="modal fade" id="delete_contact" role="dialog">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-body">
              <div className="text-center">
                <div className="avatar avatar-xl bg-danger-light rounded-circle mb-3">
                  <i className="ti ti-trash-x fs-36 text-danger" />
                </div>
                <h4 className="mb-2">Remove users?</h4>
                <p className="mb-0">Are you sure you want to remove it</p>
                <div className="d-flex align-items-center justify-content-center mt-4">
                  <Link
                    to="#"
                    className="btn btn-light me-2"
                    data-bs-dismiss="modal"
                  >
                    Cancel
                  </Link>
                  <Link to="#" className="btn btn-danger" data-bs-dismiss="modal" onClick={handleDeleteUser}>
                    Yes, Delete it
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* /Delete User */}
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
    </>
  );
};

export default Manageusers;
