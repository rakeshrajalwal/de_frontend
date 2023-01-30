import * as React from 'react';
import {
    deApi,
    useCreateModelMutation,
    useGetAllProductsQuery,
    useGetOneModelQuery,
    useModifyModelMutation,
} from '../../redux/de';
import { Button as MuiButton, ButtonProps as MuiButtonProps, Card, CardContent, CardHeader } from "@mui/material";
import { Form, Formik } from "formik";
import { PolicyEditor } from './components/Policy';
import { NodeEditor } from './editors/NodeEditor';
import { criteriaRangeNames, IModelInput, IProduct, IRange, TCriteria } from "./interfaces/ModelInterface"
import lodash from 'lodash';
import * as Yup from "yup";
import { TotalWeight } from "./editors/WeightEditor";
import { useNavigate, useParams } from "react-router-dom";
import * as Faker from 'faker';
import { ModelDataGrid } from "./ModelDataGrid";
import { toast } from 'react-toastify';
import './styles/CreateModel.css';

interface ButtonProps extends MuiButtonProps {
    show?: boolean
}
const Button = ({ show = true, ...props }: ButtonProps) => show ? <MuiButton {...props} /> : <></>;

function getEmptyModel(p: IProduct): IModelInput {
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
                    criteria: [{
                        strong: { min: '', max: '' },
                        good: { min: '', max: '' },
                        satisfactory: { min: '', max: '' },
                        weak: { min: '', max: '' },
                    }]
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

export function randomNumberBetween({ min, max }: IRange): number {
    return (+min + Math.floor((+max - +min) * Math.random()))
}
function randomRangeBetween(range: IRange, multipleOf?: number): IRange {
    if (multipleOf) {
        const { min, max } = randomRangeBetween({ min: Math.ceil(+range.min / multipleOf), max: Math.floor(+range.max / multipleOf) })
        return { min: +min * multipleOf, max: +max * multipleOf }
    }
    const min = randomNumberBetween(range);
    const max = randomNumberBetween({ ...range, min: min + 1 });
    return { min, max };
}

function getRandomModel(p: IProduct): IModelInput {
    const purposes = lodash.shuffle(p.policy.loanPurpose).slice(0, randomNumberBetween({ min: 1, max: 5 }))
    const termRange = randomRangeBetween(p.policy.loanTermInMonths, 6);
    return {
        name: Faker.lorem.words(),
        product: p.name,
        policy: {
            loanRange: randomRangeBetween(p.policy.loanRange, 1e4),
            loanTermInMonths: termRange,
            loanPurpose: purposes,
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
                            if (subFactor.signals[i].name === "TermVsPurpose") {
                                return {
                                    name: subFactor.signals[i].name,
                                    weight,
                                    criteria: purposes.map((p) => {
                                        let r = randomSplit(100, 4);
                                        r = r.map((_, i) => lodash.sum(r.slice(0, i + 1)))
                                        const { min, max } = termRange;
                                        const rangeLength = +max - +min;
                                        return {
                                            weak: { min: min, max: +min + Math.ceil(rangeLength * r[0] / 100) },
                                            satisfactory: { min: +min + Math.ceil(rangeLength * r[0] / 100), max: +min + Math.ceil(rangeLength * r[1] / 100) },
                                            good: { min: +min + Math.ceil(rangeLength * r[1] / 100), max: +min + Math.ceil(rangeLength * r[2] / 100) },
                                            strong: { min: +min + Math.ceil(rangeLength * r[2] / 100), max: max },
                                            condition: `purpose == "${p}"`
                                        }
                                    })
                                }
                            }
                            return {
                                name: subFactor.signals[i].name,
                                weight,
                                criteria: subFactor.signals[i].isReverseScale ? [{
                                    weak: { min: 200, max: 300 },
                                    satisfactory: { min: 100, max: 200 },
                                    good: { min: 10, max: 100 },
                                    strong: { min: 0, max: 10 }
                                }] : [{
                                    strong: { min: 200, max: 300 },
                                    good: { min: 100, max: 200 },
                                    satisfactory: { min: 10, max: 100 },
                                    weak: { min: 0, max: 10 }

                                }]
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
    name: Yup.string().required('Required'),
    product: Yup.string().required('Required'),
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
                criteria: Yup.array().of(Yup.object().shape({
                    strong: rangeSchema,
                    good: rangeSchema,
                    satisfactory: rangeSchema,
                    weak: rangeSchema,
                }))
            })).test('sum', 'Sum should be 100', (a) => lodash.sumBy(a, 'weight') === 100)
        })).test('sum', 'Sum should be 100', (a) => lodash.sumBy(a, 'weight') === 100)
    })).test('sum', 'Sum should be 100', (a) => lodash.sumBy(a, 'weight') === 100)
});

