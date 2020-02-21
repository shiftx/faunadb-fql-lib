import { query as q, ExprVal, ExprArg } from "faunadb"

export const SelectRef = (doc: ExprArg): ExprVal => q.Select(["ref"], doc)
