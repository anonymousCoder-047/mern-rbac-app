import React from "react";
import ImageWithBasePath from "../../../core/common/imageWithBasePath";
import { all_routes } from "../../router/all_routes";
import { Link } from "react-router-dom";
import CollapseHeader from "../../../core/common/collapse-header";
import Select from "react-select";

const Language = () => {
  const route = all_routes;
  const fileData = [
    { value: "Inventory", label: "1" },
    { value: "Expense", label: "2" },
    { value: "Product", label: "3" },
  ];
  const languageOptions = [
    { value: "english", label: "English" },
    { value: "spanish", label: "Spanish" },
  ];
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
                  {/* Custom Fields */}
                  <div className="card">
                    <div className="card-body">
                      <h4 className="fw-semibold mb-3">Language</h4>
                      {/* Search */}
                      <div className="row">
                        <div className="col-xl-3 col-md-3 col-lg-5">
                          <div className="mb-3 icon-form">
                            <span className="form-icon">
                              <i className="ti ti-search" />
                            </span>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Search Language"
                            />
                          </div>
                        </div>
                        <div className="col-xl-9 col-md-9 col-lg-12">
                          <div className="d-flex align-items-center flex-wrap justify-content-sm-end">
                            <div className="dropdown me-2 mb-3">
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
                                    <Link to="#" className="dropdown-item">
                                      <i className="ti ti-file-type-pdf text-danger me-1" />
                                      Export as PDF
                                    </Link>
                                  </li>
                                  <li>
                                    <Link to="#" className="dropdown-item">
                                      <i className="ti ti-file-type-xls text-green me-1" />
                                      Export as Excel{" "}
                                    </Link>
                                  </li>
                                </ul>
                              </div>
                            </div>
                            <Link
                              to="#"
                              className="btn btn-primary me-2 mb-3"
                              data-bs-toggle="modal"
                              data-bs-target="#import_sample"
                            >
                              <i className="ti ti-download me-2" />
                              Import Sample
                            </Link>
                            <Link
                              to="#"
                              className="btn btn-primary mb-3"
                              data-bs-toggle="modal"
                              data-bs-target="#add_translation"
                            >
                              <i className="ti ti-square-rounded-plus me-2" />
                              Add Translation
                            </Link>
                          </div>
                        </div>
                      </div>
                      {/* /Search */}
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
                                <Link to="#" className="dropdown-item">
                                  <i className="ti ti-circle-chevron-right me-1" />
                                  Ascending
                                </Link>
                              </li>
                              <li>
                                <Link to="#" className="dropdown-item">
                                  <i className="ti ti-circle-chevron-right me-1" />
                                  Descending
                                </Link>
                              </li>
                              <li>
                                <Link to="#" className="dropdown-item">
                                  <i className="ti ti-circle-chevron-right me-1" />
                                  Recently Viewed
                                </Link>
                              </li>
                              <li>
                                <Link to="#" className="dropdown-item">
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
                                  Language
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
                                  Code
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
                                  RTL
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
                                  Total
                                </p>
                                <div className="status-toggle">
                                  <input
                                    type="checkbox"
                                    id="col-tag"
                                    className="check"
                                  />
                                  <label
                                    htmlFor="col-tag"
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
                              <div className="d-flex align-items-center justify-content-between mb-3">
                                <p className="mb-0 d-flex align-items-center">
                                  <i className="ti ti-grip-vertical me-2" />
                                  Status
                                </p>
                                <div className="status-toggle">
                                  <input
                                    type="checkbox"
                                    id="col-owner"
                                    className="check"
                                  />
                                  <label
                                    htmlFor="col-owner"
                                    className="checktoggle"
                                  />
                                </div>
                              </div>
                              <div className="d-flex align-items-center justify-content-between mb-3">
                                <p className="mb-0 d-flex align-items-center">
                                  <i className="ti ti-grip-vertical me-2" />
                                  Contact
                                </p>
                                <div className="status-toggle">
                                  <input
                                    type="checkbox"
                                    id="col-contact"
                                    className="check"
                                    defaultChecked
                                  />
                                  <label
                                    htmlFor="col-contact"
                                    className="checktoggle"
                                  />
                                </div>
                              </div>
                              <div className="d-flex align-items-center justify-content-between mb-3">
                                <p className="mb-0 d-flex align-items-center">
                                  <i className="ti ti-grip-vertical me-2" />
                                  Status
                                </p>
                                <div className="status-toggle">
                                  <input
                                    type="checkbox"
                                    id="col-status"
                                    className="check"
                                  />
                                  <label
                                    htmlFor="col-status"
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
                      {/* Contact List */}
                      <div className="table-responsive custom-table">
                        <div className="table-responsive custom-table">
                          <table
                            className="table dataTable no-footer"
                            id="language-list"
                            style={{ width: "974px" }}
                          >
                            <thead className="thead-light">
                              <tr>
                                <th
                                  className="no-sort sorting sorting_asc"
                                  tabIndex={0}
                                  aria-controls="language-list"
                                  rowSpan={1}
                                  colSpan={1}
                                  aria-label=": activate to sort column descending"
                                  style={{ width: "11px" }}
                                  aria-sort="ascending"
                                />
                                <th
                                  className="no-sort sorting"
                                  tabIndex={0}
                                  aria-controls="language-list"
                                  rowSpan={1}
                                  colSpan={1}
                                  aria-label=": activate to sort column ascending"
                                  style={{ width: "2px" }}
                                />
                                <th
                                  className="sorting"
                                  tabIndex={0}
                                  aria-controls="language-list"
                                  rowSpan={1}
                                  colSpan={1}
                                  aria-label="Language: activate to sort column ascending"
                                  style={{ width: "77px" }}
                                >
                                  Language
                                </th>
                                <th
                                  className="sorting"
                                  tabIndex={0}
                                  aria-controls="language-list"
                                  rowSpan={1}
                                  colSpan={1}
                                  aria-label="Code: activate to sort column ascending"
                                  style={{ width: "35px" }}
                                >
                                  Code
                                </th>
                                <th
                                  className="sorting"
                                  tabIndex={0}
                                  aria-controls="language-list"
                                  rowSpan={1}
                                  colSpan={1}
                                  aria-label="RTL: activate to sort column ascending"
                                  style={{ width: "25px" }}
                                >
                                  RTL
                                </th>
                                <th
                                  className="sorting"
                                  tabIndex={0}
                                  aria-controls="language-list"
                                  rowSpan={1}
                                  colSpan={1}
                                  aria-label="Total: activate to sort column ascending"
                                  style={{ width: "33px" }}
                                >
                                  Total
                                </th>
                                <th
                                  className="sorting"
                                  tabIndex={0}
                                  aria-controls="language-list"
                                  rowSpan={1}
                                  colSpan={1}
                                  aria-label="Done: activate to sort column ascending"
                                  style={{ width: "36px" }}
                                >
                                  Done
                                </th>
                                <th
                                  className="sorting"
                                  tabIndex={0}
                                  aria-controls="language-list"
                                  rowSpan={1}
                                  colSpan={1}
                                  aria-label="Progress: activate to sort column ascending"
                                  style={{ width: "102px" }}
                                >
                                  Progress
                                </th>
                                <th
                                  className="sorting"
                                  tabIndex={0}
                                  aria-controls="language-list"
                                  rowSpan={1}
                                  colSpan={1}
                                  aria-label="Status: activate to sort column ascending"
                                  style={{ width: "50px" }}
                                >
                                  Status
                                </th>
                                <th
                                  className="sorting"
                                  tabIndex={0}
                                  aria-controls="language-list"
                                  rowSpan={1}
                                  colSpan={1}
                                  aria-label="Action: activate to sort column ascending"
                                  style={{ width: "223px" }}
                                >
                                  Action
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr className="odd">
                                <td className="sorting_1">
                                  <label className="checkboxs">
                                    <input type="checkbox" />
                                    <span className="checkmarks" />
                                  </label>
                                </td>
                                <td>
                                  <div className="set-star rating-select">
                                    <i className="fa fa-star" />
                                  </div>
                                </td>
                                <td>
                                  <h2 className="table-avatar d-flex align-items-center">
                                    <Link
                                      to="#"
                                      className="avatar avatar-sm border me-2"
                                    >
                                      <ImageWithBasePath
                                        className="w-auto h-auto"
                                        src="assets/img/icons/flag-01.svg"
                                        alt="User Image"
                                      />
                                    </Link>
                                    <Link
                                      to="#"
                                      className="profile-split d-flex flex-column"
                                    >
                                      English
                                    </Link>
                                  </h2>
                                </td>
                                <td>en</td>
                                <td>
                                  <div className="status-toggle">
                                    <input
                                      type="checkbox"
                                      id="English"
                                      className="check"
                                    />
                                    <label
                                      htmlFor="English"
                                      className="checktoggle"
                                    >
                                      /label&gt;
                                    </label>
                                  </div>
                                </td>
                                <td>3481</td>
                                <td>2861</td>
                                <td>
                                  <div className="pipeline-progress d-flex align-items-center">
                                    <div className="progress">
                                      <div
                                        className="progress-bar progress-bar-warning"
                                        role="progressbar"
                                      />
                                    </div>
                                    <span>80%</span>
                                  </div>
                                </td>
                                <td>
                                  <span className="badge badge-pill badge-status bg-success">
                                    Active
                                  </span>
                                </td>
                                <td>
                                  <div className="d-flex align-items-center">
                                    <ul className="lang-type">
                                      <li>
                                        <Link to={route.languageWeb}>Web</Link>
                                      </li>
                                      <li>
                                        <Link to="#">App</Link>
                                      </li>
                                      <li>
                                        <Link to="#">Admin</Link>
                                      </li>
                                    </ul>
                                    <div className="dropdown table-action">
                                      <Link
                                        to="#"
                                        className="action-icon "
                                        data-bs-toggle="dropdown"
                                        aria-expanded="false"
                                      >
                                        <i className="fa fa-ellipsis-v" />
                                      </Link>
                                      <div className="dropdown-menu dropdown-menu-right">
                                        <Link
                                          className="dropdown-item"
                                          to="#"
                                          data-bs-toggle="modal"
                                          data-bs-target="#edit_translation"
                                        >
                                          <i className="ti ti-edit text-blue" />{" "}
                                          Edit
                                        </Link>
                                        <Link
                                          className="dropdown-item"
                                          to="#"
                                          data-bs-toggle="modal"
                                          data-bs-target="#delete_translation"
                                        >
                                          <i className="ti ti-trash text-danger" />{" "}
                                          Delete
                                        </Link>
                                      </div>
                                    </div>
                                  </div>
                                </td>
                              </tr>
                              <tr className="even">
                                <td className="sorting_1">
                                  <label className="checkboxs">
                                    <input type="checkbox" />
                                    <span className="checkmarks" />
                                  </label>
                                </td>
                                <td>
                                  <div className="set-star rating-select">
                                    <i className="fa fa-star" />
                                  </div>
                                </td>
                                <td>
                                  <h2 className="table-avatar d-flex align-items-center">
                                    <Link
                                      to="#"
                                      className="avatar avatar-sm border me-2"
                                    >
                                      <ImageWithBasePath
                                        className="w-auto h-auto"
                                        src="assets/img/icons/flag-02.svg"
                                        alt="User Image"
                                      />
                                    </Link>
                                    <Link
                                      to="#"
                                      className="profile-split d-flex flex-column"
                                    >
                                      Arabic
                                    </Link>
                                  </h2>
                                </td>
                                <td>ar</td>
                                <td>
                                  <div className="status-toggle">
                                    <input
                                      type="checkbox"
                                      id="Arabic"
                                      className="check"
                                      defaultChecked
                                    />
                                    <label
                                      htmlFor="Arabic"
                                      className="checktoggle"
                                    >
                                      /label&gt;
                                    </label>
                                  </div>
                                </td>
                                <td>4815</td>
                                <td>4815</td>
                                <td>
                                  <div className="pipeline-progress d-flex align-items-center">
                                    <div className="progress">
                                      <div
                                        className="progress-bar progress-bar-success"
                                        role="progressbar"
                                      />
                                    </div>
                                    <span>100%</span>
                                  </div>
                                </td>
                                <td>
                                  <span className="badge badge-pill badge-status bg-success">
                                    Active
                                  </span>
                                </td>
                                <td>
                                  <div className="d-flex align-items-center">
                                    <ul className="lang-type">
                                      <li>
                                        <Link to={route.languageWeb}>Web</Link>
                                      </li>
                                      <li>
                                        <Link to="#">App</Link>
                                      </li>
                                      <li>
                                        <Link to="#">Admin</Link>
                                      </li>
                                    </ul>
                                    <div className="dropdown table-action">
                                      <Link
                                        to="#"
                                        className="action-icon "
                                        data-bs-toggle="dropdown"
                                        aria-expanded="false"
                                      >
                                        <i className="fa fa-ellipsis-v" />
                                      </Link>
                                      <div className="dropdown-menu dropdown-menu-right">
                                        <Link
                                          className="dropdown-item"
                                          to="#"
                                          data-bs-toggle="modal"
                                          data-bs-target="#edit_translation"
                                        >
                                          <i className="ti ti-edit text-blue" />{" "}
                                          Edit
                                        </Link>
                                        <Link
                                          className="dropdown-item"
                                          to="#"
                                          data-bs-toggle="modal"
                                          data-bs-target="#delete_translation"
                                        >
                                          <i className="ti ti-trash text-danger" />{" "}
                                          Delete
                                        </Link>
                                      </div>
                                    </div>
                                  </div>
                                </td>
                              </tr>
                              <tr className="odd">
                                <td className="sorting_1">
                                  <label className="checkboxs">
                                    <input type="checkbox" />
                                    <span className="checkmarks" />
                                  </label>
                                </td>
                                <td>
                                  <div className="set-star rating-select">
                                    <i className="fa fa-star" />
                                  </div>
                                </td>
                                <td>
                                  <h2 className="table-avatar d-flex align-items-center">
                                    <Link
                                      to="#"
                                      className="avatar avatar-sm border me-2"
                                    >
                                      <ImageWithBasePath
                                        className="w-auto h-auto"
                                        src="assets/img/icons/flag-03.svg"
                                        alt="User Image"
                                      />
                                    </Link>
                                    <Link
                                      to="#"
                                      className="profile-split d-flex flex-column"
                                    >
                                      Chinese
                                    </Link>
                                  </h2>
                                </td>
                                <td>zh</td>
                                <td>
                                  <div className="status-toggle">
                                    <input
                                      type="checkbox"
                                      id="Chinese"
                                      className="check"
                                      defaultChecked
                                    />
                                    <label
                                      htmlFor="Chinese"
                                      className="checktoggle"
                                    >
                                      /label&gt;
                                    </label>
                                  </div>
                                </td>
                                <td>2590</td>
                                <td>250</td>
                                <td>
                                  <div className="pipeline-progress d-flex align-items-center">
                                    <div className="progress">
                                      <div
                                        className="progress-bar progress-bar-danger"
                                        role="progressbar"
                                      />
                                    </div>
                                    <span>5%</span>
                                  </div>
                                </td>
                                <td>
                                  <span className="badge badge-pill badge-status bg-success">
                                    Active
                                  </span>
                                </td>
                                <td>
                                  <div className="d-flex align-items-center">
                                    <ul className="lang-type">
                                      <li>
                                        <Link to={route.languageWeb}>Web</Link>
                                      </li>
                                      <li>
                                        <Link to="#">App</Link>
                                      </li>
                                      <li>
                                        <Link to="#">Admin</Link>
                                      </li>
                                    </ul>
                                    <div className="dropdown table-action">
                                      <Link
                                        to="#"
                                        className="action-icon "
                                        data-bs-toggle="dropdown"
                                        aria-expanded="false"
                                      >
                                        <i className="fa fa-ellipsis-v" />
                                      </Link>
                                      <div className="dropdown-menu dropdown-menu-right">
                                        <Link
                                          className="dropdown-item"
                                          to="#"
                                          data-bs-toggle="modal"
                                          data-bs-target="#edit_translation"
                                        >
                                          <i className="ti ti-edit text-blue" />{" "}
                                          Edit
                                        </Link>
                                        <Link
                                          className="dropdown-item"
                                          to="#"
                                          data-bs-toggle="modal"
                                          data-bs-target="#delete_translation"
                                        >
                                          <i className="ti ti-trash text-danger" />{" "}
                                          Delete
                                        </Link>
                                      </div>
                                    </div>
                                  </div>
                                </td>
                              </tr>
                              <tr className="even">
                                <td className="sorting_1">
                                  <label className="checkboxs">
                                    <input type="checkbox" />
                                    <span className="checkmarks" />
                                  </label>
                                </td>
                                <td>
                                  <div className="set-star rating-select">
                                    <i className="fa fa-star" />
                                  </div>
                                </td>
                                <td>
                                  <h2 className="table-avatar d-flex align-items-center">
                                    <Link
                                      to="#"
                                      className="avatar avatar-sm border me-2"
                                    >
                                      <ImageWithBasePath
                                        className="w-auto h-auto"
                                        src="assets/img/icons/flag-04.svg"
                                        alt="User Image"
                                      />
                                    </Link>
                                    <Link
                                      to="#"
                                      className="profile-split d-flex flex-column"
                                    >
                                      Hindi
                                    </Link>
                                  </h2>
                                </td>
                                <td>hi</td>
                                <td>
                                  <div className="status-toggle">
                                    <input
                                      type="checkbox"
                                      id="Hindi"
                                      className="check"
                                      defaultChecked
                                    />
                                    <label
                                      htmlFor="Hindi"
                                      className="checktoggle"
                                    >
                                      /label&gt;
                                    </label>
                                  </div>
                                </td>
                                <td>1892</td>
                                <td>387</td>
                                <td>
                                  <div className="pipeline-progress d-flex align-items-center">
                                    <div className="progress">
                                      <div
                                        className="progress-bar progress-bar-info"
                                        role="progressbar"
                                      />
                                    </div>
                                    <span>40%</span>
                                  </div>
                                </td>
                                <td>
                                  <span className="badge badge-pill badge-status bg-success">
                                    Active
                                  </span>
                                </td>
                                <td>
                                  <div className="d-flex align-items-center">
                                    <ul className="lang-type">
                                      <li>
                                        <Link to={route.languageWeb}>Web</Link>
                                      </li>
                                      <li>
                                        <Link to="#">App</Link>
                                      </li>
                                      <li>
                                        <Link to="#">Admin</Link>
                                      </li>
                                    </ul>
                                    <div className="dropdown table-action">
                                      <Link
                                        to="#"
                                        className="action-icon "
                                        data-bs-toggle="dropdown"
                                        aria-expanded="false"
                                      >
                                        <i className="fa fa-ellipsis-v" />
                                      </Link>
                                      <div className="dropdown-menu dropdown-menu-right">
                                        <Link
                                          className="dropdown-item"
                                          to="#"
                                          data-bs-toggle="modal"
                                          data-bs-target="#edit_translation"
                                        >
                                          <i className="ti ti-edit text-blue" />{" "}
                                          Edit
                                        </Link>
                                        <Link
                                          className="dropdown-item"
                                          to="#"
                                          data-bs-toggle="modal"
                                          data-bs-target="#delete_translation"
                                        >
                                          <i className="ti ti-trash text-danger" />{" "}
                                          Delete
                                        </Link>
                                      </div>
                                    </div>
                                  </div>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                      <div className="row align-items-center">
                        <div className="col-md-6">
                          <div className="datatable-length" />
                        </div>
                        <div className="col-md-6">
                          <div className="datatable-paginate" />
                        </div>
                      </div>
                      {/* /Contact List */}
                    </div>
                  </div>
                  {/* /Custom Fields */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* /Page Wrapper */}
      <>
        {/* Add Translation */}
        <div className="modal fade" id="add_translation" role="dialog">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add Translation</h5>
                <button
                  className="btn-close custom-btn-close border p-1 me-0 text-dark"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                >
                  <i className="ti ti-x" />
                </button>
              </div>
              <form>
                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label">
                      Language <span className="text-danger">*</span>
                    </label>
                    <input type="text" className="form-control" />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">
                      Code <span className="text-danger">*</span>
                    </label>
                    <input type="text" className="form-control" />
                  </div>
                  <div className="mb-0">
                    <label className="form-label">Status</label>
                    <div className="radio-wrap">
                      <div className="d-flex flex-wrap">
                        <div className="radio-btn">
                          <input
                            type="radio"
                            className="status-radio"
                            id="add-active"
                            name="status"
                            defaultChecked
                          />
                          <label htmlFor="add-active">Active</label>
                        </div>
                        <div className="radio-btn">
                          <input
                            type="radio"
                            className="status-radio"
                            id="add-inactive"
                            name="status"
                          />
                          <label htmlFor="add-inactive">Inactive</label>
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
                    <button
                      type="button"
                      data-bs-dismiss="modal"
                      className="btn btn-primary"
                    >
                      Save
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        {/* /Add Translation */}
        {/* Edit Translation */}
        <div className="modal fade" id="edit_translation" role="dialog">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Translation</h5>
                <button
                  className="btn-close custom-btn-close border p-1 me-0 text-dark"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                >
                  <i className="ti ti-x" />
                </button>
              </div>
              <form>
                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label">
                      Language <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      defaultValue="English"
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">
                      Code <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      defaultValue="en"
                    />
                  </div>
                  <div className="mb-0">
                    <label className="form-label">Status</label>
                    <div className="radio-wrap">
                      <div className="d-flex flex-wrap">
                        <div className="radio-btn">
                          <input
                            type="radio"
                            className="status-radio"
                            id="edit-active"
                            name="status"
                            defaultChecked
                          />
                          <label htmlFor="edit-active">Active</label>
                        </div>
                        <div className="radio-btn">
                          <input
                            type="radio"
                            className="status-radio"
                            id="edit-inactive"
                            name="status"
                          />
                          <label htmlFor="edit-inactive">Inactive</label>
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
                    <button
                      type="button"
                      data-bs-dismiss="modal"
                      className="btn btn-primary"
                    >
                      Save
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        {/* /Edit Translation */}
        {/* Import Sample */}
        <div className="modal fade" id="import_sample" role="dialog">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Import Sample</h5>
                <button
                  className="btn-close custom-btn-close border p-1 me-0 text-dark"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                >
                  <i className="ti ti-x" />
                </button>
              </div>
              <form>
                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label">
                      File <span className="text-danger">*</span>
                    </label>

                    <Select
                      options={fileData}
                      className="select"
                      placeholder="Select File"
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">
                      Language <span className="text-danger">*</span>
                    </label>

                    <Select
                      options={languageOptions}
                      className="select"
                      placeholder="Select Language"
                    />
                  </div>
                  <div className="mb-3">
                    <div className="drag-attach">
                      <input type="file" />
                      <div className="img-upload">
                        <i className="ti ti-file-broken" />
                        Upload File
                      </div>
                    </div>
                  </div>
                  <div className="mb-0">
                    <label className="form-label">Uploaded Files</label>
                    <div className="upload-file">
                      <h6>Projectneonals teyys.xls</h6>
                      <p>4.25 MB</p>
                      <div className="progress">
                        <div
                          className="progress-bar bg-success"
                          role="progressbar"
                          style={{ width: "25%" }}
                          aria-valuenow={25}
                          aria-valuemin={0}
                          aria-valuemax={100}
                        />
                      </div>
                      <p className="black-text">45%</p>
                    </div>
                    <div className="upload-file d-flex align-items-center">
                      <div>
                        <h6 className="fw-medium">tes.txt</h6>
                        <p>4.25 MB</p>
                      </div>
                      <Link to="#" className="text-danger">
                        <i className="ti ti-trash-x" />
                      </Link>
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
                    <button
                      type="button"
                      data-bs-dismiss="modal"
                      className="btn btn-primary"
                    >
                      Save
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        {/* /Import Sample */}
        {/* Delete Translation */}
        <div className="modal fade" id="delete_translation" role="dialog">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-body">
                <form>
                  <div className="text-center">
                    <div className="avatar avatar-xl bg-danger-light rounded-circle mb-3">
                      <i className="ti ti-trash-x fs-36 text-danger" />
                    </div>
                    <h4 className="mb-2">Remove Translation?</h4>
                    <p className="mb-0">Are you sure you want to remove it.</p>
                    <div className="d-flex align-items-center justify-content-center mt-4">
                      <Link
                        to="#"
                        className="btn btn-light me-2"
                        data-bs-dismiss="modal"
                      >
                        Cancel
                      </Link>
                      <button
                        type="button"
                        data-bs-dismiss="modal"
                        className="btn btn-danger"
                      >
                        Yes, Delete it
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        {/* /Delete Translation */}
      </>
    </div>
  );
};

export default Language;
