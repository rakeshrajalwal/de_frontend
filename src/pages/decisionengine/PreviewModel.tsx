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
import { IProduct, IModel, IFactor, ISubFactor, IPreviewModel } from "./interfaces/ModelInterface";
import './styles/CreateModel.css';
import styled from "@emotion/styled";
import { spacing } from "@mui/system";
import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";
import modelsJson from "./getmodels.json";

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

function getFactorRowSpan(factor_name: string) {
    let signal_count = 0;
    let factor = oneModel.factors.find((factor) => factor.name == factor_name);
    if (factor) {
        factor.subFactors.map((subFactor) => {
            signal_count += subFactor.signals.length;
        })
    }
    console.log('factor_name: ', factor_name, '\t signal_count: ', signal_count);
    return signal_count;
}

function getSubFactorRowSpan(factor_name: string, sub_factor_name: string) {
    let signal_count = 0;
    let factor = oneModel.factors.find((factor) => factor.name == factor_name);
    if (factor) {
        let sub_factor = factor.subFactors.find((subFactor) => subFactor.name == sub_factor_name);
        if (sub_factor) {
            signal_count = sub_factor.signals.length;
        }
    }
    console.log('factor_name: ', factor_name, '\t sub_factor_name: ', sub_factor_name, '\t signal_count: ', signal_count);
    return signal_count;
}

function getEmptyPreviewModel() {
    return {
        name: "",
        weight: "",
        overallWeight: "",
        factorName: "",
        factorWeight: "",
        subFactorName: "",
        subFactorWeight: "",
        criteria: {
            strong: { min: '', max: '' },
            good: { min: '', max: '' },
            satisfactory: { min: '', max: '' },
            weak: { min: '', max: '' },
        }
    }
}

function convertToFlatSignals(factors: IFactor[]) {
    let flat_signals: IPreviewModel[] = [];
    factors.map((factor, factorIndex) => {
        factor.subFactors.map((subFactor, subFactorIndex) => {
            subFactor.signals.map((signal, signalIndex) => {
                let current_signal: IPreviewModel = getEmptyPreviewModel();
                current_signal.name = signal.name;
                current_signal.weight = signal.weight;
                // current_signal.overallWeight = signal.overallWeight;
                current_signal.factorName = factor.name;
                current_signal.factorWeight = factor.weight;
                current_signal.subFactorName = subFactor.name;
                current_signal.subFactorWeight = subFactor.weight;
                // current_signal.criteria = signal.criteria;
                flat_signals.push(current_signal);
            })
        })
    })
    console.log('flat_signals length: ', flat_signals.length, '\t flat_signals: ', flat_signals);
    return flat_signals;
}

function ModelDataGrid() {
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
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
                    {convertToFlatSignals(oneModel.factors).map((signal) => (
                        <TableRow
                            key={signal.name}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell rowSpan={getFactorRowSpan(signal.factorName)}>
                                {signal.factorName}
                            </TableCell>
                            <TableCell align="right" rowSpan={getFactorRowSpan(signal.factorName)}>{signal.factorWeight}</TableCell>
                            <TableCell align="right" rowSpan={getSubFactorRowSpan(signal.factorName, signal.subFactorName)}>{signal.subFactorName}</TableCell>
                            <TableCell align="right" rowSpan={getSubFactorRowSpan(signal.factorName, signal.subFactorName)}>{signal.subFactorWeight}</TableCell>
                            <TableCell align="right">{signal.name}</TableCell>
                            <TableCell align="right">{signal.weight}</TableCell>
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
                            <Typography style={{ fontFamily: 'Verdana', fontWeight: 'bold', fontSize: '1.1rem' }} variant="h3" gutterBottom display='inline'>Create Model</Typography>
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
