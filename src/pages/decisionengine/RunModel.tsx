import * as React from 'react';
import {
  Grid,
  CardContent,
  Card,
  TextField,
  Typography, CardHeader, Button,
  MenuItem, Switch, Select
} from "@mui/material";
import styled from "@emotion/styled";
import { Form, Formik, useField } from "formik";
import { IProduct, IRunModel } from './interfaces/ModelInterface';
import { useGetAllProductsQuery, useGetManualInputsByProductNameQuery, useLazyGetManualInputsByProductNameQuery } from '../../redux/de';
import { skipToken } from '@reduxjs/toolkit/query'
import lodash from 'lodash';
import * as Yup from "yup";

const Label = styled(Typography)`
    font-weight: bold;
    text-transform: capitalize;
`;

const ColoredLine = ({ color }: { color: string }) => {
  return (<hr
    style={{
      color: color,
      backgroundColor: color,
      height: 1,
      borderColor: color,
      width: 'max-width'
    }}
  />)
};

const CustomTextField = ({ fieldname, type, path }: { fieldname: string, type: string, path: string }) => {

  const [field, meta, helpers] = useField(`${path}`);

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
            type={type}
            helperText={meta.error}
            error={!!meta.error}
            {...field}
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

const CustomSwitch = ({ fieldname, path }: { fieldname: string, path: string }) => {
  const [field, meta, helpers] = useField(`${path}`);
  return (
    <Grid item md={8} mt={3}>
      <ControlContainer>
        <Grid item md={3}>
          <Label>{fieldname}</Label>
        </Grid>
        <Grid item md={1}>
          <Typography>:</Typography>
        </Grid>
        <Grid item md={9}>
          <Switch size="medium" checked={field.value}
            onChange={(event, checked) => {
              helpers.setValue(field.value ? false : true)
            }}
          />
        </Grid>
      </ControlContainer>
    </Grid>
  )
}

const ManualTextInputFieldWithSwitch = ({ fieldname, path }: { fieldname: string, path: string }) => {
  const [field, meta, helpers] = useField(`${path}`);
  const [switchState, setSwitchState] = React.useState<boolean>(false);

  return (
    <Grid item md={8} mt={3}>
      <ControlContainer>
        <Grid item md={3}>
          <Label>{fieldname}</Label>
        </Grid>
        <Grid item md={1}>
          <Typography>:</Typography>
        </Grid>
        <Grid item md={2}>
          <Switch size="medium" checked={switchState}
            onChange={(event, checked) => {
              switchState ? setSwitchState(false) : setSwitchState(true)
            }}
          />
        </Grid>
        {switchState && <Grid item md={5} >
          <TextField
            fullWidth
            variant="standard"
            {...field}
          />
        </Grid>}
      </ControlContainer>
    </Grid>
  )
}

const SelectDropdown = ({ fieldname, options, path }: { fieldname: string, options: any[], path: string }) => {
  const [field, meta, helpers] = useField(`${path}`)
  console.log(options, "options")
  return (
    <Grid item md={8} mt={3}>
      <ControlContainer>
        <Grid item md={3}>
          <Label>{fieldname}</Label>
        </Grid>
        <Grid item md={1}>
          <Typography>:</Typography>
        </Grid>
        <Grid item md={9}>
          <Select
            fullWidth
            variant="standard"
            error={!!meta.error}
            {...field}
          >
            {options?.map(p => <MenuItem key={p.name} value={p.name}>{p.name}</MenuItem>)}
          </Select>
        </Grid>
      </ControlContainer>
    </Grid>
  )
}

const SelectDropdown2 = ({ fieldname, options, path }: { fieldname: string, options: any[], path: string }) => {
  const [field, meta, helpers] = useField(`${path}`)
  return (
    <Grid item md={8} mt={3}>
      <ControlContainer>
        <Grid item md={3}>
          <Label>{fieldname}</Label>
        </Grid>
        <Grid item md={1}>
          <Typography>:</Typography>
        </Grid>
        <Grid item md={9}>
          <Select
            fullWidth
            variant="standard"
            error={!!meta.error}
            {...field}
          >
            {options.map(p => <MenuItem key={p} value={p}>{p}</MenuItem>)}
          </Select>
        </Grid>
      </ControlContainer>
    </Grid>
  )
}

const positiveInteger = Yup.number().required('Required').positive("Should be positive").integer('Should be integer');
const requiredString = Yup.string().required('Required');
const validationSchema = Yup.object().shape({
  name: requiredString,
  loan_details: Yup.object().shape({
    amount: positiveInteger,
    term: positiveInteger,
    purpose: requiredString,
    company_name: requiredString
  }),
});

function RunModel() {
  const [product, setProduct] = React.useState<IProduct>();
  const [validateOnChange, setValidateOnChange] = React.useState<boolean>(false);
  const [purposes, setPurposes] = React.useState<string[]>([]);
  const { data: products } = useGetAllProductsQuery();// fetching all the products
  const [trigger, response ] = useLazyGetManualInputsByProductNameQuery();
 // const [manualInputs,setManualInputs] = React.useState<any[]>([])

  return (
    <Formik
      initialValues={{
        loanDetails: {
          product: product ? product.name : '',
          amount: '',
          secured: false,
          term: '',
          purpose: '',
          customerId: ''
        },
        manualInputs: response.data ? response.data.map(function(name) { return {name , value : ''}}) : []
      } as IRunModel}
      enableReinitialize={true}
      //validationSchema={validationSchema}
      validateOnChange={true}
      onSubmit={(values) => {
        // setValidateOnChange(true);
        console.log(JSON.stringify(values, null, 2))
        alert(JSON.stringify(values, null, 2));
      }}
    >
      {formik => {
        React.useEffect(() => {
          const product = lodash.find(products, { name: formik.values.loanDetails.product });
          setProduct(product);
          if (product) {
            setPurposes(product.policy.loanPurpose);
            trigger(product._id!) //.then(() => {console.log("here in success"); console.log(response)}); // triggering api to get the manual inputs for the selected product
            //setManualInputs(response?.data.map(function(name) { return {name , value : ''}}))
            
          }
        }, [formik.values.loanDetails.product]);


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

                    <SelectDropdown fieldname={'Product'} path={'loanDetails.product'} options={products!} />

                    <CustomTextField fieldname={'Loan Amount(£)'} path={'loanDetails.amount'} type={'number'} />

                    <CustomSwitch fieldname={'Is Secured?'} path={'loanDetails.secured'} />

                    <CustomTextField fieldname={'Term(Months)'} path={'loanDetails.term'} type={'number'} />

                    <SelectDropdown2 fieldname={'Purpose'} path={'loanDetails.purpose'} options={purposes!} />

                    <CustomTextField fieldname={'Company Name'} path={'loanDetails.customerId'} type={'text'} />

                  </Grid>
                </div>

                <Grid container>
                  <Grid item md={2}>
                    <h3 style={{ color: '#434DB0', margin: '0px' }}> Additonal Details</h3>
                  </Grid>
                  <Grid item md={10} mt={1}>
                    <ColoredLine color={'#434DB0'} />
                  </Grid>
                </Grid>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

                  <Grid container style={{ padding: '30px' }}>
                    {/* {formik.values.manualInputs.map((f, i) => (
                      <ManualTextInputFieldWithSwitch key={i} fieldname={f.name} path={`manualInputs[${i}].value`} />
                    ))} */}
                  </Grid>
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