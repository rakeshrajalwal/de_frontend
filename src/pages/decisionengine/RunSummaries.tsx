import * as React from 'react';
import styled from "@emotion/styled";
import { Helmet } from "react-helmet-async";
import {
  Paper as MuiPaper,
  Typography, Card, Grid,
  IconButton,
  Chip, Button,
  CardHeader, Dialog, DialogContent, DialogContentText, DialogTitle, TextField
} from "@mui/material";
import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";
import { spacing } from "@mui/system";
import PersonIcon from '@mui/icons-material/Person';
import InfoIcon from '@mui/icons-material/Info';
import CloseIcon from '@mui/icons-material/Close';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import DesktopWindowsOutlinedIcon from '@mui/icons-material/DesktopWindowsOutlined';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import CachedRoundedIcon from '@mui/icons-material/CachedRounded';
import Tooltip from "@mui/material/Tooltip";
import { datagridSx, paperSx, MultiStringCell } from "./styles/DataGridCommonStyles";
import lodash from "lodash";
import { Form, Formik, useField } from "formik";
import { deApi, useGetRunSummariesQuery } from '../../redux/de';
import { useNavigate } from 'react-router-dom';
import * as Yup from "yup";
import { IRunModel } from './interfaces/ModelInterface';
import { toast } from 'react-toastify';
import './styles/RunSummaries.css';

const Paper = styled(MuiPaper)(spacing);

const Label = styled(Typography)`
    font-weight: bold;
    text-transform: capitalize;
`;

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
      return <Icon sx={{ cursor: 'pointer' }} />
    },
  },
];

function RunSummariesGrid() {
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = React.useState<boolean>(false);
  const [RunModel, setRunModel] = React.useState<IRunModel>();

  const { data: runSummaries } = useGetRunSummariesQuery(undefined, { refetchOnMountOrArgChange: true })

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
          getRowClassName={(params) => params.row.status == 'failed' ? 'failed-runs' : ''}
          components={{ Toolbar: GridToolbar }}
          componentsProps={{
            toolbar: {
              csvOptions: { disableToolbarButton: true },
              printOptions: { disableToolbarButton: true },
              showQuickFilter: true,
              quickFilterProps: { debounceMs: 500 },
            },
          }}
          onCellClick={(params, event) => {
            if (params.row.status == 'failed' && params.colDef.field == 'status') {
              setOpenDialog(true);
              setRunModel(params.row)
            }
            else if(params.row.status == 'success' && params.colDef.field == 'status'){
              navigate(`/models/modelresult/${params.row._id}`)
            }
          }}
        />
        <ReRunPopup runModel={RunModel} disabled={openDialog} setValue={setOpenDialog} />
      </div>
    </Paper >
  );
}

const positiveInteger = Yup.number().required('Required').positive("Should be positive").integer('Should be integer');

