import React from 'react'
import ImageWithBasePath from '../../../core/common/imageWithBasePath'
import { Link } from "react-router-dom";
import { all_routes } from '../../router/all_routes';
import CollapseHeader from '../../../core/common/collapse-header';
const route = all_routes;
const Preference = () => {
  return (
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
                        className="nav-link px-0 active"
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
          <h4 className="fw-semibold mb-3">Website Settings</h4>
          <div className="list-group list-group-flush settings-sidebar">
                          <Link
                            to={route.companySettings}
                            className="fw-medium"
                          >
                            Company Settings
                          </Link>
                          <Link to={route.localization} className="fw-medium">
                            Localization
                          </Link>
                          <Link to={route.prefixes} className="fw-medium">
                            Prefixes
                          </Link>
                          <Link to={route.preference} className="fw-medium active">
                            Preference
                          </Link>
                          <Link
                            to={route.appearance}
                            className="fw-medium"
                          >
                            Appearance
                          </Link>
                          <Link to={route.language} className="fw-medium">
                            Language
                          </Link>
                        </div>
        </div>
      </div>
    </div>
    {/* /Settings Sidebar */}
  </div>
  <div className="col-xl-9 col-lg-12">
    {/* Prefixes */}
    <div className="card">
      <div className="card-body">
        <h4 className="fw-semibold mb-3">Preference</h4>
        <form >
          <div className="row">
            <div className="col-xxl-4 col-sm-6">
              <div className="card border mb-3">
                <div className="card-body d-flex align-items-center justify-content-between">
                  <div className="d-flex align-items-center">
                    <ImageWithBasePath src="assets/img/icons/preference-01.svg" alt="" />
                    <h6 className="fw-semibold ms-3">Contact</h6>
                  </div>
                  <div className="form-check form-switch">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      role="switch"
                      defaultChecked
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xxl-4 col-sm-6">
              <div className="card border mb-3">
                <div className="card-body d-flex align-items-center justify-content-between">
                  <div className="d-flex align-items-center">
                    <ImageWithBasePath src="assets/img/icons/preference-02.svg" alt="" />
                    <h6 className="fw-semibold ms-3">Deals</h6>
                  </div>
                  <div className="form-check form-switch">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      role="switch"
                      defaultChecked
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xxl-4 col-sm-6">
              <div className="card border mb-3">
                <div className="card-body d-flex align-items-center justify-content-between">
                  <div className="d-flex align-items-center">
                    <ImageWithBasePath src="assets/img/icons/preference-03.svg" alt="" />
                    <h6 className="fw-semibold ms-3">Leads</h6>
                  </div>
                  <div className="form-check form-switch">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      role="switch"
                      defaultChecked
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xxl-4 col-sm-6">
              <div className="card border mb-3">
                <div className="card-body d-flex align-items-center justify-content-between">
                  <div className="d-flex align-items-center">
                    <ImageWithBasePath src="assets/img/icons/preference-04.svg" alt="" />
                    <h6 className="fw-semibold ms-3">Pipelines</h6>
                  </div>
                  <div className="form-check form-switch">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      role="switch"
                      defaultChecked
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xxl-4 col-sm-6">
              <div className="card border mb-3">
                <div className="card-body d-flex align-items-center justify-content-between">
                  <div className="d-flex align-items-center">
                    <ImageWithBasePath src="assets/img/icons/preference-02.svg" alt="" />
                    <h6 className="fw-semibold ms-3">Campaign</h6>
                  </div>
                  <div className="form-check form-switch">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      role="switch"
                      defaultChecked
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xxl-4 col-sm-6">
              <div className="card border mb-3">
                <div className="card-body d-flex align-items-center justify-content-between">
                  <div className="d-flex align-items-center">
                    <ImageWithBasePath src="assets/img/icons/preference-06.svg" alt="" />
                    <h6 className="fw-semibold ms-3">Projects</h6>
                  </div>
                  <div className="form-check form-switch">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      role="switch"
                      defaultChecked
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xxl-4 col-sm-6">
              <div className="card border mb-3">
                <div className="card-body d-flex align-items-center justify-content-between">
                  <div className="d-flex align-items-center">
                    <ImageWithBasePath src="assets/img/icons/preference-07.svg" alt="" />
                    <h6 className="fw-semibold ms-3">Tasks</h6>
                  </div>
                  <div className="form-check form-switch">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      role="switch"
                      defaultChecked
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xxl-4 col-sm-6">
              <div className="card border mb-3">
                <div className="card-body d-flex align-items-center justify-content-between">
                  <div className="d-flex align-items-center">
                    <ImageWithBasePath src="assets/img/icons/preference-08.svg" alt="" />
                    <h6 className="fw-semibold ms-3">Acivities</h6>
                  </div>
                  <div className="form-check form-switch">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      role="switch"
                      defaultChecked
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xxl-4 col-sm-6">
              <div className="card border mb-3">
                <div className="card-body d-flex align-items-center justify-content-between">
                  <div className="d-flex align-items-center">
                    <ImageWithBasePath src="assets/img/icons/preference-09.svg" alt="" />
                    <h6 className="fw-semibold ms-3">Company</h6>
                  </div>
                  <div className="form-check form-switch">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      role="switch"
                      defaultChecked
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xxl-4 col-sm-6">
              <div className="card border mb-3">
                <div className="card-body d-flex align-items-center justify-content-between">
                  <div className="d-flex align-items-center">
                    <ImageWithBasePath src="assets/img/icons/preference-10.svg" alt="" />
                    <h6 className="fw-semibold ms-3">Analytics</h6>
                  </div>
                  <div className="form-check form-switch">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      role="switch"
                      defaultChecked
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xxl-4 col-sm-6">
              <div className="card border mb-3">
                <div className="card-body d-flex align-items-center justify-content-between">
                  <div className="d-flex align-items-center">
                    <ImageWithBasePath src="assets/img/icons/preference-11.svg" alt="" />
                    <h6 className="fw-semibold ms-3">Clients</h6>
                  </div>
                  <div className="form-check form-switch">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      role="switch"
                      defaultChecked
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xxl-4 col-sm-6">
              <div className="card border mb-3">
                <div className="card-body d-flex align-items-center justify-content-between">
                  <div className="d-flex align-items-center">
                    <ImageWithBasePath src="assets/img/icons/preference-12.svg" alt="" />
                    <h6 className="fw-semibold ms-3">Customers</h6>
                  </div>
                  <div className="form-check form-switch">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      role="switch"
                      defaultChecked
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
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
    {/* /Prefixes */}
  </div>
</div>

            </div>
          </div>
        </div>
      </div>
  )
}

export default Preference