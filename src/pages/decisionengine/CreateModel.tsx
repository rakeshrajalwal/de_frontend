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
import Slider from '@mui/material/Slider';
//import Policy from './components/Policy'
import './CreateModel.css';

// import './styles.css';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import { ShowChart } from '@mui/icons-material';
import styled from "@emotion/styled";


const Label = styled(Typography)`
    font-weight: bold
`;
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
    loanPurpose: [],
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
            "name": "Financial Strength",
            "subFactors": [
                {
                    "name": "Market Conditions ",
                    "signals": [
                        { "name": "GP%vsSector" },
                        { "name": "NP%vsSector" },
                        { "name": "LeverageVsSector" },
                        { "name": "GearingVsSector" }
                    ]
                },
                {
                    "name": "Debt Service",
                    "signals": [
                        { "name": "EBIDTA:DSC" }
                    ]
                },
                {
                    "name": "Financial Stability",
                    "signals": [
                        { "name": "%ChgTurnover" },
                        { "name": "EBIDTA%ratio" },
                        { "name": "Stressed EBIDTA:DSC" },
                        { "name": "%ChgRetainedProfits" }
                    ]
                },
                {
                    "name": "Gearing ratio",
                    "signals": [
                        { "name": "Gearing" }
                    ]
                },
                {
                    "name": "Leverage",
                    "signals": [
                        { "name": "Leverage" }
                    ]
                }
            ]
        },
        {
            "name": "Strength of Business Owner/Guarantor & Security Package",
            "subFactors": [
                {
                    "name": "Financial Capacity & Willingness to Support",
                    "signals": [
                        { "name": "Sponsors Debt" },
                        { "name": "Sponsors Net Worth" },
                        { "name": "Sponsor Credit Score" },
                        { "name": "Business Interuption Insurance" }
                    ]
                }
            ]
        },
        {
            "name": "Transaction Characteristics ",
            "subFactors": [
                {
                    "name": "Term of Loan vs. Purpose",
                    "signals": [
                        {
                            "name": "TermvsPurpose"
                        }
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

const ControlContainer = styled.div`
display: flex;
gap:15px;
align-items:baseline;
padding-left:5px;
padding-right:15px;
`;

const RangeEditor = ({ minField, maxField }: { minField: object, maxField: object }) => (
    <div style={{ display: "flex", gap: 5, alignItems: 'baseline', flexGrow: 1 }}>
        <TextField style={{ flexGrow: 1 }} type={'number'}
            variant="standard"
            {...minField}
            inputProps={{
                placeholder: "Min",
                style: { textAlign: 'center' }
            }}
        />
        <Typography>to</Typography>
        <TextField style={{ flexGrow: 1 }} type={'number'}
            variant="standard"
            {...maxField}
            inputProps={{
                placeholder: "Max",
                style: { textAlign: 'center' }
            }}
        />
    </div>
)
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
                                    {...product}
                                >
                                    <MenuItem value={'Working Capital Loan'}>Working Capital Loan</MenuItem>
                                    <MenuItem value={'Product 2'}>Product 2</MenuItem>
                                    <MenuItem value={'Product 3'}>Product 3</MenuItem>
                                </Select>
                            </ControlContainer>
                        </Grid>

                        <Grid item md={6}>
                            <ControlContainer>
                                <Label>Model:</Label>
                                <TextField
                                    fullWidth
                                    variant="standard"
                                    {...name}
                                />
                            </ControlContainer>
                        </Grid>
                    </Grid>

                    <Grid container>
                        <Grid item md={6} >
                            <ControlContainer>
                                <Label>Loan Range (£):</Label>
                                <RangeEditor minField={loanMin} maxField={loanMax} />
                            </ControlContainer>
                        </Grid>
                        <Grid item md={6} >
                            <ControlContainer>
                                <Label>Term (months):</Label>
                                <RangeEditor minField={termMin} maxField={termMax} />
                            </ControlContainer>
                        </Grid>
                    </Grid>

                    <Grid container style={{ alignItems: 'flex-end' }}>
                        <Grid item md={6} >
                            <ControlContainer>
                                <Label>Purpose:</Label>
                                <Select
                                    multiple
                                    fullWidth
                                    variant="standard"
                                    {...purpose}
                                >
                                    <MenuItem value={`Purpose 1`}>Purpose 1</MenuItem>
                                    <MenuItem value={`Purpose 2`}>Purpose 2</MenuItem>
                                    <MenuItem value={`Purpose 3`}>Purpose 3</MenuItem>
                                </Select>
                            </ControlContainer>
                        </Grid>
                        <Grid item md={6} >
                            <label>
                                <Field type="radio" {...isSecured} value="true" />
                                <span style={{ fontWeight: "bold" }}>Secured</span>
                            </label>
                            <label>
                                <Field type="radio" {...isSecured} value="false" />
                                <span style={{ fontWeight: "bold" }}>Unsecured</span>
                            </label>
                        </Grid>
                    </Grid>

                </div>
            </CardContent>
        </Card>

    )
}

function HealthIndicator({ node }: { node: INode }) {
    if (!(node.signals || node.subFactors)) {
        return <></>
    }

    return <div style={{
        width: 10,
        height: 10,
        borderRadius: "50%",
        border: "1px solid",
        backgroundColor: treeWeightsOkay(node) ? "green" : "red"
    }}></div>;
}

const WeightEditor = ({ node, path, type, ...rest }: { node: INode, path: string, type: string, [key: string]: any }) => {
    const [field, meta, helpers] = useField(`${path}.weight`);

    const inc = () => {
        helpers.setValue((parseInt(field.value) || 0) + 1)
    }

    const dec = () => {
        helpers.setValue(parseInt(field.value) - 1)
    }

    const colors: any = {
        'blue': {
            background: '#434DB0 0% 0% no-repeat padding-box',
            color: '#FFFFFF'
        },
        'gray': {
            backgroundColor: '#F5F5F5'
        },
        'white': {
            backgroundColor: 'white'
        }
    }

    return (
        <Box sx={{ flexGrow: 1, margin: 2 }} className={type === 'white' ? 'signal-box' : ''}>
            <div style={{ display: 'flex', gap: 10 }}>
                <Paper
                    style={{
                        flexGrow: 1,
                        fontWeight: "bold",
                        padding: "10px 20px",
                        display: "flex",
                        alignItems: 'center',
                        borderRadius: 8,
                        ...colors[type]
                    }}>
                    <Typography style={{ flexGrow: 1, font: 'normal normal bold 12px Verdana' }}>{node.name}</Typography>
                    <HealthIndicator node={node} />
                </Paper>

                <div style={{ display: 'flex', gap: 2 }} onClick={e => e.stopPropagation()}>
                    <Button variant="contained" style={{ borderRadius: 8, width: 39.5, minWidth: "unset", backgroundColor: '#434DB0' }} size="small" onClick={dec} > - </Button>
                    <TextField sx={{ "& fieldset": { border: 'none' } }} type={'number'}
                        inputProps={{
                            min: 0,
                            max: 100,
                            style: {
                                textAlign: 'center'
                            }
                        }}
                        variant="outlined" size="small" {...field} style={{ width: 50, height: 39.5, backgroundColor: "rgba(0, 0, 0, 0.06)" }} />
                    <Button variant="contained" style={{ borderRadius: 8, width: 39.5, minWidth: "unset", backgroundColor: '#434DB0' }} size="small" onClick={inc} > + </Button>
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
        <Grid container>
            <Grid item md={12}>
                <Card style={{ border: '2px solid blue' }}>
                    <CardContent >
                        <Typography style={{ textAlign: 'center' }} variant="h6" gutterBottom>
                            Edit Criteria - {node.name}
                        </Typography>

                        {/* strong */}
                        <Grid style={{ display: 'flex', flexDirection: 'row', justifyContent: "space-around", marginBottom: '5px' }}>
                            <Grid item xs={2}> <Typography fontWeight={"bold"} color={"#009300"}>Strong</Typography></Grid>

                            <TextField size="small" inputProps={{
                                style: {
                                    paddingLeft: '2px',
                                    paddingRight: '2px',
                                    textAlign: 'center',
                                    width: '50px'
                                }
                            }}
                                {...strongmin} />

                            <Typography mt={2}> or </Typography>

                            <Grid item md={3}>
                                <Select
                                    size='small'
                                    defaultValue={'above'}
                                    variant="outlined"
                                    inputProps={{
                                        style: {
                                            paddingLeft: '2px',
                                            paddingRight: '2px',
                                            textAlign: 'center',
                                            width: '50px'
                                        }
                                    }}
                                    {...strongmax}
                                >
                                    <MenuItem value={`above`}>above</MenuItem>
                                    <MenuItem value={`below`}>below</MenuItem>
                                </Select>
                            </Grid>

                        </Grid>

                        <Grid style={{ display: 'flex', flexDirection: 'row', justifyContent: "space-around", marginBottom: '5px' }}>

                            <Grid item xs={2}> <Typography fontWeight={"bold"} color={"#9DD566"}>Good</Typography></Grid>

                            <TextField size="small" inputProps={{
                                style: {
                                    paddingLeft: '2px',
                                    paddingRight: '2px',
                                    textAlign: 'center',
                                    width: '50px'
                                }
                            }}
                                {...goodmin} />

                            <Typography mt={2}> to </Typography>

                            <Grid item md={3}>
                                <TextField size="small" inputProps={{
                                    style: {
                                        paddingLeft: '2px',
                                        paddingRight: '2px',
                                        textAlign: 'center',
                                        width: '50px'
                                    }
                                }}
                                    {...goodmax} />
                            </Grid>

                        </Grid>

                        <Grid style={{ display: 'flex', flexDirection: 'row', justifyContent: "space-around", marginBottom: '5px' }}>

                            <Grid item xs={2}> <Typography fontWeight={"bold"} color={"#FCC200"}>Satisfactory</Typography></Grid>

                            <TextField size="small" inputProps={{
                                style: {
                                    paddingLeft: '2px',
                                    paddingRight: '2px',
                                    textAlign: 'center',
                                    width: '50px'
                                }
                            }}
                                {...satisfactorymin} />

                            <Typography mt={2}> to </Typography>

                            <Grid item md={3}>
                                <TextField size="small" inputProps={{
                                    style: {
                                        paddingLeft: '2px',
                                        paddingRight: '2px',
                                        textAlign: 'center',
                                        width: '50px'
                                    }
                                }}
                                    {...satisfactorymax} />
                            </Grid>

                        </Grid>

                        <Grid style={{ display: 'flex', flexDirection: 'row', justifyContent: "space-around", marginBottom: '5px' }}>

                            <Grid item xs={2}>  <Typography fontWeight={"bold"} color={"#FA0102"}>Weak</Typography> </Grid>

                            <TextField size="small" inputProps={{
                                style: {
                                    paddingLeft: '2px',
                                    paddingRight: '2px',
                                    textAlign: 'center',
                                    width: '50px'
                                }
                            }}
                                {...weakmin} />

                            <Typography mt={2}> or </Typography>

                            <Grid item md={3}>
                                <Select
                                    size='small'
                                    defaultValue={'below'}
                                    variant="outlined" inputProps={{
                                        style: {
                                            paddingLeft: '2px',
                                            paddingRight: '2px',
                                            textAlign: 'center',
                                            width: '50px'
                                        }
                                    }}
                                    {...weakmax}
                                >
                                    <MenuItem value={`above`}>above</MenuItem>
                                    <MenuItem value={`below`}>below</MenuItem>
                                </Select>
                            </Grid>

                        </Grid>

                    </CardContent>
                </Card>
            </Grid>
        </Grid >
    )
}

const NodeEditor: React.FC<{ node: INode, path: string, level: number }> = ({ node, path, level }) => {
    const [expanded, setExpanded] = React.useState<boolean>(false);
    const toggleExpanded = () => setExpanded(!expanded);

    const criteriaValueSlider = [
        {
            value: 0,
            label: 'below',
        },
        {
            value: 100,
            label: 'above',
        },
    ];

    const [selectedSignal, setSelectedSignal] = React.useState<number>(-1);
    return (
        <Accordion expanded={expanded} onChange={toggleExpanded} sx={{}} >
            <AccordionSummary expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem', }} />} sx={{
                flexDirection: 'row-reverse',
                '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
                    transform: 'rotate(90deg)',
                },
                '& .MuiAccordionSummary-content': {
                    margin: level == 1 ? 2 : 0,
                },
                '& .MuiAccordionSummary-content.Mui-expanded': {
                    margin: 0,
                },
            }}
            >
                <WeightEditor node={node} path={`${path}`} type={expanded ? 'blue' : 'gray'} />
            </AccordionSummary>

            <AccordionDetails>
                <Grid container>
                    <Grid item xs={8} style={{ paddingLeft: 25 }}>
                        {node.subFactors?.map((sf, i) => (
                            <NodeEditor key={i} node={sf} path={`${path}.subFactors[${i}]`} level={level + 1} />
                        ))}
                        {node.signals && (
                            <div style={{ display: "flex" }}>
                                <div>
                                    {node.signals.map((sig, i) => (
                                        <div key={i} style={{ display: 'flex' }}>
                                            <WeightEditor node={sig} style={{ marginBottom: 10 }} path={`${path}.signals[${i}]`} type={'white'} />
                                            <SettingsIcon style={{ marginTop: '10px', cursor: 'pointer' }} onClick={() => setSelectedSignal(selectedSignal === i ? -1 : i)} />
                                        </div>
                                    ))}
                                </div>
                                {selectedSignal >= 0 && (
                                    <CriteriaEditor node={node.signals[selectedSignal]} path={`${path}.signals[${selectedSignal}]`} />
                                )}
                            </div>
                        )}

                    </Grid>
                </Grid>
            </AccordionDetails>
        </Accordion >
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
            loanPurpose: [],
            isSecured: false,
        },
        factors: p.factors.map(f => ({
            name: f.name,
            weight: '0',
            subFactors: f.subFactors.map(sf => ({
                name: sf.name,
                weight: '0',
                signals: sf.signals.map(sig => ({
                    name: sig.name,
                    weight: '0',
                    criteria: Criterias.type

                }))
            }))
        }))
    }
}

const treeWeightsOkay1 = (node: INode): boolean => true;
const treeWeightsOkay = (node: INode): boolean => {
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
                        <div style={{ marginBottom: '5px', marginTop: '30px', display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Typography style={{ paddingBottom: 20, fontFamily: 'Verdana', fontWeight: 'bold', fontSize: '1.1rem' }}>Create Model</Typography>
                            <Button disabled={!formik.isValid} type="submit" style={{ margin: '10px', backgroundColor: '#434DB0', color: '#fff', float: 'right' }} size="large">Submit</Button>
                        </div>

                        <PolicyEditor />

                        <Card sx={{ boxShadow: '0px 3px 6px #00000029', marginTop : '10px' }}>
                            <CardContent>
                                {formik.values.factors.map((f, i) => (
                                    <NodeEditor key={i} node={f} path={`factors[${i}]`} level={1} />
                                ))}
                            </CardContent>
                        </Card>
                    </Form>
                );
            }}
        </Formik>
    )
}

export default CreateModel