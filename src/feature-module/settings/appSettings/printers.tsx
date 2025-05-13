import React from 'react'
import { Link } from "react-router-dom";
import { all_routes } from '../../router/all_routes';
import CollapseHeader from '../../../core/common/collapse-header';
const route = all_routes;
const Printers = () => {
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
            <Link to={route.printers} className="fw-medium active">
              Printer
            </Link>
            <Link to={route.customFields} className="fw-medium">
              Custom Fields
            </Link>
          </div>
        </div>
      </div>
    </div>
    {/* /Settings Sidebar */}
  </div>
  <div className="col-xl-9 col-lg-12">
    {/* Printers */}
    <div className="card">
      <div className="card-body">
        <div className="d-flex align-items-center justify-content-between mb-3">
          <h4>Printer</h4>
          <Link
            to="#"
            className="btn btn-icon btn-sm border btn-outline-light"
            data-bs-toggle="modal"
            data-bs-target="#add_printer"
          >
            <i className="ti ti-plus" />
          </Link>
        </div>
        <form >
          {/* Hp */}
          <div className="d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom">
            <div>
              <h5 className="fw-semibold mb-1">Hp</h5>
              <p>Shows the details of Hp printers</p>
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
                  className="dropdown-item"
                  to="#"
                  data-bs-toggle="modal"
                  data-bs-target="#edit_printer"
                >
                  <i className="fa-solid fa-pencil text-blue me-1" />
                  Edit
                </Link>
                <Link
                  className="dropdown-item"
                  to="#"
                  data-bs-toggle="modal"
                  data-bs-target="#delete_printer"
                >
                  <i className="fa-regular fa-trash-can text-danger me-1" />
                  Delete
                </Link>
              </div>
            </div>
          </div>
          <div className="border-bottom mb-3">
            <div className="row">
              <div className="col-md-3 col-sm-6">
                <div className="mb-3">
                  <label className="form-label">Printer Name </label>
                  <input
                    type="text"
                    className="form-control"
                    defaultValue="Hp printer"
                  />
                </div>
              </div>
              <div className="col-md-3 col-sm-6">
                <div className="mb-3">
                  <label className="form-label">Connection Type</label>
                  <input
                    type="text"
                    className="form-control"
                    defaultValue="Network"
                  />
                </div>
              </div>
              <div className="col-md-3 col-sm-6">
                <div className="mb-3">
                  <label className="form-label">IP Address</label>
                  <input
                    type="text"
                    className="form-control"
                    defaultValue="192.168.0.1"
                  />
                </div>
              </div>
              <div className="col-md-3 col-sm-6">
                <div className="mb-3">
                  <label className="form-label">Port</label>
                  <input
                    type="text"
                    className="form-control"
                    defaultValue={900}
                  />
                </div>
              </div>
            </div>
          </div>
          {/* /Euro */}
          {/* Epson */}
          <div className="d-flex align-items-center justify-content-between border-bottom mb-3 pb-3">
            <div>
              <h5 className="fw-semibold mb-1">Epson</h5>
              <p>Shows the details of Epson printers</p>
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
                  className="dropdown-item"
                  to="#"
                  data-bs-toggle="modal"
                  data-bs-target="#edit_printer"
                >
                  <i className="fa-solid fa-pencil text-blue me-1" />
                  Edit
                </Link>
                <Link
                  className="dropdown-item"
                  to="#"
                  data-bs-toggle="modal"
                  data-bs-target="#delete_printer"
                >
                  <i className="fa-regular fa-trash-can text-danger me-1" />
                  Delete
                </Link>
              </div>
            </div>
          </div>
          <div className="mb-0">
            <div className="row">
              <div className="col-md-3 col-sm-6">
                <div className="mb-3">
                  <label className="form-label">Printer Name </label>
                  <input
                    type="text"
                    className="form-control"
                    defaultValue="Epson"
                  />
                </div>
              </div>
              <div className="col-md-3 col-sm-6">
                <div className="mb-3">
                  <label className="form-label">Connection Type</label>
                  <input
                    type="text"
                    className="form-control"
                    defaultValue="Network"
                  />
                </div>
              </div>
              <div className="col-md-3 col-sm-6">
                <div className="mb-3">
                  <label className="form-label">IP Address</label>
                  <input
                    type="text"
                    className="form-control"
                    defaultValue="192.168.0.1"
                  />
                </div>
              </div>
              <div className="col-md-3 col-sm-6">
                <div className="mb-3">
                  <label className="form-label">Port</label>
                  <input
                    type="text"
                    className="form-control"
                    defaultValue={900}
                  />
                </div>
              </div>
            </div>
          </div>
          {/* /Epson */}
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
    {/* /Printers */}
  </div>
</div>

          </div>
        </div>
      </div>
    </div>
    {/* /Page Wrapper */}
    <>
  {/* Add Printer */}
  <div className="modal fade" id="add_printer" role="dialog">
    <div className="modal-dialog modal-dialog-centered">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">Add Printer</h5>
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
              <label className="form-label">
                Printer Company <span className="text-danger">*</span>
              </label>
              <input type="text" className="form-control" />
            </div>
            <div className="mb-3">
              <label className="form-label">
                Printer Name <span className="text-danger">*</span>
              </label>
              <input type="text" className="form-control" />
            </div>
            <div className="mb-3">
              <label className="form-label">
                Connection Type <span className="text-danger">*</span>
              </label>
              <input type="text" className="form-control" />
            </div>
            <div className="mb-3">
              <label className="form-label">
                IP Address <span className="text-danger">*</span>
              </label>
              <input type="text" className="form-control" />
            </div>
            <div className="mb-0">
              <label className="form-label">
                Port <span className="text-danger">*</span>
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
  {/* /Add Currency */}
  {/* Edit Printer */}
  <div className="modal fade" id="edit_printer" role="dialog">
    <div className="modal-dialog modal-dialog-centered">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">Edit Printer</h5>
          <button
            className="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          >
            <i className="ti ti-x" />
          </button>
        </div>
        <form >
          <div className="modal-body">
            <div className="mb-3">
              <label className="form-label">
                Printer Company <span className="text-danger">*</span>
              </label>
              <input type="text" className="form-control" defaultValue="Hp" />
            </div>
            <div className="mb-3">
              <label className="form-label">
                Printer Name <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                className="form-control"
                defaultValue="Hp printer"
              />
            </div>
            <div className="mb-3">
              <label className="form-label">
                Connection Type <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                className="form-control"
                defaultValue="Network"
              />
            </div>
            <div className="mb-3">
              <label className="form-label">
                IP Address <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                className="form-control"
                defaultValue="198.162.0.1"
              />
            </div>
            <div className="mb-0">
              <label className="form-label">
                Port <span className="text-danger">*</span>
              </label>
              <input type="text" className="form-control" defaultValue={900} />
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
  {/* /Edit Printer */}
  {/* Delete Printer */}
  <div className="modal fade" id="delete_printer" role="dialog">
    <div className="modal-dialog modal-dialog-centered">
      <div className="modal-content">
        <div className="modal-body">
          <form >
            <div className="text-center">
              <div className="avatar avatar-xl bg-danger-light rounded-circle mb-3">
                <i className="ti ti-trash-x fs-36 text-danger" />
              </div>
              <h4 className="mb-2">Remove Printer?</h4>
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
  {/* /Delete Printer */}
</>

  </div>
  )
}

export default Printers