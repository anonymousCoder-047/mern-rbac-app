import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Select from 'react-select';
import CollapseHeader from '../../core/common/collapse-header';

const Membershipplan = () => {
    const [adduser, setAdduser] = useState(false);
    const togglePopup = () => {
        setAdduser(!adduser);
      };
     
  const options1 = [
    { value: 'Choose', label: 'Choose' },
    { value: 'Basic', label: 'Basic' },
    { value: 'Business', label: 'Business' },
    { value: 'Enterprise', label: 'Enterprise' }
  ];

  const options2 = [
    { value: 'Choose', label: 'Choose' },
    { value: '$50', label: '$50' },
    { value: '$200', label: '$200' },
    { value: '$400', label: '$400' },
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
                  <h4 className="page-title">Membership Plans</h4>
                </div>
                <div className="col-4 text-end">
                  <div className="head-icons">
                    <CollapseHeader/>
                  </div>
                </div>
              </div>
            </div>
            {/* /Page Header */}
            <div className="card">
              <div className="card-body">
                {/* Search */}
                <div className="row gy-3">
                  <div className="col-md-5 col-sm-4">
                    <div className="icon-form">
                      <span className="form-icon">
                        <i className="ti ti-search" />
                      </span>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Search Membership"
                      />
                    </div>
                  </div>
                  <div className="col-md-7 col-sm-8">
                    <div className="text-sm-end">
                      <Link
                        to="#"
                        className="btn btn-primary"
                        data-bs-toggle="offcanvas"
                        data-bs-target="#offcanvas_add"
                      >
                        <i className="ti ti-square-rounded-plus me-1" />
                        Add Membership
                      </Link>
                    </div>
                  </div>
                </div>
                {/* /Search */}
              </div>
            </div>
            <div className="d-block">
              <div className="d-flex align-items-center justify-content-center mb-4">
                <h4 className="text-default">Monthly</h4>
                <div className="status-toggle mx-3">
                  <input id="two_factor" className="check" type="checkbox" />
                  <label htmlFor="two_factor" className="checktoggle">
                    checkbox
                  </label>
                </div>
                <h4 className="text-default">Annually</h4>
              </div>
              <div className="row justify-content-center">
                <div className="col-lg-4 col-md-6">
                  <div className="card border">
                    <div className="card-body">
                      <div className="text-center border-bottom pb-3 mb-3">
                        <span>Basic</span>
                        <h2 className="d-flex align-items-end justify-content-center mt-1">
                          $50{" "}
                          <span className="fs-14 fw-medium ms-2">/ month</span>
                        </h2>
                      </div>
                      <div className="d-block">
                        <div>
                          <p className="d-flex align-items-center fs-16 fw-medium text-dark mb-2">
                            <span className="bg-success d-flex align-items-center justify-content-center fs-12 wh-14 me-1 rounded">
                              <i className="ti ti-check" />
                            </span>
                            10 Contacts
                          </p>
                          <p className="d-flex align-items-center fs-16 fw-medium text-dark mb-2">
                            <span className="bg-success d-flex align-items-center justify-content-center fs-12 wh-14 me-1 rounded">
                              <i className="ti ti-check" />
                            </span>
                            10 Leads
                          </p>
                          <p className="d-flex align-items-center fs-16 fw-medium text-dark mb-2">
                            <span className="bg-success d-flex align-items-center justify-content-center fs-12 wh-14 me-1 rounded">
                              <i className="ti ti-check" />
                            </span>
                            20 Companies
                          </p>
                          <p className="d-flex align-items-center fs-16 fw-medium text-dark mb-2">
                            <span className="bg-success d-flex align-items-center justify-content-center fs-12 wh-14 me-1 rounded">
                              <i className="ti ti-check" />
                            </span>
                            50 Compaigns
                          </p>
                          <p className="d-flex align-items-center fs-16 fw-medium text-dark mb-2">
                            <span className="bg-success d-flex align-items-center justify-content-center fs-12 wh-14 me-1 rounded">
                              <i className="ti ti-check" />
                            </span>
                            100 Projects
                          </p>
                          <p className="d-flex align-items-center fs-16 fw-medium text-dark mb-2">
                            <span className="bg-danger d-flex align-items-center justify-content-center fs-12 wh-14 me-1 rounded">
                              <i className="ti ti-x" />
                            </span>
                            Deals
                          </p>
                          <p className="d-flex align-items-center fs-16 fw-medium text-dark mb-2">
                            <span className="bg-danger d-flex align-items-center justify-content-center fs-12 wh-14 me-1 rounded">
                              <i className="ti ti-x" />
                            </span>
                            Tasks
                          </p>
                          <p className="d-flex align-items-center fs-16 fw-medium text-dark">
                            <span className="bg-danger d-flex align-items-center justify-content-center fs-12 wh-14 me-1 rounded">
                              <i className="ti ti-x" />
                            </span>
                            Pipelines
                          </p>
                        </div>
                        <div className="text-center mt-3">
                          <Link to="#" className="btn btn-primary">
                            Choose
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4 col-md-6">
                  <div className="card border">
                    <div className="card-body">
                      <div className="text-center border-bottom pb-3 mb-3">
                        <span>Business</span>
                        <h2 className="d-flex align-items-end justify-content-center mt-1">
                          $200
                          <span className="fs-14 fw-medium ms-2">/ month</span>
                        </h2>
                      </div>
                      <div className="d-block">
                        <div>
                          <p className="d-flex align-items-center fs-16 fw-medium text-dark mb-2">
                            <span className="bg-success d-flex align-items-center justify-content-center fs-12 wh-14 me-1 rounded">
                              <i className="ti ti-check" />
                            </span>
                            20 Contacts
                          </p>
                          <p className="d-flex align-items-center fs-16 fw-medium text-dark mb-2">
                            <span className="bg-success d-flex align-items-center justify-content-center fs-12 wh-14 me-1 rounded">
                              <i className="ti ti-check" />
                            </span>
                            20 Leads
                          </p>
                          <p className="d-flex align-items-center fs-16 fw-medium text-dark mb-2">
                            <span className="bg-success d-flex align-items-center justify-content-center fs-12 wh-14 me-1 rounded">
                              <i className="ti ti-check" />
                            </span>
                            50 Companies
                          </p>
                          <p className="d-flex align-items-center fs-16 fw-medium text-dark mb-2">
                            <span className="bg-success d-flex align-items-center justify-content-center fs-12 wh-14 me-1 rounded">
                              <i className="ti ti-check" />
                            </span>
                            Unlimited Compaigns
                          </p>
                          <p className="d-flex align-items-center fs-16 fw-medium text-dark mb-2">
                            <span className="bg-success d-flex align-items-center justify-content-center fs-12 wh-14 me-1 rounded">
                              <i className="ti ti-check" />
                            </span>
                            Unlimited Projects
                          </p>
                          <p className="d-flex align-items-center fs-16 fw-medium text-dark mb-2">
                            <span className="bg-danger d-flex align-items-center justify-content-center fs-12 wh-14 me-1 rounded">
                              <i className="ti ti-x" />
                            </span>
                            Deals
                          </p>
                          <p className="d-flex align-items-center fs-16 fw-medium text-dark mb-2">
                            <span className="bg-danger d-flex align-items-center justify-content-center fs-12 wh-14 me-1 rounded">
                              <i className="ti ti-x" />
                            </span>
                            Tasks
                          </p>
                          <p className="d-flex align-items-center fs-16 fw-medium text-dark">
                            <span className="bg-danger d-flex align-items-center justify-content-center fs-12 wh-14 me-1 rounded">
                              <i className="ti ti-x" />
                            </span>
                            Pipelines
                          </p>
                        </div>
                        <div className="text-center mt-3">
                          <Link to="#" className="btn btn-primary">
                            Choose
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4 col-md-6">
                  <div className="card border">
                    <div className="card-body">
                      <div className="text-center border-bottom pb-3 mb-3">
                        <span>Enterprise</span>
                        <h2 className="d-flex align-items-end justify-content-center mt-1">
                          $400
                          <span className="fs-14 fw-medium ms-2">/ month</span>
                        </h2>
                      </div>
                      <div className="d-block">
                        <div>
                          <p className="d-flex align-items-center fs-16 fw-medium text-dark mb-2">
                            <span className="bg-success d-flex align-items-center justify-content-center fs-12 wh-14 me-1 rounded">
                              <i className="ti ti-check" />
                            </span>
                            Unlimited Contacts
                          </p>
                          <p className="d-flex align-items-center fs-16 fw-medium text-dark mb-2">
                            <span className="bg-success d-flex align-items-center justify-content-center fs-12 wh-14 me-1 rounded">
                              <i className="ti ti-check" />
                            </span>
                            Unlimited Leads
                          </p>
                          <p className="d-flex align-items-center fs-16 fw-medium text-dark mb-2">
                            <span className="bg-success d-flex align-items-center justify-content-center fs-12 wh-14 me-1 rounded">
                              <i className="ti ti-check" />
                            </span>
                            Unlimited Companies
                          </p>
                          <p className="d-flex align-items-center fs-16 fw-medium text-dark mb-2">
                            <span className="bg-success d-flex align-items-center justify-content-center fs-12 wh-14 me-1 rounded">
                              <i className="ti ti-check" />
                            </span>
                            Unlimited Compaigns
                          </p>
                          <p className="d-flex align-items-center fs-16 fw-medium text-dark mb-2">
                            <span className="bg-success d-flex align-items-center justify-content-center fs-12 wh-14 me-1 rounded">
                              <i className="ti ti-check" />
                            </span>
                            Unlimited Projects
                          </p>
                          <p className="d-flex align-items-center fs-16 fw-medium text-dark mb-2">
                            <span className="bg-success d-flex align-items-center justify-content-center fs-12 wh-14 me-1 rounded">
                              <i className="ti ti-check" />
                            </span>
                            Deals
                          </p>
                          <p className="d-flex align-items-center fs-16 fw-medium text-dark mb-2">
                            <span className="bg-success d-flex align-items-center justify-content-center fs-12 wh-14 me-1 rounded">
                              <i className="ti ti-check" />
                            </span>
                            Tasks
                          </p>
                          <p className="d-flex align-items-center fs-16 fw-medium text-dark">
                            <span className="bg-success d-flex align-items-center justify-content-center fs-12 wh-14 me-1 rounded">
                              <i className="ti ti-check" />
                            </span>
                            Pipelines
                          </p>
                        </div>
                        <div className="text-center mt-3">
                          <Link to="#" className="btn btn-primary">
                            Choose
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
    </div>
    {/* /Page Wrapper */}
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
        <form >
          <div>
            <div className="row">
              <div className="col-md-12">
                <div className="mb-3">
                  <label className="col-form-label">
                    {" "}
                    Plan Name <span className="text-danger">*</span>
                  </label>
                  <input type="text" className="form-control" />
                </div>
              </div>
              <div className="col-md-6">
                <div className="mb-3">
                  <label className="col-form-label">
                    Plan Type <span className="text-danger">*</span>
                  </label>
                  <Select  classNamePrefix="react-select" className="select" options={options1} />
                </div>
              </div>
              <div className="col-md-6">
                <div className="mb-3">
                  <div className="d-flex justify-content-between align-items-center">
                    <label className="col-form-label">
                      Plan Price <span className="text-danger">*</span>
                    </label>
                    <span className="text-danger">
                      <i className="ti ti-info-circle me-2" />
                      Set 0 for free
                    </span>
                  </div>
                  <Select  classNamePrefix="react-select" className="select" options={options2} />
                </div>
              </div>
              <div className="col-md-12">
                <h5 className="mb-3">Plan Settings</h5>
              </div>
              <div className="col-md-6">
                <div className="mb-3">
                  <label className="col-form-label">
                    Contacts <span className="text-danger">*</span>
                  </label>
                  <div className="d-flex align-items-center">
                    <input
                      type="text"
                      className="form-control"
                      defaultValue="0-100"
                    />
                    <div className="status-toggle ms-3">
                      <input id="mem-tog-1" className="check" type="checkbox" />
                      <label htmlFor="mem-tog-1" className="checktoggle">
                        checkbox
                      </label>
                    </div>
                  </div>
                  <label className="checkboxs mt-2">
                    <input type="checkbox" />
                    <span className="checkmarks mem-plane-check" />
                    Unlimited
                  </label>
                </div>
              </div>
              <div className="col-md-6">
                <div className="mb-3">
                  <label className="col-form-label">
                    Leads <span className="text-danger">*</span>
                  </label>
                  <div className="d-flex align-items-center">
                    <input
                      type="text"
                      className="form-control"
                      defaultValue="0-100"
                    />
                    <div className="status-toggle ms-3">
                      <input id="mem-tog-2" className="check" type="checkbox" />
                      <label htmlFor="mem-tog-2" className="checktoggle">
                        checkbox
                      </label>
                    </div>
                  </div>
                  <label className="checkboxs mt-2">
                    <input type="checkbox" />
                    <span className="checkmarks mem-plane-check" />
                    Unlimited
                  </label>
                </div>
              </div>
              <div className="col-md-6">
                <div className="mb-3">
                  <label className="col-form-label">
                    Companies <span className="text-danger">*</span>
                  </label>
                  <div className="d-flex align-items-center">
                    <input
                      type="text"
                      className="form-control"
                      defaultValue="0-100"
                    />
                    <div className="status-toggle ms-3">
                      <input id="mem-tog-3" className="check" type="checkbox" />
                      <label htmlFor="mem-tog-3" className="checktoggle">
                        checkbox
                      </label>
                    </div>
                  </div>
                  <label className="checkboxs mt-2">
                    <input type="checkbox" />
                    <span className="checkmarks mem-plane-check" />
                    Unlimited
                  </label>
                </div>
              </div>
              <div className="col-md-6">
                <div className="mb-3">
                  <label className="col-form-label">
                    Compaigns <span className="text-danger">*</span>
                  </label>
                  <div className="d-flex align-items-center">
                    <input
                      type="text"
                      className="form-control"
                      defaultValue="0-100"
                    />
                    <div className="status-toggle ms-3">
                      <input id="mem-tog-4" className="check" type="checkbox" />
                      <label htmlFor="mem-tog-4" className="checktoggle">
                        checkbox
                      </label>
                    </div>
                  </div>
                  <label className="checkboxs mt-2">
                    <input type="checkbox" />
                    <span className="checkmarks mem-plane-check" />
                    Unlimited
                  </label>
                </div>
              </div>
              <div className="col-md-6">
                <div className="mb-3">
                  <label className="col-form-label">
                    Projects <span className="text-danger">*</span>
                  </label>
                  <div className="d-flex align-items-center">
                    <input
                      type="text"
                      className="form-control"
                      defaultValue="0-100"
                    />
                    <div className="status-toggle ms-3">
                      <input id="mem-tog-5" className="check" type="checkbox" />
                      <label htmlFor="mem-tog-5" className="checktoggle">
                        checkbox
                      </label>
                    </div>
                  </div>
                  <label className="checkboxs mt-2">
                    <input type="checkbox" />
                    <span className="checkmarks mem-plane-check" />
                    Unlimited
                  </label>
                </div>
              </div>
              <div className="col-md-6">
                <div className="mb-3">
                  <label className="col-form-label">
                    Deals <span className="text-danger">*</span>
                  </label>
                  <div className="d-flex align-items-center">
                    <input
                      type="text"
                      className="form-control"
                      defaultValue="0-100"
                    />
                    <div className="status-toggle ms-3">
                      <input id="mem-tog-6" className="check" type="checkbox" />
                      <label htmlFor="mem-tog-6" className="checktoggle">
                        checkbox
                      </label>
                    </div>
                  </div>
                  <label className="checkboxs mt-2">
                    <input type="checkbox" />
                    <span className="checkmarks mem-plane-check" />
                    Unlimited
                  </label>
                </div>
              </div>
              <div className="col-md-6">
                <div className="mb-3">
                  <label className="col-form-label">
                    Tasks <span className="text-danger">*</span>
                  </label>
                  <div className="d-flex align-items-center">
                    <input
                      type="text"
                      className="form-control"
                      defaultValue="0-100"
                    />
                    <div className="status-toggle ms-3">
                      <input id="mem-tog-7" className="check" type="checkbox" />
                      <label htmlFor="mem-tog-7" className="checktoggle">
                        checkbox
                      </label>
                    </div>
                  </div>
                  <label className="checkboxs mt-2">
                    <input type="checkbox" />
                    <span className="checkmarks mem-plane-check" />
                    Unlimited
                  </label>
                </div>
              </div>
              <div className="col-md-6">
                <div className="mb-3">
                  <label className="col-form-label">
                    Pipelines <span className="text-danger">*</span>
                  </label>
                  <div className="d-flex align-items-center">
                    <input
                      type="text"
                      className="form-control"
                      defaultValue="0-100"
                    />
                    <div className="status-toggle ms-3">
                      <input id="mem-tog-8" className="check" type="checkbox" />
                      <label htmlFor="mem-tog-8" className="checktoggle">
                        checkbox
                      </label>
                    </div>
                  </div>
                  <label className="checkboxs mt-2">
                    <input type="checkbox" />
                    <span className="checkmarks mem-plane-check" />
                    Unlimited
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div className="d-flex align-items-center justify-content-end">
            <Link to="#" className="btn btn-light me-2">
              Cancel
            </Link>
            <button type="button" className="btn btn-primary">
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
    {/* /Add Plan */}
  </>
  
  )
}

export default Membershipplan
