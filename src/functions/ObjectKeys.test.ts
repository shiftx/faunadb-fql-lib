import { ObjectKeys } from "./ObjectKeys"
import { createClient } from "../../test/utils"

describe("ObjectKeys", () => {
    const client = createClient()
    test("get keys as array from object", async () => {
        const query = ObjectKeys({ foo: "1", bar: "2" })
        const res = await client.query(query)
        expect(res).toStrictEqual(["foo", "bar"])
    })
})
