import { query as q, ExprVal, ExprArg } from "faunadb"
import { StringSplit } from "../StringSplit"

export const DotNotationStringToArray = (string: ExprArg): ExprVal =>
    q.Map(
        StringSplit(string),
        q.Lambda(
            "str",
            q.If(
                q.ContainsStrRegex(q.Var("str"), "^[0-9]$"),
                q.ToInteger(q.Var("str")),
                q.Var("str")
            )
        )
    )
