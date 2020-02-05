import { query as q, ExprVal, Lambda } from "faunadb"

export const MapFakePage = (fakePage: ExprVal, lambda: Lambda) =>
    q.Let(
        {
            data: q.Map(q.Select(["data"], fakePage), lambda),
        },
        q.Merge(fakePage, { data: q.Var("data") })
    )
