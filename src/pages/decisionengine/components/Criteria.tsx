
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

interface IRange {

}

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


function Criteria() {

    const formik = useFormik({
        initialValues: {
            strong: {
                min: '',
                max: ''
            },
            good: {
                min: '',
                max: ''
            },
            satisfactory: {
                min: '',
                max: ''
            },
            weak: {
                min: '',
                max: ''
            }
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

                    <Grid container>
                        <Grid item md={6}>
                            <Card style={{ border: '2px solid blue' }}>
                                <CardContent >
                                    <Typography style={{ textAlign: 'center' }} variant="h6" gutterBottom>
                                        Edit Criteria
                                    </Typography>

                                    {/* strong */}
                                    <Grid style={{ display: 'flex', flexDirection: 'row', justifyContent: "space-around" }}>

                                        <Typography fontWeight={"bold"} color={"#009300"}>Strong</Typography>

                                        <TextField size="small"
                                            id="strong.min"
                                            name="strong.min"
                                            value={formik.values.strong.min}
                                            onChange={formik.handleChange}></TextField>

                                        <Typography mt={2}> or </Typography>

                                        <Grid item md={3}>
                                            <Select
                                                fullWidth
                                                id="strong.max"
                                                name="strong.max"
                                                variant="outlined"
                                                value={formik.values.strong.max}
                                                onChange={formik.handleChange}
                                            >
                                                <MenuItem value={`above`}>above</MenuItem>
                                                <MenuItem value={`below`}>below</MenuItem>
                                            </Select>
                                        </Grid>

                                    </Grid>
                                    {/* Good */}
                                    <Grid style={{ display: 'flex', flexDirection: 'row', justifyContent: "space-around" }}>

                                        <Typography fontWeight={"bold"} color={"#9DD566"}>Good</Typography>

                                        <TextField size="small"
                                            id="good.min"
                                            name="good.min"
                                            value={formik.values.good.min}
                                            onChange={formik.handleChange}
                                        ></TextField>

                                        <Typography mt={2}> to </Typography>

                                        <TextField size="small"
                                            id="good.max"
                                            name="good.max"
                                            value={formik.values.good.max}
                                            onChange={formik.handleChange}></TextField>


                                    </Grid>

                                    {/* Satisfactory */}
                                    <Grid style={{ display: 'flex', flexDirection: 'row', justifyContent: "space-around" }}>

                                        <Typography fontWeight={"bold"} color={"#FCC200"}>Satisfactory</Typography>

                                        <TextField size="small"
                                            id="satisfactory.min"
                                            name="satisfactory.min"
                                            value={formik.values.satisfactory.min}
                                            onChange={formik.handleChange}
                                        ></TextField>

                                        <Typography mt={2}> to </Typography>

                                        <TextField size="small"
                                            id="satisfactory.max"
                                            name="satisfactory.max"
                                            value={formik.values.satisfactory.max}
                                            onChange={formik.handleChange}></TextField>


                                    </Grid>

                                    {/* Weak */}
                                    <Grid style={{ display: 'flex', flexDirection: 'row', justifyContent: "space-around" }}>

                                        <Typography fontWeight={"bold"} color={"#FA0102"}>Weak</Typography>

                                        <TextField size="small"
                                            id="weak.min"
                                            name="weak.min"
                                            value={formik.values.weak.min}
                                            onChange={formik.handleChange}
                                        ></TextField>

                                        <Typography mt={2}> or </Typography>

                                        <Grid item md={3}>
                                            <Select
                                                fullWidth
                                                id="weak.max"
                                                name="weak.max"
                                                variant="outlined"
                                                value={formik.values.weak.max}
                                                onChange={formik.handleChange}
                                            >
                                                <MenuItem value={`above`}>above</MenuItem>
                                                <MenuItem value={`below`}>below</MenuItem>
                                            </Select>
                                        </Grid>


                                    </Grid>


                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                    {/* <Button type="submit">Submit</Button> */}
                </form>


            </div>
        </FormikProvider>
    );
}

export default Criteria