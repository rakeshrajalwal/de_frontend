import * as React from 'react';
import { render } from 'react-dom';
import {
    Grid,
    Accordion,
    AccordionDetails,
    CardContent,
    Card,
    AccordionSummary,
    Box,
    Paper,
    TextField,
    Typography,
    Button
} from "@mui/material";
import Criteria from './components/Criteria';
import lodash from 'lodash';
import { Field, Form, Formik, useField, useFormik, useFormikContext, FormikProvider } from "formik";
import Select from '@mui/material/Select';
import { number } from 'yup';
import MenuItem from '@mui/material/MenuItem';
import { PolicyEditor } from './components/Policy'
import { INode, IProduct, IModel, IRange, IPolicy } from "./interfaces/CreateModelInterfaces"
import './CreateModel.css';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import styled from "@emotion/styled";


const Label = styled(Typography)`
    font-weight: bold;
    text-transform: capitalize;
`;

const Range = {
    min: '',
    max: ''
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

const ControlContainer = styled.div`
display: flex;
gap:15px;
align-items:baseline;
padding-left:5px;
padding-right:15px;
`;

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

const WeightEditor = ({
    node,
    path,
    type,
    level,
    ...rest
}: { node: INode, path: string, type: string, level: number, [key: string]: any }) => {
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

    const height = level === 1 ? 40 : level === 2 ? 30 : 35;
    const font = `normal normal bold ${level === 1 ? 12 : 10}px Verdana`
    const width = level == 1 ? 600 : level == 2 ? 440 : 250;
    return (
        <Box sx={{ margin: 2, display: 'flex', gap: 3, height }} className={type === 'white' ? 'signal-box' : ''}>
            <Paper
                style={{
                    width,
                    flexGrow: 1,
                    fontWeight: "bold",
                    padding: "10px 20px",
                    display: "flex",
                    alignItems: 'center',
                    borderRadius: 8,
                    ...colors[type]
                }}>
                <Typography style={{ flexGrow: 1, font }}>{node.name}</Typography>
                <HealthIndicator node={node} />
            </Paper>


            <div style={{ display: 'flex', gap: 2 }} onClick={e => e.stopPropagation()}>
                <Button variant="contained"
                    style={{ borderRadius: 8, minWidth: "unset", backgroundColor: '#434DB0', aspectRatio: 1 }}
                    size="small" onClick={dec}> - </Button>
                <TextField sx={{ "& fieldset": { border: 'none' } }} type={'number'}
                    inputProps={{
                        min: 0,
                        max: 100,
                        style: {
                            textAlign: 'center'
                        }
                    }}
                    variant="outlined" size="small" {...field}
                    style={{ width: 50, backgroundColor: "rgba(0, 0, 0, 0.06)" }} />
                <Button variant="contained"
                    style={{ borderRadius: 8, minWidth: "unset", backgroundColor: '#434DB0', aspectRatio: 1 }}
                    size="small" onClick={inc}> + </Button>
            </div>

        </Box>
    )
}
const CloseRangeEditor = ({
    fieldPath,
    variant = 'standard',
    inputWidth = 'auto',
    openRange = false
}: { fieldPath: string, variant?: 'standard' | 'outlined', inputWidth?: number | string, openRange?: boolean }) => {
    const [minField] = useField(`${fieldPath}.min`);
    const [maxField] = useField(`${fieldPath}.max`);
    return (
        <div style={{ display: "flex", gap: 5, alignItems: 'baseline', flexGrow: 1 }}>
            <NumberEditor field={minField} placeholder={'Min'} inputWidth={inputWidth} variant={variant} />
            <Typography>to</Typography>
            <NumberEditor field={maxField} placeholder={'Max'} inputWidth={inputWidth} variant={variant} />
        </div>
    );
}
const NumberEditor = ({
    variant = 'standard',
    field,
    inputWidth = 'auto',
    placeholder
}: { variant?: 'standard' | 'outlined', field: object, inputWidth?: number | string, placeholder: string }) => (
    <TextField
        style={{ flexGrow: 1, height: 25 }}
        type={'number'}
        size={"small"}
        variant={variant}
        {...field}
        InputLabelProps={{ style: { height: 25 } }}
        InputProps={{
            placeholder,
            style: { width: inputWidth, height: 25 }
        }}
        inputProps={{ style: { textAlign: 'center' } }}
    />
)

const OpenRangeEditor = ({
    fieldPath,
    variant = 'standard',
    inputWidth = 'auto',
    openRange = false
}: { fieldPath: string, variant?: 'standard' | 'outlined', inputWidth?: number | string, openRange?: boolean }) => {
    const [minField, , minHelper] = useField(`${fieldPath}.min`);
    const [maxField, , maxHelper] = useField(`${fieldPath}.max`);
    const [aboveOrBelow, setAboveOrBelow] = React.useState<string>('');
    const setMinMax = (v: string) => {
        setAboveOrBelow(v);
        const min = minField.value;
        const max = maxField.value;
        const editableField = (aboveOrBelow === 'above') ? minHelper : maxHelper;
        editableField.setValue(min ?? max);
    }
    return (
        <div style={{ display: "flex", gap: 5, alignItems: 'baseline', flexGrow: 1 }}>
            <NumberEditor field={(aboveOrBelow === 'above') ? minField : maxField} placeholder={''}
                inputWidth={inputWidth} variant={variant} />
            <Typography>or</Typography>
            <Select value={aboveOrBelow} fullWidth variant={'standard'}
                onChange={(e) => setMinMax(e.target.value)}>
                <MenuItem value={'above'}>above</MenuItem>
                <MenuItem value={'below'}>below</MenuItem>
            </Select>
        </div>
    );
}

const RangeEditor = ({
    isOpen = false,
    ...rest
}: { isOpen?: boolean, fieldPath: string, variant?: 'standard' | 'outlined', inputWidth?: number | string, openRange?: boolean }) => {
    if (isOpen) {
        return <OpenRangeEditor {...rest} />
    } else {
        return <CloseRangeEditor {...rest} />
    }
}

const CriteriaEditor = ({ node, path, ...rest }: { node: INode, path: string, [key: string]: any }) => {
    const ranges = ["strong", "good", "satisfactory", "week"];
    const colors = ['#078F08', '#9DD566', '#FEC401', '#FB0102'];
    return (
        <Card variant={"outlined"} style={{ borderColor: '#434DB0' }}>
            <CardContent>
                <Typography style={{ textAlign: 'center', fontWeight: 'bold', textDecoration: 'underline', padding: 10 }}>
                    Edit Criteria - {node.name}
                </Typography>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {ranges.map((rangeName, i) => (
                        <ControlContainer key={i}>
                            <Label style={{ width: 80, textAlign: 'right', color: colors[i] }}>{rangeName}</Label>
                            <RangeEditor
                                // isOpen={i==0 || i==3}
                                fieldPath={`${path}.criteria.${rangeName}`}
                                variant={'outlined'}
                                inputWidth={50}
                            />
                        </ControlContainer>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}

const CriteriaBar = () => {
    return (
        <div className='criteria-bar'>
            {[-5, 5, 15].map((v, i) => (
                <div key={i} className="criteria-value">{v}</div>
            ))}
        </div>
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
        <Accordion expanded={expanded} onChange={toggleExpanded} sx={{}}>
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
                <WeightEditor node={node} path={`${path}`} type={expanded ? 'blue' : 'gray'} level={level} />
            </AccordionSummary>

            <AccordionDetails>
                <div style={{ paddingLeft: level * 25 }}>
                    {node.subFactors && (
                        <div>
                            {node.subFactors.map((sf, i) => (
                                <NodeEditor key={i} node={sf} path={`${path}.subFactors[${i}]`} level={level + 1} />
                            ))}
                        </div>
                    )}
                    {node.signals && (
                        <div style={{ display: "flex", gap: 20 }}>
                            <div>
                                {node.signals.map((sig, i) => (
                                    <div key={i} style={{ display: 'flex', alignItems: 'baseline' }}>
                                        <WeightEditor node={sig} style={{ marginBottom: 10 }} level={level + 1}
                                            path={`${path}.signals[${i}]`} type={'white'} />
                                        <div onClick={() => setSelectedSignal(selectedSignal === i ? -1 : i)}>
                                            <CriteriaBar />
                                        </div>
                                    </div>
                                ))}
                            </div>
                            {selectedSignal >= 0 && (
                                <CriteriaEditor node={node.signals[selectedSignal]}
                                    path={`${path}.signals[${selectedSignal}]`} />
                            )}
                        </div>
                    )}
                </div>
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
                    criteria: {
                        strong: { min: '', max: '' },
                        good: { min: '', max: '' },
                        satisfactory: { min: '', max: '' },
                        weak: { min: '', max: '' },
                    }
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
                        <Typography
                            style={{ paddingBottom: 20, fontFamily: 'Verdana', fontWeight: 'bold', fontSize: '1.1rem' }}>Create
                            Model</Typography>

                        <PolicyEditor />

                        <button type="submit" style={{ margin: '10px' }}>Submit</button>
                        <Card sx={{ boxShadow: '0px 3px 6px #00000029' }}>
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
