import { checkNamingCollisions } from "./checkNamingCollisions"

test("faunadb functions should exists on query", () => {
    const faunaFuncs = { Map: () => {} }
    const fqlLibFuncs = { Map: () => {} }
    expect(() => {
        checkNamingCollisions(faunaFuncs, fqlLibFuncs)
    }).toThrow()
})
