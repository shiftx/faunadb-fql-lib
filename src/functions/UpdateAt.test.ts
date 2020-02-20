import { query as q } from "faunadb"
import { createClient } from "../../test/utils"
import { UpdateAt } from "./UpdateAt"

describe("UpdateAt", () => {
    const client = createClient()
    // prettier-ignore
    test("UpdateAt works to update existing event", async () => {
        const timestamp = new Date().toISOString()
        
        // Initial data
        const event1FullData = { a: 1, nested: { foo: "1", bar: "2" } }

        const event2Patch = { b: 2, nested: { foo: "11" } }
        const event2FullData = { a: 1, b: 2, nested: { foo: "11", bar: "2" } }
        
        const event3Patch = { c: 3, nested: { foo: "111", fooBar: true  } }
        const event3FullData = { a: 1, b: 2, c: 3, nested: { foo: "111", bar: "2", fooBar: true } }
        
        const event4Patch = { d: 4, nested: { inserted: "works" } }
        const event4FullData = { a: 1, b: 2, c: 3, d: 4, nested: { foo: "111", bar: "2", fooBar: true, inserted: "works" } }
        
        const event2UpdateAtPatch = { b: 2.2, nested: { inserted: "here", timestamp } }
        const event2AltFullData =  { a: 1, b: 2.2, nested: { foo: "11", bar: "2", inserted: "here", timestamp } }
        const event3AltFullData =  { a: 1, b: 2.2, c: 3, nested: { foo: "111", bar: "2", fooBar: true, inserted: "here", timestamp } }
        const event4AltFullData =  { a: 1, b: 2.2, c: 3, d: 4, nested: { foo: "111", bar: "2", fooBar: true, inserted: "works", timestamp } }
        
        const docEvent1 = await client.query(
            q.Create(q.Collection("Foos"), {
                data: event1FullData,
            })
        )

        const ref = docEvent1.ref

        const docEvent2 = await client.query(
            q.Update(ref, { data: event2Patch })
        )
        const docEvent3 = await client.query(
            q.Update(ref, { data: event3Patch })
        )

        const docEvent4 = await client.query(
            q.Update(ref, { data: event4Patch })
        )
        
        const { docs } = await client.query(q.Let({
            events: q.Select(['data'],q.Paginate(ref, { events: true }))
        }, {
            events: q.Var('events'),
            docs: q.Map(
                q.Var('events'),
                q.Lambda('event',
                    q.Get(
                        q.Select(['document'], q.Var('event')),
                        q.Select(['ts'], q.Var('event'))
                    )
                )
            )
        }))

        expect(docs[0].data).toStrictEqual(event1FullData)
        expect(docs[1].data).toStrictEqual(event2FullData)
        expect(docs[2].data).toStrictEqual(event3FullData)
        expect(docs[3].data).toStrictEqual(event4FullData)


        const docAt2Updated = await client.query(
            UpdateAt(ref, { data: event2UpdateAtPatch }, docEvent2.ts)
        )
        expect(docAt2Updated.data).toStrictEqual(event2AltFullData)

        const { docsUpdated } = await client.query(q.Let({
            events: q.Select(['data'],q.Paginate(ref, { events: true }))
        }, {
            events: q.Var('events'),
            docsUpdated: q.Map(
                q.Var('events'),
                q.Lambda('event',
                    q.Get(
                        q.Select(['document'], q.Var('event')),
                        q.Select(['ts'], q.Var('event'))
                    )
                )
            )
        }))

        expect(docsUpdated[0].data).toStrictEqual(event1FullData)
        expect(docsUpdated[1].data).toStrictEqual(event2AltFullData)
        expect(docsUpdated[2].data).toStrictEqual(event3AltFullData)
        expect(docsUpdated[3].data).toStrictEqual(event4AltFullData)

        const docAtLatest = await client.query(q.Get(ref))
        expect(docAtLatest.ts).toBe(docEvent4.ts)
        expect(docAtLatest.data).toStrictEqual({
            a: 1,
            b: 2.2,
            c: 3,
            d: 4,
            nested: {
                bar: "2",
                foo: "111",
                fooBar: true,
                inserted: "works",
                timestamp,
            },
        })
    })
})
