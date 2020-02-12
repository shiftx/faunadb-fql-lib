import { query as q, ExprArg, ExprVal } from "faunadb"

export const Debug = (expr: ExprArg): ExprVal => q.Format("%@", expr)
