import { query as q, ExprVal, ExprArg } from "faunadb"
import { MapFQLib } from "./MapFQLib"

export const GetAll = (expr: ExprArg): ExprVal =>
    MapFQLib(expr, q.Lambda("ref", q.Get(q.Var("ref"))))
