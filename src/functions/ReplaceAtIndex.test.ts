import { ReplaceAtIndex } from "./ReplaceAtIndex"
import { createClient } from "../../test/utils"

describe("InsertAtIndex", () => {
    const client = createClient()
    const array = ["a", "b", "c", "d"]
    test("replace at index that exists", async () => {
        const query = ReplaceAtIndex(array, 2, "foo")
        const res = await client.query(query)
        expect(res).toStrictEqual(["a", "b", "foo", "d"])
    })

    test("replace at index -1", async () => {
        const query = ReplaceAtIndex(array, -1, "foo")
        const res = await client.query(query).catch(err => err)
        const err = res.requestResult.responseContent.errors[0]
        expect(err.description).toBe("the index provided to ReplaceAtIndex can't be less than 0")
    })

    test("replace at index greater than array length", async () => {
        const query = ReplaceAtIndex(array, 4, "foo")
        const res = await client.query(query).catch(err => err)
        const err = res.requestResult.responseContent.errors[0]
        expect(err.description).toBe("the index provided to ReplaceAtIndex is out of range")
    })
})
