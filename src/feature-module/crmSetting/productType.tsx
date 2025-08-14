import React, { useEffect, useState } from "react";
import Table from "../../core/common/dataTable/index";
import { Link } from "react-router-dom";
import Select from "react-select";
import { all_routes } from "../router/all_routes";
import CollapseHeader from "../../core/common/collapse-header";
import PrivateServer from "../../helper/PrivateServer";
import { endpoints } from "../../helper/endpoints";
import _ from "lodash";
import useAuth from "../../hooks/useAuth";
import { Modal } from "react-bootstrap";

const route = all_routes;

const ProductType = () => {
  const { values } = useAuth();
  const [typeData, setTypeData] = useState([]);
  const [subTypes, setSubTypes] = useState([]);
  const [searchData, setFilteredSearchData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showBulkActionButton, setShowBulkActionButton] = useState(false);
  const [showBulkDeleteModal, setShowBulkDeleteModal] = useState(false);
  const [selectedRows, setSelectedRows] = useState(0);
  const [selectedIds, setSelectedIds] = useState([]);
  const [typeId, setTypeId] = useState("");
  const [formData, setFormData] = useState({
    type_name: "",
    type_code: "",
    sub_type: "",
    typeId: "",
  });

  const getType = async () => {
    try {
      const { Types } = endpoints;
      const response = await PrivateServer.getData(Types?.view)
  
      if(response?.data) {
        setTypeData([...new Set(response?.data?.map((x: any) => ({ ...x, key: x?.id?.toString() })))]);
        setFilteredSearchData([...new Set(response?.data?.map((x: any) => ({ ...x, key: x?.id?.toString() })))]);
      }
    } catch(error) {
      console.log("Error while getting types -- E:", error?.message);
    }
  }
  
const getSubTypes = async () => {
    try {
    const { SubType } = endpoints;
    const response = await PrivateServer.getData(SubType?.view)

    if(response?.data) {
        const _data: any = [...new Set(response?.data?.map((x) => ({ label: x?.sub_type_name, value: x?._id })))]  
        setSubTypes(_data);
    }
    } catch(error) {
    console.log("Error while getting sub-types -- E:", error?.message);
    }
}

  const handleClose = () => {
    setTypeId("")
    setFormData({
        type_name: "",
        type_code: "",
        sub_type: "",
        typeId: "",
    });
  }

  const handleChange = (e, type="", _name="") => {    
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

  const handleDeleteType = async () => {
    try {
      const { Types } = endpoints;
      const response = await PrivateServer?.deleteData(Types?.delete, typeId);
      if(response) getType();
    } catch(err) {
      console.log("Error while deleting category -- E: ", err?.message);
    }
  }

  const handleEditType = (values) => {
    setFormData({ ...formData, ..._.omit(values, ["_id"]), typeId: values?._id });
  }

  const handleAddOrUpdateType = async () => {
    try {
      const { Types } = endpoints;
      const { data } = formData?.typeId !== "" ? await PrivateServer?.patchData(Types.patch, formData?.typeId, formData) : await PrivateServer.postData(Types.create, formData);

      if(data) {
        if(formData?.typeId == "") setFormData({ ...formData, typeId: data?.data?._id })
        getType();
        handleClose();
      }
    } catch(err) {
      console.log("Error while saving category -- E: ", err?.message);
    }
  }

  const columns = [
    {
      title: "Type Code",
      dataIndex: "type_code",
       sorter: (a: any, b: any) =>
        a.type_code.length - b.type_code.length,
      key: "source_name",
      width: "237px",
    },
    {
      title: "Type Name",
      dataIndex: "type_name",
       sorter: (a: any, b: any) =>
        a.type_name.length - b.type_name.length,
      key: "type_name",
      width: "235px",
    },
    {
      title: "Sub Type",
      dataIndex: "sub_type",
       sorter: (a: any, b: any) =>
        a.sub_type.length - b.sub_type.length,
      key: "sub_type",
      width: "235px",
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
      dataIndex: "groupId",
      sorter: (a: any, b: any) => a.secondary_phone.length - b.secondary_phone.length,
      render: (text: any, record: any) => (
        <h2 className="d-flex align-items-center">
          <Link to={route.companies} className="d-flex flex-column">
          {record?.groupId?.group_manager?.username}
            <span className="text-default">{record?.groupId?.group_manager?.team_leader?.email}</span>
          </Link>
        </h2>
      ),
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      width: "90px",
      render: (text: any, record: any) => (
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
              data-bs-toggle="modal"
              data-bs-target="#edit_source"
              onClick={() => handleEditType(record)}
            >
              <i className="ti ti-edit text-blue" /> Edit
            </Link>)}
            {values?.permissions?.includes('delete') && (<Link
              className="dropdown-item"
              to="#"
              data-bs-toggle="modal"
              data-bs-target="#delete_source"
              onClick={() => setTypeId(record?._id)}
            >
              <i className="ti ti-trash text-danger" /> Delete
            </Link>)}
          </div>
        </div>
      ),
    },
  ];

  useEffect(() => {
    getType();
    getSubTypes();
  }, [])

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
    const { Types } = endpoints;
    const deleted = await PrivateServer.deleteBulkData(Types?.delete_bulk, selectedIds)
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
                    Types<span className="count-title">{typeData?.length}</span>
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
                        placeholder="Search Types"
                        onChange={handleSearch}
                      />
                    </div>
                  </div>
                  <div className="col-sm-8">
                    <div className="text-sm-end">
                      {values?.permissions?.includes('create') && (<Link
                        to="#"
                        className="btn btn-primary "
                        data-bs-toggle="modal"
                        data-bs-target="#add_source"
                      >
                        <i className="ti ti-square-rounded-plus me-2" />
                        Add New Type
                      </Link>)}
                    </div>
                  </div>
                </div>
                {/* /Search */}
              </div>
              <div className="card-body">
                {/* Contact List */}
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
                <div className="table-responsive custom-table">
                <Table columns={columns} dataSource={searchTerm != "" ? searchData : typeData} handleBulkAction={handleBulkOperation} />
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

    {/* Add New Type */}
    <div className="modal fade" id="add_source" role="dialog">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Add New Type</h5>
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
                  Type Code <span className="text-danger">*</span>
                </label>
                <input type="text" name="type_code" value={formData?.type_code} onChange={handleChange} className="form-control" />
              </div>
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <label className="col-form-label">
                  Type Name <span className="text-danger">*</span>
                </label>
                <input type="text" name="type_name" value={formData?.type_name} onChange={handleChange} className="form-control" />
              </div>
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <label className="col-form-label">
                  Sub Type <span className="text-danger">*</span>
                </label>
                <Select
                    name="sub_type"
                    onChange={(value) => handleChange(value, "select", "sub_type")}
                    value={{ label: subTypes?.find((x: any) => x?.label == formData?.sub_type)?.label, value: formData?.sub_type }}
                    className="select2" 
                    classNamePrefix="react-select"
                    options={subTypes}
                    placeholder="Choose"
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
                <button type="button" data-bs-dismiss="modal" onClick={handleAddOrUpdateType} className="btn btn-primary">
                  Create
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
    {/* /Add New Type */}
    
    {/* Edit Type */}
    <div className="modal fade" id="edit_source" role="dialog">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Edit Type</h5>
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
                  Type Code <span className="text-danger">*</span>
                </label>
                <input type="text" name="type_code" value={formData?.type_code} onChange={handleChange} className="form-control" />
              </div>
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <label className="col-form-label">
                  Type Name <span className="text-danger">*</span>
                </label>
                <input type="text" name="type_name" value={formData?.type_name} onChange={handleChange} className="form-control" />
              </div>
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <label className="col-form-label">
                  Sub Type <span className="text-danger">*</span>
                </label>
                <Select
                    name="sub_type"
                    onChange={(value) => handleChange(value, "select", "sub_type")}
                    value={{ label: subTypes?.find((x: any) => x?.label == formData?.sub_type)?.label, value: formData?.sub_type }}
                    className="select2" 
                    classNamePrefix="react-select"
                    options={subTypes}
                    placeholder="Choose"
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
                <button type="button" data-bs-dismiss="modal" onClick={handleAddOrUpdateType} className="btn btn-primary">
                  Update
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
    {/* /Edit Type */}
    
    {/* Delete Type */}
    <div className="modal fade" id="delete_source" role="dialog">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-body">
            <div className="text-center">
              <div className="avatar avatar-xl bg-danger-light rounded-circle mb-3">
                <i className="ti ti-trash-x fs-36 text-danger" />
              </div>
              <h4 className="mb-2">Remove Type?</h4>
              <p className="mb-0">AAre you sure you want to remove it.</p>
              <div className="d-flex align-items-center justify-content-center mt-4">
                <Link
                  to="#"
                  className="btn btn-light me-2"
                  data-bs-dismiss="modal"
                >
                  Cancel
                </Link>
                <Link to="#" data-bs-dismiss="modal" className="btn btn-danger" onClick={handleDeleteType}>
                  Yes, Delete it
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    {/* /Delete Type */}
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

export default ProductType;
