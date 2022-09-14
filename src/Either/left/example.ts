import { Either, left } from "fp-ts/lib/Either"

type E1 = "error"

const v: Either<E1, never> = left("error")