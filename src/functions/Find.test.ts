import { Find } from "./Find"
import { createClient } from "../../test/utils"
import { query as q } from "faunadb"

describe("Find", () => {
    const client = createClient()
    test("find and return first result from array", async () => {
        const query = Find(
            [{ id: "1" }, { id: "2" }, { id: "3" }],
            q.Lambda("item", q.Equals("3", q.Select(["id"], q.Var("item"))))
        )
        const res = await client.query(query).catch(err => err)
        expect(res).toStrictEqual({ id: "3" })
    })
})
