import Table from "../../core/common/dataTable/index";

import ImageWithBasePath from "../../core/common/imageWithBasePath";
import DateRangePicker from "react-bootstrap-daterangepicker";
import React, { useState } from "react";
import Chart from "react-apexcharts";
import ReportsModal from "../../core/modals/reports_modal";
import { TableData } from "../../core/data/interface";
import { Link } from "react-router-dom";
import { all_routes } from "../router/all_routes";
import CollapseHeader from "../../core/common/collapse-header";
import { leadsData } from "../../core/data/json/leads";

const LeadReport = () => {
  const route = all_routes;
  const [chartOptions1] = useState<any>({
    series: [44, 55, 41, 17],
    chart: {
      type: "donut",
    },
    colors: ["#0092E4", "#4A00E5", "#E41F07", "#FFA201"],
    dataLabels: {
      enabled: false,
    },
    plotOptions: {
      pie: {
        startAngle: -90,
        endAngle: 270,
      },
    },
  });

  const [chartOptions2] = useState<any>({
    series: [
      {
        name: "Reports",
        colors: ["#FFC38F"],
        data: [
          { x: "Jan", y: 400 },
          { x: "Feb", y: 130 },
          { x: "Mar", y: 240 },
          { x: "Apr", y: 450 },
          { x: "May", y: 250 },
          { x: "Jun", y: 180 },
          { x: "Jul", y: 300 },
          { x: "Aug", y: 240 },
          { x: "Sep", y: 300 },
          { x: "Oct", y: 150 },
          { x: "Nov", y: 250 },
          { x: "Dec", y: 500 },
        ],
      },
    ],
    colors: ["#00918E"],
    chart: {
      type: "bar",
      height: 275,
    },
    plotOptions: {
      bar: {
        borderRadiusApplication: "around",
        columnWidth: "50%",
      },
    },
    xaxis: {
      type: "category",
      group: {
        style: {
          fontSize: "0px",
          fontWeight: 700,
        },
      },
    },
  });
  const columns = [
    {
      title: "Lead Name",
      dataIndex: "lead_name",
      key: "lead_name",
      sorter: (a: TableData, b: TableData) =>
        a.leadName.length - b.leadName.length,
    },
    {
      title: "Company Name",
      dataIndex: "company_name",
      key: "company_name",
      sorter: (a: TableData, b: TableData) =>
        a.companyName.length - b.companyName.length,
      render: (text: any, record: any) => (
        <h2 className="d-flex align-items-center">
          <Link
            to={route.companyDetails}
            className="avatar avatar-sm border me-2"
          >
            <ImageWithBasePath
              className="w-auto h-auto"
              src={record.company_image}
              alt="Company Logo"
            />
          </Link>
          <Link
            to={route.companyDetails}
            className="d-flex flex-column"
          >
            {text}
            <span className="text-default">{record.companyLocation}</span>
          </Link>
        </h2>
      ),
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
      sorter: (a: TableData, b: TableData) => a.phone.length - b.phone.length,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      sorter: (a: TableData, b: TableData) => a.email.length - b.email.length,
    },
    {
      title: "Lead Status",
      dataIndex: "status",
      key: "status",
      sorter: (a: TableData, b: TableData) =>
        a.leadStatus.length - b.leadStatus.length,

      render: (leadStatus: string) => (
        <span
          className={`${
            leadStatus === "Closed"
              ? "badge badge-pill badge-status bg-success"
              : leadStatus === "Not Contacted"
              ? "badge badge-pill badge-status bg-pending"
              : leadStatus === "Connected"
              ? "badge badge-pill badge-warning bg-warning"
              : leadStatus === "Lost"
              ? "badge badge-pill badge-danger bg-danger"
              : ""
          }`}
        >
          {leadStatus}
        </span>
      ),
    },
    {
      title: "Lead Owner",
      dataIndex: "owner",
      key: "owner",
      sorter: (a: TableData, b: TableData) => a.owner.length - b.owner.length,
    },
    {
      title: "Source",
      dataIndex: "source",
      key: "source",
      sorter: (a: TableData, b: TableData) => a.source.length - b.source.length,
    },
    {
      title: "Created Date",
      dataIndex: "created_date",
      key: "created_date",
      sorter: (a: TableData, b: TableData) =>
        a.createdDate.length - b.createdDate.length,
    },
  ];
  const dataSource = leadsData;
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
                  <div className="col-sm-8">
                    <h4 className="page-title">
                      Leads Report <span className="count-title">123</span>
                    </h4>
                  </div>
                  <div className="col-sm-4 text-sm-end">
                    <div className="head-icons">
                      <CollapseHeader />
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
                          placeholder="Search Leads"
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
                          <h4>Leads by Year</h4>
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
                        <div className="card-body">
                          <div id="leads-report">
                            <Chart
                              options={chartOptions2}
                              series={chartOptions2.series}
                              type="bar"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-5 d-flex">
                      <div className="card shadow flex-fill">
                        <div className="card-header d-flex justify-content-between align-items-center flex-wrap row-gap-2">
                          <h4>Leads by Source</h4>
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
                        <div className="card-body">
                          <div id="leads-analysis">
                            <Chart
                              options={chartOptions1}
                              series={chartOptions1.series}
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
                                Lead Name
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
                                Phone
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
                                Email
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
                                Company Name
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
                                Lead Status
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
                                Lead Owner
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
                                Source
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
                                Created
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
                                    Leads Name
                                  </Link>
                                </div>
                                <div
                                  className="filter-set-contents accordion-collapse collapse show"
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
                                            Collins
                                          </label>
                                        </div>
                                      </li>
                                      <li>
                                        <div className="filter-checks">
                                          <label className="checkboxs">
                                            <input type="checkbox" />
                                            <span className="checkmarks" />
                                            Konopelski
                                          </label>
                                        </div>
                                      </li>
                                      <li>
                                        <div className="filter-checks">
                                          <label className="checkboxs">
                                            <input type="checkbox" />
                                            <span className="checkmarks" />
                                            Adams
                                          </label>
                                        </div>
                                      </li>
                                      <li>
                                        <div className="filter-checks">
                                          <label className="checkboxs">
                                            <input type="checkbox" />
                                            <span className="checkmarks" />
                                            Schumm
                                          </label>
                                        </div>
                                      </li>
                                      <li>
                                        <div className="filter-checks">
                                          <label className="checkboxs">
                                            <input type="checkbox" />
                                            <span className="checkmarks" />
                                            Wisozk
                                          </label>
                                        </div>
                                      </li>
                                      <li>
                                        <div className="filter-checks">
                                          <label className="checkboxs">
                                            <input type="checkbox" />
                                            <span className="checkmarks" />
                                            Heller
                                          </label>
                                        </div>
                                      </li>
                                      <li>
                                        <div className="filter-checks">
                                          <label className="checkboxs">
                                            <input type="checkbox" />
                                            <span className="checkmarks" />
                                            Gutkowski
                                          </label>
                                        </div>
                                      </li>
                                      <li>
                                        <div className="filter-checks">
                                          <label className="checkboxs">
                                            <input type="checkbox" />
                                            <span className="checkmarks" />
                                            Walter
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
                                    data-bs-target="#company"
                                    aria-expanded="false"
                                    aria-controls="company"
                                  >
                                    Company Name
                                  </Link>
                                </div>
                                <div
                                  className="filter-set-contents accordion-collapse collapse"
                                  id="company"
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
                                        placeholder="Search Company"
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
                                    data-bs-target="#Status"
                                    aria-expanded="false"
                                    aria-controls="Status"
                                  >
                                    Lead Status
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
                                            Closed
                                          </label>
                                        </div>
                                      </li>
                                      <li>
                                        <div className="filter-checks">
                                          <label className="checkboxs">
                                            <input type="checkbox" />
                                            <span className="checkmarks" />
                                            Not Contacted
                                          </label>
                                        </div>
                                      </li>
                                      <li>
                                        <div className="filter-checks">
                                          <label className="checkboxs">
                                            <input type="checkbox" />
                                            <span className="checkmarks" />
                                            Contacted
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
                                    Created Date
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
                                            25 Sep 2023, 01:22 pm
                                          </label>
                                        </div>
                                      </li>
                                      <li>
                                        <div className="filter-checks">
                                          <label className="checkboxs">
                                            <input type="checkbox" />
                                            <span className="checkmarks" />
                                            25 Sep 2023, 01:22 pm
                                          </label>
                                        </div>
                                      </li>
                                      <li>
                                        <div className="filter-checks">
                                          <label className="checkboxs">
                                            <input type="checkbox" />
                                            <span className="checkmarks" />
                                            25 Sep 2023, 01:22 pm
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
                                    Lead Owner
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
                                            Hendry
                                          </label>
                                        </div>
                                      </li>
                                      <li>
                                        <div className="filter-checks">
                                          <label className="checkboxs">
                                            <input type="checkbox" />
                                            <span className="checkmarks" />
                                            Guillory
                                          </label>
                                        </div>
                                      </li>
                                      <li>
                                        <div className="filter-checks">
                                          <label className="checkboxs">
                                            <input type="checkbox" />
                                            <span className="checkmarks" />
                                            Jami
                                          </label>
                                        </div>
                                      </li>
                                      <li>
                                        <div className="filter-checks">
                                          <label className="checkboxs">
                                            <input type="checkbox" />
                                            <span className="checkmarks" />
                                            Theresa
                                          </label>
                                        </div>
                                      </li>
                                      <li>
                                        <div className="filter-checks">
                                          <label className="checkboxs">
                                            <input type="checkbox" />
                                            <span className="checkmarks" />
                                            Espinosa
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

      {/* /Page Wrapper */}
      <ReportsModal />
    </div>
  );
};

export default LeadReport;
