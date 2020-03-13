import { query as q } from "faunadb"
import { Flatten } from "./Flatten"
import { createClient } from "../../test/utils"

describe("Flatten", () => {
    const client = createClient()
    test("test flatten doc on regular document", async () => {
        const query = Flatten([["a", "b"], ["c", "d"], "e"])
        const res = await client.query(query).catch(err => err)
        expect(res).toStrictEqual(["a", "b", "c", "d", "e"])
    })
})
