import * as React from 'react';
import { render } from 'react-dom';
import styled from "@emotion/styled";
import { NavLink } from "react-router-dom";
import { Helmet } from "react-helmet-async";

import {
  Link,
  Breadcrumbs as MuiBreadcrumbs,
  Card as MuiCard,
  CardContent as MuiCardContent,
  Divider as MuiDivider,
  Paper as MuiPaper,
  Typography,
} from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { spacing } from "@mui/system";

// import './styles.css';

const Card = styled(MuiCard)(spacing);

const CardContent = styled(MuiCardContent)(spacing);

const Divider = styled(MuiDivider)(spacing);

const Breadcrumbs = styled(MuiBreadcrumbs)(spacing);

const Paper = styled(MuiPaper)(spacing);

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 150 },
  { field: "name", headerName: "Name", width: 150, editable: true },
  {
    field: "product",
    headerName: "Product",
    width: 200,
    editable: true,
  },
  {
    field: "loan_range",
    headerName: "Loan Range",
    width: 200,
    editable: true,
  },
  {
    field: "term",
    headerName: "Term",
    width: 150,
    editable: true,
  },
  {
    field: "purpose",
    headerName: "Purpose",
    width: 150,
    editable: true,
  },
  {
    field: "secured",
    headerName: "Secured",
    width: 150,
    editable: true,
  },
  {
    field: "created_by",
    headerName: "Created By",
    width: 150,
    editable: true,
  },
];

const rows = [
  { id: 1, name: "Term Loan", product: "Working Capital Loan", loan_range: "100000 - 300000", term: "3-5 Y", purpose: "Tax", secured: "yes", created_by: "Christopher" },
  { id: 2, name: "Invoice Financing", product: "Working Capital Loan", loan_range: "100000 - 300000", term: "3-5 Y", purpose: "Growth", secured: "no", created_by: "Christopher" },
  { id: 3, name: "Business line of credit", product: "Working Capital Loan", loan_range: "100000 - 300000", term: "3-5 Y", purpose: "Tax, Growth", secured: "yes", created_by: "Christopher" },
  { id: 4, name: "Term Loan", product: "Working Capital Loan", loan_range: "100000 - 300000", term: "3-5 Y", purpose: "Growth", secured: "no", created_by: "Christopher" },
  { id: 5, name: "Term Loan", product: "Working Capital Loan", loan_range: "100000 - 300000", term: "3-5 Y", purpose: "Tax", secured: "yes", created_by: "Christopher" },
  { id: 6, name: "Invoice Financing", product: "Working Capital Loan", loan_range: "100000 - 300000", term: "3-5 Y", purpose: "Tax", secured: "yes", created_by: "Christopher" },
  { id: 7, name: "Invoice Financing", product: "Working Capital Loan", loan_range: "100000 - 300000", term: "3-5 Y", purpose: "Growth", secured: "no", created_by: "Christopher" },
  { id: 8, name: "Invoice Financing", product: "Working Capital Loan", loan_range: "100000 - 300000", term: "3-5 Y", purpose: "Tax", secured: "no", created_by: "Christopher" },
  { id: 9, name: "Term Loan", product: "Working Capital Loan", loan_range: "100000 - 300000", term: "3-5 Y", purpose: "Growth, Tax", secured: "yes", created_by: "Christopher" },
];

function DataGridDemo() {
  return (
    <Paper>
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rowsPerPageOptions={[5, 10, 25]}
          rows={rows}
          columns={columns}
          pageSize={5}
        />
      </div>
    </Paper>
  );
}

function ViewModels() {
  return (
    <React.Fragment>
      <Helmet title="Models" />
      <Typography variant="h3" gutterBottom display="inline">
        Models
      </Typography>

      <Divider my={6} />

      <DataGridDemo />
    </React.Fragment>
  );
}

export default ViewModels;