const CreateModel = () => {
    const navigate = useNavigate();
    let { id } = useParams();
    const { data: model, isLoading: isModelLoading } = useGetOneModelQuery(id || '', { skip: !id, refetchOnMountOrArgChange: true })

    const [product, setProduct] = React.useState<IProduct>();// to populate a select products features etc.
    const [validateOnChange, setValidateOnChange] = React.useState<boolean>(false); // handling the form validation

    let reverseSignalNames = product?.factors.flatMap(f => f.subFactors.flatMap(sf => sf.signals.filter(sig => sig.isReverseScale).map(sig => sig.name))) || [];

    const { data: products, error, isLoading } = useGetAllProductsQuery();// fetching all the products

    const [addNewModel, response] = useCreateModelMutation();// query to create model
    const [modifyModel] = useModifyModelMutation();// query to modify model
    const [mode, setMode] = React.useState(id ? "view" : "edit");
    const [creatingCopy, setCreatingCopy] = React.useState(false);

    // function that sends the create model api request
    async function submitModel(model: IModelInput) {
        const x = Yup.string().required("Required");
        const iv = await x.isValid("");

        try {
            if (id && !creatingCopy) {
                await modifyModel({ id, model }).unwrap();
                toast.success("Model Saved")
            } else {
                await addNewModel(model).unwrap();
                toast.success("Model Created")
            }
            navigate("/models");
        } catch (e: any) {
            // toast.error(e.data.message)
        }
    }

    const [approveModel] = deApi.useApproveModelMutation();
    const [activateModel] = deApi.useActivateModelMutation();

    async function toggleActivation() {
        const activate = !model?.info.isActive;
        await activateModel({ id: id!, activate })
        toast.success(`Model ${activate ? "Activated" : "De-activated"}`);
        navigate(-1);
    }

    async function approve() {
        await approveModel(id!);
        toast.success("Model Approved");
        navigate(-1);
    }

    const title = () => {
        if (id) {
            if(creatingCopy) return `Copy of Model - ${model?.name}`;
            else  return model ? `Model - ${model.name}` : `View model`;
        }
        return "New Model"
    }

    const isApproved = model?.info.approvalStatus === "approved";

    return (
        <Formik
            initialValues={model || {
                name: "",
                product: products?.length == 1 ? products[0].name : '',
                policy: {
                    loanRange: { min: '', max: '' },
                    loanTermInMonths: { min: '', max: '' },
                    loanPurpose: [],
                    isSecured: false,
                },
                factors: []
            } as IModelInput}
            enableReinitialize
            validationSchema={validationSchema}
            validateOnBlur={false}
            validateOnChange={validateOnChange}
            onSubmit={submitModel}
        >
            {formik => {
                React.useEffect(() => {
                    const product = lodash.find(products, { name: formik.values.product });
                    setProduct(product);
                    if (product && !model) {
                        formik.setFieldValue("policy", { ...lodash.cloneDeep(product.policy), loanPurpose: [] });
                        formik.setFieldValue("factors", getEmptyModel(product).factors);
                    }
                }, [formik.values.product, model]);
                return (
                    <Form>
                        <CardHeader title={title()} titleTypographyProps={{ variant: "h3" }}
                            action={<div style={{ display: 'flex', justifyContent: 'space-between', gap: 10 }}>
                                <Button
                                    show={mode === "edit"}
                                    variant={"contained"}
                                    color={(validateOnChange && !formik.isValid) ? "warning" : undefined}
                                    onClick={async () => {
                                        setValidateOnChange(true);
                                        const errors = await formik.validateForm();
                                        if (lodash.isEmpty(errors)) {
                                            setMode("preview");
                                        }
                                    }}
                                >
                                    Preview
                                </Button>

                                <Button show={mode !== "edit" && !isApproved} variant={"contained"} onClick={() => setMode("edit")}>
                                    Edit
                                </Button>
                                <Button show={mode === "preview"} type={"submit"} variant={"contained"} disabled={!formik.isValid} color={"success"}>
                                    Save
                                </Button>

                                {(mode === "view") && (
                                    <>
                                        <Button variant={"contained"} onClick={() => {
                                            setMode("edit");
                                            formik.setFieldValue("name", "");
                                            setCreatingCopy(true);
                                        }}>
                                            Duplicate
                                        </Button>
                                        <Button show={!isApproved} variant={"contained"} onClick={approve}>
                                            Approve
                                        </Button>
                                        <Button show={isApproved} variant={"contained"} onClick={toggleActivation}>
                                            {model?.info.isActive ? "De-activate" : "Activate"}
                                        </Button>
                                    </>
                                )}
                                <Button show={!model} onClick={() => formik.setValues(getRandomModel(product || products![0]))}>Populate</Button>
                            </div>}
                        />
                        <div style={mode !== "edit" ? { pointerEvents: "none" } : undefined}>
                            <PolicyEditor products={products!} />
                        </div>

                        {mode === 'edit' && (
                            <Card sx={{ boxShadow: '0px 3px 6px #00000029', marginTop: '15px' }}>
                                <CardContent>
                                    {formik.values.factors?.map((f, i) => (
                                        <NodeEditor key={i} node={f} path={`factors[${i}]`} level={1} reverseSignalNames={reverseSignalNames} />
                                    ))}

                                    {product && <TotalWeight level={1} nodes={formik.values.factors} />}
                                </CardContent>
                            </Card>
                        )}
                        {mode !== "edit" && (
                            <ModelDataGrid model={formik.values} reverseSignalNames={reverseSignalNames} />
                        )}

                    </Form>
                );
            }}
        </Formik>
    )
}

export default CreateModel;