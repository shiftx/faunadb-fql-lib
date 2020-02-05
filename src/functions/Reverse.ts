import { query as q, ExprVal } from "faunadb"

export const Reverse = (arr: [] | ExprVal) =>
    q.Reduce(
        q.Lambda(["acc", "val"], q.Append(q.Var("acc"), [q.Var("val")])),
        [],
        arr
    )
