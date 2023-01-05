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
    TextField ,
    Typography
} from "@mui/material";
import { spacing } from "@mui/system";
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { Formik, Form, Field, useField, useFormik, FormikProvider } from "formik";
import { INode } from "../interfaces/CreateModelInterfaces";

export const NumberEditor = ({
    variant = 'standard',
    field,
    inputWidth = 'auto',
    placeholder
}: { variant?: 'standard' | 'outlined', field: object, inputWidth?: number | string, placeholder: string }) => (
    <TextField
        style={{ flexGrow: 1, height: 25 }}
        type={'number'}
        size={"small"}
        variant={variant}
        {...field}
        InputLabelProps={{ style: { height: 25 } }}
        InputProps={{
            placeholder,
            style: { width: inputWidth, height: 25 }
        }}
        inputProps={{ style: { textAlign: 'center' } }}
    />
)

export const OpenRangeEditor = ({
    fieldPath,
    variant = 'standard',
    inputWidth = 'auto',
    openRange = false
}: { fieldPath: string, variant?: 'standard' | 'outlined', inputWidth?: number | string, openRange?: boolean }) => {
    const [minField, , minHelper] = useField(`${fieldPath}.min`);
    const [maxField, , maxHelper] = useField(`${fieldPath}.max`);
    const [aboveOrBelow, setAboveOrBelow] = React.useState<string>('');
    const setMinMax = (v: string) => {
        setAboveOrBelow(v);
        const min = minField.value;
        const max = maxField.value;
        const editableField = (aboveOrBelow === 'above') ? minHelper : maxHelper;
        editableField.setValue(min ?? max);
    }
    return (
        <div style={{ display: "flex", gap: 5, alignItems: 'baseline', flexGrow: 1 }}>
            <NumberEditor field={(aboveOrBelow === 'above') ? minField : maxField} placeholder={''}
                inputWidth={inputWidth} variant={variant} />
            <Typography>or</Typography>
            <Select value={aboveOrBelow} fullWidth variant={'standard'}
                onChange={(e) => setMinMax(e.target.value)}>
                <MenuItem value={'above'}>above</MenuItem>
                <MenuItem value={'below'}>below</MenuItem>
            </Select>
        </div>
    );
}

export const RangeEditor = ({
    isOpen = false,
    ...rest
}: { isOpen?: boolean, fieldPath: string, variant?: 'standard' | 'outlined', inputWidth?: number | string, openRange?: boolean }) => {
    if (isOpen) {
        return <OpenRangeEditor {...rest} />
    } else {
        return <CloseRangeEditor {...rest} />
    }
}

export const CloseRangeEditor = ({
    fieldPath,
    variant = 'standard',
    inputWidth = 'auto',
    openRange = false
}: { fieldPath: string, variant?: 'standard' | 'outlined', inputWidth?: number | string, openRange?: boolean }) => {
    const [minField] = useField(`${fieldPath}.min`);
    const [maxField] = useField(`${fieldPath}.max`);
    return (
        <div style={{ display: "flex", gap: 5, alignItems: 'baseline', flexGrow: 1 }}>
            <NumberEditor field={minField} placeholder={'Min'} inputWidth={inputWidth} variant={variant} />
            <Typography>to</Typography>
            <NumberEditor field={maxField} placeholder={'Max'} inputWidth={inputWidth} variant={variant} />
        </div>
    );
}