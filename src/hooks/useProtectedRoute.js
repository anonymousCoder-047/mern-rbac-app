
import { axiosPrivate } from "../helper/axios";
import { useEffect } from "react";
import useRefreshToken from "./useRefreshToken";

import useAuth from "./useAuth";
import useConfig from "./useConfig";
import { set_config } from "../store/Reducers/AppConfigReducer";
import { login } from "../store/Reducers/AuthReducer";

const useProtectedRoutes = () => {
    const refresh = useRefreshToken();
    const { token, dispatch } = useAuth();
    const { dispatch:dispatchConfig } = useConfig();

    useEffect(() => {
        const requestIntercept = axiosPrivate.interceptors.request.use(
            config => {
                if (!config.headers['Authorization']) {
                    config.headers['Authorization'] = `Bearer ${token}`;
                }
                return config;
            }, (error) => Promise.reject(error)
        );
        
        const responseIntercept = axiosPrivate.interceptors.response.use(
            response => response,
            async (error) => {
                const prevRequest = error?.config;
                if (error?.response?.status === 401 && !prevRequest?.sent) {
                    prevRequest.sent = true;
                    const newAccessToken = await refresh();

                    dispatch(login({
                        email: newAccessToken?.currentUserEmail,
                        token: newAccessToken?.token,
                    }))

                    dispatchConfig(set_config({ 
                        patient_required: newAccessToken?.patient_required,
                        encounter_required: newAccessToken?.encounter_required,
                        profile: newAccessToken?.profile,
                        permissions: newAccessToken?.permissions,
                        group: newAccessToken?.group,
                        onboarding: newAccessToken?.onboarding,
                        currentUserEmail: newAccessToken?.currentUserEmail,
                        currentUsername: newAccessToken?.currentUsername,
                        currentUserRole: newAccessToken?.currentUserRole,
                        currentUserClearance: newAccessToken?.currentUserClearance,
                    }));
                    prevRequest.headers['Authorization'] = `Bearer ${newAccessToken?.token}`;
                    
                    return axiosPrivate(prevRequest);
                }
                
                return Promise.reject(error);
            }
        );

        return () => {
            axiosPrivate.interceptors.request.eject(requestIntercept);
            axiosPrivate.interceptors.response.eject(responseIntercept);
        }
    }, [token])

    return axiosPrivate;
}

export default useProtectedRoutes;