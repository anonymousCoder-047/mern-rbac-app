
import { useState } from 'react';

import PropTypes from 'prop-types';
import {
    Box,
    Tabs,
    Tab,
    Grid2 as Grid,
    FormGroup,
    Typography,
    Stack,
    Button,
    Alert,
    InputAdornment,
    IconButton,
    OutlinedInput,
} from "@mui/material"
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Navigate, useLocation, useNavigate, useParams } from 'react-router';
import { useEffect } from 'react';
import _ from 'lodash';

import { axiosPublic } from '../../../helper/axios';
import { endpoints } from '../../../Server/endpoints';

import { login } from "../../../store/Reducers/AuthReducer"
import { set_config } from "../../../store/Reducers/AppConfigReducer"
import { close_alert, show_alert } from "../../../store/Reducers/LogErrorsReducer"

// context states
import useAuth from '../../../hooks/useAuth';
import useConfig from '../../../hooks/useConfig';
import useError from '../../../hooks/useError';

import { getErrorMessage } from "../../../constant/general_errors";

function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
      </div>
    );
}
  
CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};
  
function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

  
const ResetPassword = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { token:resetToken } = useParams();

    const { show, severity, message, dispatch:dispatchError } = useError();
    const { password_reset, dispatch:dispatchConfig } = useConfig();
    const { token, dispatch } = useAuth();

    const { Auth } = endpoints;

    const [value, setValue] = useState(0);
    const [formData, setFormData] = useState({
        password: "",
        token: "",
        confirmPassword: "",
    });
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    
    const handleShowPassword = () => setShowPassword(!showPassword);
    
    const handleFormChange = (event) => {
        const { name:key, value } = event.target;
        
        setFormData({
            ...formData,
            [key]: value
        });
    }
    
    const resetPassword = async () => {
        try {
            const { status, data } = await axiosPublic.post(Auth.resetPassword, {
                token: formData.token ?? resetToken,
                password: formData.password,
            });

            if(status == '200' && data) {
                dispatch(login({ 
                    token: data?.data?.token, 
                    email: data?.data?.email, 
                }));  
                // dispatchConfig(set_config({   
                //     currentUsername: data?.data?.username, 
                //     currentUserId: data?.data?._id, 
                //     profileId: data?.data?.profile?._id ?? data?.data?.profileId,
                //     permissions: data?.data?.profile?.permissions,
                //     onboarding_completed: data?.data?.profile?.onboarding?.onboarding_completed,
                //     currentUserRole: data?.data?.currentUserRole,
                //     currentUserClearance: data?.data?.currentUserClearance,
                // }));

                if(data?.data?.profile?.onboarding?.onboarding_completed != "completed") navigate('/onboarding', { replace: true });
                else navigate('/dashboard');
            } 
        } catch(error) {
            dispatchError(show_alert({ show: true, severity: "error", message: getErrorMessage(error) }));
        }
    }

    const renderRedirect = () => {
        dispatchError(show_alert({ show: true, severity: "error", message: "Access denied" }));

        return <Navigate to='/' replace />
    }

    useEffect(() => {
        if(resetToken) {
            setFormData({ ...formData, token: resetToken })
        }
    }, [])

    return (
        <>
            {
                !password_reset ?
                <>
                    { !token ? (<Grid container spacing={2} sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        margin: "auto",
                        height: "100vh",
                        p: 2
                    }}>
                        <Grid size={4}></Grid>
                        <Grid size={{ xs: 12, sm: 12, md: 4 }}>
                            <Box sx={{ width: '100%' }}>
                                {
                                    show ?
                                    <>
                                        <Alert severity={severity} onClose={() => dispatchError(close_alert({ show: false }))}>{message}</Alert>
                                    </>
                                    : ""
                                }
                                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                                        <Tab label="Reset Password" {...a11yProps(0)} />
                                    </Tabs>
                                </Box>
                                <CustomTabPanel value={value} index={0}>
                                    <Typography variant="subtitle1" gutterBottom>
                                        Enter your password and Confirm Password.
                                    </Typography>
                                    <FormGroup  sx={{ mb: 4 }}>
                                        <OutlinedInput
                                            fullWidth
                                            value={formData.password}
                                            placeholder='ex: *******'
                                            name='password'
                                            size='medium'
                                            onChange={handleFormChange}
                                            type={showPassword ? 'text' : 'password'}
                                            endAdornment={
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        aria-label={
                                                            showPassword ? 'hide the password' : 'display the password'
                                                        }
                                                        onClick={handleShowPassword}
                                                        edge="end"
                                                    >
                                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                                    </IconButton>
                                                </InputAdornment>
                                            }
                                        />
                                    </FormGroup>
                                    <FormGroup  sx={{ mb: 4 }}>
                                        <OutlinedInput
                                            fullWidth
                                            value={formData.confirmPassword}
                                            placeholder='ex: *******'
                                            name='confirmPassword'
                                            size='medium'
                                            onChange={handleFormChange}
                                            type={showPassword ? 'text' : 'password'}
                                            endAdornment={
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        aria-label={
                                                            showPassword ? 'hide the password' : 'display the password'
                                                        }
                                                        onClick={handleShowPassword}
                                                        edge="end"
                                                    >
                                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                                    </IconButton>
                                                </InputAdornment>
                                            }
                                        />
                                    </FormGroup>
                                    <Stack direction="row" spacing={2}>
                                        <Button 
                                            variant="contained" 
                                            color="primary" 
                                            fullWidth
                                            size='large'
                                            onClick={resetPassword}
                                        >Reset Password</Button>
                                    </Stack>
                                </CustomTabPanel>
                            </Box>
                        </Grid>
                        <Grid size={4}></Grid>
                    </Grid>)
                    
                    : <Navigate to={"/dashboard"} />
                    }
                </>
                : renderRedirect
            }
        </>
    );
}

export default ResetPassword;