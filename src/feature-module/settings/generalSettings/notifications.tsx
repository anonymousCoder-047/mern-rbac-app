import React from 'react'
import { Link } from "react-router-dom";
import { all_routes } from '../../router/all_routes';
import CollapseHeader from '../../../core/common/collapse-header';
const route = all_routes;
const Notifications = () => {
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
                        <Link to={route.profile} className="nav-link px-0 active">
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
            <Link to={route.security} className="fw-medium">
              Security
            </Link>
            <Link to={route.notification} className="fw-medium active">
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
      <div className="card-body">
        <h4 className="fw-semibold mb-3">Notification Settings</h4>
        <div className="settings-form">
          {/* General Notifications */}
          <div className="border-bottom mb-3 pb-3">
            <h5 className="fw-semibold mb-1">General Notifications</h5>
            <p>Select notifications</p>
          </div>
          <div className="border-bottom mb-3 pb-3">
            <div className="form-check d-flex align-items-center justify-content-between ps-0 mb-3">
              <label
                className="form-check-label text-gray-9 fw-medium"
                htmlFor="notification1"
              >
                Mobile Push Notifications
              </label>
              <input
                className="form-check-input"
                type="checkbox"
                defaultValue=""
                id="notification1"
                 defaultChecked
              />
            </div>
            <div className="form-check d-flex align-items-center justify-content-between ps-0 mb-3">
              <label
                className="form-check-label text-gray-9 fw-medium"
                htmlFor="notification2"
              >
                Desktop Notifications
              </label>
              <input
                className="form-check-input"
                type="checkbox"
                defaultValue=""
                id="notification2"
                 defaultChecked
              />
            </div>
            <div className="form-check d-flex align-items-center justify-content-between ps-0 mb-3">
              <label
                className="form-check-label text-gray-9 fw-medium"
                htmlFor="notification3"
              >
                Email Notifications
              </label>
              <input
                className="form-check-input"
                type="checkbox"
                id="notification3"
                 defaultChecked
              />
            </div>
            <div className="form-check d-flex align-items-center justify-content-between ps-0 mb-0">
              <label
                className="form-check-label text-gray-9 fw-medium"
                htmlFor="notification4"
              >
                SMS Notifications
              </label>
              <input
                className="form-check-input"
                type="checkbox"
                id="notification4"
                 defaultChecked
              />
            </div>
          </div>
          {/* /General Notifications */}
          {/* Custom Notifications */}
          <div className="border-bottom mb-3 pb-3">
            <h5 className="fw-semibold mb-1">Custom Notifications</h5>
            <p>
              Select when you will be notified when the following changes occur{" "}
            </p>
          </div>
          <div className="table-responsive notificaion-table">
            <table className="table table-borderless">
              <thead>
                <tr>
                  <th />
                  <th>Push</th>
                  <th>SMS</th>
                  <th>Email</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Legendary</td>
                  <td>
                    <div className="form-check form-switch">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        role="switch"
                         defaultChecked
                      />
                    </div>
                  </td>
                  <td>
                    <div className="form-check form-switch">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        role="switch"
                         defaultChecked
                      />
                    </div>
                  </td>
                  <td>
                    <div className="form-check form-switch">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        role="switch"
                         defaultChecked
                      />
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>Transaction</td>
                  <td>
                    <div className="form-check form-switch">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        role="switch"
                         defaultChecked
                      />
                    </div>
                  </td>
                  <td>
                    <div className="form-check form-switch">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        role="switch"
                         defaultChecked
                      />
                    </div>
                  </td>
                  <td>
                    <div className="form-check form-switch">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        role="switch"
                         defaultChecked
                      />
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>Email Verification</td>
                  <td>
                    <div className="form-check form-switch">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        role="switch"
                         defaultChecked
                      />
                    </div>
                  </td>
                  <td>
                    <div className="form-check form-switch">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        role="switch"
                         defaultChecked
                      />
                    </div>
                  </td>
                  <td>
                    <div className="form-check form-switch">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        role="switch"
                         defaultChecked
                      />
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>OTP</td>
                  <td>
                    <div className="form-check form-switch">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        role="switch"
                         defaultChecked
                      />
                    </div>
                  </td>
                  <td>
                    <div className="form-check form-switch">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        role="switch"
                         defaultChecked
                      />
                    </div>
                  </td>
                  <td>
                    <div className="form-check form-switch">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        role="switch"
                         defaultChecked
                      />
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>Activity</td>
                  <td>
                    <div className="form-check form-switch">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        role="switch"
                         defaultChecked
                      />
                    </div>
                  </td>
                  <td>
                    <div className="form-check form-switch">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        role="switch"
                         defaultChecked
                      />
                    </div>
                  </td>
                  <td>
                    <div className="form-check form-switch">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        role="switch"
                         defaultChecked
                      />
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>Account</td>
                  <td>
                    <div className="form-check form-switch">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        role="switch"
                         defaultChecked
                      />
                    </div>
                  </td>
                  <td>
                    <div className="form-check form-switch">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        role="switch"
                         defaultChecked
                      />
                    </div>
                  </td>
                  <td>
                    <div className="form-check form-switch">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        role="switch"
                         defaultChecked
                      />
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          {/* /Custom Notifications */}
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
    {/* Delete Account */}
    <div className="modal custom-modal fade" id="delete_account" role="dialog">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header border-0 m-0 justify-content-end">
            <button className="btn-close" data-bs-dismiss="modal" aria-label="Close">	
              <i className="ti ti-x" />
            </button>
          </div>
          <div className="modal-body">
            <div className="success-message text-center">
              <div className="success-popup-icon">
                <i className="ti ti-trash-x" />
              </div>
              <h3>Delete Account</h3>
              <p className="del-info">Are you sure want to delete?</p>
              <div className="col-lg-12 text-center modal-btn">
                <Link to="#" className="btn btn-light" data-bs-dismiss="modal">Cancel</Link>
                <Link to={route.security} className="btn btn-danger">Yes, Delete it</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    {/* /Delete Account */}
  </div>
  )
}

export default Notifications