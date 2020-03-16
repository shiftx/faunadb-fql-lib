import { PaginateReverse } from "./PaginateReverse"
import { GetAll } from "./GetAll"
import { createClient } from "../../test/utils"
import { query as q } from "faunadb"

describe("PaginateReverse", () => {
    const client = createClient()
    const collectionName = Math.random()
        .toString(36)
        .substring(7)
    const collectionNameIndex = collectionName + "index"
    const docs = "ABCD"
        .split("")
        .map(letter => ({ foo: letter, term1: "1", term2: "2" }))

    const createDoc = doc => {
        return client.query(
            q.Create(q.Collection(collectionName), {
                data: doc,
            })
        )
    }

    let doc1
    beforeAll(async () => {
        await client.query(q.CreateCollection({ name: collectionName }))
        await client.query(
            q.CreateIndex({
                name: collectionNameIndex,
                source: q.Collection(collectionName),
                active: true,
                terms: [
                    { field: ["data", "term1"] },
                    { field: ["data", "term2"] },
                ],
            })
        )
        doc1 = await createDoc(docs[0])
        await createDoc(docs[1])
        await createDoc(docs[2])
        await createDoc(docs[3])
        await client.query(q.Update(doc1.ref, { data: { updatePass1: true } }))
        await client.query(q.Update(doc1.ref, { data: { updatePass2: true } }))
        await client.query(q.Update(doc1.ref, { data: { updatePass3: true } }))
    })

    test("paginate collection in reverse", async () => {
        const res = await client.query(
            GetAll(PaginateReverse(q.Documents(q.Collection(collectionName))))
        )

        expect(res.data[0].data.foo).toBe("D")
        expect(res.data[3].data.foo).toBe("A")
    })

    test("paginate collection in reverse with params", async () => {
        const queryFn = params =>
            GetAll(
                PaginateReverse(
                    q.Documents(q.Collection(collectionName)),
                    params
                )
            )
        const page1 = await client.query(queryFn({ size: 2 }))

        expect(page1.data[0].data.foo).toBe("D")
        expect(page1.data[1].data.foo).toBe("C")

        const page2 = await client.query(
            queryFn({ size: 2, after: page1.after })
        )
        expect(page2.data[0].data.foo).toBe("B")
        expect(page2.data[1].data.foo).toBe("A")
    })

    test("paginate index in reverse", async () => {
        const res = await client.query(
            GetAll(
                PaginateReverse(q.Match(q.Index(collectionNameIndex), "1", "2"))
            )
        )

        expect(res.data[0].data.foo).toBe("D")
        expect(res.data[3].data.foo).toBe("A")
    })

    // test("paginate event history in reverse", async () => {
    //     const res1 = await client.query(
    //         q.Paginate(doc1.ref, { size: 2, events: true })
    //     )
    //     console.log(res1)
    //     // const res2 = await client.query(
    //     //     q.Paginate(doc1.ref, { size: 2, events: true, after: res1.after })
    //     // )
    //     // console.log(res2)

    //     const res3 = await client.query(
    //         q.Paginate(q.Events(doc1.ref), { size: 2, before: null })
    //     )
    //     console.log(res3)
    //     // const res4 = await client.query(
    //     //     q.Paginate(q.Events(doc1.ref), { size: 2, after: res2.after })
    //     // )
    //     // console.log(res4)
    //     // throw new Error("asdf")

    //     const page1 = await client.query(
    //         PaginateReverse(q.Events(doc1.ref), { size: 2 })
    //     )
    //     console.log(page1)
    //     expect(page1.data[0].data.updatePass3).toBe(true)
    //     expect(page1.data[1].data.updatePass2).toBe(true)

    //     const page2 = await client
    //         .query(
    //             q.Paginate(q.Events(doc1.ref), {
    //                 size: 2,
    //                 after: page1.after,
    //             })
    //         )
    //         .catch(err => err)
    //     console.log(page2)
    //     expect(page2.data[0].data.updatePass1).toBe(true)
    //     // expect(page0.data[1].data.updatePass1).toBe(true)
    // })
})
