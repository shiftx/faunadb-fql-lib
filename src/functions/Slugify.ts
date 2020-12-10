import { query as q } from "faunadb"

export const Slugify = string =>
    q.LowerCase(q.ReplaceStrRegex(string, "(\\s|_)", "-"))
