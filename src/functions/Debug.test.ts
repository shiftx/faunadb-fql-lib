import { query as q } from "faunadb"
import { createClient } from "./../../test/utils"
import { Debug } from "./Debug"

describe("Debug", () => {
    const client = createClient()
    test("debug takes an expression and returns as json", async () => {
        const object = { foo: "1", bar: q.Add(1, 2) }
        const query = Debug(object)
        const res = await client.query(query)
        expect(res).toBe('{"foo":"1","bar":3}')
    })

    test("wrap debug with abort and return as error", async () => {
        const object = { foo: "1", bar: q.Add(1, 2) }
        const query = q.Abort(Debug(object))
        const err = await client.query(query).catch(err => err)
        const { errors } = err.requestResult.responseContent
        expect(errors[0].description).toBe('{"foo":"1","bar":3}')
    })
})
