
import React, { useEffect, useState } from 'react';
import {
    Routes as Switch,
    Route,
    Navigate,
} from 'react-router';

import Header from "../Components/Header/Header";
import Footer from "../Components/Footer/Footer";

// pages
import Home from "../Components/Pages/Home/Home";
import DynamicPage from "../Components/Pages/DynamicPage/DynamicPage";
import { optionalRoutes, cdssRoutes, publicRoutes, settingsRoutes, onBoardingUserAndAdmins } from "../data/menuData"; 

// Error Pages
import PageNotFound from "../Components/Pages/Error/404";

// Auth Pages
import Login from "../Components/Pages/Auth/Login";
import SidebarLayout from "../Layouts/SidebarLayout";
import useAuth from "../hooks/useAuth";
import useConfig from "../hooks/useConfig";

// load modules
import _ from "lodash";
import useProtectedRoutes from '../hooks/useProtectedRoute';
import { endpoints } from '../Server/endpoints';
import { isAdmin } from '../helper/checkPermissions';

const Routes = () => {
    const authenticatedServer = useProtectedRoutes();
    const { token } = useAuth();
    const { currentUserRole, permissions } = useConfig();
    const [resources, setResources] = useState([])
    const [checkAdmin, setCheckAdmin] = useState(false);

    const CheckLogedIn = (Component) => (props) => {
        return !token ? <Component {...props} /> : <Navigate to="/dashboard" />
    }

    const ProtectedRoute = (Component) => (props) => {
        return token ? <Component {...props} /> : <Navigate to="/login" />
    }

    useEffect(() => {
        const checkAdmin = async () => {
            const is_admin = await isAdmin(currentUserRole)
            setCheckAdmin(is_admin);
        }

        const getResources = async () => {
            try {
                const { Resources } = endpoints;
                const { data: { data }} = await authenticatedServer.get(Resources.view);
    
                if(!_.isEmpty(data)) {
                    setResources(data);
                }
            } catch(err) {
                console.log("Internal server error -- ");
                // dispatch(show_toast({ show: true, sevirity: "error", message: getErrorMessage(err) }));
            }
        }

        checkAdmin();
        getResources();
    }, [currentUserRole, token]);

    const AuthGuard = ProtectedRoute(SidebarLayout);
    const LoggedIn = CheckLogedIn(Login);

    return (
        <>
            <Header />
            <Switch>
                <Route path="/login" element={<LoggedIn />} />
                {
                    publicRoutes && publicRoutes?.map((_elements, _index) => (
                        <Route key={_elements?.path + "_" + _index} path={_elements?.path} element={_elements?.element} />
                    ))
                }
                {
                    onBoardingUserAndAdmins && onBoardingUserAndAdmins?.map((_elements, _index) => (
                        <Route key={_elements?.path + "_" + _index} path={_elements?.path} element={_elements?.element} />
                    ))
                }

                {/* <ProtectedRoutes  /> */}
                <Route path="/" element={<AuthGuard />}>
                    <Route path="dashboard" index element={<Home />} />
                    {
                        optionalRoutes && optionalRoutes?.map((_elements, _index) => (
                            <Route key={_elements?.path + "_" + _index} path={_elements?.path} element={React.createElement(_elements?.element, { permissions: (permissions?.resources ? _.find(permissions?.resources, _item => _.has(_item, _elements?.displayName)) : {}), elemKey: _elements?.displayName, isAdmin: checkAdmin })} />
                        ))
                    }
                    {
                        cdssRoutes && cdssRoutes?.map((_elements, _index) => (
                            <Route key={_elements?.path + "_" + _index} path={_elements?.path} element={React.createElement(_elements?.element, { permissions: (permissions?.resources ? _.find(permissions?.resources, _item => _.has(_item, _elements?.displayName)) : {}), elemKey: _elements?.displayName, isAdmin: checkAdmin })} />
                        ))
                    }
                    {
                        resources && resources?.map((_elements, _index) => (
                            <Route key={_elements?.resource_slug + "_" + _index} path={_elements?.resource_slug} element={<DynamicPage {..._elements} permissions={permissions?.resources ? _.find(permissions?.resources, _item => _.has(_item, _elements?.resource_name)) : {}} attributes={permissions?.policy_schema && _.has(permissions?.policy_schema, _elements?.resource_name) ? permissions?.policy_schema?.[_elements?.resource_name]?.attributes : []} elemKey={_elements?.resource_name} isAdmin={checkAdmin} />} />
                        ))
                    }
                    {
                        settingsRoutes && settingsRoutes?.map((_elements, _index) => (
                            <Route key={_elements?.path + "_" + _index} path={_elements?.path} element={_elements?.element} />
                        ))
                    }
                </Route>
                <Route path="*" element={<PageNotFound />} />
            </Switch> 
            <Footer />
        </>
    );
}

export default Routes