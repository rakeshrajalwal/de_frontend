import * as React from 'react';
import { render } from 'react-dom';
import styled from "@emotion/styled";
import { Helmet } from "react-helmet-async";

import {
  Breadcrumbs as MuiBreadcrumbs,
  Card as MuiCard,
  CardContent as MuiCardContent,
  Divider as MuiDivider,
  Paper as MuiPaper,
  Typography,
  Box,
  IconButton,
} from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { spacing } from "@mui/system";
import { Info, User, Monitor, Eye, RefreshCw } from "react-feather";


import { data } from './data';


const Card = styled(MuiCard)(spacing);

const CardContent = styled(MuiCardContent)(spacing);

const Divider = styled(MuiDivider)(spacing);

const Breadcrumbs = styled(MuiBreadcrumbs)(spacing);

const Paper = styled(MuiPaper)(spacing);

const datagridSx = {
  "& .MuiDataGrid-columnHeaders": {
    backgroundColor: "#D9F1FC",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flexstart"
  },
  "& .MuiDataGrid-columnHeaderTitle": {
    fontWeight: 'bold',
  },
  "& .MuiDataGrid-cellContent": {
    wordWrap: 'break-word !important',
  }
};

const alignment = {
  display: "flex",
  justifyContent: "flexend"
}
const columns: GridColDef[] = [
  {
    field: "id",
    headerName: "ID",
    headerAlign: 'center',
    flex: 2
  },
  {
    field: "name",
    headerName: "Name",
    headerAlign: 'center',
    flex: 5
  },
  {
    field: "Product",
    headerName: "Product",
    headerAlign: 'center',
    flex: 7
  },
  {
    field: "Customer",
    headerName: "Customer",
    headerAlign: 'center',
    flex: 7
  },
  {
    field: "Loan Amount",
    headerName: "Loan Amount",
    headerAlign: 'center',
    flex: 5
    
  },
  {
    field: "Term",
    headerName: "Term",
    headerAlign: 'center',
    flex: 2
  },
  {
    field: "Result",
    headerName: "Result",
    headerAlign: 'center',
    flex: 6,
    renderCell: (params) => {
      if (params.row.Result < 3) {
        return (
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: "center"}}>
            <strong>{params.row.Result}</strong>
            <p style={{ color: "#64b964", border: '0.2ex solid #64b964', borderRadius: '3ex', padding: '0.5ex' }}>Strong</p>
          </div>
        )
      }
      else if (params.row.Result >= 3 && params.row.Result <= 5) {
        return (
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: "center"}}>
            <strong>{params.row.Result}</strong>
            <p style={{ color: "#fecd29", border: '0.2ex solid #fecd29', borderRadius: '3ex', padding: '0.5ex' }}>Satisfactory</p>
          </div>
        )
      }
      else if (params.row.Result > 5) {
        return (
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: "center"}}>
            <p>Failed</p>
            <IconButton aria-label="Info" size="small">
              <Info />
            </IconButton></div>
        )
      }
    }
  },
  {
    field: "time",
    headerName: "Run By",
    headerAlign: 'center',
    flex: 7,
    renderCell: (params) => {
      if (params.row.flag < 1) {
        return (<div>
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <Typography mt={2}>{params.row["Run By"]}</Typography>
            <IconButton aria-label="Monitor" size="small">
              <Monitor />
            </IconButton></div>
          <span>{params.row.time}</span>
        </div>)
      } else {
        return (<div>
          <div style={{ display: 'flex', flexDirection: 'row'}}>
            <Typography mt={2}>{params.row["Run By"]}</Typography>
            <IconButton aria-label="User" size="small">
              <User />
            </IconButton></div>
          <span>{params.row.time}</span></div>)
      }
    }
  },
  {
    field: "flag",
    headerName: "",
    headerAlign: 'center',
    flex: 2,
    renderCell: (params) => {
      if (params.row.Result >= 5) {
        return (<IconButton aria-label="Re-Run" size="small">
          <RefreshCw />
        </IconButton>)
      } else {
        return (<IconButton aria-label="Preview" size="small">
          <Eye />
        </IconButton>)
      }
    }
  },
];

function RunSummariesGrid() {
  return (
    <Paper>
      <div style={{ height: "30rem", width: "100%" }}>
        <DataGrid
          // rowsPerPageOptions={[5, 10, 25]}
          sx={datagridSx}
          rows={data}
          columns={columns}
          pageSize={5}
          style={{fontFamily: 'Verdana'}}
        />
      </div>
    </Paper>
  );
}

function RunSummaries() {
  return (
    <React.Fragment>
      <Helmet title="Run Summaries" />
      <Typography variant="h3" gutterBottom display="inline">
        Run Summaries
      </Typography>

      <Divider my={6} />

      <RunSummariesGrid />
    </React.Fragment>
  );
}

export default RunSummaries;