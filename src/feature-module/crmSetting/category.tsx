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
import { Modal, Toast, ToastContainer } from "react-bootstrap";

const route = all_routes;

const Category = () => {
  const { values } = useAuth();
  const [categoryData, setCategoryData] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [searchData, setFilteredSearchData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showBulkActionButton, setShowBulkActionButton] = useState(false);
  const [showBulkDeleteModal, setShowBulkDeleteModal] = useState(false);
  const [selectedRows, setSelectedRows] = useState(0);
  const [selectedIds, setSelectedIds] = useState([]);
  const [categoryId, setcategoryId] = useState("");
  const [formData, setFormData] = useState({
    category_name: "",
    category_code: "",
    sub_category: "",
    categoryId: "",
  });
  const [error, setError] = useState({
    type: "primary",
    message: ""
  });
  const [showToast, setShowToast] = useState(false);

  const getCategory = async () => {
    try {
      const { Categories } = endpoints;
      const response = await PrivateServer.getData(Categories?.view)
  
      if(response?.data) {
        setShowToast(true);
        setError({ type: "success", message: `(${response?.data?.length}) Categories found` })
        setCategoryData([...new Set(response?.data?.map((x: any) => ({ ...x, key: x?.id?.toString() })))]);
        setFilteredSearchData([...new Set(response?.data?.map((x: any) => ({ ...x, key: x?.id?.toString() })))])
      }
    } catch(error) {
      setShowToast(true);
      setError({ type: "danger", message: `No Categories found` })
      console.log("Error while getting categories -- E:", error?.message);
    }
  }
  
const getSubCategories = async () => {
    try {
    const { SubCategory } = endpoints;
    const response = await PrivateServer.getData(SubCategory?.view)

    if(response?.data) {
        const _data: any = [...new Set(response?.data?.map((x) => ({ label: x?.sub_category_name, value: x?._id })))]  
        setSubCategories(_data);
    }
    } catch(error) {
      console.log("Error while getting sub-category -- E:", error?.message);
    }
}

  const handleClose = () => {
    setcategoryId("")
    setFormData({
        category_name: "",
        category_code: "",
        sub_category: "",
        categoryId: "",
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

  const handleDeleteCategory = async () => {
    try {
      const { Categories } = endpoints;
      const response = await PrivateServer?.deleteData(Categories?.delete, categoryId);
      if(response) getCategory();
      setShowToast(true);
      setError({ type: "danger", message: "deleted successfully" })
    } catch(err) {
      setShowToast(true);
      setError({ type: "danger", message: err?.message })
      console.log("Error while deleting category -- E: ", err?.message);
    }
  }

  const handleEditCategory = (values) => {
    setFormData({ ...formData, ..._.omit(values, ["_id"]), categoryId: values?._id });
  }

  const handleAddOrUpdateCategory = async () => {
    try {
      const { Categories } = endpoints;
      const { data } = formData?.categoryId !== "" ? await PrivateServer?.patchData(Categories.patch, formData?.categoryId, formData) : await PrivateServer.postData(Categories.create, formData);

      if(data) {
        setShowToast(true);
        setError({ type: "danger", message: `Category ${formData?.categoryId ? "updated" : "added"}` })
        if(formData?.categoryId == "") setFormData({ ...formData, categoryId: data?.data?._id })
        getCategory();
        handleClose();
      }
    } catch(err) {
      setShowToast(true);
      setError({ type: "danger", message: err?.message })
      console.log("Error while saving category -- E: ", err?.message);
    }
  }

  const columns = [
    {
      title: "Category Code",
      dataIndex: "category_code",
       sorter: (a: any, b: any) =>
        a.category_code.length - b.category_code.length,
      key: "source_name",
      width: "237px",
    },
    {
      title: "Category Name",
      dataIndex: "category_name",
      sorter: (a: any, b: any) =>
        a.category_name.length - b.category_name.length,
      key: "category_name",
      width: "235px",
    },
    {
      title: "Sub Category",
      dataIndex: "sub_category",
       sorter: (a: any, b: any) =>
        a.sub_category.length - b.sub_category.length,
      key: "source_name",
      width: "237px",
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
            <span className="text-default">{record?.groupId?.group_manager?.email}</span>
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
              onClick={() => handleEditCategory(record)}
            >
              <i className="ti ti-edit text-blue" /> Edit
            </Link>)}
            {values?.permissions?.includes('delete') && (<Link
              className="dropdown-item"
              to="#"
              data-bs-toggle="modal"
              data-bs-target="#delete_source"
              onClick={() => setcategoryId(record?._id)}
            >
              <i className="ti ti-trash text-danger" /> Delete
            </Link>)}
          </div>
        </div>
      ),
    },
  ];

  useEffect(() => {
    getCategory();
    getSubCategories();
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
    const { Categories } = endpoints;
    const deleted = await PrivateServer.deleteBulkData(Categories?.delete_bulk, selectedIds)
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
                    Categories<span className="count-title">{categoryData?.length}</span>
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
                        placeholder="Search Category"
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
                        Add New Category
                      </Link>)}
                    </div>
                  </div>
                </div>
                {/* /Search */}
              </div>
              <div className="card-body">
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
                {/* Contact List */}
                <div className="table-responsive custom-table">
                <Table columns={columns} dataSource={searchTerm != "" ? searchData : categoryData} handleBulkAction={handleBulkOperation} />
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
            <h5 className="modal-title">Add New Category</h5>
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
                  Category Code <span className="text-danger">*</span>
                </label>
                <input type="text" name="category_code" value={formData?.category_code} onChange={handleChange} className="form-control" />
              </div>
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <label className="col-form-label">
                  Category Name <span className="text-danger">*</span>
                </label>
                <input type="text" name="category_name" value={formData?.category_name} onChange={handleChange} className="form-control" />
              </div>
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <label className="col-form-label">
                  Sub Category <span className="text-danger">*</span>
                </label>
                <Select
                    name="sub_category"
                    onChange={(value) => handleChange(value, "select", "sub_category")}
                    value={{ label: subCategories?.find((x: any) => x?.label == formData?.sub_category)?.label, value: formData?.sub_category }}
                    className="select2" 
                    classNamePrefix="react-select"
                    options={subCategories}
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
                <button type="button" data-bs-dismiss="modal" onClick={handleAddOrUpdateCategory} className="btn btn-primary">
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
            <h5 className="modal-title">Edit Category</h5>
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
                  Category Code <span className="text-danger">*</span>
                </label>
                <input type="text" name="category_code" value={formData?.category_code} onChange={handleChange} className="form-control" />
              </div>
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <label className="col-form-label">
                  Category Name <span className="text-danger">*</span>
                </label>
                <input type="text" name="category_name" value={formData?.category_name} onChange={handleChange} className="form-control" />
              </div>
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <label className="col-form-label">
                  Sub Category <span className="text-danger">*</span>
                </label>
                <Select
                    name="sub_category"
                    onChange={(value) => handleChange(value, "select", "sub_category")}
                    value={{ label: subCategories?.find((x: any) => x?.label == formData?.sub_category)?.label, value: formData?.sub_category }}
                    className="select2" 
                    classNamePrefix="react-select"
                    options={subCategories}
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
                <button type="button" data-bs-dismiss="modal" onClick={handleAddOrUpdateCategory} className="btn btn-primary">
                  Update
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
              <h4 className="mb-2">Remove Category?</h4>
              <p className="mb-0">AAre you sure you want to remove it.</p>
              <div className="d-flex align-items-center justify-content-center mt-4">
                <Link
                  to="#"
                  className="btn btn-light me-2"
                  data-bs-dismiss="modal"
                >
                  Cancel
                </Link>
                <Link to="#" data-bs-dismiss="modal" className="btn btn-danger" onClick={handleDeleteCategory}>
                  Yes, Delete it
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    {/* /Delete Category */}
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

export default Category;
