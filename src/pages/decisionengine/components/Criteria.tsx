import styled from "@emotion/styled";
import React from 'react'
import {
    Button,
    Card as MuiCard,
    CardContent,
    CardHeader,
    CardActions,
    CardActionArea,
    IconButton,
    TextField as MuiTextField,
    Typography
} from "@mui/material";
import {spacing} from "@mui/system";
import {useField, useFormikContext} from "formik";
import {criteriaRangeNames, INode} from "../interfaces/ModelInterface";
import {RangeEditor} from "../editors/EditorControllers"
import CloseIcon from '@mui/icons-material/Close';

const TextField = styled(MuiTextField)<{ my?: number }>(spacing);

const Card = styled(MuiCard)(spacing);

export const ControlContainer = styled.div`
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

type CriteriaEditorProps = { node: INode, path: string, isReverseScale: boolean, close?: () => void, index: number, showCondition?:boolean };
export const CriteriaEditor = ({ node, path, isReverseScale, close, index, showCondition=false}: CriteriaEditorProps) => {
    let colors = ['#078F08', '#9DD566', '#FEC401', '#FB0102'];
    let rangeNames = [...criteriaRangeNames];
    if(isReverseScale) {
        rangeNames = rangeNames.reverse();
        colors = colors.reverse();
    }
    const {setFieldValue} = useFormikContext();

    const [conditionField] = useField(`${path}.criteria.${index}.condition`);
    return (
        <Card variant={"outlined"} style={{ borderColor: '#434DB0' }}>
            {!showCondition? (
                <CardHeader
                    action={<IconButton size={"small"} onClick={close}><CloseIcon/></IconButton>}
                    title={'Edit Criteria'}
                    subheader={node.name}
                    titleTypographyProps={{
                        style: {
                            textAlign: 'center',
                            fontWeight: 'bold',
                            textDecoration: 'underline',
                            fontSize: 'small'
                        }
                    }}
                    subheaderTypographyProps={{style: {textAlign: 'center', fontSize: 'small'}}}
                />
            ) : (
                <CardHeader
                    sx={{padding:1}}
                    action={<Button size={"small"} onClick={close}>Remove</Button>}
                />
            )}
            <CardContent sx={{padding:0}}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {showCondition && (
                        <ControlContainer>
                            <Label>Condition</Label>
                            <TextField size={"small"} variant={"filled"} {...conditionField} />
                        </ControlContainer>
                    )}
                    {rangeNames.map((rangeName, i) => (
                        <ControlContainer key={i}>
                            <Label style={{ minWidth: 100, textAlign: 'right', color: colors[i] }}>{rangeName}</Label>
                            <RangeEditor
                                // isOpen={i==0 || i==3}
                                fieldPath={`${path}.criteria.${index}.${rangeName}`}
                                textFieldProps={{variant:'standard', style:{width:55}}}
                                oneEndOnly={i>0}
                                onChange={(e: React.ChangeEvent<any>) => {
                                    if(i==3) return;
                                    setFieldValue(`${path}.criteria.${index}.${rangeNames[i+1]}.max`, e.target.value)
                                }}
                            />
                        </ControlContainer>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}
