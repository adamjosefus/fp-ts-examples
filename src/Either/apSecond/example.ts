import { Either, left, right, apSecond } from "fp-ts/lib/Either"
import { pipe } from "fp-ts/lib/function"

type A = number
type B = "error"
type C = string

function value(toggle: boolean): Either<B, A> {
    return toggle
        ? right(123)
        : left("error")
}

function anotherValue(toggle: boolean): Either<B, C> {
    return toggle
        ? right("abc")
        : left("error")
}

const v1: Either<B, C> = pipe(
    value(true),
    apSecond(
        anotherValue(true)
    )
) // { _tag: 'Right', right: 'abc' }

const v2: Either<B, C> = pipe(
    value(false),
    apSecond(
        anotherValue(true)
    )
) // { _tag: 'Left', left: 'error' }

const v3: Either<B, C> = pipe(
    value(true),
    apSecond(
        anotherValue(false)
    )
) // { _tag: 'Left', left: 'error' }

const v4: Either<B, C> = pipe(
    value(false),
    apSecond(
        anotherValue(false)
    )
) // { _tag: 'Left', left: 'error' }