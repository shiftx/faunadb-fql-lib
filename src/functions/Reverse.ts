import { query as q } from "faunadb"

export const Reverse = (arr: []) =>
    q.Reduce(
        q.Lambda(["acc", "val"], q.Append(q.Var("acc"), [q.Var("val")])),
        [],
        arr
    )
