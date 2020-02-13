import { query as q } from "faunadb"
import { ExprVal, ExprArg } from "../types/fauna"
import { MapFQLib } from "./MapFQLib"

export const GetAll = (expr: ExprArg): ExprVal =>
    MapFQLib(expr, q.Lambda("ref", q.Get(q.Var("ref"))))
