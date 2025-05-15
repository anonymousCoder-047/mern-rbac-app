import React, { useState } from "react";
// import ImageWithBasePath from "../../../core/common/imageWithBasePath";
import {
  companyName,
  initialSettings,
} from "../../core/common/selectoption/selectoption";
import Select from "react-select";
import { Link } from "react-router-dom";
import DateRangePicker from "react-bootstrap-daterangepicker";
import Table from "../../core/common/dataTable/index";
import { Modal } from "react-bootstrap";
import { TableData } from "../../core/data/interface";
import { useDispatch, useSelector } from "react-redux";
import { all_routes } from "../router/all_routes";
import DatePicker from "react-datepicker";
import CollapseHeader from "../../core/common/collapse-header";
import PrivateServer from "../../helper/PrivateServer";
import { endpoints } from "../../helper/endpoints";
import _ from "lodash";
import moment from "moment";

const Products = () => {
  const route = all_routes;
  const [sources, setSources] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [types, setTypes] = useState([]);
  const [taxes, setTaxes] = useState([]);
  const [openModal2, setOpenModal2] = useState(false);
  const [productsData, setProductsData] = useState([]);
  const [productId, setProductId] = useState("");
  const [formData, setFormData] = useState({
    product_name: "",
    product_code: "",
    qty_ordered: "",
    unit_price: "",
    email: "",
    description: "",
    tax: [],
    product_type: "",
    product_category: "",
    product_sub_category: "",
    productId: "",
  });
//   const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
//   const handleDateChange = (date: Date | null) => {
//     setSelectedDate(date);
    // setFormData({ ...formData, dob: moment(date).format('YYYY-MM-DD') });
//   };

  const dispatch = useDispatch();
  const activityToggle = useSelector(
    (state: any) => state?.activityTogglePopup
  );
  const activityToggleTwo = useSelector(
    (state: any) => state?.activityTogglePopupTwo
  );
  const addTogglePopupTwo = useSelector(
    (state: any) => state?.addTogglePopupTwo
  );

  const [stars, setStars] = useState<{ [key: number]: boolean }>({});

  const initializeStarsState = () => {
    const starsState: { [key: number]: boolean } = {};
    productsData.forEach((item, index) => {
      starsState[index] = false;
    });
    setStars(starsState);
  };

  const getProducts = async () => {
    try {
      const { Products } = endpoints;
      const response = await PrivateServer.getData(Products?.view)
  
      console.log("data -- ", response)
      if(response?.data) setProductsData(response?.data);
    } catch(error) {
      console.log("Error while getting products -- E:", error?.message);
    }
  }
  
  const getCategories = async () => {
    try {
      const { Categories } = endpoints;
      const response = await PrivateServer.getData(Categories?.view)
  
      console.log("data -- ", response)
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
  
      console.log("data -- ", response)
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
  
      console.log("data -- ", response)
      if(response?.data) {
        const _data: any = [...new Set(response?.data?.map((x) => ({ label: x?.type_name, value: x?._id })))]  
        setTypes(_data);
      }
    } catch(error) {
      console.log("Error while getting types -- E:", error?.message);
    }
  }
  
  const getTaxes = async () => {
    try {
      const { Tax } = endpoints;
      const response = await PrivateServer.getData(Tax?.view)
  
      console.log("data -- ", response)
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
    initializeStarsState();

    getProducts();
    getCategories();
    getSubCategories();
    getTypes();
    getTaxes();
  }, []);
  
  const handleStarToggle = (index: number) => {
    setStars((prevStars) => ({
      ...prevStars,
      [index]: !prevStars[index],
    }));
  };

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
        } else setFormData({ ...formData, [_name]: e?.value });
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
    } catch(err) {
      console.log("Error while deleting product -- E: ", err?.message);
    }
  }

  const handleEditProducts = (values) => {
    console.log("Edit product clicked -- ", values);
    setFormData({ ...formData, ..._.omit(values, ["_id"]), productId: values?._id });
  }

  const handleAddOrUpdateProducts = async () => {
    try {
      const { Products } = endpoints;
      const { status, data } = formData?.productId !== "" ? await PrivateServer?.patchData(Products.patch, formData?.productId, formData) : await PrivateServer.postData(Products.create, formData);

      if(status == 200) {
        if(formData?.productId == "") setFormData({ ...formData, productId: data?.data?._id })
        getProducts();
      }
    } catch(err) {
      console.log("Error while saving products -- E: ", err?.message);
    }
  }

  const columns = [
    {
      title: "",
      dataIndex: "",
      render: (text: any, record: any, index: number) => (
        <div
          className={`set-star rating-select ${stars[index] ? "filled" : ""}`}
          onClick={() => handleStarToggle(index)}
          key={index}
        >
          <i className="fa fa-star"></i>
        </div>
      ),
    },
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
        <Link to={route.contactDetails} className="d-flex flex-column">
        {record?.product_name}
          <span className="text-default">{record?.product_code}</span>
        </Link>
      </h2>
      ),
      sorter: (a: { [key: string]: string }, b: { [key: string]: string }) => a?.first_name?.toLowerCase().localeCompare(b?.first_name?.toLowerCase()),
    },
    {
      title: "QTY Ordered",
      dataIndex: "qty_ordered",
      sorter: (a: { [key: string]: string }, b: { [key: string]: string }) => a.primary_phone.length - b.primary_phone.length,
    },

    {
      title: "Unit Price",
      dataIndex: "unit_price",
      sorter: (a: TableData, b: TableData) => a.email.length - b.email.length,
    },
    {
      title: "Total Amount",
      dataIndex: "unit_price",
      sorter: (a: TableData, b: TableData) => a.email.length - b.email.length,
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
      sorter: (a: TableData, b: TableData) => a.email.length - b.email.length,
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
      sorter: (a: TableData, b: TableData) => a.email.length - b.email.length,
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
            <Link
              className="dropdown-item edit-popup"
              to="#"
              onClick={() => handleEditProducts(record)}
              data-bs-toggle="offcanvas" data-bs-target="#offcanvas_edit"
            >
              <i className="ti ti-edit text-blue"></i> Edit
            </Link>
            <Link
              className="dropdown-item"
              to="#"
              data-bs-toggle="modal"
              data-bs-target="#delete_contact"
              onClick={() => setProductId(record?._id)}
            >
              <i className="ti ti-trash text-danger"></i> Delete
            </Link>
            <Link className="dropdown-item" to={route.contactDetails}><i className="ti ti-eye text-blue-light"></i> Preview</Link>
          </div>
        </div>
      ),
    },
  ];
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
                      Products<span className="count-title">{productsData?.length}</span>
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
                          placeholder="Search Contacts"
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
                          Add Product
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
                      {/* <div className="form-sorts dropdown me-2">
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
                      </div> */}
                      <div className="view-icons">
                        <Link to="#" className="active">
                          <i className="ti ti-list-tree" />
                        </Link>
                        <Link to={route.contactGrid}>
                          <i className="ti ti-grid-dots" />
                        </Link>
                      </div>
                    </div>
                  </div>

                  {/* /Filter */}
                  {/* Contact List */}
                  <div className="table-responsive custom-table">
                    <Table dataSource={productsData} columns={columns} />
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
                              value={{ label: categories?.find((x: any) => x?.value == formData?.product_category)?.label, value: formData?.product_category }}
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
                              value={{ label: subCategories?.find((x: any) => x?.value == formData?.product_sub_category)?.label, value: formData?.product_sub_category }}
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
                              value={{ label: types?.find((x: any) => x?.value == formData?.product_type)?.label, value: formData?.product_type }}
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
                            <input type="text" name="qty_ordered" value={formData?.qty_ordered} onChange={handleChange} className="form-control" />
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
            <h5 className="fw-semibold">Edit Contact</h5>
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
                              value={{ label: categories?.find((x: any) => x?.value == formData?.product_category)?.label, value: formData?.product_category }}
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
                              value={{ label: subCategories?.find((x: any) => x?.value == formData?.product_sub_category)?.label, value: formData?.product_sub_category }}
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
                              value={{ label: types?.find((x: any) => x?.value == formData?.product_type)?.label, value: formData?.product_type }}
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
                            <input type="text" name="qty_ordered" value={formData?.qty_ordered} onChange={handleChange} className="form-control" />
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
                <button type="button" onClick={handleAddOrUpdateProducts} className="btn btn-primary">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
        {/* /Edit Contact */}
        
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
