import {
    CardContent,
    Card,
    Typography,
    Button as MuiButton
} from "@mui/material";
import { Form, Formik } from "formik";
import { PolicyEditor } from './components/Policy';
import { NodeEditor } from './editors/NodeEditor';
import { IProduct, IModel } from "./interfaces/ModelInterface";
import './styles/CreateModel.css';
import styled from "@emotion/styled";
import { spacing } from "@mui/system";


const Label = styled(Typography)`
    font-weight: bold;
    text-transform: capitalize;
`;

const Range = {
    min: '',
    max: ''
}

const Button = styled(MuiButton)(spacing);

const product: IProduct = {
    name: "Working Capital Loan",
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

const ControlContainer = styled.div`
display: flex;
gap:15px;
align-items:baseline;
padding-left:5px;
padding-right:15px;
`;

function getEmptyModel(p: IProduct): IModel {
    return {
        name: '',//modelname
        product: '',
        policy: {
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
                        <div style={{ paddingBottom: 8, display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Typography style={{ fontWeight: 'bold', fontSize: '1.1rem' }} variant="h3" gutterBottom display='inline'>Create Model</Typography>
                            <Button mr={1} type="submit" variant='contained' style={{ backgroundColor: '#434DB0', color: '#fff' }} size="medium">Submit</Button>
                        </div>

                        <PolicyEditor />

                        <Card sx={{ boxShadow: '0px 3px 6px #00000029', marginTop: '8px' }}>
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
