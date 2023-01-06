import * as React from 'react';
import { render } from 'react-dom';
import {
    Grid,
    Accordion,
    AccordionDetails,
    CardContent,
    Card,
    AccordionSummary,
    Box,
    Paper,
    TextField,
    Typography,
    Button
} from "@mui/material";
import lodash from 'lodash';
import { Field, Form, Formik, useField, useFormik, useFormikContext, FormikProvider } from "formik";
import { INode, IProduct, IModel, IRange, IPolicy } from "../interfaces/CreateModelInterfaces";
import '../CreateModel.css';

const treeWeightsOkay1 = (node: INode): boolean => true;
const treeWeightsOkay = (node: INode): boolean => {
    const children = node.subFactors || node.signals;
    return lodash.isEmpty(children) ||
        (lodash.isEmpty(children?.map(treeWeightsOkay).filter(x => !x))
            && (lodash.sumBy(children, node => parseInt(node.weight.toString())) === 100));
}

function HealthIndicator({ node }: { node: INode }) {
    if (!(node.signals || node.subFactors)) {
        return <></>
    }

    return <div style={{
        width: 10,
        height: 10,
        borderRadius: "50%",
        border: "1px solid",
        backgroundColor: treeWeightsOkay(node) ? "green" : "red"
    }}></div>;
}

export const WeightEditor = ({
    node,
    path,
    type,
    level,
    ...rest
}: { node: INode, path: string, type: string, level: number, [key: string]: any }) => {
    const [field, meta, helpers] = useField(`${path}.weight`);

    const inc = () => {
        helpers.setValue((parseInt(field.value) || 0) + 1)
    }

    const dec = () => {
        helpers.setValue(parseInt(field.value) - 1)
    }

    const colors: any = {
        'blue': {
            background: '#434DB0 0% 0% no-repeat padding-box',
            color: '#FFFFFF'
        },
        'gray': {
            backgroundColor: '#F5F5F5'
        },
        'white': {
            backgroundColor: 'white'
        }
    }

    const height = level === 1 ? 40 : level === 2 ? 30 : 35;
    const font = `normal normal bold ${level === 1 ? 12 : 10}px Verdana`
    const width = level == 1 ? 600 : level == 2 ? 440 : 250;
    return (
        <Box sx={{ margin: 2, display: 'flex', gap: 3, height }} className={type === 'white' ? 'signal-box' : ''}>
            <Paper
                style={{
                    width,
                    flexGrow: 1,
                    fontWeight: "bold",
                    padding: "10px 20px",
                    display: "flex",
                    alignItems: 'center',
                    borderRadius: 8,
                    ...colors[type]
                }}>
                <Typography style={{ flexGrow: 1, font }}>{node.name}</Typography>
                <HealthIndicator node={node} />
            </Paper>


            <div style={{ display: 'flex', gap: 2 }} onClick={e => e.stopPropagation()}>
                <Button variant="contained"
                    style={{ borderRadius: 8, minWidth: "unset", backgroundColor: '#434DB0', aspectRatio: 1 }}
                    size="small" onClick={dec}> - </Button>
                <TextField sx={{ "& fieldset": { border: 'none' } }} type={'number'}
                    inputProps={{
                        min: 0,
                        max: 100,
                        style: {
                            textAlign: 'center'
                        }
                    }}
                    variant="outlined" size="small" {...field}
                    style={{ width: 50, backgroundColor: "rgba(0, 0, 0, 0.06)" }} />
                <Button variant="contained"
                    style={{ borderRadius: 8, minWidth: "unset", backgroundColor: '#434DB0', aspectRatio: 1 }}
                    size="small" onClick={inc}> + </Button>
            </div>

        </Box>
    )
}