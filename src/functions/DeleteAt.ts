import { query as q } from "faunadb"

export const DeleteAt = (ref, ts) =>
    q.If(
        q.Exists(ref, ts),
        q.Insert(ref, ts, "delete", {}),
        q.Abort("The item you are trying to delete does not exist at given ts")
    )
