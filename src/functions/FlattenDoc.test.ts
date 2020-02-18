import { query as q } from "faunadb"
import { FlattenDoc } from "./FlattenDoc"
import { createClient } from "../../test/utils"

describe("FlattenDoc", () => {
    const client = createClient()
    test("test flatten doc on regular document", async () => {
        const query = FlattenDoc(
            q.Create(q.Collection("Foos"), { data: { bar: "foo", foo: "bar" } })
        )
        const res = await client.query(query).catch(err => err)
        expect(res.bar).toBe("foo")
        expect(res.data).toBeFalsy()
        expect(new Set(Object.keys(res))).toEqual(
            new Set(["ref", "ts", "bar", "foo"])
        )
    })
})
