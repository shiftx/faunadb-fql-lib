import { EventExistsAt } from "./EventExistsAt"
import { createClient } from "../../test/utils"
import { query as q } from "faunadb"

describe("EventExistsAt", () => {
    const client = createClient()
    let ref
    let event1
    let event2
    let event3

    beforeAll(async () => {
        event1 = await client.query(q.Create(q.Collection("Foos"), {}))
        ref = event1.ref
        event2 = await client.query(q.Update(ref, {}))
        event3 = await client.query(q.Update(ref, {}))
    })

    test("event exists at created timestamp", async () => {
        const query = EventExistsAt(ref, event1.ts)
        const res = await client.query(query)
        expect(res).toBe(true)
    })

    test("event does not exist before created timestamp", async () => {
        const query = EventExistsAt(ref, event1.ts - 1)
        const res = await client.query(query)
        expect(res).toBe(false)
    })

    test("event does exist on first update timestamp", async () => {
        const query = EventExistsAt(ref, event2.ts)
        const res = await client.query(query)
        expect(res).toBe(true)
    })

    test("event does not exist after last update", async () => {
        const query = EventExistsAt(ref, event3.ts + 1)
        const res = await client.query(query)
        expect(res).toBe(false)
    })
})
