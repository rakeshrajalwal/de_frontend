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
import { RangeEditor } from '../editors/EditorControllers';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import styled from "@emotion/styled";
import {IProduct} from "../interfaces/CreateModelInterfaces";
import lodash from "lodash";

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


export const PolicyEditor = ({products}:{products:IProduct[]}) => {

    const [product, meta, helpers] = useField(`product`);//product name
    const [name, meta8, helpers8] = useField(`name`);//name of model
    const [purpose, meta6, helpers6] = useField(`policy.loanPurpose`);
    const [isSecured, meta7, helpers7] = useField(`policy.isSecured`);

    const selectedProudct = lodash.find(products, {name: product.value});
    const purposes = selectedProudct?.policy.loanPurpose;
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
                                    {products.map(p => <MenuItem key={p.name} value={p.name}>{p.name}</MenuItem>)}
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
                                    multiple
                                    fullWidth
                                    variant="standard"
                                    {...purpose}
                                >
                                    {purposes?.map(p => <MenuItem key={p} value={p}>{p}</MenuItem>)}
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
