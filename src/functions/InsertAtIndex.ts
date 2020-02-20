import { query as q, ExprVal, ExprArg } from "faunadb"

export const InsertAtIndex = (
    arr: [] | ExprArg,
    index: number,
    item: ExprArg
): ExprVal =>
    q.Let(
        {
            start: q.Take(index, arr),
            end: q.Drop(index, arr),
        },
        q.Prepend(q.Prepend(q.Var("start"), [item]), q.Var("end"))
    )
