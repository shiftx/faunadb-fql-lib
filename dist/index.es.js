import { query } from 'faunadb';

const MapExtended = (collection, lambdaExpr) => query.If(query.IsArray(collection), query.Map(query.Select(["data"], collection), lambdaExpr), query.Let({
    data: query.Map(query.Select(["data"], collection), lambdaExpr),
}, query.Merge(collection, { data: query.Var("data") })));

const Reverse = (arr) => query.Reduce(query.Lambda(["acc", "val"], query.Append(query.Var("acc"), [query.Var("val")])), [], arr);

const PaginateReverse = (set, opts) => query.Let({
    after: query.Select(["before"], opts, null),
    before: query.Select(["after"], opts, null),
    size: query.Select(["size"], opts, 64),
    result: query.If(query.And(query.IsNull(query.Var("after")), query.IsNull(query.Var("before"))), query.Paginate(set, { before: [null], size: query.Var("size") }), query.If(query.IsNull(query.Var("after")), query.Paginate(set, {
        before: query.Var("before"),
        size: query.Var("size"),
    }), query.Paginate(set, {
        after: query.Var("after"),
        size: query.Var("size"),
    }))),
}, query.Let({
    dataObj: {
        data: Reverse(query.Select(["data"], query.Var("result"))),
    },
    afterObj: query.If(query.Contains(["before"], query.Var("result")), { after: query.Select(["before"], query.Var("result")) }, {}),
    beforeObj: query.If(query.Or(query.Not(query.Contains(["after"], query.Var("result"))), query.Equals([null], query.Select(["after"], query.Var("result"), null))), {}, { before: query.Select(["after"], query.Var("result")) }),
}, query.Merge(query.Merge(query.Var("afterObj"), query.Var("beforeObj")), query.Var("dataObj"))));

export { MapExtended, PaginateReverse, Reverse };
