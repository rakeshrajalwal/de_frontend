import * as React from 'react';
import { render } from 'react-dom';
import {
    Grid,
    CardContent,
    Card,
    TextField,
    Typography
} from "@mui/material";
import { Field, Form, Formik, useField, useFormik, useFormikContext, FormikProvider } from "formik";
import { RangeEditor } from '../editors/EditorControllers';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import styled from "@emotion/styled";
import { IProduct } from "../interfaces/ModelInterface";
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


export const PolicyEditor = ({ products }: { products: IProduct[] }) => {

    const [product, meta, helpers] = useField(`product`);//product name
    const [name, meta8, helpers8] = useField(`name`);//name of model
    const [purpose, meta6, helpers6] = useField(`policy.loanPurpose`);
    const [isSecured, meta7, helpers7] = useField(`policy.isSecured`);

    const selectedProudct = lodash.find(products, { name: product.value });
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
                                    error={meta8.error && meta8.touched ? true : false}
                                    helperText={meta8.error && meta8.touched ? 'Required' : ''}
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
                                <RangeEditor fieldPath={'policy.loanRange'} textFieldProps={{ variant: 'standard' }} />
                            </ControlContainer>
                        </Grid>
                        <Grid item md={6}>
                            <ControlContainer>
                                <Label>Term(months):</Label>
                                <RangeEditor fieldPath={'policy.loanTermInMonths'} textFieldProps={{ variant: 'standard' }} />
                            </ControlContainer>
                        </Grid>
                    </Grid>

                    <Grid container style={{ alignItems: 'flex-end' }}>
                        <Grid item md={6}>
                            <ControlContainer>
                                <Label>Purpose:</Label>
                                <Select
                                    error={meta6.error && meta6.touched ? true : false}
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
                            <ControlContainer>
                                    <label>
                                        <Field type="radio" {...isSecured} value="true" checked={meta7.value == 'true' ? true : false}/>
                                        <span style={{ fontWeight: "bold" }}>Secured</span>
                                    </label>
                                    <label>
                                        <Field type="radio" {...isSecured} value="false" checked={true}/>
                                        <span style={{ fontWeight: "bold" }}>Unsecured</span>
                                    </label>
                            </ControlContainer>
                        </Grid>
                    </Grid>

                </div>
            </CardContent>
        </Card>

    )
}
