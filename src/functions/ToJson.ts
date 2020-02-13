import { query as q, ExprArg, ExprVal } from "faunadb"

export const ToJson = (expr: ExprArg): ExprVal => q.Format("%@", expr)
