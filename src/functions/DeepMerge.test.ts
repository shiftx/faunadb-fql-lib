import { DeepMerge } from "./DeepMerge"
import { createClient } from "../../test/utils"

describe("DeepMerge", () => {
    const client = createClient()
    test("works on objects with depth 0", async () => {
        const query = DeepMerge({ a: 1 }, { b: 2 }, 1)
        const res = await client.query(query)
        expect(res).toStrictEqual({ a: 1, b: 2 })
    })

    test("works on objects with depth 1", async () => {
        const query = DeepMerge({ data: { a: 1 } }, { data: { b: 2 } }, 2)
        const res = await client.query(query)
        expect(res).toStrictEqual({ data: { a: 1, b: 2 } })
    })

    test("works on objects with depth 2", async () => {
        const query = DeepMerge(
            { data: { a: { a1: 1 } } },
            { data: { a: { a2: 2 } } },
            3
        )
        const res = await client.query(query)
        expect(res).toStrictEqual({ data: { a: { a1: 1, a2: 2 } } })
    })

    test("Chooses value b with object deeper than maxDepth", async () => {
        const query = DeepMerge(
            { data: { a: { a1: 1 } } },
            { data: { a: { a2: 2 } } },
            2
        )
        const res = await client.query(query)
        expect(res).toStrictEqual({ data: { a: { a2: 2 } } })
    })
})
