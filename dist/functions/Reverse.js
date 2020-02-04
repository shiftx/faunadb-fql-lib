"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const faunadb_1 = require("faunadb");
exports.Reverse = (arr) => faunadb_1.query.Reduce(faunadb_1.query.Lambda(["acc", "val"], faunadb_1.query.Append(faunadb_1.query.Var("acc"), [faunadb_1.query.Var("val")])), [], arr);
