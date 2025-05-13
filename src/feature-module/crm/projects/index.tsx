import React, { useState } from "react";
import { Link } from "react-router-dom";
import { projectData } from "../../../core/data/json/projectsData";
import Table from "../../../core/common/dataTable/index";
import { TableData } from "../../../core/data/interface";
import { all_routes } from "../../router/all_routes";
import ImageWithBasePath from "../../../core/common/imageWithBasePath";
import { useDispatch, useSelector } from "react-redux";
import {
  setActivityTogglePopup,
  setActivityTogglePopupTwo,
} from "../../../core/data/redux/commonSlice";
import Select from "react-select";
import {
  activeList,
  category,
  clientList,
  initialSettings,
  priorityList,
  projectTiming,
  projectType,
  status1,
} from "../../../core/common/selectoption/selectoption";
import DatePicker from "react-datepicker";
import CollapseHeader from "../../../core/common/collapse-header";
import { SelectWithImage2 } from "../../../core/common/selectWithImage2";
import DateRangePicker from "react-bootstrap-daterangepicker";

const Projects = () => {
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

  const route = all_routes;
  const data = projectData;
  const [stars, setStars] = useState<{ [key: number]: boolean }>({});

  const initializeStarsState = () => {
    const starsState: { [key: number]: boolean } = {};
    projectData.forEach((item, index) => {
      starsState[index] = false;
    });
    setStars(starsState);
  };
  React.useEffect(() => {
    initializeStarsState();
  }, []);
  const handleStarToggle = (index: number) => {
    setStars((prevStars) => ({
      ...prevStars,
      [index]: !prevStars[index],
    }));
  };
  const columns = [
    {
      title: "",
      dataIndex: "",
      render: (text: string, record: any, index: number) => (
        <div
          className={`set-star rating-select ${stars[index] ? "filled" : ""}`}
          onClick={() => handleStarToggle(index)}
        >
          <i className="fa fa-star"></i>
        </div>
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
      render: (text: any, record: any) => (
        <div className="table-avatar d-flex align-items-center">
          <Link to={route.projectDetails} className="avatar avatar-sm border me-2">
            <ImageWithBasePath
              className="w-auto h-auto"
              src={record.pro_img}
              alt="img"
            />
          </Link>
          <Link
            to={route.projectDetails}
            className="profile-split d-flex flex-column"
          >
            {text}
          </Link>
        </div>
      ),
      sorter: (a: TableData, b: TableData) => a.name.length - b.name.length,
    },
    {
      title: "Client",
      dataIndex: "client",
      render: (text: any, record: any) => (
        <div className="table-avatar d-flex align-items-center">
          <Link to={route.companyDetails} className="avatar avatar-sm border me-2">
            <ImageWithBasePath
              className="w-auto h-auto"
              src={record.client_img}
              alt="img"
            />
          </Link>
          <Link
            to={route.companyDetails}
            className="profile-split d-flex flex-column"
          >
            {text}
          </Link>
        </div>
      ),
      sorter: (a: TableData, b: TableData) => a.client.length - b.client.length,
    },
    {
      title: "Priority",
      dataIndex: "piority",
      render: (text: any) => (
        <div>
          {text === "High" && (
            <span className="priority badge badge-tag badge-danger-light">
              <i className="ti ti-square-rounded-filled" />
              {text}
            </span>
          )}
          {text === "Medium" && (
            <span className="priority badge badge-tag badge-warning-light">
              <i className="ti ti-square-rounded-filled" />
              {text}
            </span>
          )}
          {text === "Low" && (
            <span className="priority badge badge-tag badge-success-light">
              <i className="ti ti-square-rounded-filled" />
              {text}
            </span>
          )}
        </div>
      ),
      sorter: (a: TableData, b: TableData) =>
        a.piority.length - b.piority.length,
    },
    {
      title: "Start Date",
      dataIndex: "start_date",
      sorter: (a: TableData, b: TableData) =>
        a.start_date.length - b.start_date.length,
    },
    {
      title: "End Date",
      dataIndex: "end_date",
      sorter: (a: TableData, b: TableData) =>
        a.end_date.length - b.end_date.length,
    },
    {
      title: "Type",
      dataIndex: "type",
      sorter: (a: TableData, b: TableData) => a.type.length - b.type.length,
    },
    {
      title: "Pipeline Stage",
      dataIndex: "stage",
      render: (text: any, record: any) => (
        <div className="pipeline-progress d-flex align-items-center">
          <div className="progress">
            {text === "Plan" && (
              <div
                className="progress-bar progress-bar-violet"
                role="progressbar"
              ></div>
            )}
            {text === "Completed" && (
              <div
                className="progress-bar progress-bar-success"
                role="progressbar"
              ></div>
            )}
            {text === "Design" && (
              <div
                className="progress-bar progress-bar-warning"
                role="progressbar"
              ></div>
            )}
            {text === "In PipeLine" && (
              <div
                className="progress-bar progress-bar-violet"
                role="progressbar"
              ></div>
            )}
            {text === "Schedule Service" && (
              <div
                className="progress-bar progress-bar-pink"
                role="progressbar"
              ></div>
            )}
            {text === "Lost" && (
              <div
                className="progress-bar progress-bar-danger"
                role="progressbar"
              ></div>
            )}
            {text === "Develop" && (
              <div
                className="progress-bar progress-bar-info"
                role="progressbar"
              ></div>
            )}
          </div>
          <span>{text}</span>
        </div>
      ),
      sorter: (a: TableData, b: TableData) => a.stage.length - b.stage.length,
    },

    {
      title: "Status",
      dataIndex: "status",
      render: (text: any) => (
        <div>
          {text === "Active" && (
            <span className="badge badge-pill badge-status bg-success">
              {text}
            </span>
          )}
          {text === "Inactive" && (
            <span className="badge badge-pill badge-status bg-danger">
              {text}
            </span>
          )}
        </div>
      ),
      sorter: (a: TableData, b: TableData) => a.status.length - b.status.length,
    },

    {
      title: "Actions",
      dataIndex: "actions",
      render: () => (
        <div className="dropdown table-action">
          <Link
            to="#"
            className="action-icon"
            data-bs-toggle="dropdown"
            aria-expanded="true"
          >
            <i className="fa fa-ellipsis-v"></i>
          </Link>
          <div
            className="dropdown-menu dropdown-menu-right"
            style={{
              position: "absolute",
              inset: "0px auto auto 0px",
              margin: "0px",
              transform: "translate3d(-99.3333px, 35.3333px, 0px)",
            }}
            data-popper-placement="bottom-start"
          >
           
           <Link className="dropdown-item" to="#" data-bs-toggle="offcanvas" data-bs-target="#offcanvas_edit"><i className="ti ti-edit text-blue"></i> Edit</Link>
            <Link
              className="dropdown-item"
              to="#"
              data-bs-toggle="modal"
              data-bs-target="#delete_project"
            >
              <i className="ti ti-trash text-danger"></i> Delete
            </Link>
           
          </div>
        </div>
      ),
    },
  ];
  return (
    <>
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
                      Projects<span className="count-title">123</span>
                    </h4>
                  </div>
                  <div className="col-8 text-end">
                    <div className="head-icons">
                      <CollapseHeader />
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
                      <div className="icon-form mb-3 mb-sm-0">
                        <span className="form-icon">
                          <i className="ti ti-search" />
                        </span>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Search Projects"
                        />
                      </div>
                    </div>
                    <div className="col-sm-8">
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
                          to="#"
                          className="btn btn-primary"
                          data-bs-toggle="offcanvas"
                          data-bs-target="#offcanvas_add"
                        >
                          <i className="ti ti-square-rounded-plus me-2" />
                          Add New Project
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
                      <div className="d-flex align-items-center flex-wrap row-gap-2">
                        <div className="dropdown me-2">
                          <Link
                            to="#"
                            className="dropdown-toggle"
                            data-bs-toggle="dropdown"
                          >
                            <i className="ti ti-sort-ascending-2 me-2" />
                            Sort
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
                        <div className="icon-form">
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
                      </div>
                      <div className="d-flex align-items-center flex-wrap row-gap-2">
                        <div className="dropdown me-2">
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
                                  Name
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
                                  Client
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
                                  Priority
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
                                  Start Date
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
                                  Due Date
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
                                  Type
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
                                  Pipeline Stage
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
                                    id="col-rate"
                                    className="check"
                                    defaultChecked
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
                                  Action
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
                            </div>
                          </div>
                        </div>
                        <div className="form-sorts dropdown me-2">
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
                                      Project Name
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
                                          placeholder="Search Name"
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
                                              Truelysell
                                            </label>
                                          </div>
                                        </li>
                                        <li>
                                          <div className="filter-checks">
                                            <label className="checkboxs">
                                              <input type="checkbox" />
                                              <span className="checkmarks" />
                                              Dreamschat
                                            </label>
                                          </div>
                                        </li>
                                        <li>
                                          <div className="filter-checks">
                                            <label className="checkboxs">
                                              <input type="checkbox" />
                                              <span className="checkmarks" />
                                              Servbook
                                            </label>
                                          </div>
                                        </li>
                                        <li>
                                          <div className="filter-checks">
                                            <label className="checkboxs">
                                              <input type="checkbox" />
                                              <span className="checkmarks" />
                                              Doccure
                                            </label>
                                          </div>
                                        </li>
                                        <li>
                                          <div className="filter-checks">
                                            <label className="checkboxs">
                                              <input type="checkbox" />
                                              <span className="checkmarks" />
                                              Dreamsports
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
                                      data-bs-target="#client"
                                      aria-expanded="false"
                                      aria-controls="client"
                                    >
                                      Client Name
                                    </Link>
                                  </div>
                                  <div
                                    className="filter-set-contents accordion-collapse collapse"
                                    id="client"
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
                                              NovaWave LLC
                                            </label>
                                          </div>
                                        </li>
                                        <li>
                                          <div className="filter-checks">
                                            <label className="checkboxs">
                                              <input type="checkbox" />
                                              <span className="checkmarks" />
                                              BlueSky Industries
                                            </label>
                                          </div>
                                        </li>
                                        <li>
                                          <div className="filter-checks">
                                            <label className="checkboxs">
                                              <input type="checkbox" />
                                              <span className="checkmarks" />
                                              Silver Hawk
                                            </label>
                                          </div>
                                        </li>
                                        <li>
                                          <div className="filter-checks">
                                            <label className="checkboxs">
                                              <input type="checkbox" />
                                              <span className="checkmarks" />
                                              Summit Peak
                                            </label>
                                          </div>
                                        </li>
                                        <li>
                                          <div className="filter-checks">
                                            <label className="checkboxs">
                                              <input type="checkbox" />
                                              <span className="checkmarks" />
                                              CoastalStar Co.
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
                                      data-bs-target="#type"
                                      aria-expanded="false"
                                      aria-controls="type"
                                    >
                                      Type
                                    </Link>
                                  </div>
                                  <div
                                    className="filter-set-contents accordion-collapse collapse"
                                    id="type"
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
                                              Web App
                                            </label>
                                          </div>
                                        </li>
                                        <li>
                                          <div className="filter-checks">
                                            <label className="checkboxs">
                                              <input type="checkbox" />
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
                                              Mobile App
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
                                      data-bs-target="#collapseOne"
                                      aria-expanded="false"
                                      aria-controls="collapseOne"
                                    >
                                      Start Date
                                    </Link>
                                  </div>
                                  <div
                                    className="filter-set-contents accordion-collapse collapse"
                                    id="collapseOne"
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
                                              25 Sep 2023
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
                                              29 Sep 2023
                                            </label>
                                          </div>
                                        </li>
                                        <li>
                                          <div className="filter-checks">
                                            <label className="checkboxs">
                                              <input type="checkbox" />
                                              <span className="checkmarks" />
                                              14 Oct 2023
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
                                      data-bs-target="#collapsetwo"
                                      aria-expanded="false"
                                      aria-controls="collapsetwo"
                                    >
                                      End Date
                                    </Link>
                                  </div>
                                  <div
                                    className="filter-set-contents accordion-collapse collapse"
                                    id="collapsetwo"
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
                                              19 Oct 2023
                                            </label>
                                          </div>
                                        </li>
                                        <li>
                                          <div className="filter-checks">
                                            <label className="checkboxs">
                                              <input type="checkbox" />
                                              <span className="checkmarks" />
                                              23 Nov 2023
                                            </label>
                                          </div>
                                        </li>
                                        <li>
                                          <div className="filter-checks">
                                            <label className="checkboxs">
                                              <input type="checkbox" />
                                              <span className="checkmarks" />
                                              14 Dec 2023
                                            </label>
                                          </div>
                                        </li>
                                        <li>
                                          <div className="filter-checks">
                                            <label className="checkboxs">
                                              <input type="checkbox" />
                                              <span className="checkmarks" />
                                              09 Dec 2023
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
                                      data-bs-target="#Stage"
                                      aria-expanded="false"
                                      aria-controls="Stage"
                                    >
                                      Pipeline Stage
                                    </Link>
                                  </div>
                                  <div
                                    className="filter-set-contents accordion-collapse collapse"
                                    id="Stage"
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
                                              Plan
                                            </label>
                                          </div>
                                        </li>
                                        <li>
                                          <div className="filter-checks">
                                            <label className="checkboxs">
                                              <input type="checkbox" />
                                              <span className="checkmarks" />
                                              Develop
                                            </label>
                                          </div>
                                        </li>
                                        <li>
                                          <div className="filter-checks">
                                            <label className="checkboxs">
                                              <input type="checkbox" />
                                              <span className="checkmarks" />
                                              Completed
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
                                      data-bs-target="#Status"
                                      aria-expanded="false"
                                      aria-controls="Status"
                                    >
                                      Status
                                    </Link>
                                  </div>
                                  <div
                                    className="filter-set-contents accordion-collapse collapse"
                                    id="Status"
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
                                              Active
                                            </label>
                                          </div>
                                        </li>
                                        <li>
                                          <div className="filter-checks">
                                            <label className="checkboxs">
                                              <input type="checkbox" />
                                              <span className="checkmarks" />
                                              Inactive
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
                                      to={route. projects}
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
                        <div className="view-icons">
                          <Link to={route.projects} className="active">
                            <i className="ti ti-list-tree" />
                          </Link>
                          <Link to={route.projectsGrid}>
                            <i className="ti ti-grid-dots" />
                          </Link>
                        </div>
                      </div>
                    </div>
                    {/* /Filter */}
                  </>

                  {/* Projects List */}
                  <div className="table-responsive custom-table">
                    <Table dataSource={data} columns={columns} />
                  </div>
                  <div className="row align-items-center">
                    <div className="col-md-6">
                      <div className="TableData-length" />
                    </div>
                    <div className="col-md-6">
                      <div className="TableData-paginate" />
                    </div>
                  </div>
                  {/* /Projects List */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* /Page Wrapper */}
      <>
  {/* Add New Project */}
  <div
    className="offcanvas offcanvas-end offcanvas-large"
    tabIndex={-1}
    id="offcanvas_add"
  >
    <div className="offcanvas-header border-bottom">
      <h4>Add New Project</h4>
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
                  Name <span className="text-danger">*</span>
                </label>
                <input type="text" className="form-control" />
              </div>
            </div>
            <div className="col-md-6">
              <div className="mb-3">
                <label className="col-form-label">
                  Project ID<span className="text-danger"> *</span>
                </label>
                <input className="form-control" type="text" />
              </div>
            </div>
            <div className="col-md-6">
              <div className="mb-3">
                <label className="col-form-label">
                  Project Type <span className="text-danger">*</span>
                </label>
                <Select
                        options={projectType}
                        className="select"
                        placeholder="Select"
                         classNamePrefix="react-select"
                      />
              </div>
            </div>
            <div className="col-md-6">
              <div className="mb-3">
                <label className="col-form-label">
                  Client <span className="text-danger">*</span>
                </label>
                <Select
                        options={clientList}
                        className="select"
                        placeholder="Select"
                        classNamePrefix="react-select"
                      />
              </div>
            </div>
            <div className="col-md-6">
              <div className="mb-3">
                <label className="col-form-label">
                  Category <span className="text-danger">*</span>
                </label>
                <Select
                        options={category}
                        className="select"
                        placeholder="Select"
                         classNamePrefix="react-select"
                      />
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="mb-3">
                <label className="col-form-label">
                  Project Timing <span className="text-danger">*</span>
                </label>
                <Select
                        options={projectTiming}
                        className="select"
                        placeholder="Select"
                         classNamePrefix="react-select"
                      />
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="mb-3">
                <label className="col-form-label">
                  Price <span className="text-danger">*</span>
                </label>
                <input className="form-control" type="text" />
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="mb-3">
                <label className="col-form-label">
                  Amount <span className="text-danger">*</span>
                </label>
                <input className="form-control" type="text" />
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="mb-3">
                <label className="col-form-label">
                  Total <span className="text-danger">*</span>
                </label>
                <input className="form-control" type="text" />
              </div>
            </div>
            <div className="col-md-6">
              <div className="mb-3">
                <label className="col-form-label">
                  Responsible Persons <span className="text-danger">*</span>
                </label>
                <SelectWithImage2 />
              </div>
            </div>
            <div className="col-md-6">
              <div className="mb-3">
                <label className="col-form-label">
                  Team Leader <span className="text-danger">*</span>
                </label>
                <SelectWithImage2 />
              </div>
            </div>
            <div className="col-md-6">
              <div className="mb-3">
                <label className="col-form-label">
                  Start Date <span className="text-danger">*</span>
                </label>
                <div className="icon-form">
                  <span className="form-icon">
                    <i className="ti ti-calendar-event" />
                  </span>
                  <DatePicker
                          className="form-control datetimepicker"
                          selected={selectedDate}
                          onChange={handleDateChange}
                          dateFormat="dd-MM-yyyy"
                        />
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="mb-3">
                <label className="col-form-label">
                  Due Date <span className="text-danger">*</span>
                </label>
                <div className="icon-form">
                  <span className="form-icon">
                    <i className="ti ti-calendar-event" />
                  </span>
                  <DatePicker
                          className="form-control datetimepicker"
                          selected={selectedDate1}
                          onChange={handleDateChange1}
                          dateFormat="dd-MM-yyyy"
                        />
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="mb-3">
                <label className="col-form-label">Priority</label>
                <Select
                        options={priorityList}
                        className="select"
                        placeholder="Select"
                        classNamePrefix="react-select"
                      />
              </div>
            </div>
            <div className="col-md-6">
              <div className="mb-3">
                <label className="col-form-label">Status</label>
               
                <Select
                        options={status1}
                        className="select"
                        placeholder="Select"
                         classNamePrefix="react-select"
                      />
              </div>
            </div>
            <div className="col-md-12">
              <div className="mb-3">
                <label className="col-form-label">
                  Description <span className="text-danger">*</span>
                </label>
                <textarea className="form-control" rows={4} defaultValue={""} />
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
            data-bs-target="#create_project"
          >
            Create
          </button>
        </div>
      </form>
    </div>
  </div>
  {/* /Add New Project */}
  {/* Edit Project */}
  <div
    className="offcanvas offcanvas-end offcanvas-large"
    tabIndex={-1}
    id="offcanvas_edit"
  >
    <div className="offcanvas-header border-bottom">
      <h4>Edit Project</h4>
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
                  Name <span className="text-danger">*</span>
                </label>
                <input type="text" className="form-control" />
              </div>
            </div>
            <div className="col-md-6">
              <div className="mb-3">
                <label className="col-form-label">
                  Project ID<span className="text-danger"> *</span>
                </label>
                <input className="form-control" type="text" defaultValue={12} />
              </div>
            </div>
            <div className="col-md-6">
              <div className="mb-3">
                <label className="col-form-label">
                  Project Type <span className="text-danger">*</span>
                </label>
                <Select
                        options={status1}
                        className="select"
                        placeholder="Meeting"
                         classNamePrefix="react-select"
                      />
              </div>
            </div>
            <div className="col-md-6">
              <div className="mb-3">
                <label className="col-form-label">
                  Client <span className="text-danger">*</span>
                </label>
                <Select
                        options={clientList}
                        className="select"
                        placeholder="NovaWave LLC"
                        classNamePrefix="react-select"
                      />
              </div>
            </div>
            <div className="col-md-6">
              <div className="mb-3">
                <label className="col-form-label">
                  Category <span className="text-danger">*</span>
                </label>
                <Select
                        options={category}
                        className="select"
                        placeholder="HarborView"
                         classNamePrefix="react-select"
                      />
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="mb-3">
                <label className="col-form-label">
                  Project Timing <span className="text-danger">*</span>
                </label>
                <Select
                        options={projectTiming}
                        className="select"
                        placeholder="Hourly"
                        classNamePrefix="react-select"
                      />
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="mb-3">
                <label className="col-form-label">
                  Price <span className="text-danger">*</span>
                </label>
                <input className="form-control" type="text" />
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="mb-3">
                <label className="col-form-label">
                  Amount <span className="text-danger">*</span>
                </label>
                <input className="form-control" type="text" />
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="mb-3">
                <label className="col-form-label">
                  Total <span className="text-danger">*</span>
                </label>
                <input className="form-control" type="text" />
              </div>
            </div>
            <div className="col-md-6">
              <div className="mb-3">
                <label className="col-form-label">
                  Responsible Persons <span className="text-danger">*</span>
                </label>
                <SelectWithImage2 />
              </div>
            </div>
            <div className="col-md-6">
              <div className="mb-3">
                <label className="col-form-label">
                  Team Leader <span className="text-danger">*</span>
                </label>
                <SelectWithImage2 />
              </div>
            </div>
            <div className="col-md-6">
              <div className="mb-3">
                <label className="col-form-label">
                  Start Date <span className="text-danger">*</span>
                </label>
                <div className="icon-form">
                  <span className="form-icon">
                    <i className="ti ti-calendar-event" />
                  </span>
                  <DatePicker
                          className="form-control datetimepicker"
                          selected={selectedDate1}
                          onChange={handleDateChange1}
                          dateFormat="dd-MM-yyyy"
                        />
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="mb-3">
                <label className="col-form-label">
                  Due Date <span className="text-danger">*</span>
                </label>
                <div className="icon-form">
                  <span className="form-icon">
                    <i className="ti ti-calendar-event" />
                  </span>
                  <DatePicker
                          className="form-control datetimepicker"
                          selected={selectedDate1}
                          onChange={handleDateChange1}
                          dateFormat="dd-MM-yyyy"
                        />
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="mb-3">
                <label className="col-form-label">Priority</label>
                <Select
                        options={priorityList}
                        className="select"
                        placeholder="High"
                        classNamePrefix="react-select"
                      />
              </div>
            </div>
            <div className="col-md-6">
              <div className="mb-3">
                <label className="col-form-label">Status</label>
                <Select
                        options={activeList}
                        className="select"
                        placeholder="Active"
                         classNamePrefix="react-select"
                      />
              </div>
            </div>
            <div className="col-md-12">
              <div className="mb-3">
                <label className="col-form-label">
                  Description <span className="text-danger">*</span>
                </label>
                <textarea className="form-control" rows={4} defaultValue={""} />
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
  {/* /Edit Project */}
  {/* Delete Project */}
  <div className="modal fade" id="delete_project" role="dialog">
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
  {/* Create Project */}
  <div className="modal custom-modal fade" id="create_project" role="dialog">
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
              <i className="ti ti-atom-2" />
            </div>
            <h3>Project Created Successfully!!!</h3>
            <p>View the details of project, created</p>
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
  {/* /Create Project */}
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
</>

    </>
  );
};

export default Projects;
