import { Either, left, right, getOrElseW } from "fp-ts/lib/Either"
import { pipe } from "fp-ts/lib/function"

type A = number
type B = string
type E1 = "error"

function value(toggle: boolean): Either<E1, A> {
    return toggle
        ? right(123)
        : left("error")
}

const v1: A | B = pipe(
    value(true),
    getOrElseW(
        (err): B => `My stirng: ${err}`
    ),
) // 123

const v2: A | B = pipe(
    value(false),
    getOrElseW(
        (err): B => `My stirng: ${err}`
    ),
) // "My stirng: error"