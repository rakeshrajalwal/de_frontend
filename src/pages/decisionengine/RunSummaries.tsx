import * as React from 'react';
import styled from "@emotion/styled";
import { Helmet } from "react-helmet-async";
import {
  Paper as MuiPaper,
  Typography,
  IconButton,
} from "@mui/material";
import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";
import { spacing } from "@mui/system";
import { Info, User, Monitor, Eye, RefreshCw } from "react-feather";
import { data } from './data';
import { datagridSx, paperSx, MultiStringCell } from "./styles/DataGridCommonStyles";

const Paper = styled(MuiPaper)(spacing);

const Icons = {
  User: {
    text: "DE User",
    Icon: User
  },
  Monitor: {
    text: "Source",
    Icon: Monitor,
  },
  Eye: {
    text: "Preview",
    Icon: Eye,
  },
  RefreshCw: {
    text: "Re-Run",
    Icon: RefreshCw
  }
}

const columns: GridColDef[] = [
  {
    field: "id",
    headerName: "ID",
    description: "ID",
    headerAlign: 'center',
    flex: 2,
    align: 'center'
  },
  {
    field: "name",
    headerName: "Name",
    description: "Name",
    headerAlign: 'center',
    flex: 5,
    align: 'center'
  },
  {
    field: "Product",
    headerName: "Product",
    description: "Product",
    headerAlign: 'center',
    flex: 7,
    align: 'center'
  },
  {
    field: "Customer",
    headerName: "Customer",
    description: "Customer",
    headerAlign: 'center',
    flex: 7,
    align: 'center'
  },
  {
    field: "Loan Amount",
    headerName: "Loan Amount (£)",
    description: "Loan Amount (£)",
    headerAlign: 'center',
    flex: 5,
    align: 'center'
  },
  {
    field: "Term",
    headerName: "Term (months)",
    description: "Term (months)",
    headerAlign: 'center',
    flex: 4,
    align: 'center'
  },
  {
    field: "Result",
    headerName: "Result",
    headerAlign: 'center',
    flex: 6,
    renderCell: (params) => {
      const flag = (params.row.Result > 5) ? false : true
      const x = (params.row.Result < 3) ? {
        text: 'Strong', color: '#64b964', border: '0.3ex solid #64b964'
      } : (params.row.Result >= 3 && params.row.Result < 5) ? {
        text: 'Satisfactory', color: '#fecd29', border: '0.3ex solid #fecd29'
      } : {
        text: 'Failed', color: '', border: ''
      }

      if (!flag) {
        return (
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: "center" }}>
            <p>{x.text}</p>
            <IconButton aria-label="Info" size="small">
              <Info style={{ fontSize: '1.8ex', }} />
            </IconButton></div>
        )
      }
      else {
        return (
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: "center" }}>
            <strong>{params.row.Result}</strong>
            <div style={{ width: '1ex' }}></div>
            <p style={{ color: x.color, border: x.border, borderRadius: '3ex', padding: '0.35ex' }}>{x.text}</p>
          </div>
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
      const { Icon } = Icons[(params.row.flag < 1) ? 'User' : 'Monitor' as keyof typeof Icons];
      return (<div>
        <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'row' }}>
          <Typography mt={2}>{params.row["Run By"]}</Typography>
          <Icon /></div>
        <span>{params.row.time}</span>
      </div>)
    },
    align: 'center'
  },
  {
    field: "flag",
    headerName: "",
    headerAlign: 'center',
    flex: 2,
    renderCell: (params) => {
      const { Icon } = Icons[(params.row.Result >= 5) ? 'RefreshCw' : 'Eye' as keyof typeof Icons];
      return <Icon />
    },
    align: 'center'
  },
];

function RunSummariesGrid() {
  return (
    <Paper sx={{ paperSx }}>

      <div style={{ height: "41.5rem", width: "100%" }}>
        <DataGrid
          sx={datagridSx}
          rows={data}
          columns={columns}
          pageSize={10}
          getRowId={(row) => row.id}
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
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: '1.4ex'
        }}
      >
        <div>
          <Typography variant="h3" gutterBottom display="inline">
            Run Summaries
          </Typography>
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'right'
          }}
        >
          <div style={{ display: 'flex', gap: 5 }}>
            {Object.values(Icons).map(({ text, Icon }) => (
              <div key={text} style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Icon style={{ fontSize: '0.5ex' }} />
                <p>{text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <RunSummariesGrid />
    </React.Fragment >
  );
}

export default RunSummaries;