import { query as q } from "faunadb"
import { DotNotationStringToArray } from "./utils/DotNotationStringToArray"
import { ExprVal, ExprArg } from "../types/fauna"

export const ContainsFQLib = (
    path: string | [string] | ExprArg,
    _in: ExprArg
): ExprVal =>
    q.Let(
        {
            path,
            pathArray: q.If(
                q.IsArray(q.Var("path")),
                q.Var("path"),
                DotNotationStringToArray(q.Var("path"))
            ),
        },
        q.Contains(q.Var("pathArray"), _in)
    )
