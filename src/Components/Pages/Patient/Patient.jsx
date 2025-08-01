
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
    Alert,
    Switch,
    Select,
    OutlinedInput,
    Chip,
} from "@mui/material"

import ModeEditIcon from '@mui/icons-material/ModeEdit';
import SaveIcon from '@mui/icons-material/Save';
import PropTypes from 'prop-types';
import _ from "lodash"

import { endpoints } from "../../../Server/endpoints";
import useProtectedRoutes from '../../../hooks/useProtectedRoute';

import useConfig from "../../../hooks/useConfig";
import useError from "../../../hooks/useError";

import { show_toast } from "../../../store/Reducers/LogErrorsReducer";
import { set_config } from "../../../store/Reducers/AppConfigReducer";
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

const Patient = ({ permissions, elemKey, isAdmin }) => {
    const authenticatedServer = useProtectedRoutes();

    const [anchorEl, setAnchorEl] = useState(null);
    const menuOpen = Boolean(anchorEl);
    const [value, setValue] = useState(0);
    const [rows, setRows] = useState([]);
    const [resources, setResources] = useState([]);
    const [currentAction, setCurrentAction] = useState('read');
    const [menuPermissions, setMenuPermissions] = useState({
      write: false,
      read: false,
      update: false,
      delete: false,
    })
    const [state, setState] = useState({
      right: false,
    });

    const { dispatch } = useConfig();
    const { dispatch:dispatchError } = useError();

    const [selectedRow, setSelectedRow] = useState({});
    const [formState, setFormState] = useState({
      edit: false,
      loading: false, 
      disabled: false,
      patient_id: "",
      patient_data: {},
      encounters: [],
      resources: [],
      patientId: "",
    });

    const fetchPatientData = async () => {
      try {
        const { Patient } = endpoints;
        const { status, data } = await authenticatedServer.get(Patient.view);

        if(status == 200) {
          setRows(data?.data)
        } else dispatchError(show_toast({ show: true, message: "No patient found.", severity: "warning" }));
      } catch(error) {
        dispatchError(show_toast({ show: true, message: getErrorMessage(error) , severity: "error" }));
      }
    }
    
    const fetchResourcesData = async () => {
      try {
        const { Resources } = endpoints;
        const { status, data } = await authenticatedServer.get(Resources.view);

        if(status == 200) {
          setResources(data?.data)
        } else dispatchError(show_toast({ show: true, message: "No Resources found.", severity: "warning" }));
      } catch(error) {
        dispatchError(show_toast({ show: true, message: getErrorMessage(error), severity: "error" }));
      }
    }

    useEffect(() => {
      fetchPatientData();
      fetchResourcesData();
    }, []);

    useEffect(() => {
      if(permissions?.[elemKey]?.[currentAction]) {
        setMenuPermissions({ ...menuPermissions, ...permissions?.[elemKey] });
      } else {
        setMenuPermissions({ ...menuPermissions, read: false, write: false, update: false, delete: false });
      }
    }, [currentAction]);

    const handleClick = (event, _val={}) => {
      setAnchorEl(event.currentTarget);
      if(_val) setSelectedRow({ ...selectedRow, ..._val, cdssId: _val?._id });
    };

    const handleClose = async (e, _action="") => {
      setAnchorEl(null);

      if(_action == 'edit') {
        setFormState({ 
          ...formState, 
          edit: true,
          patient_id: selectedRow?.patient_id,
          patient_data: selectedRow?.patient_data,
          encounters: selectedRow?.encounters,
          resources: selectedRow?.resources,
          patientId: selectedRow?._id,
        });
        setState({ ...state, right: true });
        setCurrentAction('update');
      } else if(_action == 'view') {
        setFormState({
          ...formState, 
          edit: false,
          view: true,
          patient_id: selectedRow?.patient_id,
          patient_data: selectedRow?.patient_data,
          encounters: selectedRow?.encounters,
          resources: selectedRow?.resources,
          patientId: selectedRow?._id,
        });
        setState({ ...state, right: true });
        setCurrentAction('read');
      } else if(_action == 'delete') {
        const { Patient } = endpoints;
        const { data } = await authenticatedServer.post(Patient.delete, { id: selectedRow?.patientId });

        if(data) dispatchError(show_toast({ show: true, message: "patient deleted successfully ", severity: "success" }));
        setState({ ...state, right: false });
        setCurrentAction('delete');
        fetchPatientData();
      } else setCurrentAction('write');
    };

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

    const handleInputChange = (e) => {
      const { name: key, value } = e.target;
      setFormState({ ...formState, [key]: value, errors: { ...formState?.errors, [key]: false, disabled: false }});
    }

    const handleInputBlur = (e) => {
      const { name: key, value } = e.target;
      setFormState({ ...formState, errors: { ...formState?.errors, [key]: key =='action' ? value?.length == 0 ? true : false : value == "" ? true : false, disabled: false }});
    }

    const validateForm = (_formState) => {
      setFormState({ ...formState, disabled: true });
      
      if(formState?.errors && Object.values(formState?.errors).every((_flag) => _flag == false)) {
        dispatch(set_config({ isLoading: false }));
        setFormState({ ...formState, loading: false, disabled: true });
        
        return true;
      } else {
        dispatch(set_config({ isLoading: false }));
        setFormState({ ...formState, loading: false, disabled: false });
        
        return false;
      }
    };

    const handleFormSubmit = async (e) => {
      try {
        dispatch(set_config({ isLoading: true }));
        setFormState({ ...formState, loading: true, disabled: true });
  
        e.preventDefault();
        e.stopPropagation();
  
        const { Patient } = endpoints;
  
        if(validateForm(formState?.errors)) {
          if(formState?.patientId == "") {
            let _formData = { ...formState };
            const { status, data } = await authenticatedServer.post(Patient.create, _.pick(_formData, ['patient_id', 'resources']));
            
            if(status == 200) _formData = { ..._formData, patientId: data?.data?._id, loading: false, disabled: false };
            else dispatchError(show_toast({ show: true, message: "Failed to save Patients.", severity: "warning" }));

            setFormState(_formData);
          } else {
            const _formState = { ...formState }
            const { status } = await authenticatedServer.patch(Patient.patch + '/' + _formState?.patientId, _.pick(_formState, ['patient_id', 'resources']))
            
            if(status == 200) dispatchError(show_toast({ show: true, message: "Update successfull.", severity: "success" }));
            else dispatchError(show_toast({ show: true, message: "Failed to update.", severity: "warning" }));
          }
        } else {
          dispatch(set_config({ isLoading: false }));
          setFormState({ ...formState, loading: false, disabled: false });
          dispatchError(show_toast({ show: true, message: "Please fill all the required fields.", severity: "warning" }));
        }
      } catch(err) {
        dispatchError(show_toast({ show: true, message: getErrorMessage(err), severity: "error" }));
        dispatch(set_config({ isLoading: false }));
        setFormState({ ...formState, loading: false, disabled: false });
      }
    }

    const handleNext = (e, _idx) => {
      handleChange(e, _idx);
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
          { (isAdmin || menuPermissions.read) && (<MenuItem onClick={(e) => handleClose(e, 'view')}>View</MenuItem>)}
          { (isAdmin || menuPermissions.update) && (<MenuItem onClick={(e) => handleClose(e, 'edit')}>Edit</MenuItem>)}
          { (isAdmin || menuPermissions.delete) && (<MenuItem onClick={(e) => handleClose(e, 'delete')}>Delete</MenuItem>)}
      </Menu>
      </>
    );

    const columns = [
      {
        field: 'patient_id', 
        headerName: 'Patient Id', 
        width: 255, 
        editable: false 
      },
      {
        field: 'encounters',
        headerName: 'Encounters',
        align: 'left',
        headerAlign: 'left',
        editable: false,
        width: 250, 
        renderCell: (param) => <Typography variant='body2'>{param?.row?.length}</Typography>
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
          { (isAdmin || menuPermissions?.write) && (<Grid size={12}>
            <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "flex-end" }}>
              <Stack direction={'row'} gap={2}>
                {/* <Button variant='outlined'>
                  Import CDSS
                </Button> */}
                <Button variant='contained' onClick={() => setState({ right: true })}>
                  Create Patient
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
                        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                          <Tab label="Patient details" {...a11yProps(0)} />
                        </Tabs>
                      </Box>
                      <CustomTabPanel value={value} index={0}>
                        <FormGroup>
                          <Box sx={{ p: 1 }}>
                            <InputLabel>
                              <Typography>Patient Id</Typography>
                            </InputLabel>
                            <TextField 
                              required
                              type='text'
                              name='patient_id'
                              fullWidth
                              value={formState?.patient_id}
                              onChange={handleInputChange}
                              onBlur={handleInputBlur}
                              error={formState?.errors?.patient_id ? true : false}
                              helpertext="true"
                              helperText={formState?.errors?.patient_id ? "Patient id is required" : false}
                              placeholder='cdss-nurse-phase01'
                              disabled={formState?.disabled}
                            />
                          </Box>
                          <Box>
                            <InputLabel>
                              <Typography>Resources</Typography>
                            </InputLabel>
                            <Select 
                              required
                              name='resources'
                              fullWidth
                              multiple
                              value={formState?.resources}
                              onChange={handleInputChange}
                              input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                                renderValue={(selected) => (
                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                        {selected?.map((value) => (
                                            <Chip key={value} label={resources?.find((x) => x?._id == value)?.resource_name} sx={{ backgroundColor: "#e5f6fd " }} />
                                        ))}
                                    </Box>
                                )}
                                onBlur={(value) => setFormState({ ...formState, errors: { ...formState?.errors, resources: formState?.resources?.length == 0 ? true : false, disabled: false }})}
                                error={formState?.errors?.resources ? true : false}
                                helpertext="true"
                                helperText={formState?.errors?.resources ? "Resources is required" : false}
                                disabled={formState?.disabled}
                              >
                              {
                                  resources && (
                                  resources?.map((options) => (
                                      <MenuItem key={options?.resource_name + "_resources_" + options?.resource_name + "-unique-" + Math.round(Math.random(1000), 2)} value={options?._id}>
                                          {options?.resource_name}
                                      </MenuItem>
                                  ))
                                  )
                              }
                            </Select>
                          </Box>
                        </FormGroup>
                        <Stack direction={"row"} gap={2}>
                          <Box sx={{ p: 1 }}>
                            <Button 
                              fullWidth
                              variant="outlined" 
                              onClick={(e) => handleNext(e, 1)} 
                              disabled={value == 0 ? true : false}
                            >
                              Back
                            </Button>
                          </Box>
                          <Box sx={{ p: 1 }}>
                            <Button
                              fullWidth
                              variant="contained" 
                              loading={formState?.loading} 
                              onClick={handleFormSubmit}
                              loadingPosition="start"
                              endIcon={<SaveIcon />}
                            >
                              Next
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

export default Patient;