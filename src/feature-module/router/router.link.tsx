import { Navigate, Route } from "react-router";
import { all_routes } from "./all_routes";
import DealsDashboard from "../mainMenu/dealsDashboard";
import Activities from "../crm/activities";
import Campaign from "../crm/campaign";
import ActivityCalls from "../crm/activityCalls";
import ActivityMail from "../crm/activityMail";
import ActivityTask from "../crm/activityTask";
import CampaignComplete from "../crm/campaign/campaignComplete";
import CampaignArchieve from "../crm/campaign/campaignArchieve";
import Appearance from "../settings/websiteSettings/appearence";
import Analytics from "../crm/analytics";
import ConnectedApps from "../settings/generalSettings/connectedApps";
import Countries from "../content/location/countries";
import ContactDetails from "../crm/contacts";
import BankAccounts from "../settings/financialSettings/bankAccounts";
import BlankPage from "../pages/blankPage";
import Calendar from "../mainMenu/apps/calendar";
import Deals from "../crm/deals";
import DealsDetails from "../crm/deals/dealsDetails";
import Currencies from "../settings/financialSettings/currencies";
import DataTable from "../tables/dataTable";
import BasicTable from "../tables/basicTable";
import DealsKanban from "../crm/deals/dealsKanban";
import DealReports from "../reports/dealReports";
import DeleteRequest from "../userManagement/deleteRequest";
import Membershipplan from "../membership/membershipplan";
import MembershipAddon from "../membership/membershipaddon";

import Notes from "../application/notes";
import Cities from "../content/cities";
import ComingSoon from "../pages/comingSoon";
import Manageusers from "../userManagement/manageusers";
import LockScreen from "../authentication/lockscreen";
import Localization from "../settings/websiteSettings/localization";
import LeadsDetails from "../crm/leads";
import Leads from "../crm/leads/leads";
import Companies from "../crm/companies/companies";
import Login from "../auth/login";
import Register from "../auth/register";
import TwoStepVerification from "../auth/twoStepVerification";
import EmailVerification from "../auth/emailVerification";
import Success from "../auth/success";
import ResetPassword from "../auth/resetPassword";
import ForgotPassword from "../auth/forgotPassword";
import Accordion from "../uiInterface/base-ui/accordion";
import Avatar from "../uiInterface/base-ui/avatar";
import Borders from "../uiInterface/base-ui/borders";
import Breadcrumb from "../uiInterface/base-ui/breadcrumb";
import Buttons from "../uiInterface/base-ui/buttons";
import ButtonsGroup from "../uiInterface/base-ui/buttonsgroup";
import Cards from "../uiInterface/base-ui/cards";
import Carousel from "../uiInterface/base-ui/carousel";
import Colors from "../uiInterface/base-ui/colors";
import Dropdowns from "../uiInterface/base-ui/dropdowns";
import Grid from "../uiInterface/base-ui/grid";
import Images from "../uiInterface/base-ui/images";
import Lightboxes from "../uiInterface/base-ui/lightbox";
import Media from "../uiInterface/base-ui/media";
import Modals from "../uiInterface/base-ui/modals";
import NavTabs from "../uiInterface/base-ui/navtabs";
import Offcanvas from "../uiInterface/base-ui/offcanvas";
import Pagination from "../uiInterface/base-ui/pagination";
import Popovers from "../uiInterface/base-ui/popover";
import RangeSlides from "../uiInterface/base-ui/rangeslider";
import Progress from "../uiInterface/base-ui/progress";
import Spinner from "../uiInterface/base-ui/spinner";
import Toasts from "../uiInterface/base-ui/toasts";
import Typography from "../uiInterface/base-ui/typography";
import Video from "../uiInterface/base-ui/video";
import Error404 from "../pages/error/error-404";
import Error500 from "../pages/error/error-500";
import CustomFields from "../settings/appSettings/customFields";
import InvoiceSettings from "../settings/appSettings/invoiceSettings";
import Printers from "../settings/appSettings/printers";
import TaxRates from "../settings/financialSettings/taxRates";
import Notifications from "../settings/generalSettings/notifications";
import Profile from "../settings/generalSettings/profile";
import Security from "../settings/generalSettings/security";
import Storage from "../settings/otherSettings/storage";
import EmailSettings from "../settings/systemSettings/emailSettings";
import GdprCookies from "../settings/systemSettings/gdprCookies";
import SmsGateways from "../settings/systemSettings/smsGateways";
import CompanySettings from "../settings/websiteSettings/companySettings";
import Language from "../settings/websiteSettings/language";
import Preference from "../settings/websiteSettings/preference";
import Prefixes from "../settings/websiteSettings/prefixes";
import PaymentGateways from "../settings/financialSettings/paymentGateways";
import UnderMaintenance from "../pages/underMaintenance";
import LeadsDashboard from "../mainMenu/leadsDashboard";
import Todo from "../application/todo";
import Email from "../application/email";
import VideoCall from "../application/call/videoCall";
import Chat from "../application/chat";
import Pages from "../content/pages";
import ProjectDashboard from "../mainMenu/projectDashboard";
import ContactList from "../crm/contacts/contactList";
import CompanyReport from "../reports/companyReport";
import ContactReport from "../reports/contactReport";
import LeadReport from "../reports/leadReport";
import ProjectReport from "../reports/projectReport";
import TaskReport from "../reports/taskReport";
import AudioCall from "../application/call/audioCall";
import CallHistory from "../application/call/callHistory";
import FileManager from "../application/fileManager";

