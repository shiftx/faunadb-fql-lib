import { query as q } from "faunadb"
import { createClient } from "./utils"

createClient().query(
    q.If(
        q.Exists(q.Collection("Foos")),
        null,
        q.CreateCollection({ name: "Foos" })
    )
)
