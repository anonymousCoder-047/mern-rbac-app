import React, { useState } from "react";
import CollapseHeader from "../../../core/common/collapse-header";
import Table from "../../../core/common/dataTable/index";
import { proposalsview } from "../../../core/data/json/proposalsview";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setActivityTogglePopup, setActivityTogglePopupTwo } from "../../../core/data/redux/commonSlice";
import DatePicker from "react-datepicker";
import Select from "react-select";
import { client, contracttype } from "../../../core/common/selectoption/selectoption";
import { all_routes } from "../../router/all_routes";
import ImageWithBasePath from "../../../core/common/imageWithBasePath";

const ProposalsView = () => {
  const route = all_routes;
  const data = proposalsview;
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const dispatch = useDispatch();
  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      sorter: true,
    },
    {
      title: "ActivityType",
      dataIndex: "activityType",
      key: "activityType",
      sorter: true,
      render: (text: string) => (
        <div>
          {text === "Meeting" && (
            <span className="badge activity-badge bg-purple">
              <i className="ti ti-user-share"></i>
              {text}
            </span>
          )}

          {text === "Calls" && (
            <span className="badge activity-badge bg-green">
              <i className="ti ti-phone"></i>
              {text}
            </span>
          )}
           {text === "Email" && (
            <span className="badge activity-badge bg-warning">
              <i className="ti ti-mail"></i>
              {text}
            </span>
          )}
          {text === "Task" && (
            <span className="badge activity-badge bg-blue">
              <i className="ti ti-subtask"></i>
              {text}
            </span>
          )}
         
        </div>
      ),
    },

    {
      title: "DueDate",
      dataIndex: "dueDate",
      key: "dueDate",
      sorter: true,
    },
    {
      title: "Owner",
      dataIndex: "owner",
      key: "owner",
      sorter: true,
    },
    {
      title: "CreatedAt",
      dataIndex: "createdAt",
      key: "createdAt",
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
            <Link className="dropdown-item" to="#" >
              <i className="ti ti-edit text-blue" /> Edit
            </Link>

            <Link
              className="dropdown-item"
              to="#"
              data-bs-toggle="modal"
              data-bs-target="#delete_activity"
            >
              <i className="ti ti-trash text-danger"></i> Delete
            </Link>
          </div>
        </div>
      ),
    },
  ];
  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
  };
  const activityToggle = useSelector(
    (state: any) => state?.activityTogglePopup
  );
  const activityToggleTwo = useSelector(
    (state: any) => state?.activityTogglePopupTwo
  );
  const activityToggleThree = useSelector(
    (state: any) => state?.activityTogglePopupThree
  );
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
                        Activities<span className="count-title">123</span>
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
                <div className="card main-card">
                  <div className="card-body">
                    {/* Search */}
                    <div className="search-section">
                      <div className="row">
                        <div className="col-md-5 col-sm-4">
                          <div className="mb-3 icon-form">
                            <span className="form-icon">
                              <i className="ti ti-search" />
                            </span>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Search Activity"
                            />
                          </div>
                        </div>
                        <div className="col-md-7 col-sm-8">
                          <div className="export-list text-sm-end">
                            <ul>
                              <li>
                                <Link
                                  to="#"
                                  className="btn btn-primary add-popup"   onClick={() =>
                                    dispatch(
                                      setActivityTogglePopup(!activityToggle)
                                    )
                                  }
                                >
                                  <i className="ti ti-square-rounded-plus" />
                                  Add New Activity
                               </Link>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* /Search */}
                    {/* Filter */}
                    <div className="filter-section filter-flex">
                      <div className="activity-title">
                        <h4>All Activity</h4>
                        <div className="active-list">
                          <ul>
                            <li>
                              <Link
                                to={route.activityCalls}
                                data-bs-toggle="tooltip"
                                data-bs-placement="top"
                                data-bs-original-title="Calls"
                              >
                                <i className="ti ti-phone" />
                             </Link>
                            </li>
                            <li>
                              <Link
                                to={route.activityMail}
                                data-bs-toggle="tooltip"
                                data-bs-placement="top"
                                data-bs-original-title="Mail"
                              >
                                <i className="ti ti-mail" />
                             </Link>
                            </li>
                            <li>
                              <Link
                                to={route.activityTask}
                                data-bs-toggle="tooltip"
                                data-bs-placement="top"
                                data-bs-original-title="Task"
                              >
                                <i className="ti ti-subtask" />
                             </Link>
                            </li>
                            <li>
                              <Link
                                to={route.activityMeeting}
                                data-bs-toggle="tooltip"
                                data-bs-placement="top"
                                data-bs-original-title="Meeting"
                              >
                                <i className="ti ti-user-share" />
                             </Link>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="filter-list">
                        <ul>
                          <li>
                            <div className="sort-dropdown drop-down">
                              <Link
                                to="#"
                                className="dropdown-toggle"
                                data-bs-toggle="dropdown"
                              >
                                <i className="ti ti-sort-ascending-2" />
                                Sort{" "}
                             </Link>
                              <div className="dropdown-menu  dropdown-menu-start">
                                <ul>
                                  <li>
                                    <Link to="#">
                                      <i className="ti ti-circle-chevron-right" />
                                      Ascending
                                   </Link>
                                  </li>
                                  <li>
                                    <Link to="#">
                                      <i className="ti ti-circle-chevron-right" />
                                      Descending
                                   </Link>
                                  </li>
                                  <li>
                                    <Link to="#">
                                      <i className="ti ti-circle-chevron-right" />
                                      Recently Viewed
                                   </Link>
                                  </li>
                                  <li>
                                    <Link to="#">
                                      <i className="ti ti-circle-chevron-right" />
                                      Recently Added
                                   </Link>
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </li>
                          <li>
                            <div className="manage-dropdwon">
                              <Link
                                to="#"
                                className="btn btn-purple-light"
                                data-bs-toggle="dropdown"
                                data-bs-auto-close="false"
                              >
                                <i className="ti ti-columns-3" />
                                Manage Columns
                             </Link>
                              <div className="dropdown-menu  dropdown-menu-xl-end">
                                <h4>Want to manage datatables?</h4>
                                <p>
                                  Please drag and drop your column to reorder
                                  your table and enable see option as you want.
                                </p>
                                <ul>
                                  <li>
                                    <p>
                                      <i className="ti ti-grip-vertical" />
                                      Title
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
                                  </li>
                                  <li>
                                    <p>
                                      <i className="ti ti-grip-vertical" />
                                      Activity Type
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
                                  </li>
                                  <li>
                                    <p>
                                      <i className="ti ti-grip-vertical" />
                                      Due Date
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
                                  </li>
                                  <li>
                                    <p>
                                      <i className="ti ti-grip-vertical" />
                                      Owner
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
                                  </li>
                                  <li>
                                    <p>
                                      <i className="ti ti-grip-vertical" />
                                      Created at
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
                                  </li>
                                  <li>
                                    <p>
                                      <i className="ti ti-grip-vertical" />
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
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </li>
                          <li>
                            <div className="form-sorts dropdown">
                              <Link
                                to="#"
                                data-bs-toggle="dropdown"
                                data-bs-auto-close="false"
                              >
                                <i className="ti ti-filter-share" />
                                Filter
                             </Link>
                              <div className="filter-dropdown-menu dropdown-menu  dropdown-menu-xl-end">
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
                                          data-bs-target="#collapseTwo"
                                          aria-expanded="true"
                                          aria-controls="collapseTwo"
                                        >
                                          Title
                                       </Link>
                                      </div>
                                      <div
                                        className="filter-set-contents accordion-collapse collapse show"
                                        id="collapseTwo"
                                        data-bs-parent="#accordionExample"
                                      >
                                        <div className="filter-content-list">
                                          <div className="mb-3 icon-form">
                                            <span className="form-icon">
                                              <i className="ti ti-search" />
                                            </span>
                                            <input
                                              type="text"
                                              className="form-control"
                                              placeholder="Search Name"
                                            />
                                          </div>
                                          <ul>
                                            <li>
                                              <div className="filter-checks">
                                                <label className="checkboxs">
                                                  <input type="checkbox" />
                                                  <span className="checkmarks" />
                                                </label>
                                              </div>
                                              <div className="collapse-inside-text">
                                                <h5>We scheduled a meeting</h5>
                                              </div>
                                            </li>
                                            <li>
                                              <div className="filter-checks">
                                                <label className="checkboxs">
                                                  <input type="checkbox" />
                                                  <span className="checkmarks" />
                                                </label>
                                              </div>
                                              <div className="collapse-inside-text">
                                                <h5>
                                                  Store and manage contact
                                                </h5>
                                              </div>
                                            </li>
                                            <li>
                                              <div className="filter-checks">
                                                <label className="checkboxs">
                                                  <input type="checkbox" />
                                                  <span className="checkmarks" />
                                                </label>
                                              </div>
                                              <div className="collapse-inside-text">
                                                <h5>Built landing pages</h5>
                                              </div>
                                            </li>
                                            <li>
                                              <div className="filter-checks">
                                                <label className="checkboxs">
                                                  <input type="checkbox" />
                                                  <span className="checkmarks" />
                                                </label>
                                              </div>
                                              <div className="collapse-inside-text">
                                                <h5>
                                                  Discussed budget proposal
                                                </h5>
                                              </div>
                                            </li>
                                            <li>
                                              <div className="filter-checks">
                                                <label className="checkboxs">
                                                  <input type="checkbox" />
                                                  <span className="checkmarks" />
                                                </label>
                                              </div>
                                              <div className="collapse-inside-text">
                                                <h5>Discussed about team</h5>
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
                                          Activity Type
                                       </Link>
                                      </div>
                                      <div
                                        className="filter-set-contents accordion-collapse collapse"
                                        id="owner"
                                        data-bs-parent="#accordionExample"
                                      >
                                        <div className="filter-content-list">
                                          <ul>
                                            <li>
                                              <div className="filter-checks">
                                                <label className="checkboxs">
                                                  <input type="checkbox" />
                                                  <span className="checkmarks" />
                                                </label>
                                              </div>
                                              <div className="collapse-inside-text">
                                                <h5>Meeting</h5>
                                              </div>
                                            </li>
                                            <li>
                                              <div className="filter-checks">
                                                <label className="checkboxs">
                                                  <input type="checkbox" />
                                                  <span className="checkmarks" />
                                                </label>
                                              </div>
                                              <div className="collapse-inside-text">
                                                <h5>Calls</h5>
                                              </div>
                                            </li>
                                            <li>
                                              <div className="filter-checks">
                                                <label className="checkboxs">
                                                  <input type="checkbox" />
                                                  <span className="checkmarks" />
                                                </label>
                                              </div>
                                              <div className="collapse-inside-text">
                                                <h5>Task</h5>
                                              </div>
                                            </li>
                                            <li>
                                              <div className="filter-checks">
                                                <label className="checkboxs">
                                                  <input type="checkbox" />
                                                  <span className="checkmarks" />
                                                </label>
                                              </div>
                                              <div className="collapse-inside-text">
                                                <h5>Email</h5>
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
                                          Due Date{" "}
                                       </Link>
                                      </div>
                                      <div
                                        className="filter-set-contents accordion-collapse collapse"
                                        id="Status"
                                        data-bs-parent="#accordionExample"
                                      >
                                        <div className="filter-content-list">
                                          <div className="mb-3 icon-form">
                                            <span className="form-icon">
                                              <i className="ti ti-search" />
                                            </span>
                                            <input
                                              type="text"
                                              className="form-control"
                                              placeholder="Search Date"
                                            />
                                          </div>
                                          <ul>
                                            <li>
                                              <div className="filter-checks">
                                                <label className="checkboxs">
                                                  <input type="checkbox" />
                                                  <span className="checkmarks" />
                                                </label>
                                              </div>
                                              <div className="collapse-inside-text">
                                                <h5>25 Sep 2023, 12:12 pm</h5>
                                              </div>
                                            </li>
                                            <li>
                                              <div className="filter-checks">
                                                <label className="checkboxs">
                                                  <input type="checkbox" />
                                                  <span className="checkmarks" />
                                                </label>
                                              </div>
                                              <div className="collapse-inside-text">
                                                <h5>29 Sep 2023, 04:12 pm</h5>
                                              </div>
                                            </li>
                                            <li>
                                              <div className="filter-checks">
                                                <label className="checkboxs">
                                                  <input type="checkbox" />
                                                  <span className="checkmarks" />
                                                </label>
                                              </div>
                                              <div className="collapse-inside-text">
                                                <h5>11 Oct 2023, 05:00 pm</h5>
                                              </div>
                                            </li>
                                            <li>
                                              <div className="filter-checks">
                                                <label className="checkboxs">
                                                  <input type="checkbox" />
                                                  <span className="checkmarks" />
                                                </label>
                                              </div>
                                              <div className="collapse-inside-text">
                                                <h5>19 Oct 2023, 02:35 pm</h5>
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
                                          Owner
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
                                                  <input type="checkbox" />
                                                  <span className="checkmarks" />
                                                </label>
                                              </div>
                                              <div className="collapse-inside-text">
                                                <h5>Hendry</h5>
                                              </div>
                                            </li>
                                            <li>
                                              <div className="filter-checks">
                                                <label className="checkboxs">
                                                  <input type="checkbox" />
                                                  <span className="checkmarks" />
                                                </label>
                                              </div>
                                              <div className="collapse-inside-text">
                                                <h5>Monty Beer</h5>
                                              </div>
                                            </li>
                                            <li>
                                              <div className="filter-checks">
                                                <label className="checkboxs">
                                                  <input type="checkbox" />
                                                  <span className="checkmarks" />
                                                </label>
                                              </div>
                                              <div className="collapse-inside-text">
                                                <h5>Bradtke</h5>
                                              </div>
                                            </li>
                                            <li>
                                              <div className="filter-checks">
                                                <label className="checkboxs">
                                                  <input type="checkbox" />
                                                  <span className="checkmarks" />
                                                </label>
                                              </div>
                                              <div className="collapse-inside-text">
                                                <h5>Swaniawski</h5>
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
                                          data-bs-target="#collapsestatus"
                                          aria-expanded="false"
                                          aria-controls="collapsestatus"
                                        >
                                          Created Date
                                       </Link>
                                      </div>
                                      <div
                                        className="filter-set-contents accordion-collapse collapse"
                                        id="collapsestatus"
                                        data-bs-parent="#accordionExample"
                                      >
                                        <div className="filter-content-list">
                                          <ul>
                                            <li>
                                              <div className="filter-checks">
                                                <label className="checkboxs">
                                                  <input type="checkbox" />
                                                  <span className="checkmarks" />
                                                </label>
                                              </div>
                                              <div className="collapse-inside-text">
                                                <h5>22 Sep 2023, 10:14 am</h5>
                                              </div>
                                            </li>
                                            <li>
                                              <div className="filter-checks">
                                                <label className="checkboxs">
                                                  <input type="checkbox" />
                                                  <span className="checkmarks" />
                                                </label>
                                              </div>
                                              <div className="collapse-inside-text">
                                                <h5>27 Sep 2023, 03:26 pm</h5>
                                              </div>
                                            </li>
                                            <li>
                                              <div className="filter-checks">
                                                <label className="checkboxs">
                                                  <input type="checkbox" />
                                                  <span className="checkmarks" />
                                                </label>
                                              </div>
                                              <div className="collapse-inside-text">
                                                <h5>03 Oct 2023, 03:53 pm</h5>
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
                                          to={route.activities}
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
                          </li>
                        </ul>
                      </div>
                    </div>
                    {/* /Filter */}
                    {/* Activity List */}
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
                    {/* /Activity List */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* /Page Wrapper */}
      </>
      <>
        {/* Add New Activity */}
        <div className={
            activityToggle ? "toggle-popup sidebar-popup" : "toggle-popup"
          }>
          {/* proposal */}
          <div className="sidebar-layout d-none">
            <div className="sidebar-header">
              <h4>
                Proposal{" "}
                <span className="badge badge-purple-light ms-2">#1493016</span>{" "}
              </h4>
              <Link to="#" className="sidebar-close toggle-btn">
                <i className="ti ti-x" />
             </Link>
            </div>
            <div className="toggle-body">
              <div className="toggle-content-view">
                <h5>Web Design</h5>
                <p>
                  Where's the other side. The further off from England the
                  nearer is to find my way into a tree. By the use of a well--'
                  'What did they draw?' said Alice, in a sorrowful tone, 'I'm
                  afraid I've offended it again
                </p>
              </div>
              <div className="card">
                <div className="card-body">
                  <div className="details-propsal">
                    <h4>Proposal Details</h4>
                    <ul>
                      <li>
                        <h5>Date</h5>
                        <h6>24 Jan 2024</h6>
                      </li>
                      <li>
                        <h5>Date</h5>
                        <h6>26 Jan 2024</h6>
                      </li>
                      <li>
                        <h5>Related To</h5>
                        <h6>Deals</h6>
                      </li>
                      <li>
                        <h5>Name</h5>
                        <h6>Collins</h6>
                      </li>
                      <li>
                        <h5>Projects</h5>
                        <h6>Truelysell</h6>
                      </li>
                      <li>
                        <h5>Assigned to</h5>
                        <div className="d-flex align-items-center">
                          <ImageWithBasePath
                            src="assets/img/profiles/avatar-19.jpg"
                            alt="img"
                          />
                          <h6 className="mb-0">Darlee Robertson</h6>
                        </div>
                      </li>
                      <li>
                        <h5>Created on</h5>
                        <h6>20 Jan 2024</h6>
                      </li>
                      <li>
                        <h5>Status</h5>
                        <Link to="#" className="badge badge-secondary">
                          Sent
                       </Link>
                      </li>
                    </ul>
                  </div>
                  <div className="details-propsal">
                    <h4>Proposal From &amp; To</h4>
                    <div className="row">
                      <div className="col-lg-6">
                        <div className="proposal-to">
                          <h6>From</h6>
                          <h3>CRMS</h3>
                          <span>3338 Marcus Street </span>
                          <span>Birmingham, AL 35211</span>
                          <span>Phone : +1 98789 78788 </span>
                          <span>Email : info@example.com</span>
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="proposal-to">
                          <h6>To</h6>
                          <h3>Harbor View</h3>
                          <span>994 Martine Ranch Suite 900</span>
                          <span>Candacefort New Hampshire</span>
                          <span>Phone : +1 58478 74646</span>
                          <span>Email : info@example.net</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="attached-div">
                <h5>Attachment</h5>
                <div className="attachement-download">
                  <div className="attachement-download-img">
                    <div className="attachement-download-icon">
                      <span>
                        <i className="ti ti-file-type-pdf" />
                      </span>
                    </div>
                    <div className="attachement-download-content">
                      <h5>Proposal_webdesign.pdf</h5>
                      <h6>15.2 MB</h6>
                    </div>
                  </div>
                  <div className="attachement-download-btn">
                    <Link to="#">
                      <i className="ti ti-download" />
                   </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* proposal */}
          {/* estimation */}
          <div className="sidebar-layout d-none">
            <div className="sidebar-header">
              <h4>
                Estimation
                <span className="badge badge-purple-light ms-2">
                  #274738
                </span>{" "}
              </h4>
              <Link to="#" className="sidebar-close toggle-btn">
                <i className="ti ti-x" />
             </Link>
            </div>
            <div className="toggle-body">
              <div className="card">
                <div className="card-body">
                  <div className="details-propsal details-propsals">
                    <h4>
                      Estimation Details{" "}
                      <span className="badge badge-success ms-2 d-inline-flex">
                        Accepted
                      </span>
                    </h4>
                    <ul>
                      <li>
                        <h5>Estimate Date</h5>
                        <h6>24 Jan 2024</h6>
                      </li>
                      <li>
                        <h5>Expiry Date</h5>
                        <h6>26 Jan 2024</h6>
                      </li>
                      <li>
                        <h5>Client</h5>
                        <h6>NovaWave LLC</h6>
                      </li>
                    </ul>
                  </div>
                  <div className="details-propsal">
                    <h4>Proposal From &amp; To</h4>
                    <div className="row">
                      <div className="col-lg-4">
                        <div className="proposal-to">
                          <h6>From</h6>
                          <h3>CRMS</h3>
                          <span>3338 Marcus Street </span>
                          <span>Birmingham, AL 35211</span>
                          <span>Phone : +1 98789 78788 </span>
                          <span>Email : info@example.com</span>
                        </div>
                      </div>
                      <div className="col-lg-4">
                        <div className="proposal-to">
                          <h6>Bill To</h6>
                          <h3>NovaWave LLC </h3>
                          <span>994 Martine Ranch Suite 900</span>
                          <span>Candacefort New Hampshire</span>
                          <span>Phone : +1 58478 74646</span>
                          <span>Email : info@example.net</span>
                        </div>
                      </div>
                      <div className="col-lg-4">
                        <div className="proposal-to">
                          <h6>Ship To</h6>
                          <h3>NovaWave LLC </h3>
                          <span>994 Martine Ranch Suite 900</span>
                          <span>Candacefort New Hampshire</span>
                          <span>Phone : +1 58478 74646</span>
                          <span>Email : info@example.net</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="table-responsive">
                <table className="table table-view">
                  <thead>
                    <tr>
                      <th>Item</th>
                      <th>Quantity</th>
                      <th>Price</th>
                      <th>Discount</th>
                      <th>Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Web Design</td>
                      <td>1</td>
                      <td>$200</td>
                      <td>2%</td>
                      <td>$196</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="subtotal-div">
                <ul>
                  <li>
                    <h5>Subtotal</h5>
                    <h6>$196.00</h6>
                  </li>
                  <li>
                    <h5>Discount 2%</h5>
                    <h6>$4.00</h6>
                  </li>
                  <li>
                    <h5>Extra Discount 0%</h5>
                    <h6>$0.00</h6>
                  </li>
                  <li>
                    <h5>Tax</h5>
                    <h6>$0.00</h6>
                  </li>
                  <li>
                    <h5>Total</h5>
                    <h6>$192.00</h6>
                  </li>
                </ul>
              </div>
              <div className="terms-condition">
                <h2>Terms &amp; Conditions</h2>
                <p>
                  The products/services listed in this invoice will be
                  delivered/provided as per the specifications and schedule
                  detailed in the invoice or as agreed upon by both parties in
                  previous communications.
                </p>
              </div>
            </div>
          </div>
          {/* estimation */}
          {/* payment */}
          <div className="sidebar-layout d-none">
            <div className="sidebar-header">
              <h4>
                Payment for Invoice
                <span className="badge badge-purple-light ms-2">
                  #274738
                </span>{" "}
              </h4>
              <Link to="#" className="sidebar-close toggle-btn">
                <i className="ti ti-x" />
             </Link>
            </div>
            <div className="toggle-body">
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
            </div>
          </div>
          {/* payment */}
          {/* invoice */}
          <div className="sidebar-layout d-none">
            <div className="sidebar-header">
              <h4>
                Estimation
                <span className="badge badge-purple-light ms-2">
                  #274738
                </span>{" "}
              </h4>
              <Link to="#" className="sidebar-close toggle-btn">
                <i className="ti ti-x" />
             </Link>
            </div>
            <div className="toggle-body">
              <div className="card">
                <div className="card-body">
                  <div className="details-propsal details-propsals">
                    <h4>
                      Invoice Details
                      <span className="badge badge-success ms-2 d-inline-flex">
                        Paid
                      </span>
                    </h4>
                    <ul>
                      <li>
                        <h5>Invoice Date</h5>
                        <h6>24 Jan 2024</h6>
                      </li>
                      <li>
                        <h5>Expiry Date</h5>
                        <h6>26 Jan 2024</h6>
                      </li>
                      <li>
                        <h5>Client</h5>
                        <h6>NovaWave LLC</h6>
                      </li>
                    </ul>
                  </div>
                  <div className="details-propsal">
                    <div className="row">
                      <div className="col-lg-4">
                        <div className="proposal-to">
                          <h6>From</h6>
                          <h3>CRMS</h3>
                          <span>3338 Marcus Street </span>
                          <span>Birmingham, AL 35211</span>
                          <span>Phone : +1 98789 78788 </span>
                          <span>Email : info@example.com</span>
                        </div>
                      </div>
                      <div className="col-lg-4">
                        <div className="proposal-to">
                          <h6>Bill To</h6>
                          <h3>NovaWave LLC </h3>
                          <span>994 Martine Ranch Suite 900</span>
                          <span>Candacefort New Hampshire</span>
                          <span>Phone : +1 58478 74646</span>
                          <span>Email : info@example.net</span>
                        </div>
                      </div>
                      <div className="col-lg-4">
                        <div className="proposal-to">
                          <h6>Ship To</h6>
                          <h3>NovaWave LLC </h3>
                          <span>994 Martine Ranch Suite 900</span>
                          <span>Candacefort New Hampshire</span>
                          <span>Phone : +1 58478 74646</span>
                          <span>Email : info@example.net</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="table-responsive">
                <table className="table table-view">
                  <thead>
                    <tr>
                      <th>Item</th>
                      <th>Quantity</th>
                      <th>Price</th>
                      <th>Discount</th>
                      <th>Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Web Design</td>
                      <td>1</td>
                      <td>$200</td>
                      <td>2%</td>
                      <td>$196</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="subtotal-div">
                <ul>
                  <li>
                    <h5>Subtotal</h5>
                    <h6>$196.00</h6>
                  </li>
                  <li>
                    <h5>Discount 2%</h5>
                    <h6>$4.00</h6>
                  </li>
                  <li>
                    <h5>Extra Discount 0%</h5>
                    <h6>$0.00</h6>
                  </li>
                  <li>
                    <h5>Tax</h5>
                    <h6>$0.00</h6>
                  </li>
                  <li>
                    <h5>Total</h5>
                    <h6>$192.00</h6>
                  </li>
                  <li>
                    <h5>Total Paid</h5>
                    <h6>$92.00</h6>
                  </li>
                  <li>
                    <h5>Total</h5>
                    <h6>$192.00</h6>
                  </li>
                </ul>
              </div>
              <div className="terms-condition">
                <h2>Terms &amp; Conditions</h2>
                <p className="p-0">
                  The products/services listed in this invoice will be
                  delivered/provided as per the specifications and schedule
                  detailed in the invoice or as agreed upon by both parties in
                  previous communications.
                </p>
              </div>
              <hr />
              <div className="details-propsal">
                <h4>Transactions</h4>
              </div>
              <div className="table-responsive">
                <table className="table table-view">
                  <thead>
                    <tr>
                      <th>Payment</th>
                      <th>Payment Mode</th>
                      <th>Date</th>
                      <th>Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Web Design</td>
                      <td>Credit</td>
                      <td>13 May 2024</td>
                      <td>$196</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          {/* invoice */}
          {/* Contract */}
          <div className="sidebar-layout">
            <div className="sidebar-header">
              <h4>
                Estimation
                <span className="badge badge-purple-light ms-2">
                  #274738
                </span>{" "}
              </h4>
              <Link to="#" className="sidebar-close toggle-btn" onClick={() => dispatch(setActivityTogglePopup(!activityToggle))}>
                <i className="ti ti-x" />
             </Link>
            </div>
            <div className="toggle-body">
              <form action="#" className="toggle-height">
                <div className="pro-create">
                  <div className="tab-activity">
                    <ul className="nav">
                      <li>
                        <Link
                          to="#"
                          data-bs-toggle="tab"
                          data-bs-target="#activity"
                          className="active"
                        >
                          Contract Details
                       </Link>
                      </li>
                      <li>
                        <Link
                          to="#"
                          data-bs-toggle="tab"
                          data-bs-target="#comments"
                        >
                          Renewal Histroy
                       </Link>
                      </li>
                    </ul>
                  </div>
                  <div className="tab-content">
                    <div className="tab-pane show active" id="activity">
                      <div className="submit-button text-end">
                        <Link to="#" className="btn btn-light sidebar-close">
                          Download
                       </Link>
                        <Link to="#" className="btn btn-primary">
                          Sign Now
                       </Link>
                      </div>
                      <div className="toggle-content-view">
                        <h5>Web Design Contract</h5>
                        <p>
                          Where's the other side. The further off from England
                          the nearer is to find my way into a tree. By the use
                          of a well--' 'What did they draw?' said Alice, in a
                          sorrowful tone, 'I'm afraid I've offended it again
                        </p>
                      </div>
                      <div className="card">
                        <div className="card-body">
                          <div className="details-propsal">
                            <div className="row">
                              <div className="col-lg-6 col-12">
                                <div className="proposal-to">
                                  <div className="contact-type">
                                    <h6>Contract Value : $25,25,000</h6>
                                    <ul>
                                      <li>
                                        <h5>Type</h5>
                                        <h6>Contracts under Seal</h6>
                                      </li>
                                      <li>
                                        <h5>Start Date</h5>
                                        <h6>24 Apr 2024</h6>
                                      </li>
                                      <li>
                                        <h5>End Date</h5>
                                        <h6>26 Apr 2024</h6>
                                      </li>
                                      <li>
                                        <h5>Client</h5>
                                        <h6>Harbor View</h6>
                                      </li>
                                    </ul>
                                  </div>
                                </div>
                              </div>
                              <div className="col-lg-6 col-12">
                                <div className="proposal-to">
                                  <h3>CRMS</h3>
                                  <span>3338 Marcus Street </span>
                                  <span>Birmingham, AL 35211</span>
                                  <span>Phone : +1 98789 78788 </span>
                                  <span>Email : info@example.com</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="attached-div">
                        <h5>Attachment</h5>
                        <div className="attachement-download">
                          <div className="attachement-download-img">
                            <div className="attachement-download-icon">
                              <span>
                                <i className="ti ti-file-type-pdf" />
                              </span>
                            </div>
                            <div className="attachement-download-content">
                              <h5>Proposal_webdesign.pdf</h5>
                              <h6>15.2 MB</h6>
                            </div>
                          </div>
                          <div className="attachement-download-btn">
                            <Link to="#">
                              <i className="ti ti-download" />
                           </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="tab-pane fade" id="comments">
                      <div className="renewal-history">
                        <h4>Renewal History</h4>
                      </div>
                      <div className="renewal-content">
                        <div className="renewal-content-history">
                          <div className="contact-type">
                            <h6>Contract Value : $25,25,000</h6>
                            <ul>
                              <li>
                                <h5>Start Date</h5>
                                <h6>24 Apr 2024</h6>
                              </li>
                              <li>
                                <h5>End Date</h5>
                                <h6>24 Apr 2024</h6>
                              </li>
                            </ul>
                          </div>
                        </div>
                        <div className="renewal-content-btn">
                          <Link to="#" className="btn btn-primary add-popups"  onClick={() =>
                dispatch(setActivityTogglePopupTwo(!activityToggleTwo))
              }>
                            Renew Now
                         </Link>
                        </div>
                      </div>
                      <div className="renewal-content">
                        <div className="renewal-content-history">
                          <div className="contact-type">
                            <h6>Contract Value : $25,25,000</h6>
                            <ul>
                              <li>
                                <h5>Start Date</h5>
                                <h6>24 Apr 2024</h6>
                              </li>
                              <li>
                                <h5>End Date</h5>
                                <h6>24 Apr 2024</h6>
                              </li>
                            </ul>
                          </div>
                        </div>
                        <div className="renewal-content-btn">
                          <span className="badge badge-danger-light">
                            Renewed On : 24 Apr 2024
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
          {/* Contract */}
        </div>
        {/* /Add New Activity */}
        <div  className={
          activityToggleTwo ? "toggle-popup1 sidebar-popup" : "toggle-popup1"
        }>
          <div className="sidebar-layout">
            <div className="sidebar-header">
              <h4>Renew Contract</h4>
              <Link to="#" className="sidebar-close2 toggle-btn"  onClick={() =>
                dispatch(setActivityTogglePopupTwo(!activityToggleTwo))
              }>
                <i className="ti ti-x" />
             </Link>
            </div>
            <div className="toggle-body">
              <form  className="toggle-height">
                <div className="pro-create">
                  <div className="col-md-12">
                    <div className="mb-3">
                      <label className="col-form-label">
                        Start Date<span className="text-danger">*</span>
                      </label>
                      <div className="icon-form">
                        <span className="form-icon">
                          <i className="ti ti-calendar-check" />
                        </span>
                        <DatePicker
                          className="form-control datetimepicker"
                          selected={selectedDate}
                          onChange={handleDateChange}
                          dateFormat="13-05-2024"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="mb-3">
                      <label className="col-form-label">
                        End Date<span className="text-danger">*</span>
                      </label>
                      <div className="icon-form">
                        <span className="form-icon">
                          <i className="ti ti-calendar-check" />
                        </span>
                        <DatePicker
                          className="form-control datetimepicker"
                          selected={selectedDate}
                          onChange={handleDateChange}
                          dateFormat="13-05-2024"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="mb-3">
                      <label className="col-form-label">
                        Client<span className="text-danger">*</span>
                      </label>
                      <Select
                          options={client}
                          className="select"
                          placeholder="Harbor View"
                           classNamePrefix="react-select"
                        />
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="mb-3">
                      <label className="col-form-label">Contract Type</label>
                      <Select
                          options={contracttype}
                          className="select"
                          placeholder="Harbor View"
                         classNamePrefix="react-select"
                        />
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="mb-3">
                      <label className="col-form-label">
                        Contact Value<span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="$25,00,500"
                      />
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="mb-3">
                      <label className="col-form-label">
                        Attachment <span className="text-danger">*</span>
                      </label>
                      <div className="drag-attach">
                        <input type="file" />
                        <div className="img-upload">
                          <i className="ti ti-file-broken" />
                          Upload File
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="mb-3">
                      <label className="col-form-label">Uploaded Files</label>
                      <div className="upload-file upload-list">
                        <div>
                          <h6>tes.txt</h6>
                          <p>4.25 MB</p>
                        </div>
                        <Link to="#" className="text-danger">
                          <i className="ti ti-trash-x" />
                       </Link>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="submit-button text-end">
                  <Link to="#" className="btn btn-light sidebar-close2">
                    Cancel
                 </Link>
                  <button type="submit" className="btn btn-primary">
                    Create
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        {/* Edit Activity */}
        <div className={
          activityToggleThree ? "toggle-popup1 sidebar-popup" : "toggle-popup1"
        }>
          <div className="sidebar-layout">
            <div className="sidebar-header">
              <div>
                <h4 className="mb-1">We scheduled a meeting for next week</h4>
                <p>Created At: September 28, 2023 01:21 - Hendry</p>
              </div>
              <Link to="#" className="sidebar-close1 toggle-btn">
                <i className="ti ti-x" />
             </Link>
            </div>
            <div className="toggle-body">
              <form  className="toggle-height">
                <div className="pro-create">
                  <div className="tab-activity">
                    <ul className="nav">
                      <li>
                        <Link
                          to="#"
                          data-bs-toggle="tab"
                          data-bs-target="#activity"
                          className="active"
                        >
                          Activity
                       </Link>
                      </li>
                      <li>
                        <Link
                          to="#"
                          data-bs-toggle="tab"
                          data-bs-target="#comments"
                        >
                          Comments<span>1</span>
                       </Link>
                      </li>
                    </ul>
                  </div>
                  <div className="tab-content">
                    <div className="tab-pane fade" id="comments">
                      <div className="comment-wrap">
                        <h6>
                          The best way to get a project done faster is to start
                          sooner. A goal without a timeline is just a dream.The
                          goal you set must be challenging. At the same time, it
                          should be realistic and attainable, not impossible to
                          reach.
                        </h6>
                        <p>
                          Commented by <span>Aeron</span> on 15 Sep 2023, 11:15
                          pm
                        </p>
                      </div>
                    </div>
                    <div className="tab-pane show active" id="activity">
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
                              Activity Type{" "}
                              <span className="text-danger">*</span>
                            </label>
                            <ul className="radio-activity">
                              <li>
                                <div className="active-type">
                                  <input
                                    type="radio"
                                    id="call1"
                                    name="status"
                                  
                                  />
                                  <label htmlFor="call1">
                                    <i className="ti ti-phone" />
                                    Calls
                                  </label>
                                </div>
                              </li>
                              <li>
                                <div className="active-type">
                                  <input
                                    type="radio"
                                    id="mail1"
                                    name="status"
                                  />
                                  <label htmlFor="mail1">
                                    <i className="ti ti-mail" />
                                    Email
                                  </label>
                                </div>
                              </li>
                              <li>
                                <div className="active-type">
                                  <input
                                    type="radio"
                                    id="task1"
                                    name="status"
                                  />
                                  <label htmlFor="task1">
                                    <i className="ti ti-subtask" />
                                    Task
                                  </label>
                                </div>
                              </li>
                              <li>
                                <div className="active-type">
                                  <input
                                    type="radio"
                                    id="shares1"
                                    name="status"
                                  />
                                  <label htmlFor="shares1">
                                    <i className="ti ti-user-share" />
                                    Meeting
                                  </label>
                                </div>
                              </li>
                            </ul>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <label className="col-form-label">
                            Due Date <span className="text-danger">*</span>
                          </label>
                          <div className="mb-3 icon-form">
                            <span className="form-icon">
                              <i className="ti ti-calendar-check" />
                            </span>
                            <DatePicker
                          className="form-control datetimepicker"
                          selected={selectedDate}
                          onChange={handleDateChange}
                          dateFormat="dd-MM-yyyy"
                        />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <label className="col-form-label">
                            Time <span className="text-danger">*</span>
                          </label>
                          <div className="mb-3 icon-form">
                            <span className="form-icon">
                              <i className="ti ti-clock-hour-10" />
                            </span>
                            <DatePicker
                          className="form-control datetimepicker"
                          selected={selectedDate}
                          onChange={handleDateChange}
                          dateFormat="dd-MM-yyyy"
                        />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <label className="col-form-label">
                            Reminder <span className="text-danger">*</span>
                          </label>
                          <div className="mb-3 icon-form">
                            <span className="form-icon">
                              <i className="ti ti-bell-ringing" />
                            </span>
                            <input type="text" className="form-control" />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="d-flex align-items-center">
                            <div className="mb-3 w-100">
                              <label className="col-form-label">&nbsp;</label>
                              <select className="select">
                                <option>Select</option>
                                <option>Minutes</option>
                                <option>Hours</option>
                              </select>
                            </div>
                            <div className="mb-3 time-text">
                              <label className="col-form-label">&nbsp;</label>
                              <p>Before Due</p>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="mb-3">
                            <label className="col-form-label">
                              Owner <span className="text-danger">*</span>
                            </label>
                            <select className="select">
                              <option>Select</option>
                              <option>Hendry</option>
                              <option>Bradtke</option>
                              <option>Sally</option>
                            </select>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="mb-3">
                            <label className="col-form-label">
                              Guests <span className="text-danger">*</span>
                            </label>
                            <select
                              className="multiple-img"
                             
                            >
                              <option
                                data-image="assets/img/profiles/avatar-19.jpg"
                               
                              >
                                Darlee Robertson
                              </option>
                              <option data-image="assets/img/profiles/avatar-20.jpg">
                                Sharon Roy
                              </option>
                              <option data-image="assets/img/profiles/avatar-21.jpg">
                                Vaughan
                              </option>
                              <option data-image="assets/img/profiles/avatar-23.jpg">
                                Jessica
                              </option>
                              <option data-image="assets/img/profiles/avatar-16.jpg">
                                Carol Thomas
                              </option>
                            </select>
                          </div>
                        </div>
                        <div className="col-md-12">
                          <div className="mb-3">
                            <label className="col-form-label">
                              Description <span className="text-danger">*</span>
                            </label>
                            <div className="summernote" />
                          </div>
                          <div className="mb-3">
                            <div className="d-flex align-items-center justify-content-between">
                              <label className="col-form-label">Deals</label>
                              <Link
                                to="#"
                                className="label-add"
                                data-bs-toggle="modal"
                                data-bs-target="#add_deal"
                              >
                                <i className="ti ti-square-rounded-plus" />
                                Add New
                             </Link>
                            </div>
                            <select className="select">
                              <option>Select</option>
                              <option>Collins</option>
                              <option>Konopelski </option>
                              <option>Adams</option>
                            </select>
                          </div>
                          <div className="mb-3">
                            <div className="d-flex align-items-center justify-content-between">
                              <label className="col-form-label">Contacts</label>
                              <Link
                                to="#"
                                className="label-add"
                                data-bs-toggle="modal"
                                data-bs-target="#add_contacts"
                              >
                                <i className="ti ti-square-rounded-plus" />
                                Add New
                             </Link>
                            </div>
                            <select className="select">
                              <option>Select</option>
                              <option>Darlee Robertson</option>
                              <option>Sharon Roy</option>
                              <option>Jessica</option>
                            </select>
                          </div>
                          <div className="mb-3">
                            <div className="d-flex align-items-center justify-content-between">
                              <label className="col-form-label">
                                Companies
                              </label>
                              <Link
                                to="#"
                                className="label-add"
                                data-bs-toggle="modal"
                                data-bs-target="#add_company"
                              >
                                <i className="ti ti-square-rounded-plus" />
                                Add New
                             </Link>
                            </div>
                            <select className="select">
                              <option>Select</option>
                              <option>NovaWave LLC</option>
                              <option>Silver Hawk</option>
                              <option>Harbor View</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="submit-button text-end">
                  <Link to="#" className="btn btn-light sidebar-close1">
                    Cancel
                 </Link>
                  <button type="submit" className="btn btn-primary">
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        {/* /Edit Activity */}
        {/* Delete Activity */}
        <div
          className="modal custom-modal fade"
          id="delete_activity"
          role="dialog"
        >
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
                  <div className="success-popup-icon">
                    <i className="ti ti-trash-x" />
                  </div>
                  <h3>Remove Activity?</h3>
                  <p className="del-info">
                    Are you sure you want to remove activity you selected.
                  </p>
                  <div className="col-lg-12 text-center modal-btn">
                    <Link
                      to="#"
                      className="btn btn-light"
                      data-bs-dismiss="modal"
                    >
                      Cancel
                   </Link>
                    <Link to={route.activities} className="btn btn-danger">
                      Yes, Delete it
                   </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* /Delete Activity */}
        {/* Add Contacts */}
        <div
          className="modal custom-modal fade"
          id="add_contacts"
          role="dialog"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add Contacts</h5>
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
                  <div className="mb-3 icon-form">
                    <span className="form-icon">
                      <i className="ti ti-search" />
                    </span>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Search"
                    />
                  </div>
                  <div className="access-wrap">
                    <ul>
                      <li className="select-people-checkbox">
                        <label className="checkboxs">
                          <input type="checkbox" />
                          <span className="checkmarks" />
                          <span className="people-profile">
                            <ImageWithBasePath
                              src="assets/img/profiles/avatar-19.jpg"
                              alt=""
                            />
                            <Link to="#">Darlee Robertson</Link>
                          </span>
                        </label>
                      </li>
                      <li className="select-people-checkbox">
                        <label className="checkboxs">
                          <input type="checkbox" />
                          <span className="checkmarks" />
                          <span className="people-profile">
                            <ImageWithBasePath
                              src="assets/img/profiles/avatar-20.jpg"
                              alt=""
                            />
                            <Link to="#">Sharon Roy</Link>
                          </span>
                        </label>
                      </li>
                      <li className="select-people-checkbox">
                        <label className="checkboxs">
                          <input type="checkbox" />
                          <span className="checkmarks" />
                          <span className="people-profile">
                            <ImageWithBasePath
                              src="assets/img/profiles/avatar-21.jpg"
                              alt=""
                            />
                            <Link to="#">Vaughan</Link>
                          </span>
                        </label>
                      </li>
                      <li className="select-people-checkbox">
                        <label className="checkboxs">
                          <input type="checkbox" />
                          <span className="checkmarks" />
                          <span className="people-profile">
                            <ImageWithBasePath
                              src="assets/img/profiles/avatar-01.jpg"
                              alt=""
                            />
                            <Link to="#">Jessica</Link>
                          </span>
                        </label>
                      </li>
                      <li className="select-people-checkbox">
                        <label className="checkboxs">
                          <input type="checkbox" />
                          <span className="checkmarks" />
                          <span className="people-profile">
                            <ImageWithBasePath
                              src="assets/img/profiles/avatar-16.jpg"
                              alt=""
                            />
                            <Link to="#">Carol Thomas</Link>
                          </span>
                        </label>
                      </li>
                      <li className="select-people-checkbox">
                        <label className="checkboxs">
                          <input type="checkbox" />
                          <span className="checkmarks" />
                          <span className="people-profile">
                            <ImageWithBasePath
                              src="assets/img/profiles/avatar-22.jpg"
                              alt=""
                            />
                            <Link to="#">Dawn Mercha</Link>
                          </span>
                        </label>
                      </li>
                    </ul>
                  </div>
                  <div className="modal-btn text-end">
                    <Link
                      to="#"
                      className="btn btn-light"
                      data-bs-dismiss="modal"
                    >
                      Cancel
                   </Link>
                    <button type="submit" className="btn btn-primary">
                      Confirm
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        {/* /Add Contacts */}
        {/* Add Deals */}
        <div className="modal custom-modal fade" id="add_deal" role="dialog">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add Deals</h5>
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
                  <div className="mb-3 icon-form">
                    <span className="form-icon">
                      <i className="ti ti-search" />
                    </span>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Search"
                    />
                  </div>
                  <div className="access-wrap">
                    <ul>
                      <li className="select-people-checkbox">
                        <label className="checkboxs">
                          <input type="checkbox" />
                          <span className="checkmarks" />
                          <span className="people-profile">
                            <Link to="#">Collins</Link>
                          </span>
                        </label>
                      </li>
                      <li className="select-people-checkbox">
                        <label className="checkboxs">
                          <input type="checkbox" />
                          <span className="checkmarks" />
                          <span className="people-profile">
                            <Link to="#">Konopelski</Link>
                          </span>
                        </label>
                      </li>
                      <li className="select-people-checkbox">
                        <label className="checkboxs">
                          <input type="checkbox" />
                          <span className="checkmarks" />
                          <span className="people-profile">
                            <Link to="#">Adams</Link>
                          </span>
                        </label>
                      </li>
                      <li className="select-people-checkbox">
                        <label className="checkboxs">
                          <input type="checkbox" />
                          <span className="checkmarks" />
                          <span className="people-profile">
                            <Link to="#">Schumm</Link>
                          </span>
                        </label>
                      </li>
                      <li className="select-people-checkbox">
                        <label className="checkboxs">
                          <input type="checkbox" />
                          <span className="checkmarks" />
                          <span className="people-profile">
                            <Link to="#">Wisozk</Link>
                          </span>
                        </label>
                      </li>
                      <li className="select-people-checkbox">
                        <label className="checkboxs">
                          <input type="checkbox" />
                          <span className="checkmarks" />
                          <span className="people-profile">
                            <Link to="#">Dawn Mercha</Link>
                          </span>
                        </label>
                      </li>
                    </ul>
                  </div>
                  <div className="modal-btn text-end">
                    <Link
                      to="#"
                      className="btn btn-light"
                      data-bs-dismiss="modal"
                    >
                      Cancel
                   </Link>
                    <button type="submit" className="btn btn-primary">
                      Confirm
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        {/* /Add Deals */}
        {/* Add Company */}
        <div className="modal custom-modal fade" id="add_company" role="dialog">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add Company</h5>
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
                  <div className="mb-3 icon-form">
                    <span className="form-icon">
                      <i className="ti ti-search" />
                    </span>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Search"
                    />
                  </div>
                  <div className="access-wrap">
                    <ul>
                      <li className="select-people-checkbox">
                        <label className="checkboxs">
                          <input type="checkbox" />
                          <span className="checkmarks" />
                          <span className="people-profile">
                            <ImageWithBasePath
                              src="assets/img/icons/company-icon-01.svg"
                              alt=""
                            />
                            <Link to="#">NovaWave LLC</Link>
                          </span>
                        </label>
                      </li>
                      <li className="select-people-checkbox">
                        <label className="checkboxs">
                          <input type="checkbox" />
                          <span className="checkmarks" />
                          <span className="people-profile">
                            <ImageWithBasePath
                              src="assets/img/icons/company-icon-02.svg"
                              alt=""
                            />
                            <Link to="#">BlueSky Industries</Link>
                          </span>
                        </label>
                      </li>
                      <li className="select-people-checkbox">
                        <label className="checkboxs">
                          <input type="checkbox" />
                          <span className="checkmarks" />
                          <span className="people-profile">
                            <ImageWithBasePath
                              src="assets/img/icons/company-icon-03.svg"
                              alt=""
                            />
                            <Link to="#">Silver Hawk</Link>
                          </span>
                        </label>
                      </li>
                      <li className="select-people-checkbox">
                        <label className="checkboxs">
                          <input type="checkbox" />
                          <span className="checkmarks" />
                          <span className="people-profile">
                            <ImageWithBasePath
                              src="assets/img/icons/company-icon-04.svg"
                              alt=""
                            />
                            <Link to="#">Summit Peak</Link>
                          </span>
                        </label>
                      </li>
                      <li className="select-people-checkbox">
                        <label className="checkboxs">
                          <input type="checkbox" />
                          <span className="checkmarks" />
                          <span className="people-profile">
                            <ImageWithBasePath
                              src="assets/img/icons/company-icon-05.svg"
                              alt=""
                            />
                            <Link to="#">RiverStone Ventur</Link>
                          </span>
                        </label>
                      </li>
                      <li className="select-people-checkbox">
                        <label className="checkboxs">
                          <input type="checkbox" />
                          <span className="checkmarks" />
                          <span className="people-profile">
                            <ImageWithBasePath
                              src="assets/img/icons/company-icon-06.svg"
                              alt=""
                            />
                            <Link to="#">Bright Bridge Grp</Link>
                          </span>
                        </label>
                      </li>
                    </ul>
                  </div>
                  <div className="modal-btn text-end">
                    <Link
                      to="#"
                      className="btn btn-light"
                      data-bs-dismiss="modal"
                    >
                      Cancel
                   </Link>
                    <button type="submit" className="btn btn-primary">
                      Confirm
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        {/* /Add Company */}
      </>
    </div>
  );
};

export default ProposalsView;
