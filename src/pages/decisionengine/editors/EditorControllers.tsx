import styled from "@emotion/styled";
import React from 'react'
import {
    Breadcrumbs as MuiBreadcrumbs,
    Button,
    Card as MuiCard,
    CardContent,
    Divider as MuiDivider,
    FormControl as MuiFormControl,
    Grid,
    TextField, TextFieldProps,
    Typography
} from "@mui/material";
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import {FieldInputProps, useField, useFormik, useFormikContext} from "formik";
import {IRange} from "../interfaces/CreateModelInterfaces";
import {number} from "yup";

interface NumberEditorProps {
    inputWidth: number|string,
}
export const NumberEditor = ({inputWidth, error, ...textFieldProps}:TextFieldProps & NumberEditorProps) => (
    <TextField
        fullWidth
        type={'number'}
        size={"small"}
        error={!!error}
        helperText={error}
        inputProps={{ style: { textAlign: 'center' } }}
        {...textFieldProps}
    />
)
export const RangeEditor = ({
    fieldPath,
    variant = 'standard',
    inputWidth = 'auto',
    oneEndOnly = false,
    onChange = () => {},
}: { oneEndOnly?:boolean, fieldPath: string, variant?: TextFieldProps["variant"], inputWidth?: number | string, openRange?: boolean, onChange?:(e: React.ChangeEvent<any>) => void }) => {
    const  [minField, minMeta, helper] = useField(`${fieldPath}.min`);
    const [maxField, maxMeta] = useField(`${fieldPath}.max`);
    return (
        <div style={{ display: "flex", gap: 5, alignItems: 'baseline', flexGrow: 1 }}>
            <NumberEditor
                variant={variant}
                inputWidth={inputWidth}
                placeholder={'Min'}
                {...minField}
                error={!!minMeta.error}
                helperText={minMeta.error}
                onChange={e => {minField.onChange(e); onChange(e)}}
                disabled={oneEndOnly && isNaN(maxField.value)}
                style={{width:inputWidth}}
            />
            <Typography>to</Typography>
            <NumberEditor
                variant={variant}
                inputWidth={inputWidth}
                placeholder={'Max'}
                {...maxField}
                error={!!maxMeta.error}
                helperText={maxMeta.error}
                disabled={oneEndOnly}
                style={{width:inputWidth}}
            />
        </div>
    );
}
