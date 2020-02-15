import { query as faunaFunctions } from "faunadb"
import * as fqlLibFunctions from "./fql-lib"
import { checkNamingCollisions } from "./lib/checkNamingCollisions"

checkNamingCollisions(faunaFunctions, fqlLibFunctions)

const query = {
    ...faunaFunctions,
    ...fqlLibFunctions,
}

export { query }
