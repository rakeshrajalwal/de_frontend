import * as React from "react";
import styled from "@emotion/styled";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";
import {
    Paper as MuiPaper,
    CardHeader,
    Typography,
    Divider, Chip
} from "@mui/material";
import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";
import { spacing } from "@mui/system";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import "./styles/ModelEvaluation.css";
import { useGetModelRunByIdQuery } from "../../redux/de";
import { IRunModel } from "./interfaces/ModelInterface";

const Paper = styled(MuiPaper)(spacing);

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
        fontSize: "1.8ex",
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
        field: "name",
        headerName: "Signal Name",
        flex: 10,
        headerAlign: "center",
        align: "left",
        valueFormatter: ({ value }) => [value.replace(/([a-z])([A-Z])/g, '$1 $2').replace('_', ' - ')]
    },
    {
        field: "numericValue",
        headerName: "Numeric Value",
        description: "Value",
        flex: 10,
        headerAlign: "center",
        align: "right",
        valueFormatter: ({ value }) => [parseFloat(value.toString()).toFixed(2)],
    },
    {
        field: "signalValue",
        headerName: "Signal Value",
        description: "signalValue",
        flex: 10,
        headerAlign: "center",
        align: "center",
        renderCell: (params) => {
            const status_params = (params.value == 'strong') ? {
                text: 'Strong', color: '#078F08',
            } : (params.value == 'good') ? {
                text: 'Good', color: '#9DD566',
            } : (params.value == 'satisfactory') ? {
                text: 'Satisfactory', color: '#FEC401',
            } : {
                text: 'Weak', color: '#FB0102',
            }
            return (
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: "left" }}>
                    <Chip label={status_params.text} color="primary" variant="outlined" size="small"
                        style={{ borderRadius: '2.2ex', color: status_params.color, borderColor: status_params.color }}></Chip>
                </div>
            )
        }
    },
    {
        field: "score",
        headerName: "Score",
        description: "score",
        flex: 10,
        headerAlign: "center",
        align: "center",
        valueFormatter: ({ value }) => [parseFloat(value.toString()).toFixed(2)],
    },
];

function ModelEvaluationSummary({ modelRun }: { modelRun: IRunModel }) {

    const summarySubBodySx = {
        fontSize: '3ex',
        fontWeight: 'bold'
    }
    const summarySubHeadSx = {
        fontSize: '2ex',
    }
    return (

        <div
            style={{
                height: '20ex',
                width: '100%',
                borderRadius: '2ex',
                backgroundColor: '#ffffff',
                display: 'flex',
                flexDirection: 'row',
                padding: '2ex'
            }}>
            <div
                className="model-evaluation-header"
                style={{
                    flex: 4,
                    backgroundColor: modelRun?.result == 'strong' ? '#078F08' : modelRun?.result == 'good' ? '#9DD566'
                        : modelRun?.result == 'satisfactory' ? '#FEC401' : '#FB0102',
                    borderRadius: '2ex',
                    color: '#ffffff',
                }}>
                <div style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingTop: '2.5ex',
                }}><Typography sx={{ fontSize: '2ex', paddingRight: '0.5ex', fontWeight: 'bold' }}>
                        Score
                    </Typography>
                    <InfoOutlinedIcon style={{ fontSize: 'medium' }} />
                </div>
                <Typography sx={{ fontSize: '7ex', fontWeight: 'bold' }}>
                    {parseFloat(modelRun?.score!.toString()).toFixed(2)}
                </Typography>

            </div>
            <div className="model-evaluation-header"
                style={{
                    flex: 7,
                }}>

                <Typography sx={summarySubHeadSx}>
                    Company Id
                </Typography>
                <Typography sx={summarySubBodySx}>
                    {modelRun?.loanDetails.customerId}
                </Typography>

            </div>
            <Divider orientation="vertical" variant="middle" flexItem sx={{ backgroundColor: '#000000' }} />
            <div className="model-evaluation-header"
                style={{
                    flex: 4,
                }}>
                <Typography sx={summarySubHeadSx}>
                    Loan Amount
                </Typography>
                <Typography sx={summarySubBodySx}>
                    £{modelRun?.loanDetails.amount.toLocaleString()}
                </Typography>
            </div>
            <Divider orientation="vertical" variant="middle" flexItem sx={{ backgroundColor: '#000000' }} />
            <div className="model-evaluation-header"
                style={{
                    flex: 4,
                }}>
                <Typography sx={summarySubHeadSx}>
                    Term
                </Typography>
                <Typography sx={summarySubBodySx}>
                    {modelRun?.loanDetails.term} Months
                </Typography>
            </div>
            <Divider orientation="vertical" variant="middle" flexItem sx={{ backgroundColor: '#000000' }} />
            <div className="model-evaluation-header"
                style={{
                    flex: 4,
                }}>
                <Typography sx={summarySubHeadSx}>
                    Loan Status
                </Typography>
                <Typography sx={summarySubBodySx}>
                    {modelRun?.loanStatus}
                </Typography>
            </div>
        </div >
    )
}

function ModelEvaluationTable({ modelRun }: { modelRun: IRunModel }) {
    return (
        <Paper sx={paperSx}>
            <div style={{ width: '100%' }}>
                <DataGrid
                    sx={datagridSx}
                    rows={modelRun?.signals || []}
                    columns={columns}
                    getRowId={(row) => row.name}
                    rowsPerPageOptions={[]}
                    hideFooter
                    autoHeight
                />
            </div>
        </Paper>
    )
}

function ModelEvaluation() {
    let { id } = useParams();
    const { data: modelRun } = useGetModelRunByIdQuery(id!, { refetchOnMountOrArgChange: true });
    return (
        <React.Fragment>
            <Helmet title='Model Evaluation Dashboard' />
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '3ex'
                }}>
                <CardHeader title={"Model Evaluation Dashboard"} titleTypographyProps={{ variant: "h3" }} />
                <ModelEvaluationSummary modelRun={modelRun!} />
                <ModelEvaluationTable modelRun={modelRun!} />
            </div>
        </React.Fragment>
    );
}

export default ModelEvaluation;
