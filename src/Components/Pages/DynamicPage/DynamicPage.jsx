import { useEffect, useState } from "react";
import { endpoints } from "../../../Server/endpoints";
import { 
    Accordion, 
    AccordionDetails, 
    AccordionSummary, 
    Box, 
    FormGroup, 
    MenuItem, 
    TextField, 
    Typography,
    FormControlLabel,
    Checkbox,
    Radio,
    RadioGroup,
    Alert,
    Button,
    Grid2 as Grid,
} from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import _ from "lodash";
import useProtectedRoutes from "../../../hooks/useProtectedRoute";

import useConfig from "../../../hooks/useConfig";
import useError from "../../../hooks/useError";

import { show_toast } from "../../../store/Reducers/LogErrorsReducer";
import { getErrorMessage } from "../../../constant/general_errors";

const DynamicPage = ({
    permissions,
    attributes,
    elemKey,
    sections: pageSections,
    ...rest
}) => {
    const { dispatch:dispatchError } = useError();
    const config = useConfig();

    const [anchorEl, setAnchorEl] = useState(null);
    const menuOpen = Boolean(anchorEl);
    const [currentAction, setCurrentAction] = useState('read');
    const [hasPermission, setHasPermission] = useState(null);
    const [menuPermissions, setMenuPermissions] = useState({
      write: false,
      read: false,
      update: false,
      delete: false,
    })
    const [selectedSection, setSelectedSection] = useState({})
    const authenticatedServer = useProtectedRoutes();
    const [formData, setFormData] = useState({});
    const [errors, setErrors] = useState({});
    const [pageFields, setPageFields] = useState({
        formFields: [],
    });
    
    const normalizeLabel = (str) => _.startCase(str.replace(/([a-z])([A-Z])/g, '$1 $2'));

    const canRead = (fieldKey, title) => {
        if (['heading', 'paragrapgh'].includes(fieldKey?.split('@')[0])) return true;

        const key = `${elemKey}:${normalizeLabel(title)}:read`;
        return _.get(attributes, key, false);
    };

    const canCreate = (title) => {
        const key = `${elemKey}:${normalizeLabel(title)}:write`;
        return _.get(attributes, key, false);
    }; 
    
    useEffect(() => {
      if(permissions?.[elemKey]?.[currentAction]) {
        setHasPermission(true);
        setMenuPermissions({ ...menuPermissions, [currentAction]: true });
      }
      else {
        setHasPermission(false)
        setMenuPermissions({ ...menuPermissions, [currentAction]: false });
      }
    }, [currentAction]);

    const getSectionData = async () => {
        try {
            // const { Sections } = endpoints;
            // const { data: { data }} = await authenticatedServer.get(Sections.view + `?resourceId=${rest?._id}`);
            
            if(!_.isEmpty(pageSections)) {
                setPageFields({ ...pageFields, formFields: pageSections })
                dispatchError(show_toast({ show: true, severity: "success", variant: "filled", message: "Section data found." }));
            } else dispatchError(show_toast({ show: true, severity: "warning", variant: "filled", message: "Unable to fetch data." }));
        } catch(err) {
            setPageFields({ ...pageFields, formFields: [] })
            dispatchError(show_toast({ show: true, severity: "error", variant: "filled", message: getErrorMessage(err) }));
        }
    }

    useEffect(() => {
        getSectionData();
    }, [rest?._id])

    const handleChange = (e, key, type) => {
        const value = type === 'checkbox' ? e.target.checked : e.target.value;
        setFormData((prev) => ({ ...prev, [key]: type === 'number' ? Number(value) : value }));
        setErrors((prev) => ({ ...prev, [key]: undefined })); // Clear error on change
    };

    const validate = () => {
        const errors = {};

        _.forEach(selectedSection, (field, key) => {
            const { type, properties } = field;
            const value = formData[key];

            if (properties?.required && (value === undefined || value === '' || value === null)) {
            errors[key] = 'This field is required';
            }

            if (type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                errors[key] = 'Invalid email format';
            }
            }

            if (type === 'number' && value < 0) {
            errors[key] = 'Number cannot be negative';
            }
        });

        setErrors(errors);

        return _.isEmpty(errors);
    };

    const handleSubmit = () => {
        if (validate()) {
            console.log('Form submitted:', formData);
            alert('Form is valid and ready to submit!');
        } else {
            alert('Please fix validation errors.');
        }
    };
 
    // Here you can use the props to render dynamic content based on the resource_slug or other properties

    return (
        <>
            <Grid container spacing={2} sx={{ p: 2, m: 2 }}>
                {
                    pageFields.formFields?.length > 0 ? (
                        <>
                            <Grid size={12}>
                                { pageFields.formFields.map((field, index) => (
                                    <Box sx={{ m: 2 }} key={`section_${field.section_title}_${index}`}>
                                        <Accordion sx={{ p: 2 }} key={`section_main_${field.section_title}_${index}`} onClick={() => setSelectedSection(field?.section_fields?.schema)}>
                                            <AccordionSummary
                                                expandIcon={<ExpandMoreIcon />}
                                                aria-controls="panel1-content"
                                                id="panel1-header"
                                            >
                                                <Typography component="span">{field?.section_title}</Typography>
                                            </AccordionSummary>
                                            <AccordionDetails>
                                                {field?.section_description}

                                                {/* Render other fields as needed */}
                                                {_.map(field?.section_fields?.schema, (field, key) => {
                                                    const { type, title, properties } = field;
                                                    const fullWidth = properties.fullWidth?.toLowerCase() === 'yes';
                                                    const value = formData[key] || '';
                                                    const error = errors[key];
                                                    const disabled = !canCreate(title);
                                                    
                                                    if (!canRead(key, title)) return null;

                                                    return (
                                                        <FormGroup key={key} sx={{ mt: 1, mb: 1 }}>
                                                            {type !== 'checkbox' && type !== 'paragraph' && (
                                                                <Typography variant="subtitle2">{title}</Typography>
                                                            )}

                                                            {(() => {
                                                                switch (type) {
                                                                case 'heading':
                                                                    return (
                                                                    <Typography
                                                                        variant="h5"
                                                                        sx={{
                                                                            fontWeight: properties.bold ? 'bold' : 'normal',
                                                                            fontSize: properties.fontSize || '24px',
                                                                        }}
                                                                    >
                                                                        {title}
                                                                    </Typography>
                                                                    );

                                                                case 'paragraph':
                                                                    return (
                                                                    <Typography
                                                                        variant="body1"
                                                                        sx={{
                                                                            fontWeight: properties.bold ? 'bold' : 'normal',
                                                                            fontSize: properties.fontSize || '16px',
                                                                        }}
                                                                    >
                                                                        {properties.text}
                                                                    </Typography>
                                                                    );

                                                                case 'number':
                                                                    return (
                                                                    <TextField
                                                                        type="number"
                                                                        fullWidth={fullWidth}
                                                                        margin="normal"
                                                                        value={value}
                                                                        onChange={(e) => handleChange(e, key, type, Number(e.target.value))}
                                                                        error={!!error}
                                                                        helperText={error}
                                                                        disabled={disabled}
                                                                    />
                                                                    );

                                                                case 'text':
                                                                    return (
                                                                    <TextField
                                                                        type="number"
                                                                        fullWidth={fullWidth}
                                                                        margin="normal"
                                                                        value={value}
                                                                        onChange={(e) => handleChange(e, key, e.target.value)}
                                                                        error={!!error}
                                                                        helperText={error}
                                                                        disabled={disabled}
                                                                    />
                                                                    );

                                                                case 'email':
                                                                    return (
                                                                    <TextField
                                                                        type="number"
                                                                        fullWidth={fullWidth}
                                                                        margin="normal"
                                                                        value={value}
                                                                        onChange={(e) => handleChange(e, key, e.target.value)}
                                                                        error={!!error}
                                                                        helperText={error}
                                                                        disabled={disabled}
                                                                    />
                                                                    );

                                                                case 'textArea':
                                                                    return (
                                                                    <TextField
                                                                        multiline
                                                                        rows={4}
                                                                        fullWidth={fullWidth}
                                                                        margin="normal"
                                                                        value={value}
                                                                        onChange={(e) => handleChange(e, key, e.target.value)}
                                                                        error={!!error}
                                                                        helperText={error}
                                                                        disabled={disabled}
                                                                    />
                                                                    );

                                                                case 'select':
                                                                    return (
                                                                    <TextField
                                                                        select
                                                                        fullWidth={fullWidth}
                                                                        margin="normal"
                                                                        defaultValue=""
                                                                        value={value}
                                                                        onChange={(e) => handleChange(e, key, e.target.value)}
                                                                        error={!!error}
                                                                        helperText={error}
                                                                        disabled={disabled}
                                                                    >
                                                                        {properties.options?.map((opt) => (
                                                                        <MenuItem key={opt.id} value={opt.value}>
                                                                            {opt.label}
                                                                        </MenuItem>
                                                                        ))}
                                                                    </TextField>
                                                                    );

                                                                case 'checkbox':
                                                                    return (
                                                                    <FormControlLabel
                                                                        control={<Checkbox 
                                                                            checked={!!value}
                                                                            onChange={(e) => handleChange(e, key, e.target.checked)}
                                                                        />}
                                                                        label={title}
                                                                        disabled={disabled}
                                                                    />
                                                                    );

                                                                case 'radioGroup':
                                                                    return (
                                                                    <RadioGroup 
                                                                        row
                                                                        value={value}
                                                                        onChange={(e) => handleChange(e, key, e.target.value)}
                                                                        disabled={disabled}
                                                                    >
                                                                        {properties.options?.map((opt) => (
                                                                        <FormControlLabel
                                                                            key={opt.id}
                                                                            value={opt.value}
                                                                            control={<Radio />}
                                                                            label={opt.label}
                                                                        />
                                                                        ))}
                                                                    </RadioGroup>
                                                                    );

                                                                case 'link':
                                                                    return (
                                                                        <TextField
                                                                            type="url"
                                                                            fullWidth={fullWidth}
                                                                            margin="normal"
                                                                            value={value}
                                                                            onChange={(e) => handleChange(e, key, e.target.value)}
                                                                            error={!!error}
                                                                            helperText={error}
                                                                            disabled={disabled}
                                                                        />
                                                                    );

                                                                default:
                                                                    return (
                                                                        <Alert severity="warning">
                                                                            Unsupported field type: <strong>{type}</strong>
                                                                        </Alert>
                                                                    );
                                                                }
                                                            })()}
                                                        </FormGroup>
                                                    );
                                                })}

                                                <Button variant="contained" onClick={handleSubmit}>Submit</Button>
                                            </AccordionDetails>
                                        </Accordion>
                                    </Box>
                                ))}
                            </Grid>
                        </>
                    ) : (
                        <Grid size={12}>
                            <Box sx={{ m: 2, p: 2, textAlign: 'center' }}>
                                <Typography variant="body1" component="div">
                                    No sections available for this resource.
                                </Typography>
                            </Box>
                        </Grid>
                    )
                }
            </Grid>
        </>
    )
}

export default DynamicPage;