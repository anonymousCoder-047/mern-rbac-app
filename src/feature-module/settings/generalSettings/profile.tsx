import React from "react";
import ImageWithBasePath from "../../../core/common/imageWithBasePath";
import { Link } from "react-router-dom";
import { all_routes } from "../../router/all_routes";
import CollapseHeader from "../../../core/common/collapse-header";
const route = all_routes;
const Profile = () => {
  return (
    <div className="page-wrapper">
      <div className="content">
        <div className="row">
          <div className="col-md-12">
            {/* Page Header */}
            <div className="page-header">
              <div className="row align-items-center">
                <div className="col-sm-4">
                  <h4 className="page-title">Settings</h4>
                </div>
                <div className="col-sm-8 text-sm-end">
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
            <Link to={route.profile} className="fw-medium active">
              Profile
            </Link>
            <Link to={route.security} className="fw-medium">
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
      <div className="card-body">
        <h4 className="fw-semibold mb-3">Profile Settings</h4>
        <form>
          <div className="border-bottom mb-3 pb-3">
            <h5 className="fw-semibold mb-1">Employee Information</h5>
            <p>Provide the information below</p>
          </div>
          <div className="mb-3">
            <div className="profile-upload">
              <div className="profile-upload-img">
                <span>
                  <i className="ti ti-photo" />
                </span>
                <img
                  id="ImgPreview"
                  src="assets/img/profiles/avatar-02.jpg"
                  alt="img"
                  className="preview1"
                />
                <button
                  type="button"
                  id="removeImage1"
                  className="profile-remove"
                >
                  <i className="feather-x" />
                </button>
              </div>
              <div className="profile-upload-content">
                <label className="profile-upload-btn">
                  <i className="ti ti-file-broken" /> Upload File
                  <input type="file" id="imag" className="input-img" />
                </label>
                <p>JPG, GIF or PNG. Max size of 800K</p>
              </div>
            </div>
          </div>
          <div className="border-bottom mb-3">
            <div className="row">
              <div className="col-md-4">
                <div className="mb-3">
                  <label className="form-label">
                    First Name <span className="text-danger">*</span>
                  </label>
                  <input type="text" className="form-control" />
                </div>
              </div>
              <div className="col-md-4">
                <div className="mb-3">
                  <label className="form-label">
                    Last Name <span className="text-danger">*</span>
                  </label>
                  <input type="text" className="form-control" />
                </div>
              </div>
              <div className="col-md-4">
                <div className="mb-3">
                  <label className="form-label">
                    User Name <span className="text-danger">*</span>
                  </label>
                  <input type="text" className="form-control" />
                </div>
              </div>
              <div className="col-md-4">
                <div className="mb-3">
                  <label className="form-label">
                    Phone Number <span className="text-danger">*</span>
                  </label>
                  <input type="text" className="form-control" />
                </div>
              </div>
              <div className="col-md-4">
                <div className="mb-3">
                  <label className="form-label">
                    Email <span className="text-danger">*</span>
                  </label>
                  <input type="text" className="form-control" />
                </div>
              </div>
            </div>
          </div>
          <div className="border-bottom mb-3 pb-3">
            <h5 className="fw-semibold mb-1">Address</h5>
            <p>Please enter the address details</p>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="mb-3">
                <label className="form-label">
                  Address <span className="text-danger">*</span>
                </label>
                <input type="text" className="form-control" />
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="mb-3">
                <label className="form-label">
                  Country <span className="text-danger">*</span>
                </label>
                <input type="text" className="form-control" />
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="mb-3">
                <label className="form-label">
                  State / Province <span className="text-danger">*</span>
                </label>
                <input type="text" className="form-control" />
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="mb-3">
                <label className="form-label">
                  City <span className="text-danger">*</span>
                </label>
                <input type="text" className="form-control" />
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="mb-3">
                <label className="form-label">
                  Postal Code <span className="text-danger">*</span>
                </label>
                <input type="text" className="form-control" />
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
    {/* /Settings Info */}
  </div>
</div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
