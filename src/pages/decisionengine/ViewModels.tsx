import * as React from 'react';
import { render } from 'react-dom';
import styled from "@emotion/styled";

// import './styles.css';
import {
  Avatar,
  Breadcrumbs as MuiBreadcrumbs,
  Button as MuiButton,
  Card as MuiCard,
  CardContent,
  Divider as MuiDivider,
  FormControl as MuiFormControl,
  Grid,
  Link,
  TextField as MuiTextField,
  Typography,
} from "@mui/material";
import { spacing, SpacingProps } from "@mui/system";
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';



const TextField = styled(MuiTextField)<{ my?: number }>(spacing);
const Card = styled(MuiCard)(spacing);

function RunSummaries() {
  const [counter, setCounter] = React.useState(60);


  return (
    <div className="">
      <Card mb={6}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Policy
          </Typography>

          <Grid container >

            {/* //product */}

            <Grid item md={1.5} xs={6}>
              <Typography variant="h6" mt={8} >
                Product:
              </Typography>
            </Grid>
            <Grid item md={4} xs={6} mt={6}>
              <Select
                labelId="product-name"
                id="prouctid"
                fullWidth
                variant="standard"
              // value={age}
              // onChange={handleChange}
              // label="Age"
              >
                <MenuItem value={1}>Working Capital Loan</MenuItem>
                <MenuItem value={2}>Product 2</MenuItem>
                <MenuItem value={3}>Product 3</MenuItem>
              </Select>
            </Grid>


            {/* //model */}

            <Grid item md={1.5} xs={6} pl={4} >
              <Typography variant="h6" mt={8} >
                Model:
              </Typography>
            </Grid>
            <Grid item md={4} xs={6} mt={6}>
              <TextField
                id="policy"
                //label="First name"
                variant="standard"
                fullWidth
              />
            </Grid>
          </Grid>

          {/* loan range and term */}

          <Grid container >

            {/* //loan range */}


            <Grid container md={6}>
              <Grid item md={3} xs={6}>
                <Typography variant="h6" mt={8} >
                  Loan Range (£):
                </Typography>
              </Grid>
              <Grid item md={3} xs={6} mt={6}>
                <TextField
                  id="minloan"
                  label="min"
                  variant="standard"

                />
                <Grid item md={3}>
                  <Typography variant="body1">to</Typography>
                </Grid>
                <Grid item md={3}>
                  <TextField
                    id="maxloan"
                    label="max"
                    variant="standard"

                  />
                </Grid>
              </Grid>
            </Grid>


            {/* //Term */}

            <Grid container md={6}>
              <Grid item md={3} xs={6}>
                <Typography variant="h6" mt={8} >
                  Term:
                </Typography>
              </Grid>
              <Grid item md={3} xs={6} mt={6}>
                <TextField
                  id="minterm"
                  label="min"
                  variant="standard"

                />
                <Grid item md={3}>
                  <Typography variant="body1">to</Typography>
                </Grid>
                <Grid item md={3}>
                  <TextField
                    id="maxterm"
                    label="max"
                    variant="standard"

                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>


          {/* purpose */}
          <Grid container >

            {/* //product */}

            <Grid item md={1} xs={6}>
              <Typography variant="h6" mt={8} >
                Purpose:
              </Typography>
            </Grid>
            <Grid item md={4} xs={6} mt={6}>
              <Select
                labelId="purpose-name"
                id="purpose"
                fullWidth
                variant="standard"
              // value={age}
              // onChange={handleChange}
              // label="Age"
              >
                <MenuItem value={1}>Purpose 1</MenuItem>
                <MenuItem value={2}>Purpose 2</MenuItem>
                <MenuItem value={3}>Purpose 3</MenuItem>
              </Select>
            </Grid>


            {/* //secured */}

            <Grid item md={6} xs={12} pl={4} mt={6}>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
              >
                <FormControlLabel value="Secured" control={<Radio />} label="Secured" />
                <FormControlLabel value="UnSecured" control={<Radio />} label="UnSecured" />
              </RadioGroup>
            </Grid>

          </Grid>



        </CardContent>
      </Card>

    </div>
  );
}

export default RunSummaries;
