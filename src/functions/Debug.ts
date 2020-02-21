import { query as q, ExprArg, ExprVal } from "faunadb"
import { ToJson } from "./ToJson"

export const Debug = (expr: ExprArg): ExprVal => q.Abort(ToJson(expr))
