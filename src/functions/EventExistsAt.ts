import { query as q } from "faunadb"

export const EventExistsAt = (ref, ts) =>
    q.At(
        ts,
        q.If(q.Exists(ref), q.Equals(ts, q.Select(["ts"], q.Get(ref))), false)
    )
