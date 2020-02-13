import { query as q } from "faunadb"
import { ExprVal, ExprArg } from "../types/fauna"
import { PageToObject } from "./PageToObject"

export const MapFQLib = (collection: ExprArg, lambdaExpr: ExprArg): ExprVal => {
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
