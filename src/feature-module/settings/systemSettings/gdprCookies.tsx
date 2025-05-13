import React from "react";
import Select from "react-select";
import { Link } from "react-router-dom";
import { all_routes } from "../../router/all_routes";
import CollapseHeader from "../../../core/common/collapse-header";
const route = all_routes;
const GdprCookies = () => {
  const options = [
    { value: "right", label: "Right" },
    { value: "left", label: "Left" },
  ];

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
            <Link to={route.emailSettings}className="fw-medium">
              Email Settings
            </Link>
            <Link to={route.smsGateways} className="fw-medium">
              SMS Gateways
            </Link>
            <Link to={route.gdprCookies} className="fw-medium active">
              GDPR Cookies
            </Link>
          </div>
        </div>
      </div>
    </div>
    {/* /Settings Sidebar */}
  </div>
  <div className="col-xl-9 col-lg-12">
    {/* GDPR Cookies */}
    <div className="card">
      <div className="card-body">
        <div className="mb-3">
          <h4 className="fs-20">GDPR Cookies</h4>
        </div>
        <form >
          <div className="row">
            <div className="col-md-6">
              <div className="mb-3">
                <h6 className="fw-medium">Cookies Content Text</h6>
                <p className="fs-12">You can configure the text here</p>
              </div>
            </div>
            <div className="col-md-6">
              <div className="mb-3">
                <div className="summernote" />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <div className="mb-3">
                <h6 className="fw-medium">Cookies Position</h6>
                <p className="fs-12">You can configure the type</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="mb-3">
              <Select
                                className="select"
                                defaultValue={options[0]}
                                options={options}
                              />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <div className="mb-3">
                <h6 className="fw-medium">Agree Button Text</h6>
                <p className="fs-12">You can configure the text here</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  defaultValue="Manage"
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <div className="mb-3">
                <h6 className="fw-medium">Decline Button Text</h6>
                <p className="fs-12">You can configure the text here</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  defaultValue="Manage"
                />
              </div>
            </div>
          </div>
          <div className="row align-items-center">
            <div className="col-md-6">
              <div className="mb-3">
                <h6 className="fw-medium">Show Decline Button</h6>
                <p className="fs-12">To display decline button</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="mb-3">
                <div className="status-toggle">
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
          <div className="row">
            <div className="col-md-6">
              <div className="mb-3">
                <h6 className="fw-medium">Link for Cookies Page</h6>
                <p className="fs-12">You can configure the link here</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="mb-3">
                <input type="text" className="form-control" />
              </div>
            </div>
          </div>
          <div className="d-flex align-items-center">
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
    {/* /GDPR Cookies */}
  </div>
</div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default GdprCookies;
