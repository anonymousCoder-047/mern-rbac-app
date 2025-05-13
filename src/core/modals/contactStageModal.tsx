import React from 'react'
import { Link } from 'react-router-dom'

const ContactStageModal = () => {
  return (
  <div>
   {/* Add New Contact Stage */}
   <div className="modal fade" id="add_contact_stage" role="dialog">
    <div className="modal-dialog modal-dialog-centered">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">Add New Contact Stage</h5>
          <button
            className="btn-close custom-btn-close border p-1 me-0 text-dark"
            data-bs-dismiss="modal"
            aria-label="Close"
          >
            <i className="ti ti-x" />
          </button>
        </div>
        <form >
          <div className="modal-body">
            <div className="mb-3">
              <label className="col-form-label">
                Contact Stage <span className="text-danger">*</span>
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
                    id="add-active"
                    name="status"
                    defaultChecked
                  />
                  <label htmlFor="add-active">Active</label>
                </div>
                <div>
                  <input
                    type="radio"
                    className="status-radio"
                    id="add-inactive"
                    name="status"
                  />
                  <label htmlFor="add-inactive">Inactive</label>
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
              <button type="button" data-bs-dismiss="modal" className="btn btn-primary">
                Create
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
  {/* /Add New Contact Stage */}
  {/* Edit Contact Stage */}
  <div className="modal fade" id="edit_contact_stage" role="dialog">
    <div className="modal-dialog modal-dialog-centered">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">Edit Contact Stage</h5>
          <button
            className="btn-close custom-btn-close border p-1 me-0 text-dark"
            data-bs-dismiss="modal"
            aria-label="Close"
          >
            <i className="ti ti-x" />
          </button>
        </div>
        <form >
          <div className="modal-body">
            <div className="mb-3">
              <label className="col-form-label">
                Contact Stage <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                className="form-control"
                defaultValue="Contacted"
              />
            </div>
            <div className="mb-0">
              <label className="col-form-label">Status</label>
              <div className="d-flex flex-wrap radio-wrap">
                <div className="radio-btn">
                  <input
                    type="radio"
                    className="status-radio"
                    id="edit-active"
                    name="status"
                    defaultChecked
                  />
                  <label htmlFor="edit-active">Active</label>
                </div>
                <div className="radio-btn">
                  <input
                    type="radio"
                    className="status-radio"
                    id="edit-inactive"
                    name="status"
                  />
                  <label htmlFor="edit-inactive">Inactive</label>
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
              <button type="button" data-bs-dismiss="modal" className="btn btn-primary">
                Save Changes
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
  {/* /Edit Contact Stage */}
  {/* Delete Contact Stage */}
  <div className="modal fade" id="delete_contact_stage" role="dialog">
    <div className="modal-dialog modal-dialog-centered">
      <div className="modal-content">
        <div className="modal-body">
          <div className="text-center">
            <div className="avatar avatar-xl bg-danger-light rounded-circle mb-3">
              <i className="ti ti-trash-x fs-36 text-danger" />
            </div>
            <h4 className="mb-2">Remove Contact Stage?</h4>
            <p className="mb-0">AAre you sure you want to remove it.</p>
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
  {/* /Delete Contact Stage */}
</div>

  )
}

export default ContactStageModal