
import styled from "@emotion/styled";

// import './styles.css';
import {
    Breadcrumbs as MuiBreadcrumbs,
    Button,
    Card as MuiCard,
    CardContent,
    Divider as MuiDivider,
    FormControl as MuiFormControl,
    Grid,
    TextField as MuiTextField,
    Typography
} from "@mui/material";

import { spacing } from "@mui/system";
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { Formik, Form, Field, useFormik, FormikProvider } from "formik";

const TextField = styled(MuiTextField)<{ my?: number }>(spacing);

const Card = styled(MuiCard)(spacing);


interface Values {
    product: string,
    model: string,
    loanMin: string,
    loanMax: string,
    termMin: string,
    termMax: string,
    purpose: string,
    securedOrNot: string
}


function Policy() {

    const formik = useFormik({
        initialValues: {
            product: '',
            model: '',
            loanMin: '',
            loanMax: '',
            termMin: '',
            termMax: '',
            purpose: '',
            securedOrNot: 'unsecured'
        },
        // validationSchema: validationSchema,
        onSubmit: (values) => {
            console.log(JSON.stringify(values, null, 2))
            alert(JSON.stringify(values, null, 2));
        },
    });



    return (
        <FormikProvider value={formik}>
            <div className="">
                <form onSubmit={formik.handleSubmit}>

                    <Card >
                        <CardContent>
                            <Typography variant="h6" gutterBottom>
                                Policy
                            </Typography>

                            <Grid container >

                                <Grid item md={1.5} xs={6}>
                                    <Typography variant="h6" mt={8} >
                                        Product:
                                    </Typography>
                                </Grid>
                                <Grid item md={4} xs={6} mt={6}>
                                    <Select
                                        id="product"
                                        name="product"
                                        fullWidth
                                        variant="standard"
                                        value={formik.values.product}
                                        onChange={formik.handleChange}
                                    >
                                        <MenuItem value={'Working Capital Loan'}>Working Capital Loan</MenuItem>
                                        <MenuItem value={'Product 2'}>Product 2</MenuItem>
                                        <MenuItem value={'Product 3'}>Product 3</MenuItem>
                                    </Select>
                                </Grid>

                                <Grid item md={0.5} xs={0}></Grid>
                                <Grid item md={1.5} xs={6}  >
                                    <Typography variant="h6" mt={8} >
                                        Model:
                                    </Typography>
                                </Grid>
                                <Grid item md={4} xs={6} mt={6}>
                                    <TextField
                                        fullWidth
                                        id="model"
                                        name="model"
                                        variant="standard"
                                        value={formik.values.model}
                                        onChange={formik.handleChange}
                                    />

                                </Grid>
                            </Grid>

                            {/* loan range and term */}

                            <Grid container >

                                <Grid item md={6} >
                                    <Grid container>
                                        <Grid item md={3} xs={6}>
                                            <Typography variant="h6" mt={8} >
                                                Loan Range (£):
                                            </Typography>
                                        </Grid>
                                        <Grid item md={2} xs={6} mt={6}>
                                            <TextField
                                                id="loanMin"
                                                name="loanMin"
                                                label="min"
                                                variant="standard"
                                                value={formik.values.loanMin}
                                                onChange={formik.handleChange}

                                            />
                                            <Grid item md={2}>
                                                <Typography variant="body1">to</Typography>
                                            </Grid>
                                            <Grid item md={3}>
                                                <TextField
                                                    id="loanMax"
                                                    name="loanMax"
                                                    label="max"
                                                    variant="standard"
                                                    value={formik.values.loanMax}
                                                    onChange={formik.handleChange}

                                                />
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>

                                <Grid item md={6} >
                                    <Grid container>
                                        <Grid item md={3} xs={6}>
                                            <Typography variant="h6" mt={8} >
                                                Term:
                                            </Typography>
                                        </Grid>
                                        <Grid item md={2} xs={6} mt={6}>
                                            <TextField
                                                id="termMin"
                                                name="termMin"
                                                label="min"
                                                variant="standard"
                                                value={formik.values.termMin}
                                                onChange={formik.handleChange}

                                            />
                                            <Grid item md={2}>
                                                <Typography variant="body1">to</Typography>
                                            </Grid>
                                            <Grid item md={3}>
                                                <TextField
                                                    id="termMax"
                                                    name="termMax"
                                                    label="max"
                                                    variant="standard"
                                                    value={formik.values.termMax}
                                                    onChange={formik.handleChange}

                                                />
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>

                            {/* purpose */}
                            <Grid container >

                                <Grid item md={1} xs={6}>
                                    <Typography variant="h6" mt={8} >
                                        Purpose:
                                    </Typography>
                                </Grid>
                                <Grid item md={4} xs={6} mt={6}>
                                    <Select
                                        id="purpose"
                                        name="purpose"
                                        fullWidth
                                        variant="standard"
                                        value={formik.values.purpose}
                                        onChange={formik.handleChange}
                                    >
                                        <MenuItem value={`Purpose 1`}>Purpose 1</MenuItem>
                                        <MenuItem value={`Purpose 2`}>Purpose 2</MenuItem>
                                        <MenuItem value={`Purpose 3`}>Purpose 3</MenuItem>
                                    </Select>
                                </Grid>


                                {/* //secured */}
                                <Grid item md={1} xs={0}></Grid>
                                <Grid item md={4} xs={12} mt={6}>

                                    <label>
                                        <Field type="radio" name="securedOrNot" value="secured" />
                                        Secured
                                    </label>
                                    <label>
                                        <Field type="radio" name="securedOrNot" value="unsecured" />
                                        Unsecured
                                    </label>

                                </Grid>

                            </Grid>

                        </CardContent>
                    </Card>
                    <Button type="submit">Submit</Button>
                </form>


            </div>
        </FormikProvider>
    );
}

export default Policy;
