import { query as q } from "faunadb"

export const CreateAt = (ref, params, ts) =>
    q.Let(
        {
            ref: q.If(q.IsCollection(ref), q.Ref(ref, q.NewId()), ref),
        },
        q.Do(
            q.If(q.Exists(q.Events(q.Var("ref"))), q.Abort("asdf"), null),
            q.Insert(q.Var("ref"), ts, "create", params),
            q.Get(q.Var("ref"), ts)
        )
    )
