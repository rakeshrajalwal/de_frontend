import * as React from 'react';
import {
  Grid,
  CardContent,
  Card,
  TextField,
  Typography, CardHeader, Button,
  MenuItem, Switch, Select, FormControl, FormHelperText
} from "@mui/material";
import styled from "@emotion/styled";
import { Form, Formik, useField } from "formik";
import { IProduct, IRunModel } from './interfaces/ModelInterface';
import { useGetAllProductsQuery, useGetManualInputsByProductNameQuery, useLazyGetManualInputsByProductNameQuery } from '../../redux/de';
import lodash from 'lodash';
import * as Yup from "yup";

const CustomStyledSwitch = styled(Switch)(({ theme }) => ({
  padding: 8,
  '& .MuiSwitch-track': {
    borderRadius: 22 / 2,
    '&:before, &:after': {
      content: '""',
      position: 'absolute',
      top: '50%',
      transform: 'translateY(-50%)',
      width: 16,
      height: 16,
    },
    '&:before': {
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
        theme.palette.getContrastText(theme.palette.primary.main),
      )}" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"/></svg>')`,
      left: 12,
    },
    '&:after': {
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
        theme.palette.getContrastText(theme.palette.primary.main),
      )}" d="M19,13H5V11H19V13Z" /></svg>')`,
      right: 12,
    },
  },
  '& .MuiSwitch-thumb': {
    boxShadow: 'none',
    width: 16,
    height: 16,
    margin: 2,
  },
}));

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
          <CustomStyledSwitch size="medium" checked={field.value}
            onChange={(event, checked) => {
              helpers.setValue(field.value ? false : true)
            }}
          />
        </Grid>
      </ControlContainer>
    </Grid>
  )
}

const TextInputFieldWithSwitch = ({ fieldname, path }: { fieldname: string, path: string }) => {
  const [field, meta, helpers] = useField(`${path}.value`);
  const [field2, meta2, helpers2] = useField(`${path}.switchstate`);
  // const [switchState, setSwitchState] = React.useState<boolean>(false);

  // reseting the value when switch is turned off and managing switch state
  function handleClick() {
    if (field2.value) {
      helpers2.setValue(false)
      helpers.setValue('')
    } else {
      helpers2.setValue(true);
    }
  }

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
          <CustomStyledSwitch size="medium" checked={field2.value}
            onChange={handleClick}
          />
        </Grid>
        {field2.value && <Grid item md={5} >
          <TextField
            fullWidth
            variant="standard"
            helperText={meta.error}
            error={!!meta.error}
            {...field}
          />
        </Grid>}
      </ControlContainer>
    </Grid>
  )
}

const SelectDropdown = ({ fieldname, options, path }: { fieldname: string, options: string[], path: string }) => {
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
          <FormControl fullWidth  >
            <Select
              fullWidth
              variant="standard"
              error={!!meta.error}
              {...field}
            >
              {options?.map(p => <MenuItem key={p} value={p}>{p}</MenuItem>)}
            </Select>
            {!!meta.error && <FormHelperText error >{meta.error}</FormHelperText>}
          </FormControl>
        </Grid>
      </ControlContainer>
    </Grid>
  )
}

const positiveInteger = Yup.number().required('Required').positive("Should be positive").integer('Should be integer');
const requiredString = Yup.string().required('Required');
const validationSchema = Yup.object().shape({
  loanDetails: Yup.object().shape({
    product: requiredString,
    amount: positiveInteger,
    secured: requiredString,
    term: positiveInteger,
    purpose: requiredString,
    customerId: requiredString
  }),
  manualInputs :  Yup.array().of(Yup.object().shape({
    switchstate : Yup.boolean(),
    value : Yup.string().when("switchstate", {
      is:true,
      then: Yup.string().required('required')
    })
  }))
});


function RunModel() {
  const [product, setProduct] = React.useState<IProduct>();
  const [validateOnChange, setValidateOnChange] = React.useState<boolean>(false);
  const [purposes, setPurposes] = React.useState<string[]>([]);
  const { data: products } = useGetAllProductsQuery();// fetching all the products
  const [trigger, response] = useLazyGetManualInputsByProductNameQuery();// query to fetch manualinputs

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
        manualInputs: response.data ? response.data.map(function (name) { return { name, value: '', switchstate: false } }) : []
      } as IRunModel}
      enableReinitialize={true}
      validationSchema={validationSchema}
      validateOnChange={true}
      onSubmit={(values) => {
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
            trigger(product._id!) // triggering api to get the manual inputs for the selected product
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

                    <SelectDropdown fieldname={'Product'} path={'loanDetails.product'} options={products?.map((i) => i.name)!} />

                    <CustomTextField fieldname={'Loan Amount(£)'} path={'loanDetails.amount'} type={'number'} />

                    <CustomSwitch fieldname={'Is Secured?'} path={'loanDetails.secured'} />

                    <CustomTextField fieldname={'Term(Months)'} path={'loanDetails.term'} type={'number'} />

                    <SelectDropdown fieldname={'Purpose'} path={'loanDetails.purpose'} options={purposes!} />

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
                    {formik.values.manualInputs.map((f, i) => (
                      <TextInputFieldWithSwitch key={i} fieldname={f.name} path={`manualInputs[${i}]`} />
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