import { query as q } from "faunadb"
import { Sort } from "./Sort"
import { createClient } from "../../test/utils"

describe("Sort", () => {
    const client = createClient()
    test("it defults to split on .", async () => {
        const query = Sort([10, 2, 7, 3, 4, 1])
        const res = await client.query(query)
        expect(res).toStrictEqual([1, 2, 3, 4, 7, 10])
    })

    test("split with -", async () => {
        const query = Sort(["foo", "foa", "jar", "bar", "zar"])
        const res = await client.query(query)
        expect(res).toStrictEqual(["bar", "foa", "foo", "jar", "zar"])
    })

    test("split with ' ' (space)", async () => {
        const query = Sort([{ id: "764" }, { id: "7" }, { id: "19999" }], val =>
            q.ToNumber(q.Select(["id"], val))
        )
        const res = await client.query(query)
        expect(res).toStrictEqual([{ id: "7" }, { id: "764" }, { id: "19999" }])
    })
})
