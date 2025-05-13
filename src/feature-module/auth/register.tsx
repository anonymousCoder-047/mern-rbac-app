import React, { useState } from "react";
import ImageWithBasePath from "../../core/common/imageWithBasePath";
import { Link, useNavigate } from "react-router-dom";
import { all_routes } from "../router/all_routes";
import { axiosPublic } from "../../helper/axios";
import { endpoints } from "../../helper/endpoints";
import { env_data } from "../../config/config";
type PasswordField = 'password' | 'confirmPassword';

const Register = () => {
  const route = all_routes;
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [passwordVisibility, setPasswordVisibility] = useState({
    password: false,
    confirmPassword: false,
  });

  const { copyright_text } = env_data;

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const togglePasswordVisibility = (field: PasswordField) => {
    setPasswordVisibility((prevState) => ({
      ...prevState,
      [field]: !prevState[field],
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setError("");
    setFormData({ ...formData, [name]: value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if(validate()) {
      const { Auth } = endpoints;
      const { status, data } = await axiosPublic.post(Auth.signup, formData);
  
      if(status == 200) {
        localStorage.setItem("token", data?.data?.token);
        navigate(route.leadsDashboard);
      }
    } else {
      setError("Please fill the required fields.");
    }
  }

  const validate = () => {
    if(formData.username != "" && formData.email != "" && formData.password != "" && formData.confirmPassword != "") return true;
    else return false;
  }

  return (
    <div className="account-content">
  <div className="d-flex flex-wrap w-100 vh-100 overflow-hidden account-bg-02">
    <div className="d-flex align-items-center justify-content-center flex-wrap vh-100 overflow-auto p-4 w-50 bg-backdrop">
      <form  className={`flex-fill ${error ? "was-validated" : ""}`}>
        <div className="mx-auto mw-450">
          <div className="text-center mb-4">
            {/* <ImageWithBasePath src="assets/img/logo.svg" className="img-fluid" alt="Logo" /> */}
          </div>
          <div className="mb-4">
            <h4 className="mb-2 fs-20">Register</h4>
            <p>Create new CRMS account</p>
          </div>
          <div className="mb-3">
            <label className="col-form-label">Name</label>
            <div className="position-relative">
              <span className="input-icon-addon">
                <i className="ti ti-user" />
              </span>
              <input 
                required
                type="text" 
                defaultValue="" 
                className="form-control" 
                name="username" 
                value={formData.username} 
                onChange={handleChange} 
              />
              <div className="invalid-feedback">
                Username is rquired
              </div>
            </div>
          </div>
          <div className="mb-3">
            <label className="col-form-label">Email Address</label>
            <div className="position-relative">
              <span className="input-icon-addon">
                <i className="ti ti-mail" />
              </span>
              <input 
                required
                type="email" 
                defaultValue="" 
                className="form-control"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
              <div className="invalid-feedback">
                Email is rquired
              </div>
            </div>
          </div>
          <div className="mb-3">
            <label className="col-form-label">Password</label>
            <div className="pass-group">
              <input
                required
                type={passwordVisibility.password ? "text" : "password"}
                className="pass-input form-control"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
              <div className="invalid-feedback">
                Password is rquired
              </div>
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
                    type={
                      passwordVisibility.confirmPassword ? "text" : "password"
                    }
                    className="pass-input form-control"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                  />
                  <div className="invalid-feedback">
                    Confirm Password is rquired
                  </div>
                  <span
                    className={`ti toggle-passwords ${
                      passwordVisibility.confirmPassword
                        ? "ti-eye"
                        : "ti-eye-off"
                    }`}
                    onClick={() => togglePasswordVisibility("confirmPassword")}
                  ></span>
            </div>
          </div>
          <div className="d-flex align-items-center justify-content-between mb-3">
            <div className="form-check form-check-md d-flex align-items-center">
              <input
                className="form-check-input"
                type="checkbox"
                defaultValue=""
                id="checkebox-md"
                defaultChecked
                required
              />
              <div className="invalid-feedback">
                please accept the terms and conditions.
              </div>
              <label className="form-check-label" htmlFor="checkebox-md">
                I agree to the{" "}
                <Link
                  to="#"
                  className="text-primary link-hover"
                >
                  Terms &amp; Privacy
                </Link>
              </label>
            </div>
          </div>
          <div className="mb-3">
            <button onClick={handleSubmit} className="btn btn-primary w-100">
              Sign Up
            </button>
          </div>
          <div className="mb-3">
            <h6>
              Already have an account?{" "}
              <Link to={route.login} className="text-purple link-hover">
                {" "}
                Sign In Instead
              </Link>
            </h6>
          </div>
          <div className="text-center">
            <p className="fw-medium text-gray">Copyright © {new Date().getFullYear()} - {copyright_text}</p>
          </div>
        </div>
      </form>
    </div>
  </div>
</div>

  );
};

export default Register;
