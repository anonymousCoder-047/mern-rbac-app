import React from 'react'
import ImageWithBasePath from '../../../core/common/imageWithBasePath'
import { Link } from "react-router-dom";
import { all_routes } from '../../router/all_routes';
import CollapseHeader from '../../../core/common/collapse-header';
const route = all_routes;
const PaymentGateways = () => {
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
            <Link to={route.paymentGateways} className="fw-medium active">
              Payment Gateways
            </Link>
            <Link to={route.bankAccounts} className="fw-medium">
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
      <div className="card-body">
        <div className="mb-4">
          <h4 className="fs-20">Payment Gateways</h4>
        </div>
        <div className="row">
          {/* Email Wrap */}
          <div className="col-md-12">
            {/* Payment */}
            <div className="border rounded p-3 mb-4">
              <div className="row gy-3">
                <div className="col-sm-5">
                  <div className="d-flex align-items-center">
                    <span className="border rounded d-flex align-items-center justify-content-center payment-img p-2">
                      <ImageWithBasePath src="assets/img/icons/payment-01.svg" alt="" />
                    </span>
                    <div className="ms-2">
                      <Link
                        to="#"
                        className="badge bg-soft-success"
                      >
                        Connected
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="col-sm-7">
                  <div className="d-flex align-items-center justify-content-between">
                    <div>
                      <Link
                        to="#"
                        data-bs-toggle="collapse"
                        data-bs-target="#php-mail"
                        className="text-default me-2"
                      >
                        <i className="ti ti-info-circle-filled" />
                      </Link>
                      <Link
                        to="#"
                        className="btn btn-light"
                        data-bs-toggle="modal"
                        data-bs-target="#add_paypal"
                      >
                        <i className="ti ti-tool me-1" />
                        View Integration
                      </Link>
                    </div>
                    <div className="status-toggle ms-auto">
                      <input
                        type="checkbox"
                        id="mail1"
                        className="check"
                        defaultChecked
                      />
                      <label htmlFor="mail1" className="checktoggle">
                        {" "}
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="collapse pt-3 mt-3 border-top" id="php-mail">
                <div>
                  <p>
                    PayPal Holdings, Inc. is an American multinational financial
                    technology company operating an online payments system in
                    the majority of countries that support online money
                    transfers, and serves as an electronic alternative to
                    traditional paper methods such as checks and money orders.{" "}
                  </p>
                </div>
              </div>
            </div>
            {/* /Payment */}
            {/* Payment */}
            <div className="border rounded p-3 mb-4">
              <div className="row  gy-3">
                <div className="col-sm-5">
                  <div className="d-flex align-items-center">
                    <span className="border rounded d-flex align-items-center justify-content-center payment-img p-2">
                      <ImageWithBasePath src="assets/img/icons/payment-02.svg" alt="" />
                    </span>
                    <div className="ms-2">
                      <Link
                        to="#"
                        className="badge bg-soft-purple text-purple"
                      >
                        Not Connected
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="col-sm-7">
                  <div className="d-flex align-items-center justify-content-between">
                    <div>
                      <Link
                        to="#"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapse1"
                        className="text-default me-2"
                      >
                        <i className="ti ti-info-circle-filled" />
                      </Link>
                      <Link to="#" className="btn btn-primary">
                        <i className="ti ti-plug-connected me-1" />
                        Connect Now
                      </Link>
                    </div>
                    <div className="status-toggle ms-auto">
                      <input
                        type="checkbox"
                        id="mail2"
                        className="check"
                        defaultChecked
                      />
                      <label htmlFor="mail2" className="checktoggle">
                        {" "}
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="collapse pt-3 mt-3 border-top" id="collapse1">
                <div>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Nulla dapibus magna sit amet risus dictum iaculis. Donec
                    fermentum fermentum tincidunt. Pellentesque mauris elit,
                    viverra non eros in, condimentum vulputate libero. Phasellus
                    eu orci et felis maximus posuere.
                  </p>
                </div>
              </div>
            </div>
            {/* /Payment */}
            {/* Payment */}
            <div className="border rounded p-3 mb-4">
              <div className="row  gy-3">
                <div className="col-sm-5">
                  <div className="d-flex align-items-center">
                    <span className="border rounded d-flex align-items-center justify-content-center payment-img p-2">
                      <ImageWithBasePath src="assets/img/icons/payment-03.svg" alt="" />
                    </span>
                    <div className="ms-2">
                      <Link
                        to="#"
                        className="badge bg-soft-purple text-purple"
                      >
                        Not Connected
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="col-sm-7">
                  <div className="d-flex align-items-center justify-content-between">
                    <div>
                      <Link
                        to="#"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapse2"
                        className="text-default me-2"
                      >
                        <i className="ti ti-info-circle-filled" />
                      </Link>
                      <Link to="#" className="btn btn-primary">
                        <i className="ti ti-plug-connected me-1" />
                        Connect Now
                      </Link>
                    </div>
                    <div className="status-toggle ms-auto">
                      <input
                        type="checkbox"
                        id="mail3"
                        className="check"
                        defaultChecked
                      />
                      <label htmlFor="mail3" className="checktoggle">
                        {" "}
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="collapse pt-3 mt-3 border-top" id="collapse2">
                <div>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Nulla dapibus magna sit amet risus dictum iaculis. Donec
                    fermentum fermentum tincidunt. Pellentesque mauris elit,
                    viverra non eros in, condimentum vulputate libero. Phasellus
                    eu orci et felis maximus posuere.
                  </p>
                </div>
              </div>
            </div>
            {/* /Payment */}
            {/* Payment */}
            <div className="border rounded p-3 mb-4">
              <div className="row  gy-3">
                <div className="col-sm-5">
                  <div className="d-flex align-items-center">
                    <span className="border rounded d-flex align-items-center justify-content-center payment-img p-2">
                      <ImageWithBasePath src="assets/img/icons/payment-04.svg" alt="" />
                    </span>
                    <div className="ms-2">
                      <Link
                        to="#"
                        className="badge bg-soft-success"
                      >
                        Connected
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="col-sm-7">
                  <div className="d-flex align-items-center justify-content-between">
                    <div>
                      <Link
                        to="#"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapse3"
                        className="text-default me-2"
                      >
                        <i className="ti ti-info-circle-filled" />
                      </Link>
                      <Link to="#" className="btn btn-light">
                        <i className="ti ti-tool me-1" />
                        View Integration
                      </Link>
                    </div>
                    <div className="status-toggle ms-auto">
                      <input
                        type="checkbox"
                        id="mail4"
                        className="check"
                        defaultChecked
                      />
                      <label htmlFor="mail4" className="checktoggle">
                        {" "}
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="collapse pt-3 mt-3 border-top" id="collapse3">
                <div>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Nulla dapibus magna sit amet risus dictum iaculis. Donec
                    fermentum fermentum tincidunt. Pellentesque mauris elit,
                    viverra non eros in, condimentum vulputate libero. Phasellus
                    eu orci et felis maximus posuere.
                  </p>
                </div>
              </div>
            </div>
            {/* /Payment */}
            {/* Payment */}
            <div className="border rounded p-3 mb-4">
              <div className="row  gy-3">
                <div className="col-sm-5">
                  <div className="d-flex align-items-center">
                    <span className="border rounded d-flex align-items-center justify-content-center payment-img p-2">
                      <ImageWithBasePath src="assets/img/icons/payment-05.svg" alt="" />
                    </span>
                    <div className="ms-2">
                      <Link
                        to="#"
                        className="badge bg-soft-purple text-purple"
                      >
                        Not Connected
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="col-sm-7">
                  <div className="d-flex align-items-center justify-content-between">
                    <div>
                      <Link
                        to="#"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapse4"
                        className="text-default me-2"
                      >
                        <i className="ti ti-info-circle-filled" />
                      </Link>
                      <Link to="#" className="btn btn-primary">
                        <i className="ti ti-plug-connected me-1" />
                        Connect Now
                      </Link>
                    </div>
                    <div className="status-toggle ms-auto">
                      <input
                        type="checkbox"
                        id="mail5"
                        className="check"
                        defaultChecked
                      />
                      <label htmlFor="mail5" className="checktoggle">
                        {" "}
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="collapse pt-3 mt-3 border-top" id="collapse4">
                <div>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Nulla dapibus magna sit amet risus dictum iaculis. Donec
                    fermentum fermentum tincidunt. Pellentesque mauris elit,
                    viverra non eros in, condimentum vulputate libero. Phasellus
                    eu orci et felis maximus posuere.
                  </p>
                </div>
              </div>
            </div>
            {/* /Payment */}
            {/* Payment */}
            <div className="border rounded p-3 mb-4">
              <div className="row  gy-3">
                <div className="col-sm-5">
                  <div className="d-flex align-items-center">
                    <span className="border rounded d-flex align-items-center justify-content-center payment-img p-2">
                      <ImageWithBasePath src="assets/img/icons/payment-06.svg" alt="" />
                    </span>
                    <div className="ms-2">
                      <Link
                        to="#"
                        className="badge bg-soft-success"
                      >
                        Connected
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="col-sm-7">
                  <div className="d-flex align-items-center justify-content-between">
                    <div>
                      <Link
                        to="#"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapse5"
                        className="text-default me-2"
                      >
                        <i className="ti ti-info-circle-filled" />
                      </Link>
                      <Link to="#" className="btn btn-light">
                        <i className="ti ti-tool me-1" />
                        View Integration
                      </Link>
                    </div>
                    <div className="status-toggle ms-auto">
                      <input
                        type="checkbox"
                        id="mail6"
                        className="check"
                        defaultChecked
                      />
                      <label htmlFor="mail6" className="checktoggle">
                        {" "}
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="collapse pt-3 mt-3 border-top" id="collapse5">
                <div>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Nulla dapibus magna sit amet risus dictum iaculis. Donec
                    fermentum fermentum tincidunt. Pellentesque mauris elit,
                    viverra non eros in, condimentum vulputate libero. Phasellus
                    eu orci et felis maximus posuere.
                  </p>
                </div>
              </div>
            </div>
            {/* /Payment */}
            {/* Payment */}
            <div className="border rounded p-3 mb-4">
              <div className="row  gy-3">
                <div className="col-sm-5">
                  <div className="d-flex align-items-center">
                    <span className="border rounded d-flex align-items-center justify-content-center payment-img p-2">
                      <ImageWithBasePath src="assets/img/icons/payment-07.svg" alt="" />
                    </span>
                    <div className="ms-2">
                      <Link
                        to="#"
                        className="badge bg-soft-purple text-purple"
                      >
                        Not Connected
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="col-sm-7">
                  <div className="d-flex align-items-center justify-content-between">
                    <div>
                      <Link
                        to="#"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapse6"
                        className="text-default me-2"
                      >
                        <i className="ti ti-info-circle-filled" />
                      </Link>
                      <Link to="#" className="btn btn-primary">
                        <i className="ti ti-plug-connected me-1" />
                        Connect Now
                      </Link>
                    </div>
                    <div className="status-toggle ms-auto">
                      <input
                        type="checkbox"
                        id="mail7"
                        className="check"
                        defaultChecked
                      />
                      <label htmlFor="mail7" className="checktoggle">
                        {" "}
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="collapse pt-3 mt-3 border-top" id="collapse6">
                <div>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Nulla dapibus magna sit amet risus dictum iaculis. Donec
                    fermentum fermentum tincidunt. Pellentesque mauris elit,
                    viverra non eros in, condimentum vulputate libero. Phasellus
                    eu orci et felis maximus posuere.
                  </p>
                </div>
              </div>
            </div>
            {/* /Payment */}
            {/* Payment */}
            <div className="border rounded p-3 mb-4">
              <div className="row  gy-3">
                <div className="col-sm-5">
                  <div className="d-flex align-items-center">
                    <span className="border rounded d-flex align-items-center justify-content-center payment-img p-2">
                      <ImageWithBasePath src="assets/img/icons/payment-08.svg" alt="" />
                    </span>
                    <div className="ms-2">
                      <Link
                        to="#"
                        className="badge bg-soft-success"
                      >
                        Connected
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="col-sm-7">
                  <div className="d-flex align-items-center justify-content-between">
                    <div>
                      <Link
                        to="#"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapse7"
                        className="text-default me-2"
                      >
                        <i className="ti ti-info-circle-filled" />
                      </Link>
                      <Link to="#" className="btn btn-light">
                        <i className="ti ti-tool me-1" />
                        View Integration
                      </Link>
                    </div>
                    <div className="status-toggle ms-auto">
                      <input
                        type="checkbox"
                        id="mail8"
                        className="check"
                        defaultChecked
                      />
                      <label htmlFor="mail8" className="checktoggle">
                        {" "}
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="collapse pt-3 mt-3 border-top" id="collapse7">
                <div>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Nulla dapibus magna sit amet risus dictum iaculis. Donec
                    fermentum fermentum tincidunt. Pellentesque mauris elit,
                    viverra non eros in, condimentum vulputate libero. Phasellus
                    eu orci et felis maximus posuere.
                  </p>
                </div>
              </div>
            </div>
            {/* /Payment */}
            {/* Payment */}
            <div className="border rounded p-3 mb-4">
              <div className="row  gy-3">
                <div className="col-sm-5">
                  <div className="d-flex align-items-center">
                    <span className="border rounded d-flex align-items-center justify-content-center payment-img p-2">
                      <ImageWithBasePath src="assets/img/icons/payment-09.svg" alt="" />
                    </span>
                    <div className="ms-2">
                      <Link
                        to="#"
                        className="badge bg-soft-success"
                      >
                        Connected
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="col-sm-7">
                  <div className="d-flex align-items-center justify-content-between">
                    <div>
                      <Link
                        to="#"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapse8"
                        className="text-default me-2"
                      >
                        <i className="ti ti-info-circle-filled" />
                      </Link>
                      <Link to="#" className="btn btn-light">
                        <i className="ti ti-tool me-1" />
                        View Integration
                      </Link>
                    </div>
                    <div className="status-toggle ms-auto">
                      <input
                        type="checkbox"
                        id="mail9"
                        className="check"
                        defaultChecked
                      />
                      <label htmlFor="mail9" className="checktoggle">
                        {" "}
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="collapse pt-3 mt-3 border-top" id="collapse8">
                <div>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Nulla dapibus magna sit amet risus dictum iaculis. Donec
                    fermentum fermentum tincidunt. Pellentesque mauris elit,
                    viverra non eros in, condimentum vulputate libero. Phasellus
                    eu orci et felis maximus posuere.
                  </p>
                </div>
              </div>
            </div>
            {/* /Payment */}
            {/* Payment */}
            <div className="border rounded p-3">
              <div className="row  gy-3">
                <div className="col-sm-5">
                  <div className="d-flex align-items-center">
                    <span className="border rounded d-flex align-items-center justify-content-center payment-img p-2">
                      <ImageWithBasePath src="assets/img/icons/payment-10.svg" alt="" />
                    </span>
                    <div className="ms-2">
                      <Link
                        to="#"
                        className="badge bg-soft-purple text-purple"
                      >
                        Not Connected
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="col-sm-7">
                  <div className="d-flex align-items-center justify-content-between">
                    <div>
                      <Link
                        to="#"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapse9"
                        className="text-default me-2"
                      >
                        <i className="ti ti-info-circle-filled" />
                      </Link>
                      <Link to="#" className="btn btn-primary">
                        <i className="ti ti-plug-connected me-1" />
                        Connect Now
                      </Link>
                    </div>
                    <div className="status-toggle ms-auto">
                      <input
                        type="checkbox"
                        id="mail10"
                        className="check"
                        defaultChecked
                      />
                      <label htmlFor="mail10" className="checktoggle">
                        {" "}
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="collapse pt-3 mt-3 border-top" id="collapse9">
                <div>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Nulla dapibus magna sit amet risus dictum iaculis. Donec
                    fermentum fermentum tincidunt. Pellentesque mauris elit,
                    viverra non eros in, condimentum vulputate libero. Phasellus
                    eu orci et felis maximus posuere.
                  </p>
                </div>
              </div>
            </div>
            {/* /Payment */}
          </div>
          {/* /Email Wrap */}
        </div>
      </div>
    </div>
    {/* /Settings Info */}
  </div>
</div>

          </div>
        </div>
      </div>
    </div>
    {/* /Page Wrapper */}
    {/* Paypal */}
    <>
  {/* Paypal */}
  <div className="modal fade" id="add_paypal" role="dialog">
    <div className="modal-dialog modal-dialog-centered">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">Paypal</h5>
          <div className="d-flex align-items-center mod-toggle">
            <div className="status-toggle">
              <input
                type="checkbox"
                id="toggle"
                className="check"
                defaultChecked
              />
              <label htmlFor="toggle" className="checktoggle" />
            </div>
            <button
              className="btn-close custom-btn-close border p-1 me-0 text-dark"
              data-bs-dismiss="modal"
              aria-label="Close"
            >
              <i className="ti ti-x" />
            </button>
          </div>
        </div>
        <form >
          <div className="modal-body">
            <div className="mb-3">
              <label className="col-form-label">
                From Email Address <span className="text-danger">*</span>
              </label>
              <input type="text" className="form-control" />
            </div>
            <div className="mb-3">
              <label className="col-form-label">
                API Key <span className="text-danger">*</span>
              </label>
              <input type="text" className="form-control" />
            </div>
            <div className="mb-3">
              <label className="col-form-label">
                Secret Key <span className="text-danger">*</span>
              </label>
              <input type="text" className="form-control" />
            </div>
            <div className="mb-0">
              <label className="col-form-label">Status</label>
              <div className="d-flex align-items-center">
                <div className="me-2">
                  <input
                    type="radio"
                    className="status-radio"
                    id="pdf"
                    name="export-type"
                    defaultChecked
                  />
                  <label htmlFor="pdf">Active</label>
                </div>
                <div>
                  <input
                    type="radio"
                    className="status-radio"
                    id="share"
                    name="export-type"
                  />
                  <label htmlFor="share">Inactive</label>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <div className="d-flex align-items-center justify-content-end m-0">
              <Link
                to="#"
                className="btn btn-light me-2"
                data-bs-dismiss="modal"
              >
                Cancel
              </Link>
              <button type="button" className="btn btn-primary">
                Save
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
  {/* /Paypal */}
</>

    {/* /Paypal */}
  </div>
  )
}

export default PaymentGateways