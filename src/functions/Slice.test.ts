import { createClient } from "../../test/utils"
import { Slice } from "./Slice"

describe("Slice", () => {
    const client = createClient()

    const testArray = [1, 2, 3, 4, 5, 6]

    test("with start and end index", async () => {
        const query = Slice(testArray, 1, 2)
        const res = await client.query(query)
        expect(res).toStrictEqual([2, 3])
    })

    test("with start index", async () => {
        const query = Slice(testArray, 1)
        const res = await client.query(query)
        expect(res).toStrictEqual([2, 3, 4, 5, 6])
    })
})
