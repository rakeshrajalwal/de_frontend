import * as React from 'react';
import {Accordion, AccordionDetails, AccordionSummary, Button, IconButton} from "@mui/material";
import { CriteriaEditor } from '../components/Criteria';
import { WeightEditor, TotalWeight } from './WeightEditor';
import { INode } from "../interfaces/ModelInterface";
import '../styles/CreateModel.css';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import EditIcon from '@mui/icons-material/Edit';
import { useField, useFormik, useFormikContext } from "formik";
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import {AdvancedCriteria} from "../components/AdvancedCriteria";

export const CriteriaBar = ({ path, isReverseScale, index=0 }: { path: string, isReverseScale: boolean, index?:number }) => {
    const [, { error, value },] = useField(`${path}.criteria.${index}`);
    const { strong, good, satisfactory, weak, condition } = value;
    const boundaries = isReverseScale ? [strong.min, good.min, satisfactory.min, weak.min, weak.max] : [weak.min, weak.max, satisfactory.max, good.max, strong.max];

    return (
        <div>
            <div className={`criteria-bar ${isReverseScale ? 'reverse' : ''}`}>
                {boundaries.map((v, i) => (
                    <div key={i} className="criteria-value">{v}</div>
                ))}
                {!!error && <WarningAmberIcon style={{ color: 'red' }} />}
            </div>
            <div style={{fontSize:10}}>{condition}</div>
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
    const [showAdvanced, setShowAdvanced] = React.useState(false);
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
                                    <div key={i} style={{ display: 'flex', alignItems: 'center', marginBottom: 10, borderBottom:"0.25px solid rgba(0, 0, 0, 0.3)", paddingBottom: 5 }}>
                                        <WeightEditor node={sig} level={level + 1}
                                            path={`${path}.signals[${i}]`} type={'white'} />
                                        <div style={{ display: "flex", gap: 5 }}>
                                            {/*<CriteriaBar key={i} path={`${path}.signals[${i}]`} isReverseScale={reverseSignalNames.includes(sig.name)}/>*/}
                                            <div>
                                                {sig.criteria?.map((c,ci) => (
                                                    <CriteriaBar key={ci} path={`${path}.signals[${i}]`} isReverseScale={reverseSignalNames.includes(sig.name)} index={ci}/>
                                                ))}
                                            </div>

                                            <IconButton size={'small'} color="primary" onClick={() => {
                                                setSelectedSignal(i);
                                                setShowAdvanced(sig.criteria!.length > 1)
                                            }}>
                                                <EditIcon fontSize="inherit" />
                                            </IconButton>
                                        </div>
                                    </div>
                                ))}
                                <TotalWeight level={level + 1} nodes={node.signals} />
                            </div>
                            {selectedSignal >= 0 && (
                                <div>
                                    {node.signals[selectedSignal].criteria!.length == 1 && (
                                        <>
                                            <CriteriaEditor
                                                node={node.signals[selectedSignal]}
                                                isReverseScale={reverseSignalNames.includes(node.signals[selectedSignal].name)}
                                                close={() => setSelectedSignal(-1)}
                                                path={`${path}.signals[${selectedSignal}]`}
                                                index={0}
                                            />
                                            <Button size={"small"} variant={"text"} onClick={() => setShowAdvanced(true)}>
                                                Advanced Criteria
                                            </Button>
                                        </>
                                    )}
                                    <AdvancedCriteria
                                        node={node.signals[selectedSignal]}
                                        isReverseScale={reverseSignalNames.includes(node.signals[selectedSignal].name)}
                                        close={() => setSelectedSignal(-1)}
                                        path={`${path}.signals[${selectedSignal}]`}
                                        index={0}
                                        open={showAdvanced}
                                        onClose={() => {
                                            setShowAdvanced(false);
                                            setSelectedSignal(-1);
                                        }}
                                    />
                                </div>
                                )}
                        </div>
                    )}
                </div>
            </AccordionDetails>
        </Accordion>
    )

}
