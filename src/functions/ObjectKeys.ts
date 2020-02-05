import { query as q, ExprArg, ExprVal } from "faunadb"

export const ObjectKeys = (object: ExprArg): ExprVal =>
    q.Map(q.ToArray(object), q.Lambda(["k", "v"], q.Var("k")))
