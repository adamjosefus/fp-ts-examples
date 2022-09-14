import { Either, left, right, getOrElse } from "fp-ts/lib/Either"
import { pipe } from "fp-ts/lib/function"

type A = number
type E1 = "error"

function value(toggle: boolean): Either<E1, A> {
    return toggle
        ? right(123)
        : left("error")
}

const v1: A = pipe(
    value(true),
    getOrElse(
        (err): A => -1
    ),
) // 123

const v2: A = pipe(
    value(false),
    getOrElse(
        (err): A => -1
    )
) // -1