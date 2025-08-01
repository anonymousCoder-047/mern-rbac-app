import React, { useState } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { TextField, RadioGroup, FormControlLabel, Radio, Button, Card, CardContent } from "@mui/material";
import { useForm, Controller } from "react-hook-form";

const fieldTypes = [
  { type: "text", label: "Text Field" },
  { type: "radio", label: "Radio Group" },
];

const DraggableField = ({ field, index, moveField }) => {
  const [, ref] = useDrag({
    type: "FIELD",
    item: { index },
  });
  return (
    <Card ref={ref} style={{ marginBottom: "8px", padding: "10px" }}>
      {field.type === "text" && <TextField label="Text Field" fullWidth disabled />}
      {field.type === "radio" && <RadioGroup><FormControlLabel value="option1" control={<Radio />} label="Option 1" /></RadioGroup>}
    </Card>
  );
};

const DropZone = ({ onDrop }) => {
  const [, ref] = useDrop({
    accept: "FIELD",
    drop: (item) => onDrop(item.index),
  });
  return <div ref={ref} style={{ minHeight: "100px", border: "1px dashed gray", padding: "10px" }} />;
};

export default function FormBuilder() {
  const [fields, setFields] = useState([]);
  const { control, handleSubmit } = useForm();

  const addField = (type) => setFields([...fields, { type }]);

  const onSubmit = (data) => console.log("Form Data:", data);

  return (
    <DndProvider backend={HTML5Backend}>
      <div style={{ display: "flex", gap: "20px" }}>
        <div>
          <h3>Available Fields</h3>
          {fieldTypes.map((field) => (
            <Button key={field.type} variant="contained" onClick={() => addField(field.type)}>
              {field.label}
            </Button>
          ))}
        </div>
        <div>
          <h3>Form Builder</h3>
          <DropZone onDrop={(index) => console.log("Dropped at", index)} />
          {fields.map((field, index) => (
            <DraggableField key={index} field={field} index={index} />
          ))}
          <Button variant="contained" onClick={handleSubmit(onSubmit)}>Submit</Button>
        </div>
      </div>
    </DndProvider>
  );
}
