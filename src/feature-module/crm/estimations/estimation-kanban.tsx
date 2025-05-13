import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import CollapseHeader from "../../../core/common/collapse-header";
import DateRangePicker from "react-bootstrap-daterangepicker";
import {
  initialSettings,
} from "../../../core/common/selectoption/selectoption";
import ImageWithBasePath from "../../../core/common/imageWithBasePath";
import dragula, { Drake } from "dragula";
import "dragula/dist/dragula.css";
import Select from "react-select";
import { TagsInput } from "react-tag-input-component";
import DatePicker from "react-datepicker";
import DefaultEditor from "react-simple-wysiwyg";
import { all_routes } from "../../router/all_routes";

const EstimationKanban = () => {
  const route = all_routes;
  const container1Ref = useRef<HTMLUListElement>(null);
  const container2Ref = useRef<HTMLUListElement>(null);
  const container3Ref = useRef<HTMLUListElement>(null);
  const container4Ref = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const containers = [
      container1Ref.current as HTMLUListElement,
      container2Ref.current as HTMLUListElement,
      container3Ref.current as HTMLUListElement,
      container4Ref.current as HTMLUListElement,
    ].filter((container) => container !== null);

    const drake: Drake = dragula(containers);
    return () => {
      drake.destroy();
    };
  }, []);

  const [addEstimate, setAddEstimate] = useState(false);
  const [editEstimate, setEditEstimate] = useState(false);

  const [tag1, setTag1] = useState(["tag1", "tag2"]);
  const [tag2, setTag2] = useState(["tag1", "tag2"]);

  const toggleAddEstimate = () => {
    setAddEstimate(!addEstimate);
  };
  const toggleEditEstimate = () => {
    setEditEstimate(!editEstimate);
  };

  const options1 = [
    { value: "novaWave", label: "NovaWave LLC" },
    { value: "blueSky", label: "BlueSky Industries" },
    { value: "silverHawk", label: "ASilver Hawkdams" },
  ];
  const options2 = [
    { value: "choose", label: "Choose" },
    { value: "truelysell", label: "Truelysell" },
    { value: "dreamschat", label: "Dreamschat" },
    { value: "servbook", label: "Servbook" },
  ];
  const options3 = [
    { value: "choose", label: "Choose" },
    { value: "darlee", label: "Darlee Robertson" },
    { value: "sharon", label: "Sharon Roy" },
    { value: "vaughan", label: "Vaughan" },
  ];
  const options4 = [
    { value: "darlee", label: "Darlee Robertson" },
    { value: "sharon", label: "Sharon Roy" },
    { value: "vaughan", label: "Vaughan" },
  ];
  const options5 = [
    { value: "select", label: "Select" },
    { value: "active", label: "Active" },
    { value: "inactive", label: "Inactive" },
  ];
  const option6 = [
    { value: "choose", label: "Choose" },
    { value: "novaWave", label: "NovaWave LLC" },
    { value: "blueSky", label: "BlueSky Industries" },
    { value: "silverHawk", label: "ASilver Hawkdams" },
  ];
  const selectedOption6 = option6.find(
    (option) => option.label === "NovaWave LLC"
  );
  const options7 = [
    { value: "choose", label: "Choose" },
    { value: "truelysell", label: "Truelysell" },
    { value: "dreamschat", label: "Dreamschat" },
    { value: "servbook", label: "Servbook" },
  ];
  const selectedOption7 = options7.find(
    (option) => option.label === "Truelysell"
  );
  const options8 = [
    { value: "choose", label: "Choose" },
    { value: "darlee", label: "Darlee Robertson" },
    { value: "sharon", label: "Sharon Roy" },
    { value: "vaughan", label: "Vaughan" },
  ];
  const selectedOption8 = options8.find(
    (option) => option.label === "Darlee Robertson"
  );
  const options9 = [
    { value: "choose", label: "Choose" },
    { value: "$", label: "$" },
    { value: "sharon", label: "Sharon Roy" },
    { value: "vaughan", label: "Vaughan" },
  ];
  const selectedOption9 = options9.find((option) => option.value === "$");
  const options10 = [
    { value: "select", label: "Select" },
    { value: "sent", label: "Sent" },
    { value: "inactive", label: "Inactive" },
  ];
  const selectedOption10 = options10.find((option) => option.value === "sent");

  const [selectedDate1, setSelectedDate1] = useState<Date | null>(new Date());
  const handleDateChange1 = (date: Date | null) => {
    setSelectedDate1(date);
  };
  const [selectedDate2, setSelectedDate2] = useState<Date | null>(new Date());
  const handleDateChange2 = (date: Date | null) => {
    setSelectedDate2(date);
  };
  const [selectedDate3, setSelectedDate3] = useState<Date | null>(new Date());
  const handleDateChange3 = (date: Date | null) => {
    setSelectedDate3(date);
  };
  const [selectedDate4, setSelectedDate4] = useState<Date | null>(new Date());
  const handleDateChange4 = (date: Date | null) => {
    setSelectedDate4(date);
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
                  Estimations<span className="count-title">123</span>
                </h4>
              </div>
              <div className="col-4 text-end">
                <div className="head-icons">
                  <Link
                     to={route.estimationKanban}
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
                  placeholder="Search Estimations"
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
                  Add Estimations
                </Link>
              </div>
            </div>
          </div>
          {/* /Search */}
          {/* Filter */}
          <div className="d-flex align-items-center justify-content-between flex-wrap mb-4 row-gap-2 border-top pt-4 mt-4">
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
                <input
                  type="text"
                  className="form-control bookingrange"
                  placeholder=""
                />
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
                <div className="filter-dropdown-menu dropdown-menu  dropdown-menu-md-end p-4">
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
                            data-bs-target="#collapse"
                            aria-expanded="true"
                            aria-controls="collapse"
                          >
                            Client
                          </Link>
                        </div>
                        <div
                          className="filter-set-contents accordion-collapse collapse show"
                          id="collapse"
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
                                    <input type="checkbox" />
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
                            data-bs-target="#project"
                            aria-expanded="false"
                            aria-controls="project"
                          >
                            Project
                          </Link>
                        </div>
                        <div
                          className="filter-set-contents accordion-collapse collapse"
                          id="project"
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
                                placeholder="Search Projects"
                              />
                            </div>
                            <ul>
                              <li>
                                <div className="filter-checks">
                                  <label className="checkboxs">
                                    <input type="checkbox" defaultChecked/>
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
                                    Dreamschat
                                  </label>
                                </div>
                              </li>
                              <li>
                                <div className="filter-checks">
                                  <label className="checkboxs">
                                    <input type="checkbox" />
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
                                    Servbook
                                  </label>
                                </div>
                              </li>
                              <li>
                                <div className="filter-checks">
                                  <label className="checkboxs">
                                    <input type="checkbox" />
                                    <span className="checkmarks" />
                                    DreamPOS
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
                            Date of Estimation
                          </Link>
                        </div>
                        <div
                          className="filter-set-contents accordion-collapse collapse"
                          id="collapseone"
                          data-bs-parent="#accordionExample"
                        >
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
                          <div className="filter-content-list">
                            <ul>
                              <li>
                                <div className="filter-checks">
                                  <label className="checkboxs">
                                    <input type="checkbox" defaultChecked/>
                                    <span className="checkmarks" />
                                    15 Oct 2023
                                  </label>
                                </div>
                              </li>
                              <li>
                                <div className="filter-checks">
                                  <label className="checkboxs">
                                    <input type="checkbox" />
                                    <span className="checkmarks" />
                                    19 Oct 2023
                                  </label>
                                </div>
                              </li>
                              <li>
                                <div className="filter-checks">
                                  <label className="checkboxs">
                                    <input type="checkbox" />
                                    <span className="checkmarks" />
                                    24 Oct 2023
                                  </label>
                                </div>
                              </li>
                              <li>
                                <div className="filter-checks">
                                  <label className="checkboxs">
                                    <input type="checkbox" />
                                    <span className="checkmarks" />
                                    10 Nov 2023
                                  </label>
                                </div>
                              </li>
                              <li>
                                <div className="filter-checks">
                                  <label className="checkboxs">
                                    <input type="checkbox" />
                                    <span className="checkmarks" />
                                    18 Nov 2023
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
                            Expiry Date
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
                                    <input type="checkbox" defaultChecked/>
                                    <span className="checkmarks" />
                                    15 Sep 2027
                                  </label>
                                </div>
                              </li>
                              <li>
                                <div className="filter-checks">
                                  <label className="checkboxs">
                                    <input type="checkbox" />
                                    <span className="checkmarks" />
                                    10 Sep 2028
                                  </label>
                                </div>
                              </li>
                              <li>
                                <div className="filter-checks">
                                  <label className="checkboxs">
                                    <input type="checkbox" />
                                    <span className="checkmarks" />
                                    20 Oct 2026
                                  </label>
                                </div>
                              </li>
                              <li>
                                <div className="filter-checks">
                                  <label className="checkboxs">
                                    <input type="checkbox" />
                                    <span className="checkmarks" />
                                    07 Oct 2028
                                  </label>
                                </div>
                              </li>
                              <li>
                                <div className="filter-checks">
                                  <label className="checkboxs">
                                    <input type="checkbox" />
                                    <span className="checkmarks" />
                                    10 Oct 2026
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
                            data-bs-target="#estimate"
                            aria-expanded="false"
                            aria-controls="estimate"
                          >
                            Estimated by
                          </Link>
                        </div>
                        <div
                          className="filter-set-contents accordion-collapse collapse"
                          id="estimate"
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
                                    <input type="checkbox" defaultChecked/>
                                    <span className="checkmarks" />
                                    Darlee Robertson
                                  </label>
                                </div>
                              </li>
                              <li>
                                <div className="filter-checks">
                                  <label className="checkboxs">
                                    <input type="checkbox" />
                                    <span className="checkmarks" />
                                    Darlee Robertson
                                  </label>
                                </div>
                              </li>
                              <li>
                                <div className="filter-checks">
                                  <label className="checkboxs">
                                    <input type="checkbox" />
                                    <span className="checkmarks" />
                                    Vaughan
                                  </label>
                                </div>
                              </li>
                              <li>
                                <div className="filter-checks">
                                  <label className="checkboxs">
                                    <input type="checkbox" />
                                    <span className="checkmarks" />
                                    Jessica
                                  </label>
                                </div>
                              </li>
                              <li>
                                <div className="filter-checks">
                                  <label className="checkboxs">
                                    <input type="checkbox" />
                                    <span className="checkmarks" />
                                    Carol Thomas
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
                            Status
                          </Link>
                        </div>
                        <div
                          className="filter-set-contents accordion-collapse collapse"
                          id="collapseThree"
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
                                placeholder="Search Status"
                              />
                            </div>
                            <ul>
                              <li>
                                <div className="filter-checks">
                                  <label className="checkboxs">
                                    <input type="checkbox" defaultChecked/>
                                    <span className="checkmarks" />
                                    Sent
                                  </label>
                                </div>
                              </li>
                              <li>
                                <div className="filter-checks">
                                  <label className="checkboxs">
                                    <input type="checkbox" />
                                    <span className="checkmarks" />
                                    Accepted
                                  </label>
                                </div>
                              </li>
                              <li>
                                <div className="filter-checks">
                                  <label className="checkboxs">
                                    <input type="checkbox" />
                                    <span className="checkmarks" />
                                    Draft
                                  </label>
                                </div>
                              </li>
                              <li>
                                <div className="filter-checks">
                                  <label className="checkboxs">
                                    <input type="checkbox" />
                                    <span className="checkmarks" />
                                    Accepted
                                  </label>
                                </div>
                              </li>
                              <li>
                                <div className="filter-checks">
                                  <label className="checkboxs">
                                    <input type="checkbox" />
                                    <span className="checkmarks" />
                                    Declined
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
                             to={route.estimationKanban}
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
                <Link  to={route.estimationList}>
                  <i className="ti ti-list-tree" />
                </Link>
                <Link  to={route.estimationKanban} className="active">
                  <i className="ti ti-grid-dots" />
                </Link>
              </div>
            </div>
          </div>
          {/* /Filter */}
          {/* Estimations Kanban */}
          <div className="d-flex overflow-x-auto align-items-start mb-4">
            <div className="kanban-list-items">
              <div className="card">
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-center">
                    <h4 className="fw-semibold d-flex align-items-center mb-1">
                      <i className="ti ti-circle-filled fs-8 text-warning me-2" />
                      Draft
                    </h4>
                    <Link to="#" className="text-purple">
                      <i className="ti ti-plus" />
                    </Link>
                  </div>
                </div>
              </div>
              <div className="bg-warning border border-2" />
              <div className="kanban-drag-wrap pt-4">
                <div>
                  <div className="card kanban-card border">
                    <div className="card-body">
                      <div className="d-flex align-items-center justify-content-between bg-light-200 rounded p-2 mb-3">
                        <div className="d-flex align-items-center">
                          <Link
                            to="#"
                            className="avatar avatar-lg border bg-white flex-shrink-0 me-2"
                          >
                            <ImageWithBasePath
                              src="assets/img/priority/truellysell.svg"
                              className="w-auto h-auto"
                              alt=""
                            />
                          </Link>
                          <div>
                            <h6 className="fw-medium">
                              <Link to="#">Truelysell</Link>
                            </h6>
                            <p>Mobile App</p>
                          </div>
                        </div>
                        <div className="dropdown table-action">
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
                              data-bs-target="#delete_estimations"
                            >
                              <i className="fa-regular fa-trash-can text-danger" />{" "}
                              Delete
                            </Link>
                          </div>
                        </div>
                      </div>
                      <p className="mb-3">
                        TruelySell provides a multiple on-demand service based
                        bootstrap html template.
                      </p>
                      <div className="mb-3 d-flex flex-column">
                        <p className="text-default d-inline-flex align-items-center mb-2">
                          <i className="ti ti-forbid-2 text-dark me-1" />
                          Estimate ID : #EST00020
                        </p>
                        <p className="text-default d-inline-flex align-items-center mb-2">
                          <i className="ti ti-report-money text-dark me-1" />
                          Amount : $01,23,000
                        </p>
                        <p className="text-default d-inline-flex align-items-center mb-2">
                          <i className="ti ti-calendar-exclamation text-dark me-1" />
                          Date : 15 Oct 2023
                        </p>
                        <p className="text-default d-inline-flex align-items-center">
                          <i className="ti ti-calendar-time text-dark me-1" />
                          Expiry Date : 05 Nov 2026
                        </p>
                      </div>
                      <div className="d-flex align-items-center justify-content-between">
                        <div className="d-flex align-items-center">
                          <Link
                            to="#"
                            className="avatar avatar-md rounded flex-shrink-0 me-2"
                          >
                            <ImageWithBasePath
                              src="assets/img/profiles/avatar-22.jpg"
                              alt=""
                            />
                          </Link>
                          <Link to="#">Dawn Mercha</Link>
                        </div>
                        <Link
                          to="#"
                          className="avatar avatar-sm border rounded d-flex align-items-center justify-content-center"
                        >
                          <ImageWithBasePath
                            src="assets/img/icons/company-icon-07.svg"
                            className="w-auto h-auto"
                            alt=""
                          />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="card kanban-card border">
                    <div className="card-body">
                      <div className="d-flex align-items-center justify-content-between bg-light-200 rounded p-2 mb-3">
                        <div className="d-flex align-items-center">
                          <Link
                            to="#"
                            className="avatar avatar-lg border bg-white flex-shrink-0 me-2"
                          >
                            <ImageWithBasePath
                              src="assets/img/priority/project-01.svg"
                              className="w-auto h-auto"
                              alt=""
                            />
                          </Link>
                          <div>
                            <h6 className="fw-medium">
                              <Link to="#">Kofejob</Link>
                            </h6>
                            <p>Meeting</p>
                          </div>
                        </div>
                        <div className="dropdown table-action">
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
                              data-bs-target="#delete_estimations"
                            >
                              <i className="fa-regular fa-trash-can text-danger" />{" "}
                              Delete
                            </Link>
                          </div>
                        </div>
                      </div>
                      <p className="mb-3">
                        TruelySell provides a multiple on-demand service based
                        bootstrap html template.
                      </p>
                      <div className="mb-3 d-flex flex-column">
                        <p className="text-default d-inline-flex align-items-center mb-2">
                          <i className="ti ti-forbid-2 text-dark me-1" />
                          Estimate ID : #EST00020
                        </p>
                        <p className="text-default d-inline-flex align-items-center mb-2">
                          <i className="ti ti-report-money text-dark me-1" />
                          Amount : $01,23,000
                        </p>
                        <p className="text-default d-inline-flex align-items-center mb-2">
                          <i className="ti ti-calendar-exclamation text-dark me-1" />
                          Date : 15 Oct 2023
                        </p>
                        <p className="text-default d-inline-flex align-items-center">
                          <i className="ti ti-calendar-time text-dark me-1" />
                          Expiry Date : 05 Nov 2026
                        </p>
                      </div>
                      <div className="d-flex align-items-center justify-content-between">
                        <div className="d-flex align-items-center">
                          <Link
                            to="#"
                            className="avatar avatar-md rounded flex-shrink-0 me-2"
                          >
                            <ImageWithBasePath
                              src="assets/img/profiles/avatar-21.jpg"
                              alt=""
                            />
                          </Link>
                          <Link to="#">Darlee Robertson</Link>
                        </div>
                        <Link
                          to="#"
                          className="avatar avatar-sm border rounded d-flex align-items-center justify-content-center"
                        >
                          <ImageWithBasePath
                            src="assets/img/icons/company-icon-03.svg"
                            className="w-auto h-auto"
                            alt=""
                          />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="kanban-list-items">
              <div className="card">
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-center">
                    <h4 className="fw-semibold d-flex align-items-center mb-1">
                      <i className="ti ti-circle-filled fs-8 text-purple me-2" />
                      Sent
                    </h4>
                    <Link to="#" className="text-purple">
                      <i className="ti ti-plus" />
                    </Link>
                  </div>
                </div>
              </div>
              <div className="bg-purple border border-2" />
              <div className="kanban-drag-wrap pt-4">
                <div>
                  <div className="card kanban-card border">
                    <div className="card-body">
                      <div className="d-flex align-items-center justify-content-between bg-light-200 rounded p-2 mb-3">
                        <div className="d-flex align-items-center">
                          <Link
                            to="#"
                            className="avatar avatar-lg border bg-white flex-shrink-0 me-2"
                          >
                            <ImageWithBasePath
                              src="assets/img/priority/truellysel.svg"
                              className="w-auto h-auto"
                              alt=""
                            />
                          </Link>
                          <div>
                            <h6 className="fw-medium">
                              <Link to="#">Truelysell</Link>
                            </h6>
                            <p>Web App</p>
                          </div>
                        </div>
                        <div className="dropdown table-action">
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
                              data-bs-target="#delete_estimations"
                            >
                              <i className="fa-regular fa-trash-can text-danger" />{" "}
                              Delete
                            </Link>
                          </div>
                        </div>
                      </div>
                      <p className="mb-3">
                        TruelySell provides a multiple on-demand service based
                        bootstrap html template.
                      </p>
                      <div className="mb-3 d-flex flex-column">
                        <p className="text-default d-inline-flex align-items-center mb-2">
                          <i className="ti ti-forbid-2 text-dark me-1" />
                          Estimate ID : #EST00020
                        </p>
                        <p className="text-default d-inline-flex align-items-center mb-2">
                          <i className="ti ti-report-money text-dark me-1" />
                          Amount : $01,23,000
                        </p>
                        <p className="text-default d-inline-flex align-items-center mb-2">
                          <i className="ti ti-calendar-exclamation text-dark me-1" />
                          Date : 15 Oct 2023
                        </p>
                        <p className="text-default d-inline-flex align-items-center">
                          <i className="ti ti-calendar-time text-dark me-1" />
                          Expiry Date : 05 Nov 2026
                        </p>
                      </div>
                      <div className="d-flex align-items-center justify-content-between">
                        <div className="d-flex align-items-center">
                          <Link
                            to="#"
                            className="avatar avatar-md rounded flex-shrink-0 me-2"
                          >
                            <ImageWithBasePath
                              src="assets/img/profiles/avatar-19.jpg"
                              alt=""
                            />
                          </Link>
                          <Link to="#">Darlee Robertson</Link>
                        </div>
                        <Link
                          to="#"
                          className="avatar avatar-sm border rounded d-flex align-items-center justify-content-center"
                        >
                          <ImageWithBasePath
                            src="assets/img/icons/company-icon-01.svg"
                            className="w-auto h-auto"
                            alt=""
                          />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="card kanban-card border">
                    <div className="card-body">
                      <div className="d-flex align-items-center justify-content-between bg-light-200 rounded p-2 mb-3">
                        <div className="d-flex align-items-center">
                          <Link
                            to="#"
                            className="avatar avatar-lg border bg-white flex-shrink-0 me-2"
                          >
                            <ImageWithBasePath
                              src="assets/img/priority/project-02.svg"
                              className="w-auto h-auto"
                              alt=""
                            />
                          </Link>
                          <div>
                            <h6 className="fw-medium">
                              <Link to="#">Doccure</Link>
                            </h6>
                            <p>Meeting</p>
                          </div>
                        </div>
                        <div className="dropdown table-action">
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
                              data-bs-target="#delete_estimations"
                            >
                              <i className="fa-regular fa-trash-can text-danger" />{" "}
                              Delete
                            </Link>
                          </div>
                        </div>
                      </div>
                      <p className="mb-3">
                        TruelySell provides a multiple on-demand service based
                        bootstrap html template.
                      </p>
                      <div className="mb-3 d-flex flex-column">
                        <p className="text-default d-inline-flex align-items-center mb-2">
                          <i className="ti ti-forbid-2 text-dark me-1" />
                          Estimate ID : #EST00020
                        </p>
                        <p className="text-default d-inline-flex align-items-center mb-2">
                          <i className="ti ti-report-money text-dark me-1" />
                          Amount : $01,23,000
                        </p>
                        <p className="text-default d-inline-flex align-items-center mb-2">
                          <i className="ti ti-calendar-exclamation text-dark me-1" />
                          Date : 15 Oct 2023
                        </p>
                        <p className="text-default d-inline-flex align-items-center">
                          <i className="ti ti-calendar-time text-dark me-1" />
                          Expiry Date : 05 Nov 2026
                        </p>
                      </div>
                      <div className="d-flex align-items-center justify-content-between">
                        <div className="d-flex align-items-center">
                          <Link
                            to="#"
                            className="avatar avatar-md rounded flex-shrink-0 me-2"
                          >
                            <ImageWithBasePath
                              src="assets/img/profiles/avatar-23.jpg"
                              alt=""
                            />
                          </Link>
                          <Link to="#">Rachel Hampton</Link>
                        </div>
                        <Link
                          to="#"
                          className="avatar avatar-sm border rounded d-flex align-items-center justify-content-center"
                        >
                          <ImageWithBasePath
                            src="assets/img/icons/company-icon-08.svg"
                            className="w-auto h-auto"
                            alt=""
                          />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="kanban-list-items">
              <div className="card">
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-center">
                    <h4 className="fw-semibold d-flex align-items-center mb-1">
                      <i className="ti ti-circle-filled fs-8 text-success me-2" />
                      Accepted
                    </h4>
                    <Link to="#" className="text-purple">
                      <i className="ti ti-plus" />
                    </Link>
                  </div>
                </div>
              </div>
              <div className="bg-success border border-2" />
              <div className="kanban-drag-wrap pt-4">
                <div>
                  <div className="card kanban-card border">
                    <div className="card-body">
                      <div className="d-flex align-items-center justify-content-between bg-light-200 rounded p-2 mb-3">
                        <div className="d-flex align-items-center">
                          <Link
                            to="#"
                            className="avatar avatar-lg border bg-white flex-shrink-0 me-2"
                          >
                            <ImageWithBasePath
                              src="assets/img/priority/dreamchat.svg"
                              className="w-auto h-auto"
                              alt=""
                            />
                          </Link>
                          <div>
                            <h6 className="fw-medium">
                              <Link to="#">Dreamschat</Link>
                            </h6>
                            <p>Meeting</p>
                          </div>
                        </div>
                        <div className="dropdown table-action">
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
                              data-bs-target="#delete_estimations"
                            >
                              <i className="fa-regular fa-trash-can text-danger" />{" "}
                              Delete
                            </Link>
                          </div>
                        </div>
                      </div>
                      <p className="mb-3">
                        TruelySell provides a multiple on-demand service based
                        bootstrap html template.
                      </p>
                      <div className="mb-3 d-flex flex-column">
                        <p className="text-default d-inline-flex align-items-center mb-2">
                          <i className="ti ti-forbid-2 text-dark me-1" />
                          Estimate ID : #EST00020
                        </p>
                        <p className="text-default d-inline-flex align-items-center mb-2">
                          <i className="ti ti-report-money text-dark me-1" />
                          Amount : $01,23,000
                        </p>
                        <p className="text-default d-inline-flex align-items-center mb-2">
                          <i className="ti ti-calendar-exclamation text-dark me-1" />
                          Date : 15 Oct 2023
                        </p>
                        <p className="text-default d-inline-flex align-items-center">
                          <i className="ti ti-calendar-time text-dark me-1" />
                          Expiry Date : 05 Nov 2026
                        </p>
                      </div>
                      <div className="d-flex align-items-center justify-content-between">
                        <div className="d-flex align-items-center">
                          <Link
                            to="#"
                            className="avatar avatar-md rounded flex-shrink-0 me-2"
                          >
                            <ImageWithBasePath
                              src="assets/img/profiles/avatar-20.jpg"
                              alt=""
                            />
                          </Link>
                          <Link to="#">Sharon Roy</Link>
                        </div>
                        <Link
                          to="#"
                          className="avatar avatar-sm border rounded d-flex align-items-center justify-content-center"
                        >
                          <ImageWithBasePath
                            src="assets/img/icons/company-icon-02.svg"
                            className="w-auto h-auto"
                            alt=""
                          />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="card kanban-card border">
                    <div className="card-body">
                      <div className="d-flex align-items-center justify-content-between bg-light-200 rounded p-2 mb-3">
                        <div className="d-flex align-items-center">
                          <Link
                            to="#"
                            className="avatar avatar-lg border bg-white flex-shrink-0 me-2"
                          >
                            <ImageWithBasePath
                              src="assets/img/priority/servbook.svg"
                              className="w-auto h-auto"
                              alt=""
                            />
                          </Link>
                          <div>
                            <h6 className="fw-medium">
                              <Link to="#">servbook</Link>
                            </h6>
                            <p>Meeting</p>
                          </div>
                        </div>
                        <div className="dropdown table-action">
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
                              data-bs-target="#delete_estimations"
                            >
                              <i className="fa-regular fa-trash-can text-danger" />{" "}
                              Delete
                            </Link>
                          </div>
                        </div>
                      </div>
                      <p className="mb-3">
                        TruelySell provides a multiple on-demand service based
                        bootstrap html template.
                      </p>
                      <div className="mb-3 d-flex flex-column">
                        <p className="text-default d-inline-flex align-items-center mb-2">
                          <i className="ti ti-forbid-2 text-dark me-1" />
                          Estimate ID : #EST00020
                        </p>
                        <p className="text-default d-inline-flex align-items-center mb-2">
                          <i className="ti ti-report-money text-dark me-1" />
                          Amount : $01,23,000
                        </p>
                        <p className="text-default d-inline-flex align-items-center mb-2">
                          <i className="ti ti-calendar-exclamation text-dark me-1" />
                          Date : 15 Oct 2023
                        </p>
                        <p className="text-default d-inline-flex align-items-center">
                          <i className="ti ti-calendar-time text-dark me-1" />
                          Expiry Date : 05 Nov 2026
                        </p>
                      </div>
                      <div className="d-flex align-items-center justify-content-between">
                        <div className="d-flex align-items-center">
                          <Link
                            to="#"
                            className="avatar avatar-md rounded flex-shrink-0 me-2"
                          >
                            <ImageWithBasePath
                              src="assets/img/profiles/avatar-01.jpg"
                              alt=""
                            />
                          </Link>
                          <Link to="#">Jessica</Link>
                        </div>
                        <Link
                          to="#"
                          className="avatar avatar-sm border rounded d-flex align-items-center justify-content-center"
                        >
                          <ImageWithBasePath
                            src="assets/img/icons/company-icon-04.svg"
                            className="w-auto h-auto"
                            alt=""
                          />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="kanban-list-items">
              <div className="card">
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-center">
                    <h4 className="fw-semibold d-flex align-items-center mb-1">
                      <i className="ti ti-circle-filled fs-8 text-danger me-2" />
                      Declined
                    </h4>
                    <Link to="#" className="text-purple">
                      <i className="ti ti-plus" />
                    </Link>
                  </div>
                </div>
              </div>
              <div className="bg-danger border border-2" />
              <div className="kanban-drag-wrap pt-4">
                <div>
                  <div className="card kanban-card border">
                    <div className="card-body">
                      <div className="d-flex align-items-center justify-content-between bg-light-200 rounded p-2 mb-3">
                        <div className="d-flex align-items-center">
                          <Link
                            to="#"
                            className="avatar avatar-lg border bg-white flex-shrink-0 me-2"
                          >
                            <ImageWithBasePath
                              src="assets/img/priority/dream-pos.svg"
                              className="w-auto h-auto"
                              alt=""
                            />
                          </Link>
                          <div>
                            <h6 className="fw-medium">
                              <Link to="#">DreamPOS</Link>
                            </h6>
                            <p>Web App</p>
                          </div>
                        </div>
                        <div className="dropdown table-action">
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
                              data-bs-target="#delete_estimations"
                            >
                              <i className="fa-regular fa-trash-can text-danger" />{" "}
                              Delete
                            </Link>
                          </div>
                        </div>
                      </div>
                      <p className="mb-3">
                        TruelySell provides a multiple on-demand service based
                        bootstrap html template.
                      </p>
                      <div className="mb-3 d-flex flex-column">
                        <p className="text-default d-inline-flex align-items-center mb-2">
                          <i className="ti ti-forbid-2 text-dark me-1" />
                          Estimate ID : #EST00020
                        </p>
                        <p className="text-default d-inline-flex align-items-center mb-2">
                          <i className="ti ti-report-money text-dark me-1" />
                          Amount : $01,23,000
                        </p>
                        <p className="text-default d-inline-flex align-items-center mb-2">
                          <i className="ti ti-calendar-exclamation text-dark me-1" />
                          Date : 15 Oct 2023
                        </p>
                        <p className="text-default d-inline-flex align-items-center">
                          <i className="ti ti-calendar-time text-dark me-1" />
                          Expiry Date : 05 Nov 2026
                        </p>
                      </div>
                      <div className="d-flex align-items-center justify-content-between">
                        <div className="d-flex align-items-center">
                          <Link
                            to="#"
                            className="avatar avatar-md rounded flex-shrink-0 me-2"
                          >
                            <ImageWithBasePath
                              src="assets/img/profiles/avatar-16.jpg"
                              alt=""
                            />
                          </Link>
                          <Link to="#">Carol Thomas</Link>
                        </div>
                        <Link
                          to="#"
                          className="avatar avatar-sm border rounded d-flex align-items-center justify-content-center"
                        >
                          <ImageWithBasePath
                            src="assets/img/icons/company-icon-05.svg"
                            className="w-auto h-auto"
                            alt=""
                          />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="card kanban-card border">
                    <div className="card-body">
                      <div className="d-flex align-items-center justify-content-between bg-light-200 rounded p-2 mb-3">
                        <div className="d-flex align-items-center">
                          <Link
                            to="#"
                            className="avatar avatar-lg border bg-white flex-shrink-0 me-2"
                          >
                            <ImageWithBasePath
                              src="assets/img/priority/dream-pos.svg"
                              className="w-auto h-auto"
                              alt=""
                            />
                          </Link>
                          <div>
                            <h6 className="fw-medium">
                              <Link to="#">Dreamsports</Link>
                            </h6>
                            <p>Meeting</p>
                          </div>
                        </div>
                        <div className="dropdown table-action">
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
                              data-bs-target="#delete_estimations"
                            >
                              <i className="fa-regular fa-trash-can text-danger" />{" "}
                              Delete
                            </Link>
                          </div>
                        </div>
                      </div>
                      <p className="mb-3">
                        TruelySell provides a multiple on-demand service based
                        bootstrap html template.
                      </p>
                      <div className="mb-3 d-flex flex-column">
                        <p className="text-default d-inline-flex align-items-center mb-2">
                          <i className="ti ti-forbid-2 text-dark me-1" />
                          Estimate ID : #EST00020
                        </p>
                        <p className="text-default d-inline-flex align-items-center mb-2">
                          <i className="ti ti-report-money text-dark me-1" />
                          Amount : $01,23,000
                        </p>
                        <p className="text-default d-inline-flex align-items-center mb-2">
                          <i className="ti ti-calendar-exclamation text-dark me-1" />
                          Date : 15 Oct 2023
                        </p>
                        <p className="text-default d-inline-flex align-items-center">
                          <i className="ti ti-calendar-time text-dark me-1" />
                          Expiry Date : 05 Nov 2026
                        </p>
                      </div>
                      <div className="d-flex align-items-center justify-content-between">
                        <div className="d-flex align-items-center">
                          <Link
                            to="#"
                            className="avatar avatar-md rounded flex-shrink-0 me-2"
                          >
                            <ImageWithBasePath
                              src="assets/img/profiles/avatar-25.jpg"
                              alt=""
                            />
                          </Link>
                          <Link to="#">Jonathan</Link>
                        </div>
                        <Link
                          to="#"
                          className="avatar avatar-sm border rounded d-flex align-items-center justify-content-center"
                        >
                          <ImageWithBasePath
                            src="assets/img/icons/company-icon-10.svg"
                            className="w-auto h-auto"
                            alt=""
                          />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* /Estimations Kanban */}
        </div>
      </div>
    </div>
  </div>
  {/* /Page Wrapper */}
