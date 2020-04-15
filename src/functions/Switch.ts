import { query as q, ExprArg, ExprVal } from "faunadb"

export const Switch = (
    value: ExprArg,
    switchObject: ExprArg,
    defaultExpr = undefined
): ExprVal => {
    return (
        Object.entries(switchObject).reduce((acc, [switchKey, expr]) => {
            return q.If(
                q.Equals(value, switchKey),
                expr,
                acc ||
                    defaultExpr ||
                    q.Abort(
                        q.Concat(["Key '", value, "' not supported by Switch"])
                    )
            )
        }, null) ||
        defaultExpr ||
        q.Abort(q.Concat(["Key '", value, "' not supported by Switch"]))
    )
}
