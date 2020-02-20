import { PaginateReverse } from "./PaginateReverse"
import { query as q } from "faunadb"
import { createClient } from "./../../test/utils"
import { GetAll } from "./GetAll"

describe("GetAll", () => {
    const client = createClient()

    test("get all works with Documents()", async () => {
        const res = await client.query({
            items: [
                q.Create(q.Collection("Foos"), { data: { foo: "bar" } }),
                q.Create(q.Collection("Foos"), { data: { bar: "foo" } }),
            ],
            page: GetAll(
                PaginateReverse(q.Documents(q.Collection("Foos")), { size: 2 })
            ),
        })
        const { page, items } = res

        const [b, a] = items
        expect(a.ref.id).toBe(page.data[0].ref.id)
        expect(b.ref.id).toBe(page.data[1].ref.id)
    })
})
