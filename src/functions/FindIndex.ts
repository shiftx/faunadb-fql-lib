import { query as q, ExprVal, ExprArg } from "faunadb"
import { WithIndex } from "./WithIndex"

export const FindIndex = (arr: [] | ExprArg, lambda: ExprArg): ExprVal =>
    q.Let(
        {
            result: q.Select([0], q.Filter(arr, lambda), null),
        },
        q.If(
            q.IsNull(q.Var("result")),
            null,
            q.Select(
                [0, 1],
                q.Filter(
                    WithIndex(arr),
                    q.Lambda(
                        ["item", "index"],
                        q.Equals(q.Var("item"), q.Var("result"))
                    )
                )
            )
        )
    )