import MembershipTransaction from "../membership/membershiptrasaction";
import LeadsKanban from "../crm/leads/leadskanban";
import Calls from "../crmSetting/calls";
import Industry from "../crmSetting/industry";
import Sources from "../crmSetting/sources";
import ContactStage from "../crmSetting/contactStage";
// import BanIpAddress from "../settings/otherSettings/banIpaddress";
// import LostReason from "../crmSetting/lostreason";
import RolesPermissions from "../userManagement/rolesPermissions";
import ContactMessages from "../support/contactMessages";
import Tickets from "../support/tickets";
import Faq from "../content/faq";
import LostReason from "../crmSetting/lostReason";
import ContactGrid from "../crm/contacts/contactGrid";
import CompaniesGrid from "../crm/companies/companiesGrid";
import Pipeline from "../crm/pipeline";
import Projects from "../crm/projects";
import Task from "../crm/task";
import CompaniesDetails from "../crm/companies/companiesDetails";
import States from "../content/states";
import Testimonials from "../content/testimonials";
import ClipBoard from "../uiInterface/advanced-ui/clipboard";
import Counter from "../uiInterface/advanced-ui/counter";
import DragAndDrop from "../uiInterface/advanced-ui/dragdrop";
import Rating from "../uiInterface/advanced-ui/rating";
import Stickynote from "../uiInterface/advanced-ui/stickynote";
import TextEditor from "../uiInterface/advanced-ui/texteditor";
import Timeline from "../uiInterface/advanced-ui/timeline";
import Scrollbar from "../uiInterface/advanced-ui/uiscrollbar";
import Apexchart from "../uiInterface/charts/apexcharts";
import FeatherIcons from "../uiInterface/icons/feathericon";
import FontawesomeIcons from "../uiInterface/icons/fontawesome";
import MaterialIcons from "../uiInterface/icons/materialicon";
import PE7Icons from "../uiInterface/icons/pe7icons";
import SimplelineIcons from "../uiInterface/icons/simplelineicon";
import ThemifyIcons from "../uiInterface/icons/themify";
import TypiconIcons from "../uiInterface/icons/typicons";
import WeatherIcons from "../uiInterface/icons/weathericons";
import BasicInputs from "../uiInterface/forms/formelements/basic-inputs";
import CheckboxRadios from "../uiInterface/forms/formelements/checkbox-radios";
import InputGroup from "../uiInterface/forms/formelements/input-group";
import GridGutters from "../uiInterface/forms/formelements/grid-gutters";
import FormSelect from "../uiInterface/forms/formelements/form-select";
import FormMask from "../uiInterface/forms/formelements/form-mask";
import FileUpload from "../uiInterface/forms/formelements/fileupload";
import FormHorizontal from "../uiInterface/forms/formelements/layouts/form-horizontal";
import FormVertical from "../uiInterface/forms/formelements/layouts/form-vertical";
import FloatingLabel from "../uiInterface/forms/formelements/layouts/floating-label";
import FormValidation from "../uiInterface/forms/formelements/layouts/form-validation";
import FormSelect2 from "../uiInterface/forms/formelements/layouts/form-select2";
import FormWizard from "../uiInterface/forms/formelements/form-wizard";
import DataTables from "../uiInterface/table/data-tables";
import TablesBasic from "../uiInterface/table/tables-basic";
import IonicIcons from "../uiInterface/icons/ionicicons";
import TasksImportant from "../crm/task/tasksImportant";
import TaskCompleted from "../crm/task/taskCompleted";
import ActivityMetting from "../crm/activityMetting";
import Payments from "../crm/payments";
import Proposalslist from "../crm/proposals/proposalslist";
import Proposalsgrid from "../crm/proposals/proposalsgrid";
import ProposalsView from "../crm/proposals/proposalsview";
import Contractslist from "../crm/contracts/contracts-list";
import ContractsGrid from "../crm/contracts/contracts-grid";
import InvoiceList from "../crm/invoices/invoicelist";
import InvoiceGrid from "../crm/invoices/invoicegrid";
import EstimationList from "../crm/estimations/estimation-list";
import EstimationKanban from "../crm/estimations/estimation-kanban";
import Badges from "../uiInterface/base-ui/badges";
import BanIpAddress from "../settings/otherSettings/banIpaddress";
import Placeholder from "../uiInterface/base-ui/placeholder";
import Alert from "../uiInterface/base-ui/alert";
import Tooltips from "../uiInterface/base-ui/tooltips";
import Ribbon from "../uiInterface/advanced-ui/ribbon";
import ProjectDetails from "../crm/projects/projectdetails";
import ProjectGrid from "../crm/projects/projectgrid";
import LanguageWeb from "../settings/websiteSettings/languageWeb";
import Permission from "../userManagement/permission";
import Swiperjs from "../uiInterface/base-ui/swiper";
import TablerIcons from "../uiInterface/icons/tablericons";
import BootstrapIcons from "../uiInterface/icons/bootstrapicons";
import RemixIcons from "../uiInterface/icons/remixIcons";
import FormPikers from "../uiInterface/forms/formpickers";
import Leaflet from "../uiInterface/map/leaflet";
import SocialFeed from "../application/socialfeed";
import KanbanView from "../application/kanbanView";
import Invoice from "../application/invoice";
import InvoiceDetails from "../application/invoice-details";
import SuperAdminDashboard from "../super-admin/dashboard";
import Company from "../super-admin/companies";
import Sortable from "../uiInterface/base-ui/ui-sortable";
import Subscription from "../super-admin/subscription";
import Packages from "../super-admin/packages/packagelist";
import PackagesGrid from "../super-admin/packages/packagegrid";
import Domain from "../super-admin/domin";
import PurchaseTransaction from "../super-admin/purchase-transaction";
import LayoutDemo from "../mainMenu/layout-dashoard";

