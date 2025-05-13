import React from 'react'
import { Link } from 'react-router-dom'
import { all_routes } from '../../feature-module/router/all_routes';
const route = all_routes;

const CurrenciesModal = () => {
  return (

    <>
    {/* Add Currency */}
    <div className="modal fade" id="add_currency" role="dialog">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Add Currency</h5>
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
                  Currency Name <span className="text-danger">*</span>
                </label>
                <input type="text" className="form-control" />
              </div>
              <div className="mb-3">
                <label className="col-form-label">
                  Code <span className="text-danger">*</span>
                </label>
                <input type="text" className="form-control" />
              </div>
              <div className="mb-3">
                <label className="col-form-label">
                  Symbol <span className="text-danger">*</span>
                </label>
                <input type="text" className="form-control" />
              </div>
              <div className="mb-0">
                <label className="col-form-label">
                  Exchange Rate <span className="text-danger">*</span>
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
    {/* /Add Currency */}
    {/* Edit Currency */}
    <div className="modal fade" id="edit_currency" role="dialog">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Edit Currency</h5>
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
                  Currency Name <span className="text-danger">*</span>
                </label>
                <input type="text" className="form-control" defaultValue="Euro" />
              </div>
              <div className="mb-3">
                <label className="col-form-label">
                  Code <span className="text-danger">*</span>
                </label>
                <input type="text" className="form-control" defaultValue="EUR" />
              </div>
              <div className="mb-3">
                <label className="col-form-label">
                  Symbol <span className="text-danger">*</span>
                </label>
                <input type="text" className="form-control" defaultValue="€" />
              </div>
              <div className="mb-0">
                <label className="col-form-label">
                  Exchange Rate <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  defaultValue="Default"
                />
              </div>
            </div>
            <div className="modal-footer">
              <div className="d-flex align-items-center justify-content-end m-0">
                <Link to="#" className="btn btn-light" data-bs-dismiss="modal">
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
    {/* /Edit Currency */}
    {/* Delete Account */}
    <div className="modal custom-modal fade" id="delete_currency" role="dialog">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-body">
            <div className="text-center">
              <div className="avatar avatar-xl bg-danger-light rounded-circle mb-3">
                <i className="ti ti-trash-x fs-36 text-danger" />
              </div>
              <h4 className="mb-2">Remove Currency?</h4>
              <p className="mb-0">Are you sure you want to remove it.</p>
              <div className="d-flex align-items-center justify-content-center mt-4">
                <Link
                  to="#"
                  className="btn btn-light me-2"
                  data-bs-dismiss="modal"
                >
                  Cancel
                </Link>
                <Link to="#" data-bs-dismiss="modal" className="btn btn-danger">
                  Yes, Delete it
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    {/* /Delete Account */}
  </>
  

   
  )
}

export default CurrenciesModal