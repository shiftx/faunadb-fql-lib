import { query as q, ExprArg, ExprVal } from "faunadb"

export const ArrayReverse = (arr: [] | ExprArg): ExprVal =>
    q.Reduce(
        q.Lambda(["acc", "val"], q.Append(q.Var("acc"), [q.Var("val")])),
        [],
        arr
    )
