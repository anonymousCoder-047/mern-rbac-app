import React, { useState } from "react";
import { Link } from "react-router-dom";
import { all_routes } from "../../router/all_routes";
import ImageWithBasePath from "../../../core/common/imageWithBasePath";
import DateRangePicker from "react-bootstrap-daterangepicker";
import {
  duration,
  initialSettings,
  languageOptions,
  optionssymbol,
  priorityList,
  project,
  salestypelist,
  socialMedia,
  status,
  tagInputValues,
} from "../../../core/common/selectoption/selectoption";
import { useDispatch, useSelector } from "react-redux";
import { TagsInput } from "react-tag-input-component";
import Select from "react-select";
import {
  setActivityTogglePopup,
  setActivityTogglePopupTwo,
  setAddTogglePopupTwo,
} from "../../../core/data/redux/commonSlice";
import DefaultEditor from "react-simple-wysiwyg";
import DatePicker from "react-datepicker";
import CollapseHeader from "../../../core/common/collapse-header";
import { SelectWithImage2 } from "../../../core/common/selectWithImage2";
import { SelectWithImage } from "../../../core/common/selectWithImage";
import { Modal } from "react-bootstrap";

const CompaniesGrid = () => {
  const route = all_routes;
  const [openModal, setOpenModal] = useState(false);
  const [openModal2, setOpenModal2] = useState(false);
  const dispatch = useDispatch();
  const [owner, setOwner] = useState(["Collab"]);

  const activityToggle = useSelector(
    (state: any) => state?.activityTogglePopup
  );
  const activityToggleTwo = useSelector(
    (state: any) => state?.activityTogglePopupTwo
  );
  const addTogglePopupTwo = useSelector(
    (state: any) => state?.addTogglePopupTwo
  );

  const dealsopen = [
    { value: "choose", label: "Choose" },
    { value: "collins", label: "Collins" },
    { value: "konopelski", label: "Konopelski" },
    { value: "adams", label: "Adams" },
    { value: "schumm", label: "Schumm" },
    { value: "wisozk", label: "Wisozk" },
  ];
  const activities = [
    { value: "choose", label: "Choose" },
    { value: "phoneCalls", label: "Phone Calls" },
    { value: "socialMedia", label: "Social Media" },
    { value: "referralSites", label: "Referral Sites" },
    { value: "webAnalytics", label: "Web Analytics" },
    { value: "previousPurchases", label: "Previous Purchases" },
  ];
  const industries = [
    { value: "choose", label: "Choose" },
    { value: "Retail Industry", label: "Retail Industry" },
    { value: "Banking", label: "Banking" },
    { value: "Hotels", label: "Hotels" },
    { value: "Financial Services", label: "Financial Services" },
    { value: "Insurance", label: "Insurance" },
  ];
  const languages = [
    { value: "Choose", label: "Choose" },
    { value: "English", label: "English" },
    { value: "Arabic", label: "Arabic" },
    { value: "Chinese", label: "Chinese" },
    { value: "Hindi", label: "Hindi" },
  ];
  const countries = [
    { value: "Choose", label: "Choose" },
    { value: "India", label: "India" },
    { value: "USA", label: "USA" },
    { value: "France", label: "France" },
    { value: "UAE", label: "UAE" },
  ];
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
  };
  const [selectedDate1, setSelectedDate1] = useState<Date | null>(new Date());
  const handleDateChange1 = (date: Date | null) => {
    setSelectedDate1(date);
  };
  return (
    <>
    <div className="page-wrapper">
      <div className="content">
        <div className="row">
          <div className="col-md-12">
            {/* Page Header */}
            <div className="page-header">
              <div className="row align-items-center">
                <div className="col-8">
                  <h4 className="page-title">
                    Companies<span className="count-title">123</span>
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
            <div className="card ">
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
                        placeholder="Search Companies"
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
                        Add Company
                      </Link>
                    </div>
                  </div>
                </div>
                {/* /Search */}
              </div>

              <div className="card-body">
                {/* Search */}

                {/* /Search */}
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
                              Tags
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
                              Location
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
                              Rating
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
                              Owner
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
                                  Country
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
                                          <input type="checkbox" />
                                          <span className="checkmarks" />
                                          India
                                        </label>
                                      </div>
                                    </li>
                                    <li>
                                      <div className="filter-checks">
                                        <label className="checkboxs">
                                          <input type="checkbox" />
                                          <span className="checkmarks" />
                                          USA
                                        </label>
                                      </div>
                                    </li>
                                    <li>
                                      <div className="filter-checks">
                                        <label className="checkboxs">
                                          <input type="checkbox" />
                                          <span className="checkmarks" />
                                          France
                                        </label>
                                      </div>
                                    </li>
                                    <li>
                                      <div className="filter-checks">
                                        <label className="checkboxs">
                                          <input type="checkbox" />
                                          <span className="checkmarks" />
                                          United Kingdom
                                        </label>
                                      </div>
                                    </li>
                                    <li>
                                      <div className="filter-checks">
                                        <label className="checkboxs">
                                          <input type="checkbox" />
                                          <span className="checkmarks" />
                                          UAE
                                        </label>
                                      </div>
                                    </li>
                                    <li>
                                      <div className="filter-checks">
                                        <label className="checkboxs">
                                          <input type="checkbox" />
                                          <span className="checkmarks" />
                                          Italy
                                        </label>
                                      </div>
                                    </li>
                                    <li>
                                      <div className="filter-checks">
                                        <label className="checkboxs">
                                          <input type="checkbox" />
                                          <span className="checkmarks" />
                                          Japan
                                        </label>
                                      </div>
                                    </li>
                                    <li>
                                      <div className="filter-checks">
                                        <label className="checkboxs">
                                          <input type="checkbox" />
                                          <span className="checkmarks" />
                                          Germany
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
                                          <input
                                            type="checkbox"
                                            defaultChecked
                                          />
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
                                          <input
                                            type="checkbox"
                                            defaultChecked
                                          />
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
                    <div className="view-icons">
                      <Link to={route.companies}>
                        <i className="ti ti-list-tree" />
                      </Link>
                      <Link to={route.companiesGrid} className="active">
                        <i className="ti ti-grid-dots" />
                      </Link>
                    </div>
                  </div>
                </div>

                {/* /Filter */}
                <>
  {/* Company Grid */}
  <div className="row">
    <div className="col-xxl-3 col-xl-4 col-md-6">
      <div className="card border">
        <div className="card-body">
          <div className="d-flex align-items-center justify-content-between flex-wrap row-gap-2 mb-3">
            <div className="d-flex align-items-center">
              <Link
                to={route.companyDetails}
                className="avatar avatar-lg border rounded flex-shrink-0 me-2"
              >
                <ImageWithBasePath
                  src="assets/img/icons/company-icon-01.svg"
                  className="w-auto h-auto"
                  alt="img"
                />
              </Link>
              <div>
                <h6>
                  <Link to={route.companyDetails} className="fw-medium">
                    NovaWave LLC
                  </Link>
                </h6>
                <div className="set-star text-default">
                  <i className="fa fa-star filled me-1" />
                  4.2
                </div>
              </div>
            </div>
            <div className="dropdown table-action">
              <Link
                to="#"
                className="action-icon"
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
                  data-bs-target="#delete_contact"
                >
                  <i className="ti ti-trash text-danger" /> Delete
                </Link>
                <Link className="dropdown-item" to={route.companyDetails}>
                  <i className="ti ti-eye text-blue-light" /> Preview
                </Link>
              </div>
            </div>
          </div>
          <div className="d-block">
            <div className="d-flex flex-column mb-3">
              <p className="text-default d-inline-flex align-items-center mb-2">
                <i className="ti ti-mail text-dark me-1" />
                robertson@example.com
              </p>
              <p className="text-default d-inline-flex align-items-center mb-2">
                <i className="ti ti-phone text-dark me-1" />
                +1 875455453
              </p>
              <p className="text-default d-inline-flex align-items-center">
                <i className="ti ti-map-pin-pin text-dark me-1" />
                Germany
              </p>
            </div>
            <div className="d-flex align-items-center">
              <span className="badge badge-tag badge-success-light me-2">
                Collab
              </span>
              <span className="badge badge-tag badge-warning-light">Rated</span>
            </div>
          </div>
          <div className="d-flex justify-content-between align-items-center flex-wrap row-gap-2 border-top pt-3 mt-3">
            <div className="avatar-list-stacked avatar-group-xs">
              <span className="avatar border-0">
                <ImageWithBasePath
                  src="assets/img/profiles/avatar-01.jpg"
                  className="rounded-circle"
                  alt="img"
                />
              </span>
              <span className="avatar border-0">
                <ImageWithBasePath
                  src="assets/img/profiles/avatar-02.jpg"
                  className="rounded-circle"
                  alt="img"
                />
              </span>
              <span className="avatar border-0">
                <ImageWithBasePath
                  src="assets/img/profiles/avatar-03.jpg"
                  className="rounded-circle"
                  alt="img"
                />
              </span>
              <span className="avatar border-0">
                <ImageWithBasePath
                  src="assets/img/profiles/avatar-04.jpg"
                  className="rounded-circle"
                  alt="img"
                />
              </span>
            </div>
            <div className="d-flex align-items-center grid-social-links">
              <Link
                to="#"
                className="avatar avatar-xs text-dark rounded-circle me-1"
              >
                <i className="ti ti-mail fs-14" />
              </Link>
              <Link
                to="#"
                className="avatar avatar-xs text-dark rounded-circle me-1"
              >
                <i className="ti ti-phone-check fs-14" />
              </Link>
              <Link
                to="#"
                className="avatar avatar-xs text-dark rounded-circle me-1"
              >
                <i className="ti ti-message-circle-share fs-14" />
              </Link>
              <Link
                to="#"
                className="avatar avatar-xs text-dark rounded-circle me-1"
              >
                <i className="ti ti-brand-skype fs-14" />
              </Link>
              <Link to="#" className="avatar avatar-xs text-dark rounded-circle">
                <i className="ti ti-brand-facebook fs-14" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="col-xxl-3 col-xl-4 col-md-6">
      <div className="card border">
        <div className="card-body">
          <div className="d-flex align-items-center justify-content-between flex-wrap row-gap-2 mb-3">
            <div className="d-flex align-items-center">
              <Link
                to={route.companyDetails}
                className="avatar avatar-lg border rounded flex-shrink-0 me-2"
              >
                <ImageWithBasePath
                  src="assets/img/icons/company-icon-02.svg"
                  className="w-auto h-auto"
                  alt="img"
                />
              </Link>
              <div>
                <h6>
                  <Link to={route.companyDetails} className="fw-medium">
                    BlueSky Industries
                  </Link>
                </h6>
                <div className="set-star text-default">
                  <i className="fa fa-star filled me-1" />
                  5.0
                </div>
              </div>
            </div>
            <div className="dropdown table-action">
              <Link
                to="#"
                className="action-icon"
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
                  data-bs-target="#delete_contact"
                >
                  <i className="ti ti-trash text-danger" /> Delete
                </Link>
                <Link className="dropdown-item" to={route.companyDetails}>
                  <i className="ti ti-eye text-blue-light" /> Preview
                </Link>
              </div>
            </div>
          </div>
          <div className="d-block">
            <div className="d-flex flex-column mb-3">
              <p className="text-default d-inline-flex align-items-center mb-2">
                <i className="ti ti-mail text-dark me-1" />
                sharon@example.com
              </p>
              <p className="text-default d-inline-flex align-items-center mb-2">
                <i className="ti ti-phone text-dark me-1" />
                +1 989757485
              </p>
              <p className="text-default d-inline-flex align-items-center">
                <i className="ti ti-map-pin-pin text-dark me-1" />
                USA
              </p>
            </div>
            <div className="d-flex align-items-center">
              <span className="badge badge-tag badge-success-light me-2">
                Collab
              </span>
              <span className="badge badge-tag badge-warning-light">Rated</span>
            </div>
          </div>
          <div className="d-flex justify-content-between align-items-center flex-wrap row-gap-2 border-top pt-3 mt-3">
            <div className="avatar-list-stacked avatar-group-xs">
              <span className="avatar border-0">
                <ImageWithBasePath
                  src="assets/img/profiles/avatar-01.jpg"
                  className="rounded-circle"
                  alt="img"
                />
              </span>
              <span className="avatar border-0">
                <ImageWithBasePath
                  src="assets/img/profiles/avatar-02.jpg"
                  className="rounded-circle"
                  alt="img"
                />
              </span>
              <span className="avatar border-0">
                <ImageWithBasePath
                  src="assets/img/profiles/avatar-03.jpg"
                  className="rounded-circle"
                  alt="img"
                />
              </span>
              <span className="avatar border-0">
                <ImageWithBasePath
                  src="assets/img/profiles/avatar-04.jpg"
                  className="rounded-circle"
                  alt="img"
                />
              </span>
            </div>
            <div className="d-flex align-items-center grid-social-links">
              <Link
                to="#"
                className="avatar avatar-xs text-dark rounded-circle me-1"
              >
                <i className="ti ti-mail fs-14" />
              </Link>
              <Link
                to="#"
                className="avatar avatar-xs text-dark rounded-circle me-1"
              >
                <i className="ti ti-phone-check fs-14" />
              </Link>
              <Link
                to="#"
                className="avatar avatar-xs text-dark rounded-circle me-1"
              >
                <i className="ti ti-message-circle-share fs-14" />
              </Link>
              <Link
                to="#"
                className="avatar avatar-xs text-dark rounded-circle me-1"
              >
                <i className="ti ti-brand-skype fs-14" />
              </Link>
              <Link to="#" className="avatar avatar-xs text-dark rounded-circle">
                <i className="ti ti-brand-facebook fs-14" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="col-xxl-3 col-xl-4 col-md-6">
      <div className="card border">
        <div className="card-body">
          <div className="d-flex align-items-center justify-content-between flex-wrap row-gap-2 mb-3">
            <div className="d-flex align-items-center">
              <Link
                to={route.companyDetails}
                className="avatar avatar-lg border rounded flex-shrink-0 me-2"
              >
                <ImageWithBasePath
                  src="assets/img/icons/company-icon-03.svg"
                  className="w-auto h-auto"
                  alt="img"
                />
              </Link>
              <div>
                <h6>
                  <Link to={route.companyDetails} className="fw-medium">
                    Summit Peak
                  </Link>
                </h6>
                <div className="set-star text-default">
                  <i className="fa fa-star filled me-1" />
                  4.5
                </div>
              </div>
            </div>
            <div className="dropdown table-action">
              <Link
                to="#"
                className="action-icon"
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
                  data-bs-target="#delete_contact"
                >
                  <i className="ti ti-trash text-danger" /> Delete
                </Link>
                <Link className="dropdown-item" to={route.companyDetails}>
                  <i className="ti ti-eye text-blue-light" /> Preview
                </Link>
              </div>
            </div>
          </div>
          <div className="d-block">
            <div className="d-flex flex-column mb-3">
              <p className="text-default d-inline-flex align-items-center mb-2">
                <i className="ti ti-mail text-dark me-1" />
                Jessica13@gmail.com
              </p>
              <p className="text-default d-inline-flex align-items-center mb-2">
                <i className="ti ti-phone text-dark me-1" />
                +1 89316-83167
              </p>
              <p className="text-default d-inline-flex align-items-center">
                <i className="ti ti-map-pin-pin text-dark me-1" />
                India
              </p>
            </div>
            <div className="d-flex align-items-center">
              <span className="badge badge-tag badge-success-light me-2">
                Collab
              </span>
              <span className="badge badge-tag badge-warning-light">Rated</span>
            </div>
          </div>
          <div className="d-flex justify-content-between align-items-center flex-wrap row-gap-2 border-top pt-3 mt-3">
            <div className="avatar-list-stacked avatar-group-xs">
              <span className="avatar border-0">
                <ImageWithBasePath
                  src="assets/img/profiles/avatar-01.jpg"
                  className="rounded-circle"
                  alt="img"
                />
              </span>
              <span className="avatar border-0">
                <ImageWithBasePath
                  src="assets/img/profiles/avatar-02.jpg"
                  className="rounded-circle"
                  alt="img"
                />
              </span>
              <span className="avatar border-0">
                <ImageWithBasePath
                  src="assets/img/profiles/avatar-03.jpg"
                  className="rounded-circle"
                  alt="img"
                />
              </span>
              <span className="avatar border-0">
                <ImageWithBasePath
                  src="assets/img/profiles/avatar-04.jpg"
                  className="rounded-circle"
                  alt="img"
                />
              </span>
            </div>
            <div className="d-flex align-items-center grid-social-links">
              <Link
                to="#"
                className="avatar avatar-xs text-dark rounded-circle me-1"
              >
                <i className="ti ti-mail fs-14" />
              </Link>
              <Link
                to="#"
                className="avatar avatar-xs text-dark rounded-circle me-1"
              >
                <i className="ti ti-phone-check fs-14" />
              </Link>
              <Link
                to="#"
                className="avatar avatar-xs text-dark rounded-circle me-1"
              >
                <i className="ti ti-message-circle-share fs-14" />
              </Link>
              <Link
                to="#"
                className="avatar avatar-xs text-dark rounded-circle me-1"
              >
                <i className="ti ti-brand-skype fs-14" />
              </Link>
              <Link to="#" className="avatar avatar-xs text-dark rounded-circle">
                <i className="ti ti-brand-facebook fs-14" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="col-xxl-3 col-xl-4 col-md-6">
      <div className="card border">
        <div className="card-body">
          <div className="d-flex align-items-center justify-content-between flex-wrap row-gap-2 mb-3">
            <div className="d-flex align-items-center">
              <Link
                to={route.companyDetails}
                className="avatar avatar-lg border rounded flex-shrink-0 me-2"
              >
                <ImageWithBasePath
                  src="assets/img/icons/company-icon-04.svg"
                  className="w-auto h-auto"
                  alt="img"
                />
              </Link>
              <div>
                <h6>
                  <Link to={route.companyDetails} className="fw-medium">
                    Summit Peak
                  </Link>
                </h6>
                <div className="set-star text-default">
                  <i className="fa fa-star filled me-1" />
                  4.5
                </div>
              </div>
            </div>
            <div className="dropdown table-action">
              <Link
                to="#"
                className="action-icon"
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
                  data-bs-target="#delete_contact"
                >
                  <i className="ti ti-trash text-danger" /> Delete
                </Link>
                <Link className="dropdown-item" to={route.companyDetails}>
                  <i className="ti ti-eye text-blue-light" /> Preview
                </Link>
              </div>
            </div>
          </div>
          <div className="d-block">
            <div className="d-flex flex-column mb-3">
              <p className="text-default d-inline-flex align-items-center mb-2">
                <i className="ti ti-mail text-dark me-1" />
                Jessica13@gmail.com
              </p>
              <p className="text-default d-inline-flex align-items-center mb-2">
                <i className="ti ti-phone text-dark me-1" />
                +1 89316-83167
              </p>
              <p className="text-default d-inline-flex align-items-center">
                <i className="ti ti-map-pin-pin text-dark me-1" />
                India
              </p>
            </div>
            <div className="d-flex align-items-center">
              <span className="badge badge-tag badge-success-light me-2">
                Collab
              </span>
              <span className="badge badge-tag badge-warning-light">Rated</span>
            </div>
          </div>
          <div className="d-flex justify-content-between align-items-center flex-wrap row-gap-2 border-top pt-3 mt-3">
            <div className="avatar-list-stacked avatar-group-xs">
              <span className="avatar border-0">
                <ImageWithBasePath
                  src="assets/img/profiles/avatar-01.jpg"
                  className="rounded-circle"
                  alt="img"
                />
              </span>
              <span className="avatar border-0">
                <ImageWithBasePath
                  src="assets/img/profiles/avatar-02.jpg"
                  className="rounded-circle"
                  alt="img"
                />
              </span>
              <span className="avatar border-0">
                <ImageWithBasePath
                  src="assets/img/profiles/avatar-03.jpg"
                  className="rounded-circle"
                  alt="img"
                />
              </span>
              <span className="avatar border-0">
                <ImageWithBasePath
                  src="assets/img/profiles/avatar-04.jpg"
                  className="rounded-circle"
                  alt="img"
                />
              </span>
            </div>
            <div className="d-flex align-items-center grid-social-links">
              <Link
                to="#"
                className="avatar avatar-xs text-dark rounded-circle me-1"
              >
                <i className="ti ti-mail fs-14" />
              </Link>
              <Link
                to="#"
                className="avatar avatar-xs text-dark rounded-circle me-1"
              >
                <i className="ti ti-phone-check fs-14" />
              </Link>
              <Link
                to="#"
                className="avatar avatar-xs text-dark rounded-circle me-1"
              >
                <i className="ti ti-message-circle-share fs-14" />
              </Link>
              <Link
                to="#"
                className="avatar avatar-xs text-dark rounded-circle me-1"
              >
                <i className="ti ti-brand-skype fs-14" />
              </Link>
              <Link to="#" className="avatar avatar-xs text-dark rounded-circle">
                <i className="ti ti-brand-facebook fs-14" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="col-xxl-3 col-xl-4 col-md-6">
      <div className="card border">
        <div className="card-body">
          <div className="d-flex align-items-center justify-content-between flex-wrap row-gap-2 mb-3">
            <div className="d-flex align-items-center">
              <Link
                to={route.companyDetails}
                className="avatar avatar-lg border rounded flex-shrink-0 me-2"
              >
                <ImageWithBasePath
                  src="assets/img/icons/company-icon-05.svg"
                  className="w-auto h-auto"
                  alt="img"
                />
              </Link>
              <div>
                <h6>
                  <Link to={route.companyDetails} className="fw-medium">
                    RiverStone Ventur
                  </Link>
                </h6>
                <div className="set-star text-default">
                  <i className="fa fa-star filled me-1" />
                  4.7
                </div>
              </div>
            </div>
            <div className="dropdown table-action">
              <Link
                to="#"
                className="action-icon"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <i className="fa fa-ellipsis-v" />
              </Link>
              <div className="dropdown-menu dropdown-menu-right">
                <Link
                  className="dropdown-item "
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
                  data-bs-target="#delete_contact"
                >
                  <i className="ti ti-trash text-danger" /> Delete
                </Link>
                <Link className="dropdown-item" to={route.companyDetails}>
                  <i className="ti ti-eye text-blue-light" /> Preview
                </Link>
              </div>
            </div>
          </div>
          <div className="d-block">
            <div className="d-flex flex-column mb-3">
              <p className="text-default d-inline-flex align-items-center mb-2">
                <i className="ti ti-mail text-dark me-1" />
                CarolTho3@gmail.com
              </p>
              <p className="text-default d-inline-flex align-items-center mb-2">
                <i className="ti ti-phone text-dark me-1" />
                +1 84295-01629
              </p>
              <p className="text-default d-inline-flex align-items-center">
                <i className="ti ti-map-pin-pin text-dark me-1" />
                China
              </p>
            </div>
            <div className="d-flex align-items-center">
              <span className="badge badge-tag badge-success-light me-2">
                Collab
              </span>
              <span className="badge badge-tag badge-warning-light">Rated</span>
            </div>
          </div>
          <div className="d-flex justify-content-between align-items-center flex-wrap row-gap-2 border-top pt-3 mt-3">
            <div className="avatar-list-stacked avatar-group-xs">
              <span className="avatar border-0">
                <ImageWithBasePath
                  src="assets/img/profiles/avatar-01.jpg"
                  className="rounded-circle"
                  alt="img"
                />
              </span>
              <span className="avatar border-0">
                <ImageWithBasePath
                  src="assets/img/profiles/avatar-02.jpg"
                  className="rounded-circle"
                  alt="img"
                />
              </span>
              <span className="avatar border-0">
                <ImageWithBasePath
                  src="assets/img/profiles/avatar-03.jpg"
                  className="rounded-circle"
                  alt="img"
                />
              </span>
              <span className="avatar border-0">
                <ImageWithBasePath
                  src="assets/img/profiles/avatar-04.jpg"
                  className="rounded-circle"
                  alt="img"
                />
              </span>
            </div>
            <div className="d-flex align-items-center grid-social-links">
              <Link
                to="#"
                className="avatar avatar-xs text-dark rounded-circle me-1"
              >
                <i className="ti ti-mail fs-14" />
              </Link>
              <Link
                to="#"
                className="avatar avatar-xs text-dark rounded-circle me-1"
              >
                <i className="ti ti-phone-check fs-14" />
              </Link>
              <Link
                to="#"
                className="avatar avatar-xs text-dark rounded-circle me-1"
              >
                <i className="ti ti-message-circle-share fs-14" />
              </Link>
              <Link
                to="#"
                className="avatar avatar-xs text-dark rounded-circle me-1"
              >
                <i className="ti ti-brand-skype fs-14" />
              </Link>
              <Link to="#" className="avatar avatar-xs text-dark rounded-circle">
                <i className="ti ti-brand-facebook fs-14" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="col-xxl-3 col-xl-4 col-md-6">
      <div className="card border">
        <div className="card-body">
          <div className="d-flex align-items-center justify-content-between flex-wrap row-gap-2 mb-3">
            <div className="d-flex align-items-center">
              <Link
                to={route.companyDetails}
                className="avatar avatar-lg border rounded flex-shrink-0 me-2"
              >
                <ImageWithBasePath
                  src="assets/img/icons/company-icon-06.svg"
                  className="w-auto h-auto"
                  alt="img"
                />
              </Link>
              <div>
                <h6>
                  <Link to={route.companyDetails} className="fw-medium">
                    Bright Bridge Grp
                  </Link>
                </h6>
                <div className="set-star text-default">
                  <i className="fa fa-star filled me-1" />
                  5.0
                </div>
              </div>
            </div>
            <div className="dropdown table-action">
              <Link
                to="#"
                className="action-icon"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <i className="fa fa-ellipsis-v" />
              </Link>
              <div className="dropdown-menu dropdown-menu-right">
                <Link
                  className="dropdown-item "
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
                  data-bs-target="#delete_contact"
                >
                  <i className="ti ti-trash text-danger" /> Delete
                </Link>
                <Link className="dropdown-item" to={route.companyDetails}>
                  <i className="ti ti-eye text-blue-light" /> Preview
                </Link>
              </div>
            </div>
          </div>
          <div className="d-block">
            <div className="d-flex flex-column mb-3">
              <p className="text-default d-inline-flex align-items-center mb-2">
                <i className="ti ti-mail text-dark me-1" />
                Dawnmercha@gmail.com
              </p>
              <p className="text-default d-inline-flex align-items-center mb-2">
                <i className="ti ti-phone text-dark me-1" />
                +1 79253-01692
              </p>
              <p className="text-default d-inline-flex align-items-center">
                <i className="ti ti-map-pin-pin text-dark me-1" />
                Japan
              </p>
            </div>
            <div className="d-flex align-items-center">
              <span className="badge badge-tag badge-success-light me-2">
                Collab
              </span>
              <span className="badge badge-tag badge-warning-light">Rated</span>
            </div>
          </div>
          <div className="d-flex justify-content-between align-items-center flex-wrap row-gap-2 border-top pt-3 mt-3">
            <div className="avatar-list-stacked avatar-group-xs">
              <span className="avatar border-0">
                <ImageWithBasePath
                  src="assets/img/profiles/avatar-01.jpg"
                  className="rounded-circle"
                  alt="img"
                />
              </span>
              <span className="avatar border-0">
                <ImageWithBasePath
                  src="assets/img/profiles/avatar-02.jpg"
                  className="rounded-circle"
                  alt="img"
                />
              </span>
              <span className="avatar border-0">
                <ImageWithBasePath
                  src="assets/img/profiles/avatar-03.jpg"
                  className="rounded-circle"
                  alt="img"
                />
              </span>
              <span className="avatar border-0">
                <ImageWithBasePath
                  src="assets/img/profiles/avatar-04.jpg"
                  className="rounded-circle"
                  alt="img"
                />
              </span>
            </div>
            <div className="d-flex align-items-center grid-social-links">
              <Link
                to="#"
                className="avatar avatar-xs text-dark rounded-circle me-1"
              >
                <i className="ti ti-mail fs-14" />
              </Link>
              <Link
                to="#"
                className="avatar avatar-xs text-dark rounded-circle me-1"
              >
                <i className="ti ti-phone-check fs-14" />
              </Link>
              <Link
                to="#"
                className="avatar avatar-xs text-dark rounded-circle me-1"
              >
                <i className="ti ti-message-circle-share fs-14" />
              </Link>
              <Link
                to="#"
                className="avatar avatar-xs text-dark rounded-circle me-1"
              >
                <i className="ti ti-brand-skype fs-14" />
              </Link>
              <Link to="#" className="avatar avatar-xs text-dark rounded-circle">
                <i className="ti ti-brand-facebook fs-14" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="col-xxl-3 col-xl-4 col-md-6">
      <div className="card border">
        <div className="card-body">
          <div className="d-flex align-items-center justify-content-between flex-wrap row-gap-2 mb-3">
            <div className="d-flex align-items-center">
              <Link
                to={route.companyDetails}
                className="avatar avatar-lg border rounded flex-shrink-0 me-2"
              >
                <ImageWithBasePath
                  src="assets/img/icons/company-icon-07.svg"
                  className="w-auto h-auto"
                  alt="img"
                />
              </Link>
              <div>
                <h6>
                  <Link to={route.companyDetails} className="fw-medium">
                    CoastalStar Co.
                  </Link>
                </h6>
                <div className="set-star text-default">
                  <i className="fa fa-star filled me-1" />
                  3.1
                </div>
              </div>
            </div>
            <div className="dropdown table-action">
              <Link
                to="#"
                className="action-icon"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <i className="fa fa-ellipsis-v" />
              </Link>
              <div className="dropdown-menu dropdown-menu-right">
                <Link
                  className="dropdown-item "
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
                  data-bs-target="#delete_contact"
                >
                  <i className="ti ti-trash text-danger" /> Delete
                </Link>
                <Link className="dropdown-item" to={route.companyDetails}>
                  <i className="ti ti-eye text-blue-light" /> Preview
                </Link>
              </div>
            </div>
          </div>
          <div className="d-block">
            <div className="d-flex flex-column mb-3">
              <p className="text-default d-inline-flex align-items-center mb-2">
                <i className="ti ti-mail text-dark me-1" />
                Rachel@gmail.com
              </p>
              <p className="text-default d-inline-flex align-items-center mb-2">
                <i className="ti ti-phone text-dark me-1" />
                +1 52804-89153
              </p>
              <p className="text-default d-inline-flex align-items-center">
                <i className="ti ti-map-pin-pin text-dark me-1" />
                Indonesia
              </p>
            </div>
            <div className="d-flex align-items-center">
              <span className="badge badge-tag badge-success-light me-2">
                Collab
              </span>
              <span className="badge badge-tag badge-warning-light">Rated</span>
            </div>
          </div>
          <div className="d-flex justify-content-between align-items-center flex-wrap row-gap-2 border-top pt-3 mt-3">
            <div className="avatar-list-stacked avatar-group-xs">
              <span className="avatar border-0">
                <ImageWithBasePath
                  src="assets/img/profiles/avatar-01.jpg"
                  className="rounded-circle"
                  alt="img"
                />
              </span>
              <span className="avatar border-0">
                <ImageWithBasePath
                  src="assets/img/profiles/avatar-02.jpg"
                  className="rounded-circle"
                  alt="img"
                />
              </span>
              <span className="avatar border-0">
                <ImageWithBasePath
                  src="assets/img/profiles/avatar-03.jpg"
                  className="rounded-circle"
                  alt="img"
                />
              </span>
              <span className="avatar border-0">
                <ImageWithBasePath
                  src="assets/img/profiles/avatar-04.jpg"
                  className="rounded-circle"
                  alt="img"
                />
              </span>
            </div>
            <div className="d-flex align-items-center grid-social-links">
              <Link
                to="#"
                className="avatar avatar-xs text-dark rounded-circle me-1"
              >
                <i className="ti ti-mail fs-14" />
              </Link>
              <Link
                to="#"
                className="avatar avatar-xs text-dark rounded-circle me-1"
              >
                <i className="ti ti-phone-check fs-14" />
              </Link>
              <Link
                to="#"
                className="avatar avatar-xs text-dark rounded-circle me-1"
              >
                <i className="ti ti-message-circle-share fs-14" />
              </Link>
              <Link
                to="#"
                className="avatar avatar-xs text-dark rounded-circle me-1"
              >
                <i className="ti ti-brand-skype fs-14" />
              </Link>
              <Link to="#" className="avatar avatar-xs text-dark rounded-circle">
                <i className="ti ti-brand-facebook fs-14" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="col-xxl-3 col-xl-4 col-md-6">
      <div className="card border">
        <div className="card-body">
          <div className="d-flex align-items-center justify-content-between flex-wrap row-gap-2 mb-3">
            <div className="d-flex align-items-center">
              <Link
                to={route.companyDetails}
                className="avatar avatar-lg border rounded flex-shrink-0 me-2"
              >
                <ImageWithBasePath
                  src="assets/img/icons/company-icon-08.svg"
                  className="w-auto h-auto"
                  alt="img"
                />
              </Link>
              <div>
                <h6>
                  <Link to={route.companyDetails} className="fw-medium">
                    HarborView
                  </Link>
                </h6>
                <div className="set-star text-default">
                  <i className="fa fa-star filled me-1" />
                  5.0
                </div>
              </div>
            </div>
            <div className="dropdown table-action">
              <Link
                to="#"
                className="action-icon"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <i className="fa fa-ellipsis-v" />
              </Link>
              <div className="dropdown-menu dropdown-menu-right">
                <Link
                  className="dropdown-item "
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
                  data-bs-target="#delete_contact"
                >
                  <i className="ti ti-trash text-danger" /> Delete
                </Link>
                <Link className="dropdown-item" to={route.companyDetails}>
                  <i className="ti ti-eye text-blue-light" /> Preview
                </Link>
              </div>
            </div>
          </div>
          <div className="d-block">
            <div className="d-flex flex-column mb-3">
              <p className="text-default d-inline-flex align-items-center mb-2">
                <i className="ti ti-mail text-dark me-1" />
                Jonelle@gmail.com
              </p>
              <p className="text-default d-inline-flex align-items-center mb-2">
                <i className="ti ti-phone text-dark me-1" />
                +1 60364-91683
              </p>
              <p className="text-default d-inline-flex align-items-center">
                <i className="ti ti-map-pin-pin text-dark me-1" />
                Cuba
              </p>
            </div>
            <div className="d-flex align-items-center">
              <span className="badge badge-tag badge-success-light me-2">
                Collab
              </span>
              <span className="badge badge-tag badge-warning-light">Rated</span>
            </div>
          </div>
          <div className="d-flex justify-content-between align-items-center flex-wrap row-gap-2 border-top pt-3 mt-3">
            <div className="avatar-list-stacked avatar-group-xs">
              <span className="avatar border-0">
                <ImageWithBasePath
                  src="assets/img/profiles/avatar-01.jpg"
                  className="rounded-circle"
                  alt="img"
                />
              </span>
              <span className="avatar border-0">
                <ImageWithBasePath
                  src="assets/img/profiles/avatar-02.jpg"
                  className="rounded-circle"
                  alt="img"
                />
              </span>
              <span className="avatar border-0">
                <ImageWithBasePath
                  src="assets/img/profiles/avatar-03.jpg"
                  className="rounded-circle"
                  alt="img"
                />
              </span>
              <span className="avatar border-0">
                <ImageWithBasePath
                  src="assets/img/profiles/avatar-04.jpg"
                  className="rounded-circle"
                  alt="img"
                />
              </span>
            </div>
            <div className="d-flex align-items-center grid-social-links">
              <Link
                to="#"
                className="avatar avatar-xs text-dark rounded-circle me-1"
              >
                <i className="ti ti-mail fs-14" />
              </Link>
              <Link
                to="#"
                className="avatar avatar-xs text-dark rounded-circle me-1"
              >
                <i className="ti ti-phone-check fs-14" />
              </Link>
              <Link
                to="#"
                className="avatar avatar-xs text-dark rounded-circle me-1"
              >
                <i className="ti ti-message-circle-share fs-14" />
              </Link>
              <Link
                to="#"
                className="avatar avatar-xs text-dark rounded-circle me-1"
              >
                <i className="ti ti-brand-skype fs-14" />
              </Link>
              <Link to="#" className="avatar avatar-xs text-dark rounded-circle">
                <i className="ti ti-brand-facebook fs-14" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="col-xxl-3 col-xl-4 col-md-6">
      <div className="card border">
        <div className="card-body">
          <div className="d-flex align-items-center justify-content-between flex-wrap row-gap-2 mb-3">
            <div className="d-flex align-items-center">
              <Link
                to={route.companyDetails}
                className="avatar avatar-lg border rounded flex-shrink-0 me-2"
              >
                <ImageWithBasePath
                  src="assets/img/icons/company-icon-09.svg"
                  className="w-auto h-auto"
                  alt="img"
                />
              </Link>
              <div>
                <h6>
                  <Link to={route.companyDetails} className="fw-medium">
                    Golden Gate Ltd
                  </Link>
                </h6>
                <div className="set-star text-default">
                  <i className="fa fa-star filled me-1" />
                  2.7
                </div>
              </div>
            </div>
            <div className="dropdown table-action">
              <Link
                to="#"
                className="action-icon"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <i className="fa fa-ellipsis-v" />
              </Link>
              <div className="dropdown-menu dropdown-menu-right">
                <Link
                  className="dropdown-item "
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
                  data-bs-target="#delete_contact"
                >
                  <i className="ti ti-trash text-danger" /> Delete
                </Link>
                <Link className="dropdown-item" to={route.companyDetails}>
                  <i className="ti ti-eye text-blue-light" /> Preview
                </Link>
              </div>
            </div>
          </div>
          <div className="d-block">
            <div className="d-flex flex-column mb-3">
              <p className="text-default d-inline-flex align-items-center mb-2">
                <i className="ti ti-mail text-dark me-1" />
                Jonathan@gmail.com
              </p>
              <p className="text-default d-inline-flex align-items-center mb-2">
                <i className="ti ti-phone text-dark me-1" />
                +1 69023-95179
              </p>
              <p className="text-default d-inline-flex align-items-center">
                <i className="ti ti-map-pin-pin text-dark me-1" />
                Isreal
              </p>
            </div>
            <div className="d-flex align-items-center">
              <span className="badge badge-tag badge-success-light me-2">
                Collab
              </span>
              <span className="badge badge-tag badge-warning-light">Rated</span>
            </div>
          </div>
          <div className="d-flex justify-content-between align-items-center flex-wrap row-gap-2 border-top pt-3 mt-3">
            <div className="avatar-list-stacked avatar-group-xs">
              <span className="avatar border-0">
                <ImageWithBasePath
                  src="assets/img/profiles/avatar-01.jpg"
                  className="rounded-circle"
                  alt="img"
                />
              </span>
              <span className="avatar border-0">
                <ImageWithBasePath
                  src="assets/img/profiles/avatar-02.jpg"
                  className="rounded-circle"
                  alt="img"
                />
              </span>
              <span className="avatar border-0">
                <ImageWithBasePath
                  src="assets/img/profiles/avatar-03.jpg"
                  className="rounded-circle"
                  alt="img"
                />
              </span>
              <span className="avatar border-0">
                <ImageWithBasePath
                  src="assets/img/profiles/avatar-04.jpg"
                  className="rounded-circle"
                  alt="img"
                />
              </span>
            </div>
            <div className="d-flex align-items-center grid-social-links">
              <Link
                to="#"
                className="avatar avatar-xs text-dark rounded-circle me-1"
              >
                <i className="ti ti-mail fs-14" />
              </Link>
              <Link
                to="#"
                className="avatar avatar-xs text-dark rounded-circle me-1"
              >
                <i className="ti ti-phone-check fs-14" />
              </Link>
              <Link
                to="#"
                className="avatar avatar-xs text-dark rounded-circle me-1"
              >
                <i className="ti ti-message-circle-share fs-14" />
              </Link>
              <Link
                to="#"
                className="avatar avatar-xs text-dark rounded-circle me-1"
              >
                <i className="ti ti-brand-skype fs-14" />
              </Link>
              <Link to="#" className="avatar avatar-xs text-dark rounded-circle">
                <i className="ti ti-brand-facebook fs-14" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="col-xxl-3 col-xl-4 col-md-6">
      <div className="card border">
        <div className="card-body">
          <div className="d-flex align-items-center justify-content-between flex-wrap row-gap-2 mb-3">
            <div className="d-flex align-items-center">
              <Link
                to={route.companyDetails}
                className="avatar avatar-lg border rounded flex-shrink-0 me-2"
              >
                <ImageWithBasePath
                  src="assets/img/icons/company-icon-10.svg"
                  className="w-auto h-auto"
                  alt="img"
                />
              </Link>
              <div>
                <h6>
                  <Link to={route.companyDetails} className="fw-medium">
                    Redwood Inc
                  </Link>
                </h6>
                <div className="set-star text-default">
                  <i className="fa fa-star filled me-1" />
                  3.0
                </div>
              </div>
            </div>
            <div className="dropdown table-action">
              <Link
                to="#"
                className="action-icon"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <i className="fa fa-ellipsis-v" />
              </Link>
              <div className="dropdown-menu dropdown-menu-right">
                <Link
                  className="dropdown-item "
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
                  data-bs-target="#delete_contact"
                >
                  <i className="ti ti-trash text-danger" /> Delete
                </Link>
                <Link className="dropdown-item" to={route.companyDetails}>
                  <i className="ti ti-eye text-blue-light" /> Preview
                </Link>
              </div>
            </div>
          </div>
          <div className="d-block">
            <div className="d-flex flex-column mb-3">
              <p className="text-default d-inline-flex align-items-center mb-2">
                <i className="ti ti-mail text-dark me-1" />
                brook@gmail.com
              </p>
              <p className="text-default d-inline-flex align-items-center mb-2">
                <i className="ti ti-phone text-dark me-1" />
                +1 49815-90142
              </p>
              <p className="text-default d-inline-flex align-items-center">
                <i className="ti ti-map-pin-pin text-dark me-1" />
                Colombia
              </p>
            </div>
            <div className="d-flex align-items-center">
              <span className="badge badge-tag badge-success-light me-2">
                Collab
              </span>
              <span className="badge badge-tag badge-warning-light">Rated</span>
            </div>
          </div>
          <div className="d-flex justify-content-between align-items-center flex-wrap row-gap-2 border-top pt-3 mt-3">
            <div className="avatar-list-stacked avatar-group-xs">
              <span className="avatar border-0">
                <ImageWithBasePath
                  src="assets/img/profiles/avatar-01.jpg"
                  className="rounded-circle"
                  alt="img"
                />
              </span>
              <span className="avatar border-0">
                <ImageWithBasePath
                  src="assets/img/profiles/avatar-02.jpg"
                  className="rounded-circle"
                  alt="img"
                />
              </span>
              <span className="avatar border-0">
                <ImageWithBasePath
                  src="assets/img/profiles/avatar-03.jpg"
                  className="rounded-circle"
                  alt="img"
                />
              </span>
              <span className="avatar border-0">
                <ImageWithBasePath
                  src="assets/img/profiles/avatar-04.jpg"
                  className="rounded-circle"
                  alt="img"
                />
              </span>
            </div>
            <div className="d-flex align-items-center grid-social-links">
              <Link
                to="#"
                className="avatar avatar-xs text-dark rounded-circle me-1"
              >
                <i className="ti ti-mail fs-14" />
              </Link>
              <Link
                to="#"
                className="avatar avatar-xs text-dark rounded-circle me-1"
              >
                <i className="ti ti-phone-check fs-14" />
              </Link>
              <Link
                to="#"
                className="avatar avatar-xs text-dark rounded-circle me-1"
              >
                <i className="ti ti-message-circle-share fs-14" />
              </Link>
              <Link
                to="#"
                className="avatar avatar-xs text-dark rounded-circle me-1"
              >
                <i className="ti ti-brand-skype fs-14" />
              </Link>
              <Link to="#" className="avatar avatar-xs text-dark rounded-circle">
                <i className="ti ti-brand-facebook fs-14" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="col-xxl-3 col-xl-4 col-md-6">
      <div className="card border">
        <div className="card-body">
          <div className="d-flex align-items-center justify-content-between flex-wrap row-gap-2 mb-3">
            <div className="d-flex align-items-center">
              <Link
                to={route.companyDetails}
                className="avatar avatar-lg border rounded flex-shrink-0 me-2"
              >
                <ImageWithBasePath
                  src="assets/img/icons/company-icon-03.svg"
                  className="w-auto h-auto"
                  alt="img"
                />
              </Link>
              <div>
                <h6>
                  <Link to={route.companyDetails} className="fw-medium">
                    SilverHawk
                  </Link>
                </h6>
                <div className="set-star text-default">
                  <i className="fa fa-star filled me-1" />
                  3.0
                </div>
              </div>
            </div>
            <div className="dropdown table-action">
              <Link
                to="#"
                className="action-icon"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <i className="fa fa-ellipsis-v" />
              </Link>
              <div className="dropdown-menu dropdown-menu-right">
                <Link
                  className="dropdown-item "
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
                  data-bs-target="#delete_contact"
                >
                  <i className="ti ti-trash text-danger" /> Delete
                </Link>
                <Link className="dropdown-item" to={route.companyDetails}>
                  <i className="ti ti-eye text-blue-light" /> Preview
                </Link>
              </div>
            </div>
          </div>
          <div className="d-block">
            <div className="d-flex flex-column mb-3">
              <p className="text-default d-inline-flex align-items-center mb-2">
                <i className="ti ti-mail text-dark me-1" />
                vaughan12@example.com
              </p>
              <p className="text-default d-inline-flex align-items-center mb-2">
                <i className="ti ti-phone text-dark me-1" />
                +1 546555455
              </p>
              <p className="text-default d-inline-flex align-items-center">
                <i className="ti ti-map-pin-pin text-dark me-1" />
                Canada
              </p>
            </div>
            <div className="d-flex align-items-center">
              <span className="badge badge-tag badge-success-light me-2">
                Collab
              </span>
              <span className="badge badge-tag badge-warning-light">Rated</span>
            </div>
          </div>
          <div className="d-flex justify-content-between align-items-center flex-wrap row-gap-2 border-top pt-3 mt-3">
            <div className="avatar-list-stacked avatar-group-xs">
              <span className="avatar border-0">
                <ImageWithBasePath
                  src="assets/img/profiles/avatar-01.jpg"
                  className="rounded-circle"
                  alt="img"
                />
              </span>
              <span className="avatar border-0">
                <ImageWithBasePath
                  src="assets/img/profiles/avatar-02.jpg"
                  className="rounded-circle"
                  alt="img"
                />
              </span>
              <span className="avatar border-0">
                <ImageWithBasePath
                  src="assets/img/profiles/avatar-03.jpg"
                  className="rounded-circle"
                  alt="img"
                />
              </span>
              <span className="avatar border-0">
                <ImageWithBasePath
                  src="assets/img/profiles/avatar-04.jpg"
                  className="rounded-circle"
                  alt="img"
                />
              </span>
            </div>
            <div className="d-flex align-items-center grid-social-links">
              <Link
                to="#"
                className="avatar avatar-xs text-dark rounded-circle me-1"
              >
                <i className="ti ti-mail fs-14" />
              </Link>
              <Link
                to="#"
                className="avatar avatar-xs text-dark rounded-circle me-1"
              >
                <i className="ti ti-phone-check fs-14" />
              </Link>
              <Link
                to="#"
                className="avatar avatar-xs text-dark rounded-circle me-1"
              >
                <i className="ti ti-message-circle-share fs-14" />
              </Link>
              <Link
                to="#"
                className="avatar avatar-xs text-dark rounded-circle me-1"
              >
                <i className="ti ti-brand-skype fs-14" />
              </Link>
              <Link to="#" className="avatar avatar-xs text-dark rounded-circle">
                <i className="ti ti-brand-facebook fs-14" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="col-xxl-3 col-xl-4 col-md-6">
      <div className="card border">
        <div className="card-body">
          <div className="d-flex align-items-center justify-content-between flex-wrap row-gap-2 mb-3">
            <div className="d-flex align-items-center">
              <Link
                to={route.companyDetails}
                className="avatar avatar-lg border rounded flex-shrink-0 me-2"
              >
                <ImageWithBasePath
                  src="assets/img/icons/company-icon-04.svg"
                  className="w-auto h-auto"
                  alt="img"
                />
              </Link>
              <div>
                <h6>
                  <Link to={route.companyDetails} className="fw-medium">
                    SummitPeak
                  </Link>
                </h6>
                <div className="set-star text-default">
                  <i className="fa fa-star filled me-1" />
                  3.0
                </div>
              </div>
            </div>
            <div className="dropdown table-action">
              <Link
                to="#"
                className="action-icon"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <i className="fa fa-ellipsis-v" />
              </Link>
              <div className="dropdown-menu dropdown-menu-right">
                <Link
                  className="dropdown-item "
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
                  data-bs-target="#delete_contact"
                >
                  <i className="ti ti-trash text-danger" /> Delete
                </Link>
                <Link className="dropdown-item" to={route.companyDetails}>
                  <i className="ti ti-eye text-blue-light" /> Preview
                </Link>
              </div>
            </div>
          </div>
          <div className="d-block">
            <div className="d-flex flex-column mb-3">
              <p className="text-default d-inline-flex align-items-center mb-2">
                <i className="ti ti-mail text-dark me-1" />
                jessica13@example.com
              </p>
              <p className="text-default d-inline-flex align-items-center mb-2">
                <i className="ti ti-phone text-dark me-1" />
                +1 454478787
              </p>
              <p className="text-default d-inline-flex align-items-center">
                <i className="ti ti-map-pin-pin text-dark me-1" />
                India
              </p>
            </div>
            <div className="d-flex align-items-center">
              <span className="badge badge-tag badge-success-light me-2">
                Collab
              </span>
              <span className="badge badge-tag badge-warning-light">Rated</span>
            </div>
          </div>
          <div className="d-flex justify-content-between align-items-center flex-wrap row-gap-2 border-top pt-3 mt-3">
            <div className="avatar-list-stacked avatar-group-xs">
              <span className="avatar border-0">
                <ImageWithBasePath
                  src="assets/img/profiles/avatar-01.jpg"
                  className="rounded-circle"
                  alt="img"
                />
              </span>
              <span className="avatar border-0">
                <ImageWithBasePath
                  src="assets/img/profiles/avatar-02.jpg"
                  className="rounded-circle"
                  alt="img"
                />
              </span>
              <span className="avatar border-0">
                <ImageWithBasePath
                  src="assets/img/profiles/avatar-03.jpg"
                  className="rounded-circle"
                  alt="img"
                />
              </span>
              <span className="avatar border-0">
                <ImageWithBasePath
                  src="assets/img/profiles/avatar-04.jpg"
                  className="rounded-circle"
                  alt="img"
                />
              </span>
            </div>
            <div className="d-flex align-items-center grid-social-links">
              <Link
                to="#"
                className="avatar avatar-xs text-dark rounded-circle me-1"
              >
                <i className="ti ti-mail fs-14" />
              </Link>
              <Link
                to="#"
                className="avatar avatar-xs text-dark rounded-circle me-1"
              >
                <i className="ti ti-phone-check fs-14" />
              </Link>
              <Link
                to="#"
                className="avatar avatar-xs text-dark rounded-circle me-1"
              >
                <i className="ti ti-message-circle-share fs-14" />
              </Link>
              <Link
                to="#"
                className="avatar avatar-xs text-dark rounded-circle me-1"
              >
                <i className="ti ti-brand-skype fs-14" />
              </Link>
              <Link to="#" className="avatar avatar-xs text-dark rounded-circle">
                <i className="ti ti-brand-facebook fs-14" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  {/* /Company Grid */}
  <div className="load-btn text-center">
    <Link to="#" className="btn btn-primary">
      Load More Companies
      <i className="ti ti-loader" />
    </Link>
  </div>
</>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <div className="modal fade" id="delete_contact" role="dialog">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-body">
              <div className="text-center">
                <div className="avatar avatar-xl bg-danger-light rounded-circle mb-3">
                  <i className="ti ti-trash-x fs-36 text-danger" />
                </div>
                <h4 className="mb-2">Remove Companies?</h4>
                <p className="mb-0">
                Company ”NovaWaveLLC” from your Account.
                </p>
                <div className="d-flex align-items-center justify-content-center mt-4">
                  <Link
                    to="#"
                    className="btn btn-light me-2"
                    data-bs-dismiss="modal"
                  >
                    Cancel
                  </Link>
                  <Link to="#"  className="btn btn-danger" data-bs-dismiss="modal">
                    Yes, Delete it
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    {/* Add Company */}
    <div
      className="offcanvas offcanvas-end offcanvas-large"
      tabIndex={-1}
      id="offcanvas_add"
    >
      <div className="offcanvas-header border-bottom">
        <h5 className="fw-semibold">Add Company</h5>
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
          <div className="accordion" id="main_accordion">
            {/* Basic Info */}
            <div className="accordion-item rounded mb-3">
              <div className="accordion-header">
                <Link
                  to="#"
                  className="accordion-button accordion-custom-button bg-white rounded fw-medium text-dark"
                  data-bs-toggle="collapse"
                  data-bs-target="#basic"
                >
                  <span className="avatar avatar-md rounded text-dark border me-2">
                    <i className="ti ti-user-plus fs-20" />
                  </span>
                  Basic Info
                </Link>
              </div>
              <div
                className="accordion-collapse collapse show"
                id="basic"
                data-bs-parent="#main_accordion"
              >
                <div className="accordion-body border-top">
                  <div className="row">
                    <div className="col-md-12">
                      <div className="mb-3">
                        <div className="profile-upload">
                          <div className="profile-upload-img">
                            <span>
                              <i className="ti ti-photo" />
                            </span>
                            <ImageWithBasePath
                              src="assets/img/profiles/avatar-20.jpg"
                              alt="img"
                              className="preview1"
                            />
                            <button type="button" className="profile-remove">
                              <i className="ti ti-x" />
                            </button>
                          </div>
                          <div className="profile-upload-content">
                            <label className="profile-upload-btn">
                              <i className="ti ti-file-broken" /> Upload File
                              <input type="file" className="input-img" />
                            </label>
                            <p>JPG, GIF or PNG. Max size of 800K</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="mb-3">
                        <label className="col-form-label">Company Name</label>
                        <input type="text" className="form-control" />
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="mb-3">
                        <div className="d-flex justify-content-between align-items-center">
                          <label className="col-form-label">
                            Email <span className="text-danger">*</span>
                          </label>
                          <div className="status-toggle small-toggle-btn d-flex align-items-center">
                            <span className="me-2 label-text">
                              Email Opt Out
                            </span>
                            <input
                              type="checkbox"
                              id="user"
                              className="check"
                              defaultChecked
                            />
                            <label htmlFor="user" className="checktoggle" />
                          </div>
                        </div>
                        <input type="text" className="form-control" />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="col-form-label">
                          Phone 1 <span className="text-danger">*</span>
                        </label>
                        <input type="text" className="form-control" />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="col-form-label">Phone 2</label>
                        <input type="text" className="form-control" />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="col-form-label">
                          Fax <span className="text-danger">*</span>
                        </label>
                        <input type="text" className="form-control" />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="col-form-label">
                          Website <span className="text-danger">*</span>
                        </label>
                        <input type="text" className="form-control" />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="col-form-label">Ratings</label>
                        <div className="icon-form-end">
                          <span className="form-icon">
                            <i className="ti ti-star" />
                          </span>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="4.2"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="fmb-3">
                        <label className="col-form-label">Owner</label>
                        <SelectWithImage2 />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="col-form-label">Tags </label>
                        <input
                          className="input-tags form-control"
                          type="text"
                          data-role="tagsinput"
                          name="Label"
                          defaultValue="Collab"
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <div className="d-flex align-items-center justify-content-between">
                          <label className="col-form-label">Deals</label>
                          <Link
                            to="#"
                            className="label-add"
                            data-bs-toggle="offcanvas"
                            data-bs-target="#offcanvas_add_2"
                          >
                            <i className="ti ti-square-rounded-plus" />
                            Add New
                          </Link>
                        </div>
                        <Select
                          className="select2"
                          classNamePrefix="react-select"
                          options={dealsopen}
                          placeholder="Choose"
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="col-form-label">
                          Source <span className="text-danger">*</span>
                        </label>
                        <Select
                          className="select2"
                          classNamePrefix="react-select"
                          options={activities}
                          placeholder="Choose"
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="col-form-label">
                          Industry <span className="text-danger">*</span>
                        </label>
                        <Select
                          className="select2"
                          classNamePrefix="react-select"
                          options={industries}
                          placeholder="Choose"
                        />
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="mb-3">
                        <label className="col-form-label">Contacts</label>
                        <Select
                          className="select2"
                          options={project}
                          defaultValue={tagInputValues}
                          isMulti
                          classNamePrefix="react-select"
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="col-form-label">
                          Currency <span className="text-danger">*</span>
                        </label>
                        <input type="text" className="form-control" />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="col-form-label">
                          Language <span className="text-danger">*</span>
                        </label>
                        <Select
                          className="select2"
                          classNamePrefix="react-select"
                          options={languages}
                          placeholder="Choose"
                        />
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="mb-0">
                        <label className="col-form-label">
                          Description <span className="text-danger">*</span>
                        </label>
                        <textarea
                          className="form-control"
                          rows={5}
                          defaultValue={""}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* /Basic Info */}
            {/* Address Info */}
            <div className="accordion-item border-top rounded mb-3">
              <div className="accordion-header">
                <Link
                  to="#"
                  className="accordion-button accordion-custom-button rounded bg-white fw-medium text-dark"
                  data-bs-toggle="collapse"
                  data-bs-target="#address"
                >
                  <span className="avatar avatar-md rounded text-dark border me-2">
                    <i className="ti ti-map-pin-cog fs-20" />
                  </span>
                  Address Info
                </Link>
              </div>
              <div
                className="accordion-collapse collapse"
                id="address"
                data-bs-parent="#main_accordion"
              >
                <div className="accordion-body border-top">
                  <div className="row">
                    <div className="col-md-12">
                      <div className="mb-3">
                        <label className="col-form-label">
                          Street Address{" "}
                        </label>
                        <input type="text" className="form-control" />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="col-form-label">City </label>
                        <input type="text" className="form-control" />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="col-form-label">
                          State / Province{" "}
                        </label>
                        <input type="text" className="form-control" />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3 mb-md-0">
                        <label className="col-form-label">Country</label>
                        <Select
                          className="select2"
                          classNamePrefix="react-select"
                          options={countries}
                          placeholder="Choose"
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-0">
                        <label className="col-form-label">Zipcode </label>
                        <input type="text" className="form-control" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* /Address Info */}
            {/* Social Profile */}
            <div className="accordion-item border-top rounded mb-3">
              <div className="accordion-header">
                <Link
                  to="#"
                  className="accordion-button accordion-custom-button rounded bg-white fw-medium text-dark"
                  data-bs-toggle="collapse"
                  data-bs-target="#social"
                >
                  <span className="avatar avatar-md rounded text-dark border me-2">
                    <i className="ti ti-social fs-20" />
                  </span>
                  Social Profile
                </Link>
              </div>
              <div
                className="accordion-collapse collapse"
                id="social"
                data-bs-parent="#main_accordion"
              >
                <div className="accordion-body border-top">
                  <div className="row">
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="col-form-label">Facebook</label>
                        <input type="text" className="form-control" />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="col-form-label">Skype </label>
                        <input type="text" className="form-control" />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="col-form-label">Linkedin </label>
                        <input type="text" className="form-control" />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="col-form-label">Twitter</label>
                        <input type="text" className="form-control" />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3 mb-md-0">
                        <label className="col-form-label">Whatsapp</label>
                        <input type="text" className="form-control" />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-0">
                        <label className="col-form-label">Instagram</label>
                        <input type="text" className="form-control" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* /Social Profile */}
            {/* Access */}
            <div className="accordion-item border-top rounded mb-3">
              <div className="accordion-header">
                <Link
                  to="#"
                  className="accordion-button accordion-custom-button rounded bg-white fw-medium text-dark"
                  data-bs-toggle="collapse"
                  data-bs-target="#access-info"
                >
                  <span className="avatar avatar-md rounded text-dark border me-2">
                    <i className="ti ti-accessible fs-20" />
                  </span>
                  Access
                </Link>
              </div>
              <div
                className="accordion-collapse collapse"
                id="access-info"
                data-bs-parent="#main_accordion"
              >
                <div className="accordion-body border-top">
                  <div className="row">
                    <div className="col-md-12">
                      <div className="mb-3">
                        <label className="col-form-label">Visibility</label>
                        <div className="d-flex flex-wrap">
                          <div className="me-2">
                            <input
                              type="radio"
                              className="status-radio"
                              id="public"
                              name="visible"
                            />
                            <label htmlFor="public">Public</label>
                          </div>
                          <div className="me-2">
                            <input
                              type="radio"
                              className="status-radio"
                              id="private"
                              name="visible"
                            />
                            <label htmlFor="private">Private</label>
                          </div>
                          <div
                            data-bs-toggle="modal"
                            data-bs-target="#access_view"
                          >
                            <input
                              type="radio"
                              className="status-radio"
                              id="people"
                              name="visible"
                            />
                            <label htmlFor="people">Select People</label>
                          </div>
                        </div>
                      </div>
                      <div className="mb-0">
                        <label className="col-form-label">Status</label>
                        <div className="d-flex flex-wrap">
                          <div className="me-2">
                            <input
                              type="radio"
                              className="status-radio"
                              id="active"
                              name="status"
                              defaultChecked
                            />
                            <label htmlFor="active">Active</label>
                          </div>
                          <div>
                            <input
                              type="radio"
                              className="status-radio"
                              id="inactive"
                              name="status"
                            />
                            <label htmlFor="inactive">Inactive</label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* /Access */}
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
              onClick={()=>setOpenModal2(true)}
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
    {/* /Add Company */}
    {/* Edit Company */}
    <div
      className="offcanvas offcanvas-end offcanvas-large"
      tabIndex={-1}
      id="offcanvas_edit"
    >
      <div className="offcanvas-header border-bottom">
        <h5 className="fw-semibold">Edit Company</h5>
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
          <div className="accordion" id="main_accordion">
            {/* Basic Info */}
            <div className="accordion-item rounded mb-3">
              <div className="accordion-header">
                <Link
                  to="#"
                  className="accordion-button accordion-custom-button bg-white rounded fw-medium text-dark"
                  data-bs-toggle="collapse"
                  data-bs-target="#basic"
                >
                  <span className="avatar avatar-md rounded text-dark border me-2">
                    <i className="ti ti-user-plus fs-20" />
                  </span>
                  Basic Info
                </Link>
              </div>
              <div
                className="accordion-collapse collapse show"
                id="basic"
                data-bs-parent="#main_accordion"
              >
                <div className="accordion-body border-top">
                  <div className="row">
                    <div className="col-md-12">
                      <div className="mb-3">
                        <div className="profile-upload">
                          <div className="profile-upload-img">
                            <span>
                              <i className="ti ti-photo" />
                            </span>
                            <ImageWithBasePath
                              src="assets/img/profiles/avatar-20.jpg"
                              alt="img"
                              className="preview1"
                            />
                            <button type="button" className="profile-remove">
                              <i className="ti ti-x" />
                            </button>
                          </div>
                          <div className="profile-upload-content">
                            <label className="profile-upload-btn">
                              <i className="ti ti-file-broken" /> Upload File
                              <input type="file" className="input-img" />
                            </label>
                            <p>JPG, GIF or PNG. Max size of 800K</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="mb-3">
                        <label className="col-form-label">Company Name</label>
                        <input type="text" className="form-control" />
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="mb-3">
                        <div className="d-flex justify-content-between align-items-center">
                          <label className="col-form-label">
                            Email <span className="text-danger">*</span>
                          </label>
                          <div className="status-toggle small-toggle-btn d-flex align-items-center">
                            <span className="me-2 label-text">
                              Email Opt Out
                            </span>
                            <input
                              type="checkbox"
                              id="user"
                              className="check"
                              defaultChecked
                            />
                            <label htmlFor="user" className="checktoggle" />
                          </div>
                        </div>
                        <input type="text" className="form-control" />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="col-form-label">
                          Phone 1 <span className="text-danger">*</span>
                        </label>
                        <input type="text" className="form-control" />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="col-form-label">Phone 2</label>
                        <input type="text" className="form-control" />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="col-form-label">
                          Fax <span className="text-danger">*</span>
                        </label>
                        <input type="text" className="form-control" />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="col-form-label">
                          Website <span className="text-danger">*</span>
                        </label>
                        <input type="text" className="form-control" />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="col-form-label">Ratings</label>
                        <div className="icon-form-end">
                          <span className="form-icon">
                            <i className="ti ti-star" />
                          </span>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="4.2"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="fmb-3">
                        <label className="col-form-label">Owner</label>
                        <SelectWithImage2 />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="col-form-label">Tags </label>
                        <input
                          className="input-tags form-control"
                          type="text"
                          data-role="tagsinput"
                          name="Label"
                          defaultValue="Collab"
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <div className="d-flex align-items-center justify-content-between">
                          <label className="col-form-label">Deals</label>
                          <Link
                            to="#"
                            className="label-add"
                            data-bs-toggle="offcanvas"
                            data-bs-target="#offcanvas_add_2"
                          >
                            <i className="ti ti-square-rounded-plus" />
                            Add New
                          </Link>
                        </div>
                        <Select
                          className="select2"
                          classNamePrefix="react-select"
                          options={dealsopen}
                          placeholder="Choose"
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="col-form-label">
                          Source <span className="text-danger">*</span>
                        </label>
                        <Select
                          className="select2"
                          classNamePrefix="react-select"
                          options={activities}
                          placeholder="Choose"
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="col-form-label">
                          Industry <span className="text-danger">*</span>
                        </label>
                        <Select
                          className="select2"
                          classNamePrefix="react-select"
                          options={industries}
                          placeholder="Choose"
                        />
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="mb-3">
                        <label className="col-form-label">Contacts</label>
                        <Select
                          className="select2"
                          options={project}
                          defaultValue={tagInputValues}
                          isMulti
                          classNamePrefix="react-select"
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="col-form-label">
                          Currency <span className="text-danger">*</span>
                        </label>
                        <input type="text" className="form-control" />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="col-form-label">
                          Language <span className="text-danger">*</span>
                        </label>
                        <Select
                          className="select2"
                          classNamePrefix="react-select"
                          options={languages}
                          placeholder="Choose"
                        />
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="mb-0">
                        <label className="col-form-label">
                          Description <span className="text-danger">*</span>
                        </label>
                        <textarea
                          className="form-control"
                          rows={5}
                          defaultValue={""}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* /Basic Info */}
            {/* Address Info */}
            <div className="accordion-item border-top rounded mb-3">
              <div className="accordion-header">
                <Link
                  to="#"
                  className="accordion-button accordion-custom-button rounded bg-white fw-medium text-dark"
                  data-bs-toggle="collapse"
                  data-bs-target="#address"
                >
                  <span className="avatar avatar-md rounded text-dark border me-2">
                    <i className="ti ti-map-pin-cog fs-20" />
                  </span>
                  Address Info
                </Link>
              </div>
              <div
                className="accordion-collapse collapse"
                id="address"
                data-bs-parent="#main_accordion"
              >
                <div className="accordion-body border-top">
                  <div className="row">
                    <div className="col-md-12">
                      <div className="mb-3">
                        <label className="col-form-label">
                          Street Address{" "}
                        </label>
                        <input type="text" className="form-control" />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="col-form-label">City </label>
                        <input type="text" className="form-control" />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="col-form-label">
                          State / Province{" "}
                        </label>
                        <input type="text" className="form-control" />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3 mb-md-0">
                        <label className="col-form-label">Country</label>
                        <Select
                          className="select2"
                          classNamePrefix="react-select"
                          options={countries}
                          placeholder="Choose"
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-0">
                        <label className="col-form-label">Zipcode </label>
                        <input type="text" className="form-control" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* /Address Info */}
            {/* Social Profile */}
            <div className="accordion-item border-top rounded mb-3">
              <div className="accordion-header">
                <Link
                  to="#"
                  className="accordion-button accordion-custom-button rounded bg-white fw-medium text-dark"
                  data-bs-toggle="collapse"
                  data-bs-target="#social"
                >
                  <span className="avatar avatar-md rounded text-dark border me-2">
                    <i className="ti ti-social fs-20" />
                  </span>
                  Social Profile
                </Link>
              </div>
              <div
                className="accordion-collapse collapse"
                id="social"
                data-bs-parent="#main_accordion"
              >
                <div className="accordion-body border-top">
                  <div className="row">
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="col-form-label">Facebook</label>
                        <input type="text" className="form-control" />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="col-form-label">Skype </label>
                        <input type="text" className="form-control" />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="col-form-label">Linkedin </label>
                        <input type="text" className="form-control" />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="col-form-label">Twitter</label>
                        <input type="text" className="form-control" />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3 mb-md-0">
                        <label className="col-form-label">Whatsapp</label>
                        <input type="text" className="form-control" />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-0">
                        <label className="col-form-label">Instagram</label>
                        <input type="text" className="form-control" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* /Social Profile */}
            {/* Access */}
            <div className="accordion-item border-top rounded mb-3">
              <div className="accordion-header">
                <Link
                  to="#"
                  className="accordion-button accordion-custom-button rounded bg-white fw-medium text-dark"
                  data-bs-toggle="collapse"
                  data-bs-target="#access-info"
                >
                  <span className="avatar avatar-md rounded text-dark border me-2">
                    <i className="ti ti-accessible fs-20" />
                  </span>
                  Access
                </Link>
              </div>
              <div
                className="accordion-collapse collapse"
                id="access-info"
                data-bs-parent="#main_accordion"
              >
                <div className="accordion-body border-top">
                  <div className="row">
                    <div className="col-md-12">
                      <div className="mb-3">
                        <label className="col-form-label">Visibility</label>
                        <div className="d-flex flex-wrap">
                          <div className="me-2">
                            <input
                              type="radio"
                              className="status-radio"
                              id="public"
                              name="visible"
                            />
                            <label htmlFor="public">Public</label>
                          </div>
                          <div className="me-2">
                            <input
                              type="radio"
                              className="status-radio"
                              id="private"
                              name="visible"
                            />
                            <label htmlFor="private">Private</label>
                          </div>
                          <div
                            data-bs-toggle="modal"
                            data-bs-target="#access_view"
                          >
                            <input
                              type="radio"
                              className="status-radio"
                              id="people"
                              name="visible"
                            />
                            <label htmlFor="people">Select People</label>
                          </div>
                        </div>
                      </div>
                      <div className="mb-0">
                        <label className="col-form-label">Status</label>
                        <div className="d-flex flex-wrap">
                          <div className="me-2">
                            <input
                              type="radio"
                              className="status-radio"
                              id="active"
                              name="status"
                              defaultChecked
                            />
                            <label htmlFor="active">Active</label>
                          </div>
                          <div>
                            <input
                              type="radio"
                              className="status-radio"
                              id="inactive"
                              name="status"
                            />
                            <label htmlFor="inactive">Inactive</label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* /Access */}
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
              onClick={()=>setOpenModal2(true)}
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
    {/* /Edit Company */}
    {/* Delete Company */}
    
    {/* /Delete Company */}
    {/* Add New Deals */}
    <div
        className="offcanvas offcanvas-end offcanvas-large"
        tabIndex={-1}
        id="offcanvas_add_2"
      >
        <div className="offcanvas-header border-bottom">
          <h5 className="fw-semibold">Add New Deals</h5>
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
              <div className="col-md-12">
                <div className="mb-3">
                  <label className="col-form-label">
                    Deal Name <span className="text-danger">*</span>
                  </label>
                  <input type="text" className="form-control" />
                </div>
              </div>
              <div className="col-md-6">
                  <div className="mb-3">
                    <div className="d-flex align-items-center justify-content-between">
                      <label className="col-form-label">
                        Pipeine <span className="text-danger">*</span>
                      </label>
                    </div>
                    <Select
                      className="select2"
                      options={salestypelist}
                      placeholder="Choose"
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
                      className="select2"
                      options={status}
                      placeholder="Choose"
                      classNamePrefix="react-select"
                    />
                  </div>
                </div>
                <div className="col-lg-3 col-md-6">
                  <div className="mb-3">
                    <label className="col-form-label">
                      Deal Value<span className="text-danger"> *</span>
                    </label>
                    <input className="form-control" type="text" />
                  </div>
                </div>
                <div className="col-lg-3 col-md-6">
                  <div className="mb-3">
                    <label className="col-form-label">
                      Currency <span className="text-danger">*</span>
                    </label>
                    <Select
                      className="select2"
                      options={optionssymbol}
                      placeholder="Choose"
                       classNamePrefix="react-select"
                    />
                  </div>
                </div>
                <div className="col-lg-3 col-md-6">
                  <div className="mb-3">
                    <label className="col-form-label">
                      Period <span className="text-danger">*</span>
                    </label>
                    <Select
                      className="select2"
                      options={duration}
                      placeholder="Choose"
                      classNamePrefix="react-select"
                    />
                  </div>
                </div>
                <div className="col-lg-3 col-md-6">
                  <div className="mb-3">
                    <label className="col-form-label">
                      Period Value <span className="text-danger">*</span>
                    </label>
                    <input className="form-control" type="text" />
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="mb-3">
                    <label className="col-form-label">
                      Contact <span className="text-danger">*</span>
                    </label>
                    <SelectWithImage2 />
                  </div>
                  <div className="mb-3">
                    <label className="col-form-label">
                      Project <span className="text-danger">*</span>
                    </label>
                    <Select
                      className="select2"
                      options={project}
                      defaultValue={tagInputValues}
                      isMulti
                       classNamePrefix="react-select"
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="col-form-label">
                      Due Date <span className="text-danger">*</span>
                    </label>
                    <div className="icon-form">
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
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="col-form-label">
                      Expected Closing Date{" "}
                      <span className="text-danger">*</span>
                    </label>
                    <div className="icon-form">
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
                </div>
                <div className="col-md-12">
                  <div className="mb-3">
                    <label className="col-form-label">
                      Assignee <span className="text-danger">*</span>
                    </label>
                    <SelectWithImage2 />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="col-form-label">
                      Follow Up Date <span className="text-danger">*</span>
                    </label>
                    <div className="icon-form">
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
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="col-form-label">
                      Source <span className="text-danger">*</span>
                    </label>

                    <Select
                      className="select2"
                      options={socialMedia}
                      placeholder="Choose"
                       classNamePrefix="react-select"
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="col-form-label">
                      Tags <span className="text-danger">*</span>
                    </label>
                    <TagsInput
                              // className="input-tags form-control"
                              value={owner}
                              onChange={setOwner}
                            />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="col-form-label">
                      Priority <span className="text-danger">*</span>
                    </label>
                    <Select
                      className="select2"
                      options={priorityList}
                      placeholder="Choose"
                       classNamePrefix="react-select"
                    />
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="mb-3">
                    <label className="col-form-label">
                      Description <span className="text-danger">*</span>
                    </label>
                    <DefaultEditor className="summernote" />
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
                onClick={() => setOpenModal(true)}
              >
                Create
              </button>
            </div>
          </form>
        </div>
      </div>
    {/* /Add New Deals */}
    <Modal show={openModal} onHide={() => setOpenModal(false)}>

