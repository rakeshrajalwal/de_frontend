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
    max: number | string,
    _id?: string
}

export interface IPolicy {
    loanRange: IRange,
    loanTermInMonths: IRange,
    loanPurpose: string[],
    isSecured: any
}

export interface ILastRun {
    source: string,
    runAt: string,
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
    __v?: number | string,
    _id?: string,
    modelId?: string,
    name: string,
    product: string,
    createdBy?: string,
    createdAt?: string,
    approvalStatus?: string,
    isActive?: boolean,
    approvedBy?: string,
    approvedAt?: string,
    activatedBy?: string,
    activatedAt?: string,
    runCount?: number,
    lastRun?: ILastRun,
    policy: IPolicy,
    factors: {
        _id?: string,
        name: string,
        weight: number | string,
        subFactors: {
            _id?: string,
            name: string,
            weight: number | string,
            signals: {
                _id?: string,
                name: string
                weight: number | string,
                overallWeight?: number | string,
                criteria?: TCriteria
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