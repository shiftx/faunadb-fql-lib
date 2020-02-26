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
        const res = await client.query(DeleteAt(doc.ref, doc.ts + 1000))
        expect(res.action).toBe("delete")
        expect(res.ts).toBe(ts + 1000)
    })

    test("Fails to delete at a time the document did not exist", async () => {
        const doc = await client.query(
            q.Create(q.Collection("Foos"), { data: { foo: "bar" } })
        )
        const err = await client
            .query(DeleteAt(doc.ref, doc.ts - 1000))
            .catch(err => err)
        const error = err.requestResult.responseContent.errors[0]
        expect(error.description).toBe(
            "The item you are trying to delete does not exist at given ts"
        )
    })
})
