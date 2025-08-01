
import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';

import { show_toast } from "../../store/Reducers/LogErrorsReducer"
import { logout } from "../../store/Reducers/AuthReducer"
import { set_theme_by_key } from "../../store/Reducers/ThemeReducer"
import { useNavigate } from 'react-router';

import { getErrorMessage } from "../../constant/general_errors";
import { axiosPublic } from '../../helper/axios';
import { endpoints } from '../../Server/endpoints';
import useAuth from '../../hooks/useAuth';
import useConfig from '../../hooks/useConfig';
import useTheme from '../../hooks/useTheme';
import useError from '../../hooks/useError';

const Header = () => {  
    const navigate = useNavigate();
    const { token, dispatch:dispatchAuth } = useAuth();
    const { dispatch:dispatchError } = useError();
    const { toggleSidebar, dispatch } = useTheme();
    const { currentUsername, currentUserEmail } = useConfig();

    const [anchorEl, setAnchorEl] = React.useState(null);
  
    const handleMenu = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };

    const handleLogout = async () => {
        try {
            const { status } = await axiosPublic.post(endpoints.Auth.logout);

            if(status == '200') {
              dispatchAuth(logout());
              navigate('/');
            } 
        } catch(error) {
            dispatchError(show_toast({ show: true, severity: 'error', message: getErrorMessage(error) }));
        }
    }

    const handleClick = () => dispatch(set_theme_by_key({ key: 'toggleSidebar', value: !toggleSidebar }));
  
    return (
      <Box sx={{ flexGrow: 1 }}>
        { token && (<AppBar position="static" elevation={0} sx={{ height: "70px" }}>
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={handleClick}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              THROMBOLINK
            </Typography>
            
            <div>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignContent: 'center',
              }}
              >
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignContent: 'center',
                  m: 1
                }}
              >
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  color="inherit"
                  sx={{ p: 0 }}
                >
                  <Typography variant='body1'>Welcome, {currentUsername}</Typography>
                  <AccountCircle sx={{ mt: 0.5, ml: 1 }} />
                </IconButton>
                <Typography variant='subtitle2'>{currentUserEmail}</Typography>
              </Box>
            </Box>
            <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
            </div>
          </Toolbar>
        </AppBar>)}
      </Box>
    );
}

export default Header;