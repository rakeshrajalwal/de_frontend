import * as React from 'react';
import {
    CardContent,
    Card,
    Typography,
    Button, CardHeader
} from "@mui/material";
import { Form, Formik } from "formik";
import { PolicyEditor } from './components/Policy';
import { NodeEditor } from './editors/NodeEditor';
import { IProduct, IModel } from "./interfaces/ModelInterface"
import './CreateModel.css';
import styled from "@emotion/styled";
import lodash from 'lodash';
import * as Yup from "yup";
import { TotalWeight } from "./editors/WeightEditor";


const product: IProduct = {
    name: "Working Capital Loan",
    policy: {
        loanRange: { min: 1e3, max: 1e6 },
        loanTermInMonths: { min: 6, max: 60 },
        loanPurpose: ['Cashflow', 'Memberships', 'Acquisition'],
        isSecured: false,
    },
    factors: [
        {
            name: "Financial Strength",
            subFactors: [
                {
                    name: "Market Conditions",
                    signals: [
                        { name: "GP%vsSector" },
                        { name: "NP%vsSector" },
                        { name: "LeveragevsSector", isReverseScale: true },
                        { name: "GearingvsSector", isReverseScale: true }
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
                        { name: "Gearing", isReverseScale: true },
                    ]
                },
                {
                    name: "Leverage",
                    signals: [
                        { name: "Leverage", isReverseScale: true },
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
const products = [product];

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

function randomSplit(total: number, count: number): number[] {
    if (count == 1) return [total];
    let part = Math.floor(Math.random() * total);
    return [part, ...randomSplit(total - part, count - 1)]
}


function getRandomModel(p: IProduct): IModel {
    return {
        name: "m1",
        product: p.name,
        policy: {
            loanRange: { min: 100000, max: 500000 },
            loanTermInMonths: { min: 12, max: 24 },
            loanPurpose: [lodash.shuffle(p.policy.loanPurpose)[0]],
            isSecured: false,
        },
        factors: randomSplit(100, p.factors.length).map((weight, i) => {
            const factor = p.factors[i];
            return {
                name: factor.name,
                weight,
                subFactors: randomSplit(100, factor.subFactors.length).map((weight, i) => {
                    const subFactor = factor.subFactors[i];
                    return {
                        name: subFactor.name,
                        weight,
                        signals: randomSplit(100, subFactor.signals.length).map((weight, i) => {
                            return {
                                name: subFactor.signals[i].name,
                                weight,
                                criteria: subFactor.signals[i].isReverseScale ? {
                                    weak: { min: 200, max: 300 },
                                    satisfactory: { min: 100, max: 200 },
                                    good: { min: 10, max: 100 },
                                    strong: { min: 0, max: 10 }
                                } : {
                                    strong: { min: 200, max: 300 },
                                    good: { min: 100, max: 200 },
                                    satisfactory: { min: 10, max: 100 },
                                    weak: { min: 0, max: 10 }

                                }
                            }
                        })
                    }
                })
            }
        })
    };
}

const positiveInteger = Yup.number().required('Required').positive("Should be positive").integer('Should be integer');
let positiveIntRangeSchema = Yup.object().shape({
    min: positiveInteger.when('max', (max, schema) => schema.max(max, "Invalid range")),
    max: positiveInteger
}).required();
let rangeSchema = Yup.object().shape({
    min: Yup.number().required('Required').when('max', (max, schema) => schema.max(max, "Invalid range")),
    max: Yup.number().required('Required')
}).required();

const requiredString = Yup.string().required('Required');
const validationSchema = Yup.object().shape({
    name: requiredString,
    product: requiredString,
    policy: Yup.object().shape({
        loanRange: positiveIntRangeSchema,
        loanTermInMonths: positiveIntRangeSchema,
        loanPurpose: Yup.array().of(Yup.string().required()).required().min(1)
    }),
    factors: Yup.array().of(Yup.object().shape({
        weight: Yup.number().required().min(0).max(100),
        subFactors: Yup.array().of(Yup.object().shape({
            weight: Yup.number().required().min(0).max(100),
            signals: Yup.array().of(Yup.object().shape({
                weight: Yup.number().required().min(0).max(100),
                criteria: Yup.object().shape({
                    strong: rangeSchema,
                    good: rangeSchema,
                    satisfactory: rangeSchema,
                    weak: rangeSchema,
                })
            })).test('sum', 'Sum should be 100', (a) => lodash.sumBy(a, 'weight') === 100)
        })).test('sum', 'Sum should be 100', (a) => lodash.sumBy(a, 'weight') === 100)
    })).test('sum', 'Sum should be 100', (a) => lodash.sumBy(a, 'weight') === 100)
});


function CreateModel() {
    const [product, setProduct] = React.useState<IProduct>();
    let reverseSignalNames = product?.factors.flatMap(f => f.subFactors.flatMap(sf => sf.signals.filter(sig => sig.isReverseScale).map(sig => sig.name))) || [];
    const [validateOnChange, setValidateOnChange] = React.useState<boolean>(false);
    return (
        <Formik
            initialValues={{
                name: "",
                product: '',
                policy: {
                    loanRange: { min: '', max: '' },
                    loanTermInMonths: { min: '', max: '' },
                    loanPurpose: [],
                    isSecured: undefined,
                },
                factors: []
            } as IModel}
            validationSchema={validationSchema}
            validateOnBlur={false}
            validateOnChange={true}
            onSubmit={(values) => {
                console.log(JSON.stringify(values, null, 2))
                alert(JSON.stringify(values, null, 2));
                setValidateOnChange(true)
            }}
        >
            {formik => {
                React.useEffect(() => {
                    const product = lodash.find(products, { name: formik.values.product });
                    setProduct(product);
                    if (product) {
                        formik.setFieldValue("factors", getEmptyModel(product).factors)
                    }
                }, [formik.values.product]);
                const v = formik.values;
                return (
                    <Form>
                        <CardHeader title={"Create Model"} titleTypographyProps={{ variant: "h3" }} action={<div>
                            <Button type="submit" variant={"contained"}>Preview</Button>
                            <Button onClick={() => formik.setValues(getRandomModel(product!))}>Populate</Button>
                        </div>} />
                        <PolicyEditor products={products} />

                        <Card sx={{ boxShadow: '0px 3px 6px #00000029' }}>
                            <CardContent>
                                {formik.values.factors?.map((f, i) => (
                                    <NodeEditor key={i} node={f} path={`factors[${i}]`} level={1} reverseSignalNames={reverseSignalNames} />
                                ))}
                                <TotalWeight level={1} nodes={formik.values.factors} />
                            </CardContent>
                        </Card>
                    </Form>
                );
            }}
        </Formik>
    )
}

export default CreateModel