import * as React from "react";
import { useNavigate } from "react-router-dom";
import styled from "@emotion/styled";
import { Helmet } from "react-helmet-async";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import {
  Chip as MuiChip,
  Paper as MuiPaper,
  Button as MuiButton,
  Typography,
} from "@mui/material";
import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";
import { spacing } from "@mui/system";
import AccessTime from "@mui/icons-material/AccessTime";
import modelsJson from "./getmodels.json";
import lodash from "lodash";
import { INode, IProduct, IModel, IRange, IPolicy } from "./interfaces/ModelInterface";
import { datagridSx, paperSx, MultiStringCell } from "./styles/DataGridCommonStyles";

const Chip = styled(MuiChip)(spacing);

const Button = styled(MuiButton)(spacing);

const Paper = styled(MuiPaper)(spacing);

const statusIcons = {
  approved: {
    text: "Approved",
    Icon: CheckCircleIcon,
    color: 'green'
  },
  rejected: {
    text: "Rejected",
    Icon: CancelIcon,
    color: 'red'
  },
  draft: {
    text: "In-Review",
    Icon: AccessTime,
    color: 'orange'
  }
}

const columns: GridColDef[] = [
  {
    field: "_id",
    headerName: "ID",
    // width: 10,
    hide: true,
    headerAlign: "center",
  },
  {
    field: "approvalStatus",
    headerName: "",
    flex: 0.2,
    headerAlign: "center",
    align: "center",
    renderCell: ({ value: status }) => {
      const { Icon, color, text } = statusIcons[status as keyof typeof statusIcons];
      return (
        <Icon style={{ color, fontSize: "2.5ex" }} />
      )
    }
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
    valueGetter: ({ row, field }) => lodash.get(row, field),
    valueFormatter: ({ value: { min, max } }) => [min, max].join(' - '),
  },
  {
    field: "policy.loanTermInMonths",
    headerName: "Term (months)",
    description: "Term (months)",
    // width: 75,
    flex: 4,
    headerAlign: "center",
    align: "center",
    valueGetter: ({ row, field }) => lodash.get(row, field),
    valueFormatter: ({ value: { min, max } }) => [min, max].join(' - '),
  },
  {
    field: "policy.loanPurpose",
    headerName: "Purpose",
    description: "Purpose",
    // width: 100,
    flex: 6,
    headerAlign: "center",
    align: "center",
    valueGetter: ({ row, field }) => lodash.get(row, field),
    valueFormatter: ({ value }) => value.join(","),
  },
  {
    field: "policy.isSecured",
    headerName: "Secured",
    description: "Secured",
    // width: 75,
    flex: 5,
    headerAlign: "center",
    align: "center",
    valueGetter: ({ row, field }) => lodash.get(row, field),
    valueFormatter: ({ value }) => value ? "Yes" : "No",
  },
  {
    field: "runCount",
    headerName: "Runs",
    description: "Runs",
    // width: 75,
    flex: 4,
    headerAlign: "center",
    align: "center",
  },
  {
    field: "lastRun",
    headerName: "Last Run",
    description: "Last Run",
    // width: 75,
    flex: 7,
    headerAlign: "center",
    align: "center",
    valueGetter: ({ row: { lastRun } }) => [lastRun.source, lastRun.runAt],
    renderCell: MultiStringCell,
  },
  {
    field: "createdBy",
    headerName: "Created By",
    description: "Created By",
    // width: 120,
    flex: 7,
    headerAlign: "center",
    align: "center",
    valueGetter: ({ row: { createdBy, createdOn } }) => [createdBy, createdOn],
    renderCell: MultiStringCell,
  },
  {
    field: "isActive",
    headerName: "",
    // width: 100,
    flex: 5,
    align: "center",
    renderCell: ({ row: { isActive } }) => (
      <Chip
        label={isActive ? "Active" : "Inactive"}
        color={isActive ? "primary" : 'default'}
        variant="outlined"
        m={1}
        size="small"
        style={{ borderRadius: "0.3rem", blockSize: "2.6ex" }}
      />
    ),
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
  const navigate = useNavigate();
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
              onClick={() => { navigate("/model/create"); }}
            >
              Create Model
            </Button>
          </div>
          <div style={{ display: 'flex', gap: 5 }} >
            {Object.values(statusIcons).map(({ text, Icon, color }) => (
              <div key={text} style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Icon style={{ color, fontSize: '2.5ex' }} />
                <p>{text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <ModelDataGrid />
    </React.Fragment>
  );
}

export default ViewModels;
