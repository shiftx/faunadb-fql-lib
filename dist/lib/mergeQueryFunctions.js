"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mergeQueryFunctions = (faunaFunctions, fqlLibFunctions) => {
    Object.keys(fqlLibFunctions).forEach(key => {
        if (faunaFunctions[key])
            throw new Error(`faunadb and faunadb-fql-lib both contain the ${key} function. Have you just updated faunadb? Make sure you have the latest version of faunadb-fql-lib.`);
    });
    return Object.assign(Object.assign({}, fqlLibFunctions), faunaFunctions);
};
