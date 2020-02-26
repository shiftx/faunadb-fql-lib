import { InsertAtIndex } from "./InsertAtIndex"
import { createClient } from "../../test/utils"

describe("InsertAtIndex", () => {
    const client = createClient()
    const array = ["a", "b", "c", "d"]
    test("insert at index", async () => {
        const query = InsertAtIndex(array, 2, "foo")
        const res = await client.query(query)
        expect(res).toStrictEqual(["a", "b", "foo", "c", "d"])
    })

    test("insert at 0", async () => {
        const query = InsertAtIndex(array, 0, "foo")
        const res = await client.query(query)
        expect(res).toStrictEqual(["foo", "a", "b", "c", "d"])
    })

    test("insert at -1", async () => {
        const query = InsertAtIndex(array, -1, "foo")
        const res = await client.query(query)
        expect(res).toStrictEqual(["a", "b", "c", "d", "foo"])
    })
})
