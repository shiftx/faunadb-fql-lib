import { query as query$1 } from 'faunadb';

const PageToObject = (page) => 
/*
    Is this a bug? Using as a feature in this case.
    q.Merge({}, { foo: null })            // => {}
    q.Merge({foo: null }, { foo: null })  // => {}
    q.Merge({foo: null }, {})             // => { foo: null }
*/
query$1.Merge({}, {
    before: query$1.Select(["before"], page, null),
    after: query$1.Select(["after"], page, null),
    data: query$1.Select(["data"], page),
});

const MapExtended = (collection, lambdaExpr) => {
    return query$1.If(query$1.IsArray(collection), query$1.Map(collection, lambdaExpr), query$1.Let({
        data: query$1.Map(query$1.Select(["data"], collection), lambdaExpr),
    }, query$1.Merge(PageToObject(collection), { data: query$1.Var("data") })));
};

const ObjectKeys = (object) => query$1.Map(query$1.ToArray(object), query$1.Lambda(["k", "v"], query$1.Var("k")));

const Reverse = (arr) => query$1.Reduce(query$1.Lambda(["acc", "val"], query$1.Append(query$1.Var("acc"), [query$1.Var("val")])), [], arr);

const PaginateReverse = (set, opts) => query$1.Let({
    after: query$1.Select(["before"], opts, null),
    before: query$1.Select(["after"], opts, null),
    size: query$1.Select(["size"], opts, 64),
    result: query$1.If(query$1.And(query$1.IsNull(query$1.Var("after")), query$1.IsNull(query$1.Var("before"))), query$1.Paginate(set, { before: [null], size: query$1.Var("size") }), query$1.If(query$1.IsNull(query$1.Var("after")), query$1.Paginate(set, {
        before: query$1.Var("before"),
        size: query$1.Var("size"),
    }), query$1.Paginate(set, {
        after: query$1.Var("after"),
        size: query$1.Var("size"),
    }))),
}, query$1.Let({
    dataObj: {
        data: Reverse(query$1.Select(["data"], query$1.Var("result"))),
    },
    afterObj: query$1.If(query$1.Contains(["before"], query$1.Var("result")), { after: query$1.Select(["before"], query$1.Var("result")) }, {}),
    beforeObj: query$1.If(query$1.Or(query$1.Not(query$1.Contains(["after"], query$1.Var("result"))), query$1.Equals([null], query$1.Select(["after"], query$1.Var("result"), null))), {}, { before: query$1.Select(["after"], query$1.Var("result")) }),
}, query$1.Merge(query$1.Merge(query$1.Var("afterObj"), query$1.Var("beforeObj")), query$1.Var("dataObj"))));



var fqlLibFunctions = /*#__PURE__*/Object.freeze({
    __proto__: null,
    MapExtended: MapExtended,
    ObjectKeys: ObjectKeys,
    PageToObject: PageToObject,
    PaginateReverse: PaginateReverse,
    Reverse: Reverse
});

const checkNamingCollisions = (faunaFunctions, fqlLibFunctions) => {
    Object.keys(fqlLibFunctions).forEach(key => {
        if (faunaFunctions[key])
            throw new Error(`faunadb and faunadb-fql-lib both contain the ${key} function. Have you just updated faunadb? Make sure you have the latest version of faunadb-fql-lib.`);
    });
    return Object.assign(Object.assign({}, fqlLibFunctions), faunaFunctions);
};

checkNamingCollisions(query$1, fqlLibFunctions);
const query = Object.assign(Object.assign({}, query$1), fqlLibFunctions);

export { MapExtended, ObjectKeys, PageToObject, PaginateReverse, Reverse, query };
