import React from "react";
import { Link } from "react-router-dom";
import { all_routes } from "../../router/all_routes";
import CollapseHeader from "../../../core/common/collapse-header";
import Select from "react-select";

const CustomFields = () => {
  const route = all_routes;
  const fileData = [
    { value: "Inventory", label: "1" },
    { value: "Expense", label: "2" },
    { value: "Product", label: "3" },
  ];

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
                    <h4 className="page-title">Settings</h4>
                  </div>
                  <div className="col-4 text-end">
                    <div className="head-icons">
                      <CollapseHeader />
                    </div>
                  </div>
                </div>
              </div>
              {/* /Page Header */}
              {/* Settings Menu */}
              <div className="card">
                <div className="card-body pb-0 pt-2">
                <ul className="nav nav-tabs nav-tabs-bottom">
                    <li className="nav-item me-3">
                      <Link to={route.profile} className="nav-link px-0 ">
                        <i className="ti ti-settings-cog" /> General Settings
                      </Link>
                    </li>
                    <li className="nav-item me-3">
                      <Link
                        to={route.companySettings}
                        className="nav-link px-0 "
                      >
                        <i className="ti ti-world-cog" /> Website Settings
                      </Link>
                    </li>
                    <li className="nav-item me-3">
                      <Link
                        to={route.invoiceSettings}
                        className="nav-link px-0 active"
                      >
                        <i className="ti ti-apps" /> App Settings
                      </Link>
                    </li>
                    <li className="nav-item me-3">
                      <Link to={route.emailSettings} className="nav-link px-0 ">
                        <i className="ti ti-device-laptop" /> System Settings
                      </Link>
                    </li>
                    <li className="nav-item me-3">
                      <Link
                        to={route.paymentGateways}
                        className="nav-link px-0"
                      >
                        <i className="ti ti-moneybag" /> Financial Settings
                      </Link>
                    </li>
                    <li className="nav-item ">
                      <Link to={route.storage} className="nav-link px-0 ">
                        <i className="ti ti-flag-cog" /> Other Settings
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
              {/* /Settings Menu */}
              <div className="row">
  <div className="col-xl-3 col-lg-12 theiaStickySidebar">
    {/* Settings Sidebar */}
    <div className="card">
      <div className="card-body">
        <div className="settings-sidebar">
          <h4 className="fw-semibold mb-3">App Settings</h4>
          <div className="list-group list-group-flush settings-sidebar">
            <Link to={route.invoiceSettings} className="fw-medium">
              Invoice Settings
            </Link>
            <Link to={route.printers} className="fw-medium">
              Printer
            </Link>
            <Link to={route.customFields} className="fw-medium active">
              Custom Fields
            </Link>
          </div>
        </div>
      </div>
    </div>
    {/* /Settings Sidebar */}
  </div>
  <div className="col-xl-9 col-lg-12">
    {/* Custom Fields */}
    <div className="card">
      <div className="card-body">
        <div className="d-flex align-items-center justify-content-between mb-3">
          <h4>Custom Fields</h4>
          <Link
            to="#"
            className="btn btn-icon btn-sm border btn-outline-light"
            data-bs-toggle="modal"
            data-bs-target="#add_fields"
          >
            <i className="ti ti-plus" />
          </Link>
        </div>
        <form >
          {/* Expense */}
          <div className="d-flex align-items-center justify-content-between border-bottom mb-3 pb-3">
            <div>
              <h5 className="fw-semibold mb-1">Expense</h5>
              <p>Shows the fields of Expense</p>
            </div>
            <div className="dropdown">
              <Link
                to="#"
                className="btn btn-icon btn-sm border btn-outline-light d-inline-flex align-items-center justify-content-center"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <i className="fa fa-ellipsis-v" />
              </Link>
              <div className="dropdown-menu dropdown-menu-right">
                <Link
                  className="dropdown-item d-flex align-items-center"
                  to="#"
                  data-bs-toggle="modal"
                  data-bs-target="#edit_fields"
                >
                  <i className="fa-solid fa-pencil text-blue me-2" />
                  Edit
                </Link>
                <Link
                  className="dropdown-item d-flex align-items-center"
                  to="#"
                  data-bs-toggle="modal"
                  data-bs-target="#delete_fields"
                >
                  <i className="fa-regular fa-trash-can text-danger me-2" />
                  Delete
                </Link>
              </div>
            </div>
          </div>
          <div className="border-bottom mb-3">
            <div className="row">
              <div className="col-md-4 col-sm-6">
                <div className="mb-3">
                  <label className="col-form-label">Label</label>
                  <input
                    type="text"
                    className="form-control"
                    defaultValue="Name"
                  />
                </div>
              </div>
              <div className="col-md-4 col-sm-6">
                <div className="mb-3">
                  <label className="col-form-label">Type</label>
                  <input
                    type="text"
                    className="form-control"
                    defaultValue="Text"
                  />
                </div>
              </div>
              <div className="col-md-4 col-sm-6">
                <div className="mb-3">
                  <label className="col-form-label">Default Value</label>
                  <input
                    type="text"
                    className="form-control"
                    defaultValue="Name"
                  />
                </div>
              </div>
              <div className="col-md-4 col-sm-6">
                <div className="mb-3">
                  <label className="col-form-label">Required</label>
                  <input
                    type="text"
                    className="form-control"
                    defaultValue="Required"
                  />
                </div>
              </div>
              <div className="col-md-4 col-sm-6">
                <div className="mb-3">
                  <label className="col-form-label">Status</label>
                  <input
                    type="text"
                    className="form-control"
                    defaultValue="Active"
                  />
                </div>
              </div>
            </div>
          </div>
          {/* /Expense */}
          {/* Transaction */}
          <div className="d-flex align-items-center justify-content-between border-bottom mb-3 pb-3">
            <div>
              <h5 className="fw-semibold mb-1">Transaction</h5>
              <p>Shows the fields of Transaction</p>
            </div>
            <div className="dropdown">
              <Link
                to="#"
                className="btn btn-icon btn-sm border btn-outline-light d-inline-flex align-items-center justify-content-center"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <i className="fa fa-ellipsis-v" />
              </Link>
              <div className="dropdown-menu dropdown-menu-right">
                <Link
                  className="dropdown-item d-flex align-items-center"
                  to="#"
                  data-bs-toggle="modal"
                  data-bs-target="#edit_fields"
                >
                  <i className="fa-solid fa-pencil text-blue me-2" />
                  Edit
                </Link>
                <Link
                  className="dropdown-item d-flex align-items-center"
                  to="#"
                  data-bs-toggle="modal"
                  data-bs-target="#delete_fields"
                >
                  <i className="fa-regular fa-trash-can text-danger me-2" />
                  Delete
                </Link>
              </div>
            </div>
          </div>
          <div className="mb-0">
            <div className="row">
              <div className="col-md-4 col-sm-6">
                <div className="mb-3">
                  <label className="col-form-label">Label</label>
                  <input
                    type="text"
                    className="form-control"
                    defaultValue="Comment"
                  />
                </div>
              </div>
              <div className="col-md-4 col-sm-6">
                <div className="mb-3">
                  <label className="col-form-label">Type</label>
                  <input
                    type="text"
                    className="form-control"
                    defaultValue="Textarea"
                  />
                </div>
              </div>
              <div className="col-md-4 col-sm-6">
                <div className="mb-3">
                  <label className="col-form-label">Default Value</label>
                  <input
                    type="text"
                    className="form-control"
                    defaultValue="Enter Comments"
                  />
                </div>
              </div>
              <div className="col-md-4 col-sm-6">
                <div className="mb-3">
                  <label className="col-form-label">Required</label>
                  <input
                    type="text"
                    className="form-control"
                    defaultValue="Required"
                  />
                </div>
              </div>
              <div className="col-md-4 col-sm-6">
                <div className="mb-3">
                  <label className="col-form-label">Status</label>
                  <input
                    type="text"
                    className="form-control"
                    defaultValue="Active"
                  />
                </div>
              </div>
            </div>
          </div>
          {/* /Transaction */}
          <div>
            <Link to="#" className="btn btn-light me-2">
              Cancel
            </Link>
            <button type="button" className="btn btn-primary">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
    {/* /Custom Fields */}
  </div>
</div>

            </div>
          </div>
        </div>
      </div>
      {/* /Page Wrapper */}
      <>
  {/* Add Custom Fields */}
  <div className="modal fade" id="add_fields" role="dialog">
    <div className="modal-dialog modal-dialog-centered">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">Add Custom Fields</h5>
          <button
            className="btn-close custom-btn-close border p-1 me-0 text-dark"
            data-bs-dismiss="modal"
            aria-label="Close"
          >
            <i className="ti ti-x" />
          </button>
        </div>
        <form >
          <div className="modal-body">
            <div className="mb-3">
              <label className="col-form-label">
                Custom Fields For <span className="text-danger">*</span>
              </label>
              <Select
                      options={fileData}
                      className="select"
                      placeholder="Select File"
                    />
            </div>
            <div className="mb-3">
              <label className="col-form-label">
                Label <span className="text-danger">*</span>
              </label>
              <input type="text" className="form-control" />
            </div>
            <div className="mb-3">
              <label className="col-form-label">
                Type <span className="text-danger">*</span>
              </label>
              <input type="text" className="form-control" />
            </div>
            <div className="mb-3">
              <label className="col-form-label">Default Value</label>
              <input type="text" className="form-control" />
            </div>
            <div className="mb-3">
              <label className="col-form-label">
                Required <span className="text-danger">*</span>
              </label>
              <input type="text" className="form-control" />
            </div>
            <div className="mb-0">
              <label className="col-form-label">
                Status <span className="text-danger">*</span>
              </label>
              <input type="text" className="form-control" />
            </div>
          </div>
          <div className="modal-footer">
            <div className="d-flex align-items-center">
              <Link
                to="#"
                className="btn btn-light me-2"
                data-bs-dismiss="modal"
              >
                Cancel
              </Link>
              <button type="button" data-bs-dismiss="modal" className="btn btn-primary">
                Save
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
  {/* /Add Custom Fields */}
  {/* Edit Custom Fields */}
  <div className="modal fade" id="edit_fields" role="dialog">
    <div className="modal-dialog modal-dialog-centered">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">Edit Custom Fields</h5>
          <button
            className="btn-close custom-btn-close border p-1 me-0 text-dark"
            data-bs-dismiss="modal"
            aria-label="Close"
          >
            <i className="ti ti-x" />
          </button>
        </div>
        <form >
          <div className="modal-body">
            <div className="mb-3">
              <label className="col-form-label">
                Custom Fields For <span className="text-danger">*</span>
              </label>
              <Select
                      options={fileData}
                      defaultValue={fileData[0]}
                      className="select"
                      placeholder="Select File"
                    />
            </div>
            <div className="mb-3">
              <label className="col-form-label">
                Label <span className="text-danger">*</span>
              </label>
              <input type="text" className="form-control" defaultValue="Name" />
            </div>
            <div className="mb-3">
              <label className="col-form-label">
                Type <span className="text-danger">*</span>
              </label>
              <input type="text" className="form-control" defaultValue="Text" />
            </div>
            <div className="mb-3">
              <label className="col-form-label">Default Value</label>
              <input type="text" className="form-control" defaultValue="Name" />
            </div>
            <div className="mb-3">
              <label className="col-form-label">
                Required <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                className="form-control"
                defaultValue="Required"
              />
            </div>
            <div className="mb-0">
              <label className="col-form-label">
                Status <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                className="form-control"
                defaultValue="Active"
              />
            </div>
          </div>
          <div className="modal-footer">
            <div className="d-flex align-items-center">
              <Link
                to="#"
                className="btn btn-light me-2"
                data-bs-dismiss="modal"
              >
                Cancel
              </Link>
              <button type="button" data-bs-dismiss="modal" className="btn btn-primary">
                Save
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
  {/* /Edit Custom Fields */}
  {/* Delete Fields */}
  <div className="modal fade" id="delete_fields" role="dialog">
    <div className="modal-dialog modal-dialog-centered">
      <div className="modal-content">
        <div className="modal-body">
          <form >
            <div className="text-center">
              <div className="avatar avatar-xl bg-danger-light rounded-circle mb-3">
                <i className="ti ti-trash-x fs-36 text-danger" />
              </div>
              <h4 className="mb-2">Remove Field?</h4>
              <p className="mb-0">Are you sure you want to remove it.</p>
              <div className="d-flex align-items-center justify-content-center mt-4">
                <Link
                  to="#"
                  className="btn btn-light me-2"
                  data-bs-dismiss="modal"
                >
                  Cancel
                </Link>
                <button type="button" data-bs-dismiss="modal" className="btn btn-danger">
                  Yes, Delete it
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
  {/* /Delete Fields */}
</>

    </div>
  );
};

export default CustomFields;
