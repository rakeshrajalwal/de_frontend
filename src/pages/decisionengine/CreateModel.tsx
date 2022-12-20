import * as React from 'react';
import { render } from 'react-dom';
import {Accordion, AccordionDetails, AccordionSummary, Box, Paper, TextField} from "@mui/material";
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2

// import './styles.css';
interface INode {
  name:string;
  subFactors?: INode[];
  signals?: INode[];
}


const WeightEditor = ({node, ...rest} : {node:INode, [key: string]: any}) => {
  return(
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={5} {...rest}>
          <Grid xs={8}>
            <Paper style={{backgroundColor:"#434DB0", color:"white", fontWeight: "bold", padding:10}}>{node.name}</Paper>
          </Grid>
          <Grid xs={4}>
            <div>
              <TextField variant="outlined" size={"small"} />
            </div>
          </Grid>
        </Grid>
      </Box>
  )
}
const NodeEditor:React.FC<{ node:INode }> =  ({node}) => {
  return (
      <Accordion>
        <AccordionSummary>
          <WeightEditor node={node} />
        </AccordionSummary>
        <AccordionDetails>
          <Grid container>
            <Grid xs={8} style={{paddingLeft: 50}}>
              {node.subFactors?.map(sf => (
                  <NodeEditor node={sf} />
              ))}
              {node.signals?.map(sig => (
                  <WeightEditor node={sig} style={{marginBottom:10}} />
              ))}

            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
  )

}
function CreateModel() {
  const product = {
    name: "Working Capital Loan",
    factors: [
      {
        name: "Financial Strength",
        subFactors: [
          {
            name: "Market Conditions ",
            signals: [
              {name: "GP%vsSector"},
              {name: "NP%vsSector"},
              {name: "LeveragevsSector"},
              {name: "GearingvsSector"}
            ]
          },
          {
            name: "Debt Service",
            signals: [
              {name: "EBIDTA:DSC"}
            ]
          },
          {
            name: "Financial Stability",
            signals: [
              {name: "%ChgTurnover"},
              {name: "EBIDTA%ratio"},
              {name: "Stressed EBIDTA:DSC"},
              {name: "%ChgRetainedProfits"}
            ]
          },
          {
            name: "Gearing ratio",
            signals: [
              {name: "Gearing"},
            ]
          },
          {
            name: "Leverage",
            signals: [
              {name: "Leverage"},
            ]
          },
        ]
      },
      {
        name: "Strength of Business Owner/Guarantor & Security Package",
        subFactors: [
          {
            name: "Financial Capacity & Willingness to Support",
            signals: [
              {name: "Sponsors Debt"},
              {name: "Sponsors Net Worth"},
              {name: "Sponsor Credit Score"},
              {name: "Business Interuption Insurance"},
            ]
          }
        ]
      }
    ]
  }

  return (
    <div className="">
      <div>create model</div>
      {product.factors.map(f => (
          <NodeEditor node={f} />
      ))}
    </div>
  );
}

export default CreateModel;
