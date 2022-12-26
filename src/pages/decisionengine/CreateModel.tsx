import * as React from 'react';
import {render} from 'react-dom';
import {Accordion, AccordionDetails, AccordionSummary, Box, Paper, TextField} from "@mui/material";
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import lodash from 'lodash';
import {Field, Form, Formik, useField, useFormik} from "formik";
import Policy from './components/Policy'

// import './styles.css';

export interface IProduct {
    name: string,
    factors: {
        name: string,
        subFactors: {
            name: string,
            signals: {
                name: string
            }[]
        }[]
    }[]
}

interface IRange {
  min: number,
  max: number
}

export interface IModel {
    name: string,
    factors: {
        name: string,
        weight: number|string,
        subFactors: {
            name: string,
            weight: number|string,
            signals: {
                name: string
                weight: number|string,
               
            }[]
        }[]
    }[]
}


const product: IProduct = {
    name: "Working Capital Loan",
    factors: [
        {
            name: "Financial Strength",
            subFactors: [
                {
                    name: "Market Conditions",
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
};

interface INode {
    name: string;
    subFactors?: INode[];
    signals?: INode[];
}


const WeightEditor = ({node, path, ...rest}: { node: INode, path: string, [key: string]: any }) => {
    const [field, meta, helpers] = useField(`${path}.weight`);
    return (
        <Box sx={{flexGrow: 1}}>
            <Grid container spacing={5} {...rest}>
                <Grid xs={8}>
                    <Paper style={{
                        backgroundColor: "#434DB0",
                        color: "white",
                        fontWeight: "bold",
                        padding: 10
                    }}>{node.name}</Paper>
                </Grid>
                <Grid xs={4}>
                    <div>
                        <TextField variant="outlined" size={"small"} {...field} />
                    </div>
                </Grid>
            </Grid>
        </Box>
    )
}
const NodeEditor: React.FC<{ node: INode, path: string }> = ({node, path}) => {
    return (
        <Accordion>
            <AccordionSummary>
                <WeightEditor node={node} path={`${path}`}/>
            </AccordionSummary>
            <AccordionDetails>
                <Grid container>
                    <Grid xs={8} style={{paddingLeft: 50}}>
                        {node.subFactors?.map((sf, i) => (
                            <NodeEditor key={i} node={sf} path={`${path}.subFactors[${i}]`}/>
                        ))}
                        {node.signals?.map((sig, i) => (
                            <WeightEditor key={i} node={sig} style={{marginBottom: 10}} path={`${path}.signals[${i}]`}/>
                        ))}

                    </Grid>
                </Grid>
            </AccordionDetails>
        </Accordion>
    )

}

function getEmptyModel(p: IProduct):IModel {
    return {
        name: '',
        factors: p.factors.map(f => ({
            name: f.name,
            weight: '',
            subFactors: f.subFactors.map(sf => ({
                name: sf.name,
                weight: '',
                signals: sf.signals.map(sig => ({
                    name: sig.name,
                    weight: ''
                }))
            }))
        }))
    }
}

function CreateModel() {
    return (
        <Formik
            initialValues={getEmptyModel(product)}
            onSubmit={(values) => {
                alert(JSON.stringify(values, null, 2));
            }}
        >
            {formik => {
                const v = formik.values;
                return (
                    <Form>
                        <div className="">
                            <Policy />
                            <div>create model</div>
                            <button type="submit">Submit</button>
                            {formik.values.factors.map((f, i) => (
                                <NodeEditor key={i} node={f} path={`factors[${i}]`}/>
                            ))}
                        </div>
                    </Form>
                );
            }}
        </Formik>
    )
}

export default CreateModel;
