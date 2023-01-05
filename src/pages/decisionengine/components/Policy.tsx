import * as React from 'react';
import { render } from 'react-dom';
import {
    Grid,
    Accordion,
    AccordionDetails,
    CardContent,
    Card,
    AccordionSummary,
    Box,
    Paper,
    TextField,
    Typography,
    Button
} from "@mui/material";
import { Field, Form, Formik, useField, useFormik, useFormikContext, FormikProvider } from "formik";
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import styled from "@emotion/styled";

const Label = styled(Typography)`
    font-weight: bold;
    text-transform: capitalize;
`;
const CloseRangeEditor = ({
    fieldPath,
    variant = 'standard',
    inputWidth = 'auto',
    openRange = false
}: { fieldPath: string, variant?: 'standard' | 'outlined', inputWidth?: number | string, openRange?: boolean }) => {
    const [minField] = useField(`${fieldPath}.min`);
    const [maxField] = useField(`${fieldPath}.max`);
    return (
        <div style={{ display: "flex", gap: 5, alignItems: 'baseline', flexGrow: 1 }}>
            <NumberEditor field={minField} placeholder={'Min'} inputWidth={inputWidth} variant={variant} />
            <Typography>to</Typography>
            <NumberEditor field={maxField} placeholder={'Max'} inputWidth={inputWidth} variant={variant} />
        </div>
    );
}
const NumberEditor = ({
    variant = 'standard',
    field,
    inputWidth = 'auto',
    placeholder
}: { variant?: 'standard' | 'outlined', field: object, inputWidth?: number | string, placeholder: string }) => (
    <TextField
        style={{ flexGrow: 1, height: 25 }}
        type={'number'}
        size={"small"}
        variant={variant}
        {...field}
        InputLabelProps={{ style: { height: 25 } }}
        InputProps={{
            placeholder,
            style: { width: inputWidth, height: 25 }
        }}
        inputProps={{ style: { textAlign: 'center' } }}
    />
)

const OpenRangeEditor = ({
    fieldPath,
    variant = 'standard',
    inputWidth = 'auto',
    openRange = false
}: { fieldPath: string, variant?: 'standard' | 'outlined', inputWidth?: number | string, openRange?: boolean }) => {
    const [minField, , minHelper] = useField(`${fieldPath}.min`);
    const [maxField, , maxHelper] = useField(`${fieldPath}.max`);
    const [aboveOrBelow, setAboveOrBelow] = React.useState<string>('');
    const setMinMax = (v: string) => {
        setAboveOrBelow(v);
        const min = minField.value;
        const max = maxField.value;
        const editableField = (aboveOrBelow === 'above') ? minHelper : maxHelper;
        editableField.setValue(min ?? max);
    }
    return (
        <div style={{ display: "flex", gap: 5, alignItems: 'baseline', flexGrow: 1 }}>
            <NumberEditor field={(aboveOrBelow === 'above') ? minField : maxField} placeholder={''}
                inputWidth={inputWidth} variant={variant} />
            <Typography>or</Typography>
            <Select value={aboveOrBelow} fullWidth variant={'standard'}
                onChange={(e) => setMinMax(e.target.value)}>
                <MenuItem value={'above'}>above</MenuItem>
                <MenuItem value={'below'}>below</MenuItem>
            </Select>
        </div>
    );
}

const RangeEditor = ({
    isOpen = false,
    ...rest
}: { isOpen?: boolean, fieldPath: string, variant?: 'standard' | 'outlined', inputWidth?: number | string, openRange?: boolean }) => {
    if (isOpen) {
        return <OpenRangeEditor {...rest} />
    } else {
        return <CloseRangeEditor {...rest} />
    }
}

const ControlContainer = styled.div`
display: flex;
gap:15px;
align-items:baseline;
padding-left:5px;
padding-right:15px;
`;


export const PolicyEditor = () => {

    const [product, meta, helpers] = useField(`product`);//product name
    const [name, meta8, helpers8] = useField(`name`);//name of model
    const [loanMin, meta2, helpers2] = useField(`policy.loanRange.min`);
    const [loanMax, meta3, helpers3] = useField(`policy.loanRange.max`);
    const [termMin, meta4, helpers4] = useField(`policy.loanTermInMonths.min`);
    const [termMax, meta5, helpers5] = useField(`policy.loanTermInMonths.max`);
    const [purpose, meta6, helpers6] = useField(`policy.loanPurpose`);
    const [isSecured, meta7, helpers7] = useField(`policy.isSecured`);

    return (

        <Card sx={{ boxShadow: '0px 3px 6px #00000029' }}>
            <CardContent>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                    <Grid container>
                        <Grid item md={6}>
                            <ControlContainer>
                                <Label>Product:</Label>
                                <Select
                                    fullWidth
                                    variant="standard"
                                    {...product}
                                >
                                    <MenuItem value={'Working Capital Loan'}>Working Capital Loan</MenuItem>
                                    <MenuItem value={'Product 2'}>Product 2</MenuItem>
                                    <MenuItem value={'Product 3'}>Product 3</MenuItem>
                                </Select>
                            </ControlContainer>
                        </Grid>

                        <Grid item md={6}>
                            <ControlContainer>
                                <Label>Model:</Label>
                                <TextField
                                    fullWidth
                                    variant="standard"
                                    {...name}
                                />
                            </ControlContainer>
                        </Grid>
                    </Grid>

                    <Grid container>
                        <Grid item md={6}>
                            <ControlContainer>
                                <Label>Loan Range (£):</Label>
                                <RangeEditor fieldPath={'policy.loanRange'} />
                            </ControlContainer>
                        </Grid>
                        <Grid item md={6}>
                            <ControlContainer>
                                <Label>Term:</Label>
                                <RangeEditor fieldPath={'policy.loanTermInMonths'} />
                            </ControlContainer>
                        </Grid>
                    </Grid>

                    <Grid container style={{ alignItems: 'flex-end' }}>
                        <Grid item md={6}>
                            <ControlContainer>
                                <Label>Purpose:</Label>
                                <Select
                                    fullWidth
                                    variant="standard"
                                    {...purpose}
                                >
                                    <MenuItem value={`Purpose 1`}>Purpose 1</MenuItem>
                                    <MenuItem value={`Purpose 2`}>Purpose 2</MenuItem>
                                    <MenuItem value={`Purpose 3`}>Purpose 3</MenuItem>
                                </Select>
                            </ControlContainer>
                        </Grid>
                        <Grid item md={6}>
                            <label>
                                <Field type="radio" {...isSecured} value="true" />
                                <span style={{ fontWeight: "bold" }}>Secured</span>
                            </label>
                            <label>
                                <Field type="radio" {...isSecured} value="false" />
                                <span style={{ fontWeight: "bold" }}>Unsecured</span>
                            </label>
                        </Grid>
                    </Grid>

                </div>
            </CardContent>
        </Card>

    )
}
