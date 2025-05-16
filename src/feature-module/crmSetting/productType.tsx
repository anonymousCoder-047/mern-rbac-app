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

const route = all_routes;

const ProductType = () => {
  const { values } = useAuth();
  const [typeData, setTypeData] = useState([]);
  const [subTypes, setSubTypes] = useState([]);
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
  
      console.log("data -- ", response)
      if(response?.data) setTypeData(response?.data);
    } catch(error) {
      console.log("Error while getting types -- E:", error?.message);
    }
  }
  
const getSubTypes = async () => {
    try {
    const { SubType } = endpoints;
    const response = await PrivateServer.getData(SubType?.view)

    console.log("data -- ", response)
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
      setFormData({ ...formData, [_name]: e?.value });
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
    console.log("Edit category clicked -- ", values);
    setFormData({ ...formData, ..._.omit(values, ["_id"]), typeId: values?._id });
  }

  const handleAddOrUpdateType = async () => {
    try {
      const { Types } = endpoints;
      const { status, data } = formData?.typeId !== "" ? await PrivateServer?.patchData(Types.patch, formData?.typeId, formData) : await PrivateServer.postData(Types.create, formData);

      if(status == 200) {
        if(formData?.typeId == "") setFormData({ ...formData, typeId: data?.data?._id })
        getType();
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
                        placeholder="Search Source"
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
                <div className="table-responsive custom-table">
                <Table columns={columns} dataSource={typeData} />
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
                    value={{ label: subTypes?.find((x: any) => x?.value == formData?.sub_type)?.label, value: formData?.sub_type }}
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
                    value={{ label: subTypes?.find((x: any) => x?.value == formData?.sub_type)?.label, value: formData?.sub_type }}
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
                  Save Changes
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
  </>
  
  );
};

export default ProductType;
