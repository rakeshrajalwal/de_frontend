import * as React from 'react';
import { render } from 'react-dom';
import {
    Grid,
    CardContent,
    Card,
    TextField,
    Typography,
    Button,
    RadioGroup,
    FormControlLabel,
    Radio,
    MenuItem,
    Select,
    FormControl, FormHelperText
} from "@mui/material";
import { Field, Form, Formik, useField } from "formik";
import { RangeEditor } from '../editors/EditorControllers';
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

export const PolicyEditor = ({ products, isDisabled = false }: { products?: IProduct[], isDisabled?: boolean }) => {

    const [product] = useField(`product`);//product name
    const [name, modelmeta] = useField(`name`);//name of model
    const [purpose, purposemeta] = useField(`policy.loanPurpose`);
    const [isSecured, meta4,] = useField(`policy.isSecured`);

    const value = isSecured.value;
    const selectedProudct = lodash.find(products, { name: product.value });
    // const value = selectedProudct?.policy.isSecured;
    const purposes = selectedProudct?.policy.loanPurpose;
    return (

        <Card sx={{ boxShadow: '0px 3px 6px #00000029' }}>
            <CardContent>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                    <Grid container>
                        <Grid item md={6}>
                            <ControlContainer>
                                <Label>Product:</Label>
                                {isDisabled ? <TextField
                                    fullWidth
                                    variant="standard"
                                    {...product}
                                    disabled={isDisabled}
                                />
                                    : <Select
                                        fullWidth
                                        variant="standard"
                                        {...product}
                                    >
                                        {products?.map(p => <MenuItem key={p.name} value={p.name}>{p.name}</MenuItem>)}
                                    </Select>}
                            </ControlContainer>
                        </Grid>

                        <Grid item md={6}>
                            <ControlContainer>
                                <Label>Model Name:</Label>
                                <TextField
                                    helperText={modelmeta.error}
                                    error={!!modelmeta.error}
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
                                <RangeEditor fieldPath={'policy.loanRange'} textFieldProps={{ variant: 'standard' }} isDisabled={isDisabled} />
                            </ControlContainer>
                        </Grid>
                        <Grid item md={6}>
                            <ControlContainer>
                                <Label>Term(months):</Label>
                                <RangeEditor fieldPath={'policy.loanTermInMonths'} textFieldProps={{ variant: 'standard' }} isDisabled={isDisabled} />
                            </ControlContainer>
                        </Grid>
                    </Grid>

                    <Grid container style={{ alignItems: 'flex-end' }}>
                        <Grid item md={6}>
                            <ControlContainer>
                                <Label>Purpose:</Label>
                                <FormControl
                                    fullWidth
                                >
                                    {isDisabled ? <TextField
                                        fullWidth
                                        variant="standard"
                                        {...purpose}
                                        disabled={isDisabled}
                                    />
                                        : <Select
                                            multiple
                                            fullWidth
                                            variant="standard"
                                            error={!!purposemeta.error}
                                            {...purpose}
                                        >
                                            {purposes?.map(p => <MenuItem key={p} value={p}>{p}</MenuItem>)}
                                        </Select>}
                                    {!!purposemeta.error && <FormHelperText error >{purposemeta.error}</FormHelperText>}
                                </FormControl>
                            </ControlContainer>
                        </Grid>
                        <Grid item md={6}>
                            <ControlContainer>
                                <label>
                                    <Field type="radio" {...isSecured} value={true} checked={value} disabled={isDisabled} />
                                    <span style={{ fontWeight: "bold" }}>Secured</span>
                                </label>
                                <label>
                                    <Field type="radio" {...isSecured} value={false} checked={!value} disabled={isDisabled} />
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
