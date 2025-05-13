import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { all_routes } from '../router/all_routes'
import ImageWithBasePath from '../../core/common/imageWithBasePath';

const LockScreen = () => {
   const [eye,setEye]=useState(false)
    const route = all_routes;
    const toggleEye = () => {
        setEye(prevState => !prevState); 
      };
  return (
  <div className="main-wrapper">
       <div className="account-content">
    <div className="d-flex flex-wrap w-100 vh-100 overflow-hidden">
      <div className="d-flex align-items-center justify-content-center flex-fill flex-wrap vh-100 overflow-auto">
        <div className="login-shapes">
          <div className="login-right-shape">
            <ImageWithBasePath src="assets/img/authentication/shape-01.png" alt="Shape" />
          </div>
          <div className="login-left-shape">
            <ImageWithBasePath src="assets/img/authentication/shape-02.png" alt="Shape" />
          </div>
        </div>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-5">
              <div className="login-content user-login">
                <div className="text-center mb-4">
                  <ImageWithBasePath
                    src="assets/img/logo.svg"
                    className="img-fluid"
                    alt="Logo"
                  />
                </div>
                <form>
                  <div className="card border p-sm-3">
                    <div className="card-body p-4">
                      <div className="text-center">
                        <p className="text-default mb-3">Welcome back!</p>
                        <div className="mb-3">
                          <span className="avatar avatar-xxxl rounded-circle mb-4">
                            <ImageWithBasePath
                              src="assets/img/profiles/avatar-14.jpg"
                              className="img-fluid rounded-circle"
                              alt="Profile"
                            />
                          </span>
                          <h5 className="fs-18 fw-semibold">Adrian Davies</h5>
                        </div>
                      </div>
                      <div className="mb-3">
                        <label className="col-form-label">Enter Password</label>
                        <div className="pass-group">
                        <input
                      type={eye ? "text" : "password"}
                      className="pass-input form-control"
                    />
                    <span
                      className={`ti toggle-password ${
                        eye ? "ti-eye" : "ti-eye-off"
                      }`}
                      onClick={toggleEye}
                    ></span>
                        </div>
                      </div>
                      <div className="mb-0">
                      <Link to={route.dealsDashboard} className="btn btn-primary w-100">
                    Log In
                  </Link>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
              <div className="d-flex align-items-center flex-wrap row-gap-2 justify-content-center mb-4">
                <Link to="#" className="fw-medium me-3">
                  Terms &amp; Condition
                </Link>
                <Link to="#" className="fw-medium me-3">
                  Privacy
                </Link>
                <Link to="#" className="fw-medium me-3">
                  Help
                </Link>
                <div className="dropdown">
                  <Link
                    to="#"
                    className="dropdown-toggle fw-medium border-0 p-0 bg-transparent shadow-none"
                    data-bs-toggle="dropdown"
                  >
                    English
                  </Link>
                  <div className="dropdown-menu dropdown-menu-end">
                    <Link to="#" className="dropdown-item">
                      French
                    </Link>
                    <Link to="#" className="dropdown-item">
                      Spanish
                    </Link>
                  </div>
                </div>
              </div>
              <div className="text-center">
                <p className="fw-medium text-gray">Copyright © 2024 - CRMS</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  </div>
  )
}

export default LockScreen