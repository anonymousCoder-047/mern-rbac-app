import { Navigate, Route } from "react-router";
import { all_routes } from "./all_routes";
import LeadsDashboard from "../mainMenu/leadsDashboard/index";
import ContactDetails from "../crm/contacts";
import LeadsDetails from "../crm/leads/index";
import Leads from "../crm/leads/leads";
import Companies from "../crm/companies/companies";
import Sources from "../crmSetting/sources";
import Login from "../auth/login";
import Register from "../auth/register";
import TwoStepVerification from "../auth/twoStepVerification";
import EmailVerification from "../auth/emailVerification";
import Success from "../auth/success";
import ResetPassword from "../auth/resetPassword";
import ForgotPassword from "../auth/forgotPassword";
import Error404 from "../pages/error/error-404";
import Error500 from "../pages/error/error-500";
import ContactList from "../crm/contacts/contactList";
import LeadReport from "../reports/leadReport";
import RolesPermissions from "../userManagement/rolesPermissions";
import Products from "../crmSetting/products";
import Category from "../crmSetting/category";
import SubCategory from "../crmSetting/subCategory";
import ProductType from "../crmSetting/productType";
import SubType from "../crmSetting/subType";
import Tax from "../crmSetting/tax";
import ContactGrid from "../crm/contacts/contactGrid";
import Pipeline from "../crm/pipeline";
import Manageusers from "../userManagement/manageusers";
import CompanyDetails from "../crm/companies";

const route = all_routes;

export const publicRoutes = [
  {
    path: route.leadsDashboard,
    element: <LeadsDashboard />,
    route: Route,
    title: 'Deals Dashboard'
  },
  {
    path: '/',
    name: 'Root',
    element: <Navigate to="/login" />,
    route: Route,
    title: 'Login'
  },
  {
    path: route.contactDetails,
    element: <ContactDetails />,
    route: Route,
    title: 'Contact Details'
  },
  {
    path: route.companies,
    element: <Companies />,
    route: Route,
    title: 'Companies'
  },
  {
    path: route.companyDetails,
    element: <CompanyDetails />,
    route: Route,
    title: 'Company Details'
  },
  {
    path: route.leadsDetails,
    element: <LeadsDetails />,
    route: Route,
    title: 'Leads Details'
  },
  {
    path: route.leads,
    element: <Leads />,
    route: Route,
    title: 'Leads'
  },
  {
    path: route.sources,
    element: <Sources />,
    route: Route,
    title: 'Sources'
  },
  {
    path: route.products,
    element: <Products />,
    route: Route,
    title: 'Products'
  },
  {
    path: route.category,
    element: <Category />,
    route: Route,
    title: 'Category'
  },
  {
    path: route.subcategory,
    element: <SubCategory />,
    route: Route,
    title: 'subcategory'
  },
  {
    path: route.type,
    element: <ProductType />,
    route: Route,
    title: 'type'
  },
  {
    path: route.subType,
    element: <SubType />,
    route: Route,
    title: 'subtype'
  },
  {
    path: route.tax,
    element: <Tax />,
    route: Route,
    title: 'tax'
  },
  {
    path: route.companies,
    element: <Companies />,
    route: Route,
    title: 'Companies'
  },
  {
    path: route.contactList,
    element: <ContactList />,
    route: Route,
    title: 'Contact List'
  },
  {
    path: route.contactDetails,
    element: <ContactDetails />,
    route: Route,
    title: 'Contact List'
  },
  {
    path: route.leadReports,
    element: <LeadReport />,
    route: Route,
    title: 'Lead Report'
  },
  {
    path: route.manageusers,
    element: <Manageusers />,
    route: Route,
    title: 'Manage Users'
  },
  {
    path: route.rolesPermissions,
    element: <RolesPermissions />,
    route: Route,
    title: 'Roles Permissions'
  },
  {
    path: route.contactGrid,
    element: <ContactGrid />,
    route: Route,
    title: 'Contact Grid'
  },
  {
    path: route.pipeline,
    element: <Pipeline />,
    route: Route,
    title: 'Pipeline'
  },
];

export const authRoutes = [
  {
    path: route.login,
    element: <Login />,
    route: Route,
    title: 'Login'
  },
  {
    path: route.register,
    element: <Register />,
    route: Route,
    title: 'Register'
  },
  {
    path: route.twoStepVerification,
    element: <TwoStepVerification />,
    route: Route,
    title: 'TwoStepVerification'
  },
  {
    path: route.emailVerification,
    element: <EmailVerification />,
    route: Route,
    title: 'EmailVerification'
  },
  {
    path: route.success,
    element: <Success />,
    route: Route,
    title: 'Success'
  },

  {
    path: route.resetPassword,
    element: <ResetPassword />,
    route: Route,
    title: 'Reset Password'
  },
  {
    path: route.forgotPassword,
    element: <ForgotPassword />,
    route: Route,
    title: 'Forgot Password'
  },
  {
    path: route.error404,
    element: <Error404 />,
    route: Route,
    title: 'Error404'
  },
  {
    path: route.error500,
    element: <Error500 />,
    route: Route,
    title: 'Error500'
  },
];
