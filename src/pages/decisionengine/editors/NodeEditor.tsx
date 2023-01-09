import * as React from 'react';
import {Accordion, AccordionDetails, AccordionSummary, IconButton} from "@mui/material";
import {CriteriaEditor} from '../components/Criteria';
import {WeightEditor} from './WeightEditor';

import {INode, TCriteria} from "../interfaces/CreateModelInterfaces"
import '../CreateModel.css';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import EditIcon from '@mui/icons-material/Edit';

const CriteriaBar = ({criteria, isReverseScale}:{criteria:TCriteria, isReverseScale:boolean}) => {
    const {strong, good, satisfactory, weak} = criteria;
    const boundaries = isReverseScale ? [good.min, satisfactory.min, weak.min] :  [satisfactory.min, good.min, strong.min];

    return (
        <div className={`criteria-bar ${isReverseScale ? 'reverse' : ''}`}>
            {boundaries.map((v, i) => (
                <div key={i} className="criteria-value">{v}</div>
            ))}
        </div>
    )
}

export const NodeEditor: React.FC<{ node: INode, path: string, level: number, reverseSignalNames:string[] }> = ({ node, path, level, reverseSignalNames }) => {
    const [expanded, setExpanded] = React.useState<boolean>(false);
    const toggleExpanded = () => setExpanded(!expanded);

    const criteriaValueSlider = [
        {
            value: 0,
            label: 'below',
        },
        {
            value: 100,
            label: 'above',
        },
    ];

    const [selectedSignal, setSelectedSignal] = React.useState<number>(-1);
    return (
        <Accordion expanded={expanded} onChange={toggleExpanded} sx={{}}>
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
                                <NodeEditor key={i} node={sf} path={`${path}.subFactors[${i}]`} level={level + 1} reverseSignalNames={reverseSignalNames}/>
                            ))}
                        </div>
                    )}
                    {node.signals && (
                        <div style={{ display: "flex", gap: 20 }}>
                            <div>
                                {node.signals.map((sig, i) => (
                                    <div key={i} style={{ display: 'flex', alignItems: 'baseline' }}>
                                        <WeightEditor node={sig} style={{ marginBottom: 10 }} level={level + 1}
                                            path={`${path}.signals[${i}]`} type={'white'} />
                                        <div style={{display:"flex", gap:2}}>
                                            <CriteriaBar criteria={sig.criteria!} isReverseScale={reverseSignalNames.includes(sig.name)}/>
                                            <IconButton size={'small'} color="primary" onClick={() => setSelectedSignal(selectedSignal === i ? -1 : i)}>
                                                <EditIcon fontSize="inherit" />
                                            </IconButton>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            {selectedSignal >= 0 && (
                                <CriteriaEditor node={node.signals[selectedSignal]}
                                                isReverseScale={reverseSignalNames.includes(node.signals[selectedSignal].name)}
                                    path={`${path}.signals[${selectedSignal}]`} />
                            )}
                        </div>
                    )}
                </div>
            </AccordionDetails>
        </Accordion>
    )

}
