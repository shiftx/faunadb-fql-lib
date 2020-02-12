import { Client } from "faunadb"

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

export const createClient = () => new Client(opts)
