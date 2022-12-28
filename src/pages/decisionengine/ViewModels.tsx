import * as React from 'react';
import styled from "@emotion/styled";
import { Helmet } from "react-helmet-async";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel'
import PendingOutlinedIcon from '@mui/icons-material/PendingOutlined';

import {
  Breadcrumbs as MuiBreadcrumbs,
  Card as MuiCard,
  CardContent as MuiCardContent,
  Divider as MuiDivider,
  Chip as MuiChip,
  Paper as MuiPaper,
  Typography,
} from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { spacing, SpacingProps } from "@mui/system";
import createTheme from '../../theme';

// import './styles.css';

interface ChipProps extends SpacingProps {
  component?: React.ElementType;
  href?: string;
  icon?: JSX.Element | null;
}

const Card = styled(MuiCard)(spacing);

const CardContent = styled(MuiCardContent)(spacing);

const Divider = styled(MuiDivider)(spacing);

const Chip = styled(MuiChip)<ChipProps>(spacing);

const Breadcrumbs = styled(MuiBreadcrumbs)(spacing);

const Paper = styled(MuiPaper)(spacing);

const columns: GridColDef[] = [
  {
    field: "id",
    headerName: "ID",
    width: 10,
    hide: true,
    headerAlign: 'center',
  },
  {
    field: "status",
    headerName: "",
    width: 20,
    headerAlign: 'center',
    renderCell: (params) => {
      if (params.row.status == 'approved') {
        return (<CheckCircleIcon style={{ color: 'green' }} />)
      } else if (params.row.status == 'unapproved') {
        return (<CancelIcon style={{ color: 'red' }} />)
      } else {
        return (<PendingOutlinedIcon />)
      }
    }
  },
  {
    field: "name",
    headerName: "Name",
    width: 150,
    description: "name",
    headerAlign: 'center',
    
  },
  {
    field: "product",
    headerName: "Product",
    width: 200,
    description: "product",
    headerAlign: 'center',
  },
  {
    field: "loan_range",
    headerName: "Loan Range",
    width: 150,
    headerAlign: 'center',
  },
  {
    field: "term",
    headerName: "Term",
    width: 75,
    headerAlign: 'center',
  },
  {
    field: "purpose",
    headerName: "Purpose",
    width: 100,
    headerAlign: 'center',
  },
  {
    field: "secured",
    headerName: "Secured",
    width: 75,
    headerAlign: 'center',
  },
  {
    field: "created_by",
    headerName: "Created By",
    width: 120,
    headerAlign: 'center',
  },
  {
    field: "is_active",
    headerName: "",
    width: 100,
    renderCell: (params) => {
      if (params.row.is_active) {
        return (<Chip label="Active" color="primary" variant="outlined" m={1} size='small' style={{ borderRadius: 10 }} />)
      } else {
        return (<Chip label="Inactive" variant="outlined" m={1} size='small' style={{ borderRadius: 10 }} />)
      }
    }
  },
];

const rows = [
  { id: 1, name: "Term Loan", product: "Working Capital Loan", loan_range: "100000 - 300000", term: "3-5 Y", purpose: "Tax", secured: "yes", created_by: "Christopher", status: "approved", is_active: true },
  { id: 2, name: "Invoice Financing", product: "Working Capital Loan", loan_range: "100000 - 300000", term: "2-5 Y", purpose: "Growth", secured: "no", created_by: "Christopher", status: "unapproved", is_active: false },
  { id: 3, name: "Business line of credit", product: "Working Capital Loan", loan_range: "100000 - 300000", term: "2-4 Y", purpose: "Tax, Growth", secured: "yes", created_by: "Christopher", status: "in-review", is_active: true },
  { id: 4, name: "Term Loan", product: "Working Capital Loan", loan_range: "100000 - 300000", term: "2-5 Y", purpose: "Growth", secured: "no", created_by: "Christopher", status: "unapproved", is_active: false },
  { id: 5, name: "Term Loan", product: "Working Capital Loan", loan_range: "100000 - 300000", term: "2-6 Y", purpose: "Tax", secured: "yes", created_by: "Christopher", status: "approved", is_active: true },
  { id: 6, name: "Invoice Financing", product: "Working Capital Loan", loan_range: "100000 - 300000", term: "3-5 Y", purpose: "Tax", secured: "yes", created_by: "Christopher", status: "in-review", is_active: true },
  { id: 7, name: "Invoice Financing", product: "Working Capital Loan", loan_range: "100000 - 300000", term: "1-5 Y", purpose: "Growth", secured: "no", created_by: "Christopher", status: "approved", is_active: false },
  { id: 8, name: "Invoice Financing", product: "Working Capital Loan", loan_range: "100000 - 300000", term: "2-5 Y", purpose: "Tax", secured: "no", created_by: "Christopher", status: "unapproved", is_active: true },
  { id: 9, name: "Term Loan", product: "Working Capital Loan", loan_range: "100000 - 300000", term: "3-5 Y", purpose: "Growth, Tax", secured: "yes", created_by: "Christopher", status: "in-review", is_active: false },
];

function ModelDataGrid() {
  return (
    <Paper>
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          // sx={{ backgroundColor: '#D9F1FC' }}
          rowsPerPageOptions={[5, 10, 25]}
          rows={rows}
          columns={columns}
          pageSize={5}
          style={{ fontFamily: 'Verdana', alignSelf: 'center' }}
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

      <ModelDataGrid />
    </React.Fragment>
  );
}

export default ViewModels;
