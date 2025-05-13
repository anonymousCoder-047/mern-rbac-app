import React, { useState } from "react";
import { Link } from "react-router-dom";
import ImageWithBasePath from "../../../core/common/imageWithBasePath";
import { useDispatch, useSelector } from "react-redux";
import {
  setActivityTogglePopup,
  setActivityTogglePopupTwo,
} from "../../../core/data/redux/commonSlice";
import Select from "react-select";
import {
  accountType,
  ascendingandDecending,
  companyName,
  documentType,
  duration,
  languageOptions,
  LocaleData,
  optionssymbol,
  priorityList,
  project,
  salestypelist,
  socialMedia,
  status,
  statusList,
  tagInputValues,
} from "../../../core/common/selectoption/selectoption";
import DatePicker from "react-datepicker";
import { TagsInput } from "react-tag-input-component";
import DefaultEditor from "react-simple-wysiwyg";
import { OverlayTrigger, Tooltip, Modal } from "react-bootstrap";
import { all_routes } from "../../router/all_routes";
import CollapseHeader from "../../../core/common/collapse-header";
import { SelectWithImage } from "../../../core/common/selectWithImage";
import { SelectWithImage2 } from "../../../core/common/selectWithImage2";
const CompaniesDetails = () => {
  const route = all_routes;
  const dispatch = useDispatch();
  const [openModal, setOpenModal] = useState(false);
  const [openModal2, setOpenModal2] = useState(false);
  const [isEditor, setIsEditor] = useState(false);
  const [isEditor2, setIsEditor2] = useState(false);
  const [isEditor3, setIsEditor3] = useState(false);
  const activityToggle = useSelector(
    (state: any) => state?.activityTogglePopup
  );
  const activityToggleTwo = useSelector(
    (state: any) => state?.activityTogglePopupTwo
  );
  const [owner, setOwner] = useState(["Collab"]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
  };
  const [selectedDate1, setSelectedDate1] = useState<Date | null>(new Date());
  const handleDateChange1 = (date: Date | null) => {
    setSelectedDate1(date);
  };
  const [selectedDate2, setSelectedDate2] = useState<Date | null>(new Date());
  const handleDateChange2 = (date: Date | null) => {
    setSelectedDate2(date);
  };
  const [selectedDate4, setSelectedDate4] = useState<Date | null>(new Date());
  const handleDateChange4 = (date: Date | null) => {
    setSelectedDate4(date);
  };
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
  const countries = [
    { value: "Choose", label: "Choose" },
    { value: "India", label: "India" },
    { value: "USA", label: "USA" },
    { value: "France", label: "France" },
    { value: "UAE", label: "UAE" },
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
                  <div className="col-sm-4">
                    <h4 className="page-title">Company Overview</h4>
                  </div>
                  <div className="col-sm-8 text-sm-end">
                    <div className="head-icons">
                      <CollapseHeader />
                    </div>
                  </div>
                </div>
              </div>
              {/* /Page Header */}
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              {/* Contact User */}
              <div className="contact-head">
                <div className="row align-items-center">
                  <div className="col-sm-6">
                    <ul className="contact-breadcrumb">
                      <li>
                        <Link to={route.companiesGrid}>
                          <i className="ti ti-arrow-narrow-left" />
                          Company
                        </Link>
                      </li>
                      <li>NovaWave LLC</li>
                    </ul>
                  </div>
                  <div className="col-sm-6 text-sm-end">
                    <div className="contact-pagination">
                      <p>1 of 40</p>
                      <ul>
                        <li>
                          <Link to={route.companyDetails}>
                            <i className="ti ti-chevron-left" />
                          </Link>
                        </li>
                        <li>
                          <Link to={route.companyDetails}>
                            <i className="ti ti-chevron-right" />
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card">
                <div className="card-body pb-2">
                  <div className="d-flex align-items-center justify-content-between flex-wrap">
                    <div className="d-flex align-items-center mb-2">
                      <div className="avatar avatar-xxl me-3 flex-shrink-0 border p-2">
                        <ImageWithBasePath
                          src="assets/img/icons/company-icon-01.svg"
                          alt="Image"
                        />
                      </div>
                      <div>
                        <h5 className="mb-1">NovaWave LLC</h5>
                        <p className="mb-2">
                          <i className="ti ti-map-pin-pin me-1"></i>22, Ave
                          Street, Newyork, USA
                        </p>
                        <p className="d-inline-flex align-items-center mb-0">
                          <i className="fa-solid fa-star text-warning me-1"></i>{" "}
                          5.0
                        </p>
                      </div>
                    </div>
                    <div className="contacts-action">
                      <Link to="#" className="btn-icon rating">
                        <i className="fa-solid fa-star" />
                      </Link>
                      <Link
                        to="#"
                        className="btn btn-danger"
                        data-bs-toggle="offcanvas"
                        data-bs-target="#offcanvas_add_2"
                      >
                        <i className="ti ti-circle-plus" />
                        Add Deal
                      </Link>
                      <Link
                        to="#"
                        className="btn btn-primary"
                        data-bs-toggle="modal"
                        data-bs-target="#add_compose"
                      >
                        <i className="ti ti-mail" />
                        Send Email
                      </Link>
                      <Link to={route.chat} className="btn-icon">
                        <i className="ti ti-brand-hipchat" />
                      </Link>
                      <Link
                        to="#"
                        className="btn-icon"
                        data-bs-toggle="offcanvas"
                        data-bs-target="#offcanvas_edit"
                      >
                        <i className="ti ti-edit-circle" />
                      </Link>
                      <div className="act-dropdown">
                        <Link
                          to="#"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        >
                          <i className="ti ti-dots-vertical" />
                        </Link>
                        <div className="dropdown-menu dropdown-menu-right">
                          <Link
                            className="dropdown-item"
                            to="#"
                            onClick={() => setOpenModal(true)}
                          >
                            <i className="ti ti-trash text-danger" />
                            Delete
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* /Contact User */}
            </div>
            {/* Contact Sidebar */}
            <div className="col-xl-3 theiaStickySidebar">
              <div className="card">
                <div className="card-body p-3">
                  <h6 className="mb-3 fw-semibold">Basic Information</h6>
                  <div className="mb-3">
                    <div className="d-flex align-items-center mb-3">
                      <span className="avatar avatar-xs bg-light-300 p-0 flex-shrink-0 rounded-circle text-dark me-2">
                        <i className="ti ti-mail" />
                      </span>
                      <p>NovaW@example.com</p>
                    </div>
                    <div className="d-flex align-items-center mb-3">
                      <span className="avatar avatar-xs bg-light-300 p-0 flex-shrink-0 rounded-circle text-dark me-2">
                        <i className="ti ti-phone" />
                      </span>
                      <p>+1 12445-47878</p>
                    </div>
                    <div className="d-flex align-items-center mb-3">
                      <span className="avatar avatar-xs bg-light-300 p-0 flex-shrink-0 rounded-circle text-dark me-2">
                        <i className="ti ti-calendar-exclamation" />
                      </span>
                      <p>Created on 5 Jan 2024, 10:30 am</p>
                    </div>
                  </div>
                  <hr />
                  <h6 className="mb-3 fw-semibold">Other Information</h6>
                  <ul>
                    <li className="row mb-3">
                      <span className="col-6">Language</span>
                      <span className="col-6">English</span>
                    </li>
                    <li className="row mb-3">
                      <span className="col-6">Currency</span>
                      <span className="col-6">United States dollar</span>
                    </li>
                    <li className="row mb-3">
                      <span className="col-6">Last Modified</span>
                      <span className="col-6">27 Sep 2023, 11:45 pm</span>
                    </li>
                    <li className="row mb-3">
                      <span className="col-6">Source</span>
                      <span className="col-6">Paid Campaign</span>
                    </li>
                  </ul>
                  <hr />
                  <h6 className="mb-3 fw-semibold">Tags</h6>
                  <div className="mb-3">
                    <Link
                      to="#"
                      className="badge badge-soft-success fw-medium me-2"
                    >
                      Collab
                    </Link>
                    <Link
                      to="#"
                      className="badge badge-soft-warning fw-medium mb-0"
                    >
                      Rated
                    </Link>
                  </div>
                  <hr />
                  <div className="d-flex align-items-center justify-content-between flex-wrap">
                    <h6 className="mb-3 fw-semibold">Company</h6>
                    <Link
                      to="#"
                      className="com-add link-purple fw-medium mb-3"
                      data-bs-toggle="offcanvas"
                      data-bs-target="#offcanvas_add"
                    >
                      <i className="ti ti-circle-plus me-1" />
                      Add New
                    </Link>
                  </div>
                  <div className="d-flex align-items-center mb-3">
                    <span className="avatar avatar-sm border rounded-circle p-1 me-2">
                      <ImageWithBasePath
                        src="assets/img/icons/company-icon-01.svg"
                        alt="Image"
                      />
                    </span>
                    <div>
                      <h6 className="fw-medium">NovaWaveLLC</h6>
                      <p>
                        <i className="fa-solid fa-star me-1 text-warning me-1" />
                        3.5
                      </p>
                    </div>
                  </div>
                  <div className="d-flex align-items-center mb-0">
                    <span className="avatar avatar-sm border rounded-circle p-1 me-2">
                      <ImageWithBasePath
                        src="assets/img/icons/company-icon-02.svg"
                        alt="Image"
                      />
                    </span>
                    <div>
                      <h6 className="fw-medium">BlueSky Industries</h6>
                      <p>
                        <i className="fa-solid fa-star me-1 text-warning me-1" />
                        4.2
                      </p>
                    </div>
                  </div>
                  <hr />
                  <h6 className="mb-3 fw-semibold">Social Profile</h6>
                  <ul className="social-info">
                    <li>
                      <Link to="#">
                        <i className="fa-brands fa-youtube" />
                      </Link>
                    </li>
                    <li>
                      <Link to="#">
                        <i className="fa-brands fa-facebook-f" />
                      </Link>
                    </li>
                    <li>
                      <Link to="#">
                        <i className="fa-brands fa-instagram" />
                      </Link>
                    </li>
                    <li>
                      <Link to="#">
                        <i className="fa-brands fa-whatsapp" />
                      </Link>
                    </li>
                    <li>
                      <Link to="#">
                        <i className="fa-brands fa-pinterest" />
                      </Link>
                    </li>
                    <li>
                      <Link to="#">
                        <i className="fa-brands fa-linkedin" />
                      </Link>
                    </li>
                  </ul>
                  <hr />
                  <h6 className="mb-3 fw-semibold">Settings</h6>
                  <Link to="#" className="d-block mb-3">
                    <i className="ti ti-share-2 me-1" />
                    Share Company
                  </Link>
                  <Link to="#" className="d-block mb-3">
                    <i className="ti ti-star me-1" />
                    Add to Favourite
                  </Link>
                  <Link
                    to="#"
                    className="d-block mb-0"
                    onClick={() => setOpenModal(true)}
                  >
                    <i className="ti ti-trash-x me-1" />
                    Delete Company
                  </Link>
                </div>
              </div>
            </div>
            {/* /Contact Sidebar */}
            {/* Contact Details */}
            <div className="col-xl-9">
              <div className="card mb-3">
                <div className="card-body pb-0 pt-2">
                  <ul className="nav nav-tabs nav-tabs-bottom" role="tablist">
                    <li className="nav-item" role="presentation">
                      <Link
                        to="#"
                        data-bs-toggle="tab"
                        data-bs-target="#activities"
                        className="nav-link active"
                      >
                        <i className="ti ti-alarm-minus me-1" />
                        Activities
                      </Link>
                    </li>
                    <li className="nav-item" role="presentation">
                      <Link
                        to="#"
                        data-bs-toggle="tab"
                        data-bs-target="#notes"
                        className="nav-link"
                      >
                        <i className="ti ti-notes me-1" />
                        Notes
                      </Link>
                    </li>
                    <li className="nav-item" role="presentation">
                      <Link
                        to="#"
                        data-bs-toggle="tab"
                        data-bs-target="#calls"
                        className="nav-link"
                      >
                        <i className="ti ti-phone me-1" />
                        Calls
                      </Link>
                    </li>
                    <li className="nav-item" role="presentation">
                      <Link
                        to="#"
                        data-bs-toggle="tab"
                        data-bs-target="#files"
                        className="nav-link"
                      >
                        <i className="ti ti-file me-1" />
                        Files
                      </Link>
                    </li>
                    <li className="nav-item" role="presentation">
                      <Link
                        to="#"
                        data-bs-toggle="tab"
                        data-bs-target="#email"
                        className="nav-link"
                      >
                        <i className="ti ti-mail-check me-1" />
                        Email
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
              {/* Tab Content */}
              <div className="tab-content pt-0">
                {/* Activities */}
                <div className="tab-pane active show" id="activities">
                  <div className="card">
                    <div className="card-header d-flex align-items-center justify-content-between flex-wrap row-gap-3">
                      <h4 className="fw-semibold">Activities</h4>
                      <div>
                        <div className="form-sort mt-0">
                          <i className="ti ti-sort-ascending-2" />
                          <Select
                            className="select"
                            options={ascendingandDecending}
                            placeholder="Ascending"
                            classNamePrefix="react-select"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="card-body">
                      <div className="badge badge-soft-purple fs-14 fw-normal shadow-none mb-3">
                        <i className="ti ti-calendar-check me-1" />
                        29 Aug 2023
                      </div>
                      <div className="card border shadow-none mb-3">
                        <div className="card-body p-3">
                          <div className="d-flex">
                            <span className="avatar avatar-md flex-shrink-0 rounded me-2 bg-pending">
                              <i className="ti ti-mail-code" />
                            </span>
                            <div>
                              <h6 className="fw-medium mb-1">
                                You sent 1 Message to the contact.
                              </h6>
                              <p>10:25 pm</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="card border shadow-none mb-3">
                        <div className="card-body p-3">
                          <div className="d-flex">
                            <span className="avatar avatar-md flex-shrink-0 rounded me-2 bg-secondary-success">
                              <i className="ti ti-phone" />
                            </span>
                            <div>
                              <h6 className="fw-medium mb-1">
                                Denwar responded to your appointment schedule
                                question by call at 09:30pm.
                              </h6>
                              <p>09:25 pm</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="card border shadow-none mb-3">
                        <div className="card-body p-3">
                          <div className="d-flex">
                            <span className="avatar avatar-md flex-shrink-0 rounded me-2 bg-orange">
                              <i className="ti ti-notes" />
                            </span>
                            <div>
                              <h6 className="fw-medium mb-1">
                                Notes added by Antony
                              </h6>
                              <p className="mb-1">
                                Please accept my apologies for the inconvenience
                                caused. It would be much appreciated if it's
                                possible to reschedule to 6:00 PM, or any other
                                day that week.
                              </p>
                              <p>10.00 pm</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="badge badge-soft-purple fs-14 fw-normal shadow-none mb-3">
                        <i className="ti ti-calendar-check me-1" />
                        28 Feb 2024
                      </div>
                      <div className="card border shadow-none mb-3">
                        <div className="card-body p-3">
                          <div className="d-flex">
                            <span className="avatar avatar-md flex-shrink-0 rounded me-2 bg-info">
                              <i className="ti ti-user-pin" />
                            </span>
                            <div>
                              <h6 className="fw-medium mb-1 d-inline-flex align-items-center flex-wrap">
                                Meeting With{" "}
                                <span className="avatar avatar-xs mx-2">
                                  <ImageWithBasePath
                                    src="assets/img/profiles/avatar-19.jpg"
                                    alt="img"
                                  />
                                </span>{" "}
                                Abraham
                              </h6>
                              <p>Schedueled on 05:00 pm</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="card border shadow-none mb-3">
                        <div className="card-body p-3">
                          <div className="d-flex">
                            <span className="avatar avatar-md flex-shrink-0 rounded me-2 bg-secondary-success">
                              <i className="ti ti-notes" />
                            </span>
                            <div>
                              <h6 className="fw-medium mb-1">
                                Drain responded to your appointment schedule
                                question.
                              </h6>
                              <p>09:25 pm</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="badge badge-soft-purple fs-14 fw-normal shadow-none mb-3">
                        <i className="ti ti-calendar-check me-1" />
                        Upcoming Activity
                      </div>
                      <div className="card border shadow-none mb-0">
                        <div className="card-body p-3">
                          <div className="d-flex">
                            <span className="avatar avatar-md flex-shrink-0 rounded me-2 bg-info">
                              <i className="ti ti-user-pin" />
                            </span>
                            <div>
                              <h6 className="fw-medium mb-1">
                                Product Meeting
                              </h6>
                              <p className="mb-1">
                                A product team meeting is a gathering of the
                                cross-functional product team — ideally
                                including team members from product,
                                engineering, marketing, and customer support.
                              </p>
                              <p>25 Jul 2023, 05:00 pm</p>
                              <div className="upcoming-info">
                                <div className="row">
                                  <div className="col-sm-4">
                                    <p>Reminder</p>
                                    <div className="dropdown">
                                      <Link
                                        to="#"
                                        className="dropdown-toggle"
                                        data-bs-toggle="dropdown"
                                        aria-expanded="false"
                                      >
                                        <i className="ti ti-clock-edit me-1" />
                                        Reminder
                                        <i className="ti ti-chevron-down ms-1" />
                                      </Link>
                                      <div className="dropdown-menu dropdown-menu-right">
                                        <Link className="dropdown-item" to="#">
                                          Remainder
                                        </Link>
                                        <Link className="dropdown-item" to="#">
                                          1 hr
                                        </Link>
                                        <Link className="dropdown-item" to="#">
                                          10 hr
                                        </Link>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-sm-4">
                                    <p>Task Priority</p>
                                    <div className="dropdown">
                                      <Link
                                        to="#"
                                        className="dropdown-toggle"
                                        data-bs-toggle="dropdown"
                                        aria-expanded="false"
                                      >
                                        <i className="ti ti-square-rounded-filled me-1 text-danger circle" />
                                        High
                                        <i className="ti ti-chevron-down ms-1" />
                                      </Link>
                                      <div className="dropdown-menu dropdown-menu-right">
                                        <Link className="dropdown-item" to="#">
                                          <i className="ti ti-square-rounded-filled me-1 text-danger circle" />
                                          High
                                        </Link>
                                        <Link className="dropdown-item" to="#">
                                          <i className="ti ti-square-rounded-filled me-1 text-success circle" />
                                          Low
                                        </Link>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-sm-4">
                                    <p>Assigned to</p>
                                    <div className="dropdown">
                                      <Link
                                        to="#"
                                        className="dropdown-toggle"
                                        data-bs-toggle="dropdown"
                                        aria-expanded="false"
                                      >
                                        <ImageWithBasePath
                                          src="assets/img/profiles/avatar-19.jpg"
                                          alt="img"
                                          className="avatar-xs"
                                        />
                                        John
                                        <i className="ti ti-chevron-down ms-1" />
                                      </Link>
                                      <div className="dropdown-menu dropdown-menu-right">
                                        <Link className="dropdown-item" to="#">
                                          <ImageWithBasePath
                                            src="assets/img/profiles/avatar-19.jpg"
                                            alt="img"
                                            className="avatar-xs"
                                          />
                                          John
                                        </Link>
                                        <Link className="dropdown-item" to="#">
                                          <ImageWithBasePath
                                            src="assets/img/profiles/avatar-15.jpg"
                                            alt="img"
                                            className="avatar-xs"
                                          />
                                          Peter
                                        </Link>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* /Activities */}
                {/* Notes */}
                <div className="tab-pane fade" id="notes">
                  <div className="card">
                    <div className="card-header d-flex align-items-center justify-content-between flex-wrap row-gap-3">
                      <h4 className="fw-semibold">Notes</h4>
                      <div className="d-inline-flex align-items-center">
                        <div className="form-sort me-3 mt-0">
                          <i className="ti ti-sort-ascending-2" />
                          <Select
                            className="select"
                            options={ascendingandDecending}
                            placeholder="Ascending"
                            classNamePrefix="react-select"
                          />
                        </div>
                        <Link
                          to="#"
                          data-bs-toggle="modal"
                          data-bs-target="#add_notes"
                          className="link-purple fw-medium"
                        >
                          <i className="ti ti-circle-plus me-1" />
                          Add New
                        </Link>
                      </div>
                    </div>
                    <div className="card-body">
                      <div className="notes-activity">
                        <div className="card mb-3">
                          <div className="card-body">
                            <div className="d-flex align-items-center justify-content-between pb-2">
                              <div className="d-inline-flex align-items-center mb-2">
                                <span className="avatar avatar-md me-2 flex-shrink-0">
                                  <ImageWithBasePath
                                    src="assets/img/profiles/avatar-19.jpg"
                                    alt="img"
                                  />
                                </span>
                                <div>
                                  <h6 className="fw-medium mb-1">
                                    Darlee Robertson
                                  </h6>
                                  <p className="mb-0">15 Sep 2023, 12:10 pm</p>
                                </div>
                              </div>
                              <div className="mb-2">
                                <div className="dropdown">
                                  <Link
                                    to="#"
                                    className="p-0 btn btn-icon btn-sm d-flex align-items-center justify-content-center"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                  >
                                    <i className="ti ti-dots-vertical" />
                                  </Link>
                                  <div className="dropdown-menu dropdown-menu-right">
                                    <Link className="dropdown-item" to="#">
                                      <i className="ti ti-edit text-blue me-1" />
                                      Edit
                                    </Link>
                                    <Link className="dropdown-item" to="#">
                                      <i className="ti ti-trash text-danger me-1" />
                                      Delete
                                    </Link>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <h5 className="fw-medium mb-1">
                              Notes added by Antony
                            </h5>
                            <p>
                              A project review evaluates the success of an
                              initiative and identifies areas for improvement.
                              It can also evaluate a current project to
                              determine whether it's on the right track. Or, it
                              can determine the success of a completed project.{" "}
                            </p>
                            <div className="d-inline-flex align-items-center flex-wrap">
                              <div className="note-download me-3">
                                <div className="note-info">
                                  <span className="note-icon bg-secondary-success">
                                    <i className="ti ti-file-spreadsheet" />
                                  </span>
                                  <div>
                                    <h6 className="fw-medium mb-1">
                                      Project Specs.xls
                                    </h6>
                                    <p>365 KB</p>
                                  </div>
                                </div>
                                <Link to="#">
                                  <i className="ti ti-arrow-down" />
                                </Link>
                              </div>
                              <div className="note-download">
                                <div className="note-info">
                                  <span className="note-icon">
                                    <ImageWithBasePath
                                      src="assets/img/media/media-35.jpg"
                                      alt="img"
                                    />
                                  </span>
                                  <div>
                                    <h6 className="fw-medium mb-1">
                                      090224.jpg
                                    </h6>
                                    <p>365 KB</p>
                                  </div>
                                </div>
                                <Link to="#">
                                  <i className="ti ti-arrow-down" />
                                </Link>
                              </div>
                            </div>
                            <div className="notes-editor">
                              <div
                                className="note-edit-wrap"
                                style={{ display: isEditor ? "block" : "none" }}
                              >
                                <DefaultEditor className="summernote" />
                                <div className="text-end note-btns">
                                  <Link
                                    to="#"
                                    className="btn btn-light add-cancel"
                                    onClick={() => setIsEditor(!isEditor3)}
                                  >
                                    Cancel
                                  </Link>
                                  <Link to="#" className="btn btn-primary">
                                    Save
                                  </Link>
                                </div>
                              </div>
                              <div className="text-end">
                                <Link
                                  to="#"
                                  className="add-comment link-purple fw-medium"
                                  onClick={() => setIsEditor(!isEditor)}
                                >
                                  <i className="ti ti-square-plus me-1" />
                                  Add Comment
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="card mb-3">
                          <div className="card-body">
                            <div className="d-flex align-items-center justify-content-between pb-2">
                              <div className="d-inline-flex align-items-center mb-2">
                                <span className="avatar avatar-md me-2 flex-shrink-0">
                                  <ImageWithBasePath
                                    src="assets/img/profiles/avatar-20.jpg"
                                    alt="img"
                                  />
                                </span>
                                <div>
                                  <h6 className="fw-medium mb-1">Sharon Roy</h6>
                                  <p className="mb-0">18 Sep 2023, 09:52 am</p>
                                </div>
                              </div>
                              <div className="mb-2">
                                <div className="dropdown">
                                  <Link
                                    to="#"
                                    className="p-0 btn btn-icon btn-sm d-flex align-items-center justify-content-center"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                  >
                                    <i className="ti ti-dots-vertical" />
                                  </Link>
                                  <div className="dropdown-menu dropdown-menu-right">
                                    <Link className="dropdown-item" to="#">
                                      <i className="ti ti-edit text-blue me-1" />
                                      Edit
                                    </Link>
                                    <Link className="dropdown-item" to="#">
                                      <i className="ti ti-trash text-danger me-1" />
                                      Delete
                                    </Link>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <h5 className="fw-medium mb-1">
                              Notes added by Antony
                            </h5>
                            <p>
                              A project plan typically contains a list of the
                              essential elements of a project, such as
                              stakeholders, scope, timelines, estimated cost and
                              communication methods. The project manager
                              typically lists the information based on the
                              assignment.
                            </p>
                            <div className="d-inline-flex align-items-center flex-wrap">
                              <div className="note-download me-3">
                                <div className="note-info">
                                  <span className="note-icon bg-secondary-success">
                                    <i className="ti ti-file-text" />
                                  </span>
                                  <div>
                                    <h6 className="fw-medium mb-1">
                                      Andrewpass.txt
                                    </h6>
                                    <p>365 KB</p>
                                  </div>
                                </div>
                                <Link to="#">
                                  <i className="ti ti-arrow-down" />
                                </Link>
                              </div>
                            </div>
                            <div className="reply-box">
                              <p>
                                The best way to get a project done faster is to
                                start sooner. A goal without a timeline is just
                                a dream.The goal you set must be challenging. At
                                the same time, it should be realistic and
                                attainable, not impossible to reach.
                              </p>
                              <p>
                                Commented by{" "}
                                <span className="text-purple">Aeron</span> on 15
                                Sep 2023, 11:15 pm
                              </p>
                              <Link to="#" className="btn">
                                <i className="ti ti-arrow-back-up-double" />
                                Reply
                              </Link>
                            </div>
                            <div className="notes-editor">
                              <div
                                className="note-edit-wrap"
                                style={{
                                  display: isEditor2 ? "block" : "none",
                                }}
                              >
                                <DefaultEditor className="summernote" />
                                <div className="text-end note-btns">
                                  <Link
                                    to="#"
                                    className="btn btn-light add-cancel"
                                    onClick={() => setIsEditor2(!isEditor3)}
                                  >
                                    Cancel
                                  </Link>
                                  <Link to="#" className="btn btn-primary">
                                    Save
                                  </Link>
                                </div>
                              </div>
                              <div className="text-end">
                                <Link
                                  to="#"
                                  className="add-comment link-purple fw-medium"
                                  onClick={() => setIsEditor2(!isEditor2)}
                                >
                                  <i className="ti ti-square-plus me-1" />
                                  Add Comment
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="card mb-0">
                          <div className="card-body">
                            <div className="d-flex align-items-center justify-content-between pb-2">
                              <div className="d-inline-flex align-items-center mb-2">
                                <span className="avatar avatar-md me-2 flex-shrink-0">
                                  <ImageWithBasePath
                                    src="assets/img/profiles/avatar-21.jpg"
                                    alt="img"
                                  />
                                </span>
                                <div>
                                  <h6 className="fw-medium mb-1">Vaughan</h6>
                                  <p className="mb-0">20 Sep 2023, 10:26 pm</p>
                                </div>
                              </div>
                              <div className="mb-2">
                                <div className="dropdown">
                                  <Link
                                    to="#"
                                    className="p-0 btn btn-icon btn-sm d-flex align-items-center justify-content-center"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                  >
                                    <i className="ti ti-dots-vertical" />
                                  </Link>
                                  <div className="dropdown-menu dropdown-menu-right">
                                    <Link className="dropdown-item" to="#">
                                      <i className="ti ti-edit text-blue me-1" />
                                      Edit
                                    </Link>
                                    <Link className="dropdown-item" to="#">
                                      <i className="ti ti-trash text-danger me-1" />
                                      Delete
                                    </Link>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <p>
                              Projects play a crucial role in the success of
                              organizations, and their importance cannot be
                              overstated. Whether it's launching a new product,
                              improving an existing
                            </p>
                            <div className="notes-editor">
                              <div
                                className="note-edit-wrap"
                                style={{
                                  display: isEditor3 ? "block" : "none",
                                }}
                              >
                                <DefaultEditor className="summernote" />
                                <div className="text-end note-btns">
                                  <Link
                                    to="#"
                                    className="btn btn-light add-cancel"
                                    onClick={() => setIsEditor3(!isEditor3)}
                                  >
                                    Cancel
                                  </Link>
                                  <Link to="#" className="btn btn-primary">
                                    Save
                                  </Link>
                                </div>
                              </div>
                              <div className="text-end">
                                <Link
                                  to="#"
                                  className="add-comment link-purple fw-medium"
                                  onClick={() => setIsEditor3(!isEditor3)}
                                >
                                  <i className="ti ti-square-plus me-1" />
                                  Add Comment
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* /Notes */}
                {/* Calls */}
                <div className="tab-pane fade" id="calls">
                  <div className="card">
                    <div className="card-header d-flex align-items-center justify-content-between flex-wrap row-gap-3">
                      <h4 className="fw-semibold">Calls</h4>
                      <div className="d-inline-flex align-items-center">
                        <Link
                          to="#"
                          data-bs-toggle="modal"
                          data-bs-target="#create_call"
                          className="link-purple fw-medium"
                        >
                          <i className="ti ti-circle-plus me-1" />
                          Add New
                        </Link>
                      </div>
                    </div>
                    <div className="card-body">
                      <div className="card mb-3">
                        <div className="card-body">
                          <div className="d-sm-flex align-items-center justify-content-between pb-2">
                            <div className="d-flex align-items-center mb-2">
                              <span className="avatar avatar-md me-2 flex-shrink-0">
                                <ImageWithBasePath
                                  src="assets/img/profiles/avatar-19.jpg"
                                  alt="img"
                                />
                              </span>
                              <p>
                                <span className="text-dark fw-medium">
                                  Darlee Robertson
                                </span>{" "}
                                logged a call on 23 Jul 2023, 10:00 pm
                              </p>
                            </div>
                            <div className="d-inline-flex align-items-center mb-2">
                              <div className="dropdown me-2">
                                <Link
                                  to="#"
                                  className="bg-danger py-1"
                                  data-bs-toggle="dropdown"
                                  aria-expanded="false"
                                >
                                  Busy
                                  <i className="ti ti-chevron-down ms-2" />
                                </Link>
                                <div className="dropdown-menu dropdown-menu-right">
                                  <Link className="dropdown-item" to="#">
                                    Busy
                                  </Link>
                                  <Link className="dropdown-item" to="#">
                                    No Answer
                                  </Link>
                                  <Link className="dropdown-item" to="#">
                                    Unavailable
                                  </Link>
                                  <Link className="dropdown-item" to="#">
                                    Wrong Number
                                  </Link>
                                  <Link className="dropdown-item" to="#">
                                    Left Voice Message
                                  </Link>
                                  <Link className="dropdown-item" to="#">
                                    Moving Forward
                                  </Link>
                                </div>
                              </div>
                              <div className="dropdown">
                                <Link
                                  to="#"
                                  className="p-0 btn btn-icon btn-sm d-flex align-items-center justify-content-center"
                                  data-bs-toggle="dropdown"
                                  aria-expanded="false"
                                >
                                  <i className="ti ti-dots-vertical" />
                                </Link>
                                <div className="dropdown-menu dropdown-menu-right">
                                  <Link className="dropdown-item" to="#">
                                    <i className="ti ti-edit text-blue me-1" />
                                    Edit
                                  </Link>
                                  <Link className="dropdown-item" to="#">
                                    <i className="ti ti-trash text-danger me-1" />
                                    Delete
                                  </Link>
                                </div>
                              </div>
                            </div>
                          </div>
                          <p>
                            A project review evaluates the success of an
                            initiative and identifies areas for improvement. It
                            can also evaluate a current project to determine
                            whether it's on the right track. Or, it can
                            determine the success of a completed project.{" "}
                          </p>
                        </div>
                      </div>
                      <div className="card mb-3">
                        <div className="card-body">
                          <div className="d-sm-flex align-items-center justify-content-between pb-2">
                            <div className="d-flex align-items-center mb-2">
                              <span className="avatar avatar-md me-2 flex-shrink-0">
                                <ImageWithBasePath
                                  src="assets/img/profiles/avatar-20.jpg"
                                  alt="img"
                                />
                              </span>
                              <p>
                                <span className="text-dark fw-medium">
                                  Sharon Roy
                                </span>{" "}
                                logged a call on 28 Jul 2023, 09:00 pm
                              </p>
                            </div>
                            <div className="d-inline-flex align-items-center mb-2">
                              <div className="dropdown me-2">
                                <Link
                                  to="#"
                                  className="bg-pending py-1"
                                  data-bs-toggle="dropdown"
                                  aria-expanded="false"
                                >
                                  No Answer
                                  <i className="ti ti-chevron-down ms-2" />
                                </Link>
                                <div className="dropdown-menu dropdown-menu-right">
                                  <Link className="dropdown-item" to="#">
                                    Busy
                                  </Link>
                                  <Link className="dropdown-item" to="#">
                                    No Answer
                                  </Link>
                                  <Link className="dropdown-item" to="#">
                                    Unavailable
                                  </Link>
                                  <Link className="dropdown-item" to="#">
                                    Wrong Number
                                  </Link>
                                  <Link className="dropdown-item" to="#">
                                    Left Voice Message
                                  </Link>
                                  <Link className="dropdown-item" to="#">
                                    Moving Forward
                                  </Link>
                                </div>
                              </div>
                              <div className="dropdown">
                                <Link
                                  to="#"
                                  className="p-0 btn btn-icon btn-sm d-flex align-items-center justify-content-center"
                                  data-bs-toggle="dropdown"
                                  aria-expanded="false"
                                >
                                  <i className="ti ti-dots-vertical" />
                                </Link>
                                <div className="dropdown-menu dropdown-menu-right">
                                  <Link className="dropdown-item" to="#">
                                    <i className="ti ti-edit text-blue me-1" />
                                    Edit
                                  </Link>
                                  <Link className="dropdown-item" to="#">
                                    <i className="ti ti-trash text-danger me-1" />
                                    Delete
                                  </Link>
                                </div>
                              </div>
                            </div>
                          </div>
                          <p>
                            A project plan typically contains a list of the
                            essential elements of a project, such as
                            stakeholders, scope, timelines, estimated cost and
                            communication methods. The project manager typically
                            lists the information based on the assignment.
                          </p>
                        </div>
                      </div>
                      <div className="card mb-0">
                        <div className="card-body">
                          <div className="d-sm-flex align-items-center justify-content-between pb-2">
                            <div className="d-flex align-items-center mb-2">
                              <span className="avatar avatar-md me-2 flex-shrink-0">
                                <ImageWithBasePath
                                  src="assets/img/profiles/avatar-21.jpg"
                                  alt="img"
                                />
                              </span>
                              <p>
                                <span className="text-dark fw-medium">
                                  Vaughan
                                </span>{" "}
                                logged a call on 30 Jul 2023, 08:00 pm
                              </p>
                            </div>
                            <div className="d-inline-flex align-items-center mb-2">
                              <div className="dropdown me-2">
                                <Link
                                  to="#"
                                  className="bg-pending py-1"
                                  data-bs-toggle="dropdown"
                                  aria-expanded="false"
                                >
                                  No Answer
                                  <i className="ti ti-chevron-down ms-2" />
                                </Link>
                                <div className="dropdown-menu dropdown-menu-right">
                                  <Link className="dropdown-item" to="#">
                                    Busy
                                  </Link>
                                  <Link className="dropdown-item" to="#">
                                    No Answer
                                  </Link>
                                  <Link className="dropdown-item" to="#">
                                    Unavailable
                                  </Link>
                                  <Link className="dropdown-item" to="#">
                                    Wrong Number
                                  </Link>
                                  <Link className="dropdown-item" to="#">
                                    Left Voice Message
                                  </Link>
                                  <Link className="dropdown-item" to="#">
                                    Moving Forward
                                  </Link>
                                </div>
                              </div>
                              <div className="dropdown">
                                <Link
                                  to="#"
                                  className="p-0 btn btn-icon btn-sm d-flex align-items-center justify-content-center"
                                  data-bs-toggle="dropdown"
                                  aria-expanded="false"
                                >
                                  <i className="ti ti-dots-vertical" />
                                </Link>
                                <div className="dropdown-menu dropdown-menu-right">
                                  <Link className="dropdown-item" to="#">
                                    <i className="ti ti-edit text-blue me-1" />
                                    Edit
                                  </Link>
                                  <Link className="dropdown-item" to="#">
                                    <i className="ti ti-trash text-danger me-1" />
                                    Delete
                                  </Link>
                                </div>
                              </div>
                            </div>
                          </div>
                          <p>
                            Projects play a crucial role in the success of
                            organizations, and their importance cannot be
                            overstated. Whether it's launching a new product,
                            improving an existing
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* /Calls */}
                {/* Files */}
                <div className="tab-pane fade" id="files">
                  <div className="card">
                    <div className="card-header">
                      <h4 className="fw-semibold">Files</h4>
                    </div>
                    <div className="card-body">
                      <div className="card border mb-3">
                        <div className="card-body pb-0">
                          <div className="row align-items-center">
                            <div className="col-md-8">
                              <div className="mb-3">
                                <h4 className="fw-medium mb-1">
                                  Manage Documents
                                </h4>
                                <p>
                                  Send customizable quotes, proposals and
                                  contracts to close deals faster.
                                </p>
                              </div>
                            </div>
                            <div className="col-md-4 text-md-end">
                              <div className="mb-3">
                                <Link
                                  to="#"
                                  className="btn btn-primary"
                                  data-bs-toggle="modal"
                                  data-bs-target="#new_file"
                                >
                                  Create Document
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="card border shadow-none mb-3">
                        <div className="card-body pb-0">
                          <div className="row align-items-center">
                            <div className="col-md-8">
                              <div className="mb-3">
                                <h4 className="fw-medium mb-1">
                                  Collier-Turner Proposal
                                </h4>
                                <p>
                                  Send customizable quotes, proposals and
                                  contracts to close deals faster.
                                </p>
                                <div className="d-flex align-items-center">
                                  <span className="avatar avatar-md me-2 flex-shrink-0">
                                    <ImageWithBasePath
                                      src="assets/img/profiles/avatar-21.jpg"
                                      alt="img"
                                      className="rounded-circle"
                                    />
                                  </span>
                                  <div>
                                    <span className="fs-12">Owner</span>
                                    <p>Vaughan</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="col-md-4 text-md-end">
                              <div className="mb-3 d-inline-flex align-items-center">
                                <span className="badge badge-danger-light me-1">
                                  Proposal
                                </span>
                                <span className="badge bg-pending priority-badge me-1">
                                  Draft
                                </span>
                                <div className="dropdown">
                                  <Link
                                    to="#"
                                    className="p-0 btn btn-icon btn-sm d-flex align-items-center justify-content-center"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                  >
                                    <i className="ti ti-dots-vertical" />
                                  </Link>
                                  <div className="dropdown-menu dropdown-menu-right">
                                    <Link className="dropdown-item" to="#">
                                      <i className="ti ti-edit text-blue me-1" />
                                      Edit
                                    </Link>
                                    <Link className="dropdown-item" to="#">
                                      <i className="ti ti-trash text-danger me-1" />
                                      Delete
                                    </Link>
                                    <Link className="dropdown-item" to="#">
                                      <i className="ti ti-download text-info me-1" />
                                      Download
                                    </Link>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="card border shadow-none mb-3">
                        <div className="card-body pb-0">
                          <div className="row align-items-center">
                            <div className="col-md-8">
                              <div className="mb-3">
                                <h4 className="fw-medium mb-1">
                                  Collier-Turner Proposal
                                </h4>
                                <p>
                                  Send customizable quotes, proposals and
                                  contracts to close deals faster.
                                </p>
                                <div className="d-flex align-items-center">
                                  <span className="avatar avatar-md me-2 flex-shrink-0">
                                    <ImageWithBasePath
                                      src="assets/img/profiles/avatar-01.jpg"
                                      alt="img"
                                      className="rounded-circle"
                                    />
                                  </span>
                                  <div>
                                    <span className="fs-12">Owner</span>
                                    <p>Jessica</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="col-md-4 text-md-end">
                              <div className="mb-3 d-inline-flex align-items-center">
                                <span className="badge badge-purple-light me-1">
                                  Quote
                                </span>
                                <span className="badge bg-success me-1">
                                  Sent
                                </span>
                                <div className="dropdown">
                                  <Link
                                    to="#"
                                    className="p-0 btn btn-icon btn-sm d-flex align-items-center justify-content-center"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                  >
                                    <i className="ti ti-dots-vertical" />
                                  </Link>
                                  <div className="dropdown-menu dropdown-menu-right">
                                    <Link className="dropdown-item" to="#">
                                      <i className="ti ti-edit text-blue me-1" />
                                      Edit
                                    </Link>
                                    <Link className="dropdown-item" to="#">
                                      <i className="ti ti-trash text-danger me-1" />
                                      Delete
                                    </Link>
                                    <Link className="dropdown-item" to="#">
                                      <i className="ti ti-download text-info me-1" />
                                      Download
                                    </Link>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="card border shadow-none mb-0">
                        <div className="card-body pb-0">
                          <div className="row align-items-center">
                            <div className="col-md-8">
                              <div className="mb-3">
                                <h4 className="fw-medium mb-1">
                                  Collier-Turner Proposal
                                </h4>
                                <p>
                                  Send customizable quotes, proposals and
                                  contracts to close deals faster.
                                </p>
                                <div className="d-flex align-items-center">
                                  <span className="avatar avatar-md me-2 flex-shrink-0">
                                    <ImageWithBasePath
                                      src="assets/img/profiles/avatar-22.jpg"
                                      alt="img"
                                      className="rounded-circle"
                                    />
                                  </span>
                                  <div>
                                    <span className="fs-12">Owner</span>
                                    <p>Dawn Merhca</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="col-md-4 text-md-end">
                              <div className="mb-3 d-inline-flex align-items-center">
                                <span className="badge badge-danger-light me-1">
                                  Proposal
                                </span>
                                <span className="badge bg-pending priority-badge me-1">
                                  Draft
                                </span>
                                <div className="dropdown">
                                  <Link
                                    to="#"
                                    className="p-0 btn btn-icon btn-sm d-flex align-items-center justify-content-center"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                  >
                                    <i className="ti ti-dots-vertical" />
                                  </Link>
                                  <div className="dropdown-menu dropdown-menu-right">
                                    <Link className="dropdown-item" to="#">
                                      <i className="ti ti-edit text-blue me-1" />
                                      Edit
                                    </Link>
                                    <Link className="dropdown-item" to="#">
                                      <i className="ti ti-trash text-danger me-1" />
                                      Delete
                                    </Link>
                                    <Link className="dropdown-item" to="#">
                                      <i className="ti ti-download text-info me-1" />
                                      Download
                                    </Link>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* /Files */}
                {/* Email */}
                <div className="tab-pane fade" id="email">
                  <div className="card">
                    <div className="card-header d-flex align-items-center justify-content-between flex-wrap row-gap-3">
                      <h4 className="fw-semibold">Email</h4>
                      <div className="d-inline-flex align-items-center">
                        <OverlayTrigger
                          placement="left"
                          overlay={
                            <Tooltip id="refresh-tooltip">
                              There are no email accounts configured, Please
                              configured your email account in order to Send/
                              Create EMails
                            </Tooltip>
                          }
                        >
                          <Link to="#">
                            <i className="ti ti-circle-plus me-1" />
                            Create Email
                          </Link>
                        </OverlayTrigger>
                        {/* <Link
                        to="#"
                        className="link-purple fw-medium"
                        data-bs-toggle="tooltip"
                        data-bs-placement="left"
                        data-bs-custom-className="tooltip-dark"
                        data-bs-original-title=""
                      >
                        <i className="ti ti-circle-plus me-1" />
                        Create Email
                      </Link> */}
                      </div>
                    </div>
                    <div className="card-body">
                      <div className="card border mb-0">
                        <div className="card-body pb-0">
                          <div className="row align-items-center">
                            <div className="col-md-8">
                              <div className="mb-3">
                                <h4 className="fw-medium mb-1">
                                  Manage Emails
                                </h4>
                                <p>
                                  You can send and reply to emails directly via
                                  this section.
                                </p>
                              </div>
                            </div>
                            <div className="col-md-4 text-md-end">
                              <div className="mb-3">
                                <Link
                                  to="#"
                                  className="btn btn-primary"
                                  data-bs-toggle="modal"
                                  data-bs-target="#create_email"
                                >
                                  Connect Account
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* /Email */}
              </div>
              {/* /Tab Content */}
            </div>
            {/* /Contact Details */}
          </div>
        </div>
      </div>
      {/* /Page Wrapper */}
      {/* Delete Contact */}
      <Modal show={openModal} onHide={() => setOpenModal(false)}>
        <div className="modal-body">
          <div className="text-center">
            <div className="avatar avatar-xl bg-danger-light rounded-circle mb-3">
              <i className="ti ti-trash-x fs-36 text-danger" />
            </div>
            <h4 className="mb-2">Remove Company?</h4>
            <p className="mb-0">
              Are you sure you want to remove <br /> Company you selected.
            </p>
            <div className="d-flex align-items-center justify-content-center mt-4">
              <Link
                to="#"
                className="btn btn-light me-2"
                onClick={() => setOpenModal(false)}
              >
                Cancel
              </Link>
              <Link to={route.companies} className="btn btn-danger">
                Yes, Delete it
              </Link>
            </div>
          </div>
        </div>
      </Modal>
      {/* /Delete Contact */}
      {/* Create Deal */}
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
                  <i className="ti ti-building" />
                </div>
                <h3>Deal Created Successfully!!!</h3>
                <p>View the details of deal, created</p>
                <div className="col-lg-12 text-center modal-btn">
                  <Link
                    to="#"
                    className="btn btn-light"
                    data-bs-dismiss="modal"
                  >
                    Cancel
                  </Link>
                  <Link
                    to={route.companyDetails}
                    data-bs-dismiss="modal"
                    className="btn btn-primary"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* /Create Deal */}
      {/* Add Note */}
      <div
        className="modal custom-modal fade modal-padding"
        id="add_notes"
        role="dialog"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Add New Notes</h5>
              <button
                type="button"
                className="btn-close position-static"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body">
              <form >
                <div className="mb-3">
                  <label className="col-form-label">
                    Title <span className="text-danger"> *</span>
                  </label>
                  <input className="form-control" type="text" />
                </div>
                <div className="mb-3">
                  <label className="col-form-label">
                    Note <span className="text-danger"> *</span>
                  </label>
                  <textarea
                    className="form-control"
                    rows={4}
                    defaultValue={""}
                  />
                </div>
                <div className="mb-3">
                  <label className="col-form-label">
                    Attachment <span className="text-danger"> *</span>
                  </label>
                  <div className="drag-attach">
                    <input type="file" />
                    <div className="img-upload">
                      <i className="ti ti-file-broken" />
                      Upload File
                    </div>
                  </div>
                </div>
                <div className="mb-3">
                  <label className="col-form-label">Uploaded Files</label>
                  <div className="upload-file">
                    <h6>Projectneonals teyys.xls</h6>
                    <p>4.25 MB</p>
                    <div className="progress">
                      <div
                        className="progress-bar bg-success"
                        role="progressbar"
                        style={{ width: "25%" }}
                        aria-valuenow={25}
                        aria-valuemin={0}
                        aria-valuemax={100}
                      />
                    </div>
                    <p className="black-text">45%</p>
                  </div>
                  <div className="upload-file upload-list">
                    <div>
                      <h6>tes.txt</h6>
                      <p>4.25 MB</p>
                    </div>
                    <Link to="#" className="text-danger">
                      <i className="ti ti-trash-x" />
                    </Link>
                  </div>
                </div>
                <div className="col-lg-12 text-end modal-btn">
                  <Link
                    to="#"
                    className="btn btn-light"
                    data-bs-dismiss="modal"
                  >
                    Cancel
                  </Link>
                  <button className="btn btn-primary" data-bs-dismiss="modal" type="button">
                    Confirm
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      {/* /Add Note */}
      {/* Create Call Log */}
      <div
        className="modal custom-modal fade modal-padding"
        id="create_call"
        role="dialog"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Create Call Log</h5>
              <button
                type="button"
                className="btn-close position-static"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body">
              <form >
                <div className="row">
                  <div className="col-md-12">
                    <div className="mb-3">
                      <label className="col-form-label">
                        Status <span className="text-danger"> *</span>
                      </label>
                      <Select
                        className="select2"
                        options={statusList}
                        placeholder="Choose"
                        classNamePrefix="react-select"
                      />
                    </div>
                    <div className="mb-3">
                      <label className="col-form-label">
                        Follow Up Date <span className="text-danger"> *</span>
                      </label>
                      <div className="icon-form">
                        <span className="form-icon">
                          <i className="ti ti-calendar-check" />
                        </span>
                        <input
                          type="text"
                          className="form-control datetimepicker"
                          placeholder=""
                        />
                      </div>
                    </div>
                    <div className="mb-3">
                      <label className="col-form-label">
                        Note <span className="text-danger"> *</span>
                      </label>
                      <textarea
                        className="form-control"
                        rows={4}
                        placeholder="Add text"
                        defaultValue={""}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="checkboxs">
                        <input type="checkbox" />
                        <span className="checkmarks" /> Create a followup task
                      </label>
                    </div>
                    <div className="text-end modal-btn">
                      <Link
                        to="#"
                        className="btn btn-light"
                        data-bs-dismiss="modal"
                      >
                        Cancel
                      </Link>
                      <button className="btn btn-primary" data-bs-dismiss="modal" type="button">
                        Confirm
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      {/* /Create Call Log */}
      {/* Add File */}
      <div
        className="modal custom-modal fade custom-modal-two modal-padding"
        id="new_file"
        role="dialog"
      >
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Create New File</h5>
              <button
                type="button"
                className="btn-close position-static"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="add-info-fieldset">
                <div className="add-details-wizard">
                  <ul className="progress-bar-wizard">
                    <li className="active">
                      <span>
                        <i className="ti ti-file" />
                      </span>
                      <div className="multi-step-info">
                        <h6>Basic Info</h6>
                      </div>
                    </li>
                    <li>
                      <span>
                        <i className="ti ti-circle-plus" />
                      </span>
                      <div className="multi-step-info">
                        <h6>Add Recipient</h6>
                      </div>
                    </li>
                  </ul>
                </div>
                <fieldset id="first-field-file">
                  <form >
                    <div className="contact-input-set">
                      <div className="row">
                        <div className="col-md-12">
                          <div className="mb-3">
                            <label className="col-form-label">
                              Choose Deal <span className="text-danger">*</span>
                            </label>
                            <Select
                              className="select2"
                              options={dealsopen}
                              placeholder="Choose"
                              classNamePrefix="react-select"
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="mb-3">
                            <label className="col-form-label">
                              Document Type{" "}
                              <span className="text-danger">*</span>
                            </label>
                            <Select
                              className="select2"
                              options={documentType}
                              placeholder="Choose"
                              classNamePrefix="react-select"
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="mb-3">
                            <label className="col-form-label">
                              Owner <span className="text-danger">*</span>
                            </label>
                            <SelectWithImage2 />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="mb-3">
                            <label className="col-form-label">
                              Title <span className="text-danger"> *</span>
                            </label>
                            <input className="form-control" type="text" />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="mb-3">
                            <label className="col-form-label">
                              Locale <span className="text-danger">*</span>
                            </label>
                            <Select
                              className="select2"
                              options={LocaleData}
                              placeholder="Choose"
                              classNamePrefix="react-select"
                            />
                          </div>
                        </div>
                        <div className="col-lg-12">
                          <div className="signature-wrap">
                            <h4>Signature</h4>
                            <ul className="nav sign-item">
                              <li className="nav-item">
                                <span
                                  className=" mb-0"
                                  data-bs-toggle="tab"
                                  data-bs-target="#nosign"
                                >
                                  <input
                                    type="radio"
                                    className="status-radio"
                                    id="sign1"
                                    name="email"
                                  />
                                  <label htmlFor="sign1">
                                    <span className="sign-title">
                                      No Signature
                                    </span>
                                    This document does not require a signature
                                    before acceptance.
                                  </label>
                                </span>
                              </li>
                              <li className="nav-item">
                                <span
                                  className="active mb-0"
                                  data-bs-toggle="tab"
                                  data-bs-target="#use-esign"
                                >
                                  <input
                                    type="radio"
                                    className="status-radio"
                                    id="sign2"
                                    name="email"
                                    defaultChecked
                                  />
                                  <label htmlFor="sign2">
                                    <span className="sign-title">
                                      Use e-signature
                                    </span>
                                    This document require e-signature before
                                    acceptance.
                                  </label>
                                </span>
                              </li>
                            </ul>
                            <div className="tab-content">
                              <div
                                className="tab-pane show active"
                                id="use-esign"
                              >
                                <div className="input-block mb-0">
                                  <label className="col-form-label">
                                    Document Signers{" "}
                                    <span className="text-danger">*</span>
                                  </label>
                                </div>
                                <div className="sign-content">
                                  <div className="row">
                                    <div className="col-md-6">
                                      <div className="mb-3">
                                        <input
                                          className="form-control"
                                          type="text"
                                          placeholder="Enter Name"
                                        />
                                      </div>
                                    </div>
                                    <div className="col-md-6">
                                      <div className="d-flex align-items-center">
                                        <div className="float-none mb-3 me-3 w-100">
                                          <input
                                            className="form-control"
                                            type="text"
                                            placeholder="Email Address"
                                          />
                                        </div>
                                        <div className="input-btn mb-3">
                                          <Link to="#" className="add-sign">
                                            <i className="ti ti-circle-plus" />
                                          </Link>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-12">
                          <div className="input-block mb-3">
                            <label className="col-form-label">
                              Content <span className="text-danger"> *</span>
                            </label>
                            <textarea
                              className="form-control"
                              rows={3}
                              placeholder="Add Content"
                              defaultValue={""}
                            />
                          </div>
                        </div>
                        <div className="col-lg-12 text-end form-wizard-button modal-btn">
                          <button className="btn btn-light" type="reset">
                            Reset
                          </button>
                          <button
                            className="btn btn-primary wizard-next-btn"
                            type="button"
                          >
                            Next
                          </button>
                        </div>
                      </div>
                    </div>
                  </form>
                </fieldset>
                <fieldset>
                  <form >
                    <div className="contact-input-set">
                      <div className="row">
                        <div className="col-lg-12">
                          <div className="signature-wrap">
                            <h4 className="mb-2">
                              Send the document to following signers
                            </h4>
                            <p>In order to send the document to the signers</p>
                            <div className="input-block mb-0">
                              <label className="col-form-label">
                                Recipients (Additional recipients)
                              </label>
                            </div>
                            <div className="sign-content">
                              <div className="row">
                                <div className="col-md-6">
                                  <div className="mb-3">
                                    <input
                                      className="form-control"
                                      type="text"
                                      placeholder="Enter Name"
                                    />
                                  </div>
                                </div>
                                <div className="col-md-6">
                                  <div className="d-flex align-items-center">
                                    <div className="float-none mb-3 me-3 w-100">
                                      <input
                                        className="form-control"
                                        type="text"
                                        placeholder="Email Address"
                                      />
                                    </div>
                                    <div className="input-btn mb-3">
                                      <Link to="#" className="add-sign">
                                        <i className="ti ti-circle-plus" />
                                      </Link>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-12">
                          <div className="mb-3">
                            <label className="col-form-label">
                              Message Subject{" "}
                              <span className="text-danger"> *</span>
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              placeholder="Enter Subject"
                            />
                          </div>
                          <div className="mb-3">
                            <label className="col-form-label">
                              Message Text{" "}
                              <span className="text-danger"> *</span>
                            </label>
                            <textarea
                              className="form-control"
                              rows={3}
                              placeholder="Your document is ready"
                              defaultValue={""}
                            />
                          </div>
                          <button className="btn btn-light mb-3">
                            Send Now
                          </button>
                          <div className="send-success">
                            <p>
                              <i className="ti ti-circle-check" /> Document sent
                              successfully to the selected recipients
                            </p>
                          </div>
                        </div>
                        <div className="col-lg-12 text-end form-wizard-button modal-btn">
                          <button className="btn btn-light" type="reset">
                            Cancel
                          </button>
                          <button
                            className="btn btn-primary"
                            type="button"
                            data-bs-dismiss="modal"
                          >
                            Save &amp; Next
                          </button>
                        </div>
                      </div>
                    </div>
                  </form>
                </fieldset>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* /Add File */}
      {/* Connect Account */}
      <div className="modal custom-modal fade" id="create_email" role="dialog">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Connect Account</h5>
              <button
                type="button"
                className="btn-close position-static"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <label className="col-form-label">
                  Account type <span className="text-danger"> *</span>
                </label>
                <Select
                  className="select2"
                  options={accountType}
                  placeholder="Choose"
                  classNamePrefix="react-select"
                />
              </div>
              <div className="mb-3">
                <h5 className="form-title">Sync emails from</h5>
                <div className="sync-radio">
                  <div className="radio-item">
                    <input
                      type="radio"
                      className="status-radio"
                      id="test1"
                      name="radio-group"
                      defaultChecked
                    />
                    <label htmlFor="test1">Now</label>
                  </div>
                  <div className="radio-item">
                    <input
                      type="radio"
                      className="status-radio"
                      id="test2"
                      name="radio-group"
                    />
                    <label htmlFor="test2">1 Month Ago</label>
                  </div>
                  <div className="radio-item">
                    <input
                      type="radio"
                      className="status-radio"
                      id="test3"
                      name="radio-group"
                    />
                    <label htmlFor="test3">3 Month Ago</label>
                  </div>
                  <div className="radio-item">
                    <input
                      type="radio"
                      className="status-radio"
                      id="test4"
                      name="radio-group"
                    />
                    <label htmlFor="test4">6 Month Ago</label>
                  </div>
                </div>
              </div>
              <div className="col-lg-12 text-end modal-btn">
                <Link to="#" className="btn btn-light" data-bs-dismiss="modal">
                  Cancel
                </Link>
                <button
                  className="btn btn-primary"
                  data-bs-target="#success_mail"
                  data-bs-toggle="modal"
                  data-bs-dismiss="modal"
                >
                  Connect Account
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* /Connect Account */}
      {/* Success Contact */}
      <div className="modal custom-modal fade" id="success_mail" role="dialog">
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
                  <i className="ti ti-mail-opened" />
                </div>
                <h3>Email Connected Successfully!!!</h3>
                <p>
                  Email Account is configured with “example@example.com”. Now
                  you can access email.
                </p>
                <div className="col-lg-12 text-center modal-btn">
                  <Link to={route.companyDetails} className="btn btn-primary">
                    Go to email
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* /Success Contact */}
      {/* Access */}
      <div className="modal custom-modal fade" id="access_view" role="dialog">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Access For</h5>
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
                <div className="mb-2 icon-form">
                  <span className="form-icon">
                    <i className="ti ti-search" />
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search"
                  />
                </div>
                <div className="access-wrap">
                  <ul>
                    <li className="select-people-checkbox">
                      <label className="checkboxs">
                        <input type="checkbox" />
                        <span className="checkmarks" />
                        <span className="people-profile">
                          <ImageWithBasePath
                            src="assets/img/profiles/avatar-19.jpg"
                            alt=""
                          />
                          <Link to="#">Darlee Robertson</Link>
                        </span>
                      </label>
                    </li>
                    <li className="select-people-checkbox">
                      <label className="checkboxs">
                        <input type="checkbox" />
                        <span className="checkmarks" />
                        <span className="people-profile">
                          <ImageWithBasePath
                            src="assets/img/profiles/avatar-20.jpg"
                            alt=""
                          />
                          <Link to="#">Sharon Roy</Link>
                        </span>
                      </label>
                    </li>
                    <li className="select-people-checkbox">
                      <label className="checkboxs">
                        <input type="checkbox" />
                        <span className="checkmarks" />
                        <span className="people-profile">
                          <ImageWithBasePath
                            src="assets/img/profiles/avatar-21.jpg"
                            alt=""
                          />
                          <Link to="#">Vaughan</Link>
                        </span>
                      </label>
                    </li>
                    <li className="select-people-checkbox">
                      <label className="checkboxs">
                        <input type="checkbox" />
                        <span className="checkmarks" />
                        <span className="people-profile">
                          <ImageWithBasePath
                            src="assets/img/profiles/avatar-01.jpg"
                            alt=""
                          />
                          <Link to="#">Jessica</Link>
                        </span>
                      </label>
                    </li>
                    <li className="select-people-checkbox">
                      <label className="checkboxs">
                        <input type="checkbox" />
                        <span className="checkmarks" />
                        <span className="people-profile">
                          <ImageWithBasePath
                            src="assets/img/profiles/avatar-16.jpg"
                            alt=""
                          />
                          <Link to="#">Carol Thomas</Link>
                        </span>
                      </label>
                    </li>
                    <li className="select-people-checkbox">
                      <label className="checkboxs">
                        <input type="checkbox" />
                        <span className="checkmarks" />
                        <span className="people-profile">
                          <ImageWithBasePath
                            src="assets/img/profiles/avatar-22.jpg"
                            alt=""
                          />
                          <Link to="#">Dawn Mercha</Link>
                        </span>
                      </label>
                    </li>
                  </ul>
                </div>
                <div className="modal-btn text-end">
                  <Link
                    to="#"
                    className="btn btn-light"
                    data-bs-dismiss="modal"
                  >
                    Cancel
                  </Link>
                  <button type="button" data-bs-dismiss="modal" className="btn btn-primary">
                    Confirm
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      {/* /Access */}
      {/* Add Compose */}
      <div className="modal custom-modal fade" id="add_compose" role="dialog">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Add Compose</h5>
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
                  <input
                    type="email"
                    placeholder="To"
                    className="form-control"
                  />
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <div className="mb-3">
                      <input
                        type="email"
                        placeholder="Cc"
                        className="form-control"
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <input
                        type="email"
                        placeholder="Bcc"
                        className="form-control"
                      />
                    </div>
                  </div>
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    placeholder="Subject"
                    className="form-control"
                  />
                </div>
                <div className="mb-3">
                  <DefaultEditor className="summernote" />
                </div>
                <div className="mb-3">
                  <div className="text-center">
                    <button className="btn btn-primary">
                      <span>Send</span>
                      <i className="fa-solid fa-paper-plane ms-1" />
                    </button>
                    <button className="btn btn-primary ms-1" type="button">
                      <span>Draft</span>{" "}
                      <i className="fa-regular fa-floppy-disk ms-1" />
                    </button>
                    <button className="btn btn-primary ms-1" type="button">
                      <span>Delete</span>{" "}
                      <i className="fa-regular fa-trash-can ms-1" />
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      {/* /Add Compose */}
      {/* Edit Contact */}
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
                            options={languageOptions}
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
                onClick={() => setOpenModal2(true)}
              >
                Create
              </button>
            </div>
          </form>
        </div>
      </div>
      {/* /Edit Contact */}
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
                    Expected Closing Date <span className="text-danger">*</span>
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
      {/* Add Company */}
      <div
        className="offcanvas offcanvas-end offcanvas-large"
        tabIndex={-1}
        id="offcanvas_add"
      >
        <div className="offcanvas-header border-bottom">
          <h5 className="fw-semibold">Add New Company</h5>
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
                            options={languageOptions}
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
                data-bs-toggle="modal"
                data-bs-target="#create_success"
              >
                Create
              </button>
            </div>
          </form>
        </div>
      </div>
      {/* /Add Company */}
      <Modal show={openModal2} onHide={() => setOpenModal2(false)}>
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
            <h3>Company Created Successfully!!!</h3>
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

export default CompaniesDetails;
