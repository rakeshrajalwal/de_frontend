export interface IProduct {
    _id?: string,
    policy: IPolicy,
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

export interface IManualInputs {
    name : string,
    value : number | string
}

export interface IRunModel {
    model?: IModel,
    loanDetails: {
        product: string,
        amount: string,
        secured: boolean,
        term: string,
        purpose: string,
        customerId: string
    },
    manualInputs: {
        name: string,
        value: number | string
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
                criteria?: ICriteria,
            }[]
        }[]
    }[]
}

export interface INode {
    name: string,
    subFactors?: INode[],
    signals?: INode[],
    weight: number | string,
}

export interface IModelRun {
    model: IModel,
    loanDetails: {
        customerId: string,
        product: string,
        amount: number,
        term: number,
        purpose: string,
        secured: boolean
    },
    manualInputs: {
        name: string,
        value: number,
        _id?: string
    }[]

}