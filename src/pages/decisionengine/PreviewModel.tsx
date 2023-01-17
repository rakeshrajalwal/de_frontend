import {
    Typography,
    Button as MuiButton,
    Paper as MuiPaper,
    Table,
    TableBody,
    TableCell as MuiTableCell,
    TableContainer,
    TableHead,
    TableRow,
    tableCellClasses,
} from "@mui/material";
import { Form, Formik } from "formik";
import { PolicyEditor } from './components/Policy';
import { IProduct, IModel, INode } from "./interfaces/ModelInterface";
import './styles/CreateModel.css';
import styled from "@emotion/styled";
import { spacing } from "@mui/system";
import modelsJson from "./getmodels.json";
import lodash from 'lodash';
import { CriteriaBar } from './editors/NodeEditor';

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
    const flatSignals = oneModel.factors.flatMap(factor =>
        factor.subFactors.flatMap(subFactor =>
            subFactor.signals.flatMap(signal => ({ factor, subFactor, signal }))))

    const rowSpanOfNode = (n: INode) => {
        if (n.signals) return n.signals.length;
        return lodash.sumBy(n.subFactors, sf => sf.signals!.length);
    }

    return (
        <TableContainer component={Paper} sx={{ marginTop: 5 }}>
            <Table sx={{ minWidth: 650 }} aria-label="preview table">
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
                            {/* <TableCell align="right" sx={{ paddingLeft: '5ex' }}><CriteriaBar /></TableCell> */}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer >
    );
}

function PreviewModel() {
    return (
        <Formik
            initialValues={oneModel}
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
                            <Typography style={{ fontWeight: 'bold', fontSize: '1.1rem' }} variant="h3" gutterBottom display='inline'>Preview Model</Typography>
                            <Button mr={1} type="submit" variant='contained' style={{ backgroundColor: '#434DB0', color: '#fff' }} size="medium">Submit</Button>
                        </div>

                        <PolicyEditor isDisabled={true} />

                        <ModelDataGrid />
                    </Form>
                );
            }}
        </Formik>
    )
}

export default PreviewModel;