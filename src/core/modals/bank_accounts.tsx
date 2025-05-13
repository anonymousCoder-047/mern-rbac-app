import React from "react";
import { Link } from "react-router-dom";

const BankAccountsModal = () => {
  return (
    <>
    {/* Add Bank Account */}
    <div className="modal fade" id="add_bank" role="dialog">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Add Bank Account</h5>
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
              <div className="mb-3">
                <label className="col-form-label">
                  Bank <span className="text-danger">*</span>
                </label>
                <input type="text" className="form-control" />
              </div>
              <div className="mb-3">
                <label className="col-form-label">
                  Branch <span className="text-danger">*</span>
                </label>
                <input type="text" className="form-control" />
              </div>
              <div className="mb-3">
                <label className="col-form-label">
                  Account Number <span className="text-danger">*</span>
                </label>
                <input type="text" className="form-control" />
              </div>
              <div className="mb-0">
                <label className="col-form-label">
                  IFSC Code <span className="text-danger">*</span>
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
    {/* /Add Bank Account */}
    {/* Edit Bank Account */}
    <div className="modal fade" id="edit_bank" role="dialog">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Edit Bank Account</h5>
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
          <form>
            <div className="modal-body">
              <div className="mb-3">
                <label className="col-form-label">
                  Name <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  defaultValue="Darlee Robertson"
                />
              </div>
              <div className="mb-3">
                <label className="col-form-label">
                  Bank <span className="text-danger">*</span>
                </label>
                <input type="text" className="form-control" defaultValue="HDFC" />
              </div>
              <div className="mb-3">
                <label className="col-form-label">
                  Branch <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  defaultValue="Bringham"
                />
              </div>
              <div className="mb-3">
                <label className="col-form-label">
                  Account Number <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  defaultValue="**** **** 4872"
                />
              </div>
              <div className="mb-0">
                <label className="col-form-label">
                  IFSC Code <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  defaultValue={198367}
                />
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
    {/* /Edit Bank Account */}
    {/* Delete Contact */}
    <div className="modal fade" id="delete_bank" role="dialog">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-body">
            <div className="text-center">
              <div className="avatar avatar-xl bg-danger-light rounded-circle mb-3">
                <i className="ti ti-trash-x fs-36 text-danger" />
              </div>
              <h4 className="mb-2">Remove Bank</h4>
              <p className="mb-0">
                Are you sure you want to remove <br /> bank you selected.
              </p>
              <div className="d-flex align-items-center justify-content-center mt-4">
                <Link
                  to="#"
                  className="btn btn-light me-2"
                  data-bs-dismiss="modal"
                >
                  Cancel
                </Link>
                <Link to="#"  data-bs-dismiss="modal" className="btn btn-danger">
                  Yes, Delete it
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    {/* /Delete Contact */}
  </>
  
  );
};

export default BankAccountsModal;
