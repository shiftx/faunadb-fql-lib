import { query as q, ExprArg, Lambda, ExprVal } from "faunadb"
import { PageToObject } from "./PageToObject"

export const MapExtended = (
    collection: ExprArg,
    lambdaExpr: ExprArg | Lambda
): ExprVal => {
    return q.If(
        q.IsArray(collection),
        q.Map(collection, lambdaExpr),
        q.Let(
            {
                data: q.Map(q.Select(["data"], collection), lambdaExpr),
            },
            q.Merge(PageToObject(collection), { data: q.Var("data") })
        )
    )
}
