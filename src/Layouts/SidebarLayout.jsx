
import React from "react";

import {
    Grid2 as Grid,
} from "@mui/material"
import { Outlet } from 'react-router';

import Sidebar from "../Components/Sidebar/Sidebar";
import useTheme from "../hooks/useTheme";

const SidebarLayout = () => {
    const { toggleSidebar, toggleMiniSidebar } = useTheme();

    return (
        <>
            <Grid container spacing={0}>
                <Grid size={(toggleSidebar != toggleMiniSidebar) ? 1 : 2}>
                    <Sidebar />
                </Grid>
                <Grid size={(toggleSidebar != toggleMiniSidebar) ? 11 : 10}>
                    <Outlet />
                </Grid>
            </Grid>
        </>
    )
}

export default SidebarLayout;