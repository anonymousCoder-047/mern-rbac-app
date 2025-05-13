import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { all_routes } from "../../router/all_routes";
import ImageWithBasePath from "../../../core/common/imageWithBasePath";
import CollapseHeader from "../../../core/common/collapse-header";
import { SelectWithImage2 } from "../../../core/common/selectWithImage2";
import { Modal } from "react-bootstrap";
import DefaultEditor from "react-simple-wysiwyg";
import Select from "react-select";
import DatePicker from "react-datepicker";
import { duration, options1, status } from "../../../core/common/selectoption/selectoption";
import { TagsInput } from "react-tag-input-component";
import {
  optionssymbol,
  priorityList,
  project,
  salestypelist,
  socialMedia,
  tagInputValues,
} from "../../../core/common/selectoption/selectoption";
import dragula, { Drake } from "dragula";
import "dragula/dist/dragula.css";
const route = all_routes;
const DealsKanban = () => {
  const [owner, setOwner] = useState(["Collab"]);
  const [openModal, setOpenModal] = useState(false);
  const route = all_routes;

  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
  };
  const [selectedDate1, setSelectedDate1] = useState<Date | null>(new Date());
  const handleDateChange1 = (date: Date | null) => {
    setSelectedDate1(date);
  };
  const container1Ref = useRef<HTMLDivElement>(null);
  const container2Ref = useRef<HTMLDivElement>(null);
  const container3Ref = useRef<HTMLDivElement>(null);
  const container4Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const containers = [
      container1Ref.current as HTMLDivElement,
      container2Ref.current as HTMLDivElement,
      container3Ref.current as HTMLDivElement,
      container4Ref.current as HTMLDivElement,
    ].filter((container) => container !== null);

    const drake: Drake = dragula(containers);
    return () => {
      drake.destroy();
    };
  }, []);
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
              <div className="col-8">
                <h4 className="page-title">
                  Deals<span className="count-title">123</span>
                </h4>
              </div>
              <div className="col-4 text-end">
                <div className="head-icons">
                  <CollapseHeader/>
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
                <div className="filter-dropdown-menu dropdown-menu  dropdown-menu-md-start p-3">
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
                          <Link
                            to={route.dealsKanban}
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
            <div>
              <ul className="d-flex align-items-center">
                <li>
                  <div className="view-icons me-2">
                    <Link to={route.deals}>
                      <i className="ti ti-list-tree" />
                    </Link>
                    <Link to={route.dealsKanban} className="active">
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
                    Add Deals
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          {/* /Filter */}
          {/* Deals Kanban */}
          <div className="d-flex overflow-x-auto align-items-start mb-4">
            <div className="kanban-list-items">
              <div className="card mb-0">
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <h4 className="fw-semibold d-flex align-items-center mb-1">
                        <i className="ti ti-circle-filled fs-8 text-success me-2" />
                        Qualify To Buy
                      </h4>
                      <span className="fw-medium text-default">
                        45 Leads - $15,44,540
                      </span>
                    </div>
                    <div className="d-flex align-items-center">
                      <Link to="#" className="text-purple">
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
                            <i className="fa-solid fa-pencil text-blue" /> Edit
                          </Link>
                          <Link
                            className="dropdown-item"
                            to="#"
                            data-bs-toggle="modal"
                            data-bs-target="#delete_deal"
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
              <div className="kanban-drag-wrap pt-4" ref={container1Ref}>
                <div>
                  <div className="card kanban-card border">
                    <div className="card-body">
                      <div className="d-block">
                        <div className="bg-purple border border-2 mb-3" />
                        <div className="d-flex align-items-center mb-3">
                          <Link
                            to={route.dealsDetails}
                            className="avatar avatar-lg bg-gray flex-shrink-0 me-2"
                          >
                            <span className="avatar-title text-dark">HT</span>
                          </Link>
                          <h6 className="fw-medium">
                            <Link to={route.dealsDetails}>
                              Howell, Tremblay <br /> and Rath
                            </Link>
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
                      <div className="d-flex justify-content-between align-items-center">
                        <div className="d-flex align-items-center">
                          <Link
                            to="#"
                            className="avatar avatar-md flex-shrink-0 me-2"
                          >
                            <ImageWithBasePath
                              src="assets/img/profiles/avatar-19.jpg"
                              alt=""
                            />
                          </Link>
                          <Link
                            to="#"
                            className="text-default"
                          >
                            Darlee Robertson
                          </Link>
                        </div>
                        <span className="badge badge-sm text-white bg-blue">
                          <i className="ti ti-progress me-1" />
                          85%
                        </span>
                      </div>
                      <div className="d-flex align-items-center justify-content-between border-top pt-3 mt-3">
                        <span>
                          <i className="ti ti-calendar-due" /> 10 Jan 2024
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
                            to={route.dealsDetails}
                            className="avatar avatar-lg bg-gray flex-shrink-0 me-2"
                          >
                            <span className="avatar-title text-dark">RJ</span>
                          </Link>
                          <h6 className="fw-medium">
                            <Link to={route.dealsDetails}>
                              Robert, John and <br /> Carlos
                            </Link>
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
                          sheron@example.com
                        </p>
                        <p className="text-default d-inline-flex align-items-center mb-2">
                          <i className="ti ti-phone text-dark me-1" />
                          +1 12445-47878
                        </p>
                        <p className="text-default d-inline-flex align-items-center">
                          <i className="ti ti-map-pin-pin text-dark me-1" />
                          Exeter, United States
                        </p>
                      </div>
                      <div className="d-flex justify-content-between align-items-center">
                        <div className="d-flex align-items-center">
                          <Link
                            to="#"
                            className="avatar avatar-md flex-shrink-0 me-2"
                          >
                            <ImageWithBasePath
                              src="assets/img/profiles/avatar-20.jpg"
                              alt=""
                            />
                          </Link>
                          <Link
                            to="#"
                            className="text-default"
                          >
                            Sharon Roy
                          </Link>
                        </div>
                        <span className="badge badge-sm text-white bg-blue">
                          <i className="ti  me-1" />
                          15%
                        </span>
                      </div>
                      <div className="d-flex align-items-center justify-content-between border-top pt-3 mt-3">
                        <span>
                          <i className="ti ti-calendar-due" /> 12 Jan 2024
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
                            to={route.dealsDetails}
                            className="avatar avatar-lg bg-gray flex-shrink-0 me-2"
                          >
                            <span className="avatar-title text-dark">WS</span>
                          </Link>
                          <h6 className="fw-medium">
                            <Link to={route.dealsDetails}>
                              Wendy, Star and <br /> David
                            </Link>
                          </h6>
                        </div>
                      </div>
                      <div className="mb-3 d-flex flex-column">
                        <p className="text-default d-inline-flex align-items-center mb-2">
                          <i className="ti ti-report-money text-dark me-1" />
                          $04,22,000
                        </p>
                        <p className="text-default d-inline-flex align-items-center mb-2">
                          <i className="ti ti-mail text-dark me-1" />
                          vau@example.com
                        </p>
                        <p className="text-default d-inline-flex align-items-center mb-2">
                          <i className="ti ti-phone text-dark me-1" />
                          +1 12445-47878
                        </p>
                        <p className="text-default d-inline-flex align-items-center">
                          <i className="ti ti-map-pin-pin text-dark me-1" />
                          Phoenix, United States
                        </p>
                      </div>
                      <div className="d-flex justify-content-between align-items-center">
                        <div className="d-flex align-items-center">
                          <Link
                            to="#"
                            className="avatar avatar-md flex-shrink-0 me-2"
                          >
                            <ImageWithBasePath
                              src="assets/img/profiles/avatar-21.jpg"
                              alt=""
                            />
                          </Link>
                          <Link
                            to="#"
                            className="text-default"
                          >
                            Vaughan
                          </Link>
                        </div>
                        <span className="badge badge-sm text-white bg-blue">
                          <i className="ti ti-progress me-1" />
                          95%
                        </span>
                      </div>
                      <div className="d-flex align-items-center justify-content-between border-top pt-3 mt-3">
                        <span>
                          <i className="ti ti-calendar-due" /> 14 Jan 2024
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
                        <i className="ti ti-circle-filled fs-8 text-info me-2" />
                        Contact Made
                      </h4>
                      <span className="fw-medium text-default">
                        30 Leads - $19,94,938
                      </span>
                    </div>
                    <div className="d-flex align-items-center">
                      <Link to="#" className="text-purple">
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
                            <i className="fa-solid fa-pencil text-blue" /> Edit
                          </Link>
                          <Link
                            className="dropdown-item"
                            to="#"
                            data-bs-toggle="modal"
                            data-bs-target="#delete_deal"
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
              <div className="kanban-drag-wrap pt-4" ref={container2Ref}>
                <div>
                  <div className="card kanban-card border">
                    <div className="card-body">
                      <div className="d-block">
                        <div className="bg-success border border-2 mb-3" />
                        <div className="d-flex align-items-center mb-3">
                          <Link
                            to={route.dealsDetails}
                            className="avatar avatar-lg bg-gray flex-shrink-0 me-2"
                          >
                            <span className="avatar-title text-dark">BR</span>
                          </Link>
                          <h6 className="fw-medium">
                            <Link to={route.dealsDetails}>
                              Byron, Roman and <br /> Bailey
                            </Link>
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
                          jessica13@example.com
                        </p>
                        <p className="text-default d-inline-flex align-items-center mb-2">
                          <i className="ti ti-phone text-dark me-1" />
                          +1 89351-90346
                        </p>
                        <p className="text-default d-inline-flex align-items-center">
                          <i className="ti ti-map-pin-pin text-dark me-1" />
                          Chester, United States
                        </p>
                      </div>
                      <div className="d-flex justify-content-between align-items-center">
                        <div className="d-flex align-items-center">
                          <Link
                            to="#"
                            className="avatar avatar-md flex-shrink-0 me-2"
                          >
                            <ImageWithBasePath
                              src="assets/img/profiles/avatar-01.jpg"
                              alt=""
                            />
                          </Link>
                          <Link
                            to="#"
                            className="text-default"
                          >
                            Jessica
                          </Link>
                        </div>
                        <span className="badge badge-sm text-white bg-blue">
                          <i className="ti ti-progress me-1" />
                          47%
                        </span>
                      </div>
                      <div className="d-flex align-items-center justify-content-between border-top pt-3 mt-3">
                        <span>
                          <i className="ti ti-calendar-due" /> 06 Feb 2024
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
                            to={route.dealsDetails}
                            className="avatar avatar-lg bg-gray flex-shrink-0 me-2"
                          >
                            <span className="avatar-title text-dark">RJ</span>
                          </Link>
                          <h6 className="fw-medium">
                            <Link to={route.dealsDetails}>
                              Robert, John and <br /> Carlos
                            </Link>
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
                          Charlotte, United States
                        </p>
                      </div>
                      <div className="d-flex justify-content-between align-items-center">
                        <div className="d-flex align-items-center">
                          <Link
                            to="#"
                            className="avatar avatar-md flex-shrink-0 me-2"
                          >
                            <ImageWithBasePath
                              src="assets/img/profiles/avatar-16.jpg"
                              alt=""
                            />
                          </Link>
                          <Link
                            to="#"
                            className="text-default"
                          >
                            Carol Thomas
                          </Link>
                        </div>
                        <span className="badge badge-sm text-white bg-blue">
                          <i className="ti ti-progress me-1" />
                          98%
                        </span>
                      </div>
                      <div className="d-flex align-items-center justify-content-between border-top pt-3 mt-3">
                        <span>
                          <i className="ti ti-calendar-due" /> 15 Jan 2024
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
                            to={route.dealsDetails}
                            className="avatar avatar-lg bg-gray flex-shrink-0 me-2"
                          >
                            <span className="avatar-title text-dark">IC</span>
                          </Link>
                          <h6 className="fw-medium">
                            <Link to={route.dealsDetails}>
                              Irene, Charles and <br /> Wilston
                            </Link>
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
                          Bristol, United States
                        </p>
                      </div>
                      <div className="d-flex justify-content-between align-items-center">
                        <div className="d-flex align-items-center">
                          <Link
                            to="#"
                            className="avatar avatar-md flex-shrink-0 me-2"
                          >
                            <ImageWithBasePath
                              src="assets/img/profiles/avatar-22.jpg"
                              alt=""
                            />
                          </Link>
                          <Link
                            to="#"
                            className="text-default"
                          >
                            Dawn Mercha
                          </Link>
                        </div>
                        <span className="badge badge-sm text-white bg-blue">
                          <i className="ti ti-progress me-1" />
                          95%
                        </span>
                      </div>
                      <div className="d-flex align-items-center justify-content-between border-top pt-3 mt-3">
                        <span>
                          <i className="ti ti-calendar-due" /> 25 Jan 2024
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
                        <i className="ti ti-circle-filled fs-8 text-warning me-2" />
                        Presentation
                      </h4>
                      <span className="fw-medium text-default">
                        25 Leads - $10,36.390
                      </span>
                    </div>
                    <div className="d-flex align-items-center">
                      <Link to="#" className="text-purple">
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
                            <i className="fa-solid fa-pencil text-blue" /> Edit
                          </Link>
                          <Link
                            className="dropdown-item"
                            to="#"
                            data-bs-toggle="modal"
                            data-bs-target="#delete_deal"
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
              <div className="kanban-drag-wrap pt-4" ref={container3Ref}>
                <div>
                  <div className="card kanban-card border">
                    <div className="card-body">
                      <div className="d-block">
                        <div className="bg-warning border border-2 mb-3" />
                        <div className="d-flex align-items-center mb-3">
                          <Link
                            to={route.dealsDetails}
                            className="avatar avatar-lg bg-gray flex-shrink-0 me-2"
                          >
                            <span className="avatar-title text-dark">HT</span>
                          </Link>
                          <h6 className="fw-medium">
                            <Link to={route.dealsDetails}>
                              Jody, Powell and <br /> Cecil
                            </Link>
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
                          Baltimore, United States
                        </p>
                      </div>
                      <div className="d-flex justify-content-between align-items-center">
                        <div className="d-flex align-items-center">
                          <Link
                            to="#"
                            className="avatar avatar-md flex-shrink-0 me-2"
                          >
                            <ImageWithBasePath
                              src="assets/img/profiles/avatar-23.jpg"
                              alt=""
                            />
                          </Link>
                          <Link
                            to="#"
                            className="text-default"
                          >
                            Rachel Hampton
                          </Link>
                        </div>
                        <span className="badge badge-sm text-white bg-blue">
                          <i className="ti ti-progress me-1" />
                          25%
                        </span>
                      </div>
                      <div className="d-flex align-items-center justify-content-between border-top pt-3 mt-3">
                        <span>
                          <i className="ti ti-calendar-due" /> 18 Mar 2024
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
                            to={route.dealsDetails}
                            className="avatar avatar-lg bg-gray flex-shrink-0 me-2"
                          >
                            <span className="avatar-title text-dark">BL</span>
                          </Link>
                          <h6 className="fw-medium">
                            <Link to={route.dealsDetails}>
                              Bonnie, Linda and <br /> Mullin
                            </Link>
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
                          Coventry, United States
                        </p>
                      </div>
                      <div className="d-flex justify-content-between align-items-center">
                        <div className="d-flex align-items-center">
                          <Link
                            to="#"
                            className="avatar avatar-md flex-shrink-0 me-2"
                          >
                            <ImageWithBasePath
                              src="assets/img/profiles/avatar-24.jpg"
                              alt=""
                            />
                          </Link>
                          <Link
                            to="#"
                            className="text-default"
                          >
                            Jonelle Curtiss
                          </Link>
                        </div>
                        <span className="badge badge-sm text-white bg-blue">
                          <i className="ti ti-progress me-1" />
                          70%
                        </span>
                      </div>
                      <div className="d-flex align-items-center justify-content-between border-top pt-3 mt-3">
                        <span>
                          <i className="ti ti-calendar-due" /> 15 Feb 2024
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
                            to={route.dealsDetails}
                            className="avatar avatar-lg bg-gray flex-shrink-0 me-2"
                          >
                            <span className="avatar-title text-dark">CJ</span>
                          </Link>
                          <h6 className="fw-medium">
                            <Link to={route.dealsDetails}>
                              Carlos, Jones and <br /> Jim
                            </Link>
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
                          Seattle
                        </p>
                      </div>
                      <div className="d-flex justify-content-between align-items-center">
                        <div className="d-flex align-items-center">
                          <Link
                            to="#"
                            className="avatar avatar-md flex-shrink-0 me-2"
                          >
                            <ImageWithBasePath
                              src="assets/img/profiles/avatar-25.jpg"
                              alt=""
                            />
                          </Link>
                          <Link
                            to="#"
                            className="text-default"
                          >
                            Jonathan
                          </Link>
                        </div>
                        <span className="badge badge-sm text-white bg-blue">
                          <i className="ti ti-progress me-1" />
                          45%
                        </span>
                      </div>
                      <div className="d-flex align-items-center justify-content-between border-top pt-3 mt-3">
                        <span>
                          <i className="ti ti-calendar-due" /> 30 Jan 2024
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
                        Proposal Made
                      </h4>
                      <span className="fw-medium text-default">
                        50 Leads - $18,83,013
                      </span>
                    </div>
                    <div className="d-flex align-items-center">
                      <Link to="#" className="text-purple">
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
                            <i className="fa-solid fa-pencil text-blue" /> Edit
                          </Link>
                          <Link
                            className="dropdown-item"
                            to="#"
                            data-bs-toggle="modal"
                            data-bs-target="#delete_deal"
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
              <div className="kanban-drag-wrap pt-4" ref={container4Ref}>
                <div>
                  <div className="card kanban-card border">
                    <div className="card-body">
                      <div className="d-block">
                        <div className="bg-danger border border-2 mb-3" />
                        <div className="d-flex align-items-center mb-3">
                          <Link
                            to={route.dealsDetails}
                            className="avatar avatar-lg bg-gray flex-shrink-0 me-2"
                          >
                            <span className="avatar-title text-dark">FJ</span>
                          </Link>
                          <h6 className="fw-medium">
                            <Link to={route.dealsDetails}>
                              Freda,Jennfier and <br /> Thompson
                            </Link>
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
                          London, United States
                        </p>
                      </div>
                      <div className="d-flex justify-content-between align-items-center">
                        <div className="d-flex align-items-center">
                          <Link
                            to="#"
                            className="avatar avatar-md flex-shrink-0 me-2"
                          >
                            <ImageWithBasePath
                              src="assets/img/profiles/avatar-17.jpg"
                              alt=""
                            />
                          </Link>
                          <Link
                            to="#"
                            className="text-default"
                          >
                            Sidney Franks
                          </Link>
                        </div>
                        <span className="badge badge-sm text-white bg-blue">
                          <i className="ti ti-progress me-1" />
                          59%
                        </span>
                      </div>
                      <div className="d-flex align-items-center justify-content-between border-top pt-3 mt-3">
                        <span>
                          <i className="ti ti-calendar-due" /> 11 Apr 2024
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
                            to={route.dealsDetails}
                            className="avatar avatar-lg bg-gray flex-shrink-0 me-2"
                          >
                            <span className="avatar-title text-dark">BF</span>
                          </Link>
                          <h6 className="fw-medium">
                            <Link to={route.dealsDetails}>
                              Bruce, Faulkner and <br /> Lela
                            </Link>
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
                          Detroit, United State
                        </p>
                      </div>
                      <div className="d-flex justify-content-between align-items-center">
                        <div className="d-flex align-items-center">
                          <Link
                            to="#"
                            className="avatar avatar-md flex-shrink-0 me-2"
                          >
                            <ImageWithBasePath
                              src="assets/img/profiles/avatar-26.jpg"
                              alt=""
                            />
                          </Link>
                          <Link
                            to="#"
                            className="text-default"
                          >
                            Brook
                          </Link>
                        </div>
                        <span className="badge badge-sm text-white bg-blue">
                          <i className="ti ti-progress me-1" />
                          72%
                        </span>
                      </div>
                      <div className="d-flex align-items-center justify-content-between border-top pt-3 mt-3">
                        <span>
                          <i className="ti ti-calendar-due" /> 17 Apr 2024
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
                            to={route.dealsDetails}
                            className="avatar avatar-lg bg-gray flex-shrink-0 me-2"
                          >
                            <span className="avatar-title text-dark">LP</span>
                          </Link>
                          <h6 className="fw-medium">
                            <Link to={route.dealsDetails}>
                              Lawrence, Patrick and <br /> Vandorn
                            </Link>
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
                          Manchester, United States
                        </p>
                      </div>
                      <div className="d-flex justify-content-between align-items-center">
                        <div className="d-flex align-items-center">
                          <Link
                            to="#"
                            className="avatar avatar-md flex-shrink-0 me-2"
                          >
                            <ImageWithBasePath
                              src="assets/img/profiles/avatar-15.jpg"
                              alt=""
                            />
                          </Link>
                          <Link
                            to="#"
                            className="text-default"
                          >
                            Mickey
                          </Link>
                        </div>
                        <span className="badge badge-sm text-white bg-blue">
                          <i className="ti ti-progress me-1" />
                          20%
                        </span>
                      </div>
                      <div className="d-flex align-items-center justify-content-between border-top pt-3 mt-3">
                        <span>
                          <i className="ti ti-calendar-due" /> 10 Feb 2024
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
          {/* /Deals Kanban */}
        </div>
      </div>
    </div>
  </div>
  {/* /Page Wrapper */}
