import { query as q } from "faunadb"
import { SelectFQLib } from "./SelectFQLib"
export const MapSelect = (array, selector) =>
    q.Map(array, q.Lambda("item", SelectFQLib(selector, q.Var("item"))))
