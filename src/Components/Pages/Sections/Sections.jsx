
import { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { v4 as uuidv4 } from 'uuid'
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
    FormControl,
    RadioGroup,
    FormControlLabel,
    Radio,
    Accordion,
    AccordionSummary,
    AccordionDetails,
} from "@mui/material"
import AddIcon from '@mui/icons-material/Add';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DeleteIcon from '@mui/icons-material/Delete';
import { DndContext } from "@dnd-kit/core"

import CloseIcon from '@mui/icons-material/Close';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import SaveIcon from '@mui/icons-material/Save';
import PropTypes from 'prop-types';
import _ from "lodash"

import { endpoints } from "../../../Server/endpoints";
import useProtectedRoutes from '../../../hooks/useProtectedRoute';
import { DraggableArea, DroppableArea } from '../../Common/ReUsableComponents/DragNDrop';


import useConfig from "../../../hooks/useConfig";
import useError from "../../../hooks/useError";

import { show_toast } from "../../../store/Reducers/LogErrorsReducer";
import { set_config } from "../../../store/Reducers/AppConfigReducer";
import { getErrorMessage } from "../../../constant/general_errors";

// import constants 
import { templateBuilderItems as draggableItems } from "../../Constants/TemplateBuilderItems";

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

const ItemTypes = {
    BOX: 'box',
}

const style = {
    height: '12rem',
    width: '12rem',
    marginRight: '1.5rem',
    marginBottom: '1.5rem',
    color: 'white',
    padding: '1rem',
    textAlign: 'center',
    fontSize: '1rem',
    lineHeight: 'normal',
    float: 'left',
  }
  export const DropZone = () => {
    const [{ canDrop, isOver }, drop] = useDrop(() => ({
      accept: ItemTypes.BOX,
      drop: () => ({ name: 'Dustbin' }),
      collect: (monitor) => ({
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
      }),
    }))
    const isActive = canDrop && isOver
    let backgroundColor = '#222'
    if (isActive) {
      backgroundColor = 'darkgreen'
    } else if (canDrop) {
      backgroundColor = 'darkkhaki'
    }
    return (
      <div ref={drop} style={{ ...style, backgroundColor }} data-testid="dustbin">
        {isActive ? 'Release to drop' : 'Drag a box here'}
      </div>
    )
}

export const DragZone = ({ children }) => {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: ItemTypes.BOX,
        item: { children },
        end: (item, monitor) => {
          const dropResult = monitor.getDropResult()
        },
        collect: (monitor) => ({
          isDragging: monitor.isDragging(),
          handlerId: monitor.getHandlerId(),
        }),
      }))
      const opacity = isDragging ? 0.4 : 1
      return (
        <div ref={drag} style={{ ...style, opacity }} data-testid={`box`}>
          {children}
        </div>
    )
}

