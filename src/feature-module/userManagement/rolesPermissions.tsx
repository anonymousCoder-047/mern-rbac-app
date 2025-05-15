import React, { useState } from "react";
import Table from "../../core/common/dataTable/index";
import Select from "react-select";
import { rolesPermissionsData } from "../../core/data/json/rolesPermissions";
import { Link } from "react-router-dom";
import { all_routes } from "../router/all_routes";
import { TableData } from "../../core/data/interface";
import CollapseHeader from "../../core/common/collapse-header";
import { endpoints } from "../../helper/endpoints";
import PrivateServer from "../../helper/PrivateServer";
import _ from "lodash";
import moment from "moment";

const route = all_routes;

const RolesPermissions = () => {
  const [roles, setRoles] = useState([]);
  const [users, setUsers] = useState([]);
  const [roleId, setRoleId] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    role_id: 0,
    roleId: "",
    action: [],
    profileId: "",
    permissionId: "",
  });
  
  const permissions = [
    { label: "Write", value: "create" },
    { label: "Read", value: "read" },
    { label: "Update", value: "update" },
    { label: "Delete", value: "delete" },
  ]

  const getRoles = async () => {
    try {
      const { Role } = endpoints;
      const response = await PrivateServer.getData(Role.view);
  
      console.log("response data -- ", response);
      if(response?.data) setRoles(response?.data);
    } catch(error) {
      console.log("Error while getting roles -- E: ", error.message);
    }
  }
  
  const getUsers = async () => {
    try {
      const { Profile } = endpoints;
      const response = await PrivateServer.getData(Profile.view);
  
      console.log("response data -- ", response);
      if(response?.data) {
        const _data: any = [...new Set(response?.data?.map((x) => ({ label: x?.username, value: x?._id })))]
        setUsers(_data);
      }
    } catch(error) {
      console.log("Error while getting users -- E: ", error.message);
    }
  }
  
  React.useEffect(() => {
    getRoles();
    getUsers();
  }, []);

  const handleClose = () => {
    setRoleId("");
    setFormData({
      name: "",
      role_id: 0,
      roleId: "",
      action: [],
      profileId: "",
      permissionId: "",
    });
  }

  const handleChange = (e, type="", _name="", _multiple=false) => {    
    if(type == "file") {
      const { name } = e.target;
      setFormData({ ...formData, [name]: e.target?.files[0] });
    }
    else if(type == "select") {
      if(_multiple) {
        const _perms = _.map(e, 'value')
        setFormData({ ...formData, [_name]: _perms });
      } else setFormData({ ...formData, [_name]: e?.value });
    } else {
      const { name, value } = e.target; 
      setFormData({ ...formData, [name]: value });
    }
  }

  const handleDeleteRole = async () => {
    try {
      const { Role } = endpoints;
      const response = await PrivateServer?.deleteData(Role?.delete, roleId);
      if(response) getRoles();
    } catch(err) {
      console.log("Error while deleting role -- E: ", err?.message);
    }
  }

  const handleEditUser = (values) => {
    console.log("Edit contact clicked -- ", values);
    setFormData({ ...formData, ..._.omit(values, ["_id"]), roleId: values?._id });
  }

  const handleAddOrUpdateRole = async () => {
    try {
      const { Role } = endpoints;
      const response = formData?.roleId !== "" ? await PrivateServer?.patchData(Role.patch, formData?.roleId, _.omit(formData, ['action', 'profileId'])) : await PrivateServer.postData(Role.create, _.omit(formData, ['action', 'profileId']));

      if(response?.data) {
        handleAddOrUpdatePermissions();
        if(formData?.roleId == "") setFormData({ ...formData, roleId: response?.data?._id })
        getRoles();
      }
    } catch(err) {
      console.log("Error while saving role -- E: ", err?.message);
    }
  }
  
  const handleAddOrUpdatePermissions = async () => {
    try {
      const { Permissions } = endpoints;
      const response = formData?.permissionId !== "" ? await PrivateServer?.patchData(Permissions.patch, formData?.roleId, _.pick(formData, ['action', 'profileId'])) : await PrivateServer.postData(Permissions.create, _.pick(formData, ['action', 'profileId']));

      if(response?.data) {
        if(formData?.roleId == "") setFormData({ ...formData, permissionId: response?.data?._id })
        getRoles();
      }
    } catch(err) {
      console.log("Error while saving role -- E: ", err?.message);
    }
  }

  const columns = [
    {
      title: "Role Name",
      dataIndex: "name",
      sorter: (a: any, b: any) =>
      a.name.length - b.name.length,
      key: "roleId",
      width: "235px",
    },
    {
      title: "Created at",
      dataIndex: "date_created",
      render: (text: any, record: any) => (
        <h2 className="d-flex align-items-center">
          <Link to="#" className="d-flex flex-column">
            <span className="text-default">{moment(new Date()).format('YYYY-MM-DD')} </span>
          </Link>
        </h2>
      ),
      sorter: (a: any, b: any) =>
      a.date_created.length - b.date_created.length,
      key: "date_created",
      width: "316px",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      width: "128px",
      render: (text: string, record: any) => (
        <div className="dropdown table-action">
          <Link
            to="#"
            className="action-icon"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <i className="fa fa-ellipsis-v" />
          </Link>
          <div className="dropdown-menu dropdown-menu-right">
            <Link
              className="dropdown-item edit-popup"
              to="#"
              data-bs-toggle="modal"
              data-bs-target="#edit_role"
              onClick={() => handleEditUser(record)}
            >
              <i className="ti ti-edit text-blue" /> Edit
            </Link>
            
            <Link
              className="dropdown-item"
              to="#"
              data-bs-toggle="modal"
              data-bs-target="#delete_role"
              onClick={() => setRoleId(record?._id)}
            >
              <i className="ti ti-trash text-danger"></i> Delete
            </Link>
          </div>
        </div>
      ),
    },
  ];
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
                <h4 className="page-title">Roles <span className="count-title">{roles?.length}</span></h4>
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
                      placeholder="Search Roles"
                    />
                  </div>
                </div>
                <div className="col-sm-8">
                  <div className="text-sm-end">
                    <Link
                      to="#"
                      className="btn btn-primary"
                      data-bs-toggle="modal"
                      data-bs-target="#add_role"
                    >
                      <i className="ti ti-square-rounded-plus me-2" />
                      Add New Roles
                    </Link>
                  </div>
                </div>
              </div>
              {/* /Search */}
            </div>
            <div className="card-body">
              {/* Roles List */}
              <div className="table-responsive custom-table">
              <Table columns={columns} dataSource={roles} />
              </div>
              <div className="row align-items-center">
                <div className="col-md-6">
                  <div className="datatable-length" />
                </div>
                <div className="col-md-6">
                  <div className="datatable-paginate" />
                </div>
              </div>
              {/* /Roles List */}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  {/* /Page Wrapper */}
  {/* Add Role */}
  <div className="modal fade" id="add_role" role="dialog">
    <div className="modal-dialog modal-dialog-centered">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">Add Role</h5>
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
            <div className="mb-0">
              <label className="col-form-label">
                Role Name <span className="text-danger">*</span>
              </label>
              <input type="text" name="name" value={formData?.name} onChange={handleChange} className="form-control" />
            </div>
          </div>
          <div className="modal-body">
            <div className="mb-0">
              <label className="col-form-label">
                Role Id <span className="text-danger">*</span>
              </label>
              <input type="number" name="role_id" value={formData?.role_id} onChange={handleChange} className="form-control" />
            </div>
          </div>
          <div className="modal-body">
            <div className="mb-0">
              <label className="col-form-label">
                User <span className="text-danger">*</span>
              </label>
              <Select
                classNamePrefix="react-select"
                className="select"
                options={users}
                name="profileId" 
                value={{ label: users?.find((x: any) => x?.value == formData?.profileId)?.label, value: formData?.profileId }} 
                onChange={(value) => handleChange(value, "select", "profileId")}
              />
            </div>
          </div>
          <div className="modal-body">
            <div className="mb-0">
              <label className="col-form-label">
                Permissions <span className="text-danger">*</span>
              </label>
              <Select<{ label: string; value: string; }, true>
                isMulti={true}
                classNamePrefix="react-select"
                className="select"
                options={permissions}
                name="roleId" 
                value={_.map(formData?.action, (value) => ({
                  label: _.startCase(value), // Converts 'create' to 'Create'
                  value,
                }))} 
                onChange={(value) => handleChange(value, "select", "action", true)}
              />
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
              <button type="button" data-bs-dismiss="modal" className="btn btn-primary" onClick={handleAddOrUpdateRole}>
                Create
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
  {/* /Add Role */}
  {/* Edit Role */}
  <div className="modal fade" id="edit_role" role="dialog">
    <div className="modal-dialog modal-dialog-centered">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">Edit Role</h5>
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
            <div className="mb-0">
              <label className="col-form-label">
                Role Name <span className="text-danger">*</span>
              </label>
              <input
                name="name"
                value={formData?.name}
                onChange={handleChange}
                type="text"
                className="form-control"
                defaultValue="Admin"
              />
            </div>
          </div>
          <div className="modal-body">
            <div className="mb-0">
              <label className="col-form-label">
                Role Id <span className="text-danger">*</span>
              </label>
              <input type="number" name="role_id" value={formData?.role_id} onChange={handleChange} className="form-control" />
            </div>
          </div>
          <div className="modal-body">
            <div className="mb-0">
              <label className="col-form-label">
                User <span className="text-danger">*</span>
              </label>
              <Select
                classNamePrefix="react-select"
                className="select"
                options={users}
                name="profileId" 
                value={{ label: users?.find((x: any) => x?.value == formData?.profileId)?.label, value: formData?.profileId }} 
                onChange={(value) => handleChange(value, "select", "profileId")}
              />
            </div>
          </div>
          <div className="modal-body">
            <div className="mb-0">
              <label className="col-form-label">
                Permissions <span className="text-danger">*</span>
              </label>
              <Select<{ label: string; value: string; }, true>
                isMulti={true}
                classNamePrefix="react-select"
                className="select"
                options={permissions}
                name="roleId" 
                value={_.map(formData?.action, (value) => ({
                  label: _.startCase(value), // Converts 'create' to 'Create'
                  value,
                }))} 
                onChange={(value) => handleChange(value, "select", "action", true)}
              />
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
              <button type="button" data-bs-dismiss="modal" className="btn btn-primary" onClick={handleAddOrUpdateRole}>
                Save Changes
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
  {/* /Edit Role */}
  <div className="modal fade" id="delete_role" role="dialog">
    <div className="modal-dialog modal-dialog-centered">
      <div className="modal-content">
        <div className="modal-body">
          <div className="text-center">
            <div className="avatar avatar-xl bg-danger-light rounded-circle mb-3">
              <i className="ti ti-trash-x fs-36 text-danger" />
            </div>
            <h4 className="mb-2">Remove role?</h4>
            <p className="mb-0">Are you sure you want to remove it</p>
            <div className="d-flex align-items-center justify-content-center mt-4">
              <Link
                to="#"
                className="btn btn-light me-2"
                data-bs-dismiss="modal"
              >
                Cancel
              </Link>
              <Link to="#" className="btn btn-danger" onClick={handleDeleteRole}>
                Yes, Delete it
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</>

  );
};

export default RolesPermissions;
