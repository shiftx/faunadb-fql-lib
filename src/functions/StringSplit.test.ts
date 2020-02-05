import { StringSplit } from "./StringSplit"

describe("StringSplit", () => {
    const client = global.faunaClient
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
