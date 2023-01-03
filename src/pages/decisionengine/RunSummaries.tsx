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
    fontSize: '1.9ex',
    justifyContent: 'center',
  },
  "& .MuiDataGrid-cell": {
    whiteSpace: "normal !important",
  },
  "& .MuiDataGrid-toolbarQuickFilter": {
    border: 'solid',
  },
  "& .MuiDataGrid-toolbarContainer":{
    backgroundColor: '#F7F9FC',
  }
};

const columns: GridColDef[] = [
  {
    field: "id",
    headerName: "ID",
    headerAlign: 'center',
    flex: 2,
    align: 'center'
  },
  {
    field: "name",
    headerName: "Name",
    headerAlign: 'center',
    flex: 5,
    align: 'center'
  },
  {
    field: "Product",
    headerName: "Product",
    headerAlign: 'center',
    flex: 7,
    align: 'center'
  },
  {
    field: "Customer",
    headerName: "Customer",
    headerAlign: 'center',
    flex: 7,
    align: 'center'
  },
  {
    field: "Loan Amount",
    headerName: "Loan Amount",
    headerAlign: 'center',
    flex: 5,
    align: 'center'
  },
  {
    field: "Term",
    headerName: "Term",
    headerAlign: 'center',
    flex: 2,
    align: 'center'
  },
  {
    field: "Result",
    headerName: "Result",
    headerAlign: 'center',
    flex: 6,
    renderCell: (params) => {
      if (params.row.Result < 3) {
        return (
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: "center", marginLeft:'6ex' }}>
            <strong>{params.row.Result}</strong>
            <div style={{width:'1ex'}}></div>
            <p style={{ color: "#64b964", border: '0.3ex solid #64b964', borderRadius: '3ex', padding: '0.35ex' }}>Strong</p>
          </div>
        )
      }
      else if (params.row.Result >= 3 && params.row.Result <= 5) {
        return (
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: "center", marginLeft:'6ex' }}>
            <strong>{params.row.Result}</strong>
            <div style={{width:'1ex'}}></div>
            <p style={{ color: "#fecd29", border: '0.3ex solid #fecd29', borderRadius: '3ex', padding: '0.35ex' }}>Satisfactory</p>
          </div>
        )
      }
      else if (params.row.Result > 5) {
        return (
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: "center", marginLeft:'6ex'}}>
            <p>Failed</p>
            <IconButton aria-label="Info" size="small">
              <Info style = {{fontSize:'1.8ex',}}/>
            </IconButton></div>
        )
      }
    },
    align: 'center'
  },
  {
    field: "time",
    headerName: "Run By",
    headerAlign: 'center',
    flex: 7,
    renderCell: (params) => {
      if (params.row.flag < 1) {
        return (<div>
          <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'row' }}>
            <Typography mt={2}>{params.row["Run By"]}</Typography>
            <IconButton aria-label="Monitor" size="small">
              <Monitor/>
            </IconButton></div>
          <span>{params.row.time}</span>
        </div>)
      } else {
        return (<div>
          <div style={{ display: 'flex', flexDirection: 'row', textAlign: 'center' }}>
            <Typography mt={2}>{params.row["Run By"]}</Typography>
            <IconButton aria-label="User" size="small">
              <User/>
            </IconButton></div>
          <span>{params.row.time}</span></div>)
      }
    },
    align: 'center'
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
    },
    align: 'center'
  },
];

function RunSummariesGrid() {
  return (
    <Paper>

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
      <Helmet title="Run Summary" />
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',fontSize:'1.4ex' }}>
        <div>
          <Typography variant="h3" gutterBottom display="inline">
            Run Summaries
          </Typography>
        </div>
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'right' }}>
          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'left' }}>
            <p>Source: </p>
            <IconButton aria-label="Monitor" size="small">
              <Monitor/>
            </IconButton>
            <div style={{width:'1ex'}}></div>
            <p>DE User: </p>
            <IconButton aria-label="User" size="small">
              <User />
            </IconButton>
          </div>
          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'left' }}>
            <p>Preview: </p>
            <IconButton aria-label="Preview" size="small">
              <Eye />
            </IconButton>
            <div style={{width:'1ex'}}></div>
            <p>Re-Run: </p>
            <IconButton aria-label="ReRun" size="small">
              <RefreshCw/>
            </IconButton>
          </div>
        </div>
      </div>

      <RunSummariesGrid />
    </React.Fragment>
  );
}

export default RunSummaries;