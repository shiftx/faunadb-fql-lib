import { query as q, ExprVal, ExprArg } from "faunadb"

export const ReplaceAtIndex = (
    arr: [] | ExprArg,
    index: number | ExprArg,
    item: ExprArg
): ExprVal =>
    q.Let(
        {
            arr,
            index,
            item,
            length: q.Count(q.Var('arr')),
            start: q.Take(q.Var("index"), q.Var("arr")),
            end: q.Drop(q.Add(q.Var("index"), 1), q.Var("arr")),
        },
        q.Do(
            q.If(q.LT(q.Var('index'), 0), q.Abort("the index provided to ReplaceAtIndex can't be less than 0"), null),
            q.If(q.GTE(q.Var('index'), q.Var('length')), q.Abort("the index provided to ReplaceAtIndex is out of range"), null),
            q.Prepend(
                q.Prepend(q.Var("start"), [q.Var("item")]),
                q.Var("end")
            )
        )
    )
