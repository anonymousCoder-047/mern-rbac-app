import React, { useState } from "react";
import { Link } from "react-router-dom";
import Table from "../../../core/common/dataTable/index";
import Select from "react-select";
import DateRangePicker from "react-bootstrap-daterangepicker";
import "bootstrap-daterangepicker/daterangepicker.css";
import {
  countryoptions1,
  languageOptions,
  optiondeals,
  optionindustry,
  options,
  optionschoose,
  optionsource,
  optionssymbol,
} from "../../../core/common/selectoption/selectoption";
import { leadsData } from "../../../core/data/json/leads";
import { Modal } from "react-bootstrap";
import { TableData } from "../../../core/data/interface";
import ImageWithBasePath from "../../../core/common/imageWithBasePath";
import CollapseHeader from "../../../core/common/collapse-header";
import { SelectWithImage2 } from "../../../core/common/selectWithImage2";
import { all_routes } from "../../router/all_routes";
import { TagsInput } from "react-tag-input-component";
import Offcanvas from 'react-bootstrap/Offcanvas';
const Leads = () => {
  const route = all_routes;
  const [adduser, setAdduser] = useState(false);
  const [addcompany, setAddCompany] = useState(false);
  const [modalTitle, setModalTitle] = useState("Add New Lead");
  const data = leadsData;
  const [owner, setOwner] = useState(["Collab"]);
  const [openModal, setOpenModal] = useState(false);
  const [openModal2, setOpenModal2] = useState(false);
  const [openModal3, setOpenModal3] = useState(false);
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);
  const [show3, setShow3] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleClose2 = () => setShow(false);
  const handleShow2 = () => setShow(true);
  const handleClose3 = () => setShow(false);
  const handleShow3 = () => setShow(true);
  const togglePopup = (isEditing: any) => {
    setModalTitle(isEditing ? "Edit Lead" : "Add New Lead");
    setAdduser(!adduser);
  };
  const addcompanyPopup = () => {
    setAddCompany(!addcompany);
  };

  const [stars, setStars] = useState<{ [key: number]: boolean }>({});

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
      title: "Lead Name",
      dataIndex: "lead_name",
      key: "lead_name",
      render: (text: any) => (
        <Link to={route.leadsDetails} className="title-name">
          {text}
        </Link>
      ),
      sorter: (a: TableData, b: TableData) =>
        a.lead_name.length - b.lead_name.length,
    },

    {
      title: "Company Name",
      render: (text: any, record: any) => (
        <h2 className="d-flex align-items-center">
          <Link
            to={route.companyDetails}
            className="avatar avatar-sm border rounded p-1 me-2"
          >
            <ImageWithBasePath
              className="w-auto h-auto"
              src={record.image}
              alt="User Image"
            />
          </Link>
          <Link to={route.companyDetails} className="d-flex flex-column">
            {record.company_name}
            <span className="text-default">{text.company_address} </span>
          </Link>
        </h2>
      ),
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
      sorter: (a: TableData, b: TableData) =>
        a.company_name.length - b.company_name.length,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      sorter: (a: TableData, b: TableData) =>
        a.company_name.length - b.company_name.length,
    },
    {
      title: "Lead Status",
      dataIndex: "status",
      render: (text: string) => (
        <div>
          {text === "Closed" && (
            <span className="badge badge-pill badge-status bg-success">
              {text}
            </span>
          )}
          {text === "Connected" && (
            <span className="badge badge-pill badge-status bg-warning">
              {text}
            </span>
          )}
          {text === "Lost" && (
            <span className="badge badge-pill badge-status bg-danger">
              {text}
            </span>
          )}
          {text === "Not connected" && (
            <span className="badge badge-pill badge-status bg-pending">
              {text}
            </span>
          )}
        </div>
      ),
      sorter: true,
    },
    {
      title: "Created Date",
      dataIndex: "created_date",
      key: "created_date",
      sorter: (a: TableData, b: TableData) =>
        a.company_name.length - b.company_name.length,
    },
    {
      title: "Lead Owner",
      dataIndex: "owner",
      key: "owner",
      sorter: (a: TableData, b: TableData) =>
        a.company_name.length - b.company_name.length,
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
              to="#"
              onClick={handleShow3}
            >
              <i className="ti ti-edit text-blue" /> Edit
            </Link>

            <Link
              className="dropdown-item"
              to="#"
              data-bs-toggle="modal"
              data-bs-target="#delete_lead"
            >
              <i className="ti ti-trash text-danger"></i> Delete
            </Link>

            <Link className="dropdown-item" to="#">
              <i className="ti ti-clipboard-copy text-blue-light" /> clone
            </Link>
          </div>
        </div>
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
  const [newContents, setNewContents] = useState<number[]>([0]);

  const addNewContent = () => {
    setNewContents([...newContents, newContents.length]);
  };

  const currency = [
    { value: "Choose", label: "Choose" },
    { value: "Dollar", label: "Dollar" },
    { value: "Euro", label: "Euro" },
    { value: "Pound", label: "Pound" },
    { value: "Rupee", label: "Rupee" },
  ];


  return (
    <>
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
                        Leads<span className="count-title">123</span>
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
                            placeholder="Search Leads"
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
                            onClick={handleShow2}
                          >
                            <i className="ti ti-square-rounded-plus me-2" />
                            Add Leads
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
                        <div className="dropdown me-2">
                          <Link
                            to="#"
                            className="dropdown-toggle"
                            data-bs-toggle="dropdown"
                          >
                            <i className="ti ti-sort-ascending-2 me-2" />
                            Sort
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
                                  Created
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
                                  Lead Owner
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
                                  Action
                                </p>
                                <div className="status-toggle">
                                  <input
                                    type="checkbox"
                                    id="col-contact"
                                    className="check"
                                  />
                                  <label
                                    htmlFor="col-contact"
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
                        <div className="view-icons">
                          <Link to={route.leads} className="active">
                            <i className="ti ti-list-tree" />
                          </Link>
                          <Link to={route.leadsKanban}>
                            <i className="ti ti-grid-dots" />
                          </Link>
                        </div>
                      </div>
                    </div>
                    {/* /Filter */}
                    {/* Contact List */}
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
                    {/* /Contact List */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* /Page Wrapper */}
        {/* Add Lead */}
        <Offcanvas show={show2}  onHide={handleClose2} placement="end" >
          <div className="offcanvas-header border-bottom">
            <h5 className="fw-semibold">Add New Lead</h5>
            <button
              type="button"
              className="btn-close custom-btn-close border p-1 me-0 d-flex align-items-center justify-content-center rounded-circle"
              onClick={handleClose2}
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
                      Lead Name <span className="text-danger">*</span>
                    </label>
                    <input type="text" className="form-control" />
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="mb-3">
                    <div className="radio-wrap">
                      <label className="col-form-label">Lead Type</label>
                      <div className="d-flex flex-wrap">
                        <div className="me-2">
                          <input
                            type="radio"
                            className="status-radio"
                            id="person"
                            name="leave"
                            defaultChecked
                          />
                          <label htmlFor="person">Person</label>
                        </div>
                        <div>
                          <input
                            type="radio"
                            className="status-radio"
                            id="Organization"
                            name="leave"
                          />
                          <label htmlFor="Organization">Organization</label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="mb-3">
                    <div className="d-flex justify-content-between align-items-center">
                      <label className="col-form-label">Company Name</label>
                      <Link
                        to=""
                        className="label-add "
                        onClick={handleShow}
                      >
                        <i className="ti ti-square-rounded-plus" />
                        Add New
                      </Link>
                    </div>
                    <Select
                      className="select"
                      options={options}
                      classNamePrefix="react-select"
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="col-form-label">
                      Value<span className="text-danger">*</span>
                    </label>
                    <input type="text" className="form-control" />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="col-form-label">
                      Currency <span className="text-danger">*</span>
                    </label>
                    <Select
                      className="select"
                      options={currency}
                      classNamePrefix="react-select"
                    />
                  </div>
                </div>
                {newContents.map((index) => (
                  <div className="col-md-12" key={index}>
                    <div className="add-product-new">
                      <div className="row align-items-end">
                        <div className="col-md-8">
                          <div className=" mb-3">
                            <label className="col-form-label">
                              Phone <span className="text-danger">*</span>
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              defaultValue="+1 875455453"
                            />
                          </div>
                        </div>
                        <div className="col-md-4 d-flex align-items-center">
                          <div className=" w-100 mb-3">
                            <Select
                              className="select"
                              options={optionschoose}
                              classNamePrefix="react-select"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                <div className="col-md-12">
                  <Link
                    onClick={addNewContent}
                    to="#"
                    className="add-new add-new-phone mb-3 d-block"
                  >
                    <i className="ti ti-square-rounded-plus me-2" />
                    Add New
                  </Link>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="col-form-label">
                      Source <span className="text-danger">*</span>
                    </label>
                    <Select
                      className="select"
                      options={optionsource}
                      classNamePrefix="react-select"
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="col-form-label">
                      Industry <span className="text-danger">*</span>
                    </label>
                    <Select
                      className="select"
                      options={optionindustry}
                      classNamePrefix="react-select"
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="col-form-label">Owner</label>
                    <SelectWithImage2 />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="col-form-label">Tags </label>
                    <TagsInput
                      // className="input-tags form-control"
                      value={owner}
                      onChange={setOwner}
                    />
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="mb-3">
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
                      <div data-bs-toggle="modal" data-bs-target="#access_view">
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
        </Offcanvas>
        {/* /Add Lead */}
        {/* Add Company */}
        <Offcanvas show={show}  onHide={handleClose} placement="end" >
          <div className="offcanvas-header border-bottom">
            <h5 className="fw-semibold">Add New Company</h5>
            <button
              type="button"
              className="btn-close custom-btn-close border p-1 me-0 d-flex align-items-center justify-content-center rounded-circle"
              onClick={handleClose}
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
                                <button
                                  type="button"
                                  className="profile-remove"
                                >
                                  <i className="ti ti-x" />
                                </button>
                              </div>
                              <div className="profile-upload-content">
                                <label className="profile-upload-btn">
                                  <i className="ti ti-file-broken" /> Upload
                                  File
                                  <input type="file" className="input-img" />
                                </label>
                                <p>JPG, GIF or PNG. Max size of 800K</p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-12">
                          <div className="mb-3">
                            <label className="col-form-label">
                              Company Name
                            </label>
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
                            <TagsInput
                              // className="input-tags form-control"
                              value={owner}
                              onChange={setOwner}
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="mb-3">
                            <div className="d-flex align-items-center justify-content-between">
                              <label className="col-form-label">Deals</label>
                            </div>
                            <Select
                              className="select2"
                              options={optiondeals}
                              classNamePrefix="react-select"
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
                              options={optionsource}
                              classNamePrefix="react-select"
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
                              options={optionindustry}
                              classNamePrefix="react-select"
                            />
                          </div>
                        </div>
                        <div className="col-md-12">
                          <div className="mb-3">
                            <label className="col-form-label">Contacts</label>
                            <SelectWithImage2 />
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
                              className="select"
                              options={languageOptions}
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
                              className="select"
                              options={countryoptions1}
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
                  onClick={() => setOpenModal(true)}
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </Offcanvas>
        {/* /Add Company */}
        {/* Edit Lead */}
        <Offcanvas show={show3}  onHide={handleClose3} placement="end" >
          <div className="offcanvas-header border-bottom">
            <h5 className="fw-semibold">Edit Lead</h5>
            <button
              type="button"
              className="btn-close custom-btn-close border p-1 me-0 d-flex align-items-center justify-content-center rounded-circle"
              onClick={handleClose3}
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
                      Lead Name <span className="text-danger">*</span>
                    </label>
                    <input type="text" className="form-control" />
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="mb-3">
                    <div className="radio-wrap">
                      <label className="col-form-label">Lead Type</label>
                      <div className="d-flex flex-wrap">
                        <div className="me-2">
                          <input
                            type="radio"
                            className="status-radio"
                            id="person"
                            name="leave"
                            defaultChecked
                          />
                          <label htmlFor="person">Person</label>
                        </div>
                        <div>
                          <input
                            type="radio"
                            className="status-radio"
                            id="Organization"
                            name="leave"
                          />
                          <label htmlFor="Organization">Organization</label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="mb-3">
                    <div className="d-flex justify-content-between align-items-center">
                      <label className="col-form-label">Company Name</label>
                      <Link
                        to=""
                        className="label-add "
                        onClick={handleShow}
                      >
                        <i className="ti ti-square-rounded-plus" />
                        Add New
                      </Link>
                    </div>
                    <Select
                      className="select"
                      options={options}
                      classNamePrefix="react-select"
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="col-form-label">
                      Value<span className="text-danger">*</span>
                    </label>
                    <input type="text" className="form-control" />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="col-form-label">
                      Currency <span className="text-danger">*</span>
                    </label>
                    <Select
                      className="select"
                      options={currency}
                      classNamePrefix="react-select"
                    />
                  </div>
                </div>
                {newContents.map((index) => (
                  <div className="col-md-12" key={index}>
                    <div className="add-product-new">
                      <div className="row align-items-end">
                        <div className="col-md-8">
                          <div className=" mb-3">
                            <label className="col-form-label">
                              Phone <span className="text-danger">*</span>
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              defaultValue="+1 875455453"
                            />
                          </div>
                        </div>
                        <div className="col-md-4 d-flex align-items-center">
                          <div className=" w-100 mb-3">
                            <Select
                              className="select"
                              options={optionschoose}
                              classNamePrefix="react-select"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                <div className="col-md-12">
                  <Link
                    onClick={addNewContent}
                    to="#"
                    className="add-new add-new-phone mb-3 d-block"
                  >
                    <i className="ti ti-square-rounded-plus me-2" />
                    Add New
                  </Link>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="col-form-label">
                      Source <span className="text-danger">*</span>
                    </label>
                    <Select
                      className="select"
                      options={optionsource}
                      classNamePrefix="react-select"
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="col-form-label">
                      Industry <span className="text-danger">*</span>
                    </label>
                    <Select
                      className="select"
                      options={optionindustry}
                      classNamePrefix="react-select"
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="col-form-label">Owner</label>
                    <SelectWithImage2 />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="col-form-label">Tags </label>
                    <TagsInput
                      // className="input-tags form-control"
                      value={owner}
                      onChange={setOwner}
                    />
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="mb-3">
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
                      <div data-bs-toggle="modal" data-bs-target="#access_view">
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
        </Offcanvas>
        {/* /Edit Lead */}
        {/* Delete Lead */}
        <div className="modal fade" id="delete_lead" role="dialog">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-body">
                <div className="text-center">
                  <div className="avatar avatar-xl bg-danger-light rounded-circle mb-3">
                    <i className="ti ti-trash-x fs-36 text-danger" />
                  </div>
                  <h4 className="mb-2">Remove Lead?</h4>
                  <p className="mb-0">
                    Are you sure you want to remove <br /> lead you selected.
                  </p>
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
        {/* /Delete Lead */}
        {/* Create Lead */}
        <Modal show={openModal2} onHide={() => setOpenModal2(false)}>
          <div className="modal-header border-0 m-0 justify-content-end">
            <button
              className="btn-close"
              onClick={() => setOpenModal2(false)}
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
              <h3>Lead Created Successfully!!!</h3>
              <p>View the details of lead, created</p>
              <div className="col-lg-12 text-center modal-btn">
                <Link to="#" className="btn btn-light" data-bs-dismiss="modal">
                  Cancel
                </Link>
                <Link to={route.leadsDetails} onClick={() => setOpenModal2(false)} className="btn btn-primary">
                  View Details
                </Link>
              </div>
            </div>
          </div>
        </Modal>
        {/* /Create Lead */}
        {/* Create Company */}
        <Modal show={openModal} onHide={() => setOpenModal(false)}>
          <div className="modal-header border-0 m-0 justify-content-end">
            <button
              className="btn-close"
              onClick={() => setOpenModal(false)}
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
              <h3>Company Created Successfully!!!</h3>
              <p>View the details of company, created</p>
              <div className="col-lg-12 text-center modal-btn">
                <Link to="#" className="btn btn-light" data-bs-dismiss="modal">
                  Cancel
                </Link>
                <Link to={route.companyDetails} onClick={() => setOpenModal(false)} className="btn btn-primary">
                  View Details
                </Link>
              </div>
            </div>
          </div>
        </Modal>
        {/* /Create Company */}
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
                    <Link
                      to="#"
                      className="btn btn-light"
                      data-bs-dismiss="modal"
                    >
                      Cancel
                    </Link>
                    <button
                      type="button"
                      data-bs-dismiss="modal"
                      className="btn btn-danger"
                    >
                      Save
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        {/* /Add New View */}
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
                <form>
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
                    <button
                      type="button"
                      data-bs-dismiss="modal"
                      className="btn btn-primary"
                    >
                      Confirm
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        {/* /Access */}
      </>
    </>
  );
};

export default Leads;
