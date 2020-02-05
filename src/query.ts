import { query as faunaFunctions } from "faunadb"
import * as fqlLibFunctions from "./fql-lib"
import { mergeQueryFunctions } from "./lib/mergeQueryFunctions"

const query = mergeQueryFunctions(faunaFunctions, fqlLibFunctions)

export { query }
