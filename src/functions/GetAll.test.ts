import { PaginateReverse } from "./PaginateReverse"
import { query as q } from "faunadb"
import { createClient } from "./../../test/utils"
import { GetAll } from "./GetAll"

describe("GetAll", () => {
    const client = createClient()

    test("get all works with Documents()", async () => {
        const res = await client.query(
            q.Let(
                {
                    doc1: q.Create(q.Collection("Foos"), {
                        data: { foo: "bar" },
                    }),
                    doc2: q.Create(q.Collection("Foos"), {
                        data: { bar: "foo" },
                    }),
                },
                {
                    doc1: q.Var("doc1"),
                    doc2: q.Var("doc2"),
                    page: GetAll(
                        PaginateReverse(q.Documents(q.Collection("Foos")), {
                            size: 2,
                        })
                    ),
                }
            )
        )

        const { doc1, doc2, page } = res

        expect(doc1.ref.id).toBe(page.data[1].ref.id)
        expect(doc2.ref.id).toBe(page.data[0].ref.id)
    })
})
