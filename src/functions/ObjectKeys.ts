import { query as q, ExprVal, ExprArg } from "faunadb"

export const ObjectKeys = (object: ExprArg): ExprVal =>
    q.Map(q.ToArray(object), q.Lambda(["k", "v"], q.Var("k")))
