import { SplitString } from "./SplitString"
import { query as q, ExprArg, ExprVal } from "faunadb"

export const SelectFL = (
    arrOrString: string | [string] | ExprArg,
    obj: ExprArg,
    fallbackExpr = null
): ExprVal =>
    q.Let(
        {
            arr: q.If(
                q.IsArray(arrOrString),
                arrOrString,
                SplitString(arrOrString)
            ),
        },
        q.If(
            q.Contains(q.Var("arr"), obj),
            q.Select(q.Var("arr"), obj),
            fallbackExpr
        )
    )
