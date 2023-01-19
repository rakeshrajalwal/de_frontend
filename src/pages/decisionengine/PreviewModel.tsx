import {
    Button as MuiButton,
    Paper as MuiPaper,
    Table,
    TableBody,
    TableCell as MuiTableCell,
    TableContainer,
    TableHead,
    TableRow,
    tableCellClasses,
    CardHeader,
} from "@mui/material";
import { Form, Formik } from "formik";
import { PolicyEditor } from './components/Policy';
import { IProduct, INode, ISignal, ISubFactor, IFactor } from "./interfaces/ModelInterface";
import './styles/CreateModel.css';
import styled from "@emotion/styled";
import { spacing } from "@mui/system";
import modelsJson from "./models.json";
import productCollection from "./product_collection.json";
import lodash from 'lodash';
import { CriteriaBar } from './editors/NodeEditor';
import React from "react";
import axios from 'axios';

const Paper = styled(MuiPaper)(spacing);
const Button = styled(MuiButton)(spacing);
const TableCell = styled(MuiTableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: '#D9F1FC',
        color: '#1B2430',
        fontWeight: 'bold',
        opacity: 1,
        letterSpacing: '0.11px',

    },
}));

const oneModel = modelsJson[0];

function ModelDataGrid() {

    // Convert into flatSignals - {factor, subfactor, signal}
    const flatSignals = oneModel.factors.flatMap(factor =>
        factor.subFactors.flatMap(subFactor =>
            subFactor.signals.flatMap(signal => ({ factor, subFactor, signal }))))

    // Get rowspan for factors and subfactors
    const rowSpanOfNode = (n: INode) => {
        if (n.signals) return n.signals.length;
        return lodash.sumBy(n.subFactors, sf => sf.signals!.length);
    }

    const getSignalPath = (factor: IFactor, subFactor: ISubFactor, signal: ISignal) => {
        let factorIndex = oneModel.factors.findIndex(object => { return object.name === factor.name });
        let subFactorIndex = factor.subFactors.findIndex(object => { return object.name === subFactor.name });
        let signalIndex = subFactor.signals.findIndex(object => { return object.name === signal.name });
        return `factors[${factorIndex}].subFactors[${subFactorIndex}].signals[${signalIndex}]`;
    }

    let reverseSignalNames = productCollection.factors.flatMap(f => f.subFactors.flatMap(sf => sf.signals.filter(sig => sig.isReverseScale).map(sig => sig.name))) || [];

    console.log('reverseSignalNames: ', reverseSignalNames);

    return (
        <TableContainer component={Paper} sx={{ marginTop: 5 }}>
            <Table sx={{ minWidth: '35ex' }} aria-label="preview table">
                <TableHead>
                    <TableRow>
                        <TableCell align="center" width="15%">Factor</TableCell>
                        <TableCell align="center" width="5%">Weight</TableCell>
                        <TableCell align="center" width="15%">Sub-Factor</TableCell>
                        <TableCell align="center" width="5%">Weight</TableCell>
                        <TableCell align="center" width="15%">Signal</TableCell>
                        <TableCell align="center" width="5%">Weight</TableCell>
                        <TableCell align="center" width="10%">Overall Weight</TableCell>
                        <TableCell align="center" width="25%">Criteria</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {flatSignals.map(({ factor, subFactor, signal }, i) => (
                        <TableRow key={i}>
                            {(i == 0 || factor !== flatSignals[i - 1].factor) && (
                                <><TableCell align="center" rowSpan={rowSpanOfNode(factor)}>{factor.name}</TableCell><TableCell align="right" rowSpan={rowSpanOfNode(factor)}>{factor.weight}%</TableCell></>
                            )}
                            {(i == 0 || subFactor !== flatSignals[i - 1].subFactor) && (
                                <><TableCell align="center" rowSpan={rowSpanOfNode(subFactor)}>{subFactor.name}</TableCell><TableCell align="right" rowSpan={rowSpanOfNode(subFactor)}>{subFactor.weight}%</TableCell></>
                            )}
                            <TableCell align="center">{signal.name}</TableCell>
                            <TableCell align="right">{signal.weight}%</TableCell>
                            <TableCell align="right">{signal.overallWeight}%</TableCell>
                            <TableCell align="right" sx={{ paddingLeft: '5ex' }}><CriteriaBar path={getSignalPath(factor, subFactor, signal)} isReverseScale={reverseSignalNames.includes(signal.name)} /></TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer >
    );
}

function PreviewModel() {
    const backendUrl: string = (process.env.REACT_APP_BACKEND_URL as string)
    const [products, setProducts] = React.useState<IProduct[]>([]);// to populate all the products
    return (
        <Formik
            initialValues={oneModel}
            onSubmit={(values) => {
                console.log(JSON.stringify(values, null, 2))
                alert(JSON.stringify(values, null, 2));
            }}
        >
            {formik => {
                axios.get(`${backendUrl}/products/all`).
                    then((response: any) => {
                        setProducts(response.data)
                    }).catch((e: any) => {
                        // Notify error on failure to fetch all products
                        console.log(e);
                    });
                const v = formik.values;
                return (
                    <Form>
                        <CardHeader title={"Preview Model"} titleTypographyProps={{ variant: "h3" }}
                            action={
                                <Button mr={1} type="submit" variant='contained' style={{ backgroundColor: '#434DB0', color: '#fff' }} size="medium">Submit</Button>
                            } />


                        <div style={{ pointerEvents: "none" }}>
                            <PolicyEditor products={products} />
                        </div>

                        <ModelDataGrid />
                    </Form>
                );
            }}
        </Formik>
    )
}

export default PreviewModel;