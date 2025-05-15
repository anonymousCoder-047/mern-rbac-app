import React, { useState } from "react";

import { Link } from "react-router-dom";
// import ImageWithBasePath from "../../../core/common/imageWithBasePath";
import DateRangePicker from "react-bootstrap-daterangepicker";
import Select from "react-select";
import { all_routes } from "../../router/all_routes";
import { useDispatch, useSelector } from "react-redux";
import CollapseHeader from "../../../core/common/collapse-header";
import Table from "../../../core/common/dataTable/index";
import { Modal } from "react-bootstrap";
import PrivateServer from "../../../helper/PrivateServer";
import { endpoints } from "../../../helper/endpoints";
import _ from "lodash";
import { DatePicker } from "antd";
import moment from "moment";

const Leads = () => {
  const [openModal, setOpenModal] = useState(false);
  const [openModal2, setOpenModal2] = useState(false);
  const [dealsData, setDealsData] = useState([]);
  const [dealsId, setDealsId] = useState("");
  const [formData, setFormData] = useState({
    opportunity_name: "",
    start_date: new Date(),
    updated_date: new Date(),
    contact_name: "",
    company_name: "",
    sr_type: "",
    product_category: "",
    closing_date: new Date(),
    stage: "",
    amount: "",
    team_leader: "",
    last_contact_date: new Date(),
    order_number: "",
    comments: "",
    dealsId: "",
  });
  const [contactData, setContactData] = useState([]);
  const [companyData, setCompanyData] = useState([]);
  const [teamData, setTeamData] = useState([]);
  const [stageData, setStageData] = useState([]);
  const [productData, setProductData] = useState([]);
  const addTogglePopupTwo = useSelector(
    (state: any) => state?.addTogglePopupTwo
  );
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
  };
  const [selectedDate1, setSelectedDate1] = useState<Date | null>(new Date());
  const handleDateChange1 = (date: Date | null) => {
    setSelectedDate1(date);
  };

  const dispatch = useDispatch();

  const activityToggle = useSelector(
    (state: any) => state?.activityTogglePopup
  );
  const activityToggleTwo = useSelector(
    (state: any) => state?.activityTogglePopupTwo
  );

  const route = all_routes;
  const [stars, setStars] = useState<{ [key: number]: boolean }>({});

  const initializeStarsState = () => {
    const starsState: { [key: number]: boolean } = {};
    dealsData.forEach((item, index) => {
      starsState[index] = false;
    });
    setStars(starsState);
  };

  const getDeals = async () => {
    try {
      const { Deals } = endpoints;
      const response = await PrivateServer.getData(Deals?.view)
  
      console.log("data -- ", response)
      if(response?.data) setDealsData(response?.data);
    } catch(error) {
      console.log("Error while getting deals -- E:", error?.message);
    }
  }

  const getContacts = async () => {
    try {
      const { Contact } = endpoints;
      const response = await PrivateServer.getData(Contact?.view)
  
      console.log("data -- ", response)
      if(response?.data) {
        const _data: any = [...new Set(response?.data?.map((x) => ({ label: x?.first_name + " " + x?.first_name, value: x?._id })))]  
        setContactData(_data);
      }
    } catch(error) {
      console.log("Error while getting sources -- E:", error?.message);
    }
  }

  const getTeams = async () => {
    try {
      const { Profile } = endpoints;
      const response = await PrivateServer.getData(Profile?.view)
  
      console.log("data -- ", response)
      if(response?.data) {
        const _data: any = [...new Set(response?.data?.map((x) => ({ label: x?.email, value: x?._id })))]  
        setTeamData(_data);
      }
    } catch(error) {
      console.log("Error while getting sources -- E:", error?.message);
    }
  }

  const getComapnies = async () => {
    try {
      const { Companies } = endpoints;
      const response = await PrivateServer.getData(Companies?.view)
  
      console.log("data -- ", response)
      if(response?.data) {
        const _data: any = [...new Set(response?.data?.map((x) => ({ label: x?.company_name, value: x?._id })))]  
        setCompanyData(_data);
      }
    } catch(error) {
      console.log("Error while getting sources -- E:", error?.message);
    }
  }

  const getStages = async () => {
    try {
      const { Pipeline } = endpoints;
      const response = await PrivateServer.getData(Pipeline?.view)
  
      console.log("data -- ", response)
      if(response?.data) {
        const _data: any = [...new Set(response?.data?.map((x) => ({ label: x?.pipeline_name, value: x?._id })))]  
        setStageData(_data);
      }
    } catch(error) {
      console.log("Error while getting sources -- E:", error?.message);
    }
  }

  const getProducts = async () => {
    try {
      const { Products } = endpoints;
      const response = await PrivateServer.getData(Products?.view)
  
      console.log("data -- ", response)
      if(response?.data) {
        const _data: any = [...new Set(response?.data?.map((x) => ({ label: x?.product_name, value: x?._id })))]  
        setProductData(_data);
      }
    } catch(error) {
      console.log("Error while getting sources -- E:", error?.message);
    }
  }

  // Call initializeStarsState once when the component mounts
  React.useEffect(() => {
    initializeStarsState();

    getDeals();
    getContacts();
    getTeams();
    getStages();
    getComapnies();
    getProducts();
  }, []);

  const handleStarToggle = (index: number) => {
    setStars((prevStars) => ({
      ...prevStars,
      [index]: !prevStars[index],
    }));
  };

  const handleClose = () => {
    setDealsId("")
    setFormData({
      opportunity_name: "",
      start_date: new Date(),
      updated_date: new Date(),
      contact_name: "",
      company_name: "",
      sr_type: "",
      product_category: "",
      closing_date: new Date(),
      stage: "",
      amount: "",
      team_leader: "",
      last_contact_date: new Date(),
      order_number: "",
      comments: "",
      dealsId: "",
    });
  }

  const handleChange = (e, type="", _name="") => {    
    if(type == "file") {
      const { name } = e.target;
      setFormData({ ...formData, [name]: e.target?.files[0] });
    }
    else if(type == "select") {
      setFormData({ ...formData, [_name]: e?.value });
    } else {
      const { name, value } = e.target; 
      setFormData({ ...formData, [name]: value });
    }
  }

  const handleDeleteDeals = async () => {
    try {
      const { Deals } = endpoints;
      const response = await PrivateServer?.deleteData(Deals?.delete, dealsId);
      if(response) getDeals();
    } catch(err) {
      console.log("Error while deleting deals -- E: ", err?.message);
    }
  }

  const handleEditDeals = (values) => {
    console.log("Edit deal clicked -- ", values);
    setFormData({ ...formData, ..._.omit(values, ["_id"]), dealsId: values?._id });
  }

  const handleAddOrUpdateDeals = async () => {
    try {
      const { Deals } = endpoints;
      const { status, data } = formData?.dealsId !== "" ? await PrivateServer?.patchData(Deals.patch, formData?.dealsId, formData) : await PrivateServer.postData(Deals.create, formData);

      if(status == 200) {
        if(formData?.dealsId == "") setFormData({ ...formData, dealsId: data?.data?._id })
        getDeals();
      }
    } catch(err) {
      console.log("Error while saving deals -- E: ", err?.message);
    }
  }

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
      dataIndex: "opportunity_name",
      render: (text: any, record: any) => (
        <h2 className="d-flex align-items-center">
          {/* <Link to={route.companyDetails}
            className="avatar avatar-sm border rounded p-1 me-2"
          >
            <img
              className="w-auto h-auto"
              src={record.image}
              alt="User Image"
            />
          </Link> */}
          <Link to={route.companyDetails}
            className="d-flex flex-column fw-medium"
          >
            {record.opportunity_name}
          </Link>
        </h2>
      ),
      sorter: (a: any, b: any) => a.opportunity_name.length - b.opportunity_name.length,
    },
    {
      title: "Start Date",
      dataIndex: "start_date",
      sorter: (a: any, b: any) => a.start_date.length - b.start_date.length,
    },
    {
      title: "Updated Date",
      dataIndex: "updated_date",
      sorter: (a: any, b: any) => a.updated_date.length - b.updated_date.length,
    },
    {
      title: "Amount",
      dataIndex: "amount",
      sorter: (a: any, b: any) => a.amount.length - b.amount.length,
    },
    {
      title: "SR Type",
      dataIndex: "sr_type",
      sorter: (a: any, b: any) => a.sr_type.length - b.sr_type.length,
    },
    {
      title: "Action",
      render: (text: string, record: any) => (
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
              className="dropdown-item"
              to="#"
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvas_edit"
              onClick={() => handleEditDeals(record)}
            >
              <i className="ti ti-edit text-blue" /> Edit
            </Link>
            <Link
              className="dropdown-item"
              to="#"
              data-bs-toggle="modal"
              data-bs-target="#delete_contact"
              onClick={() => setDealsId(record?._id)}
            >
              <i className="ti ti-trash text-danger" /> Delete
            </Link>
            <Link className="dropdown-item" to={route.companyDetails}><i className="ti ti-eye text-blue-light"></i> Preview</Link>
          </div>
        </div>
      ),
    },
  ];

  const initialSettings = {
    endDate: new Date("2020-08-11T12:30:00.000Z"),
    ranges: {
      "Last 30 Days": [
        new Date("2020-07-12T04:57:17.076Z"),
        new Date("2020-08-10T04:57:17.076Z"),
      ],
      "Last 7 Days": [
        new Date("2020-08-04T04:57:17.076Z"),
        new Date("2020-08-10T04:57:17.076Z"),
      ],
      "Last Month": [
        new Date("2020-06-30T18:30:00.000Z"),
        new Date("2020-07-31T18:29:59.999Z"),
      ],
      "This Month": [
        new Date("2020-07-31T18:30:00.000Z"),
        new Date("2020-08-31T18:29:59.999Z"),
      ],
      Today: [
        new Date("2020-08-10T04:57:17.076Z"),
        new Date("2020-08-10T04:57:17.076Z"),
      ],
      Yesterday: [
        new Date("2020-08-09T04:57:17.076Z"),
        new Date("2020-08-09T04:57:17.076Z"),
      ],
    },
    startDate: new Date("2020-08-04T04:57:17.076Z"), // Set "Last 7 Days" as default
    timePicker: false,
  };

  return (
    <>
      <div className="page-wrapper">
        <div className="content">
          <div className="row">
            <div className="col-md-12">
              {/* Page Header */}
              <div className="page-header">
                <div className="row align-items-center">
                  <div className="col-8">
                    <h4 className="page-title">
                      Leads<span className="count-title">{dealsData?.length}</span>
                    </h4>
                  </div>
                  <div className="col-4 text-end">
                    <div className="head-icons">
                      <CollapseHeader />
                    </div>
                  </div>
                </div>
              </div>
              {/* /Page Header */}
              <div className="card ">
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
                          placeholder="Search Companies"
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
                                <Link to="#" className="dropdown-item">
                                  <i className="ti ti-file-type-pdf text-danger me-1" />
                                  Export as PDF
                                </Link>
                              </li>
                              <li>
                                <Link to="#" className="dropdown-item">
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
                          Add Lead
                        </Link>
                      </div>
                    </div>
                  </div>
                  {/* /Search */}
                </div>

                <div className="card-body">
                  {/* Search */}

                  {/* /Search */}
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
                                Name
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
                      <div className="form-sorts dropdown me-2">
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
                      <div className="view-icons">
                        <Link to="#" className="active">
                          <i className="ti ti-list-tree" />
                        </Link>
                        <Link to={route.companiesGrid}>
                          <i className="ti ti-grid-dots" />
                        </Link>
                      </div>
                    </div>
                  </div>

                  {/* /Filter */}
                  {/* Contact List */}
                  <div className="table-responsive custom-table">
                    <Table dataSource={dealsData} columns={columns} />
                  </div>
                  <div className="row align-items-center">
                    <div className="col-md-6">
                      <div className="datatable-length" />
                    </div>
                    <div className="col-md-6">
                      <div className="datatable-paginate" />
                    </div>
                  </div>
                  {/* /Contact List */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="modal fade" id="delete_contact" role="dialog">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-body">
              <div className="text-center">
                <div className="avatar avatar-xl bg-danger-light rounded-circle mb-3">
                  <i className="ti ti-trash-x fs-36 text-danger" />
                </div>
                <h4 className="mb-2">Remove Lead?</h4>
                <p className="mb-0">
                  {formData?.opportunity_name}, Are you sure?
                </p>
                <div className="d-flex align-items-center justify-content-center mt-4">
                  <Link
                    to="#"
                    className="btn btn-light me-2"
                    data-bs-dismiss="modal"
                    onClick={handleClose}
                  >
                    Cancel
                  </Link>
                  <Link to="#" className="btn btn-danger" data-bs-dismiss="modal" onClick={handleDeleteDeals}>
                    Yes, Delete it
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add Company */}
      <div
        className="offcanvas offcanvas-end offcanvas-large"
        tabIndex={-1}
        id="offcanvas_add"
      >
        <div className="offcanvas-header border-bottom">
          <h5 className="fw-semibold">Add Lead</h5>
          <button
            type="button"
            className="btn-close custom-btn-close border p-1 me-0 d-flex align-items-center justify-content-center rounded-circle"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
            onClick={handleClose}
          >
            <i className="ti ti-x" />
          </button>
        </div>
        <div className="offcanvas-body">
          <form>
            <div className="accordion" id="main_accordion">
              {/* Basic Info */}
              <div className="accordion-item rounded mb-3">
                <div className="accordion-header">
                  <Link
                    to="#"
                    className="accordion-button accordion-custom-button bg-white rounded fw-medium text-dark"
                    data-bs-toggle="collapse"
                    data-bs-target="#basic"
                  >
                    <span className="avatar avatar-md rounded text-dark border me-2">
                      <i className="ti ti-user-plus fs-20" />
                    </span>
                    Lead Info
                  </Link>
                </div>
                <div
                  className="accordion-collapse collapse show"
                  id="basic"
                  data-bs-parent="#main_accordion"
                >
                  <div className="accordion-body border-top">
                    <div className="row">
                      <div className="col-md-12">
                        <div className="mb-3">
                          <label className="col-form-label">Order Number</label>
                          <input name="order_number" value={formData?.order_number} onChange={handleChange} type="text" className="form-control" />
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="mb-3">
                          <label className="col-form-label">Lead Name</label>
                          <input name="opportunity_name" value={formData?.opportunity_name} onChange={handleChange} type="text" className="form-control" />
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="mb-3">
                          <div className="d-flex justify-content-between align-items-center">
                            <label className="col-form-label">
                              Start Date <span className="text-danger">*</span>
                            </label>
                          </div>
                          {/* <input type="text" name="email" value={formData?.start_date} onChange={handleChange} className="form-control" />
                           */}
                          <DatePicker
                            className="form-control datetimepicker deals-details"
                            value={formData?.start_date ? moment(formData.start_date) : moment()}
                            onChange={(date) => setFormData({ ...formData, start_date: date?.toDate() })}
                            format="DD-MM-YYYY"
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="col-form-label">
                            Updated Date <span className="text-danger">*</span>
                          </label>
                          {/* <input type="text" name="primary_phone" value={formData?.primary_phone} onChange={handleChange} className="form-control" /> */}
                            
                          <DatePicker
                            className="form-control datetimepicker deals-details"
                            value={formData?.updated_date ? moment(formData.updated_date) : moment()}
                            onChange={(date) => setFormData({ ...formData, updated_date: date?.toDate() })}
                            format="DD-MM-YYYY"
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="col-form-label">Contact Name</label>
                          {/* <input type="text" name="secondary_phone" value={formData?.secondary_phone} onChange={handleChange} className="form-control" /> */}
                          <Select
                            name="source"
                            onChange={(value) => handleChange(value, "select", "contact_name")}
                            value={{ label: contactData?.find((x: any) => x?.value == formData?.contact_name)?.label, value: formData?.contact_name }}
                            className="select2" 
                            classNamePrefix="react-select"
                            options={contactData}
                            placeholder="Select an option"
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="col-form-label">
                            company Name <span className="text-danger">*</span>
                          </label>
                          {/* <input type="text" name="website" value={formData?.website} onChange={handleChange} className="form-control" /> */}
                          <Select
                            name="source"
                            onChange={(value) => handleChange(value, "select", "company_name")}
                            value={{ label: companyData?.find((x: any) => x?.value == formData?.company_name)?.label, value: formData?.company_name }}
                            className="select2" 
                            classNamePrefix="react-select"
                            options={companyData}
                            placeholder="Select an option"
                          />
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="mb-0">
                          <label className="col-form-label">
                            Comments <span className="text-danger">*</span>
                          </label>
                          <textarea
                            name="description" value={formData?.comments} onChange={handleChange}
                            className="form-control"
                            rows={5}
                            defaultValue={""}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* /Basic Info */}

              {/* Address Info */}
              <div className="accordion-item border-top rounded mb-3">
                <div className="accordion-header">
                  <Link
                    to="#"
                    className="accordion-button accordion-custom-button rounded bg-white fw-medium text-dark"
                    data-bs-toggle="collapse"
                    data-bs-target="#address"
                  >
                    <span className="avatar avatar-md rounded text-dark border me-2">
                      <i className="ti ti-map-pin-cog fs-20" />
                    </span>
                    Additional Info
                  </Link>
                </div>
                <div
                  className="accordion-collapse collapse"
                  id="address"
                  data-bs-parent="#main_accordion"
                >
                  <div className="accordion-body border-top">
                    <div className="row">
                      <div className="col-md-12">
                        <div className="mb-3">
                          <label className="col-form-label">
                            SR Type{" "}
                          </label>
                          <input type="text" name="sr_type" value={formData?.sr_type} onChange={handleChange} className="form-control" />
                        </div>
                      </div>

                      <div className="col-md-6">
                        <div className="mb-3 mb-md-0">
                          <label className="col-form-label">Product Category</label>
                          {/* <input type="text" name="product_category" value={formData?.product_category} onChange={handleChange} className="form-control" /> */}
                          <Select
                            name="source"
                            onChange={(value) => handleChange(value, "select", "product_category")}
                            value={{ label: productData?.find((x: any) => x?.value == formData?.product_category)?.label, value: formData?.product_category }}
                            className="select2" 
                            classNamePrefix="react-select"
                            options={productData}
                            placeholder="Select an option"
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="col-form-label">
                            Stage{" "}
                          </label>
                          {/* <input type="text" name="state" value={formData?.state} onChange={handleChange} className="form-control" /> */}
                          <Select
                            name="source"
                            onChange={(value) => handleChange(value, "select", "stage")}
                            value={{ label: stageData?.find((x: any) => x?.value == formData?.stage)?.label, value: formData?.stage }}
                            className="select2" 
                            classNamePrefix="react-select"
                            options={stageData}
                            placeholder="Select an option"
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="col-form-label">
                            Amount{" "}
                          </label>
                          <input type="text" name="amount" value={formData?.amount} onChange={handleChange} className="form-control" />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="col-form-label">Team Leader </label>
                          {/* <input type="text" name="city" value={formData?.city} onChange={handleChange} className="form-control" /> */}
                          <Select
                            name="source"
                            onChange={(value) => handleChange(value, "select", "team_leader")}
                            value={{ label: teamData?.find((x: any) => x?.value == formData?.team_leader)?.label, value: formData?.team_leader }}
                            className="select2" 
                            classNamePrefix="react-select"
                            options={teamData}
                            placeholder="Select an option"
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-0">
                          <label className="col-form-label">Closing Date </label>
                          {/* <input type="text" name="code" value={formData?.code} onChange={handleChange} className="form-control" /> */}
                          <DatePicker
                            className="form-control datetimepicker deals-details"
                            value={formData?.closing_date ? moment(formData.closing_date) : moment()}
                            onChange={(date) => setFormData({ ...formData, closing_date: date?.toDate() })}
                            format="DD-MM-YYYY"
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-0">
                          <label className="col-form-label">Last Contacted Date </label>
                          {/* <input type="text" name="code" value={formData?.code} onChange={handleChange} className="form-control" /> */}
                          <DatePicker
                            className="form-control datetimepicker deals-details"
                            value={formData?.last_contact_date ? moment(formData.last_contact_date) : moment()}
                            onChange={(date) => setFormData({ ...formData, last_contact_date: date?.toDate() })}
                            format="DD-MM-YYYY"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* /Address Info */}
            </div>
            <div className="d-flex align-items-center justify-content-end">
              <button
                type="button"
                data-bs-dismiss="offcanvas"
                className="btn btn-light me-2"
                onClick={handleClose}
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => {
                  setOpenModal2(true)
                  handleAddOrUpdateDeals()
                }}
              >
                Create
              </button>
            </div>
          </form>
        </div>
      </div>
      {/* /Add Company */}

      {/* Edit Company */}
      <div
        className="offcanvas offcanvas-end offcanvas-large"
        tabIndex={-1}
        id="offcanvas_edit"
      >
        <div className="offcanvas-header border-bottom">
          <h5 className="fw-semibold">Edit Lead</h5>
          <button
            type="button"
            className="btn-close custom-btn-close border p-1 me-0 d-flex align-items-center justify-content-center rounded-circle"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
            onClick={handleClose}
          >
            <i className="ti ti-x" />
          </button>
        </div>
        <div className="offcanvas-body">
          <form>
            <div className="accordion" id="main_accordion">
              {/* Basic Info */}
              <div className="accordion-item rounded mb-3">
                <div className="accordion-header">
                  <Link
                    to="#"
                    className="accordion-button accordion-custom-button bg-white rounded fw-medium text-dark"
                    data-bs-toggle="collapse"
                    data-bs-target="#basic"
                  >
                    <span className="avatar avatar-md rounded text-dark border me-2">
                      <i className="ti ti-user-plus fs-20" />
                    </span>
                    Lead Info
                  </Link>
                </div>
                <div
                  className="accordion-collapse collapse show"
                  id="basic"
                  data-bs-parent="#main_accordion"
                >
                  <div className="accordion-body border-top">
                    <div className="row">
                      <div className="col-md-12">
                        <div className="mb-3">
                          <label className="col-form-label">Order Number</label>
                          <input name="order_number" value={formData?.order_number} onChange={handleChange} type="text" className="form-control" />
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="mb-3">
                          <label className="col-form-label">Lead Name</label>
                          <input name="opportunity_name" value={formData?.opportunity_name} onChange={handleChange} type="text" className="form-control" />
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="mb-3">
                          <div className="d-flex justify-content-between align-items-center">
                            <label className="col-form-label">
                              Start Date <span className="text-danger">*</span>
                            </label>
                          </div>
                          {/* <input type="text" name="email" value={formData?.start_date} onChange={handleChange} className="form-control" />
                           */}
                          <DatePicker
                            className="form-control datetimepicker deals-details"
                            value={formData?.start_date ? moment(formData.start_date) : moment()}
                            onChange={(date) => setFormData({ ...formData, start_date: date?.toDate() })}
                            format="DD-MM-YYYY"
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="col-form-label">
                            Updated Date <span className="text-danger">*</span>
                          </label>
                          {/* <input type="text" name="primary_phone" value={formData?.primary_phone} onChange={handleChange} className="form-control" /> */}
                            
                          <DatePicker
                            className="form-control datetimepicker deals-details"
                            value={formData?.updated_date ? moment(formData.updated_date) : moment()}
                            onChange={(date) => setFormData({ ...formData, updated_date: date?.toDate() })}
                            format="DD-MM-YYYY"
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="col-form-label">Contact Name</label>
                          {/* <input type="text" name="secondary_phone" value={formData?.secondary_phone} onChange={handleChange} className="form-control" /> */}
                          <Select
                            name="source"
                            onChange={(value) => handleChange(value, "select", "contact_name")}
                            value={{ label: contactData?.find((x: any) => x?.value == formData?.contact_name)?.label, value: formData?.contact_name }}
                            className="select2" 
                            classNamePrefix="react-select"
                            options={contactData}
                            placeholder="Select an option"
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="col-form-label">
                            company Name <span className="text-danger">*</span>
                          </label>
                          {/* <input type="text" name="website" value={formData?.website} onChange={handleChange} className="form-control" /> */}
                          <Select
                            name="source"
                            onChange={(value) => handleChange(value, "select", "company_name")}
                            value={{ label: companyData?.find((x: any) => x?.value == formData?.company_name)?.label, value: formData?.company_name }}
                            className="select2" 
                            classNamePrefix="react-select"
                            options={companyData}
                            placeholder="Select an option"
                          />
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="mb-0">
                          <label className="col-form-label">
                            Comments <span className="text-danger">*</span>
                          </label>
                          <textarea
                            name="description" value={formData?.comments} onChange={handleChange}
                            className="form-control"
                            rows={5}
                            defaultValue={""}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* /Basic Info */}

              {/* Address Info */}
              <div className="accordion-item border-top rounded mb-3">
                <div className="accordion-header">
                  <Link
                    to="#"
                    className="accordion-button accordion-custom-button rounded bg-white fw-medium text-dark"
                    data-bs-toggle="collapse"
                    data-bs-target="#address"
                  >
                    <span className="avatar avatar-md rounded text-dark border me-2">
                      <i className="ti ti-map-pin-cog fs-20" />
                    </span>
                    Additional Info
                  </Link>
                </div>
                <div
                  className="accordion-collapse collapse"
                  id="address"
                  data-bs-parent="#main_accordion"
                >
                  <div className="accordion-body border-top">
                    <div className="row">
                      <div className="col-md-12">
                        <div className="mb-3">
                          <label className="col-form-label">
                            SR Type{" "}
                          </label>
                          <input type="text" name="sr_type" value={formData?.sr_type} onChange={handleChange} className="form-control" />
                        </div>
                      </div>

                      <div className="col-md-6">
                        <div className="mb-3 mb-md-0">
                          <label className="col-form-label">Product Category</label>
                          {/* <input type="text" name="product_category" value={formData?.product_category} onChange={handleChange} className="form-control" /> */}
                          <Select
                            name="source"
                            onChange={(value) => handleChange(value, "select", "product_category")}
                            value={{ label: productData?.find((x: any) => x?.value == formData?.product_category)?.label, value: formData?.product_category }}
                            className="select2" 
                            classNamePrefix="react-select"
                            options={productData}
                            placeholder="Select an option"
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="col-form-label">
                            Stage{" "}
                          </label>
                          {/* <input type="text" name="state" value={formData?.state} onChange={handleChange} className="form-control" /> */}
                          <Select
                            name="source"
                            onChange={(value) => handleChange(value, "select", "stage")}
                            value={{ label: stageData?.find((x: any) => x?.value == formData?.stage)?.label, value: formData?.stage }}
                            className="select2" 
                            classNamePrefix="react-select"
                            options={stageData}
                            placeholder="Select an option"
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="col-form-label">
                            Amount{" "}
                          </label>
                          <input type="text" name="amount" value={formData?.amount} onChange={handleChange} className="form-control" />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="col-form-label">Team Leader </label>
                          {/* <input type="text" name="city" value={formData?.city} onChange={handleChange} className="form-control" /> */}
                          <Select
                            name="source"
                            onChange={(value) => handleChange(value, "select", "team_leader")}
                            value={{ label: teamData?.find((x: any) => x?.value == formData?.team_leader)?.label, value: formData?.team_leader }}
                            className="select2" 
                            classNamePrefix="react-select"
                            options={teamData}
                            placeholder="Select an option"
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-0">
                          <label className="col-form-label">Closing Date </label>
                          {/* <input type="text" name="code" value={formData?.code} onChange={handleChange} className="form-control" /> */}
                          <DatePicker
                            className="form-control datetimepicker deals-details"
                            value={formData?.closing_date ? moment(formData.closing_date) : moment()}
                            onChange={(date) => setFormData({ ...formData, closing_date: date?.toDate() })}
                            format="DD-MM-YYYY"
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-0">
                          <label className="col-form-label">Last Contacted Date </label>
                          {/* <input type="text" name="code" value={formData?.code} onChange={handleChange} className="form-control" /> */}
                          <DatePicker
                            className="form-control datetimepicker deals-details"
                            value={formData?.last_contact_date ? moment(formData.last_contact_date) : moment()}
                            onChange={(date) => setFormData({ ...formData, last_contact_date: date?.toDate() })}
                            format="DD-MM-YYYY"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* /Address Info */}
            </div>
            <div className="d-flex align-items-center justify-content-end">
              <button
                type="button"
                data-bs-dismiss="offcanvas"
                className="btn btn-light me-2"
                onClick={handleClose}
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => {
                  setOpenModal2(true)
                  handleAddOrUpdateDeals()
                }}
              >
                Create
              </button>
            </div>
          </form>
        </div>
      </div>
      {/* /Edit Company */}
     
      {/* Delete Company */}

      {/* /Delete Company */}
      {/* Add New Deals */}
      
      {/* /Add New Deals */}
      <Modal show={openModal} onHide={() => setOpenModal(false)}>

        <div className="modal-header border-0 m-0 justify-content-end">
          <button
            className="btn-close"
            aria-label="Close"
            onClick={() => setOpenModal(false)}
          >
            <i className="ti ti-x" />
          </button>
        </div>
        <div className="modal-body">
          <div className="success-message text-center">
            <div className="success-popup-icon bg-light-blue">
              <i className="ti ti-medal" />
            </div>
            <h3>Deal Created Successfully!!!</h3>
            <p>View the details of deal, created</p>
            <div className="col-lg-12 text-center modal-btn">
              <Link
                to="#"
                className="btn btn-light"
                onClick={() => setOpenModal(false)}
              >
                Cancel
              </Link>
              <Link to={route.companyDetails} className="btn btn-primary">
                View Details
              </Link>
            </div>
          </div>
        </div>
      </Modal><Modal show={openModal2} onHide={() => setOpenModal2(false)}>
        <div className="modal-header border-0 m-0 justify-content-end">
          <button
            className="btn-close"
            aria-label="Close"
            onClick={() => setOpenModal2(false)}
          >
            <i className="ti ti-x" />
          </button>
        </div>
        <div className="modal-body">
          <div className="success-message text-center">
            <div className="success-popup-icon bg-light-blue">
              <i className="ti ti-user-plus" />
            </div>
            <h3>Company  Created Successfully!!!</h3>
            <p>View the details of Company, created</p>
            <div className="col-lg-12 text-center modal-btn">
              <Link
                to="#"
                className="btn btn-light"
                onClick={() => setOpenModal2(false)}
              >
                Cancel
              </Link>
              <Link to={route.companyDetails} className="btn btn-primary">
                View Details
              </Link>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default Leads;
