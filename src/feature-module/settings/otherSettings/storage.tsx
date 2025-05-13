import React from 'react'
import ImageWithBasePath from '../../../core/common/imageWithBasePath'
import { Link } from "react-router-dom";
import { all_routes } from '../../router/all_routes';
import CollapseHeader from '../../../core/common/collapse-header';
const route = all_routes;
const Storage = () => {
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
            <Link to={route.storage} className="fw-medium active">
              Storage
            </Link>
            <Link to={route.banIpAddrress} className="fw-medium">
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
        <div className="mb-4">
          <h4 className="fs-20">Storage</h4>
        </div>
        <div className="row">
          {/* Storage */}
          <div className="col-xxl-4 col-sm-6">
            <div className="border rounded p-3 d-flex align-items-center justify-content-between mb-4">
              <div className="d-flex align-items-center">
                <span className="avatar avatar-lg bg-light-100 border flex-shrink-0 me-2">
                  <ImageWithBasePath
                    src="assets/img/icons/storage-icon-01.svg"
                    className="w-auto h-auto"
                    alt=""
                  />
                </span>
                <h6 className="fw-semibold">Local Storage</h6>
              </div>
              <div className="d-flex align-items-center">
                <Link to="#" className="me-2">
                  <i className="ti ti-settings fs-20" />
                </Link>
                <div className="status-toggle">
                  <input
                    type="checkbox"
                    id="loc"
                    className="check"
                    defaultChecked
                  />
                  <label htmlFor="loc" className="checktoggle">
                    {" "}
                  </label>
                </div>
              </div>
            </div>
          </div>
          {/* /Storage */}
          {/* Storage */}
          <div className="col-xxl-4 col-sm-6">
            <div className="border rounded p-3 d-flex align-items-center justify-content-between mb-4">
              <div className="d-flex align-items-center">
                <span className="avatar avatar-lg bg-light-100 border flex-shrink-0 me-2">
                  <ImageWithBasePath
                    src="assets/img/icons/storage-icon-02.svg"
                    className="w-auto h-auto"
                    alt=""
                  />
                </span>
                <h6 className="fw-semibold">AWS</h6>
              </div>
              <div className="d-flex align-items-center">
                <Link
                  to="#"
                  className="me-2"
                  data-bs-toggle="modal"
                  data-bs-target="#add_settings"
                >
                  <i className="ti ti-settings fs-20" />
                </Link>
                <div className="status-toggle">
                  <input
                    type="checkbox"
                    id="aws"
                    className="check"
                    defaultChecked
                  />
                  <label htmlFor="aws" className="checktoggle" />
                </div>
              </div>
            </div>
          </div>
          {/* /Storage */}
        </div>
        <div className="d-flex align-items-center">
          <Link to="#" className="btn btn-light me-2">
            Cancel
          </Link>
          <button type="submit" className="btn btn-primary">
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
  {/* AWS Settings */}
  <div className="modal custom-modal fade" id="add_settings" role="dialog">
    <div className="modal-dialog modal-dialog-centered">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">AWS Settings</h5>
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
                AWS Access Key <span className="text-danger">*</span>
              </label>
              <input type="text" className="form-control" />
            </div>
            <div className="mb-3">
              <label className="col-form-label">
                Secret Key <span className="text-danger">*</span>
              </label>
              <input type="text" className="form-control" />
            </div>
            <div className="mb-3">
              <label className="col-form-label">
                Bucket Name <span className="text-danger">*</span>
              </label>
              <input type="text" className="form-control" />
            </div>
            <div className="mb-3">
              <label className="col-form-label">
                Region <span className="text-danger">*</span>
              </label>
              <input type="text" className="form-control" />
            </div>
            <div className="mb-3">
              <label className="col-form-label">
                Base URL <span className="text-danger">*</span>
              </label>
              <input type="text" className="form-control" />
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
  {/* /AWS Settings */}
</>

  </div>
  )
}

export default Storage