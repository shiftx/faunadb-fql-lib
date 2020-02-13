import { query as q } from "faunadb"
import { ExprVal, ExprArg } from "../types/fauna"

export const PageToObject = (page: ExprArg): ExprVal =>
    /*
        Is this a bug? Using as a feature in this case.
        q.Merge({}, { foo: null })            // => {}
        q.Merge({foo: null }, { foo: null })  // => {}
        q.Merge({foo: null }, {})             // => { foo: null }
    */
    q.Merge(
        {},
        {
            before: q.Select(["before"], page, null),
            after: q.Select(["after"], page, null),
            data: q.Select(["data"], page),
        }
    )
