import React, { useState } from "react";
import ImageWithBasePath from "../../../core/common/imageWithBasePath";
import CollapseHeader from "../../../core/common/collapse-header";
import DateRangePicker from "react-bootstrap-daterangepicker";

import DefaultEditor from "react-simple-wysiwyg";
import DatePicker from "react-datepicker";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  initialSettings,
  status1,
} from "../../../core/common/selectoption/selectoption";
import {
  setActivityTogglePopup,
  setActivityTogglePopupTwo,
} from "../../../core/data/redux/commonSlice";
import Select from "react-select";
import { all_routes } from "../../router/all_routes";

const ContractsGrid = () => {
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
  const activityToggle = useSelector(
    (state: any) => state?.activityTogglePopup
  );
  const activityToggleTwo = useSelector(
    (state: any) => state?.activityTogglePopupTwo
  );
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
                    <div className="col-8">
                      <h4 className="page-title">
                        Contracts<span className="count-title">123</span>
                      </h4>
                    </div>
                    <div className="col-4 text-end">
                      <div className="head-icons">
                        <Link
                          to={route.ContractsGrid}
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
                {/* Card */}
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
                          className="dropdown-toggle bg-white"
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
                {/* Filter */}
                <div className="d-flex align-items-center justify-content-between flex-wrap row-gap-2 border-top mt-4 pt-4 mb-4">
                  <div className="d-flex align-items-center flex-wrap row-gap-2">
                    <div className="dropdown me-2">
                      <Link
                        to="#"
                        className="dropdown-toggle bg-white"
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
                                  to={route.ContractsGrid}
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
                      <Link to={route.ContractsList}>
                        <i className="ti ti-list-tree" />
                      </Link>
                      <Link to={route.ContractsGrid} className="active">
                        <i className="ti ti-grid-dots" />
                      </Link>
                    </div>
                  </div>
                </div>
                {/* /Filter */}
                {/* Contact Grid */}
                <div className="row">
                  <div className="col-xxl-3 col-xl-4 col-md-6">
                    <div className="card border">
                      <div className="card-body">
                        <div className="d-flex align-items-center justify-content-between mb-3">
                          <div>
                            <span className="badge badge-danger-light">
                              #1493016
                            </span>
                          </div>
                          <div className="dropdown table-action">
                            <Link
                              to="#"
                              className="action-icon bg-white"
                              data-bs-toggle="dropdown"
                              aria-expanded="false"
                            >
                              <i className="fa fa-ellipsis-v" />
                            </Link>
                            <div className="dropdown-menu dropdown-menu-right">
                              <Link
                                className="dropdown-item"
                                to="#"
                                data-bs-toggle="offcanvas"
                                data-bs-target="#offcanvas_edit"
                              >
                                <i className="ti ti-edit text-blue" /> Edit
                              </Link>
                              <Link
                                className="dropdown-item"
                                to="#"
                                data-bs-toggle="modal"
                                data-bs-target="#delete_contracts"
                              >
                                <i className="ti ti-trash text-danger" /> Delete
                              </Link>
                              <Link
                                className="dropdown-item"
                                to="#"
                              >
                                <i className="ti ti-copy text-blue-light" />{" "}
                                Clone
                              </Link>
                              <Link
                                className="dropdown-item"
                                to="#"
                              >
                                <i className="ti ti-clipboard-copy text-blue-light" />{" "}
                                View Contract
                              </Link>
                              <Link
                                className="dropdown-item"
                                to="#"
                              >
                                <i className="ti ti-checks text-blue-light" />{" "}
                                Mark as Signed
                              </Link>
                              <Link
                                className="dropdown-item"
                                to="#"
                              >
                                <i className="ti ti-printer text-blue-light" />{" "}
                                Print
                              </Link>
                            </div>
                          </div>
                        </div>
                        <div className="d-block">
                          <div className="mb-3">
                            <h4>SEO Contracts</h4>
                            <p>Category : Contracts under Seal</p>
                          </div>
                          <div className="mb-3">
                            <p className="d-flex align-items-center mb-2">
                              <span className="avatar avatar-xs border text-dark me-2">
                                <i className="ti ti-calendar-event fs-12" />
                              </span>
                              Date : 25 May 2024
                            </p>
                            <p className="d-flex align-items-center">
                              <span className="avatar avatar-xs border text-dark me-2">
                                <i className="ti ti-calendar-stats" />
                              </span>
                              Open till : 31 Jun 2024
                            </p>
                          </div>
                          <div className="bg-light-200 border rounded d-flex align-items-center p-2 mb-3">
                            <Link
                              to="#"
                              className="avatar avatar-sm border bg-white me-2"
                            >
                              <ImageWithBasePath
                                src="assets/img/icons/company-icon-01.svg"
                                className="w-auto h-auto"
                                alt="img"
                              />
                            </Link>
                            <div className="d-flex flex-column">
                              <span className="d-block">Customer</span>
                              <Link
                                to="#"
                                className="text-default"
                              >
                                NovaWave LLC
                              </Link>
                            </div>
                          </div>
                        </div>
                        <div className="d-flex justify-content-between pt-3 border-top">
                          <div>
                            <span className="badge badge-purple">
                              {" "}
                              <i className="ti ti-moneybag me-1" /> Value :
                              $2,04,214
                            </span>
                          </div>
                          <Link
                            to="#"
                            className="avatar avatar-xs bg-danger-light text-danger"
                          >
                            {" "}
                            <i className="ti ti-file-dots fs-12" />{" "}
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-xxl-3 col-xl-4 col-md-6">
                    <div className="card border">
                      <div className="card-body">
                        <div className="d-flex align-items-center justify-content-between mb-3">
                          <div>
                            <span className="badge badge-danger-light">
                              #1493016
                            </span>
                          </div>
                          <div className="dropdown table-action">
                            <Link
                              to="#"
                              className="action-icon bg-white"
                              data-bs-toggle="dropdown"
                              aria-expanded="false"
                            >
                              <i className="fa fa-ellipsis-v" />
                            </Link>
                            <div className="dropdown-menu dropdown-menu-right">
                              <Link
                                className="dropdown-item"
                                to="#"
                                data-bs-toggle="offcanvas"
                                data-bs-target="#offcanvas_edit"
                              >
                                <i className="ti ti-edit text-blue" /> Edit
                              </Link>
                              <Link
                                className="dropdown-item"
                                to="#"
                                data-bs-toggle="modal"
                                data-bs-target="#delete_contracts"
                              >
                                <i className="ti ti-trash text-danger" /> Delete
                              </Link>
                              <Link
                                className="dropdown-item"
                                to="#"
                              >
                                <i className="ti ti-copy text-blue-light" />{" "}
                                Clone
                              </Link>
                              <Link
                                className="dropdown-item"
                                to="#"
                              >
                                <i className="ti ti-clipboard-copy text-blue-light" />{" "}
                                View Contract
                              </Link>
                              <Link
                                className="dropdown-item"
                                to="#"
                              >
                                <i className="ti ti-checks text-blue-light" />{" "}
                                Mark as Signed
                              </Link>
                              <Link
                                className="dropdown-item"
                                to="#"
                              >
                                <i className="ti ti-printer text-blue-light" />{" "}
                                Print
                              </Link>
                            </div>
                          </div>
                        </div>
                        <div className="d-block">
                          <div className="mb-3">
                            <h4>Redwood Inc</h4>
                            <p>Category : Contracts under Seal</p>
                          </div>
                          <div className="mb-3">
                            <p className="d-flex align-items-center mb-2">
                              <span className="avatar avatar-xs border text-dark me-2">
                                <i className="ti ti-calendar-event fs-12" />
                              </span>
                              Date : 25 May 2024
                            </p>
                            <p className="d-flex align-items-center">
                              <span className="avatar avatar-xs border text-dark me-2">
                                <i className="ti ti-calendar-stats" />
                              </span>
                              Open till : 31 Jun 2024
                            </p>
                          </div>
                          <div className="bg-light-200 border rounded d-flex align-items-center p-2 mb-3">
                            <Link
                              to="#"
                              className="avatar avatar-sm border bg-white me-2"
                            >
                              <ImageWithBasePath
                                src="assets/img/icons/company-icon-02.svg"
                                className="w-auto h-auto"
                                alt="img"
                              />
                            </Link>
                            <div className="d-flex flex-column">
                              <span className="d-block">Customer</span>
                              <Link
                                to="#"
                                className="text-default"
                              >
                                Redwood Inc
                              </Link>
                            </div>
                          </div>
                        </div>
                        <div className="d-flex justify-content-between pt-3 border-top">
                          <div>
                            <span className="badge badge-purple">
                              {" "}
                              <i className="ti ti-moneybag me-1" /> Value :
                              $2,04,214
                            </span>
                          </div>
                          <Link
                            to="#"
                            className="avatar avatar-xs bg-danger-light text-danger"
                          >
                            {" "}
                            <i className="ti ti-file-dots fs-12" />{" "}
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-xxl-3 col-xl-4 col-md-6">
                    <div className="card border">
                      <div className="card-body">
                        <div className="d-flex align-items-center justify-content-between mb-3">
                          <div>
                            <span className="badge badge-danger-light">
                              #1493016
                            </span>
                          </div>
                          <div className="dropdown table-action">
                            <Link
                              to="#"
                              className="action-icon bg-white"
                              data-bs-toggle="dropdown"
                              aria-expanded="false"
                            >
                              <i className="fa fa-ellipsis-v" />
                            </Link>
                            <div className="dropdown-menu dropdown-menu-right">
                              <Link
                                className="dropdown-item"
                                to="#"
                                data-bs-toggle="offcanvas"
                                data-bs-target="#offcanvas_edit"
                              >
                                <i className="ti ti-edit text-blue" /> Edit
                              </Link>
                              <Link
                                className="dropdown-item"
                                to="#"
                                data-bs-toggle="modal"
                                data-bs-target="#delete_contracts"
                              >
                                <i className="ti ti-trash text-danger" /> Delete
                              </Link>
                              <Link
                                className="dropdown-item"
                                to="#"
                              >
                                <i className="ti ti-copy text-blue-light" />{" "}
                                Clone
                              </Link>
                              <Link
                                className="dropdown-item"
                                to="#"
                              >
                                <i className="ti ti-clipboard-copy text-blue-light" />{" "}
                                View Contract
                              </Link>
                              <Link
                                className="dropdown-item"
                                to="#"
                              >
                                <i className="ti ti-checks text-blue-light" />{" "}
                                Mark as Signed
                              </Link>
                              <Link
                                className="dropdown-item"
                                to="#"
                              >
                                <i className="ti ti-printer text-blue-light" />{" "}
                                Print
                              </Link>
                            </div>
                          </div>
                        </div>
                        <div className="d-block">
                          <div className="mb-3">
                            <h4>HarborView</h4>
                            <p>Implied Contracts</p>
                          </div>
                          <div className="mb-3">
                            <p className="d-flex align-items-center mb-2">
                              <span className="avatar avatar-xs border text-dark me-2">
                                <i className="ti ti-calendar-event fs-12" />
                              </span>
                              Date : 25 May 2024
                            </p>
                            <p className="d-flex align-items-center">
                              <span className="avatar avatar-xs border text-dark me-2">
                                <i className="ti ti-calendar-stats" />
                              </span>
                              Open till : 31 Jun 2024
                            </p>
                          </div>
                          <div className="bg-light-200 border rounded d-flex align-items-center p-2 mb-3">
                            <Link
                              to="#"
                              className="avatar avatar-sm border bg-white me-2"
                            >
                              <ImageWithBasePath
                                src="assets/img/icons/company-icon-03.svg"
                                className="w-auto h-auto"
                                alt="img"
                              />
                            </Link>
                            <div className="d-flex flex-column">
                              <span className="d-block">Customer</span>
                              <Link
                                to="#"
                                className="text-default"
                              >
                                Development
                              </Link>
                            </div>
                          </div>
                        </div>
                        <div className="d-flex justify-content-between pt-3 border-top">
                          <div>
                            <span className="badge badge-purple">
                              {" "}
                              <i className="ti ti-moneybag me-1" /> Value :
                              $2,04,214
                            </span>
                          </div>
                          <Link
                            to="#"
                            className="avatar avatar-xs bg-danger-light text-danger"
                          >
                            {" "}
                            <i className="ti ti-file-dots fs-12" />{" "}
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-xxl-3 col-xl-4 col-md-6">
                    <div className="card border">
                      <div className="card-body">
                        <div className="d-flex align-items-center justify-content-between mb-3">
                          <div>
                            <span className="badge badge-danger-light">
                              #1493016
                            </span>
                          </div>
                          <div className="dropdown table-action">
                            <Link
                              to="#"
                              className="action-icon bg-white"
                              data-bs-toggle="dropdown"
                              aria-expanded="false"
                            >
                              <i className="fa fa-ellipsis-v" />
                            </Link>
                            <div className="dropdown-menu dropdown-menu-right">
                              <Link
                                className="dropdown-item"
                                to="#"
                                data-bs-toggle="offcanvas"
                                data-bs-target="#offcanvas_edit"
                              >
                                <i className="ti ti-edit text-blue" /> Edit
                              </Link>
                              <Link
                                className="dropdown-item"
                                to="#"
                                data-bs-toggle="modal"
                                data-bs-target="#delete_contracts"
                              >
                                <i className="ti ti-trash text-danger" /> Delete
                              </Link>
                              <Link
                                className="dropdown-item"
                                to="#"
                              >
                                <i className="ti ti-copy text-blue-light" />{" "}
                                Clone
                              </Link>
                              <Link
                                className="dropdown-item"
                                to="#"
                              >
                                <i className="ti ti-clipboard-copy text-blue-light" />{" "}
                                View Contract
                              </Link>
                              <Link
                                className="dropdown-item"
                                to="#"
                              >
                                <i className="ti ti-checks text-blue-light" />{" "}
                                Mark as Signed
                              </Link>
                              <Link
                                className="dropdown-item"
                                to="#"
                              >
                                <i className="ti ti-printer text-blue-light" />{" "}
                                Print
                              </Link>
                            </div>
                          </div>
                        </div>
                        <div className="d-block">
                          <div className="mb-3">
                            <h4>Executory Contracts</h4>
                            <p>Category : under Seal</p>
                          </div>
                          <div className="mb-3">
                            <p className="d-flex align-items-center mb-2">
                              <span className="avatar avatar-xs border text-dark me-2">
                                <i className="ti ti-calendar-event fs-12" />
                              </span>
                              Date : 25 May 2024
                            </p>
                            <p className="d-flex align-items-center">
                              <span className="avatar avatar-xs border text-dark me-2">
                                <i className="ti ti-calendar-stats" />
                              </span>
                              Open till : 31 Jun 2024
                            </p>
                          </div>
                          <div className="bg-light-200 border rounded d-flex align-items-center p-2 mb-3">
                            <Link
                              to="#"
                              className="avatar avatar-sm border bg-white me-2"
                            >
                              <ImageWithBasePath
                                src="assets/img/icons/company-icon-05.svg"
                                className="w-auto h-auto"
                                alt="img"
                              />
                            </Link>
                            <div className="d-flex flex-column">
                              <span className="d-block">Customer</span>
                              <Link
                                to="#"
                                className="text-default"
                              >
                                Unconscionable
                              </Link>
                            </div>
                          </div>
                        </div>
                        <div className="d-flex justify-content-between pt-3 border-top">
                          <div>
                            <span className="badge badge-purple">
                              {" "}
                              <i className="ti ti-moneybag me-1" /> Value :
                              $2,04,214
                            </span>
                          </div>
                          <Link
                            to="#"
                            className="avatar avatar-xs bg-danger-light text-danger"
                          >
                            {" "}
                            <i className="ti ti-file-dots fs-12" />{" "}
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-xxl-3 col-xl-4 col-md-6">
                    <div className="card border">
                      <div className="card-body">
                        <div className="d-flex align-items-center justify-content-between mb-3">
                          <div>
                            <span className="badge badge-danger-light">
                              #1493016
                            </span>
                          </div>
                          <div className="dropdown table-action">
                            <Link
                              to="#"
                              className="action-icon bg-white"
                              data-bs-toggle="dropdown"
                              aria-expanded="false"
                            >
                              <i className="fa fa-ellipsis-v" />
                            </Link>
                            <div className="dropdown-menu dropdown-menu-right">
                              <Link
                                className="dropdown-item"
                                to="#"
                                data-bs-toggle="offcanvas"
                                data-bs-target="#offcanvas_edit"
                              >
                                <i className="ti ti-edit text-blue" /> Edit
                              </Link>
                              <Link
                                className="dropdown-item"
                                to="#"
                                data-bs-toggle="modal"
                                data-bs-target="#delete_contracts"
                              >
                                <i className="ti ti-trash text-danger" /> Delete
                              </Link>
                              <Link
                                className="dropdown-item"
                                to="#"
                              >
                                <i className="ti ti-copy text-blue-light" />{" "}
                                Clone
                              </Link>
                              <Link
                                className="dropdown-item"
                                to="#"
                              >
                                <i className="ti ti-clipboard-copy text-blue-light" />{" "}
                                View Contract
                              </Link>
                              <Link
                                className="dropdown-item"
                                to="#"
                              >
                                <i className="ti ti-checks text-blue-light" />{" "}
                                Mark as Signed
                              </Link>
                              <Link
                                className="dropdown-item"
                                to="#"
                              >
                                <i className="ti ti-printer text-blue-light" />{" "}
                                Print
                              </Link>
                            </div>
                          </div>
                        </div>
                        <div className="d-block">
                          <div className="mb-3">
                            <h4>SEO Contracts</h4>
                            <p>Category : Contracts under Seal</p>
                          </div>
                          <div className="mb-3">
                            <p className="d-flex align-items-center mb-2">
                              <span className="avatar avatar-xs border text-dark me-2">
                                <i className="ti ti-calendar-event fs-12" />
                              </span>
                              Date : 25 May 2024
                            </p>
                            <p className="d-flex align-items-center">
                              <span className="avatar avatar-xs border text-dark me-2">
                                <i className="ti ti-calendar-stats" />
                              </span>
                              Open till : 31 Jun 2024
                            </p>
                          </div>
                          <div className="bg-light-200 border rounded d-flex align-items-center p-2 mb-3">
                            <Link
                              to="#"
                              className="avatar avatar-sm border bg-white me-2"
                            >
                              <ImageWithBasePath
                                src="assets/img/icons/company-icon-01.svg"
                                className="w-auto h-auto"
                                alt="img"
                              />
                            </Link>
                            <div className="d-flex flex-column">
                              <span className="d-block">Customer</span>
                              <Link
                                to="#"
                                className="text-default"
                              >
                                NovaWave LLC
                              </Link>
                            </div>
                          </div>
                        </div>
                        <div className="d-flex justify-content-between pt-3 border-top">
                          <div>
                            <span className="badge badge-purple">
                              {" "}
                              <i className="ti ti-moneybag me-1" /> Value :
                              $2,04,214
                            </span>
                          </div>
                          <Link
                            to="#"
                            className="avatar avatar-xs bg-danger-light text-danger"
                          >
                            {" "}
                            <i className="ti ti-file-dots fs-12" />{" "}
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-xxl-3 col-xl-4 col-md-6">
                    <div className="card border">
                      <div className="card-body">
                        <div className="d-flex align-items-center justify-content-between mb-3">
                          <div>
                            <span className="badge badge-danger-light">
                              #1493016
                            </span>
                          </div>
                          <div className="dropdown table-action">
                            <Link
                              to="#"
                              className="action-icon bg-white"
                              data-bs-toggle="dropdown"
                              aria-expanded="false"
                            >
                              <i className="fa fa-ellipsis-v" />
                            </Link>
                            <div className="dropdown-menu dropdown-menu-right">
                              <Link
                                className="dropdown-item"
                                to="#"
                                data-bs-toggle="offcanvas"
                                data-bs-target="#offcanvas_edit"
                              >
                                <i className="ti ti-edit text-blue" /> Edit
                              </Link>
                              <Link
                                className="dropdown-item"
                                to="#"
                                data-bs-toggle="modal"
                                data-bs-target="#delete_contracts"
                              >
                                <i className="ti ti-trash text-danger" /> Delete
                              </Link>
                              <Link
                                className="dropdown-item"
                                to="#"
                              >
                                <i className="ti ti-copy text-blue-light" />{" "}
                                Clone
                              </Link>
                              <Link
                                className="dropdown-item"
                                to="#"
                              >
                                <i className="ti ti-clipboard-copy text-blue-light" />{" "}
                                View Contract
                              </Link>
                              <Link
                                className="dropdown-item"
                                to="#"
                              >
                                <i className="ti ti-checks text-blue-light" />{" "}
                                Mark as Signed
                              </Link>
                              <Link
                                className="dropdown-item"
                                to="#"
                              >
                                <i className="ti ti-printer text-blue-light" />{" "}
                                Print
                              </Link>
                            </div>
                          </div>
                        </div>
                        <div className="d-block">
                          <div className="mb-3">
                            <h4>Redwood Inc</h4>
                            <p>Category : Contracts under Seal</p>
                          </div>
                          <div className="mb-3">
                            <p className="d-flex align-items-center mb-2">
                              <span className="avatar avatar-xs border text-dark me-2">
                                <i className="ti ti-calendar-event fs-12" />
                              </span>
                              Date : 25 May 2024
                            </p>
                            <p className="d-flex align-items-center">
                              <span className="avatar avatar-xs border text-dark me-2">
                                <i className="ti ti-calendar-stats" />
                              </span>
                              Open till : 31 Jun 2024
                            </p>
                          </div>
                          <div className="bg-light-200 border rounded d-flex align-items-center p-2 mb-3">
                            <Link
                              to="#"
                              className="avatar avatar-sm border bg-white me-2"
                            >
                              <ImageWithBasePath
                                src="assets/img/icons/company-icon-02.svg"
                                className="w-auto h-auto"
                                alt="img"
                              />
                            </Link>
                            <div className="d-flex flex-column">
                              <span className="d-block">Customer</span>
                              <Link
                                to="#"
                                className="text-default"
                              >
                                Redwood Inc
                              </Link>
                            </div>
                          </div>
                        </div>
                        <div className="d-flex justify-content-between pt-3 border-top">
                          <div>
                            <span className="badge badge-purple">
                              {" "}
                              <i className="ti ti-moneybag me-1" /> Value :
                              $2,04,214
                            </span>
                          </div>
                          <Link
                            to="#"
                            className="avatar avatar-xs bg-danger-light text-danger"
                          >
                            {" "}
                            <i className="ti ti-file-dots fs-12" />{" "}
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-xxl-3 col-xl-4 col-md-6">
                    <div className="card border">
                      <div className="card-body">
                        <div className="d-flex align-items-center justify-content-between mb-3">
                          <div>
                            <span className="badge badge-danger-light">
                              #1493016
                            </span>
                          </div>
                          <div className="dropdown table-action">
                            <Link
                              to="#"
                              className="action-icon bg-white"
                              data-bs-toggle="dropdown"
                              aria-expanded="false"
                            >
                              <i className="fa fa-ellipsis-v" />
                            </Link>
                            <div className="dropdown-menu dropdown-menu-right">
                              <Link
                                className="dropdown-item"
                                to="#"
                                data-bs-toggle="offcanvas"
                                data-bs-target="#offcanvas_edit"
                              >
                                <i className="ti ti-edit text-blue" /> Edit
                              </Link>
                              <Link
                                className="dropdown-item"
                                to="#"
                                data-bs-toggle="modal"
                                data-bs-target="#delete_contracts"
                              >
                                <i className="ti ti-trash text-danger" /> Delete
                              </Link>
                              <Link
                                className="dropdown-item"
                                to="#"
                              >
                                <i className="ti ti-copy text-blue-light" />{" "}
                                Clone
                              </Link>
                              <Link
                                className="dropdown-item"
                                to="#"
                              >
                                <i className="ti ti-clipboard-copy text-blue-light" />{" "}
                                View Contract
                              </Link>
                              <Link
                                className="dropdown-item"
                                to="#"
                              >
                                <i className="ti ti-checks text-blue-light" />{" "}
                                Mark as Signed
                              </Link>
                              <Link
                                className="dropdown-item"
                                to="#"
                              >
                                <i className="ti ti-printer text-blue-light" />{" "}
                                Print
                              </Link>
                            </div>
                          </div>
                        </div>
                        <div className="d-block">
                          <div className="mb-3">
                            <h4>HarborView</h4>
                            <p>Implied Contracts</p>
                          </div>
                          <div className="mb-3">
                            <p className="d-flex align-items-center mb-2">
                              <span className="avatar avatar-xs border text-dark me-2">
                                <i className="ti ti-calendar-event fs-12" />
                              </span>
                              Date : 25 May 2024
                            </p>
                            <p className="d-flex align-items-center">
                              <span className="avatar avatar-xs border text-dark me-2">
                                <i className="ti ti-calendar-stats" />
                              </span>
                              Open till : 31 Jun 2024
                            </p>
                          </div>
                          <div className="bg-light-200 border rounded d-flex align-items-center p-2 mb-3">
                            <Link
                              to="#"
                              className="avatar avatar-sm border bg-white me-2"
                            >
                              <ImageWithBasePath
                                src="assets/img/icons/company-icon-03.svg"
                                className="w-auto h-auto"
                                alt="img"
                              />
                            </Link>
                            <div className="d-flex flex-column">
                              <span className="d-block">Customer</span>
                              <Link
                                to="#"
                                className="text-default"
                              >
                                Development
                              </Link>
                            </div>
                          </div>
                        </div>
                        <div className="d-flex justify-content-between pt-3 border-top">
                          <div>
                            <span className="badge badge-purple">
                              {" "}
                              <i className="ti ti-moneybag me-1" /> Value :
                              $2,04,214
                            </span>
                          </div>
                          <Link
                            to="#"
                            className="avatar avatar-xs bg-danger-light text-danger"
                          >
                            {" "}
                            <i className="ti ti-file-dots fs-12" />{" "}
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-xxl-3 col-xl-4 col-md-6">
                    <div className="card border">
                      <div className="card-body">
                        <div className="d-flex align-items-center justify-content-between mb-3">
                          <div>
                            <span className="badge badge-danger-light">
                              #1493016
                            </span>
                          </div>
                          <div className="dropdown table-action">
                            <Link
                              to="#"
                              className="action-icon bg-white"
                              data-bs-toggle="dropdown"
                              aria-expanded="false"
                            >
                              <i className="fa fa-ellipsis-v" />
                            </Link>
                            <div className="dropdown-menu dropdown-menu-right">
                              <Link
                                className="dropdown-item"
                                to="#"
                                data-bs-toggle="offcanvas"
                                data-bs-target="#offcanvas_edit"
                              >
                                <i className="ti ti-edit text-blue" /> Edit
                              </Link>
                              <Link
                                className="dropdown-item"
                                to="#"
                                data-bs-toggle="modal"
                                data-bs-target="#delete_contracts"
                              >
                                <i className="ti ti-trash text-danger" /> Delete
                              </Link>
                              <Link
                                className="dropdown-item"
                                to="#"
                              >
                                <i className="ti ti-copy text-blue-light" />{" "}
                                Clone
                              </Link>
                              <Link
                                className="dropdown-item"
                                to="#"
                              >
                                <i className="ti ti-clipboard-copy text-blue-light" />{" "}
                                View Contract
                              </Link>
                              <Link
                                className="dropdown-item"
                                to="#"
                              >
                                <i className="ti ti-checks text-blue-light" />{" "}
                                Mark as Signed
                              </Link>
                              <Link
                                className="dropdown-item"
                                to="#"
                              >
                                <i className="ti ti-printer text-blue-light" />{" "}
                                Print
                              </Link>
                            </div>
                          </div>
                        </div>
                        <div className="d-block">
                          <div className="mb-3">
                            <h4>Executory Contracts</h4>
                            <p>Category : under Seal</p>
                          </div>
                          <div className="mb-3">
                            <p className="d-flex align-items-center mb-2">
                              <span className="avatar avatar-xs border text-dark me-2">
                                <i className="ti ti-calendar-event fs-12" />
                              </span>
                              Date : 25 May 2024
                            </p>
                            <p className="d-flex align-items-center">
                              <span className="avatar avatar-xs border text-dark me-2">
                                <i className="ti ti-calendar-stats" />
                              </span>
                              Open till : 31 Jun 2024
                            </p>
                          </div>
                          <div className="bg-light-200 border rounded d-flex align-items-center p-2 mb-3">
                            <Link
                              to="#"
                              className="avatar avatar-sm border bg-white me-2"
                            >
                              <ImageWithBasePath
                                src="assets/img/icons/company-icon-05.svg"
                                className="w-auto h-auto"
                                alt="img"
                              />
                            </Link>
                            <div className="d-flex flex-column">
                              <span className="d-block">Customer</span>
                              <Link
                                to="#"
                                className="text-default"
                              >
                                Unconscionable
                              </Link>
                            </div>
                          </div>
                        </div>
                        <div className="d-flex justify-content-between pt-3 border-top">
                          <div>
                            <span className="badge badge-purple">
                              {" "}
                              <i className="ti ti-moneybag me-1" /> Value :
                              $2,04,214
                            </span>
                          </div>
                          <Link
                            to="#"
                            className="avatar avatar-xs bg-danger-light text-danger"
                          >
                            {" "}
                            <i className="ti ti-file-dots fs-12" />{" "}
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* /Contact Grid */}
                <div className="load-btn text-center pb-4">
                  <Link to="#" className="btn btn-primary">
                    Load More Contacts
                    <i className="ti ti-loader" />
                  </Link>
                </div>
                {/* /Card */}
              </div>
            </div>
          </div>
        </div>
        {/* /Page Wrapper */}
      </>
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
    </div>
  );
};

export default ContractsGrid;
