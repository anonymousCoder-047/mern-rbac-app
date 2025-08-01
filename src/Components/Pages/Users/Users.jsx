
import { useEffect, useState } from 'react';

import { DataGrid } from '@mui/x-data-grid';
import {
    Box,
    FormGroup,
    Button,
    Grid2 as Grid,
    InputLabel,
    Modal,
    Stack,
    Tab,
    Tabs,
    TextField,
    Typography,
    MenuItem,
    Menu,
    InputAdornment,
    IconButton,
    OutlinedInput,
} from "@mui/material"

import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import SaveIcon from '@mui/icons-material/Save';
import PropTypes from 'prop-types';
import moment from "moment";
import _ from "lodash"

import { endpoints } from "../../../Server/endpoints";
import useProtectedRoutes from '../../../hooks/useProtectedRoute';
import { axiosPrivate } from '../../../helper/axios';
import { checkPermissions } from '../../../helper/checkPermissions';

import useConfig from "../../../hooks/useConfig";
import useError from "../../../hooks/useError";

import { show_toast } from "../../../store/Reducers/LogErrorsReducer";
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

const modalStyles = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90vw',
  maxWidth: 750,
  bgcolor: 'background.paper',
  borderRadius: '15px',
  boxShadow: 24,
  p: 4,
};

