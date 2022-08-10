# `Either`

- [`Either`](#either)
  - [Destructors](#destructors)
    - [`fold`](#fold)
    - [`foldW`](#foldw)
    - [`getOrElse`](#getorelse)

## Destructors


### `fold`
*Alias for [`match`](#match).*

Method `fold` destruct `Either<B, A>` to `C`.

Type of output value can be different from `Left` and `Right`.

```mermaid
flowchart LR
    input("Either<<span>B, A</span>>") --> left[Left<<span>B</span>>]
    input --> right[Right<<span>A</span>>]
    right --> | fold | result([C])
    left  --> | fold | result(C)

```


```ts
import * as E from "fp-ts/lib/Either";
import { pipe } from "fp-ts/lib/function";

function value(toggle: boolean): E.Either<"error", number> {
    return toggle
        ? E.right(123)
        : E.left("error")
}

pipe(
    value(true),
    E.fold(
        left => `Left: ${left}`,
        right => `Right: ${right}`,
    )
) // "Right 123"

pipe(
    value(false),
    E.fold(
        left => `Left: ${left}`,
        right => `Right: ${right}`,
    )
) // "Left error"
```


### `foldW`
*Alias for [`matchW`](#matchW).*

Method `foldW` destruct `Either<B, A>` to `C|D`. Less strict version of [`fold`](#fold).

Type of output value can be different from `Left` and `Right`.

```mermaid
flowchart LR
input("Either<<span>B, A</span>>") --> left[Left<<span>B</span>>]
    input --> right[Right<<span>A</span>>]
        right --> | foldW | resultRight([<span>C</span>])
        left -->  | foldW | resultLeft([<span>D</span>])
            resultRight --> result(<span>C or D</span>)
            resultLeft --> result(<span>C or D</span>)

```


```ts
import * as E from "fp-ts/lib/Either";
import { pipe } from "fp-ts/lib/function";

function value(toggle: boolean): E.Either<"error", number> {
    return toggle
        ? E.right(123)
        : E.left("error")
}

pipe(
    value(true),
    E.foldW(
        left => null,
        right => `Right: ${right}`,
    )
) // "Right 123"

pipe(
    value(false),
    E.foldW(
        left => null,
        right => `Right: ${right}`,
    )
) // null
```


### `getOrElse`

Method `getOrElse` destruct `Either<B, A>` to `A`.

Type of output value must be same as type of `Right` value.

```mermaid
flowchart LR
    input("Either<<span>B, A</span>>") --> left[Left<<span>B</span>>]
    input --> right[Right<<span>A</span>>]
    right --> result([<span>C</span>])
    left --> | getOrElse | resultLeft([<span>A</span>])
    resultLeft --> result(<span>A</span>)

```


```ts
import * as E from "fp-ts/lib/Either";
import { pipe } from "fp-ts/lib/function";

function value(toggle: boolean): E.Either<"error", number> {
    return toggle
        ? E.right(123)
        : E.left("error")
}

pipe(
    value(false),
    E.getOrElse(
        err => -1
    ),
) // 123

pipe(
    value(false),
    E.getOrElse(
        err => -1
    )
) // -1
```