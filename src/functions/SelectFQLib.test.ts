import { query as q } from "faunadb"
import { SelectFQLib } from "./SelectFQLib"
import { createClient } from "../../test/utils"

describe("SelectFQLib", () => {
    const client = createClient()
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

    test("fallback does not evaluate if there is a match", async () => {
        const [ref1, ref2, ref3] = await client.query([
            q.Ref(q.Collection("Foos"), q.NewId()),
            q.Ref(q.Collection("Foos"), q.NewId()),
            q.Ref(q.Collection("Foos"), q.NewId()),
        ])
        const query = {
            select: q.Select(
                ["foo"],
                { foo: "bar" },
                q.Create(ref1, { data: { foo: "this will be created" } })
            ), // This has been fixed in the latest version of Fauna to work
            selectFQLib: SelectFQLib(
                ["foo"],
                { foo: "bar" },
                q.Create(ref2, { data: { foo: "this should not be created" } })
            ),
            if: q.If(
                true,
                null,
                q.Create(ref3, { data: { foo: "this should not be created" } })
            ),
            ref1Exists: q.Exists(ref1),
            ref2Exists: q.Exists(ref2),
            ref3Exists: q.Exists(ref3),
        }

        const res = await client.query(query)
        expect(res.ref1Exists).toBe(false)
        expect(res.ref2Exists).toBe(false)
        expect(res.ref3Exists).toBe(false)
    })
})
