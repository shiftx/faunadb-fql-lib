import { query as q } from "faunadb"
import { createClient } from "../../test/utils"
import { DeleteAt } from "./DeleteAt"

describe("DeleteAt", () => {
    const client = createClient()
    test("Delete a document at a specific time", async () => {
        const doc = await client.query(
            q.Create(q.Collection("Foos"), { data: { foo: "bar" } })
        )
        const ts = doc.ts

        const res = await client.query(DeleteAt(doc.ref, doc.ts - 1000))
        expect(res.action).toBe("delete")
        expect(res.ts).toBe(ts - 1000)
    })
})
