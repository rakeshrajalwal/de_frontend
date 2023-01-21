import React from "react";
import styled from "@emotion/styled";
import {
    Paper as MuiPaper,
    Table,
    TableBody,
    TableCell as MuiTableCell,
    tableCellClasses,
    TableContainer,
    TableHead,
    TableRow
} from "@mui/material";
import {spacing} from "@mui/system";
import {IFactor, IModelInput, INode, ISignal, ISubFactor} from "./interfaces/ModelInterface";
import lodash from "lodash";
import productCollection from "./product_collection.json";
import {CriteriaBar} from "./editors/NodeEditor";

const Paper = styled(MuiPaper)(spacing);
const TableCell = styled(MuiTableCell)(({theme}) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: '#D9F1FC',
        color: '#1B2430',
        fontWeight: 'bold',
        opacity: 1,
        letterSpacing: '0.11px',

    },
}));

export function ModelDataGrid({model}: { model: IModelInput }) {

    // Convert into flatSignals - {factor, subfactor, signal}
    const flatSignals = model.factors.flatMap(factor =>
        factor.subFactors.flatMap(subFactor =>
            subFactor.signals.flatMap(signal => ({factor, subFactor, signal}))))

    // Get rowspan for factors and subfactors
    const rowSpanOfNode = (n: INode) => {
        if (n.signals) return n.signals.length;
        return lodash.sumBy(n.subFactors, sf => sf.signals!.length);
    }

    const getSignalPath = (factor: IFactor, subFactor: ISubFactor, signal: ISignal) => {
        let factorIndex = model.factors.findIndex(object => {
            return object.name === factor.name
        });
        let subFactorIndex = factor.subFactors.findIndex(object => {
            return object.name === subFactor.name
        });
        let signalIndex = subFactor.signals.findIndex(object => {
            return object.name === signal.name
        });
        return `factors[${factorIndex}].subFactors[${subFactorIndex}].signals[${signalIndex}]`;
    }

    let reverseSignalNames = productCollection.factors.flatMap(f => f.subFactors.flatMap(sf => sf.signals.filter(sig => sig.isReverseScale).map(sig => sig.name))) || [];

    console.log('reverseSignalNames: ', reverseSignalNames);

    return (
        <TableContainer component={Paper} sx={{marginTop: 5}}>
            <Table sx={{minWidth: '35ex'}} aria-label="preview table">
                <TableHead>
                    <TableRow>
                        <TableCell align="center" width="15%">Factor</TableCell>
                        <TableCell align="center" width="5%">Weight</TableCell>
                        <TableCell align="center" width="15%">Sub-Factor</TableCell>
                        <TableCell align="center" width="5%">Weight</TableCell>
                        <TableCell align="center" width="15%">Signal</TableCell>
                        <TableCell align="center" width="5%">Weight</TableCell>
                        <TableCell align="center" width="10%">Overall Weight</TableCell>
                        <TableCell align="center" width="25%">Criteria</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {flatSignals.map(({factor, subFactor, signal}, i) => (
                        <TableRow key={i}>
                            {(i == 0 || factor !== flatSignals[i - 1].factor) && (
                                <><TableCell align="center"
                                             rowSpan={rowSpanOfNode(factor)}>{factor.name}</TableCell><TableCell
                                    align="right" rowSpan={rowSpanOfNode(factor)}>{factor.weight}%</TableCell></>
                            )}
                            {(i == 0 || subFactor !== flatSignals[i - 1].subFactor) && (
                                <><TableCell align="center"
                                             rowSpan={rowSpanOfNode(subFactor)}>{subFactor.name}</TableCell><TableCell
                                    align="right" rowSpan={rowSpanOfNode(subFactor)}>{subFactor.weight}%</TableCell></>
                            )}
                            <TableCell align="center">{signal.name}</TableCell>
                            <TableCell align="right">{signal.weight}%</TableCell>
                            <TableCell align="right">{signal.overallWeight}%</TableCell>
                            <TableCell align="right" sx={{paddingLeft: '5ex'}}><CriteriaBar
                                path={getSignalPath(factor, subFactor, signal)}
                                isReverseScale={reverseSignalNames.includes(signal.name)}/></TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