<div className="modal-header border-0 m-0 justify-content-end">
<button
  className="btn-close"
  aria-label="Close"
  onClick={() => setOpenModal(false)}
>
  <i className="ti ti-x" />
</button>
</div>
<div className="modal-body">
<div className="success-message text-center">
  <div className="success-popup-icon bg-light-blue">
    <i className="ti ti-medal" />
  </div>
  <h3>Deal Created Successfully!!!</h3>
  <p>View the details of deal, created</p>
  <div className="col-lg-12 text-center modal-btn">
    <Link
      to="#"
      className="btn btn-light"
      onClick={() => setOpenModal(false)}
    >
      Cancel
    </Link>
    <Link to={route.companyDetails} className="btn btn-primary">
      View Details
    </Link>
  </div>
</div>
</div>
</Modal><Modal show={openModal2} onHide={() => setOpenModal2(false)}>
            <div className="modal-header border-0 m-0 justify-content-end">
              <button
                className="btn-close"
                aria-label="Close"
                onClick={() => setOpenModal2(false)}
              >
                <i className="ti ti-x" />
              </button>
            </div>
            <div className="modal-body">
              <div className="success-message text-center">
                <div className="success-popup-icon bg-light-blue">
                  <i className="ti ti-user-plus" />
                </div>
                <h3>Company  Created Successfully!!!</h3>
                <p>View the details of Company, created</p>
                <div className="col-lg-12 text-center modal-btn">
                  <Link
                    to="#"
                    className="btn btn-light"
                    onClick={() => setOpenModal2(false)}
                  >
                    Cancel
                  </Link>
                  <Link to={route.companyDetails} className="btn btn-primary">
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          </Modal>
  </>
  );
};

export default CompaniesGrid;
