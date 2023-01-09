export interface IProduct {
    name: string,
    policy:IPolicy,
    factors: {
        name: string,
        subFactors: {
            name: string,
            signals: {
                name: string
                isReverseScale?: boolean
            }[]
        }[]
    }[]
}


export interface IRange {
    min: number | string,
    max: number | string
}

export interface IPolicy {
    loanRange: IRange,
    loanTermInMonths: IRange,
    loanPurpose: string[],
    isSecured?: boolean
}

export const criteriaRangeNames = ["strong", "good", "satisfactory", "weak"] as const
type CriteriaRangeName = typeof criteriaRangeNames[number];
export type TCriteria = Record<CriteriaRangeName, IRange>;
// export interface ICriteria {
//     strong: IRange,
//     good: IRange,
//     satisfactory: IRange,
//     weak: IRange
// }
export interface IModel {
    name: string,
    product: string,
    policy: IPolicy,
    factors: {
        name: string,
        weight: number | string,
        subFactors: {
            name: string,
            weight: number | string,
            signals: {
                name: string
                weight: number | string,
                criteria: TCriteria
            }[]
        }[]
    }[]
}

export interface INode {
    name: string,
    subFactors?: INode[],
    signals?: INode[],
    weight: number | string,
    criteria?: TCriteria
}
