import { query as q, ExprArg, ExprVal } from "faunadb"

export const StringSplit = (string: ExprArg, delimiter = "."): ExprVal =>
    q.If(
        q.Not(q.IsString(string)),
        q.Abort("SplitString only accept strings"),
        q.Map(
            q.FindStrRegex(string, q.Concat(["[^\\", delimiter, "]+"])),
            q.Lambda("res", q.Select(["data"], q.Var("res")))
        )
    )
