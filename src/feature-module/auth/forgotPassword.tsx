import React, { useState } from "react";
import ImageWithBasePath from "../../core/common/imageWithBasePath";
import { Link, useNavigate } from 'react-router-dom'
import { all_routes } from "../router/all_routes";
import { axiosPublic } from "../../helper/axios";
import { endpoints } from "../../helper/endpoints";

const ForgotPassword = () => {
  const route = all_routes;
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    email: ""
  })

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if(formData.email != "") {
      const { Auth } = endpoints;
      const { status } = await axiosPublic.post(Auth.forgetPassword, formData);

      if(status == 200) navigate(route.twoStepVerification);
      else setError("Email is required.")
    }
  }

  return (
    <div className="account-content">
  <div className="d-flex flex-wrap w-100 vh-100 overflow-hidden account-bg-03">
    <div className="d-flex align-items-center justify-content-center flex-wrap vh-100 overflow-auto p-4 w-50 bg-backdrop">
      <form className={`flex-fill ${error ? "was-validated" : ""}`}>
        <div className="mx-auto mw-450">
          <div className="text-center mb-4">
            {/* <ImageWithBasePath src="assets/img/logo.svg" className="img-fluid" alt="Logo" /> */}
          </div>
          <div className="mb-4">
            <h4 className="mb-2 fs-20">Forgot Password?</h4>
            <p>
              If you forgot your password, well, then we’ll email you
              instructions to reset your password.
            </p>
          </div>
          <div className="mb-3">
            <label className="col-form-label">Email Address</label>
            <div className="position-relative">
              <span className="input-icon-addon">
                <i className="ti ti-mail" />
              </span>
              <input 
                required
                type="text" 
                defaultValue="" 
                className="form-control" 
                name="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}  
              />
              
              <div className="invalid-feedback">
                Email is rquired
              </div>
            </div>
          </div>
          <div className="mb-3">
            
            <button 
              className="btn btn-primary  w-100"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
          <div className="mb-3 text-center">
            <h6>
              Return to{" "}
              <Link to={route.login} className="text-purple link-hover">
                {" "}
                Login
              </Link>
            </h6>
          </div>
          <div className="text-center">
            <p className="fw-medium text-gray">Copyright © 2024 - CRMS</p>
          </div>
        </div>
      </form>
    </div>
  </div>
</div>

  );
};

export default ForgotPassword;
