import * as React from "react";
import styled from "@emotion/styled";
import { Helmet } from "react-helmet-async";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import {
  Chip as MuiChip,
  Paper as MuiPaper,
  Button as MuiButton,
  Typography,
  IconButton,
} from "@mui/material";
import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";
import { spacing } from "@mui/system";
import AccessTime from "@mui/icons-material/AccessTime";
import modelsJson from "./getmodels.json";

export interface IProduct {
  name: string;
  factors: {
    name: string;
    subFactors: {
      name: string;
      signals: {
        name: string;
      }[];
    }[];
  }[];
}

export interface IRange {
  min: number | string;
  max: number | string;
  _id: string;
}

export interface ICriteria {
  weak: IRange;
  satisfactory: IRange;
  good: IRange;
  strong: IRange;
}

export interface IPolicy {
  name: string;
  loanRange: IRange;
  loanTermInMonths: IRange;
  loanPurpose: string[];
  isSecured: boolean;
}

export interface IModel {
  __v: number | string;
  _id: string;
  name: string;
  product: string;
  is_active: boolean;
  status: string;
  last_run_by: string;
  last_run_on: string;
  created_by: string;
  created_on: string;
  policy: IPolicy;
  factors: {
    _id: string;
    name: string;
    weight: number | string;
    subFactors: {
      _id: string;
      name: string;
      weight: number | string;
      signals: {
        _id: string;
        name: string;
        weight: number | string;
        criteria: ICriteria;
        overallWeight: number | string;
      }[];
    }[];
  }[];
}

const Chip = styled(MuiChip)(spacing);

