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
import { IProduct, IRunModel, IManualInputs } from './interfaces/ModelInterface';
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


const product1: IProduct = {
  name: "Working Capital Loan",
  policy: {
    "loanRange": {
      "min": 1000,
      "max": 5000000
    },
    "loanTermInMonths": {
      "min": 24,
      "max": 30
    },
    "loanPurpose": [
      "biz growth",
      "expansion"
    ],
    "isSecured": true
  },
  factors: [
    {
      name: "Financial Strength",
      subFactors: [
        {
          name: "Market Conditions ",
          signals: [
            { name: "GP%vsSector" },
            { name: "NP%vsSector" },
            { name: "LeverageVsSector" },
            { name: "GearingVsSector" }
          ]
        },
        {
          name: "Debt Service",
          signals: [
            { name: "EBIDTA:DSC" }
          ]
        },
        {
          name: "Financial Stability",
          signals: [
            { name: "%ChgTurnover" },
            { name: "EBIDTA%ratio" },
            { name: "Stressed EBIDTA:DSC" },
            { name: "%ChgRetainedProfits" }
          ]
        },
        {
          name: "Gearing ratio",
          signals: [
            { name: "Gearing" }
          ]
        },
        {
          name: "Leverage",
          signals: [
            { name: "Leverage" }
          ]
        }
      ]
    },
    {
      name: "Strength of Business Owner/Guarantor & Security Package",
      subFactors: [
        {
          name: "Financial Capacity & Willingness to Support",
          signals: [
            { name: "Sponsors Debt" },
            { name: "Sponsors Net Worth" },
            { name: "Sponsor Credit Score" },
            { name: "Business Interuption Insurance" }
          ]
        }
      ]
    },
    {
      name: "Transaction Characteristics ",
      subFactors: [
        {
          name: "Term of Loan vs. Purpose",
          signals: [
            {
              name: "TermvsPurpose"
            }
          ]
        }
      ]
    }
  ]
};

const product2: IProduct = {
  name: "Working Capital Loan 2",
  policy: {
    "loanRange": {
      "min": 1000,
      "max": 5000000
    },
    "loanTermInMonths": {
      "min": 24,
      "max": 30
    },
    "loanPurpose": [
      "new business",
      "expansion"
    ],
    "isSecured": true
  },
  factors: [
    {
      name: "Financial Strength",
      subFactors: [
        {
          name: "Market Conditions ",
          signals: [
            { name: "GP%vsSector" },
            { name: "NP%vsSector" },
            { name: "LeverageVsSector" },
            { name: "GearingVsSector" }
          ]
        },
        {
          name: "Debt Service",
          signals: [
            { name: "EBIDTA:DSC" }
          ]
        },
        {
          name: "Financial Stability",
          signals: [
            { name: "%ChgTurnover" },
            { name: "EBIDTA%ratio" },
            { name: "Stressed EBIDTA:DSC" },
            { name: "%ChgRetainedProfits" }
          ]
        },
        {
          name: "Gearing ratio",
          signals: [
            { name: "Gearing" }
          ]
        },
        {
          name: "Leverage",
          signals: [
            { name: "Leverage" }
          ]
        }
      ]
    },
    {
      name: "Strength of Business Owner/Guarantor & Security Package",
      subFactors: [
        {
          name: "Financial Capacity & Willingness to Support",
          signals: [
            { name: "Sponsors Debt" },
            { name: "Sponsors Net Worth" },
            { name: "Sponsor Credit Score" },
            { name: "Business Interuption Insurance" }
          ]
        }
      ]
    },
    {
      name: "Transaction Characteristics ",
      subFactors: [
        {
          name: "Term of Loan vs. Purpose",
          signals: [
            {
              name: "TermvsPurpose"
            }
          ]
        }
      ]
    }
  ]
};

const products = [product1, product2];

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

const manualInputsSample: IRunModel = {
  loanDetails: {
    product: '',
    amount: '',
    isSecured: false,
    term: '',
    purpose: '',
    companyName: ''
  },
  manualInputs: [{
    name: 'sponsors networth',
    value: ''
  },
  {
    name: 'sponsors networth2',
    value: ''
  },
  {
    name: 'sponsors networth3',
    value: ''
  }

  ]
}

function RunModel() {
  const [product, setProduct] = React.useState<IProduct>();
  const [validateOnChange, setValidateOnChange] = React.useState<boolean>(false);
  const [purposes, setPurposes] = React.useState<string[]>([]);
  const [manualInputs, getManualInputs] = React.useState<IManualInputs[]>([]);

  // getManualInputs(manualInputsSample.manualInputs)

  return (

    <Formik
      initialValues={{
        loanDetails: {
          product: '',
          amount: '',
          secured: false,
          term: '',
          purpose: '',
          customerId: ''
        },
        manualInputs: []
      } as IRunModel}
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
        //  formik.setValues("manualInputs", manualInputsSample.manualInputs)
          setProduct(product);
          if (product) {
            setPurposes(product.policy.loanPurpose);
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

                    <SelectDropdown fieldname={'Product'} path={'loanDetails.product'} options={products} />

                    <CustomTextField fieldname={'Loan Amount(£)'} path={'loanDetails.amount'} type={'number'} />

                    <CustomSwitch fieldname={'Is Secured?'} path={'loanDetails.isSecured'} />

                    <CustomTextField fieldname={'Term(Months)'} path={'loanDetails.term'} type={'number'} />

                    <SelectDropdown2 fieldname={'Purpose'} path={'loanDetails.purpose'} options={purposes} />

                    <CustomTextField fieldname={'Company Name'} path={'loanDetails.companyName'} type={'text'} />

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
                    {formik.values.manualInputs.map((f, i) => (
                      <ManualTextInputFieldWithSwitch key={i} fieldname={f.name} path={`manualInputs[${i}].value`} />
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
