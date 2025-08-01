
import Login from "../Components/Pages/Auth/Login"
import ForgetPassword from "../Components/Pages/Auth/ForgetPassword"
import ResetPassword from "../Components/Pages/Auth/ResetPassword"
import Users from "../Components/Pages/Users/Users"
import CDSS from "../Components/Pages/CDSS/CDSS";
import Sections from "../Components/Pages/Sections/Sections";
import Policies from "../Components/Pages/Policies/Policies";
import Onboarding from "../Components/Pages/OnBoarding/OnBoarding";
import AccountSetup from "../Components/Pages/OnBoarding/AccountSetup";
import Verify from "../Components/Pages/Auth/Verify";
import Groups from "../Components/Pages/Groups/Groups";
import Role from "../Components/Pages/Role/Role";
import Resources from "../Components/Pages/Resources/Resources";

// icons
import LoginIcon from '@mui/icons-material/Login';
import EngineeringIcon from '@mui/icons-material/Engineering';
import GroupIcon from '@mui/icons-material/Group';
import ArticleIcon from '@mui/icons-material/Article';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import SecurityIcon from '@mui/icons-material/Security';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import EditRoadIcon from '@mui/icons-material/EditRoad';
import Encounter from "../Components/Pages/Encounter/Encounter";
import Patient from "../Components/Pages/Patient/Patient";

export const onBoardingUserAndAdmins = [
    {
        path: '/account-setup/:token',
        element: <AccountSetup />,
        showIcon: false,
        icon: <ManageAccountsIcon />,
        display: true,
        displayName: "Account Setup"
    },
    {
        path: '/onboarding',
        element: <Onboarding />,
        showIcon: false,
        icon: <EditRoadIcon />,
        display: false,
        displayName: "Onboarding"
    },
]

export const publicRoutes = [
    {
        path: '/login',
        element: <Login />,
        showIcon: true,
        display: true,
        icon: <LoginIcon />,
        displayName: "Login"
    },
    {
        path: '/forgot-password',
        element: <ForgetPassword />,
        showIcon: true,
        display: true,
        icon: <LoginIcon />,
        displayName: "Forget Password"
    },
    {
        path: '/reset-password/:token',
        element: <ResetPassword />,
        showIcon: true,
        display: true,
        icon: <LoginIcon />,
        displayName: "Forget Password"
    },
    {
        path: '/verify-otp',
        element: <Verify />,
        showIcon: true,
        display: true,
        icon: <LoginIcon />,
        displayName: "Verify OTP"
    },
]

export const settingsRoutes = [
    {
        path: 'policies',
        element: <Policies />,
        showIcon: true,
        display: true,
        icon: <SecurityIcon />,
        displayName: "Mange Policies"
    },
    {
        path: 'users',
        element: <Users />,
        showIcon: true,
        display: true,
        icon: <ManageAccountsIcon />,
        displayName: "Mange Users"
    },
    {
        path: 'groups',
        element: <Groups />,
        showIcon: true,
        display: true,
        icon: <GroupIcon />,
        displayName: "Mange Groups"
    },
    {
        path: 'roles',
        element: <Role />,
        showIcon: true,
        display: true,
        icon: <EngineeringIcon />,
        displayName: "Mange Roles"
    },
]

export const optionalRoutes = [
    {
        path: 'patient',
        element: Patient,
        showIcon: true,
        display: true,
        icon: <ArticleIcon />,
        displayName: "Patients"
    },
    {
        path: 'encounter',
        element: Encounter,
        showIcon: true,
        display: true,
        icon: <ArticleIcon />,
        displayName: "Encounter"
    },
]

export const cdssRoutes = [
    {
        path: 'resources',
        element: Resources,
        showIcon: true,
        display: true,
        icon: <ArticleIcon />,
        displayName: "Resources"
    },
    {
        path: 'sections',
        element: Sections,
        showIcon: true,
        display: true,
        icon: <ArticleIcon />,
        displayName: "Sections"
    },
    {
        path: 'cdss',
        element: CDSS,
        showIcon: true,
        display: true,
        icon: <AccountTreeIcon />,
        displayName: "CDSS"
    },
]