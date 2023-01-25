import * as React from "react";
import { useNavigate } from "react-router-dom";
import styled from "@emotion/styled";
import { Helmet } from "react-helmet-async";
import {
    Paper as MuiPaper,
    CardHeader,
    Typography,
    Divider
} from "@mui/material";
import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";
import { spacing } from "@mui/system";
import modelJson from "./getModelRun.json";
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import './ModelEvaluation.css';


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
        field: "name",
        headerName: "Signal Name",
        flex: 20,
        headerAlign: "center",
        align: "center",
    },
    {
        field: "score",
        headerName: "Weight",
        description: "Weight",
        flex: 10,
        headerAlign: "center",
        align: "center",
    },
    {
        field: "numericValue",
        headerName: "Value",
        description: "Value",
        flex: 20,
        headerAlign: "center",
        align: "center",
    },
    {
        field: "weighted",
        headerName: "Weighted",
        description: "Weighted",
        flex: 20,
        headerAlign: "center",
        align: "center",
    },
    {
        field: "unweighted",
        headerName: "Unweighted",
        description: "Unweighted",
        flex: 20,
        headerAlign: "center",
        align: "center",
    },
];

function ModelEvaluatioSummary() {

    const summarySubBodySx = {
        fontSize: '5ex',
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
                className="CSS-Summary"
                style={{
                    flex: 4,
                    backgroundColor: '#078F08',
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
                <Typography sx={{ fontSize: '10ex', fontWeight: 'bold' }}>
                    {/* {modelJson.score} */}
                </Typography>
            </div>
            <div className="CSS-Summary"
                style={{
                    flex: 7,
                }}>

                <Typography sx={summarySubHeadSx}>
                    Company Id
                </Typography>
                <Typography sx={summarySubBodySx}>
                    {/* {modelJson.loanDetails.customerId} */}
                </Typography>

            </div>
            <Divider orientation="vertical" variant="middle" flexItem sx={{ backgroundColor: '#000000' }} />
            <div className="CSS-Summary"
                style={{
                    flex: 4,
                }}>
                <Typography sx={summarySubHeadSx}>
                    Loan Amount
                </Typography>
                <Typography sx={summarySubBodySx}>
                    {/* £{modelJson.loanDetails.amount} */}
                </Typography>
            </div>
            <Divider orientation="vertical" variant="middle" flexItem sx={{ backgroundColor: '#000000' }} />
            <div className="CSS-Summary"
                style={{
                    flex: 4,
                }}>
                <Typography sx={summarySubHeadSx}>
                    Term
                </Typography>
                <Typography sx={summarySubBodySx}>
                    {/* {modelJson.loanDetails.term} Months */}
                </Typography>
            </div>
        </div >
    )
}

function ModelEvaluationTable() {
    return (
        <Paper sx={paperSx}>
            <div style={{ width: '100%' }}>
                <DataGrid
                    sx={datagridSx}
                    rows={modelJson}
                   // rows={[]}
                    columns={columns}
                    getRowId={(row) => row._id}
                    rowsPerPageOptions={[]}
                    hideFooter
                    autoHeight
                />
            </div>
        </Paper>
    )
}
function ModelEvaluation() {
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
                <ModelEvaluatioSummary />
                <ModelEvaluationTable />
            </div>
        </React.Fragment>
    );
}

export default ModelEvaluation;
