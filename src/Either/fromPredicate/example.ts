import { Either, fromPredicate } from "fp-ts/lib/Either"
import { pipe } from "fp-ts/lib/function"

type A = number
type E1 = "error"

const v: Either<E1, A> = pipe(
    123,
    fromPredicate(
        (n): boolean => n > 0,
        (n): E1 => "error"
    )
)