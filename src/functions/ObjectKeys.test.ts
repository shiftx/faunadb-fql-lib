import { ObjectKeys } from "./ObjectKeys"

describe("ObjectKeys", () => {
    const client = global.faunaClient
    test("get keys as array from object", async () => {
        const query = ObjectKeys({ foo: "1", bar: "2" })
        const res = await client.query(query)
        expect(res).toStrictEqual(["foo", "bar"])
    })
})
