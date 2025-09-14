import React, { useState } from "react";
// import ImageWithBasePath from "../../../core/common/imageWithBasePath";
import Select from "react-select";
import { Link } from "react-router-dom";
import Table from "../../core/common/dataTable/index";
import { Modal, Toast, ToastContainer } from "react-bootstrap";
import { TableData } from "../../core/data/interface";
import { useDispatch, useSelector } from "react-redux";
import { all_routes } from "../router/all_routes";
import CollapseHeader from "../../core/common/collapse-header";
import PrivateServer from "../../helper/PrivateServer";
import { endpoints } from "../../helper/endpoints";
import _ from "lodash";
import useAuth from "../../hooks/useAuth";
import * as XLSX from "xlsx";

const Products = () => {
  const { values } = useAuth();
  const route = all_routes;
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [types, setTypes] = useState([]);
  const [subTypes, setSubTypes] = useState([]);
  const [taxes, setTaxes] = useState([]);
  const [openModal2, setOpenModal2] = useState(false);
  const [productsData, setProductsData] = useState([]);
  const [searchData, setFilteredSearchData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showBulkActionButton, setShowBulkActionButton] = useState(false);
  const [showBulkDeleteModal, setShowBulkDeleteModal] = useState(false);
  const [selectedRows, setSelectedRows] = useState(0);
  const [selectedIds, setSelectedIds] = useState([]);
  const [productId, setProductId] = useState("");
  const [fileImport, setFileImport] = useState({
    file_key: "",
    file: {},
    fileName: "",
  });
  const [formData, setFormData] = useState({
    product_name: "",
    product_code: "",
    qty_ordered: "",
    unit_price: "",
    email: "",
    description: "",
    tax: [],
    product_type: "",
    product_sub_type: "",
    product_category: "",
    product_sub_category: "",
    productId: "",
  });
  const [error, setError] = useState({
    type: "primary",
    message: ""
  });
  const [showToast, setShowToast] = useState(false);
//   const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
//   const handleDateChange = (date: Date | null) => {
//     setSelectedDate(date);
    // setFormData({ ...formData, dob: moment(date).format('YYYY-MM-DD') });
//   };

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
      const worksheet = XLSX.utils.json_to_sheet(cleanData([...new Set(productsData?.map((x) => ({ ...x, product_type: x?.product_type?.type_name, product_category: x?.product_category?.category_name, product_sub_category: x?.product_sub_category?.sub_category_name, tax: _.map(x?.tax, 'tax_name').join(', ') })))], ["_id", "__v"]));

      // Create a new workbook and append the worksheet
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Products");

      // Write the file and trigger download
      XLSX.writeFile(workbook, 'etisalat_products.xlsx');

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

  // const handleImportFile = async (e) => {
  //   console.log("file data -- ", e.target.files[0]);
  //   setFileImport({ ...fileImport, file_key: e?.target?.name, file: e?.target?.files?.[0], fileName: e?.target?.files?.[0]?.filename ?? "" });
  // }

  // const handleImportData = async () => {
  //   try {
  //     const { Products } = endpoints;
  //     const _formData = new FormData();
  //     _formData.append(fileImport.file_key, fileImport.file);
  //     const { data } = await PrivateServer.postData(Products.import, _formData, {
  //           headers: { "Content-Type": "multipart/form-data" } // Ensure correct content type
  //       });
  //     console.log("data -- ", data);

  //     if(data) await getProducts();
  //   } catch(error) {
  //     console.log("error -- ", error);
  //   }
  // }

  const getProducts = async () => {
    try {
      const { Products } = endpoints;
      const response = await PrivateServer.getData(Products?.view)
  
      if(response?.data) {
        setShowToast(true);
        setError({ type: "success", message: `(${response?.data?.length}) Products found` })
        setProductsData([...new Set(response?.data?.map((x: any) => ({ ...x, key: x?.id?.toString() })))]);
        setFilteredSearchData([...new Set(response?.data?.map((x: any) => ({ ...x, key: x?.id?.toString() })))])
      }
    } catch(error) {
      setShowToast(true);
      setError({ type: "danger", message: `No Products found` })
      console.log("Error while getting products -- E:", error?.message);
    }
  }
  
  const getCategories = async () => {
    try {
      const { Categories } = endpoints;
      const response = await PrivateServer.getData(Categories?.view)

      if(response?.data) {
        const _data: any = [...new Set(response?.data?.map((x) => ({ label: x?.category_name, value: x?._id })))]  
        setCategories(_data);
      }
    } catch(error) {
      console.log("Error while getting categories -- E:", error?.message);
    }
  }
  
  const getSubCategories = async () => {
    try {
      const { SubCategory } = endpoints;
      const response = await PrivateServer.getData(SubCategory?.view)
  
      if(response?.data) {
        const _data: any = [...new Set(response?.data?.map((x) => ({ label: x?.sub_category_name, value: x?._id })))]  
        setSubCategories(_data);
      }
    } catch(error) {
      console.log("Error while getting sub-category -- E:", error?.message);
    }
  }
  
  const getTypes = async () => {
    try {
      const { Types } = endpoints;
      const response = await PrivateServer.getData(Types?.view)
  
      if(response?.data) {
        const _data: any = [...new Set(response?.data?.map((x) => ({ label: x?.type_name, value: x?._id })))]  
        setTypes(_data);
      }
    } catch(error) {
      console.log("Error while getting types -- E:", error?.message);
    }
  }
  
  const getSubTypes = async () => {
    try {
      const { SubType } = endpoints;
      const response = await PrivateServer.getData(SubType?.view)
  
      if(response?.data) {
        const _data: any = [...new Set(response?.data?.map((x) => ({ label: x?.sub_type_name, value: x?._id })))]  
        setSubTypes(_data);
      }
    } catch(error) {
      console.log("Error while getting types -- E:", error?.message);
    }
  }
  
  const getTaxes = async () => {
    try {
      const { Tax } = endpoints;
      const response = await PrivateServer.getData(Tax?.view)
  
      if(response?.data) {
        const _data: any = [...new Set(response?.data?.map((x) => ({ label: x?.tax_name, value: x?._id })))]  
        setTaxes(_data);
      }
    } catch(error) {
      console.log("Error while getting types -- E:", error?.message);
    }
  }

  // Call initializeStarsState once when the component mounts
  React.useEffect(() => {
    getProducts();
    getCategories();
    getSubCategories();
    getTypes();
    getSubTypes();
    getTaxes();
  }, []);

  const handleClose = () => {
    setProductId("");
    setFormData({
        product_name: "",
        product_code: "",
        qty_ordered: "",
        unit_price: "",
        email: "",
        description: "",
        tax: [],
        product_type: "",
        product_sub_type: "",
        product_category: "",
        product_sub_category: "",
        productId: "",
    });
  }

  const handleChange = (e, type="", _name="", _multiple=false) => {    
    if(type == "file") {
      const { name } = e.target;
      setFormData({ ...formData, [name]: e.target?.files[0] });
    }
    else if(type == "select") {
        if(_multiple) {
            const _taxes = _.map(e, 'value')
            setFormData({ ...formData, [_name]: _taxes });
        } else setFormData({ ...formData, [_name]: e?.label });
    } else {
      const { name, value } = e.target; 
      setFormData({ ...formData, [name]: value });
    }
  }

  const handleDeleteProducts = async () => {
    try {
      const { Products } = endpoints;
      const response = await PrivateServer?.deleteData(Products?.delete, productId);
      if(response) getProducts();
      setShowToast(true);
      setError({ type: "danger", message: "deleted successfully" })
    } catch(err) {
      setShowToast(true);
      setError({ type: "danger", message: err?.message })
      console.log("Error while deleting product -- E: ", err?.message);
    }
  }

  const handleEditProducts = (values) => {
    const _tax = [...new Set(values?.tax?.map((x) => x?._id))]
    setFormData({ 
      ...formData, 
      ..._.omit(values, ["_id"]), 
      productId: values?._id,
      tax: _tax, 
    });
  }

  const handleAddOrUpdateProducts = async () => {
    try {
      const { Products } = endpoints;
      const { data } = formData?.productId !== "" ? await PrivateServer?.patchData(Products.patch, formData?.productId, formData) : await PrivateServer.postData(Products.create, formData);

      if(data) {
        setShowToast(true);
        setError({ type: "danger", message: `Product ${formData?.productId ? "updated" : "added"}` })
        if(formData?.productId == "") setFormData({ ...formData, productId: data?.data?._id })
        getProducts();
        handleClose();
      }
    } catch(err) {
      setShowToast(true);
      setError({ type: "danger", message: err?.message })
      console.log("Error while saving products -- E: ", err?.message);
    }
  }

  const columns = [
    {
      title: "Product Name",
      dataIndex: "product_name",
      render: (text: any, record: any, index: number) => (
        <h2 className="d-flex align-items-center" key={index}>
        {/* <Link to={route.contactDetails} className="avatar avatar-sm me-2">
          <ImageWithBasePath
            className="img-fluid"
            src={env_data?.image_base_path + record?.profile_picture}
            alt={"Customer profile picture"}
          />
        </Link> */}
        <Link to={route.products} className="d-flex flex-column">
        {record?.product_name}
        <span className="text-default"></span>
        </Link>
      </h2>
      ),
      sorter: (a: { [key: string]: string }, b: { [key: string]: string }) => a?.product_name?.toLowerCase().localeCompare(b?.product_name?.toLowerCase()),
    },
    {
      title: "Product Category",
      dataIndex: "product_category",
      render: (text: any, record: any, index: number) => (
        <h2 className="d-flex align-items-center" key={index}>
        {/* <Link to={route.contactDetails} className="avatar avatar-sm me-2">
          <ImageWithBasePath
            className="img-fluid"
            src={env_data?.image_base_path + record?.profile_picture}
            alt={"Customer profile picture"}
          />
        </Link> */}
        <Link to={route.category} className="d-flex flex-column">
        {record?.product_category}
        <span className="text-default">{record?.product_sub_category}</span>
        </Link>
      </h2>
      ),
      sorter: (a: { [key: string]: string }, b: { [key: string]: string }) => a?.product_category?.toLowerCase().localeCompare(b?.product_category?.toLowerCase()),
    },
    {
      title: "Product Type",
      dataIndex: "product_type",
      render: (text: any, record: any, index: number) => (
        <h2 className="d-flex align-items-center" key={index}>
        {/* <Link to={route.contactDetails} className="avatar avatar-sm me-2">
          <ImageWithBasePath
            className="img-fluid"
            src={env_data?.image_base_path + record?.profile_picture}
            alt={"Customer profile picture"}
          />
        </Link> */}
        <Link to={route.type} className="d-flex flex-column">
        {record?.product_type}
        <span className="text-default">{record?.product_sub_type}</span>
        </Link>
      </h2>
      ),
      sorter: (a: { [key: string]: string }, b: { [key: string]: string }) => a?.product_type?.toLowerCase().localeCompare(b?.product_type?.toLowerCase()),
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
      title: "Team Leader",
      dataIndex: "groupId",
      sorter: (a: any, b: any) => a.secondary_phone.length - b.secondary_phone.length,
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
      title: "QTY Ordered",
      dataIndex: "qty_ordered",
      sorter: (a: { [key: string]: string }, b: { [key: string]: string }) => a.qty_ordered.length - b.qty_ordered.length,
    },
    {
      title: "Unit Price",
      dataIndex: "unit_price",
      sorter: (a: TableData, b: TableData) => a.unit_price.length - b.unit_price.length,
    },
    {
      title: "Total Amount",
      dataIndex: "unit_price",
      sorter: (a: TableData, b: TableData) => a.unit_price.length - b.unit_price.length,
      render: (text: string, record: any) => {
        const _qty = record?.qty_ordered?.toString();
        const _unitPrice = record?.unit_price?.toString();
        const ttl_price = _qty && _unitPrice ? (parseInt(_qty) * parseInt(_unitPrice))?.toFixed(2) : "0";

        return <span className="text-default">{ttl_price}</span>
      }
    },
    {
      title: "Total Vat",
      dataIndex: "tax",
      sorter: (a: TableData, b: TableData) => a.unit_price.length - b.unit_price.length,
      render: (text: string, record: any) => {
        const _ttl_tax = record?.tax ? _.sum(_.map(record?.tax, function(_item) { return parseFloat(_item?.tax_percentage) })) : 0;
        const _qty = record?.qty_ordered?.toString();
        const _unitPrice = record?.unit_price?.toString();
        const ttl_price = _qty && _unitPrice ? (parseInt(_qty) * parseInt(_unitPrice)) : 0;
        const _ttl_tax_amt = (ttl_price * _ttl_tax) / 100;
        
        return <span className="text-default">{_ttl_tax_amt}</span>
      }
    },
    {
      title: "Amount",
      dataIndex: "tax",
      sorter: (a: TableData, b: TableData) => a.unit_price.length - b.unit_price.length,
      render: (text: string, record: any) => {
        const _ttl_tax = record?.tax ? _.sum(_.map(record?.tax, function(_item) { return parseFloat(_item?.tax_percentage) })) : 0;
        const _qty = record?.qty_ordered?.toString();
        const _unitPrice = record?.unit_price?.toString();
        const ttl_price = _qty && _unitPrice ? (parseInt(_qty) * parseInt(_unitPrice)) : 0;
        const _ttl_tax_amt = (ttl_price * _ttl_tax) / 100;
        
        return <span className="text-default">{(ttl_price - _ttl_tax_amt)}</span>
      }
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (text: any, record: any, index: number) => (
        <div className="dropdown table-action" key={index}>
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
            {values?.permissions?.includes('update') && (<Link
              className="dropdown-item edit-popup"
              to="#"
              onClick={() => handleEditProducts(record)}
              data-bs-toggle="offcanvas" data-bs-target="#offcanvas_edit"
            >
              <i className="ti ti-edit text-blue"></i> Edit
            </Link>)}
            {values?.permissions?.includes('delete') && (<Link
              className="dropdown-item"
              to="#"
              data-bs-toggle="modal"
              data-bs-target="#delete_contact"
              onClick={() => setProductId(record?._id)}
            >
              <i className="ti ti-trash text-danger"></i> Delete
            </Link>)}
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
    const { Products } = endpoints;
    const deleted = await PrivateServer.deleteBulkData(Products?.delete_bulk, selectedIds)
    if(deleted) {
      setShowBulkActionButton(false);
      setShowBulkDeleteModal(false);
    }
  }

  return (
    <div>
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
                      Products<span className="count-title">{searchTerm != "" ? searchData?.length : productsData?.length}</span>
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
                          placeholder="Search Products"
                          onChange={handleSearch}
                        />
                      </div>
                    </div>
                    <div className="col-sm-8">
                      <div className="d-flex align-items-center flex-wrap row-gap-2 justify-content-sm-end">
                        {/* <div className="dropdown me-2">
                          <Link
                            to="#"
                            data-bs-toggle="modal"
                            data-bs-target="#import_data"
                          >
                            <i className="ti ti-file-import me-2" />
                            Import
                          </Link>
                        </div> */}
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
                          Add Product
                        </Link>)}
                      </div>
                    </div>
                  </div>
                  {/* /Search */}
                </div>

                <div className="card-body">
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
                    <Table dataSource={searchTerm != "" ? searchData : productsData} columns={columns} handleBulkAction={handleBulkOperation} />
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
      {/* /Page Wrapper */}

        {/* Add Contact */}
        <div
          className="offcanvas offcanvas-end offcanvas-large"
          tabIndex={-1}
          id="offcanvas_add"
        >
          <div className="offcanvas-header border-bottom">
            <h5 className="fw-semibold">Add New Product</h5>
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
                        <div className="col-md-6">
                          <div className="mb-3">
                            <label className="col-form-label">
                              Product Code <span className="text-danger">*</span>
                            </label>
                            <input type="text" value={formData?.product_code} name="product_code" onChange={handleChange} className="form-control" />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="mb-3">
                            <label className="col-form-label">
                              Product Name <span className="text-danger">*</span>
                            </label>
                            <input type="text" value={formData?.product_name} name="product_name" onChange={handleChange} className="form-control" />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="mb-3">
                            <label className="col-form-label">
                              Category
                            </label>
                            <Select
                              name="product_category"
                              onChange={(value) => handleChange(value, "select", "product_category")}
                              value={{ label: categories?.find((x: any) => x?.label == formData?.product_category)?.label, value: formData?.product_category }}
                              className="select2" 
                              classNamePrefix="react-select"
                              options={categories}
                              placeholder="Choose"
                            />
                          </div>
                        </div>
                        <div className="col-md-12">
                          <div className="mb-3">
                            <div className="d-flex justify-content-between align-items-center">
                              <label className="col-form-label">
                                Sub Category <span className="text-danger">*</span>
                              </label>
                            </div>
                            <Select
                              name="product_sub_category"
                              onChange={(value) => handleChange(value, "select", "product_sub_category")}
                              value={{ label: subCategories?.find((x: any) => x?.label == formData?.product_sub_category)?.label, value: formData?.product_sub_category }}
                              className="select2" 
                              classNamePrefix="react-select"
                              options={subCategories}
                              placeholder="Choose"
                            />
                            {/* <input type="text" name="email" value={formData?.email} onChange={handleChange} className="form-control" /> */}
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="mb-3">
                            <label className="col-form-label">
                              Type <span className="text-danger">*</span>
                            </label>
                            <Select
                              name="product_type"
                              onChange={(value) => handleChange(value, "select", "product_type")}
                              value={{ label: types?.find((x: any) => x?.label == formData?.product_type)?.label, value: formData?.product_type }}
                              className="select2" 
                              classNamePrefix="react-select"
                              options={types}
                              placeholder="Choose"
                            />
                            {/* <input type="text" name="primary_phone" value={formData?.primary_phone} onChange={handleChange} className="form-control" /> */}
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="mb-3">
                            <label className="col-form-label">
                              Sub Type <span className="text-danger">*</span>
                            </label>
                            <Select
                              name="product_sub_type"
                              onChange={(value) => handleChange(value, "select", "product_sub_type")}
                              value={{ label: subTypes?.find((x: any) => x?.label == formData?.product_sub_type)?.label, value: formData?.product_sub_type }}
                              className="select2" 
                              classNamePrefix="react-select"
                              options={subTypes}
                              placeholder="Choose"
                            />
                            {/* <input type="text" name="primary_phone" value={formData?.primary_phone} onChange={handleChange} className="form-control" /> */}
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="mb-3">
                            <label className="col-form-label">Tax</label>
                            <Select
                              isMulti={true}
                              name="tax"
                              onChange={(value) => handleChange(value, "select", "tax", true)}
                              value={_.map(formData?.tax, (value) => ({
                                    label: taxes?.find((x: any) => x?.value == value )?.label, // Converts 'create' to 'Create'
                                    value,
                                }))}
                              className="select2" 
                              classNamePrefix="react-select"
                              options={taxes}
                              placeholder="Choose"
                            />
                            {/* <input type="text" name="secondary_phone" value={formData?.secondary_phone} onChange={handleChange} className="form-control" /> */}
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="mb-3">
                            <label className="col-form-label">
                              QTY Ordered
                            </label>
                            <input type="number" name="qty_ordered" value={formData?.qty_ordered} onChange={handleChange} className="form-control" />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="mb-3">
                            <label className="col-form-label">
                              Unit Price
                            </label>
                            <input type="text" name="unit_price" value={formData?.unit_price} onChange={handleChange} className="form-control" />
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
                          <div className="mb-0">
                            <label className="col-form-label">
                              Description <span className="text-danger">*</span>
                            </label>
                            <textarea
                              name="description"
                              value={formData?.description}
                              onChange={handleChange}
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
                    handleAddOrUpdateProducts()
                  }}
                >
                  Create
                </button>
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
            <h5 className="fw-semibold">Edit Product</h5>
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
              <div className="accordion" id="main_accordion_2">
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
                        <div className="col-md-6">
                          <div className="mb-3">
                            <label className="col-form-label">
                              Product Code <span className="text-danger">*</span>
                            </label>
                            <input type="text" value={formData?.product_code} name="product_code" onChange={handleChange} className="form-control" />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="mb-3">
                            <label className="col-form-label">
                              Product Name <span className="text-danger">*</span>
                            </label>
                            <input type="text" value={formData?.product_name} name="product_name" onChange={handleChange} className="form-control" />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="mb-3">
                            <label className="col-form-label">
                              Category
                            </label>
                            <Select
                              name="product_category"
                              onChange={(value) => handleChange(value, "select", "product_category")}
                              value={{ label: categories?.find((x: any) => x?.label == formData?.product_category)?.label, value: formData?.product_category }}
                              className="select2" 
                              classNamePrefix="react-select"
                              options={categories}
                              placeholder="Choose"
                            />
                          </div>
                        </div>
                        <div className="col-md-12">
                          <div className="mb-3">
                            <div className="d-flex justify-content-between align-items-center">
                              <label className="col-form-label">
                                Sub Category <span className="text-danger">*</span>
                              </label>
                            </div>
                            <Select
                              name="product_sub_category"
                              onChange={(value) => handleChange(value, "select", "product_sub_category")}
                              value={{ label: subCategories?.find((x: any) => x?.label == formData?.product_sub_category)?.label, value: formData?.product_sub_category }}
                              className="select2" 
                              classNamePrefix="react-select"
                              options={subCategories}
                              placeholder="Choose"
                            />
                            {/* <input type="text" name="email" value={formData?.email} onChange={handleChange} className="form-control" /> */}
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="mb-3">
                            <label className="col-form-label">
                              Type <span className="text-danger">*</span>
                            </label>
                            <Select
                              name="product_type"
                              onChange={(value) => handleChange(value, "select", "product_type")}
                              value={{ label: types?.find((x: any) => x?.label == formData?.product_type)?.label, value: formData?.product_type }}
                              className="select2" 
                              classNamePrefix="react-select"
                              options={types}
                              placeholder="Choose"
                            />
                            {/* <input type="text" name="primary_phone" value={formData?.primary_phone} onChange={handleChange} className="form-control" /> */}
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="mb-3">
                            <label className="col-form-label">
                              Sub Type <span className="text-danger">*</span>
                            </label>
                            <Select
                              name="product_sub_type"
                              onChange={(value) => handleChange(value, "select", "product_sub_type")}
                              value={{ label: subTypes?.find((x: any) => x?.label == formData?.product_sub_type)?.label, value: formData?.product_sub_type }}
                              className="select2" 
                              classNamePrefix="react-select"
                              options={subTypes}
                              placeholder="Choose"
                            />
                            {/* <input type="text" name="primary_phone" value={formData?.primary_phone} onChange={handleChange} className="form-control" /> */}
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="mb-3">
                            <label className="col-form-label">Tax</label>
                            <Select
                              isMulti={true}
                              name="tax"
                              onChange={(value) => handleChange(value, "select", "tax", true)}
                              value={_.map(formData?.tax, (_value) => ({
                                    label: taxes?.find((x: any) => x?.value == _value )?.label, // Converts 'create' to 'Create'
                                    _value,
                                }))}
                              className="select2" 
                              classNamePrefix="react-select"
                              options={taxes}
                              placeholder="Choose"
                            />
                            {/* <input type="text" name="secondary_phone" value={formData?.secondary_phone} onChange={handleChange} className="form-control" /> */}
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="mb-3">
                            <label className="col-form-label">
                              QTY Ordered
                            </label>
                            <input type="number" name="qty_ordered" value={formData?.qty_ordered} onChange={handleChange} className="form-control" />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="mb-3">
                            <label className="col-form-label">
                              Unit Price
                            </label>
                            <input type="text" name="unit_price" value={formData?.unit_price} onChange={handleChange} className="form-control" />
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
                          <div className="mb-0">
                            <label className="col-form-label">
                              Description <span className="text-danger">*</span>
                            </label>
                            <textarea
                              name="description"
                              value={formData?.description}
                              onChange={handleChange}
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
                <button type="button" onClick={handleAddOrUpdateProducts} data-bs-dismiss="offcanvas" className="btn btn-primary">
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
        {/* /Edit Contact */}
        
        {/* Import Data */}
        {/* <div className="modal fade" id="import_data" role="dialog">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-body">
                <div className="text-center">
                  <div className="avatar avatar-xl bg-primary-light rounded-circle mb-3">
                    <i className="ti ti-database fs-36 text-primary" />
                  </div>
                  <h4 className="mb-2">Import Products</h4>
                  <p className="mb-0">
                    Upload the file to start the import.
                  </p>
                  <div className="p-3 m-2">
                    <input type="file" name="file_import" onChange={handleImportFile} className="form-control" />
                  </div>
                  <div className="d-flex align-items-center justify-content-center mt-4">
                    <Link
                      to="#"
                      className="btn btn-light me-2"
                      data-bs-dismiss="modal"
                    >
                      Cancel
                    </Link>
                    <Link to="#" className="btn btn-success" onClick={handleImportData} data-bs-dismiss="modal">
                      Import
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div> */}

        {/* Delete Contact */}
        <div className="modal fade" id="delete_contact" role="dialog">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-body">
                <div className="text-center">
                  <div className="avatar avatar-xl bg-danger-light rounded-circle mb-3">
                    <i className="ti ti-trash-x fs-36 text-danger" />
                  </div>
                  <h4 className="mb-2">Remove Product?</h4>
                  <p className="mb-0">
                    Are you sure you want to remove <br /> product you selected.
                  </p>
                  <div className="d-flex align-items-center justify-content-center mt-4">
                    <Link
                      to="#"
                      className="btn btn-light me-2"
                      data-bs-dismiss="modal"
                    >
                      Cancel
                    </Link>
                    <Link to="#" className="btn btn-danger" onClick={handleDeleteProducts} data-bs-dismiss="modal">
                      Yes, Delete it
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* /Delete Contact */}

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
        
        {/* Create Contact */}
        <Modal show={openModal2} onHide={() => setOpenModal2(false)}>
              <div className="modal-header border-0 m-0 justify-content-end">
                <button
                  className="btn-close"
                  aria-label="Close"
                  onClick={() => {
                    setOpenModal2(false)
                    handleClose()
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
                  <h3>Contact Created Successfully!!!</h3>
                  <p>View the details of contact, created</p>
                  <div className="col-lg-12 text-center modal-btn">
                    <Link
                      to="#"
                      className="btn btn-light"
                      onClick={() => setOpenModal2(false)}
                    >
                      Cancel
                    </Link>
                    <Link to={route.contactDetails} className="btn btn-primary">
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            </Modal>
        {/* /Create Contact */}

        {/* Access */}
        <div className="modal fade" id="access_view" role="dialog">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Access For</h5>
                <button
                  className="btn-close custom-btn-close border p-1 me-0 text-dark"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  onClick={handleClose}
                >
                  <i className="ti ti-x" />
                </button>
              </div>
              <form>
                <div className="modal-body">
                  <div className="icon-form mb-3">
                    <span className="form-icon">
                      <i className="ti ti-search" />
                    </span>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Search"
                    />
                  </div>
                  <div className="access-wrap mb-0">
                    <ul>
                      <li className="select-people-checkbox">
                        <label className="checkboxs">
                          <input type="checkbox" />
                          <span className="checkmarks" />
                          <span className="people-profile">
                            <img
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
                            <img
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
                            <img
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
                            <img
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
                            <img
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
                            <img
                              src="assets/img/profiles/avatar-22.jpg"
                              alt=""
                            />
                            <Link to="#">Dawn Mercha</Link>
                          </span>
                        </label>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="modal-footer">
                  <div className="d-flex align-items-center justify-content-end m-0">
                    <button
                      type="button"
                      className="btn btn-light me-2"
                      data-bs-dismiss="modal"
                    >
                      Cancel
                    </button>
                    <button data-bs-dismiss="modal" type="button" className="btn btn-primary">
                      Confirm
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        {/* /Access */}
      
    </div>
  );
};

export default Products;
