import React, { useState } from "react";
import BankAccountsModal from "../../../core/modals/bank_accounts";
import { Link } from "react-router-dom";
import { all_routes } from "../../router/all_routes";
import CollapseHeader from "../../../core/common/collapse-header";

const BankAccounts = () => {
  const route = all_routes;
  const [isActive, setIsActive] = useState("HDFC");

  const setActive = (theme:any) => {
    setIsActive(theme);
  };

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
            <Link to={route.bankAccounts} className="fw-medium active">
              Bank Accounts
            </Link>
            <Link to={route.taxRates} className="fw-medium">
              Tax Rates
            </Link>
            <Link to={route.currencies} className="fw-medium">
              Currencies
            </Link>
          </div>
        </div>
      </div>
    </div>
    {/* /Settings Sidebar */}
  </div>
  <div className="col-xl-9 col-lg-12">
    {/* Settings Info */}
    <div className="card">
      <div className="card-body pb-0">
        <div className="d-flex align-items-center justify-content-between mb-4">
          <h4 className="fs-20">Bank Accounts</h4>
          <Link
            to="#"
            className="btn btn-sm btn-icon rounded border"
            data-bs-toggle="modal"
            data-bs-target="#add_bank"
          >
            <i className="ti ti-plus" />
          </Link>
        </div>
        <div className="row">
          {/* Bank Account */}
          <div className="col-xxl-4 col-sm-6">
            <div className="bank-box active">
              <div className="mb-4">
                <h5 className="fw-semibold mb-1">HDFC</h5>
                <p className="fw-medium">**** **** 4872</p>
              </div>
              <div className="d-flex align-items-center justify-content-between">
                <div>
                  <h6 className="fw-medium mb-1">Holder Name</h6>
                  <p className="fs-12">Darlee Robertson</p>
                </div>
                <div className="dropdown table-action">
                  <Link
                    to="#"
                    className="action-icon"
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
                      data-bs-target="#edit_bank"
                    >
                      <i className="fa-solid fa-pencil text-blue" /> Edit
                    </Link>
                    <Link
                      className="dropdown-item"
                      to="#"
                      data-bs-toggle="modal"
                      data-bs-target="#delete_bank"
                    >
                      <i className="fa-regular fa-trash-can text-danger" />{" "}
                      Delete
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* /Bank Account */}
          {/* Bank Account */}
          <div className="col-xxl-4 col-sm-6">
            <div className="bank-box">
              <div className="mb-4">
                <h5 className="fw-semibold mb-1">SBI</h5>
                <p className="fw-medium">**** **** 2495</p>
              </div>
              <div className="d-flex align-items-center justify-content-between">
                <div>
                  <h6 className="fw-medium mb-1">Holder Name</h6>
                  <p className="fs-12">Sharon Roy</p>
                </div>
                <div className="dropdown table-action">
                  <Link
                    to="#"
                    className="action-icon"
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
                      data-bs-target="#edit_bank"
                    >
                      <i className="fa-solid fa-pencil text-blue" /> Edit
                    </Link>
                    <Link
                      className="dropdown-item"
                      to="#"
                      data-bs-toggle="modal"
                      data-bs-target="#delete_bank"
                    >
                      <i className="fa-regular fa-trash-can text-danger" />{" "}
                      Delete
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* /Bank Account */}
          {/* Bank Account */}
          <div className="col-xxl-4 col-sm-6">
            <div className="bank-box">
              <div className="mb-4">
                <h5 className="fw-semibold mb-1">KVB</h5>
                <p className="fw-medium">**** **** 3948</p>
              </div>
              <div className="d-flex align-items-center justify-content-between">
                <div>
                  <h6 className="fw-medium mb-1">Holder Name</h6>
                  <p className="fs-12">Vaughan</p>
                </div>
                <div className="dropdown table-action">
                  <Link
                    to="#"
                    className="action-icon"
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
                      data-bs-target="#edit_bank"
                    >
                      <i className="fa-solid fa-pencil text-blue" /> Edit
                    </Link>
                    <Link
                      className="dropdown-item"
                      to="#"
                      data-bs-toggle="modal"
                      data-bs-target="#delete_bank"
                    >
                      <i className="fa-regular fa-trash-can text-danger" />{" "}
                      Delete
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* /Bank Account */}
        </div>
      </div>
    </div>
    {/* /Settings Info */}
  </div>
</div>

          </div>
        </div>
      </div>

      <BankAccountsModal />
    </div>
  );
};

export default BankAccounts;