const Button = styled(MuiButton)(spacing);

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
    fontWeight: "bold",
    letterSpacing: "0.05ex",
    opacity: 1,
    color: "#1B2430",
  },
  "& .MuiPaper-elevation1": {
    backgroundColor: "#F3FBFE",
  },
  "& .MuiDataGrid-cellContent": {
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
    field: "_id",
    headerName: "ID",
    // width: 10,
    hide: true,
    headerAlign: "center",
  },
  {
    field: "status",
    headerName: "",
    flex: 0.2,
    headerAlign: "center",
    align: "center",
    renderCell: (params) => {
      if (params.row.status == "approved") {
        return (
          <CheckCircleIcon style={{ color: "green", fontSize: "2.5ex" }} />
        );
      } else if (params.row.status == "rejected") {
        return <CancelIcon style={{ color: "red", fontSize: "2.5ex" }} />;
      } else {
        return <AccessTime style={{ color: "orange", fontSize: "2.5ex" }} />;
      }
    },
  },
  {
    field: "name",
    headerName: "Name",
    description: "Name",
    // width: 150,
    flex: 7,
    headerAlign: "center",
    align: "center",
  },
  {
    field: "product",
    headerName: "Product",
    description: "Product",
    // width: 200,
    flex: 7,
    headerAlign: "center",
    align: "center",
  },
  {
    field: "policy.loanRange",
    headerName: "Loan Range (£)",
    description: "Loan Range (£)",
    // width: 150,
    flex: 7,
    headerAlign: "center",
    align: "center",
    renderCell: (params) => {
      return (<div style={{ textAlign: "center", fontSize: "1.6ex" }}>
        {params.row.policy.loanRange.min}
        -
        {params.row.policy.loanRange.max}
      </div>);
    }
  },
  {
    field: "policy.loanTermInMonths",
    headerName: "Term (months)",
    description: "Term (months)",
    // width: 75,
    flex: 4,
    headerAlign: "center",
    align: "center",
    renderCell: (params) => {
      return (<div style={{ textAlign: "center", fontSize: "1.6ex" }}>
        {params.row.policy.loanTermInMonths.min}
        -
        {params.row.policy.loanTermInMonths.max}
      </div>);
    }
  },
  {
    field: "policy.loanPurpose",
    headerName: "Purpose",
    description: "Purpose",
    // width: 100,
    flex: 5,
    headerAlign: "center",
    align: "center",
    renderCell: (params) => {
      return (<div style={{ textAlign: "center", fontSize: "1.6ex" }}>
        {params.row.policy.loanPurpose.toString()}
      </div>);
    }
  },
  {
    field: "policy.isSecured",
    headerName: "Secured",
    description: "Secured",
    // width: 75,
    flex: 5,
    headerAlign: "center",
    align: "center",
    renderCell: (params) => {
      let rendered_value = 'no';
      if (params.row.policy.isSecured) {
        rendered_value = 'yes';
      }
      return (<div style={{ textAlign: "center", fontSize: "1.6ex" }}>
        {rendered_value}
      </div>);
    }
  },
  {
    field: "runs",
    headerName: "Runs",
    description: "Runs",
    // width: 75,
    flex: 4,
    headerAlign: "center",
    align: "center",
  },
  {
    field: "lastRunBy",
    headerName: "Last Run",
    description: "Last Run",
    // width: 75,
    flex: 7,
    headerAlign: "center",
    align: "center",
    renderCell: (params) => {
      return (
        <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'center', fontSize: '1.6ex' }}>
          <div>
            {params.row.lastRunBy}
          </div>
          <div style={{ fontSize: '1.4ex' }}>
            {params.row.lastRunOn}
          </div>
        </div>
      );
    },
  },
  {
    field: "createdBy",
    headerName: "Created By",
    description: "Created By",
    // width: 120,
    flex: 7,
    headerAlign: "center",
    align: "center",
    renderCell: (params) => {
      return (
        <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'center', fontSize: '1.6ex' }}>
          <div>
            {params.row.createdBy}
          </div>
          <div style={{ fontSize: '1.4ex' }}>
            {params.row.createdOn}
          </div>
        </div>
      );
    },
  },
  {
    field: "isActive",
    headerName: "",
    // width: 100,
    flex: 5,
    align: "center",
    renderCell: (params) => {
      if (params.row.isActive) {
        return (
          <Chip
            label="Active"
            color="primary"
            variant="outlined"
            m={1}
            size="small"
            style={{ borderRadius: "0.3rem", blockSize: "2.6ex" }}
          />
        );
      } else {
        return (
          <Chip
            label="Inactive"
            variant="outlined"
            m={1}
            size="small"
            style={{ borderRadius: "0.3rem", blockSize: "2.6ex" }}
          />
        );
      }
    },
  },
];

function ModelDataGrid() {
  return (
    <Paper sx={paperSx}>
      <div style={{ height: '25.2rem', width: '100%' }}>
        <DataGrid
          sx={datagridSx}
          // rowsPerPageOptions={[5, 10, 25]}
          rows={modelsJson}
          columns={columns}
          pageSize={5}
          getRowId={(row) => row._id}
          disableColumnFilter
          disableColumnSelector
          disableDensitySelector
          hideFooterSelectedRowCount
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
    </Paper>
  );
}

function ViewModels() {
  return (
    <React.Fragment>
      <Helmet title='Models' />
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: '1.4ex',
        }}
      >
        <div>
          <Typography variant='h3' gutterBottom display='inline'>
            Models
          </Typography>
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'right',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'right' }}>
            <Button
              mr={1}
              variant='contained'
              color='primary'
              style={{ backgroundColor: '#434DB0' }}
            >
              Create Model
            </Button>
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'left',
            }}
          >
            <IconButton disabled aria-label='Approved' size='small'>
              <CheckCircleIcon style={{ color: 'green', fontSize: '1.8ex' }} />
            </IconButton>
            <p>Approved </p>

            <IconButton disabled aria-label='Rejected' size='small'>
              <CancelIcon style={{ color: 'red', fontSize: '1.8ex' }} />
            </IconButton>
            <p>Rejected </p>

            <IconButton disabled aria-label='In-Review' size='small'>
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
