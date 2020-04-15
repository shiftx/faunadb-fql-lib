import { query as q } from "faunadb"
import { Switch } from "./Switch"
import { createClient } from "../../test/utils"

describe("Switch", () => {
    const client = createClient()
    test("returns and evaluates matching expression", async () => {
        const query = Switch(
            "bar",
            {
                foo: q.Abort("No, no, no..."),
                bar: q.Concat(["Hi", "there", "bar"], " "),
            },
            q.Abort("sorry not found")
        )
        const res = await client.query(query)
        expect(res).toBe("Hi there bar")
    })

    test("evaluates default if provided and no match", async () => {
        const query = Switch(
            "bar",
            {
                foo: "Lorem...",
            },
            q.Abort("Sorry...")
        )
        const res = await client.query(query).catch(err => err)
        const error = res.requestResult.responseContent.errors[0]
        expect(error.code).toBe("transaction aborted")
        expect(error.description).toBe("Sorry...")
    })

    test("aborts with default error message when no default and no match", async () => {
        const query = Switch("bar", {
            foo: "Lorem...",
        })
        const res = await client.query(query).catch(err => err)
        const error = res.requestResult.responseContent.errors[0]
        expect(error.code).toBe("transaction aborted")
        expect(error.description).toBe("Key 'bar' not supported by Switch")
    })

    test("aborts when switchObject is empty", async () => {
        const query = Switch("bar", {})
        const res = await client.query(query).catch(err => err)
        const error = res.requestResult.responseContent.errors[0]
        expect(error.code).toBe("transaction aborted")
        expect(error.description).toBe("Key 'bar' not supported by Switch")
    })

    test("default works when switchObject is empty", async () => {
        const query = Switch("bar", {}, "default")
        const res = await client.query(query).catch(err => err)
        expect(res).toBe("default")
    })
})
