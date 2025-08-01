
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
} from "@mui/material"

import ModeEditIcon from '@mui/icons-material/ModeEdit';
import SaveIcon from '@mui/icons-material/Save';
import PropTypes from 'prop-types';
import _ from "lodash"

import { endpoints } from "../../../Server/endpoints";
import useProtectedRoutes from '../../../hooks/useProtectedRoute';
import { axiosPrivate } from '../../../helper/axios';

import { checkPermissions } from '../../../helper/checkPermissions';

import useAuth from "../../../hooks/useAuth";
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

const Role = () => {
    const { token } = useAuth();
    const config = useConfig();
    const { dispatch } = useError();
    const authenticatedServer = useProtectedRoutes();

    const [anchorEl, setAnchorEl] = useState(null);
    const menuOpen = Boolean(anchorEl);
    const [value] = useState(0);
    const [rows, setRows] = useState([]);
    const [state, setState] = useState({
      right: false,
    });

    const [currentAction, setCurrentAction] = useState('read');
    const [hasPermission, setHasPermission] = useState(null);
    const [selectedRow, setSelectedRow] = useState({});
    const [formState, setFormState] = useState({
      edit: false,
      view: false,
      loading: false, 
      disabled: false,
      roleId: "",
      name: "",
      role_id: 0,
      clearance_level: 1,
    });

    const fetchRoleData = async () => {
      try {
        const { Role } = endpoints;
        const { status, data } = await axiosPrivate.get(Role.view);

        if(status == 200) {
          setRows(data?.data)
        } else dispatch(show_toast({ show: true, message: "No roles found.", severity: "warning" }));
      } catch(error) {
        dispatch(show_toast({ show: true, message: getErrorMessage(error), severity: "error" }));
      }
    }

    useEffect(() => {
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
      if(_val) setSelectedRow({ ...selectedRow, ..._val, roleId: _val?._id });
    };

    const handleClose = async (e, _action="") => {
      setAnchorEl(null);

      if(_action == 'edit') {
        setFormState({
          ...formState, 
          edit: true,
          name: selectedRow?.name,
          role_id: selectedRow?.role_id,
          clearance_level: selectedRow?.clearance_level,
          roleId: selectedRow?.roleId,
        });
        setState({ ...state, right: true });
        setCurrentAction('update');
      } else if(_action == 'view') {
        setFormState({
          ...formState, 
          edit: false,
          view: true,
          name: selectedRow?.name,
          role_id: selectedRow?.role_id,
          clearance_level: selectedRow?.clearance_level,
          roleId: selectedRow?.roleId,
        });
        setState({ ...state, right: true });
        setCurrentAction('read');
      } else if(_action == 'delete') {
        const { Role } = endpoints;
        const { data } = await authenticatedServer.post(Role.delete, { id: selectedRow?.roleId });

        if(data) dispatch(show_toast({ show: true, message: "role deleted successfully ", severity: "success" }));
        setState({ ...state, right: false });
        setCurrentAction('delete');
        fetchRoleData();
      } else setCurrentAction('write');
    };

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
  
        const { Role } = endpoints;
  
        if(validateForm(formState?.errors)) {
          if(!formState?.edit) {
            let _formData = { ...formState };
            const { status, data } = await authenticatedServer.post(Role.create, _.pick(_formData, ['name', 'role_id', 'clearance_level']));
            if(status == 200) _formData = { ..._formData, roleId: data?.data?._id, loading: false, disabled: false };
            else console.log("cannot create role at this moment");
            setFormState(_formData);
            await fetchRoleData();
          } else {
            const { data } = await axiosPrivate.patch(Role.patch + '/' + formState?.roleId, _.pick(formState, ['name', 'role_id', 'clearance_level']))
            
            if(data) {
              await fetchRoleData();
            } else console.log("failed to update role at the moment.");
          }
        } else {
          console.log("form validation error!!!");
          setFormState({ ...formState, loading: false, disabled: false });
          dispatch(show_toast({ show: true, message: "Please fill all the required fields.", severity: "warning" }));
        }
      } catch(err) {
        console.log("Error E: ", err);
        setFormState({ ...formState, loading: false, disabled: false });
        setState({ ...state, right: false });
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
      </Menu>
      </>
    );

    const columns = [
      { field: 'name', 
        headerName: 'Role Name', 
        width: 230, 
        editable: false 
      },
      {
        field: 'role_id',
        headerName: 'Role Id',
        type: 'number',
        align: 'left',
        headerAlign: 'left',
        editable: false,
        width: 300, 
      },
      {
        field: 'clearance_level',
        headerName: 'Clearance Level',
        type: 'number',
        align: 'left',
        headerAlign: 'left',
        editable: false,
        width: 150, 
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
                  Import Role
                </Button> */}
                <Button variant='contained' onClick={() => setState({ ...state, right: true })}>
                  Create Role
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
                          <Tab label="Role" {...a11yProps(0)} />
                        </Tabs>
                      </Box>
                      <CustomTabPanel value={value} index={0}>
                        <FormGroup>
                          <Box sx={{ p: 1 }}>
                            <InputLabel>
                              <Typography>Role Name</Typography>
                            </InputLabel>
                            <TextField 
                              required
                              type='text'
                              name='name'
                              fullWidth
                              value={formState?.name}
                              onChange={handleInputChange}
                              onBlur={handleInputBlur}
                              error={formState?.errors?.name ? true : false}
                              helpertext="true"
                              helperText={formState?.errors?.name ? "Role name is required" : false}
                              placeholder='ex: nurses'
                              disabled={formState?.disabled}
                            />
                          </Box>
                          <Box sx={{ p: 1 }}>
                            <InputLabel>
                              <Typography>Role Id</Typography>
                            </InputLabel>
                            <TextField 
                              required
                              type='number'
                              name='role_id'
                              fullWidth
                              value={formState?.role_id}
                              onChange={handleInputChange}
                              onBlur={handleInputBlur}
                              error={formState?.errors?.role_id ? true : false}
                              helpertext="true"
                              helperText={formState?.errors?.role_id ? "Role Id is required" : false}
                              placeholder='ex: 1'
                              disabled={formState?.disabled}
                            />
                          </Box>
                          <Box sx={{ p: 1 }}>
                            <InputLabel>
                              <Typography>Clearance Level</Typography>
                            </InputLabel>
                            <TextField 
                              required
                              type='number'
                              name='clearance_level'
                              fullWidth
                              value={formState?.clearance_level}
                              onChange={handleInputChange}
                              onBlur={handleInputBlur}
                              error={formState?.errors?.clearance_level ? true : false}
                              helpertext="true"
                              helperText={formState?.errors?.clearance_level ? "Clearance Level is required" : false}
                              placeholder='ex: 1'
                              disabled={formState?.disabled}
                            />
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

export default Role;