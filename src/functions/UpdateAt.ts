import { query as q } from "faunadb"
import { DeepMerge } from "./DeepMerge"

export const UpdateAt = (ref, ts, params) =>
    q.Let(
        {
            docAt: q.Get(ref, ts),
            newData: DeepMerge(
                q.Select(["data"], q.Var("docAt")),
                q.Select(["data"], params)
            ),
            eventsToUpdate: q.Paginate(q.Events(ref), {
                after: q.Add(1, ts),
                size: 1000,
            }),
        },
        q.Do(
            q.Insert(ref, ts, "update", {
                data: q.Var("newData"),
            }),
            q.If(
                q.ContainsPath(["after"], q.Var("eventsToUpdate")),
                q.Abort(
                    "UpdateAt does not currently support rewrtiting history deeper than 1000"
                ),
                q.Reduce(
                    q.Lambda(
                        ["data", "event"],
                        q.Let(
                            {
                                mergedData: DeepMerge(
                                    q.Var("data"),
                                    q.Select(["data"], q.Var("event"))
                                ),
                                res: q.Insert(
                                    ref,
                                    q.Select(["ts"], q.Var("event")),
                                    "update",
                                    {
                                        data: q.Var("mergedData"),
                                    }
                                ),
                            },
                            q.Var("mergedData")
                        )
                    ),
                    q.Var("newData"),
                    q.Select(["data"], q.Var("eventsToUpdate"))
                )
            ),
            q.Get(ref, ts)
        )
    )
