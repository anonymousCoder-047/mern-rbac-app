import React, { useEffect, useState } from "react";
import ImageWithBasePath from "../../core/common/imageWithBasePath";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { all_routes } from "../router/all_routes";
import { axiosPublic } from "../../helper/axios";
import { endpoints } from "../../helper/endpoints";
type PasswordField = 'password' | 'confirmPassword' | 'newpassword';
const ResetPassword = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const route = all_routes;
  const [passwordVisibility, setPasswordVisibility] = useState({
    password: false,
    confirmPassword: false,
    newpassword:false
  });
  const [formData, setFormData] = useState({
    password: "",
    email: "",
    confirmPassword: "",
  })

  const togglePasswordVisibility = (field: PasswordField) => {
    setPasswordVisibility((prevState) => ({
      ...prevState,
      [field]: !prevState[field],
    }));
  };

  useEffect(() => {
    if(state && state != "") setFormData({ ...formData, email: state });
  }, [state])

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();
  
    const { Auth } = endpoints;
    const { status, data } = await axiosPublic.post(Auth.resetPassword, formData);

    if(status == 200) {
      localStorage.setItem("token", data?.data?.token);
      navigate(route.leadsDashboard);
    }
  }

  return (
    <div className="account-content">
  <div className="d-flex flex-wrap w-100 vh-100 overflow-hidden account-bg-04">
    <div className="d-flex align-items-center justify-content-center flex-wrap vh-100 overflow-auto p-4 w-50 bg-backdrop">
      <form className="flex-fill">
        <div className="mx-auto mw-450">
          <div className="text-center mb-4">
            {/* <ImageWithBasePath src="assets/img/logo.svg" className="img-fluid" alt="Logo" /> */}
          </div>
          <div className="mb-4">
            <h4 className="mb-2 fs-20">Reset Password?</h4>
            <p>Enter New Password &amp; Confirm Password to get inside</p>
          </div>
          <div className="mb-3">
            <label className="col-form-label">Password</label>
            <div className="pass-group">
            <input
                    type={passwordVisibility.password ? "text" : "password"}
                    className="pass-input form-control"
                    name="password"
                    value={formData?.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  />
                  <span
                    className={`ti toggle-passwords ${
                      passwordVisibility.password ? "ti-eye" : "ti-eye-off"
                    }`}
                    onClick={() => togglePasswordVisibility("password")}
                  ></span>
            </div>
          </div>
          <div className="mb-3">
            <label className="col-form-label">Confirm Password</label>
            <div className="pass-group">
              
              <input
                    type={passwordVisibility.confirmPassword ? "text" : "password"}
                    className="pass-input form-control"
                    name="confirmPassword"
                    value={formData?.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  />
                  <span
                    className={`ti toggle-passwords ${
                      passwordVisibility.confirmPassword ? "ti-eye" : "ti-eye-off"
                    }`}
                    onClick={() => togglePasswordVisibility("confirmPassword")}
                  ></span>
            </div>
          </div>
          <div className="mb-3">
         
            <button 
              onClick={handleSubmit}
              className="btn btn-primary w-100">
              Change Password
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

export default ResetPassword;
