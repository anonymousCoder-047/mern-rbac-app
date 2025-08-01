
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

const CDSS = ({ permissions, elemKey, isAdmin }) => {
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

    const { currentUserRole, dispatch } = useConfig();
    const { dispatch:dispatchError } = useError();

    const [selectedRow, setSelectedRow] = useState({});
    const [formState, setFormState] = useState({
      edit: false,
      loading: false, 
      disabled: false,
      cdss_name: "",
      cdss_description: "",
      input_refs: "",
      output_refs: "",
      algorithm_version: "v1.0",
      metadata: {},
      cdssId: "",
      patient_required: false,
      encounter_required: false,
    });

    const fetchCDSSData = async () => {
      try {
        const { CDSS } = endpoints;
        const { status, data } = await authenticatedServer.get(CDSS.view);

        if(status == 200) {
          setRows(data?.data)
        } else dispatchError(show_toast({ show: true, message: "No CDSS found.", severity: "warning" }));
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
      fetchCDSSData();
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
          cdss_name: selectedRow?.cdss_name,
          alias: selectedRow?.alias,
          cdss_description: selectedRow?.cdss_description,
          cdssId: selectedRow?._id,
          input_refs: selectedRow?.input_refs ?? "",
          output_refs: selectedRow?.output_refs ?? ""
        });
        setState({ ...state, right: true });
        setCurrentAction('update');
      } else if(_action == 'view') {
        setFormState({
          ...formState, 
          edit: false,
          view: true,
          cdss_name: selectedRow?.cdss_name,
          alias: selectedRow?.alias,
          cdss_description: selectedRow?.cdss_description,
          cdssId: selectedRow?._id,
          input_refs: selectedRow?.input_refs ?? "",
          output_refs: selectedRow?.output_refs ?? ""
        });
        setState({ ...state, right: true });
        setCurrentAction('read');
      } else if(_action == 'delete') {
        const { CDSS } = endpoints;
        const { data } = await authenticatedServer.post(CDSS.delete, { id: selectedRow?.cdssId });

        if(data) dispatchError(show_toast({ show: true, message: "cdss deleted successfully ", severity: "success" }));
        setState({ ...state, right: false });
        setCurrentAction('delete');
        fetchCDSSData();
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
  
        const { CDSS } = endpoints;
  
        if(validateForm(formState?.errors)) {
          if(formState?.cdssId == "") {
            let _formData = { ...formState };
            const { status, data } = await authenticatedServer.post(CDSS.create, _.pick(_formData, ['cdss_name', 'cdss_description', 'input_refs', 'output_refs', 'algorithm_version', 'metadata', 'patient_required', 'encounter_required']));
            
            if(status == 200) _formData = { ..._formData, cdssId: data?.data?._id, loading: false, disabled: false };
            else dispatchError(show_toast({ show: true, message: "Failed to save CDSS.", severity: "warning" }));

            setFormState(_formData);
          } else {
            const _formState = { ...formState }
            const { status } = await authenticatedServer.patch(CDSS.patch + '/' + _formState?.cdssId, _.pick(_formState, ['cdss_name', 'cdss_description', 'input_refs', 'output_refs', 'algorithm_version', 'metadata', 'patient_required', 'encounter_required']))
            
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
      { field: 'cdss_name', 
        headerName: 'CDSS Name', 
        width: 255, 
        editable: false 
      },
      {
        field: 'algorithm_version',
        headerName: 'Version',
        align: 'left',
        headerAlign: 'left',
        editable: false,
        width: 250, 
      },
      {
        field: 'cdss_description',
        headerName: 'CDSS Description',
        align: 'left',
        headerAlign: 'left',
        editable: false,
        width: 300, 
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
                  Create CDSS
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
                          <Tab label="CDSS Setup" {...a11yProps(0)} />
                          <Tab label="Define Inputs" {...a11yProps(1)} />
                          <Tab label="Define Outputs" {...a11yProps(1)} />
                        </Tabs>
                      </Box>
                      <CustomTabPanel value={value} index={0}>
                        <FormGroup>
                          <Box sx={{ p: 1 }}>
                            <InputLabel>
                              <Typography>CDSS Name</Typography>
                            </InputLabel>
                            <TextField 
                              required
                              type='text'
                              name='cdss_name'
                              fullWidth
                              value={formState?.cdss_name}
                              onChange={handleInputChange}
                              onBlur={handleInputBlur}
                              error={formState?.errors?.cdss_name ? true : false}
                              helpertext="true"
                              helperText={formState?.errors?.cdss_name ? "CDSS name is required" : false}
                              placeholder='cdss-nurse-phase01'
                              disabled={formState?.disabled}
                            />
                          </Box>
                          <Box sx={{ p: 1 }}>
                            <InputLabel>
                              <Typography>Algorithm Version</Typography>
                            </InputLabel>
                            <TextField 
                              required
                              type='text'
                              name='algorithm_version'
                              fullWidth
                              value={formState?.algorithm_version}
                              onChange={handleInputChange}
                              onBlur={handleInputBlur}
                              error={formState?.errors?.algorithm_version ? true : false}
                              helpertext="true"
                              helperText={formState?.errors?.algorithm_version ? "Verion is required" : false}
                              placeholder='v1.0'
                              disabled={formState?.disabled}
                            />
                          </Box>
                          <Box sx={{ p: 1 }}>
                            <InputLabel>
                              <Typography>CDSS Description</Typography>
                            </InputLabel>
                            <TextField 
                              required
                              type='text'
                              name='cdss_description'
                              fullWidth
                              multiline
                              rows={5}
                              value={formState?.cdss_description}
                              onChange={handleInputChange}
                              onBlur={handleInputBlur}
                              error={formState?.errors?.cdss_description ? true : false}
                              helpertext="true"
                              helperText={formState?.errors?.cdss_description ? "CDSS description name is required" : false}
                              placeholder='the pupose of this group is to ....'
                              disabled={formState?.disabled}
                            />
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
                              onClick={(e) => handleNext(e, 1)}
                              loadingPosition="start"
                              endIcon={<SaveIcon />}
                            >
                              Next
                            </Button>
                          </Box>
                        </Stack>
                      </CustomTabPanel>
                      <CustomTabPanel value={value} index={1}>
                        <FormGroup>
                          <Box sx={{ p: 1 }}>
                            <InputLabel>
                              <Typography>Inputs</Typography>
                            </InputLabel>
                            <TextField 
                              required
                              select
                              name='input_refs'
                              fullWidth
                              value={formState?.input_refs}
                              onChange={handleInputChange}
                              onBlur={handleInputBlur}
                              error={formState?.errors?.input_refs ? true : false}
                              helpertext="true"
                              helperText={formState?.errors?.input_refs ? "Input ref selection is required" : false}
                              disabled={formState?.disabled}
                            >
                              {
                                  resources && (
                                  resources?.map((options) => (
                                      <MenuItem key={options?.resource_name + "_cdss-inputs-_" + options?.resource_name + "-unique-" + Math.round(Math.random(1000), 2)} value={options?._id}>
                                          {options?.resource_name}
                                      </MenuItem>
                                  ))
                                  )
                              }
                            </TextField>
                          </Box>
                          <Box sx={{ p: 1 }}>
                            <Box>
                              <Alert severity="info" icon={<></>}>
                                Will this version require access to patient data?
                                <Switch value={false} name='patient_required' checked={formState.patient_required} onChange={(e) => setFormState({ ...formState, [e.target.name]: e.target.checked })} />  
                              </Alert>
                            </Box>
                          </Box>
                          <Box sx={{ p: 1 }}>
                            <Box>
                              <Alert severity="info" icon={<></>}>
                                Does this version include patient profiling or version tracking?
                                <Switch value={false} name='encounter_required' checked={formState.encounter_required} onChange={(e) => setFormState({ ...formState, [e.target.name]: e.target.checked })} />  
                              </Alert>
                            </Box>
                          </Box>
                        </FormGroup>
                        <Stack direction={"row"} gap={2}>
                          <Box sx={{ p: 1 }}>
                            <Button 
                              fullWidth
                              variant="outlined" 
                              onClick={(e) => handleNext(e, 0)} 
                            >
                              Back
                            </Button>
                          </Box>
                          <Box sx={{ p: 1 }}>
                            <Button
                              fullWidth
                              variant="contained" 
                              loading={formState?.loading} 
                              onClick={(e) => handleNext(e, 2)}
                              loadingPosition="start"
                              endIcon={<SaveIcon />}
                            >
                              Next
                            </Button>
                          </Box>
                        </Stack>
                      </CustomTabPanel>
                      <CustomTabPanel value={value} index={2}>
                        <FormGroup>
                          <Box sx={{ p: 1 }}>
                            <InputLabel>
                              <Typography>Outputs</Typography>
                            </InputLabel>
                            <TextField 
                              required
                              select
                              name='output_refs'
                              fullWidth
                              value={formState?.output_refs}
                              onChange={handleInputChange}
                              onBlur={handleInputBlur}
                              error={formState?.errors?.output_refs ? true : false}
                              helpertext="true"
                              helperText={formState?.errors?.output_refs ? "Output ref selection is required" : false}
                              disabled={formState?.disabled}
                            >
                              {
                                  resources && (
                                  resources?.map((options) => (
                                      <MenuItem key={options?.resource_name + "_cdss-output-_" + options?.resource_name + "-unique-" + Math.round(Math.random(1000), 2)} value={options?._id}>
                                          {options?.resource_name}
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
                              variant="outlined" 
                              onClick={(e) => handleNext(e, 1)} 
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

export default CDSS;