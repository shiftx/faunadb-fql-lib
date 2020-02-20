import { query as q } from "faunadb"

const nestedMerger = count => {
    return q.Lambda(
        ["key1", "a1", "b1"],
        q.If(
            q.And(q.IsObject(q.Var("a1")), q.IsObject(q.Var("b1"))),
            q.Merge(
                q.Var("a1"),
                q.Var("b1"),
                count > 0 ? nestedMerger(count - 1) : undefined
            ),
            q.Var("b1")
        )
    )
}

export const DeepMerge = (obj1, obj2, mergeDepth = 4) =>
    q.Merge(
        obj1,
        obj2,
        mergeDepth > 1 ? nestedMerger(mergeDepth - 2) : undefined
    )
