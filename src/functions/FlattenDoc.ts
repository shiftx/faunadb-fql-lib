import { query as q, ExprVal, ExprArg } from "faunadb"

export const FlattenDoc = (doc: ExprArg): ExprVal =>
    q.If(
        q.IsDoc(doc),
        q.Let(
            {
                data: q.Select(["data"], doc),
            },
            q.Merge(q.Merge(doc, { data: null }), q.Var("data"))
        ),
        q.Abort("Item passed to FlattenDoc does not pass IsDoc check")
    )
