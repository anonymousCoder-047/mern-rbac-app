
import _ from "lodash";
import { closestCenter, DndContext, PointerSensor, useSensor, useSensors } from "@dnd-kit/core"
import { SortableContext, useSortable } from '@dnd-kit/sortable';
import { 
  Box, 
  Button,  
  Checkbox, 
  FormControl, 
  FormControlLabel, 
  FormGroup, 
  FormLabel, 
  IconButton, 
  MenuItem, 
  Radio, 
  RadioGroup, 
  Select, 
  Slider,
  TextField, 
  Typography 
} from "@mui/material";
import CancelIcon from '@mui/icons-material/Cancel';
import { CSS } from "@dnd-kit/utilities";

const renderMuiInputField = (item) => {
  switch (item?.type) {
    case 'heading':
      return <Typography variant="h2">{item?.title}</Typography>;
    case 'paragraph':
      return <Typography variant="body2">{item?.title}</Typography>;
    case 'number':
      return <TextField variant="outlined" type={item?.type} placeholder={item?.properties?.placeholder} fullWidth value={item?.properties?.value} />;
    case 'text':
      return <TextField variant="outlined" type={item?.type} placeholder={item?.properties?.placeholder} fullWidth value={item?.properties?.value} />;
    case 'link':
      return <TextField variant="outlined" type={item?.type} placeholder={item?.properties?.placeholder} fullWidth value={item?.properties?.value} />;
    case 'button':
      return <Button variant={item?.properties?.variant} color={item?.properties?.color} fullWidth={item?.properties?.fullWidth?.toLowerCase() == 'yes' ? true : false}>{item?.properties?.label}</Button>;
    case 'checkbox':
      return <FormControlLabel control={<Checkbox />} label={<Typography variant="body2">{item?.properties?.label}</Typography>} />;
    case 'radio':
      return <FormControlLabel control={<Radio />} label={<Typography variant="body2">{item?.properties?.label}</Typography>} />;
    case 'checkboxGroup':
      return <>
        <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
          <FormLabel component="legend">{item?.title}</FormLabel>
          <FormGroup>
            {
              item?.properties?.options?.map((option, index) => (
                <FormControlLabel
                  key={`checkbox-option-${index}-value-${option?.value}-unique-${index}`}
                  control={
                    <Checkbox />
                  }
                  label={<Typography variant="body2">{option?.label}</Typography>}
                  value={option?.value}
                />
              ))
            }
          </FormGroup>
        </FormControl>
      </>;
    case 'radioGroup':
      return <>
        <FormControl>
          <FormLabel id="demo-radio-buttons-group-label">{item?.title}</FormLabel>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="female"
            name="radio-buttons-group"
          >
            {
              item?.properties?.options?.map((option, index) => (
                <FormControlLabel
                  key={`radio-option-${index}-value-${option?.value}-unique-${index}`}
                  control={
                    <Radio />
                  } 
                  label={<Typography variant="body2">{option?.label}</Typography>}
                  value={option?.value}
                />
              ))
            }
          </RadioGroup>
        </FormControl>
      </>;
    case 'select':
      return (
        <Select defaultValue={item?.properties?.items?.[0]} fullWidth>
          {item?.properties?.options?.map((option, index) => (
            <MenuItem key={`select-option-${index}-value-${option?.id}-unique-${index}`} value={option?.value}>{option?.label}</MenuItem>
          ))}
        </Select>
      );
    case 'slider':
      return <Slider min={item?.properties?.min} max={item?.properties?.max} />;
    case 'date':
      return <TextField type="date" variant="outlined" value={item?.properties?.value} fullWidth />;
    case 'time':
      return <TextField type="time" variant="outlined" value={item?.properties?.value} fullWidth />;
    default:
      return <span>Unsupported element type</span>;
  }
};

const DroppableItem = ({
  keyVal: key,
  id,
  item,
  handleRemoveElement,
  handleClickElement,
}) => {
  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
  } = useSortable({
    id: id,
    data: item,
  });
  
  const sortableStyle = {
    transform: CSS.Transform.toString(transform),
    transition: transition,
    border: '1.5px solid #eee',
    borderRadius: '16px',
    padding: "16px",
    width: '100%',
    cursor: 'move',
    flex: item?.properties?.fullWidth?.toLowerCase() == 'yes' ? "1 100%" : "1 1 45%",
  };

  return (
    <div key={key} ref={setNodeRef} style={sortableStyle} {...attributes} {...listeners}>        
      <Box 
        sx={{ 
          mb: 1,
          p: 2,
          border: '1px dashed #eee',
          borderRadius: 2,
        }} 
        onClick={(e) => handleClickElement(e, item)}
      >
        <IconButton sx={{ float: 'right' }} onClick={(e) => handleRemoveElement(e, item)}>
          <CancelIcon />
        </IconButton>
        <Box>
          {!['button', 'heading', 'checkbox', 'radio', 'checkboxGroup', 'radioGroup', 'paragraph']?.includes(item?.type) && (<Typography>{item?.title}</Typography>)}
          {renderMuiInputField(item)}
        </Box>
      </Box>
    </div>
  );
}

const DroppableArea = ({
  droppedItems=[],
  selectedItem={},
  handleRemoveElement=()=>{},
  handleClickElement=()=>{},
  handleDragSortableEnd=()=>{},
}) => {

  const sensor = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        delay: 150,
        tolerance: 0,
      },
    })
  );
  
  return (
    <Box
      sx={{
        m: 1,
        p: 1,
        height: "100%",
        border: '1.5px dashed #eee',
        borderRadius: 2,
      }}
    >
      <DndContext sensors={sensor} collisionDetection={closestCenter} onDragEnd={handleDragSortableEnd}>
        <SortableContext items={droppedItems.map(item => item.elemId)}>
          <div style={{ 
            display: 'flex',
            flexWrap: 'wrap',
            gap: "16px",
            height: droppedItems?.length == 0 ? '100%' : undefined,
          }}>
            {
              droppedItems?.length > 0 ? 
                droppedItems?.map((item, idx) => (
                  <DroppableItem
                    key={`dropped-item-${idx}-unique-${item?.elemId}`} 
                    keyVal={`dropped-item-${idx}-dropping-${idx}-unique-${item?.elemId}`} 
                    id={item?.elemId} 
                    item={item}
                    activeItem={selectedItem} 
                    handleRemoveElement={handleRemoveElement} 
                    handleClickElement={handleClickElement}
                  />
                ))
              :
              <Box sx={{ 
                width: '100%',
                minHeight: droppedItems?.length == 0 ? '100%' : undefined,
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
            }
          </div>
        </SortableContext>
      </DndContext>
    </Box>
  );
}

export default DroppableArea;