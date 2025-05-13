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

const route = all_routes;
const Pipeline = () => {
  const [pipelineData, setPipelineData] = useState([]);
  const [stageData, setStageData] = useState({
    name: "",
    percentage: ""
  });
  const [pipelineId, setPipelineId] = useState("");
  const [formData, setFormData] = useState({
    pipeline_name: "",
    stage_name: [],
    stage_percentage: [],
    created_date: moment(new Date()).format("YYYY-MM-DD"),
    pipelineId: "",
  });

  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
    setFormData({ ...formData, created_date: moment(date).format('YYYY-MM-DD') });
  };
  const dispatch = useDispatch();
  const activityToggle = useSelector(
    (state: any) => state?.activityTogglePopup
  );
  const activityToggleTwo = useSelector(
    (state: any) => state?.activityTogglePopupTwo
  );

  const getPipelines = async () => {
    try {
      const { Pipeline } = endpoints;
      const response = await PrivateServer.getData(Pipeline?.view)
  
      console.log("data -- ", response)
      if(response?.data) setPipelineData(response?.data);
    } catch(error) {
      console.log("Error while getting pipeline -- E:", error?.message);
    }
  }

  const handleClose = () => {
    setPipelineId("");
    setFormData({
      pipeline_name: "",
      stage_name: [],
      stage_percentage: [],
      created_date: moment(new Date()).format("YYYY-MM-DD"),
      pipelineId: "",
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
    console.log("Edit pipeline clicked -- ", values);
    setFormData({ ...formData, ..._.omit(values, ["_id"]), pipelineId: values?._id });
  }

  const handleAddOrUpdatePipeline = async () => {
    try {
      const { Pipeline } = endpoints;
      const { status, data } = formData?.pipelineId !== "" ? await PrivateServer?.patchData(Pipeline.patch, formData?.pipelineId, formData) : await PrivateServer.postData(Pipeline.create, formData);

      if(status == 200) {
        if(formData?.pipelineId == "") setFormData({ ...formData, pipelineId: data?.data?._id })
        getPipelines();
      }
    } catch(err) {
      console.log("Error while saving pipeline -- E: ", err?.message);
    }
  }

  const columns = [
    {
      title: "Pipeline Name",
      dataIndex: "pipeline_name",
      sorter: (a: any, b: any) => a.opportunity_name.length - b.opportunity_name.length,
    },
    {
      title: "Stage Percentage",
      dataIndex: "stage_percentage",
      sorter: (a: any, b: any) =>
        a.stage_percentage.length - b.stage_percentage.length,
    },
    {
      title: "Stages",
      dataIndex: "stage",
      render: (text: any, record: any) => (
        <div className="pipeline-progress d-flex align-items-center">
          <div className="progress">
            {(record?.stage_percentage > "0" && record?.stage_percentage <= "30") && (
              <div
                className="progress-bar progress-bar-violet"
                role="progressbar"
              ></div>
            )}
            {(record?.stage_percentage >= "30" && record?.stage_percentage <= "50") && (
              <div
                className="progress-bar progress-bar-success"
                role="progressbar"
              ></div>
            )}
            {(record?.stage_percentage >= "50" && record?.stage_percentage <= "70") && (
              <div
                className="progress-bar progress-bar-warning"
                role="progressbar"
              ></div>
            )}
            {(record?.stage_percentage >= "70" && record?.stage_percentage <= "100") && (
              <div
                className="progress-bar progress-bar-violet"
                role="progressbar"
              ></div>
            )}
          </div>
          <span>({record?.stage_percentage} %)</span>
        </div>
      ),
      sorter: (a: any, b: any) => a.stage_percentage.length - b.stage_percentage.length,
    },
    {
      title: "Created Date",
      dataIndex: "created_date",
      sorter: (a: any, b: any) =>
        a.created_date.length - b.created_date.length,
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
           <Link className="dropdown-item" data-bs-toggle="offcanvas" data-bs-target="#offcanvas_edit" to="#"><i className="ti ti-edit text-blue"></i> Edit</Link>
            <Link
              className="dropdown-item"
              to="#"
              data-bs-toggle="modal"
              data-bs-target="#delete_pipeline"
              onClick={() => setPipelineId(record?._id)}
            >
              <i className="ti ti-trash text-danger"></i> Delete
            </Link>
          </div>
        </div>
      ),
    },
  ];

  const handleEditStages = (_items, action="") => {
    let _stages: any = [...formData?.stage_name]
    let _percentages: any = [...formData?.stage_percentage]

    if(action == "delete") {
      _stages = _.without(_stages, _items?.name);
      _percentages = _.without(_stages, _items?.percentage);
    } else {
      _stages = [..._stages, _items?.name];
      _percentages = [..._percentages, _items?.percentage];
    }

    setFormData({ ...formData, stage_name: _stages, stage_percentage: _percentages });
  }

  useEffect(() => {
    getPipelines()
  }, [])

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
                      Pipeline<span className="count-title">{pipelineData?.length}</span>
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
      <div className="dropdown me-2">
        <Link
          to="#"
          className="dropdown-toggle"
          data-bs-toggle="dropdown"
        >
          <i className="ti ti-sort-ascending-2 me-2" />
          Sort
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
      <div className="dropdown">
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
          <h4 className="mb-2 fw-semibold">Want to manage datatables?</h4>
          <p className="mb-3">
            Please drag and drop your column to reorder your table and enable
            see option as you want.
          </p>
          <div className="border-top pt-3">
            <div className="d-flex align-items-center justify-content-between mb-3">
              <p className="mb-0 d-flex align-items-center">
                <i className="ti ti-grip-vertical me-2" />
                Pipeline Name
              </p>
              <div className="status-toggle">
                <input type="checkbox" id="col-name" className="check" />
                <label htmlFor="col-name" className="checktoggle" />
              </div>
            </div>
            <div className="d-flex align-items-center justify-content-between mb-3">
              <p className="mb-0 d-flex align-items-center">
                <i className="ti ti-grip-vertical me-2" />
                Stages
              </p>
              <div className="status-toggle">
                <input type="checkbox" id="col-tag" className="check" />
                <label htmlFor="col-tag" className="checktoggle" />
              </div>
            </div>
            <div className="d-flex align-items-center justify-content-between mb-3">
              <p className="mb-0 d-flex align-items-center">
                <i className="ti ti-grip-vertical me-2" />
                Created Dates
              </p>
              <div className="status-toggle">
                <input type="checkbox" id="col-loc" className="check" />
                <label htmlFor="col-loc" className="checktoggle" />
              </div>
            </div>
            <div className="d-flex align-items-center justify-content-between mb-3">
              <p className="mb-0 d-flex align-items-center">
                <i className="ti ti-grip-vertical me-2" />
                Action
              </p>
              <div className="status-toggle">
                <input type="checkbox" id="col-rate" className="check" />
                <label htmlFor="col-rate" className="checktoggle" />
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
        <div className="filter-dropdown-menu dropdown-menu dropdown-menu-md-end p-3">
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
      <Link
        to="#"
        className="btn btn-primary"
        data-bs-toggle="offcanvas"
        data-bs-target="#offcanvas_pipeline"
      >
        <i className="ti ti-square-rounded-plus me-2" />
        Add Pipeline
      </Link>
    </div>
  </div>
  {/* /Filter */}
</>

                  {/* Pipeline List */}
                  <div className="table-responsive custom-table">
                    <Table dataSource={pipelineData} columns={columns} />
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
              Pipeline Name <span className="text-danger">*</span>
            </label>
            <input className="form-control" type="text" name="pipeline_name" value={formData?.pipeline_name} onChange={handleChange} />
          </div>
          <div className="mb-3">
            <div className="pipe-title d-flex align-items-center justify-content-between">
              <h5 className="form-title">Pipeline Stages</h5>
              <Link
                to="#"
                className="add-stage"
                data-bs-toggle="modal"
                data-bs-target="#add_stage"
              >
                <i className="ti ti-square-rounded-plus" />
                Add New
              </Link>
            </div>
            <div className="pipeline-listing">
              {
                _.flatMap(pipelineData, (item:any) =>
                _.zipWith(item?.stage_name, item?.stage_percentage, (name, percentage) => ({
                    name,
                    percentage
                })))?.map((x: any, index: number) => (
                  <div key={index} className="pipeline-item">
                    <p>
                      <i className="ti ti-grip-vertical" /> {x?.name} - ({x?.percentage})
                    </p>
                    <div className="action-pipeline">
                      <Link
                        to="#"
                        data-bs-toggle="modal"
                        data-bs-target="#edit_stage"
                        onClick={() => handleEditStages(x, 'edit')}
                      >
                        <i className="ti ti-edit text-blue" />
                        Edit
                      </Link>
                      <Link
                        to="#"
                        data-bs-toggle="modal"
                        data-bs-target="#delete_stage"
                        onClick={() => handleEditStages(x, 'delete')}
                      >
                        <i className="ti ti-trash text-danger" />
                        Delete
                      </Link>
                    </div>
                  </div>
                ))
              }
            </div>
          </div>
          <div className="mb-3">
            <label className="col-form-label">
              Created Date <span className="text-danger">*</span>
            </label>
            <DatePicker
              value={selectedDate ? moment(selectedDate) : null}
              className="form-control datetimepicker deals-details"
              name="created_date"
              onChange={(date) => handleDateChange(date?.toDate() || null)}
              format="DD-MM-YYYY"
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
              Pipeline Name <span className="text-danger">*</span>
            </label>
            <input
              name="pipeline_name"
              value={formData?.pipeline_name}
              onChange={handleChange}
              className="form-control"
              type="text"
              defaultValue="Inpipeline"
            />
          </div>
          <div className="mb-3">
            <div className="pipe-title d-flex align-items-center justify-content-between">
              <h5 className="form-title">Pipeline Stages</h5>
              <Link
                to="#"
                className="add-stage"
                data-bs-toggle="modal"
                data-bs-target="#add_stage"
              >
                <i className="ti ti-square-rounded-plus" />
                Add New
              </Link>
            </div>
            <div className="pipeline-listing">
              {
                _.flatMap(pipelineData, (item:any) =>
                _.zipWith(item?.stage_name, item?.stage_percentage, (name, percentage) => ({
                    name,
                    percentage
                })))?.map((x: any, index: number) => (
                  <div key={index} className="pipeline-item">
                    <p>
                      <i className="ti ti-grip-vertical" /> {x?.name} - ({x?.percentage})
                    </p>
                    <div className="action-pipeline">
                      <Link
                        to="#"
                        data-bs-toggle="modal"
                        data-bs-target="#edit_stage"
                        onClick={() => setStageData(x)}
                      >
                        <i className="ti ti-edit text-blue" />
                        Edit
                      </Link>
                      <Link
                        to="#"
                        data-bs-toggle="modal"
                        data-bs-target="#delete_stage"
                        onClick={() => setStageData(x)}
                      >
                        <i className="ti ti-trash text-danger" />
                        Delete
                      </Link>
                    </div>
                  </div>
                ))
              }
            </div>
          </div>
          <div className="mb-3">
            <label className="col-form-label">
              Created Date <span className="text-danger">*</span>
            </label>
            <DatePicker
              value={selectedDate ? moment(selectedDate) : null}
              className="form-control datetimepicker deals-details"
              name="created_date"
              onChange={(date) => handleDateChange(date?.toDate() || null)}
              format="DD-MM-YYYY"
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
            onClick={() => handleEditStages(stageData, 'edit')}
          data-bs-dismiss="offcanvas">
            Save Changes
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
              <Link to="#" className="btn btn-danger" onClick={handleDeletePipeline}>
                Yes, Delete it
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  {/* /Delete Stage */}
  {/* Delete Stage */}
  <div className="modal fade" id="delete_stage" role="dialog">
    <div className="modal-dialog modal-dialog-centered">
      <div className="modal-content">
        <div className="modal-body">
          <div className="text-center">
            <div className="avatar avatar-xl bg-danger-light rounded-circle mb-3">
              <i className="ti ti-trash-x fs-36 text-danger" />
            </div>
            <h4 className="mb-2">Remove Stage?</h4>
            <p className="mb-0">
              Are you sure you want to remove <br /> stage you selected.
            </p>
            <div className="d-flex align-items-center justify-content-center mt-4">
              <Link
                to="#"
                className="btn btn-light me-2"
                data-bs-dismiss="modal"
              >
                Cancel
              </Link>
              <Link to="#" className="btn btn-danger" onClick={() => handleEditStages(stageData, 'delete')}>
                Yes, Delete it
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  {/* /Delete Stage */}
  {/* Add Stage */}
  <div className="modal custom-modal fade" id="add_stage" role="dialog">
    <div className="modal-dialog modal-dialog-centered">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">Add Stage</h5>
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
              <label className="col-form-label">Stage Name *</label>
              <input
                name="stage_name"
                value={stageData?.name}
                onChange={(e) => setStageData({ ...stageData, name: e?.target?.value })}
                type="text"
                className="form-control"
                defaultValue="Inpipeline"
              />
            </div>
            <div className="mb-3">
              <label className="col-form-label">Stage Percentage *</label>
              <input
                name="stage_name"
                value={stageData?.percentage}
                onChange={(e) => setStageData({ ...stageData, percentage: e?.target?.value })}
                type="text"
                className="form-control"
                defaultValue="Inpipeline"
              />
            </div>
            <div className="modal-btn text-end">
              <Link to="#" className="btn btn-light" data-bs-dismiss="modal">
                Cancel
              </Link>
              <Link  to="#" className="btn btn-danger"  data-bs-dismiss="modal" onClick={() => handleEditStages(stageData, 'edit')}>
                Add
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
  {/* /Add Stage */}
  {/* Edit Stage */}
  <div className="modal custom-modal fade" id="edit_stage" role="dialog">
    <div className="modal-dialog modal-dialog-centered">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">Edit Stage</h5>
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
              <label className="col-form-label">Stage Name *</label>
              <input
                name="stage_name"
                value={stageData?.name}
                onChange={(e) => setStageData({ ...stageData, name: e?.target?.value })}
                type="text"
                className="form-control"
                defaultValue="Inpipeline"
              />
            </div>
            <div className="mb-3">
              <label className="col-form-label">Stage Percentage *</label>
              <input
                name="stage_name"
                value={stageData?.percentage}
                onChange={(e) => setStageData({ ...stageData, percentage: e?.target?.value })}
                type="text"
                className="form-control"
                defaultValue="Inpipeline"
              />
            </div>
            <div className="modal-btn text-end">
              <Link to="#" className="btn btn-light" data-bs-dismiss="modal">
                Cancel
              </Link>
              <Link  to="#" className="btn btn-danger"  data-bs-dismiss="modal" onClick={() => handleEditStages(stageData, 'edit')}>
                Save Changes
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
  {/* /Edit Stage */}
</>

    </>
  );
};

export default Pipeline;
