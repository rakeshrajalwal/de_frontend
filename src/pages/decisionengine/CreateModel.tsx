import * as React from 'react';
import { render } from 'react-dom';
import { Grid, Accordion, AccordionDetails, CardContent, Card, AccordionSummary, Box, Paper, TextField, Typography, Button } from "@mui/material";
import Criteria from './components/Criteria';
import lodash from 'lodash';
import { Field, Form, Formik, useField, useFormik, useFormikContext, FormikProvider } from "formik";
import Select from '@mui/material/Select';
import { number } from 'yup';
import MenuItem from '@mui/material/MenuItem';
import SettingsIcon from '@mui/icons-material/Settings';
//import Policy from './components/Policy'

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

const Range = {
    min: '',
    max: ''
}

interface IRange {
    min: number | string,
    max: number | string
}

export interface IPolicy {
    name: string,
    loanRange: IRange,
    loanTermInMonths: IRange,
    loanPurpose: string,
    isSecured: boolean
}


const Criterias = {
    type: {
        strong: Range,
        good: Range,
        satisfactory: Range,
        weak: Range
    },
    // required: true
};

export interface IModel {
    name: string,
    product: string,
    policy: IPolicy,
    factors: {
        name: string,
        weight: number | string,
        subFactors: {
            name: string,
            weight: number | string,
            signals: {
                name: string
                weight: number | string,

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
                        { name: "GP%vsSector" },
                        { name: "NP%vsSector" },
                        { name: "LeveragevsSector" },
                        { name: "GearingvsSector" }
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
                        { name: "Gearing" },
                    ]
                },
                {
                    name: "Leverage",
                    signals: [
                        { name: "Leverage" },
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
                        { name: "Sponsors Debt" },
                        { name: "Sponsors Net Worth" },
                        { name: "Sponsor Credit Score" },
                        { name: "Business Interuption Insurance" },
                    ]
                }
            ]
        }
    ]
};

interface INode {
    name: string,
    subFactors?: INode[],
    signals?: INode[],
    weight: number | string,
}

const PolicyEditor = () => {

    const [product, meta, helpers] = useField(`product`);//product name
    const [name, meta8, helpers8] = useField(`name`);//name of model
    const [loanMin, meta2, helpers2] = useField(`policy.loanRange.min`);
    const [loanMax, meta3, helpers3] = useField(`policy.loanRange.max`);
    const [termMin, meta4, helpers4] = useField(`policy.loanTermInMonths.min`);
    const [termMax, meta5, helpers5] = useField(`policy.loanTermInMonths.max`);
    const [purpose, meta6, helpers6] = useField(`policy.loanPurpose`);
    const [isSecured, meta7, helpers7] = useField(`policy.isSecured`);

    return (

        <div className="">
            <Card >
                <CardContent>

                    <Grid container >
                        <Grid item md={1.5} xs={6}>
                            <Typography variant="h6" mt={8} >
                                Product:
                            </Typography>
                        </Grid>
                        <Grid item md={4} xs={6} mt={6}>
                            <Select
                                fullWidth
                                variant="standard"
                                {...product}
                            >
                                <MenuItem value={'Working Capital Loan'}>Working Capital Loan</MenuItem>
                                <MenuItem value={'Product 2'}>Product 2</MenuItem>
                                <MenuItem value={'Product 3'}>Product 3</MenuItem>
                            </Select>
                        </Grid>

                        <Grid item md={0.5} xs={0}></Grid>
                        <Grid item md={1.5} xs={6}  >
                            <Typography variant="h6" mt={8} >
                                Model:
                            </Typography>
                        </Grid>
                        <Grid item md={4} xs={6} mt={6}>
                            <TextField
                                fullWidth
                                variant="standard"
                                {...name}

                            />

                        </Grid>
                    </Grid>

                    {/* loan range and term */}
                    <Grid container >

                        <Grid item md={6} >
                            <Grid container>
                                <Grid item md={3} xs={4}>
                                    <Typography variant="h6" mt={8} >
                                        Loan Range (£):
                                    </Typography>
                                </Grid>
                                <Grid item md={6} xs={6} mt={6} style={{ display: 'flex', flexDirection: 'row', gap: 5 }} >
                                    <TextField
                                        label="min"
                                        variant="standard"
                                        {...loanMin}

                                    />

                                    <Typography mt={6} variant="body1">to</Typography>

                                    <TextField
                                        label="max"
                                        variant="standard"
                                        {...loanMax}

                                    />

                                </Grid>
                            </Grid>
                        </Grid>

                        <Grid item md={6} >
                            <Grid container>
                                <Grid item md={3} xs={4}>
                                    <Typography variant="h6" mt={8} >
                                        Term:
                                    </Typography>
                                </Grid>
                                <Grid item md={6} xs={6} mt={6} style={{ display: 'flex', flexDirection: 'row', gap: 5 }} >
                                    <TextField
                                        label="min"
                                        variant="standard"
                                        {...termMin}

                                    />

                                    <Typography mt={6} variant="body1">to</Typography>

                                    <TextField
                                        label="max"
                                        variant="standard"
                                        {...termMax}

                                    />

                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>

                    {/* purpose */}
                    <Grid container >

                        <Grid item md={1} xs={6}>
                            <Typography variant="h6" mt={8} >
                                Purpose:
                            </Typography>
                        </Grid>
                        <Grid item md={4} xs={6} mt={6}>
                            <Select
                                fullWidth
                                variant="standard"
                                {...purpose}
                            >
                                <MenuItem value={`Purpose 1`}>Purpose 1</MenuItem>
                                <MenuItem value={`Purpose 2`}>Purpose 2</MenuItem>
                                <MenuItem value={`Purpose 3`}>Purpose 3</MenuItem>
                            </Select>
                        </Grid>


                        {/* //secured */}
                        <Grid item md={1} xs={0}></Grid>
                        <Grid item md={4} xs={12} mt={6}>

                            <label>
                                <Field type="radio" {...isSecured} value="true" />
                                Secured
                            </label>
                            <label>
                                <Field type="radio" {...isSecured} value="false" />
                                Unsecured
                            </label>

                        </Grid>

                    </Grid>

                </CardContent>
            </Card>
        </div>

    )
}

