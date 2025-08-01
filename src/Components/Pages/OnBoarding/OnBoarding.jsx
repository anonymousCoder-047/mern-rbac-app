import { useEffect, useState } from 'react';
import {
  Stepper, Step, StepLabel,
  TextField, Button, Box, Typography,
  FormGroup,
  OutlinedInput,
  FormLabel,
  InputAdornment,
  IconButton,
  InputLabel,
  Select,
  Chip,
  MenuItem,
} from '@mui/material';
import _ from "lodash";
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import { Navigate, useNavigate } from 'react-router';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';

import useProtectedRoutes from '../../../hooks/useProtectedRoute';
import { axiosPrivate, axiosPublic } from '../../../helper/axios';
import { endpoints } from '../../../Server/endpoints';

import { set_config } from "../../../store/Reducers/AppConfigReducer"
import { close_toast, show_toast } from "../../../store/Reducers/LogErrorsReducer"

// context states
import useConfig from '../../../hooks/useConfig';
import useError from '../../../hooks/useError';

import { getErrorMessage } from "../../../constant/general_errors";

const steps = ['Add Role', 'Add Users', 'Add Groups'];
const steps_keys = {
  'Add Roles': 'role', 
  'Add Users': 'user',
  'Add Groups': 'group',
};

function Onboarding() {
  const navigate = useNavigate();
  const authenticatedServer = useProtectedRoutes();

  const { onboarding, currentUserId, dispatch } = useConfig();
  const { dispatchError } = useError();
  
  const [activeStep, setActiveStep] = useState(0);
  const [currentKey, setCurrentKey] = useState("role");
  const [showPassword, setShowPassword] = useState(false)
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [roleData, setRoleData] = useState({
    name: "",
    role_id: "",
    clearance_level: 1,
    roleId: "",
  });

  const [userData, setUserData] = useState({
    username: "",
    email: "",
    role: "",
    userId: "",
  })
  
  const [groupData, setGroupData] = useState({
    group_name: "",
    group_email: "",
    group_description: "",
    group_manager: "",
    group_members: [],
    groupId: "",
  });

  const handleClose = () => dispatchError(close_toast({ show: _show }));
  const handleSetError = (_show, _severity, _message, _optional) => dispatchError(show_toast({ show: _show, severity: _severity, message: getErrorMessage(_message, _optional) }));
  
  const handleNext = () => setActiveStep((prevActiveStep) => prevActiveStep + 1);
  const handleSetKey = (_key) => setCurrentKey(_key);
  const handlePrevious = () => {
    handleSetCurrentKey(activeStep - 1);
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  }

  const handleSetCurrentKey = (currentStep) => {
    setCurrentKey(steps_keys[steps[currentStep]]);
  }

  const generatePassword = () => {
    const _password = Math.random().toString(36).slice(-8);
    setUserData({ ...userData, password: _password });
  }

  const toggleShowPassword = () => setShowPassword(!showPassword);

  const handleSubmit = async (e) => {
    try {      
      if(currentKey == "role") {
        const { Role } = endpoints
        const { status, data } = roleData?.roleId ? await authenticatedServer.patch(Role.patch + "/" + roleData?.roleId, _.omitBy(roleData, (value) => _.isNil(value) || value === '')) :  await authenticatedServer.post(Role.create, _.omitBy(roleData, (value) => _.isNil(value) || value === ''));
        
        if(status == 200) {
          setRoleData({ ...roleData, roleId: data?.data?._id });
          setRoles([...roles, [{...data?.data}]]);
          setUserData({ ...userData, role: data?.data?._id });

          handleSetError(true, 'success', 'Role saved.', true);
        } else handleSetError(true, 'danger', 'Error while saving roles data, please try again later.', true);
      } 
      
      if(currentKey == "group") {
        const { Group } = endpoints
        const { data } = groupData?.groupId ? await authenticatedServer.patch(Group.patch + "/" + groupData?.groupId, _.omitBy(groupData, (value) => _.isNil(value) || value === '')) : await authenticatedServer.post(Group.create, _.omitBy(groupData, (value) => _.isNil(value) || value === ''));
        
        if(data) {
          setGroupData({ ...groupData, groupId: data?.data?._id });

          const { Onboarding } = endpoints;
          const { data: onboardingData } = await axiosPublic.patch(Onboarding.patch + "/" + currentUserId, { onboarding_completed: "completed", onboarding_steps: { 
            role: true,
            user: true,
            group: true,
            permissions: true,
          }});
          if(onboardingData) dispatch(set_config({ onboarding_completed: 'completed' }));
        } else handleSetError(true, 'danger', 'Error while saving group data, please try again later.', true);
      } 
      
      if(currentKey == "user") {
        const { User } = endpoints
        const { status, data } = userData?.userId ? await authenticatedServer.patch(User.patch + "/" + userData?.userId, _.omitBy(userData, (value) => _.isNil(value) || value === '')) : await authenticatedServer.post(User.create, _.omitBy(userData, (value) => _.isNil(value) || value === ''));
        
        if(status == 200 && data) {
          handleSetError(true, 'success', 'User save.', true);
        } else handleSetError(true, 'danger', 'Error while saving profile data, please try again later.', true);
      }
    } catch(error) {
      handleSetError(true, 'danger', error, false);
    }

    handleNext();
  }

  const handleChange = (e, _key) => {
    const { name, value } = e.target;
    if(_key == "role") setRoleData({ ...roleData, [name]: value });
    if(_key == "group") {
      setGroupData({ ...groupData, [name]: value });

    }
    if(_key == "user") setUserData({ ...userData, [name]: value });
    
    handleSetKey(_key);
  };

  const renderRedirect = () => {
      dispatchError(show_toast({ show: true, severity: 'error', message: "Access denied" }));

      return <Navigate to='/' replace />
  }

  useEffect(() => {
    const fetchUsersData = async () => {
      const { User } = endpoints;
      const { status, data } = await axiosPrivate.get(User.view);
      
      if(status == 200) setUsers(data?.data);
      else dispatchError(show_toast({ show: true, severity: 'warning', message: "No Users found." }));
    }

    const getOnboardingProgress = async () => {
      const { Onboarding } = endpoints
      const { data } = await axiosPrivate.post(Onboarding.progress, { id: onboarding?._id });

      if(!_.isEmpty(data)) {
        const { data: { onboarding_steps }} = data;
        const allStepsCompleted = _.every(onboarding_steps, Boolean);
        const isLastStep = _.get(onboarding_steps, 'group');
        
        if(allStepsCompleted) navigate('/dashboard');
        else if(isLastStep) {
          setActiveStep(steps?.length - 1);
          handleSetCurrentKey(steps?.length - 1);
        }
      }
    };

    fetchUsersData();
    getOnboardingProgress();
  }, [])

  return (
      onboarding?.onboarding_completed != "completed" ?
      <>
        <Box sx={{ width: '60%', margin: 'auto', mt: 5 }}>
          <Typography variant="h4" gutterBottom>Profile Setup</Typography>
          <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map((label) => (
              <Step key={label}><StepLabel>{label}</StepLabel></Step>
            ))}
          </Stepper>

          <Box sx={{ mt: 3 }}>
            {activeStep === 0 && (
              <>
                <FormGroup sx={{ mb: 2 }}>
                  <FormLabel sx={{ fontSize: "14px", fontWeight: "bold", mb: 1.2, color: "#999999" }}>Role Name</FormLabel>
                  <TextField 
                      variant='outlined'
                      fullWidth
                      value={roleData?.name}
                      placeholder='ex: Admin'
                      name='name'
                      size='medium'
                      onChange={(e) => handleChange(e, 'role')}
                  />
                </FormGroup>
                <FormGroup sx={{ mb: 2 }}>
                  <FormLabel sx={{ fontSize: "14px", fontWeight: "bold", mb: 1.2, color: "#999999" }}>Role Id</FormLabel>
                  <TextField 
                      variant='outlined'
                      fullWidth
                      type='number'
                      value={roleData?.role_id}
                      placeholder='ex: 0'
                      name='role_id'
                      size='medium'
                      onChange={(e) => handleChange(e, 'role')}
                      onBlur={(e) => {
                        const { value } = e.target;

                        if(value == 47) {
                          handleSetError(true, 'info', 'This id is already assigned');
                          setRoleData({ ...roleData, role_id: 0 });
                        } else handleClose();
                      }}
                  />
                </FormGroup>
                <FormGroup sx={{ mb: 2 }}>
                  <FormLabel sx={{ fontSize: "14px", fontWeight: "bold", mb: 1.2, color: "#999999" }}>Clearance Level</FormLabel>
                  <TextField 
                      variant='outlined'
                      fullWidth
                      type='number'
                      value={roleData?.clearance_level}
                      placeholder='ex: 1'
                      name='clearance_level'
                      size='medium'
                      onChange={(e) => handleChange(e, 'role')}
                      onBlur={(e) => {
                        const { value } = e.target;

                        if(value == 0) {
                          handleSetError(true, 'info', 'value should be greater than 0');
                          setRoleData({ ...roleData, clearance_level: 1 });
                        } else handleClose();
                      }}
                  />
                </FormGroup>
              </>
            )}

            {activeStep === 1 && (
              <>
                <FormGroup sx={{ mb: 2 }}>
                  <FormLabel sx={{ fontSize: "14px", fontWeight: "bold", mb: 1.2, color: "#999999" }}>User Name</FormLabel>
                  <TextField 
                      variant='outlined'
                      fullWidth
                      value={userData?.username}
                      placeholder='ex: admin112'
                      name='username'
                      size='medium'
                      onChange={(e) => handleChange(e, 'user')}
                  />
                </FormGroup>
                <FormGroup sx={{ mb: 2 }}>
                  <FormLabel sx={{ fontSize: "14px", fontWeight: "bold", mb: 1.2, color: "#999999" }}>Email</FormLabel>
                  <TextField 
                      variant='outlined'
                      fullWidth
                      type='email'
                      value={userData?.email}
                      placeholder='ex: jhondoe@example.com'
                      name='email'
                      size='medium'
                      onChange={(e) => handleChange(e, 'user')}
                  />
                </FormGroup>
                <FormGroup sx={{ mb: 2 }}>
                  <FormLabel sx={{ fontSize: "14px", fontWeight: "bold", mb: 1.2, color: "#999999" }}>Password</FormLabel>
                  <OutlinedInput 
                      variant='outlined'
                      fullWidth
                      type={showPassword ? 'text' : 'password'}
                      value={userData?.password}
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
                      onChange={(e) => handleChange(e, 'user')}
                  />
                </FormGroup>
              </>
            )}
            
            {activeStep === 2 && (
              <>
                <FormGroup sx={{ mb: 2 }}>
                  <FormLabel sx={{ fontSize: "14px", fontWeight: "bold", mb: 1.2, color: "#999999" }}>Group Name</FormLabel>
                  <TextField 
                      variant='outlined'
                      fullWidth
                      value={groupData?.group_name}
                      placeholder='ex: Admin Group'
                      name='group_name'
                      size='medium'
                      onChange={(e) => handleChange(e, 'group')}
                  />
                </FormGroup>
                <FormGroup sx={{ mb: 2 }}>
                  <FormLabel sx={{ fontSize: "14px", fontWeight: "bold", mb: 1.2, color: "#999999" }}>Group Email</FormLabel>
                  <TextField 
                      variant='outlined'
                      fullWidth
                      type='email'
                      value={groupData?.group_email}
                      placeholder='ex: admins@thrombolink.com'
                      name='group_email'
                      size='medium'
                      onChange={(e) => handleChange(e, 'group')}
                  />
                </FormGroup>
                <FormGroup sx={{ mb: 2 }}>
                  <FormLabel sx={{ fontSize: "14px", fontWeight: "bold", mb: 1.2, color: "#999999" }}>Group Description</FormLabel>
                  <TextField 
                      variant='outlined'
                      fullWidth
                      multiline
                      rows={5}
                      value={groupData?.group_description}
                      placeholder='ex: Group of admins'
                      name='group_description'
                      size='medium'
                      onChange={(e) => handleChange(e, 'group')}
                  />
                </FormGroup>
                <Box sx={{ p: 1 }}>
                  <InputLabel>
                    <Typography>Group Manager</Typography>
                  </InputLabel>
                  <TextField 
                    required
                    select
                    name='group_manager'
                    fullWidth
                    value={groupData?.group_manager}
                    onChange={(e) => handleChange(e, 'group')}
                    helpertext="true"
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
                      value={groupData?.group_members}
                      onChange={(e) => handleChange(e, 'group')}
                      input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                      renderValue={(selected) => (
                          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                              {selected?.map((value) => (
                                  <Chip key={value} label={users?.find((x) => x?._id == value)?.email} sx={{ backgroundColor: "#e5f6fd " }} />
                              ))}
                          </Box>
                      )}
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
              </>
            )}
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={handlePrevious}
                sx={{ mr: 1 }}
              >
                Back
              </Button>
              <Box sx={{ flex: '1 1 auto' }} />
              <Button onClick={handleSubmit}>
                {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
              </Button>
            </Box>
          </Box>
        </Box>
      </> 
      : renderRedirect
  );
}

export default Onboarding;
