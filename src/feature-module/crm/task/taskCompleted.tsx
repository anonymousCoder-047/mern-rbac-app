import React, { useState } from "react";
import { Link } from "react-router-dom";
import ImageWithBasePath from "../../../core/common/imageWithBasePath";
import DateRangePicker from "react-bootstrap-daterangepicker";
import { activeList, initialSettings, priorityList } from "../../../core/common/selectoption/selectoption";
import { all_routes } from "../../router/all_routes";
import { useDispatch, useSelector } from "react-redux";
import { setActivityTogglePopup, setActivityTogglePopupTwo } from "../../../core/data/redux/commonSlice";
import { SelectWithImage2 } from "../../../core/common/selectWithImage2";
import Select from "react-select";
import DatePicker from "react-datepicker";
const route = all_routes;
const TaskCompleted = () => {

  const dispatch = useDispatch();
  const activityToggle = useSelector(
    (state: any) => state?.activityTogglePopup
  );
  const activityToggleTwo = useSelector(
    (state: any) => state?.activityTogglePopupTwo
  );
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
  };
  const [selectedDate1, setSelectedDate1] = useState<Date | null>(new Date());
  const handleDateChange1 = (date: Date | null) => {
    setSelectedDate1(date);
  };

  const meetingMode = [
    { value: "Choose", label: "Choose" },
    { value: "Calls", label: "Calls" },
    { value: "Email", label: "Email" },
    { value: "Meeting", label: "Meeting" },
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
                  <div className="col-4">
                    <h4 className="page-title">
                      Tasks<span className="count-title">123</span>
                    </h4>
                  </div>
                  <div className="col-8 text-end">
                    <div className="head-icons">
                      <Link
                        to={route.tasksCompleted}
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
              <div className="card">
              <div className="card-header">
                  {/* Search */}
                  <div className="row align-items-center">
                    <div className="col-sm-4">
                      <div className="icon-form mb-sm-0">
                        <span className="form-icon">
                          <i className="ti ti-search" />
                        </span>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Search Task"
                        />
                      </div>
                    </div>
                    <div className="col-sm-8">
                      <div className="d-flex align-items-center flex-wrap row-gap-2 justify-content-sm-end mb-3 mb-sm-0">
                        <Link
                          to="#"
                          className="btn btn-primary"
                          data-bs-toggle="offcanvas"
                          data-bs-target="#offcanvas_add"
                        >
                          <i className="ti ti-square-rounded-plus me-2" />
                          Add New Tasks
                        </Link>
                      </div>
                    </div>
                  </div>
                  {/* /Search */}
                </div>
                <div className="card-body">
                <>
                    {/* Filter */}
                    <div className="d-flex align-items-center justify-content-between flex-wrap row-gap-2 mb-4">
                      <div className="sort-dropdown drop-down task-drops">
                        <Link
                          to="#"
                          className="dropdown-toggle"
                          data-bs-toggle="dropdown"
                        >
                          All Tasks{" "}
                        </Link>
                        <div className="dropdown-menu  dropdown-menu-start">
                          <ul>
                            <li>
                              <Link to={route.tasks}>
                                <i className="ti ti-dots-vertical" />
                                All Tasks
                              </Link>
                            </li>
                            <li>
                              <Link to={route.tasksImportant}>
                                <i className="ti ti-dots-vertical" />
                                Important
                              </Link>
                            </li>
                            <li>
                              <Link to={route.tasksCompleted}>
                                <i className="ti ti-dots-vertical" />
                                Completed
                              </Link>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="d-flex align-items-center flex-wrap row-gap-2">
                        <div className="all-read me-2 ">
                          <label className="checkboxs">
                            <input type="checkbox"  defaultChecked />
                            <span className="checkmarks" />
                            Mark all as read
                          </label>
                        </div>
                        <div className="dropdown me-2">
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
                        <div className="icon-form me-2">
                          <span className="form-icon">
                            <i className="ti ti-calendar" />
                          </span>
                          <DateRangePicker initialSettings={initialSettings}>
                                                            <input
                                                                className="form-control bookingrange"
                                                                type="text"
                                                            />
                                                        </DateRangePicker>
                        </div>
                        <div className="form-sorts dropdown">
                          <Link
                            to="#"
                            data-bs-toggle="dropdown"
                            data-bs-auto-close="outside"
                          >
                            <i className="ti ti-filter-share" />
                            Filter
                          </Link>
                          <div className="filter-dropdown-menu dropdown-menu  dropdown-menu-md-end p-3">
                            <div className="filter-set-view">
                              <div className="filter-set-head">
                                <h4>
                                  <i className="ti ti-filter-share" />
                                  Filter
                                </h4>
                              </div>
                              <div className="accordion" id="accordionExample">
                                <div className="filter-set-content">
                                  <div className="filter-set-content-head">
                                    <Link
                                      to="#"
                                      data-bs-toggle="collapse"
                                      data-bs-target="#collapseTwo"
                                      aria-expanded="true"
                                      aria-controls="collapseTwo"
                                    >
                                      Task Name
                                    </Link>
                                  </div>
                                  <div
                                    className="filter-set-contents accordion-collapse collapse show"
                                    id="collapseTwo"
                                    data-bs-parent="#accordionExample"
                                  >
                                    <div className="filter-content-list">
                                      <div className="mb-2 icon-form">
                                        <span className="form-icon">
                                          <i className="ti ti-search" />
                                        </span>
                                        <input
                                          type="text"
                                          className="form-control"
                                          placeholder="Search Task"
                                        />
                                      </div>
                                      <ul>
                                        <li>
                                          <div className="filter-checks">
                                            <label className="checkboxs">
                                              <input
                                                type="checkbox"
                                                 defaultChecked
                                              />
                                              <span className="checkmarks" />
                                              Add a form to Update Task
                                            </label>
                                          </div>
                                        </li>
                                        <li>
                                          <div className="filter-checks">
                                            <label className="checkboxs">
                                              <input type="checkbox" />
                                              <span className="checkmarks" />
                                              Add a form to Update Task
                                            </label>
                                          </div>
                                        </li>
                                        <li>
                                          <div className="filter-checks">
                                            <label className="checkboxs">
                                              <input type="checkbox" />
                                              <span className="checkmarks" />
                                              Update orginal content
                                            </label>
                                          </div>
                                        </li>
                                        <li>
                                          <div className="filter-checks">
                                            <label className="checkboxs">
                                              <input type="checkbox" />
                                              <span className="checkmarks" />
                                              Use only component colours
                                            </label>
                                          </div>
                                        </li>
                                      </ul>
                                    </div>
                                  </div>
                                </div>
                                <div className="filter-set-content">
                                  <div className="filter-set-content-head">
                                    <Link
                                      to="#"
                                      className="collapsed"
                                      data-bs-toggle="collapse"
                                      data-bs-target="#owner"
                                      aria-expanded="false"
                                      aria-controls="owner"
                                    >
                                      Task Type
                                    </Link>
                                  </div>
                                  <div
                                    className="filter-set-contents accordion-collapse collapse"
                                    id="owner"
                                    data-bs-parent="#accordionExample"
                                  >
                                    <div className="filter-content-list">
                                      <div className="mb-2 icon-form">
                                        <span className="form-icon">
                                          <i className="ti ti-search" />
                                        </span>
                                        <input
                                          type="text"
                                          className="form-control"
                                          placeholder="Search Client"
                                        />
                                      </div>
                                      <ul>
                                        <li>
                                          <div className="filter-checks">
                                            <label className="checkboxs">
                                              <input
                                                type="checkbox"
                                                 defaultChecked
                                              />
                                              <span className="checkmarks" />
                                              Meeting
                                            </label>
                                          </div>
                                        </li>
                                        <li>
                                          <div className="filter-checks">
                                            <label className="checkboxs">
                                              <input type="checkbox" />
                                              <span className="checkmarks" />
                                              Calls
                                            </label>
                                          </div>
                                        </li>
                                        <li>
                                          <div className="filter-checks">
                                            <label className="checkboxs">
                                              <input type="checkbox" />
                                              <span className="checkmarks" />
                                              Task
                                            </label>
                                          </div>
                                        </li>
                                        <li>
                                          <div className="filter-checks">
                                            <label className="checkboxs">
                                              <input type="checkbox" />
                                              <span className="checkmarks" />
                                              Email
                                            </label>
                                          </div>
                                        </li>
                                      </ul>
                                    </div>
                                  </div>
                                </div>
                                <div className="filter-set-content">
                                  <div className="filter-set-content-head">
                                    <Link
                                      to="#"
                                      className="collapsed"
                                      data-bs-toggle="collapse"
                                      data-bs-target="#collapseone"
                                      aria-expanded="false"
                                      aria-controls="collapseone"
                                    >
                                      Tags
                                    </Link>
                                  </div>
                                  <div
                                    className="filter-set-contents accordion-collapse collapse"
                                    id="collapseone"
                                    data-bs-parent="#accordionExample"
                                  >
                                    <div className="filter-content-list">
                                      <ul>
                                        <li>
                                          <div className="filter-checks">
                                            <label className="checkboxs">
                                              <input
                                                type="checkbox"
                                                 defaultChecked
                                              />
                                              <span className="checkmarks" />
                                              Collab
                                            </label>
                                          </div>
                                        </li>
                                        <li>
                                          <div className="filter-checks">
                                            <label className="checkboxs">
                                              <input type="checkbox" />
                                              <span className="checkmarks" />
                                              Rated
                                            </label>
                                          </div>
                                        </li>
                                        <li>
                                          <div className="filter-checks">
                                            <label className="checkboxs">
                                              <input type="checkbox" />
                                              <span className="checkmarks" />
                                              Promotion
                                            </label>
                                          </div>
                                        </li>
                                      </ul>
                                    </div>
                                  </div>
                                </div>
                                <div className="filter-set-content">
                                  <div className="filter-set-content-head">
                                    <Link
                                      to="#"
                                      className="collapsed"
                                      data-bs-toggle="collapse"
                                      data-bs-target="#collapseThree"
                                      aria-expanded="false"
                                      aria-controls="collapseThree"
                                    >
                                      Created By
                                    </Link>
                                  </div>
                                  <div
                                    className="filter-set-contents accordion-collapse collapse"
                                    id="collapseThree"
                                    data-bs-parent="#accordionExample"
                                  >
                                    <div className="filter-content-list">
                                      <ul>
                                        <li>
                                          <div className="filter-checks">
                                            <label className="checkboxs">
                                              <input
                                                type="checkbox"
                                                 defaultChecked
                                              />
                                              <span className="checkmarks" />
                                              Hendry
                                            </label>
                                          </div>
                                        </li>
                                        <li>
                                          <div className="filter-checks">
                                            <label className="checkboxs">
                                              <input type="checkbox" />
                                              <span className="checkmarks" />
                                              Monty Beer
                                            </label>
                                          </div>
                                        </li>
                                        <li>
                                          <div className="filter-checks">
                                            <label className="checkboxs">
                                              <input type="checkbox" />
                                              <span className="checkmarks" />
                                              Bradtke
                                            </label>
                                          </div>
                                        </li>
                                      </ul>
                                    </div>
                                  </div>
                                </div>
                                <div className="filter-set-content">
                                  <div className="filter-set-content-head">
                                    <Link
                                      to="#"
                                      className="collapsed"
                                      data-bs-toggle="collapse"
                                      data-bs-target="#collapsethree"
                                      aria-expanded="false"
                                      aria-controls="collapsethree"
                                    >
                                      Created Date
                                    </Link>
                                  </div>
                                  <div
                                    className="filter-set-contents accordion-collapse collapse"
                                    id="collapsethree"
                                    data-bs-parent="#accordionExample"
                                  >
                                    <div className="filter-content-list">
                                      <ul>
                                        <li>
                                          <div className="filter-checks">
                                            <label className="checkboxs">
                                              <input
                                                type="checkbox"
                                                 defaultChecked
                                              />
                                              <span className="checkmarks" />
                                              23 Oct 2023
                                            </label>
                                          </div>
                                        </li>
                                        <li>
                                          <div className="filter-checks">
                                            <label className="checkboxs">
                                              <input type="checkbox" />
                                              <span className="checkmarks" />
                                              29 Sep 2023
                                            </label>
                                          </div>
                                        </li>
                                        <li>
                                          <div className="filter-checks">
                                            <label className="checkboxs">
                                              <input type="checkbox" />
                                              <span className="checkmarks" />
                                              24 Oct 2023
                                            </label>
                                          </div>
                                        </li>
                                        <li>
                                          <div className="filter-checks">
                                            <label className="checkboxs">
                                              <input type="checkbox" />
                                              <span className="checkmarks" />
                                              25 Oct 2023
                                            </label>
                                          </div>
                                        </li>
                                        <li>
                                          <div className="filter-checks">
                                            <label className="checkboxs">
                                              <input type="checkbox" />
                                              <span className="checkmarks" />
                                            </label>
                                          </div>
                                        </li>
                                      </ul>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="filter-reset-btns">
                                <div className="row">
                                  <div className="col-6">
                                    <Link to="#" className="btn btn-light">
                                      Reset
                                    </Link>
                                  </div>
                                  <div className="col-6">
                                    <Link
                                      to={route.tasks}
                                      className="btn btn-primary"
                                    >
                                      Filter
                                    </Link>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* /Filter */}
                  </>

                  {/* Recent Task List */}
                  <div className="task-wrapper">
                    <Link
                      to="#"
                      className="task-accordion"
                      data-bs-toggle="collapse"
                      data-bs-target="#recent"
                    >
                      <h4>
                        Recent<span>24</span>
                      </h4>
                    </Link>
                    <div
                      className="tasks-activity tasks collapse show"
                      id="recent"
                    >
                      <ul>
                        <li className="task-wrap  success">
                          <div className="task-info">
                            <span className="task-icon">
                              <i className="ti ti-grip-vertical" />
                            </span>
                            <div className="task-checkbox">
                              <label className="checkboxs">
                                <input type="checkbox" />
                                <span className="checkmarks" />
                              </label>
                            </div>
                            <div className="set-star rating-select">
                              <i className="fa fa-star" />
                            </div>
                            <p>
                              <del>
                                Make sure all the padding should be 24px
                              </del>
                            </p>
                            <span className="badge badge-pill badge-status bg-green">
                              <i className="ti ti-phone" />
                              Calls
                            </span>
                            <span className="badge badge-tag bg-success">
                              Completed
                            </span>
                          </div>
                          <div className="task-actions">
                            <ul>
                              <li className="task-time">
                                <span className="badge badge-tag badge-purple-light">
                                  Promotion
                                </span>
                              </li>
                              <li className="task-date">
                                <i className="ti ti-calendar-exclamation" />
                                23 Oct 2023
                              </li>
                              <li className="task-owner">
                                <div className="task-user">
                                  <ImageWithBasePath
                                    src="assets/img/profiles/avatar-14.jpg"
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
                                  <Link className="dropdown-item" data-bs-toggle="offcanvas" to="#" data-bs-target="#offcanvas_edit"><i className="ti ti-edit text-blue"></i> Edit</Link>
                                    <Link
                                      className="dropdown-item"
                                      to="#"
                                      data-bs-toggle="modal"
                                      data-bs-target="#delete_activity"
                                    >
                                      <i className="ti ti-trash text-danger" />{" "}
                                      Delete
                                    </Link>
                                  </div>
                                </div>
                              </li>
                            </ul>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                  {/* /Recent Task List */}
                  {/* Recent Task List */}
                  <div className="task-wrapper">
                    <Link
                      to="#"
                      className="task-accordion"
                      data-bs-toggle="collapse"
                      data-bs-target="#yesterday"
                    >
                      <h4>Yesterday</h4>
                    </Link>
                    <div
                      className="tasks-activity tasks collapse show"
                      id="yesterday"
                    >
                      <ul>
                        <li className="task-wrap  success">
                          <div className="task-info">
                            <span className="task-icon">
                              <i className="ti ti-grip-vertical" />
                            </span>
                            <div className="task-checkbox">
                              <label className="checkboxs">
                                <input type="checkbox" />
                                <span className="checkmarks" />
                              </label>
                            </div>
                            <div className="set-star rating-select">
                              <i className="fa fa-star" />
                            </div>
                            <p>
                              <del>Use border radius as 5px or 10 px</del>
                            </p>
                            <span className="badge badge-pill badge-status bg-blue">
                              <i className="ti ti-subtask" />
                              Task
                            </span>
                            <span className="badge badge-tag bg-success">
                              Completed
                            </span>
                          </div>
                          <div className="task-actions">
                            <ul>
                              <li className="task-time">
                                <span className="badge badge-tag badge-success-light">
                                  Collab
                                </span>
                                <span className="badge badge-tag badge-warning-light">
                                  Rated
                                </span>
                              </li>
                              <li className="task-date">
                                <i className="ti ti-calendar-exclamation" />
                                22 Oct 2023
                              </li>
                              <li className="task-owner">
                                <div className="task-user">
                                  <ImageWithBasePath
                                    src="assets/img/profiles/avatar-14.jpg"
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
                                  <Link className="dropdown-item" data-bs-toggle="offcanvas" to="#" data-bs-target="#offcanvas_edit"><i className="ti ti-edit text-blue"></i> Edit</Link>
                                    <Link
                                      className="dropdown-item"
                                      to="#"
                                      data-bs-toggle="modal"
                                      data-bs-target="#delete_activity"
                                    >
                                      <i className="ti ti-trash text-danger" />{" "}
                                      Delete
                                    </Link>
                                  </div>
                                </div>
                              </li>
                            </ul>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                  {/* /Recent Task List */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* /Page Wrapper */}
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
                <Select
                        options={meetingMode}
                        className="select2"
                        placeholder="Choose"
                      />
              </div>
              <div className="mb-3">
                <label className="col-form-label">
                  Responsible Persons <span className="text-danger">*</span>
                </label>
                <SelectWithImage2 />
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
                <DatePicker
                        className="form-control datetimepicker deals-details"
                        selected={selectedDate}
                        onChange={handleDateChange}
                        dateFormat="dd-MM-yyyy"
                      />
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
                <DatePicker
                        className="form-control datetimepicker deals-details"
                        selected={selectedDate1}
                        onChange={handleDateChange1}
                        dateFormat="dd-MM-yyyy"
                      />
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
                  <Select
                          options={priorityList}
                          className="select2"
                          placeholder="Choose"
                        />
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="mb-3">
                <label className="col-form-label">Status</label>
                <Select
                        options={activeList}
                        className="select"
                        placeholder="Active"
                      />
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
          <button type="button" className="btn btn-primary">
            Create
          </button>
        </div>
      </form>
    </div>
  </div>
  {/* /Add New Task */}
  {/* Edit Task */}
  <div
    className="offcanvas offcanvas-end offcanvas-large"
    tabIndex={-1}
    id="offcanvas_edit"
  >
    <div className="offcanvas-header border-bottom">
      <h4>Edit Task</h4>
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
                <input
                  type="text"
                  className="form-control"
                  defaultValue="Add a form to Update Task"
                />
              </div>
              <div className="mb-3">
                <label className="col-form-label">Category</label>
                <Select
                        options={meetingMode}
                        className="select2"
                        placeholder="Meeting"
                      />
              </div>
              <div className="mb-3">
                <label className="col-form-label">
                  Responsible Persons <span className="text-danger">*</span>
                </label>
                <SelectWithImage2 />
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
                <DatePicker
                        className="form-control datetimepicker deals-details"
                        selected={selectedDate}
                        onChange={handleDateChange}
                        dateFormat="dd-MM-yyyy"
                      />
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
                <DatePicker
                        className="form-control datetimepicker deals-details"
                        selected={selectedDate1}
                        onChange={handleDateChange1}
                        dateFormat="dd-MM-yyyy"
                      />
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
                  <Select
                          options={priorityList}
                          className="select2"
                          placeholder="High"
                        />
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="mb-3">
                <label className="col-form-label">Status</label>
                <Select
                        options={activeList}
                        className="select2"
                        placeholder="Active"
                      />
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
          <button type="button" className="btn btn-primary">
            Save Changes
          </button>
        </div>
      </form>
    </div>
  </div>
  {/* /Edit Task */}
  {/* Delete Task */}
  <div className="modal fade" id="delete_activity" role="dialog">
    <div className="modal-dialog modal-dialog-centered">
      <div className="modal-content">
        <div className="modal-body">
          <div className="text-center">
            <div className="avatar avatar-xl bg-danger-light rounded-circle mb-3">
              <i className="ti ti-trash-x fs-36 text-danger" />
            </div>
            <h4 className="mb-2">Remove Task?</h4>
            <p className="mb-0">
              Are you sure you want to remove <br /> task you selected.
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
  {/* /Delete Task */}
  {/* Add New View */}
  <div className="modal custom-modal fade" id="save_view" role="dialog">
    <div className="modal-dialog modal-dialog-centered">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">Add New View</h5>
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
              <label className="col-form-label">View Name</label>
              <input type="text" className="form-control" />
            </div>
            <div className="modal-btn text-end">
              <Link to="#" className="btn btn-light" data-bs-dismiss="modal">
                Cancel
              </Link>
              <button type="submit" className="btn btn-danger">
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
  {/* /Add New View */}
    </div>
  );
};

export default TaskCompleted;
