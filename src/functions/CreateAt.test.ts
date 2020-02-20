import { query as q } from "faunadb"
import { createClient } from "../../test/utils"
import { CreateAt } from "./CreateAt"

describe("CreateAt", () => {
    const client = createClient()
    test("Create a new document at a specific time", async () => {
        const ts = 150000000000000
        const doc = await client.query(
            CreateAt(q.Collection("Foos"), { data: { foo: "bar" } }, ts)
        )
        expect(doc.ts).toBe(ts)
        expect(doc.data.foo).toBe("bar")
    })

    test("Create a new document with a doc ref a specific time", async () => {
        const ts = 150000000000000
        const doc = await client.query(
            CreateAt(
                q.Ref(q.Collection("Foos"), q.NewId()),
                { data: { foo: "bar" } },
                ts
            )
        )
        expect(doc.ts).toBe(ts)
        expect(doc.data.foo).toBe("bar")
    })
})