const Users = () => {
    const authenticatedServer = useProtectedRoutes();
    const config = useConfig();
    const { dispatch } = useError();

    const [anchorEl, setAnchorEl] = useState(null);
    const menuOpen = Boolean(anchorEl);
    const [value] = useState(0);
    const [roles, setRoles] = useState([]);
    const [rows, setRows] = useState([]);
    const [state, setState] = useState({
      right: false,
    });

    const [currentAction, setCurrentAction] = useState('read');
    const [hasPermission, setHasPermission] = useState(null);
    const [selectedRow, setSelectedRow] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [formState, setFormState] = useState({
      edit: false,
      view: false,
      loading: false, 
      disabled: false,
      role: "",
      username: "",
      userId: "",
      email: "",
      password: "",
    });

    const fetchUsersData = async () => {
      try {
        const { User } = endpoints;
        const { status, data } = await axiosPrivate.get(User.view);

        if(status == 200) {
          setRows(data?.data)
        } else dispatch(show_toast({ show: true, message: "No Users found.", severity: "warning" }));
      } catch(error) {
        dispatch(show_toast({ show: true, message: getErrorMessage(error), severity: "error" }));
      }
    }
    
    const fetchRoleData = async () => {
      const { Role } = endpoints;
      const { status, data } = await axiosPrivate.get(Role.view);
      
      if(status == 200) setRoles(data?.data);
      else dispatch(show_toast({ show: true, message: "No Roles found.", severity: "warning" }));
    }

    useEffect(() => {
      fetchUsersData();
      fetchRoleData();
    }, []);
    
    useEffect(() => {
      const _permissions = async () => {
        const _hasPermission = await checkPermissions(currentAction, config);
        setHasPermission(_hasPermission);
      }

      _permissions();
    }, [currentAction]);

    const handleClick = (event, _val={}) => {
      setAnchorEl(event.currentTarget);
      if(_val) setSelectedRow({ ...selectedRow, ..._val, userId: _val?._id, role: _val?.role });
    };

    const toggleShowPassword = () => setShowPassword(!showPassword);

    const handleClose = async (e, _action="") => {
      setAnchorEl(null);

      if(_action == 'edit') {
        setFormState({
          ...formState, 
          edit: true,
          username: selectedRow?.username,
          email: selectedRow?.email,
          role: selectedRow?.role,
          userId: selectedRow?.userId,
        });
        setState({ ...state, right: true });
        setCurrentAction('update');
      } else if(_action == 'view') {
        setFormState({
          ...formState, 
          edit: false,
          view: true,
          username: selectedRow?.username,
          email: selectedRow?.email,
          role: selectedRow?.role,
          userId: selectedRow?.userId,
        });
        setState({ ...state, right: true });
        setCurrentAction('read');
      } else if(_action == 'delete') {
        const { User } = endpoints;
        const { data } = await authenticatedServer.post(User.delete, { id: selectedRow?.userId });

        if(data) dispatch(show_toast({ show: true, message: "User deleted successfully ", severity: "success" }));
        setState({ ...state, right: false });
        setCurrentAction('delete');
        fetchUsersData();
      } else if(_action == 'link') {
        const { Auth } = endpoints;
        const { data } = await authenticatedServer.post(Auth.forgetPassword, { email: selectedRow?.email });

        if(data) dispatch(show_toast({ show: true, message: "Reset password link sent to " + selectedRow?.email, severity: "success" }));
      } else setCurrentAction('write');
    };

    const generatePassword = () => {
      const _password = Math.random().toString(36).slice(-8);
      setFormState({ ...formState, password: _password });
    }

    const handleInputChange = (e) => {
      const { name: key, value } = e.target;
      setFormState({ ...formState, [key]: value, errors: { ...formState?.errors, [key]: false, disabled: false }});
    }

    const handleInputBlur = (e) => {
      const { name: key, value } = e.target;
      setFormState({ ...formState, errors: { ...formState?.errors, [key]: value == "" ? true : false, disabled: false }});
    }

    const validateForm = (_formState) => {
      setFormState({ ...formState, disabled: true });
      
      if(formState?.errors && Object.values(formState?.errors).every((_flag) => _flag == false)) {
        setFormState({ ...formState, loading: false, disabled: true });
        
        return true;
      } else {
        setFormState({ ...formState, loading: false, disabled: false });
        
        return false;
      }
    };

    const handleFormSubmit = async (e) => {
      try {
        setFormState({ ...formState, loading: true, disabled: true });
  
        e.preventDefault();
        e.stopPropagation();
  
        const { User } = endpoints;
  
        if(validateForm(formState?.errors)) {
          if(!formState?.edit) {
            const { data } = formState?.userId ? await axiosPrivate.patch(User.update + '/' + formState?.userId, _.pick(formState, ['username', 'email', 'password', 'role'])) : await axiosPrivate.post(User.create, _.pick(formState, ['username', 'email', 'password', 'role']))
            
            if(data) {
              await fetchUsersData();
            } else dispatch(show_toast({ show: true, message: "Unable to create user.", severity: "warning" }));
          }
        } else {
          setFormState({ ...formState, loading: false, disabled: false });
          dispatch(show_toast({ show: true, message: "Please fill all the required fields.", severity: "warning" }));
        }
      } catch(err) {
        setFormState({ ...formState, loading: false, disabled: false });
        setState({ ...state, right: false });
        dispatch(show_toast({ show: true, message: getErrorMessage(err), severity: "error" }));
      }
      setState({ ...state, right: false });
    }

    const toggleDrawer = (anchor, open) => (event) => {
      if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
        return;
      }
  
      setState({ ...state, [anchor]: open });
    };

    const RenderMenu = (row_data) => (
      <>
        <Button
          id={"demo-positioned-button" + row_data?.id}
          aria-controls={menuOpen ? 'demo-positioned-menu' + row_data?.id : undefined}
          aria-haspopup="true"
          aria-expanded={menuOpen ? 'true' : undefined}
          onClick={(e) => handleClick(e, row_data)}
        >
          <ModeEditIcon sx={{ fontSize: "12" }} />
        </Button>
        <Menu
          id={"demo-positioned-menu" + row_data?.id}
          aria-labelledby={"demo-positioned-button" + row_data?.id}
          anchorEl={anchorEl}
          open={menuOpen}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          elevation={0}
        >
          {hasPermission && (<MenuItem onClick={(e) => handleClose(e, 'view')}>View</MenuItem>)}
          {hasPermission && (<MenuItem onClick={(e) => handleClose(e, 'edit')}>Edit</MenuItem>)}
          {hasPermission && (<MenuItem onClick={(e) => handleClose(e, 'delete')}>Delete</MenuItem>)}
          {hasPermission && (<MenuItem onClick={(e) => handleClose(e, 'link')}>Send Reset Password Link</MenuItem>)}
      </Menu>
      </>
    );

    const columns = [
      { field: 'username', 
        headerName: 'Username', 
        width: 230, 
        editable: false 
      },
      {
        field: 'email',
        headerName: 'Email',
        type: 'email',
        align: 'left',
        headerAlign: 'left',
        editable: false,
        width: 300, 
      },
      {
        field: 'date_created',
        headerName: 'Date Created',
        type: 'date',
        width: 180,
        editable: false,
        valueFormatter: (date_created ) => moment(date_created).format('YYYY-MM-D HH:m:s'),
      },
      {
        field: 'action',
        headerName: 'Action',
        type: 'text',
        width: 180,
        editable: false,
        renderCell: (param) => RenderMenu(param?.row)
      },
    ];

    return (
      <>
        <Grid container spacing={2} sx={{ p: 2, m: 2 }}>
          { hasPermission && (<Grid size={12}>
            <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "flex-end" }}>
              <Stack direction={'row'} gap={2}>
                {/* <Button variant='outlined'>
                  Import Users
                </Button> */}
                <Button variant='contained' onClick={() => setState({ ...state, right: true })}>
                  Create User
                </Button>
              </Stack>
            </Box>
          </Grid>)}
          <Grid size={12}>
            <Box sx={{ width: '100%' }}>
              <DataGrid editMode="row" rows={rows} columns={columns} />
          
              {
                state.right && (
                  <Modal
                    open={state.right}
                    onClose={toggleDrawer('right', false)}
                  >
                    <Box sx={{ width: '100%', ...modalStyles }}>
                      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs value={value} aria-label="basic tabs example">
                          <Tab label="Users" {...a11yProps(0)} />
                        </Tabs>
                      </Box>
                      <CustomTabPanel value={value} index={0}>
                        <FormGroup>
                          <Box sx={{ p: 1 }}>
                            <InputLabel>
                              <Typography>User Name</Typography>
                            </InputLabel>
                            <TextField 
                              required
                              type='text'
                              name='username'
                              fullWidth
                              value={formState?.username}
                              onChange={handleInputChange}
                              onBlur={handleInputBlur}
                              error={formState?.errors?.username ? true : false}
                              helpertext="true"
                              helperText={formState?.errors?.username ? "User name is required" : false}
                              placeholder='ex: jhondoe'
                              disabled={formState?.disabled}
                            />
                          </Box>
                          <Box sx={{ p: 1 }}>
                            <InputLabel>
                              <Typography>Email</Typography>
                            </InputLabel>
                            <TextField 
                              required
                              type='email'
                              name='email'
                              fullWidth
                              value={formState?.email}
                              onChange={handleInputChange}
                              onBlur={handleInputBlur}
                              error={formState?.errors?.email ? true : false}
                              helpertext="true"
                              helperText={formState?.errors?.email ? "Email is required" : false}
                              placeholder='ex: jhondoe@example.com'
                              disabled={formState?.disabled}
                            />
                          </Box>
                          <Box sx={{ p: 1 }}>
                            <InputLabel>
                              <Typography>Password</Typography>
                            </InputLabel>
                            <OutlinedInput 
                              variant='outlined'
                              fullWidth
                              type={showPassword ? 'text' : 'password'}
                              value={formState?.password}
                              placeholder='ex: *****'
                              name='password'
                              size='medium'
                              endAdornment={
                                <InputAdornment position="end">
                                  <IconButton
                                      onClick={generatePassword}
                                      edge="end"
                                      sx={{ mr: 1 }}
                                  >
                                      <AutoFixHighIcon />
                                  </IconButton>
                                  <IconButton
                                      aria-label={showPassword ? 'hide the password' : 'display the password'}
                                      onClick={toggleShowPassword}
                                      edge="end"
                                  >
                                      {showPassword ? <VisibilityOffIcon /> : <RemoveRedEyeIcon />}
                                  </IconButton>
                              </InputAdornment>
                              }
                              onChange={handleInputChange}
                          />
                          </Box>
                          <Box sx={{ p: 1 }}>
                            <InputLabel>
                              <Typography>Role</Typography>
                            </InputLabel>
                            <TextField 
                              required
                              select
                              name='role'
                              fullWidth
                              value={formState?.role}
                              onChange={handleInputChange}
                              onBlur={handleInputBlur}
                              error={formState?.errors?.role ? true : false}
                              helpertext="true"
                              helperText={formState?.errors?.role ? "role is required" : false}
                              disabled={formState?.disabled}
                            >
                              {
                                roles && (
                                  roles?.map((options) => (
                                    <MenuItem key={options?.name + "_-_" + options?.id} value={options?._id}>
                                      {options?.name}
                                    </MenuItem>
                                  ))
                                )
                              }
                            </TextField>
                          </Box>
                        </FormGroup>
                        <Stack direction={"row"} gap={2}>
                          <Box sx={{ p: 1 }}>
                            <Button
                              fullWidth
                              variant="contained"
                              loading={formState?.loading} 
                              onClick={handleFormSubmit}
                              loadingPosition="start"
                              endIcon={<SaveIcon />}
                            >
                              { formState?.edit ? 'Update' : 'Submit' }
                            </Button>
                          </Box>
                        </Stack>
                      </CustomTabPanel>
                    </Box>
                  </Modal>
                )
              }
            </Box>
          </Grid>
        </Grid>
      </>
    );
}

export default Users;