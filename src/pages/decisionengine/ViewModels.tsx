import * as React from 'react';
import styled from "@emotion/styled";
import { Helmet } from "react-helmet-async";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import {
  Chip as MuiChip,
  Paper as MuiPaper,
  Button as MuiButton,
  Typography,
  IconButton,
} from "@mui/material";
import {
  DataGrid,
  GridColDef,
  GridToolbar,
} from "@mui/x-data-grid";
import { spacing, } from "@mui/system";
import AccessTime from '@mui/icons-material/AccessTime';
import modelsJson from './getmodels.json';

export interface model {
  id: number;
  name: string;
  product: string;
  loan_range: string;
  term: string;
  purpose: string;
  secured: string;
  created_by: string;
  created_on: string;
  status: string;
  is_active: boolean;
  runs: number;
  last_run: string;
  last_run_date: string;
}

export interface IProduct {
  name: string,
  factors: {
    name: string,
    subFactors: {
      name: string,
      signals: {
        name: string
      }[]
    }[]
  }[]
}



export interface IRange {
  min: number | string,
  max: number | string,
  _id: string,
}

export interface ICriteria {
  weak: IRange,
  satisfactory: IRange,
  good: IRange,
  strong: IRange
}

export interface IPolicy {
  name: string,
  loanRange: IRange,
  loanTermInMonths: IRange,
  loanPurpose: string[],
  isSecured: boolean
}

export interface IModel {
  __v: number | string,
  _id: string,
  name: string,
  product: string,
  policy: IPolicy,
  factors: {
    _id: string,
    name: string,
    weight: number | string,
    subFactors: {
      _id: string,
      name: string,
      weight: number | string,
      signals: {
        _id: string,
        name: string,
        weight: number | string,
        criteria: ICriteria,
        overallWeight: number | string,
      }[]
    }[]
  }[]
}

const Chip = styled(MuiChip)(spacing);

const Button = styled(MuiButton)(spacing);

const Paper = styled(MuiPaper)(spacing);

const paperSx = {
  "& MuiPaper-root": {
    fontFamily: 'Verdana',
  },
  "& .css-1bpvgg-MuiPaper-root": {
    padding: '10rem',
  }
}

const datagridSx = {
  "& .MuiDataGrid-columnHeaders": {
    backgroundColor: "#D9F1FC",
  },
  "& .MuiDataGrid-columnHeaderTitle": {
    fontWeight: 'bold',
    letterSpacing: '0.05ex',
    opacity: 1,
    color: '#1B2430',
  },
  "& .MuiPaper-elevation1": {
    backgroundColor: '#F3FBFE',
  },
  "& .MuiDataGrid-cellContent": {
    wordWrap: 'break-word !important',
    textAlign: 'center',
    fontSize: '1.5ex',
    justifyContent: 'center',
    color: '#1B2430',
    letterSpacing: '0.05ex',
    opacity: 1,
  },
  "& .MuiDataGrid-cell": {
    whiteSpace: 'normal !important',
  },
  "& .MuiDataGrid-toolbarQuickFilter": {
    border: 'solid',
  },
  "& .MuiChip-label": {
    textAlign: 'center',
    fontSize: '1.5ex',
  },
  "& .MuiDataGrid-toolbarContainer": {
    backgroundColor: '#F7F9FC',
  },
};

