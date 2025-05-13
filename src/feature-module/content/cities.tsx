import React, { useState } from "react";

import { all_routes } from "../router/all_routes";
import { Link } from "react-router-dom";
import ImageWithBasePath from "../../core/common/imageWithBasePath";
import CitiesModal from "../../core/modals/citiesModal";
import Table from "../../core/common/dataTable/index";
import CollapseHeader from "../../core/common/collapse-header";
import { citiesData } from "../../core/data/json/citiesData";

const Cities = () => {
  const [stars, setStars] = useState<{ [key: number]: boolean }>({});

  const initializeStarsState = () => {
    const starsState: { [key: number]: boolean } = {};
    citiesData.forEach((item, index) => {
      starsState[index] = false;
    });
    setStars(starsState);
  };

  React.useEffect(() => {
    initializeStarsState();
  }, []);

  const handleStarToggle = (index: number) => {
    setStars((prevStars) => ({
      ...prevStars,
      [index]: !prevStars[index],
    }));
  };
  const route = all_routes;

  const data = citiesData;

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
      title: "Country Name",
      dataIndex: "country_name",
      render: (text: any, record: any) => (
        <>
          <Link to="#" className="table-imgname flag-image">
            <span className="location-flag-img">
              <ImageWithBasePath
                src={record?.country_image}
                className="img-fluid"
                alt="img"
              />
            </span>
            <span>{record?.country_name}</span>
          </Link>
        </>
      ),
      sorter: (a: any, b: any) => a.country_name - b.country_name.length,
    },
    {
      title: "State Name",
      dataIndex: "state_name",
      sorter: (a: any, b: any) => a.state_name.length - b.state_name.length,
    },

    {
      title: "City Name",
      dataIndex: "city_name",
      sorter: (a: any, b: any) => a.city_name.length - b.city_name.length,
    },

    {
      title: "Action",
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
            <Link
              className="dropdown-item"
              to="#"
              data-bs-toggle="modal"
              data-bs-target="#edit_city"
            >
              <i className="ti ti-edit text-blue" /> Edit
            </Link>
            <Link
              className="dropdown-item"
              to="#"
              data-bs-toggle="modal"
              data-bs-target="#delete_city"
            >
              <i className="ti ti-trash text-danger" /> Delete
            </Link>
          </div>
        </div>
      ),
    },
  ];

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
              <div className="col-8">
                <h4 className="page-title">Cities</h4>
              </div>
              <div className="col-4 text-end">
                <div className="head-icons">
                <CollapseHeader/>
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
                      placeholder="Search Cities"
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
                            <Link
                              to="#"
                              className="dropdown-item"
                            >
                              <i className="ti ti-file-type-pdf text-danger me-1" />
                              Export as PDF
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="#"
                              className="dropdown-item"
                            >
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
                      data-bs-toggle="modal"
                      data-bs-target="#add_city"
                    >
                      <i className="ti ti-square-rounded-plus me-2" />
                      Add City
                    </Link>
                  </div>
                </div>
              </div>
              {/* /Search */}
            </div>
            <div className="card-body">
              {/* Filter */}
              <div className="d-flex align-items-center justify-content-between flex-wrap row-gap-2 mb-4">
                <div className="dropdown">
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
                        Please drag and drop your column to reorder your table
                        and enable see option as you want.
                      </p>
                      <div className="border-top pt-3">
                        <div className="d-flex align-items-center justify-content-between mb-3">
                          <p className="mb-0 d-flex align-items-center">
                            <i className="ti ti-grip-vertical me-2" />
                            Country Name
                          </p>
                          <div className="status-toggle">
                            <input
                              type="checkbox"
                              id="col-name"
                              className="check"
                            />
                            <label htmlFor="col-name" className="checktoggle" />
                          </div>
                        </div>
                        <div className="d-flex align-items-center justify-content-between mb-3">
                          <p className="mb-0 d-flex align-items-center">
                            <i className="ti ti-grip-vertical me-2" />
                            State Name
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
                            City Name
                          </p>
                          <div className="status-toggle">
                            <input
                              type="checkbox"
                              id="col-email"
                              className="check"
                              defaultChecked
                            />
                            <label
                              htmlFor="col-email"
                              className="checktoggle"
                            />
                          </div>
                        </div>
                        <div className="d-flex align-items-center justify-content-between mb-3">
                          <p className="mb-0 d-flex align-items-center">
                            <i className="ti ti-grip-vertical me-2" />
                            Action
                          </p>
                          <div className="status-toggle">
                            <input
                              type="checkbox"
                              id="col-tag"
                              className="check"
                            />
                            <label htmlFor="col-tag" className="checktoggle" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="form-sorts dropdown">
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
                        <div className="accordion" id="accordionExample">
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
                                Country Name
                              </Link>
                            </div>
                            <div
                              className="filter-set-contents accordion-collapse collapse"
                              id="Status"
                              data-bs-parent="#accordionExample"
                            >
                              <div className="filter-content-list">
                                <ul>
                                  <li>
                                    <div className="filter-checks">
                                      <label className="checkboxs">
                                        <input
                                          type="checkbox"
                                          defaultChecked
                                        />
                                        <span className="checkmarks" />
                                        American Samoa
                                      </label>
                                    </div>
                                  </li>
                                  <li>
                                    <div className="filter-checks">
                                      <label className="checkboxs">
                                        <input type="checkbox" />
                                        <span className="checkmarks" />
                                        Andorra
                                      </label>
                                    </div>
                                  </li>
                                  <li>
                                    <div className="filter-checks">
                                      <label className="checkboxs">
                                        <input type="checkbox" />
                                        <span className="checkmarks" />
                                        Angalo
                                      </label>
                                    </div>
                                  </li>
                                  <li>
                                    <div className="filter-checks">
                                      <label className="checkboxs">
                                        <input type="checkbox" />
                                        <span className="checkmarks" />
                                        Anguilla
                                      </label>
                                    </div>
                                  </li>
                                  <li>
                                    <div className="filter-checks">
                                      <label className="checkboxs">
                                        <input type="checkbox" />
                                        <span className="checkmarks" />
                                        Antarctica
                                      </label>
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
                                data-bs-target="#State"
                                aria-expanded="false"
                                aria-controls="Status"
                              >
                                State Name
                              </Link>
                            </div>
                            <div
                              className="filter-set-contents accordion-collapse collapse"
                              id="State"
                              data-bs-parent="#accordionExample"
                            >
                              <div className="filter-content-list">
                                <ul>
                                  <li>
                                    <div className="filter-checks">
                                      <label className="checkboxs">
                                        <input
                                          type="checkbox"
                                          defaultChecked
                                        />
                                        <span className="checkmarks" />
                                        Swains Island
                                      </label>
                                    </div>
                                  </li>
                                  <li>
                                    <div className="filter-checks">
                                      <label className="checkboxs">
                                        <input type="checkbox" />
                                        <span className="checkmarks" />
                                        Andorra la Vella
                                      </label>
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
                                data-bs-target="#City"
                                aria-expanded="false"
                                aria-controls="Status"
                              >
                                City Name
                              </Link>
                            </div>
                            <div
                              className="filter-set-contents accordion-collapse collapse"
                              id="City"
                              data-bs-parent="#accordionExample"
                            >
                              <div className="filter-content-list">
                                <ul>
                                  <li>
                                    <div className="filter-checks">
                                      <label className="checkboxs">
                                        <input
                                          type="checkbox"
                                          defaultChecked
                                        />
                                        <span className="checkmarks" />
                                        Gandzasar
                                      </label>
                                    </div>
                                  </li>
                                  <li>
                                    <div className="filter-checks">
                                      <label className="checkboxs">
                                        <input type="checkbox" />
                                        <span className="checkmarks" />
                                        Escaldes-Engordany
                                      </label>
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
                              <Link to="#" className="btn btn-primary">
                                Filter
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* /Filter */}
              {/* City List */}
              <div className="table-responsive custom-table">
              <Table columns={columns} dataSource={data} />
              </div>
              <div className="row align-items-center">
                <div className="col-md-6">
                  <div className="datatable-length" />
                </div>
                <div className="col-md-6">
                  <div className="datatable-paginate" />
                </div>
              </div>
              {/* /City List */}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  {/* /Page Wrapper */}
<CitiesModal/>
</>

  );
};

export default Cities;
