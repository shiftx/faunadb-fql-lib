import { query as q, ExprVal, ExprArg } from "faunadb"

export const ArrayReverse = (array: [] | ExprArg): ExprVal =>
    q.Reduce(
        q.Lambda(["acc", "val"], q.Append(q.Var("acc"), [q.Var("val")])),
        [],
        array
    )
