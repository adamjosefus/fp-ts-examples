import { Either, left, right, apFirstW } from "fp-ts/lib/Either"
import { pipe } from "fp-ts/lib/function"

type A = number
type B = string
type E1 = "error"
type E2 = "exception"

function value(toggle: boolean): Either<E1 | E2, A> {
    return toggle
        ? right(123)
        : left("error")
}

function anotherValue(toggle: boolean): Either<E2, B> {
    return toggle
        ? right("abc")
        : left("exception")
}

const v1: Either<E1 | E2, A> = pipe(
    value(true),
    apFirstW(
        anotherValue(true)
    )
) // { _tag: 'Right', right: 123 }

const v2: Either<E1 | E2, A> = pipe(
    value(false),
    apFirstW(
        anotherValue(true)
    )
) // { _tag: 'Left', left: 'error' }

const v3: Either<E1 | E2, A> = pipe(
    value(true),
    apFirstW(
        anotherValue(false)
    )
) // { _tag: 'Left', left: 'exception' }

const v4: Either<E1 | E2, A> = pipe(
    value(false),
    apFirstW(
        anotherValue(false)
    )
) // { _tag: 'Left', left: 'error' }