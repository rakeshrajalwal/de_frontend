import * as React from 'react';
import styled from "@emotion/styled";
import { Helmet } from "react-helmet-async";

import {
  Divider as MuiDivider,
  Paper as MuiPaper,
  Typography,
  IconButton,
  Divider,
} from "@mui/material";
import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";
import { spacing } from "@mui/system";
import { Info, User, Monitor, Eye, RefreshCw } from "react-feather";


import { data } from './data';

const Paper = styled(MuiPaper)(spacing);

const paperSx = {
  "& .css-1bpvgg-MuiPaper-root": {
    padding: 10,
  }
}

const datagridSx = {
  "& .MuiDataGrid-columnHeaders": {
    backgroundColor: "#D9F1FC",
  },
  "& .MuiDataGrid-columnHeaderTitle": {
    fontWeight: 'bold',
  },
  "& .MuiDataGrid-cellContent": {
    wordWrap: 'break-word !important',
    textAlign: 'center',
  },
  "& .MuiDataGrid-cell": {
    whiteSpace: "normal !important",
  },
  "& .MuiDataGrid-toolbarQuickFilter": {
    border: 'solid',
  },
  "& .MuiDataGrid-toolbarContainer":{
    backgroundColor: 'aliceblue',
  }
};

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
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: "center", marginLeft:'5ex' }}>
            <strong>{params.row.Result}</strong>
            <div style={{width:'1ex'}}></div>
            <p style={{ color: "#64b964", border: '0.3ex solid #64b964', borderRadius: '3ex', padding: '0.3ex' }}>Strong</p>
          </div>
        )
      }
      else if (params.row.Result >= 3 && params.row.Result <= 5) {
        return (
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: "center", marginLeft:'5ex' }}>
            <strong>{params.row.Result}</strong>
            <div style={{width:'1ex'}}></div>
            <p style={{ color: "#fecd29", border: '0.3ex solid #fecd29', borderRadius: '3ex', padding: '0.3ex' }}>Satisfactory</p>
          </div>
        )
      }
      else if (params.row.Result > 5) {
        return (
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: "center", marginLeft:'5ex' }}>
            <p>Failed</p>
            <IconButton aria-label="Info" size="small">
              <Info style = {{width:'2ex',}}/>
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
        return (<div style={{marginLeft:'4ex'}}>
          <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'row' }}>
            <Typography mt={2}>{params.row["Run By"]}</Typography>
            <IconButton aria-label="Monitor" size="small">
              <Monitor  style = {{width:'2ex',}}/>
            </IconButton></div>
          <span>{params.row.time}</span>
        </div>)
      } else {
        return (<div style={{marginLeft:'4ex'}}>
          <div style={{ display: 'flex', flexDirection: 'row', textAlign: 'center' }}>
            <Typography mt={2}>{params.row["Run By"]}</Typography>
            <IconButton aria-label="User" size="small">
              <User style = {{width:'2ex',}}/>
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
          <RefreshCw style = {{width:'2ex',marginLeft:'2ex'}}/>
        </IconButton>)
      } else {
        return (<IconButton aria-label="Preview" size="small">
          <Eye style = {{width:'2ex',marginLeft:'2ex'}}/>
        </IconButton>)
      }
    }
  },
];

function RunSummariesGrid() {
  return (
    <Paper sx={{backgroundColor: 'aliceblue'}}>

      <div style={{ height: "25.2rem", width: "100%" }}>
        <DataGrid
          // rowsPerPageOptions={[5, 10, 25]}
          sx={datagridSx}
          rows={data}
          columns={columns}
          pageSize={5}
          style={{ fontFamily: 'Verdana' }}
          disableColumnFilter
          disableColumnSelector
          disableDensitySelector
          components={{ Toolbar: GridToolbar }}
          componentsProps={{
            toolbar: {
              csvOptions: { disableToolbarButton: true },
              printOptions: { disableToolbarButton: true },
              showQuickFilter: true,
              quickFilterProps: { debounceMs: 500 },
            },
          }}
        />
      </div>
    </Paper >
  );
}

function RunSummaries() {
  return (
    <React.Fragment>
      <Helmet title="Run Summaries" />
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <Typography variant="h3" gutterBottom display="inline">
            Run Summaries
          </Typography>
        </div>
        <div>
          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'left' }}>
            <p>Source: </p>
            <IconButton aria-label="Monitor" size="small">
              <Monitor style = {{width:'2ex',}}/>
            </IconButton>
            <div style={{width:'1ex'}}></div>
            <p>DE User: </p>
            <IconButton aria-label="User" size="small">
              <User style = {{width:'2ex',}}/>
            </IconButton>
          </div>
          <Divider />
          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'left' }}>
            <p>Preview: </p>
            <IconButton aria-label="Preview" size="small">
              <Eye style = {{width:'2ex',}}/>
            </IconButton>
            <div style={{width:'1ex'}}></div>
            <p>Re-Run: </p>
            <IconButton aria-label="ReRun" size="small">
              <RefreshCw style = {{width:'2ex',}}/>
            </IconButton>
          </div>
        </div>
      </div>

      <RunSummariesGrid />
    </React.Fragment>
  );
}

export default RunSummaries;