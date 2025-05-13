import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { all_routes } from '../../router/all_routes'
import ImageWithBasePath from '../../../core/common/imageWithBasePath';
import { companies_details } from '../../../core/data/json/companiesdetails';
import Table from "../../../core/common/dataTable/index";
import CollapseHeader from '../../../core/common/collapse-header';
import DateRangePicker from 'react-bootstrap-daterangepicker';
import { initialSettings } from '../../../core/common/selectoption/selectoption';
import { domain_details } from '../../../core/data/json/domainDetails';
const Domain = () => {
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
  const data = domain_details;
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
      title: "Plan",
      dataIndex: "Plan",
      sorter: (a: any, b: any) => a.Plan.length - b.Plan.length,
    },
    {
      title: "Created Date",
      dataIndex: "CreatedDate",
      sorter: (a: any, b: any) => a.CreatedDate.length - b.CreatedDate.length,
    },
    {
      title: "Status",
      dataIndex: "DomainStatus",
      render: (text: string, record: any) => (
        <span className={`badge badge-pill badge-status ${text === 'Approved' ? 'bg-success' : text === 'Pending' ? 'bg-info' : 'bg-danger'}`} >
          {text}
        </span>
      ),
      sorter: (a: any, b: any) => a.DomainStatus.length - b.DomainStatus.length,
    },
    {
      title: "Action",
      dataIndex: "DomainStatus",
      render: (text: String) => (
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
              data-bs-toggle="modal"
              data-bs-target={`${text === "Approved" ? '#domain_approved' : text === 'Pending' ? '#domain_pending' : '#domain_rejected'}`}
            >
              <i className="ti ti-eye text-blue-light" /> Preview
            </Link>
            <Link className="dropdown-item" to="#">
              <i className="ti ti-download text-blue" />
              Download
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
      sorter: (a: any, b: any) => a.DomainStatus.length - b.DomainStatus.length,
    },
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
                      Domain<span className="count-title">123</span>
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
                          placeholder="Search"
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
                                Domain Url
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
                                Plan
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
                                Status
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
                                            Approved
                                          </label>
                                        </div>
                                      </li>
                                      <li>
                                        <div className="filter-checks">
                                          <label className="checkboxs">
                                            <input type="checkbox" />
                                            <span className="checkmarks" />
                                            Pending
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
                                    Plan
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
                                            Enterprise
                                          </label>
                                        </div>
                                      </li>
                                      <li>
                                        <div className="filter-checks">
                                          <label className="checkboxs">
                                            <input type="checkbox" />
                                            <span className="checkmarks" />
                                            Advanced
                                          </label>
                                        </div>
                                      </li>
                                      <li>
                                        <div className="filter-checks">
                                          <label className="checkboxs">
                                            <input type="checkbox" />
                                            <span className="checkmarks" />
                                            Basic
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
                                  <Link to="domain.html" className="btn btn-primary">
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
      {/* Domain Details */}
      <div className="modal fade" id="domain_approved">
        <div className="modal-dialog modal-dialog-centered modal-md">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title d-flex align-items-center">
                Domain Detail
                <span className="badge bg-outline-success d-inline-flex align-items-center badge-xs ms-2">
                  <i className="ti ti-point-filled" />
                  Approved
                </span>
              </h4>
              <button
                type="button"
                className="btn-close custom-btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <i className="ti ti-x" />
              </button>
            </div>
            <form>
              <div className="modal-body pb-0">
                <div className="row">
                  <div className="col-md-12">
                    <div className="mb-3">
                      <div className="p-3 mb-3 br-5 bg-light-400">
                        <div className="row">
                          <div className="col-md-12">
                            <div className="d-flex align-items-center file-name-icon">
                              <Link
                                to="#"
                                className="avatar avatar-md border avatar-rounded"
                              >
                                <img
                                  src="assets/img/icons/company-icon-01.svg"
                                  className="img-fluid"
                                  alt="img"
                                />
                              </Link>
                              <div className="ms-2">
                                <h6 className="fw-medium fs-14">
                                  <Link to="#">NovaWave LLC</Link>
                                </h6>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="mb-3">
                      <span className="fs-12">Plan Name</span>
                      <h6 className="fw-normal">Advanced</h6>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="mb-3">
                      <span className="fs-12">Plan Type</span>
                      <h6 className="fw-normal">Monthly</h6>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="mb-3">
                      <span className="fs-12">Account URL</span>
                      <h6 className="fw-normal">nw.example.com</h6>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="mb-3">
                      <span className="fs-12">Price</span>
                      <h6 className="fw-normal">200</h6>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="mb-3">
                      <span className="fs-12">Register Date</span>
                      <h6 className="fw-normal">12 Sep 2024</h6>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="mb-3">
                      <span className="fs-12">Expiring On</span>
                      <h6 className="fw-normal">11 Oct 2024</h6>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      {/* /Domain Details */}
      {/* Domain Details */}
      <div className="modal fade" id="domain_pending">
        <div className="modal-dialog modal-dialog-centered modal-md">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title d-flex align-items-center">
                Domain Detail
                <span className="badge bg-outline-skyblue d-inline-flex align-items-center badge-xs ms-2">
                  <i className="ti ti-point-filled" />
                  Pending
                </span>
              </h4>
              <button
                type="button"
                className="btn-close custom-btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <i className="ti ti-x" />
              </button>
            </div>
            <form>
              <div className="modal-body pb-0">
                <div className="row">
                  <div className="col-md-12">
                    <div className="mb-3">
                      <div className="p-3 mb-3 br-5 bg-light-400">
                        <div className="row">
                          <div className="col-md-6">
                            <div className="d-flex align-items-center file-name-icon">
                              <Link
                                to="#"
                                className="avatar avatar-md border avatar-rounded"
                              >
                                <ImageWithBasePath
                                  src="assets/img/icons/company-icon-01.svg"
                                  className="img-fluid"
                                  alt="img"
                                />
                              </Link>
                              <div className="ms-2">
                                <h6 className="fw-medium fs-14">
                                  <Link to="#">NovaWave LLC</Link>
                                </h6>
                              </div>
                            </div>
                          </div>
                          <div className="col-md-6 text-end">
                            <span className="badge badge-success d-inline-flex align-items-center badge-xs ms-2">
                              <i className="ti ti-check me-1" />
                              Approve
                            </span>
                            <span className="badge badge-danger d-inline-flex align-items-center badge-xs ms-2">
                              <i className="ti ti-x me-1" />
                              Reject
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="mb-3">
                      <span className="fs-12">Plan Name</span>
                      <h6 className="fw-normal">Advanced</h6>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="mb-3">
                      <span className="fs-12">Plan Type</span>
                      <h6 className="fw-normal">Monthly</h6>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="mb-3">
                      <span className="fs-12">Account URL</span>
                      <h6 className="fw-normal">nw.example.com</h6>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="mb-3">
                      <span className="fs-12">Price</span>
                      <h6 className="fw-normal">200</h6>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="mb-3">
                      <span className="fs-12">Register Date</span>
                      <h6 className="fw-normal">12 Sep 2024</h6>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="mb-3">
                      <span className="fs-12">Expiring On</span>
                      <h6 className="fw-normal">11 Oct 2024</h6>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      {/* /Domain Details */}
      {/* Domain Details */}
      <div className="modal fade" id="domain_rejected">
        <div className="modal-dialog modal-dialog-centered modal-md">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title d-flex align-items-center">
                Domain Detail
                <span className="badge bg-outline-danger d-inline-flex align-items-center badge-xs ms-2">
                  <i className="ti ti-point-filled" />
                  Rejected
                </span>
              </h4>
              <button
                type="button"
                className="btn-close custom-btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <i className="ti ti-x" />
              </button>
            </div>
            <form>
              <div className="modal-body pb-0">
                <div className="row">
                  <div className="col-md-12">
                    <div className="mb-3">
                      <div className="p-3 mb-3 br-5 bg-light-400">
                        <div className="row">
                          <div className="col-md-12">
                            <div className="d-flex align-items-center file-name-icon">
                              <Link
                                to="#"
                                className="avatar avatar-md border avatar-rounded"
                              >
                                <img
                                  src="assets/img/icons/company-icon-01.svg"
                                  className="img-fluid"
                                  alt="img"
                                />
                              </Link>
                              <div className="ms-2">
                                <h6 className="fw-medium fs-14">
                                  <Link to="#">NovaWave LLC</Link>
                                </h6>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="mb-3">
                      <span className="fs-12">Plan Name</span>
                      <h6 className="fw-normal">Advanced</h6>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="mb-3">
                      <span className="fs-12">Plan Type</span>
                      <h6 className="fw-normal">Monthly</h6>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="mb-3">
                      <span className="fs-12">Account URL</span>
                      <h6 className="fw-normal">nw.example.com</h6>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="mb-3">
                      <span className="fs-12">Price</span>
                      <h6 className="fw-normal">200</h6>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="mb-3">
                      <span className="fs-12">Register Date</span>
                      <h6 className="fw-normal">12 Sep 2024</h6>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="mb-3">
                      <span className="fs-12">Expiring On</span>
                      <h6 className="fw-normal">11 Oct 2024</h6>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      {/* /Domain Details */}
      {/* Delete Company */}
      <div className="modal fade" id="delete_company" role="dialog">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-body">
              <div className="text-center">
                <div className="avatar avatar-xl bg-danger-light rounded-circle mb-3">
                  <i className="ti ti-trash-x fs-36 text-danger" />
                </div>
                <h4 className="mb-2">Remove Domain?</h4>
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

  )
}

export default Domain