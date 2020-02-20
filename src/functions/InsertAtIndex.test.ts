import { InsertAtIndex } from "./InsertAtIndex"
import { createClient } from "../../test/utils"

describe("InsertAtIndex", () => {
    const client = createClient()
    test("insert at index", async () => {
        const query = InsertAtIndex([1, 3, 4], 1, 2)
        const res = await client.query(query)
        expect(res).toStrictEqual([1, 2, 3, 4])
    })
})
