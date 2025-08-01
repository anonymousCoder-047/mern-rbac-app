
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
    TextField,
} from "@mui/material"
import { Navigate, useNavigate } from 'react-router';
import _ from 'lodash';

import { axiosPublic } from '../../../helper/axios';
import { endpoints } from '../../../Server/endpoints';

import { close_alert, show_alert } from "../../../store/Reducers/LogErrorsReducer"

// context states
import useAuth from '../../../hooks/useAuth';
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

  
const ForgetPassword = () => {
    const navigate = useNavigate();

    const { show, severity, message, dispatch:dispatchError } = useError();
    const { token } = useAuth();

    const { Auth } = endpoints;

    const [value, setValue] = useState(0);
    const [formData, setFormData] = useState({
        email: ""
    });

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    
    const handleFormChange = (event) => {
        const { name:key, value } = event.target;
        
        setFormData({
            ...formData,
            [key]: value
        });
    }
    
    const forgetPassword = async () => {
        try {
            const { status } = await axiosPublic.post(Auth.forgetPassword, {
                email: formData.email,
            });

            if(status == '200') {
                dispatchError(show_alert({ show: true, severity: 'success', message: "Check your email" })); 
                navigate('/');
            } else dispatchError(show_alert({ show: true, severity: "warning", message: "Please try again." }))
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
                                <Tab label="Forgot Password" {...a11yProps(0)} />
                            </Tabs>
                        </Box>
                        <CustomTabPanel value={value} index={0}>
                            <Typography variant="subtitle1" gutterBottom>
                                Enter your email
                            </Typography>
                            <FormGroup sx={{ mb: 4 }}>
                                <TextField 
                                    variant='outlined'
                                    fullWidth
                                    label={
                                        <>
                                            <Typography gutterBottom>
                                                Email
                                            </Typography>
                                        </>
                                    }
                                    value={formData.email}
                                    placeholder='ex: jhondoe@example.com'
                                    type='email'
                                    name='email'
                                    size='medium'
                                    onChange={handleFormChange}
                                />
                            </FormGroup>
                            <Stack direction="row" spacing={2}>
                                <Button 
                                    variant="outlined" 
                                    fullWidth
                                    size='large'
                                    onClick={forgetPassword}
                                >Forget Password</Button>
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

export default ForgetPassword;