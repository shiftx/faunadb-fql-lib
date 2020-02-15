import { query as q, ExprVal, ExprArg } from "faunadb"

export const PageToObject = (page: ExprArg): ExprVal =>
    q.Merge(
        {},
        {
            before: q.Select(["before"], page, null),
            after: q.Select(["after"], page, null),
            data: q.Select(["data"], page),
        }
    )
