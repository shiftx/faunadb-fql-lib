"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const faunadb_1 = require("faunadb");
const fqlLibFunctions = __importStar(require("./fql-lib"));
const checkNamingCollisions_1 = require("./lib/checkNamingCollisions");
checkNamingCollisions_1.checkNamingCollisions(faunadb_1.query, fqlLibFunctions);
const query = Object.assign(Object.assign({}, faunadb_1.query), fqlLibFunctions);
exports.query = query;
