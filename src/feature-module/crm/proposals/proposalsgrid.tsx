import React, { useState } from "react";
import ImageWithBasePath from "../../../core/common/imageWithBasePath";
import CollapseHeader from "../../../core/common/collapse-header";
import DateRangePicker from "react-bootstrap-daterangepicker";

import { Link } from "react-router-dom";
import { TagsInput } from "react-tag-input-component";
import DefaultEditor from "react-simple-wysiwyg";
import Select from "react-select";
import DatePicker from "react-datepicker";
import {
  activeList,
  clientList,
  currency,
  dealsselectOption,
  editreleatdselectOption,
  initialSettings,
  newselectOption,
  priorityList,
  releatdselectOption,
} from "../../../core/common/selectoption/selectoption";
import { useDispatch, useSelector } from "react-redux";
import { setActivityTogglePopup, setActivityTogglePopupTwo } from "../../../core/data/redux/commonSlice";
import { all_routes } from "../../router/all_routes";

const Proposalsgrid = () => {
  const route = all_routes;
  const dispatch = useDispatch();
  const [owner, setOwner] = useState(["Tags","Tags","Tags"]);
  const activityToggle = useSelector(
    (state: any) => state?.activityTogglePopup
  );
  const activityToggleTwo = useSelector(
    (state: any) => state?.activityTogglePopupTwo
  );
  const [tag1, setTag1] = useState(["Tags"]);
  const [tag2, setTag2] = useState(["Tags"]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
  };
  const [selectedDate1, setSelectedDate1] = useState<Date | null>(new Date());
  const handleDateChange1 = (date: Date | null) => {
    setSelectedDate1(date);
  };
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
                  Proposals<span className="count-title">123</span>
                </h4>
              </div>
              <div className="col-4 text-end">
                <div className="head-icons">
                  <Link
                    to={route.ProposalsGrid}
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
                      placeholder="Search Proposals"
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
                      Add New Proposals
                    </Link>
                  </div>
                </div>
              </div>
              {/* /Search */}
            </div>
            <div className="card-body">
              {/* Filter */}
              <div className="d-flex align-items-center justify-content-between flex-wrap row-gap-2 mb-4">
                <div className="d-flex align-items-center flex-wrap row-gap-2">
                  <div className="sort-dropdown drop-down task-drops me-3">
                    <Link
                      to="#"
                      className="dropdown-toggle"
                      data-bs-toggle="dropdown"
                    >
                      All Proposals{" "}
                    </Link>
                    <div className="dropdown-menu  dropdown-menu-start">
                      <ul>
                        <li>
                          <Link to="#">
                            <i className="ti ti-dots-vertical" />
                            All Proposals
                          </Link>
                        </li>
                        <li>
                          <Link to="#">
                            <i className="ti ti-dots-vertical" />
                            Accepted
                          </Link>
                        </li>
                        <li>
                          <Link to="#">
                            <i className="ti ti-dots-vertical" />
                            Declined
                          </Link>
                        </li>
                        <li>
                          <Link to="#">
                            <i className="ti ti-dots-vertical" />
                            Draft
                          </Link>
                        </li>
                        <li>
                          <Link to="#">
                            <i className="ti ti-dots-vertical" />
                            Deleted
                          </Link>
                        </li>
                      </ul>
                    </div>
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
                  <div className="icon-form">
                    <span className="form-icon">
                      <i className="ti ti-calendar" />
                    </span>
                    <input
                      type="text"
                      className="form-control bookingrange"
                      placeholder=""
                    />
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
                        Please drag and drop your column to reorder your table
                        and enable see option as you want.
                      </p>
                      <div className="border-top pt-3">
                        <div className="d-flex align-items-center justify-content-between mb-3">
                          <p className="mb-0 d-flex align-items-center">
                            <i className="ti ti-grip-vertical me-2" />
                            Subject
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
                            Sent To
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
                            Total Value
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
                            <label htmlFor="col-tag" className="checktoggle" />
                          </div>
                        </div>
                        <div className="d-flex align-items-center justify-content-between mb-3">
                          <p className="mb-0 d-flex align-items-center">
                            <i className="ti ti-grip-vertical me-2" />
                            Open Till
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
                            Type
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
                            Project
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
                                  <li>
                                    <div className="filter-checks">
                                      <label className="checkboxs">
                                        <input type="checkbox" />
                                        <span className="checkmarks" />
                                        17 Sep 2024
                                      </label>
                                    </div>
                                  </li>
                                  <li>
                                    <div className="filter-checks">
                                      <label className="checkboxs">
                                        <input type="checkbox" />
                                        <span className="checkmarks" />
                                        18 May 2024
                                      </label>
                                    </div>
                                  </li>
                                  <li>
                                    <div className="filter-checks">
                                      <label className="checkboxs">
                                        <input type="checkbox" />
                                        <span className="checkmarks" />
                                        19 Aug 2024
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
                                  <li>
                                    <div className="filter-checks">
                                      <label className="checkboxs">
                                        <input type="checkbox" />
                                        <span className="checkmarks" />
                                        15 Nov 2024
                                      </label>
                                    </div>
                                  </li>
                                  <li>
                                    <div className="filter-checks">
                                      <label className="checkboxs">
                                        <input type="checkbox" />
                                        <span className="checkmarks" />
                                        15 Jun 2024
                                      </label>
                                    </div>
                                  </li>
                                  <li>
                                    <div className="filter-checks">
                                      <label className="checkboxs">
                                        <input type="checkbox" />
                                        <span className="checkmarks" />
                                        15 Oct 2024
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
                                  <li>
                                    <div className="filter-checks">
                                      <label className="checkboxs">
                                        <input type="checkbox" />
                                        <span className="checkmarks" />
                                        12 Mar 2024
                                      </label>
                                    </div>
                                  </li>
                                  <li>
                                    <div className="filter-checks">
                                      <label className="checkboxs">
                                        <input type="checkbox" />
                                        <span className="checkmarks" />
                                        15 Feb 2024
                                      </label>
                                    </div>
                                  </li>
                                  <li>
                                    <div className="filter-checks">
                                      <label className="checkboxs">
                                        <input type="checkbox" />
                                        <span className="checkmarks" />
                                        15 Jan 2024
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
                                to={route.ProposalsGrid}
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
                    <Link  to={route.ProposalsList}>
                      <i className="ti ti-list-tree" />
                    </Link>
                    <Link  to={route.ProposalsGrid} className="active">
                      <i className="ti ti-grid-dots" />
                    </Link>
                  </div>
                </div>
              </div>
              {/* /Filter */}
              {/* Proposal Grid */}
              <div className="row">
                <div className="col-xxl-3 col-xl-4 col-md-6">
                  <div className="card border">
                    <div className="card-body">
                      <div className="d-flex align-items-center justify-content-between border-bottom pb-3 mb-3">
                        <div className="flex-shrink-0">
                          <span className="badge badge-purple-light">
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
                              data-bs-target="#delete_proposals"
                            >
                              <i className="ti ti-trash text-danger" /> Delete
                            </Link>
                            <Link
                              className="dropdown-item"
                              to="#"
                            >
                              <i className="ti ti-clipboard-copy text-green" />{" "}
                              View Proposal
                            </Link>
                            <Link
                              className="dropdown-item"
                              to="#"
                            >
                              <i className="ti ti-checks text-success" /> Mark
                              As Accepted
                            </Link>
                            <Link
                              className="dropdown-item"
                              to="#"
                            >
                              <i className="ti ti-file text-tertiary" /> Mark as
                              Draft
                            </Link>
                            <Link
                              className="dropdown-item"
                              to="#"
                            >
                              <i className="ti ti-sticker text-blue" /> Mark ad
                              Declined
                            </Link>
                            <Link
                              className="dropdown-item"
                              to="#"
                            >
                              <i className="ti ti-subtask text-pink" /> Convert
                              to estimate
                            </Link>
                            <Link
                              className="dropdown-item"
                              to="#"
                            >
                              <i className="ti ti-file-invoice text-tertiary" />{" "}
                              Convert to Invoice
                            </Link>
                            <Link
                              className="dropdown-item"
                              to="#"
                            >
                              <i className="ti ti-printer text-info" /> Print
                            </Link>
                          </div>
                        </div>
                      </div>
                      <div className="d-block">
                        <div className="d-flex align-items-center justify-content-between mb-3">
                          <div>
                            <h4>SEO Proposal</h4>
                            <p>Project : Truelysell</p>
                          </div>
                          <div>
                            <span className="badge badge-success">
                              Accepted
                            </span>
                          </div>
                        </div>
                        <div className="mb-3">
                          <p className="d-flex align-items-center mb-2">
                            <span className="avatar avatar-xs border me-2 text-dark">
                              <i className="ti ti-moneybag fs-12" />
                            </span>
                            Total Value : $2,04,214
                          </p>
                          <p className="d-flex align-items-center mb-2">
                            <span className="avatar avatar-xs border me-2 text-dark">
                              <i className="ti ti-calendar-event fs-12" />
                            </span>
                            Date : 25 May 2024
                          </p>
                          <p className="d-flex align-items-center">
                            <span className="avatar avatar-xs border me-2 text-dark">
                              <i className="ti ti-calendar-stats fs-12" />
                            </span>
                            Open till : 31 Jun 2024
                          </p>
                        </div>
                      </div>
                      <div className="bg-light-400 rounded p-2">
                        <div className="d-flex align-items-center">
                          <Link
                            to="#"
                            className="avatar avatar-sm bg-white border me-2"
                          >
                            <ImageWithBasePath
                              src="assets/img/icons/company-icon-01.svg"
                              className="w-auto h-auto"
                              alt="img"
                            />
                          </Link>
                          <div className="d-flex flex-column">
                            <span className="d-block">Sent to</span>
                            <Link
                              to="#"
                              className="text-default"
                            >
                              NovaWave LLC
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xxl-3 col-xl-4 col-md-6">
                  <div className="card border">
                    <div className="card-body">
                      <div className="d-flex align-items-center justify-content-between border-bottom pb-3 mb-3">
                        <div className="flex-shrink-0">
                          <span className="badge badge-purple-light">
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
                              data-bs-target="#delete_proposals"
                            >
                              <i className="ti ti-trash text-danger" /> Delete
                            </Link>
                            <Link
                              className="dropdown-item"
                              to="#"
                            >
                              <i className="ti ti-clipboard-copy text-green" />{" "}
                              View Proposal
                            </Link>
                            <Link
                              className="dropdown-item"
                              to="#"
                            >
                              <i className="ti ti-checks text-success" /> Mark
                              As Accepted
                            </Link>
                            <Link
                              className="dropdown-item"
                              to="#"
                            >
                              <i className="ti ti-file text-tertiary" /> Mark as
                              Draft
                            </Link>
                            <Link
                              className="dropdown-item"
                              to="#"
                            >
                              <i className="ti ti-sticker text-blue" /> Mark ad
                              Declined
                            </Link>
                            <Link
                              className="dropdown-item"
                              to="#"
                            >
                              <i className="ti ti-subtask text-pink" /> Convert
                              to estimate
                            </Link>
                            <Link
                              className="dropdown-item"
                              to="#"
                            >
                              <i className="ti ti-file-invoice text-tertiary" />{" "}
                              Convert to Invoice
                            </Link>
                            <Link
                              className="dropdown-item"
                              to="#"
                            >
                              <i className="ti ti-printer text-info" /> Print
                            </Link>
                          </div>
                        </div>
                      </div>
                      <div className="d-block">
                        <div className="d-flex align-items-center justify-content-between mb-3">
                          <div>
                            <h4>SEO Proposal</h4>
                            <p>Project : Truelysell</p>
                          </div>
                          <div>
                            <span className="badge badge-danger">Deleted</span>
                          </div>
                        </div>
                        <div className="mb-3">
                          <p className="d-flex align-items-center mb-2">
                            <span className="avatar avatar-xs border me-2 text-dark">
                              <i className="ti ti-moneybag fs-12" />
                            </span>
                            Total Value : $2,04,214
                          </p>
                          <p className="d-flex align-items-center mb-2">
                            <span className="avatar avatar-xs border me-2 text-dark">
                              <i className="ti ti-calendar-event fs-12" />
                            </span>
                            Date : 25 May 2024
                          </p>
                          <p className="d-flex align-items-center">
                            <span className="avatar avatar-xs border me-2 text-dark">
                              <i className="ti ti-calendar-stats fs-12" />
                            </span>
                            Open till : 31 Jun 2024
                          </p>
                        </div>
                      </div>
                      <div className="bg-light-400 rounded p-2">
                        <div className="d-flex align-items-center">
                          <Link
                            to="#"
                            className="avatar avatar-sm bg-white border me-2"
                          >
                            <ImageWithBasePath
                              src="assets/img/icons/company-icon-02.svg"
                              className="w-auto h-auto"
                              alt="img"
                            />
                          </Link>
                          <div className="d-flex flex-column">
                            <span className="d-block">Sent to</span>
                            <Link
                              to="#"
                              className="text-default"
                            >
                              Redwood Inc
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xxl-3 col-xl-4 col-md-6">
                  <div className="card border">
                    <div className="card-body">
                      <div className="d-flex align-items-center justify-content-between border-bottom pb-3 mb-3">
                        <div className="flex-shrink-0">
                          <span className="badge badge-purple-light">
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
                              data-bs-target="#delete_proposals"
                            >
                              <i className="ti ti-trash text-danger" /> Delete
                            </Link>
                            <Link
                              className="dropdown-item"
                              to="#"
                            >
                              <i className="ti ti-clipboard-copy text-green" />{" "}
                              View Proposal
                            </Link>
                            <Link
                              className="dropdown-item"
                              to="#"
                            >
                              <i className="ti ti-checks text-success" /> Mark
                              As Accepted
                            </Link>
                            <Link
                              className="dropdown-item"
                              to="#"
                            >
                              <i className="ti ti-file text-tertiary" /> Mark as
                              Draft
                            </Link>
                            <Link
                              className="dropdown-item"
                              to="#"
                            >
                              <i className="ti ti-sticker text-blue" /> Mark ad
                              Declined
                            </Link>
                            <Link
                              className="dropdown-item"
                              to="#"
                            >
                              <i className="ti ti-subtask text-pink" /> Convert
                              to estimate
                            </Link>
                            <Link
                              className="dropdown-item"
                              to="#"
                            >
                              <i className="ti ti-file-invoice text-tertiary" />{" "}
                              Convert to Invoice
                            </Link>
                            <Link
                              className="dropdown-item"
                              to="#"
                            >
                              <i className="ti ti-printer text-info" /> Print
                            </Link>
                          </div>
                        </div>
                      </div>
                      <div className="d-block">
                        <div className="d-flex align-items-center justify-content-between mb-3">
                          <div>
                            <h4>SEO Proposal</h4>
                            <p>Project : Truelysell</p>
                          </div>
                          <div>
                            <span className="badge badge-pending">Draft</span>
                          </div>
                        </div>
                        <div className="mb-3">
                          <p className="d-flex align-items-center mb-2">
                            <span className="avatar avatar-xs border me-2 text-dark">
                              <i className="ti ti-moneybag fs-12" />
                            </span>
                            Total Value : $2,04,214
                          </p>
                          <p className="d-flex align-items-center mb-2">
                            <span className="avatar avatar-xs border me-2 text-dark">
                              <i className="ti ti-calendar-event fs-12" />
                            </span>
                            Date : 25 May 2024
                          </p>
                          <p className="d-flex align-items-center">
                            <span className="avatar avatar-xs border me-2 text-dark">
                              <i className="ti ti-calendar-stats fs-12" />
                            </span>
                            Open till : 31 Jun 2024
                          </p>
                        </div>
                      </div>
                      <div className="bg-light-400 rounded p-2">
                        <div className="d-flex align-items-center">
                          <Link
                            to="#"
                            className="avatar avatar-sm bg-white border me-2"
                          >
                            <ImageWithBasePath
                              src="assets/img/icons/company-icon-03.svg"
                              className="w-auto h-auto"
                              alt="img"
                            />
                          </Link>
                          <div className="d-flex flex-column">
                            <span className="d-block">Sent to</span>
                            <Link
                              to="#"
                              className="text-default"
                            >
                              HarborView
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xxl-3 col-xl-4 col-md-6">
                  <div className="card border">
                    <div className="card-body">
                      <div className="d-flex align-items-center justify-content-between border-bottom pb-3 mb-3">
                        <div className="flex-shrink-0">
                          <span className="badge badge-purple-light">
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
                              data-bs-target="#delete_proposals"
                            >
                              <i className="ti ti-trash text-danger" /> Delete
                            </Link>
                            <Link
                              className="dropdown-item"
                              to="#"
                            >
                              <i className="ti ti-clipboard-copy text-green" />{" "}
                              View Proposal
                            </Link>
                            <Link
                              className="dropdown-item"
                              to="#"
                            >
                              <i className="ti ti-checks text-success" /> Mark
                              As Accepted
                            </Link>
                            <Link
                              className="dropdown-item"
                              to="#"
                            >
                              <i className="ti ti-file text-tertiary" /> Mark as
                              Draft
                            </Link>
                            <Link
                              className="dropdown-item"
                              to="#"
                            >
                              <i className="ti ti-sticker text-blue" /> Mark ad
                              Declined
                            </Link>
                            <Link
                              className="dropdown-item"
                              to="#"
                            >
                              <i className="ti ti-subtask text-pink" /> Convert
                              to estimate
                            </Link>
                            <Link
                              className="dropdown-item"
                              to="#"
                            >
                              <i className="ti ti-file-invoice text-tertiary" />{" "}
                              Convert to Invoice
                            </Link>
                            <Link
                              className="dropdown-item"
                              to="#"
                            >
                              <i className="ti ti-printer text-info" /> Print
                            </Link>
                          </div>
                        </div>
                      </div>
                      <div className="d-block">
                        <div className="d-flex align-items-center justify-content-between mb-3">
                          <div>
                            <h4>SEO Proposal</h4>
                            <p>Project : Truelysell</p>
                          </div>
                          <div>
                            <span className="badge badge-warning">
                              Declined
                            </span>
                          </div>
                        </div>
                        <div className="mb-3">
                          <p className="d-flex align-items-center mb-2">
                            <span className="avatar avatar-xs border me-2 text-dark">
                              <i className="ti ti-moneybag fs-12" />
                            </span>
                            Total Value : $2,04,214
                          </p>
                          <p className="d-flex align-items-center mb-2">
                            <span className="avatar avatar-xs border me-2 text-dark">
                              <i className="ti ti-calendar-event fs-12" />
                            </span>
                            Date : 25 May 2024
                          </p>
                          <p className="d-flex align-items-center">
                            <span className="avatar avatar-xs border me-2 text-dark">
                              <i className="ti ti-calendar-stats fs-12" />
                            </span>
                            Open till : 31 Jun 2024
                          </p>
                        </div>
                      </div>
                      <div className="bg-light-400 rounded p-2">
                        <div className="d-flex align-items-center">
                          <Link
                            to="#"
                            className="avatar avatar-sm bg-white border me-2"
                          >
                            <ImageWithBasePath
                              src="assets/img/icons/company-icon-04.svg"
                              className="w-auto h-auto"
                              alt="img"
                            />
                          </Link>
                          <div className="d-flex flex-column">
                            <span className="d-block">Sent to</span>
                            <Link
                              to="#"
                              className="text-default"
                            >
                              CoastalStar Co.
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xxl-3 col-xl-4 col-md-6">
                  <div className="card border">
                    <div className="card-body">
                      <div className="d-flex align-items-center justify-content-between border-bottom pb-3 mb-3">
                        <div className="flex-shrink-0">
                          <span className="badge badge-purple-light">
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
                              data-bs-target="#delete_proposals"
                            >
                              <i className="ti ti-trash text-danger" /> Delete
                            </Link>
                            <Link
                              className="dropdown-item"
                              to="#"
                            >
                              <i className="ti ti-clipboard-copy text-green" />{" "}
                              View Proposal
                            </Link>
                            <Link
                              className="dropdown-item"
                              to="#"
                            >
                              <i className="ti ti-checks text-success" /> Mark
                              As Accepted
                            </Link>
                            <Link
                              className="dropdown-item"
                              to="#"
                            >
                              <i className="ti ti-file text-tertiary" /> Mark as
                              Draft
                            </Link>
                            <Link
                              className="dropdown-item"
                              to="#"
                            >
                              <i className="ti ti-sticker text-blue" /> Mark ad
                              Declined
                            </Link>
                            <Link
                              className="dropdown-item"
                              to="#"
                            >
                              <i className="ti ti-subtask text-pink" /> Convert
                              to estimate
                            </Link>
                            <Link
                              className="dropdown-item"
                              to="#"
                            >
                              <i className="ti ti-file-invoice text-tertiary" />{" "}
                              Convert to Invoice
                            </Link>
                            <Link
                              className="dropdown-item"
                              to="#"
                            >
                              <i className="ti ti-printer text-info" /> Print
                            </Link>
                          </div>
                        </div>
                      </div>
                      <div className="d-block">
                        <div className="d-flex align-items-center justify-content-between mb-3">
                          <div>
                            <h4>SEO Proposal</h4>
                            <p>Project : Truelysell</p>
                          </div>
                          <div>
                            <span className="badge badge-warning">
                              Declined
                            </span>
                          </div>
                        </div>
                        <div className="mb-3">
                          <p className="d-flex align-items-center mb-2">
                            <span className="avatar avatar-xs border me-2 text-dark">
                              <i className="ti ti-moneybag fs-12" />
                            </span>
                            Total Value : $2,04,214
                          </p>
                          <p className="d-flex align-items-center mb-2">
                            <span className="avatar avatar-xs border me-2 text-dark">
                              <i className="ti ti-calendar-event fs-12" />
                            </span>
                            Date : 25 May 2024
                          </p>
                          <p className="d-flex align-items-center">
                            <span className="avatar avatar-xs border me-2 text-dark">
                              <i className="ti ti-calendar-stats fs-12" />
                            </span>
                            Open till : 31 Jun 2024
                          </p>
                        </div>
                      </div>
                      <div className="bg-light-400 rounded p-2">
                        <div className="d-flex align-items-center">
                          <Link
                            to="#"
                            className="avatar avatar-sm bg-white border me-2"
                          >
                            <ImageWithBasePath
                              src="assets/img/icons/company-icon-05.svg"
                              className="w-auto h-auto"
                              alt="img"
                            />
                          </Link>
                          <div className="d-flex flex-column">
                            <span className="d-block">Sent to</span>
                            <Link
                              to="#"
                              className="text-default"
                            >
                              Summit Peak
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xxl-3 col-xl-4 col-md-6">
                  <div className="card border">
                    <div className="card-body">
                      <div className="d-flex align-items-center justify-content-between border-bottom pb-3 mb-3">
                        <div className="flex-shrink-0">
                          <span className="badge badge-purple-light">
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
                              data-bs-target="#delete_proposals"
                            >
                              <i className="ti ti-trash text-danger" /> Delete
                            </Link>
                            <Link
                              className="dropdown-item"
                              to="#"
                            >
                              <i className="ti ti-clipboard-copy text-green" />{" "}
                              View Proposal
                            </Link>
                            <Link
                              className="dropdown-item"
                              to="#"
                            >
                              <i className="ti ti-checks text-success" /> Mark
                              As Accepted
                            </Link>
                            <Link
                              className="dropdown-item"
                              to="#"
                            >
                              <i className="ti ti-file text-tertiary" /> Mark as
                              Draft
                            </Link>
                            <Link
                              className="dropdown-item"
                              to="#"
                            >
                              <i className="ti ti-sticker text-blue" /> Mark ad
                              Declined
                            </Link>
                            <Link
                              className="dropdown-item"
                              to="#"
                            >
                              <i className="ti ti-subtask text-pink" /> Convert
                              to estimate
                            </Link>
                            <Link
                              className="dropdown-item"
                              to="#"
                            >
                              <i className="ti ti-file-invoice text-tertiary" />{" "}
                              Convert to Invoice
                            </Link>
                            <Link
                              className="dropdown-item"
                              to="#"
                            >
                              <i className="ti ti-printer text-info" /> Print
                            </Link>
                          </div>
                        </div>
                      </div>
                      <div className="d-block">
                        <div className="d-flex align-items-center justify-content-between mb-3">
                          <div>
                            <h4>SEO Proposal</h4>
                            <p>Project : Truelysell</p>
                          </div>
                          <div>
                            <span className="badge badge-tertiary">Sent</span>
                          </div>
                        </div>
                        <div className="mb-3">
                          <p className="d-flex align-items-center mb-2">
                            <span className="avatar avatar-xs border me-2 text-dark">
                              <i className="ti ti-moneybag fs-12" />
                            </span>
                            Total Value : $2,04,214
                          </p>
                          <p className="d-flex align-items-center mb-2">
                            <span className="avatar avatar-xs border me-2 text-dark">
                              <i className="ti ti-calendar-event fs-12" />
                            </span>
                            Date : 25 May 2024
                          </p>
                          <p className="d-flex align-items-center">
                            <span className="avatar avatar-xs border me-2 text-dark">
                              <i className="ti ti-calendar-stats fs-12" />
                            </span>
                            Open till : 31 Jun 2024
                          </p>
                        </div>
                      </div>
                      <div className="bg-light-400 rounded p-2">
                        <div className="d-flex align-items-center">
                          <Link
                            to="#"
                            className="avatar avatar-sm bg-white border me-2"
                          >
                            <ImageWithBasePath
                              src="assets/img/icons/company-icon-07.svg"
                              className="w-auto h-auto"
                              alt="img"
                            />
                          </Link>
                          <div className="d-flex flex-column">
                            <span className="d-block">Sent to</span>
                            <Link
                              to="#"
                              className="text-default"
                            >
                              Silver Hawk
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xxl-3 col-xl-4 col-md-6">
                  <div className="card border">
                    <div className="card-body">
                      <div className="d-flex align-items-center justify-content-between border-bottom pb-3 mb-3">
                        <div className="flex-shrink-0">
                          <span className="badge badge-purple-light">
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
                              data-bs-target="#delete_proposals"
                            >
                              <i className="ti ti-trash text-danger" /> Delete
                            </Link>
                            <Link
                              className="dropdown-item"
                              to="#"
                            >
                              <i className="ti ti-clipboard-copy text-green" />{" "}
                              View Proposal
                            </Link>
                            <Link
                              className="dropdown-item"
                              to="#"
                            >
                              <i className="ti ti-checks text-success" /> Mark
                              As Accepted
                            </Link>
                            <Link
                              className="dropdown-item"
                              to="#"
                            >
                              <i className="ti ti-file text-tertiary" /> Mark as
                              Draft
                            </Link>
                            <Link
                              className="dropdown-item"
                              to="#"
                            >
                              <i className="ti ti-sticker text-blue" /> Mark ad
                              Declined
                            </Link>
                            <Link
                              className="dropdown-item"
                              to="#"
                            >
                              <i className="ti ti-subtask text-pink" /> Convert
                              to estimate
                            </Link>
                            <Link
                              className="dropdown-item"
                              to="#"
                            >
                              <i className="ti ti-file-invoice text-tertiary" />{" "}
                              Convert to Invoice
                            </Link>
                            <Link
                              className="dropdown-item"
                              to="#"
                            >
                              <i className="ti ti-printer text-info" /> Print
                            </Link>
                          </div>
                        </div>
                      </div>
                      <div className="d-block">
                        <div className="d-flex align-items-center justify-content-between mb-3">
                          <div>
                            <h4>SEO Proposal</h4>
                            <p>Project : Truelysell</p>
                          </div>
                          <div>
                            <span className="badge badge-danger">Deleted</span>
                          </div>
                        </div>
                        <div className="mb-3">
                          <p className="d-flex align-items-center mb-2">
                            <span className="avatar avatar-xs border me-2 text-dark">
                              <i className="ti ti-moneybag fs-12" />
                            </span>
                            Total Value : $2,04,214
                          </p>
                          <p className="d-flex align-items-center mb-2">
                            <span className="avatar avatar-xs border me-2 text-dark">
                              <i className="ti ti-calendar-event fs-12" />
                            </span>
                            Date : 25 May 2024
                          </p>
                          <p className="d-flex align-items-center">
                            <span className="avatar avatar-xs border me-2 text-dark">
                              <i className="ti ti-calendar-stats fs-12" />
                            </span>
                            Open till : 31 Jun 2024
                          </p>
                        </div>
                      </div>
                      <div className="bg-light-400 rounded p-2">
                        <div className="d-flex align-items-center">
                          <Link
                            to="#"
                            className="avatar avatar-sm bg-white border me-2"
                          >
                            <ImageWithBasePath
                              src="assets/img/icons/company-icon-06.svg"
                              className="w-auto h-auto"
                              alt="img"
                            />
                          </Link>
                          <div className="d-flex flex-column">
                            <span className="d-block">Sent to</span>
                            <Link
                              to="#"
                              className="text-default"
                            >
                              BlueSky Industries
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xxl-3 col-xl-4 col-md-6">
                  <div className="card border">
                    <div className="card-body">
                      <div className="d-flex align-items-center justify-content-between border-bottom pb-3 mb-3">
                        <div className="flex-shrink-0">
                          <span className="badge badge-purple-light">
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
                              data-bs-target="#delete_proposals"
                            >
                              <i className="ti ti-trash text-danger" /> Delete
                            </Link>
                            <Link
                              className="dropdown-item"
                              to="#"
                            >
                              <i className="ti ti-clipboard-copy text-green" />{" "}
                              View Proposal
                            </Link>
                            <Link
                              className="dropdown-item"
                              to="#"
                            >
                              <i className="ti ti-checks text-success" /> Mark
                              As Accepted
                            </Link>
                            <Link
                              className="dropdown-item"
                              to="#"
                            >
                              <i className="ti ti-file text-tertiary" /> Mark as
                              Draft
                            </Link>
                            <Link
                              className="dropdown-item"
                              to="#"
                            >
                              <i className="ti ti-sticker text-blue" /> Mark ad
                              Declined
                            </Link>
                            <Link
                              className="dropdown-item"
                              to="#"
                            >
                              <i className="ti ti-subtask text-pink" /> Convert
                              to estimate
                            </Link>
                            <Link
                              className="dropdown-item"
                              to="#"
                            >
                              <i className="ti ti-file-invoice text-tertiary" />{" "}
                              Convert to Invoice
                            </Link>
                            <Link
                              className="dropdown-item"
                              to="#"
                            >
                              <i className="ti ti-printer text-info" /> Print
                            </Link>
                          </div>
                        </div>
                      </div>
                      <div className="d-block">
                        <div className="d-flex align-items-center justify-content-between mb-3">
                          <div>
                            <h4>SEO Proposal</h4>
                            <p>Project : Truelysell</p>
                          </div>
                          <div>
                            <span className="badge badge-pending">Draft</span>
                          </div>
                        </div>
                        <div className="mb-3">
                          <p className="d-flex align-items-center mb-2">
                            <span className="avatar avatar-xs border me-2 text-dark">
                              <i className="ti ti-moneybag fs-12" />
                            </span>
                            Total Value : $2,04,214
                          </p>
                          <p className="d-flex align-items-center mb-2">
                            <span className="avatar avatar-xs border me-2 text-dark">
                              <i className="ti ti-calendar-event fs-12" />
                            </span>
                            Date : 25 May 2024
                          </p>
                          <p className="d-flex align-items-center">
                            <span className="avatar avatar-xs border me-2 text-dark">
                              <i className="ti ti-calendar-stats fs-12" />
                            </span>
                            Open till : 31 Jun 2024
                          </p>
                        </div>
                      </div>
                      <div className="bg-light-400 rounded p-2">
                        <div className="d-flex align-items-center">
                          <Link
                            to="#"
                            className="avatar avatar-sm bg-white border me-2"
                          >
                            <ImageWithBasePath
                              src="assets/img/icons/company-icon-08.svg"
                              className="w-auto h-auto"
                              alt="img"
                            />
                          </Link>
                          <div className="d-flex flex-column">
                            <span className="d-block">Sent to</span>
                            <Link
                              to="#"
                              className="text-default"
                            >
                              NovaWave LLC
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* /Proposal Grid */}
              <div className="load-btn text-center">
                <Link to="#" className="btn btn-primary">
                  Load More Contacts
                  <i className="ti ti-loader" />
                </Link>
              </div>
            </div>
          </div>
          {/* /Card */}
        </div>
      </div>
    </div>
  </div>
  {/* /Page Wrapper */}
