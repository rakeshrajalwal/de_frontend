export interface IProduct {
    _id?: string,
    name: string,
    policy: IPolicy,
    factors: {
        name: string,
        subFactors: {
            name: string,
            signals: {
                name: string,
                isReverseScale?: boolean
            }[]
        }[]
    }[]
}

// export interface IManualInputs {
//     name : string,
//     value : number | string
// }

export interface IRunModel {
    _id?: string,
    model?: IModel,
    loanDetails: {
        product: string,
        amount: number | string,
        secured: boolean,
        term: number| string,
        purpose: string,
        customerId: string
    },
    manualInputs: {
        name: string,
        value: number | string
    }[],
    failedOperations? : {
        type: string,
        name: string,
        source: string,
        measuresNotProvided: string[]
      }[],

}

// export interface IRunModel {
//     model?: IModel,
//     loanDetails: {
//         product: string,
//         amount: string,
//         secured: boolean,
//         term: string,
//         purpose: string,
//         customerId: string
//     },
//     manualInputs: string[]

// }


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
    criteria?: TCriteria[]
}
