import { Either, left, right, altW } from "fp-ts/lib/Either"
import { pipe } from "fp-ts/lib/function"

type A = number
type B = string
type E1 = "error"
type E2 = "exception"


function value(v: number | null): Either<E1, A> {
    return v !== null
        ? right(v)
        : left("error")
}

function anotherValue(v: string | null): Either<E2, B> {
    return v !== null
        ? right(v)
        : left("exception")
}


const v1: Either<E2, A | B> = pipe(
    value(123),
    altW(
        () => anotherValue("abc")
    )
) // { _tag: 'Right', right: 123 }

const v2: Either<E2, A | B> = pipe(
    value(123),
    altW(
        () => anotherValue(null)
    )
) // { _tag: 'Right', right: 123 }

const v3: Either<E2, A | B> = pipe(
    value(null),
    altW(
        () => anotherValue("xyz")
    )
) // { _tag: 'Right', right: 'xyz' }

const v4: Either<E2, A | B> = pipe(
    value(null),
    altW(
        () => anotherValue(null)
    )
) // { _tag: 'Left', left: 'exception' }