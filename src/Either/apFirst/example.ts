import * as E from "fp-ts/lib/Either"
import { pipe } from "fp-ts/lib/function"

type A = number
type B = string
type E1 = "error"

function value(toggle: boolean): E.Either<E1, A> {
    return toggle
        ? E.right(123)
        : E.left("error")
}

function anotherValue(toggle: boolean): E.Either<E1, B> {
    return toggle
        ? E.right("abc")
        : E.left("error")
}

const v1: E.Either<E1, A> = pipe(
    value(true),
    E.apFirst(
        anotherValue(true)
    )
) // { _tag: 'Right', right: 123 }

const v2: E.Either<E1, A> = pipe(
    value(false),
    E.apFirst(
        anotherValue(true)
    )
) // { _tag: 'Left', left: 'error' }

const v3: E.Either<E1, A> = pipe(
    value(true),
    E.apFirst(
        anotherValue(false)
    )
) // { _tag: 'Left', left: 'error' }

const v4: E.Either<E1, A> = pipe(
    value(false),
    E.apFirst(
        anotherValue(false)
    )
) // { _tag: 'Left', left: 'error' }