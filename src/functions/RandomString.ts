import { query as q } from "faunadb"

const DEFAULT_ALPHABET =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"

export const RandomString = (
    length: number,
    alphabet: string = DEFAULT_ALPHABET
) =>
    q.Let(
        {
            alphabet,
            alphabetLength: q.Length(q.Var("alphabet")),
        },
        q.Concat(
            q.Map(
                q.FindStrRegex(q.Space(length), "\\s"),
                q.Lambda(
                    "_",
                    q.Let(
                        {
                            randomInt: q.Modulo(
                                q.Divide(
                                    q.Multiply(
                                        q.Divide(q.ToNumber(q.NewId()), 123),
                                        q.Divide(q.ToNumber(q.NewId()), 456)
                                    ),
                                    q.Divide(q.ToNumber(q.NewId()), 789)
                                )
                            ),
                            pos: q.Modulo(
                                q.Var("randomInt"),
                                q.Var("alphabetLength")
                            ),
                        },
                        q.SubString(q.Var("alphabet"), q.Var("pos"), 1)
                    )
                )
            )
        )
    )
