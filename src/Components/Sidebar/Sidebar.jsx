
import { useEffect, useState } from "react";
import _ from "lodash"
import {
    Box,
    Typography,
    ListItemIcon,
    ListItemText,
    Divider,
    MenuList,
    MenuItem,
} from "@mui/material"
import AppsIcon from '@mui/icons-material/Apps';
import { useMediaQuery } from 'react-responsive'
import { NavLink } from 'react-router';
import { optionalRoutes, cdssRoutes, settingsRoutes } from "../../data/menuData";

import "../../assets/styles/App.css";
import { isAdmin } from "../../helper/checkPermissions";

import { set_theme_by_key } from "../../store/Reducers/ThemeReducer"

import useConfig from "../../hooks/useConfig";
import useTheme from "../../hooks/useTheme";
import useAuth from "../../hooks/useAuth";
import { show_toast } from "../../store/Reducers/LogErrorsReducer";
import { getErrorMessage } from "../../constant/general_errors";
;
import { endpoints } from "../../Server/endpoints";
import useProtectedRoutes from "../../hooks/useProtectedRoute";

const Sidebar = () => {
    const authenticatedServer = useProtectedRoutes();
    const isSmallScreen = useMediaQuery({ query: '(max-width: 850px)' })
    const { token } = useAuth();
    const { profile, currentUserRole, currentUserClearance, permissions, patient_required, encounter_required, dispatch } = useConfig();
    const { toggleSidebar, toggleMiniSidebar, dispatch:dispatchTheme } = useTheme();
    const [checkAdmin, setCheckAdmin] = useState(null);
    const [resources, setResources] = useState([]);

    const filter_optional_routes = (_optional) => {
        if(patient_required && encounter_required) return _optional;
        else if(patient_required) return _optional?.displayName == 'Patients';
        else if(encounter_required) return _optional?.displayName == 'Encounters';
        else return {};
    }

    const canRead = (_resc) => {
        const _all_rescs = permissions?.resources

        if(!checkAdmin) {
            if(_resc?.display) {
                const _can_read = _.find(_all_rescs, _item => _.has(_item, _resc?.displayName))
                
                if(!_.isEmpty(_can_read) && _can_read?.[_resc?.displayName]?.read) return _resc;
                else return "";
            } else {
                const _key = Object.keys(_resc)?.[0];
                
                if(_resc?.[_key]?.clearance_level > 0 && currentUserClearance <= _resc?.[_key]?.clearance_level) {
                    const _can_read = _.find(_all_rescs, _item => _.has(_item, _resc?.[_key]?.resource_name))
                    
                    if(!_.isEmpty(_can_read) && _can_read?.[_resc?.[_key]?.resource_name]?.read) return _resc;
                    else return "";
                } else return "";
            }
        } else return _resc;
    }

    useEffect(() => {
        if(isSmallScreen && !toggleMiniSidebar) dispatchTheme(set_theme_by_key({ key: 'toggleMiniSidebar', value: !toggleMiniSidebar }));
        else if(!isSmallScreen && toggleMiniSidebar) dispatchTheme(set_theme_by_key({ key: 'toggleMiniSidebar', value: !toggleMiniSidebar }));
    }, [isSmallScreen])

    useEffect(() => {
        const _is_admin = async () => {
            const _is_admin = await isAdmin(currentUserRole);

            setCheckAdmin(_is_admin);
        }

        const getResources = async () => {
            try {
                const { Resources } = endpoints;
                const { data: { data }} = await authenticatedServer.get(Resources.view);
    
                if(!_.isEmpty(data)) {
                    const _rescs = _.map(permissions?.resources, entry => {
                    const key = _.keys(entry)[0];
                    const match = _.find(data, r => r.resource_name.toLowerCase() === key.toLowerCase());
                    return match
                        ? { [key]: { ...entry[key], clearance_level: match.clearance_level, resource_name: match.resource_name, resource_slug: match.resource_slug } }
                        : entry;
                    });
                    setResources(_rescs);
                    dispatch(show_toast({ show: true, sevirity: "success", message: `${data?.length} Resources found.` }));
                } else {
                    dispatch(show_toast({ show: true, sevirity: "success", message: "No resources found." }));
                }
            } catch(err) {
                dispatch(show_toast({ show: true, sevirity: "error", message: getErrorMessage(err) }));
            }
        }

        getResources();
        _is_admin();
    }, [token]);

    return (
        <>
            <Box sx={{ width: 'fit-content', position: "static", height: "calc(100vh - 70px)", bgcolor: 'background.paper', borderRight: "1px solid #ccc" }}>
                {
                    optionalRoutes?.length > 0 && (
                         <>
                            <MenuList sx={{ p: 0 }} key={"_auth_" + profile + "_auth_"}>
                                {
                                    optionalRoutes?.filter(filter_optional_routes)?.filter(canRead)?.map((_menu, _index) => (
                                        <NavLink key={_menu?.path + "_auth_nav_link_" + _menu?.displayName + "_auth_nav_link_" + _index} to={_menu?.path} style={{ textDecoration: "none" }} className={({ isActive }) => (isActive ? "link-active" : "none")}>
                                            <MenuItem key={_menu?.path + "_auth_" + _menu?.displayName + "_auth_" + _index} sx={{ p:2 }}>
                                                {
                                                    _menu?.showIcon && (<ListItemIcon>
                                                        {_menu?.icon}
                                                    </ListItemIcon>)
                                                }
                                                {
                                                    (toggleMiniSidebar == toggleSidebar) && (
                                                        <ListItemText primary={
                                                                <>
                                                                    <Typography variant='body2' color="black">
                                                                        {_menu?.displayName}
                                                                    </Typography>
                                                                </>
                                                            } 
                                                        />
                                                    )
                                                }
                                            </MenuItem>
                                        </NavLink>
                                    ))
                                }
                            </MenuList>
                            <Divider />
                        </>
                    )
                }

                {
                    cdssRoutes?.length > 0 && (
                         <>
                            <MenuList sx={{ p: 0 }} key={"_auth_" + profile + "_auth_"}>
                                {
                                    cdssRoutes?.filter(canRead)?.map((_menu, _index) => (
                                        <NavLink key={_menu?.path + "_auth_nav_link_" + _menu?.displayName + "_auth_nav_link_" + _index} to={_menu?.path} style={{ textDecoration: "none" }} className={({ isActive }) => (isActive ? "link-active" : "none")}>
                                            <MenuItem key={_menu?.path + "_auth_" + _menu?.displayName + "_auth_" + _index} sx={{ p:2 }}>
                                                {
                                                    _menu?.showIcon && (<ListItemIcon>
                                                        {_menu?.icon}
                                                    </ListItemIcon>)
                                                }
                                                {
                                                    (toggleMiniSidebar == toggleSidebar) && (
                                                        <ListItemText primary={
                                                                <>
                                                                    <Typography variant='body2' color="black">
                                                                        {_menu?.displayName}
                                                                    </Typography>
                                                                </>
                                                            } 
                                                        />
                                                    )
                                                }
                                            </MenuItem>
                                        </NavLink>
                                    ))
                                }
                            </MenuList>
                            <Divider />
                        </>
                    )
                }
                
                {
                    resources && resources?.length > 0 && (
                         <>
                            <MenuList sx={{ p: 0 }} key={"_public_" + profile + "_public_"}>
                                { 
                                    resources?.filter(canRead)?.map((_menu, _index) => {
                                        const _key = Object.keys(_menu)?.[0]

                                        return (
                                        <NavLink key={_menu?.[_key]?.resource_slug + "_public_nav_link_" + _menu?.[_key]?.resource_name + "_public_nav_link_" + _index} to={_menu?.[_key]?.resource_slug} style={{ textDecoration: "none" }} className={({ isActive }) => (isActive ? "link-active" : "none")}>
                                            <MenuItem key={_menu?.[_key]?.resource_slug + "_public_" + _menu?.[_key]?.resource_name + "_public_" + _index} sx={{ p:2 }}>
                                                <ListItemIcon>
                                                    <AppsIcon />
                                                </ListItemIcon>
                                                {
                                                    (toggleMiniSidebar == toggleSidebar) && (
                                                        <ListItemText primary={
                                                                <>
                                                                    <Typography variant='body2' color="black">
                                                                        {_menu?.[_key]?.resource_name}
                                                                    </Typography>
                                                                </>
                                                            } 
                                                        />
                                                    )
                                                }
                                            </MenuItem>
                                        </NavLink>
                                        )
                                    })
                                }
                            </MenuList>
                            <Divider />
                        </>
                    )
                }
                
                {
                    checkAdmin && settingsRoutes?.length > 0 && (
                        <>        
                            <MenuList sx={{ p: 0 }} key={"_settings_" + profile + "_settings_"}>
                                {
                                    settingsRoutes?.filter((x) => x?.display)?.map((_menu, _index) => (
                                        <NavLink key={_menu?.path + "_settings_nav_link_" + _menu?.displayName + "_settings_nav_link_" + _index} to={_menu?.path} style={{ textDecoration: "none" }} className={({ isActive }) => (isActive ? "link-active" : "none")}>
                                            <MenuItem key={_menu?.path + "_settings_" + _menu?.displayName + "_settings_" + _index} sx={{ p:2 }}>
                                                {
                                                    _menu?.showIcon && (<ListItemIcon>
                                                        {_menu?.icon}
                                                    </ListItemIcon>)
                                                }
                                                {
                                                    (toggleMiniSidebar == toggleSidebar) && (
                                                        <ListItemText primary={
                                                                <>
                                                                    <Typography variant='body2' color="black">
                                                                        {_menu?.displayName}
                                                                    </Typography>
                                                                </>
                                                            } 
                                                        />
                                                    )
                                                }
                                            </MenuItem>
                                        </NavLink>
                                    ))
                                }
                            </MenuList>
                        </>
                    )
                }
            </Box>
        </>
    )
}

export default Sidebar;