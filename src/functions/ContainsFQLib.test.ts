import { ContainsFQLib } from "./ContainsFQLib"
import { createClient } from "../../test/utils"

describe("ContainsFQLib", () => {
    const client = createClient()
    test("works on objects", async () => {
        const query = ContainsFQLib("foo.bar.fooBar", {
            foo: { bar: { fooBar: "test" } },
        })
        const res = await client.query(query)
        expect(res).toBe(true)
    })

    test("fails on object when key is missing and no default", async () => {
        const query = ContainsFQLib("foo.bar", { no: "key" })
        const res = await client.query(query)
        expect(res).toBe(false)
    })

    test("works on arrays", async () => {
        const query = ContainsFQLib("3.2.1", [0, 1, 2, [0, 1, ["foo", "bar"]]])
        const res = await client.query(query)
        expect(res).toBe(true)
    })

    test("fails on array when index not exists", async () => {
        const query = ContainsFQLib("3", [0, 1, 2])
        const res = await client.query(query)
        expect(res).toBe(false)
    })
})
