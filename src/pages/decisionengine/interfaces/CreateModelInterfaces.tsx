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
    max: number | string
}

export interface IPolicy {
    name: string,
    loanRange: IRange,
    loanTermInMonths: IRange,
    loanPurpose: [],
    isSecured: boolean
}

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
