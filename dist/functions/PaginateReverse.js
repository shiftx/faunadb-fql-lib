"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const faunadb_1 = require("faunadb");
const Reverse_1 = require("./Reverse");
exports.PaginateReverse = (set, opts) => faunadb_1.query.Let({
    after: faunadb_1.query.Select(["before"], opts, null),
    before: faunadb_1.query.Select(["after"], opts, null),
    size: faunadb_1.query.Select(["size"], opts, 64),
    result: faunadb_1.query.If(faunadb_1.query.And(faunadb_1.query.IsNull(faunadb_1.query.Var("after")), faunadb_1.query.IsNull(faunadb_1.query.Var("before"))), faunadb_1.query.Paginate(set, { before: [null], size: faunadb_1.query.Var("size") }), faunadb_1.query.If(faunadb_1.query.IsNull(faunadb_1.query.Var("after")), faunadb_1.query.Paginate(set, {
        before: faunadb_1.query.Var("before"),
        size: faunadb_1.query.Var("size"),
    }), faunadb_1.query.Paginate(set, {
        after: faunadb_1.query.Var("after"),
        size: faunadb_1.query.Var("size"),
    }))),
}, faunadb_1.query.Let({
    dataObj: {
        data: Reverse_1.Reverse(faunadb_1.query.Select(["data"], faunadb_1.query.Var("result"))),
    },
    afterObj: faunadb_1.query.If(faunadb_1.query.Contains(["before"], faunadb_1.query.Var("result")), { after: faunadb_1.query.Select(["before"], faunadb_1.query.Var("result")) }, {}),
    beforeObj: faunadb_1.query.If(faunadb_1.query.Or(faunadb_1.query.Not(faunadb_1.query.Contains(["after"], faunadb_1.query.Var("result"))), faunadb_1.query.Equals([null], faunadb_1.query.Select(["after"], faunadb_1.query.Var("result"), null))), {}, { before: faunadb_1.query.Select(["after"], faunadb_1.query.Var("result")) }),
}, faunadb_1.query.Merge(faunadb_1.query.Merge(faunadb_1.query.Var("afterObj"), faunadb_1.query.Var("beforeObj")), faunadb_1.query.Var("dataObj"))));
