import { query as q } from "faunadb"
import { ExprVal, ExprArg } from "../types/fauna"

export const ArrayReverse = (array: [] | ExprArg): ExprVal =>
    q.Reduce(
        q.Lambda(["acc", "val"], q.Append(q.Var("acc"), [q.Var("val")])),
        [],
        array
    )
