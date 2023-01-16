import {
    CardContent,
    Card,
    Typography,
    Button as MuiButton,
    Paper as MuiPaper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from "@mui/material";
import { Form, Formik } from "formik";
import { PolicyEditor } from './components/Policy';
import { NodeEditor } from './editors/NodeEditor';
import { IProduct, IModel, IFactor, ISubFactor, INode } from "./interfaces/ModelInterface";
import './styles/CreateModel.css';
import styled from "@emotion/styled";
import { spacing } from "@mui/system";
import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";
import modelsJson from "./getmodels.json";
import lodash from 'lodash';

const Paper = styled(MuiPaper)(spacing);
const Button = styled(MuiButton)(spacing);

const oneModel = modelsJson[0];

const Label = styled(Typography)`
    font-weight: bold;
    text-transform: capitalize;
`;

const Range = {
    min: '',
    max: ''
}

const paperSx = {
    "& MuiPaper-root": {
        fontFamily: "Verdana",
    },
    "& .css-1bpvgg-MuiPaper-root": {
        padding: "10rem",
    },
};

const datagridSx = {
    "& .MuiDataGrid-columnHeaders": {
        backgroundColor: "#D9F1FC",
    },
    "& .MuiDataGrid-columnHeaderTitle": {
        fontFamily: "Verdana",
        fontWeight: "bold",
        letterSpacing: "0.05ex",
        opacity: 1,
        color: "#1B2430",
    },
    "& .MuiPaper-elevation1": {
        backgroundColor: "#F3FBFE",
    },
    "& .MuiDataGrid-cellContent": {
        fontFamily: "Verdana",
        wordWrap: "break-word !important",
        textAlign: "center",
        fontSize: "1.5ex",
        justifyContent: "center",
        color: "#1B2430",
        letterSpacing: "0.05ex",
        opacity: 1,
    },
    "& .MuiDataGrid-cell": {
        whiteSpace: "normal !important",
    },
    "& .MuiDataGrid-toolbarQuickFilter": {
        border: "solid",
    },
    "& .MuiChip-label": {
        textAlign: "center",
        fontSize: "1.5ex",
    },
    "& .MuiDataGrid-toolbarContainer": {
        backgroundColor: "#F7F9FC",
    },
};

const columns: GridColDef[] = [
    {
        field: "factors.subFactors.signals._id",
        headerName: "ID",
        // width: 10,
        hide: true,
        headerAlign: "center",
    },
    {
        field: "factors.name",
        headerName: "Factor",
        flex: 5,
        headerAlign: "center",
        align: "center",
    },
    {
        field: "factors.weight",
        headerName: "Weight",
        description: "Factor weight",
        // width: 150,
        flex: 7,
        headerAlign: "center",
        align: "center",
    },
    {
        field: "factors.subFactors.name",
        headerName: "Sub-Factor",
        description: "Sub-Factor",
        // width: 200,
        flex: 7,
        headerAlign: "center",
        align: "center",
    },
    {
        field: "factors.subFactors.weight",
        headerName: "Weight",
        description: "Weight",
        // width: 150,
        flex: 7,
        headerAlign: "center",
        align: "center",
    },
    {
        field: "factors.subFactors.signals.name",
        headerName: "Signal",
        description: "Signal",
        // width: 75,
        flex: 4,
        headerAlign: "center",
        align: "center",
    },
    {
        field: "factors.subFactors.signals.weight",
        headerName: "Weight",
        description: "Weight",
        // width: 100,
        flex: 6,
        headerAlign: "center",
        align: "center",
    },
    {
        field: "factors.subFactors.signals.overallWeight",
        headerName: "Total weights",
        description: "Total weights",
        // width: 75,
        flex: 5,
        headerAlign: "center",
        align: "center",
    },
    {
        field: "factors.subFactors.signals.criteria",
        headerName: "Criteria",
        description: "Criteria",
        // width: 75,
        flex: 4,
        headerAlign: "center",
        align: "center",
    },
];

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

function ModelDataGrid() {
    const flatSignals = oneModel.factors.flatMap(factor =>
        factor.subFactors.flatMap(subFactor =>
            subFactor.signals.flatMap(signal => ({ factor, subFactor, signal }))))

    const rowSpanOfNode = (n: INode) => {
        if (n.signals) return n.signals.length;
        return lodash.sumBy(n.subFactors, sf => sf.signals!.length);
    }

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="preview table">
                <TableHead>
                    <TableRow>
                        <TableCell>Factor</TableCell>
                        <TableCell align="right">Weight</TableCell>
                        <TableCell align="right">Sub-Factor</TableCell>
                        <TableCell align="right">Weight</TableCell>
                        <TableCell align="right">Signal</TableCell>
                        <TableCell align="right">Weight</TableCell>
                        <TableCell align="right">Overall Weight</TableCell>
                        <TableCell align="right">Criteria</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {flatSignals.map(({ factor, subFactor, signal }, i) => (
                        <TableRow key={i}>
                            {(i == 0 || factor !== flatSignals[i - 1].factor) && (
                                <><TableCell rowSpan={rowSpanOfNode(factor)}>{factor.name}</TableCell><TableCell rowSpan={rowSpanOfNode(factor)}>{factor.weight}</TableCell></>
                            )}
                            {(i == 0 || subFactor !== flatSignals[i - 1].subFactor) && (
                                <><TableCell rowSpan={rowSpanOfNode(subFactor)}>{subFactor.name}</TableCell><TableCell rowSpan={rowSpanOfNode(subFactor)}>{subFactor.weight}</TableCell></>
                            )}
                            <TableCell>{signal.name}</TableCell>
                            <TableCell>{signal.weight}</TableCell>
                            <TableCell>{signal.overallWeight}</TableCell>
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
                            <Typography style={{ fontFamily: 'Verdana', fontWeight: 'bold', fontSize: '1.1rem' }} variant="h3" gutterBottom display='inline'>Preview Model</Typography>
                            <Button mr={1} type="submit" variant='contained' style={{ backgroundColor: '#434DB0', color: '#fff' }} size="medium">Submit</Button>
                        </div>

                        <PolicyEditor />

                        <ModelDataGrid />
                    </Form>
                );
            }}
        </Formik>
    )
}

export default PreviewModel;