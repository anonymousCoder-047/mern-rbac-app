import React from 'react'
import ImageWithBasePath from '../../../core/common/imageWithBasePath'
import { Link } from 'react-router-dom'
import { all_routes } from '../../router/all_routes';

const ProjectDetails = () => {
  const route = all_routes;
  return (
    <div>
        <>
  {/* Page Wrapper */}
  <div className="page-wrapper">
    <div className="content">
      <div className="row">
        <div className="col-md-12">
          {/* Page Header */}
          <div className="page-header">
            <div className="row align-items-center">
              <div className="col-sm-4">
                <h4 className="page-title">Project Overview</h4>
              </div>
              <div className="col-sm-8 text-sm-end">
                <div className="head-icons">
                  <Link
                    to={route.projectDetails}
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    data-bs-original-title="Refresh"
                  >
                    <i className="ti ti-refresh-dot" />
                  </Link>
                  <Link
                    to="#"
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    data-bs-original-title="Collapse"
                    id="collapse-header"
                  >
                    <i className="ti ti-chevrons-up" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
          {/* /Page Header */}
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          {/* Project User */}
          <div className="contact-head">
            <div className="row align-items-center">
              <div className="col-sm-6">
                <ul className="contact-breadcrumb">
                  <li>
                    <Link to={route.projects}>
                      <i className="ti ti-arrow-narrow-left" />
                      Project
                    </Link>
                  </li>
                  <li>Kofejob</li>
                </ul>
              </div>
              <div className="col-sm-6 text-sm-end">
                <div className="contact-pagination">
                  <p>1 of 40</p>
                  <ul>
                    <li>
                      <Link to={route.projectDetails}>
                        <i className="ti ti-chevron-left" />
                      </Link>
                    </li>
                    <li>
                      <Link to={route.projectDetails}>
                        <i className="ti ti-chevron-right" />
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="card">
            <div className="card-body pb-2">
              <div className="d-flex align-items-center justify-content-between flex-wrap">
                <div className="d-flex align-items-center mb-2">
                  <div className="avatar avatar-xxl me-3 flex-shrink-0 border p-2">
                    <ImageWithBasePath src="assets/img/priority/project-03.svg" alt="Image" />
                  </div>
                  <div>
                    <h5 className="mb-1">Kofejob</h5>
                    <p className="mb-2">Project Id :154454887</p>
                    <span className="priority badge badge-tag badge-danger-light">
                      <i className="ti ti-square-rounded-filled" />
                      High
                    </span>
                    <span className="badge badge-pill badge-status bg-success">
                      Active
                    </span>
                  </div>
                </div>
                <div className="contacts-action">
                  <span className="badge badge-light">
                    <i className="ti ti-lock" />
                    Private
                  </span>
                  <div className="dropdown action-drops">
                    <Link
                      to="#"
                      className="bg-success py-1 px-2"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <i className="ti ti-thumb-up me-2" />
                      Completed
                      <i className="ti ti-chevron-down ms-2" />
                    </Link>
                    <div className="dropdown-menu dropdown-menu-right">
                      <Link className="dropdown-item" to="#">
                        <span>Completed</span>
                      </Link>
                      <Link className="dropdown-item" to="#">
                        <span>Develop</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* /Project User */}
        </div>
        {/* Project Sidebar */}
        <div className="col-xl-3 theiaStickySidebar">
          <div className="card">
            <div className="card-body p-3">
              <h6 className="mb-3 fw-semibold">Project Information</h6>
              <ul>
                <li className="row mb-3">
                  <span className="col-6">Start Date</span>
                  <span className="col-6">27 Sep 2023, 11:45 pm</span>
                </li>
                <li className="row mb-3">
                  <span className="col-6">Due Date</span>
                  <span className="col-6">27 Sep 2024, 11:45 pm</span>
                </li>
                <li className="row mb-3">
                  <span className="col-6">Value</span>
                  <span className="col-6">$25,11,145</span>
                </li>
                <li className="row mb-3">
                  <span className="col-6">Project Type</span>
                  <span className="col-6">Mobile Application</span>
                </li>
                <li className="row mb-3">
                  <span className="col-6">Project Timing</span>
                  <span className="col-6">Hourly</span>
                </li>
              </ul>
              <hr />
              <div className="d-flex align-items-center justify-content-between flex-wrap">
                <h6 className="mb-3 fw-semibold">Client</h6>
                <Link to="#" className="link-purple mb-3">
                  <i className="ti ti-circle-plus me-1" />
                  Add New
                </Link>
              </div>
              <ul className="company-info com-info">
                <li>
                  <span>
                    <ImageWithBasePath
                      src="assets/img/icons/company-icon-08.svg"
                      alt="Image"
                    />
                  </span>
                  <div>
                    <p>Harbor View</p>
                  </div>
                </li>
              </ul>
              <hr />
              <div className="d-flex align-items-center justify-content-between flex-wrap">
                <h6 className="mb-3 fw-semibold">Responsible Persons</h6>
                <Link
                  to="#"
                  className="link-purple mb-3"
                  data-bs-toggle="modal"
                  data-bs-target="#access_view"
                >
                  <i className="ti ti-circle-plus me-1" />
                  Add New
                </Link>
              </div>
              <ul className="project-mem">
                <li>
                  <Link to="#">
                    <ImageWithBasePath src="assets/img/profiles/avatar-03.jpg" alt="img" />
                  </Link>
                </li>
                <li>
                  <Link to="#">
                    <ImageWithBasePath src="assets/img/profiles/avatar-05.jpg" alt="img" />
                  </Link>
                </li>
                <li>
                  <Link to="#">
                    <ImageWithBasePath src="assets/img/profiles/avatar-06.jpg" alt="img" />
                  </Link>
                </li>
                <li className="more-set">
                  <Link to="#">+05</Link>
                </li>
              </ul>
              <hr />
              <div className="d-flex align-items-center justify-content-between flex-wrap">
                <h6 className="mb-3 fw-semibold">Team Leader</h6>
                <Link
                  to="#"
                  className="link-purple mb-3"
                  data-bs-toggle="modal"
                  data-bs-target="#owner"
                >
                  Change
                </Link>
              </div>
              <div className="d-flex align-items-center mb-3">
                <div className="avatar avatar-md me-2">
                  <ImageWithBasePath src="assets/img/profiles/avatar-21.jpg" alt="Image" />
                </div>
                <p>Vaughan</p>
              </div>
              <hr />
              <div className="d-flex align-items-center justify-content-between flex-wrap">
                <h6 className="mb-3 fw-semibold">Priority</h6>
                <span className="priority badge badge-tag badge-danger-light mb-3">
                  <i className="ti ti-square-rounded-filled" />
                  High
                </span>
              </div>
              <hr className="mt-0" />
              <div className="d-flex align-items-center justify-content-between flex-wrap">
                <h6 className="mb-3 fw-semibold">Pipeline</h6>
                <h6 className="mb-3">
                  <i className="ti ti-timeline-event-text me-1" />
                  Marketing Pipeline
                </h6>
              </div>
              <hr className="mt-0" />
              <ul>
                <li className="row mb-3">
                  <span className="col-6">Last Modified</span>
                  <span className="col-6">10 Jan 2024, 10:00 am</span>
                </li>
                <li className="row mb-0">
                  <span className="col-6">Modified By</span>
                  <span className="col-6">
                    <span className="avatar avatar-xs me-1">
                      <ImageWithBasePath
                        src="assets/img/profiles/avatar-19.jpg"
                        className="avatar-xs"
                        alt="img"
                      />
                    </span>
                    Darlee Robertson
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        {/* /Project Sidebar */}
        {/* Project Details */}
        <div className="col-xl-9">
          <div className="card mb-3">
            <div className="card-body pb-0">
              <div className="pipeline-list">
                <ul>
                  <li>
                    <Link to="#" className="bg-pending">
                      Plan
                    </Link>
                  </li>
                  <li>
                    <Link to="#" className="bg-warning">
                      Design
                    </Link>
                  </li>
                  <li>
                    <Link to="#" className="bg-gray">
                      Development
                    </Link>
                  </li>
                  <li>
                    <Link to="#" className="bg-gray">
                      Completed
                    </Link>
                  </li>
                </ul>
              </div>
              <ul className="nav nav-tabs nav-tabs-bottom" role="tablist">
                <li className="nav-item" role="presentation">
                  <Link
                    to="#"
                    data-bs-toggle="tab"
                    data-bs-target="#tasks"
                    className="nav-link active"
                  >
                    <i className="ti ti-subtask me-1" />
                    Tasks
                  </Link>
                </li>
                <li className="nav-item" role="presentation">
                  <Link
                    to="#"
                    data-bs-toggle="tab"
                    data-bs-target="#activities"
                    className="nav-link"
                  >
                    <i className="ti ti-alarm-minus me-1" />
                    Activities
                  </Link>
                </li>
                <li className="nav-item" role="presentation">
                  <Link
                    to="#"
                    data-bs-toggle="tab"
                    data-bs-target="#notes"
                    className="nav-link"
                  >
                    <i className="ti ti-notes me-1" />
                    Notes
                  </Link>
                </li>
                <li className="nav-item" role="presentation">
                  <Link
                    to="#"
                    data-bs-toggle="tab"
                    data-bs-target="#calls"
                    className="nav-link"
                  >
                    <i className="ti ti-phone me-1" />
                    Calls
                  </Link>
                </li>
                <li className="nav-item" role="presentation">
                  <Link
                    to="#"
                    data-bs-toggle="tab"
                    data-bs-target="#files"
                    className="nav-link"
                  >
                    <i className="ti ti-file me-1" />
                    Files
                  </Link>
                </li>
                <li className="nav-item" role="presentation">
                  <Link
                    to="#"
                    data-bs-toggle="tab"
                    data-bs-target="#email"
                    className="nav-link"
                  >
                    <i className="ti ti-mail-check me-1" />
                    Email
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          {/* Tab Content */}
          <div className="tab-content pt-0">
            {/* Tasks */}
            <div className="tab-pane active show" id="tasks">
              <div className="card">
                <div className="card-header d-flex align-items-center justify-content-between flex-wrap row-gap-3">
                  <h4 className="fw-semibold">All Tasks</h4>
                  <div className="d-inline-flex align-items-center text-end">
                    <div className="form-sort mt-0 me-2">
                      <i className="ti ti-sort-ascending-2" />
                      <select className="select">
                        <option>Sort By Date</option>
                        <option>Ascending</option>
                        <option>Descending</option>
                      </select>
                    </div>
                    <Link
                      to="#"
                      className="btn btn-primary"
                      data-bs-toggle="offcanvas"
                      data-bs-target="#offcanvas_add"
                    >
                      <i className="ti ti-circle-plus me-1" />
                      Add New Task
                    </Link>
                  </div>
                </div>
                <div className="card-body">
                  <div className="tasks-activity">
                    <div className="card border border-end-0 border-top-0 border-bottom-0 border-start border-3 border-danger mb-3">
                      <div className="card-body pb-2">
                        <div className="row align-items-center">
                          <div className="col-md-6">
                            <div className="d-flex align-items-center flex-wrap">
                              <p className="mb-2 me-3 text-gray-9">
                                <i className="ti ti-grip-vertical me-2" />
                                Add a form to Update Task
                              </p>
                              <span className="badge badge-pill badge-status bg-green mb-2 me-2">
                                <i className="ti ti-phone me-1" />
                                Calls
                              </span>
                              <span className="priority badge badge-tag badge-danger-light mb-2">
                                <i className="ti ti-square-rounded-filled me-1" />
                                High
                              </span>
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="d-flex align-items-center flex-wrap float-md-end">
                              <div className="d-flex align-items-center text-gray-9 mb-2 me-3">
                                <i className="ti ti-clock-record me-1" />
                                25 Hrs
                              </div>
                              <div className="d-flex align-items-center text-gray-9 mb-2 me-3">
                                <i className="ti ti-calendar-exclamation me-1" />
                                25 Oct 2023
                              </div>
                              <div className="d-flex align-items-center mb-2">
                                <div className="avatar avatar-sm me-2">
                                  <ImageWithBasePath
                                    src="assets/img/profiles/avatar-20.jpg"
                                    className="rounded-circle"
                                    alt="img"
                                  />
                                </div>
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
                                      data-bs-toggle="offcanvas"
                                      data-bs-target="#offcanvas_edit"
                                      to="#"
                                    >
                                      <i className="ti ti-edit text-blue" />{" "}
                                      Edit
                                    </Link>
                                    <Link
                                      className="dropdown-item"
                                      to="#"
                                      data-bs-toggle="modal"
                                      data-bs-target="#delete_task"
                                    >
                                      <i className="ti ti-trash text-danger" />{" "}
                                      Delete
                                    </Link>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="card border border-end-0 border-top-0 border-bottom-0 border-start border-3 border-danger mb-3">
                      <div className="card-body pb-2">
                        <div className="row align-items-center">
                          <div className="col-md-6">
                            <div className="d-flex align-items-center flex-wrap">
                              <p className="mb-2 me-3 text-gray-9">
                                <i className="ti ti-grip-vertical me-2" />
                                Make all strokes thinner
                              </p>
                              <span className="badge badge-pill badge-status bg-green mb-2 me-2">
                                <i className="ti ti-phone me-1" />
                                Calls
                              </span>
                              <span className="priority badge badge-tag badge-danger-light mb-2">
                                <i className="ti ti-square-rounded-filled me-1" />
                                High
                              </span>
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="d-flex align-items-center flex-wrap float-md-end">
                              <div className="d-flex align-items-center text-gray-9 mb-2 me-3">
                                <i className="ti ti-clock-record me-1" />
                                25 Hrs
                              </div>
                              <div className="d-flex align-items-center text-gray-9 mb-2 me-3">
                                <i className="ti ti-calendar-exclamation me-1" />
                                25 Oct 2023
                              </div>
                              <div className="d-flex align-items-center mb-2">
                                <div className="avatar avatar-sm me-2">
                                  <ImageWithBasePath
                                    src="assets/img/profiles/avatar-20.jpg"
                                    className="rounded-circle"
                                    alt="img"
                                  />
                                </div>
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
                                      data-bs-toggle="offcanvas"
                                      data-bs-target="#offcanvas_edit"
                                      to="#"
                                    >
                                      <i className="ti ti-edit text-blue" />{" "}
                                      Edit
                                    </Link>
                                    <Link
                                      className="dropdown-item"
                                      to="#"
                                      data-bs-toggle="modal"
                                      data-bs-target="#delete_task"
                                    >
                                      <i className="ti ti-trash text-danger" />{" "}
                                      Delete
                                    </Link>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="card border border-end-0 border-top-0 border-bottom-0 border-start border-3 border-danger mb-3">
                      <div className="card-body pb-2">
                        <div className="row align-items-center">
                          <div className="col-md-6">
                            <div className="d-flex align-items-center flex-wrap">
                              <p className="mb-2 me-3 text-gray-9">
                                <i className="ti ti-grip-vertical me-2" />
                                Update orginal content
                              </p>
                              <span className="badge badge-pill badge-status bg-green mb-2 me-2">
                                <i className="ti ti-phone me-1" />
                                Calls
                              </span>
                              <span className="priority badge badge-tag badge-danger-light mb-2">
                                <i className="ti ti-square-rounded-filled me-1" />
                                High
                              </span>
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="d-flex align-items-center flex-wrap float-md-end">
                              <div className="d-flex align-items-center text-gray-9 mb-2 me-3">
                                <i className="ti ti-clock-record me-1" />
                                25 Hrs
                              </div>
                              <div className="d-flex align-items-center text-gray-9 mb-2 me-3">
                                <i className="ti ti-calendar-exclamation me-1" />
                                25 Oct 2023
                              </div>
                              <div className="d-flex align-items-center mb-2">
                                <div className="avatar avatar-sm me-2">
                                  <ImageWithBasePath
                                    src="assets/img/profiles/avatar-20.jpg"
                                    className="rounded-circle"
                                    alt="img"
                                  />
                                </div>
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
                                      data-bs-toggle="offcanvas"
                                      data-bs-target="#offcanvas_edit"
                                      to="#"
                                    >
                                      <i className="ti ti-edit text-blue" />{" "}
                                      Edit
                                    </Link>
                                    <Link
                                      className="dropdown-item"
                                      to="#"
                                      data-bs-toggle="modal"
                                      data-bs-target="#delete_task"
                                    >
                                      <i className="ti ti-trash text-danger" />{" "}
                                      Delete
                                    </Link>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="card border border-end-0 border-top-0 border-bottom-0 border-start border-3 border-danger mb-3">
                      <div className="card-body pb-2">
                        <div className="row align-items-center">
                          <div className="col-md-6">
                            <div className="d-flex align-items-center flex-wrap">
                              <p className="mb-2 me-3 text-gray-9">
                                <i className="ti ti-grip-vertical me-2" />
                                Use only component colours
                              </p>
                              <span className="badge badge-pill badge-status bg-green mb-2 me-2">
                                <i className="ti ti-phone me-1" />
                                Calls
                              </span>
                              <span className="priority badge badge-tag badge-danger-light mb-2">
                                <i className="ti ti-square-rounded-filled me-1" />
                                High
                              </span>
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="d-flex align-items-center flex-wrap float-md-end">
                              <div className="d-flex align-items-center text-gray-9 mb-2 me-3">
                                <i className="ti ti-clock-record me-1" />
                                25 Hrs
                              </div>
                              <div className="d-flex align-items-center text-gray-9 mb-2 me-3">
                                <i className="ti ti-calendar-exclamation me-1" />
                                25 Oct 2023
                              </div>
                              <div className="d-flex align-items-center mb-2">
                                <div className="avatar avatar-sm me-2">
                                  <ImageWithBasePath
                                    src="assets/img/profiles/avatar-20.jpg"
                                    className="rounded-circle"
                                    alt="img"
                                  />
                                </div>
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
                                      data-bs-toggle="offcanvas"
                                      data-bs-target="#offcanvas_edit"
                                      to="#"
                                    >
                                      <i className="ti ti-edit text-blue" />{" "}
                                      Edit
                                    </Link>
                                    <Link
                                      className="dropdown-item"
                                      to="#"
                                      data-bs-toggle="modal"
                                      data-bs-target="#delete_task"
                                    >
                                      <i className="ti ti-trash text-danger" />{" "}
                                      Delete
                                    </Link>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="card border border-end-0 border-top-0 border-bottom-0 border-start border-3 border-danger mb-3">
                      <div className="card-body pb-2">
                        <div className="row align-items-center">
                          <div className="col-md-6">
                            <div className="d-flex align-items-center flex-wrap">
                              <p className="mb-2 me-3 text-gray-9">
                                <i className="ti ti-grip-vertical me-2" />
                                Add images to the cards section
                              </p>
                              <span className="badge badge-pill badge-status bg-green mb-2 me-2">
                                <i className="ti ti-phone me-1" />
                                Calls
                              </span>
                              <span className="priority badge badge-tag badge-danger-light mb-2">
                                <i className="ti ti-square-rounded-filled me-1" />
                                High
                              </span>
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="d-flex align-items-center flex-wrap float-md-end">
                              <div className="d-flex align-items-center text-gray-9 mb-2 me-3">
                                <i className="ti ti-clock-record me-1" />
                                25 Hrs
                              </div>
                              <div className="d-flex align-items-center text-gray-9 mb-2 me-3">
                                <i className="ti ti-calendar-exclamation me-1" />
                                25 Oct 2023
                              </div>
                              <div className="d-flex align-items-center mb-2">
                                <div className="avatar avatar-sm me-2">
                                  <ImageWithBasePath
                                    src="assets/img/profiles/avatar-20.jpg"
                                    className="rounded-circle"
                                    alt="img"
                                  />
                                </div>
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
                                      data-bs-toggle="offcanvas"
                                      data-bs-target="#offcanvas_edit"
                                      to="#"
                                    >
                                      <i className="ti ti-edit text-blue" />{" "}
                                      Edit
                                    </Link>
                                    <Link
                                      className="dropdown-item"
                                      to="#"
                                      data-bs-toggle="modal"
                                      data-bs-target="#delete_task"
                                    >
                                      <i className="ti ti-trash text-danger" />{" "}
                                      Delete
                                    </Link>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="card border border-end-0 border-top-0 border-bottom-0 border-start border-3 border-danger mb-3">
                      <div className="card-body pb-2">
                        <div className="row align-items-center">
                          <div className="col-md-6">
                            <div className="d-flex align-items-center flex-wrap">
                              <p className="mb-2 me-3 text-gray-9">
                                <i className="ti ti-grip-vertical me-2" />
                                Design description banner &amp; landing page
                              </p>
                              <span className="badge badge-pill badge-status bg-green mb-2 me-2">
                                <i className="ti ti-phone me-1" />
                                Calls
                              </span>
                              <span className="priority badge badge-tag badge-danger-light mb-2">
                                <i className="ti ti-square-rounded-filled me-1" />
                                High
                              </span>
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="d-flex align-items-center flex-wrap float-md-end">
                              <div className="d-flex align-items-center text-gray-9 mb-2 me-3">
                                <i className="ti ti-clock-record me-1" />
                                25 Hrs
                              </div>
                              <div className="d-flex align-items-center text-gray-9 mb-2 me-3">
                                <i className="ti ti-calendar-exclamation me-1" />
                                25 Oct 2023
                              </div>
                              <div className="d-flex align-items-center mb-2">
                                <div className="avatar avatar-sm me-2">
                                  <ImageWithBasePath
                                    src="assets/img/profiles/avatar-20.jpg"
                                    className="rounded-circle"
                                    alt="img"
                                  />
                                </div>
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
                                      data-bs-toggle="offcanvas"
                                      data-bs-target="#offcanvas_edit"
                                      to="#"
                                    >
                                      <i className="ti ti-edit text-blue" />{" "}
                                      Edit
                                    </Link>
                                    <Link
                                      className="dropdown-item"
                                      to="#"
                                      data-bs-toggle="modal"
                                      data-bs-target="#delete_task"
                                    >
                                      <i className="ti ti-trash text-danger" />{" "}
                                      Delete
                                    </Link>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="card border border-end-0 border-top-0 border-bottom-0 border-start border-3 border-danger mb-0">
                      <div className="card-body pb-2">
                        <div className="row align-items-center">
                          <div className="col-md-6">
                            <div className="d-flex align-items-center flex-wrap">
                              <p className="mb-2 me-3 text-gray-9">
                                <i className="ti ti-grip-vertical me-2" />
                                Make sure all the padding should be 24px
                              </p>
                              <span className="badge badge-pill badge-status bg-green mb-2 me-2">
                                <i className="ti ti-phone me-1" />
                                Calls
                              </span>
                              <span className="priority badge badge-tag badge-danger-light mb-2">
                                <i className="ti ti-square-rounded-filled me-1" />
                                High
                              </span>
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="d-flex align-items-center flex-wrap float-md-end">
                              <div className="d-flex align-items-center text-gray-9 mb-2 me-3">
                                <i className="ti ti-clock-record me-1" />
                                25 Hrs
                              </div>
                              <div className="d-flex align-items-center text-gray-9 mb-2 me-3">
                                <i className="ti ti-calendar-exclamation me-1" />
                                25 Oct 2023
                              </div>
                              <div className="d-flex align-items-center mb-2">
                                <div className="avatar avatar-sm me-2">
                                  <ImageWithBasePath
                                    src="assets/img/profiles/avatar-20.jpg"
                                    className="rounded-circle"
                                    alt="img"
                                  />
                                </div>
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
                                      data-bs-toggle="offcanvas"
                                      data-bs-target="#offcanvas_edit"
                                      to="#"
                                    >
                                      <i className="ti ti-edit text-blue" />{" "}
                                      Edit
                                    </Link>
                                    <Link
                                      className="dropdown-item"
                                      to="#"
                                      data-bs-toggle="modal"
                                      data-bs-target="#delete_task"
                                    >
                                      <i className="ti ti-trash text-danger" />{" "}
                                      Delete
                                    </Link>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* /Tasks */}
            {/* Activities */}
            <div className="tab-pane fade" id="activities">
              <div className="card">
                <div className="card-header d-flex align-items-center justify-content-between flex-wrap row-gap-3">
                  <h4 className="fw-semibold">Activities</h4>
                  <div>
                    <div className="form-sort mt-0">
                      <i className="ti ti-sort-ascending-2" />
                      <select className="select">
                        <option>Sort By Date</option>
                        <option>Ascending</option>
                        <option>Descending</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="card-body">
                  <div className="contact-activity">
                    <div className="badge badge-soft-purple fs-14 fw-normal shadow-none mb-3">
                      <i className="ti ti-calendar-check me-1" />
                      29 Aug 2023
                    </div>
                    <div className="card border shadow-none mb-3">
                      <div className="card-body p-3">
                        <div className="d-flex">
                          <span className="avatar avatar-md flex-shrink-0 rounded me-2 bg-pending">
                            <i className="ti ti-mail-code" />
                          </span>
                          <div>
                            <h6 className="fw-medium mb-1">
                              You sent 1 Message to the contact.
                            </h6>
                            <p>10:25 pm</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="card border shadow-none mb-3">
                      <div className="card-body p-3">
                        <div className="d-flex">
                          <span className="avatar avatar-md flex-shrink-0 rounded me-2 bg-secondary-success">
                            <i className="ti ti-phone" />
                          </span>
                          <div>
                            <h6 className="fw-medium mb-1">
                              Denwar responded to your appointment schedule
                              question by call at 09:30pm.
                            </h6>
                            <p>09:25 pm</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="card border shadow-none mb-3">
                      <div className="card-body p-3">
                        <div className="d-flex">
                          <span className="avatar avatar-md flex-shrink-0 rounded me-2 bg-orange">
                            <i className="ti ti-notes" />
                          </span>
                          <div>
                            <h6 className="fw-medium mb-1">
                              Notes added by Antony
                            </h6>
                            <p className="mb-1">
                              Please accept my apologies for the inconvenience
                              caused. It would be much appreciated if it's
                              possible to reschedule to 6:00 PM, or any other
                              day that week.
                            </p>
                            <p>10.00 pm</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="badge badge-soft-purple fs-14 fw-normal shadow-none mb-3">
                      <i className="ti ti-calendar-check me-1" />
                      28 Feb 2024
                    </div>
                    <div className="card border shadow-none mb-3">
                      <div className="card-body p-3">
                        <div className="d-flex">
                          <span className="avatar avatar-md flex-shrink-0 rounded me-2 bg-info">
                            <i className="ti ti-user-pin" />
                          </span>
                          <div>
                            <h6 className="fw-medium mb-1 d-inline-flex align-items-center flex-wrap">
                              Meeting With{" "}
                              <span className="avatar avatar-xs mx-2">
                                <ImageWithBasePath
                                  src="assets/img/profiles/avatar-19.jpg"
                                  alt="img"
                                />
                              </span>{" "}
                              Abraham
                            </h6>
                            <p>Schedueled on 05:00 pm</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="card border shadow-none mb-3">
                      <div className="card-body p-3">
                        <div className="d-flex">
                          <span className="avatar avatar-md flex-shrink-0 rounded me-2 bg-secondary-success">
                            <i className="ti ti-notes" />
                          </span>
                          <div>
                            <h6 className="fw-medium mb-1">
                              Drain responded to your appointment schedule
                              question.
                            </h6>
                            <p>09:25 pm</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="badge badge-soft-purple fs-14 fw-normal shadow-none mb-3">
                      <i className="ti ti-calendar-check me-1" />
                      Upcoming Activity
                    </div>
                    <div className="card border shadow-none mb-0">
                      <div className="card-body p-3">
                        <div className="d-flex">
                          <span className="avatar avatar-md flex-shrink-0 rounded me-2 bg-info">
                            <i className="ti ti-user-pin" />
                          </span>
                          <div>
                            <h6 className="fw-medium mb-1">Product Meeting</h6>
                            <p className="mb-1">
                              A product team meeting is a gathering of the
                              cross-functional product team — ideally including
                              team members from product, engineering, marketing,
                              and customer support.
                            </p>
                            <p>25 Jul 2023, 05:00 pm</p>
                            <div className="upcoming-info">
                              <div className="row">
                                <div className="col-sm-4">
                                  <p>Reminder</p>
                                  <div className="dropdown">
                                    <Link
                                      to="#"
                                      className="dropdown-toggle"
                                      data-bs-toggle="dropdown"
                                      aria-expanded="false"
                                    >
                                      <i className="ti ti-clock-edit me-1" />
                                      Reminder
                                      <i className="ti ti-chevron-down ms-1" />
                                    </Link>
                                    <div className="dropdown-menu dropdown-menu-right">
                                      <Link
                                        className="dropdown-item"
                                        to="#"
                                      >
                                        Remainder
                                      </Link>
                                      <Link
                                        className="dropdown-item"
                                        to="#"
                                      >
                                        1 hr
                                      </Link>
                                      <Link
                                        className="dropdown-item"
                                        to="#"
                                      >
                                        10 hr
                                      </Link>
                                    </div>
                                  </div>
                                </div>
                                <div className="col-sm-4">
                                  <p>Task Priority</p>
                                  <div className="dropdown">
                                    <Link
                                      to="#"
                                      className="dropdown-toggle"
                                      data-bs-toggle="dropdown"
                                      aria-expanded="false"
                                    >
                                      <i className="ti ti-square-rounded-filled me-1 text-danger circle" />
                                      High
                                      <i className="ti ti-chevron-down ms-1" />
                                    </Link>
                                    <div className="dropdown-menu dropdown-menu-right">
                                      <Link
                                        className="dropdown-item"
                                        to="#"
                                      >
                                        <i className="ti ti-square-rounded-filled me-1 text-danger circle" />
                                        High
                                      </Link>
                                      <Link
                                        className="dropdown-item"
                                        to="#"
                                      >
                                        <i className="ti ti-square-rounded-filled me-1 text-success circle" />
                                        Low
                                      </Link>
                                    </div>
                                  </div>
                                </div>
                                <div className="col-sm-4">
                                  <p>Assigned to</p>
                                  <div className="dropdown">
                                    <Link
                                      to="#"
                                      className="dropdown-toggle"
                                      data-bs-toggle="dropdown"
                                      aria-expanded="false"
                                    >
                                      <ImageWithBasePath
                                        src="assets/img/profiles/avatar-19.jpg"
                                        alt="img"
                                        className="avatar-xs"
                                      />
                                      John
                                      <i className="ti ti-chevron-down ms-1" />
                                    </Link>
                                    <div className="dropdown-menu dropdown-menu-right">
                                      <Link
                                        className="dropdown-item"
                                        to="#"
                                      >
                                        <ImageWithBasePath
                                          src="assets/img/profiles/avatar-19.jpg"
                                          alt="img"
                                          className="avatar-xs"
                                        />
                                        John
                                      </Link>
                                      <Link
                                        className="dropdown-item"
                                        to="#"
                                      >
                                        <ImageWithBasePath
                                          src="assets/img/profiles/avatar-15.jpg"
                                          alt="img"
                                          className="avatar-xs"
                                        />
                                        Peter
                                      </Link>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* /Activities */}
            {/* Notes */}
            <div className="tab-pane fade" id="notes">
              <div className="card">
                <div className="card-header d-flex align-items-center justify-content-between flex-wrap row-gap-3">
                  <h4 className="fw-semibold">Notes</h4>
                  <div className="d-inline-flex align-items-center">
                    <div className="form-sort me-3 mt-0">
                      <i className="ti ti-sort-ascending-2" />
                      <select className="select">
                        <option>Sort By Date</option>
                        <option>Ascending</option>
                        <option>Descending</option>
                      </select>
                    </div>
                    <Link
                      to="#"
                      data-bs-toggle="modal"
                      data-bs-target="#add_notes"
                      className="link-purple fw-medium"
                    >
                      <i className="ti ti-circle-plus me-1" />
                      Add New
                    </Link>
                  </div>
                </div>
                <div className="card-body">
                  <div className="notes-activity">
                    <div className="card mb-3">
                      <div className="card-body">
                        <div className="d-flex align-items-center justify-content-between pb-2">
                          <div className="d-inline-flex align-items-center mb-2">
                            <span className="avatar avatar-md me-2 flex-shrink-0">
                              <ImageWithBasePath
                                src="assets/img/profiles/avatar-19.jpg"
                                alt="img"
                              />
                            </span>
                            <div>
                              <h6 className="fw-medium mb-1">
                                Darlee Robertson
                              </h6>
                              <p className="mb-0">15 Sep 2023, 12:10 pm</p>
                            </div>
                          </div>
                          <div className="mb-2">
                            <div className="dropdown">
                              <Link
                                to="#"
                                className="p-0 btn btn-icon btn-sm d-flex align-items-center justify-content-center"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                              >
                                <i className="ti ti-dots-vertical" />
                              </Link>
                              <div className="dropdown-menu dropdown-menu-right">
                                <Link
                                  className="dropdown-item"
                                  to="#"
                                >
                                  <i className="ti ti-edit text-blue me-1" />
                                  Edit
                                </Link>
                                <Link
                                  className="dropdown-item"
                                  to="#"
                                >
                                  <i className="ti ti-trash text-danger me-1" />
                                  Delete
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                        <h5 className="fw-medium mb-1">
                          Notes added by Antony
                        </h5>
                        <p>
                          A project review evaluates the success of an
                          initiative and identifies areas for improvement. It
                          can also evaluate a current project to determine
                          whether it's on the right track. Or, it can determine
                          the success of a completed project.{" "}
                        </p>
                        <div className="d-inline-flex align-items-center flex-wrap">
                          <div className="note-download me-3">
                            <div className="note-info">
                              <span className="note-icon bg-secondary-success">
                                <i className="ti ti-file-spreadsheet" />
                              </span>
                              <div>
                                <h6 className="fw-medium mb-1">
                                  Project Specs.xls
                                </h6>
                                <p>365 KB</p>
                              </div>
                            </div>
                            <Link to="#">
                              <i className="ti ti-arrow-down" />
                            </Link>
                          </div>
                          <div className="note-download">
                            <div className="note-info">
                              <span className="note-icon">
                                <ImageWithBasePath
                                  src="assets/img/media/media-35.jpg"
                                  alt="img"
                                />
                              </span>
                              <div>
                                <h6 className="fw-medium mb-1">090224.jpg</h6>
                                <p>365 KB</p>
                              </div>
                            </div>
                            <Link to="#">
                              <i className="ti ti-arrow-down" />
                            </Link>
                          </div>
                        </div>
                        <div className="notes-editor">
                          <div className="note-edit-wrap">
                            <div className="summernote">
                              Write a new comment, send your team notification
                              by typing @ followed by their name
                            </div>
                            <div className="text-end note-btns">
                              <Link
                                to="#"
                                className="btn btn-light add-cancel"
                              >
                                Cancel
                              </Link>
                              <Link
                                to="#"
                                className="btn btn-primary"
                              >
                                Save
                              </Link>
                            </div>
                          </div>
                          <div className="text-end">
                            <Link
                              to="#"
                              className="add-comment link-purple fw-medium"
                            >
                              <i className="ti ti-square-plus me-1" />
                              Add Comment
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="card mb-3">
                      <div className="card-body">
                        <div className="d-flex align-items-center justify-content-between pb-2">
                          <div className="d-inline-flex align-items-center mb-2">
                            <span className="avatar avatar-md me-2 flex-shrink-0">
                              <ImageWithBasePath
                                src="assets/img/profiles/avatar-20.jpg"
                                alt="img"
                              />
                            </span>
                            <div>
                              <h6 className="fw-medium mb-1">Sharon Roy</h6>
                              <p className="mb-0">18 Sep 2023, 09:52 am</p>
                            </div>
                          </div>
                          <div className="mb-2">
                            <div className="dropdown">
                              <Link
                                to="#"
                                className="p-0 btn btn-icon btn-sm d-flex align-items-center justify-content-center"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                              >
                                <i className="ti ti-dots-vertical" />
                              </Link>
                              <div className="dropdown-menu dropdown-menu-right">
                                <Link
                                  className="dropdown-item"
                                  to="#"
                                >
                                  <i className="ti ti-edit text-blue me-1" />
                                  Edit
                                </Link>
                                <Link
                                  className="dropdown-item"
                                  to="#"
                                >
                                  <i className="ti ti-trash text-danger me-1" />
                                  Delete
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                        <h5 className="fw-medium mb-1">
                          Notes added by Antony
                        </h5>
                        <p>
                          A project plan typically contains a list of the
                          essential elements of a project, such as stakeholders,
                          scope, timelines, estimated cost and communication
                          methods. The project manager typically lists the
                          information based on the assignment.
                        </p>
                        <div className="d-inline-flex align-items-center flex-wrap">
                          <div className="note-download me-3">
                            <div className="note-info">
                              <span className="note-icon bg-secondary-success">
                                <i className="ti ti-file-text" />
                              </span>
                              <div>
                                <h6 className="fw-medium mb-1">
                                  Andrewpass.txt
                                </h6>
                                <p>365 KB</p>
                              </div>
                            </div>
                            <Link to="#">
                              <i className="ti ti-arrow-down" />
                            </Link>
                          </div>
                        </div>
                        <div className="reply-box">
                          <p>
                            The best way to get a project done faster is to
                            start sooner. A goal without a timeline is just a
                            dream.The goal you set must be challenging. At the
                            same time, it should be realistic and attainable,
                            not impossible to reach.
                          </p>
                          <p>
                            Commented by{" "}
                            <span className="text-purple">Aeron</span> on 15 Sep
                            2023, 11:15 pm
                          </p>
                          <Link to="#" className="btn">
                            <i className="ti ti-arrow-back-up-double" />
                            Reply
                          </Link>
                        </div>
                        <div className="notes-editor">
                          <div className="note-edit-wrap">
                            <div className="summernote">
                              Write a new comment, send your team notification
                              by typing @ followed by their name
                            </div>
                            <div className="text-end note-btns">
                              <Link
                                to="#"
                                className="btn btn-light add-cancel"
                              >
                                Cancel
                              </Link>
                              <Link
                                to="#"
                                className="btn btn-primary"
                              >
                                Save
                              </Link>
                            </div>
                          </div>
                          <div className="text-end">
                            <Link
                              to="#"
                              className="add-comment link-purple fw-medium"
                            >
                              <i className="ti ti-square-plus me-1" />
                              Add Comment
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="card mb-0">
                      <div className="card-body">
                        <div className="d-flex align-items-center justify-content-between pb-2">
                          <div className="d-inline-flex align-items-center mb-2">
                            <span className="avatar avatar-md me-2 flex-shrink-0">
                              <ImageWithBasePath
                                src="assets/img/profiles/avatar-21.jpg"
                                alt="img"
                              />
                            </span>
                            <div>
                              <h6 className="fw-medium mb-1">Vaughan</h6>
                              <p className="mb-0">20 Sep 2023, 10:26 pm</p>
                            </div>
                          </div>
                          <div className="mb-2">
                            <div className="dropdown">
                              <Link
                                to="#"
                                className="p-0 btn btn-icon btn-sm d-flex align-items-center justify-content-center"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                              >
                                <i className="ti ti-dots-vertical" />
                              </Link>
                              <div className="dropdown-menu dropdown-menu-right">
                                <Link
                                  className="dropdown-item"
                                  to="#"
                                >
                                  <i className="ti ti-edit text-blue me-1" />
                                  Edit
                                </Link>
                                <Link
                                  className="dropdown-item"
                                  to="#"
                                >
                                  <i className="ti ti-trash text-danger me-1" />
                                  Delete
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                        <p>
                          Projects play a crucial role in the success of
                          organizations, and their importance cannot be
                          overstated. Whether it's launching a new product,
                          improving an existing
                        </p>
                        <div className="notes-editor">
                          <div className="note-edit-wrap">
                            <div className="summernote">
                              Write a new comment, send your team notification
                              by typing @ followed by their name
                            </div>
                            <div className="text-end note-btns">
                              <Link
                                to="#"
                                className="btn btn-light add-cancel"
                              >
                                Cancel
                              </Link>
                              <Link
                                to="#"
                                className="btn btn-primary"
                              >
                                Save
                              </Link>
                            </div>
                          </div>
                          <div className="text-end">
                            <Link
                              to="#"
                              className="add-comment link-purple fw-medium"
                            >
                              <i className="ti ti-square-plus me-1" />
                              Add Comment
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* /Notes */}
            {/* Calls */}
            <div className="tab-pane fade" id="calls">
              <div className="card">
                <div className="card-header d-flex align-items-center justify-content-between flex-wrap row-gap-3">
                  <h4 className="fw-semibold">Calls</h4>
                  <div className="d-inline-flex align-items-center">
                    <Link
                      to="#"
                      data-bs-toggle="modal"
                      data-bs-target="#create_call"
                      className="link-purple fw-medium"
                    >
                      <i className="ti ti-circle-plus me-1" />
                      Add New
                    </Link>
                  </div>
                </div>
                <div className="card-body">
                  <div className="card mb-3">
                    <div className="card-body">
                      <div className="d-sm-flex align-items-center justify-content-between pb-2">
                        <div className="d-flex align-items-center mb-2">
                          <span className="avatar avatar-md me-2 flex-shrink-0">
                            <ImageWithBasePath
                              src="assets/img/profiles/avatar-19.jpg"
                              alt="img"
                            />
                          </span>
                          <p>
                            <span className="text-dark fw-medium">
                              Darlee Robertson
                            </span>{" "}
                            logged a call on 23 Jul 2023, 10:00 pm
                          </p>
                        </div>
                        <div className="d-inline-flex align-items-center mb-2">
                          <div className="dropdown me-2">
                            <Link
                              to="#"
                              className="bg-danger py-1"
                              data-bs-toggle="dropdown"
                              aria-expanded="false"
                            >
                              Busy
                              <i className="ti ti-chevron-down ms-2" />
                            </Link>
                            <div className="dropdown-menu dropdown-menu-right">
                              <Link
                                className="dropdown-item"
                                to="#"
                              >
                                Busy
                              </Link>
                              <Link
                                className="dropdown-item"
                                to="#"
                              >
                                No Answer
                              </Link>
                              <Link
                                className="dropdown-item"
                                to="#"
                              >
                                Unavailable
                              </Link>
                              <Link
                                className="dropdown-item"
                                to="#"
                              >
                                Wrong Number
                              </Link>
                              <Link
                                className="dropdown-item"
                                to="#"
                              >
                                Left Voice Message
                              </Link>
                              <Link
                                className="dropdown-item"
                                to="#"
                              >
                                Moving Forward
                              </Link>
                            </div>
                          </div>
                          <div className="dropdown">
                            <Link
                              to="#"
                              className="p-0 btn btn-icon btn-sm d-flex align-items-center justify-content-center"
                              data-bs-toggle="dropdown"
                              aria-expanded="false"
                            >
                              <i className="ti ti-dots-vertical" />
                            </Link>
                            <div className="dropdown-menu dropdown-menu-right">
                              <Link
                                className="dropdown-item"
                                to="#"
                              >
                                <i className="ti ti-edit text-blue me-1" />
                                Edit
                              </Link>
                              <Link
                                className="dropdown-item"
                                to="#"
                              >
                                <i className="ti ti-trash text-danger me-1" />
                                Delete
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                      <p>
                        A project review evaluates the success of an initiative
                        and identifies areas for improvement. It can also
                        evaluate a current project to determine whether it's on
                        the right track. Or, it can determine the success of a
                        completed project.{" "}
                      </p>
                    </div>
                  </div>
                  <div className="card mb-3">
                    <div className="card-body">
                      <div className="d-sm-flex align-items-center justify-content-between pb-2">
                        <div className="d-flex align-items-center mb-2">
                          <span className="avatar avatar-md me-2 flex-shrink-0">
                            <ImageWithBasePath
                              src="assets/img/profiles/avatar-20.jpg"
                              alt="img"
                            />
                          </span>
                          <p>
                            <span className="text-dark fw-medium">
                              Sharon Roy
                            </span>{" "}
                            logged a call on 28 Jul 2023, 09:00 pm
                          </p>
                        </div>
                        <div className="d-inline-flex align-items-center mb-2">
                          <div className="dropdown me-2">
                            <Link
                              to="#"
                              className="bg-pending py-1"
                              data-bs-toggle="dropdown"
                              aria-expanded="false"
                            >
                              No Answer
                              <i className="ti ti-chevron-down ms-2" />
                            </Link>
                            <div className="dropdown-menu dropdown-menu-right">
                              <Link
                                className="dropdown-item"
                                to="#"
                              >
                                Busy
                              </Link>
                              <Link
                                className="dropdown-item"
                                to="#"
                              >
                                No Answer
                              </Link>
                              <Link
                                className="dropdown-item"
                                to="#"
                              >
                                Unavailable
                              </Link>
                              <Link
                                className="dropdown-item"
                                to="#"
                              >
                                Wrong Number
                              </Link>
                              <Link
                                className="dropdown-item"
                                to="#"
                              >
                                Left Voice Message
                              </Link>
                              <Link
                                className="dropdown-item"
                                to="#"
                              >
                                Moving Forward
                              </Link>
                            </div>
                          </div>
                          <div className="dropdown">
                            <Link
                              to="#"
                              className="p-0 btn btn-icon btn-sm d-flex align-items-center justify-content-center"
                              data-bs-toggle="dropdown"
                              aria-expanded="false"
                            >
                              <i className="ti ti-dots-vertical" />
                            </Link>
                            <div className="dropdown-menu dropdown-menu-right">
                              <Link
                                className="dropdown-item"
                                to="#"
                              >
                                <i className="ti ti-edit text-blue me-1" />
                                Edit
                              </Link>
                              <Link
                                className="dropdown-item"
                                to="#"
                              >
                                <i className="ti ti-trash text-danger me-1" />
                                Delete
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                      <p>
                        A project plan typically contains a list of the
                        essential elements of a project, such as stakeholders,
                        scope, timelines, estimated cost and communication
                        methods. The project manager typically lists the
                        information based on the assignment.
                      </p>
                    </div>
                  </div>
                  <div className="card mb-0">
                    <div className="card-body">
                      <div className="d-sm-flex align-items-center justify-content-between pb-2">
                        <div className="d-flex align-items-center mb-2">
                          <span className="avatar avatar-md me-2 flex-shrink-0">
                            <ImageWithBasePath
                              src="assets/img/profiles/avatar-21.jpg"
                              alt="img"
                            />
                          </span>
                          <p>
                            <span className="text-dark fw-medium">Vaughan</span>{" "}
                            logged a call on 30 Jul 2023, 08:00 pm
                          </p>
                        </div>
                        <div className="d-inline-flex align-items-center mb-2">
                          <div className="dropdown me-2">
                            <Link
                              to="#"
                              className="bg-pending py-1"
                              data-bs-toggle="dropdown"
                              aria-expanded="false"
                            >
                              No Answer
                              <i className="ti ti-chevron-down ms-2" />
                            </Link>
                            <div className="dropdown-menu dropdown-menu-right">
                              <Link
                                className="dropdown-item"
                                to="#"
                              >
                                Busy
                              </Link>
                              <Link
                                className="dropdown-item"
                                to="#"
                              >
                                No Answer
                              </Link>
                              <Link
                                className="dropdown-item"
                                to="#"
                              >
                                Unavailable
                              </Link>
                              <Link
                                className="dropdown-item"
                                to="#"
                              >
                                Wrong Number
                              </Link>
                              <Link
                                className="dropdown-item"
                                to="#"
                              >
                                Left Voice Message
                              </Link>
                              <Link
                                className="dropdown-item"
                                to="#"
                              >
                                Moving Forward
                              </Link>
                            </div>
                          </div>
                          <div className="dropdown">
                            <Link
                              to="#"
                              className="p-0 btn btn-icon btn-sm d-flex align-items-center justify-content-center"
                              data-bs-toggle="dropdown"
                              aria-expanded="false"
                            >
                              <i className="ti ti-dots-vertical" />
                            </Link>
                            <div className="dropdown-menu dropdown-menu-right">
                              <Link
                                className="dropdown-item"
                                to="#"
                              >
                                <i className="ti ti-edit text-blue me-1" />
                                Edit
                              </Link>
                              <Link
                                className="dropdown-item"
                                to="#"
                              >
                                <i className="ti ti-trash text-danger me-1" />
                                Delete
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                      <p>
                        Projects play a crucial role in the success of
                        organizations, and their importance cannot be
                        overstated. Whether it's launching a new product,
                        improving an existing
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* /Calls */}
            {/* Files */}
            <div className="tab-pane fade" id="files">
              <div className="card">
                <div className="card-header">
                  <h4 className="fw-semibold">Files</h4>
                </div>
                <div className="card-body">
                  <div className="card border mb-3">
                    <div className="card-body pb-0">
                      <div className="row align-items-center">
                        <div className="col-md-8">
                          <div className="mb-3">
                            <h4 className="fw-medium mb-1">Manage Documents</h4>
                            <p>
                              Send customizable quotes, proposals and contracts
                              to close deals faster.
                            </p>
                          </div>
                        </div>
                        <div className="col-md-4 text-md-end">
                          <div className="mb-3">
                            <Link
                              to="#"
                              className="btn btn-primary"
                              data-bs-toggle="modal"
                              data-bs-target="#new_file"
                            >
                              Create Document
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="card border shadow-none mb-3">
                    <div className="card-body pb-0">
                      <div className="row align-items-center">
                        <div className="col-md-8">
                          <div className="mb-3">
                            <h4 className="fw-medium mb-1">
                              Collier-Turner Proposal
                            </h4>
                            <p>
                              Send customizable quotes, proposals and contracts
                              to close deals faster.
                            </p>
                            <div className="d-flex align-items-center">
                              <span className="avatar avatar-md me-2 flex-shrink-0">
                                <ImageWithBasePath
                                  src="assets/img/profiles/avatar-21.jpg"
                                  alt="img"
                                  className="rounded-circle"
                                />
                              </span>
                              <div>
                                <span className="fs-12">Owner</span>
                                <p>Vaughan</p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-4 text-md-end">
                          <div className="mb-3 d-inline-flex align-items-center">
                            <span className="badge badge-danger-light me-1">
                              Proposal
                            </span>
                            <span className="badge bg-pending priority-badge me-1">
                              Draft
                            </span>
                            <div className="dropdown">
                              <Link
                                to="#"
                                className="p-0 btn btn-icon btn-sm d-flex align-items-center justify-content-center"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                              >
                                <i className="ti ti-dots-vertical" />
                              </Link>
                              <div className="dropdown-menu dropdown-menu-right">
                                <Link
                                  className="dropdown-item"
                                  to="#"
                                >
                                  <i className="ti ti-edit text-blue me-1" />
                                  Edit
                                </Link>
                                <Link
                                  className="dropdown-item"
                                  to="#"
                                >
                                  <i className="ti ti-trash text-danger me-1" />
                                  Delete
                                </Link>
                                <Link
                                  className="dropdown-item"
                                  to="#"
                                >
                                  <i className="ti ti-download text-info me-1" />
                                  Download
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="card border shadow-none mb-3">
                    <div className="card-body pb-0">
                      <div className="row align-items-center">
                        <div className="col-md-8">
                          <div className="mb-3">
                            <h4 className="fw-medium mb-1">
                              Collier-Turner Proposal
                            </h4>
                            <p>
                              Send customizable quotes, proposals and contracts
                              to close deals faster.
                            </p>
                            <div className="d-flex align-items-center">
                              <span className="avatar avatar-md me-2 flex-shrink-0">
                                <ImageWithBasePath
                                  src="assets/img/profiles/avatar-01.jpg"
                                  alt="img"
                                  className="rounded-circle"
                                />
                              </span>
                              <div>
                                <span className="fs-12">Owner</span>
                                <p>Jessica</p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-4 text-md-end">
                          <div className="mb-3 d-inline-flex align-items-center">
                            <span className="badge badge-purple-light me-1">
                              Quote
                            </span>
                            <span className="badge bg-success me-1">Sent</span>
                            <div className="dropdown">
                              <Link
                                to="#"
                                className="p-0 btn btn-icon btn-sm d-flex align-items-center justify-content-center"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                              >
                                <i className="ti ti-dots-vertical" />
                              </Link>
                              <div className="dropdown-menu dropdown-menu-right">
                                <Link
                                  className="dropdown-item"
                                  to="#"
                                >
                                  <i className="ti ti-edit text-blue me-1" />
                                  Edit
                                </Link>
                                <Link
                                  className="dropdown-item"
                                  to="#"
                                >
                                  <i className="ti ti-trash text-danger me-1" />
                                  Delete
                                </Link>
                                <Link
                                  className="dropdown-item"
                                  to="#"
                                >
                                  <i className="ti ti-download text-info me-1" />
                                  Download
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="card border shadow-none mb-0">
                    <div className="card-body pb-0">
                      <div className="row align-items-center">
                        <div className="col-md-8">
                          <div className="mb-3">
                            <h4 className="fw-medium mb-1">
                              Collier-Turner Proposal
                            </h4>
                            <p>
                              Send customizable quotes, proposals and contracts
                              to close deals faster.
                            </p>
                            <div className="d-flex align-items-center">
                              <span className="avatar avatar-md me-2 flex-shrink-0">
                                <ImageWithBasePath
                                  src="assets/img/profiles/avatar-22.jpg"
                                  alt="img"
                                  className="rounded-circle"
                                />
                              </span>
                              <div>
                                <span className="fs-12">Owner</span>
                                <p>Dawn Merhca</p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-4 text-md-end">
                          <div className="mb-3 d-inline-flex align-items-center">
                            <span className="badge badge-danger-light me-1">
                              Proposal
                            </span>
                            <span className="badge bg-pending priority-badge me-1">
                              Draft
                            </span>
                            <div className="dropdown">
                              <Link
                                to="#"
                                className="p-0 btn btn-icon btn-sm d-flex align-items-center justify-content-center"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                              >
                                <i className="ti ti-dots-vertical" />
                              </Link>
                              <div className="dropdown-menu dropdown-menu-right">
                                <Link
                                  className="dropdown-item"
                                  to="#"
                                >
                                  <i className="ti ti-edit text-blue me-1" />
                                  Edit
                                </Link>
                                <Link
                                  className="dropdown-item"
                                  to="#"
                                >
                                  <i className="ti ti-trash text-danger me-1" />
                                  Delete
                                </Link>
                                <Link
                                  className="dropdown-item"
                                  to="#"
                                >
                                  <i className="ti ti-download text-info me-1" />
                                  Download
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* /Files */}
            {/* Email */}
            <div className="tab-pane fade" id="email">
              <div className="card">
                <div className="card-header d-flex align-items-center justify-content-between flex-wrap row-gap-3">
                  <h4 className="fw-semibold">Email</h4>
                  <div className="d-inline-flex align-items-center">
                    <Link
                      to="#"
                      className="link-purple fw-medium"
                      data-bs-toggle="tooltip"
                      data-bs-placement="left"
                      data-bs-custom-class="tooltip-dark"
                      data-bs-original-title="There are no email accounts configured, Please configured your email account in order to Send/ Create EMails"
                    >
                      <i className="ti ti-circle-plus me-1" />
                      Create Email
                    </Link>
                  </div>
                </div>
                <div className="card-body">
                  <div className="card border mb-0">
                    <div className="card-body pb-0">
                      <div className="row align-items-center">
                        <div className="col-md-8">
                          <div className="mb-3">
                            <h4 className="fw-medium mb-1">Manage Emails</h4>
                            <p>
                              You can send and reply to emails directly via this
                              section.
                            </p>
                          </div>
                        </div>
                        <div className="col-md-4 text-md-end">
                          <div className="mb-3">
                            <Link
                              to="#"
                              className="btn btn-primary"
                              data-bs-toggle="modal"
                              data-bs-target="#create_email"
                            >
                              Connect Account
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* /Email */}
          </div>
          {/* /Tab Content */}
        </div>
        {/* /Project Details */}
      </div>
    </div>
  </div>
  {/* /Page Wrapper */}
  {/* Delete Project */}
  <div className="modal fade" id="delete_task" role="dialog">
    <div className="modal-dialog modal-dialog-centered">
      <div className="modal-content">
        <div className="modal-body">
          <div className="text-center">
            <div className="avatar avatar-xl bg-danger-light rounded-circle mb-3">
              <i className="ti ti-trash-x fs-36 text-danger" />
            </div>
            <h4 className="mb-2">Remove Project?</h4>
            <p className="mb-0">
              Are you sure you want to remove <br /> project you selected.
            </p>
            <div className="d-flex align-items-center justify-content-center mt-4">
              <Link
                to="#"
                className="btn btn-light me-2"
                data-bs-dismiss="modal"
              >
                Cancel
              </Link>
              <Link to="#" className="btn btn-danger" data-bs-dismiss="modal">
                      Yes, Delete it
                    </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  {/* /Delete Project */}
 
  {/* Create Call Log */}
  <div
    className="modal custom-modal fade modal-padding"
    id="create_call"
    role="dialog"
  >
    <div className="modal-dialog modal-dialog-centered">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">Create Call Log</h5>
          <button
            type="button"
            className="btn-close position-static"
            data-bs-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true">×</span>
          </button>
        </div>
        <div className="modal-body">
          <form>
            <div className="row">
              <div className="col-md-12">
                <div className="mb-3">
                  <label className="col-form-label">
                    Status <span className="text-danger"> *</span>
                  </label>
                  <select className="select">
                    <option>Busy</option>
                    <option>Unavailable</option>
                    <option>No Answer</option>
                    <option>Wrong Number</option>
                    <option>Left Voice Message</option>
                    <option>Moving Forward</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label className="col-form-label">
                    Follow Up Date <span className="text-danger"> *</span>
                  </label>
                  <div className="icon-form">
                    <span className="form-icon">
                      <i className="ti ti-calendar-check" />
                    </span>
                    <input
                      type="text"
                      className="form-control datetimepicker"
                      placeholder=""
                    />
                  </div>
                </div>
                <div className="mb-3">
                  <label className="col-form-label">
                    Note <span className="text-danger"> *</span>
                  </label>
                  <textarea
                    className="form-control"
                    rows={4}
                    placeholder="Add text"
                    defaultValue={""}
                  />
                </div>
                <div className="mb-3">
                  <label className="checkboxs">
                    <input type="checkbox" />
                    <span className="checkmarks" /> Create a followup task
                  </label>
                </div>
                <div className="text-end modal-btn">
                  <Link className="btn btn-light" data-bs-dismiss="modal" to={''}>
                    Cancel
                  </Link>
                  <button className="btn btn-primary" type="submit">
                    Confirm
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
  {/* /Create Call Log */}
  {/* Add File */}
  <div
    className="modal custom-modal fade custom-modal-two modal-padding"
    id="new_file"
    role="dialog"
  >
    <div className="modal-dialog modal-dialog-centered modal-lg">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">Create New File</h5>
          <button
            type="button"
            className="btn-close position-static"
            data-bs-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true">×</span>
          </button>
        </div>
        <div className="modal-body">
          <div className="add-info-fieldset">
            <div className="add-details-wizard">
              <ul className="progress-bar-wizard">
                <li className="active">
                  <span>
                    <i className="ti ti-file" />
                  </span>
                  <div className="multi-step-info">
                    <h6>Basic Info</h6>
                  </div>
                </li>
                <li>
                  <span>
                    <i className="ti ti-circle-plus" />
                  </span>
                  <div className="multi-step-info">
                    <h6>Add Recipient</h6>
                  </div>
                </li>
              </ul>
            </div>
            <fieldset id="first-field-file">
              <form >
                <div className="contact-input-set">
                  <div className="row">
                    <div className="col-md-12">
                      <div className="mb-3">
                        <label className="col-form-label">
                          Choose Deal <span className="text-danger">*</span>
                        </label>
                        <select className="select">
                          <option>Select</option>
                          <option>Collins</option>
                          <option>Wisozk</option>
                          <option>Walter</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="col-form-label">
                          Document Type <span className="text-danger">*</span>
                        </label>
                        <select className="select">
                          <option>Select</option>
                          <option>Contract</option>
                          <option>Proposal</option>
                          <option>Quote</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="col-form-label">
                          Owner <span className="text-danger">*</span>
                        </label>
                        <select className="select">
                          <option>Select</option>
                          <option>Admin</option>
                          <option>Jackson Daniel</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="col-form-label">
                          Title <span className="text-danger"> *</span>
                        </label>
                        <input className="form-control" type="text" />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="col-form-label">
                          Locale <span className="text-danger">*</span>
                        </label>
                        <select className="select">
                          <option>Select</option>
                          <option>en</option>
                          <option>es</option>
                          <option>ru</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <div className="signature-wrap">
                        <h4>Signature</h4>
                        <ul className="nav sign-item">
                          <li className="nav-item">
                            <span
                              className=" mb-0"
                              data-bs-toggle="tab"
                              data-bs-target="#nosign"
                            >
                              <input
                                type="radio"
                                className="status-radio"
                                id="sign1"
                                name="email"
                              />
                              <label htmlFor="sign1">
                                <span className="sign-title">No Signature</span>
                                This document does not require a signature
                                before acceptance.
                              </label>
                            </span>
                          </li>
                          <li className="nav-item">
                            <span
                              className="active mb-0"
                              data-bs-toggle="tab"
                              data-bs-target="#use-esign"
                            >
                              <input
                                type="radio"
                                className="status-radio"
                                id="sign2"
                                name="email"
                                defaultChecked
                              />
                              <label htmlFor="sign2">
                                <span className="sign-title">
                                  Use e-signature
                                </span>
                                This document require e-signature before
                                acceptance.
                              </label>
                            </span>
                          </li>
                        </ul>
                        <div className="tab-content">
                          <div className="tab-pane show active" id="use-esign">
                            <div className="input-block mb-0">
                              <label className="col-form-label">
                                Document Signers{" "}
                                <span className="text-danger">*</span>
                              </label>
                            </div>
                            <div className="sign-content">
                              <div className="row">
                                <div className="col-md-6">
                                  <div className="mb-3">
                                    <input
                                      className="form-control"
                                      type="text"
                                      placeholder="Enter Name"
                                    />
                                  </div>
                                </div>
                                <div className="col-md-6">
                                  <div className="d-flex align-items-center">
                                    <div className="float-none mb-3 me-3 w-100">
                                      <input
                                        className="form-control"
                                        type="text"
                                        placeholder="Email Address"
                                      />
                                    </div>
                                    <div className="input-btn mb-3">
                                      <Link
                                        to="#"
                                        className="add-sign"
                                      >
                                        <i className="ti ti-circle-plus" />
                                      </Link>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="input-block mb-3">
                        <label className="col-form-label">
                          Content <span className="text-danger"> *</span>
                        </label>
                        <textarea
                          className="form-control"
                          rows={3}
                          placeholder="Add Content"
                          defaultValue={""}
                        />
                      </div>
                    </div>
                    <div className="col-lg-12 text-end form-wizard-button modal-btn">
                      <button className="btn btn-light" type="reset">
                        Reset
                      </button>
                      <button
                        className="btn btn-primary wizard-next-btn"
                        type="button"
                      >
                        Next
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </fieldset>
            <fieldset>
              <form >
                <div className="contact-input-set">
                  <div className="row">
                    <div className="col-lg-12">
                      <div className="signature-wrap">
                        <h4 className="mb-2">
                          Send the document to following signers
                        </h4>
                        <p>In order to send the document to the signers</p>
                        <div className="input-block mb-0">
                          <label className="col-form-label">
                            Recipients (Additional recipients)
                          </label>
                        </div>
                        <div className="sign-content">
                          <div className="row">
                            <div className="col-md-6">
                              <div className="mb-3">
                                <input
                                  className="form-control"
                                  type="text"
                                  placeholder="Enter Name"
                                />
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="d-flex align-items-center">
                                <div className="float-none mb-3 me-3 w-100">
                                  <input
                                    className="form-control"
                                    type="text"
                                    placeholder="Email Address"
                                  />
                                </div>
                                <div className="input-btn mb-3">
                                  <Link
                                    to="#"
                                    className="add-sign"
                                  >
                                    <i className="ti ti-circle-plus" />
                                  </Link>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <div className="mb-3">
                        <label className="col-form-label">
                          Message Subject{" "}
                          <span className="text-danger"> *</span>
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          placeholder="Enter Subject"
                        />
                      </div>
                      <div className="mb-3">
                        <label className="col-form-label">
                          Message Text <span className="text-danger"> *</span>
                        </label>
                        <textarea
                          className="form-control"
                          rows={3}
                          placeholder="Your document is ready"
                          defaultValue={""}
                        />
                      </div>
                      <button className="btn btn-light mb-3">Send Now</button>
                      <div className="send-success">
                        <p>
                          <i className="ti ti-circle-check" /> Document sent
                          successfully to the selected recipients
                        </p>
                      </div>
                    </div>
                    <div className="col-lg-12 text-end form-wizard-button modal-btn">
                      <button className="btn btn-light" type="reset">
                        Cancel
                      </button>
                      <button
                        className="btn btn-primary"
                        type="button"
                        data-bs-dismiss="modal"
                      >
                        Save &amp; Next
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </fieldset>
          </div>
        </div>
      </div>
    </div>
  </div>
  {/* /Add File */}
  {/* Connect Account */}
  <div className="modal custom-modal fade" id="create_email" role="dialog">
    <div className="modal-dialog modal-dialog-centered">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">Connect Account</h5>
          <button
            type="button"
            className="btn-close position-static"
            data-bs-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true">×</span>
          </button>
        </div>
        <div className="modal-body">
          <div className="mb-3">
            <label className="col-form-label">
              Account type <span className="text-danger"> *</span>
            </label>
            <select className="select">
              <option>Gmail</option>
              <option>Outlook</option>
              <option>Imap</option>
            </select>
          </div>
          <div className="mb-3">
            <h5 className="form-title">Sync emails from</h5>
            <div className="sync-radio">
              <div className="radio-item">
                <input
                  type="radio"
                  className="status-radio"
                  id="test1"
                  name="radio-group"
                  defaultChecked
                />
                <label htmlFor="test1">Now</label>
              </div>
              <div className="radio-item">
                <input
                  type="radio"
                  className="status-radio"
                  id="test2"
                  name="radio-group"
                />
                <label htmlFor="test2">1 Month Ago</label>
              </div>
              <div className="radio-item">
                <input
                  type="radio"
                  className="status-radio"
                  id="test3"
                  name="radio-group"
                />
                <label htmlFor="test3">3 Month Ago</label>
              </div>
              <div className="radio-item">
                <input
                  type="radio"
                  className="status-radio"
                  id="test4"
                  name="radio-group"
                />
                <label htmlFor="test4">6 Month Ago</label>
              </div>
            </div>
          </div>
          <div className="col-lg-12 text-end modal-btn">
            <Link to="#" className="btn btn-light" data-bs-dismiss="modal">
              Cancel
            </Link>
            <button
              className="btn btn-primary"
              data-bs-target="#success_mail"
              data-bs-toggle="modal"
              data-bs-dismiss="modal"
            >
              Connect Account
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  {/* /Connect Account */}
  {/* Success Email */}
  <div className="modal custom-modal fade" id="success_mail" role="dialog">
    <div className="modal-dialog modal-dialog-centered">
      <div className="modal-content">
        <div className="modal-header border-0 m-0 justify-content-end">
          <button
            className="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          >
            <i className="ti ti-x" />
          </button>
        </div>
        <div className="modal-body">
          <div className="success-message text-center">
            <div className="success-popup-icon bg-light-blue">
              <i className="ti ti-mail-opened" />
            </div>
            <h3>Email Connected Successfully!!!</h3>
            <p>
              Email Account is configured with “example@example.com”. Now you
              can access email.
            </p>
            <div className="col-lg-12 text-center modal-btn">
              <Link to={route.projectDetails} className="btn btn-primary">
                Go to email
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  {/* /Success Company */}
  {/* Access */}
  <div className="modal custom-modal fade" id="access_view" role="dialog">
    <div className="modal-dialog modal-dialog-centered">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">Add Responsible Persons</h5>
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
            <div className="mb-2 icon-form">
              <span className="form-icon">
                <i className="ti ti-search" />
              </span>
              <input
                type="text"
                className="form-control"
                placeholder="Search"
              />
            </div>
            <div className="access-wrap">
              <ul>
                <li className="select-people-checkbox">
                  <label className="checkboxs">
                    <input type="checkbox" />
                    <span className="checkmarks" />
                    <span className="people-profile">
                      <ImageWithBasePath src="assets/img/profiles/avatar-19.jpg" alt="" />
                      <Link to="#">Darlee Robertson</Link>
                    </span>
                  </label>
                </li>
                <li className="select-people-checkbox">
                  <label className="checkboxs">
                    <input type="checkbox" />
                    <span className="checkmarks" />
                    <span className="people-profile">
                      <ImageWithBasePath src="assets/img/profiles/avatar-20.jpg" alt="" />
                      <Link to="#">Sharon Roy</Link>
                    </span>
                  </label>
                </li>
                <li className="select-people-checkbox">
                  <label className="checkboxs">
                    <input type="checkbox" />
                    <span className="checkmarks" />
                    <span className="people-profile">
                      <ImageWithBasePath src="assets/img/profiles/avatar-21.jpg" alt="" />
                      <Link to="#">Vaughan</Link>
                    </span>
                  </label>
                </li>
                <li className="select-people-checkbox">
                  <label className="checkboxs">
                    <input type="checkbox" />
                    <span className="checkmarks" />
                    <span className="people-profile">
                      <ImageWithBasePath src="assets/img/profiles/avatar-01.jpg" alt="" />
                      <Link to="#">Jessica</Link>
                    </span>
                  </label>
                </li>
                <li className="select-people-checkbox">
                  <label className="checkboxs">
                    <input type="checkbox" />
                    <span className="checkmarks" />
                    <span className="people-profile">
                      <ImageWithBasePath src="assets/img/profiles/avatar-16.jpg" alt="" />
                      <Link to="#">Carol Thomas</Link>
                    </span>
                  </label>
                </li>
                <li className="select-people-checkbox">
                  <label className="checkboxs">
                    <input type="checkbox" />
                    <span className="checkmarks" />
                    <span className="people-profile">
                      <ImageWithBasePath src="assets/img/profiles/avatar-22.jpg" alt="" />
                      <Link to="#">Dawn Mercha</Link>
                    </span>
                  </label>
                </li>
              </ul>
            </div>
            <div className="modal-btn text-end">
              <Link to="#" className="btn btn-light" data-bs-dismiss="modal">
                Cancel
              </Link>
              <button type="submit" className="btn btn-primary">
                Confirm
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
  {/* /Access */}
  {/* Add Compose */}
  <div className="modal custom-modal fade" id="add_compose" role="dialog">
    <div className="modal-dialog modal-dialog-centered">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">Add Compose</h5>
          <button
            className="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          >
            <i className="ti ti-x" />
          </button>
        </div>
        <div className="modal-body p-0">
          <form action="#">
            <div className="mb-3">
              <input type="email" placeholder="To" className="form-control" />
            </div>
            <div className="row">
              <div className="col-md-6">
                <div className="mb-3">
                  <input
                    type="email"
                    placeholder="Cc"
                    className="form-control"
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="mb-3">
                  <input
                    type="email"
                    placeholder="Bcc"
                    className="form-control"
                  />
                </div>
              </div>
            </div>
            <div className="mb-3">
              <input
                type="text"
                placeholder="Subject"
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <div className="summernote" />
            </div>
            <div className="mb-3">
              <div className="text-center">
                <button className="btn btn-primary">
                  <span>Send</span>
                  <i className="fa-solid fa-paper-plane ms-1" />
                </button>
                <button className="btn btn-primary" type="button">
                  <span>Draft</span>{" "}
                  <i className="fa-regular fa-floppy-disk ms-1" />
                </button>
                <button className="btn btn-primary" type="button">
                  <span>Delete</span>{" "}
                  <i className="fa-regular fa-trash-can ms-1" />
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
  {/* /Add Compose */}
  {/* Add New Task */}
  <div
    className="offcanvas offcanvas-end offcanvas-large"
    tabIndex={-1}
    id="offcanvas_add"
  >
    <div className="offcanvas-header border-bottom">
      <h4>Add New Task</h4>
      <button
        type="button"
        className="btn-close custom-btn-close border p-1 me-0 d-flex align-items-center justify-content-center rounded-circle"
        data-bs-dismiss="offcanvas"
        aria-label="Close"
      >
        <i className="ti ti-x" />
      </button>
    </div>
    <div className="offcanvas-body">
      <form >
        <div>
          <div className="row">
            <div className="col-md-12">
              <div className="mb-3">
                <label className="col-form-label">
                  Title <span className="text-danger">*</span>
                </label>
                <input type="text" className="form-control" />
              </div>
              <div className="mb-3">
                <label className="col-form-label">Category</label>
                <select className="select">
                  <option>Choose</option>
                  <option>Calls</option>
                  <option>Email</option>
                  <option>Email</option>
                  <option>Meeting</option>
                </select>
              </div>
              <div className="mb-3">
                <label className="col-form-label">
                  Responsible Persons <span className="text-danger">*</span>
                </label>
                {/* <select className="multiple-img" multiple="multiple">
                  <option
                    data-image="assets/img/profiles/avatar-19.jpg"
                    selected=""
                  >
                    Darlee Robertson
                  </option>
                  <option data-image="assets/img/profiles/avatar-20.jpg">
                    Sharon Roy
                  </option>
                  <option data-image="assets/img/profiles/avatar-21.jpg">
                    Vaughan
                  </option>
                  <option data-image="assets/img/profiles/avatar-23.jpg">
                    Jessica
                  </option>
                  <option data-image="assets/img/profiles/avatar-16.jpg">
                    Carol Thomas
                  </option>
                </select> */}
              </div>
            </div>
            <div className="col-md-6">
              <label className="col-form-label">
                Start Date <span className="text-danger">*</span>
              </label>
              <div className="mb-3 icon-form">
                <span className="form-icon">
                  <i className="ti ti-calendar-check" />
                </span>
                <input type="text" className="form-control datetimepicker" />
              </div>
            </div>
            <div className="col-md-6">
              <label className="col-form-label">
                Due Date <span className="text-danger">*</span>
              </label>
              <div className="mb-3 icon-form">
                <span className="form-icon">
                  <i className="ti ti-calendar-check" />
                </span>
                <input type="text" className="form-control datetimepicker" />
              </div>
            </div>
            <div className="col-md-12">
              <div className="mb-3">
                <label className="col-form-label">
                  Tags <span className="text-danger">*</span>
                </label>
                <input
                  className="input-tags form-control"
                  type="text"
                  data-role="tagsinput"
                  name="Label"
                  defaultValue="Promotion, Collab"
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="mb-3">
                <label className="col-form-label">Priority</label>
                <div className="select-priority">
                  <span className="select-icon">
                    <i className="ti ti-square-rounded-filled" />
                  </span>
                  <select className="select">
                    <option>Select</option>
                    <option>High</option>
                    <option>Low</option>
                    <option>Medium</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="mb-3">
                <label className="col-form-label">Status</label>
                {/* <select className="select">
                  <option selected="">Active</option>
                  <option>Inactive</option>
                </select> */}
              </div>
            </div>
            <div className="col-md-12">
              <div className="mb-3">
                <label className="col-form-label">
                  Description <span className="text-danger">*</span>
                </label>
                <div className="summernote" />
              </div>
            </div>
          </div>
        </div>
        <div className="d-flex align-items-center justify-content-end">
          <button
            type="button"
            data-bs-dismiss="offcanvas"
            className="btn btn-light me-2"
          >
            Cancel
          </button>
          <button
            type="button"
            className="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#create_success"
          >
            Create
          </button>
        </div>
      </form>
    </div>
  </div>
  {/* /Add New Tasks */}
  {/* Create task */}
  <div className="modal custom-modal fade" id="create_success" role="dialog">
    <div className="modal-dialog modal-dialog-centered">
      <div className="modal-content">
        <div className="modal-header border-0 m-0 justify-content-end">
          <button
            className="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          >
            <i className="ti ti-x" />
          </button>
        </div>
        <div className="modal-body">
          <div className="success-message text-center">
            <div className="success-popup-icon bg-light-blue">
              <i className="ti ti-medal" />
            </div>
            <h3>Task Created Successfully!!!</h3>
            <p>View the details of task, created</p>
            <div className="col-lg-12 text-center modal-btn">
              <Link to="#" className="btn btn-light" data-bs-dismiss="modal">
                Cancel
              </Link>
              <Link to={route.projectDetails} className="btn btn-primary">
                View Details
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  {/* /Create Task */}
</>

    </div>
  )
}

export default ProjectDetails