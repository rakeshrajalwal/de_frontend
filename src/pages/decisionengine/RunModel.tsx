import * as React from 'react';
import { render } from 'react-dom';
import {
  Grid,
  CardContent,
  Card,
  TextField,
  Typography, CardHeader, Button
} from "@mui/material";
import styled from "@emotion/styled";
import Select from '@mui/material/Select';

// import './styles.css';

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

function RunModel() {


  return (
    <>
      <CardHeader title={"Run Model"} titleTypographyProps={{ variant: "h3" }}
        action={<div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button type="submit" variant={"contained"}>Submit</Button>

        </div>} />
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

                  >

                  </Select>
                </ControlContainer>
              </Grid>

              <Grid item md={6}>
                <ControlContainer>
                  <Label>Model Name:</Label>
                  <TextField
                    fullWidth
                    variant="standard"
                  />
                </ControlContainer>
              </Grid>

              <Grid item md={6}>
                <ControlContainer>
                  <Label>Term :</Label>
                  <Select
                    fullWidth
                    variant="standard"
                  >
                  </Select>
                </ControlContainer>
              </Grid>

              <Grid item md={6}>
                <ControlContainer>
                  <Label>Purpose:</Label>
                  <Select
                    fullWidth
                    variant="standard"

                  >

                  </Select>
                </ControlContainer>
              </Grid>
            </Grid>

            <Grid container>
              <Grid item md={6}>
                <ControlContainer>
                  <Label>Loan Range (£):</Label>

                </ControlContainer>
              </Grid>

            </Grid>



          </div>
        </CardContent>
      </Card>
    </>
  );
}

export default RunModel;
