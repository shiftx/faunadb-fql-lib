"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const faunadb_1 = require("faunadb");
exports.MapExtended = (collection, lambdaExpr) => faunadb_1.query.If(faunadb_1.query.IsArray(collection), faunadb_1.query.Map(faunadb_1.query.Select(["data"], collection), lambdaExpr), faunadb_1.query.Let({
    data: faunadb_1.query.Map(faunadb_1.query.Select(["data"], collection), lambdaExpr),
}, faunadb_1.query.Merge(collection, { data: faunadb_1.query.Var("data") })));