const columns: GridColDef[] = [
  {
    field: "id",
    headerName: "ID",
    // width: 10,
    hide: true,
    headerAlign: 'center',
  },
  {
    field: "status",
    headerName: "",
    flex: 0.2,
    headerAlign: 'center',
    align: 'center',
    renderCell: (params) => {
      if (params.row.status == 'approved') {
        return (<CheckCircleIcon style={{ color: 'green', fontSize: '2.5ex' }} />)
      } else if (params.row.status == 'rejected') {
        return (<CancelIcon style={{ color: 'red', fontSize: '2.5ex' }} />)
      } else {
        return (<AccessTime style={{ color: 'orange', fontSize: '2.5ex' }} />)
      }
    }
  },
  {
    field: "name",
    headerName: "Name",
    description: "Name",
    // width: 150,
    flex: 7,
    headerAlign: 'center',
    align: 'center',
  },
  {
    field: "product",
    headerName: "Product",
    description: "Product",
    // width: 200,
    flex: 7,
    headerAlign: 'center',
    align: 'center',
  },
  {
    field: "loan_range",
    headerName: "Loan Range",
    description: "Loan Range",
    // width: 150,
    flex: 7,
    headerAlign: 'center',
    align: 'center',
  },
  {
    field: "term",
    headerName: "Term",
    description: "Term",
    // width: 75,
    flex: 4,
    headerAlign: 'center',
    align: 'center',
  },
  {
    field: "purpose",
    headerName: "Purpose",
    description: "Purpose",
    // width: 100,
    flex: 5,
    headerAlign: 'center',
    align: 'center',
  },
  {
    field: "secured",
    headerName: "Secured",
    description: "Secured",
    // width: 75,
    flex: 5,
    headerAlign: 'center',
    align: 'center',
  },
  {
    field: "runs",
    headerName: "Runs",
    description: "Runs",
    // width: 75,
    flex: 4,
    headerAlign: 'center',
    align: 'center',
  },
  {
    field: "last_run",
    headerName: "Last Run",
    description: "Last Run",
    // width: 75,
    flex: 7,
    headerAlign: 'center',
    align: 'center',
    renderCell: (params) => {
      return (<div style={{ textAlign: 'center', fontSize: '1.6ex' }}>{params.row.last_run}<br /><span style={{ fontSize: '1.5ex' }}>{params.row.last_run_date}</span></div>);
    }
  },
  {
    field: "created_by",
    headerName: "Created By",
    description: "Created By",
    // width: 120,
    flex: 7,
    headerAlign: 'center',
    align: 'center',
    renderCell: (params) => {
      return (<div style={{ textAlign: 'center', fontSize: '1.6ex' }}>{params.row.created_by}<br /><span style={{ fontSize: '1.5ex' }}>{params.row.created_on} </span></div>);
    }
  },
  {
    field: "is_active",
    headerName: "",
    // width: 100,
    flex: 5,
    align: 'center',
    renderCell: (params) => {
      if (params.row.is_active) {
        return (<Chip label="Active" color="primary" variant="outlined" m={1} size='small' style={{ borderRadius: '0.3rem', blockSize: '2.6ex' }} />)
      } else {
        return (<Chip label="Inactive" variant="outlined" m={1} size='small' style={{ borderRadius: '0.3rem', blockSize: '2.6ex' }} />)
      }
    }
  },
];

