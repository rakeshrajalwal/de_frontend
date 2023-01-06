
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
    TextField as MuiTextField,
    Typography
} from "@mui/material";
import { spacing } from "@mui/system";
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { Formik, Form, Field, useField, useFormik, FormikProvider } from "formik";
import { INode } from "../interfaces/CreateModelInterfaces";
import { RangeEditor } from "../editors/EditorControllers"

const TextField = styled(MuiTextField)<{ my?: number }>(spacing);

const Card = styled(MuiCard)(spacing);

const ControlContainer = styled.div`
display: flex;
gap:15px;
align-items:baseline;
padding-left:5px;
padding-right:15px;
`;

const Label = styled(Typography)`
    font-weight: bold;
    text-transform: capitalize;
`;

export const CriteriaEditor = ({ node, path, ...rest }: { node: INode, path: string, [key: string]: any }) => {
    const ranges = ["strong", "good", "satisfactory", "weak"];
    const colors = ['#078F08', '#9DD566', '#FEC401', '#FB0102'];
    return (
        <Card variant={"outlined"} style={{ borderColor: '#434DB0' }}>
            <CardContent>
                <Typography style={{ textAlign: 'center', fontWeight: 'bold', textDecoration: 'underline', padding: 10 }}>
                    Edit Criteria - {node.name}
                </Typography>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {ranges.map((rangeName, i) => (
                        <ControlContainer key={i}>
                            <Label style={{ width: 80, textAlign: 'right', color: colors[i] }}>{rangeName}</Label>
                            <RangeEditor
                                // isOpen={i==0 || i==3}
                                fieldPath={`${path}.criteria.${rangeName}`}
                                variant={'outlined'}
                                inputWidth={50}
                            />
                        </ControlContainer>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}