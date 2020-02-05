import { Client, query as q } from "faunadb"

// const globalAny: any = global

declare global {
    namespace NodeJS {
        interface Global {
            faunaClient: Client
        }
    }
}

const opts =
    process.env.CI === "true"
        ? {
              secret: process.env.FAUNA_DB_SECRET,
          }
        : {
              secret: "secret",
              scheme: "http",
              port: 8443,
              domain: "localhost",
          }

global.faunaClient = new Client(opts)

global.faunaClient.query(
    q.If(
        q.Exists(q.Collection("Foos")),
        null,
        q.CreateCollection({ name: "Foos" })
    )
)
