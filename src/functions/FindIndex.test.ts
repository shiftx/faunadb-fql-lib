import { FindIndex } from "./FindIndex"
import { createClient } from "../../test/utils"
import { query as q } from "faunadb"

describe("FindIndex", () => {
    const client = createClient()
    test("find and return first result from array", async () => {
        const query = FindIndex(
            [{ id: "1" }, { id: "2" }, { id: "3" }],
            q.Lambda("item", q.Equals("3", q.Select(["id"], q.Var("item"))))
        )
        const res = await client.query(query).catch(err => err)
        expect(res).toStrictEqual(2)
    })
})
