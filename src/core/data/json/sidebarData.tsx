import { all_routes } from "../../../feature-module/router/all_routes";
const route = all_routes;
export const SidebarData = [
  {
    label: "MAIN MENU",
    submenuOpen: true,
    showSubRoute: false,
    submenuHdr: "Dashboard",
    submenuItems: [
      {
        label: "Leads Dashboard",
        submenu: false,
        showSubRoute: false,
        link: route.leadsDashboard,
        icon: "ti ti-layout-2",
      },
    ],
  },
  {
    label: "CRM",
    submenuOpen: true,
    showSubRoute: false,
    submenuHdr: "Inventory",
    submenuItems: [
      {
        label: "Contacts",
        link: route.contactList,
        subLink1: route.contactGrid,
        subLink2: route.contactDetails,
        icon: "ti ti-user-up",
        showSubRoute: false,
        submenu: false,
      },
      {
        label: "Companies",
        link: route.companies,
        subLink1: route.companyDetails,
        subLink2: route.companiesGrid,
        icon: "ti ti-building-community",
        showSubRoute: false,
        submenu: false,
      },
      {
        label: "Leads / Deals",
        link: route.leads,
        subLink1: route.leadsDetails,
        subLink2: route.leadsKanban,
        icon: "ti ti-chart-arcs",
        showSubRoute: false,
        submenu: false,
      },
      {
        label: "Pipeline",
        link: route.pipeline,
        icon: "ti ti-timeline-event-exclamation",
        showSubRoute: false,
        submenu: false,
      },
    ],
  },
  {
    label: "REPORTS",
    submenuOpen: true,
    showSubRoute: false,
    submenuHdr: "Finance & Accounts",
    submenuItems: [
      {
        label: "Lead Reports",
        submenu: false,
        showSubRoute: false,
        icon: "ti ti-file-invoice",
        link: route.leadReports,
      },
    ],
  },
  {
    label: "CRM SETTINGS",
    submenuOpen: true,
    submenuHdr: "Sales",
    submenu: false,
    showSubRoute: false,
    submenuItems: [
      {
        label: "Sources",
        link: route.sources,
        icon: "ti ti-artboard",
        showSubRoute: false,
        submenu: false,
      },
    ],
  },
  {
    label: "USER MANAGEMENT",
    submenuOpen: true,
    submenuHdr: "Sales",
    submenu: false,
    showSubRoute: false,
    submenuItems: [
      {
        label: "Manage Users",
        link: route.manageusers,
        icon: "ti ti-file-invoice",
        showSubRoute: false,
        submenu: false,
      },
      {
        label: "Roles & Permission",
        link: route.rolesPermissions,
        icon: "ti ti-navigation-cog",
        showSubRoute: false,
        submenu: false,
      },
    ],
  },
  {
    label: "Settings",
    submenu: true,
    showSubRoute: false,
    submenuHdr: "Settings",
    submenuItems: [
      {
        label: "Profile",
        submenu: false,
        showSubRoute: false,
        icon: "ti ti-settings-cog",
        link: route.profile,
      },
    ],
  },
];
