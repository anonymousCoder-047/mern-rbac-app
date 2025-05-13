import React from "react";
import { Link } from "react-router-dom";
import { all_routes } from "../../router/all_routes";
import CollapseHeader from "../../../core/common/collapse-header";
const route = all_routes;
const Security = () => {
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
                        <Link to={route.profile} className=" active nav-link px-0">
                          <i className="ti ti-settings-cog" /> General Settings
                        </Link>
                      </li>
                      <li  className="nav-item me-3">
                        <Link to={route.companySettings} className='nav-link px-0'>
                          <i className="ti ti-world-cog" /> Website Settings
                        </Link>
                      </li>
                      <li  className="nav-item me-3">
                        <Link to={route.invoiceSettings} className='nav-link px-0'>
                          <i className="ti ti-apps" /> App Settings
                        </Link>
                      </li>
                      <li  className="nav-item me-3">
                        <Link to={route.emailSettings} className='nav-link px-0'>
                          <i className="ti ti-device-laptop" /> System Settings
                        </Link>
                      </li>
                      <li  className="nav-item me-3">
                        <Link to={route.paymentGateways} className='nav-link px-0'>
                          <i className="ti ti-moneybag" /> Financial Settings
                        </Link>
                      </li>
                      <li  className="nav-item ">
                        <Link to={route.storage} className='nav-link px-0'>
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
          <h4 className="fw-semibold mb-3">General Settings</h4>
          <div className="list-group list-group-flush settings-sidebar">
            <Link to={route.profile} className="fw-medium">
              Profile
            </Link>
            <Link to={route.security} className="fw-medium active">
              Security
            </Link>
            <Link to={route.notification} className="fw-medium">
              Notifications
            </Link>
            <Link to={route.connectedApps} className="fw-medium">
              Connected Apps
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
      <div className="card-body pb-0">
        <h4 className="fw-semibold mb-3">Security Settings</h4>
        <div className="row">
          <div className="col-lg-4 col-md-6 d-flex">
            <div className="card border shadow-none flex-fill mb-3">
              <div className="card-body d-flex justify-content-between flex-column">
                <div className="mb-3">
                  <div className="d-flex align-items-center justify-content-between mb-1">
                    <h6 className="fw-semibold">Password</h6>
                  </div>
                  <p>Last Changed 03 Jan 2023, 09:00 AM</p>
                </div>
                <div>
                  <Link
                    to="#"
                    className="btn btn-light"
                    data-bs-toggle="modal"
                    data-bs-target="#change_password"
                  >
                    Change Password
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-6 d-flex">
            <div className="card border shadow-none flex-fill mb-3">
              <div className="card-body d-flex justify-content-between flex-column">
                <div className="mb-3">
                  <div className="d-flex align-items-center justify-content-between mb-1">
                    <h6 className="fw-semibold">Two Factor</h6>
                    <div className="form-check form-switch">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        role="switch"
                         defaultChecked
                      />
                    </div>
                  </div>
                  <p>Receive codes via SMS or email every time you login</p>
                </div>
                <div>
                  <Link
                    to="#"
                    className="btn btn-primary"
                    data-bs-toggle="modal"
                    data-bs-target="#delete_two_factor"
                  >
                    Delete Account
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-6 d-flex">
            <div className="card border shadow-none flex-fill mb-3">
              <div className="card-body d-flex justify-content-between flex-column">
                <div className="mb-3">
                  <div className="d-flex align-items-center justify-content-between mb-1">
                    <h6 className="fw-semibold">Google Authenticator</h6>
                    <div className="form-check form-switch">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        role="switch"
                         defaultChecked
                      />
                    </div>
                  </div>
                  <p>
                    Google Authenticator adds an extra layer of security to your
                    online accounts by adding a second step of verification when
                    you sign in.
                  </p>
                </div>
                <div>
                  <span className="badge badge-soft-success">Connected</span>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-6 d-flex">
            <div className="card border shadow-none flex-fill mb-3">
              <div className="card-body d-flex justify-content-between flex-column">
                <div className="mb-3">
                  <div className="d-flex align-items-center justify-content-between mb-1">
                    <h6 className="fw-semibold">
                      Phone Number Verification
                      <i className="ti ti-square-rounded-check-filled text-success ms-1" />
                    </h6>
                  </div>
                  <p>
                    Verified Mobile Number :{" "}
                    <span className="text-gray-9">+99264710583</span>
                  </p>
                </div>
                <div className="d-flex align-items-center">
                  <Link
                    to="#"
                    className="btn btn-light me-3"
                    data-bs-toggle="modal"
                    data-bs-target="#change_phone_number"
                  >
                    Change
                  </Link>
                  <Link
                    to="#"
                    className="link-danger fw-semibold"
                  >
                    Remove
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-6 d-flex">
            <div className="card border shadow-none flex-fill mb-3">
              <div className="card-body d-flex justify-content-between flex-column">
                <div className="mb-3">
                  <div className="d-flex align-items-center justify-content-between mb-1">
                    <h6 className="fw-semibold">
                      Email Verification
                      <i className="ti ti-square-rounded-check-filled text-success ms-1" />
                    </h6>
                  </div>
                  <p>
                    Verified Email : <span>info@example.com</span>
                  </p>
                </div>
                <div className="d-flex align-items-center">
                  <Link
                    to="#"
                    className="btn btn-light me-3"
                    data-bs-toggle="modal"
                    data-bs-target="#change_email"
                  >
                    Change
                  </Link>
                  <Link
                    to="#"
                    className="link-danger fw-semibold"
                  >
                    Remove
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-6 d-flex">
            <div className="card border shadow-none flex-fill mb-3">
              <div className="card-body d-flex justify-content-between flex-column">
                <div className="mb-3">
                  <div className="d-flex align-items-center justify-content-between mb-1">
                    <h6 className="fw-semibold">Device Management</h6>
                  </div>
                  <p>Last Changed 17 Feb 2023, 11.00 AM</p>
                </div>
                <div className="d-flex align-items-center">
                  <Link to="#" className="btn btn-light">
                    Manage
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-6 d-flex">
            <div className="card border shadow-none flex-fill mb-3">
              <div className="card-body d-flex justify-content-between flex-column">
                <div className="mb-3">
                  <div className="d-flex align-items-center justify-content-between mb-1">
                    <h6 className="fw-semibold">Account Activity</h6>
                  </div>
                  <p>Last Changed 22 Feb 2023, 01:20 PM</p>
                </div>
                <div className="d-flex align-items-center">
                  <Link to="#" className="btn btn-light">
                    View
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-6 d-flex">
            <div className="card border shadow-none flex-fill mb-3">
              <div className="card-body d-flex justify-content-between flex-column">
                <div className="mb-3">
                  <div className="d-flex align-items-center justify-content-between mb-1">
                    <h6 className="fw-semibold">Deactive Account</h6>
                  </div>
                  <p>Last Changed 04 Mar 2023, 08:40 AM</p>
                </div>
                <div className="d-flex align-items-center">
                  <Link
                    to="#"
                    className="btn btn-light"
                    data-bs-toggle="modal"
                    data-bs-target="#deactive_account"
                  >
                    Deactive
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-6 d-flex">
            <div className="card border shadow-none flex-fill mb-3">
              <div className="card-body d-flex justify-content-between flex-column">
                <div className="mb-3">
                  <div className="d-flex align-items-center justify-content-between mb-1">
                    <h6 className="fw-semibold">Delete Account</h6>
                  </div>
                  <p>Last Changed 13 Mar 2023, 02:40 PM</p>
                </div>
                <div className="d-flex align-items-center">
                  <Link
                    to="#"
                    className="btn btn-primary"
                    data-bs-toggle="modal"
                    data-bs-target="#delete_account"
                  >
                    Delete Account
                  </Link>
                </div>
              </div>
            </div>
          </div>
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
  {/* Change Password */}
  <div className="modal fade" id="change_password" role="dialog">
    <div className="modal-dialog modal-dialog-centered">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">Change Password</h5>
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
                Current Password <span className="text-danger">*</span>
              </label>
              <input type="password" className="form-control" />
            </div>
            <div className="mb-3">
              <label className="col-form-label">
                New Password <span className="text-danger">*</span>
              </label>
              <input type="password" className="form-control" />
            </div>
            <div className="mb-0">
              <label className="col-form-label">
                Confirm Password <span className="text-danger">*</span>
              </label>
              <input type="password" className="form-control" />
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
  {/* /Change Password */}
  {/* Delete Account */}
  <div className="modal custom-modal fade" id="delete_account" role="dialog">
    <div className="modal-dialog modal-dialog-centered">
      <div className="modal-content">
        <div className="modal-body">
          <form >
            <div className="text-center">
              <div className="avatar avatar-xl bg-danger-light rounded-circle mb-3">
                <i className="ti ti-trash-x fs-36 text-danger" />
              </div>
              <h4 className="mb-2">Delete Account</h4>
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
  {/* /Delete Account */}
  {/* Delete Account */}
  <div className="modal custom-modal fade" id="delete_two_factor" role="dialog">
    <div className="modal-dialog modal-dialog-centered">
      <div className="modal-content">
        <div className="modal-body">
          <div className="text-center">
            <div className="avatar avatar-xl bg-danger-light rounded-circle mb-3">
              <i className="ti ti-trash-x fs-36 text-danger" />
            </div>
            <h4 className="mb-2">Delete Two Factor</h4>
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
        </div>
      </div>
    </div>
  </div>
  {/* /Delete Account */}
</>

    </div>
  );
};

export default Security;
