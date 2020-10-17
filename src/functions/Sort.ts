import { query as q } from "faunadb"
import { InsertAtIndex } from "./InsertAtIndex"
import { Find } from "./Find"
import { WithIndex } from "./WithIndex"

export const Sort = (arr, selectFn = v => v) => {
    return q.Reduce(
        q.Lambda(
            ["result", "item"],
            q.Let(
                {
                    length: q.Count(q.Var("result")),
                    index: q.If(
                        q.Equals(0, q.Var("length")),
                        0,
                        q.Select(
                            1,
                            Find(
                                WithIndex(q.Var("result")),
                                q.Lambda(
                                    ["exItem", "index"],
                                    q.GT(
                                        selectFn(q.Var("exItem")),
                                        selectFn(q.Var("item"))
                                    )
                                )
                            ),
                            q.Var("length")
                        )
                    ),
                },
                InsertAtIndex(q.Var("result"), q.Var("index"), q.Var("item"))
            )
        ),
        [],
        arr
    )
}
