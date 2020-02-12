import { query as q, ExprArg, ExprVal } from "faunadb"
import { MapFQLib } from "./MapFQLib"

export const GetAll = (expr: ExprArg): ExprVal =>
    MapFQLib(expr, q.Lambda("ref", q.Get(q.Var("ref"))))
