import React, { useEffect, useState } from "react";
import ImageWithBasePath from "../../../core/common/imageWithBasePath";
import { Link } from "react-router-dom";
import Select from "react-select";
import Table from "../../../core/common/dataTable/index";
import { TableData } from "../../../core/data/interface";
import { useDispatch, useSelector } from "react-redux";
import {
  setActivityTogglePopup,
  setActivityTogglePopupTwo,
} from "../../../core/data/redux/commonSlice";
import CollapseHeader from "../../../core/common/collapse-header";
import { all_routes } from "../../router/all_routes";
import PrivateServer from "../../../helper/PrivateServer";
import { endpoints } from "../../../helper/endpoints";
import _ from "lodash";
import moment from "moment";
import { DatePicker } from "antd";
import useAuth from "../../../hooks/useAuth";
import * as XLSX from "xlsx";
import { Modal } from "react-bootstrap";

const route = all_routes;
const Pipeline = () => {
  const { values } = useAuth();
  const [pipelineData, setPipelineData] = useState([]);
  const [productCategory, setProductCategory] = useState([]);
  const [companyName, setCompanyName] = useState([]);
  const [opportunityData, setOpportunityData] = useState([]);
  const [opportunities, setOpportunities] = useState([]);
  const [searchData, setFilteredSearchData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showBulkActionButton, setShowBulkActionButton] = useState(false);
  const [showBulkDeleteModal, setShowBulkDeleteModal] = useState(false);
  const [selectedRows, setSelectedRows] = useState(0);
  const [selectedIds, setSelectedIds] = useState([]);
  const [pipelineId, setPipelineId] = useState("");
  const [formData, setFormData] = useState({
    started_date: moment(new Date()).format('YYYY-MM-DD'),
    updated_date: "",
    expected_closure_date: "",
    product_category: "",
    product_description: "",
    sr_type: "",
    qty: "",
    mrc: "",
    annual_rev: "",
    company_name: "",
    opportunity_status: "",
    stage_name: "",
    comments: "",
    followup_date: "",
    sales_id: "",
    name: "",
    contact_number: "",
    email: "",
    pipelineId: "",
  });

  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
    setFormData({ ...formData, started_date: moment(date).format('YYYY-MM-DD') });
  };

  const getPipelines = async () => {
    try {
      const { Pipeline } = endpoints;
      const response = await PrivateServer.getData(Pipeline?.view)
  
      if(response?.data) {
        setPipelineData([...new Set(response?.data?.map((x: any) => ({ ...x, key: x?.id?.toString() })))]);
        setFilteredSearchData([...new Set(response?.data?.map((x: any) => ({ ...x, key: x?.id?.toString() })))])
      }
    } catch(error) {
      console.log("Error while getting pipeline -- E:", error?.message);
    }
  }

  const getProductCategories = async () => {
    try {
      const { Categories } = endpoints;
      const response = await PrivateServer.getData(Categories?.view)
  
      if(response?.data) {
        setProductCategory([...new Set(response?.data?.map((x: any) => ({ label: x?.category_name, value: x?._id, key: x?.id?.toString() })))]);
      }
    } catch(error) {
      console.log("Error while getting categories -- E:", error?.message);
    }
  }

  const getCompanies = async () => {
    try {
      const { Companies } = endpoints;
      const response = await PrivateServer.getData(Companies?.view)
  
      if(response?.data) {
        setCompanyName([...new Set(response?.data?.map((x: any) => ({ label: x?.company_name, value: x?._id, key: x?.id?.toString() })))]);
      }
    } catch(error) {
      console.log("Error while getting categories -- E:", error?.message);
    }
  }

  const getOpporunityData = async () => {
    try {
      const { OpportunityStatus } = endpoints;
      const response = await PrivateServer.getData(OpportunityStatus?.view)
  
      if(response?.data) {
        setOpportunities(response?.data);
        setOpportunityData([...new Set(response?.data?.map((x: any) => ({ label: x?.opportunity_name, value: x?._id, key: x?.id?.toString() })))]);
      }
    } catch(error) {
      console.log("Error while getting opportunities -- E:", error?.message);
    }
  }

  const handleClose = () => {
    setPipelineId("");
    setFormData({
      started_date: moment(new Date()).format('YYYY-MM-DD'),
      updated_date: "",
      expected_closure_date: "",
      product_category: "",
      product_description: "",
      sr_type: "",
      qty: "",
      mrc: "",
      annual_rev: "",
      company_name: "",
      opportunity_status: "",
      stage_name: "",
      comments: "",
      followup_date: "",
      sales_id: "",
      name: "",
      contact_number: "",
      email: "",
      pipelineId: "",
    });
  }

  const handleChange = (e, type="", _name="") => {    
    if(type == "file") {
      const { name } = e.target;
      setFormData({ ...formData, [name]: e.target?.files[0] });
    }
    else if(type == "select") {
      setFormData({ ...formData, [_name]: e?.label });
    } else {
      const { name, value } = e.target; 
      setFormData({ ...formData, [name]: value });
    }
  }

  const handleDeletePipeline = async () => {
    try {
      const { Pipeline } = endpoints;
      const response = await PrivateServer?.deleteData(Pipeline?.delete, pipelineId);
      if(response) getPipelines();
    } catch(err) {
      console.log("Error while deleting pipeline -- E: ", err?.message);
    }
  }

  const handleEditPipeline = (values) => {
    setFormData({ ...formData, ..._.omit(values, ["_id"]), pipelineId: values?._id });
  }

  const handleAddOrUpdatePipeline = async () => {
    try {
      const { Pipeline } = endpoints;
      const { data } = formData?.pipelineId !== "" ? await PrivateServer?.patchData(Pipeline.patch, formData?.pipelineId, formData) : await PrivateServer.postData(Pipeline.create, formData);

      if(data) {
        if(formData?.pipelineId == "") setFormData({ ...formData, pipelineId: data?.data?._id })
        getPipelines();
        handleClose();
      }
    } catch(err) {
      console.log("Error while saving pipeline -- E: ", err?.message);
    }
  }

  const columns = [
    {
      title: "Started Date",
      dataIndex: "started_date",
      sorter: (a: any, b: any) => a.started_date.length - b.started_date.length,
    },
    {
      title: "Updated Date",
      dataIndex: "updated_date",
      sorter: (a: any, b: any) =>
        a.updated_date.length - b.updated_date.length,
    },
    {
      title: "Expected Closure",
      dataIndex: "expected_closure_date",
      sorter: (a: any, b: any) =>
        a.expected_closure_date.length - b.expected_closure_date.length,
    },
    {
      title: "Product Category",
      dataIndex: "product_category",
      sorter: (a: any, b: any) =>
        a.product_category.length - b.product_category.length,
    },
    {
      title: "MRC",
      dataIndex: "mrc",
      sorter: (a: any, b: any) =>
        a.mrc.length - b.mrc.length,
    },
    {
      title: "QTY",
      dataIndex: "qty",
      sorter: (a: any, b: any) =>
        a.qty.length - b.qty.length,
    },
    {
      title: "Follow Up",
      dataIndex: "followup_date",
      sorter: (a: any, b: any) =>
        a.follow_up_date.length - b.follow_up_date.length,
    },
    {
      title: "Opportunity Status",
      dataIndex: "opportunity_status",
      render: (text: any, record: any) => {
        const _stauts = opportunities?.find((x) => x?.opportunity_name == record?.opportunity_status);

        return (
        <div className="pipeline-progress d-flex align-items-center">
          <div className="progress">
            {(_stauts?.opportunity_percentage > "0" && _stauts?.opportunity_percentage <= "30") && (
              <div
                className="progress-bar progress-bar-violet"
                role="progressbar"
              ></div>
            )}
            {(_stauts?.opportunity_percentage >= "30" && _stauts?.opportunity_percentage <= "50") && (
              <div
                className="progress-bar progress-bar-success"
                role="progressbar"
              ></div>
            )}
            {(_stauts?.opportunity_percentage >= "50" && _stauts?.opportunity_percentage <= "70") && (
              <div
                className="progress-bar progress-bar-warning"
                role="progressbar"
              ></div>
            )}
            {(_stauts?.opportunity_percentage >= "70" && _stauts?.opportunity_percentage <= "100") && (
              <div
                className="progress-bar progress-bar-violet"
                role="progressbar"
              ></div>
            )}
          </div>
          <span>({_stauts?.opportunity_percentage} %)</span>
        </div>
      )},
      sorter: (a: any, b: any) => a.opportunity_status.length - b.opportunity_status.length,
    },
    {
      title: "Created Date",
      dataIndex: "created_date",
      sorter: (a: any, b: any) =>
        a.created_date.length - b.created_date.length,
    },
    {
      title: "Created By",
      dataIndex: "profileId",
      sorter: (a: any, b: any) => a.secondary_phone.length - b.secondary_phone.length,
      render: (text: any, record: any) => (
        <h2 className="d-flex align-items-center">
          <Link to={route.companies} className="d-flex flex-column">
          {record?.profileId?.username}
            <span className="text-default">{record?.profileId?.email}</span>
          </Link>
        </h2>
      ),
    },
    {
      title: "Team Lead",
      dataIndex: "team_leader",
      render: (text: any, record: any) => (
        <h2 className="d-flex align-items-center">
          <Link to={route.leads}
            className="d-flex flex-column fw-medium"
          >
            {record.team_leader}
            <span className="text-default">{record?.groupId?.group_manager?.team_leader?.email}</span>
          </Link>
        </h2>
      ),
      sorter: (a: any, b: any) => a.team_leader.length - b.team_leader.length,
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (text: string, record: any) => (
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
            onClick={() => handleEditPipeline(record)}
          >
           {values?.permissions?.includes('update') && (<Link className="dropdown-item" data-bs-toggle="offcanvas" data-bs-target="#offcanvas_edit" to="#"><i className="ti ti-edit text-blue"></i> Edit</Link>)}
            {values?.permissions?.includes('delete') && (<Link
              className="dropdown-item"
              to="#"
              data-bs-toggle="modal"
              data-bs-target="#delete_pipeline"
              onClick={() => setPipelineId(record?._id)}
            >
              <i className="ti ti-trash text-danger"></i> Delete
            </Link>)}
          </div>
        </div>
      ),
    },
  ];

  const cleanData = (data, filterKeys) => {
    return data.map(obj => {
        // Remove filterKeys from object
        const filteredObj = _.omit(obj, filterKeys);

        // Convert keys to start case
        return _.mapKeys(filteredObj, (value, key) => _.startCase(_.toLower(key.replace(/_/g, " "))));
    });
  };

  const handleExport = () => {
    try {
      // Convert data to worksheet format
      const worksheet = XLSX.utils.json_to_sheet(cleanData(pipelineData, ["_id", "__v"]));

      // Create a new workbook and append the worksheet
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Products");

      // Write the file and trigger download
      XLSX.writeFile(workbook, 'etisalat_leads_data.xlsx');

    } catch(err) {
      console.log("Error == ", err);
    }
  }

  const handleSearch = (e) => {
    const { value: _searchTerm } = e?.target;
    setSearchTerm(_searchTerm);
    const _searchData = [...searchData];

    if(searchTerm != "") {
      const searchResults = _.filter(_searchData, (obj) =>
        _.some(obj, (value) =>
          _.isString(value) && _.includes(value.toLowerCase(), searchTerm?.toLowerCase())
        )
      );
      setFilteredSearchData(searchResults)
    } else setFilteredSearchData(searchData);
  }

  useEffect(() => {
    getPipelines()
    getProductCategories();
    getCompanies();
    getOpporunityData();
  }, [])
  
  const handleBulkOperation = (selectedRows: string | any[]) => {
    if(selectedRows?.length > 0) {
      setShowBulkActionButton(true);
      setSelectedRows(selectedRows?.length)
      setSelectedIds(selectedRows)
    } else {
      setShowBulkActionButton(false);
      setSelectedRows(0)
      setSelectedIds([])
    }
  }

  const handleBulkDelete = async () => {
    const { Pipeline } = endpoints;
    const deleted = await PrivateServer.deleteBulkData(Pipeline?.delete_bulk, selectedIds)
    if(deleted) {
      setShowBulkActionButton(false);
      setShowBulkDeleteModal(false);
    }
  }

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
                    <h4 className="page-title">
                      Pipeline<span className="count-title">{searchTerm != "" ? searchData?.length : pipelineData?.length}</span>
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
          placeholder="Search Pipeline"
          onChange={handleSearch}
        />
      </div>
    </div>
  </div>
  {/* /Search */}
