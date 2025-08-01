
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { login } from "../store/Reducers/AuthReducer"
import { set_config } from "../store/Reducers/AppConfigReducer"
import { show_toast } from "../store/Reducers/LogErrorsReducer"
import useRefreshToken from './useRefreshToken';

import { getErrorMessage } from "../constant/general_errors";

export default function useAuthInitializer() {
    const dispatch = useDispatch();
    const refresh_token = useRefreshToken();

  useEffect(() => { 
    const refresh = async () => {
      try {
        const newAccessToken = await refresh_token()

        dispatch(login({ token: newAccessToken?.token }));
        dispatch(set_config({ ...newAccessToken }));
      } catch (err) {
        dispatch(show_toast({ show: true, severity: 'error', message: getErrorMessage(err) }))
      }
    };

    refresh();
  }, []);
}