import React from "react";
import { Link } from "react-router-dom";
import { all_routes } from "../../router/all_routes";
import CollapseHeader from "../../../core/common/collapse-header";
const route = all_routes;
const BanIpAddress = () => {
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
                        className="nav-link px-0"
                      >
                        <i className="ti ti-world-cog" /> Website Settings
                      </Link>
                    </li>
                    <li className="nav-item me-3">
                      <Link
                        to={route.invoiceSettings}
                        className="nav-link px-0"
                      >
                        <i className="ti ti-apps" /> App Settings
                      </Link>
                    </li>
                    <li className="nav-item me-3">
                      <Link to={route.emailSettings} className="nav-link px-0">
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
                      <Link to={route.storage} className="nav-link px-0 active">
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
          <h4 className="fw-semibold mb-3">Other Settings</h4>
          <div className="list-group list-group-flush settings-sidebar">
            <Link to={route.storage} className="fw-medium">
              Storage
            </Link>
            <Link to={route.banIpAddrress} className="fw-medium active">
              Ban IP Address
            </Link>
          </div>
        </div>
      </div>
    </div>
    {/* /Settings Sidebar */}
  </div>
  <div className="col-xl-9 col-lg-12">
    {/* Settings Info */}
    <div className="card">
      <div className="card-body">
        <div className="d-flex align-items-center justify-content-between mb-4">
          <h4 className="fs-20">Ban IP Address</h4>
          <Link
            to="#"
            className="btn btn-icon btn-sm border"
            data-bs-toggle="modal"
            data-bs-target="#add_ip"
          >
            <i className="ti ti-plus" />
          </Link>
        </div>
        <div className="row">
          {/* Ban Ip Box */}
          <div className="col-xxl-4 col-sm-6">
            <div className="border rounded d-flex align-items-center justify-content-between mb-4 p-3">
              <div className="d-flex align-items-center">
                <Link
                  to="#;"
                  className="me-2 text-default"
                  data-bs-toggle="tooltip"
                  data-bs-placement="top"
                  data-bs-original-title="Temporarily block to protect user accounts from internet fraudsters."
                >
                  <i className="ti ti-info-circle-filled" />
                </Link>
                <p>198.120.16.01</p>
              </div>
              <div className="dropdown table-action">
                <Link
                  to="#"
                  className="action-icon bg-white"
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
                    data-bs-target="#edit_ip"
                  >
                    <i className="fa-solid fa-pencil text-blue" /> Edit
                  </Link>
                  <Link
                    className="dropdown-item"
                    to="#"
                    data-bs-toggle="modal"
                    data-bs-target="#delete_ip"
                  >
                    <i className="fa-regular fa-trash-can text-danger" /> Delete
                  </Link>
                </div>
              </div>
            </div>
          </div>
          {/* /Ban Ip Box */}
          {/* Ban Ip Box */}
          <div className="col-xxl-4 col-sm-6">
            <div className="border rounded d-flex align-items-center justify-content-between mb-4 p-3">
              <div className="d-flex align-items-center">
                <Link
                  to="#;"
                  className="me-2 text-default"
                  data-bs-toggle="tooltip"
                  data-bs-placement="top"
                  data-bs-original-title="Temporarily block to protect user accounts from internet fraudsters."
                >
                  <i className="ti ti-info-circle-filled" />
                </Link>
                <p>198.120.23.56</p>
              </div>
              <div className="dropdown table-action">
                <Link
                  to="#"
                  className="action-icon bg-white"
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
                    data-bs-target="#edit_ip"
                  >
                    <i className="fa-solid fa-pencil text-blue" /> Edit
                  </Link>
                  <Link
                    className="dropdown-item"
                    to="#"
                    data-bs-toggle="modal"
                    data-bs-target="#delete_ip"
                  >
                    <i className="fa-regular fa-trash-can text-danger" /> Delete
                  </Link>
                </div>
              </div>
            </div>
          </div>
          {/* /Ban Ip Box */}
          {/* Ban Ip Box */}
          <div className="col-xxl-4 col-sm-6">
            <div className="border rounded d-flex align-items-center justify-content-between mb-4 p-3">
              <div className="d-flex align-items-center">
                <Link
                  to="#;"
                  className="me-2 text-default"
                  data-bs-toggle="tooltip"
                  data-bs-placement="top"
                  data-bs-original-title="Temporarily block to protect user accounts from internet fraudsters."
                >
                  <i className="ti ti-info-circle-filled" />
                </Link>
                <p>198.132.57.12</p>
              </div>
              <div className="dropdown table-action">
                <Link
                  to="#"
                  className="action-icon bg-white"
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
                    data-bs-target="#edit_ip"
                  >
                    <i className="fa-solid fa-pencil text-blue" /> Edit
                  </Link>
                  <Link
                    className="dropdown-item"
                    to="#"
                    data-bs-toggle="modal"
                    data-bs-target="#delete_ip"
                  >
                    <i className="fa-regular fa-trash-can text-danger" /> Delete
                  </Link>
                </div>
              </div>
            </div>
          </div>
          {/* /Ban Ip Box */}
          {/* Ban Ip Box */}
          <div className="col-xxl-4 col-sm-6">
            <div className="border rounded d-flex align-items-center justify-content-between mb-4 p-3">
              <div className="d-flex align-items-center">
                <Link
                  to="#;"
                  className="me-2 text-default"
                  data-bs-toggle="tooltip"
                  data-bs-placement="top"
                  data-bs-original-title="Temporarily block to protect user accounts from internet fraudsters."
                >
                  <i className="ti ti-info-circle-filled" />
                </Link>
                <p>198.120.32.01</p>
              </div>
              <div className="dropdown table-action">
                <Link
                  to="#"
                  className="action-icon bg-white"
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
                    data-bs-target="#edit_ip"
                  >
                    <i className="fa-solid fa-pencil text-blue" /> Edit
                  </Link>
                  <Link
                    className="dropdown-item"
                    to="#"
                    data-bs-toggle="modal"
                    data-bs-target="#delete_ip"
                  >
                    <i className="fa-regular fa-trash-can text-danger" /> Delete
                  </Link>
                </div>
              </div>
            </div>
          </div>
          {/* /Ban Ip Box */}
          {/* Ban Ip Box */}
          <div className="col-xxl-4 col-sm-6">
            <div className="border rounded d-flex align-items-center justify-content-between mb-4 p-3">
              <div className="d-flex align-items-center">
                <Link
                  to="#;"
                  className="me-2 text-default"
                  data-bs-toggle="tooltip"
                  data-bs-placement="top"
                  data-bs-original-title="Temporarily block to protect user accounts from internet fraudsters."
                >
                  <i className="ti ti-info-circle-filled" />
                </Link>
                <p>198.120.32.25</p>
              </div>
              <div className="dropdown table-action">
                <Link
                  to="#"
                  className="action-icon bg-white"
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
                    data-bs-target="#edit_ip"
                  >
                    <i className="fa-solid fa-pencil text-blue" /> Edit
                  </Link>
                  <Link
                    className="dropdown-item"
                    to="#"
                    data-bs-toggle="modal"
                    data-bs-target="#delete_ip"
                  >
                    <i className="fa-regular fa-trash-can text-danger" /> Delete
                  </Link>
                </div>
              </div>
            </div>
          </div>
          {/* /Ban Ip Box */}
        </div>
        <div className="d-flex align-items-center">
          <Link to="#" className="btn btn-light me-2">
            Cancel
          </Link>
          <button type="button" className="btn btn-primary">
            Save Changes
          </button>
        </div>
      </div>
    </div>
    {/* /Settings Info */}
  </div>
</div>

            </div>
          </div>
        </div>
      </div>
      {/* /Page Wrapper */}
      <>
  {/* Add Ban IP Address */}
  <div className="modal custom-modal fade" id="add_ip" role="dialog">
    <div className="modal-dialog modal-dialog-centered">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">Add Ban IP Address</h5>
          <div className="d-flex align-items-center mod-toggle">
            <div className="status-toggle">
              <input
                type="checkbox"
                id="toggle"
                className="check"
                defaultChecked
              />
              <label htmlFor="toggle" className="checktoggle" />
            </div>
            <button
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            >
              <i className="ti ti-x" />
            </button>
          </div>
        </div>
        <div className="modal-body">
          <form >
            <div className="mb-3">
              <label className="col-form-label">
                IP Address <span className="text-danger">*</span>
              </label>
              <input type="text" className="form-control" />
            </div>
            <div className="mb-3">
              <label className="col-form-label">Reason For Ban</label>
              <textarea className="form-control" rows={4} defaultValue={""} />
            </div>
            <div className="modal-btn">
              <Link to="#" className="btn btn-light" data-bs-dismiss="modal">
                Cancel
              </Link>
              <button type="button" data-bs-dismiss="modal" className="btn btn-primary">
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
  {/* /Add Ban IP Address */}
  {/* Edit Ban IP Address */}
  <div className="modal custom-modal fade" id="edit_ip" role="dialog">
    <div className="modal-dialog modal-dialog-centered">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">Edit Ban IP Address</h5>
          <div className="d-flex align-items-center mod-toggle">
            <div className="status-toggle">
              <input
                type="checkbox"
                id="toggle1"
                className="check"
                defaultChecked
              />
              <label htmlFor="toggle1" className="checktoggle" />
            </div>
            <button
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            >
              <i className="ti ti-x" />
            </button>
          </div>
        </div>
        <div className="modal-body">
          <form >
            <div className="mb-3">
              <label className="col-form-label">
                IP Address <span className="text-danger">*</span>
              </label>
              <input type="text" className="form-control" />
            </div>
            <div className="mb-3">
              <label className="col-form-label">Reason For Ban</label>
              <textarea className="form-control" rows={4} defaultValue={""} />
            </div>
            <div className="modal-btn">
              <Link to="#" className="btn btn-light" data-bs-dismiss="modal">
                Cancel
              </Link>
              <button type="button" data-bs-dismiss="modal" className="btn btn-primary">
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
  {/* /Edit Ban IP Address */}
  {/* Delete IP Address */}
  <div className="modal custom-modal fade" id="delete_ip" role="dialog">
    <div className="modal-dialog modal-dialog-centered">
      <div className="modal-content">
        <div className="modal-header border-0 m-0 justify-content-end">
          <button
            className="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          >
            <i className="ti ti-x" />
          </button>
        </div>
        <div className="modal-body">
          <form >
            <div className="success-message text-center">
              <div className="success-popup-icon">
                <i className="ti ti-trash-x" />
              </div>
              <h3>Remove IP Address?</h3>
              <p>Are you sure you want to remove it.</p>
              <div className="col-lg-12 text-center modal-btn">
                <Link to="#" className="btn btn-light" data-bs-dismiss="modal">
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
  {/* /Delete IP Address */}
</>

    </div>
  );
};

export default BanIpAddress;