const ReRunPopup = ({ runModel, disabled, setValue }: { runModel?: IRunModel, disabled: boolean, setValue: any }) => {

  const navigate = useNavigate();
  const [validateOnChange, setValidateOnChange] = React.useState<boolean>(false);
  const [runModelApi] = deApi.useRunModelMutation();

  const requiredString = Yup.string().required('Required');
  // const validationSchema = Yup.object().shape({
  // (
  //   manualInputs: Yup.array().of(Yup.object().shape({
  //     value: requiredString
  //   }))
  //   });

  return (
    <Formik
      initialValues={{
        _id: '',
        loanDetails: {
          product: '',
          amount: '',
          secured: false,
          term: '',
          purpose: '',
          customerId: ''
        },
        manualInputs: []
      } as IRunModel}
      validateOnChange={validateOnChange}
      validateOnBlur={false}
      // validationSchema={validationSchema}
      onSubmit={async ({ manualInputs, loanDetails }) => {
        const manualInputsObj = Object.fromEntries(manualInputs.map(({ name, value }) => [name, value]));
        const runModelInput: any = { loanDetails, manualInput: manualInputsObj };
        console.log(JSON.stringify(runModelInput, null, 2))
        alert(JSON.stringify(runModelInput, null, 2));
        await runModelApi(runModelInput).unwrap();
        toast.success("Model run successfull");
        navigate("/home")
      }}
    >
      {formik => {
        React.useEffect(() => {
          formik.setFieldValue("_id", runModel?._id)
          formik.setFieldValue("loanDetails", runModel?.loanDetails);
          formik.setFieldValue("manualInputs", runModel?.manualInputs);
          if (runModel?.failedOperations) {

            const mergedEarlyCumNewManualInputs = [...runModel.manualInputs, ...runModel.failedOperations.filter(operation => operation.type === 'external').
              reduce((measures: string[], operation) => [...measures, ...operation.measuresNotProvided], []).
              map(name => ({ name, value: '' }))]
            formik.setFieldValue("manualInputs", mergedEarlyCumNewManualInputs);
          } else {
            formik.setFieldValue("manualInputs", runModel?.manualInputs);
          }
        }, [runModel]);

        const handleSubmit = () => {
          setValidateOnChange(true);
          formik.validateForm();
        };

        return (

          <Dialog fullWidth open={disabled} maxWidth={'md'} >
            <Form>
              <DialogTitle style={{ backgroundColor: '#434DB0' }}>

                <Card style={{ backgroundColor: '#434DB0', padding: '20px 30px 20px 30px' }}>
                  <Grid container>
                    <div style={{ float: 'right', position: 'absolute', right: '30px', top: '10px' }}>
                      <CloseIcon style={{ color: 'white', cursor: 'pointer' }} onClick={() => setValue(false)} /></div>
                    <>

                      <CustomInfoField fieldname={'id'} fieldvalue={'1'} />

                      {Object.entries(formik.values.loanDetails || {}).map(([key, val], i) => (
                        <CustomInfoField key={`${key}`} fieldname={`${key}`} fieldvalue={`${val}`} />
                      ))}

                    </>
                  </Grid>
                </Card>
              </DialogTitle>

              <DialogContent>
                <DialogContentText>
                  <Card style={{ padding: '10px 30px 5px 30px', backgroundColor: '#FFD4D4', marginTop: '5px' }}>
                    <Typography color={'red'}> Failed due to missing data for the following signals. Please input the necessary fields to perform re-run
                    </Typography>
                  </Card>
                  <Card style={{ padding: '20px 30px 20px 30px' }}>
                    <Grid container>
                      {(formik.values.manualInputs || []).map((f, i) => (
                        <CustomInputField key={i} fieldname={f.name} path={`manualInputs[${i}].value`} />
                      ))}
                    </Grid>
                  </Card>
                  <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Button type="submit" variant={"contained"} onClick={handleSubmit}>Re-Run</Button>
                  </div>
                </DialogContentText>
              </DialogContent>
            </Form>
          </Dialog>
        )
      }}
    </Formik>
  )
}

const CustomInfoField = ({ fieldname, fieldvalue }: { fieldname: string, fieldvalue: string }) => {

  console.log(fieldname, " the field name");
  console.log(fieldvalue, " the field value")
  return (
    <Grid item md={6} mt={3}>
      <ControlContainer>
        <Grid item md={4} >
          <Typography color={'#fff'} > {fieldname} </Typography>
        </Grid>
        <Grid item md={1}>
          <Typography color={'#fff'}>:</Typography>
        </Grid>
        <Grid item md={6} >
          <Typography color={'#fff'}> {fieldvalue} </Typography>
        </Grid>
      </ControlContainer >
    </Grid >
  )

}

const CustomInputField = ({ fieldname, description, path }: { fieldname: string, description?: string, path: string }) => {

  const [field, meta, helpers] = useField(`${path}`);
  console.log(meta.value)
  return (
    <Grid item md={6} mt={3}>
      <ControlContainer>
        <Grid item md={5} >
          <Label > {fieldname} </Label>
        </Grid>
        {/* <Grid item md={0.5} marginTop='5px'>
          <Tooltip title={description || } style={{ backgroundColor: 'transparent' }}>
            <InfoIcon fontSize={'small'} ></InfoIcon>
          </Tooltip>

        </Grid> */}
        <Grid item md={0.5}>
          <Typography >:</Typography>
        </Grid>
        <Grid item md={3} >
          <TextField size="small" type={'number'} {...field} style={{ marginTop: '-5px' }}
            sx={{
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: '#00000029',
                  borderRadius: 2,
                },
              }
            }}
            helperText={meta.error}
            error={!!meta.error}
          />
        </Grid>
      </ControlContainer >
    </Grid >
  )

}

const ControlContainer = styled.div`
display: flex;
gap:15px;
align-items:baseline;
padding-left:5px;
padding-right:15px;
`;

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