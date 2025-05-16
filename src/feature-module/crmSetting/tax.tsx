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

const Tax = () => {
  const { values } = useAuth()
  const [taxData, setTaxData] = useState([]);
  const [taxId, setTaxId] = useState("");
  const [formData, setFormData] = useState({
    tax_name: "",
    tax_percentage: "",
    taxId: "",
  });

  const getTaxes = async () => {
    try {
      const { Tax } = endpoints;
      const response = await PrivateServer.getData(Tax?.view)
  
      console.log("data -- ", response)
      if(response?.data) setTaxData(response?.data);
    } catch(error) {
      console.log("Error while getting sub sub types -- E:", error?.message);
    }
  }

  const handleClose = () => {
    setTaxId("")
    setFormData({
        tax_name: "",
        tax_percentage: "",
        taxId: "",
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

  const handleDeleteTax = async () => {
    try {
      const { Tax } = endpoints;
      const response = await PrivateServer?.deleteData(Tax?.delete, taxId);
      if(response) getTaxes();
    } catch(err) {
      console.log("Error while deleting tax -- E: ", err?.message);
    }
  }

  const handleEditTax = (values) => {
    console.log("Edit sub tax clicked -- ", values);
    setFormData({ ...formData, ..._.omit(values, ["_id"]), taxId: values?._id });
  }

  const handleAddOrUpdateTax = async () => {
    try {
      const { Tax } = endpoints;
      const { status, data } = formData?.taxId !== "" ? await PrivateServer?.patchData(Tax.patch, formData?.taxId, formData) : await PrivateServer.postData(Tax.create, formData);

      if(status == 200) {
        if(formData?.taxId == "") setFormData({ ...formData, taxId: data?.data?._id })
        getTaxes();
      }
    } catch(err) {
      console.log("Error while saving sub tax -- E: ", err?.message);
    }
  }

  const columns = [
    {
      title: "Tax Name",
      dataIndex: "tax_name",
       sorter: (a: any, b: any) =>
        a.tax_name.length - b.tax_name.length,
      key: "tax_name",
      width: "237px",
    },
    {
      title: "Tax Percentage",
      dataIndex: "tax_percentage",
       sorter: (a: any, b: any) =>
        a.tax_percentage.length - b.tax_percentage.length,
      key: "tax_percentage",
      width: "237px",
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
              onClick={() => handleEditTax(record)}
            >
              <i className="ti ti-edit text-blue" /> Edit
            </Link>)}
            {values?.permissions?.includes('delete') && (<Link
              className="dropdown-item"
              to="#"
              data-bs-toggle="modal"
              data-bs-target="#delete_source"
              onClick={() => setTaxId(record?._id)}
            >
              <i className="ti ti-trash text-danger" /> Delete
            </Link>)}
          </div>
        </div>
      ),
    },
  ];

  useEffect(() => {
    getTaxes();
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
                    Taxes<span className="count-title">{taxData?.length}</span>
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
                        Add New Tax
                      </Link>)}
                    </div>
                  </div>
                </div>
                {/* /Search */}
              </div>
              <div className="card-body">
                {/* Contact List */}
                <div className="table-responsive custom-table">
                <Table columns={columns} dataSource={taxData} />
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
            <h5 className="modal-title">Add New Tax</h5>
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
                  Tax Name <span className="text-danger">*</span>
                </label>
                <input type="text" name="tax_name" value={formData?.tax_name} onChange={handleChange} className="form-control" />
              </div>
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <label className="col-form-label">
                  Tax Percentage <span className="text-danger">*</span>
                </label>
                <input type="text" name="tax_percentage" value={formData?.tax_percentage} onChange={handleChange} className="form-control" />
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
                <button type="button" data-bs-dismiss="modal" onClick={handleAddOrUpdateTax} className="btn btn-primary">
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
            <h5 className="modal-title">Edit Sub Type</h5>
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
                  Tax Name <span className="text-danger">*</span>
                </label>
                <input type="text" name="tax_name" value={formData?.tax_name} onChange={handleChange} className="form-control" />
              </div>
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <label className="col-form-label">
                  Tax Percentage <span className="text-danger">*</span>
                </label>
                <input type="text" name="tax_percentage" value={formData?.tax_percentage} onChange={handleChange} className="form-control" />
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
                <button type="button" data-bs-dismiss="modal" onClick={handleAddOrUpdateTax} className="btn btn-primary">
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
              <h4 className="mb-2">Remove Tax?</h4>
              <p className="mb-0">AAre you sure you want to remove it.</p>
              <div className="d-flex align-items-center justify-content-center mt-4">
                <Link
                  to="#"
                  className="btn btn-light me-2"
                  data-bs-dismiss="modal"
                >
                  Cancel
                </Link>
                <Link to="#" data-bs-dismiss="modal" className="btn btn-danger" onClick={handleDeleteTax}>
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

export default Tax;
