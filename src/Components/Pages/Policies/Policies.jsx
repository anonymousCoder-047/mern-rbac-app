
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
    IconButton,
    Checkbox,
} from "@mui/material"
import CloseIcon from '@mui/icons-material/Close';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import SaveIcon from '@mui/icons-material/Save';
import PropTypes from 'prop-types';
import _ from "lodash"

import { optionalRoutes, cdssRoutes } from "../../../data/menuData"
import { endpoints } from "../../../Server/endpoints";
import useProtectedRoutes from '../../../hooks/useProtectedRoute';
import { axiosPrivate } from '../../../helper/axios';
import { checkPermissions } from '../../../helper/checkPermissions';

import useConfig from "../../../hooks/useConfig";
import useError from "../../../hooks/useError";

import { show_toast } from "../../../store/Reducers/LogErrorsReducer";
import { getErrorMessage } from "../../../constant/general_errors";

import TableComponent from '../../Common/core/TableComponent';

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

const Policies = () => {
    const { dispatch:dispatchConfig, patient_required, encounter_required, ...config } = useConfig();
    const { dispatch } = useError();
    const authenticatedServer = useProtectedRoutes();

    const [anchorEl, setAnchorEl] = useState(null);
    const menuOpen = Boolean(anchorEl);
    const [value] = useState(0);
    const [resources, setResources] = useState([]);
    const [groups, setGroups] = useState([]);
    const [rows, setRows] = useState([]);
    const [state, setState] = useState({
      right: false,
      left: false,
    });

    const [permissionModalShow, setPermissionModalShow] = useState(false);
    const [currentAction, setCurrentAction] = useState('read');
    const [hasPermission, setHasPermission] = useState(null);
    const [selectedRow, setSelectedRow] = useState({});
    const [permissionRows, setPermissionRows] = useState([]);
    const [permissionData, setPermissionsData] = useState({
      resources: [],
      attributes: [],
      actions: [],
    })
    const [permissionSchema, setPermissionSchema] = useState({});
    const [formState, setFormState] = useState({
      edit: false,
      view: false,
      loading: false, 
      disabled: false,
      permissionId: "",
      policy_name: "",
      policy_description: "",
      resources: [],
      attributes: [],
      actions: [],
      policy_schema: {},
      group: "",
    });

    const fetchPermissionsData = async () => {
      try {
        const { Permissions } = endpoints;
        const { status, data } = await axiosPrivate.get(Permissions.view);

        if(status == 200) {
          setRows(data?.data)
        } else dispatch(show_toast({ show: true, message: "No policies found.", sevirity: "warning" }));
      } catch(error) {
        dispatch(show_toast({ show: true, message: getErrorMessage(error), sevirity: "error" }));
      }
    }
    
    const filter_optional_routes = (_optional) => {
        if(patient_required && encounter_required) return _optional;
        else if(patient_required) return _optional?.displayName == 'Patients';
        else if(encounter_required) return _optional?.displayName == 'Encounters';
        else return {};
    }

    const fetchGroupData = async () => {
      const { Group } = endpoints;
      const { status, data } = await axiosPrivate.get(Group.view);
      
      if(status == 200) setGroups(data?.data);
      else dispatch(show_toast({ show: true, message: "No groups found.", sevirity: "warning" }));
    }
    
    const fetchResourcesData = async () => {
      try {
        const { Resources } = endpoints;
        const { status, data } = await axiosPrivate.get(Resources.view);
        
        if(status == 200) setResources(data?.data);
        else dispatch(show_toast({ show: true, message: "No resources found.", sevirity: "warning" }));
      } catch(err) {
        setResources([
          ...((patient_required || encounter_required) ? new Set(optionalRoutes?.filter(filter_optional_routes)?.map((x) => ({ resource_name: x?.displayName, clearance_level: 0 }))) : []),
          ...new Set(cdssRoutes?.map((x) => ({ resource_name: x?.displayName, clearance_level: 0 })))
        ])
        dispatch(show_toast({ show: true, message: getErrorMessage(err), sevirity: "warning" }));
      }
    }

    useEffect(() => {
      fetchPermissionsData();
      fetchGroupData();
      fetchResourcesData();
    }, []);
    
    useEffect(() => {
      const _permissions = async () => {
        const _hasPermission = await checkPermissions(currentAction, config);
        setHasPermission(_hasPermission);
      }

      _permissions();

      const optionalRecources = optionalRoutes?.filter(filter_optional_routes)?.map((_resc, idx) => ({
        id: idx,
        resource: _resc?.displayName,
        write: (
          <Checkbox checked={false} />
        ),
        read: (
          <Checkbox checked={false} />
        ),
        update: (
          <Checkbox checked={false} />
        ),
        delete: (
          <Checkbox checked={false} />
        ),
        expandable: false,
      }))

      const cdssResources = cdssRoutes?.map((_resc, idx) => ({
        id: (idx + optionalRecources?.length),
        resource: _resc?.displayName,
        write: (
          <Checkbox checked={false} />
        ),
        read: (
          <Checkbox checked={false} />
        ),
        update: (
          <Checkbox checked={false} />
        ),
        delete: (
          <Checkbox checked={false} />
        ),
        expandable: false,
      }))

      const otherResources = resources?.map((row, idx) => ({
        id: (idx + optionalRecources?.length + cdssRoutes?.length),
        resource: row?.resource_name,
        write: (
          <Checkbox checked={false} />
        ),
        read: (
          <Checkbox checked={false} />
        ),
        update: (
          <Checkbox checked={false} />
        ),
        delete: (
          <Checkbox checked={false} />
        ),
        expandable: row?.sections?.length > 0 ? true : false,
      }));

      setPermissionRows([...optionalRecources, ...cdssResources, ...otherResources])

    }, [currentAction, resources]);

    const handleClick = (event, _val={}) => {
      setAnchorEl(event.currentTarget);
      if(_val) setSelectedRow({ ...selectedRow, ..._val, permissionId: _val?._id });
    };

    const handleClose = async (e, _action="") => {
      setAnchorEl(null);

      if(_action == 'edit') {
        setFormState({
          ...formState, 
          edit: true,
          policy_name: selectedRow?.policy_name,
          policy_description: selectedRow?.policy_description,
          resources: selectedRow?.resources,
          permissionId: selectedRow?._id,
          attributes: selectedRow?.attributes,
          actions: selectedRow?.actions,
          policy_schema: selectedRow?.policy_schema,
          group: selectedRow?.group,
        });
        
        const _attributes_permissions = _.chain(selectedRow?.policy_schema)
        .pickBy(obj => _.has(obj, 'attributes')) // only resources with attributes
        .map((resourceObj, resourceKey) => {
          const attrs = _.chain(resourceObj.attributes)
            .toPairs() // → [ ['test resource:Age:read', true], ... ]
            .groupBy(([fullKey]) => fullKey.split(':')[1]) // group by attribute (Age, Sex)
            .map((entries, attrKey) => {
              const permissions = {};
              entries.forEach(([fullKey, value]) => {
                const action = fullKey.split(':')[2]; // read, write
                permissions[action] = value;
              });
              return { [attrKey]: permissions };
            })
            .value();
          return { [resourceKey]: attrs };
        })
        .value();

        setState({ ...state, right: true });
        setPermissionsData({
          resources: selectedRow?.resources,
          attributes: _attributes_permissions,
          actions: selectedRow?.actions,
        })
        setPermissionSchema({});
        setCurrentAction('update');
      } else if(_action == 'view') {
        setFormState({
          ...formState, 
          edit: false,
          view: true,
          policy_name: selectedRow?.policy_name,
          policy_description: selectedRow?.policy_description,
          resources: selectedRow?.resources,
          attributes: selectedRow?.attributes,
          permissionId: selectedRow?._id,
          actions: selectedRow?.actions,
          policy_schema: selectedRow?.policy_schema,
          group: selectedRow?.group,
        });
        setState({ ...state, right: true });
        setPermissionsData({
          resources: selectedRow?.resources,
          attributes: selectedRow?.attributes,
          actions: selectedRow?.actions,
        })
        setPermissionSchema({});
        setCurrentAction('read');
      } else if(_action == 'delete') {
        const { Permissions } = endpoints;
        const { data } = await authenticatedServer.post(Permissions.delete, { id: selectedRow?.permissionId });

        if(data) dispatch(show_toast({ show: true, message: "Policy deleted successfully ", sevirity: "success" }));
        setState({ ...state, right: false });
        setCurrentAction('delete');
        setPermissionsData({
          resources: [],
          attributes: [],
          actions: [],
        })
        setPermissionSchema({});
        fetchPermissionsData();
      } else setCurrentAction('write');
    };

    const handleInputChange = (e) => {
      const { name: key, value } = e.target;
      setFormState({ ...formState, [key]: value, errors: { ...formState?.errors, [key]: false, disabled: false }});
    }

    const handleInputBlur = (e) => {
      const { name: key, value } = e.target;
      setFormState({ ...formState, errors: { ...formState?.errors, [key]: (value == "" || value == 0) ? true : false, disabled: false }});
    }

    const validateForm = (_formState) => {
      setFormState({ ...formState, disabled: true });
      
      if(formState?.errors && Object.values(formState?.errors).every((_flag) => _flag == false)) {
        setFormState({ ...formState, loading: false, disabled: true });
        
        return true;
      } else {
        if(!_.isEmpty(formState?.resources) && !_.isEmpty(formState?.actions) && !_.isEmpty(formState?.policy_schema)) return true;
        
        setFormState({ ...formState, loading: false, disabled: false });
        
        return false;
      }
    };

    const handleSavePermissions = () => {
      const { resources:resourceData, attributes:attributeData } = permissionData;
      setPermissionModalShow(false);

      const _attributesSchema = _.fromPairs(
        attributeData?.map(obj => {
          const [resource, attrs] = Object.entries(obj)[0];
          const entries = _.flatMap(attrs, (actions, attr) =>
            Object.entries(actions)
              ?.filter(([, allowed]) => allowed)
              ?.map(([action]) => [`${resource}:${attr}:${action}`, true])
          );
          return [resource, _.fromPairs(entries)];
        })
      )

      const _permissionSchema = _.fromPairs(
        resourceData?.map(obj => {
          const [resource, actions] = Object.entries(obj)[0];
          const entries = Object.entries(actions)
            ?.filter(([, allowed]) => allowed)
            ?.map(([action]) => [`${resource}:${action}`, true]);
          return [resource, { ...Object.fromEntries(entries), ...((!_.isEmpty(_attributesSchema) && _attributesSchema?.[resource]) ? { attributes: _attributesSchema?.[resource] } : {}) }];
        })
      )

      setPermissionSchema(_permissionSchema)
    }
    
    const handleClearPermissions = () => {
      setPermissionModalShow(false);
      setPermissionsData({
        attributes: [],
        resources: [],
        actions: []
      })
    }

    const handleClosePermissionModal = () => setPermissionModalShow(false);
    const handlePermissionModal = () => setPermissionModalShow(true);

    const handleFormSubmit = async (e) => {
      try {
        setFormState({ ...formState, loading: true, disabled: true });
  
        e.preventDefault();
        e.stopPropagation();
  
        const { Permissions } = endpoints;
  
        if(validateForm(formState?.errors)) {
          if(!formState?.edit) {
            let _formData = { ...formState, policy_schema: permissionSchema, resources: permissionData?.resources, attributes: permissionData?.attributes, actions: permissionData?.actions };
            const { status, data } = await authenticatedServer.post(Permissions.create, _.pick(_formData, ['policy_name', 'policy_description', 'resources', 'attributes', 'actions', 'policy_schema', 'group']));
            if(status == 200) _formData = { ..._formData, permissionId: data?.data?._id, loading: false, disabled: false };
            else console.log("cannot create policy at this moment");
            
            setFormState(_formData);
            await fetchPermissionsData();
          } else {
            let _formData = { ...formState, policy_schema: permissionSchema, resources: permissionData?.resources, attributes: permissionData?.attributes, actions: permissionData?.actions };
            const { data } = await axiosPrivate.patch(Permissions.patch + '/' + _formData?.permissionId, _.pick(_formData, ['policy_name', 'policy_description', 'resources', 'attributes', 'actions', 'policy_schema', 'group']))
            
            if(data) {
              await fetchPermissionsData();
            } else console.log("failed to update policy at the moment.");
          }
        } else {
          setFormState({ ...formState, loading: false, disabled: false });
          dispatch(show_toast({ show: true, message: "Please fill all the required fields.", sevirity: "warning" }));
        }
      } catch(err) {
        dispatch(show_toast({ show: true, message: getErrorMessage(err), sevirity: "warning" }));
        setFormState({ ...formState, loading: false, disabled: false });
        setState({ ...state, right: false, left: false });
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

    const handleSelectAllPermissions = (e, _verticalSelection) => {
      const { checked } = e?.target;
      const { keyName } = _verticalSelection;
      let _attributes = [...permissionData?.attributes];
      let _resources = [...permissionData?.resources];

      _resources = [...(new Set(resources?.map((x) => ({ [x?.resource_name]: { ..._resources?.find((y) => y?.[x?.resource_name])?.[x?.resource_name], [keyName]: checked }}))))]
      _attributes = [...(new Set(resources?.filter((x) => x?.resource_attributes?.length > 0)?.map((_resc) => ({ 
          [_resc?.resource_name]: { 
            ...(_resc?.resource_attributes?.reduce((prev, curr) => { 
              prev[curr?.label] = { 
                ..._attributes?.find((y) => y?.[_resc?.resource_name])?.[_resc?.resource_name]?.[curr?.label],
                [keyName]: checked 
              }

              return prev;
            }, {}))
          }
        })
      )))]
      
      setPermissionsData({ ...permissionData, attributes: _attributes, resources: _resources, actions: ['write', 'read', 'update', 'delete'] });
    };

    const handleSelectAllAdditionalPermissions = (e, _verticalSelection) => {
      const { checked } = e?.target;
      const { keyName } = _verticalSelection;
      let _attributes = [...permissionData?.attributes];
      let _resources = [...permissionData?.resources];

      _resources = [...(new Set(resources?.map((x) => ({ [x?.resource_name]: { ..._resources?.find((y) => y?.[x?.resource_name])?.[x?.resource_name], [keyName]: checked }}))))]
      _attributes = [...(new Set(resources?.filter((x) => x?.resource_attributes?.length > 0)?.map((_resc) => ({ 
          [_resc?.resource_name]: { 
            ...(_resc?.resource_attributes?.reduce((prev, curr) => { 
              prev[curr?.label] = { 
                ..._attributes?.find((y) => y?.[_resc?.resource_name])?.[_resc?.resource_name]?.[curr?.label],
                [keyName]: checked 
              }

              return prev;
            }, {}))
          }
        })
      )))]
      
      setPermissionsData({ ...permissionData, attributes: _attributes, resources: _resources, actions: ['write', 'read', 'update', 'delete'] });
    };

    const handleResoucePermissions = (e, _row, _col) => {
      const { checked } = e?.target;
      const { keyName } = _col;
      const { resource } = _row;
      let _resources = [...permissionData?.resources];
      
      _resources = _resources?.length > 0 ? _resources?.filter((x) => x?.[resource])?.length > 0 ? [...(new Set(_resources?.map((_resc) => (_.has(_resc, resource) ? { ..._resc, [resource]: { ..._resc?.[resource], [keyName]: checked }} : {..._resc}))))] : [..._resources, { [resource]: { [keyName]: checked }}] : [{ [resource]: { [keyName]: checked }}]
      
      setPermissionsData({ ...permissionData, resources: _resources, actions: ['write', 'read', 'update', 'delete'] });
    };
    
    const handleAttributesPermissions = (e, _row, _col, _parentRow={}) => {
      const { checked } = e?.target;
      const { keyName } = _col;
      const { resource } = _row;
      const { resource: parentResource } = _parentRow;
      let _attributes = permissionData?.attributes ? [...permissionData?.attributes] : [];
      const extractTopLevelAttributes = (input) => _.omitBy(input, _.isArray)
      const cleaned = (obj) => _.omitBy(obj, (_, key) => /^\d+$/.test(key));

      _attributes = _attributes?.length > 0 ? _attributes?.filter((x) => x?.[parentResource])?.length > 0 ? [...(new Set(_attributes?.map((_resc) => (_.has(_resc, parentResource) ? { ...extractTopLevelAttributes(_resc), [parentResource]: { ...cleaned(_resc?.[parentResource]), [resource]: { ..._resc?.[parentResource]?.[resource], [keyName]: checked }}} : {...extractTopLevelAttributes(_resc)}))))] : [..._attributes, { [parentResource]: { [resource]: { [keyName]: checked }}}] : [{ [parentResource]: { [resource]: { [keyName]: checked }}}]
      
      setPermissionsData({ ...permissionData, attributes: _attributes, actions: ['write', 'read', 'update', 'delete'] });
    };

    const permissionColumns = [
      { id: 0, keyName: 'resource', label: 'Resources', width: 200, isExpandable: true, headerCheckBox: false, handleChange: handleSelectAllPermissions },
      { id: 1, keyName: 'read', label: 'Read', width: 120, isNested: true,  headerCheckBox: true, renderCell: (_data, _row, _col) => <Checkbox checked={_data?.resources?.find((x) => x?.[_row?.resource])?.[_row?.resource]?.[_col?.keyName]} onClick={(e) => handleResoucePermissions(e, _row, _col)} />, handleChange: handleSelectAllPermissions  },
      { id: 2, keyName: 'write', label: 'Write', width: 120, isNested: true,  headerCheckBox: true, renderCell: (_data, _row, _col) => <Checkbox checked={_data?.resources?.find((x) => x?.[_row?.resource])?.[_row?.resource]?.[_col?.keyName]} onClick={(e) => handleResoucePermissions(e, _row, _col)} />, handleChange: handleSelectAllPermissions },
      { id: 3, keyName: 'update', label: 'Update', width: 120, isNested: true,  headerCheckBox: true, renderCell: (_data, _row, _col) => <Checkbox checked={_data?.resources?.find((x) => x?.[_row?.resource])?.[_row?.resource]?.[_col?.keyName]} onClick={(e) => handleResoucePermissions(e, _row, _col)} />, handleChange: handleSelectAllPermissions  },
      { id: 4, keyName: 'delete', label: 'Delete', width: 120, isNested: true,  headerCheckBox: true, renderCell: (_data, _row, _col) => <Checkbox checked={_data?.resources?.find((x) => x?.[_row?.resource])?.[_row?.resource]?.[_col?.keyName]} onClick={(e) => handleResoucePermissions(e, _row, _col)} />, handleChange: handleSelectAllPermissions  }
    ];

    const additionalRowPermissionColumns = [
      { id: 0, keyName: 'resource', label: 'Resources', width: 200, isExpandable: true, headerCheckBox: false, handleChange: handleSelectAllAdditionalPermissions },
      { id: 1, keyName: 'read', label: 'Read', width: 120, isNested: true,  headerCheckBox: true, renderCell: (_data, _row, _col, _parentRow) => <Checkbox checked={_data?.attributes?.find((x) => x?.[_parentRow?.resource])?.[_parentRow?.resource]?.[_row?.resource]?.[_col?.keyName]} onClick={(e) => handleAttributesPermissions(e, _row, _col, _parentRow)} />, handleChange: handleSelectAllAdditionalPermissions  },
      { id: 2, keyName: 'write', label: 'Write', width: 120, isNested: true,  headerCheckBox: true, renderCell: (_data, _row, _col, _parentRow) => <Checkbox checked={_data?.attributes?.find((x) => x?.[_parentRow?.resource])?.[_parentRow?.resource]?.[_row?.resource]?.[_col?.keyName]} onClick={(e) => handleAttributesPermissions(e, _row, _col, _parentRow)} />, handleChange: handleSelectAllAdditionalPermissions },
      { id: 3, keyName: 'update', label: 'Update', width: 120, isNested: true,  headerCheckBox: true, renderCell: (_data, _row, _col, _parentRow) => <Checkbox checked={_data?.attributes?.find((x) => x?.[_parentRow?.resource])?.[_parentRow?.resource]?.[_row?.resource]?.[_col?.keyName]} onClick={(e) => handleAttributesPermissions(e, _row, _col, _parentRow)} />, handleChange: handleSelectAllAdditionalPermissions  },
      { id: 4, keyName: 'delete', label: 'Delete', width: 120, isNested: true,  headerCheckBox: true, renderCell: (_data, _row, _col, _parentRow) => <Checkbox checked={_data?.attributes?.find((x) => x?.[_parentRow?.resource])?.[_parentRow?.resource]?.[_row?.resource]?.[_col?.keyName]} onClick={(e) => handleAttributesPermissions(e, _row, _col, _parentRow)} />, handleChange: handleSelectAllAdditionalPermissions  }
    ];

    const getAdditionalRowsData = (_key) => {
      const _additionalRow = _.flatMap(resources?.find((x) => x?.resource_name == _key)?.sections, (section) => section.section_attributes);
      let _rowData = [];

      _additionalRow?.map((x, idx) => _rowData?.push({ 
        id: idx,
        resource: x?.label, 
        read: (
          <Checkbox />
        ),
        write: (
          <Checkbox />
        ),
        update: (
          <Checkbox />
        ),
        delete: (
          <Checkbox />
        ),
      }))

      return _rowData;
    }

    const columns = [
      { field: 'policy_name', 
        headerName: 'Policy Name', 
        width: 230, 
        editable: false 
      },
      {
        field: 'group',
        headerName: 'Group',
        type: 'text',
        align: 'left',
        headerAlign: 'left',
        editable: false,
        width: 150, 
        renderCell: (param) => {
          const group = groups?.find((x) => x?._id == param?.row?.group);
          return (
            <Typography>
              {group ? group?.group_name : "No Group"}
            </Typography>
          );
        }
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

    const handleRowClick = (e, _row, _col, additionalRows, setAdditionalRows, additionalRowsData, setAdditionalRowsData) => {
      const _additonalData = { ...additionalRows, [_row?.id]: !additionalRows?.[_row?.id] ? true : false }
      const _attributeData = getAdditionalRowsData(_row?.[_col?.keyName]);

      setAdditionalRows(_additonalData)
      setAdditionalRowsData({
        ...additionalRowsData, 
        [_row?.id]: !_additonalData?.[_row?.id] && additionalRowsData?.[_row?.id]?.length > 0 ? [] : _attributeData ?? [],
        [_row?.id + "_exists"]: _attributeData?.length > 0 ? true : false
      });
    }

    return (
      <>
        <Grid container spacing={2} sx={{ p: 2, m: 2 }}>
          { hasPermission && (<Grid size={12}>
            <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "flex-end" }}>
              <Stack direction={'row'} gap={2}>
                {/* <Button variant='outlined'>
                  Import Policy
                </Button> */}
                <Button variant='contained' onClick={() => setState({ ...state, right: true })}>
                  Create Policy
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
                          <Tab label="Policy" {...a11yProps(0)} />
                        </Tabs>
                      </Box>
                      <CustomTabPanel value={value} index={0}>
                        <FormGroup>
                          <Box sx={{ p: 1 }}>
                            <InputLabel>
                              <Typography>Policy Name</Typography>
                            </InputLabel>
                            <TextField 
                              required
                              type='text'
                              name='policy_name'
                              fullWidth
                              value={formState?.policy_name}
                              onChange={handleInputChange}
                              onBlur={handleInputBlur}
                              error={formState?.errors?.policy_name ? true : false}
                              helpertext="true"
                              helperText={formState?.errors?.policy_name ? "Policy name is required" : false}
                              placeholder='ex: nurse-groups'
                              disabled={formState?.disabled}
                            />
                          </Box>
                          <Box sx={{ p: 1 }}>
                            <InputLabel>
                              <Typography>Policy Description</Typography>
                            </InputLabel>
                            <TextField 
                              required
                              multiline
                              rows={5}
                              name='policy_description'
                              fullWidth
                              value={formState?.policy_description}
                              onChange={handleInputChange}
                              onBlur={handleInputBlur}
                              error={formState?.errors?.policy_description ? true : false}
                              helpertext="true"
                              helperText={formState?.errors?.policy_description ? "Policy description is required" : false}
                              placeholder='ex: Nurses'
                              disabled={formState?.disabled}
                            />
                          </Box>
                          <Box sx={{ p: 1 }}>
                            <InputLabel>
                              <Typography>Group</Typography>
                            </InputLabel>
                            <TextField 
                              required
                              select
                              name='group'
                              fullWidth
                              value={formState?.group}
                              onChange={handleInputChange}
                              onBlur={handleInputBlur}
                              error={formState?.errors?.group ? true : false}
                              helpertext="true"
                              helperText={formState?.errors?.group ? "Group selection is required" : false}
                              disabled={formState?.disabled}
                            >
                              {
                                groups && (
                                  groups?.map((options) => (
                                    <MenuItem key={options?.group_email + "_group-selection-_" + options?.group_name} value={options?._id}>
                                      {options?.group_email} {options?.group_name ? `(${options?.group_name})` : ""}
                                    </MenuItem>
                                  ))
                                )
                              }
                            </TextField>
                          </Box>
                          <Box sx={{ p: 1, flexGrow: 1 }}>
                            <Stack
                              direction="row"
                              spacing={2}
                              sx={{
                                justifyContent: "space-between",
                                alignItems: "center",
                              }}
                            >
                              <InputLabel>
                                <Typography>Resources</Typography>
                              </InputLabel>
                              <Button variant='outlined' onClick={handlePermissionModal}>
                                Select Resources
                              </Button>
                            </Stack>
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

              {
                permissionModalShow && (
                  <Modal
                    open={permissionModalShow}
                    onClose={handleClosePermissionModal}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Box sx={{ 
                      width: "calc(100vw - 100px)",
                      height: "70vh",
                      bgcolor: "background.paper",
                      boxShadow: 24,
                      borderRadius: "15px",
                      p: 4,
                    }}>
                      <Grid container spacing={2}>
                        <Grid size={10}>
                          <Typography variant="h5" sx={{ mb: 2 }}>
                            Select Resources
                          </Typography>
                        </Grid>
                        <Grid size={2} sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
                          <IconButton onClick={handleClosePermissionModal}>
                            <CloseIcon />
                          </IconButton>
                        </Grid>
                      </Grid>
                      <Grid container spacing={2} sx={{ mt: 2}}>
                        <Grid size={12}>
                          <TableComponent
                            columns={permissionColumns} 
                            rows={permissionRows} 
                            additionalColumns={additionalRowPermissionColumns} 
                            rowClick={handleRowClick} 
                            tableTitle='Policy Selection'
                            data={permissionData}
                          />
                        </Grid>
                      </Grid>
                      <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "flex-end" }}>
                        <Stack direction={'row'} gap={2}>
                          <Button variant='outlined' onClick={handleClearPermissions}>
                            Cancel
                          </Button>
                          <Button variant='contained' onClick={handleSavePermissions}>
                            Save
                          </Button>
                        </Stack>
                      </Box>
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

export default Policies;