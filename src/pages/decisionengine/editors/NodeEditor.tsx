import * as React from 'react';
import { Accordion, AccordionDetails, AccordionSummary, IconButton } from "@mui/material";
import { CriteriaEditor } from '../components/Criteria';
import { TotalWeight, WeightEditor } from './WeightEditor';
import { INode } from "../interfaces/ModelInterface"
import '../CreateModel.css';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import EditIcon from '@mui/icons-material/Edit';
import { useField, useFormik, useFormikContext } from "formik";
import WarningAmberIcon from '@mui/icons-material/WarningAmber';

const CriteriaBar = ({ path, isReverseScale }: { path: string, isReverseScale: boolean }) => {
    const [, { error, value },] = useField(`${path}.criteria`);
    const { strong, good, satisfactory, weak } = value;
    const boundaries = isReverseScale ? [good.min, satisfactory.min, weak.min] : [satisfactory.min, good.min, strong.min];

    return (
        <div>
            <div className={`criteria-bar ${isReverseScale ? 'reverse' : ''}`}>
                {boundaries.map((v, i) => (
                    <div key={i} className="criteria-value">{v}</div>
                ))}
                {!!error && <WarningAmberIcon style={{ color: 'red' }} />}
            </div>
        </div>
    )
}

export const NodeEditor: React.FC<{ node: INode, path: string, level: number, reverseSignalNames: string[] }> = ({ node, path, level, reverseSignalNames }) => {
    const [expanded, setExpanded] = React.useState<boolean>(false);
    const toggleExpanded = () => setExpanded(!expanded);
    const [, { error },] = useField(path);
    const { isValidating, isSubmitting } = useFormikContext();

    if (!expanded && (isSubmitting && isValidating && !!error)) {
        setExpanded(true);
    }

    const [selectedSignal, setSelectedSignal] = React.useState<number>(-1);
    return (
        <Accordion expanded={expanded} onChange={toggleExpanded}>
            <AccordionSummary expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem', }} />} sx={{
                flexDirection: 'row-reverse',
                '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
                    transform: 'rotate(90deg)',
                },
                '& .MuiAccordionSummary-content': {
                    margin: level == 1 ? 2 : 0,
                },
                '& .MuiAccordionSummary-content.Mui-expanded': {
                    margin: 0,
                },
            }}
            >
                <WeightEditor node={node} path={`${path}`} type={expanded ? 'blue' : 'gray'} level={level} />
            </AccordionSummary>

            <AccordionDetails>
                <div style={{ paddingLeft: level * 25 }}>
                    {node.subFactors && (
                        <div>
                            {node.subFactors.map((sf, i) => (
                                <NodeEditor key={i} node={sf} path={`${path}.subFactors[${i}]`} level={level + 1} reverseSignalNames={reverseSignalNames} />
                            ))}
                            <TotalWeight level={level + 1} nodes={node.subFactors} />
                        </div>
                    )}
                    {node.signals && (
                        <div style={{ display: "flex", gap: 20 }}>
                            <div>
                                {node.signals.map((sig, i) => (
                                    <div key={i} style={{ display: 'flex', alignItems: 'baseline' }}>
                                        <WeightEditor node={sig} style={{ marginBottom: 10 }} level={level + 1}
                                            path={`${path}.signals[${i}]`} type={'white'} />
                                        <div style={{ display: "flex", gap: 2 }}>
                                            <CriteriaBar path={`${path}.signals[${i}]`} isReverseScale={reverseSignalNames.includes(sig.name)} />
                                            <IconButton size={'small'} color="primary" onClick={() => setSelectedSignal(selectedSignal === i ? -1 : i)}>
                                                <EditIcon fontSize="inherit" />
                                            </IconButton>
                                        </div>
                                    </div>
                                ))}
                                <TotalWeight level={level + 1} nodes={node.signals} />
                            </div>
                            {selectedSignal >= 0 && (
                                <CriteriaEditor node={node.signals[selectedSignal]}
                                    isReverseScale={reverseSignalNames.includes(node.signals[selectedSignal].name)}
                                    close={() => setSelectedSignal(-1)}
                                    path={`${path}.signals[${selectedSignal}]`} />
                            )}
                        </div>
                    )}
                </div>
            </AccordionDetails>
        </Accordion>
    )

}