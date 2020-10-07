import { query as q, ExprVal, ExprArg } from "faunadb"
import { DotNotationStringToArray } from "./utils/DotNotationStringToArray"

export const SelectFQLib = (
    path: string | [string] | ExprArg,
    from: ExprArg,
    fallbackExpr = null
): ExprVal =>
    q.Let(
        {
            path,
            from,
            pathArray: q.If(
                q.IsArray(q.Var("path")),
                q.Var("path"),
                DotNotationStringToArray(q.Var("path"))
            ),
            exists: q.ContainsPath(q.Var("pathArray"), q.Var("from")),
        },
        q.If(
            q.ContainsPath(q.Var("pathArray"), q.Var("from")),
            q.Select(q.Var("pathArray"), q.Var("from")),
            q.If(
                q.IsNull(fallbackExpr),
                q.Select(q.Var("pathArray"), q.Var("from")),
                fallbackExpr
            )
        )
    )