const route = all_routes;

export const publicRoutes = [
  {
    path: route.dealsDashboard,
    element: <DealsDashboard />,
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
    path: route.audioCall,
    element: <AudioCall />,
    route: Route,
    title: 'Audio Call'
  },
  {
    path: route.callHistory,
    element: <CallHistory />,
    route: Route,
    title: 'Call History'
  },
  {
    path: route.leadsKanban,
    element: <LeadsKanban />,
    route: Route,
    title: 'Leads Kanban'
  },
  {
    path: route.callHistory,
    element: <CallHistory />,
    route: Route,
    title: 'Call History'
  },
  {
    path: route.activities,
    element: <Activities />,
    route: Route,
    title: 'Activities'
  },
  {
    path: route.campaign,
    element: <Campaign />,
    route: Route,
    title: 'Campaign'
  },
  {
    path: route.activityMeeting,
    element: <ActivityMetting />,
    route: Route,
    title: 'Activity Metting'
  },
  {
    path: route.activityCalls,
    element: <ActivityCalls />,
    route: Route,
    title: 'Activity Calls'
  },
  {
    path: route.activityMail,
    element: <ActivityMail />,
    route: Route,
    title: 'Activity Mail'
  },
  {
    path: route.activityTask,
    element: <ActivityTask />,
    route: Route,
    title: 'Activity Task'
  },
  {
    path: route.campaignComplete,
    element: <CampaignComplete />,
    route: Route,
    title: 'Campaign Complete'
  },
  {
    path: route.campaignArchieve,
    element: <CampaignArchieve />,
    route: Route,
    title: 'Campaign Archieve'
  },
  {
    path: route.appearance,
    element: <Appearance />,
    route: Route,
    title: 'Appearance'
  },
  {
    path: route.analytics,
    element: <Analytics />,
    route: Route,
    title: 'Analytics'
  },
  {
    path: route.connectedApps,
    element: <ConnectedApps />,
    route: Route,
    title: 'Connected Apps'
  },
  {
    path: route.contactDetails,
    element: <ContactDetails />,
    route: Route,
    title: 'Contact Details'
  },
  {
    path: route.bankAccounts,
    element: <BankAccounts />,
    route: Route,
    title: 'Bank Accounts'
  },
  {
    path: route.blankPage,
    element: <BlankPage />,
    route: Route,
    title: 'Blank Page'
  },
  {
    path: route.calendar,
    element: <Calendar />,
    route: Route,
    title: 'Calendar'
  },
  {
    path: route.manageusers,
    element: <Manageusers />,
    route: Route,
    title: 'Manage Users'
  },

  {
    path: route.membershipplan,
    element: <Membershipplan />,
    route: Route,
    title: 'Membership Plan'
  },
  {
    path: route.membershipAddon,
    element: <MembershipAddon />,
    route: Route,
    title: 'Membership Addon'
  },
  {
    path: route.membershipTransaction,
    element: <MembershipTransaction />,
    route: Route,
    title: 'Membership Transaction'
  },
  {
    path: route.notes,
    element: <Notes />,
    route: Route,
    title: 'Notes'
  },
  {
    path: route.contactStage,
    element: <ContactStage />,
    route: Route,
    title: 'Contact Stage'
  },
  {
    path: route.countries,
    element: <Countries />,
    route: Route,
    title: 'Countries'
  },
  {
    path: route.currencies,
    element: <Currencies />,
    route: Route,
    title: 'Currencies'
  },
  {
    path: route.customFields,
    element: <CustomFields />,
    route: Route,
    title: 'Custom Fields'
  },
  {
    path: route.dataTables,
    element: <DataTable />,
    route: Route,
    title: 'Data Table'
  },
  {
    path: route.tablesBasic,
    element: <BasicTable />,
    route: Route,
    title: 'Basic Table'
  },
  {
    path: route.dealReports,
    element: <DealReports />,
    route: Route,
    title: 'Deal Reports'
  },

  {
    path: route.deals,
    element: <Deals />,
    route: Route,
    title: 'Deals'
  },
  {
    path: route.dealsDetails,
    element: <DealsDetails />,
    route: Route,
    title: 'Deals Details'
  },
  {
    path: route.dealsKanban,
    element: <DealsKanban />,
    route: Route,
    title: 'Deals Kanban'
  },
  {
    path: route.deleteRequest,
    element: <DeleteRequest />,
    route: Route,
    title: 'Delete Request'
  },
  {
    path: route.cities,
    element: <Cities />,
    route: Route,
    title: 'Cities'
  },
  {
    path: route.companies,
    element: <Companies />,
    route: Route,
    title: 'Companies'
  },
  {
    path: route.localization, element: <Localization />, route: Route, title: 'Localization'
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
    path: route.companies,
    element: <Companies />,
    route: Route,
    title: 'Companies'
  },
  {
    path: route.accordion,
    element: <Accordion />,
    route: Route,
    title: 'Accordion'
  },
  {
    path: route.avatar,
    element: <Avatar />,
    route: Route,
    title: 'Avatar'
  },
  {
    path: route.badges,
    element: <Badges />,
    route: Route,
    title: 'Badges'
  },
  {
    path: route.border,
    element: <Borders />,
    route: Route,
    title: 'Borders'
  },
  {
    path: route.breadcrums,
    element: <Breadcrumb />,
    route: Route,
    title: 'Breadcrumb'
  },
  {
    path: route.button,
    element: <Buttons />,
    route: Route,
    title: 'Buttons'
  },
  {
    path: route.buttonGroup,
    element: <ButtonsGroup />,
    route: Route,
    title: 'ButtonsGroup'
  },
  {
    path: route.cards,
    element: <Cards />,
    route: Route,
    title: 'Cards'
  },
  {
    path: route.carousel,
    element: <Carousel />,
    route: Route,
    title: 'Carousel'
  },
  {
    path: route.colors,
    element: <Colors />,
    route: Route,
    title: 'Colors'
  },
  {
    path: route.dropdowns,
    element: <Dropdowns />,
    route: Route,
    title: 'Dropdowns'
  },
  {
    path: route.grid,
    element: <Grid />,
    route: Route,
    title: 'Grid'
  },
  {
    path: route.images,
    element: <Images />,
    route: Route,
    title: 'Images'
  },
  {
    path: route.lightbox,
    element: <Lightboxes />,
    route: Route,
    title: 'Lightboxes'
  },
  {
    path: route.media,
    element: <Media />,
    route: Route,
    title: 'Media'
  },
  {
    path: route.modals,
    element: <Modals />,
    route: Route,
    title: 'Modals'
  },
  {
    path: route.navTabs,
    element: <NavTabs />,
    route: Route,
    title: 'NavTabs'
  },
  {
    path: route.offcanvas,
    element: <Offcanvas />,
    route: Route,
    title: 'Offcanvas'
  },
  {
    path: route.pagination,
    element: <Pagination />,
    route: Route,
    title: 'Pagination'
  },
  {
    path: route.popover,
    element: <Popovers />,
    route: Route,
    title: 'Popovers'
  },
  {
    path: route.rangeSlider,
    element: <RangeSlides />,
    route: Route,
    title: 'RangeSlides'
  },
  {
    path: route.progress,
    element: <Progress />,
    route: Route,
    title: 'Progress'
  },
  {
    path: route.spinner,
    element: <Spinner />,
    route: Route,
    title: 'Spinner'
  },

  {
    path: route.typography,
    element: <Typography />,
    route: Route,
    title: 'Typography'
  },
  {
    path: route.video,
    element: <Video />,
    route: Route,
    title: 'Video'
  },
  {
    path: route.toasts,
    element: <Toasts />,
    route: Route,
    title: 'Toasts'
  },
  {
    path: route.customFields,
    element: <CustomFields />,
    route: Route,
    title: 'Custom Fields'
  },
  {
    path: route.invoiceSettings,
    element: <InvoiceSettings />,
    route: Route,
    title: 'Invoice Settings'
  },
  {
    path: route.printers,
    element: <Printers />,
    route: Route,
    title: 'Printers'
  },
  {
    path: route.bankAccounts,
    element: <BankAccounts />,
    route: Route,
    title: 'Bank Accounts'
  },
  {
    path: route.currencies,
    element: <Currencies />,
    route: Route,
    title: 'Currencies'
  },
  {
    path: route.paymentGateways,
    element: <PaymentGateways />,
    route: Route,
    title: 'PaymentGateways'
  },
  {
    path: route.taxRates,
    element: <TaxRates />,
    route: Route,
    title: 'TaxRates'
  },
  {
    path: route.connectedApps,
    element: <ConnectedApps />,
    route: Route,
    title: 'ConnectedApps'
  },
  {
    path: route.notification,
    element: <Notifications />,
    route: Route,
    title: 'Notifications'
  },
  {
    path: route.profile,
    element: <Profile />,
    route: Route,
    title: 'Profile'
  },
  {
    path: route.security,
    element: <Security />,
    route: Route,
    title: 'Security'
  },
  {
    path: route.banIpAddrress,
    element: <BanIpAddress />,
    route: Route,
    title: 'BanIpAddress'
  },
  {
    path: route.storage,
    element: <Storage />,
    route: Route,
    title: 'Storage'
  },
  {
    path: route.emailSettings,
    element: <EmailSettings />,
    route: Route,
    title: 'Email Settings'
  },
  {
    path: route.gdprCookies,
    element: <GdprCookies />,
    route: Route,
    title: 'Gdpr Cookies'
  },
  {
    path: route.smsGateways,
    element: <SmsGateways />,
    route: Route,
    title: 'Sms Gateways'
  },
  {
    path: route.appearance,
    element: <Appearance />,
    route: Route,
    title: 'Appearance'
  },
  {
    path: route.companySettings,
    element: <CompanySettings />,
    route: Route,
    title: 'Company Settings'
  },
  {
    path: route.language,
    element: <Language />,
    route: Route,
    title: 'Language'
  },
  // {
  //   path: route.localization,
  //   element: <Localization />,
  //   route: Route,
  // },
  {
    path: route.preference,
    element: <Preference />,
    route: Route,
    title: 'Preference'
  },
  {
    path: route.prefixes,
    element: <Prefixes />,
    route: Route,
    title: 'Prefixes'
  },
  {
    path: route.leadsDashboard,
    element: <LeadsDashboard />,
    route: Route,
    title: 'Leads Dashboard'
  },
  {
    path: route.projectDashboard,
    element: <ProjectDashboard />,
    route: Route,
    title: 'Project Dashboard'
  },
  {
    path: route.todo,
    element: <Todo />,
    route: Route,
    title: 'Todo'
  },
  {
    path: route.email,
    element: <Email />,
    route: Route,
    title: 'Email'
  },
  {
    path: route.videoCall,
    element: <VideoCall />,
    route: Route,
    title: 'Video Call'
  },
  {
    path: route.chat,
    element: <Chat />,
    route: Route,
    title: 'Chat'
  },
  {
    path: route.pages,
    element: <Pages />,
    route: Route,
    title: 'Pages'
  },
  {
    path: route.contactList,
    element: <ContactList />,
    route: Route,
    title: 'Contact List'
  },
  {
    path: route.companyReports,
    element: <CompanyReport />,
    route: Route,
    title: 'Company Report'
  },
  {
    path: route.contactReports,
    element: <ContactReport />,
    route: Route,
    title: 'Contact Report'
  },
  {
    path: route.dealReports,
    element: <DealReports />,
    route: Route,
    title: 'Deal Reports'
  },
  {
    path: route.leadReports,
    element: <LeadReport />,
    route: Route,
    title: 'Lead Report'
  },
  {
    path: route.projectReports,
    element: <ProjectReport />,
    route: Route,
    title: 'Project Report'
  },
  {
    path: route.taskReports,
    element: <TaskReport />,
    route: Route,
    title: 'TaskReport'
  },
  {
    path: route.calls,
    element: <Calls />,
    route: Route,
    title: 'Call'
  },
  {
    path: route.contactStage,
    element: <ContactStage />,
    route: Route,
    title: 'Contact Stage'
  },
  {
    path: route.industry,
    element: <Industry />,
    route: Route,
    title: 'Industry'
  },
  {
    path: route.sources,
    element: <Sources />,
    route: Route,
    title: 'Sources'
  },
  {
    path: route.deleteRequest,
    element: <DeleteRequest />,
    route: Route,
    title: 'Delete Request'
  },
  {
    path: route.rolesPermissions,
    element: <RolesPermissions />,
    route: Route,
    title: 'Roles Permissions'
  },
  {
    path: route.contactMessages,
    element: <ContactMessages />,
    route: Route,
    title: 'Contact Messages'
  },
  {
    path: route.tickets,
    element: <Tickets />,
    route: Route,
    title: 'Tickets'
  },
  {
    path: route.fileManager,
    element: <FileManager />,
    route: Route,
    title: 'File Manager'
  },
  {
    path: route.faq,
    element: <Faq />,
    route: Route,
    title: 'Faq'
  },
  {
    path: route.lostReason,
    element: <LostReason />,
    route: Route,
    title: 'Lost Reason'
  },
  {
    path: route.contactGrid,
    element: <ContactGrid />,
    route: Route,
    title: 'Contact Grid'
  },
  {
    path: route.companiesGrid,
    element: <CompaniesGrid />,
    route: Route,
    title: 'Companies Grid'
  },
  {
    path: route.pipeline,
    element: <Pipeline />,
    route: Route,
    title: 'Pipeline'
  },
  {
    path: route.projects,
    element: <Projects />,
    route: Route,
    title: 'Projects'
  },
  {
    path: route.projectDetails,
    element: <ProjectDetails />,
    route: Route,
    title: 'Project Details'
  },
  {
    path: route.projectsGrid,
    element: <ProjectGrid />,
    route: Route,
    title: 'Project Grid'
  },
  {
    path: route.tasks,
    element: <Task />,
    route: Route,
    title: 'Task'
  },
  {
    path: route.companyDetails,
    element: <CompaniesDetails />,
    route: Route,
    title: 'Companies Details'
  },
  {
    path: route.states,
    element: <States />,
    route: Route,
    title: 'States'
  },
  {
    path: route.testimonials,
    element: <Testimonials />,
    route: Route,
    title: 'Testimonials'
  },
  {
    path: route.clipboard,
    element: <ClipBoard />,
    route: Route,
    title: 'ClipBoard'
  },
  {
    path: route.counter,
    element: <Counter />,
    route: Route,
    title: 'Counter'
  },
  {
    path: route.dragandDrop,
    element: <DragAndDrop />,
    route: Route,
    title: 'DragAndDrop'
  },
  {
    path: route.rating,
    element: <Rating />,
    route: Route,
    title: 'Rating'
  },
  {
    path: route.stickyNotes,
    element: <Stickynote />,
    route: Route,
    title: 'Stickynote'
  },
  {
    path: route.textEditor,
    element: <TextEditor />,
    route: Route,
    title: 'TextEditor'
  },
  {
    path: route.timeLine,
    element: <Timeline />,
    route: Route,
    title: 'Timeline'
  },
  {
    path: route.scrollBar,
    element: <Scrollbar />,
    route: Route,
    title: 'Scrollbar'
  },
  {
    path: route.apexChat,
    element: <Apexchart />,
    route: Route,
    title: 'Apexchart'
  },
  {
    path: route.featherIcons,
    element: <FeatherIcons />,
    route: Route,
    title: 'Feather Icons'
  },
  {
    path: route.fantawesome,
    element: <FontawesomeIcons />,
    route: Route,
    title: 'Fontawesome Icons'
  },
  {
    path: route.materialIcon,
    element: <MaterialIcons />,
    route: Route,
    title: 'Material Icons'
  },
  {
    path: route.pe7icon,
    element: <PE7Icons />,
    route: Route,
    title: 'PE7 Icons'
  },
  {
    path: route.simpleLineIcon,
    element: <SimplelineIcons />,
    route: Route,
    title: 'SimplelineIcons'
  },
  {
    path: route.themifyIcon,
    element: <ThemifyIcons />,
    route: Route,
    title: 'Themify Icons'
  },
  {
    path: route.typicon,
    element: <TypiconIcons />,
    route: Route,
    title: 'Typicon Icons'
  },
  {
    path: route.basicInput,
    element: <BasicInputs />,
    route: Route,
    title: 'Basic Inputs'
  },
  {
    path: route.weatherIcon,
    element: <WeatherIcons />,
    route: Route,
    title: 'Weather Icons'
  },
  {
    path: route.checkboxandRadion,
    element: <CheckboxRadios />,
    route: Route,
    title: 'Checkbox Radios'
  },
  {
    path: route.inputGroup,
    element: <InputGroup />,
    route: Route,
    title: 'Input Group'
  },
  {
    path: route.gridandGutters,
    element: <GridGutters />,
    route: Route,
    title: 'Grid Gutters'
  },
  {
    path: route.formSelect,
    element: <FormSelect />,
    route: Route,
    title: 'Form Select'
  },
  {
    path: route.formMask,
    element: <FormMask />,
    route: Route,
    title: 'Form Mask'
  },
  {
    path: route.fileUpload,
    element: <FileUpload />,
    route: Route,
    title: 'File Upload'
  },
  {
    path: route.horizontalForm,
    element: <FormHorizontal />,
    route: Route,
    title: 'Form Horizontal'
  },
  {
    path: route.verticalForm,
    element: <FormVertical />,
    route: Route,
    title: 'Form Vertical'
  },
  {
    path: route.floatingLable,
    element: <FloatingLabel />,
    route: Route,
    title: 'Floating Label'
  },
  {
    path: route.formValidation,
    element: <FormValidation />,
    route: Route,
    title: 'Form Validation'
  },
  {
    path: route.reactSelect,
    element: <FormSelect2 />,
    route: Route,
    title: 'FormSelect2'
  },
  {
    path: route.formWizard,
    element: <FormWizard />,
    route: Route,
    title: 'FormWizard'
  },
  {
    path: route.dataTable,
    element: <DataTables />,
    route: Route,
    title: 'DataTables'
  },
  {
    path: route.tableBasic,
    element: <TablesBasic />,
    route: Route,
    title: 'Tables Basic'
  },
  {
    path: route.iconicIcon,
    element: <IonicIcons />,
    route: Route,
    title: 'Ionic Icons'
  },
  {
    path: route.tasksImportant,
    element: <TasksImportant />,
    route: Route,
    title: 'Tasks Important'
  },
  {
    path: route.tasksCompleted,
    element: <TaskCompleted />,
    route: Route,
    title: 'Task Completed'
  },
  {
    path: route.ProposalsList,
    element: <Proposalslist />,
    route: Route,
    title: 'Proposals List'
  },
  {
    path: route.ProposalsGrid,
    element: <Proposalsgrid />,
    route: Route,
    title: 'Proposals Grid'
  },
  {
    path: route.ProposalsView,
    element: <ProposalsView />,
    route: Route,
    title: 'Proposals View'
  },
  {
    path: route.ContractsList,
    element: <Contractslist />,
    route: Route,
    title: 'Contracts List'
  },
  {
    path: route.ContractsGrid,
    element: <ContractsGrid />,
    route: Route,
    title: 'Contracts Grid'
  },
  {
    path: route.payments,
    element: <Payments />,
    route: Route,
    title: 'Payments'
  },
  {
    path: route.InvoiceList,
    element: <InvoiceList />,
    route: Route,
    title: 'Invoice List'
  },
  {
    path: route.InvoiceGrid,
    element: <InvoiceGrid />,
    route: Route,
    title: 'Invoice Grid'
  },
  {
    path: route.estimationList,
    element: <EstimationList />,
    route: Route,
    title: 'Estimation List'
  },
  {
    path: route.estimationKanban,
    element: <EstimationKanban />,
    route: Route,
    title: 'Estimation Kanban'
  },
  {
    path: route.placeholder,
    element: <Placeholder />,
    route: Route,
    title: 'Placeholder'
  },
  {
    path: route.sweetalert,
    element: <Alert />,
    route: Route,
    title: 'Alert'
  },
  {
    path: route.tooltip,
    element: <Tooltips />,
    route: Route,
    title: 'Tooltips'
  },
  {
    path: route.ribbon,
    element: <Ribbon />,
    route: Route,
    title: 'Ribbon'
  },
  {
    path: route.languageWeb,
    element: <LanguageWeb />,
    route: Route,
    title: 'Language Web'
  },
  {
    path: route.permissions,
    element: <Permission />,
    route: Route,
    title: 'Permission'
  },
  {
    path: route.swiperjs,
    element: <Swiperjs />,
    route: Route,
    title: 'Swiperjs'
  },
  {
    path: route.sortable,
    element: <Sortable />,
    route: Route,
    title: 'UI SortablesJs'
  },
  {
    path: route.tablericons,
    element: <TablerIcons />,
    route: Route,
    title: 'Icon Tabler'
  },
  {
    path: route.bootstrapicons,
    element: <BootstrapIcons />,
    route: Route,
    title: 'Icon Bootstap'
  },
  {
    path: route.remixicons,
    element: <RemixIcons />,
    route: Route,
    title: 'Icon Remix'
  },
  {
    path: route.formpicker,
    element: <FormPikers />,
    route: Route,
    title: 'Form Pickers'
  },
  {
    path: route.mapleaflet,
    element: <Leaflet />,
    route: Route,
    title: 'Leaflet Map'
  },
  {
    path: route.socialfeed,
    element: <SocialFeed />,
    route: Route,
    title: 'Social feed'
  },
  {
    path: route.kanbanview,
    element: <KanbanView />,
    route: Route,
    title: 'Kanban View'
  },
  {
    path: route.invoice,
    element: <Invoice />,
    route: Route,
    title: 'Invoice'
  },
  {
    path: route.invoice_details,
    element: <InvoiceDetails />,
    route: Route,
    title: 'Invoice Details'
  },
  {
    path: route.superadminDashboard,
    element: <SuperAdminDashboard />,
    route: Route,
    title: 'Super Admin Dashboard'
  },
  {
    path: route.superadminCompany,
    element: <Company />,
    route: Route,
    title: 'Super Admin Companies'
  },
  {
    path: route.superadminSubscription,
    element: <Subscription />,
    route: Route,
    title: 'Super Admin Subscription'
  },
  {
    path: route.superadminPackagelist,
    element: <Packages />,
    route: Route,
    title: 'Super Admin Packages'
  },
  {
    path: route.superadminPackageGrid,
    element: <PackagesGrid />,
    route: Route,
    title: 'Super Admin Packages Grid'
  },
  {
    path: route.superadminDomain,
    element: <Domain />,
    route: Route,
    title: 'Super Admin Domain'
  },
  {
    path: route.superadminPurchaseTransaction,
    element: <PurchaseTransaction />,
    route: Route,
    title: 'Super Admin Domain'
  },
  {
    path: route.layoutRtl,
    element: <LayoutDemo />,
    route: Route,
    title: "Layout RTL",
  },
  {
    path: route.layoutMini,
    element: <LayoutDemo />,
    route: Route,
    title: "Layout Mini",
  },
  {
    path: route.HorizontalSingle,
    element: <LayoutDemo />,
    route: Route,
    title: "Layout HorizontalSingle",
  },
  {
    path: route.WithoutHeader,
    element: <LayoutDemo />,
    route: Route,
    title: "Layout WithoutHeader",
  },
  {
    path: route.Detached,
    element: <LayoutDemo />,
    route: Route,
    title: "Layout Detached",
  },
  {
    path: route.Dark,
    element: <LayoutDemo />,
    route: Route,
    title: "Layout Dark",
  },
];

export const authRoutes = [
  {
    path: route.comingSoon,
    element: <ComingSoon />,
    route: Route,
    title: 'ComingSoon'
  },
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
  {
    path: route.underMaintenance,
    element: <UnderMaintenance />,
    route: Route,
    title: 'Under Maintenance'
  },
  {
    path: route.lockScreen,
    element: <LockScreen />,
    route: Route,
    title: 'Lock Screen'
  },
];
