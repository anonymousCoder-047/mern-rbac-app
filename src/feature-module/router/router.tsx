import React, { useEffect } from "react";
import { Route, Routes, useLocation, Navigate } from "react-router";
import { authRoutes, publicRoutes } from "./router.link";
import { all_routes } from "./all_routes";
import Feature from "../feature";
import AuthFeature from "../authFeature";
import Login from "../auth/login";
import { Helmet } from "react-helmet-async";
import Error404 from "../pages/error/error-404";

const ALLRoutes: React.FC = () => {
  const location = useLocation();

  // Find the current route in either public or auth routes
  const currentRoute = publicRoutes.find(route => route.path === location.pathname) || 
                       authRoutes.find(route => route.path === location.pathname);

  // Construct the full title
  const fullTitle = currentRoute?.title 
    ? `${currentRoute.title} | CRMS - Advanced Bootstrap 5 Admin Template for Customer Management`
    : "CRMS - Advanced Bootstrap 5 Admin Template for Customer Management";

  useEffect(() => {
    document.title = fullTitle;
  }, [fullTitle]);

  const CheckLogedIn = (Component) => (props) => {
    const token = localStorage.getItem("token");

    return !token ? <Component {...props} /> : <Navigate to={all_routes.leadsDashboard} />
  }

  const ProtectedRoute = (Component) => (props) => {
    const token = localStorage.getItem("token");
    
    return token ? <Component {...props} /> : <Navigate to={all_routes.login} />
  }

  const AuthGuard = ProtectedRoute(Feature);
  const LoggedIn = CheckLogedIn(Login);
  const CheckLogin = CheckLogedIn(AuthFeature);

  return (
    <>
      <Helmet>
        <title>{fullTitle}</title>
      </Helmet>
      <Routes>
        <Route path="/" element={<LoggedIn />} />
        <Route element={<AuthGuard />}>
          {publicRoutes.map((route, idx) => (
            <Route path={route.path} element={route.element} key={idx} />
          ))}
        </Route>
        <Route element={<CheckLogin />}>
          {authRoutes.map((route, idx) => (
            <Route path={route.path} element={route.element} key={idx} />
          ))}
        </Route>
        <Route path="*" element={<Error404 />} />
      </Routes>
    </>
  );
};

export default ALLRoutes;
