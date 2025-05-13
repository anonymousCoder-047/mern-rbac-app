import React from "react";
import ImageWithBasePath from "../../core/common/imageWithBasePath";
import { Link } from "react-router-dom";

const ComingSoon = () => {
  return (
    <div className="d-flex flex-wrap w-100 vh-100 overflow-hidden">
  <div className="d-flex align-items-center justify-content-center flex-fill flex-column vh-100 overflow-auto">
    <div className="comming-shapes">
      <div className="comming-right-shape">
        <ImageWithBasePath src="assets/img/authentication/shape-03.png" alt="Shape" />
      </div>
      <div className="comming-left-shape">
        <ImageWithBasePath src="assets/img/authentication/shape-04.png" alt="Shape" />
      </div>
    </div>
    <div className="row justify-content-center text-center w-100">
      <div className="col-md-6">
        <div className="coming-soon-box">
          <div className="text-center mb-3">
            <ImageWithBasePath src="assets/img/icons/coming-icon.svg" alt="Coming Icon" />
          </div>
          <span className="fs-24 fw-bold mb-3 d-block">Our Website is</span>
          <h1 className="fs-60 mb-2">
            <span className="text-primary"> COMING </span> SOON{" "}
          </h1>
          <p className="fs-15">
            Please check back later, We are working hard to get <br />{" "}
            everything just right.
          </p>
          <ul className="d-flex align-items-center justify-content-center my-4">
            <li className="d-flex flex-column justify-content-center border rounded wh-85 fs-16 fw-medium me-2 me-sm-3">
              <span className="days fs-28 text-dark fw-bold lh-1">54</span>days
            </li>
            <li className="seperate-dot me-2 me-sm-3">:</li>
            <li className="d-flex flex-column justify-content-center border rounded wh-85 fs-16 fw-medium me-2 me-sm-3">
              <span className="hours fs-28 text-dark fw-bold lh-1">10</span>Hrs
            </li>
            <li className="seperate-dot me-2 me-sm-3">:</li>
            <li className="d-flex flex-column justify-content-center border rounded wh-85 fs-16 fw-medium me-2 me-sm-3">
              <span className="minutes fs-28 text-dark fw-bold lh-1">47</span>
              Min
            </li>
            <li className="seperate-dot me-2 me-sm-3">:</li>
            <li className="d-flex flex-column justify-content-center border rounded wh-85 fs-16 fw-medium">
              <span className="seconds fs-28 text-dark fw-bold lh-1">00</span>
              Sec
            </li>
          </ul>
          <div className="mb-3">
            <label className="form-label fw-semibold text-center">
              Subscribe to get notified!
            </label>
            <div className="bg-white border border-2 p-1 d-flex align-items-center rounded ps-0">
              <input
                type="email"
                className="form-control border-0 shadow-none"
                placeholder="Enter Your Email"
              />
              <Link to="#" className="btn btn-primary">
                Subscribe
              </Link>
            </div>
          </div>
          <div className="d-flex flex-wrap justify-content-center align-items-center">
            <Link to="#" className="btn btn-dark btn-icon btn-sm me-2">
              <i className="ti ti-brand-facebook fs-16" />
            </Link>
            <Link to="#" className="btn btn-dark btn-icon btn-sm me-2">
              <i className="ti ti-brand-instagram fs-16" />
            </Link>
            <Link to="#" className="btn btn-dark btn-icon btn-sm me-2">
              <i className="ti ti-brand-twitter fs-16" />
            </Link>
            <Link to="#" className="btn btn-dark btn-icon btn-sm me-2">
              <i className="ti ti-brand-pinterest fs-16" />
            </Link>
            <Link to="#" className="btn btn-dark btn-icon btn-sm">
              <i className="ti ti-brand-linkedin fs-16" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

  );
};

export default ComingSoon;
