import React from 'react'
import { Link } from "react-router-dom";
import { all_routes } from '../../router/all_routes';
import CollapseHeader from '../../../core/common/collapse-header';
const route = all_routes;
const TaxRates = () => {
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
            <Link to={route.paymentGateways} className="fw-medium">
              Payment Gateways
            </Link>
            <Link to={route.bankAccounts} className="fw-medium">
              Bank Accounts
            </Link>
            <Link to={route.taxRates} className="fw-medium active">
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
          <h4 className="fs-20">Tax Rates</h4>
          <Link
            to="#"
            className="btn btn-sm btn-icon border rounded"
            data-bs-toggle="modal"
            data-bs-target="#add_tax"
          >
            <i className="ti ti-plus" />
          </Link>
        </div>
        <div className="row">
          <div className="col-md-4">
            <div className="mb-3">
              <label className="col-form-label">VAT</label>
              <div className="icon-form-end">
                <Link to="#" data-bs-toggle="modal" data-bs-target="#edit_tax">
                  <span className="form-icon">
                    <i className="ti ti-edit" />
                  </span>
                </Link>
                <input
                  type="text"
                  className="form-control"
                  defaultValue="16%"
                />
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="mb-3">
              <label className="col-form-label">GST</label>
              <div className="icon-form-end">
                <Link to="#" data-bs-toggle="modal" data-bs-target="#edit_tax">
                  <span className="form-icon">
                    <i className="ti ti-edit" />
                  </span>
                </Link>
                <input
                  type="text"
                  className="form-control"
                  defaultValue="14%"
                />
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="mb-3">
              <label className="col-form-label">HST</label>
              <div className="icon-form-end">
                <Link to="#" data-bs-toggle="modal" data-bs-target="#edit_tax">
                  <span className="form-icon">
                    <i className="ti ti-edit" />
                  </span>
                </Link>
                <input
                  type="text"
                  className="form-control"
                  defaultValue="12%"
                />
              </div>
            </div>
          </div>
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
        <>
  {/* Add Tax Rate */}
  <div className="modal fade" id="add_tax" role="dialog">
    <div className="modal-dialog modal-dialog-centered">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">Add Tax Rate</h5>
          <div className="d-flex align-items-center">
            <div className="status-toggle me-2">
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
                Name <span className="text-danger">*</span>
              </label>
              <input type="text" className="form-control" />
            </div>
            <div className="mb-0">
              <label className="col-form-label">
                Tax Rate % <span className="text-danger">*</span>
              </label>
              <input type="text" className="form-control" />
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
              <button type="button" data-bs-dismiss="modal"  className="btn btn-primary">
                Save
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
  {/* /Add Tax Rate */}
  {/* Edit Tax Rate */}
  <div className="modal fade" id="edit_tax" role="dialog">
    <div className="modal-dialog modal-dialog-centered">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">Edit Tax Rate</h5>
          <div className="d-flex align-items-center">
            <div className="status-toggle me-2">
              <input
                type="checkbox"
                id="toggle1"
                className="check"
                defaultChecked
              />
              <label htmlFor="toggle1" className="checktoggle" />
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
                Name <span className="text-danger">*</span>
              </label>
              <input type="text" className="form-control" defaultValue="VAT" />
            </div>
            <div className="mb-0">
              <label className="col-form-label">
                Tax Rate % <span className="text-danger">*</span>
              </label>
              <input type="text" className="form-control" defaultValue={16} />
            </div>
          </div>
          <div className="modal-footer">
            <Link to="#" className="btn btn-light" data-bs-dismiss="modal">
              Cancel
            </Link>
            <button type="button" data-bs-dismiss="modal"  className="btn btn-primary">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
  {/* /Edit Tax Rate */}
</>

      </div>
  )
}

export default TaxRates