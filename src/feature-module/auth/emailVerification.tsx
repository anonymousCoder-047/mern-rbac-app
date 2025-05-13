import React from "react";
import { Link } from 'react-router-dom'
import { all_routes } from "../router/all_routes";
import ImageWithBasePath from "../../core/common/imageWithBasePath";

const EmailVerification = () => {
  const route = all_routes;

  return (
    <div className="account-content">
  <div className="d-flex flex-wrap w-100 vh-100 overflow-hidden account-bg-04">
    <div className="d-flex align-items-center justify-content-center flex-wrap vh-100 overflow-auto p-4 w-50 bg-backdrop">
      <form>
        <div className="mx-auto mw-450">
          <div className="text-center mb-4">
            <ImageWithBasePath src="assets/img/logo.svg" className="img-fluid" alt="Logo" />
          </div>
          <div className="text-center mb-3">
            <span className="avatar avatar-xl rounded-circle bg-success mb-4">
              <i className="ti ti-check fs-26" />
            </span>
            <h4 className="mb-2 fs-20">Verify Your Email</h4>
            <p className="mb-3">
              We've sent a link to your email ter4@example.com. Please <br />{" "}
              follow the link inside to continue
            </p>
            <h6>
              Didn't receive an email?{" "}
              <Link to="#" className="text-purple link-hover">
                {" "}
                Resend Link
              </Link>
            </h6>
          </div>
          <div className="mb-3">
          
            <Link to={route.dealsDashboard} className="btn btn-primary w-100">
                  Skip Now
                </Link>
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

export default EmailVerification;
