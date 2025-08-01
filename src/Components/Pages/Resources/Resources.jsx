
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
      {value === index && <Box sx={{ p: 1 }}>{children}</Box>}
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

const Resources = ({ permissions, elemKey, isAdmin }) => {
    const authenticatedServer = useProtectedRoutes();
    
    const { dispatch } = useConfig();
    const { dispatch:dispatchError } = useError();
    const [anchorEl, setAnchorEl] = useState(null);
    const [currentAction, setCurrentAction] = useState('read');
    const [menuPermissions, setMenuPermissions] = useState({
      write: false,
      read: false,
      update: false,
      delete: false,
    })
    const menuOpen = Boolean(anchorEl);
    const [value, ] = useState(0);
    const [rows, setRows] = useState([]);
    const [sections, setSections] = useState([]);
    const [state, setState] = useState({
      right: false,
    });

    const [selectedRow, setSelectedRow] = useState({});
    const [formState, setFormState] = useState({
      edit: false,
      loading: false, 
      disabled: false,
      clearance_level: 1,
      resource_name: "",
      resource_slug: "",
      resource_description: "",
      sections: [],
      resourceId: "",
    });

    const fetchResourcesData = async () => {
      try {
        const { Resources } = endpoints;
        const { status, data } = await authenticatedServer.get(Resources.view);

        if(status == 200) {
          setRows(data?.data);
          const _resources = [...new Set(data?.data?.map((x) => ({ ..._.pick(x, ['clearance_level', 'resource_name', 'resource_slug', 'sections']) })))]
          
          if (!_.isEqual(_resources, config?.resources)) {
            dispatch(set_config({ resources: _resources }))
          }
        } else dispatchError(show_toast({ show: true, message: "No Resources found.", severity: "warning" }));
      } catch(error) {
        dispatchError(show_toast({ show: true, message: getErrorMessage(error), severity: "error" }));
      }
    }
    
    const fetchSectionsData = async () => {
      try {
        const { Sections } = endpoints;
        const { status, data } = await authenticatedServer.get(Sections.view);

        if(status == 200) {
          setSections(data?.data);
        } else dispatchError(show_toast({ show: true, message: "No Sections found.", severity: "warning" }));
      } catch(error) {
        dispatchError(show_toast({ show: true, message: getErrorMessage(error), severity: "error" }));
      }
    }

    useEffect(() => {
      fetchResourcesData();
      fetchSectionsData();
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
      if(_val) {
        setSelectedRow({ 
          ...selectedRow, 
          ..._val, 
          resourceId: _val?._id,
        });
      }
    };

    const handleClose = async (e, _action="") => {
      setAnchorEl(null);

      if(_action == 'edit') {
        setFormState({ 
            ...formState, 
            edit: true,
            clearance_level: selectedRow?.clearance_level,
            resource_name: selectedRow?.resource_name,
            resource_slug: selectedRow?.resource_slug,
            resource_description: selectedRow?.resource_description,
            sections: selectedRow?.sections,
            resourceId: selectedRow?._id,
          });
          setState({ ...state, right: true });
          setCurrentAction('update');
        } else if(_action == 'view') {
          setFormState({
            ...formState, 
            edit: false,
            view: true,
            clearance_level: selectedRow?.clearance_level,
            resource_name: selectedRow?.resource_name,
            resource_slug: selectedRow?.resource_slug,
            resource_description: selectedRow?.resource_description,
            sections: selectedRow?.sections,
            resourceId: selectedRow?._id,
        });
        setState({ ...state, right: true });
        setCurrentAction('read');
      } else if(_action == 'delete') {
        const { Resources } = endpoints;
        const { data } = await authenticatedServer.post(Resources.delete, { id: selectedRow?.resourceId });

        if(data) dispatchError(show_toast({ show: true, message: "resource deleted successfully ", severity: "success" }));
        setState({ ...state, right: false });
        setCurrentAction('delete');
        fetchResourcesData();
      } else setCurrentAction('write');
    };

    const handleChange = (event, newValue) => {
      setBuilderSteps(newValue);
    };

    const handleInputChange = (e) => {
      const { name: key, value } = e.target;
      setFormState({ ...formState, ...( key == 'resource_name' ? { [key]: value, resource_slug: _.kebabCase(value) } : key == 'section' ? _.sortBy(_.uniq(value)) : { [key]: value }), errors: { ...formState?.errors, [key]: false, disabled: false }});
    }

    const handleInputBlur = (e) => {
      const { name: key, value } = e.target;
      setFormState({ ...formState, ...(key == 'resource_slug' ? { [key]: _.kebabCase(value) } : {}), errors: { ...formState?.errors, [key]: value == "" ? true : false, disabled: false }});
    }

    const validateForm = (_formState) => {
      setFormState({ ...formState, disabled: true });
      
      if(formState?.errors && Object.values(formState?.errors).every((_flag) => _flag == false)) {
        dispatch(set_config({ isLoading: false }));
        setFormState({ ...formState, loading: false, disabled: true });
        
        return true;
      } else {
        if(_formState?.sections) return true;
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
  
        const { Resources } = endpoints;
  
        if(validateForm(formState?.errors)) {
          if(formState?.resourceId == "") {
            let _formData = { ...formState };
            const { status, data } = await authenticatedServer.post(Resources.create, _.pick(_formData, ['resource_name', 'resource_slug', 'clearance_level', 'resource_description', 'sections']));
            
            if(status == 200) _formData = { ..._formData, resourceId: data?.data?._id, loading: false, disabled: false };
            else console.log("cannot create resource at this moment");

            setFormState(_formData);
          } else {
            let _formData = { ...formState };
            const { status } = await authenticatedServer.patch(Resources.patch + '/' + formState?.resourceId, _.pick(_formData, ['resource_name', 'resource_slug', 'clearance_level', 'resource_description', 'sections']))
            
            if(status == 200) console.log("resource updated successfully");
            else console.log("failed to update cdss at the moment.");
          }
        } else {
          dispatch(set_config({ isLoading: false }));
          setFormState({ ...formState, loading: false, disabled: false });
          dispatchError(show_toast({ show: true, message: "Please fill all the required fields.", severity: "warning" }));
        }
      } catch(err) {
        console.log("Error E: ", err);
        dispatch(set_config({ isLoading: false }));
        setFormState({ ...formState, loading: false, disabled: false });
        setState({ ...state, right: false, left: false });
      }
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
      { field: 'resource_name', 
        headerName: 'Resource Name', 
        width: 255, 
        editable: false,
        hide: false,
      },
      {
        field: 'resource_slug',
        headerName: 'Resource Slug',
        align: 'left',
        headerAlign: 'left',
        editable: false,
        width: 250, 
        hide: false,
      },
      {
        field: 'resource_description',
        headerName: 'Resource Description',
        align: 'left',
        headerAlign: 'left',
        editable: false,
        width: 300, 
        hide: false,
      },
      {
        field: 'action',
        headerName: 'Action',
        type: 'text',
        width: 180,
        editable: false,
        renderCell: (param) => RenderMenu(param?.row),
        hide: false,
      },
    ];

    return (
      <>
        <Grid container spacing={2} sx={{ p: 2, m: 2 }}>
          { (isAdmin || menuPermissions?.write) && (<Grid size={12}>
            <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "flex-end" }}>
              <Stack direction={'row'} gap={2}>
                {/* <Button variant='outlined'>
                  Import Resources
                </Button> */}
                <Button variant='contained' onClick={() => setState({ right: true })}>
                  Create Resource
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
                          <Tab label="Resource Setup" {...a11yProps(0)} />
                        </Tabs>
                      </Box>
                      <CustomTabPanel value={value} index={0}>
                        <FormGroup>
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
                              helperText={formState?.errors?.clearance_level ? "Clearance level is required" : false}
                              placeholder='1'
                              disabled={formState?.disabled}
                            />
                          </Box>
                          <Box sx={{ p: 1 }}>
                            <InputLabel>
                              <Typography>Resource Name</Typography>
                            </InputLabel>
                            <TextField 
                              required
                              type='text'
                              name='resource_name'
                              fullWidth
                              value={formState?.resource_name}
                              onChange={handleInputChange}
                              onBlur={handleInputBlur}
                              error={formState?.errors?.resource_name ? true : false}
                              helpertext="true"
                              helperText={formState?.errors?.resource_name ? "Resource name is required" : false}
                              placeholder='cdss-nurse-phase01'
                              disabled={formState?.disabled}
                            />
                          </Box>
                          <Box sx={{ p: 1 }}>
                            <InputLabel>
                              <Typography>Resource Slug</Typography>
                            </InputLabel>
                            <TextField 
                              required
                              type='text'
                              name='resource_slug'
                              fullWidth
                              value={formState?.resource_slug}
                              onChange={handleInputChange}
                              onBlur={handleInputBlur}
                              error={formState?.errors?.resource_slug ? true : false}
                              helpertext="true"
                              helperText={formState?.errors?.resource_slug ? "Resource slug is required" : false}
                              placeholder='nurse'
                              disabled={formState?.disabled}
                            />
                          </Box>
                          <Box sx={{ p: 1 }}>
                            <InputLabel>
                              <Typography>Resource Description</Typography>
                            </InputLabel>
                            <TextField 
                              required
                              type='text'
                              name='resource_description'
                              fullWidth
                              multiline
                              rows={5}
                              value={formState?.resource_description}
                              onChange={handleInputChange}
                              onBlur={handleInputBlur}
                              error={formState?.errors?.resource_description ? true : false}
                              helpertext="true"
                              helperText={formState?.errors?.resource_description ? "Resource description name is required" : false}
                              placeholder='the pupose of this resource is to ....'
                              disabled={formState?.disabled}
                            />
                          </Box>
                          <Box sx={{ p: 1 }}>
                            <InputLabel>
                              <Typography>Sections</Typography>
                            </InputLabel>
                            <Select 
                              required
                              name='sections'
                              fullWidth
                              multiple
                              value={formState?.sections}
                              onChange={handleInputChange}
                              input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                                renderValue={(selected) => (
                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                        {selected?.map((value) => (
                                            <Chip key={value} label={sections?.find((x) => x?._id == value)?.section_name} sx={{ backgroundColor: "#e5f6fd " }} />
                                        ))}
                                    </Box>
                                )}
                                onBlur={(value) => setFormState({ ...formState, errors: { ...formState?.errors, sections: formState?.sections?.length == 0 ? true : false, disabled: false }})}
                                error={formState?.errors?.sections ? true : false}
                                helpertext="true"
                                helperText={formState?.errors?.sections ? "Sections is required" : false}
                                disabled={formState?.disabled}
                              >
                              {
                                  sections && (
                                  sections?.map((options) => (
                                      <MenuItem key={options?.section_name + "_sections_" + options?.section_name + "-unique-" + Math.round(Math.random(1000), 2)} value={options?._id}>
                                          {options?.section_name}
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

export default Resources;