</>
{/* Add New Estimation */}
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
                  <div className="mb-3">
                    <div className="d-flex align-items-center justify-content-between">
                      <label className="col-form-label">Client</label>
                      <Link
                        to="#"
                        className="label-add"
                        data-bs-toggle="modal"
                        data-bs-target="#add_client"
                      >
                        <i className="ti ti-square-rounded-plus" />
                        Add New
                      </Link>
                    </div>
                    <Select
                      className="select"
                      options={options1}
                      placeholder="Choose"
                    />
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="col-form-label">
                        Bill To<span className="text-danger"> *</span>
                      </label>
                      <input className="form-control" type="text" />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="col-form-label">
                        Ship To<span className="text-danger"> *</span>
                      </label>
                      <input className="form-control" type="text" />
                    </div>
                  </div>
                  <div className="mb-3">
                    <div className="d-flex align-items-center justify-content-between">
                      <label className="col-form-label">Project</label>
                      <Link
                        to="#"
                        className="label-add"
                        data-bs-toggle="modal"
                        data-bs-target="#save_view"
                      >
                        <i className="ti ti-square-rounded-plus" />
                        Add New
                      </Link>
                    </div>
                    <Select
                      className="select"
                      options={options2}
                      placeholder="Choose"
                    />
                  </div>
                  <div className="col-md-12">
                    <div className="mb-3">
                      <label className="col-form-label">
                        Estimate By <span className="text-danger">*</span>
                      </label>
                      <Select
                        className="select2"
                        options={options3}
                        placeholder="Choose"
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="col-form-label">
                        Amount<span className="text-danger"> *</span>
                      </label>
                      <input className="form-control" type="text" />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="col-form-label">Currency</label>
                      <Select
                        className="select2"
                        options={options4}
                        placeholder="Choose"
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="col-form-label">
                        Estimate Date <span className="text-danger">*</span>
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
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="col-form-label">
                        Expiry Date<span className="text-danger">*</span>
                      </label>
                      <div className="icon-form">
                        <span className="form-icon">
                          <i className="ti ti-calendar-check" />
                        </span>
                        <DatePicker
                          className="form-control datetimepicker"
                          selected={selectedDate2}
                          onChange={handleDateChange2}
                          dateFormat="dd-MM-yyyy"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="col-form-label">Status</label>
                      <Select
                        className="select"
                        options={options5}
                        placeholder="Select"
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="col-form-label">
                        Tags <span className="text-danger">*</span>
                      </label>
                      <TagsInput value={tag1} onChange={setTag1} />
                    </div>
                  </div>
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
        {/* /Add New Estimation */}
        {/* Edit Estimation */}
        <div
          className="offcanvas offcanvas-end offcanvas-large"
          tabIndex={-1}
          id="offcanvas_edit"
        >
          <div className="offcanvas-header border-bottom">
            <h4>Edit Estimation</h4>
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
              <div className="row">
                <div className="mb-3">
                  <div className="d-flex align-items-center justify-content-between">
                    <label className="col-form-label">Client</label>
                    <Link
                      to="#"
                      className="label-add"
                      data-bs-toggle="modal"
                      data-bs-target="#add_client"
                    >
                      <i className="ti ti-square-rounded-plus" />
                      Add New
                    </Link>
                  </div>
                  <Select
                    className="select"
                    options={options1}
                    placeholder="Choose"
                  />
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="col-form-label">
                      Bill To<span className="text-danger"> *</span>
                    </label>
                    <input className="form-control" type="text" />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="col-form-label">
                      Ship To<span className="text-danger"> *</span>
                    </label>
                    <input className="form-control" type="text" />
                  </div>
                </div>
                <div className="mb-3">
                  <div className="d-flex align-items-center justify-content-between">
                    <label className="col-form-label">Project</label>
                    <Link
                      to="#"
                      className="label-add"
                      data-bs-toggle="modal"
                      data-bs-target="#save_view"
                    >
                      <i className="ti ti-square-rounded-plus" />
                      Add New
                    </Link>
                  </div>
                  <Select
                    className="select"
                    options={options2}
                    placeholder="Choose"
                  />
                  
                </div>
                <div className="col-md-12">
                    <div className="mb-3">
                      <label className="col-form-label">
                        Estimate By <span className="text-danger">*</span>
                      </label>
                      <Select
                        className="select2"
                        options={options3}
                        placeholder="Choose"
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="col-form-label">
                        Amount<span className="text-danger"> *</span>
                      </label>
                      <input
                        className="form-control"
                        type="text"
                        defaultValue="2,15,000"
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="col-form-label">Currency</label>
                      <Select
                        className="select2"
                        options={options4}
                        placeholder="Choose"
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="col-form-label">
                        Estimate Date <span className="text-danger">*</span>
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
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="col-form-label">
                        Expiry Date<span className="text-danger">*</span>
                      </label>
                      <div className="icon-form">
                        <span className="form-icon">
                          <i className="ti ti-calendar-check" />
                        </span>
                        <DatePicker
                          className="form-control datetimepicker"
                          selected={selectedDate2}
                          onChange={handleDateChange2}
                          dateFormat="dd-MM-yyyy"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="col-form-label">Status</label>
                      <Select
                        className="select"
                        options={options5}
                        placeholder="Select"
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="col-form-label">
                        Tags <span className="text-danger">*</span>
                      </label>
                      <TagsInput value={tag1} onChange={setTag1} />
                    </div>
                  </div>
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
                  <div className="col-md-12">
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
                <button type="button" className="btn btn-primary">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
        {/* /Edit Estimation */}
        {/* Delete Estimations */}
        <div className="modal fade" id="delete_estimations" role="dialog">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-body">
                <div className="text-center">
                  <div className="avatar avatar-xl bg-danger-light rounded-circle mb-3">
                    <i className="ti ti-trash-x fs-36 text-danger" />
                  </div>
                  <h4 className="mb-2">Remove Estimation?</h4>
                  <p className="mb-0">
                    Are you sure you want to remove <br /> estimation you
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
                    <Link  to={route.estimationList} className="btn btn-danger">
                      Yes, Delete it
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* /Delete Estimations */}
        {/* Create Estimation */}
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
                  <h3>Estimations Created Successfully!!!</h3>
                  <p>View the details of estimations, created</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* /Create Project */}
        {/* Add New View */}
        <div className="modal custom-modal fade" id="save_view" role="dialog">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add Project</h5>
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
                    <label className="col-form-label">Project Name</label>
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
        <div className="modal custom-modal fade" id="add_client" role="dialog">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add Client</h5>
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
                    <label className="col-form-label">Client Name</label>
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

export default EstimationKanban;
