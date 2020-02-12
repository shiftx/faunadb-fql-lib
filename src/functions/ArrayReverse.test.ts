import { ArrayReverse } from "./ArrayReverse"
import { createClient } from "../../test/utils"

describe("ArrayReverse", () => {
    const client = createClient()
    test("works on objects", async () => {
        const query = ArrayReverse([1, 2, 3])
        const res = await client.query(query)
        expect(res).toStrictEqual([3, 2, 1])
    })
})
