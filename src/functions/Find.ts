import { query as q, ExprVal, ExprArg } from "faunadb"

export const Find = (arr: [] | ExprArg, lambda: ExprArg): ExprVal =>
    q.Select([0], q.Filter(arr, lambda), null)
