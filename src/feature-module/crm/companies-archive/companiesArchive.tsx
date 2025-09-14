import React, { useCallback, useState } from "react";

import { Link } from "react-router-dom";
import { all_routes } from "../../router/all_routes";
import { useDispatch, useSelector } from "react-redux";
import CollapseHeader from "../../../core/common/collapse-header";
import Select from "react-select";
import Table from "../../../core/common/dataTable/index";
import { Toast, Modal, ToastContainer } from "react-bootstrap";
import PrivateServer from "../../../helper/PrivateServer";
import { endpoints } from "../../../helper/endpoints";
import useAuth from "../../../hooks/useAuth";
import _ from "lodash";
import { useDropzone } from "react-dropzone";
import * as XLSX from "xlsx";
import dayjs from "dayjs";
import { DatePicker } from "antd";
import moment from "moment";

const CompaniesArchive = () => {
  const token = localStorage.getItem("token");
  const { values } = useAuth();
  
  const [openModal, setOpenModal] = useState(false);
  const [openModal2, setOpenModal2] = useState(false);
  const [companyData, setCompanyData] = useState([]);
  const [companyArchiveData, setCompanyArchiveData] = useState([]);
  const [usersData, setUsersData] = useState([]);
  const [searchData, setFilteredSearchData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [companyArchiveId, setCompanyArchiveId] = useState("");
  const [showBulkActionButton, setShowBulkActionButton] = useState(false);
  const [showBulkDeleteModal, setShowBulkDeleteModal] = useState(false);
  const [selectedRows, setSelectedRows] = useState(0);
  const [selectedIds, setSelectedIds] = useState([]);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
  });
  const [formData, setFormData] = useState({
    companyArchiveId: "",
    companyId: "",
    company_name: "",
    file_paths: [],
    uploaded_date: dayjs(new Date()),
    updated_date: "",
    description: "",
  });
  const [error, setError] = useState({
    type: "primary",
    message: ""
  });
  const [showToast, setShowToast] = useState(false);
  const [owner, setOwner] = useState(["Collab"]);
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

  const getCompaniesArchives = async () => {
    try {
      const { CompaniesArchive } = endpoints;
      const response = await PrivateServer.getData(CompaniesArchive?.view)
  
      if(response?.data) {
        setShowToast(true);
        setError({ type: "success", message: `(${response?.data?.length}) Companies archive found` })
        setCompanyArchiveData([...new Set(response?.data?.map((x: any) => ({ ...x, key: x?.id?.toString() })))]);
        setFilteredSearchData([...new Set(response?.data?.map((x: any) => ({ ...x, key: x?.id?.toString() })))]);
      }
    } catch(error) {
      setShowToast(true);
      setError({ type: "danger", message: `No Companies archive found` })
      console.log("Error while getting companies -- E:", error?.message);
    }
  }
  
  const getCompaniesData = async () => {
    try {
      const { Companies } = endpoints;
      const response = await PrivateServer.getData(Companies?.view)
  
      if(response?.data) {
        setShowToast(true);
        setError({ type: "success", message: `(${response?.data?.length}) Companies found` })
        setCompanyData(response?.data);
      }
    } catch(error) {
      setShowToast(true);
      setError({ type: "danger", message: `No Companies found` })
      console.log("Error while getting companies -- E:", error?.message);
    }
  }

  const getUsersData = async () => {
    try {
      const { Profile } = endpoints;
      const response = await PrivateServer.getData(Profile?.view)
  
      if(response?.data) {
        const _data: any = [...new Set(response?.data?.map((x: { email: any; _id: any; }) => ({ ...x, label: x?.username, value: x?.email })))]
        setUsersData(_data);
      }
    } catch(error) {
      console.log("Error while getting companies -- E:", error?.message);
    }
  }

  // Call initializeStarsState once when the component mounts
  React.useEffect(() => {
    getCompaniesData();
    getCompaniesArchives();
    getUsersData();    

    const savedPage = Number(localStorage.getItem("companyArchiveTablePage")) || 1;
    setPagination((prev) => ({ ...prev, current: savedPage }));
  }, []);

  const handleClose = () => {
    resetToFirstPage();
    setCompanyArchiveId("")
    setFormData({
        companyArchiveId: "",
        companyId: "",
        company_name: "",
        file_paths: [],
        uploaded_date: dayjs(new Date()),
        updated_date: "",
        description: "",
    });
  }

  // 🔹 Save page to localStorage on change
  const handleTableChange = (newPagination, filters, sorter) => {
    setPagination(newPagination);
    localStorage.setItem("companyArchiveTablePage", newPagination.current.toString());
  };

  // 🔹 Reset to page 1 when refreshing/searching/filtering
  const resetToFirstPage = () => {
      setPagination((prev) => ({ ...prev, current: 1 }));
      localStorage.setItem("companyArchiveTablePage", "1");
    };
    
   const onDrop = useCallback((acceptedFiles: File[], rejectedFiles: any) => {
    // Save selected files to formData
    if (rejectedFiles.length > 0) {
      rejectedFiles.forEach((file: any) => {
        alert(
          `❌ ${file.file.name} was rejected. Reason: ${file.errors
            .map((e: any) => e.message)
            .join(", ")}`
        );
      });
    }

    // ✅ Restrict to max 5 total files
    let updatedFiles = [...(formData?.file_paths || []), ...acceptedFiles];
    if (updatedFiles.length > 5) {
      alert("❌ You can only upload up to 5 files.");
      updatedFiles = updatedFiles.slice(0, 5); // keep only first 5
    }

    handleChange(acceptedFiles, "file", "file_paths");
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: true, // allow multiple
    maxFiles: 5, // ✅ restrict dropzone itself
    accept: {
      "image/*": [], // allow all images
      "application/pdf": [], // allow PDFs
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [], // docx
    },
    maxSize: 50 * 1024 * 1024, // 50 MB per file
  });

  const handleChange = (e, type="", _name="") => {    
    if(type == "file") {
      setFormData({ ...formData, file_paths: e });
    } else if(type == "select") {
      setFormData({ ...formData, [_name]: e?.value, company_name: e?.label });
    } else if(type == 'date') {
      setFormData({ ...formData, [_name]: e });
    } else {
      const { name, value } = e.target; 
      setFormData({ ...formData, [name]: value });
    }
  }

  const handleDeleteCompanyArchive = async () => {
    try {
      const { CompaniesArchive } = endpoints;
      const response = await PrivateServer?.deleteData(CompaniesArchive?.delete, companyArchiveId);
      if(response) getCompaniesArchives();
      setShowToast(true);
      setError({ type: "success", message: `Companie deleted` })
    } catch(err) {
      setShowToast(true);
      setError({ type: "danger", message: `Error while deleting company` })
      console.log("Error while deleting contact -- E: ", err?.message);
    }
  }

  const handleDownloadZip = async (_record) => {
  try {
    setCompanyArchiveId(_record?._id);
    const { CompaniesArchive } = endpoints;

    // Step 1: Request backend to prepare the archive
    const res = await PrivateServer?.getData(`${CompaniesArchive?.download_archieve}/${_record?._id}`);

    if (res?.downloadUrl) {
      // Step 2: Fetch the file with JWT headers
      const fileRes = await fetch(res.downloadUrl, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`, // Replace with your actual token logic
        }
      });

      if (!fileRes.ok) throw new Error("Failed to fetch file");

      const blob = await fileRes.blob();
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "company_archive.zip");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setShowToast(true);
      setError({ type: "success", message: `Downloading files` });
    } else {
      setShowToast(true);
      setError({ type: "danger", message: `File not found or expired` });
    }

  } catch (err) {
    setShowToast(true);
    setError({ type: "danger", message: `Error while preparing archive` });
    console.log("Error while preparing archive -- E:", err?.message);
  }
};

  const handleEditContact = (values) => {
    setFormData({ ...formData, ..._.omit(values, ["_id"]), companyArchiveId: values?._id });
  }

  const handleAddOrUpdateCompaniesArchive = async () => {
    try {
        const { CompaniesArchive } = endpoints;

        // Build FormData
        const fd = new FormData();

        // Append scalar values (convert objects/arrays to JSON if needed)
        fd.append("companyArchiveId", formData.companyArchiveId);
        fd.append("companyId", formData.companyId);
        fd.append("company_name", formData.company_name);
        fd.append("updated_date", formData.updated_date);
        fd.append("uploaded_date", formData.uploaded_date ? dayjs(formData.uploaded_date).toISOString() : "");
        fd.append("description", formData.description);

        formData.file_paths.forEach((file: File) => {
            fd.append("file_paths", file); // append actual File object
        });

        // Call API
        const { status, data } =
        formData?.companyArchiveId !== ""
            ? await PrivateServer.patchData(
                CompaniesArchive.patch,
                formData?.companyArchiveId,
                formData,
            )
            : await PrivateServer.postData(CompaniesArchive.create, fd, {
                    headers: {
                        "Content-Type": "multipart/form-data", // ✅ You can include it, Axios will handle boundary
                    },
                });

        if (status === 200 || !_.isEmpty(data)) {
        setShowToast(true);
        setError({
                type: "success",
                message: `Company ${
                formData?.companyArchiveId ? "updated" : "added"
            }`,
        });

        if (formData?.companyArchiveId === "")
            setFormData({
                ...formData,
                companyArchiveId: data?.data?._id,
            });

            getCompaniesArchives();
        }
    } catch (err: any) {
        setShowToast(true);
        setError({ type: "danger", message: err?.message });
        console.log("Error while saving contact -- E: ", err?.message);
    }
    };
  
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
      resetToFirstPage();
      // Convert data to worksheet format
      const worksheet = XLSX.utils.json_to_sheet(cleanData(companyArchiveData, ["_id", "__v"]));

      // Create a new workbook and append the worksheet
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Companies Archive");

      // Write the file and trigger download
      XLSX.writeFile(workbook, 'etisalat_companies_archive_data.xlsx');

    } catch(err) {
      console.log("Error == ", err);
    }
  }
  
  const handleSearch = (e) => {
    resetToFirstPage();
    const _searchTerm = e?.target?.value?.toLowerCase() || "";
    setSearchTerm(_searchTerm);

    if (_searchTerm.trim() !== "") {  
      const searchResults = companyArchiveData.filter((obj) =>
        Object.values(obj).some(
          (val) =>
            typeof val === "string" &&
            val.toLowerCase().includes(_searchTerm)
        )
      );
      setFilteredSearchData(searchResults);
    } else {
      setFilteredSearchData(companyArchiveData);
    }
  }

  const columns = [
    {
      title: "Company Name",
      dataIndex: "company_name",
      render: (text: any, record: any) => (
        <h2 className="d-flex align-items-center">
          <Link to={route.companyDetails}
            className="d-flex flex-column fw-medium"
          >
            {record.company_name}
          </Link>
        </h2>
      ),
      sorter: (a: any, b: any) => a?.company_name?.length - b?.company_name?.length,
      filters: companyData
      ? [...new Set(companyData.map((item) => item.company_name))].map((val) => ({
          text: val,
          value: val,
        }))
      : [],
      onFilter: (value, record) => record.company_name.includes(value),
    },
    {
      title: "Description",
      dataIndex: "description",
      sorter: (a: any, b: any) => a.description.length - b.description.length,
    },
    {
      title: "Uploaded Date",
      dataIndex: "uploaded_date",
      render: (text: any, record: any) => (
        <h2 className="d-flex align-items-center">
          <Link to={route.companyDetails}
            className="d-flex flex-column fw-medium"
          >
            {moment(record?.uploaded_date)?.format('YYYY-MM-DD')}
          </Link>
        </h2>
      ),
      sorter: (a: any, b: any) => a.uploaded_date.length - b.uploaded_date.length,
    },
    {
      title: "Updated Date",
      dataIndex: "updated_date",
      render: (text: any, record: any) => (
        <h2 className="d-flex align-items-center">
          <Link to={route.companyDetails}
            className="d-flex flex-column fw-medium"
          >
            {record?.updated_date ? moment(record?.updated_date)?.format('YYYY-MM-DD') : ""}
          </Link>
        </h2>
      ),
      sorter: (a: any, b: any) => a.updated_date.length - b.updated_date.length,
    },
    {
      title: "Attachments",
      dataIndex: "file_paths",
      render: (text: any, record: any) => (
        <h2 className="d-flex align-items-center">
          <Link to={route.companyDetails}
            className="d-flex flex-column fw-medium"
          >
            {record?.file_paths?.length}
          </Link>
        </h2>
      ),
      sorter: (a: any, b: any) => a.file_paths.length - b.file_paths.length,
    },
    {
      title: "Created By",
      dataIndex: "profileId",
      sorter: (a: any, b: any) => a.profileId.length - b.profileId.length,
      filters: usersData
      ? [...new Set(usersData?.map((item) => item?.username))].map((val) => ({
          text: val,
          value: val,
        }))
      : [],
      onFilter: (value, record) => record?.profileId?.username?.includes(value),
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
      title: "Team Leader",
      dataIndex: "groupId",
      sorter: (a: any, b: any) => a.groupId.length - b.groupId.length,
      render: (text: any, record: any) => (
        <h2 className="d-flex align-items-center">
          <Link to={route.companies} className="d-flex flex-column">
          {record?.groupId?.group_manager?.username}
            <span className="text-default">{record?.groupId?.group_manager?.email}</span>
          </Link>
        </h2>
      ),
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
              onClick={() => handleDownloadZip(record)}
            >
              <i className="ti ti-download text-success" /> Download Zip
            </Link>
            {values?.permissions?.includes('update') && (<Link
              className="dropdown-item"
              to="#"
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvas_edit"
              onClick={() => handleEditContact(record)}
            >
              <i className="ti ti-edit text-blue" /> Edit
            </Link>)}
            {values?.permissions?.includes('delete') && (<Link
              className="dropdown-item"
              to="#"
              data-bs-toggle="modal"
              data-bs-target="#delete_contact"
              onClick={() => setCompanyArchiveId(record?._id)}
            >
              <i className="ti ti-trash text-danger" /> Delete
            </Link>)}
            <Link className="dropdown-item" to={route.companyDetails} state={{ ...record, totalData: companyArchiveData?.length }}><i className="ti ti-eye text-blue-light"></i> Preview</Link>
          </div>
        </div>
      ),
    },
  ];

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
    const { Companies } = endpoints;
    const deleted = await PrivateServer.deleteBulkData(Companies?.delete_bulk, selectedIds)
    if(deleted) {
      setShowBulkActionButton(false);
      setShowBulkDeleteModal(false);
    }
  }

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
                      Companies Archives<span className="count-title">{searchTerm != "" ? searchData?.length : companyArchiveData?.length}</span>
                    </h4>
                  </div>
                  <div className="col-4 text-end">
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
                          onChange={handleSearch}
                        />
                      </div>
                    </div>
                    <div className="col-sm-8">
                      <div className="d-flex align-items-center flex-wrap row-gap-2 justify-content-sm-end">
                        {values?.roleId?.name?.toLowerCase() == 'admin' && (<div className="dropdown me-2">
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
                        {values?.permissions?.includes('create') && (<Link
                          to="#"
                          className="btn btn-primary"
                          data-bs-toggle="offcanvas"
                          data-bs-target="#offcanvas_add"
                        >
                          <i className="ti ti-square-rounded-plus me-2" />
                          Add Company Archive
                        </Link>)}
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
                    </div>
                    <div className="d-flex align-items-center flex-wrap row-gap-2">
                      
                    </div>
                  </div>

                  {/* /Filter */}
                  {/* Contact List */}
                  <div className="table-responsive custom-table">
                    <Table 
                      dataSource={searchTerm != "" ? searchData : companyArchiveData} 
                      columns={columns} 
                      handleBulkAction={handleBulkOperation} 
                      rowKey="_id"
                      pagination={{
                        current: pagination.current,
                        pageSize: pagination.pageSize,
                        total: searchTerm != "" ? searchData?.length : companyArchiveData?.length,
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
                <h4 className="mb-2">Remove Companies Archive?</h4>
                <p className="mb-0">
                  Company {formData?.company_name} from your Account.
                </p>
                <div className="d-flex align-items-center justify-content-center mt-4">
                  <Link
                    to="#"
                    className="btn btn-light me-2"
                    data-bs-dismiss="modal"
                  >
                    Cancel
                  </Link>
                  <Link to="#" className="btn btn-danger" onClick={handleDeleteCompanyArchive} data-bs-dismiss="modal">
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
          <h5 className="fw-semibold">Add Company Archive</h5>
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
                    Basic Info
                  </Link>
                </div>
                <div
                  className="accordion-collapse collapse show"
                  id="basic"
                  data-bs-parent="#main_accordion"
                >
                  <div className="accordion-body border-top">
                    <div className="row">
                    <div className="mb-3">
                        <label className="col-form-label">
                            Upload Files <span className="text-danger">*</span>
                        </label>
                        <div
                            {...getRootProps()}
                                className={`border rounded p-4 text-center ${
                                isDragActive ? "bg-light" : ""
                                }`}
                                style={{ cursor: "pointer" }}
                            >
                                <input {...getInputProps()} />
                                {isDragActive ? (
                                <p>Drop the files here ...</p>
                                ) : (
                                <p>
                                    Drag & drop files here, or click to select
                                    <br />
                                    <small>(Allowed: JPG, PNG, PDF, DOCX | Max: 5 files | Max size: 5MB each)</small>
                                </p>
                                )}
                            </div>

                            {/* Preview selected files */}
                            {formData?.file_paths?.length > 0 && (
                                <ul className="mt-2">
                                {formData.file_paths.map((file: any, idx: number) => (
                                    <li key={idx}>
                                    {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
                                    </li>
                                ))}
                                </ul>
                            )}
                        </div>
                      <div className="mb-3">
                        <label className="col-form-label">Company*</label>
                        <Select
                            name="companyId"
                            onChange={(value) => handleChange(value, "select", "companyId")}
                            value={{ label: companyData?.find((x: any) => x?._id == formData?.companyId)?.company_name, value: formData?.companyId }}
                            className="select2" 
                            classNamePrefix="react-select"
                            options={[...new Set(companyData?.map((x) => ({ ...x, label: x?.company_name, value: x?._id })))]}
                            placeholder="Select an option"
                        />
                      </div>
                      <div className="col-md-12">
                        <div className="mb-3">
                          <label className="col-form-label">Company Name</label>
                          <input name="company_name" value={formData?.company_name} onChange={handleChange} type="text" className="form-control" />
                        </div>
                      </div>
                      <div className="mb-3">
                        <label className="col-form-label">
                            Uploaded Date <span className="text-danger">*</span>
                        </label>
                        <DatePicker
                            className="form-control datetimepicker deals-details"
                            value={formData?.uploaded_date ? dayjs(formData.uploaded_date) : null}
                            onChange={(date) => handleChange(date, 'date', 'uploaded_date')}
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
                                current && current < dayjs(formData?.uploaded_date).endOf('day')
                            }
                        />
                      </div>
                      <div className="col-md-12">
                        <div className="mb-0">
                          <label className="col-form-label">
                            Description <span className="text-danger">*</span>
                          </label>
                          <textarea
                            name="description" value={formData?.description} onChange={handleChange}
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
                data-bs-dismiss="offcanvas"
                className="btn btn-primary"
                onClick={() => {
                  setOpenModal2(true)
                  handleAddOrUpdateCompaniesArchive()
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
          <h5 className="fw-semibold">Edit Company Archives</h5>
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
                    Basic Info
                  </Link>
                </div>
                <div
                  className="accordion-collapse collapse show"
                  id="basic"
                  data-bs-parent="#main_accordion"
                >
                  <div className="accordion-body border-top">
                    <div className="row">
                      <div className="mb-3">
                        <label className="col-form-label">Company*</label>
                        <Select
                            name="companyId"
                            onChange={(value) => handleChange(value, "select", "companyId")}
                            value={{ label: companyData?.find((x: any) => x?._id == formData?.companyId)?.company_name, value: formData?.companyId }}
                            className="select2" 
                            classNamePrefix="react-select"
                            options={[...new Set(companyData?.map((x) => ({ ...x, label: x?.company_name, value: x?._id })))]}
                            placeholder="Select an option"
                        />
                      </div>
                      <div className="col-md-12">
                        <div className="mb-3">
                          <label className="col-form-label">Company Name</label>
                          <input name="company_name" value={formData?.company_name} onChange={handleChange} type="text" className="form-control" />
                        </div>
                      </div>
                      <div className="mb-3">
                        <label className="col-form-label">
                            Uploaded Date <span className="text-danger">*</span>
                        </label>
                        <DatePicker
                            className="form-control datetimepicker deals-details"
                            value={formData?.uploaded_date ? dayjs(formData.uploaded_date) : null}
                            onChange={(date) => handleChange(date, 'date', 'uploaded_date')}
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
                                current && current < dayjs(formData?.uploaded_date).endOf('day')
                            }
                        />
                      </div>
                      <div className="col-md-12">
                        <div className="mb-0">
                          <label className="col-form-label">
                            Description <span className="text-danger">*</span>
                          </label>
                          <textarea
                            name="description" value={formData?.description} onChange={handleChange}
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
                data-bs-dismiss="offcanvas"
                className="btn btn-primary"
                onClick={() => {
                  setOpenModal2(true)
                  handleAddOrUpdateCompaniesArchive()
                }}
              >
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
      {/* /Edit Company */}
     
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

export default CompaniesArchive;
