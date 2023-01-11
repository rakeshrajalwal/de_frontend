import React from 'react'
import { TextField, TextFieldProps, Typography } from "@mui/material";
import { useField } from "formik";

interface NumberEditorProps {
    inputWidth: number | string,
}
export const NumberEditor = ({ error, ...textFieldProps }: TextFieldProps) => (
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

/* component that takes the min and max values in any range eg.loanrange. with all necessary validations */
export const RangeEditor = ({
    fieldPath,
    oneEndOnly = false,
    onChange = () => { },
    textFieldProps
}: { textFieldProps?: TextFieldProps, oneEndOnly?: boolean, fieldPath: string, openRange?: boolean, onChange?: (e: React.ChangeEvent<any>) => void }) => {
    const [minField, minMeta, helper] = useField(`${fieldPath}.min`);
    const [maxField, maxMeta] = useField(`${fieldPath}.max`);
    return (
        <div style={{ display: "flex", gap: 5, alignItems: 'baseline', flexGrow: 1 }}>
            <NumberEditor
                {...textFieldProps}
                placeholder={'Min'}
                {...minField}
                error={!!minMeta.error}
                helperText={minMeta.error}
                onChange={e => {
                    minField.onChange(e);
                    onChange(e)
                }}
                disabled={oneEndOnly && isNaN(maxField.value)}
            />
            <Typography>to</Typography>
            <NumberEditor
                {...textFieldProps}
                placeholder={'Max'}
                {...maxField}
                error={!!maxMeta.error}
                helperText={maxMeta.error}
                disabled={oneEndOnly}
            />
        </div>
    );
}