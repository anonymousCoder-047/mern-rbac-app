import React, { useState } from "react";
import { Link } from "react-router-dom";
import Select from "react-select";
import "bootstrap-daterangepicker/daterangepicker.css";
import {
  countryoptions1,
  currency,
  languageOptions,
  optiondeals,
  optionindustry,
  options,
  options1,
  optionschoose,
  optionsource,
  optionssymbol,
} from "../../../core/common/selectoption/selectoption";
import ImageWithBasePath from "../../../core/common/imageWithBasePath";
import CollapseHeader from "../../../core/common/collapse-header";
import { SelectWithImage } from "../../../core/common/selectWithImage";
import { SelectWithImage2 } from "../../../core/common/selectWithImage2";
import { all_routes } from "../../router/all_routes";

const LeadsKanban = () => {
  const [adduser, setAdduser] = useState(false);
  const [addcompany, setAddCompany] = useState(false);
  const [modalTitle, setModalTitle] = useState("Add New Lead");
  const togglePopup = (isEditing: any) => {
    setModalTitle(isEditing ? "Edit Lead" : "Add New Lead");
    setAdduser(!adduser);
  };
  const addcompanyPopup = () => {
    setAddCompany(!addcompany);
  };
  const route = all_routes;
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
                        <Link
                          to={route.leadsKanban}
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
                {/* Filter */}
                <div className="d-flex justify-content-between align-items-center flex-wrap row-gap-2 mb-4">
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
                      <div className="filter-dropdown-menu dropdown-menu dropdown-menu-start">
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
                                  Lead Name
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
                                            
                                          />
                                          <span className="checkmarks" />
                                        </label>
                                      </div>
                                      <div className="collapse-inside-text">
                                        <h5>Collins</h5>
                                      </div>
                                    </li>
                                    <li>
                                      <div className="filter-checks">
                                        <label className="checkboxs">
                                          <input type="checkbox" />
                                          <span className="checkmarks" />
                                        </label>
                                      </div>
                                      <div className="collapse-inside-text">
                                        <h5>Konopelski</h5>
                                      </div>
                                    </li>
                                    <li>
                                      <div className="filter-checks">
                                        <label className="checkboxs">
                                          <input type="checkbox" />
                                          <span className="checkmarks" />
                                        </label>
                                      </div>
                                      <div className="collapse-inside-text">
                                        <h5>Adams</h5>
                                      </div>
                                    </li>
                                    <li>
                                      <div className="filter-checks">
                                        <label className="checkboxs">
                                          <input type="checkbox" />
                                          <span className="checkmarks" />
                                        </label>
                                      </div>
                                      <div className="collapse-inside-text">
                                        <h5>Schumm</h5>
                                      </div>
                                    </li>
                                    <li>
                                      <div className="filter-checks">
                                        <label className="checkboxs">
                                          <input type="checkbox" />
                                          <span className="checkmarks" />
                                        </label>
                                      </div>
                                      <div className="collapse-inside-text">
                                        <h5>Wisozk</h5>
                                      </div>
                                    </li>
                                    <li>
                                      <div className="filter-checks">
                                        <label className="checkboxs">
                                          <input type="checkbox" />
                                          <span className="checkmarks" />
                                        </label>
                                      </div>
                                      <div className="collapse-inside-text">
                                        <h5>Heller</h5>
                                      </div>
                                    </li>
                                    <li>
                                      <div className="filter-checks">
                                        <label className="checkboxs">
                                          <input type="checkbox" />
                                          <span className="checkmarks" />
                                        </label>
                                      </div>
                                      <div className="collapse-inside-text">
                                        <h5>Gutkowski</h5>
                                      </div>
                                    </li>
                                    <li>
                                      <div className="filter-checks">
                                        <label className="checkboxs">
                                          <input type="checkbox" />
                                          <span className="checkmarks" />
                                        </label>
                                      </div>
                                      <div className="collapse-inside-text">
                                        <h5>Walter</h5>
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
                                           
                                          />
                                          <span className="checkmarks" />
                                        </label>
                                      </div>
                                      <div className="collapse-inside-text">
                                        <h5>NovaWave LLC</h5>
                                      </div>
                                    </li>
                                    <li>
                                      <div className="filter-checks">
                                        <label className="checkboxs">
                                          <input type="checkbox" />
                                          <span className="checkmarks" />
                                        </label>
                                      </div>
                                      <div className="collapse-inside-text">
                                        <h5>BlueSky Industries</h5>
                                      </div>
                                    </li>
                                    <li>
                                      <div className="filter-checks">
                                        <label className="checkboxs">
                                          <input type="checkbox" />
                                          <span className="checkmarks" />
                                        </label>
                                      </div>
                                      <div className="collapse-inside-text">
                                        <h5>Silver Hawk</h5>
                                      </div>
                                    </li>
                                    <li>
                                      <div className="filter-checks">
                                        <label className="checkboxs">
                                          <input type="checkbox" />
                                          <span className="checkmarks" />
                                        </label>
                                      </div>
                                      <div className="collapse-inside-text">
                                        <h5>Summit Peak</h5>
                                      </div>
                                    </li>
                                    <li>
                                      <div className="filter-checks">
                                        <label className="checkboxs">
                                          <input type="checkbox" />
                                          <span className="checkmarks" />
                                        </label>
                                      </div>
                                      <div className="collapse-inside-text">
                                        <h5>RiverStone Ventur</h5>
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
                                            
                                          />
                                          <span className="checkmarks" />
                                        </label>
                                      </div>
                                      <div className="collapse-inside-text">
                                        <h5>Closed</h5>
                                      </div>
                                    </li>
                                    <li>
                                      <div className="filter-checks">
                                        <label className="checkboxs">
                                          <input type="checkbox" />
                                          <span className="checkmarks" />
                                        </label>
                                      </div>
                                      <div className="collapse-inside-text">
                                        <h5>Not Contacted</h5>
                                      </div>
                                    </li>
                                    <li>
                                      <div className="filter-checks">
                                        <label className="checkboxs">
                                          <input type="checkbox" />
                                          <span className="checkmarks" />
                                        </label>
                                      </div>
                                      <div className="collapse-inside-text">
                                        <h5>Contacted</h5>
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
                                  data-bs-target="#date"
                                  aria-expanded="false"
                                  aria-controls="date"
                                >
                                  Created Date
                                </Link>
                              </div>
                              <div
                                className="filter-set-contents accordion-collapse collapse"
                                id="date"
                                data-bs-parent="#accordionExample"
                              >
                                <div className="filter-content-list">
                                  <ul>
                                    <li>
                                      <div className="filter-checks">
                                        <label className="checkboxs">
                                          <input
                                            type="checkbox"
                                            
                                          />
                                          <span className="checkmarks" />
                                        </label>
                                      </div>
                                      <div className="collapse-inside-text">
                                        <h5>25 Sep 2023, 01:22 pm</h5>
                                      </div>
                                    </li>
                                    <li>
                                      <div className="filter-checks">
                                        <label className="checkboxs">
                                          <input type="checkbox" />
                                          <span className="checkmarks" />
                                        </label>
                                      </div>
                                      <div className="collapse-inside-text">
                                        <h5>29 Sep 2023, 04:15 pm</h5>
                                      </div>
                                    </li>
                                    <li>
                                      <div className="filter-checks">
                                        <label className="checkboxs">
                                          <input type="checkbox" />
                                          <span className="checkmarks" />
                                        </label>
                                      </div>
                                      <div className="collapse-inside-text">
                                        <h5>04 Oct 2023, 10:18 am</h5>
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
                                            
                                          />
                                          <span className="checkmarks" />
                                        </label>
                                      </div>
                                      <div className="collapse-inside-text">
                                        <h5>Hendry</h5>
                                      </div>
                                    </li>
                                    <li>
                                      <div className="filter-checks">
                                        <label className="checkboxs">
                                          <input type="checkbox" />
                                          <span className="checkmarks" />
                                        </label>
                                      </div>
                                      <div className="collapse-inside-text">
                                        <h5>Guillory</h5>
                                      </div>
                                    </li>
                                    <li>
                                      <div className="filter-checks">
                                        <label className="checkboxs">
                                          <input type="checkbox" />
                                          <span className="checkmarks" />
                                        </label>
                                      </div>
                                      <div className="collapse-inside-text">
                                        <h5>Jami</h5>
                                      </div>
                                    </li>
                                    <li>
                                      <div className="filter-checks">
                                        <label className="checkboxs">
                                          <input type="checkbox" />
                                          <span className="checkmarks" />
                                        </label>
                                      </div>
                                      <div className="collapse-inside-text">
                                        <h5>Theresa</h5>
                                      </div>
                                    </li>
                                    <li>
                                      <div className="filter-checks">
                                        <label className="checkboxs">
                                          <input type="checkbox" />
                                          <span className="checkmarks" />
                                        </label>
                                      </div>
                                      <div className="collapse-inside-text">
                                        <h5>Espinosa</h5>
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
                                  to={route.leads}
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
                    <div className="icon-form">
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
                  <div>
                    <ul className="d-flex align-items-center">
                      <li>
                        <div className="view-icons me-2">
                          <Link to={route.leads}>
                            <i className="ti ti-list-tree" />
                          </Link>
                          <Link to={route.leadsKanban} className="active">
                            <i className="ti ti-grid-dots" />
                          </Link>
                        </div>
                      </li>
                      <li>
                        <Link
                          to="#"
                          className="btn btn-primary"
                          data-bs-toggle="offcanvas"
                          data-bs-target="#offcanvas_add"
                        >
                          <i className="ti ti-square-rounded-plus me-2" />
                          Add Leads
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
                {/* /Filter */}
                {/* Leads Kanban */}
                <div className="d-flex overflow-x-auto align-items-start mb-4">
                  <div className="kanban-list-items">
                    <div className="card mb-0">
                      <div className="card-body">
                        <div className="d-flex justify-content-between align-items-center">
                          <div>
                            <h4 className="fw-semibold d-flex align-items-center mb-1">
                              <i className="ti ti-circle-filled fs-8 text-warning me-2" />
                              Contacted
                            </h4>
                            <span className="fw-medium text-default">
                              45 Leads - $15,44,540
                            </span>
                          </div>
                          <div className="d-flex align-items-center">
                            <Link
                              to="#"
                              className="text-purple"
                            >
                              <i className="ti ti-plus" />
                            </Link>
                            <div className="dropdown table-action ms-2">
                              <Link
                                to="#"
                                className="action-icon dropdown-toggle bg-white"
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
                                  <i className="fa-solid fa-pencil text-blue" />{" "}
                                  Edit
                                </Link>
                                <Link
                                  className="dropdown-item"
                                  to="#"
                                  data-bs-toggle="modal"
                                  data-bs-target="#delete_lead"
                                >
                                  <i className="fa-regular fa-trash-can text-danger" />{" "}
                                  Delete
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="kanban-drag-wrap pt-4">
                      <div>
                        <div className="card kanban-card border">
                          <div className="card-body">
                            <div className="d-block">
                              <div className="bg-warning border border-2 mb-3" />
                              <div className="d-flex align-items-center mb-3">
                                <Link
                                  to={route.leadsDetails}
                                  className="avatar avatar-lg bg-gray flex-shrink-0 me-2"
                                >
                                  <span className="avatar-title text-dark">
                                    SM
                                  </span>
                                </Link>
                                <h6 className="fw-medium">
                                  <Link to={route.leadsDetails}>Schumm</Link>
                                </h6>
                              </div>
                            </div>
                            <div className="mb-3 d-flex flex-column">
                              <p className="text-default d-inline-flex align-items-center mb-2">
                                <i className="ti ti-report-money text-dark me-1" />
                                $03,50,000
                              </p>
                              <p className="text-default d-inline-flex align-items-center mb-2">
                                <i className="ti ti-mail text-dark me-1" />
                                darleeo@example.com
                              </p>
                              <p className="text-default d-inline-flex align-items-center mb-2">
                                <i className="ti ti-phone text-dark me-1" />
                                +1 12445-47878
                              </p>
                              <p className="text-default d-inline-flex align-items-center">
                                <i className="ti ti-map-pin-pin text-dark me-1" />
                                Newyork, United States
                              </p>
                            </div>
                            <div className="d-flex align-items-center justify-content-between border-top pt-3 mt-3">
                              <span className="avatar avatar-sm border rounded d-flex align-items-center justify-content-center">
                                <img
                                  src="assets/img/icons/company-icon-09.svg"
                                  className="w-auto h-auto"
                                  alt=""
                                />
                              </span>
                              <div className="icons-social d-flex align-items-center">
                                <Link
                                  to="#"
                                  className="d-flex align-items-center justify-content-center me-1"
                                >
                                  <i className="ti ti-phone-check" />
                                </Link>
                                <Link
                                  to="#"
                                  className="d-flex align-items-center justify-content-center me-1"
                                >
                                  <i className="ti ti-message-circle-2" />
                                </Link>
                                <Link
                                  to="#"
                                  className="d-flex align-items-center justify-content-center"
                                >
                                  <i className="ti ti-color-swatch" />
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div>
                        <div className="card kanban-card border">
                          <div className="card-body">
                            <div className="d-block">
                              <div className="bg-success border border-2 mb-3" />
                              <div className="d-flex align-items-center mb-3">
                                <Link
                                  to={route.leadsDetails}
                                  className="avatar avatar-lg bg-gray flex-shrink-0 me-2"
                                >
                                  <span className="avatar-title text-dark">
                                    CS
                                  </span>
                                </Link>
                                <h6 className="fw-medium">
                                  <Link to={route.leadsDetails}>Collins</Link>
                                </h6>
                              </div>
                            </div>
                            <div className="mb-3 d-flex flex-column">
                              <p className="text-default d-inline-flex align-items-center mb-2">
                                <i className="ti ti-report-money text-dark me-1" />
                                $02,10,000
                              </p>
                              <p className="text-default d-inline-flex align-items-center mb-2">
                                <i className="ti ti-mail text-dark me-1" />
                                robertson@example.com
                              </p>
                              <p className="text-default d-inline-flex align-items-center mb-2">
                                <i className="ti ti-phone text-dark me-1" />
                                +1 13987-90231
                              </p>
                              <p className="text-default d-inline-flex align-items-center">
                                <i className="ti ti-map-pin-pin text-dark me-1" />
                                Austin, United States
                              </p>
                            </div>
                            <div className="d-flex align-items-center justify-content-between border-top pt-3 mt-3">
                              <span className="avatar avatar-sm border rounded d-flex align-items-center justify-content-center">
                                <img
                                  src="assets/img/icons/company-icon-01.svg"
                                  className="w-auto h-auto"
                                  alt=""
                                />
                              </span>
                              <div className="icons-social d-flex align-items-center">
                                <Link
                                  to="#"
                                  className="d-flex align-items-center justify-content-center me-1"
                                >
                                  <i className="ti ti-phone-check" />
                                </Link>
                                <Link
                                  to="#"
                                  className="d-flex align-items-center justify-content-center me-1"
                                >
                                  <i className="ti ti-message-circle-2" />
                                </Link>
                                <Link
                                  to="#"
                                  className="d-flex align-items-center justify-content-center"
                                >
                                  <i className="ti ti-color-swatch" />
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div>
                        <div className="card kanban-card border">
                          <div className="card-body">
                            <div className="d-block">
                              <div className="bg-danger border border-2 mb-3" />
                              <div className="d-flex align-items-center mb-3">
                                <Link
                                  to={route.leadsDetails}
                                  className="avatar avatar-lg bg-gray flex-shrink-0 me-2"
                                >
                                  <span className="avatar-title text-dark">
                                    KI
                                  </span>
                                </Link>
                                <h6 className="fw-medium">
                                  <Link to={route.leadsDetails}>Konopelski</Link>
                                </h6>
                              </div>
                            </div>
                            <div className="mb-3 d-flex flex-column">
                              <p className="text-default d-inline-flex align-items-center mb-2">
                                <i className="ti ti-report-money text-dark me-1" />
                                $02,18,000
                              </p>
                              <p className="text-default d-inline-flex align-items-center mb-2">
                                <i className="ti ti-mail text-dark me-1" />
                                sharon@example.com
                              </p>
                              <p className="text-default d-inline-flex align-items-center mb-2">
                                <i className="ti ti-phone text-dark me-1" />
                                +1 17932-04278
                              </p>
                              <p className="text-default d-inline-flex align-items-center">
                                <i className="ti ti-map-pin-pin text-dark me-1" />
                                Atlanta, United States
                              </p>
                            </div>
                            <div className="d-flex align-items-center justify-content-between border-top pt-3 mt-3">
                              <span className="avatar avatar-sm border rounded d-flex align-items-center justify-content-center">
                                <img
                                  src="assets/img/icons/company-icon-02.svg"
                                  className="w-auto h-auto"
                                  alt=""
                                />
                              </span>
                              <div className="icons-social d-flex align-items-center">
                                <Link
                                  to="#"
                                  className="d-flex align-items-center justify-content-center me-1"
                                >
                                  <i className="ti ti-phone-check" />
                                </Link>
                                <Link
                                  to="#"
                                  className="d-flex align-items-center justify-content-center me-1"
                                >
                                  <i className="ti ti-message-circle-2" />
                                </Link>
                                <Link
                                  to="#"
                                  className="d-flex align-items-center justify-content-center"
                                >
                                  <i className="ti ti-color-swatch" />
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="kanban-list-items">
                    <div className="card mb-0">
                      <div className="card-body">
                        <div className="d-flex justify-content-between align-items-center">
                          <div>
                            <h4 className="fw-semibold d-flex align-items-center mb-1">
                              <i className="ti ti-circle-filled fs-8 text-purple me-2" />
                              Not Contacted
                            </h4>
                            <span className="fw-medium text-default">
                              45 Leads - $15,44,540
                            </span>
                          </div>
                          <div className="d-flex align-items-center">
                            <Link
                              to="#"
                              className="text-purple"
                            >
                              <i className="ti ti-plus" />
                            </Link>
                            <div className="dropdown table-action ms-2">
                              <Link
                                to="#"
                                className="action-icon dropdown-toggle bg-white"
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
                                  <i className="fa-solid fa-pencil text-blue" />{" "}
                                  Edit
                                </Link>
                                <Link
                                  className="dropdown-item"
                                  to="#"
                                  data-bs-toggle="modal"
                                  data-bs-target="#delete_lead"
                                >
                                  <i className="fa-regular fa-trash-can text-danger" />{" "}
                                  Delete
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="kanban-drag-wrap pt-4">
                      <div>
                        <div className="card kanban-card border">
                          <div className="card-body">
                            <div className="d-block">
                              <div className="bg-purple border border-2 mb-3" />
                              <div className="d-flex align-items-center mb-3">
                                <Link
                                  to={route.leadsDetails}
                                  className="avatar avatar-lg bg-gray flex-shrink-0 me-2"
                                >
                                  <span className="avatar-title text-dark">
                                    AS
                                  </span>
                                </Link>
                                <h6 className="fw-medium">
                                  <Link to={route.leadsDetails}>Adams</Link>
                                </h6>
                              </div>
                            </div>
                            <div className="mb-3 d-flex flex-column">
                              <p className="text-default d-inline-flex align-items-center mb-2">
                                <i className="ti ti-report-money text-dark me-1" />
                                $02,45,000
                              </p>
                              <p className="text-default d-inline-flex align-items-center mb-2">
                                <i className="ti ti-mail text-dark me-1" />
                                vaughan12@example.com
                              </p>
                              <p className="text-default d-inline-flex align-items-center mb-2">
                                <i className="ti ti-phone text-dark me-1" />
                                +1 17392-27846
                              </p>
                              <p className="text-default d-inline-flex align-items-center">
                                <i className="ti ti-map-pin-pin text-dark me-1" />
                                London, United Kingdom
                              </p>
                            </div>
                            <div className="d-flex align-items-center justify-content-between border-top pt-3 mt-3">
                              <span className="avatar avatar-sm border rounded d-flex align-items-center justify-content-center">
                                <img
                                  src="assets/img/icons/company-icon-03.svg"
                                  className="w-auto h-auto"
                                  alt=""
                                />
                              </span>
                              <div className="icons-social d-flex align-items-center">
                                <Link
                                  to="#"
                                  className="d-flex align-items-center justify-content-center me-1"
                                >
                                  <i className="ti ti-phone-check" />
                                </Link>
                                <Link
                                  to="#"
                                  className="d-flex align-items-center justify-content-center me-1"
                                >
                                  <i className="ti ti-message-circle-2" />
                                </Link>
                                <Link
                                  to="#"
                                  className="d-flex align-items-center justify-content-center"
                                >
                                  <i className="ti ti-color-swatch" />
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div>
                        <div className="card kanban-card border">
                          <div className="card-body">
                            <div className="d-block">
                              <div className="bg-warning border border-2 mb-3" />
                              <div className="d-flex align-items-center mb-3">
                                <Link
                                  to={route.leadsDetails}
                                  className="avatar avatar-lg bg-gray flex-shrink-0 me-2"
                                >
                                  <span className="avatar-title text-dark">
                                    WK
                                  </span>
                                </Link>
                                <h6 className="fw-medium">
                                  <Link to={route.leadsDetails}>Wizosk</Link>
                                </h6>
                              </div>
                            </div>
                            <div className="mb-3 d-flex flex-column">
                              <p className="text-default d-inline-flex align-items-center mb-2">
                                <i className="ti ti-report-money text-dark me-1" />
                                $01,17,000
                              </p>
                              <p className="text-default d-inline-flex align-items-center mb-2">
                                <i className="ti ti-mail text-dark me-1" />
                                caroltho3@example.com
                              </p>
                              <p className="text-default d-inline-flex align-items-center mb-2">
                                <i className="ti ti-phone text-dark me-1" />
                                +1 78982-09163
                              </p>
                              <p className="text-default d-inline-flex align-items-center">
                                <i className="ti ti-map-pin-pin text-dark me-1" />
                                Bristol, United Kingdom
                              </p>
                            </div>
                            <div className="d-flex align-items-center justify-content-between border-top pt-3 mt-3">
                              <span className="avatar avatar-sm border rounded d-flex align-items-center justify-content-center">
                                <img
                                  src="assets/img/icons/company-icon-04.svg"
                                  className="w-auto h-auto"
                                  alt=""
                                />
                              </span>
                              <div className="icons-social d-flex align-items-center">
                                <Link
                                  to="#"
                                  className="d-flex align-items-center justify-content-center me-1"
                                >
                                  <i className="ti ti-phone-check" />
                                </Link>
                                <Link
                                  to="#"
                                  className="d-flex align-items-center justify-content-center me-1"
                                >
                                  <i className="ti ti-message-circle-2" />
                                </Link>
                                <Link
                                  to="#"
                                  className="d-flex align-items-center justify-content-center"
                                >
                                  <i className="ti ti-color-swatch" />
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div>
                        <div className="card kanban-card border">
                          <div className="card-body">
                            <div className="d-block">
                              <div className="bg-success border border-2 mb-3" />
                              <div className="d-flex align-items-center mb-3">
                                <Link
                                  to={route.leadsDetails}
                                  className="avatar avatar-lg bg-gray flex-shrink-0 me-2"
                                >
                                  <span className="avatar-title text-dark">
                                    HR
                                  </span>
                                </Link>
                                <h6 className="fw-medium">
                                  <Link to={route.leadsDetails}>Heller</Link>
                                </h6>
                              </div>
                            </div>
                            <div className="mb-3 d-flex flex-column">
                              <p className="text-default d-inline-flex align-items-center mb-2">
                                <i className="ti ti-report-money text-dark me-1" />
                                $02,12,000
                              </p>
                              <p className="text-default d-inline-flex align-items-center mb-2">
                                <i className="ti ti-mail text-dark me-1" />
                                dawnmercha@example.com
                              </p>
                              <p className="text-default d-inline-flex align-items-center mb-2">
                                <i className="ti ti-phone text-dark me-1" />
                                +1 27691-89246
                              </p>
                              <p className="text-default d-inline-flex align-items-center">
                                <i className="ti ti-map-pin-pin text-dark me-1" />
                                San Francisco, United States
                              </p>
                            </div>
                            <div className="d-flex align-items-center justify-content-between border-top pt-3 mt-3">
                              <span className="avatar avatar-sm border rounded d-flex align-items-center justify-content-center">
                                <img
                                  src="assets/img/icons/company-icon-05.svg"
                                  className="w-auto h-auto"
                                  alt=""
                                />
                              </span>
                              <div className="icons-social d-flex align-items-center">
                                <Link
                                  to="#"
                                  className="d-flex align-items-center justify-content-center me-1"
                                >
                                  <i className="ti ti-phone-check" />
                                </Link>
                                <Link
                                  to="#"
                                  className="d-flex align-items-center justify-content-center me-1"
                                >
                                  <i className="ti ti-message-circle-2" />
                                </Link>
                                <Link
                                  to="#"
                                  className="d-flex align-items-center justify-content-center"
                                >
                                  <i className="ti ti-color-swatch" />
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="kanban-list-items">
                    <div className="card mb-0">
                      <div className="card-body">
                        <div className="d-flex justify-content-between align-items-center">
                          <div>
                            <h4 className="fw-semibold d-flex align-items-center mb-1">
                              <i className="ti ti-circle-filled fs-8 text-success me-2" />
                              Closed
                            </h4>
                            <span className="fw-medium text-default">
                              45 Leads - $15,44,540
                            </span>
                          </div>
                          <div className="d-flex align-items-center">
                            <Link
                              to="#"
                              className="text-purple"
                            >
                              <i className="ti ti-plus" />
                            </Link>
                            <div className="dropdown table-action ms-2">
                              <Link
                                to="#"
                                className="action-icon dropdown-toggle bg-white"
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
                                  <i className="fa-solid fa-pencil text-blue" />{" "}
                                  Edit
                                </Link>
                                <Link
                                  className="dropdown-item"
                                  to="#"
                                  data-bs-toggle="modal"
                                  data-bs-target="#delete_lead"
                                >
                                  <i className="fa-regular fa-trash-can text-danger" />{" "}
                                  Delete
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="kanban-drag-wrap pt-4">
                      <div>
                        <div className="card kanban-card border">
                          <div className="card-body">
                            <div className="d-block">
                              <div className="bg-success border border-2 mb-3" />
                              <div className="d-flex align-items-center mb-3">
                                <Link
                                  to={route.leadsDetails}
                                  className="avatar avatar-lg bg-gray flex-shrink-0 me-2"
                                >
                                  <span className="avatar-title text-dark">
                                    GI
                                  </span>
                                </Link>
                                <h6 className="fw-medium">
                                  <Link to={route.leadsDetails}>Gutkowsi</Link>
                                </h6>
                              </div>
                            </div>
                            <div className="mb-3 d-flex flex-column">
                              <p className="text-default d-inline-flex align-items-center mb-2">
                                <i className="ti ti-report-money text-dark me-1" />
                                $01,84,043
                              </p>
                              <p className="text-default d-inline-flex align-items-center mb-2">
                                <i className="ti ti-mail text-dark me-1" />
                                rachel@example.com
                              </p>
                              <p className="text-default d-inline-flex align-items-center mb-2">
                                <i className="ti ti-phone text-dark me-1" />
                                +1 17839-93617
                              </p>
                              <p className="text-default d-inline-flex align-items-center">
                                <i className="ti ti-map-pin-pin text-dark me-1" />
                                Dallas, United States
                              </p>
                            </div>
                            <div className="d-flex align-items-center justify-content-between border-top pt-3 mt-3">
                              <span className="avatar avatar-sm border rounded d-flex align-items-center justify-content-center">
                                <img
                                  src="assets/img/icons/company-icon-06.svg"
                                  className="w-auto h-auto"
                                  alt=""
                                />
                              </span>
                              <div className="icons-social d-flex align-items-center">
                                <Link
                                  to="#"
                                  className="d-flex align-items-center justify-content-center me-1"
                                >
                                  <i className="ti ti-phone-check" />
                                </Link>
                                <Link
                                  to="#"
                                  className="d-flex align-items-center justify-content-center me-1"
                                >
                                  <i className="ti ti-message-circle-2" />
                                </Link>
                                <Link
                                  to="#"
                                  className="d-flex align-items-center justify-content-center"
                                >
                                  <i className="ti ti-color-swatch" />
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div>
                        <div className="card kanban-card border">
                          <div className="card-body">
                            <div className="d-block">
                              <div className="bg-danger border border-2 mb-3" />
                              <div className="d-flex align-items-center mb-3">
                                <Link
                                  to={route.leadsDetails}
                                  className="avatar avatar-lg bg-gray flex-shrink-0 me-2"
                                >
                                  <span className="avatar-title text-dark">
                                    WR
                                  </span>
                                </Link>
                                <h6 className="fw-medium">
                                  <Link to={route.leadsDetails}>Walter</Link>
                                </h6>
                              </div>
                            </div>
                            <div className="mb-3 d-flex flex-column">
                              <p className="text-default d-inline-flex align-items-center mb-2">
                                <i className="ti ti-report-money text-dark me-1" />
                                $09,35,189
                              </p>
                              <p className="text-default d-inline-flex align-items-center mb-2">
                                <i className="ti ti-mail text-dark me-1" />
                                jonelle@example.com
                              </p>
                              <p className="text-default d-inline-flex align-items-center mb-2">
                                <i className="ti ti-phone text-dark me-1" />
                                +1 16739-47193
                              </p>
                              <p className="text-default d-inline-flex align-items-center">
                                <i className="ti ti-map-pin-pin text-dark me-1" />
                                Leicester, United Kingdom
                              </p>
                            </div>
                            <div className="d-flex align-items-center justify-content-between border-top pt-3 mt-3">
                              <span className="avatar avatar-sm border rounded d-flex align-items-center justify-content-center">
                                <img
                                  src="assets/img/icons/company-icon-07.svg"
                                  className="w-auto h-auto"
                                  alt=""
                                />
                              </span>
                              <div className="icons-social d-flex align-items-center">
                                <Link
                                  to="#"
                                  className="d-flex align-items-center justify-content-center me-1"
                                >
                                  <i className="ti ti-phone-check" />
                                </Link>
                                <Link
                                  to="#"
                                  className="d-flex align-items-center justify-content-center me-1"
                                >
                                  <i className="ti ti-message-circle-2" />
                                </Link>
                                <Link
                                  to="#"
                                  className="d-flex align-items-center justify-content-center"
                                >
                                  <i className="ti ti-color-swatch" />
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div>
                        <div className="card kanban-card border">
                          <div className="card-body">
                            <div className="d-block">
                              <div className="bg-purple border border-2 mb-3" />
                              <div className="d-flex align-items-center mb-3">
                                <Link
                                  to={route.leadsDetails}
                                  className="avatar avatar-lg bg-gray flex-shrink-0 me-2"
                                >
                                  <span className="avatar-title text-dark">
                                    HN
                                  </span>
                                </Link>
                                <h6 className="fw-medium">
                                  <Link to={route.leadsDetails}>Hansen</Link>
                                </h6>
                              </div>
                            </div>
                            <div className="mb-3 d-flex flex-column">
                              <p className="text-default d-inline-flex align-items-center mb-2">
                                <i className="ti ti-report-money text-dark me-1" />
                                $04,27,940
                              </p>
                              <p className="text-default d-inline-flex align-items-center mb-2">
                                <i className="ti ti-mail text-dark me-1" />
                                jonathan@example.com
                              </p>
                              <p className="text-default d-inline-flex align-items-center mb-2">
                                <i className="ti ti-phone text-dark me-1" />
                                +1 18390-37153
                              </p>
                              <p className="text-default d-inline-flex align-items-center">
                                <i className="ti ti-map-pin-pin text-dark me-1" />
                                Norwich, United Kingdom
                              </p>
                            </div>
                            <div className="d-flex align-items-center justify-content-between border-top pt-3 mt-3">
                              <span className="avatar avatar-sm border rounded d-flex align-items-center justify-content-center">
                                <img
                                  src="assets/img/icons/company-icon-08.svg"
                                  className="w-auto h-auto"
                                  alt=""
                                />
                              </span>
                              <div className="icons-social d-flex align-items-center">
                                <Link
                                  to="#"
                                  className="d-flex align-items-center justify-content-center me-1"
                                >
                                  <i className="ti ti-phone-check" />
                                </Link>
                                <Link
                                  to="#"
                                  className="d-flex align-items-center justify-content-center me-1"
                                >
                                  <i className="ti ti-message-circle-2" />
                                </Link>
                                <Link
                                  to="#"
                                  className="d-flex align-items-center justify-content-center"
                                >
                                  <i className="ti ti-color-swatch" />
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="kanban-list-items">
                    <div className="card mb-0">
                      <div className="card-body">
                        <div className="d-flex justify-content-between align-items-center">
                          <div>
                            <h4 className="fw-semibold d-flex align-items-center mb-1">
                              <i className="ti ti-circle-filled fs-8 text-danger me-2" />
                              Lost
                            </h4>
                            <span className="fw-medium text-default">
                              15 Leads - $14,89,543
                            </span>
                          </div>
                          <div className="d-flex align-items-center">
                            <Link
                              to="#"
                              className="text-purple"
                            >
                              <i className="ti ti-plus" />
                            </Link>
                            <div className="dropdown table-action ms-2">
                              <Link
                                to="#"
                                className="action-icon dropdown-toggle bg-white"
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
                                  <i className="fa-solid fa-pencil text-blue" />{" "}
                                  Edit
                                </Link>
                                <Link
                                  className="dropdown-item"
                                  to="#"
                                  data-bs-toggle="modal"
                                  data-bs-target="#delete_lead"
                                >
                                  <i className="fa-regular fa-trash-can text-danger" />{" "}
                                  Delete
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="kanban-drag-wrap pt-4">
                      <div>
                        <div className="card kanban-card border">
                          <div className="card-body">
                            <div className="d-block">
                              <div className="bg-danger border border-2 mb-3" />
                              <div className="d-flex align-items-center mb-3">
                                <Link
                                  to={route.leadsDetails}
                                  className="avatar avatar-lg bg-gray flex-shrink-0 me-2"
                                >
                                  <span className="avatar-title text-dark">
                                    SE
                                  </span>
                                </Link>
                                <h6 className="fw-medium">
                                  <Link to={route.leadsDetails}>Steve</Link>
                                </h6>
                              </div>
                            </div>
                            <div className="mb-3 d-flex flex-column">
                              <p className="text-default d-inline-flex align-items-center mb-2">
                                <i className="ti ti-report-money text-dark me-1" />
                                $04,17,593
                              </p>
                              <p className="text-default d-inline-flex align-items-center mb-2">
                                <i className="ti ti-mail text-dark me-1" />
                                sidney@example.com
                              </p>
                              <p className="text-default d-inline-flex align-items-center mb-2">
                                <i className="ti ti-phone text-dark me-1" />
                                +1 11739-38135
                              </p>
                              <p className="text-default d-inline-flex align-items-center">
                                <i className="ti ti-map-pin-pin text-dark me-1" />
                                Manchester, United Kingdom
                              </p>
                            </div>
                            <div className="d-flex align-items-center justify-content-between border-top pt-3 mt-3">
                              <span className="avatar avatar-sm border rounded d-flex align-items-center justify-content-center">
                                <img
                                  src="assets/img/icons/company-icon-09.svg"
                                  className="w-auto h-auto"
                                  alt=""
                                />
                              </span>
                              <div className="icons-social d-flex align-items-center">
                                <Link
                                  to="#"
                                  className="d-flex align-items-center justify-content-center me-1"
                                >
                                  <i className="ti ti-phone-check" />
                                </Link>
                                <Link
                                  to="#"
                                  className="d-flex align-items-center justify-content-center me-1"
                                >
                                  <i className="ti ti-message-circle-2" />
                                </Link>
                                <Link
                                  to="#"
                                  className="d-flex align-items-center justify-content-center"
                                >
                                  <i className="ti ti-color-swatch" />
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div>
                        <div className="card kanban-card border">
                          <div className="card-body">
                            <div className="d-block">
                              <div className="bg-success border border-2 mb-3" />
                              <div className="d-flex align-items-center mb-3">
                                <Link
                                  to={route.leadsDetails}
                                  className="avatar avatar-lg bg-gray flex-shrink-0 me-2"
                                >
                                  <span className="avatar-title text-dark">
                                    LE
                                  </span>
                                </Link>
                                <h6 className="fw-medium">
                                  <Link to={route.leadsDetails}>Leuschke</Link>
                                </h6>
                              </div>
                            </div>
                            <div className="mb-3 d-flex flex-column">
                              <p className="text-default d-inline-flex align-items-center mb-2">
                                <i className="ti ti-report-money text-dark me-1" />
                                $08,81,389
                              </p>
                              <p className="text-default d-inline-flex align-items-center mb-2">
                                <i className="ti ti-mail text-dark me-1" />
                                brook@example.com
                              </p>
                              <p className="text-default d-inline-flex align-items-center mb-2">
                                <i className="ti ti-phone text-dark me-1" />
                                +1 19302-91043
                              </p>
                              <p className="text-default d-inline-flex align-items-center">
                                <i className="ti ti-map-pin-pin text-dark me-1" />
                                Chicago, United States
                              </p>
                            </div>
                            <div className="d-flex align-items-center justify-content-between border-top pt-3 mt-3">
                              <span className="avatar avatar-sm border rounded d-flex align-items-center justify-content-center">
                                <img
                                  src="assets/img/icons/company-icon-10.svg"
                                  className="w-auto h-auto"
                                  alt=""
                                />
                              </span>
                              <div className="icons-social d-flex align-items-center">
                                <Link
                                  to="#"
                                  className="d-flex align-items-center justify-content-center me-1"
                                >
                                  <i className="ti ti-phone-check" />
                                </Link>
                                <Link
                                  to="#"
                                  className="d-flex align-items-center justify-content-center me-1"
                                >
                                  <i className="ti ti-message-circle-2" />
                                </Link>
                                <Link
                                  to="#"
                                  className="d-flex align-items-center justify-content-center"
                                >
                                  <i className="ti ti-color-swatch" />
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div>
                        <div className="card kanban-card border">
                          <div className="card-body">
                            <div className="d-block">
                              <div className="bg-warning border border-2 mb-3" />
                              <div className="d-flex align-items-center mb-3">
                                <Link
                                  to={route.leadsDetails}
                                  className="avatar avatar-lg bg-gray flex-shrink-0 me-2"
                                >
                                  <span className="avatar-title text-dark">
                                    AY
                                  </span>
                                </Link>
                                <h6 className="fw-medium">
                                  <Link to={route.leadsDetails}>Anthony</Link>
                                </h6>
                              </div>
                            </div>
                            <div className="mb-3 d-flex flex-column">
                              <p className="text-default d-inline-flex align-items-center mb-2">
                                <i className="ti ti-report-money text-dark me-1" />
                                $09,27,193
                              </p>
                              <p className="text-default d-inline-flex align-items-center mb-2">
                                <i className="ti ti-mail text-dark me-1" />
                                mickey@example.com
                              </p>
                              <p className="text-default d-inline-flex align-items-center mb-2">
                                <i className="ti ti-phone text-dark me-1" />
                                +1 17280-92016
                              </p>
                              <p className="text-default d-inline-flex align-items-center">
                                <i className="ti ti-map-pin-pin text-dark me-1" />
                                Derby, United Kingdom
                              </p>
                            </div>
                            <div className="d-flex align-items-center justify-content-between border-top pt-3 mt-3">
                              <span className="avatar avatar-sm border rounded d-flex align-items-center justify-content-center">
                                <img
                                  src="assets/img/icons/company-icon-01.svg"
                                  className="w-auto h-auto"
                                  alt=""
                                />
                              </span>
                              <div className="icons-social d-flex align-items-center">
                                <Link
                                  to="#"
                                  className="d-flex align-items-center justify-content-center me-1"
                                >
                                  <i className="ti ti-phone-check" />
                                </Link>
                                <Link
                                  to="#"
                                  className="d-flex align-items-center justify-content-center me-1"
                                >
                                  <i className="ti ti-message-circle-2" />
                                </Link>
                                <Link
                                  to="#"
                                  className="d-flex align-items-center justify-content-center"
                                >
                                  <i className="ti ti-color-swatch" />
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* /Leads Kanban */}
              </div>
            </div>
          </div>
        </div>

        {/* /Page Wrapper */}
        {/* Add User */}
        <div className={`toggle-popup ${adduser ? "sidebar-popup" : ""}`}>
          <div className="sidebar-layout">
            <div className="sidebar-header">
              <h4>{modalTitle}</h4>
              <Link
                to="#"
                className="sidebar-close toggle-btn"
                onClick={togglePopup}
              >
                <i className="ti ti-x" />
              </Link>
            </div>
            <div className="toggle-body">
              <div className="pro-create">
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
                            <div className="radio-btn">
                              <input
                                type="radio"
                                className="status-radio"
                                id="person"
                                name="leave"
                                defaultChecked
                              />
                              <label htmlFor="person">Person</label>
                            </div>
                            <div className="radio-btn">
                              <input
                                type="radio"
                                className="status-radio"
                                id="org"
                                name="leave"
                              />
                              <label htmlFor="org">Organization</label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="mb-3">
                        <div className="d-flex justify-content-between align-items-center">
                          <label className="col-form-label">
                            Company <span className="text-danger">*</span>
                          </label>
                          <Link
                            to="#"
                            className="add-new add-new-company add-popups"
                            onClick={addcompanyPopup}
                          >
                            <i className="ti ti-square-rounded-plus me-2" />
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
                          Value <span className="text-danger">*</span>
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
                    <div className="col-md-12">
                      <div className="row">
                        <div className="col-md-8">
                          <div className="mb-3">
                            <label className="col-form-label">
                              Phone <span className="text-danger">*</span>
                            </label>
                            <input type="text" className="form-control" />
                          </div>
                        </div>
                        <div className="col-md-4 d-flex align-items-center">
                          <div className="mb-3 w-100">
                            <Select
                              className="select"
                              options={optionschoose}
                              classNamePrefix="react-select"
                            />
                          </div>
                        </div>
                      </div>
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
                        <SelectWithImage />
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
                          defaultValue="Rated"
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
                      <div className="radio-wrap mb-3">
                        <label className="col-form-label">Visibility</label>
                        <div className="d-flex flex-wrap">
                          <div className="radio-btn">
                            <input
                              type="radio"
                              className="status-radio"
                              id="public1"
                              name="visible"
                            />
                            <label htmlFor="public1">Public</label>
                          </div>
                          <div className="radio-btn">
                            <input
                              type="radio"
                              className="status-radio"
                              id="private1"
                              name="visible"
                            />
                            <label htmlFor="private1">Private</label>
                          </div>
                          <div
                            className="radio-btn"
                            data-bs-toggle="modal"
                            data-bs-target="#access_view"
                          >
                            <input
                              type="radio"
                              className="status-radio"
                              id="people1"
                              name="visible"
                            />
                            <label htmlFor="people1">Select People</label>
                          </div>
                        </div>
                      </div>
                      <div className="radio-wrap mb-3">
                        <label className="col-form-label">Status</label>
                        <div className="d-flex flex-wrap">
                          <div className="radio-btn">
                            <input
                              type="radio"
                              className="status-radio"
                              id="active1"
                              name="status"
                              defaultChecked
                            />
                            <label htmlFor="active1">Active</label>
                          </div>
                          <div className="radio-btn">
                            <input
                              type="radio"
                              className="status-radio"
                              id="inactive1"
                              name="status"
                            />
                            <label htmlFor="inactive1">Inactive</label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="submit-button text-end">
                    <Link to="#" className="btn btn-light sidebar-close">
                      Cancel
                    </Link>
                    <Link
                      to="#"
                      data-bs-toggle="modal"
                      data-bs-target="#create_contact"
                      className="btn btn-primary"
                    >
                      Create
                    </Link>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        {/* /Add User */}
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
                    <button type="button"  data-bs-dismiss="modal" className="btn btn-danger">
                      Save
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className={`toggle-popup2 ${addcompany ? "sidebar-popup" : ""}`}>
          <div className="sidebar-layout">
            <div className="sidebar-header">
              <h4>Add New Company</h4>
              <Link
                to="#"
                className="sidebar-close2 toggle-btn"
                onClick={addcompanyPopup}
              >
                <i className="ti ti-x" />
              </Link>
            </div>
            <div className="toggle-body">
              <div className="pro-create">
                <form>
                  <div className="accordion-lists" id="list-accord">
                    {/* Basic Info */}
                    <div className="user-accordion-item">
                      <Link
                        to="#"
                        className="accordion-wrap"
                        data-bs-toggle="collapse"
                        data-bs-target="#basic"
                      >
                        <span>
                          <i className="ti ti-user-plus" />
                        </span>
                        Basic Info
                      </Link>
                      <div
                        className="accordion-collapse collapse show"
                        id="basic"
                        data-bs-parent="#list-accord"
                      >
                        <div className="content-collapse">
                          <div className="row">
                            <div className="col-md-12">
                              <div className="mb-3">
                                <div className="profile-upload">
                                  <div className="profile-upload-img">
                                    <span>
                                      <i className="ti ti-photo" />
                                    </span>
                                    <ImageWithBasePath
                                      src="assets/img/icons/company-icon-03.svg"
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
                                      <input
                                        type="file"
                                        className="input-img"
                                      />
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
                                    <label
                                      htmlFor="user"
                                      className="checktoggle"
                                    />
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
                                <label className="col-form-label">
                                  Phone 2
                                </label>
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
                                <label className="col-form-label">
                                  Ratings
                                </label>
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
                              <div className="mb-3">
                                <label className="col-form-label">Owner</label>
                                <SelectWithImage />
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
                                  <label className="col-form-label">
                                    Deals
                                  </label>
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
                                  Industry{" "}
                                  <span className="text-danger">*</span>
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
                                <label className="col-form-label">
                                  Contact <span className="text-danger">*</span>
                                </label>
                                <SelectWithImage2 />
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="mb-3">
                                <label className="col-form-label">
                                  Currency{" "}
                                  <span className="text-danger">*</span>
                                </label>
                                <input type="text" className="form-control" />
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="mb-3">
                                <label className="col-form-label">
                                  Language{" "}
                                  <span className="text-danger">*</span>
                                </label>
                                <Select
                                  className="select"
                                  options={languageOptions}
                                  classNamePrefix="react-select"
                                />
                              </div>
                            </div>
                            <div className="col-md-12">
                              <div className="mb-3 mb-0">
                                <label className="col-form-label">
                                  Description{" "}
                                  <span className="text-danger">*</span>
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
                    <div className="user-accordion-item">
                      <Link
                        to="#"
                        className="accordion-wrap collapsed"
                        data-bs-toggle="collapse"
                        data-bs-target="#address"
                      >
                        <span>
                          <i className="ti ti-map-pin-cog" />
                        </span>
                        Address Info
                      </Link>
                      <div
                        className="accordion-collapse collapse"
                        id="address"
                        data-bs-parent="#list-accord"
                      >
                        <div className="content-collapse">
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
                              <div className="mb-3 mb-wrap">
                                <label className="col-form-label">
                                  Country
                                </label>
                                <Select
                                  className="select"
                                  options={countryoptions1}
                                  classNamePrefix="react-select"
                                />
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="mb-3 mb-wrap">
                                <label className="col-form-label">
                                  Zipcode{" "}
                                </label>
                                <input type="text" className="form-control" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* /Address Info */}
                    {/* Social Profile */}
                    <div className="user-accordion-item">
                      <Link
                        to="#"
                        className="accordion-wrap collapsed"
                        data-bs-toggle="collapse"
                        data-bs-target="#social"
                      >
                        <span>
                          <i className="ti ti-social" />
                        </span>
                        Social Profile
                      </Link>
                      <div
                        className="accordion-collapse collapse"
                        id="social"
                        data-bs-parent="#list-accord"
                      >
                        <div className="content-collapse">
                          <div className="row">
                            <div className="col-md-6">
                              <div className="mb-3">
                                <label className="col-form-label">
                                  Facebook
                                </label>
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
                                <label className="col-form-label">
                                  Linkedin{" "}
                                </label>
                                <input type="text" className="form-control" />
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="mb-3">
                                <label className="col-form-label">
                                  Twitter
                                </label>
                                <input type="text" className="form-control" />
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="mb-3 mb-wrap">
                                <label className="col-form-label">
                                  Whatsapp
                                </label>
                                <input type="text" className="form-control" />
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="mb-3 mb-wrap">
                                <label className="col-form-label">
                                  Instagram
                                </label>
                                <input type="text" className="form-control" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* /Social Profile */}
                    {/* Access */}
                    <div className="user-accordion-item">
                      <Link
                        to="#"
                        className="accordion-wrap collapsed"
                        data-bs-toggle="collapse"
                        data-bs-target="#access"
                      >
                        <span>
                          <i className="ti ti-accessible" />
                        </span>
                        Access
                      </Link>
                      <div
                        className="accordion-collapse collapse"
                        id="access"
                        data-bs-parent="#list-accord"
                      >
                        <div className="content-collapse">
                          <div className="row">
                            <div className="col-md-12">
                              <div className="radio-wrap mb-3">
                                <label className="col-form-label">
                                  Visibility
                                </label>
                                <div className="d-flex flex-wrap">
                                  <div className="radio-btn">
                                    <input
                                      type="radio"
                                      className="status-radio"
                                      id="public"
                                      name="visible"
                                    />
                                    <label htmlFor="public">Public</label>
                                  </div>
                                  <div className="radio-btn">
                                    <input
                                      type="radio"
                                      className="status-radio"
                                      id="private"
                                      name="visible"
                                    />
                                    <label htmlFor="private">Private</label>
                                  </div>
                                  <div
                                    className="radio-btn"
                                    data-bs-toggle="modal"
                                    data-bs-target="#access_view"
                                  >
                                    <input
                                      type="radio"
                                      className="status-radio"
                                      id="people"
                                      name="visible"
                                    />
                                    <label htmlFor="people">
                                      Select People
                                    </label>
                                  </div>
                                </div>
                              </div>
                              <div className="radio-wrap">
                                <label className="col-form-label">Status</label>
                                <div className="d-flex flex-wrap">
                                  <div className="radio-btn">
                                    <input
                                      type="radio"
                                      className="status-radio"
                                      id="active"
                                      name="status"
                                      defaultChecked
                                    />
                                    <label htmlFor="active">Active</label>
                                  </div>
                                  <div className="radio-btn">
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
                  <div className="submit-button text-end">
                    <Link to="#" className="btn btn-light sidebar-close2">
                      Cancel
                    </Link>
                    <button type="button" className="btn btn-primary">
                      Create
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div
          className="modal custom-modal fade"
          id="delete_contact"
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
                  <div className="success-popup-icon">
                    <i className="ti ti-trash-x" />
                  </div>
                  <h3>Remove Leads?</h3>
                  <p className="del-info">
                    Are you sure you want to remove lead you selected.
                  </p>
                  <div className="col-lg-12 text-center modal-btn">
                    <Link
                      to="#"
                      className="btn btn-light"
                      data-bs-dismiss="modal"
                    >
                      Cancel
                    </Link>
                    <Link to="leads" className="btn btn-danger">
                      Yes, Delete it
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="modal custom-modal fade" id="delete_deal" role="dialog">
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
                  <div className="success-popup-icon">
                    <i className="ti ti-trash-x" />
                  </div>
                  <h3>Remove Leads?</h3>
                  <p className="del-info">
                    Are you sure you want to remove lead you selected.
                  </p>
                  <div className="col-lg-12 text-center modal-btn">
                    <Link
                      to="#"
                      className="btn btn-light"
                      data-bs-dismiss="modal"
                    >
                      Cancel
                    </Link>
                    <Link to="/leads" className="btn btn-danger">
                      Yes, Delete it
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    </>
  );
};

export default LeadsKanban;
