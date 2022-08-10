import * as E from "fp-ts/lib/Either";
import { pipe } from "fp-ts/lib/function";

function value(toggle: boolean): E.Either<"error", number> {
    return toggle
        ? E.right(123)
        : E.left("error")
}

console.log(
    pipe(
        value(true),
        E.foldW(
            left => null,
            right => `Right: ${right}`,
        )
    )
);

console.log(
    pipe(
        value(false),
        E.foldW(
            left => null,
            right => `Right: ${right}`,
        )
    )
);
