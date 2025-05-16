import React, { useEffect, useState } from "react";
import ImageWithBasePath from "../../core/common/imageWithBasePath";
import { Link, useNavigate } from "react-router-dom";
import { all_routes } from "../router/all_routes";
import Server from "../../helper/Server";
import { endpoints } from "../../helper/endpoints";
import useAuth from "../../hooks/useAuth";

const Login = () => {
  const route = all_routes;
  const { values, setValues } = useAuth();
  const navigate = useNavigate();
  const { postData } = Server;
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    error: {},
  })
  const [isPasswordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible((prevState) => !prevState);
  };

  useEffect(() => {
    localStorage.setItem("menuOpened", "Dashboard");
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if(validate()) {
      const { Auth } = endpoints;
      const { status, data } = await postData(Auth.login, formData);
  
      if(data && data?.token) {
        localStorage.setItem("token", data?.token);
        setValues({ ...values, permissions: data?.permissions, profileId: data?.profileId, currentUserId: data?._id });
        navigate(route.leadsDashboard);
      } else {
        console.log("something went wrong!!!", status);
      }
    } else {
      setError("Please fill all the required fields.");
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target;

    setError("");
    setFormData({ ...formData, [name]: value });
  }

  const handleBlur = (e) => {
    const { name, value } = e.target;

    if(value == "") setFormData({ ...formData, error: { ...formData?.error, [name]: true, message: "Please, fill the required field." }});
    if(value != "") setFormData({ ...formData, error: { ...formData?.error, [name]: false, message: "Please, fill the required field." }});
  }

  const validate = () => {
    const { email, password, error } = formData;
    
    if(email != "" && password != "") return true;
    else {
      setError("Please, enter email/password.")
      return false;
    }
  }

  return (
    <div className="account-content">
      <div className="d-flex flex-wrap w-100 vh-100 overflow-hidden account-bg-01">
        <div className="d-flex align-items-center justify-content-center flex-wrap vh-100 overflow-auto p-4 w-50 bg-backdrop">
          <form className={`flex-fill ${error ? "was-validated" : ""}`}>
            <div className="mx-auto mw-450">
              <div className="text-center mb-4">
                {/* <ImageWithBasePath
                  src="assets/img/logo.svg"
                  className="img-fluid"
                  alt="Logo"
                /> */}
              </div>
              {
                error ? 
                <>
                <div className="alert alert-danger alert-dismissible fade show" role="alert">
                  <strong>Sorry!</strong> {error}
                  <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close" onClick={() => setError("")}></button>
                </div>
                </>
                : ""
              }
              <div className="mb-4">
                <h4>Sign In</h4>
                <p>Access the CRMS panel using your email and passcode.</p>
              </div>
              <div className="mb-3">
                <label className="col-form-label">Email Address</label>
                <div className="position-relative">
                  <span className="input-icon-addon">
                    <i className="ti ti-mail"></i>
                  </span>
                  <input 
                    type="text" 
                    className="form-control" 
                    value={formData?.email} 
                    name="email"
                    onChange={handleChange} 
                    onBlur={handleBlur}
                    required
                  />
                  <div className="invalid-feedback">
                    {formData?.error?.message}
                  </div>
                </div>
              </div>
              <div className="mb-3">
                <label className="col-form-label">Password</label>
                <div className="pass-group">
                  <input
                    type={isPasswordVisible ? "text" : "password"}
                    className="pass-input form-control"
                    value={formData?.password} 
                    name="password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <div className="invalid-feedback">
                    {formData?.error?.message}
                  </div>
                  <span
                    className={`ti toggle-password ${
                      isPasswordVisible ? "ti-eye" : "ti-eye-off"
                    }`}
                    onClick={togglePasswordVisibility}
                  ></span>
                </div>
              </div>
              <div className="d-flex align-items-center justify-content-between mb-3">
                <div className="form-check form-check-md d-flex align-items-center">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="checkebox-md"
                    defaultChecked
                  />
                  <label className="form-check-label" htmlFor="checkebox-md">
                    Remember Me
                  </label>
                </div>
                <div className="text-end">
                  <Link
                    to={route.forgotPassword}
                    className="text-primary fw-medium link-hover"
                  >
                    Forgot Password?
                  </Link>
                </div>
              </div>
              <div className="mb-3">
                <button
                  className="btn btn-primary w-100"
                  onClick={handleSubmit}
                >
                  Sign In
                </button>
              </div>
              <div className="mb-3">
                <h6>
                  New on our platform?
                  <Link to={route.register} className="text-purple link-hover">
                    {" "}
                    Create an account
                  </Link>
                </h6>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
