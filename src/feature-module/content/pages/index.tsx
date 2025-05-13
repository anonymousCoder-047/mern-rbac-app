import React, { useState } from "react";
import { Link } from "react-router-dom";
import { pagesData } from "../../../core/data/json/pagesData";
import Table from "../../../core/common/dataTable/index";
import { TableData } from "../../../core/data/interface";
import { useDispatch, useSelector } from "react-redux";
import {
  setActivityTogglePopup,
  setActivityTogglePopupTwo,
} from "../../../core/data/redux/commonSlice";
import { all_routes } from "../../router/all_routes";
import CollapseHeader from "../../../core/common/collapse-header";

const route = all_routes;

const Pages = () => {
  const data = pagesData;
  const dispatch = useDispatch();
  const activityToggle = useSelector(
    (state: any) => state?.activityTogglePopup
  );
  const activityTogglePopupTwo = useSelector(
    (state: any) => state?.activityTogglePopupTwo
  );

  const [stars, setStars] = useState<{ [key: number]: boolean }>({});

  const initializeStarsState = () => {
    const starsState: { [key: number]: boolean } = {};
    pagesData.forEach((item, index) => {
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
      title: "Pages",
      dataIndex: "pages",
      sorter: (a: TableData, b: TableData) => a.pages.length - b.pages.length,
    },
    {
      title: "Page Slug",
      dataIndex: "page_slug",
      sorter: (a: TableData, b: TableData) =>
        a.page_slug.length - b.page_slug.length,
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (text: string) => (
        <div>
          {text === "Active" && (
            <span className="badge badge-pill badge-status bg-success">
              {text}
            </span>
          )}
          {text === "Inactive" && (
            <span className="badge badge-pill badge-status bg-danger">
              {text}
            </span>
          )}
        </div>
      ),
      sorter: true,
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: () => (
        <div className="dropdown table-action">
          <Link
            to="#"
            className="action-icon"
            data-bs-toggle="dropdown"
            aria-expanded="true"
          >
            <i className="fa fa-ellipsis-v"></i>
          </Link>
          <div
            className="dropdown-menu dropdown-menu-right"
            style={{
              position: "absolute",
              inset: "0px auto auto 0px",
              margin: "0px",
              transform: "translate3d(-99.3333px, 35.3333px, 0px)",
            }}
            data-popper-placement="bottom-start"
          >
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
              data-bs-target="#delete_page"
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
                    Pages<span className="count-title">123</span>
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
                        placeholder="Search Pages"
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
                        Add New Page
                      </Link>
                    </div>
                  </div>
                </div>
                {/* /Search */}
              </div>
              <div className="card-body">
                {/* Filter */}
                <div className="d-flex align-items-center justify-content-between flex-wrap row-gap-2 mb-4">
                  <div className="dropdown">
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
                              Page
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
                              Page Slug
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
                              Status
                            </p>
                            <div className="status-toggle">
                              <input
                                type="checkbox"
                                id="col-email"
                                className="check"
                                defaultChecked
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
                              Action
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
                                  data-bs-toggle="collapse"
                                  data-bs-target="#collapseTwo"
                                  aria-expanded="true"
                                  aria-controls="collapseTwo"
                                >
                                  Pages
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
                                      placeholder="Search Pages"
                                    />
                                  </div>
                                  <ul>
                                    <li>
                                      <div className="filter-checks">
                                        <label className="checkboxs">
                                          <input type="checkbox" />
                                          <span className="checkmarks" />
                                          Home
                                        </label>
                                      </div>
                                    </li>
                                    <li>
                                      <div className="filter-checks">
                                        <label className="checkboxs">
                                          <input type="checkbox" />
                                          <span className="checkmarks" />
                                          About Us
                                        </label>
                                      </div>
                                    </li>
                                    <li>
                                      <div className="filter-checks">
                                        <label className="checkboxs">
                                          <input type="checkbox" />
                                          <span className="checkmarks" />
                                          FAQ
                                        </label>
                                      </div>
                                    </li>
                                    <li>
                                      <div className="filter-checks">
                                        <label className="checkboxs">
                                          <input type="checkbox" />
                                          <span className="checkmarks" />
                                          Categories
                                        </label>
                                      </div>
                                    </li>
                                    <li>
                                      <div className="filter-checks">
                                        <label className="checkboxs">
                                          <input type="checkbox" />
                                          <span className="checkmarks" />
                                          Privacy Policy
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
                                  Page Slug
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
                                      placeholder="Search Slug"
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
                                          home
                                        </label>
                                      </div>
                                    </li>
                                    <li>
                                      <div className="filter-checks">
                                        <label className="checkboxs">
                                          <input type="checkbox" />
                                          <span className="checkmarks" />
                                          about us
                                        </label>
                                      </div>
                                    </li>
                                    <li>
                                      <div className="filter-checks">
                                        <label className="checkboxs">
                                          <input type="checkbox" />
                                          <span className="checkmarks" />
                                          faq
                                        </label>
                                      </div>
                                    </li>
                                    <li>
                                      <div className="filter-checks">
                                        <label className="checkboxs">
                                          <input type="checkbox" />
                                          <span className="checkmarks" />
                                          categories
                                        </label>
                                      </div>
                                    </li>
                                    <li>
                                      <div className="filter-checks">
                                        <label className="checkboxs">
                                          <input type="checkbox" />
                                          <span className="checkmarks" />
                                          privacy policy
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
                          </div>
                          <div className="filter-reset-btns">
                            <div className="row">
                              <div className="col-6">
                                <Link to="#" className="btn btn-light">
                                  Reset
                                </Link>
                              </div>
                              <div className="col-6">
                                <Link to="#" className="btn btn-primary">
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
                {/* Page List */}
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
                {/* /Page List */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    {/* /Page Wrapper */}
    {/* Add Page */}
    <div
      className="offcanvas offcanvas-end offcanvas-large"
      tabIndex={-1}
      id="offcanvas_add"
    >
      <div className="offcanvas-header border-bottom">
        <h5 className="fw-semibold">Add Page</h5>
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
                  Title <span className="text-danger">*</span>
                </label>
                <input type="text" className="form-control" />
              </div>
            </div>
            <div className="col-md-12">
              <div className="mb-3">
                <label className="col-form-label">
                  Slug <span className="text-danger">*</span>
                </label>
                <input type="text" className="form-control" />
              </div>
            </div>
            <div className="col-md-12">
              <div className="mb-3">
                <label className="col-form-label">
                  Description <span className="text-danger">*</span>
                </label>
                <input type="text" className="form-control" />
              </div>
            </div>
            <div className="col-md-12">
              <div className="mb-3">
                <label className="col-form-label">
                  keywords <span className="text-danger">*</span>
                </label>
                <input type="text" className="form-control" />
              </div>
            </div>
            <div className="col-md-6">
              <div className="mb-3">
                <label className="col-form-label">Login Type</label>
                <div className="d-flex align-items-center">
                  <div className="me-2">
                    <input
                      type="radio"
                      className="status-radio"
                      id="top-menu1"
                      name="export-type"
                      defaultChecked
                    />
                    <label htmlFor="top-menu1">Top Menu</label>
                  </div>
                  <div>
                    <input
                      type="radio"
                      className="status-radio"
                      id="links1"
                      name="export-type"
                    />
                    <label htmlFor="links1">Quick Links</label>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="mb-3">
                <label className="col-form-label">Visibility</label>
                <div className="d-flex align-items-center">
                  <div className="me-2">
                    <input
                      type="radio"
                      className="status-radio"
                      id="pdf"
                      name="export-type"
                      defaultChecked
                    />
                    <label htmlFor="pdf">Show</label>
                  </div>
                  <div>
                    <input
                      type="radio"
                      className="status-radio"
                      id="share"
                      name="export-type"
                    />
                    <label htmlFor="share">Hide</label>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-12">
              <div className="mb-3">
                <label className="col-form-label">
                  Content<span className="text-danger">*</span>
                </label>
                <textarea className="form-control" rows={5} defaultValue={""} />
              </div>
            </div>
          </div>
          <div className="d-flex align-items-center justify-content-end">
            <Link to="#" className="btn btn-light me-2">
              Cancel
            </Link>
            <Link
              to="#"
              data-bs-toggle="modal"
              data-bs-target="#create_page"
              className="btn btn-primary"
            >
              Create
            </Link>
          </div>
        </form>
      </div>
    </div>
    {/* /Add Contact */}
    {/* Edit Contact */}
    <div
      className="offcanvas offcanvas-end offcanvas-large"
      tabIndex={-1}
      id="offcanvas_edit"
    >
      <div className="offcanvas-header border-bottom">
        <h5 className="fw-semibold">Edit Page</h5>
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
                  Title <span className="text-danger">*</span>
                </label>
                <input type="text" className="form-control" defaultValue="	Home" />
              </div>
            </div>
            <div className="col-md-12">
              <div className="mb-3">
                <label className="col-form-label">
                  Slug <span className="text-danger">*</span>
                </label>
                <input type="text" className="form-control" defaultValue="home" />
              </div>
            </div>
            <div className="col-md-12">
              <div className="mb-3">
                <label className="col-form-label">
                  Description <span className="text-danger">*</span>
                </label>
                <input type="text" className="form-control" defaultValue="" />
              </div>
            </div>
            <div className="col-md-12">
              <div className="mb-3">
                <label className="col-form-label">
                  keywords <span className="text-danger">*</span>
                </label>
                <input type="text" className="form-control" defaultValue="	home" />
              </div>
            </div>
            <div className="col-md-6">
              <div className="mb-3">
                <label className="col-form-label">Login Type</label>
                <div className="d-flex align-items-center">
                  <div className="me-2">
                    <input
                      type="radio"
                      className="status-radio"
                      id="top-menu"
                      name="export-type"
                      defaultChecked
                    />
                    <label htmlFor="top-menu">Top Menu</label>
                  </div>
                  <div>
                    <input
                      type="radio"
                      className="status-radio"
                      id="links"
                      name="export-type"
                    />
                    <label htmlFor="links">Quick Links</label>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="mb-3">
                <label className="col-form-label">Visibility</label>
                <div className="d-flex align-items-center">
                  <div className="me-2">
                    <input
                      type="radio"
                      className="status-radio"
                      id="showa"
                      name="export-type"
                      defaultChecked
                    />
                    <label htmlFor="showa">Show</label>
                  </div>
                  <div>
                    <input
                      type="radio"
                      className="status-radio"
                      id="hides"
                      name="export-type"
                    />
                    <label htmlFor="hides">Hide</label>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-12">
              <div className="mb-3">
                <label className="col-form-label">
                  Content<span className="text-danger">*</span>
                </label>
                <textarea className="form-control" rows={5} defaultValue={""} />
              </div>
            </div>
          </div>
          <div className="d-flex align-items-center justify-content-end">
            <Link to="#" className="btn btn-light me-2">
              Cancel
            </Link>
            <button type="button" className="btn btn-primary">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
    {/* /Edit page */}
    {/* Delete page */}
    <div className="modal custom-modal fade" id="delete_page" role="dialog">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-body">
            <div className="text-center">
              <div className="avatar avatar-xl bg-danger-light rounded-circle mb-3">
                <i className="ti ti-trash-x fs-36 text-danger" />
              </div>
              <h4 className="mb-2">Remove Pages?</h4>
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
    {/* /Delete page */}
    {/* Create Page */}
    <div className="modal custom-modal fade" id="create_page" role="dialog">
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
                <i className="ti ti-user-plus" />
              </div>
              <h3>Page Created Successfully!!!</h3>
              <p>View the details of contact, created</p>
              <div className="col-lg-12 text-center modal-btn">
                <Link to="#" className="btn btn-light" data-bs-dismiss="modal">
                  Cancel
                </Link>
                <Link to="#" data-bs-dismiss="modal" className="btn btn-primary">
                  View Details
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    {/* /Create Contact */}
    {/* Add New View */}
    <div className="modal custom-modal fade" id="save_view" role="dialog">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Add New View</h5>
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
                <label className="col-form-label">View Name</label>
                <input type="text" className="form-control" />
              </div>
              <div className="modal-btn text-end">
                <Link to="#" className="btn btn-light" data-bs-dismiss="modal">
                  Cancel
                </Link>
                <button type="button" data-bs-dismiss="modal" className="btn btn-danger">
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
  
  );
};

export default Pages;
