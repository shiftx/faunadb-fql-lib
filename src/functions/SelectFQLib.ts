import { query as q } from "faunadb"
import { ExprVal, ExprArg } from "../types/fauna"
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
            exists: q.Contains(q.Var("pathArray"), q.Var("from")),
        },
        q.If(
            q.Contains(q.Var("pathArray"), q.Var("from")),
            q.Select(q.Var("pathArray"), q.Var("from")),
            q.If(
                q.IsNull(fallbackExpr),
                q.Select(q.Var("pathArray"), q.Var("from")),
                fallbackExpr
            )
        )
    )
