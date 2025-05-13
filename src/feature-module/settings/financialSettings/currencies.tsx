import React from "react";
import { all_routes } from "../../router/all_routes";
import { Link } from "react-router-dom";
import CurrenciesModal from "../../../core/modals/currenciesModal";
import CollapseHeader from "../../../core/common/collapse-header";

const Currencies = () => {
  const route = all_routes;
  return (
    <div className="page-wrapper">
      <div className="content">
        <div className="row">
          <div className="col-md-12">
            {/* Page Header */}
            <div className="page-header">
              <div className="row align-items-center">
                <div className="col-8">
                  <h4 className="page-title">Settings</h4>
                </div>
                <div className="col-4 text-end">
                  <div className="head-icons">
                    <CollapseHeader />
                  </div>
                </div>
              </div>
            </div>
            {/* /Page Header */}
            {/* Settings Menu */}
            <div className="card">
              <div className="card-body pb-0 pt-2">
              <ul className="nav nav-tabs nav-tabs-bottom">
                    <li className="nav-item me-3">
                      <Link to={route.profile} className="nav-link px-0 ">
                        <i className="ti ti-settings-cog" /> General Settings
                      </Link>
                    </li>
                    <li className="nav-item me-3">
                      <Link
                        to={route.companySettings}
                        className="nav-link px-0 "
                      >
                        <i className="ti ti-world-cog" /> Website Settings
                      </Link>
                    </li>
                    <li className="nav-item me-3">
                      <Link
                        to={route.invoiceSettings}
                        className="nav-link px-0"
                      >
                        <i className="ti ti-apps" /> App Settings
                      </Link>
                    </li>
                    <li className="nav-item me-3">
                      <Link to={route.emailSettings} className="nav-link px-0 ">
                        <i className="ti ti-device-laptop" /> System Settings
                      </Link>
                    </li>
                    <li className="nav-item me-3">
                      <Link
                        to={route.paymentGateways}
                        className="nav-link px-0 active"
                      >
                        <i className="ti ti-moneybag" /> Financial Settings
                      </Link>
                    </li>
                    <li className="nav-item ">
                      <Link to={route.storage} className="nav-link px-0 ">
                        <i className="ti ti-flag-cog" /> Other Settings
                      </Link>
                    </li>
                  </ul>
              </div>
            </div>
            {/* /Settings Menu */}
            <div className="row">
  <div className="col-xl-3 col-lg-12 theiaStickySidebar">
    {/* Settings Sidebar */}
    <div className="card">
      <div className="card-body">
        <div className="settings-sidebar">
          <h4 className="fw-semibold mb-3">Financial Settings</h4>
          <div className="list-group list-group-flush settings-sidebar">
            <Link to={route.paymentGateways} className="fw-medium">
              Payment Gateways
            </Link>
            <Link to={route.bankAccounts} className="fw-medium">
              Bank Accounts
            </Link>
            <Link to={route.taxRates} className="fw-medium">
              Tax Rates
            </Link>
            <Link to={route.currencies} className="fw-medium active">
              Currencies
            </Link>
          </div>
        </div>
      </div>
    </div>
    {/* /Settings Sidebar */}
  </div>
  <div className="col-xl-9 col-lg-12">
    {/* Currencies */}
    <div className="card">
      <div className="card-body">
        <div className="d-flex align-items-center justify-content-between mb-4">
          <h4>Currencies</h4>
          <Link
            to="#"
            className="btn btn-sm btn-icon border rounded"
            data-bs-toggle="modal"
            data-bs-target="#add_currency"
          >
            <i className="ti ti-plus" />
          </Link>
        </div>
        <form>
          {/* Euro */}
          <div className="d-flex align-items-center justify-content-between flex-wrap border-bottom mb-3 pb-3 row-gap-2">
            <div>
              <h5 className="mb-1 fw-semibold">Euro</h5>
              <p>Shows the details of Euro currency</p>
            </div>
            <div className="dropdown table-action">
              <Link
                to="#"
                className="action-icon bg-white"
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
                  data-bs-target="#edit_currency"
                >
                  <i className="fa-solid fa-pencil text-blue" /> Edit
                </Link>
                <Link
                  className="dropdown-item"
                  to="#"
                  data-bs-toggle="modal"
                  data-bs-target="#delete_currency"
                >
                  <i className="fa-regular fa-trash-can text-danger" /> Delete
                </Link>
              </div>
            </div>
          </div>
          <div className="border-bottom mb-3">
            <div className="row">
              <div className="col-md-3 col-sm-6">
                <div className="mb-3">
                  <label className="col-form-label">Currency Name</label>
                  <input
                    type="text"
                    className="form-control"
                    defaultValue="Euro"
                  />
                </div>
              </div>
              <div className="col-md-3 col-sm-6">
                <div className="mb-3">
                  <label className="col-form-label">Code</label>
                  <input
                    type="text"
                    className="form-control"
                    defaultValue="EUR"
                  />
                </div>
              </div>
              <div className="col-md-3 col-sm-6">
                <div className="mb-3">
                  <label className="col-form-label">Symbol</label>
                  <input
                    type="text"
                    className="form-control"
                    defaultValue="€"
                  />
                </div>
              </div>
              <div className="col-md-3 col-sm-6">
                <div className="mb-3">
                  <label className="col-form-label">Exchange Rate</label>
                  <input
                    type="text"
                    className="form-control"
                    defaultValue="Default"
                  />
                </div>
              </div>
            </div>
          </div>
          {/* /Euro */}
          {/* England Pound */}
          <div className="d-flex align-items-center justify-content-between flex-wrap mb-3 pb-3 border-bottom row-gap-2">
            <div>
              <h5 className="fw-semibold mb-1">England Pound</h5>
              <p>Shows the details of England Pound currency</p>
            </div>
            <div className="dropdown table-action">
              <Link
                to="#"
                className="action-icon bg-white"
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
                  data-bs-target="#edit_currency"
                >
                  <i className="fa-solid fa-pencil text-blue" /> Edit
                </Link>
                <Link
                  className="dropdown-item"
                  to="#"
                  data-bs-toggle="modal"
                  data-bs-target="#delete_currency"
                >
                  <i className="fa-regular fa-trash-can text-danger" /> Delete
                </Link>
              </div>
            </div>
          </div>
          <div className="mb-3 border-bottom">
            <div className="row">
              <div className="col-md-3 col-sm-6">
                <div className="mb-3">
                  <label className="col-form-label">Currency Name</label>
                  <input
                    type="text"
                    className="form-control"
                    defaultValue="England Pound"
                  />
                </div>
              </div>
              <div className="col-md-3 col-sm-6">
                <div className="mb-3">
                  <label className="col-form-label">Code</label>
                  <input
                    type="text"
                    className="form-control"
                    defaultValue="GBP"
                  />
                </div>
              </div>
              <div className="col-md-3 col-sm-6">
                <div className="mb-3">
                  <label className="col-form-label">Symbol</label>
                  <input
                    type="text"
                    className="form-control"
                    defaultValue="€"
                  />
                </div>
              </div>
              <div className="col-md-3 col-sm-6">
                <div className="mb-3">
                  <label className="col-form-label">Exchange Rate</label>
                  <input
                    type="text"
                    className="form-control"
                    defaultValue="Default"
                  />
                </div>
              </div>
            </div>
          </div>
          {/* /England Pound */}
          {/* Indian Rupee */}
          <div className="d-flex align-items-center justify-content-between flex-wrap mb-3 pb-3 border-bottom row-gap-2">
            <div>
              <h5 className="fw-semibold mb-1">Indian Rupee</h5>
              <p>Shows the details of Indian Rupee currency</p>
            </div>
            <div className="dropdown table-action">
              <Link
                to="#"
                className="action-icon bg-white"
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
                  data-bs-target="#edit_currency"
                >
                  <i className="fa-solid fa-pencil text-blue" /> Edit
                </Link>
                <Link
                  className="dropdown-item"
                  to="#"
                  data-bs-toggle="modal"
                  data-bs-target="#delete_currency"
                >
                  <i className="fa-regular fa-trash-can text-danger" /> Delete
                </Link>
              </div>
            </div>
          </div>
          <div className="border-bottom mb-3">
            <div className="row">
              <div className="col-md-3 col-sm-6">
                <div className="mb-3">
                  <label className="col-form-label">Currency Name</label>
                  <input
                    type="text"
                    className="form-control"
                    defaultValue="Indian Rupee"
                  />
                </div>
              </div>
              <div className="col-md-3 col-sm-6">
                <div className="mb-3">
                  <label className="col-form-label">Code</label>
                  <input
                    type="text"
                    className="form-control"
                    defaultValue="INR"
                  />
                </div>
              </div>
              <div className="col-md-3 col-sm-6">
                <div className="mb-3">
                  <label className="col-form-label">Symbol</label>
                  <input
                    type="text"
                    className="form-control"
                    defaultValue="₹"
                  />
                </div>
              </div>
              <div className="col-md-3 col-sm-6">
                <div className="mb-3">
                  <label className="col-form-label">Exchange Rate</label>
                  <input
                    type="text"
                    className="form-control"
                    defaultValue="83.11"
                  />
                </div>
              </div>
            </div>
          </div>
          {/* /Indian Rupee */}
          {/* US Dollar */}
          <div className="d-flex align-items-center justify-content-between flex-wrap mb-3 pb-3 border-bottom row-gap-2">
            <div>
              <h5 className="fw-semibold mb-1">US Dollar</h5>
              <p>Shows the details of US Dollar currency</p>
            </div>
            <div className="dropdown table-action">
              <Link
                to="#"
                className="action-icon bg-white"
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
                  data-bs-target="#edit_currency"
                >
                  <i className="fa-solid fa-pencil text-blue" /> Edit
                </Link>
                <Link
                  className="dropdown-item"
                  to="#"
                  data-bs-toggle="modal"
                  data-bs-target="#delete_currency"
                >
                  <i className="fa-regular fa-trash-can text-danger" /> Delete
                </Link>
              </div>
            </div>
          </div>
          <div>
            <div className="row">
              <div className="col-md-3 col-sm-6">
                <div className="mb-3">
                  <label className="col-form-label">Currency Name</label>
                  <input
                    type="text"
                    className="form-control"
                    defaultValue="US Dollar"
                  />
                </div>
              </div>
              <div className="col-md-3 col-sm-6">
                <div className="mb-3">
                  <label className="col-form-label">Code</label>
                  <input
                    type="text"
                    className="form-control"
                    defaultValue="USD"
                  />
                </div>
              </div>
              <div className="col-md-3 col-sm-6">
                <div className="mb-3">
                  <label className="col-form-label">Symbol</label>
                  <input
                    type="text"
                    className="form-control"
                    defaultValue="$"
                  />
                </div>
              </div>
              <div className="col-md-3 col-sm-6">
                <div className="mb-3">
                  <label className="col-form-label">Exchange Rate</label>
                  <input
                    type="text"
                    className="form-control"
                    defaultValue="Default"
                  />
                </div>
              </div>
            </div>
          </div>
          {/* /US Dollar */}
          <div className="d-flex align-items-center">
            <Link to="#" className="btn btn-light me-2">
              Cancel
            </Link>
            <button type="button" className="btn btn-primary">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
    {/* /Currencies */}
  </div>
</div>

          </div>
        </div>
      </div>
      <CurrenciesModal />
    </div>
  );
};

export default Currencies;
