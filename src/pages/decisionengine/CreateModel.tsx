import * as React from 'react';
import { useCreateModelMutation } from '../../redux/de';
import {
    CardContent,
    Card,
    Button as MuiButton,
    CardHeader,
    Snackbar,
} from "@mui/material";
import { Form, Formik } from "formik";
import { PolicyEditor } from './components/Policy';
import { NodeEditor } from './editors/NodeEditor';
import { IProduct, IModel } from "./interfaces/ModelInterface"
import './styles/CreateModel.css';
import lodash from 'lodash';
import * as Yup from "yup";
import { TotalWeight } from "./editors/WeightEditor";
import { useNavigate } from "react-router-dom";
const axios = require('axios');
import './styles/CreateModel.css';
import styled from "@emotion/styled";
import { spacing } from "@mui/system";

const Button = styled(MuiButton)(spacing);

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
            loanRange: { min: p.policy.loanRange.min, max: '' },
            loanTermInMonths: { min: '', max: '' },
            loanPurpose: [],
            isSecured: p.policy.isSecured,
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
        loanPurpose: Yup.array().of(Yup.string().required()).required().min(1, "minimum 1 is required")
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

const CreateModel = () => {
    const navigate = useNavigate();
    const backendUrl: string = (process.env.REACT_APP_BACKEND_URL as string)

    // const { data, error, isLoading } = useGetAllProductsQuery('');
    const [product, setProduct] = React.useState<IProduct>();// to populate a select products features etc.
    const [products, setProducts] = React.useState<IProduct[]>([]);// to populate all the products
    const [openSuccessNotfication, setOpenSuccessNotfication] = React.useState<boolean>(false);// notification for success model creation
    const [openErrorNotfication, setOpenErrorNotfication] = React.useState<boolean>(false);//notification for error in model creation
    const [createModelError, setcreateModelError] = React.useState<string>('');// set the error from api response

    let reverseSignalNames = product?.factors.flatMap(f => f.subFactors.flatMap(sf => sf.signals.filter(sig => sig.isReverseScale).map(sig => sig.name))) || [];
    const [validateOnChange, setValidateOnChange] = React.useState<boolean>(false);
    const [addNewModel, response] = useCreateModelMutation();

    //handles notification popups after submitting
    const handleNotificationClose = () => {
        if (openSuccessNotfication) {
            setOpenSuccessNotfication(false);
            navigate("/model/view");// navigating to view models screen on successful creation
        }
        if (openErrorNotfication) {
            setOpenErrorNotfication(false); // showing error popup
        }
    };

    // function that sends the create model api request
    async function submitModel(values: IModel) {
        let value = JSON.stringify(values, null, 2);
        addNewModel(value)
            .unwrap()
            .then(() => {
                setOpenSuccessNotfication(true);
                // navigating to view models screen on successful creation
            })
            .then((error) => {
                console.log(error)
            })
    }

    return (
        <Formik
            initialValues={{
                name: "",
                product: '',
                policy: {
                    loanRange: { min: '', max: '' },
                    loanTermInMonths: { min: '', max: '' },
                    loanPurpose: [],
                    isSecured: false,
                },
                factors: []
            } as IModel}
            validationSchema={validationSchema}
            validateOnBlur={false}
            validateOnChange={validateOnChange}
            onSubmit={(values) => {
                submitModel(values);
            }}
        >
            {formik => {
                React.useEffect(() => {
                    axios.get(`${backendUrl}/products/all`).
                        then((response: any) => {
                            setProducts(response.data)
                        }).catch((e: any) => {
                            setcreateModelError(JSON.stringify(e.message));
                            setOpenErrorNotfication(true);
                        });

                    console.log(products, " the products");
                    const product = lodash.find(products, { name: formik.values.product });
                    setProduct(product);
                    if (product) {
                        formik.setFieldValue("policy", product.policy);
                        formik.setFieldValue("factors", getEmptyModel(product).factors);
                    }
                }, [formik.values.product]);
                const v = formik.values;
                return (
                    <Form>
                        <CardHeader title={"Create Model"} titleTypographyProps={{ variant: "h3" }}
                            action={<div style={{ display: 'flex', justifyContent: 'space-between', gap: 10 }}>
                                <Button variant={"contained"}
                                    style={{ backgroundColor: formik.isValid && validateOnChange ? 'green' : 'blue', color: 'white' }}
                                    onClick={() => { setValidateOnChange(true); formik.validateForm(); }}
                                >Validate</Button>

                                <Button type="submit" variant={"contained"} disabled={false}>Submit</Button>
                                <Button onClick={() => formik.setValues(getRandomModel(product!))}>Populate</Button>
                            </div>} />
                        <PolicyEditor products={products} />

                        <Card sx={{ boxShadow: '0px 3px 6px #00000029', marginTop: '15px' }}>
                            <CardContent>
                                {formik.values.factors?.map((f, i) => (
                                    <NodeEditor key={i} node={f} path={`factors[${i}]`} level={1} reverseSignalNames={reverseSignalNames} />
                                ))}

                                {product && <TotalWeight level={1} nodes={formik.values.factors} />}
                            </CardContent>
                        </Card>
                        <Snackbar
                            open={openSuccessNotfication}
                            anchorOrigin={{ horizontal: 'center', vertical: 'top' }}
                            autoHideDuration={2500}
                            onClose={handleNotificationClose}
                            message="model is created successfully"
                            ContentProps={{
                                sx: {
                                    background: "green"
                                }
                            }}
                        />
                        <Snackbar
                            open={openErrorNotfication}
                            anchorOrigin={{ horizontal: 'center', vertical: 'top' }}
                            autoHideDuration={2500}
                            onClose={handleNotificationClose}
                            message={createModelError}
                            ContentProps={{
                                sx: {
                                    background: "red"
                                }
                            }}
                        />
                    </Form>
                );
            }}
        </Formik>
    )
}

export default CreateModel;