const WeightEditor = ({ node, path, ...rest }: { node: INode, path: string, [key: string]: any }) => {
    const [field, meta, helpers] = useField(`${path}.weight`);

    const inc = () => {
        helpers.setValue((parseInt(field.value) || 0) + 1)
    }

    const dec = () => {
        helpers.setValue(parseInt(field.value) - 1)
    }
    return (
        <Box sx={{ flexGrow: 1, margin: 2 }}>
            <div style={{ display: 'flex', gap:10 }}>
                <Paper style={{
                    flexGrow: 1,
                    backgroundColor: "#434DB0",
                    color: "white",
                    fontWeight: "bold",
                    padding: 10,
                    display: "flex",
                    alignItems: 'center'
                }}>
                    <Typography sx={{flexGrow:1}}>{node.name}</Typography>
                    {!!(node.signals || node.subFactors) && (
                        <div style={{
                            width: 10,
                            height: 10,
                            borderRadius: "50%",
                            border: "1px solid",
                            backgroundColor: treeWeightsOkay(node) ? "green" : 'red'
                        }}></div>
                    )}
                </Paper>

                <div style={{ display: 'flex', gap:2 }} onClick={e => e.stopPropagation()}>
                    <Button variant="contained" style={{ aspectRatio:1, minWidth: "unset" }} size="small" onClick={dec} > - </Button>
                    <TextField variant="outlined" size="small" {...field} style={{ width: 80, height:39.5, backgroundColor: "rgba(0, 0, 0, 0.06)" }} />
                    <Button variant="contained" style={{ aspectRatio:1, minWidth: "unset"  }} size="small" onClick={inc} > + </Button>
                </div>
            </div>
        </Box >
    )
}

