import React, { useState } from "react";
import Table from "../../core/common/dataTable/index";
import { contactMessagesData } from "../../core/data/json/contactMessages";
import ImageWithBasePath from "../../core/common/imageWithBasePath";
import { Link } from "react-router-dom";
import { all_routes } from "../router/all_routes";
import { initialSettings } from "../../core/common/selectoption/selectoption";
import DateRangePicker from "react-bootstrap-daterangepicker";
import CollapseHeader from "../../core/common/collapse-header";

const route = all_routes;

const ContactMessages = () => {
  const [sidebarPopup1, setSidebarPopup1] = useState(false);
  const [sidebarPopup2, setSidebarPopup2] = useState(false);

  const openSidebarPopup1 = () => {
    setSidebarPopup1(!sidebarPopup1);
  };

  const openSidebarPopup2 = () => {
    setSidebarPopup2(!sidebarPopup2);
  };
  const [stars, setStars] = useState<{ [key: number]: boolean }>({});

  const initializeStarsState = () => {
    const starsState: { [key: number]: boolean } = {};
    contactMessagesData.forEach((item, index) => {
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

  const dataSource = contactMessagesData;
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
      dataIndex: "name",
      key: "name",
      width: "146px",
      render: (text: any, record: any) => (
        <h2 className="d-flex align-items-center">
          <Link to="#" className="avatar avatar-sm me-2">
            <ImageWithBasePath
              src={record.avatar}
              alt="User Image"
              className="w-auto h-auto"
            />
          </Link>
          <Link to="#" className="d-flex flex-column">
            {text} <span className="text-default">{record.position} </span>
          </Link>
        </h2>
      ),
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
      width: "78px",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      width: "154px",
    },
    {
      title: "Message",
      dataIndex: "message",
      key: "message",
      width: "234px",
    },
    {
      title: "Created",
      dataIndex: "created",
      key: "created",
      width: "135px",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      width: "43px",
      render: () => (
        <div className="dropdown table-action">
          <Link
            to="#"
            className="action-icon "
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <i className="fa fa-ellipsis-v"></i>
          </Link>
          <div className="dropdown-menu dropdown-menu-right">
            <Link
              className="dropdown-item edit-popup"
              to="#"
              data-bs-toggle="offcanvas"
                        data-bs-target="#offcanvas_edit"
            >
              <i className="ti ti-edit text-blue"></i> Edit
            </Link>
            <Link
              className="dropdown-item"
              to="#"
              data-bs-toggle="modal"
              data-bs-target="#delete_contact"
            >
              <i className="ti ti-trash text-danger"></i> Delete
            </Link>
          </div>
        </div>
      ),
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
                    Contact Messages<span className="count-title">123</span>
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
            <div className="card">
              <div className="card-header">
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
                        Add Contact Messages
                      </Link>
                    </div>
                  </div>
                </div>
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
                                className="form-control  date-range bookingrange"
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
                              Created Date
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
                                  data-bs-target="#owner"
                                  aria-expanded="false"
                                  aria-controls="owner"
                                >
                                  Name
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
                                          Darlee Robertson
                                        </label>
                                      </div>
                                    </li>
                                    <li>
                                      <div className="filter-checks">
                                        <label className="checkboxs">
                                          <input type="checkbox" />
                                          <span className="checkmarks" />
                                          Sharon Roy
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
                                  data-bs-target="#Status"
                                  aria-expanded="false"
                                  aria-controls="Status"
                                >
                                  Phone
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
                                          +1 875455453
                                        </label>
                                      </div>
                                    </li>
                                    <li>
                                      <div className="filter-checks">
                                        <label className="checkboxs">
                                          <input type="checkbox" />
                                          <span className="checkmarks" />
                                          +1 989757485
                                        </label>
                                      </div>
                                    </li>
                                    <li>
                                      <div className="filter-checks">
                                        <label className="checkboxs">
                                          <input type="checkbox" />
                                          <span className="checkmarks" />
                                          +1 546555455
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
                                  data-bs-target="#collapseTwo"
                                  aria-expanded="false"
                                  aria-controls="collapseTwo"
                                >
                                  Email
                                </Link>
                              </div>
                              <div
                                className="filter-set-contents accordion-collapse collapse"
                                id="collapseTwo"
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
                                          robertson@example.com
                                        </label>
                                      </div>
                                    </li>
                                    <li>
                                      <div className="filter-checks">
                                        <label className="checkboxs">
                                          <input type="checkbox" />
                                          <span className="checkmarks" />
                                          sharon@example.com
                                        </label>
                                      </div>
                                    </li>
                                    <li>
                                      <div className="filter-checks">
                                        <label className="checkboxs">
                                          <input type="checkbox" />
                                          <span className="checkmarks" />
                                          vaughan12@example.com
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
                                  Created Date
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
                                          25 Sep 2023, 12:12 pm
                                        </label>
                                      </div>
                                    </li>
                                    <li>
                                      <div className="filter-checks">
                                        <label className="checkboxs">
                                          <input type="checkbox" />
                                          <span className="checkmarks" />
                                          27 Sep 2023, 07:40 am
                                        </label>
                                      </div>
                                    </li>
                                    <li>
                                      <div className="filter-checks">
                                        <label className="checkboxs">
                                          <input type="checkbox" />
                                          <span className="checkmarks" />
                                          29 Sep 2023, 08:20 am
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
                {/* Contact Messages List */}
                <div className="table-responsive custom-table">
                <Table dataSource={dataSource} columns={columns} />
                </div>
                <div className="row align-items-center">
                  <div className="col-md-6">
                    <div className="datatable-length" />
                  </div>
                  <div className="col-md-6">
                    <div className="datatable-paginate" />
                  </div>
                </div>
                {/* /Contact Messages List */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    {/* /Page Wrapper */}
    {/* Add Contact Message */}
    <div
      className="offcanvas offcanvas-end offcanvas-large"
      tabIndex={-1}
      id="offcanvas_add"
    >
      <div className="offcanvas-header border-bottom">
        <h5 className="fw-semibold">Add Contact Messages</h5>
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
            <div className="col-md-12">
              <div className="mb-3">
                <label className="col-form-label">
                  {" "}
                  Name <span className="text-danger">*</span>
                </label>
                <input type="text" className="form-control" />
              </div>
            </div>
            <div className="col-md-6">
              <div className="mb-3">
                <div className="d-flex justify-content-between align-items-center">
                  <label className="col-form-label">
                    Email <span className="text-danger">*</span>
                  </label>
                  <div className="status-toggle small-toggle-btn d-flex align-items-center">
                    <span className="me-2 label-text">Email Opt Out</span>
                    <input
                      type="checkbox"
                      id="user"
                      className="check"
                      defaultChecked
                    />
                    <label htmlFor="user" className="checktoggle" />
                  </div>
                </div>
                <input type="text" className="form-control" />
              </div>
            </div>
            <div className="col-md-6">
              <div className="mb-3">
                <label className="col-form-label">
                  Phone <span className="text-danger">*</span>
                </label>
                <input type="text" className="form-control" />
              </div>
            </div>
            <div className="col-md-12">
              <div className="mb-3">
                <label className="col-form-label">
                  Message <span className="text-danger">*</span>
                </label>
                <textarea className="form-control" defaultValue={""} />
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
    {/* /Add Contact Message */}
    {/* Edit Contact Message */}
    <div
      className="offcanvas offcanvas-end offcanvas-large"
      tabIndex={-1}
      id="offcanvas_edit"
    >
      <div className="offcanvas-header border-bottom">
        <h5 className="fw-semibold">Edit Contact Messages</h5>
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
                    Name <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    defaultValue="Darlee Robertson"
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="mb-3">
                  <div className="d-flex justify-content-between align-items-center">
                    <label className="col-form-label">
                      Email <span className="text-danger">*</span>
                    </label>
                    <div className="status-toggle small-toggle-btn d-flex align-items-center">
                      <span className="me-2 label-text">Email Opt Out</span>
                      <input
                        type="checkbox"
                        id="email"
                        className="check"
                        defaultChecked
                      />
                      <label htmlFor="email" className="checktoggle" />
                    </div>
                  </div>
                  <input
                    type="text"
                    className="form-control"
                    defaultValue="robertson@example.com"
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="mb-3">
                  <label className="col-form-label">
                    Phone <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    defaultValue="+1 989757485"
                  />
                </div>
              </div>
              <div className="col-md-12">
                <div className="mb-3">
                  <label className="col-form-label">
                    Message <span className="text-danger">*</span>
                  </label>
                  <textarea
                    className="form-control"
                    defaultValue={"Duis aute irure dolor in reprehenderit"}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="submit-button text-end">
            <Link to="#" className="btn btn-light sidebar-close1">
              Cancel
            </Link>
            <button type="button" className="btn btn-primary">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
    {/* /Edit Contact Message */}
    {/* Delete User */}
    <div className="modal fade" id="delete_contact" role="dialog">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-body">
            <div className="text-center">
              <div className="avatar avatar-xl bg-danger-light rounded-circle mb-3">
                <i className="ti ti-trash-x fs-36 text-danger" />
              </div>
              <h4 className="mb-2">Remove Contact Messages</h4>
              <p className="mb-0">Are you sure you want to remove it</p>
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
    {/* /Delete User */}
  </>
  
  );
};

export default ContactMessages;
