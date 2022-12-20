import * as React from 'react';
import { render } from 'react-dom';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
//import Card from '@mui/material/Card';
// import CardActions from '@mui/material/CardActions';
// import CardContent from '@mui/material/CardContent';
import styled from "@emotion/styled";
import Button from '@mui/material/Button';
import {
  Grid,
  Link,
  Breadcrumbs as MuiBreadcrumbs,
  Divider as MuiDivider,
  CardActions,
  CardContent,
  Card as MuiCard,
  CardHeader as MuiCardHeader,
} from "@mui/material";

import Box from '@mui/material/Box';
import { spacing } from "@mui/system";

const Card = styled(MuiCard)(spacing);

const CardHeader = styled(MuiCardHeader)(spacing);

const CounterElement = styled.span`
  font-size: 16px;
  margin-left: ${(props) => props.theme.spacing(2)};
  margin-right: ${(props) => props.theme.spacing(2)};
`;

// import './styles.css';

function CreateModel() {
  const [weight, setWeight] = React.useState(0);

  // React.useEffect(() => {
  //   counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
  // }, [counter]);

  return (
    <div className="">

      {/* <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Accordion 1</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography>Accordion 2</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion disabled>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3a-content"
          id="panel3a-header"
        >
          <Typography>Disabled Accordion</Typography>
        </AccordionSummary>
      </Accordion> */}

      <Grid container >
        <Grid container >
          <Grid item xs={8} md={8} lg={6} mt={6} >
            <Card >
              <CardContent>
                <Typography
                  component="h2"
                  variant="h6"
                  color="textPrimary"
                >
                  Financial Strength
                </Typography>
              </CardContent>

            </Card>

          </Grid>
          <Grid item xs={4} md={4} lg={3} mt={9} ml={2} spacing={3} >

            <Box >
              <Button
                variant="outlined"
                size="small"
                aria-label="Decrement value"
                onClick={() => setWeight(prevWeight => prevWeight - 1)}
              >
                -
              </Button>
              <CounterElement>{weight}</CounterElement>
              <Button
                variant="outlined"
                size="small"
                aria-label="Increment value"
                onClick={() => setWeight(prevWeight => prevWeight + 1)}
              >
                +
              </Button>
            </Box>

          </Grid>
        </Grid >

        <Grid container >
          <Grid item xs={8} md={8} lg={6} mt={4} >
            <Card >
              <CardContent>
                <Typography
                  component="h2"
                  variant="h6"
                  color="textPrimary"
                >
                  Strength of Business Owner/ Gurantor & Security Package
                </Typography>
              </CardContent>

            </Card>

          </Grid>
          <Grid item xs={4} md={4} lg={3} mt={4} ml={2} spacing={3} >
            <Card >
              <CardContent>
                <Typography
                  component="h2"
                  variant="h6"
                  color="textPrimary"
                >
                  aaa
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>


      </Grid >


    </div >
  );
}

export default CreateModel;