</div>

                <div className="card-body">
                
                <>
  {/* Filter */}
  <div className="d-flex align-items-center justify-content-between flex-wrap row-gap-2 mb-4">
    <div className="d-flex align-items-center flex-wrap row-gap-2">
      {
        showBulkActionButton ? 
        <button
          className="btn btn-primary"
          onClick={() => setShowBulkDeleteModal(!showBulkDeleteModal)}
        >
          Delete {selectedRows} rows
        </button> 
        : ""
      }
      {values?.roleId?.name?.toLowerCase() == 'admin' && (<div className="dropdown">
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
              <Link to="#" className="dropdown-item" onClick={handleExport}>
                <i className="ti ti-file-type-xls text-green me-1" />
                Export as Excel{" "}
              </Link>
            </li>
          </ul>
        </div>
      </div>)}
    </div>
    <div className="d-flex align-items-center flex-wrap row-gap-2">
      {values?.permissions?.includes('create') && (<Link
        to="#"
        className="btn btn-primary"
        data-bs-toggle="offcanvas"
        data-bs-target="#offcanvas_pipeline"
      >
        <i className="ti ti-square-rounded-plus me-2" />
        Add Pipeline
      </Link>)}
    </div>
  </div>
  {/* /Filter */}
</>

                  {/* Pipeline List */}
                  <div className="table-responsive custom-table">
                    <Table dataSource={searchTerm != "" ? searchData : pipelineData} columns={columns} handleBulkAction={handleBulkOperation} />
                  </div>
                  <div className="row align-items-center">
                    <div className="col-md-6">
                      <div className="datatable-length" />
                    </div>
                    <div className="col-md-6">
                      <div className="datatable-paginate" />
                    </div>
                  </div>
                  {/* /Pipeline List */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* /Page Wrapper */}
      <>
  {/* Add New Pipeline */}
  <div
    className="offcanvas offcanvas-end offcanvas-large"
    tabIndex={-1}
    id="offcanvas_pipeline"
  >
    <div className="offcanvas-header border-bottom">
      <h4>Add New Pipeline</h4>
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
        <div>
          <div className="mb-3">
            <label className="col-form-label">
              Started Date <span className="text-danger">*</span>
            </label>
            <DatePicker
              className="form-control datetimepicker deals-details"
              onChange={(date) => setFormData({ ...formData, started_date: moment(date)?.format("YYYY-MM-DD") })}
              format="DD-MM-YYYY"
            />
          </div>
          <div className="mb-3">
            <label className="col-form-label">
              Updated Date <span className="text-danger">*</span>
            </label>
            <DatePicker
              className="form-control datetimepicker deals-details"
              onChange={(date) => setFormData({ ...formData, updated_date: moment(date)?.format("YYYY-MM-DD") })}
              format="DD-MM-YYYY"
            />
          </div>
          <div className="mb-3">
            <label className="col-form-label">
              Expected CLosure Date <span className="text-danger">*</span>
            </label>
            <DatePicker
              className="form-control datetimepicker deals-details"
              onChange={(date) => setFormData({ ...formData, expected_closure_date: moment(date)?.format("YYYY-MM-DD") })}
              format="DD-MM-YYYY"
            />
          </div>
          <div className="mb-3">
            <div className="pipeline-listing">
              <div className="modal-body">
                <form >
                  <div className="mb-3">
                    <label className="col-form-label">Product Category *</label>
                    <Select
                      name="product_category"
                      onChange={(value) => handleChange(value, "select", "product_category")}
                      value={{ label: productCategory?.find((x: any) => x?.label == formData?.product_category)?.label, value: formData?.product_category }}
                      className="select2" 
                      classNamePrefix="react-select"
                      options={productCategory}
                      placeholder="Select an option"
                    />
                  </div>
                  <div className="mb-3">
                    <label className="col-form-label">Product Description *</label>
                    <textarea
                      name="product_description"
                      value={formData?.product_description}
                      onChange={handleChange}
                      className="form-control"
                      defaultValue="Inpipeline"
                      rows={5}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="col-form-label">SR Type *</label>
                    <input
                      name="sr_type"
                      type="text"
                      value={formData?.sr_type}
                      onChange={handleChange}
                      className="form-control"
                      defaultValue=""
                    />
                  </div>
                  <div className="mb-3">
                    <label className="col-form-label">QTY *</label>
                    <input
                      name="qty"
                      type="number"
                      value={formData?.qty}
                      onChange={handleChange}
                      className="form-control"
                      defaultValue=""
                    />
                  </div>
                  <div className="mb-3">
                    <label className="col-form-label">MRC *</label>
                    <input
                      name="mrc"
                      type="number"
                      value={formData?.mrc}
                      onChange={handleChange}
                      className="form-control"
                      defaultValue=""
                    />
                  </div>
                  <div className="mb-3">
                    <label className="col-form-label">Annual Rev *</label>
                    <input
                      name="annual_rev"
                      type="number"
                      value={formData?.annual_rev}
                      onChange={handleChange}
                      className="form-control"
                      defaultValue=""
                    />
                  </div>
                  <div className="mb-3">
                    <label className="col-form-label">Company Name *</label>
                    <Select
                      name="company_name"
                      onChange={(value) => handleChange(value, "select", "company_name")}
                      value={{ label: companyName?.find((x: any) => x?.label == formData?.company_name)?.label, value: formData?.company_name }}
                      className="select2" 
                      classNamePrefix="react-select"
                      options={companyName}
                      placeholder="Select an option"
                    />
                  </div>
                  <div className="mb-3">
                    <label className="col-form-label">Opportunity Status *</label>
                    <Select
                      name="opportunity_status"
                      onChange={(value) => handleChange(value, "select", "opportunity_status")}
                      value={{ label: opportunityData?.find((x: any) => x?.label == formData?.opportunity_status)?.label, value: formData?.opportunity_status }}
                      className="select2" 
                      classNamePrefix="react-select"
                      options={opportunityData}
                      placeholder="Select an option"
                    />
                  </div>
                  <div className="mb-3">
                    <label className="col-form-label">Stage Name *</label>
                    <input
                      name="stage_name"
                      type="text"
                      value={formData?.stage_name}
                      onChange={handleChange}
                      className="form-control"
                      defaultValue=""
                    />
                  </div>
                  <div className="mb-3">
                    <label className="col-form-label">Comments *</label>
                    <textarea
                      name="comments"
                      rows={5}
                      value={formData?.comments}
                      onChange={handleChange}
                      className="form-control"
                      defaultValue=""
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="mb-3">
            <label className="col-form-label">
              Follow Up Date <span className="text-danger">*</span>
            </label>
            <DatePicker
              className="form-control datetimepicker deals-details"
              name="followup_date"
              onChange={(date) => setFormData({ ...formData, followup_date: moment(date)?.format("YYYY-MM-DD") })}
              format="DD-MM-YYYY"
            />
          </div>
          <div className="mb-3">
            <label className="col-form-label">
              Sales Id <span className="text-danger">*</span>
            </label>
            <input 
              type="text"
              value={formData?.sales_id}
              className="form-control"
              onChange={handleChange}
              name="sales_id"
            />
          </div>
          <div className="mb-3">
            <label className="col-form-label">
              Name <span className="text-danger">*</span>
            </label>
            <input 
              type="text"
              value={formData?.name}
              className="form-control"
              onChange={handleChange}
              name="name"
            />
          </div>
          <div className="mb-3">
            <label className="col-form-label">
              Contact Number <span className="text-danger">*</span>
            </label>
            <input 
              type="text"
              value={formData?.contact_number}
              className="form-control"
              onChange={handleChange}
              name="contact_number"
            />
          </div>
          <div className="mb-3">
            <label className="col-form-label">
              Email <span className="text-danger">*</span>
            </label>
            <input 
              type="email"
              value={formData?.email}
              className="form-control"
              onChange={handleChange}
              name="email"
            />
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
          <button
            type="button"
            className="btn btn-primary"
            data-bs-dismiss="offcanvas"
            onClick={handleAddOrUpdatePipeline}
          >
            Create
          </button>
        </div>
      </form>
    </div>
  </div>
  {/* /Add New Pipeline */}
