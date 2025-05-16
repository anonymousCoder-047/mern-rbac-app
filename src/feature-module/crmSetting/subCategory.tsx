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

const SubCategory = () => {
  const { values } = useAuth()
  const [subCategoryData, setSubCategoryData] = useState([]);
  const [subCategoryId, setSubCategoryId] = useState("");
  const [formData, setFormData] = useState({
    sub_category_name: "",
    sub_category_code: "",
    subCategoryId: "",
  });

  const getSubCategory = async () => {
    try {
      const { SubCategory } = endpoints;
      const response = await PrivateServer.getData(SubCategory?.view)
  
      console.log("data -- ", response)
      if(response?.data) setSubCategoryData(response?.data);
    } catch(error) {
      console.log("Error while getting sub categories -- E:", error?.message);
    }
  }

  const handleClose = () => {
    setSubCategoryId("")
    setFormData({
        sub_category_name: "",
        sub_category_code: "",
        subCategoryId: "",
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

  const handleDeleteSubCategory = async () => {
    try {
      const { SubCategory } = endpoints;
      const response = await PrivateServer?.deleteData(SubCategory?.delete, subCategoryId);
      if(response) getSubCategory();
    } catch(err) {
      console.log("Error while deleting category -- E: ", err?.message);
    }
  }

  const handleEditSubCategory = (values) => {
    console.log("Edit sub category clicked -- ", values);
    setFormData({ ...formData, ..._.omit(values, ["_id"]), subCategoryId: values?._id });
  }

  const handleAddOrUpdateSubCategory = async () => {
    try {
      const { SubCategory } = endpoints;
      const { status, data } = formData?.subCategoryId !== "" ? await PrivateServer?.patchData(SubCategory.patch, formData?.subCategoryId, formData) : await PrivateServer.postData(SubCategory.create, formData);

      if(status == 200) {
        if(formData?.subCategoryId == "") setFormData({ ...formData, subCategoryId: data?.data?._id })
        getSubCategory();
      }
    } catch(err) {
      console.log("Error while saving sub category -- E: ", err?.message);
    }
  }

  const columns = [
    {
      title: "Sub Category Code",
      dataIndex: "sub_category_code",
       sorter: (a: any, b: any) =>
        a.sub_category_code.length - b.sub_category_code.length,
      key: "source_name",
      width: "237px",
    },
    {
      title: "Sub Category Name",
      dataIndex: "sub_category_name",
       sorter: (a: any, b: any) =>
        a.sub_category_name.length - b.sub_category_name.length,
      key: "sub_category_name",
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
              onClick={() => handleEditSubCategory(record)}
            >
              <i className="ti ti-edit text-blue" /> Edit
            </Link>)}
            {values?.permissions?.includes('delete') && (<Link
              className="dropdown-item"
              to="#"
              data-bs-toggle="modal"
              data-bs-target="#delete_source"
              onClick={() => setSubCategoryId(record?._id)}
            >
              <i className="ti ti-trash text-danger" /> Delete
            </Link>)}
          </div>
        </div>
      ),
    },
  ];

  useEffect(() => {
    getSubCategory();
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
                    Sub Categories<span className="count-title">{subCategoryData?.length}</span>
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
                        Add New Sub Category
                      </Link>)}
                    </div>
                  </div>
                </div>
                {/* /Search */}
              </div>
              <div className="card-body">
                {/* Contact List */}
                <div className="table-responsive custom-table">
                <Table columns={columns} dataSource={subCategoryData} />
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

    {/* Add New Category */}
    <div className="modal fade" id="add_source" role="dialog">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Add New Sub Category</h5>
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
                  Sub Category Code <span className="text-danger">*</span>
                </label>
                <input type="text" name="sub_category_code" value={formData?.sub_category_code} onChange={handleChange} className="form-control" />
              </div>
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <label className="col-form-label">
                  Sub Category Name <span className="text-danger">*</span>
                </label>
                <input type="text" name="sub_category_name" value={formData?.sub_category_name} onChange={handleChange} className="form-control" />
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
                <button type="button" data-bs-dismiss="modal" onClick={handleAddOrUpdateSubCategory} className="btn btn-primary">
                  Create
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
    {/* /Add New Category */}
    
    {/* Edit Category */}
    <div className="modal fade" id="edit_source" role="dialog">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Edit Sub Category</h5>
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
                  Sub Category Code <span className="text-danger">*</span>
                </label>
                <input type="text" name="sub_category_code" value={formData?.sub_category_code} onChange={handleChange} className="form-control" />
              </div>
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <label className="col-form-label">
                  Sub Category Name <span className="text-danger">*</span>
                </label>
                <input type="text" name="sub_category_name" value={formData?.sub_category_name} onChange={handleChange} className="form-control" />
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
                <button type="button" data-bs-dismiss="modal" onClick={handleAddOrUpdateSubCategory} className="btn btn-primary">
                  Save Changes
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
    {/* /Edit Category */}
    
    {/* Delete Category */}
    <div className="modal fade" id="delete_source" role="dialog">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-body">
            <div className="text-center">
              <div className="avatar avatar-xl bg-danger-light rounded-circle mb-3">
                <i className="ti ti-trash-x fs-36 text-danger" />
              </div>
              <h4 className="mb-2">Remove Sub Category?</h4>
              <p className="mb-0">AAre you sure you want to remove it.</p>
              <div className="d-flex align-items-center justify-content-center mt-4">
                <Link
                  to="#"
                  className="btn btn-light me-2"
                  data-bs-dismiss="modal"
                >
                  Cancel
                </Link>
                <Link to="#" data-bs-dismiss="modal" className="btn btn-danger" onClick={handleDeleteSubCategory}>
                  Yes, Delete it
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    {/* /Delete Category */}
  </>
  
  );
};

export default SubCategory;
