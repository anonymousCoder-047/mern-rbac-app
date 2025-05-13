import React, { useState } from "react";
import { Link } from "react-router-dom";
import Chart from "react-apexcharts";
import { DailyReportData } from "../../core/data/json/dealReportsData";
import DateRangePicker from "react-bootstrap-daterangepicker";
import { all_routes } from "../router/all_routes";
import Table from "../../core/common/dataTable/index";
import ReportsModal from "../../core/modals/reports_modal";
import CollapseHeader from "../../core/common/collapse-header";

const route = all_routes;

const DealReports = () => {
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
  const data = DailyReportData;

  const columns = [
    {
      title: "",
      dataIndex: "",
      key: "star",
      render: () => (
        <div className="set-star rating-select">
          <i className="fa fa-star" />
        </div>
      ),
      width: "2px",
    },
    {
      title: "Deal Name",
      dataIndex: "Deal_Name",
      sorter: (a: any, b: any) => a.Deal_Name.length - b.Deal_Name.length,
    },

    {
      title: "Deal Stage",
      dataIndex: "Stage",
      sorter: (a: any, b: any) => a.Stage.length - b.Stage.length,
    },
    {
      title: "Deal Value",
      dataIndex: "Deal_Value",
      sorter: (a: any, b: any) => a.country_name.length - b.country_name.length,
    },
    {
      title: "Expexted Close Date",
      dataIndex: "close_date",
      sorter: (a: any, b: any) => a.close_date.length - b.close_date.length,
    },
    {
      title: "Owner",
      dataIndex: "owner",
      sorter: (a: any, b: any) => a.owner.length - b.owner.length,
    },
    {
      title: "Probability",
      dataIndex: "Probability",
      sorter: (a: any, b: any) => a.Probability.length - b.Probability.length,
    },
    {
      title: "Status",
      dataIndex: "Status",
      render: (text: any, record: any) => (
        <span
          className={`badge badge-pill badge-status ${
            record?.Status === "Won"
              ? "bg-success"
              : record?.Status === "Lost"
              ? "bg-danger"
              : "bg-purple"
          }`}
        >
          {record?.Status}
        </span>
      ),
      sorter: (a: any, b: any) => a.Status.length - b.Status.length,
    },
    {
      title: "Source",
      dataIndex: "source",
      sorter: (a: any, b: any) => a.source.length - b.source.length,
    },
    {
      title: "created_date",
      dataIndex: "created_date",
      sorter: (a: any, b: any) => a.created_date.length - b.created_date.length,
    },
  ];

  const [chartOptions] = useState<any>({
    chart: {
      height: 270,
      type: "bar",
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "55%",
        endingShape: "rounded",
      },
    },
    colors: ["#5CB85C", "#FC0027"],
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ["transparent"],
    },
    series: [
      {
        name: "Won Deals",
        data: [110, 85, 100, 90, 85, 105, 90, 115, 95],
      },
      {
        name: "Lost Deals",
        data: [45, 55, 50, 55, 40, 60, 55, 60, 66],
      },
    ],
    xaxis: {
      categories: [
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
      ],
    },
    fill: {
      opacity: 1,
    },
    tooltip: {
      y: {
        formatter: function (val: number) {
          return val + " Deals";
        },
      },
    },
  });

  const [chartConfig] = useState<any>({
    series: [44, 55, 41, 17],
    chart: {
      type: "donut",
    },
    colors: ["#0092E4", "#4A00E5", "#E41F07", "#FFA201"],
    labels: ["Campaigns", "Google", "Referrals", "Paid Social"],
    plotOptions: {
      pie: {
        startAngle: -90,
        endAngle: 270,
      },
    },
    dataLabels: {
      enabled: false,
    },
    legend: {
      position: "bottom",
      formatter: function (val: string, opts: any) {
        return val + " - " + opts.w.globals.series[opts.seriesIndex];
      },
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
  });

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
                      Deals Report <span className="count-title">123</span>
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
                          placeholder="Search Deals"
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
                          <h4>Deals by Year</h4>
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
                        <Chart
                          options={chartOptions}
                          series={chartOptions.series}
                          type="bar"
                          height={270}
                        />
                        </div>
                      </div>
                    </div>
                    <div className="col-md-5 d-flex">
                      <div className="card shadow flex-fill">
                        <div className="card-header d-flex justify-content-between align-items-center flex-wrap row-gap-2">
                          <h4>Deals by Source</h4>
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
                        <Chart
                          options={chartConfig}
                          series={chartConfig.series}
                          type="donut"
                        />
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
  <h4 className="mb-2 fw-semibold">Want to manage datatables?</h4>
  <p className="mb-3">
    Please drag and drop your column to reorder your table and enable see option
    as you want.
  </p>
  <div className="border-top pt-3">
    <div className="d-flex align-items-center justify-content-between mb-3">
      <p className="mb-0 d-flex align-items-center">
        <i className="ti ti-grip-vertical me-2" />
        Deal Name
      </p>
      <div className="status-toggle">
        <input type="checkbox" id="col-name" className="check" />
        <label htmlFor="col-name" className="checktoggle" />
      </div>
    </div>
    <div className="d-flex align-items-center justify-content-between mb-3">
      <p className="mb-0 d-flex align-items-center">
        <i className="ti ti-grip-vertical me-2" />
        Stage
      </p>
      <div className="status-toggle">
        <input type="checkbox" id="col-phone" className="check" />
        <label htmlFor="col-phone" className="checktoggle" />
      </div>
    </div>
    <div className="d-flex align-items-center justify-content-between mb-3">
      <p className="mb-0 d-flex align-items-center">
        <i className="ti ti-grip-vertical me-2" />
        Deal Value
      </p>
      <div className="status-toggle">
        <input type="checkbox" id="col-email" className="check" />
        <label htmlFor="col-email" className="checktoggle" />
      </div>
    </div>
    <div className="d-flex align-items-center justify-content-between mb-3">
      <p className="mb-0 d-flex align-items-center">
        <i className="ti ti-grip-vertical me-2" />
        Tags
      </p>
      <div className="status-toggle">
        <input type="checkbox" id="col-tag" className="check" />
        <label htmlFor="col-tag" className="checktoggle" />
      </div>
    </div>
    <div className="d-flex align-items-center justify-content-between mb-3">
      <p className="mb-0 d-flex align-items-center">
        <i className="ti ti-grip-vertical me-2" />
        Expected Closed Date
      </p>
      <div className="status-toggle">
        <input type="checkbox" id="col-loc" className="check" />
        <label htmlFor="col-loc" className="checktoggle" />
      </div>
    </div>
    <div className="d-flex align-items-center justify-content-between mb-3">
      <p className="mb-0 d-flex align-items-center">
        <i className="ti ti-grip-vertical me-2" />
        Rating
      </p>
      <div className="status-toggle">
        <input type="checkbox" id="col-rate" className="check" />
        <label htmlFor="col-rate" className="checktoggle" />
      </div>
    </div>
    <div className="d-flex align-items-center justify-content-between mb-3">
      <p className="mb-0 d-flex align-items-center">
        <i className="ti ti-grip-vertical me-2" />
        Owner
      </p>
      <div className="status-toggle">
        <input type="checkbox" id="col-owner" className="check" />
        <label htmlFor="col-owner" className="checktoggle" />
      </div>
    </div>
    <div className="d-flex align-items-center justify-content-between mb-3">
      <p className="mb-0 d-flex align-items-center">
        <i className="ti ti-grip-vertical me-2" />
        Probability
      </p>
      <div className="status-toggle">
        <input
          type="checkbox"
          id="col-status"
          className="check"
          defaultChecked
        />
        <label htmlFor="col-status" className="checktoggle" />
      </div>
    </div>
    <div className="d-flex align-items-center justify-content-between mb-3">
      <p className="mb-0 d-flex align-items-center">
        <i className="ti ti-grip-vertical me-2" />
        Status
      </p>
      <div className="status-toggle">
        <input type="checkbox" id="col-owner" className="check" />
        <label htmlFor="col-owner" className="checktoggle" />
      </div>
    </div>
    <div className="d-flex align-items-center justify-content-between mb-3">
      <p className="mb-0 d-flex align-items-center">
        <i className="ti ti-grip-vertical me-2" />
        Source
      </p>
      <div className="status-toggle">
        <input type="checkbox" id="col-owner" className="check" />
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
            Deals Name
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
                placeholder="Search Country"
              />
            </div>
            <ul>
              <li>
                <div className="filter-checks">
                  <label className="checkboxs">
                    <input type="checkbox" defaultChecked />
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
            data-bs-target="#owner"
            aria-expanded="false"
            aria-controls="owner"
          >
            Owner
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
                    <input type="checkbox" defaultChecked />
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
                    <input type="checkbox" defaultChecked />
                    <span className="checkmarks" />
                    Won
                  </label>
                </div>
              </li>
              <li>
                <div className="filter-checks">
                  <label className="checkboxs">
                    <input type="checkbox" />
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
                    Lost
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
            Rating
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
                    <input type="checkbox" defaultChecked />
                    <span className="checkmarks" />
                    <span className="rating">
                      <i className="fa fa-star filled" />
                      <i className="fa fa-star filled" />
                      <i className="fa fa-star filled" />
                      <i className="fa fa-star filled" />
                      <i className="fa fa-star filled" />
                      <span>5.0</span>
                    </span>
                  </label>
                </div>
              </li>
              <li>
                <div className="filter-checks">
                  <label className="checkboxs">
                    <input type="checkbox" />
                    <span className="checkmarks" />
                    <span className="rating">
                      <i className="fa fa-star filled" />
                      <i className="fa fa-star filled" />
                      <i className="fa fa-star filled" />
                      <i className="fa fa-star filled" />
                      <i className="fa fa-star" />
                      <span>4.0</span>
                    </span>
                  </label>
                </div>
              </li>
              <li>
                <div className="filter-checks">
                  <label className="checkboxs">
                    <input type="checkbox" />
                    <span className="checkmarks" />
                    <span className="rating">
                      <i className="fa fa-star filled" />
                      <i className="fa fa-star filled" />
                      <i className="fa fa-star filled" />
                      <i className="fa fa-star" />
                      <i className="fa fa-star" />
                      <span>3.0</span>
                    </span>
                  </label>
                </div>
              </li>
              <li>
                <div className="filter-checks">
                  <label className="checkboxs">
                    <input type="checkbox" />
                    <span className="checkmarks" />
                    <span className="rating">
                      <i className="fa fa-star filled" />
                      <i className="fa fa-star filled" />
                      <i className="fa fa-star" />
                      <i className="fa fa-star" />
                      <i className="fa fa-star" />
                      <span>2.0</span>
                    </span>
                  </label>
                </div>
              </li>
              <li>
                <div className="filter-checks">
                  <label className="checkboxs">
                    <input type="checkbox" />
                    <span className="checkmarks" />
                    <span className="rating">
                      <i className="fa fa-star filled" />
                      <i className="fa fa-star" />
                      <i className="fa fa-star" />
                      <i className="fa fa-star" />
                      <i className="fa fa-star" />
                      <span>1.0</span>
                    </span>
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
            Tags
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
                    <input type="checkbox" defaultChecked />
                    <span className="checkmarks" />
                    Promotion
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
                    Rejected
                  </label>
                </div>
              </li>
              <li>
                <div className="filter-checks">
                  <label className="checkboxs">
                    <input type="checkbox" />
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
                    Calls
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
                    <Table columns={columns} dataSource={data} />
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
      <ReportsModal />
    </>
  );
};

export default DealReports;