</>
<>
  {/* Edit Pipeline */}
  <div
    className="offcanvas offcanvas-end offcanvas-large"
    tabIndex={-1}
    id="offcanvas_edit"
  >
    <div className="offcanvas-header border-bottom">
      <h4>Edit Pipeline</h4>
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
        <div>
          <div className="mb-3">
            <label className="col-form-label">
              Started Date <span className="text-danger">*</span>
            </label>
            <DatePicker
              className="form-control datetimepicker deals-details"
              onChange={(date) => setFormData({ ...formData, started_date: moment(date)?.format("YYYY-MM-DD") })}
              format="DD-MM-YYYY"
            />
          </div>
          <div className="mb-3">
            <label className="col-form-label">
              Updated Date <span className="text-danger">*</span>
            </label>
            <DatePicker
              className="form-control datetimepicker deals-details"
              onChange={(date) => setFormData({ ...formData, updated_date: moment(date)?.format("YYYY-MM-DD") })}
              format="DD-MM-YYYY"
            />
          </div>
          <div className="mb-3">
            <label className="col-form-label">
              Expected CLosure Date <span className="text-danger">*</span>
            </label>
            <DatePicker
              className="form-control datetimepicker deals-details"
              onChange={(date) => setFormData({ ...formData, expected_closure_date: moment(date)?.format("YYYY-MM-DD") })}
              format="DD-MM-YYYY"
            />
          </div>
          <div className="mb-3">
            <div className="pipeline-listing">
              <div className="modal-body">
                <form >
                  <div className="mb-3">
                    <label className="col-form-label">Product Category *</label>
                    <Select
                      name="product_category"
                      onChange={(value) => handleChange(value, "select", "product_category")}
                      value={{ label: productCategory?.find((x: any) => x?.label == formData?.product_category)?.label, value: formData?.product_category }}
                      className="select2" 
                      classNamePrefix="react-select"
                      options={productCategory}
                      placeholder="Select an option"
                    />
                  </div>
                  <div className="mb-3">
                    <label className="col-form-label">Product Description *</label>
                    <textarea
                      name="product_description"
                      value={formData?.product_description}
                      onChange={handleChange}
                      className="form-control"
                      defaultValue="Inpipeline"
                      rows={5}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="col-form-label">SR Type *</label>
                    <input
                      name="sr_type"
                      type="text"
                      value={formData?.sr_type}
                      onChange={handleChange}
                      className="form-control"
                      defaultValue=""
                    />
                  </div>
                  <div className="mb-3">
                    <label className="col-form-label">QTY *</label>
                    <input
                      name="qty"
                      type="number"
                      value={formData?.qty}
                      onChange={handleChange}
                      className="form-control"
                      defaultValue=""
                    />
                  </div>
                  <div className="mb-3">
                    <label className="col-form-label">MRC *</label>
                    <input
                      name="mrc"
                      type="number"
                      value={formData?.mrc}
                      onChange={handleChange}
                      className="form-control"
                      defaultValue=""
                    />
                  </div>
                  <div className="mb-3">
                    <label className="col-form-label">Annual Rev *</label>
                    <input
                      name="annual_rev"
                      type="number"
                      value={formData?.annual_rev}
                      onChange={handleChange}
                      className="form-control"
                      defaultValue=""
                    />
                  </div>
                  <div className="mb-3">
                    <label className="col-form-label">Company Name *</label>
                    <Select
                      name="company_name"
                      onChange={(value) => handleChange(value, "select", "company_name")}
                      value={{ label: companyName?.find((x: any) => x?.label == formData?.company_name)?.label, value: formData?.company_name }}
                      className="select2" 
                      classNamePrefix="react-select"
                      options={companyName}
                      placeholder="Select an option"
                    />
                  </div>
                  <div className="mb-3">
                    <label className="col-form-label">Opportunity Status *</label>
                    <Select
                      name="opportunity_status"
                      onChange={(value) => handleChange(value, "select", "opportunity_status")}
                      value={{ label: opportunityData?.find((x: any) => x?.label == formData?.opportunity_status)?.label, value: formData?.opportunity_status }}
                      className="select2" 
                      classNamePrefix="react-select"
                      options={opportunityData}
                      placeholder="Select an option"
                    />
                  </div>
                  <div className="mb-3">
                    <label className="col-form-label">Stage Name *</label>
                    <input
                      name="stage_name"
                      type="text"
                      value={formData?.stage_name}
                      onChange={handleChange}
                      className="form-control"
                      defaultValue=""
                    />
                  </div>
                  <div className="mb-3">
                    <label className="col-form-label">Comments *</label>
                    <textarea
                      name="comments"
                      rows={5}
                      value={formData?.comments}
                      onChange={handleChange}
                      className="form-control"
                      defaultValue=""
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="mb-3">
            <label className="col-form-label">
              Follow Up Date <span className="text-danger">*</span>
            </label>
            <DatePicker
              className="form-control datetimepicker deals-details"
              name="followup_date"
              onChange={(date) => setFormData({ ...formData, followup_date: moment(date)?.format("YYYY-MM-DD") })}
              format="DD-MM-YYYY"
            />
          </div>
          <div className="mb-3">
            <label className="col-form-label">
              Sales Id <span className="text-danger">*</span>
            </label>
            <input 
              type="text"
              value={formData?.sales_id}
              className="form-control"
              onChange={handleChange}
              name="sales_id"
            />
          </div>
          <div className="mb-3">
            <label className="col-form-label">
              Name <span className="text-danger">*</span>
            </label>
            <input 
              type="text"
              value={formData?.name}
              className="form-control"
              onChange={handleChange}
              name="name"
            />
          </div>
          <div className="mb-3">
            <label className="col-form-label">
              Contact Number <span className="text-danger">*</span>
            </label>
            <input 
              type="text"
              value={formData?.contact_number}
              className="form-control"
              onChange={handleChange}
              name="contact_number"
            />
          </div>
          <div className="mb-3">
            <label className="col-form-label">
              Email <span className="text-danger">*</span>
            </label>
            <input 
              type="email"
              value={formData?.email}
              className="form-control"
              onChange={handleChange}
              name="email"
            />
          </div>
        </div>
        <div className="d-flex align-items-center justify-content-end">
          <button
           type="submit"
            data-bs-dismiss="offcanvas"
            className="btn btn-light me-2"
          >
            Cancel
          </button>
          <button type="submit" className="btn btn-primary"  
            onClick={handleAddOrUpdatePipeline}
          data-bs-dismiss="offcanvas">
            Update
          </button>
        </div>
      </form>
    </div>
  </div>
  {/* /Edit Pipeline */}
