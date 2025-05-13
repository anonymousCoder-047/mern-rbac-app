import React from "react";
import ImageWithBasePath from "../../../core/common/imageWithBasePath";
import { all_routes } from "../../router/all_routes";
import { Link } from "react-router-dom";
import CollapseHeader from "../../../core/common/collapse-header";

const CompanySettings = () => {
  const route = all_routes;
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
                          <Link to={route.localization} className="fw-medium active">
                            Localization
                          </Link>
                          <Link to={route.prefixes} className="fw-medium">
                            Prefixes
                          </Link>
                          <Link to={route.preference} className="fw-medium">
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
    {/* Company Settings */}
    <div className="card">
      <div className="card-body">
        <h4 className="fw-semibold mb-3">Company Settings</h4>
        <form >
          <div className="border-bottom mb-3 pb-3">
            <h5 className="fw-semibold mb-1">Company Information</h5>
            <p>Provide the company information below</p>
          </div>
          <div className="border-bottom mb-3 ">
            <div className="row">
              <div className="col-md-4">
                <div className="mb-3">
                  <label className="form-label">Company Name </label>
                  <input type="text" className="form-control" />
                </div>
              </div>
              <div className="col-md-4">
                <div className="mb-3">
                  <label className="form-label">Company Email Address</label>
                  <input type="text" className="form-control" />
                </div>
              </div>
              <div className="col-md-4">
                <div className="mb-3">
                  <label className="form-label">Phone Number</label>
                  <input type="text" className="form-control" />
                </div>
              </div>
              <div className="col-md-4">
                <div className="mb-3">
                  <label className="form-label">Fax</label>
                  <input type="text" className="form-control" />
                </div>
              </div>
              <div className="col-md-4">
                <div className="mb-3">
                  <label className="form-label">Website</label>
                  <input type="text" className="form-control" />
                </div>
              </div>
            </div>
          </div>
          <div className="border-bottom mb-3 pb-3">
            <h5 className="fw-semibold mb-1">Company Images</h5>
            <p>Provide the company images</p>
          </div>
          <div className="border-bottom mb-3">
            <div className="row">
              <div className="col-md-6">
                <div className="mb-3">
                  <div className="profile-upload">
                    <div className="profile-upload-img">
                      <span>
                        <i className="ti ti-photo" />
                      </span>
                      <ImageWithBasePath
                        src="assets/img/icons/company-icon-03.svg"
                        alt="img"
                        className="preview1"
                      />
                      <button type="button" className="profile-remove">
                        <i className="feather-x" />
                      </button>
                    </div>
                    <div className="profile-upload-content">
                      <label className="profile-upload-btn">
                        <i className="ti ti-file-broken" /> Upload File
                        <input type="file" className="input-img" />
                      </label>
                      <p>
                        Upload Logo of your company to display in website. JPG
                        or PNG. Max size of 800K
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="mb-3">
                  <div className="profile-upload">
                    <div className="profile-upload-img">
                      <span>
                        <i className="ti ti-photo" />
                      </span>
                      <ImageWithBasePath
                        src="assets/img/icons/company-icon-03.svg"
                        alt="img"
                        className="preview1"
                      />
                      <button type="button" className="profile-remove">
                        <i className="feather-x" />
                      </button>
                    </div>
                    <div className="profile-upload-content">
                      <label className="profile-upload-btn">
                        <i className="ti ti-file-broken" /> Upload File
                        <input type="file" className="input-img" />
                      </label>
                      <p>
                        Upload Logo of your company to display in website. JPG
                        or PNG. Max size of 800K
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="mb-3">
                  <div className="profile-upload">
                    <div className="profile-upload-img">
                      <span>
                        <i className="ti ti-photo" />
                      </span>
                      <ImageWithBasePath
                        src="assets/img/icons/company-icon-03.svg"
                        alt="img"
                        className="preview1"
                      />
                      <button type="button" className="profile-remove">
                        <i className="feather-x" />
                      </button>
                    </div>
                    <div className="profile-upload-content">
                      <label className="profile-upload-btn">
                        <i className="ti ti-file-broken" /> Upload File
                        <input type="file" className="input-img" />
                      </label>
                      <p>
                        Upload Logo of your company to display in website. JPG
                        or PNG. Max size of 800K
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="mb-3">
                  <div className="profile-upload">
                    <div className="profile-upload-img">
                      <span>
                        <i className="ti ti-photo" />
                      </span>
                      <ImageWithBasePath
                        src="assets/img/icons/company-icon-03.svg"
                        alt="img"
                        className="preview1"
                      />
                      <button type="button" className="profile-remove">
                        <i className="feather-x" />
                      </button>
                    </div>
                    <div className="profile-upload-content">
                      <label className="profile-upload-btn">
                        <i className="ti ti-file-broken" /> Upload File
                        <input type="file" className="input-img" />
                      </label>
                      <p>
                        Upload Logo of your company to display in website. JPG
                        or PNG. Max size of 800K
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="border-bottom mb-3 pb-3">
            <h5 className="fw-semibold mb-1">Address</h5>
            <p>Please enter the company address details</p>
          </div>
          <div className="border-bottom mb-3">
            <div className="row">
              <div className="col-md-12">
                <div className="mb-3">
                  <label className="form-label">Address</label>
                  <input type="text" className="form-control" />
                </div>
              </div>
              <div className="col-xl-3 col-md-4">
                <div className="mb-3">
                  <label className="form-label">Country</label>
                  <input type="text" className="form-control" />
                </div>
              </div>
              <div className="col-xl-3 col-md-4">
                <div className="mb-3">
                  <label className="form-label">State / Province</label>
                  <input type="text" className="form-control" />
                </div>
              </div>
              <div className="col-xl-3 col-md-4">
                <div className="mb-3">
                  <label className="form-label">Fax</label>
                  <input type="text" className="form-control" />
                </div>
              </div>
              <div className="col-xl-3 col-md-4">
                <div className="mb-3">
                  <label className="form-label">Postal Code</label>
                  <input type="text" className="form-control" />
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
    {/* /Company Settings */}
  </div>
</div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanySettings;
