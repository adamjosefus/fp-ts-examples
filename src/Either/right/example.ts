import { Either, right } from "fp-ts/lib/Either"

type A = number

const v: Either<never, A> = right(123)