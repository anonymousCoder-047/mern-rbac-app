import React, { useState } from "react";
import { Link } from "react-router-dom";
import Table from "../../core/common/dataTable/index";
import DateRangePicker from "react-bootstrap-daterangepicker";
import { membershiptransaction } from "../../core/data/json/membershiptransaction";
import { all_routes } from "../router/all_routes";
import { TableData } from "../../core/data/interface";
import CollapseHeader from "../../core/common/collapse-header";
const route = all_routes;

const MembershipTransaction = () => {
  const [stars, setStars] = useState<{ [key: number]: boolean }>({}); 

  const initializeStarsState = () => {
    const starsState: { [key: number]: boolean } = {};
    membershiptransaction.forEach((item, index) => {
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

  const data = membershiptransaction;

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
      title: "Type",
      dataIndex: "type",
      sorter: (a: TableData, b: TableData) => a.type.length - b.type.length,
      key: "type",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      sorter: (a: TableData, b: TableData) => a.amount.length - b.amount.length,
      key: "amount",
    },
    {
      title: "Date",
      dataIndex: "date",
      sorter: (a: TableData, b: TableData) => a.date.length - b.date.length,
      key: "date",
    },
    {
      title: "Payment Type",
      dataIndex: "payment_type",
      sorter: (a: TableData, b: TableData) =>
        a.paymentType.length - b.paymentType.length,
      key: "payment_type",
    },
    {
      title: "Status",
      dataIndex: "status",
      sorter: (a: TableData, b: TableData) => a.status.length - b.status.length,
      key: "status",
      render: (status: string) => (
        <span
          className={`badge badge-pill badge-status ${
            status === "Completed" ? "bg-success" : "bg-danger"
          }`}
        >
          {status}
        </span>
      ),
    },
  ];
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
    <div className="page-wrapper">
  <div className="content">
    <div className="row">
      <div className="col-md-12">
        {/* Page Header */}
        <div className="page-header">
          <div className="row align-items-center">
            <div className="col-sm-8">
              <h4 className="page-title">Membership Transactions</h4>
            </div>
            <div className="col-sm-4 text-sm-end">
              <div className="head-icons">
                <CollapseHeader/>
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
                    placeholder="Search Contacts"
                  />
                </div>
              </div>
              <div className="col-sm-8">
                <div className="d-flex align-items-center flex-wrap row-gap-2 justify-content-sm-end">
                  <div className="dropdown">
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
                </div>
              </div>
            </div>
            {/* /Search */}
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
                  <DateRangePicker
                                initialSettings={initialSettings}
                              >
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
                      Please drag and drop your column to reorder your table and
                      enable see option as you want.
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
                          <label htmlFor="col-name" className="checktoggle" />
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
                          <label htmlFor="col-phone" className="checktoggle" />
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
                          <label htmlFor="col-email" className="checktoggle" />
                        </div>
                      </div>
                      <div className="d-flex align-items-center justify-content-between mb-3">
                        <p className="mb-0 d-flex align-items-center">
                          <i className="ti ti-grip-vertical me-2" />
                          Tags
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
                          Location
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
                          Rating
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
                          Owner
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
                          <label htmlFor="col-status" className="checktoggle" />
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
                          <label htmlFor="col-action" className="checktoggle" />
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
                  <div className="filter-dropdown-menu dropdown-menu  dropdown-menu-xl-end p-3">
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
                              Type
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
                                      <input type="checkbox" />
                                      <span className="checkmarks" />
                                      Wallet Topup
                                    </label>
                                  </div>
                                </li>
                                <li>
                                  <div className="filter-checks">
                                    <label className="checkboxs">
                                      <input type="checkbox" />
                                      <span className="checkmarks" />
                                      Purchase
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
                              Status
                            </Link>
                          </div>
                          <div
                            className="filter-set-contents accordion-collapse collapse"
                            id="owner"
                            data-bs-parent="#accordionExample"
                          >
                            <ul>
                              <li>
                                <div className="filter-checks">
                                  <label className="checkboxs">
                                    <input type="checkbox" defaultChecked />
                                    <span className="checkmarks" />
                                    Completed
                                  </label>
                                </div>
                              </li>
                              <li>
                                <div className="filter-checks">
                                  <label className="checkboxs">
                                    <input type="checkbox" />
                                    <span className="checkmarks" />
                                    Cancel
                                  </label>
                                </div>
                              </li>
                            </ul>
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
                              Payment Type
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
                                      Paypal
                                    </label>
                                  </div>
                                </li>
                                <li>
                                  <div className="filter-checks">
                                    <label className="checkboxs">
                                      <input type="checkbox" />
                                      <span className="checkmarks" />
                                      Cash
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
                                      27 Sep 2023, 04:18 pm
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
            {/* Transactions List */}
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
            {/* /Transactions List */}
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

  );
};

export default MembershipTransaction;
