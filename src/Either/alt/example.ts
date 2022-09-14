import { Either, left, right, alt } from "fp-ts/lib/Either"
import { pipe } from "fp-ts/lib/function"

type A = number
type E1 = "error"

function value(v: number | null): Either<E1, A> {
    return v !== null
        ? right(v)
        : left("error")
}

const v1: Either<E1, A> = pipe(
    value(123),
    alt(
        () => value(789)
    )
) // { _tag: 'Right', right: 123 }

const v2: Either<E1, A> = pipe(
    value(123),
    alt(
        () => value(null)
    )
) // { _tag: 'Right', right: 123 }

const v3: Either<E1, A> = pipe(
    value(null),
    alt(
        () => value(789)
    )
) // { _tag: 'Right', right: 789 }

const v4: Either<E1, A> = pipe(
    value(null),
    alt(
        () => value(null)
    )
) // { _tag: 'Left', left: 'error' }