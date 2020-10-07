import { query as q, ExprVal, ExprArg } from "faunadb"

export const InsertAtIndex = (
    arr: [] | ExprArg,
    index: number | ExprArg,
    item: ExprArg
): ExprVal =>
    q.Let(
        {
            arr,
            index,
            item,
        },
        q.If(
            q.Equals(-1, q.Var("index")),
            q.Append([q.Var("item")], q.Var("arr")),
            q.Let(
                {
                    start: q.Take(q.Var("index"), q.Var("arr")),
                    end: q.Drop(q.Var("index"), q.Var("arr")),
                },
                q.Prepend(
                    q.Prepend(q.Var("start"), [q.Var("item")]),
                    q.Var("end")
                )
            )
        )
    )
