import React from 'react'
import { Link } from 'react-router-dom'
import { all_routes } from '../../router/all_routes'
import ImageWithBasePath from '../../../core/common/imageWithBasePath'
import { package_list } from '../../../core/data/json/packagelist';
import DatePicker from "react-datepicker";
import Table from "../../../core/common/dataTable/index";
import CollapseHeader from '../../../core/common/collapse-header';
import DateRangePicker from 'react-bootstrap-daterangepicker';
import { initialSettings } from '../../../core/common/selectoption/selectoption';
import Select from "react-select";

const Packages = () => {
  const data = package_list;
  const columns = [
    {
      title: "Plan Name",
      dataIndex: "Plan_Name",
      render: (text: String, record: any) => (
        <h6 className="fw-medium">
          <Link to="#">{text}</Link>
        </h6>
      ),
      sorter: (a: any, b: any) => a.CompanyName.length - b.CompanyName.length,
    },
    {
      title: "Plan Type",
      dataIndex: "Plan_Type",
      sorter: (a: any, b: any) => a.Plan_Type.length - b.Plan_Type.length,
    },
    {
      title: "Total Subscribers",
      dataIndex: "Total_Subscribers",
      sorter: (a: any, b: any) => a.Total_Subscribers.length - b.Total_Subscribers.length,
    },
    {
      title: "Price",
      dataIndex: "Price",
      sorter: (a: any, b: any) => a.Price.length - b.Price.length,
    },
    {
      title: "Created Date",
      dataIndex: "Created_Date",
      sorter: (a: any, b: any) => a.Created_Date.length - b.Created_Date.length,
    },
    {
      title: "Status",
      dataIndex: "Status",
      render: (text: string, record: any) => (
        <span className={`badge ${text === 'Active' ? 'badge-success' : 'badge-danger'} d-inline-flex align-items-center badge-xs`}>
          <i className="ti ti-point-filled me-1" />
          {text}
        </span>

      ),
      sorter: (a: any, b: any) => a.Status.length - b.Status.length,
    },
    {
      title: "Action",
      dataIndex: "actions",
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
              <i className="ti ti-edit text-blue" />
              Edit
            </Link>
            <Link
              className="dropdown-item"
              to="#"
              data-bs-toggle="modal"
              data-bs-target="#delete_invoices"
            >
              <i className="ti ti-trash text-danger" />
              Delete
            </Link>
          </div>
        </div>
      ),
    },
  ]

  const planName = [
    { value: "Advanced", label: "Advanced" },
    { value: "Basic", label: "Basic" },
    { value: "Enterprise", label: "Enterprise" },
  ];
  const planType = [
    { value: "Monthly", label: "Monthly" },
    { value: "Yearly", label: "Yearly" },
  ];
  const currency = [
    { value: "USD", label: "USD" },
    { value: "Euro", label: "Euro" },
  ];
  const planPosition = [
    { value: "1", label: "1" },
    { value: "2", label: "2" },
    { value: "3", label: "3" },
  ];
  const plancurrency = [
    { value: "USD", label: "USD" },
    { value: "Euro", label: "Euro" },
  ];
  const discountType = [
    { value: "Fixed", label: "Fixed" },
    { value: "Percentage", label: "Percentage" },
  ];
  const status = [
    { value: "Active", label: "Active" },
    { value: "Inactive", label: "Inactive" },
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
                    <div className="col-8">
                      <h4 className="page-title">Packages</h4>
                    </div>
                    <div className="col-4 text-end">
                      <div className="head-icons">
                        <CollapseHeader />
                      </div>
                    </div>
                  </div>
                </div>
                {/* /Page Header */}
                <div className="row">
                  {/* Total Plans */}
                  <div className="col-lg-3 col-md-6 d-flex">
                    <div className="card flex-fill">
                      <div className="card-body d-flex align-items-center justify-content-between">
                        <div className="d-flex align-items-center overflow-hidden">
                          <div>
                            <p className="fs-12 fw-medium mb-1 text-truncate">
                              Total Plans
                            </p>
                            <h4>08</h4>
                          </div>
                        </div>
                        <div>
                          <span className="avatar avatar-lg bg-primary flex-shrink-0">
                            <i className="ti ti-box fs-16" />
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* /Total Plans */}
                  {/* Total Plans */}
                  <div className="col-lg-3 col-md-6 d-flex">
                    <div className="card flex-fill">
                      <div className="card-body d-flex align-items-center justify-content-between">
                        <div className="d-flex align-items-center overflow-hidden">
                          <div>
                            <p className="fs-12 fw-medium mb-1 text-truncate">
                              Active Plans
                            </p>
                            <h4>08</h4>
                          </div>
                        </div>
                        <div>
                          <span className="avatar avatar-lg bg-success flex-shrink-0">
                            <i className="ti ti-activity-heartbeat fs-16" />
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* /Total Plans */}
                  {/* Inactive Plans */}
                  <div className="col-lg-3 col-md-6 d-flex">
                    <div className="card flex-fill">
                      <div className="card-body d-flex align-items-center justify-content-between">
                        <div className="d-flex align-items-center overflow-hidden">
                          <div>
                            <p className="fs-12 fw-medium mb-1 text-truncate">
                              Inactive Plans
                            </p>
                            <h4>0</h4>
                          </div>
                        </div>
                        <div>
                          <span className="avatar avatar-lg bg-danger flex-shrink-0">
                            <i className="ti ti-player-pause fs-16" />
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* /Inactive Companies */}
                  {/* No of Plans  */}
                  <div className="col-lg-3 col-md-6 d-flex">
                    <div className="card flex-fill">
                      <div className="card-body d-flex align-items-center justify-content-between">
                        <div className="d-flex align-items-center overflow-hidden">
                          <div>
                            <p className="fs-12 fw-medium mb-1 text-truncate">
                              No of Plan Types
                            </p>
                            <h4>02</h4>
                          </div>
                        </div>
                        <div>
                          <span className="avatar avatar-lg bg-skyblue flex-shrink-0">
                            <i className="ti ti-mask fs-16" />
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* /No of Plans */}
                </div>
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
                            placeholder="Search User"
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
                            Add New Plan
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
                              Please drag and drop your column to reorder your table
                              and enable see option as you want.
                            </p>
                            <div className="border-top pt-3">
                              <div className="d-flex align-items-center justify-content-between mb-3">
                                <p className="mb-0 d-flex align-items-center">
                                  <i className="ti ti-grip-vertical me-2" />
                                  Plan Name
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
                                  Plan Type
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
                                  Total Subscribers
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
                                  Price
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
                                  Created Date
                                </p>
                                <div className="status-toggle">
                                  <input
                                    type="checkbox"
                                    id="col-date"
                                    className="check"
                                  />
                                  <label htmlFor="col-date" className="checktoggle" />
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
                                    id="col-activity"
                                    className="check"
                                  />
                                  <label
                                    htmlFor="col-activity"
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
                                      className="collapsed"
                                      data-bs-toggle="collapse"
                                      data-bs-target="#location"
                                      aria-expanded="false"
                                      aria-controls="location"
                                    >
                                      Select Plan
                                    </Link>
                                  </div>
                                  <div
                                    className="filter-set-contents accordion-collapse collapse"
                                    id="location"
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
                                              Monthly
                                            </label>
                                          </div>
                                        </li>
                                        <li>
                                          <div className="filter-checks">
                                            <label className="checkboxs">
                                              <input
                                                type="checkbox"
                                                defaultChecked
                                              />
                                              <span className="checkmarks" />
                                              Yearly
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
                                              <input
                                                type="checkbox"
                                                defaultChecked
                                              />
                                              <span className="checkmarks" />
                                              Inactive
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
                                      to={all_routes.superadminPackagelist}
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
                          <Link to={all_routes.superadminPackagelist}className="active">
                            <i className="ti ti-list-tree" />
                          </Link>
                          <Link to={all_routes.superadminPackageGrid}>
                            <i className="ti ti-grid-dots" />
                          </Link>
                        </div>
                      </div>
                    </div>
                    {/* /Filter */}
                    {/* Manage Users List */}
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
                    {/* /Manage Users List */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* /Page Wrapper */}
      </>
      <>
        {/* Add Plan */}
        <div
          className="offcanvas offcanvas-end offcanvas-large"
          tabIndex={-1}
          id="offcanvas_add"
        >
          <div className="offcanvas-header border-bottom">
            <h5 className="fw-semibold">Add New Plan</h5>
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
              <div className="card">
                <div className="card-body">
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
                    <div className="col-md-6">
                      <div className="mb-3 ">
                        <label className="form-label">
                          Plan Name<span className="text-danger"> *</span>
                        </label>
                        <Select
                          options={planName}
                          className="select2"
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3 ">
                        <label className="form-label">
                          Plan Type<span className="text-danger"> *</span>
                        </label>
                        <Select
                          options={planType}
                          className="select2"
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3 ">
                        <label className="form-label">
                          Plan Position<span className="text-danger"> *</span>
                        </label>
                        <Select
                          options={planPosition}
                          className="select2"
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3 ">
                        <label className="form-label">
                          Plan Currency<span className="text-danger"> *</span>
                        </label>
                        <Select
                          options={plancurrency}
                          className="select2"
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <div className="d-flex justify-content-between">
                          <label className="form-label">
                            Plan Currency<span className="text-danger"> *</span>
                          </label>
                          <span className="text-primary">
                            <i className="fa-solid fa-circle-exclamation me-2" />
                            Set 0 for free
                          </span>
                        </div>
                        <Select
                          options={discountType}
                          className="select2"
                        />
                      </div>
                    </div>
                    <div className="col-md-3">
                      <div className="mb-3 ">
                        <label className="form-label">
                          Discount Type<span className="text-danger"> *</span>
                        </label>
                        <div className="pass-group">
                          <Select
                            options={discountType}
                            className="select2"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-md-3">
                      <div className="mb-3 ">
                        <label className="form-label">
                          Discount<span className="text-danger"> *</span>
                        </label>
                        <div className="pass-group">
                          <input type="text" className="form-control" />
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-3">
                      <div className="mb-3">
                        <label className="form-label">Limitations Invoices</label>
                        <input type="text" className="form-control" />
                      </div>
                    </div>
                    <div className="col-lg-3">
                      <div className="mb-3">
                        <label className="form-label">Max Customers</label>
                        <input type="text" className="form-control" />
                      </div>
                    </div>
                    <div className="col-lg-3">
                      <div className="mb-3">
                        <label className="form-label">Product</label>
                        <input type="text" className="form-control" />
                      </div>
                    </div>
                    <div className="col-lg-3">
                      <div className="mb-3">
                        <label className="form-label">Supplier</label>
                        <input type="text" className="form-control" />
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <div className="d-flex align-items-center justify-content-between mb-3">
                        <h6>Plan Modules</h6>
                        <div className="form-check d-flex align-items-center">
                          <label className="form-check-label mt-0 text-dark fw-medium">
                            <input className="form-check-input" type="checkbox" />
                            Select All
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-lg-3 col-sm-6">
                        <div className="form-check d-flex align-items-center mb-3">
                          <label className="form-check-label mt-0 text-dark fw-medium">
                            <input className="form-check-input" type="checkbox" />
                            Contacts
                          </label>
                        </div>
                      </div>
                      <div className="col-lg-3 col-sm-6">
                        <div className="form-check d-flex align-items-center mb-3">
                          <label className="form-check-label mt-0 text-dark fw-medium">
                            <input className="form-check-input" type="checkbox" />
                            Companies
                          </label>
                        </div>
                      </div>
                      <div className="col-lg-3 col-sm-6">
                        <div className="form-check d-flex align-items-center mb-3">
                          <label className="form-check-label mt-0 text-dark fw-medium">
                            <input className="form-check-input" type="checkbox" />
                            Deals
                          </label>
                        </div>
                      </div>
                      <div className="col-lg-3 col-sm-6">
                        <div className="form-check d-flex align-items-center mb-3">
                          <label className="form-check-label mt-0 text-dark fw-medium">
                            <input className="form-check-input" type="checkbox" />
                            Leads
                          </label>
                        </div>
                      </div>
                      <div className="col-lg-3 col-sm-6">
                        <div className="form-check d-flex align-items-center mb-3">
                          <label className="form-check-label mt-0 text-dark fw-medium">
                            <input className="form-check-input" type="checkbox" />
                            Pipelines
                          </label>
                        </div>
                      </div>
                      <div className="col-lg-3 col-sm-6">
                        <div className="form-check d-flex align-items-center mb-3">
                          <label className="form-check-label mt-0 text-dark fw-medium">
                            <input className="form-check-input" type="checkbox" />
                            Projects
                          </label>
                        </div>
                      </div>
                      <div className="col-lg-3 col-sm-6">
                        <div className="form-check d-flex align-items-center mb-3">
                          <label className="form-check-label mt-0 text-dark fw-medium">
                            <input className="form-check-input" type="checkbox" />
                            Tasks
                          </label>
                        </div>
                      </div>
                      <div className="col-lg-3 col-sm-6">
                        <div className="form-check d-flex align-items-center mb-3">
                          <label className="form-check-label mt-0 text-dark fw-medium">
                            <input className="form-check-input" type="checkbox" />
                            Campaigns
                          </label>
                        </div>
                      </div>
                      <div className="col-lg-3 col-sm-6">
                        <div className="form-check d-flex align-items-center mb-3">
                          <label className="form-check-label mt-0 text-dark fw-medium">
                            <input className="form-check-input" type="checkbox" />
                            Contracts
                          </label>
                        </div>
                      </div>
                      <div className="col-lg-3 col-sm-6">
                        <div className="form-check d-flex align-items-center mb-3">
                          <label className="form-check-label mt-0 text-dark fw-medium">
                            <input className="form-check-input" type="checkbox" />
                            Estimations
                          </label>
                        </div>
                      </div>
                      <div className="col-lg-3 col-sm-6">
                        <div className="form-check d-flex align-items-center mb-3">
                          <label className="form-check-label mt-0 text-dark fw-medium">
                            <input className="form-check-input" type="checkbox" />
                            Proposals
                          </label>
                        </div>
                      </div>
                      <div className="col-lg-3 col-sm-6">
                        <div className="form-check d-flex align-items-center mb-3">
                          <label className="form-check-label mt-0 text-dark fw-medium">
                            <input className="form-check-input" type="checkbox" />
                            Invoices
                          </label>
                        </div>
                      </div>
                      <div className="col-lg-3 col-sm-6">
                        <div className="form-check d-flex align-items-center mb-3">
                          <label className="form-check-label mt-0 text-dark fw-medium">
                            <input className="form-check-input" type="checkbox" />
                            Payments
                          </label>
                        </div>
                      </div>
                      <div className="col-lg-3 col-sm-6">
                        <div className="form-check d-flex align-items-center mb-3">
                          <label className="form-check-label mt-0 text-dark fw-medium">
                            <input className="form-check-input" type="checkbox" />
                            Activities
                          </label>
                        </div>
                      </div>
                      <div className="col-lg-3 col-sm-6">
                        <div className="form-check d-flex align-items-center mb-3">
                          <label className="form-check-label mt-0 text-dark fw-medium">
                            <input className="form-check-input" type="checkbox" />
                            Analytics
                          </label>
                        </div>
                      </div>
                      <div className="col-lg-3 col-sm-6">
                        <div className="form-check d-flex align-items-center mb-3">
                          <label className="form-check-label mt-0 text-dark fw-medium">
                            <input className="form-check-input" type="checkbox" />
                            Reports
                          </label>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="d-flex align-items-center mb-3">
                          <label className="form-check-label mt-0 me-2 text-dark fw-medium">
                            Access Trial
                          </label>
                          <div className="form-check form-switch me-2">
                            <input
                              className="form-check-input me-2"
                              type="checkbox"
                              role="switch"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row align-items-center gx-3">
                      <div className="col-md-4">
                        <div className="d-flex align-items-center mb-3">
                          <div className="flex-fill">
                            <label className="form-label">Trial Days</label>
                            <input type="text" className="form-control" />
                          </div>
                        </div>
                      </div>
                      <div className="col-md-3">
                        <div className="d-block align-items-center ms-3">
                          <label className="form-check-label mt-0 me-2 text-dark">
                            Is Recommended
                          </label>
                          <div className="form-check form-switch me-2">
                            <input
                              className="form-check-input me-2"
                              type="checkbox"
                              role="switch"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-md-5">
                        <div className="mb-3 ">
                          <label className="form-label">
                            Status<span className="text-danger"> *</span>
                          </label>
                          <Select
                            options={status}
                            className="select2"
                          />
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
                <button type="button" data-bs-dismiss="offcanvas" className="btn btn-primary">
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
        {/* /Add Plan */}
        {/* Edit Plan */}
        <div
          className="offcanvas offcanvas-end offcanvas-large"
          tabIndex={-1}
          id="offcanvas_edit"
        >
          <div className="offcanvas-header border-bottom">
            <h5 className="fw-semibold">Edit Plan</h5>
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
              <div className="card">
                <div className="card-body">
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
                    <div className="col-md-6">
                      <div className="mb-3 ">
                        <label className="form-label">
                          Plan Name<span className="text-danger"> *</span>
                        </label>
                        <Select
                          options={planName}
                          className="select2"
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3 ">
                        <label className="form-label">
                          Plan Type<span className="text-danger"> *</span>
                        </label>
                        <Select
                          options={planType}
                          className="select2"
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3 ">
                        <label className="form-label">
                          Plan Position<span className="text-danger"> *</span>
                        </label>
                        <Select
                          options={planPosition}
                          className="select2"
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3 ">
                        <label className="form-label">
                          Plan Currency<span className="text-danger"> *</span>
                        </label>
                        <Select
                          options={plancurrency}
                          className="select2"
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <div className="d-flex justify-content-between">
                          <label className="form-label">
                            Plan Currency<span className="text-danger"> *</span>
                          </label>
                          <span className="text-primary">
                            <i className="fa-solid fa-circle-exclamation me-2" />
                            Set 0 for free
                          </span>
                        </div>
                        <Select
                          options={discountType}
                          className="select2"
                        />
                      </div>
                    </div>
                    <div className="col-md-3">
                      <div className="mb-3 ">
                        <label className="form-label">
                          Discount Type<span className="text-danger"> *</span>
                        </label>
                        <div className="pass-group">
                          <Select
                            options={discountType}
                            className="select2"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-md-3">
                      <div className="mb-3 ">
                        <label className="form-label">
                          Discount<span className="text-danger"> *</span>
                        </label>
                        <div className="pass-group">
                          <input type="text" className="form-control" />
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-3">
                      <div className="mb-3">
                        <label className="form-label">Limitations Invoices</label>
                        <input type="text" className="form-control" />
                      </div>
                    </div>
                    <div className="col-lg-3">
                      <div className="mb-3">
                        <label className="form-label">Max Customers</label>
                        <input type="text" className="form-control" />
                      </div>
                    </div>
                    <div className="col-lg-3">
                      <div className="mb-3">
                        <label className="form-label">Product</label>
                        <input type="text" className="form-control" />
                      </div>
                    </div>
                    <div className="col-lg-3">
                      <div className="mb-3">
                        <label className="form-label">Supplier</label>
                        <input type="text" className="form-control" />
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <div className="d-flex align-items-center justify-content-between mb-3">
                        <h6>Plan Modules</h6>
                        <div className="form-check d-flex align-items-center">
                          <label className="form-check-label mt-0 text-dark fw-medium">
                            <input className="form-check-input" type="checkbox" />
                            Select All
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-lg-3 col-sm-6">
                        <div className="form-check d-flex align-items-center mb-3">
                          <label className="form-check-label mt-0 text-dark fw-medium">
                            <input className="form-check-input" type="checkbox" />
                            Contacts
                          </label>
                        </div>
                      </div>
                      <div className="col-lg-3 col-sm-6">
                        <div className="form-check d-flex align-items-center mb-3">
                          <label className="form-check-label mt-0 text-dark fw-medium">
                            <input className="form-check-input" type="checkbox" />
                            Companies
                          </label>
                        </div>
                      </div>
                      <div className="col-lg-3 col-sm-6">
                        <div className="form-check d-flex align-items-center mb-3">
                          <label className="form-check-label mt-0 text-dark fw-medium">
                            <input className="form-check-input" type="checkbox" />
                            Deals
                          </label>
                        </div>
                      </div>
                      <div className="col-lg-3 col-sm-6">
                        <div className="form-check d-flex align-items-center mb-3">
                          <label className="form-check-label mt-0 text-dark fw-medium">
                            <input className="form-check-input" type="checkbox" />
                            Leads
                          </label>
                        </div>
                      </div>
                      <div className="col-lg-3 col-sm-6">
                        <div className="form-check d-flex align-items-center mb-3">
                          <label className="form-check-label mt-0 text-dark fw-medium">
                            <input className="form-check-input" type="checkbox" />
                            Pipelines
                          </label>
                        </div>
                      </div>
                      <div className="col-lg-3 col-sm-6">
                        <div className="form-check d-flex align-items-center mb-3">
                          <label className="form-check-label mt-0 text-dark fw-medium">
                            <input className="form-check-input" type="checkbox" />
                            Projects
                          </label>
                        </div>
                      </div>
                      <div className="col-lg-3 col-sm-6">
                        <div className="form-check d-flex align-items-center mb-3">
                          <label className="form-check-label mt-0 text-dark fw-medium">
                            <input className="form-check-input" type="checkbox" />
                            Tasks
                          </label>
                        </div>
                      </div>
                      <div className="col-lg-3 col-sm-6">
                        <div className="form-check d-flex align-items-center mb-3">
                          <label className="form-check-label mt-0 text-dark fw-medium">
                            <input className="form-check-input" type="checkbox" />
                            Campaigns
                          </label>
                        </div>
                      </div>
                      <div className="col-lg-3 col-sm-6">
                        <div className="form-check d-flex align-items-center mb-3">
                          <label className="form-check-label mt-0 text-dark fw-medium">
                            <input className="form-check-input" type="checkbox" />
                            Contracts
                          </label>
                        </div>
                      </div>
                      <div className="col-lg-3 col-sm-6">
                        <div className="form-check d-flex align-items-center mb-3">
                          <label className="form-check-label mt-0 text-dark fw-medium">
                            <input className="form-check-input" type="checkbox" />
                            Estimations
                          </label>
                        </div>
                      </div>
                      <div className="col-lg-3 col-sm-6">
                        <div className="form-check d-flex align-items-center mb-3">
                          <label className="form-check-label mt-0 text-dark fw-medium">
                            <input className="form-check-input" type="checkbox" />
                            Proposals
                          </label>
                        </div>
                      </div>
                      <div className="col-lg-3 col-sm-6">
                        <div className="form-check d-flex align-items-center mb-3">
                          <label className="form-check-label mt-0 text-dark fw-medium">
                            <input className="form-check-input" type="checkbox" />
                            Invoices
                          </label>
                        </div>
                      </div>
                      <div className="col-lg-3 col-sm-6">
                        <div className="form-check d-flex align-items-center mb-3">
                          <label className="form-check-label mt-0 text-dark fw-medium">
                            <input className="form-check-input" type="checkbox" />
                            Payments
                          </label>
                        </div>
                      </div>
                      <div className="col-lg-3 col-sm-6">
                        <div className="form-check d-flex align-items-center mb-3">
                          <label className="form-check-label mt-0 text-dark fw-medium">
                            <input className="form-check-input" type="checkbox" />
                            Activities
                          </label>
                        </div>
                      </div>
                      <div className="col-lg-3 col-sm-6">
                        <div className="form-check d-flex align-items-center mb-3">
                          <label className="form-check-label mt-0 text-dark fw-medium">
                            <input className="form-check-input" type="checkbox" />
                            Analytics
                          </label>
                        </div>
                      </div>
                      <div className="col-lg-3 col-sm-6">
                        <div className="form-check d-flex align-items-center mb-3">
                          <label className="form-check-label mt-0 text-dark fw-medium">
                            <input className="form-check-input" type="checkbox" />
                            Reports
                          </label>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="d-flex align-items-center mb-3">
                          <label className="form-check-label mt-0 me-2 text-dark fw-medium">
                            Access Trial
                          </label>
                          <div className="form-check form-switch me-2">
                            <input
                              className="form-check-input me-2"
                              type="checkbox"
                              role="switch"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row align-items-center gx-3">
                      <div className="col-md-4">
                        <div className="d-flex align-items-center mb-3">
                          <div className="flex-fill">
                            <label className="form-label">Trial Days</label>
                            <input type="text" className="form-control" />
                          </div>
                        </div>
                      </div>
                      <div className="col-md-3">
                        <div className="d-block align-items-center ms-3">
                          <label className="form-check-label mt-0 me-2 text-dark">
                            Is Recommended
                          </label>
                          <div className="form-check form-switch me-2">
                            <input
                              className="form-check-input me-2"
                              type="checkbox"
                              role="switch"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-md-5">
                        <div className="mb-3 ">
                          <label className="form-label">
                            Status<span className="text-danger"> *</span>
                          </label>
                          <Select
                            options={status}
                            className="select2"
                          />
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
                <button type="button" data-bs-dismiss="offcanvas" className="btn btn-primary">
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
        {/* /Edit Plan */}
        {/* Delete Company */}
        <div className="modal fade" id="delete_invoices" role="dialog">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-body">
                <div className="text-center">
                  <div className="avatar avatar-xl bg-danger-light rounded-circle mb-3">
                    <i className="ti ti-trash-x fs-36 text-danger" />
                  </div>
                  <h4 className="mb-2">Remove Plan?</h4>
                  <p className="mb-0">
                    Are you sure you want to remove <br /> company you selected.
                  </p>
                  <div className="d-flex align-items-center justify-content-center mt-4">
                    <Link
                      to="#"
                      className="btn btn-light me-2"
                      data-bs-dismiss="modal"
                    >
                      Cancel
                    </Link>
                    <Link to="#" data-bs-dismiss="modal" className="btn btn-danger">
                      Yes, Delete it
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* /Delete Company */}
      </>

    </>


  )
}

export default Packages