import { StringSplit } from "./StringSplit"
import { createClient } from "../../test/utils"

describe("StringSplit", () => {
    const client = createClient()
    test("it defults to split on .", async () => {
        const query = StringSplit("foo.bar.fooBar")
        const res = await client.query(query)
        expect(res).toStrictEqual(["foo", "bar", "fooBar"])
    })

    test("split with -", async () => {
        const query = StringSplit("foo-bar-fooBar", "-")
        const res = await client.query(query)
        expect(res).toStrictEqual(["foo", "bar", "fooBar"])
    })

    test("split with ' ' (space)", async () => {
        const query = StringSplit("foo bar fooBar", " ")
        const res = await client.query(query)
        expect(res).toStrictEqual(["foo", "bar", "fooBar"])
    })
})