</>
{/* Add New Proposal */}
<div
    className="offcanvas offcanvas-end offcanvas-large"
    tabIndex={-1}
    id="offcanvas_add"
  >
    <div className="offcanvas-header border-bottom">
      <h4>Add New Proposal</h4>
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
                  Date<span className="text-danger"> *</span>
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
                  Open Till <span className="text-danger">*</span>
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
            <div className="col-md-12">
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
            <div className="col-md-12">
              <div className="mb-3">
                <div className="d-flex align-items-center justify-content-between">
                  <label className="col-form-label">
                    Project<span className="text-danger">*</span>
                  </label>
                  <Link
                    to="#"
                    className="label-add "
                    data-bs-toggle="modal"
                    data-bs-target="#add_project"
                  >
                    <i className="ti ti-square-rounded-plus" />
                    Add New
                  </Link>
                </div>
                <Select
                          options={newselectOption}
                          className="select"
                          placeholder="Select"
                          classNamePrefix="react-select"
                        />
              </div>
            </div>
            <div className="col-md-12">
              <div className="mb-3">
                <label className="col-form-label">
                  Related to <span className="text-danger">*</span>
                </label>
                <Select
                          options={releatdselectOption}
                          className="select"
                          placeholder="Select"
                          classNamePrefix="react-select"
                        />
              </div>
            </div>
            <div className="col-md-12">
              <div className="mb-3">
                <div className="d-flex align-items-center justify-content-between">
                  <label className="col-form-label">
                    Deals<span className="text-danger">*</span>
                  </label>
                  <Link
                    to="#"
                    className="label-add "
                    data-bs-toggle="modal"
                    data-bs-target="#add_deal"
                  >
                    <i className="ti ti-square-rounded-plus" />
                    Add New
                  </Link>
                </div>
                <Select
                          options={releatdselectOption}
                          className="select"
                          placeholder="Select"
                          classNamePrefix="react-select"
                        />
              </div>
            </div>
            <div className="col-md-6">
              <div className="mb-3">
                <label className="col-form-label">Currency</label>
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
                <label className="col-form-label">
                  Status <span className="text-danger">*</span>
                </label>
                <Select
                          options={activeList}
                          className="select"
                          placeholder="Select"
                          classNamePrefix="react-select"
                        />
              </div>
            </div>
            <div className="col-md-12">
              <div className="mb-3">
                <label className="col-form-label">
                  Assigned to <span className="text-danger">*</span>
                </label>
                <Select
                          options={activeList}
                          className="select"
                          placeholder="Select"
                          classNamePrefix="react-select"
                        />
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
                <label className="col-form-label">Tags </label>
                <TagsInput
                          value={tag1}
                          onChange={setTag1}
                          name="tag1"
                        />
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
  {/* /Add New Proposal */}
  {/* Edit Proposal */}
  <div
    className="offcanvas offcanvas-end offcanvas-large"
    tabIndex={-1}
    id="offcanvas_edit"
  >
    <div className="offcanvas-header border-bottom">
      <h4>Edit Proposal</h4>
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
                <input
                  type="text"
                  className="form-control"
                  defaultValue="Web design Proposal"
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="mb-3">
                <label className="col-form-label">
                  Date<span className="text-danger"> *</span>
                </label>
                <div className="icon-form">
                  <span className="form-icon">
                    <i className="ti ti-calendar-event" />
                  </span>
                  <input
                    type="text"
                    className="form-control datetimepicker"
                    placeholder="DD/MM/YY"
                    defaultValue="11-06-2024"
                  />
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="mb-3">
                <label className="col-form-label">
                  Open Till <span className="text-danger">*</span>
                </label>
                <div className="icon-form">
                  <span className="form-icon">
                    <i className="ti ti-calendar-event" />
                  </span>
                  <input
                    type="text"
                    className="form-control datetimepicker"
                    placeholder="DD/MM/YY"
                    defaultValue="14-06-2024"
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
                          options={clientList}
                          className="select"
                          placeholder="HarborView"
                          classNamePrefix="react-select"
                        />
              </div>
            </div>
            <div className="col-md-12">
              <div className="mb-3">
                <div className="d-flex align-items-center justify-content-between">
                  <label className="col-form-label">
                    Project<span className="text-danger">*</span>
                  </label>
                  <Link
                    to="#"
                    className="label-add "
                    data-bs-toggle="modal"
                    data-bs-target="#add_project"
                  >
                    <i className="ti ti-square-rounded-plus" />
                    Add New
                  </Link>
                </div>
                <Select
                          options={newselectOption}
                          className="select"
                          placeholder="Truelysell"
                          classNamePrefix="react-select"
                        />
              </div>
            </div>
            <div className="col-md-12">
              <div className="mb-3">
                <label className="col-form-label">
                  Related to <span className="text-danger">*</span>
                </label>
                <Select
                          options={editreleatdselectOption}
                          className="select"
                          placeholder="Deals"
                          classNamePrefix="react-select"
                        />
              </div>
            </div>
            <div className="col-md-12">
              <div className="mb-3">
                <div className="d-flex align-items-center justify-content-between">
                  <label className="col-form-label">
                    Deals<span className="text-danger">*</span>
                  </label>
                  <Link
                    to="#"
                    className="label-add "
                    data-bs-toggle="modal"
                    data-bs-target="#add_deal"
                  >
                    <i className="ti ti-square-rounded-plus" />
                    Add New
                  </Link>
                </div>
                <Select
                          options={dealsselectOption}
                          className="select"
                          placeholder="Collins"
                          classNamePrefix="react-select"
                        />
              </div>
            </div>
            <div className="col-md-6">
              <div className="mb-3">
                <label className="col-form-label">Currency</label>
                <Select
                          options={currency}
                          className="select"
                          placeholder="$"
                          classNamePrefix="react-select"
                        />
              </div>
            </div>
            <div className="col-md-6">
              <div className="mb-3">
                <label className="col-form-label">
                  Status <span className="text-danger">*</span>
                </label>
                <Select
                          options={activeList}
                          className="select"
                          placeholder="Open"
                          classNamePrefix="react-select"
                        />
              </div>
            </div>
            <div className="col-md-12">
              <div className="mb-3">
                <label className="col-form-label">
                  Assigned to <span className="text-danger">*</span>
                </label>
                <Select
                          options={activeList}
                          className="select"
                          placeholder="Open"
                          classNamePrefix="react-select"
                        />
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
                <label className="col-form-label">Tags </label>
                <TagsInput
                          value={tag2}
                          onChange={setTag2}
                          name="tag2"
                        />
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
  {/* /Edit Proposal */}
  {/* Delete Proposals */}
  <div className="modal fade" id="delete_proposals" role="dialog">
    <div className="modal-dialog modal-dialog-centered">
      <div className="modal-content">
        <div className="modal-body">
          <div className="text-center">
            <div className="avatar avatar-xl bg-danger-light rounded-circle mb-3">
              <i className="ti ti-trash-x fs-36 text-danger" />
            </div>
            <h4 className="mb-2">Remove Proposal?</h4>
            <p className="mb-0">
              Are you sure you want to remove <br /> proposal you selected.
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
  {/* /Delete Proposals */}
  {/* Create Proposal */}
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
              <i className="ti ti-atom-2" />
            </div>
            <h3>Proposals Created Successfully!!!</h3>
            <p>View the details of proposals, created</p>
          </div>
        </div>
      </div>
    </div>
  </div>
  {/* /Create Proposal */}
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
          <form>
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
  {/* Add New View */}
  <div className="modal custom-modal fade" id="add_deal" role="dialog">
    <div className="modal-dialog modal-dialog-centered">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">Add New Deal</h5>
          <button
            className="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          >
            <i className="ti ti-x" />
          </button>
        </div>
        <div className="modal-body">
          <form action="#">
            <div className="mb-3">
              <label className="col-form-label">Deal Name</label>
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
  {/* Add New View */}
  <div className="modal custom-modal fade" id="add_project" role="dialog">
    <div className="modal-dialog modal-dialog-centered">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">Add New Project</h5>
          <button
            className="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          >
            <i className="ti ti-x" />
          </button>
        </div>
        <div className="modal-body">
          <form action="#">
            <div className="mb-3">
              <label className="col-form-label">Project Name</label>
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

export default Proposalsgrid;
