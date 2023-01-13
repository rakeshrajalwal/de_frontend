export interface IProduct {
    name: string,
    factors: {
        name: string,
        subFactors: {
            name: string,
            signals: {
                name: string
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

export interface ICriteria {
    weak: IRange,
    satisfactory: IRange,
    good: IRange,
    strong: IRange,
}

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
    factors: IFactor[],
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
    criteria?: ICriteria,
}


export interface IPreviewModel {
    name: string,
    weight: number | string,
    overallWeight: number | string,
    factorName: string,
    factorWeight: number | string,
    subFactorName: string,
    subFactorWeight: number | string,
    criteria: ICriteria,
}

export interface INode {
    name: string,
    subFactors?: INode[],
    signals?: INode[],
    weight: number | string,
}
