import {
    Box,
    Typography,
} from "@mui/material"
import { useEffect } from "react";
import _ from "lodash";
import { useNavigate, useParams } from "react-router";

import { endpoints } from "../../../Server/endpoints";
import { axiosPublic } from "../../../helper/axios";

import { set_config } from "../../../store/Reducers/AppConfigReducer"
import { show_toast } from "../../../store/Reducers/LogErrorsReducer"

// context states
import useConfig from '../../../hooks/useConfig';
import useError from '../../../hooks/useError';

import { getErrorMessage } from "../../../constant/general_errors";

const AccountSetup = () => {
    const { token } = useParams();
    const navigate = useNavigate();
    
    const { dispatch } = useConfig();
    const { dispatchError } = useError();

    useEffect(() => {
        const { Onboarding } = endpoints;

        if(token) {
            const finishSetup = async () => {
                try {
                    const { status, data } = await axiosPublic.post(Onboarding['finish-setup'], { "token": token });
        
                    if(status == 200) {
                        dispatch(set_config({ profileId: data?.data?.profile?._id ?? data?.data?.profile }))
                        
                        navigate('/onboarding');
                    } else {
                        dispatchError(show_toast({ show: true, severity: 'warning', message: "Invalid Token / Token Expired" }));
                        navigate('/');
                    }
                } catch(ex) {                    
                    dispatchError(show_toast({ show: true, severity: 'error', message: getErrorMessage(ex) }));
                }
            }

            finishSetup();
        } else dispatchError(show_toast({ show: true, severity: 'warning', message: "Token missing" }));
    }, []);

    return (
        <>
            <Box gap={2} sx={{ m: 4, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                <Box>
                    <Typography variant="h4">
                        Setting up your account...
                    </Typography>
                </Box>
            </Box>
        </>
    )
}

export default AccountSetup;