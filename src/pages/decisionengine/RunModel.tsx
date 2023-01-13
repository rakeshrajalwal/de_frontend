import * as React from 'react';
import { render } from 'react-dom';
import {
  Grid,
  CardContent,
  Card,
  TextField,
  Typography, CardHeader, Button,
  MenuItem, Switch,
  Divider
} from "@mui/material";
import styled from "@emotion/styled";
import Select from '@mui/material/Select';
import { Form, Formik, useField } from "formik";

// import './styles.css';

const Label = styled(Typography)`
    font-weight: bold;
    text-transform: capitalize;
`;

const CustomTextField = ({ fieldname, path }: { fieldname: string, path: string }) => {

  const [current, meta, helpers] = useField(`${path}`);

  return (
    <Grid item md={8} mt={3}>
      <ControlContainer>
        <Grid item md={3} >
          <Label>{fieldname}</Label>
        </Grid>
        <Grid item md={1}>
          <Typography>:</Typography>
        </Grid>
        <Grid item md={9} >
          <TextField
            fullWidth
            variant="standard"
            {...current}
          />
        </Grid>
      </ControlContainer >
    </Grid >
  )

}

const ControlContainer = styled.div`
display: flex;
gap:15px;
align-items:baseline;
padding-left:5px;
padding-right:15px;
`;

function RunModel() {

  return (

    <Formik
      initialValues={{
        loan_details: {
          product: '',
          amount: '',
          is_secured: true,
          term: '',
          purpose: [],
          company_name: ''
        },
        // manual_inputs: [{
        //   sponsors_net_worth: '',
        // },
        //   { personal_guranteer: '', },
        //   {
        //   insurance: ''
        // }],
        manual_inputs: [{
          name: 'sponsors_networth', value: ''
        },
        {
          name: 'sponsors_networth 2', value: ''
        },
        {
          name: 'sponsors_networth 3', value: ''
        },
        ],

      }}
      onSubmit={(values) => {
        console.log(JSON.stringify(values, null, 2))
        alert(JSON.stringify(values, null, 2));
      }}
    >
      {formik => {

        return (
          <Form>
            <CardHeader title={"Run Model"} titleTypographyProps={{ variant: "h3" }}
              action={<div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Button type="submit" variant={"contained"}>Submit</Button>

              </div>} />
            <Card sx={{ boxShadow: '0px 3px 6px #00000029' }}>
              <CardContent>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

                  <Grid container style={{ padding: '30px' }}>

                    <Grid item md={8} >
                      <ControlContainer>
                        <Grid item md={3}>
                          <Label>Product</Label>
                        </Grid>
                        <Grid item md={1}>
                          <Typography>:</Typography>
                        </Grid>
                        <Grid item md={9}>
                          <Select
                            fullWidth
                            variant="standard"
                          >
                          </Select>
                        </Grid>
                      </ControlContainer>
                    </Grid>

                    <CustomTextField fieldname={'Loan Amount(£)'} path={'loan_details.amount'} />

                    <Grid item md={8} mt={3}>
                      <ControlContainer>
                        <Grid item md={3}>
                          <Label>Is Secured Loan?</Label>
                        </Grid>
                        <Grid item md={1}>
                          <Typography>:</Typography>
                        </Grid>
                        <Grid item md={9}>
                          <Switch size="medium" checked={formik.values.loan_details.is_secured}
                          // onChange={(event, checked) => {
                          //   //formik.getFieldMeta.name
                          //  // setFieldValue("sell", checked ? "Y" : "N");
                          // }}
                          />
                        </Grid>
                      </ControlContainer>
                    </Grid>


                    <CustomTextField fieldname={'Term(Months)'} path={'loan_details.term'} />

                    <Grid item md={8} justifyContent='space-between' mt={3}>

                      <ControlContainer>
                        <Grid item md={3}>
                          <Label>Purpose</Label>
                        </Grid>
                        <Grid item md={1}> <Typography>:</Typography></Grid>
                        <Grid item md={9}>
                          <Select
                            fullWidth
                            variant="standard"
                          >
                            <MenuItem value={'Working Capital Loan'}>Working Capital Loan</MenuItem>
                            <MenuItem value={'Product 2'}>Product 2</MenuItem>
                            <MenuItem value={'Product 3'}>Product 3</MenuItem>
                          </Select>
                        </Grid>
                      </ControlContainer>
                    </Grid>

                    <CustomTextField fieldname={'Company Name'} path={'loan_details.company_name'} />

                  </Grid>
                </div>

                <div style={{ display: 'flex', flexDirection: 'row' }}>
                  <h3 style={{ color: '#434DB0' }}> Additonal Details</h3>
                  <Divider />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

                  <Grid container style={{ padding: '30px' }}>
                    {formik.values.manual_inputs.map((f, i) => (
                      <CustomTextField fieldname={f.name} path={`manual_inputs[${i}].value`} />
                    ))}
                    /</Grid>
                </div>
              </CardContent>

            </Card>

          </Form>
        )
      }}
    </Formik>

  );
}

export default RunModel;
