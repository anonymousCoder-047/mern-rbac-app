import React, { useState } from "react";
import { Link } from "react-router-dom";
import ImageWithBasePath from "../../../core/common/imageWithBasePath";
import CollapseHeader from "../../../core/common/collapse-header";
import DateRangePicker from "react-bootstrap-daterangepicker";
import { initialSettings } from "../../../core/common/selectoption/selectoption";
import Table from "../../../core/common/dataTable/index";
import { estimationListData } from "../../../core/data/json/estimationList";
import { all_routes } from "../../router/all_routes";
import Select from "react-select";
import DefaultEditor from "react-simple-wysiwyg";
import DatePicker from "react-datepicker";
import { TagsInput } from "react-tag-input-component";

const EstimationList = () => {
  const route = all_routes;
  const data = estimationListData;
  const [stars, setStars] = useState<{ [key: number]: boolean }>({});

  const initializeStarsState = () => {
    const starsState: { [key: number]: boolean } = {};
    estimationListData.forEach((item, index) => {
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
  const currency = [
    { value: "Choose", label: "Choose" },
    { value: "Dollar", label: "Dollar" },
    { value: "Euro", label: "Euro" },
    { value: "Pound", label: "Pound" },
    { value: "Rupee", label: "Rupee" },
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
      title: "Estimations ID",
      dataIndex: "estimationsId",
      sorter: (a: any, b: any) =>
        a.estimationsId.length - b.estimationsId.length,
    },
    {
      title: "Client",
      dataIndex: "client",
      render: (text: any, record: any) => (
        <div className="table-avatar d-flex align-items-center table-padding">
          <Link
            to={route.companyDetails}
            className="avatar avatar-sm border me-2"
          >
            <ImageWithBasePath
              src={record.image}
              alt="UserImage"
              className="w-auto h-auto"
            />
          </Link>
          <Link to={route.companyDetails} className="profile-split">
            {record.client}
          </Link>
        </div>
      ),
      sorter: (a: any, b: any) => a.client.length - b.client.length,
    },
    {
      title: "Amount",
      dataIndex: "amount",
      sorter: (a: any, b: any) => a.amount.length - b.amount.length,
    },
    {
      title: "Project",
      dataIndex: "project",
      sorter: (a: any, b: any) => a.project.length - b.project.length,
      render: (text: any, record: any) => (
        <h2 className="table-avatar d-flex align-items-center">
          <Link to="#" className="avatar avatar-sm border me-2">
            <ImageWithBasePath
              className="w-auto h-auto"
              src={record.img1}
              alt="User Image"
            />
          </Link>
          <Link to="#" className="profile-split d-flex flex-column">
            {record.project}
          </Link>
        </h2>
      ),
    },
    {
      title: "Date",
      dataIndex: "date",
      sorter: (a: any, b: any) => a.date.length - b.date.length,
    },
    {
      title: "Expiry Date",
      dataIndex: "expiryDate",
      sorter: (a: any, b: any) => a.expiryDate.length - b.expiryDate.length,
    },
    {
      title: "Estimation By",
      dataIndex: "estimationBy",
      render: (text: string, record: any) => (
        <div className="table-avatar d-flex align-items-center">
          <Link to={route.contactDetails} className="avatar avatar-sm me-2">
            <ImageWithBasePath
              className="w-auto h-auto"
              src={record.img3}
              alt={text}
            />
          </Link>
          <Link
            to={route.contactDetails}
            className="profile-split d-flex flex-column"
          >
            {record.estimationBy} <span>{record.posting}</span>
          </Link>
        </div>
      ),
      sorter: (a: any, b: any) => a.estimationBy.length - b.estimationBy.length,
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (text: string) => (
        <div>
          {text === "Sent" && (
            <span className="badge badge-pill badge-status bg-violet">
              {text}
            </span>
          )}

          {text === "Accepted" && (
            <span className="badge badge-pill badge-status bg-success">
              {text}
            </span>
          )}

          {text === "Draft" && (
            <span className="badge badge-pill badge-status bg-warning">
              {text}
            </span>
          )}
          {text === "Declined" && (
            <span className="badge badge-pill badge-status bg-danger">
              {text}
            </span>
          )}
        </div>
      ),
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
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvas_edit"
            >
              {" "}
              <i className="ti ti-edit text-blue"></i> Edit
            </Link>
            <Link
              className="dropdown-item"
              to="#"
              data-bs-toggle="modal"
              data-bs-target="#delete_estimations"
            >
              <i className="ti ti-trash text-danger" />
              Delete
            </Link>
            <Link className="dropdown-item" to="#">
              <i className="ti ti-clipboard-copy text-violet" /> View Estimation
            </Link>
            <Link className="dropdown-item" to="#">
              <i className="ti ti-checks text-green" /> Mark as Accpeted
            </Link>
            <Link className="dropdown-item" to="#">
              <i className="ti ti-file" /> Mark as Draft
            </Link>
            <Link className="dropdown-item" to="#">
              <i className="ti ti-sticker text-blue" /> Mark as Declined
            </Link>
            <Link className="dropdown-item" to="#">
              <i className="ti ti-printer text-info" /> Print
            </Link>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div>
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
                      Estimations<span className="count-title">123</span>
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
                          placeholder="Search Estimations"
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
                          Add Estimations
                        </Link>
                      </div>
                    </div>
                  </div>
                  {/* /Search */}
                </div>

                <div className="card-body">
                  <>
                    {/* Filter */}
                    <div className="d-flex align-items-center justify-content-between flex-wrap mb-4 row-gap-2">
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
                                  Estimations ID
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
                                  Client
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
                                  Amount
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
                                  Project
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
                                  Date
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
                                  Expiry Date
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
                                  Estimations By
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
                                              <input
                                                type="checkbox"
                                                defaultChecked
                                              />
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
                                              <input
                                                type="checkbox"
                                                defaultChecked
                                              />
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
                                              <input
                                                type="checkbox"
                                                defaultChecked
                                              />
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
                                              <input
                                                type="checkbox"
                                                defaultChecked
                                              />
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
                                       to={route.estimationList}
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
                          <Link  to={route.estimationList} className="active">
                            <i className="ti ti-list-tree" />
                          </Link>
                          <Link  to={route.estimationKanban}>
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
                        options={currency}
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
                        options={currency}
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
      </>
    </div>
  );
};

export default EstimationList;
