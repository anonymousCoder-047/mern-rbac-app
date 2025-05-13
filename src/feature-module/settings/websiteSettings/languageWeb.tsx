import React from "react";
import { Link } from "react-router-dom";
import { all_routes } from "../../router/all_routes";
import CollapseHeader from "../../../core/common/collapse-header";
import ImageWithBasePath from "../../../core/common/imageWithBasePath";
const LanguageWeb = () => {
  const route = all_routes;

  return (
    <>
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
                     <CollapseHeader/>
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
                          <Link to={route.appearance} className="fw-medium">
                            Appearance
                          </Link>
                          <Link
                            to={route.language}
                            className="fw-medium active"
                          >
                            Language
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* /Settings Sidebar */}
                </div>
                <div className="col-xl-9 col-lg-12">
                  {/* Language Web */}
                  <div className="card">
                    <div className="card-header">
                      <div>
                        <div className="mb-4">
                          <h4 className="fs-20">Language</h4>
                        </div>
                        <div className="row gy-3">
                          <div className="col-xl-5 col-md-3 col-lg-5">
                            <div className="">
                              <div className="d-flex align-items-center">
                                <div className="lang-flag me-2">
                                  <Link to="#">
                                    <ImageWithBasePath
                                      className="avatar-img"
                                      src="assets/img/icons/flag-02.svg"
                                      alt="Flag"
                                    />
                                    <span>Arabic</span>
                                  </Link>
                                </div>
                                <ul className="lang-direct d-flex align-items-center">
                                  <li>
                                    <Link
                                      to="#"
                                      className="active"
                                    >
                                      LTR
                                    </Link>
                                  </li>
                                  <li>
                                    <Link to="#">RTL</Link>
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </div>
                          <div className="col-xl-7 col-md-9 col-lg-12">
                            <div className="d-flex align-items-center flex-wrap row-gap-2 justify-content-sm-end">
                              <div className="dropdown me-2">
                                <Link
                                  to="#"
                                  className="dropdown-toggle"
                                  data-bs-toggle="dropdown"
                                >
                                  <i className="ti ti-package-export me-2" />
                                  Export
                                </Link>
                                <div className="dropdown-menu  dropdown-menu-end">
                                  <ul>
                                    <li>
                                      <Link
                                        to="#"
                                        className="dropdown-item"
                                      >
                                        <i className="ti ti-file-type-pdf text-danger me-1" />
                                        Export as PDF
                                      </Link>
                                    </li>
                                    <li>
                                      <Link
                                        to="#"
                                        className="dropdown-item"
                                      >
                                        <i className="ti ti-file-type-xls text-green me-1" />
                                        Export as Excel{" "}
                                      </Link>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                              <Link
                                to={route.language}
                                className="btn btn-primary"
                              >
                                <i className="ti ti-arrow-narrow-left me-2" />
                                Back to Translation
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="card-body">
                      {/* Filter */}
                      <div className="d-flex align-items-center justify-content-between flex-wrap mb-2">
                        <div className="dropdown mb-3">
                          <Link
                            to="#"
                            className="dropdown-toggle"
                            data-bs-toggle="dropdown"
                          >
                            <i className="ti ti-sort-ascending-2 me-2" />
                            Sort{" "}
                          </Link>
                          <div className="dropdown-menu  dropdown-menu-start">
                            <ul>
                              <li>
                                <Link
                                  to="#"
                                  className="dropdown-item"
                                >
                                  <i className="ti ti-circle-chevron-right me-1" />
                                  Ascending
                                </Link>
                              </li>
                              <li>
                                <Link
                                  to="#"
                                  className="dropdown-item"
                                >
                                  <i className="ti ti-circle-chevron-right me-1" />
                                  Descending
                                </Link>
                              </li>
                              <li>
                                <Link
                                  to="#"
                                  className="dropdown-item"
                                >
                                  <i className="ti ti-circle-chevron-right me-1" />
                                  Recently Viewed
                                </Link>
                              </li>
                              <li>
                                <Link
                                  to="#"
                                  className="dropdown-item"
                                >
                                  <i className="ti ti-circle-chevron-right me-1" />
                                  Recently Added
                                </Link>
                              </li>
                            </ul>
                          </div>
                        </div>
                        <div className="dropdown mb-3">
                          <Link
                            to="#"
                            className="btn bg-soft-purple text-purple"
                            data-bs-toggle="dropdown"
                            data-bs-auto-close="outside"
                          >
                            <i className="ti ti-columns-3 me-2" />
                            Manage Columns
                          </Link>
                          <div className="dropdown-menu  dropdown-menu-md-end dropdown-md p-3">
                            <h4 className="mb-2 fw-semibold">
                              Want to manage datatables?
                            </h4>
                            <p className="mb-3">
                              Please drag and drop your column to reorder your
                              table and enable see option as you want.
                            </p>
                            <div className="border-top pt-3">
                              <div className="d-flex align-items-center justify-content-between mb-3">
                                <p className="mb-0 d-flex align-items-center">
                                  <i className="ti ti-grip-vertical me-2" />
                                  Medium
                                </p>
                                <div className="status-toggle">
                                  <input
                                    type="checkbox"
                                    id="col-name"
                                    className="check"
                                  />
                                  <label
                                    htmlFor="col-name"
                                    className="checktoggle"
                                  />
                                </div>
                              </div>
                              <div className="d-flex align-items-center justify-content-between mb-3">
                                <p className="mb-0 d-flex align-items-center">
                                  <i className="ti ti-grip-vertical me-2" />
                                  File
                                </p>
                                <div className="status-toggle">
                                  <input
                                    type="checkbox"
                                    id="col-phone"
                                    className="check"
                                  />
                                  <label
                                    htmlFor="col-phone"
                                    className="checktoggle"
                                  />
                                </div>
                              </div>
                              <div className="d-flex align-items-center justify-content-between mb-3">
                                <p className="mb-0 d-flex align-items-center">
                                  <i className="ti ti-grip-vertical me-2" />
                                  Total
                                </p>
                                <div className="status-toggle">
                                  <input
                                    type="checkbox"
                                    id="col-email"
                                    className="check"
                                  />
                                  <label
                                    htmlFor="col-email"
                                    className="checktoggle"
                                  />
                                </div>
                              </div>
                              <div className="d-flex align-items-center justify-content-between mb-3">
                                <p className="mb-0 d-flex align-items-center">
                                  <i className="ti ti-grip-vertical me-2" />
                                  Done
                                </p>
                                <div className="status-toggle">
                                  <input
                                    type="checkbox"
                                    id="col-loc"
                                    className="check"
                                  />
                                  <label
                                    htmlFor="col-loc"
                                    className="checktoggle"
                                  />
                                </div>
                              </div>
                              <div className="d-flex align-items-center justify-content-between mb-3">
                                <p className="mb-0 d-flex align-items-center">
                                  <i className="ti ti-grip-vertical me-2" />
                                  Progress
                                </p>
                                <div className="status-toggle">
                                  <input
                                    type="checkbox"
                                    id="col-rate"
                                    className="check"
                                  />
                                  <label
                                    htmlFor="col-rate"
                                    className="checktoggle"
                                  />
                                </div>
                              </div>
                              <div className="d-flex align-items-center justify-content-between">
                                <p className="mb-0 d-flex align-items-center">
                                  <i className="ti ti-grip-vertical me-2" />
                                  Action
                                </p>
                                <div className="status-toggle">
                                  <input
                                    type="checkbox"
                                    id="col-action"
                                    className="check"
                                  />
                                  <label
                                    htmlFor="col-action"
                                    className="checktoggle"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* /Filter */}
                      {/* Language List */}
                      <div className="table-responsive custom-table">
                        <table className="table" id="language-web">
                          <thead className="thead-light">
                            <tr>
                              <th className="no-sort" />
                              <th className="no-sort" />
                              <th>Medium</th>
                              <th>File</th>
                              <th>Total</th>
                              <th>Done</th>
                              <th>Progress</th>
                              <th>Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr className="odd">
                              <td className="sorting_1">
                                <label className="checkboxs">
                                  <input type="checkbox" />
                                  <span className="checkmarks"></span>
                                </label>
                              </td>
                              <td>
                                <div className="set-star rating-select">
                                  <i className="fa fa-star"></i>
                                </div>
                              </td>
                              <td>Web</td>
                              <td>
                                <span className="black-text">Inventory</span>
                              </td>
                              <td>3481</td>
                              <td>2861</td>
                              <td>
                                <div className="pipeline-progress d-flex align-items-center">
                                  <div className="progress">
                                    <div
                                      className="progress-bar progress-bar-warning"
                                      role="progressbar"
                                    ></div>
                                  </div>
                                  <span>80%</span>
                                </div>
                              </td>
                              <td>
                                <Link
                                  to="#"
                                  data-bs-toggle="modal"
                                  data-bs-target="#add_translate"
                                >
                                  <i className="ti ti-edit text-black"></i>
                                </Link>
                              </td>
                            </tr>
                            <tr className="even">
                              <td className="sorting_1">
                                <label className="checkboxs">
                                  <input type="checkbox" />
                                  <span className="checkmarks"></span>
                                </label>
                              </td>
                              <td>
                                <div className="set-star rating-select">
                                  <i className="fa fa-star"></i>
                                </div>
                              </td>
                              <td>Web</td>
                              <td>
                                <span className="black-text">Expense</span>
                              </td>
                              <td>4815</td>
                              <td>4815</td>
                              <td>
                                <div className="pipeline-progress d-flex align-items-center">
                                  <div className="progress">
                                    <div
                                      className="progress-bar progress-bar-success"
                                      role="progressbar"
                                    ></div>
                                  </div>
                                  <span>100%</span>
                                </div>
                              </td>
                              <td>
                                <Link
                                  to="#"
                                  data-bs-toggle="modal"
                                  data-bs-target="#add_translate"
                                >
                                  <i className="ti ti-edit text-black"></i>
                                </Link>
                              </td>
                            </tr>
                            <tr className="odd">
                              <td className="sorting_1">
                                <label className="checkboxs">
                                  <input type="checkbox" />
                                  <span className="checkmarks"></span>
                                </label>
                              </td>
                              <td>
                                <div className="set-star rating-select">
                                  <i className="fa fa-star"></i>
                                </div>
                              </td>
                              <td>Web</td>
                              <td>
                                <span className="black-text">Product</span>
                              </td>
                              <td>2590</td>
                              <td>250</td>
                              <td>
                                <div className="pipeline-progress d-flex align-items-center">
                                  <div className="progress">
                                    <div
                                      className="progress-bar progress-bar-danger"
                                      role="progressbar"
                                    ></div>
                                  </div>
                                  <span>5%</span>
                                </div>
                              </td>
                              <td>
                                <Link
                                  to="#"
                                  data-bs-toggle="modal"
                                  data-bs-target="#add_translate"
                                >
                                  <i className="ti ti-edit text-black"></i>
                                </Link>
                              </td>
                            </tr>
                            <tr className="even">
                              <td className="sorting_1">
                                <label className="checkboxs">
                                  <input type="checkbox" />
                                  <span className="checkmarks"></span>
                                </label>
                              </td>
                              <td>
                                <div className="set-star rating-select">
                                  <i className="fa fa-star"></i>
                                </div>
                              </td>
                              <td>Web</td>
                              <td>
                                <span className="black-text">Settings</span>
                              </td>
                              <td>1892</td>
                              <td>387</td>
                              <td>
                                <div className="pipeline-progress d-flex align-items-center">
                                  <div className="progress">
                                    <div
                                      className="progress-bar progress-bar-info"
                                      role="progressbar"
                                    ></div>
                                  </div>
                                  <span>40%</span>
                                </div>
                              </td>
                              <td>
                                <Link
                                  to="#"
                                  data-bs-toggle="modal"
                                  data-bs-target="#add_translate"
                                >
                                  <i className="ti ti-edit text-black"></i>
                                </Link>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      <div className="row align-items-center">
                        <div className="col-md-6">
                          <div className="datatable-length" />
                        </div>
                        <div className="col-md-6">
                          <div className="datatable-paginate" />
                        </div>
                      </div>
                      {/* /Language List */}
                    </div>
                  </div>
                  {/* /Language Web */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    {/* Add Translation */}
    <div className="modal custom-modal fade" id="add_translate" role="dialog">
        <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content">
            <form >
            <div className="modal-body pb-0">
                <div className="translate-item">
                <div className="d-flex align-items-center">
                    <div className="lang-flag">
                    <Link to="#">
                        <ImageWithBasePath
                        className="avatar-img"
                        src="assets/img/icons/flag-02.svg"
                        alt="Flag"
                        />
                        <span>Arabic</span>
                    </Link>
                    </div>
                    <div className="lang-progress">
                    <p className="mb-0">Progress</p>
                    <div className="d-flex align-items-center">
                        <div className="progress">
                        <div
                            className="progress-bar bg-blue"
                            role="progressbar"
                        />
                        </div>
                        <span className="position-static ms-2">40%</span>
                    </div>
                    </div>
                </div>
                <Link to="#" data-bs-dismiss="modal" className="btn btn-primary">
                    <i className="ti ti-arrow-narrow-left me-2" />
                    Back to Translation
                </Link>
                </div>
                <div className="translate-wrap translate-title">
                <div className="row align-items-center">
                    <div className="col-md-8">
                    <h6 className="fw-medium mb-3">English</h6>
                    </div>
                    <div className="col-md-4">
                    <h6 className="fw-medium mb-3">Arabic</h6>
                    </div>
                </div>
                </div>
                <div>
                <div className="row align-items-center">
                    <div className="col-md-8">
                    <h6 className="fw-medium mb-3">Bugs</h6>
                    </div>
                    <div className="col-md-4">
                    <div className="mb-3">
                        <input
                        type="text"
                        className="form-control"
                        defaultValue="البق"
                        />
                    </div>
                    </div>
                </div>
                </div>
                <div>
                <div className="row align-items-center">
                    <div className="col-md-8">
                    <h6 className="fw-medium mb-3">Bugs Email</h6>
                    </div>
                    <div className="col-md-4">
                    <div className="mb-3">
                        <input
                        type="text"
                        className="form-control"
                        defaultValue="البق البريد الإلكتروني"
                        />
                    </div>
                    </div>
                </div>
                </div>
                <div>
                <div className="row align-items-center">
                    <div className="col-md-8">
                    <h6 className="fw-medium mb-3">Bug Assigned</h6>
                    </div>
                    <div className="col-md-4">
                    <div className="mb-3">
                        <input
                        type="text"
                        className="form-control"
                        defaultValue="البق البريد الإلكتروني"
                        />
                    </div>
                    </div>
                </div>
                </div>
                <div>
                <div className="row align-items-center">
                    <div className="col-md-8">
                    <h6 className="fw-medium mb-3"> Bug Comments</h6>
                    </div>
                    <div className="col-md-4">
                    <div className="mb-3">
                        <input
                        type="text"
                        className="form-control"
                        defaultValue="علة تعليقات"
                        />
                    </div>
                    </div>
                </div>
                </div>
                <div>
                <div className="row align-items-center">
                    <div className="col-md-8">
                    <h6 className="fw-medium mb-3">Bug Attachment</h6>
                    </div>
                    <div className="col-md-4">
                    <div className="mb-3">
                        <input
                        type="text"
                        className="form-control"
                        defaultValue="البقعلة مرفق"
                        />
                    </div>
                    </div>
                </div>
                </div>
                <div>
                <div className="row align-items-center">
                    <div className="col-md-8">
                    <h6 className="fw-medium mb-3">Bug Updated</h6>
                    </div>
                    <div className="col-md-4">
                    <div className="mb-3">
                        <input
                        type="text"
                        className="form-control"
                        defaultValue="البق بمجلس تم الحفظ بنجاح"
                        />
                    </div>
                    </div>
                </div>
                </div>
                <div>
                <div className="row align-items-center">
                    <div className="col-md-8">
                    <h6 className="fw-medium mb-3">Bug Reported</h6>
                    </div>
                    <div className="col-md-4">
                    <div className="mb-3">
                        <input
                        type="text"
                        className="form-control"
                        defaultValue="توقيت بمجلس المحذوفة بنجاح"
                        />
                    </div>
                    </div>
                </div>
                </div>
                <div>
                <div className="row align-items-center">
                    <div className="col-md-8">
                    <h6 className="fw-medium mb-3">
                        Bugs information successfully updated
                    </h6>
                    </div>
                    <div className="col-md-4">
                    <div className="mb-3">
                        <input
                        type="text"
                        className="form-control"
                        defaultValue="البق بمجلس المحذوفة بنجاح"
                        />
                    </div>
                    </div>
                </div>
                </div>
                <div>
                <div className="row align-items-center">
                    <div className="col-md-8">
                    <h6 className="fw-medium mb-3">
                        Bugs information successfully Saved
                    </h6>
                    </div>
                    <div className="col-md-4">
                    <div className="mb-3">
                        <input
                        type="text"
                        className="form-control"
                        defaultValue="علة التحديث"
                        />
                    </div>
                    </div>
                </div>
                </div>
                <div>
                <div className="row align-items-center">
                    <div className="col-md-8">
                    <h6 className="fw-medium mb-3">
                        Timer information successfully Deleted
                    </h6>
                    </div>
                    <div className="col-md-4">
                    <div className="mb-3">
                        <input
                        type="text"
                        className="form-control"
                        defaultValue="آخر البق الجديدة التي تمت إضافتها"
                        />
                    </div>
                    </div>
                </div>
                </div>
                <div>
                <div className="row align-items-center">
                    <div className="col-md-8">
                    <h6 className="fw-medium mb-3">
                        Bugs infromation successfully Deleted
                    </h6>
                    </div>
                    <div className="col-md-4">
                    <div className="mb-3">
                        <input
                        type="text"
                        className="form-control"
                        defaultValue="جميع البق"
                        />
                    </div>
                    </div>
                </div>
                </div>
                <div>
                <div className="row align-items-center">
                    <div className="col-md-8">
                    <h6 className="fw-medium mb-3">Bug Updated</h6>
                    </div>
                    <div className="col-md-4">
                    <div className="mb-3">
                        <input
                        type="text"
                        className="form-control"
                        defaultValue="البق بمجلس تم الحفظ بنجاح"
                        />
                    </div>
                    </div>
                </div>
                </div>
            </div>
            <div className="modal-footer">
                <div className="d-flex align-items-center">
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
    {/* /Add Translation */}

    </>
  );
};

export default LanguageWeb;
