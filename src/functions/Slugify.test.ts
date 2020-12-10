import { Slugify } from "./Slugify"
import { createClient } from "../../test/utils"

describe("Slugify", () => {
    const client = createClient()
    test("Downcase and replace whitespace and `_` with `-`", async () => {
        const query = Slugify("Foo Bar_FooBar")
        const res = await client.query(query)
        expect(res).toStrictEqual("foo-bar-foobar")
    })
})
