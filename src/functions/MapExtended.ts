import { query as q, ExprArg, Lambda } from "faunadb"

export const MapExtended = (
    collection: ExprArg,
    lambdaExpr: ExprArg | Lambda
) =>
    q.If(
        q.IsArray(collection),
        q.Map(q.Select(["data"], collection), lambdaExpr),
        q.Let(
            {
                data: q.Map(q.Select(["data"], collection), lambdaExpr),
            },
            q.Merge(collection, { data: q.Var("data") })
        )
    )
