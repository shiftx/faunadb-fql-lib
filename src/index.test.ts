import { query } from "./index"

describe("query", () => {
    test("faunadb functions should exists on query", () => {
        expect(query.Map).toBeDefined()
        expect(query.MapFQLib).toBeDefined()
    })
})
