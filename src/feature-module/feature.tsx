import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useLocation } from "react-router";
import Header from "../core/common/header";
import Sidebar from "../core/common/sidebar";
import ThemeSettings from "../core/common/theme-settings/themeSettings";
import HorizontalSidebar from "../core/common/horizontal-sidebar";

const Feature = () => {
  const dispatch = useDispatch();
  const headerCollapse = useSelector((state: any) => state.commonSlice.headerCollapse);
  const mobileSidebar = useSelector((state: any) => state.commonSlice.mobileSidebar);
  const miniSidebar = useSelector((state: any) => state.commonSlice.miniSidebar);
  const expandMenu = useSelector((state: any) => state.commonSlice.expandMenu);
  const dataWidth = useSelector((state: any) => state.themeSetting.dataWidth);
  const dataLayout = useSelector((state: any) => state.themeSetting.dataLayout);
  const dataTheme = useSelector((state: any) => state.themeSetting.dataTheme);
  const dataSidebarAll = useSelector(
    (state: any) => state.themeSetting.dataSidebarAll
  );
  const dataColorAll = useSelector(
    (state: any) => state.themeSetting.dataColorAll
  );
  const dataTopBarColorAll = useSelector(
    (state: any) => state.themeSetting.dataTopBarColorAll
  );
  const dataTopbarAll = useSelector(
    (state: any) => state.themeSetting.dataTopbarAll
  );
  const location = useLocation();
  useEffect(() => {
    if (dataTheme === "dark") {
      document.documentElement.setAttribute("data-theme", "dark");
    } else {
      document.documentElement.setAttribute("data-theme", "");
    }
  }, [dataTheme]);
  return (
    <>
     <style>
        {`
      :root {
        --sidebar--rgb-picr: ${dataSidebarAll};
        --topbar--rgb-picr:${dataTopbarAll};
        --topbarcolor--rgb-picr:${dataTopBarColorAll};
        --primary-rgb-picr:${dataColorAll};
      }
    `}
      </style>
        <div
      className={`
       ${dataLayout === "mini" || dataWidth === "box" ? "mini-sidebar" : ""}
       ${
         dataLayout === "horizontal" ||
         dataLayout === "horizontal-single" ||
         dataLayout === "horizontal-overlay" ||
         dataLayout === "horizontal-box"
           ? "menu-horizontal"
           : ""
       }
      ${miniSidebar && dataLayout !== "mini" ? "mini-sidebar" : ""}
      ${dataWidth === "box" ? "layout-box-mode" : ""} ${
        headerCollapse ? "header-collapse" : ""
      }
     ${
       (expandMenu && miniSidebar) || (expandMenu && dataLayout === "mini")
         ? "expand-menu"
         : ""
     }
      
      `}
    >
      <div
        className={`main-wrapper 
        ${headerCollapse ? "header-collapse" : ""} 
        ${mobileSidebar ? "slide-nav" : ""}`}
      >
        <Header />
        <Sidebar />
        <HorizontalSidebar />
        <Outlet />
        <ThemeSettings />
      </div>
      <div className="sidebar-overlay"></div>
      {/* <div
        className={`sidebar-themeoverlay ${themeOpen ? "open" : ""}`}
        onClick={() => dispatch(setThemeSettings(!themeOpen))}
      ></div> */}
    </div>
    </>

  );
};

export default Feature;
