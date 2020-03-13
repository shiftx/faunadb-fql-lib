import { query as q, ExprVal, ExprArg } from "faunadb"

export const Flatten = (arr: ExprArg): ExprVal =>
    q.If(
        q.IsArray(arr),
        q.Reduce(
            q.Lambda(
                ["acc", "val"],
                q.Prepend(
                    q.Var("acc"),
                    q.If(q.IsArray(q.Var("val")), q.Var("val"), [q.Var("val")])
                )
            ),
            [],
            arr
        ),
        q.Abort("Flatten does not pass IsArray check")
    )