</>

      <div
    className="offcanvas offcanvas-end offcanvas-large"
    tabIndex={-1}
    id="offcanvas_add"
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
                      <Link to="" className="label-add " data-bs-toggle="offcanvas" data-bs-target="#offcanvas_pipeline">
										<i className="ti ti-square-rounded-plus"></i>
										Add New
									</Link>
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
  {/* Edit Deals */}
  <div
    className="offcanvas offcanvas-end offcanvas-large"
    tabIndex={-1}
    id="offcanvas_edit"
  >
    <div className="offcanvas-header border-bottom">
      <h5 className="fw-semibold">Edit Deals</h5>
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
                      <Link to="" className="label-add " data-bs-toggle="offcanvas" data-bs-target="#offcanvas_pipeline">
										<i className="ti ti-square-rounded-plus"></i>
										Add New
									</Link>
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
  {/* /Edit Deals */}
  {/* Delete Deal */}
  <div className="modal fade" id="delete_deal" role="dialog">
    <div className="modal-dialog modal-dialog-centered">
      <div className="modal-content">
        <div className="modal-body">
          <div className="text-center">
            <div className="avatar avatar-xl bg-danger-light rounded-circle mb-3">
              <i className="ti ti-trash-x fs-36 text-danger" />
            </div>
            <h4 className="mb-2">Remove Deal?</h4>
            <p className="mb-0">
              Are you sure you want to remove <br /> deal you selected.
            </p>
            <div className="d-flex align-items-center justify-content-center mt-4">
              <Link
                to="#"
                className="btn btn-light me-2"
                data-bs-dismiss="modal"
              >
                Cancel
              </Link>
              <Link to={route.deals} data-bs-dismiss="modal" className="btn btn-danger">
                Yes, Delete it
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  {/* /Delete Deal */}
  {/* Create Deal */}
  <Modal show={openModal} onHide={() => setOpenModal(false)}>
        <div className="modal-header border-0 m-0 justify-content-end">
          <button
            className="btn-close"
            data-bs-dismiss="modal"
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
              <Link to="#" className="btn btn-light" data-bs-dismiss="modal">
                Cancel
              </Link>
              <Link to={route.dealsDetails} className="btn btn-primary">
                View Details
              </Link>
            </div>
          </div>
        </div>
      </Modal>
  {/* /Create Deal */}
  {/* Add New Pipeline */}
  <div
    className="offcanvas offcanvas-end offcanvas-large"
    tabIndex={-1}
    id="offcanvas_pipeline"
  >
    <div className="offcanvas-header border-bottom">
      <h4>Add New Pipeline</h4>
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
          <div className="mb-3">
            <label className="col-form-label">
              Pipeline Name <span className="text-danger">*</span>
            </label>
            <input className="form-control" type="text" />
          </div>
          <div className="mb-3">
            <div className="pipe-title d-flex align-items-center justify-content-between">
              <h5 className="form-title">Pipeline Stages</h5>
              <Link
                to="#"
                className="add-stage"
                data-bs-toggle="modal"
                data-bs-target="#add_stage"
              >
                <i className="ti ti-square-rounded-plus" />
                Add New
              </Link>
            </div>
            <div className="pipeline-listing">
              <div className="pipeline-item">
                <p>
                  <i className="ti ti-grip-vertical" /> Inpipeline
                </p>
                <div className="action-pipeline">
                  <Link
                    to="#"
                    data-bs-toggle="modal"
                    data-bs-target="#edit_stage"
                  >
                    <i className="ti ti-edit text-blue" />
                    Edit
                  </Link>
                  <Link
                    to="#"
                    data-bs-toggle="modal"
                    data-bs-target="#delete_stage"
                  >
                    <i className="ti ti-trash text-danger" />
                    Delete
                  </Link>
                </div>
              </div>
              <div className="pipeline-item">
                <p>
                  <i className="ti ti-grip-vertical" /> Follow Up
                </p>
                <div className="action-pipeline">
                  <Link
                    to="#"
                    data-bs-toggle="modal"
                    data-bs-target="#edit_stage"
                  >
                    <i className="ti ti-edit text-blue" />
                    Edit
                  </Link>
                  <Link
                    to="#"
                    data-bs-toggle="modal"
                    data-bs-target="#delete_stage"
                  >
                    <i className="ti ti-trash text-danger" />
                    Delete
                  </Link>
                </div>
              </div>
              <div className="pipeline-item">
                <p>
                  <i className="ti ti-grip-vertical" /> Schedule Service
                </p>
                <div className="action-pipeline">
                  <Link
                    to="#"
                    data-bs-toggle="modal"
                    data-bs-target="#edit_stage"
                  >
                    <i className="ti ti-edit text-blue" />
                    Edit
                  </Link>
                  <Link
                    to="#"
                    data-bs-toggle="modal"
                    data-bs-target="#delete_stage"
                  >
                    <i className="ti ti-trash text-danger" />
                    Delete
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="mb-3">
            <h5 className="form-title">Access</h5>
            <div className="d-flex flex-wrap access-item nav">
              <div
                className="radio-btn"
                data-bs-toggle="tab"
                data-bs-target="#all"
              >
                <input
                  type="radio"
                  className="status-radio"
                  id="all"
                  name="status"
                  defaultChecked
                />
                <label htmlFor="all">All</label>
              </div>
              <div
                className="radio-btn"
                data-bs-toggle="tab"
                data-bs-target="#select-person"
              >
                <input
                  type="radio"
                  className="status-radio"
                  id="select"
                  name="status"
                />
                <label htmlFor="select">Select Person</label>
              </div>
            </div>
            <div className="tab-content mb-3">
              <div className="tab-pane fade" id="select-person">
                <div className="access-wrapper">
                  <div className="access-view">
                    <div className="access-img">
                      <ImageWithBasePath
                        src="assets/img/profiles/avatar-21.jpg"
                        alt="Image"
                      />
                      Vaughan
                    </div>
                    <Link to="#">Remove</Link>
                  </div>
                  <div className="access-view">
                    <div className="access-img">
                      <ImageWithBasePath
                        src="assets/img/profiles/avatar-01.jpg"
                        alt="Image"
                      />
                      Jessica
                    </div>
                    <Link to="#">Remove</Link>
                  </div>
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
          <button type="button" className="btn btn-primary">
            Create
          </button>
        </div>
      </form>
    </div>
  </div>
  {/* /Add New Pipeline */}
  {/* Delete Stage */}
  <div className="modal fade" id="delete_stage" role="dialog">
    <div className="modal-dialog modal-dialog-centered">
      <div className="modal-content">
        <div className="modal-body">
          <div className="text-center">
            <div className="avatar avatar-xl bg-danger-light rounded-circle mb-3">
              <i className="ti ti-trash-x fs-36 text-danger" />
            </div>
            <h4 className="mb-2">Remove Stage?</h4>
            <p className="mb-0">
              Are you sure you want to remove <br /> stage you selected.
            </p>
            <div className="d-flex align-items-center justify-content-center mt-4">
              <Link
                to="#"
                className="btn btn-light me-2"
                data-bs-dismiss="modal"
              >
                Cancel
              </Link>
              <Link to={route.deals} data-bs-dismiss="modal" className="btn btn-danger">
                Yes, Delete it
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  {/* /Delete Stage */}
  {/* Add New Stage */}
  <div className="modal custom-modal fade" id="add_stage" role="dialog">
    <div className="modal-dialog modal-dialog-centered">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">Add New Stage</h5>
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
              <label className="col-form-label">Stage Name *</label>
              <input type="text" className="form-control" />
            </div>
            <div className="modal-btn text-end">
              <Link to="#" className="btn btn-light" data-bs-dismiss="modal">
                Cancel
              </Link>
              <button type="button"  data-bs-dismiss="modal" className="btn btn-danger">
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
  {/* /Add New Stage */}
  {/* Edit Stage */}
  <div className="modal custom-modal fade" id="edit_stage" role="dialog">
    <div className="modal-dialog modal-dialog-centered">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">Edit Stage</h5>
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
              <label className="col-form-label">Stage Name *</label>
              <input
                type="text"
                className="form-control"
                defaultValue="Inpipeline"
              />
            </div>
            <div className="modal-btn text-end">
              <Link to="#" className="btn btn-light" data-bs-dismiss="modal">
                Cancel
              </Link>
              <button type="button"  data-bs-dismiss="modal" className="btn btn-danger">
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
  {/* /Edit Stage */}
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
          <form >
            <div className="mb-3">
              <label className="col-form-label">View Name</label>
              <input type="text" className="form-control" />
            </div>
            <div className="modal-btn text-end">
              <Link to="#" className="btn btn-light" data-bs-dismiss="modal">
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
  {/* /Add New View */}
    </>
  );
};

export default DealsKanban;
