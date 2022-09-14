import { Either, left, right, match } from "fp-ts/lib/Either"
import { pipe } from "fp-ts/lib/function"

type A = number
type B = string
type E1 = "error"

function value(toggle: boolean): Either<E1, A> {
    return toggle
        ? right(123)
        : left("error")
}

const v1: B = pipe(
    value(true),
    match(
        left => `Left: ${left}`,
        right => `Right: ${right}`,
    )
) // "Right 123"

const v2: B = pipe(
    value(false),
    match(
        left => `Left: ${left}`,
        right => `Right: ${right}`,
    )
) // "Left error"