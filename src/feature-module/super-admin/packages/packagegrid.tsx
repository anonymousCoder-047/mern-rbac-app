import React from 'react'
import { Link } from 'react-router-dom'
import { all_routes } from '../../router/all_routes'
import ImageWithBasePath from '../../../core/common/imageWithBasePath'
import CollapseHeader from '../../../core/common/collapse-header';
import Select from "react-select";

const PackagesGrid = () => {

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
                  <div className="card-body p-3">
                    <div className="d-flex align-items-center justify-content-between">
                      <h5>Plans List</h5>
                      <div className="d-flex my-xl-auto right-content align-items-center flex-wrap row-gap-3">
                        <div className="dropdown me-3">
                          <Link
                            to="#"
                            className="dropdown-toggle btn btn-white d-inline-flex align-items-center"
                            data-bs-toggle="dropdown"
                          >
                            Select Plan
                          </Link>
                          <ul className="dropdown-menu  dropdown-menu-end p-3">
                            <li>
                              <Link
                                to="#"
                                className="dropdown-item rounded-1"
                              >
                                Basic
                              </Link>
                            </li>
                            <li>
                              <Link
                                to="#"
                                className="dropdown-item rounded-1"
                              >
                                Advanced
                              </Link>
                            </li>
                            <li>
                              <Link
                                to="#"
                                className="dropdown-item rounded-1"
                              >
                                Premium
                              </Link>
                            </li>
                            <li>
                              <Link
                                to="#"
                                className="dropdown-item rounded-1"
                              >
                                Enterprise
                              </Link>
                            </li>
                          </ul>
                        </div>
                        <div className="dropdown me-2">
                          <Link
                            to="#"
                            className="dropdown-toggle btn btn-white d-inline-flex align-items-center"
                            data-bs-toggle="dropdown"
                          >
                            Sort By : Last 7 Days
                          </Link>
                          <ul className="dropdown-menu  dropdown-menu-end p-3">
                            <li>
                              <Link
                                to="#"
                                className="dropdown-item rounded-1"
                              >
                                Recently Added
                              </Link>
                            </li>
                            <li>
                              <Link
                                to="#"
                                className="dropdown-item rounded-1"
                              >
                                Ascending
                              </Link>
                            </li>
                            <li>
                              <Link
                                to="#"
                                className="dropdown-item rounded-1"
                              >
                                Desending
                              </Link>
                            </li>
                            <li>
                              <Link
                                to="#"
                                className="dropdown-item rounded-1"
                              >
                                Last Month
                              </Link>
                            </li>
                            <li>
                              <Link
                                to="#"
                                className="dropdown-item rounded-1"
                              >
                                Last 7 Days
                              </Link>
                            </li>
                          </ul>
                        </div>
                        <div className="view-icons">
                          <Link to={all_routes.superadminPackagelist}>
                            <i className="ti ti-list-tree" />
                          </Link>
                          <Link to={all_routes.superadminPackageGrid} className="active">
                            <i className="ti ti-grid-dots" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card">
                  <div className="card-body pb-0">
                    <div className="d-flex justify-content-center align-items-center mb-4">
                      <p className="mb-0 me-2">Monthly</p>
                      <div className="form-check form-switch">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="flexSwitchCheckDefault"
                        />
                      </div>
                      <p>Yearly</p>
                    </div>
                    <div className="row justify-content-center">
                      <div className="col-lg-3 col-md-6 col-sm-12 d-flex">
                        <div className="card flex-fill">
                          <div className="card-body">
                            <div className="card">
                              <div className="card-body">
                                <h4>Basic</h4>
                                <h1>
                                  $50
                                  <span className="fs-14 fw-normal text-gray">
                                    /monthly
                                  </span>
                                </h1>
                              </div>
                            </div>
                            <div className="pricing-content rounded bg-light mb-3">
                              <div className="price-hdr">
                                <h6 className="fs-14 fw-medium text-gray w-100">
                                  Features Includes
                                </h6>
                              </div>
                              <div>
                                <span className="text-dark d-flex align-items-center mb-3">
                                  <i className="ti ti-discount-check-filled text-success me-2" />
                                  10 Contacts
                                </span>
                                <span className="text-dark d-flex align-items-center mb-3">
                                  <i className="ti ti-discount-check-filled text-success me-2" />
                                  10 Leads
                                </span>
                                <span className="text-dark d-flex align-items-center mb-3">
                                  <i className="ti ti-discount-check-filled text-success me-2" />
                                  20 Companies
                                </span>
                                <span className="text-dark d-flex align-items-center mb-3">
                                  <i className="ti ti-discount-check-filled text-success me-2" />
                                  50 Compaigns
                                </span>
                                <span className="text-dark d-flex align-items-center mb-3">
                                  <i className="ti ti-circle-x-filled text-danger me-2" />
                                  Tasks
                                </span>
                                <span className="text-dark d-flex align-items-center">
                                  <i className="ti ti-circle-x-filled text-danger me-2" />
                                  Pipelines
                                </span>
                              </div>
                            </div>
                            <Link to="#" className="btn btn-dark w-100">
                              Choose Plan
                            </Link>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-3 col-md-6 col-sm-12 d-flex">
                        <div className="card flex-fill">
                          <div className="card-body">
                            <div className="card">
                              <div className="card-body">
                                <h4>Advanced</h4>
                                <h1>
                                  $200
                                  <span className="fs-14 fw-normal text-gray">
                                    /monthly
                                  </span>
                                </h1>
                              </div>
                            </div>
                            <div className="pricing-content rounded bg-light mb-3">
                              <div className="price-hdr">
                                <h6 className="fs-14 fw-medium text-gray w-100">
                                  Features Includes
                                </h6>
                              </div>
                              <div>
                                <span className="text-dark d-flex align-items-center mb-3">
                                  <i className="ti ti-discount-check-filled text-success me-2" />
                                  20 Contacts
                                </span>
                                <span className="text-dark d-flex align-items-center mb-3">
                                  <i className="ti ti-discount-check-filled text-success me-2" />
                                  20 Leads
                                </span>
                                <span className="text-dark d-flex align-items-center mb-3">
                                  <i className="ti ti-discount-check-filled text-success me-2" />
                                  Unlimited Companies
                                </span>
                                <span className="text-dark d-flex align-items-center mb-3">
                                  <i className="ti ti-discount-check-filled text-success me-2" />
                                  Unlimited Compaigns
                                </span>
                                <span className="text-dark d-flex align-items-center mb-3">
                                  <i className="ti ti-circle-x-filled text-danger me-2" />
                                  Tasks
                                </span>
                                <span className="text-dark d-flex align-items-center">
                                  <i className="ti ti-circle-x-filled text-danger me-2" />
                                  Pipelines
                                </span>
                              </div>
                            </div>
                            <Link to="#" className="btn btn-dark w-100">
                              Choose Plan
                            </Link>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-3 col-md-6 col-sm-12 d-flex">
                        <div className="card flex-fill">
                          <div className="card-body">
                            <div className="card">
                              <div className="card-body">
                                <h4>Premium</h4>
                                <h1>
                                  $300
                                  <span className="fs-14 fw-normal text-gray">
                                    /monthly
                                  </span>
                                </h1>
                              </div>
                            </div>
                            <div className="pricing-content rounded bg-light mb-3">
                              <div className="price-hdr">
                                <h6 className="fs-14 fw-medium text-gray w-100">
                                  Features Includes
                                </h6>
                              </div>
                              <div>
                                <span className="text-dark d-flex align-items-center mb-3">
                                  <i className="ti ti-discount-check-filled text-success me-2" />
                                  Unlimited Contacts
                                </span>
                                <span className="text-dark d-flex align-items-center mb-3">
                                  <i className="ti ti-discount-check-filled text-success me-2" />
                                  Unlimited Leads
                                </span>
                                <span className="text-dark d-flex align-items-center mb-3">
                                  <i className="ti ti-discount-check-filled text-success me-2" />
                                  Unlimited Companies
                                </span>
                                <span className="text-dark d-flex align-items-center mb-3">
                                  <i className="ti ti-discount-check-filled text-success me-2" />
                                  Unlimited Compaigns
                                </span>
                                <span className="text-dark d-flex align-items-center mb-3">
                                  <i className="ti ti-circle-x-filled text-danger me-2" />
                                  Tasks
                                </span>
                                <span className="text-dark d-flex align-items-center">
                                  <i className="ti ti-circle-x-filled text-danger me-2" />
                                  Pipelines
                                </span>
                              </div>
                            </div>
                            <Link to="#" className="btn btn-dark w-100">
                              Choose Plan
                            </Link>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-3 col-md-6 col-sm-12 d-flex">
                        <div className="card flex-fill">
                          <div className="card-body">
                            <div className="card">
                              <div className="card-body">
                                <h4>Enterprise</h4>
                                <h1>
                                  $400
                                  <span className="fs-14 fw-normal text-gray">
                                    /monthly
                                  </span>
                                </h1>
                              </div>
                            </div>
                            <div className="pricing-content rounded bg-light mb-3">
                              <div className="price-hdr">
                                <h6 className="fs-14 fw-medium text-gray w-100">
                                  Features Includes
                                </h6>
                              </div>
                              <div>
                                <span className="text-dark d-flex align-items-center mb-3">
                                  <i className="ti ti-discount-check-filled text-success me-2" />
                                  Unlimited Contacts
                                </span>
                                <span className="text-dark d-flex align-items-center mb-3">
                                  <i className="ti ti-discount-check-filled text-success me-2" />
                                  Unlimited Leads
                                </span>
                                <span className="text-dark d-flex align-items-center mb-3">
                                  <i className="ti ti-discount-check-filled text-success me-2" />
                                  Unlimited Companies
                                </span>
                                <span className="text-dark d-flex align-items-center mb-3">
                                  <i className="ti ti-discount-check-filled text-success me-2" />
                                  Unlimited Compaigns
                                </span>
                                <span className="text-dark d-flex align-items-center mb-3">
                                  <i className="ti ti-discount-check-filled text-success me-2" />
                                  Tasks
                                </span>
                                <span className="text-dark d-flex align-items-center">
                                  <i className="ti ti-discount-check-filled text-success me-2" />
                                  Pipelines
                                </span>
                              </div>
                            </div>
                            <Link to="#" className="btn btn-dark w-100">
                              Choose Plan
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* /Page Wrapper */}
      </>
    </>

  )
}

export default PackagesGrid