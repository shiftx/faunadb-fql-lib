import { StringSplit } from "./StringSplit"
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
                q.Map(
                    StringSplit(arrOrString),
                    q.Lambda(
                        "str",
                        q.If(
                            q.ContainsStrRegex(q.Var("str"), "^[0-9]$"),
                            q.ToInteger(q.Var("str")),
                            q.Var("str")
                        )
                    )
                )
            ),
        },
        q.If(
            q.IsNull(fallbackExpr),
            q.Select(q.Var("arr"), obj),
            q.If(
                q.Contains(q.Var("arr"), obj),
                q.Select(q.Var("arr"), obj),
                fallbackExpr
            )
        )
    )
