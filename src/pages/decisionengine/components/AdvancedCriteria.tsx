import React from 'react'
import {
    Button,
    CardHeader,
    Dialog,
    DialogActions,
    DialogContent,
    DialogProps,
    DialogTitle,
    IconButton
} from "@mui/material";
import {FieldArray, Form, Formik, useField} from "formik";
import formik from "../../forms/Formik";
import {CriteriaEditor} from "./Criteria";
import CloseIcon from "@mui/icons-material/Close";

type x = Parameters<typeof CriteriaEditor> ;
type y = x[0];
export function AdvancedCriteria({node, path, isReverseScale, close, ...dp}: DialogProps & y) {
    const defaultCriteria = {
        "strong": {"min": "", "max": ""},
        "good": {"min": "", "max": ""},
        "satisfactory": {"min": "", "max": ""},
        "weak": {"min": "", "max": ""},
        "condition": ""
    };
    const [field] = useField(`${path}.criteria`);
    const criteria:any[] = field.value;
    return (
        <FieldArray
            name={`${path}.criteria`}
            render={arrayHelpers => (
                <Dialog {...dp} fullWidth maxWidth={"md"}>
                    <DialogTitle>{`Advanced Criteria for ${node.name}`}</DialogTitle>
                    <DialogContent>
                        <div>
                            <div style={{display: 'flex', gap:10, flexWrap:'wrap'}}>
                                {criteria.map((c, i) => (
                                    <div key={i}>
                                        <CriteriaEditor node={node} path={path}
                                                        isReverseScale={isReverseScale}
                                                        close={(criteria.length > 1) ? () => arrayHelpers.remove(i) : undefined}
                                                        index={i}
                                                        showCondition
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => arrayHelpers.insert(criteria.length, {...defaultCriteria})}>
                            Add Condition
                        </Button>
                        <Button onClick={() => dp.onClose!({}, "escapeKeyDown")}>
                            Close
                        </Button>
                    </DialogActions>
                </Dialog>
            )}
        />
    )
}
