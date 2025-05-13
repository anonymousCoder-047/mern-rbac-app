import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ImageWithBasePath from "../imageWithBasePath";
import { all_routes } from "../../../feature-module/router/all_routes";
import { useDispatch, useSelector } from "react-redux";
import {
  setExpandMenu,
  setMiniSidebar,
  setMobileSidebar,
} from "../../data/redux/commonSlice";
import { HorizontalSidebarData } from "../../data/json/horizontalSidebar";
const Header = () => {

  const navigate = useNavigate();
  const [subOpen, setSubopen] = useState<any>("");
  const [subsidebar, setSubsidebar] = useState("");

  const [isFullscreen, setIsFullscreen] = useState(false);
  const route = all_routes;
  const location = useLocation();
  const dispatch = useDispatch();
  const mobileSidebar = useSelector((state: any) => state.commonSlice.mobileSidebar);
  const miniSidebar = useSelector((state: any) => state.commonSlice.miniSidebar);

  const toggleMobileSidebar = () => {
    dispatch(setMobileSidebar(!mobileSidebar));
  };
  const toggleMiniSidebar = () => {
    dispatch(setMiniSidebar(!miniSidebar));
  };
  const toggleExpandMenu = () => {
    dispatch(setExpandMenu(true));
  };
  const toggleExpandMenu2 = () => {
    dispatch(setExpandMenu(false));
  };

  const [layoutBs, setLayoutBs] = useState(localStorage.getItem("dataTheme"));
  const isLockScreen = location.pathname === "/lock-screen";

  if (isLockScreen) {
    return null;
  }
  const LayoutDark = () => {
    localStorage.setItem("dataTheme", "dark");
    document.documentElement.setAttribute("data-theme", "dark");
    setLayoutBs("dark");
  };
  const LayoutLight = () => {
    localStorage.setItem("dataTheme", "light");
    document.documentElement.setAttribute("data-theme", "light");
    setLayoutBs("light");
  };


  const toggleSidebar = (title: any) => {
    localStorage.setItem("menuOpened", title);
    if (title === subOpen) {
      setSubopen("");
    } else {
      setSubopen(title);
    }
  };

  const toggleSubsidebar = (subitem: any) => {
    if (subitem === subsidebar) {
      setSubsidebar("");
    } else {
      setSubsidebar(subitem);
    }
  };

  const toggleFullscreen = () => {
    if (!isFullscreen) {
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen().catch((err) => {
        });
        setIsFullscreen(true);
      }
    } else {
      if (document.exitFullscreen) {
        if (document.fullscreenElement) {
          document.exitFullscreen().catch((err) => {
          });
        }
        setIsFullscreen(false);
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate(route.login);
  }

  return (
    <>
      {/* Header */}
      <div className="header">
        {/* Logo */}
        <div className="header-left active" onMouseEnter={toggleExpandMenu} onMouseLeave={toggleExpandMenu2}>
          <Link to={route.dealsDashboard} className="logo logo-normal">
            {/* {layoutBs === "dark" ? (
              <>
                <ImageWithBasePath
                  src="assets/img/white-logo.svg"
                  className="white-logo"
                  alt="Logo"
                />
              </>
            ) : (
              <ImageWithBasePath src="assets/img/logo.svg" alt="Logo" />
            )} */}
            <ImageWithBasePath src="assets/img/logo.svg" alt="Logo" />
            <ImageWithBasePath src="assets/img/white-logo.svg" className="white-logo" alt="Logo" />
          </Link>
          <Link to={route.dealsDashboard} className="logo-small">
            <ImageWithBasePath src="assets/img/logo-small.svg" alt="Logo" />
          </Link>
          <Link id="toggle_btn" to="#" onClick={toggleMiniSidebar}>
            <i className="ti ti-arrow-bar-to-left" />
          </Link>
        </div>
        {/* /Logo */}
        <Link
          id="mobile_btn"
          className="mobile_btn"
          to="#sidebar"
          onClick={toggleMobileSidebar}
        >
          <span className="bar-icon">
            <span />
            <span />
            <span />
          </span>
        </Link>
        <div className="header-user">
          <ul className="nav user-menu">
            {/* Search */}
            <li className="nav-item nav-search-inputs me-auto">
              <div className="top-nav-search">
                <Link to="#" className="responsive-search">
                  <i className="fa fa-search" />
                </Link>
                <form className="dropdown">
                  <div className="searchinputs" id="dropdownMenuClickable">
                    <input type="text" placeholder="Search" />
                    <div className="search-addon">
                      <button type="submit">
                        <i className="ti ti-command" />
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </li>
            {/* /Search */}
            <li>
              <div className="sidebar sidebar-horizontal" id="horizontal-single">
                <div className="sidebar-menu">
                  <div className="main-menu">
                    <ul className="nav-menu">
                      <li className="menu-title">
                        <span>Main</span>
                      </li>
                      {HorizontalSidebarData?.map((mainMenu, index) => (
                        <React.Fragment key={`main-${index}`}>
                          {mainMenu?.menu?.map((data, i) => (
                            <li className="submenu" key={`menu-${i}`}>
                              <Link to="#" className={`
														${data?.subMenus
                                  ?.map((link: any) => link?.route)
                                  .includes(location.pathname)
                                  ? "active"
                                  : ""
                                } ${subOpen === data.menuValue ? "subdrop" : ""}`} onClick={() => toggleSidebar(data.menuValue)}>
                                <i className={`ti ti-${data.icon}`}></i>
                                <span>{data.menuValue}</span>
                                <span className="menu-arrow"></span>
                              </Link>

                              {/* First-level Submenus */}
                              <ul style={{ display: subOpen === data.menuValue ? "block" : "none" }}>
                                {data?.subMenus?.map((subMenu: any, j) => (
                                  <li
                                    key={`submenu-${j}`}
                                    className={subMenu?.customSubmenuTwo ? "submenu" : ""}
                                  >
                                    <Link to={subMenu?.route || "#"} className={`${subMenu?.subMenusTwo
                                      ?.map((link: any) => link?.route)
                                      .includes(location.pathname) || subMenu?.route === location.pathname
                                      ? "active"
                                      : ""
                                      } ${subsidebar === subMenu.menuValue ? "subdrop" : ""}`} onClick={() => toggleSubsidebar(subMenu.menuValue)}>
                                      <span>{subMenu?.menuValue}</span>
                                      {subMenu?.customSubmenuTwo && <span className="menu-arrow"></span>}
                                    </Link>

                                    {/* Check if `customSubmenuTwo` exists */}
                                    {subMenu?.customSubmenuTwo && subMenu?.subMenusTwo && (
                                      <ul style={{ display: subsidebar === subMenu.menuValue ? "block" : "none" }}>
                                        {subMenu.subMenusTwo.map((subMenuTwo: any, k: number) => (
                                          <li key={`submenu-two-${k}`}>
                                            <Link className={subMenuTwo.route === location.pathname ? 'active' : ''} to={subMenuTwo.route}>{subMenuTwo.menuValue}</Link>
                                          </li>
                                        ))}
                                      </ul>
                                    )}
                                  </li>
                                ))}
                              </ul>
                            </li>
                          ))}
                        </React.Fragment>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </li>
            {/* Nav List */}
            <li className="nav-item nav-list">
              <ul className="nav">
                <li>
                  <Link to="#" onClick={toggleFullscreen} className="btn btn-icon border btn-menubar btnFullscreen">
                    <i className="ti ti-maximize"></i>
                  </Link>
                </li>

                <li className="dark-mode-list">
                  <Link
                    to="#"
                    className={`dark-mode-toggle ${layoutBs ? "" : "active"}`}
                    id="dark-mode-toggle"
                  >
                    <i
                      className={`ti ti-sun light-mode ${layoutBs === "dark" ? "" : "active"
                        }`}
                      onClick={LayoutLight}
                    >
                      {" "}
                    </i>
                    <i
                      className={`ti ti-moon dark-mode ${layoutBs === "dark" ? "active" : ""
                        }`}
                      onClick={LayoutDark}
                    ></i>
                  </Link>
                </li>
                <li className="nav-item dropdown">
                  <Link
                    to="#"
                    className="btn btn-header-list"
                    data-bs-toggle="dropdown"
                  >
                    <i className="ti ti-layout-grid-add" />
                  </Link>
                  <div className="dropdown-menu dropdown-menu-end menus-info">
                    <div className="row">
                      <div className="col-md-6">
                        <ul className="menu-list">
                          <li>
                            <Link to={route.contactList}>
                              <div className="menu-details">
                                <span className="menu-list-icon bg-violet">
                                  <i className="ti ti-user-up" />
                                </span>
                                <div className="menu-details-content">
                                  <p>Contacts</p>
                                  <span>Add New Contact</span>
                                </div>
                              </div>
                            </Link>
                          </li>
                          <li>
                            <Link to={route.pipeline}>
                              <div className="menu-details">
                                <span className="menu-list-icon bg-green">
                                  <i className="ti ti-timeline-event-exclamation" />
                                </span>
                                <div className="menu-details-content">
                                  <p>Pipline</p>
                                  <span>Add New Pipline</span>
                                </div>
                              </div>
                            </Link>
                          </li>
                        </ul>
                      </div>
                      <div className="col-md-6">
                        <ul className="menu-list">
                          <li>
                            <Link to={route.leads}>
                              <div className="menu-details">
                                <span className="menu-list-icon bg-secondary">
                                  <i className="ti ti-chart-arcs" />
                                </span>
                                <div className="menu-details-content">
                                  <p>Leads</p>
                                  <span>Add New Leads</span>
                                </div>
                              </div>
                            </Link>
                          </li>
                          <li>
                            <Link to={route.companies}>
                              <div className="menu-details">
                                <span className="menu-list-icon bg-tertiary">
                                  <i className="ti ti-building-community" />
                                </span>
                                <div className="menu-details-content">
                                  <p>Company</p>
                                  <span>Add New Company</span>
                                </div>
                              </div>
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </li>
            {/* /Nav List */}
            
            {/* Profile Dropdown */}
            <li className="nav-item dropdown has-arrow main-drop">
              <Link
                to="#"
                className="nav-link userset"
                data-bs-toggle="dropdown"
              >
                <span className="user-info">
                  <span className="user-letter">
                    <ImageWithBasePath
                      src="assets/img/profiles/avatar-20.jpg"
                      alt="Profile"
                    />
                  </span>
                  <span className="badge badge-success rounded-pill" />
                </span>
              </Link>
              <div className={` dropdown-menu  menu-drop-user `}>
                <div className="profilename">
                  <Link className="dropdown-item" to={route.dealsDashboard}>
                    <i className="ti ti-layout-2" /> Dashboard
                  </Link>
                  <Link className="dropdown-item" to={route.profile}>
                    <i className="ti ti-user-pin" /> My Profile
                  </Link>
                  <button className="dropdown-item" onClick={handleLogout}>
                    <i className="ti ti-lock" /> Logout
                  </button>
                </div>
              </div>
            </li>
            {/* /Profile Dropdown */}
          </ul>
        </div>
        {/* Mobile Menu */}
        <div className="dropdown mobile-user-menu">
          <Link
            to="#"
            className="nav-link dropdown-toggle"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <i className="fa fa-ellipsis-v" />
          </Link>
          <div className={` dropdown-menu `}>
            <Link className="dropdown-item" to={route.dealsDashboard}>
              <i className="ti ti-layout-2" /> Dashboard
            </Link>
            <Link className="dropdown-item" to={route.profile}>
              <i className="ti ti-user-pin" /> My Profile
            </Link>
            <Link className="dropdown-item" to={route.login}>
              <i className="ti ti-lock" /> Logout
            </Link>
          </div>
        </div>
        {/* /Mobile Menu */}

      </div>

    </>
  );
};

export default Header;
