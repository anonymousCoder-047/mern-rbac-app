import React from "react";
import Select from "react-select";
import { Link } from "react-router-dom";
import { all_routes } from "../../router/all_routes";
import CollapseHeader from "../../../core/common/collapse-header";
import ImageWithBasePath from "../../../core/common/imageWithBasePath";
const route = all_routes;
const InvoiceSettings = () => {
  const options1 = [
    { value: "5", label: "5" },
    { value: "7", label: "7" },
  ];

  const options2 = [
    { value: "roundoff-up", label: "Roundoff Up" },
    { value: "roundoff-down", label: "Roundoff Down" },
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
                        className="nav-link px-0 "
                      >
                        <i className="ti ti-world-cog" /> Website Settings
                      </Link>
                    </li>
                    <li className="nav-item me-3">
                      <Link
                        to={route.invoiceSettings}
                        className="nav-link px-0 active"
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
          <h4 className="fw-semibold mb-3">App Settings</h4>
          <div className="list-group list-group-flush settings-sidebar">
            <Link to={route.invoiceSettings} className="fw-medium active">
              Invoice Settings
            </Link>
            <Link to={route.printers} className="fw-medium">
              Printer
            </Link>
            <Link to={route.customFields} className="fw-medium">
              Custom Fields
            </Link>
          </div>
        </div>
      </div>
    </div>
    {/* /Settings Sidebar */}
  </div>
  <div className="col-xl-9 col-lg-12">
    {/* Invoice Settings */}
    <div className="card">
      <div className="card-body">
        <h4 className="fw-semibold mb-3">Invoice Settings</h4>
        <form >
          <div className="row">
            <div className="col-md-6">
              <div className="mb-3">
                <h6 className="fw-medium">Invoice Logo</h6>
                <p>Upload logo of your company to display in invoice</p>
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
                      id="ImgPreview"
                      src="assets/img/logo.svg"
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
                    <p>
                      Upload Logo of your company to display in website(JPG or
                      PNG). Max size of 800K
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <div className="mb-3">
                <h6 className="fw-medium">Invoice Prefix</h6>
                <p>Add prefix to your invoice</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  defaultValue="INV-"
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <div className="mb-3">
                <h6 className="fw-medium">Invoice Due</h6>
                <p>Select due date to display in invoice</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="mb-3">
                <div className="d-flex align-items-center inv-days">
                  <div className="select-drop">
                  <Select
                                     classNamePrefix="react-select"
                                    className="select"
                                    defaultValue={options1[0]}
                                    options={options1}
                                  />
                  </div>
                  <p>Days</p>
                </div>
              </div>
            </div>
          </div>
          <div className="row align-items-center">
            <div className="col-md-6">
              <div className="mb-3">
                <h6 className="fw-medium">Invoice Round Off</h6>
                <p>Value roundoff in invoice</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="mb-3">
                <div className="d-flex align-items-center">
                  <div className="form-check form-switch me-2">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      role="switch"
                      defaultChecked
                    />
                  </div>
                  <div className="select-drop w-100">
                  <Select
                                    className="select"
                                    defaultValue={options2[0]}
                                    options={options2}
                                  />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row align-items-center">
            <div className="col-md-6">
              <div className="mb-3">
                <h6 className="fw-medium">Show Company Details</h6>
                <p>Show/hide company details in invoice</p>
              </div>
            </div>
            <div className="col-md-6">
              <div className="mb-3">
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
          <div className="row">
            <div className="col-md-6">
              <div className="mb-3">
                <h6 className="fw-medium">Invoice Header Terms</h6>
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
                <h6 className="fw-medium">Invoice Footer Terms</h6>
              </div>
            </div>
            <div className="col-md-6">
              <div className="mb-3">
                <div className="summernote" />
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
    {/* /Invoice Settings */}
  </div>
</div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceSettings;
