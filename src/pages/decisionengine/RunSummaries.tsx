import * as React from 'react';
import styled from "@emotion/styled";
import { Helmet } from "react-helmet-async";
import {
  Paper as MuiPaper,
  Typography,
  IconButton,
  Chip,
  CardHeader,
} from "@mui/material";
import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";
import { spacing } from "@mui/system";
import PersonIcon from '@mui/icons-material/Person';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import DesktopWindowsOutlinedIcon from '@mui/icons-material/DesktopWindowsOutlined';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import CachedRoundedIcon from '@mui/icons-material/CachedRounded';
import Tooltip from "@mui/material/Tooltip";
import runSummariesJson from './runsummaries.json';
import { datagridSx, paperSx, MultiStringCell } from "./styles/DataGridCommonStyles";
import lodash from "lodash";
import { useGetRunSummariesQuery } from '../../redux/de';
import { useNavigate } from 'react-router-dom';

const Paper = styled(MuiPaper)(spacing);

const Icons = {
  User: {
    text: "DE User",
    Icon: PersonIcon
  },
  Monitor: {
    text: "Source",
    Icon: DesktopWindowsOutlinedIcon,
  },
  Eye: {
    text: "Preview",
    Icon: RemoveRedEyeOutlinedIcon,
  },
  RefreshCw: {
    text: "Re-Run",
    Icon: CachedRoundedIcon
  }
}

const columns: GridColDef[] = [
  {
    field: "_id",
    headerName: "ID",
    description: "ID",
    headerAlign: 'center',
    flex: 2,
    align: 'center'
  },
  {
    field: "model.name",
    headerName: "Name",
    description: "Name",
    headerAlign: 'center',
    flex: 5,
    align: 'center',
    valueGetter: ({ row, field }) => lodash.get(row, field),
    valueFormatter: ({ value }) => value,
  },
  {
    field: "loanDetails.product",
    headerName: "Product",
    description: "Product",
    headerAlign: 'center',
    flex: 7,
    align: 'center',
    valueGetter: ({ row, field }) => lodash.get(row, field),
    valueFormatter: ({ value }) => value,
  },
  {
    field: "loanDetails.customer.name",
    headerName: "Customer",
    description: "Customer",
    headerAlign: 'center',
    flex: 7,
    align: 'center',
    valueGetter: ({ row, field }) => lodash.get(row, field),
    valueFormatter: ({ value }) => value,
  },
  {
    field: "loanDetails.amount",
    headerName: "Loan Amount (£)",
    description: "Loan Amount (£)",
    headerAlign: 'center',
    flex: 5,
    align: 'center',
    valueGetter: ({ row, field }) => lodash.get(row, field),
    valueFormatter: ({ value }) => value,
  },
  {
    field: "loanDetails.term",
    headerName: "Term (months)",
    description: "Term (months)",
    headerAlign: 'center',
    flex: 4,
    align: 'center',
    valueGetter: ({ row, field }) => lodash.get(row, field),
    valueFormatter: ({ value }) => value,
  },
  {
    field: "score",
    headerName: "Result",
    headerAlign: 'center',
    flex: 6,
    align: 'center',
    renderCell: (params) => {
      const status_params = (params.row.score >= 7.5 && params.row.score < 10) ? {
        text: 'Strong', color: '#078F08',
      } : (params.row.score >= 5 && params.row.score < 7.5) ? {
        text: 'Good', color: '#9DD566',
      } : (params.row.score >= 2.5 && params.row.score < 5) ? {
        text: 'Satisfactory', color: '#FEC401',
      } : {
        text: 'Weak', color: '#FB0102',
      }

      if (params.row.status == "success") {
        return (
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: "left" }}>
            <strong style={{ paddingRight: '1ex', }}>{params.row.score}</strong>
            <Chip label={status_params.text} color="primary" variant="outlined" size="small" style={{ borderRadius: '2.2ex', color: status_params.color, borderColor: status_params.color }}></Chip>
          </div>
        )
      }
      else {
        return (
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: "center" }}>
            <p>{params.row.status}</p>
            <Tooltip title={params.row.failedOperations.error} placement='right'>
              <IconButton aria-label="Info" size="small">
                <InfoOutlinedIcon />
              </IconButton>
            </Tooltip>
          </div>
        )
      }
    },
  },
  {
    field: "runBy",
    headerName: "Run By",
    headerAlign: 'center',
    flex: 7,
    align: 'center',
    renderCell: (params) => {
      const { Icon } = Icons[params.row.source == "DE" ? 'User' : 'Monitor' as keyof typeof Icons];
      return (<div>
        <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'row', alignItems: 'flex-end' }}>
          <Typography mt={2} style={{ paddingRight: '1.2ex' }} >{params.row.runBy}</Typography>
          <Tooltip title={params.row.source} placement='right'>
            <Icon style={{ fontSize: '2.7ex' }} />
          </Tooltip>
        </div>
        <div style={{ fontSize: '1.4ex' }}>{params.row.runAt}</div>
      </div>)
    },
  },
  {
    field: "status",
    headerName: "",
    headerAlign: 'center',
    flex: 2,
    align: 'center',
    renderCell: (params) => {
      const { Icon } = Icons[(params.row.status == "success") ? 'Eye' : 'RefreshCw' as keyof typeof Icons];
      return <Icon />
    },
  },
];

function RunSummariesGrid() {
  const { data: runSummaries } = useGetRunSummariesQuery(undefined, { refetchOnMountOrArgChange: true })
  const navigate = useNavigate();
  return (
    <Paper sx={{ paperSx }}>

      <div style={{ height: "25.2rem", width: "100%" }}>
        <DataGrid
          sx={datagridSx}
          rows={runSummaries || []}
          columns={columns}
          pageSize={5}
          getRowId={(row) => row._id}
          disableColumnFilter
          disableColumnSelector
          disableDensitySelector
          hideFooterSelectedRowCount
          getRowClassName={(params) => `super-app-theme--${params.row.status}`}
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
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: '1.4ex'
        }}
      >
        <CardHeader title="Run Summaries" titleTypographyProps={{ variant: "h3" }} style={{ width: "100%" }} action={<div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'right'
          }}
        >
          <div style={{ display: 'flex', gap: 5 }}>
            {Object.values(Icons).map(({ text, Icon }) => (
              <div key={text} style={{ display: 'flex', alignItems: 'center', gap: 2, fontSize: '2.5ex', margin: '5px' }}>
                <Icon />
                <p style={{ fontSize: '2ex' }}>{text}</p>
              </div>
            ))}
          </div>
        </div>} />

      </div>

      <RunSummariesGrid />
    </React.Fragment >
  );
}

export default RunSummaries;