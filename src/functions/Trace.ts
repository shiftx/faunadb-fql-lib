import { query as q, ExprArg, ExprVal } from "faunadb"

export const Trace = (key: string, expr: ExprArg): ExprVal =>
    q.Let({ [key]: expr }, q.Var(key))
