import { SelectFQLib } from "./SelectFQLib"

describe("SelectFQLib", () => {
    const client = global.faunaClient
    test("works on objects", async () => {
        const query = SelectFQLib("foo.bar.fooBar", {
            foo: { bar: { fooBar: "test" } },
        })
        const res = await client.query(query)
        expect(res).toBe("test")
    })

    test("fails on object when key is missing and no default", async () => {
        const query = SelectFQLib("foo.bar", { no: "key" })
        const err = await client.query(query).catch(err => err)
        expect(err.name).toBe("NotFound")
        expect(err.message).toBe("value not found")
        expect(err.requestResult.responseContent.errors[0].description).toBe(
            "Value not found at path [foo,bar]."
        )
    })

    test("works on arrays", async () => {
        const query = SelectFQLib("3.2.1", [0, 1, 2, [0, 1, ["foo", "bar"]]])
        const res = await client.query(query)
        expect(res).toBe("bar")
    })

    test("fails on array when index not exists", async () => {
        const query = SelectFQLib("3", [0, 1, 2])
        const err = await client.query(query).catch(err => err)
        expect(err.name).toBe("NotFound")
        expect(err.message).toBe("value not found")
        expect(err.requestResult.responseContent.errors[0].description).toBe(
            "Value not found at path [3]."
        )
    })

    test("works on combination of array and object", async () => {
        const query = SelectFQLib("3.2.foo", [0, 1, 2, [0, 1, { foo: "bar" }]])
        const res = await client.query(query)
        expect(res).toBe("bar")
    })

    test("works with default value", async () => {
        const query = SelectFQLib("missing", { foo: "bar" }, "fallback")
        const res = await client.query(query)
        expect(res).toBe("fallback")
    })

    // test("fallback does not evaluate if there is a match", async () => {
    //     const query = SelectFL("missing", { foo: "bar" }, q.Create())
    //     const res = await client.query(query)
    //     expect(res).toBe("fallback")
    // })
})
