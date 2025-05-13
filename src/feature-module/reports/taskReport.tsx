import Table from "../../core/common/dataTable/index";
import { taskReportsData } from "../../core/data/json/tasReport";
import ImageWithBasePath from "../../core/common/imageWithBasePath";
import React, { useState } from "react";
import Chart from "react-apexcharts";
import DateRangePicker from "react-bootstrap-daterangepicker";
import { Link } from "react-router-dom";
import { TableData } from "../../core/data/interface";
import CollapseHeader from "../../core/common/collapse-header";
import ReportsModal from "../../core/modals/reports_modal";


const TaskReport = () => {
  const initialSettings = {
    endDate: new Date("2020-08-11T12:30:00.000Z"),
    ranges: {
      "Last 30 Days": [
        new Date("2020-07-12T04:57:17.076Z"),
        new Date("2020-08-10T04:57:17.076Z"),
      ],
      "Last 7 Days": [
        new Date("2020-08-04T04:57:17.076Z"),
        new Date("2020-08-10T04:57:17.076Z"),
      ],
      "Last Month": [
        new Date("2020-06-30T18:30:00.000Z"),
        new Date("2020-07-31T18:29:59.999Z"),
      ],
      "This Month": [
        new Date("2020-07-31T18:30:00.000Z"),
        new Date("2020-08-31T18:29:59.999Z"),
      ],
      Today: [
        new Date("2020-08-10T04:57:17.076Z"),
        new Date("2020-08-10T04:57:17.076Z"),
      ],
      Yesterday: [
        new Date("2020-08-09T04:57:17.076Z"),
        new Date("2020-08-09T04:57:17.076Z"),
      ],
    },
    startDate: new Date("2020-08-04T04:57:17.076Z"), // Set "Last 7 Days" as default
    timePicker: false,
  };
  const [chartOptions1] = useState<any>({
    series: [44, 55, 41, 17],
    chart: {
      type: "donut",
    },
    colors: ["#4A00E5", "#0092E4", "#E41F07", "#FFA201"],
    dataLabels: {
      enabled: false,
    },
    title: {
      text: "",
      align: "left",
    },
  });

  const [chartOptions2] = useState<any>({
    series: [
      {
        name: "Task",
        data: [10, 38, 18, 47, 13, 32, 15, 40, 18, 50, 30, 15],
      },
    ],
    colors: ["#3C2371"],
    chart: {
      height: 273,
      type: "line",
      zoom: {
        enabled: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "stepline",
    },
    title: {
      text: "",
      align: "left",
    },
    xaxis: {
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
    },
  });
  const dataSource = taskReportsData;
 
  const columns = [
   
    {
      title: "Task Name",
      dataIndex: "taskName",
      sorter: (a: TableData, b: TableData) =>
        a.taskName.length - b.taskName.length,
      width: "269px",
    },
    {
      title: "Assigned To",
      dataIndex: "assignedTo",
      sorter: (a: TableData, b: TableData) =>
        a.assignedTo.length - b.assignedTo.length,
      key: "assignedTo",
      render: (text: any, record: any) => (
        <h2 className="d-flex align-items-center">
          <Link to="#" className="avatar avatar-sm me-2">
            <ImageWithBasePath
              className="w-auto h-auto"
              src="assets/img/profiles/avatar-14.jpg"
              alt="User Image"
            />
          </Link>
          <Link to="#" >
            {text}
          </Link>
        </h2>
      ),
      width: "180px",
    },
    {
      title: "Priority",
      dataIndex: "priority",
      sorter: (a: TableData, b: TableData) =>
        a.priority.length - b.priority.length,
      key: "priority",
      ellipsis: true,
      render: (priority: any) => (
        <span
          className={`${
            priority === "High"
              ? "priority badge badge-tag badge-danger-light"
              : priority === "Medium"
              ? "priority badge badge-tag badge-warning-light"
              : priority === "Low"
              ? "priority badge badge-tag badge-success-light"
              : ""
          }`}
        >
          <i className="ti ti-square-rounded-filled" />
          {priority}
        </span>
      ),
      width: "150px",
    },
    {
      title: "Due Date",
      dataIndex: "dueDate",
      sorter: (a: TableData, b: TableData) =>
        a.dueDate.length - b.dueDate.length,
      width: "100px",
    },
    {
      title: "Type",
      dataIndex: "type",
      sorter: (a: TableData, b: TableData) => a.type.length - b.type.length,
      width: "80px",
    },
    {
      title: "Status",
      dataIndex: "status",
      sorter: (a: TableData, b: TableData) => a.status.length - b.status.length,
      key: "status",
      render: (status: string) => (
        <span
          className={`badge badge-pill badge-status ${
            status === "Completed" ? "bg-success" : "bg-warning"
          }`}
        >
          {status}
        </span>
      ),
      width: "100px",
    },
    {
      title: "Created Date",
      dataIndex: "createdDate",
      sorter: (a: TableData, b: TableData) =>
        a.createdDate.length - b.createdDate.length,
      width: "135px",
    },
  ];
  return (
    <>
    <div className="page-wrapper">
  <div className="content">
    <div className="row">
      <div className="col-md-12">
        {/* Page Header */}
        <div className="page-header">
          <div className="row align-items-center">
            <div className="col-sm-8">
              <h4 className="page-title">
                Task Reports <span className="count-title">123</span>
              </h4>
            </div>
            <div className="col-sm-4 text-sm-end">
              <div className="head-icons">
                <CollapseHeader/>
              </div>
            </div>
          </div>
        </div>
        {/* /Page Header */}
        <div className="card ">
          <div className="card-header">
            {/* Search */}
            <div className="row">
              <div className="col-md-5 col-sm-4">
                <div className="icon-form mb-3 mb-sm-0">
                  <span className="form-icon">
                    <i className="ti ti-search" />
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search Tasks"
                  />
                </div>
              </div>
              <div className="col-md-7 col-sm-8">
                <div className="text-sm-end">
                  <Link
                    to="download_report"
                    className="btn btn-primary"
                    data-bs-toggle="modal"
                    data-bs-target="#download_report"
                  >
                    <i className="ti ti-file-download me-2" />
                    Download Report
                  </Link>
                </div>
              </div>
            </div>
            {/* Search */}
          </div>
          <div className="card-body">
            <div className="row">
              <div className="col-md-7 d-flex">
                <div className="card shadow flex-fill">
                  <div className="card-header d-flex justify-content-between align-items-center flex-wrap row-gap-2">
                    <h4>Tasks by Year</h4>
                    <div className="icon-form">
                      <span className="form-icon">
                        <i className="ti ti-calendar" />
                      </span>
                      <DateRangePicker
                                initialSettings={initialSettings}
                              >
                                <input
                                  className="form-control  date-range bookingrange"
                                  type="text"
                                />
                              </DateRangePicker>
                    </div>
                  </div>
                  <div className="card-body">
                  <div id="task-year">
                          <Chart
                            series={chartOptions2.series}
                            options={chartOptions2}
                            type="line"
                          />
                        </div>
                  </div>
                </div>
              </div>
              <div className="col-md-5 d-flex">
                <div className="card shadow flex-fill">
                  <div className="card-header d-flex justify-content-between align-items-center flex-wrap row-gap-2">
                    <h4>Tasks by Types</h4>
                    <div className="icon-form ">
                      <span className="form-icon">
                        <i className="ti ti-calendar" />
                      </span>
                      <DateRangePicker
                                initialSettings={initialSettings}
                              >
                                <input
                                  className="form-control  date-range bookingrange"
                                  type="text"
                                />
                              </DateRangePicker>
                    </div>
                  </div>
                  <div className="card-body">
                    <div id="task-type">
                          <Chart
                            series={chartOptions1.series}
                            options={chartOptions1}
                            type="donut"
                          />
                        </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Filter */}
            <div className="d-flex align-items-center justify-content-between flex-wrap mb-4 row-gap-2">
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
                  <DateRangePicker
                                initialSettings={initialSettings}
                              >
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
                      Please drag and drop your column to reorder your table and
                      enable see option as you want.
                    </p>
                    <div className="border-top pt-3">
                      <div className="d-flex align-items-center justify-content-between mb-3">
                        <p className="mb-0 d-flex align-items-center">
                          <i className="ti ti-grip-vertical me-2" />
                          Task Name
                        </p>
                        <div className="status-toggle">
                          <input
                            type="checkbox"
                            id="col-name"
                            className="check"
                          />
                          <label htmlFor="col-name" className="checktoggle" />
                        </div>
                      </div>
                      <div className="d-flex align-items-center justify-content-between mb-3">
                        <p className="mb-0 d-flex align-items-center">
                          <i className="ti ti-grip-vertical me-2" />
                          Assigned To
                        </p>
                        <div className="status-toggle">
                          <input
                            type="checkbox"
                            id="col-phone"
                            className="check"
                          />
                          <label htmlFor="col-phone" className="checktoggle" />
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
                          <label htmlFor="col-email" className="checktoggle" />
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
                            id="col-tag"
                            className="check"
                          />
                          <label htmlFor="col-tag" className="checktoggle" />
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
                            id="col-loc"
                            className="check"
                          />
                          <label htmlFor="col-loc" className="checktoggle" />
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
                          />
                          <label htmlFor="col-rate" className="checktoggle" />
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
                            id="col-owner"
                            className="check"
                          />
                          <label htmlFor="col-owner" className="checktoggle" />
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
                              data-bs-toggle="collapse"
                              data-bs-target="#collapseTwo"
                              aria-expanded="true"
                              aria-controls="collapseTwo"
                            >
                              Subjects
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
                                      SEO Proposals
                                    </label>
                                  </div>
                                </li>
                                <li>
                                  <div className="filter-checks">
                                    <label className="checkboxs">
                                      <input type="checkbox" />
                                      <span className="checkmarks" />
                                      Web Design
                                    </label>
                                  </div>
                                </li>
                                <li>
                                  <div className="filter-checks">
                                    <label className="checkboxs">
                                      <input type="checkbox" />
                                      <span className="checkmarks" />
                                      Logo &amp; Branding
                                    </label>
                                  </div>
                                </li>
                                <li>
                                  <div className="filter-checks">
                                    <label className="checkboxs">
                                      <input type="checkbox" />
                                      <span className="checkmarks" />
                                      Development
                                    </label>
                                  </div>
                                </li>
                                <li>
                                  <div className="filter-checks">
                                    <label className="checkboxs">
                                      <input type="checkbox" />
                                      <span className="checkmarks" />
                                      Logo
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
                              Sent to
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
                                      NovaWave LLC
                                    </label>
                                  </div>
                                </li>
                                <li>
                                  <div className="filter-checks">
                                    <label className="checkboxs">
                                      <input type="checkbox" />
                                      <span className="checkmarks" />
                                      Redwood Inc
                                    </label>
                                  </div>
                                </li>
                                <li>
                                  <div className="filter-checks">
                                    <label className="checkboxs">
                                      <input type="checkbox" />
                                      <span className="checkmarks" />
                                      HarborVie w
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
                                <li>
                                  <div className="filter-checks">
                                    <label className="checkboxs">
                                      <input type="checkbox" />
                                      <span className="checkmarks" />
                                      RiverStone Ventur
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
                              Date of Proposals
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
                                      15 May 2024
                                    </label>
                                  </div>
                                </li>
                                <li>
                                  <div className="filter-checks">
                                    <label className="checkboxs">
                                      <input type="checkbox" />
                                      <span className="checkmarks" />
                                      16 Jan 2024
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
                              Open till
                            </Link>
                          </div>
                          <div
                            className="filter-set-contents accordion-collapse collapse"
                            id="collapsetwo"
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
                                  placeholder="Search Date"
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
                                      15 Aug 2024
                                    </label>
                                  </div>
                                </li>
                                <li>
                                  <div className="filter-checks">
                                    <label className="checkboxs">
                                      <input type="checkbox" />
                                      <span className="checkmarks" />
                                      15 Sep 2024
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
                              Project
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
                                      Truelysell
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
                                <li>
                                  <div className="filter-checks">
                                    <label className="checkboxs">
                                      <input type="checkbox" />
                                      <span className="checkmarks" />
                                      Best@laundry
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
                                      21 May 2024
                                    </label>
                                  </div>
                                </li>
                                <li>
                                  <div className="filter-checks">
                                    <label className="checkboxs">
                                      <input type="checkbox" />
                                      <span className="checkmarks" />
                                      15 Apr 2024
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
                              to="#"
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
            {/* Report List */}
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
            {/* /Report List */}
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
<ReportsModal/>
    </>
  );
};

export default TaskReport;
