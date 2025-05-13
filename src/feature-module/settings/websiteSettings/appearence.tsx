import React, { useState } from "react";
import ImageWithBasePath from "../../../core/common/imageWithBasePath";
import { Link } from "react-router-dom";
import Select from "react-select";
import { all_routes } from "../../router/all_routes";
import CollapseHeader from "../../../core/common/collapse-header";
const route = all_routes;
const Appearance = () => {
  const options1 = [
    { value: "large", label: "Large - 250px" },
    { value: "small", label: "Small - 85px" },
  ];

  const options2 = [
    { value: "noto-sans", label: "Noto Sans" },
    { value: "nunito", label: "Nunito" },
  ];
  const [isActive, setIsActive] = useState(null);

  const setActive = (theme: any) => {
    setIsActive(theme);
  };

  return (
    <div>
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
                          <Link to={route.preference} className="fw-medium">
                            Preference
                          </Link>
                          <Link
                            to={route.appearance}
                            className="fw-medium active"
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
                  {/* Appearance */}
                  <div className="card">
                    <div className="card-body">
                      <h4 className="fw-semibold mb-3">Appearance</h4>
                      <form>
                        <div className="mb-0">
                          <div className="row">
                            <div className="col-md-4">
                              <div className="mb-3">
                                <h6 className="fw-medium">Select Theme</h6>
                                <p>Select theme of the website</p>
                              </div>
                            </div>
                            <div className="col-md-8">
                              <div className="mb-3 mb-0">
                                <div className="theme-type-images d-flex align-items-center">
                                  <div className="theme-image active">
                                    <div className="theme-image-set">
                                      <ImageWithBasePath
                                        src="assets/img/theme/theme-01.jpg"
                                        alt=""
                                      />
                                    </div>
                                    <span>Light</span>
                                  </div>
                                  <div className="theme-image">
                                    <div className="theme-image-set">
                                      <ImageWithBasePath
                                        src="assets/img/theme/theme-02.jpg"
                                        alt=""
                                      />
                                    </div>
                                    <span>Dark</span>
                                  </div>
                                  <div className="theme-image">
                                    <div className="theme-image-set">
                                      <ImageWithBasePath
                                        src="assets/img/theme/theme-03.jpg"
                                        alt=""
                                      />
                                    </div>
                                    <span>Automatic</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-md-4">
                              <div className="mb-3">
                                <h6 className="fw-medium">Accent Color</h6>
                                <p>Select accent color of website</p>
                              </div>
                            </div>
                            <div className="col-md-8">
                              <div className="mb-3">
                                <div className="theme-colors">
                                  <ul>
                                    <li>
                                      <span className="themecolorset defaultcolor active" />
                                    </li>
                                    <li>
                                      <span className="themecolorset theme-secondary" />
                                    </li>
                                    <li>
                                      <span className="themecolorset theme-violet" />
                                    </li>
                                    <li>
                                      <span className="themecolorset theme-blue" />
                                    </li>
                                    <li>
                                      <span className="themecolorset theme-brown" />
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-md-4">
                              <div className="mb-3">
                                <h6 className="fw-medium">Expand Sidebar</h6>
                                <p>To display in all the pages</p>
                              </div>
                            </div>
                            <div className="col-md-4">
                              <div className="mb-3">
                                <div className="form-check form-switch">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                    defaultChecked
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-md-4">
                              <div className="mb-3">
                                <h6 className="fw-medium">Sidebar Size</h6>
                                <p>Select size of sidebar to display</p>
                              </div>
                            </div>
                            <div className="col-md-4">
                              <div className="mb-3">
                                <Select
                                  className="select"
                                  defaultValue={options1[0]}
                                  options={options1}
                                />
                              </div>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-md-4">
                              <div className="mb-3">
                                <h6 className="fw-medium">Font Family</h6>
                                <p>Select font family of website</p>
                              </div>
                            </div>
                            <div className="col-md-4">
                              <div className="mb-3">
                                <Select
                                  className="select"
                                  defaultValue={options2[0]}
                                  options={options2}
                                />
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
                  {/* /Appearance */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Appearance;
