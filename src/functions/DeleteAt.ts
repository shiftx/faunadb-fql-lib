import { query as q } from "faunadb"

export const DeleteAt = (ref, ts) =>
    q.Let(
        {
            ref: q.If(q.IsCollection(ref), q.Ref(ref, q.NewId()), ref),
        },
        q.Do(
            q.If(
                q.Exists(q.Events(q.Var("ref")), ts),
                q.Abort("The item you are trying to delete does not exist"),
                null
            ),
            q.Insert(q.Var("ref"), ts, "delete", {})
        )
    )
