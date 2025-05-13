import React, { useState } from "react";
import Table from "../../../core/common/dataTable/index";
import { contracts } from "../../../core/data/json/contract";
import { Link } from "react-router-dom";
import CollapseHeader from "../../../core/common/collapse-header";
import DateRangePicker from "react-bootstrap-daterangepicker";
import {
  initialSettings,
  status1,
} from "../../../core/common/selectoption/selectoption";
import ImageWithBasePath from "../../../core/common/imageWithBasePath";
import { useDispatch, useSelector } from "react-redux";
import {
  setActivityTogglePopup,
  setActivityTogglePopupTwo,
} from "../../../core/data/redux/commonSlice";
import DatePicker from "react-datepicker";
import Select from "react-select";
import DefaultEditor from "react-simple-wysiwyg";
import { all_routes } from "../../router/all_routes";

const Contractslist = () => {
  const route = all_routes;
  const dispatch = useDispatch();
  const handleDateChange1 = (date: Date | null) => {
    setSelectedDate1(date);
  };
  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
  };
  const [selectedDate1, setSelectedDate1] = useState<Date | null>(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const data = contracts;
  const activityToggle = useSelector(
    (state: any) => state?.activityTogglePopup
  );
  const activityToggleTwo = useSelector(
    (state: any) => state?.activityTogglePopupTwo
  );
  const columns = [
    {
      title: "Contract ID",
      dataIndex: "contractId",
      key: "contractId",
      sorter: true,
    },
    {
      title: "Subject",
      dataIndex: "subject",
      key: "subject",
      sorter: true,
    },
    {
      title: "Customer",
      dataIndex: "customer",
      key: "customer",
      sorter: true,
      render: (text: any, record: any) => (
        <h2 className="table-avatar d-flex align-items-center">
          <Link
            to={route.companyDetails}
            className="avatar avatar-sm border me-2"
          >
            <ImageWithBasePath
              className="w-auto h-auto"
              src={record.client_img}
              alt="User Image"
            />
          </Link>
          <Link
            to={route.companyDetails}
            className="profile-split d-flex flex-column"
          >
            {record.customer}
          </Link>
        </h2>
      ),
    },
    {
      title: "ContractValue",
      dataIndex: "contractValue",
      key: "contractValue",
      sorter: true,
    },
    {
      title: "ContractType",
      dataIndex: "contractType",
      key: "contractType",
      sorter: true,
    },

    {
      title: "StartDate",
      dataIndex: "startDate",
      key: "startDate",
      sorter: true,
    },
    {
      title: "End Date",
      dataIndex: "endDate",
      key: "endDate",
      sorter: true,
    },

    {
      title: "Action",
      dataIndex: "action",
      render: () => (
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
              <i className="ti ti-edit text-blue"></i> Edit
            </Link>

            <Link
              className="dropdown-item"
              to="#"
              data-bs-toggle="modal"
              data-bs-target="#delete_contracts"
            >
              <i className="ti ti-trash text-danger"></i> Delete
            </Link>
          </div>
        </div>
      ),
    },
  ];
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
                    <div className="col-4">
                      <h4 className="page-title">
                        Contracts<span className="count-title">123</span>
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
                            placeholder="Search Contacts"
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
                            Add New Contracts
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
                                    Contract ID
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
                                    Customer
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
                                    Date
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
                                    Contract Value
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
                                    Contract Type
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
                                    Start Date
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
                                    End Date
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
                                <div
                                  className="accordion"
                                  id="accordionExample"
                                >
                                  <div className="filter-set-content">
                                    <div className="filter-set-content-head">
                                      <Link
                                        to="#"
                                        data-bs-toggle="collapse"
                                        data-bs-target="#collapseTwo"
                                        aria-expanded="true"
                                        aria-controls="collapseTwo"
                                      >
                                        Contracts Id
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
                                            placeholder="Search Id"
                                          />
                                        </div>
                                        <ul>
                                          <li>
                                            <div className="filter-checks">
                                              <label className="checkboxs">
                                                <input type="checkbox" />
                                                <span className="checkmarks" />
                                                #1493024
                                              </label>
                                            </div>
                                          </li>
                                          <li>
                                            <div className="filter-checks">
                                              <label className="checkboxs">
                                                <input type="checkbox" />
                                                <span className="checkmarks" />
                                                #1493023
                                              </label>
                                            </div>
                                          </li>
                                          <li>
                                            <div className="filter-checks">
                                              <label className="checkboxs">
                                                <input type="checkbox" />
                                                <span className="checkmarks" />
                                                #1493022
                                              </label>
                                            </div>
                                          </li>
                                          <li>
                                            <div className="filter-checks">
                                              <label className="checkboxs">
                                                <input type="checkbox" />
                                                <span className="checkmarks" />
                                                #1493021
                                              </label>
                                            </div>
                                          </li>
                                          <li>
                                            <div className="filter-checks">
                                              <label className="checkboxs">
                                                <input type="checkbox" />
                                                <span className="checkmarks" />
                                                #1493020
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
                                        Subject
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
                                            placeholder="Search Subject"
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
                                                SEO Contracts
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
                                        data-bs-target="#Status"
                                        aria-expanded="false"
                                        aria-controls="Status"
                                      >
                                        Customer
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
                                        Contract Type
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
                                                Contracts under Seal
                                              </label>
                                            </div>
                                          </li>
                                          <li>
                                            <div className="filter-checks">
                                              <label className="checkboxs">
                                                <input type="checkbox" />
                                                <span className="checkmarks" />
                                                Implied Contracts
                                              </label>
                                            </div>
                                          </li>
                                          <li>
                                            <div className="filter-checks">
                                              <label className="checkboxs">
                                                <input type="checkbox" />
                                                <span className="checkmarks" />
                                                Executory Contracts
                                              </label>
                                            </div>
                                          </li>
                                          <li>
                                            <div className="filter-checks">
                                              <label className="checkboxs">
                                                <input type="checkbox" />
                                                <span className="checkmarks" />
                                                Voidable Contracts
                                              </label>
                                            </div>
                                          </li>
                                          <li>
                                            <div className="filter-checks">
                                              <label className="checkboxs">
                                                <input type="checkbox" />
                                                <span className="checkmarks" />
                                                Unilateral Contracts
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
                                        to={route.ContractsList}
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
                            <Link to={route.ContractsList} className="active">
                              <i className="ti ti-list-tree" />
                            </Link>
                            <Link to={route.ContractsGrid}>
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
                        <div className="datatable-length" />
                      </div>
                      <div className="col-md-6">
                        <div className="datatable-paginate" />
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
          {/* Add New Contracts */}
          <div
            className="offcanvas offcanvas-end offcanvas-large"
            tabIndex={-1}
            id="offcanvas_add"
          >
            <div className="offcanvas-header border-bottom">
              <h4>Add New Contract</h4>
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
                          Subject <span className="text-danger">*</span>
                        </label>
                        <input type="text" className="form-control" />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="col-form-label">
                          Date of Birth<span className="text-danger">*</span>
                        </label>
                        <div className="icon-form">
                          <span className="form-icon">
                            <i className="ti ti-calendar-check" />
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
                          End Date<span className="text-danger">*</span>
                        </label>
                        <div className="icon-form">
                          <span className="form-icon">
                            <i className="ti ti-calendar-check" />
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
                    <div className="col-md-12">
                      <div className="mb-3">
                        <label className="col-form-label">
                          Client <span className="text-danger">*</span>
                        </label>
                        <Select
                          options={status1}
                          className="select"
                          placeholder="Choose"
                          classNamePrefix="react-select"
                        />
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="mb-3">
                        <label className="col-form-label">
                          Contact Value<span className="text-danger">*</span>
                        </label>
                        <Select
                          options={status1}
                          className="select"
                          placeholder="Choose"
                          classNamePrefix="react-select"
                        />
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="mb-3">
                        <label className="col-form-label">
                          Contact Value <span className="text-danger">*</span>
                        </label>
                        <input type="text" className="form-control" />
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="mb-3">
                        <label className="col-form-label">
                          Attachment <span className="text-danger">*</span>
                        </label>
                        <div className="drag-attach">
                          <input type="file" />
                          <div className="img-upload">
                            <i className="ti ti-file-broken" />
                            Upload File
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="mb-3">
                        <label className="col-form-label">
                          Description <span className="text-danger">*</span>
                        </label>
                        <DefaultEditor className="summernote" />
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
          {/* /Add New Contracts */}
          {/* Edit Contracts */}
          <div
            className="offcanvas offcanvas-end offcanvas-large"
            tabIndex={-1}
            id="offcanvas_edit"
          >
            <div className="offcanvas-header border-bottom">
              <h4>Edit Contract</h4>
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
                          Subject <span className="text-danger">*</span>
                        </label>
                        <input type="text" className="form-control" />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="col-form-label">
                          Date of Birth<span className="text-danger">*</span>
                        </label>
                        <div className="icon-form">
                          <span className="form-icon">
                            <i className="ti ti-calendar-check" />
                          </span>
                          <DatePicker
                            className="form-control datetimepicker"
                            selected={selectedDate}
                            onChange={handleDateChange}
                            dateFormat="dd-MM-yyyy"
                            placeholderText="11=06-2024"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="col-form-label">
                          End Date<span className="text-danger">*</span>
                        </label>
                        <div className="icon-form">
                          <span className="form-icon">
                            <i className="ti ti-calendar-check" />
                          </span>
                          <DatePicker
                            className="form-control datetimepicker"
                            selected={selectedDate}
                            onChange={handleDateChange}
                            dateFormat="dd-MM-yyyy"
                            placeholderText="14-06-2024"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="mb-3">
                        <label className="col-form-label">
                          Client <span className="text-danger">*</span>
                        </label>
                        <Select
                          options={status1}
                          className="select"
                          placeholder="Mobile App"
                          classNamePrefix="react-select"
                        />
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="mb-3">
                        <label className="col-form-label">
                          Contact Value<span className="text-danger">*</span>
                        </label>
                        <Select
                          options={status1}
                          className="select"
                          placeholder="Mobile App"
                          classNamePrefix="react-select"
                        />
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="mb-3">
                        <label className="col-form-label">
                          Contact Value <span className="text-danger">*</span>
                        </label>
                        <input type="text" className="form-control" />
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="mb-3">
                        <label className="col-form-label">
                          Attachment <span className="text-danger">*</span>
                        </label>
                        <div className="drag-attach">
                          <input type="file" />
                          <div className="img-upload">
                            <i className="ti ti-file-broken" />
                            Upload File
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="mb-3">
                        <label className="col-form-label">
                          Description <span className="text-danger">*</span>
                        </label>
                        <DefaultEditor className="summernote" />
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
          {/* /Edit Contracts */}
          {/* Delete Contracts */}
          <div className="modal fade" id="delete_contracts" role="dialog">
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-body">
                  <div className="text-center">
                    <div className="avatar avatar-xl bg-danger-light rounded-circle mb-3">
                      <i className="ti ti-trash-x fs-36 text-danger" />
                    </div>
                    <h4 className="mb-2">Remove Contract?</h4>
                    <p className="mb-0">
                      Are you sure you want to remove <br /> contract you
                      selected.
                    </p>
                    <div className="d-flex align-items-center justify-content-center mt-4">
                      <Link
                        to="#"
                        className="btn btn-light me-2"
                        data-bs-dismiss="modal"
                      >
                        Cancel
                      </Link>
                      <Link to={route.ContractsList} className="btn btn-danger">
                        Yes, Delete it
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* /Delete Contracts */}
          {/* Create Contracts */}
          <div
            className="modal custom-modal fade"
            id="create_success"
            role="dialog"
          >
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
                    <h3>Contracts Created Successfully!!!</h3>
                    <p>View the details of contracts, created</p>
                    <div className="col-lg-12 text-center modal-btn">
                      <Link
                        to="#"
                        className="btn btn-light"
                        data-bs-dismiss="modal"
                      >
                        Cancel
                      </Link>
                      <Link to="#" className="btn btn-primary">
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* /Create Contracts */}
        </>
      </>
    </div>
  );
};

export default Contractslist;
