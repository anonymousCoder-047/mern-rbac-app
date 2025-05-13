import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  setActivityTogglePopup,
  setActivityTogglePopupTwo,
} from "../data/redux/commonSlice";
import Select from "react-select";
import { all_routes } from "../../feature-module/router/all_routes";

const CampaignModal = () => {
  const dispatch = useDispatch();
  const activityToggle = useSelector(
    (state: any) => state?.activityTogglePopup
  );
  const activityToggleTwo = useSelector(
    (state: any) => state?.activityTogglePopupTwo
  );

  const campaignType = [
    { value: "choose", label: "Choose" },
    { value: "public_relations", label: "Public Relations" },
    { value: "brand", label: "Brand" },
    { value: "media", label: "Media" },
  ];
  const currency = [
    { value: "Choose", label: "Choose" },
    { value: "Dollar", label: "Dollar" },
    { value: "Euro", label: "Euro" },
    { value: "Pound", label: "Pound" },
    { value: "Rupee", label: "Rupee" },
  ];
  const targeyAudience = [
    { value: "small_business", label: "Small Business" },
    { value: "corporate_companies", label: "Corporate Companies" },
    { value: "urban_apartment", label: "Urban Apartment" },
    { value: "business", label: "Business" },
  ];
  const route = all_routes;
  return (
    <>
      <>
        {/* Add New Campaign */}
        <div
          className="offcanvas offcanvas-end offcanvas-large"
          tabIndex={-1}
          id="offcanvas_add"
        >
          <div className="offcanvas-header border-bottom">
            <h4>Add New Campaign</h4>
            <button
              type="button"
              className="btn-close custom-btn-close border p-1 me-0 d-flex align-items-center justify-content-center rounded-circle"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            >
              <i className="ti ti-x" />
            </button>
          </div>
          <div className="offcanvas-body">
            <form >
              <div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="mb-3">
                      <label className="col-form-label">
                        Name <span className="text-danger">*</span>
                      </label>
                      <input type="text" className="form-control" />
                    </div>
                    <div className="mb-3">
                      <label className="col-form-label">
                        Campaign Type <span className="text-danger">*</span>
                      </label>
                      <Select
                        options={campaignType}
                        className="select"
                        placeholder="Choose"
                        classNamePrefix="react-select"
                      />
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-6">
                    <div className="mb-3">
                      <label className="col-form-label">
                        Deal Value<span className="text-danger"> *</span>
                      </label>
                      <input className="form-control" type="text" />
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-6">
                    <div className="mb-3">
                      <label className="col-form-label">
                        Currency <span className="text-danger">*</span>
                      </label>
                      <Select
                        options={currency}
                        className="select"
                        placeholder="Choose"
                        classNamePrefix="react-select"
                      />
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-6">
                    <div className="mb-3">
                      <label className="col-form-label">
                        Period <span className="text-danger">*</span>
                      </label>
                      <input className="form-control" type="text" />
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-6">
                    <div className="mb-3">
                      <label className="col-form-label">
                        Period Value <span className="text-danger">*</span>
                      </label>
                      <input className="form-control" type="text" />
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="mb-3">
                      <label className="col-form-label">
                        Target Audience <span className="text-danger">*</span>
                      </label>
                      <Select
                        defaultValue={[
                          targeyAudience[1],
                          targeyAudience[2],
                          targeyAudience[3],
                        ]}
                        isMulti
                        name="colors"
                        options={targeyAudience}
                        className="select"
                      />
                    </div>
                    <div className="mb-3">
                      <label className="col-form-label">
                        Description <span className="text-danger">*</span>
                      </label>
                      <textarea
                        className="form-control"
                        rows={4}
                        defaultValue={""}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="col-form-label">
                        Attachment <span className="text-danger">*</span>
                      </label>
                      <div className="drag-attach">
                        <input type="file" />
                        <div className="img-upload">
                          <i className="ti ti-file-broken" />
                          Upload File
                        </div>
                      </div>
                    </div>
                    <div className="mb-3">
                      <label className="col-form-label">Uploaded Files</label>
                      <div className="upload-file upload-list">
                        <div>
                          <h6>tes.txt</h6>
                          <p>4.25 MB</p>
                        </div>
                        <Link to="#" className="text-danger">
                          <i className="ti ti-trash-x" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="d-flex align-items-center justify-content-end">
                <button
                  type="button"
                  data-bs-dismiss="offcanvas"
                  className="btn btn-light me-2"
                >
                  Cancel
                </button>
                <button type="button" className="btn btn-primary">
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
        {/* /Add New Campaign */}
        {/* Edit Campaign */}
        <div
          className="offcanvas offcanvas-end offcanvas-large"
          tabIndex={-1}
          id="offcanvas_edit"
        >
          <div className="offcanvas-header border-bottom">
            <h4>Edit Campaign</h4>
            <button
              type="button"
              className="btn-close custom-btn-close border p-1 me-0 d-flex align-items-center justify-content-center rounded-circle"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            >
              <i className="ti ti-x" />
            </button>
          </div>
          <div className="offcanvas-body">
            <form >
              <div className="pro-create">
                <div className="row">
                  <div className="col-md-12">
                    <div className="mb-3">
                      <label className="col-form-label">
                        Name <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        defaultValue="Enhanced brand"
                      />
                    </div>
                    <div className="mb-3">
                      <label className="col-form-label">
                        Campaign Type <span className="text-danger">*</span>
                      </label>
                      <Select
                        options={campaignType}
                        className="select"
                        placeholder="Choose"
                        classNamePrefix="react-select"
                      />
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-6">
                    <div className="mb-3">
                      <label className="col-form-label">
                        Deal Value<span className="text-danger"> *</span>
                      </label>
                      <input
                        className="form-control"
                        type="text"
                        defaultValue="$12,989"
                      />
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-6">
                    <div className="mb-3">
                      <label className="col-form-label">
                        Currency <span className="text-danger">*</span>
                      </label>
                      <Select
                        options={currency}
                        className="select"
                        placeholder="Choose"
                        classNamePrefix="react-select"
                      />
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-6">
                    <div className="mb-3">
                      <label className="col-form-label">
                        Period <span className="text-danger">*</span>
                      </label>
                      <input className="form-control" type="text" />
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-6">
                    <div className="mb-3">
                      <label className="col-form-label">
                        Period Value <span className="text-danger">*</span>
                      </label>
                      <input className="form-control" type="text" />
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="mb-3">
                      <label className="col-form-label">
                        Target Audience <span className="text-danger">*</span>
                      </label>
                      <Select
                        defaultValue={[
                          targeyAudience[1],
                          targeyAudience[2],
                          targeyAudience[3],
                        ]}
                        isMulti
                        name="colors"
                        options={targeyAudience}
                        className="select"
                      />
                    </div>
                    <div className="mb-3">
                      <label className="col-form-label">
                        Description <span className="text-danger">*</span>
                      </label>
                      <textarea
                        className="form-control"
                        rows={4}
                        defaultValue={""}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="col-form-label">
                        Attachment <span className="text-danger">*</span>
                      </label>
                      <div className="drag-attach">
                        <input type="file" />
                        <div className="img-upload">
                          <i className="ti ti-file-broken" />
                          Upload File
                        </div>
                      </div>
                    </div>
                    <div className="mb-3">
                      <label className="col-form-label">Uploaded Files</label>
                      <div className="upload-file upload-list">
                        <div>
                          <h6>tes.txt</h6>
                          <p>4.25 MB</p>
                        </div>
                        <Link to="#" className="text-danger">
                          <i className="ti ti-trash-x" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="d-flex align-items-center justify-content-end">
                <button
                  type="button"
                  data-bs-dismiss="offcanvas"
                  className="btn btn-light me-2"
                >
                  Cancel
                </button>
                <button type="button" className="btn btn-primary">
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
        {/* /Edit Campaign */}
      </>
      <>
        {/* Delete Campaign */}
        <div className="modal fade" id="delete_campaign" role="dialog">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-body">
                <div className="text-center">
                  <div className="avatar avatar-xl bg-danger-light rounded-circle mb-3">
                    <i className="ti ti-trash-x fs-36 text-danger" />
                  </div>
                  <h4 className="mb-2">Remove campaign?</h4>
                  <p className="mb-0">
                    Are you sure you want to remove <br /> campaign you
                    selected.
                  </p>
                  <div className="d-flex align-items-center justify-content-center mt-4">
                    <Link
                      to="#"
                      className="btn btn-light me-2"
                      data-bs-dismiss="modal"
                    >
                      Cancel
                    </Link>
                    <Link to="#" className="btn btn-danger" data-bs-dismiss="modal">
                      Yes, Delete it
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* /Delete Campaign */}
        {/* Add New View */}
        <div className="modal custom-modal fade" id="save_view" role="dialog">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add New View</h5>
                <button
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                >
                  <i className="ti ti-x" />
                </button>
              </div>
              <div className="modal-body">
                <form >
                  <div className="mb-3">
                    <label className="col-form-label">View Name</label>
                    <input type="text" className="form-control" />
                  </div>
                  <div className="modal-btn text-end">
                    <Link
                      to="#"
                      className="btn btn-light"
                      data-bs-dismiss="modal"
                    >
                      Cancel
                    </Link>
                    <button type="submit" className="btn btn-danger">
                      Save
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        {/* /Add New View */}
      </>
    </>
  );
};

export default CampaignModal;
