export interface IProduct {
    name: string,
    policy: IPolicy,
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
    isSecured: boolean
}

export interface ILastRun {
    source: string,
    runAt: string,
}

export const criteriaRangeNames = ["strong", "good", "satisfactory", "weak"] as const
type CriteriaRangeName = typeof criteriaRangeNames[number];
export type TCriteria = Record<CriteriaRangeName, IRange>;

export interface IModelInput {
    name: string,
    product: string,
    policy: IPolicy,
    factors: IFactor[]
}

export interface IModel extends IModelInput{
    __v?: number | string,
    _id?: string,
    info: {
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
    }
}

export interface IFactor {
    _id?: string,
    name: string,
    weight: number | string,
    subFactors: ISubFactor[],
}

export interface ISubFactor {
    _id?: string,
    name: string,
    weight: number | string,
    signals: ISignal[],
}

export interface ISignal {
    _id?: string,
    name: string,
    weight: number | string,
    overallWeight?: number | string,
    criteria?: TCriteria[],
}


export interface INode {
    name: string,
    subFactors?: INode[],
    signals?: INode[],
    weight: number | string,
    criteria?: TCriteria
}
