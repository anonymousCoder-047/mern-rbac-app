import React, { useState } from 'react'
import ImageWithBasePath from '../../core/common/imageWithBasePath'
import { all_routes } from '../router/all_routes';
import { Link, useNavigate } from 'react-router-dom';
import { axiosPublic } from '../../helper/axios';
import { endpoints } from '../../helper/endpoints';

const TwoStepVerification = () => {
  const navigate = useNavigate();
  const route = all_routes;
  const [formData, setFormData] = useState({
    otp: "",
    type: "mail",
    digit1: "",
    digit2: "",
    digit3: "",
    digit4: "",
    digit5: "",
    digit6: "",
  })

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    const { Auth } = endpoints;
    const { status, data } = await axiosPublic.post(Auth.verifyOtp, { otp: (formData.digit1 + formData.digit2 + formData.digit3 + formData.digit4 + formData.digit5 + formData.digit6), type: formData?.type });

    if(status == 200) navigate(route.resetPassword, { state: data?.data?.email });
  }

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
  }

  return (
    <div className="account-content">
  <div className="d-flex flex-wrap w-100 vh-100 overflow-hidden account-bg-04">
    <div className="d-flex align-items-center justify-content-center flex-wrap vh-100 overflow-auto p-4 w-50 bg-backdrop">
      <form
        method="get"
        className="digit-group login-form-control"
        data-group-name="digits"
        data-autosubmit="false"
        autoComplete="off"
      >
        <div className="mx-auto mw-450">
          <div className="text-center mb-4">
            {/* <ImageWithBasePath src="assets/img/logo.svg" className="img-fluid" alt="Logo" /> */}
          </div>
          <div className="mb-4">
            <h4 className="mb-2 fs-20">Login With Your Email Address</h4>
            <p>
              We sent a verification code to your email. Enter the code from the
              email in the field below
            </p>
          </div>
          <div className="d-flex align-items-center mb-4">
            <input
              type="text"
              className="border rounded w-100 py-sm-3 py-2 text-center fs-26 hw-bold me-3"
              id="digit-1"
              name="digit1"
              data-next="digit2"
              maxLength={1}
              onChange={handleChange}
            />
            <input
              type="text"
              className="border rounded w-100 py-sm-3 py-2 text-center fs-26 hw-bold me-3"
              id="digit-2"
              name="digit2"
              data-next="digit3"
              data-previous="digit-1"
              maxLength={1}
              onChange={handleChange}
            />
            <input
              type="text"
              className="border rounded w-100 py-sm-3 py-2 text-center fs-26 hw-bold me-3"
              id="digit-3"
              name="digit3"
              data-next="digit4"
              data-previous="digit-2"
              maxLength={1}
              onChange={handleChange}
            />
            <input
              type="text"
              className="border rounded w-100 py-sm-3 py-2 text-center fs-26 hw-bold"
              id="digit-4"
              name="digit4"
              data-next="digit5"
              data-previous="digit-3"
              maxLength={1}
              onChange={handleChange}
            />
            <input
              type="text"
              className="border rounded w-100 py-sm-3 py-2 text-center fs-26 hw-bold"
              id="digit-5"
              name="digit5"
              data-next="digit6"
              data-previous="digit-4"
              maxLength={1}
              onChange={handleChange}
            />
            <input
              type="text"
              className="border rounded w-100 py-sm-3 py-2 text-center fs-26 hw-bold"
              id="digit-6"
              name="digit6"
              data-next="digit7"
              data-previous="digit-5"
              maxLength={1}
              onChange={handleChange}
            />
          </div>
          <div className="text-center mb-3">
            <p className="badge badge-soft-purple shadow-none">
              Otp will expire in 09 :10
            </p>
          </div>
          <div className="mb-3">
            <button
              onClick={handleSubmit} 
              className="btn btn-primary w-100">
              Verify My Account
            </button>
          </div>
          <div className="text-center">
            <p className="fw-medium text-gray">Copyright © 2024 - CRMS</p>
          </div>
        </div>
      </form>
    </div>
  </div>
</div>

  )
}

export default TwoStepVerification