const modelRows: model[] = [
  { id: 1, name: 'Term Loan', product: 'Working Capital Loan', loan_range: '100000 - 300000', term: '3-5 Y', purpose: 'Tax', secured: 'yes', created_by: 'Christopher', status: 'approved', is_active: true, created_on: '11/12/22 12:30', last_run: 'ncino', runs: 634, last_run_date: '15/12/22 11:45' },
  { id: 2, name: 'Invoice Financing', product: 'Working Capital Loan', loan_range: '100000 - 300000', term: '2-5 Y', purpose: 'Growth', secured: 'no', created_by: 'Christopher', status: 'rejected', is_active: false, created_on: '17/12/22 12:30', last_run: '-', runs: 0, last_run_date: '' },
  { id: 3, name: 'Business line of credit', product: 'Working Capital Loan', loan_range: '100000 - 300000', term: '2-4 Y', purpose: 'Tax, Growth', secured: 'yes', created_by: 'Christopher', status: 'in-review', is_active: true, created_on: '11/12/22 12:30', last_run: 'ncino', runs: 634, last_run_date: '15/12/22 11:45' },
  { id: 4, name: 'Term Loan', product: 'Working Capital Loan', loan_range: '100000 - 300000', term: '2-5 Y', purpose: 'Growth', secured: 'no', created_by: 'Christopher', status: 'rejected', is_active: false, created_on: '11/12/22 12:30', last_run: '-', runs: 0, last_run_date: '' },
  { id: 5, name: 'Term Loan', product: 'Working Capital Loan', loan_range: '100000 - 300000', term: '2-6 Y', purpose: 'Tax', secured: 'yes', created_by: 'Christopher', status: 'approved', is_active: true, created_on: '11/12/22 12:30', last_run: 'ncino', runs: 634, last_run_date: '15/12/22 11:45' },
  { id: 6, name: 'Invoice Financing', product: 'Working Capital Loan', loan_range: '100000 - 300000', term: '3-5 Y', purpose: 'Tax', secured: 'yes', created_by: 'Christopher', status: 'in-review', is_active: true, created_on: '11/12/22 12:30', last_run: 'ncino', runs: 634, last_run_date: '15/12/22 11:45' },
  { id: 7, name: 'Invoice Financing', product: 'Working Capital Loan', loan_range: '100000 - 300000', term: '1-5 Y', purpose: 'Growth', secured: 'no', created_by: 'Christopher', status: 'approved', is_active: false, created_on: '11/12/22 12:30', last_run: 'ncino', runs: 634, last_run_date: '15/12/22 11:45' },
  { id: 8, name: 'Invoice Financing', product: 'Working Capital Loan', loan_range: '100000 - 300000', term: '2-5 Y', purpose: 'Tax', secured: 'no', created_by: 'Christopher', status: 'rejected', is_active: true, created_on: '11/12/22 12:30', last_run: 'ncino', runs: 634, last_run_date: '15/12/22 11:45' },
  { id: 9, name: 'Term Loan', product: 'Working Capital Loan', loan_range: '100000 - 300000', term: '3-5 Y', purpose: 'Growth, Tax', secured: 'yes', created_by: 'Christopher', status: 'in-review', is_active: false, created_on: '11/12/22 12:30', last_run: 'ncino', runs: 634, last_run_date: '15/12/22 11:45' },
];

function ModelDataGrid() {
  return (
    <Paper sx={paperSx}>
      <div style={{ height: "25.2rem", width: "100%" }}>
        <DataGrid
          sx={datagridSx}
          // rowsPerPageOptions={[5, 10, 25]}
          rows={modelRows}
          columns={columns}
          pageSize={5}
          disableColumnFilter
          disableColumnSelector
          disableDensitySelector
          hideFooterSelectedRowCount
          components={{ Toolbar: GridToolbar, }}
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
    </Paper>
  );
}

function ViewModels() {
  return (
    <React.Fragment>
      <Helmet title="Models" />
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', fontSize: '1.4ex' }}>
        <div>
          <Typography variant="h3" gutterBottom display="inline">
            Models
          </Typography>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'right' }}>
          <div style={{ display: 'flex', justifyContent: 'right' }}>
            <Button mr={1} variant="contained" color="primary" style={{ backgroundColor: '#434DB0' }}>
              Create Model
            </Button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'left' }}>
            <IconButton aria-label="Approved" size="small">
              <CheckCircleIcon style={{ color: 'green', fontSize: '1.8ex' }} />
            </IconButton>
            <p>Approved </p>

            <IconButton aria-label="Rejected" size="small">
              <CancelIcon style={{ color: 'red', fontSize: '1.8ex' }} />
            </IconButton>
            <p>Rejected </p>

            <IconButton aria-label="In-Review" size="small">
              <AccessTime style={{ color: 'orange', fontSize: '1.8ex' }} />
            </IconButton>
            <p>In-Review </p>

          </div>
        </div>
      </div>

      <ModelDataGrid />
    </React.Fragment>
  );
}

export default ViewModels;
