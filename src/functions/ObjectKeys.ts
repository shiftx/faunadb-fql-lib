import { query as q } from "faunadb"
import { ExprVal, ExprArg } from "../types/fauna"

export const ObjectKeys = (object: ExprArg): ExprVal =>
    q.Map(q.ToArray(object), q.Lambda(["k", "v"], q.Var("k")))