const Sections = ({ permissions, elemKey, isAdmin }) => {
    const authenticatedServer = useProtectedRoutes();
    const { dispatch } = useConfig();
    const { dispatch:dispatchError } = useError();

    const [anchorEl, setAnchorEl] = useState(null);
    const [builderModalShow, setBuilderModalShow] = useState(false);
    const [currentAction, setCurrentAction] = useState('read');
    const [menuPermissions, setMenuPermissions] = useState({
      write: false,
      read: false,
      update: false,
      delete: false,
    })
    const menuOpen = Boolean(anchorEl);
    const [value, ] = useState(0);
    const [builderSteps, setBuilderSteps] = useState(0);
    const [rows, setRows] = useState([]);
    const [resources, setResources] = useState([]);
    const [draggedItems, setDraggedItems] = useState([]);
    const [activeDraggedItem, setActiveDraggedItem] = useState({});
    const [sectionData, setSectionData] = useState({});
    const [sectionSchema, setSectionSchema] = useState({});
    const [sectionAttributes, setSectionAttributes] = useState([]);
    const [state, setState] = useState({
      right: false,
      left: false,
    });

    const [selectedRow, setSelectedRow] = useState({});
    const [formState, setFormState] = useState({
      edit: false,
      loading: false, 
      disabled: false,
      section_name: "",
      section_title: "",
      section_description: "",
      section_fields: {},
      section_data: {},
      section_attributes: [],
      section_permissions: {},
      sectionId: "",
    });

    const fetchSectionData = async () => {
      try {
        const { Sections } = endpoints;
        const { status, data } = await authenticatedServer.get(Sections.view);

        if(status == 200) {
          setRows(data?.data)
        } else dispatchError(show_toast({ show: true, message: "No Sections found.", severity: "warning" }));
      } catch(error) {
        dispatchError(show_toast({ show: true, message: getErrorMessage(error), severity: "error" }));
      }
    }

    const fetchResourcesData = async () => {
      try {
        const { Resources } = endpoints;
        const { status, data } = await authenticatedServer.get(Resources.view);

        if(status == 200) {
          setResources(data?.data)
        } else dispatchError(show_toast({ show: true, message: "No resources found.", severity: "warning" }));
      } catch(error) {
        dispatchError(show_toast({ show: true, message: "Sorry! something went wrong, please try again later.", severity: "error" }));
      }
    }

    useEffect(() => {
      fetchSectionData();
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
      if(_val) {
        setSelectedRow({ 
          ...selectedRow, 
          ..._val, 
          sectionId: _val?._id, 
        });
        setDraggedItems(_.values(_val?.section_fields?.schema));
      }
    };

    const handleClose = async (e, _action="") => {
      setAnchorEl(null);

      if(_action == 'edit') {
        setFormState({ 
          ...formState, 
          edit: true,
          section_name: selectedRow?.section_name,
          section_title: selectedRow?.section_title,
          section_description: selectedRow?.section_description,
          sectionId: selectedRow?._id,
          section_fields: selectedRow?.section_fields ?? {},
          section_data: selectedRow?.section_data ?? {},
          section_attributes: selectedRow?.section_attributes ?? [],
          section_permissions: selectedRow?.section_permissions ?? {}
        });
        setState({ ...state, right: true });
        setCurrentAction('update');
      } else if(_action == 'view') {
        setFormState({
          ...formState, 
          edit: false,
          view: true,
          section_name: selectedRow?.section_name,
          section_title: selectedRow?.section_title,
          section_description: selectedRow?.section_description,
          sectionId: selectedRow?._id,
          section_fields: selectedRow?.section_fields ?? {},
          section_data: selectedRow?.section_data ?? {},
          section_attributes: selectedRow?.section_attributes ?? [],
          section_permissions: selectedRow?.section_permissions ?? {}
        });
        setState({ ...state, right: true });
        setCurrentAction('read');
      } else if(_action == 'delete') {
        const { Sections } = endpoints;
        const { data } = await authenticatedServer.post(Sections.delete, { id: selectedRow?.sectionId });

        if(data) dispatchError(show_toast({ show: true, message: "section deleted successfully ", severity: "success" }));
        setState({ ...state, right: false });
        setCurrentAction('delete');
        fetchSectionData();
      } else setCurrentAction('write');
    };

    const handleChange = (event, newValue) => {
      setBuilderSteps(newValue);
    };

    const handleInputChange = (e) => {
      const { name: key, value } = e.target;
      setFormState({ ...formState, [key]: key == 'action' ? typeof value === 'string' ? value.split(',') : value : value, errors: { ...formState?.errors, [key]: false, disabled: false }});
    }

    const handleInputBlur = (e) => {
      const { name: key, value } = e.target;
      setFormState({ ...formState, ...(key == 'section_name' ? { [key]: _.kebabCase(value) } : {}), errors: { ...formState?.errors, [key]: value == "" ? true : false, disabled: false }});
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
        
        if(!_.isEmpty(formState?.section_fields)) return true;
        else return false;
      }
    };

    const excludeType = (type) => {
      if(type == 'select' || type == 'checkboxGroup' || type == 'radioGroup') return false;
      else return true;
    }

    const generateJsonSchema = (data) => {
      if (!Array.isArray(data) || data.length === 0) {
        throw new Error("Input should be a non-empty array of objects.");
      }

      let schema = {};
      let sectionData = {};
      let attributes = [];

      data.forEach(item => {
        const attributeItem = {...(!['heading', 'paragraph']?.includes(item?.type) ? { label: item?.title, value: item?.type, options: item?.properties?.options } : {})}; 
        sectionData = { ...sectionData, [_.kebabCase(item?.title)]: excludeType(item?.type) ? item?.value : item?.options }
        schema = { ...schema, [`${_.camelCase(item?.type)}@${item?.elemId}`]: { ...item }}
        if(!_.isEmpty(attributeItem)) attributes = [...attributes, attributeItem];
      });

      return { sectionData, schema, attributes };
    }

    const handleCloseBuilderModal = () => {
      if(draggedItems?.length > 0) {
        const { sectionData, schema, attributes } = generateJsonSchema(draggedItems);
        setBuilderModalShow(false);
        setBuilderSteps(0);
        setSectionData(sectionData);
        setSectionSchema(schema);
        setSectionAttributes(attributes)
      } else {
        setBuilderModalShow(false);
        setBuilderSteps(0);
        setSectionData({});
        setSectionSchema({});
        setSectionAttributes([])
      }
    }

    const handleBuilderModal = () => setBuilderModalShow(true);

    const handleFormSubmit = async (e) => {
      try {
        dispatch(set_config({ isLoading: true }));
        setFormState({ ...formState, loading: true, disabled: true });
  
        e.preventDefault();
        e.stopPropagation();
  
        const { Sections } = endpoints;
  
        if(validateForm(formState?.errors)) {
          if(formState?.sectionId == "") {
            let _formData = { ...formState, section_fields: { attributes: sectionAttributes, schema: sectionSchema }, section_data: sectionData, section_attributes: sectionAttributes, section_permissions: sectionSchema};
            const { status, data } = await authenticatedServer.post(Sections.create, _.pick(_formData, ['section_name', 'section_title', 'section_description', 'section_fields', 'section_data', 'section_attributes', 'section_permissions']));
            
            if(status == 200) _formData = { ..._formData, sectionId: data?.data?._id, loading: false, disabled: false };
            else console.log("cannot create section at this moment");

            setFormState(_formData);
          } else {
            let _formData = { ...formState, section_fields: { attributes: sectionAttributes, schema: sectionSchema }, section_data: sectionData, section_attributes: sectionAttributes, section_permissions: sectionSchema};
            const { status } = await authenticatedServer.patch(Sections.patch + '/' + formState?.sectionId, _.pick(_formData, ['section_name', 'section_title', 'section_description', 'section_fields', 'section_data', 'section_attributes', 'section_permissions']))
            
            if(status == 200) console.log("section updated successfully");
            else console.log("failed to update cdss at the moment.");
          }
        } else {
          dispatch(set_config({ isLoading: false }));
          setFormState({ ...formState, loading: false, disabled: false });
          dispatchError(show_toast({ show: true, message: "Please fill all the required fields.", severity: "warning" }));
        }
      } catch(err) {
        dispatch(set_config({ isLoading: false }));
        setFormState({ ...formState, loading: false, disabled: false });
        setState({ ...state, right: false, left: false });
      }
    }

    const handlePrevious = (e, _idx) => {
      if(_idx == 0) setBuilderSteps(0)
      else handleChange(e, _idx);
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
      { field: 'section_name', 
        headerName: 'Section Name', 
        width: 255, 
        editable: false,
        hide: false,
      },
      {
        field: 'section_title',
        headerName: 'Section Title',
        align: 'left',
        headerAlign: 'left',
        editable: false,
        width: 250, 
        hide: false,
      },
      {
        field: 'section_description',
        headerName: 'Section Description',
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

    const handleDragEnd = ({ active, over }) => {
      const _selected_item = { ...activeDraggedItem, elemId: uuidv4(), id: active?.id, type: active?.type, title: active?.title, ...active?.data?.current };
      const newItem = { ..._selected_item };
      setActiveDraggedItem(_selected_item);
      setDraggedItems([...draggedItems, newItem]);
    }

    const handleDragSortableEnd = (event) => {
      const { active, over } = event;
      
      if (active?.id !== over?.id) {
        const oldIndex = draggedItems?.findIndex((item) => item?.elemId === active?.id);
        const newIndex = draggedItems?.findIndex((item) => item?.elemId === over?.id);
        const activeElem = draggedItems?.find((item) => item?.elemId === active?.id);
        
        const _sorted_data = ((arr, from, to) => {
          const a = _.clone(arr);
          a.splice(to, 0, a.splice(from, 1)[0]);
          return a;
        })(draggedItems, oldIndex, newIndex);
        
        setActiveDraggedItem(activeElem);
        setDraggedItems(_sorted_data);
      }
    }
    
    const handleClickElement = (e, _item) => {
      setActiveDraggedItem({ ..._item });
    }

    const handleRemoveElement = (e, _item) => {
      setDraggedItems(_.reject(draggedItems, { elemId: _item?.elemId }));
    }

    const handleAddElementProperties = (e, parentKey="") => {
      const _newItem = { id: uuidv4(), label: "Option 1", value: "option" }

      setDraggedItems((prevData) =>
        prevData?.map((item) => {
          if (item?.elemId !== activeDraggedItem?.elemId) return item;

          // Copy only the necessary option
          const updatedOptions = [...item?.[parentKey]?.options, {..._newItem}]

          // Return a new item only if it changed
          return {
            ...item,
            [parentKey]: {
              ...item?.[parentKey],
              options: updatedOptions,
            },
          };
        })
      );
      
      const updatedOptions = [...activeDraggedItem?.[parentKey]?.options, { ..._newItem }]

      setActiveDraggedItem({
        ...activeDraggedItem, [parentKey]: { ...activeDraggedItem?.[parentKey], options: updatedOptions }
      })
    }
    
    const handleRemoveElementProperties = (e, parentKey="", optionId="") => {
      const removeOption = (elemId, _optionId) => {
        return _.cloneDeepWith(draggedItems, (item) => {
          if (_.get(item, "elemId") === elemId) {
            _.remove(item?.[parentKey]?.options, { id: _optionId });
          }
        });
      };

      setDraggedItems(removeOption(activeDraggedItem?.elemId, optionId));
      setActiveDraggedItem((prevData) => {
        const newData = _.cloneDeep(prevData);
        _.remove(newData?.[parentKey]?.options, { id: optionId });

        return newData;
      })
    }

    const handleElementPropertyChange = (e, parentKey="", optionId="") => {
      const { name, value } = e?.target;
      if(name == "options") {
        setDraggedItems((prevData) =>
          prevData?.map((item) => {
            if (item?.elemId !== activeDraggedItem?.elemId) return item;

            // Copy only the necessary option
            const updatedOptions = item?.[parentKey]?.options.map((opt) =>
              opt?.id === optionId ? { ...opt, label: value, value: value?.toLowerCase() } : opt
            );

            // Return a new item only if it changed
            return {
              ...item,
              [parentKey]: {
                ...item?.[parentKey],
                options: updatedOptions,
              },
            };
          })
        );
        
        const updatedOptions = activeDraggedItem?.[parentKey]?.options.map((opt) =>
          opt?.id === optionId ? { ...opt, label: value } : opt
        );

        setActiveDraggedItem({
          ...activeDraggedItem, [parentKey]: { ...activeDraggedItem?.[parentKey], options: updatedOptions }
        })
      } else {
        setDraggedItems(_.map(draggedItems, (item) =>
          item?.elemId === activeDraggedItem?.elemId ? { ...item, ...(parentKey ? { ...item, [parentKey]: { ...item?.[parentKey], [name]: value }} : { [name]: value }) } : item
        ));
        setActiveDraggedItem({ ...activeDraggedItem, ...(parentKey ? { ...activeDraggedItem, [parentKey]: { ...activeDraggedItem?.[parentKey], [name]: value }} : { [name]: value })});
      }
    }

    const renderElementProperties = (item) => {
      switch(item?.type) {
        case 'text': 
          return <>
            <Box>
              <Typography variant='subtitle2'>
                Label
              </Typography>
              <TextField 
                type='text'
                name='title'
                value={activeDraggedItem?.title}
                onChange={handleElementPropertyChange}
              />
              <Typography variant='subtitle2'>
                Value
              </Typography>
              <TextField 
                type='text'
                name='value'
                value={activeDraggedItem?.properties?.value}
                onChange={(e) => handleElementPropertyChange(e, 'properties')}
              />
            </Box>
            <Box sx={{ mt: 2, mb: 2 }}>
              <Typography variant='subtitle2'>
                Full Width
              </Typography>
              <FormControl>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  defaultValue="No"
                  name="fullWidth"
                  value={activeDraggedItem?.properties?.fullWidth}
                  onChange={(e) => handleElementPropertyChange(e, 'properties')}
                >
                  <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                  <FormControlLabel value="No" control={<Radio />} label="No" />
                </RadioGroup>
              </FormControl>
            </Box>
            <Box sx={{ mt: 2, mb: 2 }}>
              <Typography variant='subtitle2'>
                Header Column?
              </Typography>
              <FormControl>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  defaultValue="No"
                  name="headerColumn"
                  value={activeDraggedItem?.properties?.headerColumn}
                  onChange={(e) => handleElementPropertyChange(e, 'properties')}
                >
                  <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                  <FormControlLabel value="No" control={<Radio />} label="No" />
                </RadioGroup>
              </FormControl>
            </Box>
          </>
        case 'link': 
          return <>
            <Box>
              <Typography variant='subtitle2'>
                Label
              </Typography>
              <TextField 
                type='text'
                name='title'
                value={activeDraggedItem?.title}
                onChange={handleElementPropertyChange}
              />
              <Typography variant='subtitle2'>
                Value
              </Typography>
              <TextField 
                type='text'
                name='value'
                value={activeDraggedItem?.properties?.value}
                onChange={(e) => handleElementPropertyChange(e, 'properties')}
              />
            </Box>
            <Box sx={{ mt: 2, mb: 2 }}>
              <Typography variant='subtitle2'>
                Full Width
              </Typography>
              <FormControl>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  defaultValue="female"
                  name="fullWidth"
                  value={activeDraggedItem?.properties?.fullWidth}
                  onChange={(e) => handleElementPropertyChange(e, 'properties')}
                >
                  <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                  <FormControlLabel value="No" control={<Radio />} label="No" />
                </RadioGroup>
              </FormControl>
            </Box>
          </>
        case 'radio': 
          return <>
            <Box>
              <Typography variant='subtitle2'>
                Label
              </Typography>
              <TextField 
                type='text'
                name='label'
                value={activeDraggedItem?.properties?.label}
                onChange={(e) => handleElementPropertyChange(e, 'properties')}
              />
            </Box>
            <Box sx={{ mt: 2, mb: 2 }}>
              <Typography variant='subtitle2'>
                Full Width
              </Typography>
              <FormControl>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  defaultValue="female"
                  name="fullWidth"
                  value={activeDraggedItem?.properties?.fullWidth}
                  onChange={(e) => handleElementPropertyChange(e, 'properties')}
                >
                  <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                  <FormControlLabel value="No" control={<Radio />} label="No" />
                </RadioGroup>
              </FormControl>
            </Box>
          </>
        case 'checkbox': 
          return <>
            <Box>
              <Typography variant='subtitle2'>
                Label
              </Typography>
              <TextField 
                type='text'
                name='label'
                value={activeDraggedItem?.properties?.label}
                onChange={(e) => handleElementPropertyChange(e, 'properties')}
              />
            </Box>
            <Box sx={{ mt: 2, mb: 2 }}>
              <Typography variant='subtitle2'>
                Full Width
              </Typography>
              <FormControl>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  defaultValue="female"
                  name="fullWidth"
                  value={activeDraggedItem?.properties?.fullWidth}
                  onChange={(e) => handleElementPropertyChange(e, 'properties')}
                >
                  <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                  <FormControlLabel value="No" control={<Radio />} label="No" />
                </RadioGroup>
              </FormControl>
            </Box>
          </>
        case 'button': 
          return <>
            <Box>
              <Typography variant='subtitle2'>
                Label
              </Typography>
              <TextField 
                type='text'
                name='label'
                value={activeDraggedItem?.properties?.label}
                onChange={(e) => handleElementPropertyChange(e, 'properties')}
              />
            </Box>
            <Box sx={{ mt: 2, mb: 2 }}>
              <Typography variant='subtitle2'>
                Full Width
              </Typography>
              <FormControl>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  defaultValue="female"
                  name="fullWidth"
                  value={activeDraggedItem?.properties?.fullWidth}
                  onChange={(e) => handleElementPropertyChange(e, 'properties')}
                >
                  <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                  <FormControlLabel value="No" control={<Radio />} label="No" />
                </RadioGroup>
              </FormControl>
            </Box>
          </>
        case 'heading': 
          return <>
            <Box>
              <Typography variant='subtitle2'>
                Label
              </Typography>
              <TextField 
                type='text'
                name='title'
                value={activeDraggedItem?.title}
                onChange={handleElementPropertyChange}
              />
            </Box>
            <Box sx={{ mt: 2, mb: 2 }}>
              <Typography variant='subtitle2'>
                Full Width
              </Typography>
              <FormControl>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  defaultValue="female"
                  name="fullWidth"
                  value={activeDraggedItem?.properties?.fullWidth}
                  onChange={(e) => handleElementPropertyChange(e, 'properties')}
                >
                  <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                  <FormControlLabel value="No" control={<Radio />} label="No" />
                </RadioGroup>
              </FormControl>
            </Box>
          </>
        case 'paragraph': 
          return <>
            <Box>
              <Typography variant='subtitle2'>
                Label
              </Typography>
              <TextField 
                type='text'
                name='title'
                value={activeDraggedItem?.title}
                onChange={handleElementPropertyChange}
              />
            </Box>
            <Box sx={{ mt: 2, mb: 2 }}>
              <Typography variant='subtitle2'>
                Full Width
              </Typography>
              <FormControl>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  defaultValue="female"
                  name="fullWidth"
                  value={activeDraggedItem?.properties?.fullWidth}
                  onChange={(e) => handleElementPropertyChange(e, 'properties')}
                >
                  <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                  <FormControlLabel value="No" control={<Radio />} label="No" />
                </RadioGroup>
              </FormControl>
            </Box>
          </>
        case 'number': 
          return <>
            <Box>
              <Typography variant='subtitle2'>
                Label
              </Typography>
              <TextField 
                type='text'
                name='title'
                value={activeDraggedItem?.title}
                onChange={handleElementPropertyChange}
              />
            </Box>
            <Box sx={{ mt: 2, mb: 2 }}>
              <Typography variant='subtitle2'>
                Value
              </Typography>
              <TextField 
                type='text'
                name='value'
                value={activeDraggedItem?.properties?.value}
                onChange={(e) => handleElementPropertyChange(e, 'properties')}
              />
            </Box>
            <Box>
              <Typography variant='subtitle2'>
                Full Width
              </Typography>
              <FormControl>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  defaultValue="female"
                  name="fullWidth"
                  value={activeDraggedItem?.properties?.fullWidth}
                  onChange={(e) => handleElementPropertyChange(e, 'properties')}
                >
                  <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                  <FormControlLabel value="No" control={<Radio />} label="No" />
                </RadioGroup>
              </FormControl>
            </Box>
            <Box sx={{ mt: 2, mb: 2 }}>
              <Typography variant='subtitle2'>
                Header Column?
              </Typography>
              <FormControl>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  defaultValue="No"
                  name="headerColumn"
                  value={activeDraggedItem?.properties?.headerColumn}
                  onChange={(e) => handleElementPropertyChange(e, 'properties')}
                >
                  <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                  <FormControlLabel value="No" control={<Radio />} label="No" />
                </RadioGroup>
              </FormControl>
            </Box>
          </>
        case 'date': 
          return <>
            <Box>
              <Typography variant='subtitle2'>
                Label
              </Typography>
              <TextField 
                type='text'
                name='title'
                value={activeDraggedItem?.title}
                onChange={handleElementPropertyChange}
              />
            </Box>
            <Box sx={{ mt: 2, mb: 2 }}>
              <Typography variant='subtitle2'>
                Value
              </Typography>
              <TextField 
                type='date'
                name='value'
                value={activeDraggedItem?.properties?.value}
                onChange={(e) => handleElementPropertyChange(e, 'properties')}
              />
            </Box>
            <Box>
              <Typography variant='subtitle2'>
                Full Width
              </Typography>
              <FormControl>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  defaultValue="female"
                  name="fullWidth"
                  value={activeDraggedItem?.properties?.fullWidth}
                  onChange={(e) => handleElementPropertyChange(e, 'properties')}
                >
                  <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                  <FormControlLabel value="No" control={<Radio />} label="No" />
                </RadioGroup>
              </FormControl>
            </Box>
            <Box sx={{ mt: 2, mb: 2 }}>
              <Typography variant='subtitle2'>
                Header Column?
              </Typography>
              <FormControl>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  defaultValue="No"
                  name="headerColumn"
                  value={activeDraggedItem?.properties?.headerColumn}
                  onChange={(e) => handleElementPropertyChange(e, 'properties')}
                >
                  <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                  <FormControlLabel value="No" control={<Radio />} label="No" />
                </RadioGroup>
              </FormControl>
            </Box>
          </>
        case 'time': 
          return <>
            <Box>
              <Typography variant='subtitle2'>
                Label
              </Typography>
              <TextField 
                type='text'
                name='title'
                value={activeDraggedItem?.title}
                onChange={handleElementPropertyChange}
              />
            </Box>
            <Box sx={{ mt: 2, mb: 2 }}>
              <Typography variant='subtitle2'>
                Value
              </Typography>
              <TextField 
                type='time'
                name='value'
                value={activeDraggedItem?.properties?.value}
                onChange={(e) => handleElementPropertyChange(e, 'properties')}
              />
            </Box>
            <Box>
              <Typography variant='subtitle2'>
                Full Width
              </Typography>
              <FormControl>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  defaultValue="female"
                  name="fullWidth"
                  value={activeDraggedItem?.properties?.fullWidth}
                  onChange={(e) => handleElementPropertyChange(e, 'properties')}
                >
                  <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                  <FormControlLabel value="No" control={<Radio />} label="No" />
                </RadioGroup>
              </FormControl>
            </Box>
            <Box sx={{ mt: 2, mb: 2 }}>
              <Typography variant='subtitle2'>
                Header Column?
              </Typography>
              <FormControl>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  defaultValue="No"
                  name="headerColumn"
                  value={activeDraggedItem?.properties?.headerColumn}
                  onChange={(e) => handleElementPropertyChange(e, 'properties')}
                >
                  <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                  <FormControlLabel value="No" control={<Radio />} label="No" />
                </RadioGroup>
              </FormControl>
            </Box>
          </>
        case 'slider': 
          return <>
            <Box>
              <Typography variant='subtitle2'>
                Label
              </Typography>
              <TextField 
                type='text'
                name='title'
                value={activeDraggedItem?.title}
                onChange={handleElementPropertyChange}
              />
            </Box>
            <Box sx={{ mt: 2, mb: 2 }}>
              <Typography variant='subtitle2'>
                Min
              </Typography>
              <TextField 
                type='text'
                name='min'
                value={activeDraggedItem?.properties?.min}
                onChange={(e) => handleElementPropertyChange(e, 'properties')}
              />
            </Box>
            <Box sx={{ mt: 2, mb: 2 }}>
              <Typography variant='subtitle2'>
                Max
              </Typography>
              <TextField 
                type='text'
                name='max'
                value={activeDraggedItem?.properties?.max}
                onChange={(e) => handleElementPropertyChange(e, 'properties')}
              />
            </Box>
            <Box>
              <Typography variant='subtitle2'>
                Full Width
              </Typography>
              <FormControl>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  defaultValue="female"
                  name="fullWidth"
                  value={activeDraggedItem?.properties?.fullWidth}
                  onChange={(e) => handleElementPropertyChange(e, 'properties')}
                >
                  <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                  <FormControlLabel value="No" control={<Radio />} label="No" />
                </RadioGroup>
              </FormControl>
            </Box>
          </>
        case 'select': 
          return <>
            <Box>
              <Typography variant='subtitle2'>
                Label
              </Typography>
              <TextField 
                type='text'
                name='title'
                value={activeDraggedItem?.title}
                onChange={handleElementPropertyChange}
              />
            </Box>
            <Box sx={{ mb: 2, mt: 2 }}>
              <Typography variant='subtitle2'>
                Options
              </Typography>
              {
                activeDraggedItem?.properties?.options?.map((option, idx) => (
                  <Box sx={{ display: 'flex', flex: '1 1 45%' }}>
                    <IconButton onClick={(e) => handleRemoveElementProperties(e, 'properties', option?.id)}>
                      <DeleteIcon sx={{ color: 'red' }} />
                    </IconButton>
                    <TextField 
                      key={`radio-option-${idx}-change-${idx}-value-${option?.value}`}
                      type='text'
                      name='options'
                      value={option?.label}
                      sx={{ mb: 1 }}
                      onChange={(e) => handleElementPropertyChange(e, 'properties', option?.id)}
                    />
                  </Box>
                ))
              }
              <IconButton sx={{ borderRadius: 2, width: '100%' }} onClick={(e) => handleAddElementProperties(e, 'properties')}>
                <AddIcon /> 
                <Typography sx={{ fontSize: '12px' }}>Add option</Typography>
              </IconButton>
            </Box>
            <Box>
              <Typography variant='subtitle2'>
                Full Width
              </Typography>
              <FormControl>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  defaultValue="female"
                  name="fullWidth"
                  value={activeDraggedItem?.properties?.fullWidth}
                  onChange={(e) => handleElementPropertyChange(e, 'properties')}
                >
                  <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                  <FormControlLabel value="No" control={<Radio />} label="No" />
                </RadioGroup>
              </FormControl>
            </Box>
          </>
        case 'checkboxGroup': 
          return <>
            <Box>
              <Typography variant='subtitle2'>
                Label
              </Typography>
              <TextField 
                type='text'
                name='title'
                value={activeDraggedItem?.title}
                onChange={handleElementPropertyChange}
              />
            </Box>
            <Box sx={{ mb: 2, mt: 2 }}>
              <Typography variant='subtitle2'>
                Options
              </Typography>
              {
                activeDraggedItem?.properties?.options?.map((option, idx) => (
                  <Box sx={{ display: 'flex', flex: '1 1 45%' }}>
                    <IconButton onClick={(e) => handleRemoveElementProperties(e, 'properties', option?.id)}>
                      <DeleteIcon sx={{ color: 'red' }} />
                    </IconButton>
                    <TextField 
                      key={`radio-option-${idx}-change-${idx}-value-${option?.value}`}
                      type='text'
                      name='options'
                      value={option?.label}
                      sx={{ mb: 1 }}
                      onChange={(e) => handleElementPropertyChange(e, 'properties', option?.id)}
                    />
                  </Box>
                ))
              }
              <IconButton sx={{ borderRadius: 2, width: '100%' }} onClick={(e) => handleAddElementProperties(e, 'properties')}>
                <AddIcon /> 
                <Typography sx={{ fontSize: '12px' }}>Add option</Typography>
              </IconButton>
            </Box>
            <Box>
              <Typography variant='subtitle2'>
                Full Width
              </Typography>
              <FormControl>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  defaultValue="female"
                  name="fullWidth"
                  value={activeDraggedItem?.properties?.fullWidth}
                  onChange={(e) => handleElementPropertyChange(e, 'properties')}
                >
                  <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                  <FormControlLabel value="No" control={<Radio />} label="No" />
                </RadioGroup>
              </FormControl>
            </Box>
          </>
        case 'radioGroup': 
          return <>
            <Box>
              <Typography variant='subtitle2'>
                Label
              </Typography>
              <TextField 
                type='text'
                name='title'
                value={activeDraggedItem?.title}
                onChange={handleElementPropertyChange}
              />
            </Box>
            <Box sx={{ mt: 2, mb: 2 }}>
              <Typography variant='subtitle2'>
                Options
              </Typography>
              {
                activeDraggedItem?.properties?.options?.map((option, idx) => (
                  <Box sx={{ display: 'flex', flex: '1 1 45%' }}>
                    <IconButton onClick={(e) => handleRemoveElementProperties(e, 'properties', option?.id)}>
                      <DeleteIcon sx={{ color: 'red' }} />
                    </IconButton>
                    <TextField 
                      key={`radio-option-${idx}-change-${idx}-value-${option?.value}`}
                      type='text'
                      name='options'
                      value={option?.label}
                      sx={{ mb: 1 }}
                      onChange={(e) => handleElementPropertyChange(e, 'properties', option?.id)}
                    />
                  </Box>
                ))
              }
              <IconButton sx={{ borderRadius: 2, width: '100%' }} onClick={(e) => handleAddElementProperties(e, 'properties')}>
                <AddIcon /> 
                <Typography sx={{ fontSize: '12px' }}>Add option</Typography>
              </IconButton>
            </Box>
            <Box>
              <Typography variant='subtitle2'>
                Full Width
              </Typography>
              <FormControl>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  defaultValue="female"
                  name="fullWidth"
                  value={activeDraggedItem?.properties?.fullWidth}
                  onChange={(e) => handleElementPropertyChange(e, 'properties')}
                >
                  <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                  <FormControlLabel value="No" control={<Radio />} label="No" />
                </RadioGroup>
              </FormControl>
            </Box>
          </>
      }
    }

    return (
      <>
        <Grid container spacing={2} sx={{ p: 2, m: 2 }}>
          { (isAdmin || menuPermissions?.write) && (<Grid size={12}>
            <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "flex-end" }}>
              <Stack direction={'row'} gap={2}>
                {/* <Button variant='outlined'>
                  Import Sections
                </Button> */}
                <Button variant='contained' onClick={() => setState({ right: true })}>
                  Create Section
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
                          <Tab label="Section Setup" {...a11yProps(0)} />
                        </Tabs>
                      </Box>
                      <CustomTabPanel value={value} index={0}>
                        <FormGroup>
                          <Box sx={{ p: 1 }}>
                            <InputLabel>
                              <Typography>Section Name</Typography>
                            </InputLabel>
                            <TextField 
                              required
                              type='text'
                              name='section_name'
                              fullWidth
                              value={formState?.section_name}
                              onChange={handleInputChange}
                              onBlur={handleInputBlur}
                              error={formState?.errors?.section_name ? true : false}
                              helpertext="true"
                              helperText={formState?.errors?.section_name ? "Section name is required" : false}
                              placeholder='cdss-nurse-phase01'
                              disabled={formState?.disabled}
                            />
                          </Box>
                          <Box sx={{ p: 1 }}>
                            <InputLabel>
                              <Typography>Section Title</Typography>
                            </InputLabel>
                            <TextField 
                              required
                              type='text'
                              name='section_title'
                              fullWidth
                              value={formState?.section_title}
                              onChange={handleInputChange}
                              onBlur={handleInputBlur}
                              error={formState?.errors?.section_title ? true : false}
                              helpertext="true"
                              helperText={formState?.errors?.section_title ? "Section title is required" : false}
                              placeholder='nurse'
                              disabled={formState?.disabled}
                            />
                          </Box>
                          <Box sx={{ p: 1 }}>
                            <InputLabel>
                              <Typography>Section Description</Typography>
                            </InputLabel>
                            <TextField 
                              required
                              type='text'
                              name='section_description'
                              fullWidth
                              multiline
                              rows={5}
                              value={formState?.section_description}
                              onChange={handleInputChange}
                              onBlur={handleInputBlur}
                              error={formState?.errors?.section_description ? true : false}
                              helpertext="true"
                              helperText={formState?.errors?.section_description ? "Section description name is required" : false}
                              placeholder='the pupose of this group is to ....'
                              disabled={formState?.disabled}
                            />
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
                                <Typography>Build a section</Typography>
                              </InputLabel>
                              <Button variant='outlined' onClick={handleBuilderModal}>
                                Open Builder
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
                builderModalShow && (
                  <Modal
                    open={builderModalShow}
                    onClose={handleCloseBuilderModal}
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
                      overflow: 'hidden',
                      overflowY: "scroll",
                      p: 4,
                    }}>
                      <Grid container spacing={2}>
                        <Grid size={10}>
                          <Typography variant="h5" sx={{ mb: 2 }}>
                            Build a section
                          </Typography>
                        </Grid>
                        <Grid size={2} sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
                          <IconButton onClick={handleCloseBuilderModal}>
                            <CloseIcon />
                          </IconButton>
                        </Grid>
                      </Grid>
                      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs value={builderSteps} onChange={handleChange} aria-label="basic tabs example">
                          <Tab label="Section Builder" {...a11yProps(0)} />
                          <Tab label="Section Validation Builder" {...a11yProps(1)} />
                          <Tab label="Section Logic Builder" {...a11yProps(2)} />
                        </Tabs>
                      </Box>
                      <CustomTabPanel value={builderSteps} index={0}>
                        <DndContext onDragEnd={handleDragEnd}>
                          <Grid container spacing={2}>
                            <Grid container size={{ xs: 4, md: 3 }} spacing={0}>
                              <DraggableArea draggableItems={draggableItems} />
                            </Grid>
                            <Grid size={{ xs: 8, md: 7 }}>
                              <DroppableArea
                                droppedItems={draggedItems} 
                                selectedItem={activeDraggedItem} 
                                handleRemoveElement={handleRemoveElement} 
                                handleClickElement={handleClickElement}
                                handleDragSortableEnd={handleDragSortableEnd}
                              />
                            </Grid>
                            <Grid size={{ xs: 12, md: 2 }}>
                              <Box
                                sx={{
                                  width: '100%',
                                  height: '100%',
                                  border: '1px solid #eee',
                                  p: 1,
                                  m: 1,
                                  borderRadius: 2,
                                }}
                              >
                                <Box
                                  sx={{
                                    backgroundColor: "#fdfdfd",
                                    width: '100%',
                                    height: '100%',
                                    borderRadius: 2,
                                    p: 1,
                                  }}
                                >
                                  {
                                    draggedItems?.length > 0 ? 
                                      renderElementProperties(activeDraggedItem)
                                    :
                                    <>
                                      <Box sx={{ 
                                        width: '100%',
                                        minHeight: draggedItems?.length == 0 ? '100%' : undefined,
                                        display: 'flex', 
                                        flexDirection: 'column', 
                                        alignItems: 'center', 
                                        justifyContent: 'center',
                                        backgroundColor: "#fdfdfd",
                                        borderRadius: 4,
                                      }}>
                                        <Typography variant="body1" color="#ccc" sx={{ fontWeight: 'bold' }}>
                                          Drag an element from the left sidebar to build.
                                        </Typography>
                                      </Box>
                                    </>
                                  }
                                </Box>
                              </Box>
                            </Grid>
                          </Grid>
                        </DndContext>
                        <Stack direction={"row"} gap={2} sx={{ mt: 2 }}>
                          <Box sx={{ p: 1 }}>
                            <Button 
                              fullWidth
                              variant="outlined" 
                              onClick={(e) => handlePrevious(e, (builderSteps == 0 ? 0 : builderSteps - 1))} 
                              disabled={builderSteps == 0 ? true : false}
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
                            >
                              Next
                            </Button>
                          </Box>
                        </Stack>
                      </CustomTabPanel>
                      <CustomTabPanel value={builderSteps} index={1}>
                        <Grid container spacing={2} sx={{ m: 2}}>
                          <Grid size={12}>
                            {
                              draggedItems?.length > 0 ?
                              draggedItems?.map((item, idx) => (
                                <>
                                  <Accordion key={`form-validation-${item?.elemId}-unique-${idx}`}>
                                    <AccordionSummary
                                      expandIcon={<ExpandMoreIcon />}
                                      aria-controls={`panel${idx}-content`}
                                      id={`panel${idx}-header`}
                                    >
                                      <Typography component="span">{item?.title}</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                      required: Yes / No
                                      default Value: something
                                      conditions: something here..
                                    </AccordionDetails>
                                  </Accordion>
                                </>
                              ))
                              :
                              <>
                                <Box sx={{ 
                                  width: '100%',
                                  minHeight: draggedItems?.length == 0 ? '100%' : undefined,
                                  display: 'flex', 
                                  flexDirection: 'column', 
                                  alignItems: 'center', 
                                  justifyContent: 'center',
                                  backgroundColor: "#fdfdfd",
                                  borderRadius: 4,
                                }}>
                                  <Typography variant="body1" color="#ccc" sx={{ fontWeight: 'bold' }}>
                                    Build the section to add validations.
                                  </Typography>
                                </Box>
                              </>
                            }
                          </Grid>
                        </Grid>
                        <Stack direction={"row"} gap={2}>
                          <Box sx={{ p: 1 }}>
                            <Button 
                              fullWidth
                              variant="outlined" 
                              onClick={(e) => handlePrevious(e, (builderSteps == 0 ? 0 : builderSteps - 1))} 
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
                            >
                              Next
                            </Button>
                          </Box>
                        </Stack>
                      </CustomTabPanel>
                      <CustomTabPanel value={builderSteps} index={2}>
                        <Grid container spacing={2} sx={{ m: 2}}>
                          <Grid size={12}>
                            {
                              draggedItems?.length > 0 ?
                              draggedItems?.map((item, idx) => (
                                <>
                                  <Accordion key={`form-validation-${item?.elemId}-unique-${idx}`}>
                                    <AccordionSummary
                                      expandIcon={<ExpandMoreIcon />}
                                      aria-controls={`panel${idx}-content`}
                                      id={`panel${idx}-header`}
                                    >
                                      <Typography component="span">{item?.title}</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                      Question 1
                                      Answer
                                    </AccordionDetails>
                                  </Accordion>
                                </>
                              ))
                              :
                              <>
                                <Box sx={{ 
                                  width: '100%',
                                  minHeight: draggedItems?.length == 0 ? '100%' : undefined,
                                  display: 'flex', 
                                  flexDirection: 'column', 
                                  alignItems: 'center', 
                                  justifyContent: 'center',
                                  backgroundColor: "#fdfdfd",
                                  borderRadius: 4,
                                }}>
                                  <Typography variant="body1" color="#ccc" sx={{ fontWeight: 'bold' }}>
                                    Build the section to add logic.
                                  </Typography>
                                </Box>
                              </>
                            }
                          </Grid>
                        </Grid>
                        <Stack direction={"row"} gap={2}>
                          <Box sx={{ p: 1 }}>
                            <Button 
                              fullWidth
                              variant="outlined" 
                              onClick={(e) => handlePrevious(e, (builderSteps == 0 ? 0 : builderSteps - 1))} 
                            >
                              Back
                            </Button>
                          </Box>
                          <Box sx={{ p: 1 }}>
                            <Button
                              fullWidth
                              variant="contained" 
                              loading={formState?.loading} 
                              onClick={handleCloseBuilderModal}
                              loadingPosition="start"
                            >
                              Close
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

export default Sections;