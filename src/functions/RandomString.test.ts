import { createClient } from "../../test/utils"
import { RandomString } from "./RandomString"

describe("RandomString", () => {
    const client = createClient()

    test("generate random string length 20", async () => {
        const query = RandomString(200)
        const res = await client.query(query)
        expect(res).toMatch(/[A-Za-z0-9]{20}/)
    })

    test("generate random string with custom alphabet", async () => {
        const query = RandomString(200, 'ABC')
        const res = await client.query(query)
        expect(res).toMatch(/A/)
        expect(res).toMatch(/B/)
        expect(res).toMatch(/C/)
        expect(res).toMatch(/^[ABC]{200}$/)
    })
})
