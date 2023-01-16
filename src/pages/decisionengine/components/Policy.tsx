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
    Button,
    RadioGroup,
    FormControlLabel,
    Radio
} from "@mui/material";
import { Field, Form, Formik, useField, useFormik, useFormikContext, FormikProvider } from "formik";
import { RangeEditor } from '../editors/EditorControllers';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import styled from "@emotion/styled";

const Label = styled(Typography)`
    font-weight: bold;
    text-transform: capitalize;
`;

const ControlContainer = styled.div`
display: flex;
gap:15px;
align-items:baseline;
padding-left:5px;
padding-right:15px;
`;


export const PolicyEditor = ({ isDisabled = false }: { isDisabled?: boolean }) => {

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
                                    disabled={isDisabled}
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
                                    disabled={isDisabled}
                                />
                            </ControlContainer>
                        </Grid>
                    </Grid>

                    <Grid container>
                        <Grid item md={6}>
                            <ControlContainer>
                                <Label>Loan Range (£):</Label>
                                <RangeEditor fieldPath={'policy.loanRange'} isDisabled={isDisabled} />
                            </ControlContainer>
                        </Grid>
                        <Grid item md={6}>
                            <ControlContainer>
                                <Label>Term:</Label>
                                <RangeEditor fieldPath={'policy.loanTermInMonths'} isDisabled={isDisabled} />
                            </ControlContainer>
                        </Grid>
                    </Grid>

                    <Grid container style={{ alignItems: 'flex-end' }}>
                        <Grid item md={6}>
                            <ControlContainer>
                                <Label>Purpose:</Label>
                                <Select
                                    multiple
                                    fullWidth
                                    variant="standard"
                                    {...purpose}
                                    disabled={isDisabled}
                                >
                                    <MenuItem value={`Purpose 1`}>Purpose 1</MenuItem>
                                    <MenuItem value={`Purpose 2`}>Purpose 2</MenuItem>
                                    <MenuItem value={`Purpose 3`}>Purpose 3</MenuItem>
                                </Select>
                            </ControlContainer>
                        </Grid>
                        <Grid item md={6}>
                            <label>
                                <Field type="radio" {...isSecured} value="true" disabled={isDisabled} />
                                <span style={{ fontWeight: "bold" }}>Secured</span>
                            </label>
                            <label>
                                <Field type="radio" {...isSecured} value="false" disabled={isDisabled} />
                                <span style={{ fontWeight: "bold" }}>Unsecured</span>
                            </label>
                        </Grid>
                    </Grid>

                </div>
            </CardContent>
        </Card>

    )
}
