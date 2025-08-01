
import {
  useDraggable,
} from '@dnd-kit/core';
import _ from "lodash";
import { CSS } from '@dnd-kit/utilities';
import { Box, Card, CardContent, Typography } from '@mui/material';

function DraggableItem({ 
  id,
  data,
  element,
}) {
  const { setNodeRef, listeners, attributes, transform } = useDraggable({
    id,
    data,
  });
  
  const style = {
    transform: CSS.Transform.toString(transform),
    padding: '10px',
    display: 'inline-block',
    width: '50%',
    cursor: 'pointer',
  };

  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
      {element}
    </div>
  );
}

const DraggableArea = ({ draggableItems=[] }) => {
  return (
    <Box
      sx={{
        m: 1,
        p: 1,
        border: '1.5px dashed #eee',
        borderRadius: 2,
        height: "100%"
      }}
    >
      {
        !_.isEmpty(draggableItems) ? 
          draggableItems?.map((_item, _idx) => (
            <DraggableItem key={`draggable-item-${_idx}-unique-${_item?.id}`} id={_item?.id} data={{ ..._.pick(_item, ['properties', 'title', 'type']) }} element={
              <>
                <Card>
                  <CardContent sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                      {_item?.icon}
                    </Box>
                    <Typography variant='body2' sx={{ textAlign: 'center', lineHeight: 1.3, mt: 1 }}>
                      {_item?.title}
                    </Typography>
                  </CardContent>
                </Card>
              </>
            } />
          ))
        : "No items to drag."
      }
    </Box>
  );
}

export default DraggableArea;