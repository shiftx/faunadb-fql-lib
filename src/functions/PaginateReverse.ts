import { query as q } from "faunadb"
import { ExprVal, ExprArg } from "../types/fauna"
import { ArrayReverse } from "./ArrayReverse"

export const PaginateReverse = (set: ExprArg, opts: {} = {}): ExprVal =>
    q.Let(
        {
            after: q.Select(["before"], opts, null),
            before: q.Select(["after"], opts, null),
            size: q.Select(["size"], opts, 64),
            result: q.If(
                q.And(q.IsNull(q.Var("after")), q.IsNull(q.Var("before"))),
                q.Paginate(set, { before: [null], size: q.Var("size") }),
                q.If(
                    q.IsNull(q.Var("after")),
                    q.Paginate(set, {
                        before: q.Var("before"),
                        size: q.Var("size"),
                    }),
                    q.Paginate(set, {
                        after: q.Var("after"),
                        size: q.Var("size"),
                    })
                )
            ),
        },
        q.Let(
            {
                dataObj: {
                    data: ArrayReverse(q.Select(["data"], q.Var("result"))),
                },
                afterObj: q.If(
                    q.Contains(["before"], q.Var("result")),
                    { after: q.Select(["before"], q.Var("result")) },
                    {}
                ),
                beforeObj: q.If(
                    q.Or(
                        q.Not(q.Contains(["after"], q.Var("result"))),
                        q.Equals(
                            [null],
                            q.Select(["after"], q.Var("result"), null)
                        )
                    ),
                    {},
                    { before: q.Select(["after"], q.Var("result")) }
                ),
            },
            q.Merge(
                q.Merge(q.Var("afterObj"), q.Var("beforeObj")),
                q.Var("dataObj")
            )
        )
    )
