
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
import { Navigate, useLocation, useNavigate, Link } from 'react-router';

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

  
const Login = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const { show, severity, message, dispatch:dispatchError } = useError();
    const { dispatch:dispatchConfig } = useConfig();
    const { token, dispatch } = useAuth();

    const { Auth } = endpoints;

    const [value, setValue] = useState(0);
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        password: "",
        email: "",
    });

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
    
    const LoginUser = async () => {
        try {
            const { status, data } = await axiosPublic.post(Auth.login, {
                email: formData.email,
                password: formData.password
            });

            if(status == 200 && data) {
                dispatch(login({
                    email: formData?.email, 
                    token: data?.data?.token, 
                }));

                dispatchConfig(set_config({ 
                    ..._.omit(data?.data, ['token']),
                    patient_required: data?.data?.patient_required,
                    encounter_required: data?.data?.encounter_required,
                    profile: data?.data?.profile,
                    permissions: data?.data?.permissions,
                    group: data?.data?.group,
                    onboarding: data?.data?.onboarding,
                    currentUserEmail: data?.data?.currentUserEmail,
                    currentUsername: data?.data?.currentUsername,
                    currentUserRole: data?.data?.currentUserRole,
                    currentUserClearance: data?.data?.currentUserClearance,
                }));

                navigate('/dashboard');
            } else navigate('/login');
        } catch(error) {
            dispatchError(show_alert({ show: true, severity: "error", message: getErrorMessage(error) }));
        }
    }

    return (
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
                                <Tab label="Login" {...a11yProps(0)} />
                            </Tabs>
                        </Box>
                        <CustomTabPanel value={value} index={0}>
                            <Typography variant="subtitle1" gutterBottom>
                                Enter your email and password
                            </Typography>
                            <FormGroup sx={{ mb: 2 }}>
                                <OutlinedInput 
                                    variant='outlined'
                                    fullWidth
                                    value={formData.email}
                                    placeholder='ex: Jhon Doe'
                                    type='email'
                                    name='email'
                                    size='medium'
                                    onChange={handleFormChange}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                edge="end"
                                            >
                                                <AlternateEmailIcon />
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                />
                            </FormGroup>
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
                            <FormGroup sx={{ mb: 2, mt: '-20px', textAlign: 'right' }}>
                                <Link to={'/forgot-password'} style={{ textDecoration: "none" }}>Forgot Password</Link>
                            </FormGroup>
                            <Stack direction="row" spacing={2}>
                                <Button 
                                    variant="contained" 
                                    color="primary" 
                                    fullWidth
                                    size='large'
                                    onClick={LoginUser}
                                >Login</Button>
                            </Stack>
                        </CustomTabPanel>
                    </Box>
                </Grid>
                <Grid size={4}></Grid>
            </Grid>)
            
            : <Navigate to={"/dashboard"} />
            }
        </>
    );
}

export default Login;