import React, { useState } from "react";
import DateRangePicker from "react-bootstrap-daterangepicker";
import { initialSettings } from "../../../core/common/selectoption/selectoption";
import CollapseHeader from "../../../core/common/collapse-header";

import { paymentsData } from "../../../core/data/json/payment-list";
import { Link } from "react-router-dom";
import ImageWithBasePath from "../../../core/common/imageWithBasePath";
import Table from "../../../core/common/dataTable/index";
import { all_routes } from "../../router/all_routes";

const Payments = () => {
  const route = all_routes;
  const data = paymentsData;
  const [adduser, setAdduser] = useState(false);
  const togglePopup = (isEditing: any) => {
    setAdduser(!adduser);
  };
  const columns = [
    {
      title: "InvoiceID",
      dataIndex: "invoiceId",
      key: "invoiceId",
      sorter: true,
    },
    {
      title: "Client",
      dataIndex: "client",
      key: "client",
      sorter: true,
      render: (text: any, record: any) => (
        <h2 className="table-avatar d-flex align-items-center">
          <Link to={route.companyDetails} className="avatar avatar-sm border me-2">
            <ImageWithBasePath
              className="w-auto h-auto"
              src={record.client_img}
              alt="User Image"
            />
          </Link>
          <Link
            to={route.companyDetails}
            className="profile-split d-flex flex-column"
          >
            {record.client}
          </Link>
        </h2>
      ),
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      sorter: true,
    },
    {
      title: "Due Date",
      dataIndex: "dueDate",
      key: "dueDate",
      sorter: true,
    },
    {
      title: "Payment Method",
      dataIndex: "paymentMethod",
      key: "paymentMethod",
      sorter: true,
    },
    {
      title: "Transaction ID",
      dataIndex: "transactionId",
      key: "transactionId",
      sorter: true,
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
              className="dropdown-item edit-popup"
              to="#"
              onClick={() => togglePopup(false)}
            >
              <i className="ti ti-eye text-indigo" /> Preview
            </Link>
            <Link
              className="dropdown-item"
              to="#"
              data-bs-toggle="modal"
              data-bs-target="#delete_payments"
            >
              <i className="ti ti-trash text-danger" /> Delete
            </Link>
          </div>
        </div>
      ),
    },
  ];
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
                    <div className="col-4">
                      <h4 className="page-title">
                        Payments<span className="count-title">123</span>
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
                            placeholder="Search Payments"
                          />
                        </div>
                      </div>
                      <div className="col-sm-8">
                        <div className="d-flex align-items-center flex-wrap row-gap-2 justify-content-sm-end mb-3 mb-sm-0">
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
                                    Invoice ID
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
                                    Due Date
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
                                    Payment Method
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
                                    Transaction ID
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
                            <div className="filter-dropdown-menu dropdown-menu  dropdown-menu-md-end p-4">
                              <div className="filter-set-view">
                                <div className="filter-set-head">
                                  <h4>
                                    <i className="ti ti-filter-share" />
                                    Filter
                                  </h4>
                                </div>
                                <div
                                  className="accordion"
                                  id="accordionExample"
                                >
                                  <div className="filter-set-content">
                                    <div className="filter-set-content-head">
                                      <Link
                                        to="#"
                                        data-bs-toggle="collapse"
                                        data-bs-target="#collapse"
                                        aria-expanded="true"
                                        aria-controls="collapse"
                                      >
                                        Invoice ID
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
                                            placeholder="Search ID"
                                          />
                                        </div>
                                        <ul>
                                          <li>
                                            <div className="filter-checks">
                                              <label className="checkboxs">
                                                <input type="checkbox" />
                                                <span className="checkmarks" />
                                                #1254058
                                              </label>
                                            </div>
                                          </li>
                                          <li>
                                            <div className="filter-checks">
                                              <label className="checkboxs">
                                                <input type="checkbox" />
                                                <span className="checkmarks" />
                                                #1254057
                                              </label>
                                            </div>
                                          </li>
                                          <li>
                                            <div className="filter-checks">
                                              <label className="checkboxs">
                                                <input type="checkbox" />
                                                <span className="checkmarks" />
                                                #1254056
                                              </label>
                                            </div>
                                          </li>
                                          <li>
                                            <div className="filter-checks">
                                              <label className="checkboxs">
                                                <input type="checkbox" />
                                                <span className="checkmarks" />
                                                #1254055
                                              </label>
                                            </div>
                                          </li>
                                          <li>
                                            <div className="filter-checks">
                                              <label className="checkboxs">
                                                <input type="checkbox" />
                                                <span className="checkmarks" />
                                                #1254054
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
                                        Due Date
                                      </Link>
                                    </div>
                                    <div
                                      className="filter-set-contents accordion-collapse collapse"
                                      id="collapseone"
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
                                        data-bs-target="#collapsethree"
                                        aria-expanded="false"
                                        aria-controls="collapsethree"
                                      >
                                        Amount
                                      </Link>
                                    </div>
                                    <div
                                      className="filter-set-contents accordion-collapse collapse"
                                      id="collapsethree"
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
                                            placeholder="Search Amount"
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
                                                $5000
                                              </label>
                                            </div>
                                          </li>
                                          <li>
                                            <div className="filter-checks">
                                              <label className="checkboxs">
                                                <input type="checkbox" />
                                                <span className="checkmarks" />
                                                $4180
                                              </label>
                                            </div>
                                          </li>
                                          <li>
                                            <div className="filter-checks">
                                              <label className="checkboxs">
                                                <input type="checkbox" />
                                                <span className="checkmarks" />
                                                $3125
                                              </label>
                                            </div>
                                          </li>
                                          <li>
                                            <div className="filter-checks">
                                              <label className="checkboxs">
                                                <input type="checkbox" />
                                                <span className="checkmarks" />
                                                $1230
                                              </label>
                                            </div>
                                          </li>
                                          <li>
                                            <div className="filter-checks">
                                              <label className="checkboxs">
                                                <input type="checkbox" />
                                                <span className="checkmarks" />
                                                $3500
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
                                        to="#"
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
      </>
      <>
  {/* Preview Project */}
  <div
    className="offcanvas offcanvas-end offcanvas-large"
    tabIndex={-1}
    id="offcanvas_edit"
  >
    <div className="offcanvas-header border-bottom justify-content-between">
      <h4>
        Payment for Invoice<span className=" text-purple ms-2">#274738</span>{" "}
      </h4>
      <div className="d-flex align-items-center">
        <div className="toggle-header-popup">
          <div className="dropdown table-action me-2">
            <Link
              to="#"
              className="btn btn-dropdowns dropdown-toggle"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Download
            </Link>
            <div className="dropdown-menu dropdown-menu-right">
              <Link className="dropdown-item " to="#">
                Download
              </Link>
              <Link className="dropdown-item " to="#">
                Download PDF
              </Link>
            </div>
          </div>
        </div>
        <button
          type="button"
          className="btn-close custom-btn-close border p-1 me-0 d-flex align-items-center justify-content-center rounded-circle"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        >
          <i className="ti ti-x" />
        </button>
      </div>
    </div>
    <div className="offcanvas-body p-4">
      <form>
        <div className="card">
          <div className="card-body">
            <div className="details-propsal">
              <h4>Proposal From &amp; To</h4>
              <div className="row">
                <div className="col-lg-6 col-12">
                  <div className="proposal-to">
                    <h3>CRMS</h3>
                    <span>3338 Marcus Street </span>
                    <span>Birmingham, AL 35211</span>
                    <span>Phone : +1 98789 78788 </span>
                    <span>Email : info@example.com</span>
                  </div>
                </div>
                <div className="col-lg-6 col-12">
                  <div className="proposal-to">
                    <h3>NovaWave LLC </h3>
                    <span>994 Martine Ranch Suite 900</span>
                    <span>Candacefort New Hampshire</span>
                    <span>Phone : +1 58478 74646</span>
                    <span>Email : info@example.net</span>
                  </div>
                </div>
              </div>
            </div>
            <hr />
            <div className="details-propsal details-propsals">
              <h4>Payment Details</h4>
              <ul>
                <li>
                  <h5>Payment Date</h5>
                  <h6>13 May 2024</h6>
                </li>
                <li>
                  <h5>Payment Method</h5>
                  <h6>Cash</h6>
                </li>
                <li>
                  <h5>Total Amount</h5>
                  <h6>$96</h6>
                </li>
              </ul>
            </div>
            <div className="details-propsal">
              <div className="d-flex align-items-center justify-content-between">
                <h4>Invoice Details</h4>
                <h6 className="d-flex">
                  <span className="text-danger"> Amount Due : </span> $100
                </h6>
              </div>
              <ul className="m-0 border-0">
                <li>
                  <h5>Invoice Number</h5>
                  <h6 className="mb-0">
                    <span className="badge badge-purple-light d-inline-flex">
                      #1254057
                    </span>
                  </h6>
                </li>
                <li>
                  <h5>Invoice Date</h5>
                  <h6 className="mb-0">13 May 2024</h6>
                </li>
                <li>
                  <h5>Invoice Amount</h5>
                  <h6 className="mb-0">$196</h6>
                </li>
                <li>
                  <h5>Payment Amount</h5>
                  <h6 className="mb-0">$96</h6>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
  {/* /Preview Project */}
  {/* Delete Invoices */}
  <div className="modal fade" id="delete_payments" role="dialog">
    <div className="modal-dialog modal-dialog-centered">
      <div className="modal-content">
        <div className="modal-body">
          <div className="text-center">
            <div className="avatar avatar-xl bg-danger-light rounded-circle mb-3">
              <i className="ti ti-trash-x fs-36 text-danger" />
            </div>
            <h4 className="mb-2">Remove Invoice?</h4>
            <p className="mb-0">
              Are you sure you want to remove <br /> invoice you selected.
            </p>
            <div className="d-flex align-items-center justify-content-center mt-4">
              <Link
                to="#"
                className="btn btn-light me-2"
                data-bs-dismiss="modal"
              >
                Cancel
              </Link>
              <Link to="#" className="btn btn-danger">
                Yes, Delete it
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  {/* /Delete Invoices */}
</>

    </div>
  );
};

export default Payments;
