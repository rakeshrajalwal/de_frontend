import * as React from 'react';
import {
  Grid,
  CardContent,
  Card,
  TextField,
  Typography, CardHeader, Button,
  MenuItem, Switch
} from "@mui/material";
import styled from "@emotion/styled";
import Select from '@mui/material/Select';
import { Form, Formik, useField } from "formik";
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

const ManualInputsSwitch = ({ fieldname, path }: { fieldname: string, path: string }) => {
  const [field, meta, helpers] = useField(`${path}`);
  const [switchState, setSwitchState] = React.useState<boolean>(false);

  if (!switchState) field.value = 0;

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

const Product1: any = {
  name: 'working captial loan',
  loan_details: {
    product: '',
    amount: '',
    is_secured: true,
    term: '',
    purpose: '',
    company_name: ''
  },
  // manual_inputs2: [{
  //   name: 'insurance', value: ''
  // },
  // {
  //   name: 'insurance 2', value: ''
  // },
  // {
  //   name: 'insurance 3', value: ''
  // },
  // ],
  manual_inputs: {
    sponsors_worth: '',
    sponsors_worth_2: '',
    sponsors_worth_3: '',
  }
}

const Product2: any = {
  name: 'working capital loan 2',
  loan_details: {
    product: '',
    amount: '',
    is_secured: false,
    term: '',
    purpose: '',
    company_name: ''
  },
  // manual_inputs2: [{
  //   name: 'guarantee', value: ''
  // },
  // {
  //   name: 'guarantee 2', value: ''
  // },
  // {
  //   name: 'gurantee 3', value: ''
  // },
  // ],
  manual_inputs: {
    sponsors_worth_4: '',
    sponsors_worth_5: '',
    sponsors_worth_6: '',
  }
}

const products = [Product1, Product2];

const SelectDropdown = ({ fieldname, options, path }: { fieldname: string, options: any[], path: string }) => {
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
            {options.map(p => <MenuItem key={p.name} value={p.name}>{p.name}</MenuItem>)}
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
  const [product, setProduct] = React.useState<any>();
  const [validateOnChange, setValidateOnChange] = React.useState<boolean>(false);
  const purposes = [{ name: 'purpose 1' }, { name: 'purpose 2' }];
  return (

    <Formik
      initialValues={{
        name: '',
        loan_details: {
          amount: '',
          is_secured: false,
          term: '',
          purpose: '',
          company_name: ''
        },
        // manual_inputs2: [{
        //   name: 'abc', value: ''
        // },
        // {
        //   name: 'abc 2', value: ''
        // },
        // {
        //   name: 'abc 3', value: ''
        // },
        // ],
        manual_inputs: {}
      }}
      validationSchema={validationSchema}
      validateOnChange={validateOnChange}
      onSubmit={(values) => {
        // setValidateOnChange(true);
        console.log(JSON.stringify(values, null, 2))
        alert(JSON.stringify(values, null, 2));
      }}
    >
      {formik => {
        React.useEffect(() => {

        }, [])
        React.useEffect(() => {
          const product = lodash.find(products, { name: formik.values.name });
          setProduct(product);
          if (product) {
            formik.setFieldValue("manual_inputs", product.manual_inputs);
            formik.setFieldValue("loan_details.is_secured", product.loan_details.is_secured);
          }
          if (formik.isSubmitting) {
            console.log("setting the flag")
            setValidateOnChange(true);

          }
        }, [formik.values.name]);
        const v = formik.values;
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

                    <SelectDropdown fieldname={'Product'} path={'name'} options={products} />

                    <CustomTextField fieldname={'Loan Amount(£)'} path={'loan_details.amount'} type={'number'} />

                    <CustomSwitch fieldname={'Is Secured?'} path={'loan_details.is_secured'} />

                    <CustomTextField fieldname={'Term(Months)'} path={'loan_details.term'} type={'number'} />

                    <SelectDropdown fieldname={'Purpose'} path={'loan_details.purpose'} options={purposes} />

                    <CustomTextField fieldname={'Company Name'} path={'loan_details.company_name'} type={'text'} />

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
                    {/* {formik.values.manual_inputs2.map((f, i) => (
                      <ManualInputsSwitch fieldname={f.name} path={`manual_inputs2[${i}].value`} />
                    ))} */}
                    {Object.entries(formik.values.manual_inputs).map(([key, val], i) => (
                      <ManualInputsSwitch key={`${key}`} fieldname={`${key}`} path={`manual_inputs[${key}]`} />
                    ))}


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