</>
<>
  {/* Delete Pipeline */}
  <div className="modal fade" id="delete_pipeline" role="dialog">
    <div className="modal-dialog modal-dialog-centered">
      <div className="modal-content">
        <div className="modal-body">
          <div className="text-center">
            <div className="avatar avatar-xl bg-danger-light rounded-circle mb-3">
              <i className="ti ti-trash-x fs-36 text-danger" />
            </div>
            <h4 className="mb-2">Remove Pipeline?</h4>
            <p className="mb-0">
              Are you sure you want to remove <br /> pipeline you selected.
            </p>
            <div className="d-flex align-items-center justify-content-center mt-4">
              <Link
                to="#"
                className="btn btn-light me-2"
                data-bs-dismiss="modal"
              >
                Cancel
              </Link>
              <Link to="#" className="btn btn-danger" data-bs-dismiss="modal" onClick={handleDeletePipeline}>
                Yes, Delete it
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  {/* /Delete Stage */}
  {/** Bulk Delete Data */}
  <Modal show={showBulkDeleteModal} onHide={() => setShowBulkDeleteModal(false)}>
    <div className="modal-header border-0 m-0 justify-content-end">
      <button
        className="btn-close"
        aria-label="Close"
        onClick={() => {
          setShowBulkDeleteModal(false)
        }}
      >
        <i className="ti ti-x" />
      </button>
    </div>
    <div className="modal-body">
      <div className="success-message text-center">
        <div className="success-popup-icon bg-light-blue">
          <i className="ti ti-user-plus" />
        </div>
        <h3>Are you sure?</h3>
        <p>delete ({selectedRows})selected rows</p>
        <div className="col-lg-12 text-center modal-btn">
          <Link
            to="#"
            className="btn btn-light"
            onClick={() => setShowBulkDeleteModal(false)}
          >
            Cancel
          </Link>
          <Link to="#" className="btn btn-primary" onClick={handleBulkDelete}>
            Delete
          </Link>
        </div>
      </div>
    </div>
  </Modal>
  {/** Bulk Delete Data */}
</>
    </>
  );
};

export default Pipeline;
