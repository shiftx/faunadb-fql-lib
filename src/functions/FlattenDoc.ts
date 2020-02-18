import { query as q, ExprVal, ExprArg } from "faunadb"

export const FlattenDoc = (doc: ExprArg): ExprVal =>
    q.If(
        q.IsDoc(doc),
        q.Merge(q.Merge(doc, q.Select(["data"], doc, {})), { data: null }),
        q.Abort("Doc passed to FlattenDoc does not pass IsDoc check")
    )
