import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { all_routes } from '../../router/all_routes'
import ImageWithBasePath from '../../../core/common/imageWithBasePath';
import ReactApexChart from 'react-apexcharts'
import { companies_details } from '../../../core/data/json/companiesdetails';
import Table from "../../../core/common/dataTable/index";
import CollapseHeader from '../../../core/common/collapse-header';
import DateRangePicker from 'react-bootstrap-daterangepicker';
import { initialSettings } from '../../../core/common/selectoption/selectoption';
import Select from "react-select";
import DatePicker from "react-datepicker";
type PasswordField = "password" | "confirmPassword";

const Company = () => {
  const route = all_routes;
  const data = companies_details;
  const [stars, setStars] = useState<{ [key: number]: boolean }>({});

  const initializeStarsState = () => {
    const starsState: { [key: number]: boolean } = {};
    companies_details.forEach((item, index) => {
      starsState[index] = false;
    });
    setStars(starsState);
  };

  // Call initializeStarsState once when the component mounts
  React.useEffect(() => {
    initializeStarsState();
  }, []);

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
      title: "Name",
      dataIndex: "CompanyName",
      render: (text: any, record: any) => (
        <div className="d-flex align-items-center">
          <Link
            to="#"
            className="avatar avatar-sm border rounded p-1 me-2"
          >
            <ImageWithBasePath
              className="w-auto h-auto"
              src={`assets/img/icons/${record.Image}`}
              alt="User Image"
            />
          </Link>
          <Link to="#" className="d-flex flex-column fw-medium">
            {text}
          </Link>
        </div>

      ),
      sorter: (a: any, b: any) => a.CompanyName.length - b.CompanyName.length,
    },
    {
      title: "Email",
      dataIndex: "Email",
      sorter: (a: any, b: any) => a.Email.length - b.Email.length,
    },

    {
      title: "Account URL",
      dataIndex: "AccountURL",
      sorter: (a: any, b: any) => a.AccountURL.length - b.AccountURL.length,
    },

    {
      title: "Plan",
      dataIndex: "Plan",
      render: (text: any, record: any) => (
        <div className="d-flex align-items-center justify-content-between">
          <span>{record.Plan}</span>
          <Link
            to="#"
            className="badge bg-green badge-lg text-white ms-3"
            data-bs-toggle="offcanvas"
            data-bs-target="#upgrade_plan"
          >
            Upgrade
          </Link>
        </div>

      ),

      sorter: (a: any, b: any) => a.Plan.length - b.Plan.length,
    },
    {
      title: "Created Dated",
      dataIndex: "CreatedDate",
      sorter: (a: any, b: any) => a.CreatedDate.length - b.CreatedDate.length,
    },
    {
      title: "Status",
      dataIndex: "Status",
      render: (text: any, record: any) => (
        <span className={`badge badge-pill badge-status ${text === 'Active' ? 'bg-success' : 'bg-danger'}`}>{record.Status}</span>
      ),
      sorter: (a: any, b: any) => a.Status.length - b.Status.length,
    },

    {
      title: "Action",
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
              data-bs-target="#delete_company"
            >
              <i className="ti ti-trash text-danger" />
              Delete
            </Link>
          </div>
        </div>

      ),
    },
  ];
  const [passwordVisibility, setPasswordVisibility] = useState({
    password: false,
    confirmPassword: false,
  });

  const togglePasswordVisibility = (field: PasswordField) => {
    setPasswordVisibility((prevState) => ({
      ...prevState,
      [field]: !prevState[field],
    }));
  };
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
  };
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
    { value: "Dollar", label: "Dollar" },
    { value: "Euro", label: "Euro" },
    { value: "Pound", label: "Pound" },
    { value: "Rupee", label: "Rupee" },
  ];
  const language = [
    { value: "English", label: "English" },
    { value: "Arabic", label: "Arabic" },
    { value: "French", label: "French" },
    { value: "German", label: "German" },
  ];
  const statusChoose = [
    { value: "Active", label: "Active" },
    { value: "Inactive", label: "Inactive" },
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
                          Add Company
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
                                Name
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
                                <label htmlFor="col-tag" className="checktoggle" />
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
                                <label htmlFor="col-loc" className="checktoggle" />
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
                                <label htmlFor="col-rate" className="checktoggle" />
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
                      <div className="form-sorts dropdown">
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
                                  <Link
                                    to="company.html"
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

      <>
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
                      <div className="mb-3">
                        <label className="col-form-label">
                          Company Name <span className="text-danger"> *</span>
                        </label>
                        <input type="text" className="form-control" />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="col-form-label">Email Address</label>
                        <input type="email" className="form-control" />
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="mb-3">
                        <label className="col-form-label">Account URL</label>
                        <input type="text" className="form-control" />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="col-form-label">
                          Phone Number <span className="text-danger"> *</span>
                        </label>
                        <input type="text" className="form-control" />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="col-form-label">Website</label>
                        <input type="text" className="form-control" />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3 ">
                        <label className="col-form-label">
                          Password <span className="text-danger"> *</span>
                        </label>
                        <div className="pass-group">
                          <input
                            type={
                              passwordVisibility.password
                                ? "text"
                                : "password"
                            }
                            className="pass-input form-control"
                          />
                          <span
                            className={`ti toggle-passwords ${passwordVisibility.password
                              ? "ti-eye"
                              : "ti-eye-off"
                              }`}
                            onClick={() =>
                              togglePasswordVisibility("password")
                            }
                          ></span>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3 ">
                        <label className="col-form-label">
                          Confirm Password <span className="text-danger"> *</span>
                        </label>
                        <div className="pass-group">
                          <input
                            type={
                              passwordVisibility.confirmPassword
                                ? "text"
                                : "password"
                            }
                            className="pass-input form-control"
                          />
                          <span
                            className={`ti toggle-passwords ${passwordVisibility.confirmPassword
                              ? "ti-eye"
                              : "ti-eye-off"
                              }`}
                            onClick={() =>
                              togglePasswordVisibility("confirmPassword")
                            }
                          ></span>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="mb-3">
                        <label className="col-form-label">Address</label>
                        <input type="text" className="form-control" />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3 ">
                        <label className="col-form-label">
                          Plan Name <span className="text-danger"> *</span>
                        </label>
                        <Select
                          options={planName}
                          className="select2"
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3 ">
                        <label className="col-form-label">
                          Plan Type <span className="text-danger"> *</span>
                        </label>
                        <Select
                          options={planType}
                          className="select2"
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3 ">
                        <label className="col-form-label">
                          Currency <span className="text-danger"> *</span>
                        </label>
                        <Select
                          options={currency}
                          className="select2"
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3 ">
                        <label className="col-form-label">
                          Language <span className="text-danger"> *</span>
                        </label>
                        <Select
                          options={language}
                          className="select2"
                        />
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="mb-0">
                        <div className="radio-wrap">
                          <label className="col-form-label">Status</label>
                          <div className="d-flex flex-wrap">
                            <div className="me-2">
                              <input
                                type="radio"
                                className="status-radio"
                                id="person"
                                name="leave"
                                defaultChecked
                              />
                              <label htmlFor="person">Active</label>
                            </div>
                            <div>
                              <input
                                type="radio"
                                className="status-radio"
                                id="Organization"
                                name="leave"
                              />
                              <label htmlFor="Organization">Inactive</label>
                            </div>
                          </div>
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
                <Link to="#" data-bs-dismiss="offcanvas" className="btn btn-primary">
                  Create
                </Link>
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
            <form action="company.html">
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
                      <div className="mb-3">
                        <label className="col-form-label">
                          Company Name <span className="text-danger"> *</span>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          defaultValue="NovaWave LLC"
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="col-form-label">Email Address</label>
                        <input
                          type="email"
                          className="form-control"
                          defaultValue="robertson@gmail.com"
                        />
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="mb-3">
                        <label className="col-form-label">Account URL</label>
                        <input
                          type="text"
                          className="form-control"
                          defaultValue="nw.example.com"
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="col-form-label">
                          Phone Number <span className="text-danger"> *</span>
                        </label>
                        <input type="text" className="form-control" />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="col-form-label">Website</label>
                        <input type="text" className="form-control" />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3 ">
                        <label className="col-form-label">
                          Password <span className="text-danger"> *</span>
                        </label>
                        <div className="pass-group">
                          <input
                            type={
                              passwordVisibility.password
                                ? "text"
                                : "password"
                            }
                            className="pass-input form-control"
                          />
                          <span
                            className={`ti toggle-passwords ${passwordVisibility.password
                              ? "ti-eye"
                              : "ti-eye-off"
                              }`}
                            onClick={() =>
                              togglePasswordVisibility("password")
                            }
                          ></span>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3 ">
                        <label className="col-form-label">
                          Confirm Password <span className="text-danger"> *</span>
                        </label>
                        <div className="pass-group">
                          <input
                            type={
                              passwordVisibility.confirmPassword
                                ? "text"
                                : "password"
                            }
                            className="pass-input form-control"
                          />
                          <span
                            className={`ti toggle-passwords ${passwordVisibility.confirmPassword
                              ? "ti-eye"
                              : "ti-eye-off"
                              }`}
                            onClick={() =>
                              togglePasswordVisibility("confirmPassword")
                            }
                          ></span>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="mb-3">
                        <label className="col-form-label">Address</label>
                        <input type="text" className="form-control" />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3 ">
                        <label className="col-form-label">
                          Plan Name <span className="text-danger"> *</span>
                        </label>
                        <Select
                          options={planName}
                          className="select2"
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3 ">
                        <label className="col-form-label">
                          Plan Type <span className="text-danger"> *</span>
                        </label>
                        <Select
                          options={planType}
                          className="select2"
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="col-form-label">
                          Currency <span className="text-danger"> *</span>
                        </label>
                        <Select
                          options={currency}
                          className="select2"
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="col-form-label">
                          Language <span className="text-danger"> *</span>
                        </label>
                        <Select
                          options={language}
                          className="select2"
                        />
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="mb-0">
                        <div className="radio-wrap">
                          <label className="col-form-label">Status</label>
                          <div className="d-flex flex-wrap">
                            <div className="me-2">
                              <input
                                type="radio"
                                className="status-radio"
                                id="person2"
                                name="leave"
                                defaultChecked
                              />
                              <label htmlFor="person2">Active</label>
                            </div>
                            <div>
                              <input
                                type="radio"
                                className="status-radio"
                                id="Organization2"
                                name="leave"
                              />
                              <label htmlFor="Organization2">Inactive</label>
                            </div>
                          </div>
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
        {/* /Edit Company */}
        {/* Upgrade Plane */}
        <div
          className="offcanvas offcanvas-end offcanvas-large"
          tabIndex={-1}
          id="upgrade_plan"
        >
          <div className="offcanvas-header border-bottom">
            <h5 className="fw-semibold">Upgrade Package</h5>
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
                <div className="card-body pb-0">
                  <div className="mb-1">
                    <div className="">
                      <h5 className="mb-3">Current Plan Details</h5>
                      <div className="row align-items-center">
                        <div className="col-md-4">
                          <div className="mb-3">
                            <p className="fs-12 mb-0">Company Name</p>
                            <p className="text-gray-9">NovaWave LLC</p>
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="mb-3">
                            <p className="fs-12 mb-0">Plan Name</p>
                            <p className="text-gray-9">Advanced</p>
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="mb-3">
                            <p className="fs-12 mb-0">Plan Type</p>
                            <p className="text-gray-9">Monthly</p>
                          </div>
                        </div>
                      </div>
                      <div className="row align-items-center">
                        <div className="col-md-4">
                          <div className="mb-3">
                            <p className="fs-12 mb-0">Price</p>
                            <p className="text-gray-9">200</p>
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="mb-3">
                            <p className="fs-12 mb-0">Register Date</p>
                            <p className="text-gray-9">12 Sep 2024</p>
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="mb-3">
                            <p className="fs-12 mb-0">Expiring On</p>
                            <p className="text-gray-9">11 Oct 2024</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h5 className="mb-3">Change Plan</h5>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="col-form-label">
                            Plan Name <span className="text-danger">*</span>
                          </label>
                          <Select
                            options={planName}
                            className="select2"
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-3 ">
                          <label className="col-form-label">
                            Plan Type <span className="text-danger">*</span>
                          </label>
                          <Select
                            options={planType}
                            className="select2"
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="col-form-label">
                            Ammount<span className="text-danger">*</span>
                          </label>
                          <input type="text" className="form-control" />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="col-form-label">
                            Payment Date <span className="text-danger">*</span>
                          </label>
                          <div className="input-icon-end position-relative">
                            <DatePicker
                              className="form-control datetimepicker deals-details"
                              selected={selectedDate}
                              onChange={handleDateChange}
                              dateFormat="dd-MM-yyyy"
                            />
                            <span className="input-icon-addon">
                              <i className="ti ti-calendar text-gray-7" />
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="col-form-label">
                            Next Payment Date <span className="text-danger">*</span>
                          </label>
                          <div className="input-icon-end position-relative">
                            <DatePicker
                              className="form-control datetimepicker deals-details"
                              selected={selectedDate}
                              onChange={handleDateChange}
                              dateFormat="dd-MM-yyyy"
                            />
                            <span className="input-icon-addon">
                              <i className="ti ti-calendar text-gray-7" />
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="col-form-label">
                            Expiring On <span className="text-danger">*</span>
                          </label>
                          <div className="input-icon-end position-relative">
                            <DatePicker
                              className="form-control datetimepicker deals-details"
                              selected={selectedDate}
                              onChange={handleDateChange}
                              dateFormat="dd-MM-yyyy"
                            />
                            <span className="input-icon-addon">
                              <i className="ti ti-calendar text-gray-7" />
                            </span>
                          </div>
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
        {/* /Upgrade Plane */}
        {/* Delete Company */}
        <div className="modal fade" id="delete_company" role="dialog">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-body">
                <div className="text-center">
                  <div className="avatar avatar-xl bg-danger-light rounded-circle mb-3">
                    <i className="ti ti-trash-x fs-36 text-danger" />
                  </div>
                  <h4 className="mb-2">Remove Company?</h4>
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
                    <Link to="#" data-bs-dismiss="offcanvas" className="btn btn-danger">
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
export default Company;