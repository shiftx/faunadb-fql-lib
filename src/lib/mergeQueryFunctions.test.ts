import { mergeQueryFunctions } from "./mergeQueryFunctions"

test("faunadb functions should exists on query", () => {
    const faunaFuncs = { Map: () => {} }
    const fqlLibFuncs = { Map: () => {} }
    expect(() => {
        mergeQueryFunctions(faunaFuncs, fqlLibFuncs)
    }).toThrow()
})
