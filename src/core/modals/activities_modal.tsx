import React from "react";
import { Link } from "react-router-dom";
import Select from "react-select";
import { useSelector, useDispatch } from "react-redux";
import {
  setActivityTogglePopup,
  setActivityTogglePopupTwo,
} from "../data/redux/commonSlice";
import DefaultEditor from "react-simple-wysiwyg";
import { all_routes } from "../../feature-module/router/all_routes";
import { TimePicker } from "antd";
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import ImageWithBasePath from "../common/imageWithBasePath";

const route = all_routes;
interface OptionType {
  value: string;
  label: string;
  image: string;
}

const ActivitiesModal = () => {
  dayjs.extend(customParseFormat);
  const onChange = (time: Dayjs, timeString: any) => {
    console.log(time, timeString);
  };

  const options: OptionType[] = [
    {
      value: "Darlee Robertson",
      label: "Darlee Robertson",
      image: "assets/img/profiles/avatar-19.jpg",
    },
    {
      value: "Sharon Roy",
      label: "Sharon Roy",
      image: "assets/img/profiles/avatar-20.jpg",
    },
    {
      value: "Vaughan",
      label: "Vaughan",
      image: "assets/img/profiles/avatar-21.jpg",
    },
    {
      value: "Jessica",
      label: "Jessica",
      image: "assets/img/profiles/avatar-23.jpg",
    },
    {
      value: "Carol Thomas",
      label: "Carol Thomas",
      image: "assets/img/profiles/avatar-16.jpg",
    },
  ];

  const activityToggle = useSelector(
    (state: any) => state?.activityTogglePopup
  );
  const activityToggleTwo = useSelector(
    (state: any) => state?.activityTogglePopupTwo
  );
  const dispatch = useDispatch();

  const options1 = [
    { value: "select", label: "Select" },
    { value: "minutes", label: "Minutes" },
    { value: "hours", label: "Hours" },
  ];

  const options2 = [
    { value: "select", label: "Select" },
    { value: "hendry", label: "Hendry" },
    { value: "bradtke", label: "Bradtke" },
    { value: "sally", label: "Sally" },
  ];

  const options3 = [
    { value: "select", label: "Select" },
    { value: "collins", label: "Collins" },
    { value: "konopelski", label: "Konopelski" },
    { value: "adams", label: "Adams" },
  ];

  const options4 = [
    { value: "select", label: "Select" },
    { value: "novawave", label: "NovaWave LLC" },
    { value: "silverhawk", label: "SilverHawk" },
    { value: "harborview", label: "HarborView" },
  ];

  return (
    <>
    {/* Add New Activity */}
    <div
      className="offcanvas offcanvas-end offcanvas-large"
      tabIndex={-1}
      id="offcanvas_add"
    >
      <div className="offcanvas-header border-bottom">
        <h4>Add New Activity </h4>
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
                    Title <span className="text-danger">*</span>
                  </label>
                  <input type="text" className="form-control" />
                </div>
              </div>
              <div className="col-md-12">
                <div className="mb-3">
                  <label className="col-form-label">
                    Activity Type <span className="text-danger">*</span>
                  </label>
                  <ul className="radio-activity">
                    <li>
                      <div className="active-type">
                        <input
                          type="radio"
                          id="call"
                          name="status"
                          defaultChecked
                        />
                        <label htmlFor="call">
                          <i className="ti ti-phone" />
                          Calls
                        </label>
                      </div>
                    </li>
                    <li>
                      <div className="active-type">
                        <input type="radio" id="mail" name="status" />
                        <label htmlFor="mail">
                          <i className="ti ti-mail" />
                          Email
                        </label>
                      </div>
                    </li>
                    <li>
                      <div className="active-type">
                        <input type="radio" id="task" name="status" />
                        <label htmlFor="task">
                          <i className="ti ti-subtask" />
                          Task
                        </label>
                      </div>
                    </li>
                    <li>
                      <div className="active-type">
                        <input type="radio" id="shares" name="status" />
                        <label htmlFor="shares">
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
                  <input type="text" className="form-control datetimepicker" />
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
                  <TimePicker
                        placeholder="Select Time"
                        className="form-control datetimepicker-time"
                        onChange={onChange}
                        defaultOpenValue={dayjs("00:00:00", "HH:mm:ss")}
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
                    <Select className="select" options={options1}  classNamePrefix="react-select"/>
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
                  <Select className="select" options={options2}  classNamePrefix="react-select"/>
                </div>
              </div>
              <div className="col-md-6">
                <div className="mb-3">
                  <label className="col-form-label">
                    Guests <span className="text-danger">*</span>
                  </label>
                  <Select
                        options={options}
                        isMulti
                        getOptionLabel={(option) =>
                          `${option.label} (${option.value})`
                        }
                        getOptionValue={(option) => option.value}
                      />
                </div>
              </div>
              <div className="col-md-12">
                <div className="mb-3">
                  <label className="col-form-label">
                    Description <span className="text-danger">*</span>
                  </label>
                  <DefaultEditor className="summernote" />
                </div>
                <div className="mb-3">
                  <div className="d-flex align-items-center justify-content-between">
                    <label className="col-form-label">Deals</label>
                   
                  </div>
                  <Select className="select" options={options3}  classNamePrefix="react-select"/>
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
                  <Select className="select" options={options4}  classNamePrefix="react-select"/>
                </div>
                <div className="mb-3">
                  <div className="d-flex align-items-center justify-content-between">
                    <label className="col-form-label">Companies</label>
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
                  <Select className="select" options={options4}  classNamePrefix="react-select"/>
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
            <button type="button" className="btn btn-primary">
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
    {/* /Add New Activity */}
    <>
  {/* Add Contacts */}
  <div className="modal custom-modal fade" id="add_contacts" role="dialog">
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
            <div className="mb-2 icon-form">
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
                      <ImageWithBasePath src="assets/img/profiles/avatar-19.jpg" alt="" />
                      <Link to="#">Darlee Robertson</Link>
                    </span>
                  </label>
                </li>
                <li className="select-people-checkbox">
                  <label className="checkboxs">
                    <input type="checkbox" />
                    <span className="checkmarks" />
                    <span className="people-profile">
                      <ImageWithBasePath src="assets/img/profiles/avatar-20.jpg" alt="" />
                      <Link to="#">Sharon Roy</Link>
                    </span>
                  </label>
                </li>
                <li className="select-people-checkbox">
                  <label className="checkboxs">
                    <input type="checkbox" />
                    <span className="checkmarks" />
                    <span className="people-profile">
                      <ImageWithBasePath src="assets/img/profiles/avatar-21.jpg" alt="" />
                      <Link to="#">Vaughan</Link>
                    </span>
                  </label>
                </li>
                <li className="select-people-checkbox">
                  <label className="checkboxs">
                    <input type="checkbox" />
                    <span className="checkmarks" />
                    <span className="people-profile">
                      <ImageWithBasePath src="assets/img/profiles/avatar-01.jpg" alt="" />
                      <Link to="#">Jessica</Link>
                    </span>
                  </label>
                </li>
                <li className="select-people-checkbox">
                  <label className="checkboxs">
                    <input type="checkbox" />
                    <span className="checkmarks" />
                    <span className="people-profile">
                      <ImageWithBasePath src="assets/img/profiles/avatar-16.jpg" alt="" />
                      <Link to="#">Carol Thomas</Link>
                    </span>
                  </label>
                </li>
                <li className="select-people-checkbox">
                  <label className="checkboxs">
                    <input type="checkbox" />
                    <span className="checkmarks" />
                    <span className="people-profile">
                      <ImageWithBasePath src="assets/img/profiles/avatar-22.jpg" alt="" />
                      <Link to="#">Dawn Mercha</Link>
                    </span>
                  </label>
                </li>
              </ul>
            </div>
            <div className="modal-btn text-end">
              <Link to="#" className="btn btn-light" data-bs-dismiss="modal">
                Cancel
              </Link>
              <button type="button"  data-bs-dismiss="modal" className="btn btn-primary">
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
            <div className="mb-2 icon-form">
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
              <Link to="#" className="btn btn-light" data-bs-dismiss="modal">
                Cancel
              </Link>
              <button type="button"  data-bs-dismiss="modal" className="btn btn-primary">
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
            <div className="mb-2 icon-form">
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
                      <ImageWithBasePath src="assets/img/icons/company-icon-01.svg" alt="" />
                      <Link to="#">NovaWave LLC</Link>
                    </span>
                  </label>
                </li>
                <li className="select-people-checkbox">
                  <label className="checkboxs">
                    <input type="checkbox" />
                    <span className="checkmarks" />
                    <span className="people-profile">
                      <ImageWithBasePath src="assets/img/icons/company-icon-02.svg" alt="" />
                      <Link to="#">BlueSky Industries</Link>
                    </span>
                  </label>
                </li>
                <li className="select-people-checkbox">
                  <label className="checkboxs">
                    <input type="checkbox" />
                    <span className="checkmarks" />
                    <span className="people-profile">
                      <ImageWithBasePath src="assets/img/icons/company-icon-03.svg" alt="" />
                      <Link to="#">Silver Hawk</Link>
                    </span>
                  </label>
                </li>
                <li className="select-people-checkbox">
                  <label className="checkboxs">
                    <input type="checkbox" />
                    <span className="checkmarks" />
                    <span className="people-profile">
                      <ImageWithBasePath src="assets/img/icons/company-icon-04.svg" alt="" />
                      <Link to="#">Summit Peak</Link>
                    </span>
                  </label>
                </li>
                <li className="select-people-checkbox">
                  <label className="checkboxs">
                    <input type="checkbox" />
                    <span className="checkmarks" />
                    <span className="people-profile">
                      <ImageWithBasePath src="assets/img/icons/company-icon-05.svg" alt="" />
                      <Link to="#">RiverStone Ventur</Link>
                    </span>
                  </label>
                </li>
                <li className="select-people-checkbox">
                  <label className="checkboxs">
                    <input type="checkbox" />
                    <span className="checkmarks" />
                    <span className="people-profile">
                      <ImageWithBasePath src="assets/img/icons/company-icon-06.svg" alt="" />
                      <Link to="#">Bright Bridge Grp</Link>
                    </span>
                  </label>
                </li>
              </ul>
            </div>
            <div className="modal-btn text-end">
              <Link to="#" className="btn btn-light" data-bs-dismiss="modal">
                Cancel
              </Link>
              <button type="button"  data-bs-dismiss="modal" className="btn btn-primary">
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
<>
  {/* Edit Activity */}
  <div
    className="offcanvas offcanvas-end offcanvas-large"
    tabIndex={-1}
    id="offcanvas_edit"
  >
    <div className="offcanvas-header border-bottom">
      <div>
        <h4 className="mb-2">We scheduled a meeting for next week</h4>
        <p>
          Commented by <span>Aeron</span> on 15 Sep 2023, 11:15 pm
        </p>
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
    <div className="offcanvas-body">
      <form >
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
                <Link to="#" data-bs-toggle="tab" data-bs-target="#comments">
                  Comments<span>1</span>
                </Link>
              </li>
            </ul>
          </div>
          <div className="tab-content">
            <div className="tab-pane fade" id="comments">
              <div className="comment-wrap mb-4">
                <h6>
                  The best way to get a project done faster is to start sooner.
                  A goal without a timeline is just a dream.The goal you set
                  must be challenging. At the same time, it should be realistic
                  and attainable, not impossible to reach.
                </h6>
                <p>
                  Commented by <span>Aeron</span> on 15 Sep 2023, 11:15 pm
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
                      Activity Type <span className="text-danger">*</span>
                    </label>
                    <ul className="radio-activity">
                      <li>
                        <div className="active-type">
                          <input
                            type="radio"
                            id="call2"
                            name="status"
                            defaultChecked
                          />
                          <label htmlFor="call2">
                            <i className="ti ti-phone" />
                            Calls
                          </label>
                        </div>
                      </li>
                      <li>
                        <div className="active-type">
                          <input type="radio" id="mail2" name="status" />
                          <label htmlFor="mail2">
                            <i className="ti ti-mail" />
                            Email
                          </label>
                        </div>
                      </li>
                      <li>
                        <div className="active-type">
                          <input type="radio" id="task2" name="status" />
                          <label htmlFor="task2">
                            <i className="ti ti-subtask" />
                            Task
                          </label>
                        </div>
                      </li>
                      <li>
                        <div className="active-type">
                          <input type="radio" id="shares2" name="status" />
                          <label htmlFor="shares2">
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
                    <input
                      type="text"
                      className="form-control datetimepicker"
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
                    <TimePicker
                        placeholder="Select Time"
                        className="form-control datetimepicker-time"
                        onChange={onChange}
                        defaultOpenValue={dayjs("00:00:00", "HH:mm:ss")}/>
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
                      <Select className="select" options={options1}  classNamePrefix="react-select"/>
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
                    <Select className="select" options={options2}  classNamePrefix="react-select"/>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="col-form-label">
                      Guests <span className="text-danger">*</span>
                    </label>
                    <Select
                            options={options}
                            isMulti
                            getOptionLabel={(option) =>
                              `${option.label} (${option.value})`
                            }
                            getOptionValue={(option) => option.value}
                          />
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="mb-3">
                    <label className="col-form-label">
                      Description <span className="text-danger">*</span>
                    </label>
                    <DefaultEditor className="summernote" />
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
                    <Select className="select" options={options3}  classNamePrefix="react-select"/>
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
                    <Select className="select" options={options3}  classNamePrefix="react-select"/>
                  </div>
                  <div className="mb-3">
                    <div className="d-flex align-items-center justify-content-between">
                      <label className="col-form-label">Companies</label>
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
                    <Select className="select" options={options4}  classNamePrefix="react-select"/>
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
          <button type="button" className="btn btn-primary">
            Save Changes
          </button>
        </div>
      </form>
    </div>
  </div>
  {/* /Edit Activity */}
  {/* Delete Activity */}
  <div className="modal fade" id="delete_activity" role="dialog">
    <div className="modal-dialog modal-dialog-centered">
      <div className="modal-content">
        <div className="modal-body">
          <div className="text-center">
            <div className="avatar avatar-xl bg-danger-light rounded-circle mb-3">
              <i className="ti ti-trash-x fs-36 text-danger" />
            </div>
            <h4 className="mb-2">Remove Activity?</h4>
            <p className="mb-0">
              Are you sure you want to remove <br /> activity you selected.
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
  {/* /Delete Activity */}
</>

  </>
  
  );
};

export default ActivitiesModal;
