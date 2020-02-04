import { query } from 'faunadb';

const Reverse = (arr) => query.Reduce(query.Lambda(["acc", "val"], query.Append(query.Var("acc"), [query.Var("val")])), [], arr);

export { Reverse };
