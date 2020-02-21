import { query as q } from "faunadb"

export const CreateAt = (ref, ts, params) =>
    q.Let(
        {
            ref: q.If(q.IsCollection(ref), q.Ref(ref, q.NewId()), ref),
        },
        q.Do(
            q.If(
                q.Exists(q.Events(q.Var("ref"))),
                q.Abort(
                    "The item you are trying to insert (CreateAt) already exists"
                ),
                null
            ),
            q.Insert(q.Var("ref"), ts, "create", params),
            q.Get(q.Var("ref"), ts)
        )
    )
