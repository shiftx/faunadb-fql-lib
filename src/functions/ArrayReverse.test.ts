import { ArrayReverse } from "./ArrayReverse"

describe("ArrayReverse", () => {
    const client = global.faunaClient
    test("works on objects", async () => {
        const query = ArrayReverse([1, 2, 3])
        const res = await client.query(query)
        expect(res).toStrictEqual([3, 2, 1])
    })
})
