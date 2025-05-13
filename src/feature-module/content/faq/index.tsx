import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Table from '../../../core/common/dataTable/index';
import { initialSettings } from '../../../core/common/selectoption/selectoption';
import DateRangePicker from 'react-bootstrap-daterangepicker';
import { faqData } from '../../../core/data/json/faq';
import { TableData } from '../../../core/data/interface';
import { all_routes } from '../../router/all_routes';
import CollapseHeader from '../../../core/common/collapse-header';
const route = all_routes;

const Faq = () => {
    const data = faqData;
    const [title,setTitle]=useState("Add FAQ")
    const [stars, setStars] = useState<{ [key: number]: boolean }>({}); 
    const togglePopup = (isEditing:any) => {
        setTitle(isEditing ? "Edit FAQ" : "Add FAQ");
    
      };
    
    const initializeStarsState = () => {
        const starsState: { [key: number]: boolean } = {};
        faqData.forEach((item, index) => {
            starsState[index] = false; 
        });
        setStars(starsState);
    };

    // Call initializeStarsState once when the component mounts
    React.useEffect(() => {
        initializeStarsState();
    }, []);

    const handleStarToggle = (index: number) => {
        setStars(prevStars => ({
            ...prevStars,
            [index]: !prevStars[index] 
        }));
    };
    const columns = [
        {
            title: '',
            dataIndex: '',
            render: (text: string, record: any, index: number) => (
            <div className={`set-star rating-select ${stars[index] ? "filled" : ""}`} onClick={() => handleStarToggle(index)}>
            <i className="fa fa-star"></i>
        </div>
        ),
      },

        {
            title: "Questions",
            dataIndex: "questions",
            sorter: (a: TableData, b: TableData) => a.questions.length - b.questions.length,
        },
        {
            title: "Category",
            dataIndex: "category",
            sorter: (a: TableData, b: TableData) =>
                a.category.length - b.category.length,
        },
        {
            title: "Answers",
            dataIndex: "answers",
            sorter: (a: TableData, b: TableData) =>
                a.answers.length - b.answers.length,
        },
        {
            title: "Created at",
            dataIndex: "created_at",
            sorter: (a: TableData, b: TableData) =>
                a.created_at.length - b.created_at.length,
        },
        {
            title: "Status",
            dataIndex: "status",
            render: (text: string) => (
                <div>
                    {text === "Active" && (
                        <span className="badge badge-pill badge-status bg-success">{text}</span>
                    )}
                </div>
            ),
            sorter: true,
        },
        {
            title: 'Actions',
            dataIndex: 'actions',
            render: () => (
                <div className="dropdown table-action">
                    <Link to="#" className="action-icon" data-bs-toggle="dropdown" aria-expanded="true">
                        <i className="fa fa-ellipsis-v"></i>
                    </Link>
                    <div className="dropdown-menu dropdown-menu-right" style={{ position: 'absolute', inset: '0px auto auto 0px', margin: '0px', transform: 'translate3d(-99.3333px, 35.3333px, 0px)' }} data-popper-placement="bottom-start">
                        <Link className="dropdown-item edit-popup" to="#" 
                        data-bs-toggle="modal" data-bs-target="#add_faq"
                         onClick={() => togglePopup(true)}
        
                        >
                            <i className="ti ti-edit text-blue"></i> Edit
                        </Link>
                        <Link className="dropdown-item" to="#" data-bs-toggle="modal" data-bs-target="#delete_page">
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
                <h4 className="page-title">FAQ</h4>
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
                      placeholder="Search FAQ"
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
                      data-bs-toggle="modal"
                      data-bs-target="#add_faq"
                    >
                      <i className="ti ti-square-rounded-plus me-2" />
                      Add FAQ
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
                            Questions
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
                            Category
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
                            Answers
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
                        <div className="d-flex align-items-center justify-content-between mb-3">
                          <p className="mb-0 d-flex align-items-center">
                            <i className="ti ti-grip-vertical me-2" />
                            Action
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
                                Category
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
                                    placeholder="Search Category"
                                  />
                                </div>
                                <ul>
                                  <li>
                                    <div className="filter-checks">
                                      <label className="checkboxs">
                                        <input type="checkbox" />
                                        <span className="checkmarks" />
                                        Services
                                      </label>
                                    </div>
                                  </li>
                                  <li>
                                    <div className="filter-checks">
                                      <label className="checkboxs">
                                        <input type="checkbox" />
                                        <span className="checkmarks" />
                                        Advertising
                                      </label>
                                    </div>
                                  </li>
                                  <li>
                                    <div className="filter-checks">
                                      <label className="checkboxs">
                                        <input type="checkbox" />
                                        <span className="checkmarks" />
                                        Content Marketing
                                      </label>
                                    </div>
                                  </li>
                                  <li>
                                    <div className="filter-checks">
                                      <label className="checkboxs">
                                        <input type="checkbox" />
                                        <span className="checkmarks" />
                                        HealthCare
                                      </label>
                                    </div>
                                  </li>
                                  <li>
                                    <div className="filter-checks">
                                      <label className="checkboxs">
                                        <input type="checkbox" />
                                        <span className="checkmarks" />
                                        Media
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
                                Status
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
                                data-bs-target="#Status"
                                aria-expanded="false"
                                aria-controls="Status"
                              >
                                Created Date
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
              {/* Faq List */}
              <div className="table-responsive custom-table">
              <Table columns={columns} dataSource={data} />
              </div>
              <div className="row align-items-center">
                <div className="col-md-6">
                  <div className="datatable-length" />
                </div>
                <div className="col-md-6">
                  <div className="datatable-paginate" />
                </div>
              </div>
              {/* /Faq List */}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  {/* /Page Wrapper */}
  {/* Add FAQ */}
  <div className="modal fade" id="add_faq" role="dialog">
    <div className="modal-dialog modal-dialog-centered">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">Add FAQ</h5>
          <div className="d-flex align-items-center mod-toggle">
            <button
              className="btn-close custom-btn-close border p-1 me-0 text-dark"
              data-bs-dismiss="modal"
              aria-label="Close"
            >
              <i className="ti ti-x" />
            </button>
          </div>
        </div>
        <form >
          <div className="modal-body">
            <div className="mb-3">
              <label className="col-form-label">
                Category <span className="text-danger">*</span>
              </label>
              <input type="text" className="form-control" />
            </div>
            <div className="mb-3">
              <label className="col-form-label">
                Question <span className="text-danger">*</span>
              </label>
              <input type="text" className="form-control" />
            </div>
            <div className="mb-3">
              <label className="col-form-label">
                Answer <span className="text-danger">*</span>
              </label>
              <textarea className="form-control" rows={4} defaultValue={""} />
            </div>
            <div className="mb-0">
              <label className="col-form-label">
                Status <span className="text-danger">*</span>
              </label>
              <div className="d-flex align-items-center">
                <div className="me-2">
                  <input
                    type="radio"
                    className="status-radio"
                    id="active1"
                    name="status"
                    defaultChecked
                  />
                  <label htmlFor="active1">Active</label>
                </div>
                <div>
                  <input
                    type="radio"
                    className="status-radio"
                    id="inactive1"
                    name="status"
                  />
                  <label htmlFor="inactive1">Inactive</label>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <div className="d-flex align-items-center justify-content-end m-0">
              <Link
                to="#"
                className="btn btn-light me-2"
                data-bs-dismiss="modal"
              >
                Cancel
              </Link>
              <button type="button" data-bs-dismiss="modal" className="btn btn-primary">
                Create
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
  {/* /Add FAQ  */}
  {/* Edit FAQ */}
  <div className="modal custom-modal fade" id="edit_faq" role="dialog">
    <div className="modal-dialog modal-dialog-centered">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">Edit FAQ</h5>
          <div className="d-flex align-items-center mod-toggle">
            <button
              className="btn-close custom-btn-close border p-1 me-0 text-dark"
              data-bs-dismiss="modal"
              aria-label="Close"
            >
              <i className="ti ti-x" />
            </button>
          </div>
        </div>
        <form >
          <div className="modal-body">
            <div className="mb-3">
              <label className="col-form-label">
                Category <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                className="form-control"
                defaultValue="Service"
              />
            </div>
            <div className="mb-3">
              <label className="col-form-label">
                Question <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                className="form-control"
                defaultValue="How can I book a service"
              />
            </div>
            <div className="mb-3">
              <label className="col-form-label">
                Answer <span className="text-danger">*</span>
              </label>
              <textarea className="form-control" rows={4} defaultValue={""} />
            </div>
            <div className="mb-0">
              <label className="col-form-label">
                Status <span className="text-danger">*</span>
              </label>
              <div className="d-flex align-items-center">
                <div className="me-2">
                  <input
                    type="radio"
                    className="status-radio"
                    id="active"
                    name="status"
                    defaultChecked
                  />
                  <label htmlFor="active">Active</label>
                </div>
                <div>
                  <input
                    type="radio"
                    className="status-radio"
                    id="inactive"
                    name="status"
                  />
                  <label htmlFor="inactive">Inactive</label>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <div className="d-flex align-items-center justify-content-end m-0">
              <Link
                to="#"
                className="btn btn-light me-2"
                data-bs-dismiss="modal"
              >
                Cancel
              </Link>
              <button type="button" data-bs-dismiss="modal" className="btn btn-primary">
                Save Changes
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
  {/* /Edit FAQ  */}
  {/* Delete FAQ */}
  <div className="modal fade" id="delete_faq" role="dialog">
    <div className="modal-dialog modal-dialog-centered">
      <div className="modal-content">
        <div className="modal-body">
          <div className="text-center">
            <div className="avatar avatar-xl bg-danger-light rounded-circle mb-3">
              <i className="ti ti-trash-x fs-36 text-danger" />
            </div>
            <h4 className="mb-2">Remove FAQ?</h4>
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
  {/* /Delete FAQ */}
</>


    )
}

export default Faq
