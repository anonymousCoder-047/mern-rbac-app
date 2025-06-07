import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { all_routes } from "../../router/all_routes";
import DefaultEditor from "react-simple-wysiwyg";
import CollapseHeader from "../../../core/common/collapse-header";
import _ from "lodash";
import moment from "moment";
import PrivateServer from "../../../helper/PrivateServer";
import { endpoints } from "../../../helper/endpoints";

const CompanyDetails = () => {
  const route = all_routes;
  const location = useLocation();
  const [companyDetails, setCompanyDetails] = useState({
    totalData: 0,
    company_name: "",
    email: "",
    primary_phone: "",
    secondary_phone: "",
    companyId: "",
    website: "",
    description: "",
    street: "",
    country: "",
    state: "",
    city: "",
    code: "",
  });
  const [emailData, setEmailData] = useState({
    toEmail: "",
    ccEmail: "",
    bccEmail: "",
    subject: "",
    emailBody: ""
  })
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const [isEditor, setIsEditor] = useState(false);
  const [isEditor2, setIsEditor2] = useState(false);
  const [isEditor3, setIsEditor3] = useState(false);
  const [owner, setOwner] = useState(["Collab"]);
  const [selectedDate1, setSelectedDate1] = useState<Date | null>(new Date());

  const handleDateChange1 = (date: Date | null) => {
    setSelectedDate1(date);
  };

  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
  };
  const [selectedDate2, setSelectedDate2] = useState<Date | null>(new Date());
  const handleDateChange2 = (date: Date | null) => {
    setSelectedDate2(date);
  };
  const [selectedDate4, setSelectedDate4] = useState<Date | null>(new Date());
  const handleDateChange4 = (date: Date | null) => {
    setSelectedDate4(date);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setEmailData({ ...emailData, [name]: value });
  }

  const handleSendEmail = async () => {
    try {
      const { Contact } = endpoints;
      const response = await PrivateServer.postData(Contact.sendMail, emailData);

      if(response) navigate(route.companies);
    } catch(err) {
      console.log("Error -- E:", err?.message);
    }
  }
  
  const handleDelete = async () => {
    try {
      const { Companies } = endpoints
      const response = await PrivateServer.deleteData(Companies.delete, companyDetails?.companyId);
      
      if(response) navigate(route.companies);
    } catch (err) {
      console.log("Error -- E:", err?.message);
    }
  }

  const handleClose = () => {
    setEmailData({
      toEmail: "",
      ccEmail: "",
      bccEmail: "",
      subject: "",
      emailBody: ""
    });
  }

  useEffect(() => {
    const { state:propState } = location;

    if(propState && !_.isEmpty(propState)) {
      console.log("location state parsed -- ", propState);
      setCompanyDetails({ ...companyDetails, ...propState });
    }
  }, [location?.state])

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
                  <div className="col-sm-4">
                    <h4 className="page-title">
                      Companies<span className="count-title">{companyDetails?.totalData}</span>
                    </h4>
                  </div>
                  <div className="col-sm-8 text-sm-end">
                    <div className="head-icons">
                      <CollapseHeader />
                    </div>
                  </div>
                </div>
              </div>
              {/* /Page Header */}
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              {/* Contact User */}
              <div className="contact-head">
                <div className="row align-items-center">
                  <div className="col-sm-6">
                    <ul className="contact-breadcrumb">
                      <li>
                        <Link to={route.companies}>
                          <i className="ti ti-arrow-narrow-left" />
                          Companies
                        </Link>
                      </li>
                      <li>{`${companyDetails?.company_name}`}</li>
                    </ul>
                  </div>
                  {/* <div className="col-sm-6 text-sm-end">
                    <div className="contact-pagination">
                      <p>1 of {companyDetails?.totalData}</p>
                      <ul>
                        <li>
                          <Link to={route.companyDetails}>
                            <i className="ti ti-chevron-left" />
                          </Link>
                        </li>
                        <li>
                          <Link to={route.companyDetails}>
                            <i className="ti ti-chevron-right" />
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div> */}
                </div>
              </div>
              <div className="card">
                <div className="card-body pb-2">
                  <div className="d-flex align-items-center justify-content-between flex-wrap">
                    <div className="d-flex align-items-center mb-2">
                      <div>
                        <h5 className="mb-1">{companyDetails?.company_name}</h5>
                        <p className="mb-2">{companyDetails?.city}, {companyDetails?.country}</p>
                      </div>
                    </div>
                    <div className="contacts-action">
                      <Link
                        to={route.contactList}
                        className="btn btn-danger"
                        data-bs-toggle="offcanvas"
                        data-bs-target="#offcanvas_add_2"
                      >
                        <i className="ti ti-circle-plus" />
                        Add Contact
                      </Link>
                      <Link
                        to="#"
                        className="btn btn-primary"
                        data-bs-toggle="modal"
                        data-bs-target="#add_compose"
                      >
                        <i className="ti ti-mail" />
                        Send Email
                      </Link>
                      <Link
                        to={route.companies}
                        className="btn-icon"
                        // data-bs-toggle="offcanvas"
                        // data-bs-target="#offcanvas_edit"
                      >
                        <i className="ti ti-edit-circle" />
                      </Link>
                      <div className="act-dropdown">
                        <Link
                          to="#"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        >
                          <i className="ti ti-dots-vertical" />
                        </Link>
                        <div className="dropdown-menu dropdown-menu-right">
                          <Link
                            className="dropdown-item"
                            to="#"
                            data-bs-toggle="modal"
                            data-bs-target="#delete_contact"
                            onClick={() => setOpenModal(true)}
                          >
                            <i className="ti ti-trash text-danger" />
                            Delete
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* /Contact User */}
            </div>
            {/* Contact Sidebar */}
            <div className="col-xl-3 theiaStickySidebar">
              <div className="card">
                <div className="card-body p-3">
                  <h6 className="mb-3 fw-semibold">Basic Information</h6>
                  <div className="mb-3">
                    <div className="d-flex align-items-center mb-3">
                      <span className="avatar avatar-xs bg-light-300 p-0 flex-shrink-0 rounded-circle text-dark me-2">
                        <i className="ti ti-mail" />
                      </span>
                      <p>{companyDetails?.email}</p>
                    </div>
                    <div className="d-flex align-items-center mb-3">
                      <span className="avatar avatar-xs bg-light-300 p-0 flex-shrink-0 rounded-circle text-dark me-2">
                        <i className="ti ti-phone" />
                      </span>
                      <p>{companyDetails?.primary_phone}</p>
                    </div>
                    <div className="d-flex align-items-center mb-3">
                      <span className="avatar avatar-xs bg-light-300 p-0 flex-shrink-0 rounded-circle text-dark me-2">
                        <i className="ti ti-map-pin" />
                      </span>
                      <p>{companyDetails?.secondary_phone}</p>
                    </div>
                    <div className="d-flex align-items-center mb-3">
                      <span className="avatar avatar-xs bg-light-300 p-0 flex-shrink-0 rounded-circle text-dark me-2">
                        <i className="ti ti-calendar-exclamation" />
                      </span>
                      <p>{companyDetails?.email}</p>
                    </div>
                  </div>
                  <hr />
                  <h6 className="mb-3 fw-semibold">Other Information</h6>
                  <ul>
                    <li className="row mb-3">
                      <span className="col-6">Code</span>
                      <span className="col-6">{companyDetails?.code}</span>
                    </li>
                    <li className="row mb-3">
                      <span className="col-6">State</span>
                      <span className="col-6">{companyDetails?.state}</span>
                    </li>
                    <li className="row mb-3">
                      <span className="col-6">City</span>
                      <span className="col-6">{companyDetails?.city}</span>
                    </li>
                    <li className="row mb-3">
                      <span className="col-6">Country</span>
                      <span className="col-6">{companyDetails?.country}</span>
                    </li>
                    <li className="row mb-3">
                      <span className="col-6">Comments</span>
                      <span className="col-6">{companyDetails?.description}</span>
                    </li>
                  </ul>
                  <hr />
                  <div className="d-flex align-items-center justify-content-between flex-wrap">
                    <h6 className="mb-3 fw-semibold">Company</h6>
                    <Link
                      to={route.companies}
                      className="link-purple mb-3"
                      data-bs-toggle="offcanvas"
                      data-bs-target="#offcanvas_add"
                    >
                      <i className="ti ti-circle-plus me-1" />
                      Add New
                    </Link>
                  </div>
                  <div className="mb-3">
                    <div className="d-flex align-items-center">
                      <div>
                        <h6 className="fw-medium mb-1">
                          {companyDetails?.company_name}{" "}
                          <i className="fa-solid fa-circle-check text-success" />
                        </h6>
                        <p>{companyDetails?.city}, {companyDetails?.country}</p>
                      </div>
                    </div>
                  </div>
                  <hr />
                  <h6 className="mb-3 fw-semibold">Settings</h6>
                  <div className="mb-0">
                    <Link
                      to="#"
                      className="d-block mb-0"
                      data-bs-toggle="modal"
                      data-bs-target="#delete_contact"
                      onClick={() => setOpenModal(true)}
                    >
                      <i className="ti ti-trash-x me-1" />
                      Delete Company
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            {/* /Contact Sidebar */}
          </div>
        </div>
      </div>
      {/* /Page Wrapper */}
      {/* Delete Contact */}
      <Modal className="modal fade" role="dialog" show={openModal} onHide={() => setOpenModal(false)} backdrop="static">
        <div className="modal-body">
          <div className="text-center">
            <div className="avatar avatar-xl bg-danger-light rounded-circle mb-3">
              <i className="ti ti-trash-x fs-36 text-danger" />
            </div>
            <h4 className="mb-2">Remove Company?</h4>
            <p className="mb-0">
              Are you sure you want to remove <br /> company you selected.
            </p>
            <div className="d-flex align-items-center justify-content-center mt-4">
              <Link
                to="#"
                className="btn btn-light me-2"
                data-bs-dismiss="modal"
                onClick={() => setOpenModal(false)}
              >
                Cancel
              </Link>
              <Link to={route.companies} onClick={handleDelete} className="btn btn-danger">
                Yes, Delete it
              </Link>
            </div>
          </div>
        </div>
      </Modal>
      {/* /Delete Contact */}
      {/* Create Deal */}
      <div
        className="modal custom-modal fade"
        id="create_success"
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
                <div className="success-popup-icon bg-light-blue">
                  <i className="ti ti-building" />
                </div>
                <h3>Deal Created Successfully!!!</h3>
                <p>View the details of deal, created</p>
                <div className="col-lg-12 text-center modal-btn">
                  <Link
                    to="#"
                    className="btn btn-light"
                    data-bs-dismiss="modal"
                  >
                    Cancel
                  </Link>
                  <Link
                    to={route.companyDetails}
                    state={{ ...companyDetails, totalData: companyDetails?.totalData }}
                    data-bs-dismiss="modal"
                    className="btn btn-primary"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* /Create Deal */}

      {/* Success Contact */}
      <div className="modal custom-modal fade" id="success_mail" role="dialog">
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
                  <i className="ti ti-mail-opened" />
                </div>
                <h3>Email Connected Successfully!!!</h3>
                <p>
                  Email Account is configured with “example@example.com”. Now
                  you can access email.
                </p>
                <div className="col-lg-12 text-center modal-btn">
                  <Link to={route.companyDetails} state={{ ...companyDetails, totalData: companyDetails?.totalData }} className="btn btn-primary">
                    Go to email
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* /Success Contact */}
      
      {/* Add Compose */}
      <div className="modal custom-modal fade" id="add_compose" role="dialog">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Add Compose</h5>
              <button
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <i className="ti ti-x" />
              </button>
            </div>
            <div className="modal-body">
              <form action="#">
                <div className="mb-3">
                  <input
                    value={emailData?.toEmail}
                    onChange={handleChange}
                    name="toEmail"
                    type="email"
                    placeholder="To"
                    className="form-control"
                  />
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <div className="mb-3">
                      <input
                        value={emailData?.ccEmail}
                        onChange={handleChange}
                        name="ccEmail"
                        type="email"
                        placeholder="Cc"
                        className="form-control"
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <input
                        value={emailData?.bccEmail}
                        onChange={handleChange}
                        name="bccEmail"
                        type="email"
                        placeholder="Bcc"
                        className="form-control"
                      />
                    </div>
                  </div>
                </div>
                <div className="mb-3">
                  <input
                    value={emailData?.subject}
                    onChange={handleChange}
                    name="subject"
                    type="text"
                    placeholder="Subject"
                    className="form-control"
                  />
                </div>
                <div className="mb-3">
                  <DefaultEditor className="summernote" name="emailBody" value={emailData?.emailBody} onChange={handleChange} />
                </div>
                <div className="mb-3">
                  <div className="text-center">
                    <button className="btn btn-primary" onClick={handleSendEmail}>
                      <span>Send</span>
                      <i className="fa-solid fa-paper-plane ms-1" />
                    </button>
                    <button className="btn btn-primary ms-1" type="button" onClick={handleClose}>
                      <span>Delete</span>{" "}
                      <i className="fa-regular fa-trash-can ms-1" />
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      {/* /Add Compose */}
    </>
  );
};

export default CompanyDetails;
