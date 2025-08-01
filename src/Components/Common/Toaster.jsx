
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { close_alert, close_toast } from "../../store/Reducers/LogErrorsReducer";
import useError from '../../hooks/useError';

export default function Toaster({ position='bottom-right' }) {
  const [ vertical, horizontal ] = position.split('-')
  const error = useError();
  const { show, severity, message, variant, showToast, dispatch } = error

  const handleClose = () => {
    if(!showToast) dispatch(close_alert({ show: false }));
    else dispatch(close_toast({ showToast: false }));
  }

  return (
    <div>
      <Snackbar 
        anchorOrigin={{ vertical: vertical, horizontal: horizontal }}
        open={showToast ? showToast : show} 
        autoHideDuration={5000} 
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity={severity}
          variant={variant}
          sx={{ width: '100%' }}
        >
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
}
