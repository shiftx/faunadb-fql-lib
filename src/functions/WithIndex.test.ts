import { query as q } from "faunadb"
import { createClient } from "../../test/utils"
import { WithIndex } from "./WithIndex"

describe("WithIndex", () => {
    const client = createClient()
    test("WithIndex on array", async () => {
        const arr = ["a", "b", "c"]
        const query = WithIndex(arr)
        const res = await client.query(query)
        expect(res).toStrictEqual([
            ["a", 0],
            ["b", 1],
            ["c", 2],
        ])
    })

    test("WithIndex in map", async () => {
        const arr = ["a", "b", "c"]
        const query = q.Map(WithIndex(arr), q.Lambda(["val", "i"], q.Var("i")))
        const res = await client.query(query)
        expect(res).toStrictEqual([0, 1, 2])
    })
})
