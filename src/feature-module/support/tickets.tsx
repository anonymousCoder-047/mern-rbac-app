import React, { useState } from "react";
import Table from "../../core/common/dataTable/index";
import { ticketsData } from "../../core/data/json/tickets";
import ImageWithBasePath from "../../core/common/imageWithBasePath";
import { Link } from "react-router-dom";
import { all_routes } from "../router/all_routes";
import {
  initialSettings,
  priority,
  statusOption,
} from "../../core/common/selectoption/selectoption";
import DateRangePicker from "react-bootstrap-daterangepicker";
import DatePicker from "react-datepicker";
import Select from "react-select";
import CollapseHeader from "../../core/common/collapse-header";

const route = all_routes;

const Tickets = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [selectedDate2, setSelectedDate2] = useState<Date | null>(new Date());
  const [selectedDate3, setSelectedDate3] = useState<Date | null>(new Date());
  const [selectedDate4, setSelectedDate4] = useState<Date | null>(new Date());

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
  };
  const handleDateChange2 = (date: Date | null) => {
    setSelectedDate2(date);
  };
  const handleDateChange3 = (date: Date | null) => {
    setSelectedDate3(date);
  };
  const handleDateChange4 = (date: Date | null) => {
    setSelectedDate4(date);
  };

  const [sidebarPopup1, setSidebarPopup1] = useState(false);
  const [sidebarPopup2, setSidebarPopup2] = useState(false);

  const openSidebarPopup1 = () => {
    setSidebarPopup1(!sidebarPopup1);
  };

  const openSidebarPopup2 = () => {
    setSidebarPopup2(!sidebarPopup2);
  };

  const dataSource = ticketsData;
  const [stars, setStars] = useState<{ [key: number]: boolean }>({});

  const initializeStarsState = () => {
    const starsState: { [key: number]: boolean } = {};
    ticketsData.forEach((item, index) => {
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
      title: "Ticket ID",
      dataIndex: "ticketId",
      key: "ticketId",
    },
    {
      title: "Subject",
      dataIndex: "subject",
      key: "subject",
    },
    {
      title: "Assigned",
      dataIndex: "assigned",
      key: "assigned",
      render: (text: any, record: any) => (
        <h2 className="d-flex align-items-center">
          <Link to="#" className="avatar avatar-sm me-2">
            <ImageWithBasePath
              src={record.assignedAvatar}
              alt="User Image"
              className="w-auto h-auto"
            />
          </Link>
          <Link to="#" className="d-flex flex-column">
            {record.assignedName}
          </Link>
        </h2>
      ),
    },
    {
      title: "Created On",
      dataIndex: "createdOn",
      key: "createdOn",
    },
    {
      title: "Due Date",
      dataIndex: "dueDate",
      key: "dueDate",
    },
    {
      title: "Assignee",
      dataIndex: "assignee",
      key: "assignee",
      render: (text: any, record: any) => (
        <h2 className="d-flex align-items-center">
          <Link to="#" className="avatar avatar-sm me-2">
            <ImageWithBasePath
              src={record.assigneeAvatar}
              alt="User Image"
              className="w-auto h-auto"
            />
          </Link>
          <Link to="#" className="d-flex flex-column">
            {record.assigneeName}{" "}
            <span className="text-default">{record.role} </span>
          </Link>
        </h2>
      ),
    },
    {
      title: "Last Reply",
      dataIndex: "lastReply",
      key: "lastReply",
    },
    {
      title: "Priority",
      dataIndex: "priority",
      render: (text: any) => (
        <>
          {text === "Medium" && (
            <span className="badge badge-tag badge-warning-light">{text}</span>
          )}
          {text === "Low" && (
            <span className="badge badge-tag badge-purple-light">{text}</span>
          )}
          {text === "High" && (
            <span className="badge badge-tag badge-danger-light">{text}</span>
          )}
        </>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (text: any) => (
        <>
          {text === "Resolved" && (
            <span className="badge badge-pill badge-status bg-success">
              {text}
            </span>
          )}
          {text === "Closed" && (
            <span className="badge badge-pill badge-status bg-info">
              {text}
            </span>
          )}
          {text === "Pending" && (
            <span className="badge badge-pill badge-status bg-warning">
              {text}
            </span>
          )}
          {text === "Open" && (
            <span className="badge badge-pill badge-status bg-danger">
              {text}
            </span>
          )}
        </>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: () => (
        <div className="dropdown table-action">
          <Link
            to="#"
            className="action-icon"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <i className="fa fa-ellipsis-v"></i>
          </Link>
          <div className="dropdown-menu dropdown-menu-right">
            <Link
              className="dropdown-item edit-popup"
              to="#"
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvas_edit"
            >
              <i className="ti ti-edit text-blue"></i> Edit
            </Link>
            <Link
              className="dropdown-item"
              to="#"
              data-bs-toggle="modal"
              data-bs-target="#delete_contact"
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
                  <div className="col-8">
                    <h4 className="page-title">
                      Tickets<span className="count-title">123</span>
                    </h4>
                  </div>
                  <div className="col-4 text-end">
                    <div className="head-icons">
                      <CollapseHeader />
                    </div>
                  </div>
                </div>
              </div>
              {/* /Page Header */}
              <div className="card">
                <div className="card-header">
                  <div className="row align-items-center">
                    <div className="col-sm-4">
                      <div className="icon-form mb-3 mb-sm-0">
                        <span className="form-icon">
                          <i className="ti ti-search" />
                        </span>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Search Tickets"
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
                          className="btn btn-primary"
                          data-bs-toggle="offcanvas"
                          data-bs-target="#offcanvas_add"
                        >
                          <i className="ti ti-square-rounded-plus me-2" />
                          Add Tickets
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card-body">
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
                      <div className="icon-form">
                        <span className="form-icon">
                          <i className="ti ti-calendar" />
                        </span>
                        <DateRangePicker initialSettings={initialSettings}>
                          <input
                            className="form-control  date-range bookingrange"
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
                                Ticket ID
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
                                Subject
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
                                Assigned
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
                                Assigned Date
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
                                Created Date
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
                                Assignee
                              </p>
                              <div className="status-toggle">
                                <input
                                  type="checkbox"
                                  id="col-assign"
                                  className="check"
                                />
                                <label
                                  htmlFor="col-assign"
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
                            <div className="d-flex align-items-center justify-content-between mb-3">
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
                                    className="collapsed"
                                    data-bs-toggle="collapse"
                                    data-bs-target="#owner"
                                    aria-expanded="false"
                                    aria-controls="owner"
                                  >
                                    Name
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
                                        placeholder="Search Owner"
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
                                            Darlee Robertson
                                          </label>
                                        </div>
                                      </li>
                                      <li>
                                        <div className="filter-checks">
                                          <label className="checkboxs">
                                            <input type="checkbox" />
                                            <span className="checkmarks" />
                                            Sharon Roy
                                          </label>
                                        </div>
                                      </li>
                                      <li>
                                        <div className="filter-checks">
                                          <label className="checkboxs">
                                            <input type="checkbox" />
                                            <span className="checkmarks" />
                                            Vaughan
                                          </label>
                                        </div>
                                      </li>
                                      <li>
                                        <div className="filter-checks">
                                          <label className="checkboxs">
                                            <input type="checkbox" />
                                            <span className="checkmarks" />
                                            Jessica
                                          </label>
                                        </div>
                                      </li>
                                      <li>
                                        <div className="filter-checks">
                                          <label className="checkboxs">
                                            <input type="checkbox" />
                                            <span className="checkmarks" />
                                            Carol Thomas
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
                                    Subject
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
                                            verify your email
                                          </label>
                                        </div>
                                      </li>
                                      <li>
                                        <div className="filter-checks">
                                          <label className="checkboxs">
                                            <input type="checkbox" />
                                            <span className="checkmarks" />
                                            Management
                                          </label>
                                        </div>
                                      </li>
                                      <li>
                                        <div className="filter-checks">
                                          <label className="checkboxs">
                                            <input type="checkbox" />
                                            <span className="checkmarks" />
                                            Calling for help
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
                                    data-bs-target="#collapseTwo"
                                    aria-expanded="false"
                                    aria-controls="collapseTwo"
                                  >
                                    Email
                                  </Link>
                                </div>
                                <div
                                  className="filter-set-contents accordion-collapse collapse"
                                  id="collapseTwo"
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
                                            robertson@example.com
                                          </label>
                                        </div>
                                      </li>
                                      <li>
                                        <div className="filter-checks">
                                          <label className="checkboxs">
                                            <input type="checkbox" />
                                            <span className="checkmarks" />
                                            sharon@example.com
                                          </label>
                                        </div>
                                      </li>
                                      <li>
                                        <div className="filter-checks">
                                          <label className="checkboxs">
                                            <input type="checkbox" />
                                            <span className="checkmarks" />
                                            vaughan12@example.com
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
                                    Priority
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
                                            Low
                                          </label>
                                        </div>
                                      </li>
                                      <li>
                                        <div className="filter-checks">
                                          <label className="checkboxs">
                                            <input type="checkbox" />
                                            <span className="checkmarks" />
                                            Medium
                                          </label>
                                        </div>
                                      </li>
                                      <li>
                                        <div className="filter-checks">
                                          <label className="checkboxs">
                                            <input type="checkbox" />
                                            <span className="checkmarks" />
                                            High
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
                                    data-bs-target="#collapsefour"
                                    aria-expanded="false"
                                    aria-controls="collapsefour"
                                  >
                                    Created Date
                                  </Link>
                                </div>
                                <div
                                  className="filter-set-contents accordion-collapse collapse"
                                  id="collapsefour"
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
                                            25 Sep 2023, 12:12 pm
                                          </label>
                                        </div>
                                      </li>
                                      <li>
                                        <div className="filter-checks">
                                          <label className="checkboxs">
                                            <input type="checkbox" />
                                            <span className="checkmarks" />
                                            27 Sep 2023, 07:40 am
                                          </label>
                                        </div>
                                      </li>
                                      <li>
                                        <div className="filter-checks">
                                          <label className="checkboxs">
                                            <input type="checkbox" />
                                            <span className="checkmarks" />
                                            29 Sep 2023, 08:20 am
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
                                    data-bs-target="#collapsefive"
                                    aria-expanded="false"
                                    aria-controls="collapsefive"
                                  >
                                    Created Date
                                  </Link>
                                </div>
                                <div
                                  className="filter-set-contents accordion-collapse collapse"
                                  id="collapsefive"
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
                                            Open
                                          </label>
                                        </div>
                                      </li>
                                      <li>
                                        <div className="filter-checks">
                                          <label className="checkboxs">
                                            <input type="checkbox" />
                                            <span className="checkmarks" />
                                            Resolved
                                          </label>
                                        </div>
                                      </li>
                                      <li>
                                        <div className="filter-checks">
                                          <label className="checkboxs">
                                            <input type="checkbox" />
                                            <span className="checkmarks" />
                                            Closed
                                          </label>
                                        </div>
                                      </li>
                                      <li>
                                        <div className="filter-checks">
                                          <label className="checkboxs">
                                            <input type="checkbox" />
                                            <span className="checkmarks" />
                                            Pending
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
                                  <Link to="#" className="btn btn-primary">
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
                  {/* Tickets List */}
                  <div className="table-responsive custom-table">
                    <Table columns={columns} dataSource={dataSource} />
                  </div>
                  <div className="row align-items-center">
                    <div className="col-md-6">
                      <div className="datatable-length" />
                    </div>
                    <div className="col-md-6">
                      <div className="datatable-paginate" />
                    </div>
                  </div>
                  {/* /Tickets List */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* /Page Wrapper */}
      {/* Add Tickets */}
      <div
        className="offcanvas offcanvas-end offcanvas-large"
        tabIndex={-1}
        id="offcanvas_add"
      >
        <div className="offcanvas-header border-bottom">
          <h5 className="fw-semibold">Add New Ticket</h5>
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
          <form>
            <div className="row">
              <div className="col-md-6">
                <div className="mb-3">
                  <label className="col-form-label">
                    {" "}
                    Subject <span className="text-danger">*</span>
                  </label>
                  <input type="text" className="form-control" />
                </div>
              </div>
              <div className="col-md-6">
                <div className="mb-3">
                  <label className="col-form-label">
                    Assigned Name <span className="text-danger">*</span>
                  </label>
                  <input type="text" className="form-control" />
                </div>
              </div>
              <div className="col-md-6">
                <div className="mb-3">
                  <label className="col-form-label">
                    Created Date <span className="text-danger">*</span>
                  </label>
                  <div className="cal-icon cal-icon-info">
                    <DatePicker
                      className="form-control datetimepicker deals-details"
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
                  <div className="cal-icon cal-icon-info">
                    <DatePicker
                      className="form-control datetimepicker deals-details"
                      selected={selectedDate2}
                      onChange={handleDateChange2}
                      dateFormat="dd-MM-yyyy"
                    />
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="mb-3">
                  <label className="col-form-label">
                    Assignee Name <span className="text-danger">*</span>
                  </label>
                  <input type="text" className="form-control" />
                </div>
              </div>
              <div className="col-md-6">
                <div className="mb-3">
                  <label className="col-form-label">
                    Priority <span className="text-danger">*</span>
                  </label>
                  <Select
                    className="select"
                    options={priority}
                    placeholder="Choose"
                    classNamePrefix="react-select"
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="mb-3">
                  <label className="col-form-label">
                    Status<span className="text-danger">*</span>
                  </label>
                  <Select
                    className="select"
                    options={statusOption}
                    placeholder="Closed"
                    classNamePrefix="react-select"
                  />
                </div>
              </div>
            </div>
            <div className="d-flex align-items-center justify-content-end">
              <Link to="#" className="btn btn-light me-2">
                Cancel
              </Link>
              <button type="button" className="btn btn-primary">
                Create
              </button>
            </div>
          </form>
        </div>
      </div>
      {/* /Add Tickets */}
      {/* Edit Tickets */}
      <div
        className="offcanvas offcanvas-end offcanvas-large"
        tabIndex={-1}
        id="offcanvas_edit"
      >
        <div className="offcanvas-header border-bottom">
          <h5 className="fw-semibold">Edit New Ticket</h5>
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
          <form>
            <div className="row">
              <div className="col-md-6">
                <div className="mb-3">
                  <label className="col-form-label">
                    {" "}
                    Subject <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    defaultValue="Support for theme"
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="mb-3">
                  <label className="col-form-label">
                    Assigned Name <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    defaultValue="Richard"
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="mb-3">
                  <label className="col-form-label">
                    Created Date <span className="text-danger">*</span>
                  </label>
                  <div className="cal-icon cal-icon-info">
                    <DatePicker
                      className="form-control datetimepicker deals-details"
                      selected={selectedDate3}
                      onChange={handleDateChange3}
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
                  <div className="cal-icon cal-icon-info">
                    <DatePicker
                      className="form-control datetimepicker deals-details"
                      selected={selectedDate4}
                      onChange={handleDateChange4}
                      dateFormat="dd-MM-yyyy"
                    />
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="mb-3">
                  <label className="col-form-label">
                    Assignee Name <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    defaultValue="Darlee Robertson"
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="mb-3">
                  <label className="col-form-label">
                    Priority <span className="text-danger">*</span>
                  </label>
                  <Select
                    className="select"
                    options={priority}
                    defaultValue={priority[1]}
                    placeholder="Choose"
                    classNamePrefix="react-select"
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="mb-3">
                  <label className="col-form-label">
                    Status<span className="text-danger">*</span>
                  </label>
                  <Select
                    className="select"
                    options={statusOption}
                    defaultValue={statusOption[0]}
                    placeholder="Closed"
                    classNamePrefix="react-select"
                  />
                </div>
              </div>
            </div>
            <div className="d-flex align-items-center justify-content-end">
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
      {/* /Edit Tickets */}
      {/* Delete Tickets */}
      <div className="modal fade" id="delete_contact" role="dialog">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-body">
              <div className="text-center">
                <div className="avatar avatar-xl bg-danger-light rounded-circle mb-3">
                  <i className="ti ti-trash-x fs-36 text-danger" />
                </div>
                <h4 className="mb-2">Remove Tickets</h4>
                <p className="mb-0">Are you sure you want to remove it</p>
                <div className="d-flex align-items-center justify-content-center mt-4">
                  <Link
                    to="#"
                    className="btn btn-light me-2"
                    data-bs-dismiss="modal"
                  >
                    Cancel
                  </Link>
                  <Link
                    to="#"
                    data-bs-dismiss="modal"
                    className="btn btn-danger"
                  >
                    Yes, Delete it
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* /Delete Tickets */}
    </>
  );
};

export default Tickets;
