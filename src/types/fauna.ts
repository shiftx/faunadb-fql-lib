export default class Expr {
    // @ts-ignore
    constructor(obj: object)
    // @ts-ignore
    static toString(expr: Expr): string
}

export type ExprVal = Expr | string | number | boolean | { [key: string]: any }
export type ExprArg = ExprVal | Array<ExprVal>
