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
import { Alert, DatePicker } from "antd";
import useAuth from "../../../hooks/useAuth";
import * as XLSX from "xlsx";
import { Modal, Toast, ToastContainer } from "react-bootstrap";
import dayjs from 'dayjs';

const route = all_routes;
const Pipeline = () => {
  const { values } = useAuth();
  const [pipelineData, setPipelineData] = useState([]);
  const [usersData, setUsersData] = useState([]);
  const [productCategory, setProductCategory] = useState([]);
  const [productCategoryData, setProductCategoryData] = useState([]);
  const [SRType, setSRType] = useState([]);
  const [companyName, setCompanyName] = useState([]);
  const [contactData, setContactData] = useState([]);
  const [opportunitySubCategoryData, setOpportunitySubCategoryData] = useState([]);
  const [opportunitySubCategoryFilterData, setOpportunitySubCategoryFilterData] = useState([]);
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
    started_date: dayjs(new Date()),
    updated_date: "",
    expected_closure_date: "",
    product_category: "",
    product_description: "",
    pipeline_name: "",
    sr_type: "",
    opportunity_sub_type_name: "",
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
  const [error, setError] = useState({
    type: "primary",
    message: ""
  });
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
  });
  const [showToast, setShowToast] = useState(false);

  // const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  // const handleDateChange = (date: Date | null) => {
  //   setSelectedDate(date);
  //   setFormData({ ...formData, started_date: moment(date).format('YYYY-MM-DD') });
  // };

  const getPipelines = async () => {
    try {
      const { Pipeline } = endpoints;
      const response = await PrivateServer.getData(Pipeline?.view)
  
      if(response?.data) {
        setShowToast(true);
        setError({ type: "success", message: `(${response?.data?.length}) Pipelines found` })
        setPipelineData([...new Set(response?.data?.map((x: any) => ({ ...x, key: x?.id?.toString() })))]);
        setFilteredSearchData([...new Set(response?.data?.map((x: any) => ({ ...x, key: x?.id?.toString() })))])
      }
    } catch(error) {
      setShowToast(true);
      setError({ type: "danger", message: `No Pipelines found` })
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

  const getOpportunityCategoriesData = async () => {
    try {
      const { OpportunityCategory } = endpoints;
      const response = await PrivateServer.getData(OpportunityCategory?.view)
  
      if(response?.data) {
        setProductCategoryData([...new Set(response?.data?.map((x: any) => ({ label: x?.opportunity_type_name, value: x?._id, key: x?.id?.toString() })))]);
      }
    } catch(error) {
      console.log("Error while getting opportunity category -- E:", error?.message);
    }
  }

  const getSRTypeData = async () => {
    try {
      const { SRType } = endpoints;
      const response = await PrivateServer.getData(SRType?.view)
  
      if(response?.data) {
        setSRType([...new Set(response?.data?.map((x: any) => ({ label: x?.sr_name, value: x?._id, key: x?.id?.toString() })))]);
      }
    } catch(error) {
      console.log("Error while getting sr type -- E:", error?.message);
    }
  }

  const getContacts = async () => {
    try {
      const { Contact } = endpoints;
      const response = await PrivateServer.getData(Contact?.view)
  
      if(response?.data) {
        setContactData(response?.data);
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

  const getOpporunitySubCategoryData = async () => {
    try {
      const { OpportunitySubCategory } = endpoints;
      const response = await PrivateServer.getData(OpportunitySubCategory?.view)
  
      if(response?.data) {
        setOpportunitySubCategoryData(response?.data);
        setOpportunitySubCategoryFilterData(response?.data);
      }
    } catch(error) {
      console.log("Error while getting opportunities sub categories -- E:", error?.message);
    }
  }

  const getUsers = async () => {
    try {
      const { Profile } = endpoints;
      const response = await PrivateServer.getData(Profile?.view)
  
      if(response?.data) {
        setUsersData(response?.data);
      }
    } catch(error) {
      console.log("Error while getting users -- E:", error?.message);
    }
  }

  const handleClose = () => {
    resetToFirstPage();
    setPipelineId("");
    setFormData({
      started_date: dayjs(new Date()),
      updated_date: "",
      expected_closure_date: "",
      product_category: "",
      product_description: "",
      pipeline_name: "",
      sr_type: "",
      opportunity_sub_type_name: "",
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
    } else if(type == "select") {
      if(_name == "company_name") {
        const _contact = contactData?.find((x) => x?.company_name == e?.label);
        setFormData({ ...formData, [_name]: e?.label, email: _contact?.email, contact_number: _contact?.primary_phone, name: _contact?.first_name });
      } else if(_name == "pipeline_name") {
        const _opportunity = productCategoryData?.find((x) => x?.label == e?.label);
        setFormData({ ...formData, [_name]: e?.label, product_description: _opportunity?.label, stage_name: _opportunity?.label });
      } else if(_name == "product_description") {
        setOpportunitySubCategoryData(opportunitySubCategoryFilterData?.filter((x) => x?.opportunity_name == e?.label));
        const _opportunity = productCategoryData?.find((x) => x?.label == e?.label);
        setFormData({ ...formData, [_name]: e?.label, pipeline_name: _opportunity?.label });
      } else if(_name == "opportunity_sub_type_name") {
        const _opportunity = opportunitySubCategoryData?.find((x) => x?.opportunity_sub_type_name == e?.label);
        setFormData({ ...formData, [_name]: e?.label, opportunity_status: _opportunity?.opportunity_name, stage_name: _opportunity?.opportunity_name, qty: "1", mrc: _opportunity?.mrc, annual_rev: (1 * parseInt(_opportunity?.mrc) * 12)?.toString() });
      } else if(_name == "opportunity_status") {
        const _opportunity = opportunities?.find((x) => x?.opportunity_name == e?.label);
        setFormData({ ...formData, [_name]: e?.label, stage_name: _opportunity?.opportunity_name });
      } else setFormData({ ...formData, [_name]: e?.label });
    } else if(type == 'date') {
      setFormData({ ...formData, [_name]: e });
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
      setShowToast(true);
      setError({ type: "success", message: "Pipeline deleted" })
    } catch(err) {
      setShowToast(true);
      setError({ type: "danger", message: err?.message })
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
        setShowToast(true);
        setError({ type: "success", message: `Pipeline ${formData?.pipelineId ? "updated" : "added"}` })
        if(formData?.pipelineId == "") setFormData({ ...formData, pipelineId: data?.data?._id })
        getPipelines();
        handleClose();
      }
    } catch(err) {
      setShowToast(true);
      setError({ type: "danger", message: err?.message })
      console.log("Error while saving pipeline -- E: ", err?.message);
    }
  }

  const columns = [
    {
      title: "Pipeline Name",
      dataIndex: "pipeline_name",
      sorter: (a: any, b: any) => a.pipeline_name.length - b.pipeline_name.length,
      filters: pipelineData
      ? [...new Set(pipelineData.map((item) => item.pipeline_name))].map((val) => ({
          text: val,
          value: val,
        }))
      : [],
      onFilter: (value, record) => record.pipeline_name.includes(value),
    },
    {
      title: "Started Date",
      dataIndex: "started_date",
      render: (text: any, record: any) => (
        <h2 className="d-flex align-items-center">
          <Link to={route.leads}
            className="d-flex flex-column fw-medium"
          >
            <span className="text-default">
              {
                moment(record?.started_date).format('YYYY-MM-DD')
              }  
            </span>
          </Link>
        </h2>
      ),
      sorter: (a: any, b: any) => a.started_date.length - b.started_date.length,
    },
    {
      title: "Updated Date",
      dataIndex: "updated_date",
      render: (text: any, record: any) => (
        <h2 className="d-flex align-items-center">
          <Link to={route.leads}
            className="d-flex flex-column fw-medium"
          >
            <span className="text-default">
              {
                moment(record?.updated_date).format('YYYY-MM-DD')
              }
            </span>
          </Link>
        </h2>
      ),
      sorter: (a: any, b: any) =>
        a.updated_date.length - b.updated_date.length,
    },
    {
      title: "Expected Closure",
      dataIndex: "expected_closure_date",
      render: (text: any, record: any) => (
        <h2 className="d-flex align-items-center">
          <Link to={route.leads}
            className="d-flex flex-column fw-medium"
          >
            <span className="text-default">
              {
                moment(record?.expected_closure_date).format('YYYY-MM-DD')
              }
            </span>
          </Link>
        </h2>
      ),
      sorter: (a: any, b: any) =>
        a.expected_closure_date.length - b.expected_closure_date.length,
    },
    {
      title: "Product Category",
      dataIndex: "product_category",
      sorter: (a: any, b: any) =>
        a.product_category.length - b.product_category.length,
      filters: productCategoryData
      ? [...new Set(productCategoryData.map((item) => item.product_category))].map((val) => ({
          text: val,
          value: val,
        }))
      : [],
      onFilter: (value, record) => record.product_category.includes(value),
    },
    {
      title: "Company Name",
      dataIndex: "company_name",
      sorter: (a: any, b: any) =>
        a.company_name.length - b.company_name.length,
      filters: companyName
      ? [...new Set(companyName.map((item) => item.label))].map((val) => ({
          text: val,
          value: val,
        }))
      : [],
      onFilter: (value, record) => record.company_name.includes(value),
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
      render: (text: any, record: any) => (
        <h2 className="d-flex align-items-center">
          <Link to={route.leads}
            className="d-flex flex-column fw-medium"
          >
            <span className="text-default">
              {
                moment(record?.followup_date).format('YYYY-MM-DD')
              }
            </span>
          </Link>
        </h2>
      ),
      sorter: (a: any, b: any) =>
        a.followup_date.length - b.followup_date.length,
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
          <span>({_stauts?.opportunity_name})</span>
          <span>({_stauts?.opportunity_percentage} %)</span>
        </div>
      )},
      sorter: (a: any, b: any) => a.opportunity_status.length - b.opportunity_status.length,
    },
    {
      title: "Created Date",
      dataIndex: "created_date",
      render: (text: any, record: any) => (
        <h2 className="d-flex align-items-center">
          <Link to={route.leads}
            className="d-flex flex-column fw-medium"
          >
            <span className="text-default">
              {
                moment(record?.created_date).format('YYYY-MM-DD')
              }
            </span>
          </Link>
        </h2>
      ),
      sorter: (a: any, b: any) =>
        a.created_date.length - b.created_date.length,
    },
    {
      title: "Created By",
      dataIndex: "profileId",
      sorter: (a: any, b: any) => a.profileId.length - b.profileId.length,
      render: (text: any, record: any) => (
        <h2 className="d-flex align-items-center">
          <Link to={route.companies} className="d-flex flex-column">
          {record?.profileId?.username}
            <span className="text-default">{record?.profileId?.email}</span>
          </Link>
        </h2>
      ),
      filters: usersData
      ? [...new Set(usersData?.map((item) => item?.username))].map((val) => ({
          text: val,
          value: val,
        }))
      : [],
      onFilter: (value, record) => record?.profileId?.username?.includes(value),
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
            <span className="text-default">{record?.groupId?.group_manager?.email}</span>
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
    resetToFirstPage();
    const _searchTerm = e?.target?.value?.toLowerCase() || "";
    setSearchTerm(_searchTerm);

    if (_searchTerm.trim() !== "") {  
      const searchResults = pipelineData.filter((obj) =>
        Object.values(obj).some(
          (val) =>
            typeof val === "string" &&
            val.toLowerCase().includes(_searchTerm)
        )
      );
      setFilteredSearchData(searchResults);
    } else {
      setFilteredSearchData(pipelineData);
    }
  }

  useEffect(() => {
    getPipelines();
    getProductCategories();
    getContacts();
    getCompanies();
    getOpporunityData();
    getOpporunitySubCategoryData();
    getOpportunityCategoriesData();
    getSRTypeData();
    getUsers();
    
    setFormData({ ...formData, sales_id: values?.currentUser });
    
    const savedPage = Number(localStorage.getItem("pipelineTablePage")) || 1;
    setPagination((prev) => ({ ...prev, current: savedPage }));
  }, [values?.currentUser])

  // 🔹 Save page to localStorage on change
  const handleTableChange = (newPagination, filters, sorter) => {
    setPagination(newPagination);
    localStorage.setItem("pipelineTablePage", newPagination.current.toString());
  };

  // 🔹 Reset to page 1 when refreshing/searching/filtering
  const resetToFirstPage = () => {
    setPagination((prev) => ({ ...prev, current: 1 }));
    localStorage.setItem("pipelineTablePage", "1");
  };
  
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
                {
                  showToast ? 
                  <ToastContainer position="top-end">
                    <Toast show={showToast} onClose={() => setShowToast((prev) => !prev)} bg={error?.type?.toLowerCase()} delay={3000} autohide>
                      <Toast.Header>
                        <strong className="me-auto">Request {error?.type}</strong>
                      </Toast.Header>
                      <Toast.Body>{error?.message}</Toast.Body>
                    </Toast>
                  </ToastContainer> : ""
                }
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
                    <Table 
                      dataSource={searchTerm != "" ? searchData : pipelineData} 
                      columns={columns} 
                      handleBulkAction={handleBulkOperation} 
                      rowKey="_id"
                      pagination={{
                        current: pagination.current,
                        pageSize: pagination.pageSize,
                        total: searchTerm != "" ? searchData?.length : pipelineData?.length,
                        showSizeChanger: true,
                        showQuickJumper: true,
                      }}
                      onChange={handleTableChange} 
                    />
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
            <label className="col-form-label">Pipeline Name *</label>
            <Select
              name="pipeline_name"
              onChange={(value) => handleChange(value, "select", "pipeline_name")}
              value={{ label: productCategoryData?.find((x: any) => x?.label == formData?.pipeline_name)?.label, value: formData?.pipeline_name }}
              className="select2" 
              classNamePrefix="react-select"
              options={productCategoryData}
              placeholder="Select an option"
            />
          </div>
          <div className="mb-3">
            <label className="col-form-label">
              Started Date <span className="text-danger">*</span>
            </label>
            <DatePicker
              className="form-control datetimepicker deals-details"
              value={formData?.started_date ? dayjs(formData.started_date) : null}
              onChange={(date) => handleChange(date, 'date', 'started_date')}
              format="DD-MM-YYYY"
            />
          </div>
          <div className="mb-3">
            <label className="col-form-label">
              Updated Date <span className="text-danger">*</span>
            </label>
            <DatePicker
              className="form-control datetimepicker deals-details"
              value={formData?.updated_date ? dayjs(formData.updated_date) : null}
              onChange={(date) => handleChange(date, 'date', 'updated_date')}
              format="DD-MM-YYYY"
              disabledDate={(current) =>
                current && current < dayjs(formData?.started_date).endOf('day')
              }
            />
          </div>
          <div className="mb-3">
            <label className="col-form-label">
              Expected Closure Date <span className="text-danger">*</span>
            </label>
            <DatePicker
              className="form-control datetimepicker deals-details"
              value={formData?.expected_closure_date ? dayjs(formData.expected_closure_date) : null}
              onChange={(date) => handleChange(date, 'date', 'expected_closure_date')}
              format="DD-MM-YYYY"
              disabledDate={(current) =>
                current && current < dayjs(formData?.started_date).endOf('day')
              }
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
                    <label className="col-form-label">Product Category *</label>
                    <Select
                      name="product_description"
                      onChange={(value) => handleChange(value, "select", "product_description")}
                      value={{ label: productCategoryData?.find((x: any) => x?.label == formData?.product_description)?.label, value: formData?.product_description }}
                      className="select2" 
                      classNamePrefix="react-select"
                      options={productCategoryData}
                      placeholder="Select an option"
                    />
                  </div>
                  <div className="mb-3">
                    <label className="col-form-label">Product Sub Category *</label>
                    <Select
                      name="opportunity_sub_type_name"
                      onChange={(value) => handleChange(value, "select", "opportunity_sub_type_name")}
                      value={{ label: formData?.opportunity_sub_type_name, value: formData?.opportunity_sub_type_name }}
                      className="select2" 
                      classNamePrefix="react-select"
                      options={[...new Set(opportunitySubCategoryData?.map((x) => ({ ...x, label: x?.opportunity_sub_type_name, value: x?.opportunity_sub_type_name })))]}
                      placeholder="Select an option"
                    />
                  </div>
                  <div className="mb-3">
                    <label className="col-form-label">SR Type *</label>
                    <Select
                      name="sr_type"
                      onChange={(value) => handleChange(value, "select", "sr_type")}
                      value={{ label: SRType?.find((x: any) => x?.label == formData?.sr_type)?.label, value: formData?.sr_type }}
                      className="select2" 
                      classNamePrefix="react-select"
                      options={SRType}
                      placeholder="Select an option"
                    />
                  </div>
                  <div className="mb-3">
                    <label className="col-form-label">QTY *</label>
                    <input
                      name="qty"
                      type="number"
                      value={formData?.qty}
                      onChange={handleChange}
                      onBlur={(e) => setFormData({ ...formData, annual_rev: (formData.qty ? parseInt(formData.qty) * parseInt(formData?.mrc) * 12 : parseInt(formData?.mrc) * 12)?.toString() })}
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
                      onBlur={(e) => setFormData({ ...formData, annual_rev: (formData.qty ? parseInt(formData.qty) * parseInt(formData?.mrc) * 12 : parseInt(formData?.mrc) * 12)?.toString() })}
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
              value={formData?.followup_date ? dayjs(formData?.followup_date) : null}
              onChange={(date) => handleChange(date, 'date', 'followup_date')}
              format="DD-MM-YYYY"
              disabledDate={(current) =>
                current && current < dayjs(formData?.updated_date).endOf('day')
              }
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
              disabled
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
        {
          !(formData?.started_date && formData?.updated_date) && (<div className="w-full mb-4">
            <Alert showIcon message="Start Date and Updated date is required." type="warning" />
          </div>)
        }
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
            disabled={(formData?.started_date && formData?.updated_date) ? false : true}
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
            <label className="col-form-label">Pipeline Name *</label>
            <Select
              name="pipeline_name"
              onChange={(value) => handleChange(value, "select", "pipeline_name")}
              value={{ label: productCategoryData?.find((x: any) => x?.label == formData?.pipeline_name)?.label, value: formData?.pipeline_name }}
              className="select2" 
              classNamePrefix="react-select"
              options={productCategoryData}
              placeholder="Select an option"
            />
          </div>
          <div className="mb-3">
            <label className="col-form-label">
              Started Date <span className="text-danger">*</span>
            </label>
            <DatePicker
              className="form-control datetimepicker deals-details"
              value={formData?.started_date ? dayjs(formData.started_date) : null}
              onChange={(date) => handleChange(date, 'date', 'started_date')}
              format="DD-MM-YYYY"
            />
          </div>
          <div className="mb-3">
            <label className="col-form-label">
              Updated Date <span className="text-danger">*</span>
            </label>
            <DatePicker
              className="form-control datetimepicker deals-details"
              value={formData?.updated_date ? dayjs(formData.updated_date) : null}
              onChange={(date) => handleChange(date, 'date', 'updated_date')}
              format="DD-MM-YYYY"
              disabledDate={(current) =>
                current && current < dayjs(formData?.started_date).endOf('day')
              }
            />
          </div>
          <div className="mb-3">
            <label className="col-form-label">
              Expected Closure Date <span className="text-danger">*</span>
            </label>
            <DatePicker
              className="form-control datetimepicker deals-details"
              value={formData?.expected_closure_date ? dayjs(formData.expected_closure_date) : null}
              onChange={(date) => handleChange(date, 'date', 'expected_closure_date')}
              format="DD-MM-YYYY"
              disabledDate={(current) =>
                current && current < dayjs(formData?.started_date).endOf('day')
              }
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
                    <Select
                      name="product_description"
                      onChange={(value) => handleChange(value, "select", "product_description")}
                      value={{ label: productCategoryData?.find((x: any) => x?.label == formData?.product_description)?.label, value: formData?.product_description }}
                      className="select2" 
                      classNamePrefix="react-select"
                      options={productCategoryData}
                      placeholder="Select an option"
                    />
                  </div>
                  <div className="mb-3">
                    <label className="col-form-label">Product Sub Category *</label>
                    <Select
                      name="opportunity_sub_type_name"
                      onChange={(value) => handleChange(value, "select", "opportunity_sub_type_name")}
                      value={{ label: formData?.opportunity_sub_type_name, value: formData?.opportunity_sub_type_name }}
                      className="select2" 
                      classNamePrefix="react-select"
                      options={[...new Set(opportunitySubCategoryData?.map((x) => ({ ...x, label: x?.opportunity_sub_type_name, value: x?.opportunity_sub_type_name })))]}
                      placeholder="Select an option"
                    />
                  </div>
                  <div className="mb-3">
                    <label className="col-form-label">SR Type *</label>
                    <Select
                      name="sr_type"
                      onChange={(value) => handleChange(value, "select", "sr_type")}
                      value={{ label: SRType?.find((x: any) => x?.label == formData?.sr_type)?.label, value: formData?.sr_type }}
                      className="select2" 
                      classNamePrefix="react-select"
                      options={SRType}
                      placeholder="Select an option"
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
                      onBlur={(e) => setFormData({ ...formData, annual_rev: (parseInt(formData?.mrc) * 12)?.toString() })}
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
              value={formData?.followup_date ? dayjs(formData.followup_date) : null}
              onChange={(date) => handleChange(date, 'date', 'followup_date')}
              format="DD-MM-YYYY"
              disabledDate={(current) =>
                current && current < dayjs(formData?.updated_date).endOf('day')
              }
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
              disabled
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
        {
          !(formData?.updated_date && formData?.followup_date) && (<div className="w-full mb-4">
            <Alert showIcon message="Updated Date and Follow up date is required." type="warning" />
          </div>)
        }
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
            data-bs-dismiss="offcanvas"
            disabled={(formData?.updated_date && formData?.followup_date) ? false : true}
          >
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
