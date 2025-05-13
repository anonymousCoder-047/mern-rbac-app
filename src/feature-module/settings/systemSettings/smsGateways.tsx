import React from 'react'
import ImageWithBasePath from '../../../core/common/imageWithBasePath'
import { Link } from "react-router-dom";
import { all_routes } from '../../router/all_routes';
import CollapseHeader from '../../../core/common/collapse-header';
const route = all_routes;
const SmsGateways = () => {
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
                      <Link to={route.emailSettings} className="nav-link px-0 active">
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
          <h4 className="fw-semibold mb-3">Other Settings</h4>
          <div className="list-group list-group-flush settings-sidebar">
            <Link to={route.emailSettings} className="fw-medium">
              Email Settings
            </Link>
            <Link to={route.smsGateways} className="fw-medium active">
              SMS Gateways
            </Link>
            <Link to={route.gdprCookies} className="fw-medium">
              GDPR Cookies
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
        <div className="mb-4">
          <h4 className="fs-20">SMS Gateways</h4>
        </div>
        <div className="row">
          {/* Gateway Wrap */}
          <div className="col-xxl-4 col-sm-6">
            <div className="border rounded d-flex align-items-center justify-content-between p-3 mb-3">
              <div>
                <ImageWithBasePath src="assets/img/icons/gateway-01.svg" alt="" />
              </div>
              <div className="d-flex align-items-center">
                <Link
                  to="#"
                  data-bs-toggle="modal"
                  data-bs-target="#add_nexmo"
                >
                  <i className="ti ti-settings fs-20" />
                </Link>
                <div className="status-toggle ms-3">
                  <input
                    type="checkbox"
                    id="sms"
                    className="check"
                    defaultChecked
                  />
                  <label htmlFor="sms" className="checktoggle">
                    {" "}
                  </label>
                </div>
              </div>
            </div>
          </div>
          {/* /Gateway Wrap */}
          {/* Gateway Wrap */}
          <div className="col-xxl-4 col-sm-6">
            <div className="border rounded d-flex align-items-center justify-content-between p-3 mb-3">
              <div>
                <ImageWithBasePath src="assets/img/icons/gateway-02.svg" alt="" />
              </div>
              <div className="d-flex align-items-center">
                <Link
                  to="#"
                  data-bs-toggle="modal"
                  data-bs-target="#add_factor"
                >
                  <i className="ti ti-settings fs-20" />
                </Link>
                <div className="status-toggle ms-3">
                  <input
                    type="checkbox"
                    id="sms1"
                    className="check"
                    defaultChecked
                  />
                  <label htmlFor="sms1" className="checktoggle">
                    {" "}
                  </label>
                </div>
              </div>
            </div>
          </div>
          {/* /Gateway Wrap */}
          {/* Gateway Wrap */}
          <div className="col-xxl-4 col-sm-6">
            <div className="border rounded d-flex align-items-center justify-content-between p-3 mb-3">
              <div>
                <ImageWithBasePath src="assets/img/icons/gateway-03.svg" alt="" />
              </div>
              <div className="d-flex align-items-center">
                <Link
                  to="#"
                  data-bs-toggle="modal"
                  data-bs-target="#add_twilio"
                >
                  <i className="ti ti-settings fs-20" />
                </Link>
                <div className="status-toggle ms-3">
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
          {/* /Gateway Wrap */}
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
  {/* Nexmo */}
  <div className="modal custom-modal fade" id="add_nexmo" role="dialog">
    <div className="modal-dialog modal-dialog-centered">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">Nexmo</h5>
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
                API Key <span className="text-danger">*</span>
              </label>
              <input type="text" className="form-control" />
            </div>
            <div className="mb-3">
              <label className="col-form-label">
                API Secret Key <span className="text-danger">*</span>
              </label>
              <input type="text" className="form-control" />
            </div>
            <div className="mb-3">
              <label className="col-form-label">
                Sender ID <span className="text-danger">*</span>
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
  {/* /Nexmo */}
  {/* Add 2Factor */}
  <div className="modal custom-modal fade" id="add_factor" role="dialog">
    <div className="modal-dialog modal-dialog-centered">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">2Factor</h5>
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
                API Key <span className="text-danger">*</span>
              </label>
              <input type="text" className="form-control" />
            </div>
            <div className="mb-3">
              <label className="col-form-label">
                API Secret Key <span className="text-danger">*</span>
              </label>
              <input type="text" className="form-control" />
            </div>
            <div className="mb-3">
              <label className="col-form-label">
                Sender ID <span className="text-danger">*</span>
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
  {/* /Add 2Factor */}
  {/* Add Twilio */}
  <div className="modal custom-modal fade" id="add_twilio" role="dialog">
    <div className="modal-dialog modal-dialog-centered">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">Twilio</h5>
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
            <div className="mb-3">
              <label className="col-form-label">
                API Key <span className="text-danger">*</span>
              </label>
              <input type="text" className="form-control" />
            </div>
            <div className="mb-3">
              <label className="col-form-label">
                API Secret Key <span className="text-danger">*</span>
              </label>
              <input type="text" className="form-control" />
            </div>
            <div className="mb-3">
              <label className="col-form-label">
                Sender ID <span className="text-danger">*</span>
              </label>
              <input type="text" className="form-control" />
            </div>
            <div className="modal-btn">
              <Link to="#" className="btn btn-light" data-bs-dismiss="modal">
                Cancel
              </Link>
              <button type="button" data-bs-dismiss="modal" className="btn btn-primary">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
  {/* /Add Twilio */}
</>

  </div>
  )
}

export default SmsGateways