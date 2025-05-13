import React from "react";
import { all_routes } from "../router/all_routes";
import { Link } from "react-router-dom";
import ImageWithBasePath from "../../core/common/imageWithBasePath";

const UnderMaintenance = () => {
  const route = all_routes;
  return (
    <div className="d-flex flex-wrap w-100 vh-100 overflow-hidden">
  <div className="d-flex align-items-center justify-content-center flex-fill flex-column vh-100 overflow-auto">
    <div className="error-img mb-4">
      <ImageWithBasePath
        src="assets/img/authentication/maintenance-img.png"
        className="img-fluid"
        alt=""
      />
    </div>
    <div className="text-center">
      <h3 className="fs-28 mb-3">We are Under Maintenance</h3>
      <p className="fs-16">
        Sorry for any inconvenience caused, we have almost <br /> done Will get
        back soon!
      </p>
      <Link to={route.dealsDashboard} className="btn btn-primary">
        <i className="ti ti-arrow-narrow-left" /> Back to Dashboard
      </Link>
    </div>
  </div>
</div>

  );
};

export default UnderMaintenance;
