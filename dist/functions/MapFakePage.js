"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const faunadb_1 = require("faunadb");
exports.MapFakePage = (fakePage, lambda) => faunadb_1.query.Let({
    data: faunadb_1.query.Map(faunadb_1.query.Select(["data"], fakePage), lambda),
}, faunadb_1.query.Merge(fakePage, { data: faunadb_1.query.Var("data") }));
