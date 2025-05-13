import React from 'react'
import ImageWithBasePath from '../../../core/common/imageWithBasePath'
import { Link } from "react-router-dom";
import { all_routes } from '../../router/all_routes';
import CollapseHeader from '../../../core/common/collapse-header';
const route = all_routes;
const EmailSettings = () => {
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
            <Link to={route.emailSettings} className="fw-medium active">
              Email Settings
            </Link>
            <Link to={route.smsGateways} className="fw-medium">
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
      <div className="card-body">
        <div className="d-flex align-items-center justify-content-between mb-4">
          <h4 className="fs-20">Email Settings</h4>
          <Link
            to="#"
            className="btn-add"
            data-bs-toggle="modal"
            data-bs-target="#add_mail"
          >
            <i className="ti ti-mail" />
          </Link>
        </div>
        <div className="row">
          {/* Email Wrap */}
          <div className="col-md-12">
            {/* PHP Mailer */}
            <div className="border rounded p-3 mb-4">
              <div className="row gy-3">
                <div className="col-sm-5">
                  <div className="d-flex align-items-center">
                    <span className="avatar avtar-lg border me-2 flex-shrink-0">
                      <ImageWithBasePath
                        src="assets/img/icons/mail-01.svg"
                        className="w-auto h-auto"
                        alt=""
                      />
                    </span>
                    <div>
                      <h6 className="fw-medium mb-1">PHP Mailer</h6>
                      <Link
                        to="#"
                        className="badge bg-soft-success"
                      >
                        Connected
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="col-sm-7">
                  <div className="d-flex align-items-center justify-content-between">
                    <div>
                      <Link
                        to="#"
                        data-bs-toggle="collapse"
                        data-bs-target="#php-mail"
                        className="info-icon me-3 text-default"
                      >
                        <i className="ti ti-info-circle-filled me-1" />
                      </Link>
                      <Link
                        to="#"
                        className="btn btn-light"
                        data-bs-toggle="modal"
                        data-bs-target="#add_phpmail"
                      >
                        <i className="ti ti-tool me-1" />
                        View Integration
                      </Link>
                    </div>
                    <div className="status-toggle">
                      <input
                        type="checkbox"
                        id="mail1"
                        className="check"
                        defaultChecked
                      />
                      <label htmlFor="mail1" className="checktoggle">
                        {" "}
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="collapse" id="php-mail">
                <div className="mail-collapse">
                  <p>
                    PHPMailer is a third-party PHP library that provides a
                    simple way to send emails in PHP. It offers a range of
                    features that make it a popular alternative to PHP's
                    built-in mail() function, such as support for HTML emails,
                    attachments, and SMTP authentication.
                  </p>
                </div>
              </div>
            </div>
            {/* /PHP Mailer */}
            {/* SMTP */}
            <div className="border rounded p-3 mb-4">
              <div className="row gy-3">
                <div className="col-sm-5">
                  <div className="d-flex align-items-center">
                    <span className="avatar avtar-lg border me-2 flex-shrink-0">
                      <ImageWithBasePath
                        src="assets/img/icons/mail-02.svg"
                        className="w-auto h-auto"
                        alt=""
                      />
                    </span>
                    <div>
                      <h6 className="fw-medium mb-1">SMTP</h6>
                      <Link
                        to="#"
                        className="badge bg-soft-success"
                      >
                        Connected
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="col-sm-7">
                  <div className="d-flex align-items-center justify-content-between">
                    <div>
                      <Link
                        to="#"
                        className="me-3 text-default"
                      >
                        <i className="ti ti-info-circle-filled me-1" />
                      </Link>
                      <Link
                        to="#"
                        className="btn btn-light"
                        data-bs-toggle="modal"
                        data-bs-target="#add_smtp"
                      >
                        <i className="ti ti-tool me-1" />
                        View Integration
                      </Link>
                    </div>
                    <div className="status-toggle">
                      <input
                        type="checkbox"
                        id="mail2"
                        className="check"
                        defaultChecked
                      />
                      <label htmlFor="mail2" className="checktoggle">
                        {" "}
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* /SMTP */}
            {/* SendGrid */}
            <div className="border rounded p-3">
              <div className="row gy-3">
                <div className="col-sm-5">
                  <div className="d-flex align-items-center">
                    <span className="avatar avtar-lg border me-2 flex-shrink-0">
                      <ImageWithBasePath
                        src="assets/img/icons/mail-03.svg"
                        className="w-auto h-auto"
                        alt=""
                      />
                    </span>
                    <div>
                      <h6 className="fw-medium mb-1">SendGrid</h6>
                      <Link
                        to="#"
                        className="badge bg-soft-purple text-purple"
                      >
                        Not Connected
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="col-sm-7">
                  <div className="d-flex align-items-center justify-content-between">
                    <div>
                      <Link
                        to="#"
                        className="me-3 text-default"
                      >
                        <i className="ti ti-info-circle-filled me-1" />
                      </Link>
                      <Link to="#" className="btn btn-primary">
                        <i className="ti ti-plug-connected me-1" />
                        Connect Now
                      </Link>
                    </div>
                    <div className="status-toggle">
                      <input
                        type="checkbox"
                        id="mail3"
                        className="check"
                        defaultChecked
                      />
                      <label htmlFor="mail3" className="checktoggle">
                        {" "}
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* /SendGrid */}
          </div>
          {/* /Email Wrap */}
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
  {/* PHP Mailer */}
  <div className="modal fade" id="add_phpmail" role="dialog">
    <div className="modal-dialog modal-dialog-centered">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">PHP Mailer</h5>
          <div className="d-flex align-items-center">
            <div className="status-toggle me-2">
              <input
                type="checkbox"
                id="toggle"
                className="check"
                defaultChecked
              />
              <label htmlFor="toggle" className="checktoggle" />
            </div>
            <button
              className="btn-close custom-btn-close border p-1 me-0 text-dark"
              data-bs-dismiss="modal"
              aria-label="Close"
            >
              <i className="ti ti-x" />
            </button>
          </div>
        </div>
        <form >
          <div className="modal-body">
            <div className="mb-3">
              <label className="col-form-label">
                From Email Address <span className="text-danger">*</span>
              </label>
              <input type="text" className="form-control" />
            </div>
            <div className="mb-3">
              <label className="col-form-label">
                Email Password <span className="text-danger">*</span>
              </label>
              <input type="text" className="form-control" />
            </div>
            <div className="mb-0">
              <label className="col-form-label">
                From Email Name <span className="text-danger">*</span>
              </label>
              <input type="text" className="form-control" />
            </div>
          </div>
          <div className="modal-footer">
            <div className="d-flex align-items-center justify-content-end m-0">
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
  {/* /PHP Mailer */}
  {/* SMTP */}
  <div className="modal fade" id="add_smtp" role="dialog">
    <div className="modal-dialog modal-dialog-centered">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">SMTP</h5>
          <div className="d-flex align-items-center">
            <div className="status-toggle me-2">
              <input
                type="checkbox"
                id="toggle1"
                className="check"
                defaultChecked
              />
              <label htmlFor="toggle1" className="checktoggle" />
            </div>
            <button
              className="btn-close custom-btn-close border p-1 me-0 text-dark"
              data-bs-dismiss="modal"
              aria-label="Close"
            >
              <i className="ti ti-x" />
            </button>
          </div>
        </div>
        <form >
          <div className="modal-body">
            <div className="mb-3">
              <label className="col-form-label">
                From Email Address <span className="text-danger">*</span>
              </label>
              <input type="text" className="form-control" />
            </div>
            <div className="mb-3">
              <label className="col-form-label">
                Email Password <span className="text-danger">*</span>
              </label>
              <input type="text" className="form-control" />
            </div>
            <div className="mb-3">
              <label className="col-form-label">
                Email Host <span className="text-danger">*</span>
              </label>
              <input type="text" className="form-control" />
            </div>
            <div className="mb-0">
              <label className="col-form-label">
                Port <span className="text-danger">*</span>
              </label>
              <input type="text" className="form-control" />
            </div>
          </div>
          <div className="modal-footer">
            <div className="d-flex align-items-center justify-content-end m-0">
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
  {/* /SMTP */}
  {/* Test Mail */}
  <div className="modal fade" id="add_mail" role="dialog">
    <div className="modal-dialog modal-dialog-centered">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">Test Mail</h5>
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
            <div className="mb-0">
              <label className="col-form-label">
                Enter Email Address <span className="text-danger">*</span>
              </label>
              <input type="text" className="form-control" />
            </div>
          </div>
          <div className="modal-footer">
            <div className="d-flex align-items-center justify-content-end m-0">
              <Link
                to="#"
                className="btn btn-light me-2"
                data-bs-dismiss="modal"
              >
                Cancel
              </Link>
              <button type="button" data-bs-dismiss="modal" className="btn btn-primary">
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
  {/* /Test Mail */}
</>

  </div>
  )
}

export default EmailSettings