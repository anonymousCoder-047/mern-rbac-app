import { useState } from "react";
import { Link } from "react-router-dom";
import { all_routes } from "../router/all_routes";
import ImageWithBasePath from "../../core/common/imageWithBasePath";

const InvoiceDetails = () => {

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
                  <div className="col-4">
                    <h4 className="page-title">Invoice Details</h4>
                  </div>
                  <div className="col-8 text-end">
                    <div>
                      <button className="btn btn-primary" type="button">
                        <i className="ti ti-download me-1" />
                        Download
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              {/* /Page Header */}
              {/* Invoices */}
              <div>
                <div className="row">
                  <div className="col-sm-10 mx-auto">
                    <Link
                      to={all_routes.invoice}
                      className="back-icon d-flex align-items-center fs-12 fw-medium mb-3 d-inline-flex"
                    >
                      <span className=" d-flex justify-content-center align-items-center rounded-circle me-2">
                        <i className="ti ti-arrow-left" />
                      </span>
                      Back to List
                    </Link>
                    <div className="card">
                      <div className="card-body p-4">
                        <div className="border-bottom mb-3">
                          <div className="row justify-content-between align-items-center">
                            <div className="col-md-6">
                              <div className="mb-3">
                                <div className="mb-2">
                                  <ImageWithBasePath
                                    src="assets/img/logo.svg"
                                    className="img-fluid"
                                    alt="logo"
                                  />
                                </div>
                                <p>3099 Kennedy Court Framingham, MA 01702</p>
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="text-end mb-3">
                                <h5 className="text-gray mb-1">
                                  Invoice No{" "}
                                  <span className="text-primary">#INV0001</span>
                                </h5>
                                <p className="mb-1 fw-medium">
                                  Created Date :{" "}
                                  <span className="text-dark">Sep 24, 2023</span>{" "}
                                </p>
                                <p className="fw-medium">
                                  Due Date :{" "}
                                  <span className="text-dark">Sep 30, 2023</span>{" "}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="border-bottom mb-3">
                          <div className="row">
                            <div className="col-md-5">
                              <div className="mb-3">
                                <p className="text-dark mb-2 fw-semibold">From</p>
                                <div>
                                  <h4 className="mb-1">Thomas Lawler</h4>
                                  <p className="mb-1">
                                    2077 Chicago Avenue Orosi, CA 93647
                                  </p>
                                  <p className="mb-1">
                                    Email :{" "}
                                    <span className="text-dark">
                                      Tarala2445@example.com
                                    </span>
                                  </p>
                                  <p>
                                    Phone :{" "}
                                    <span className="text-dark">
                                      +1 987 654 3210
                                    </span>
                                  </p>
                                </div>
                              </div>
                            </div>
                            <div className="col-md-5">
                              <div className="mb-3">
                                <p className="text-dark mb-2 fw-semibold">To</p>
                                <div>
                                  <h4 className="mb-1">Sara Inc,.</h4>
                                  <p className="mb-1">
                                    3103 Trainer Avenue Peoria, IL 61602
                                  </p>
                                  <p className="mb-1">
                                    Email :{" "}
                                    <span className="text-dark">
                                      Sara_inc34@example.com
                                    </span>
                                  </p>
                                  <p>
                                    Phone :{" "}
                                    <span className="text-dark">
                                      +1 987 471 6589
                                    </span>
                                  </p>
                                </div>
                              </div>
                            </div>
                            <div className="col-md-2">
                              <div className="mb-3">
                                <p className="text-title mb-2 fw-medium">
                                  Payment Status{" "}
                                </p>
                                <span className="badge badge-danger align-items-center mb-3">
                                  <i className="ti ti-point-filled " />
                                  Due in 10 Days
                                </span>
                                <div>
                                  <ImageWithBasePath
                                    src="assets/img/icons/qr.svg"
                                    className="img-fluid"
                                    alt="QR"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div>
                          <p className="fw-medium">
                            Invoice For :{" "}
                            <span className="text-dark fw-medium">
                              Design &amp; development of Website
                            </span>
                          </p>
                          <div className="table-responsive mb-3">
                            <table className="table">
                              <thead className="thead-light">
                                <tr>
                                  <th>Job Description</th>
                                  <th className="text-end">Qty</th>
                                  <th className="text-end">Cost</th>
                                  <th className="text-end">Discount</th>
                                  <th className="text-end">Total</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td>
                                    <h6>UX Strategy</h6>
                                  </td>
                                  <td className="text-gray-9 fw-medium text-end">
                                    1
                                  </td>
                                  <td className="text-gray-9 fw-medium text-end">
                                    $500
                                  </td>
                                  <td className="text-gray-9 fw-medium text-end">
                                    $100
                                  </td>
                                  <td className="text-gray-9 fw-medium text-end">
                                    $500
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <h6>Design System</h6>
                                  </td>
                                  <td className="text-gray-9 fw-medium text-end">
                                    1
                                  </td>
                                  <td className="text-gray-9 fw-medium text-end">
                                    $5000
                                  </td>
                                  <td className="text-gray-9 fw-medium text-end">
                                    $100
                                  </td>
                                  <td className="text-gray-9 fw-medium text-end">
                                    $5000
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <h6>Brand Guidellines</h6>
                                  </td>
                                  <td className="text-gray-9 fw-medium text-end">
                                    1
                                  </td>
                                  <td className="text-gray-9 fw-medium text-end">
                                    $5000
                                  </td>
                                  <td className="text-gray-9 fw-medium text-end">
                                    $100
                                  </td>
                                  <td className="text-gray-9 fw-medium text-end">
                                    $5000
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <h6>Social Media Template</h6>
                                  </td>
                                  <td className="text-gray-9 fw-medium text-end">
                                    1
                                  </td>
                                  <td className="text-gray-9 fw-medium text-end">
                                    $5000
                                  </td>
                                  <td className="text-gray-9 fw-medium text-end">
                                    $100
                                  </td>
                                  <td className="text-gray-9 fw-medium text-end">
                                    $5000
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                        <div className="border-bottom mb-3">
                          <div className="row align-items-center">
                            <div className="col-md-7">
                              <div className="mb-3">
                                <div className="mb-3">
                                  <h6 className="mb-1">Terms and Conditions</h6>
                                  <p>
                                    Please pay within 15 days from the date of
                                    invoice, overdue interest @ 14% will be charged
                                    on delayed payments.
                                  </p>
                                </div>
                                <div className="mb-3">
                                  <h6 className="mb-1">Notes</h6>
                                  <p>
                                    Please quote invoice number when remitting
                                    funds.
                                  </p>
                                </div>
                              </div>
                            </div>
                            <div className="col-md-5">
                              <div className="mb-3">
                                <div className="d-flex justify-content-between align-items-center border-bottom mb-2 pe-3">
                                  <p className="mb-0">Sub Total</p>
                                  <p className="text-dark fw-medium mb-2">$5500</p>
                                </div>
                                <div className="d-flex justify-content-between align-items-center border-bottom mb-2 pe-3">
                                  <p className="mb-0">Discount(0%)</p>
                                  <p className="text-dark fw-medium mb-2">$400</p>
                                </div>
                                <div className="d-flex justify-content-between align-items-center mb-2 pe-3">
                                  <p className="mb-0">VAT(5%)</p>
                                  <p className="text-dark fw-medium mb-2">$54</p>
                                </div>
                                <div className="d-flex justify-content-between align-items-center mb-2 pe-3">
                                  <h5>Total Amount</h5>
                                  <h5>$5775</h5>
                                </div>
                                <p className="fs-12">
                                  Amount in Words : Dollar Five thousand Seven
                                  Seventy Five
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="border-bottom mb-3">
                          <div className="row justify-content-end">
                            <div className="col-md-3">
                              <div className="mb-3">
                                <div className="text-end">
                                  <ImageWithBasePath
                                    src="assets/img/icons/sign.svg"
                                    className="img-fluid"
                                    alt="sign"
                                  />
                                </div>
                                <div className="text-end mb-3">
                                  <h6 className="fs-14 fw-medium pe-3">
                                    Ted M. Davis
                                  </h6>
                                  <p>Assistant Manager</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="mb-3">
                            <ImageWithBasePath
                              src="assets/img/logo.svg"
                              className="img-fluid"
                              alt="logo"
                            />
                          </div>
                          <p className="text-dark mb-1">
                            Payment Made Via bank transfer / Cheque in the name of
                            Thomas Lawler
                          </p>
                          <div className="d-flex justify-content-center align-items-center flex-wrap row-gap-2">
                            <p className="fs-12 mb-0 me-3">
                              Bank Name :{" "}
                              <span className="text-dark">HDFC Bank</span>
                            </p>
                            <p className="fs-12 mb-0 me-3">
                              Account Number :{" "}
                              <span className="text-dark">45366287987</span>
                            </p>
                            <p className="fs-12">
                              IFSC : <span className="text-dark">HDFC0018159</span>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* /Invoices */}
              <div className="d-flex justify-content-center align-items-center mb-4">
                <Link
                  to="#"
                  className="btn btn-primary d-flex justify-content-center align-items-center me-2"
                >
                  <i className="ti ti-printer me-2" />
                  Print Invoice
                </Link>
                <Link
                  to="#"
                  className="btn btn-white d-flex justify-content-center align-items-center border"
                >
                  <i className="ti ti-copy me-2" />
                  Clone Invoice
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* /Page Wrapper */}
    </>

  );
};

export default InvoiceDetails;
