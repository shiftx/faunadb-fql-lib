import { PaginateReverse } from "./PaginateReverse"
import { query as q } from "faunadb"
import { createClient } from "./../../test/utils"
import { GetAll } from "./GetAll"

describe("GetAll", () => {
    const client = createClient()

    const items = []

    beforeAll(async () => {
        const a = await client.query(
            q.Create(q.Collection("Foos"), { data: { foo: "bar" } })
        )
        const b = await client.query(
            q.Create(q.Collection("Foos"), { data: { bar: "foo" } })
        )
        items.push(a)
        items.push(b)
    })

    test("get all works with Documents()", async () => {
        const res = await client.query(
            GetAll(
                PaginateReverse(q.Documents(q.Collection("Foos")), { size: 2 })
            )
        )
        const [b, a] = res.data
        expect(a.ref.id).toBe(items[0].ref.id)
        expect(b.ref.id).toBe(items[1].ref.id)
    })
})
