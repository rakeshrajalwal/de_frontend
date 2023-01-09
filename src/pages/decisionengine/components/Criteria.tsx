import styled from "@emotion/styled";
import React from 'react'
import {
    Card as MuiCard,
    CardContent,
    CardHeader,
    IconButton,
    TextField as MuiTextField,
    Typography
} from "@mui/material";
import {spacing} from "@mui/system";
import {useFormikContext} from "formik";
import {criteriaRangeNames, INode} from "../interfaces/CreateModelInterfaces";
import {RangeEditor} from "../editors/EditorControllers"
import CloseIcon from '@mui/icons-material/Close';

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

export const CriteriaEditor = ({ node, path, isReverseScale, close}: { node: INode, path: string, isReverseScale: boolean, close: () => void }) => {
    let colors = ['#078F08', '#9DD566', '#FEC401', '#FB0102'];
    let rangeNames = [...criteriaRangeNames];
    if(isReverseScale) {
        rangeNames = rangeNames.reverse();
        colors = colors.reverse();
    }
    const {setFieldValue} = useFormikContext();
    return (
        <Card variant={"outlined"} style={{ borderColor: '#434DB0' }}>
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
            <CardContent sx={{padding:0}}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {rangeNames.map((rangeName, i) => (
                        <ControlContainer key={i}>
                            <Label style={{ minWidth: 100, textAlign: 'right', color: colors[i] }}>{rangeName}</Label>
                            <RangeEditor
                                // isOpen={i==0 || i==3}
                                fieldPath={`${path}.criteria.${rangeName}`}
                                textFieldProps={{variant:'standard', style:{width:55}}}
                                oneEndOnly={i>0}
                                onChange={(e: React.ChangeEvent<any>) => {
                                    if(i==3) return;
                                    setFieldValue(`${path}.criteria.${rangeNames[i+1]}.max`, e.target.value)
                                }}
                            />
                        </ControlContainer>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}