const CriteriaEditor = ({ node, path, ...rest }: { node: INode, path: string, [key: string]: any }) => {
    const [strongmin, meta, helpers] = useField(`${path}.criteria.strong.min`);
    const [strongmax, meta2, helpers2] = useField(`${path}.criteria.strong.max`);
    const [goodmin, meta3, helpers3] = useField(`${path}.criteria.good.min`);
    const [goodmax, meta4, helpers4] = useField(`${path}.criteria.good.max`);
    const [satisfactorymin, meta5, helpers5] = useField(`${path}.criteria.satisfactory.min`);
    const [satisfactorymax, meta6, helpers6] = useField(`${path}.criteria.satisfactory.max`);
    const [weakmin, meta7, helpers7] = useField(`${path}.criteria.weak.min`);
    const [weakmax, meta8, helpers8] = useField(`${path}.criteria.weak.max`);

    return (
        <Grid container >
            <Card style={{ border: '2px solid blue', padding: '5px' }} sx={{ flexGrow: 1 }}>
                <CardContent>
                    <Typography style={{ textAlign: 'center' }} variant="h6" gutterBottom>
                        Edit Criteria
                    </Typography>

                    <Grid gap={2} style={{ display: 'flex', flexDirection: 'row', justifyContent: "space-evenly", margin: 5 }}>

                        <Typography fontWeight={"bold"} color={"#009300"}>Strong</Typography>

                        <TextField size="small"

                            {...strongmin}
                        />

                        <Typography mt={2}> or </Typography>

                        <Select
                            size="small"
                            variant="outlined"
                            {...strongmax}
                        >
                            <MenuItem value={'above'}>above</MenuItem>
                            <MenuItem value={'below'}>below</MenuItem>
                        </Select>
                    </Grid>

                    <Grid gap={2} style={{ display: 'flex', flexDirection: 'row', justifyContent: "space-around", margin: 5 }}>

                        <Typography fontWeight={"bold"} color={"#9DD566"}>Good</Typography>

                        <TextField size="small"
                            {...goodmin}

                        />

                        <Typography mt={2}> to </Typography>

                        <TextField size="small"
                            {...goodmax}
                        />
                    </Grid>


                    <Grid gap={2} style={{ display: 'flex', flexDirection: 'row', justifyContent: "space-around", margin: 5 }}>

                        <Typography fontWeight={"bold"} color={"#FCC200"}>Satisfactory</Typography>

                        <TextField size="small"
                            {...satisfactorymin}
                        />

                        <Typography mt={2}> to </Typography>

                        <TextField size="small"
                            {...satisfactorymax}
                        />

                    </Grid>


                    <Grid gap={2} style={{ display: 'flex', flexDirection: 'row', justifyContent: "space-around", margin: 5 }}>

                        <Typography fontWeight={"bold"} color={"#FA0102"}>Weak</Typography>

                        <TextField size="small"
                            {...weakmin}

                        />

                        <Typography mt={2}> or </Typography>

                        <Select
                            size="small"
                            variant="outlined"
                            {...weakmax}
                        >
                            <MenuItem value={`above`}>above</MenuItem>
                            <MenuItem value={`below`}>below</MenuItem>
                        </Select>

                    </Grid>
                </CardContent>
            </Card>
            <svg data-testid="SettingsIcon"></svg>
        </Grid>

    )
}

const NodeEditor: React.FC<{ node: INode, path: string }> = ({ node, path }) => {
    return (
        <Accordion style={{ marginTop: 5 }}>

            <AccordionSummary>
                <WeightEditor node={node} path={`${path}`} />
            </AccordionSummary>

            <AccordionDetails>
                <Grid container>
                    <Grid item xs={8} style={{ paddingLeft: 50 }}>
                        {node.subFactors?.map((sf, i) => (
                            <NodeEditor key={i} node={sf} path={`${path}.subFactors[${i}]`} />
                        ))}
                        {node.signals?.map((sig, i) => (
                            <div key={i} style={{ display: 'flex', flexDirection: 'row' }}>
                                <WeightEditor node={sig} style={{ marginBottom: 10 }} path={`${path}.signals[${i}]`} />
                                {/* <CriteriaEditor node={sig} path={`${path}.signals[${i}]`} /> */}
                                <Grid item mt={6}>
                                    {/* <CriteriaEditor node={sig} path={`${path}.signals[${i}]`} /> */}
                                </Grid>
                            </div>
                        ))}

                    </Grid>
                </Grid>
            </AccordionDetails>
        </Accordion>
    )

}

function getEmptyModel(p: IProduct): IModel {
    return {
        name: '',//modelname
        product: '',
        policy: {
            name: '',//policyname
            loanRange: { min: '', max: '' },
            loanTermInMonths: { min: '', max: '' },
            loanPurpose: '',
            isSecured: false,
        },
        factors: p.factors.map(f => ({
            name: f.name,
            weight: '',
            subFactors: f.subFactors.map(sf => ({
                name: sf.name,
                weight: '',
                signals: sf.signals.map(sig => ({
                    name: sig.name,
                    weight: '',
                    criteria: Criterias.type

                }))
            }))
        }))
    }
}

const treeWeightsOkay = (node: INode):boolean => {
    const children = node.subFactors || node.signals;
    return lodash.isEmpty(children) ||
        (lodash.isEmpty(children?.map(treeWeightsOkay).filter(x => !x))
            && (lodash.sumBy(children, node => parseInt(node.weight.toString())) === 100));
}

function CreateModel() {    
    return (
        <Formik
            initialValues={getEmptyModel(product)}
            onSubmit={(values) => {
                console.log(JSON.stringify(values, null, 2))
                alert(JSON.stringify(values, null, 2));
            }}
        >
            {formik => {
                const v = formik.values;
                return (
                    <Form>
                        <div className="">
                            <Typography variant="h1">create model</Typography>
                            <PolicyEditor />

                            <button type="submit" style={{ margin: '10px' }}>Submit</button>
                            {formik.values.factors.map((f, i) => (
                                <NodeEditor key={i} node={f} path={`factors[${i}]`} />
                            ))}
                        </div>
                    </Form>
                );
            }}
        </Formik>
    )
}

export default CreateModel