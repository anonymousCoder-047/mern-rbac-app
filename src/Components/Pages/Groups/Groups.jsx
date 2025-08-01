
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
    OutlinedInput,
    Select,
    Chip,
} from "@mui/material"

import ModeEditIcon from '@mui/icons-material/ModeEdit';
import SaveIcon from '@mui/icons-material/Save';
import PropTypes from 'prop-types';
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

const Groups = () => {
  const authenticatedServer = useProtectedRoutes();
    const config = useConfig();
    const { dispatch } = useError();

    const [anchorEl, setAnchorEl] = useState(null);
    const menuOpen = Boolean(anchorEl);
    const [value] = useState(0);
    const [users, setUsers] = useState([]);
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
      groupId: "",
      group_name: "",
      group_email: "",
      group_manager: "",
      group_description: "",
      group_members: [],
    });

    const fetchGroupData = async () => {
      try {
        const { Group } = endpoints;
        const { status, data } = await axiosPrivate.get(Group.view);

        if(status == 200) {
          setRows(data?.data)
        } else dispatch(show_toast({ show: true, message: "No groups found.", sevirity: "warning" }));
      } catch(error) {
        dispatch(show_toast({ show: true, message: getErrorMessage(error), sevirity: "error" }));
      }
    }
    
    const fetchUsersData = async () => {
      const { User } = endpoints;
      const { status, data } = await axiosPrivate.get(User.view);
      
      if(status == 200) setUsers(data?.data);
      else dispatch(show_toast({ show: true, message: "No Users found.", sevirity: "warning" }));
    }

    useEffect(() => {
      fetchGroupData();
      fetchUsersData();
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
      if(_val) setSelectedRow({ ...selectedRow, ..._val, groupId: _val?._id });
    };

    const handleClose = async (e, _action="") => {
      setAnchorEl(null);

      if(_action == 'edit') {
        setFormState({
          ...formState, 
          edit: true,
          group_name: selectedRow?.group_name,
          group_email: selectedRow?.group_email,
          group_manager: selectedRow?.group_manager,
          group_description: selectedRow?.group_description,
          group_members: selectedRow?.group_members,
          groupId: selectedRow?.groupId,
        });
        setState({ ...state, right: true });
        setCurrentAction('update');
      } else if(_action == 'view') {
        setFormState({
          ...formState, 
          edit: false,
          view: true,
          group_name: selectedRow?.group_name,
          group_email: selectedRow?.group_email,
          group_manager: selectedRow?.group_manager,
          group_description: selectedRow?.group_description,
          group_members: selectedRow?.group_members,
          groupId: selectedRow?.groupId,
        });
        setState({ ...state, right: true });
        setCurrentAction('read');
      } else if(_action == 'delete') {
        const { Group } = endpoints;
        const { data } = await authenticatedServer.post(Group.delete, { id: selectedRow?.groupId });

        if(data) dispatch(show_toast({ show: true, message: "group deleted successfully ", sevirity: "success" }));
        setState({ ...state, right: false });
        setCurrentAction('delete');
        fetchGroupData();
      } else setCurrentAction('write');
    };

    const handleInputChange = (e) => {
      const { name: key, value } = e.target;
      setFormState({ ...formState, [key]: key == 'group_members' ? value : value, errors: { ...formState?.errors, [key]: false, disabled: false }});
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
  
        const { Group } = endpoints;
  
        if(validateForm(formState?.errors)) {
          if(!formState?.edit) {
            let _formData = { ...formState };
            const { status, data } = await authenticatedServer.post(Group.create, _.pick(_formData, ['group_name', 'group_email', 'group_manager', 'group_description', 'group_members']));
            if(status == 200) _formData = { ..._formData, groupId: data?.data?._id, loading: false, disabled: false };
            else dispatch(show_toast({ show: true, severity: "warning", variant: "filled", message: "Unable to create group." }));
            
            setFormState(_formData);
            dispatch(show_toast({ show: true, severity: "success", variant: "filled", message: "Group Created." }));
            await fetchGroupData();
          } else {
            let _formData = { ...formState };
            const { data } = await axiosPrivate.patch(Group.patch + '/' + _formData?.groupId, _.pick(_formData, ['group_name', 'group_email', 'group_manager', 'group_description', 'group_members']))
            
            if(data) {
              dispatch(show_toast({ show: true, severity: "success", variant: "filled", message: "Update Successfull." }));
              await fetchGroupData();
            } else dispatch(show_toast({ show: true, severity: "error", variant: "filled", message: "Unable to update group." }));
          }
        } else {
          dispatch(show_toast({ show: true, severity: "error", variant: "filled", message: "validation error." }));
          setFormState({ ...formState, loading: false, disabled: false });
          dispatch(show_toast({ show: true, message: "Please fill all the required fields.", sevirity: "warning" }));
        }
      } catch(err) {
        dispatch(show_toast({ show: true, severity: "error", variant: "filled", message: getErrorMessage(err) }));
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
      { field: 'group_name', 
        headerName: 'Group Name', 
        width: 230, 
        editable: false 
      },
      {
        field: 'group_email',
        headerName: 'Group Email',
        type: 'email',
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
          { hasPermission && (<Grid size={12}>
            <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "flex-end" }}>
              <Stack direction={'row'} gap={2}>
                {/* <Button variant='outlined'>
                  Import Group
                </Button> */}
                <Button variant='contained' onClick={() => setState({ ...state, right: true })}>
                  Create Group
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
                          <Tab label="Group" {...a11yProps(0)} />
                        </Tabs>
                      </Box>
                      <CustomTabPanel value={value} index={0}>
                        <FormGroup>
                          <Box sx={{ p: 1 }}>
                            <InputLabel>
                              <Typography>Group Name</Typography>
                            </InputLabel>
                            <TextField 
                              required
                              type='text'
                              name='group_name'
                              fullWidth
                              value={formState?.group_name}
                              onChange={handleInputChange}
                              onBlur={handleInputBlur}
                              error={formState?.errors?.group_name ? true : false}
                              helpertext="true"
                              helperText={formState?.errors?.group_name ? "Group name is required" : false}
                              placeholder='ex: nurse-groups'
                              disabled={formState?.disabled}
                            />
                          </Box>
                          <Box sx={{ p: 1 }}>
                            <InputLabel>
                              <Typography>Group Email</Typography>
                            </InputLabel>
                            <TextField 
                              required
                              type='email'
                              name='group_email'
                              fullWidth
                              value={formState?.group_email}
                              onChange={handleInputChange}
                              onBlur={handleInputBlur}
                              error={formState?.errors?.email ? true : false}
                              helpertext="true"
                              helperText={formState?.errors?.email ? "Group email is required" : false}
                              placeholder='ex: <nurses>@example.com'
                              disabled={formState?.disabled}
                            />
                          </Box>
                          <Box sx={{ p: 1 }}>
                            <InputLabel>
                              <Typography>Group Manager</Typography>
                            </InputLabel>
                            <TextField 
                              required
                              select
                              name='group_manager'
                              fullWidth
                              value={formState?.group_manager}
                              onChange={handleInputChange}
                              onBlur={handleInputBlur}
                              error={formState?.errors?.group_manager ? true : false}
                              helpertext="true"
                              helperText={formState?.errors?.group_manager ? "Group manager is required" : false}
                              disabled={formState?.disabled}
                            >
                              {
                                users && (
                                  users?.map((options) => (
                                    <MenuItem key={options?.username + "_group-manager-_" + options?.email} value={options?._id}>
                                      {options?.email} {options?.username ? `(${options?.username})` : ""}
                                    </MenuItem>
                                  ))
                                )
                              }
                            </TextField>
                          </Box>
                          <Box sx={{ p: 1 }}>
                            <InputLabel>
                              <Typography>Group Members</Typography>
                            </InputLabel>
                            <Select
                                labelId="demo-multiple-chip-label"
                                id="demo-multiple-chip"
                                multiple
                                fullWidth
                                name='group_members'
                                value={formState?.group_members}
                                onChange={handleInputChange}
                                input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                                renderValue={(selected) => (
                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                        {selected?.map((value) => (
                                            <Chip key={value} label={users?.find((x) => x?._id == value)?.email} sx={{ backgroundColor: "#e5f6fd " }} />
                                        ))}
                                    </Box>
                                )}
                                onBlur={(value) => setFormState({ ...formState, errors: { ...formState?.errors, group_members: formState?.group_members?.length == 0 ? true : false, disabled: false }})}
                                error={formState?.errors?.group_members ? true : false}
                                helpertext="true"
                                helperText={formState?.errors?.group_members ? "Group members is required" : false}
                                disabled={formState?.disabled}
                                >
                                {
                                    users && (
                                    users?.map((options) => (
                                        <MenuItem key={options?.username ?? options?.email + "_grouo-members-_" + options?.email} value={options?._id}>
                                            {options?.email} {options?.username ? `(${options?.username})` : ""}
                                        </MenuItem>
                                    ))
                                    )
                                }
                            </Select>
                          </Box>
                          <Box sx={{ p: 1 }}>
                            <InputLabel>
                              <Typography>Group Description</Typography>
                            </InputLabel>
                            <TextField 
                              required
                              multiline
                              rows={5}
                              name='group_description'
                              fullWidth
                              value={formState?.group_description}
                              onChange={handleInputChange}
                              onBlur={handleInputBlur}
                              error={formState?.errors?.group_description ? true : false}
                              helpertext="true"
                              helperText={formState?.errors?.group_description ? "Group description is required" : false}
                              placeholder='ex: Nurses'
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

export default Groups;