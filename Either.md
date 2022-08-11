# `Either`

- [`Either`](#either)
  - [Destructors](#destructors)
    - [`fold`](#fold)
    - [`foldW`](#foldw)
    - [`getOrElse`](#getorelse)
    - [`getOrElseW`](#getorelsew)

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
import * as E from "fp-ts/lib/Either"
import { pipe } from "fp-ts/lib/function"

type A = number;
type B = "error"
type C = string;

function value(toggle: boolean): E.Either<B, A> {
    return toggle
        ? E.right(123)
        : E.left("error")
}

const v1: C = pipe(
    value(true),
    E.fold(
        left => `Left: ${left}`,
        right => `Right: ${right}`,
    )
) // "Right 123"

const v2: C = pipe(
    value(false),
    E.fold(
        left => `Left: ${left}`,
        right => `Right: ${right}`,
    )
) // "Left error"
```


### `foldW`
*Alias for [`matchW`](#matchW).*

Method `foldW` destruct `Either<B, A>` to `C | D`. Less strict version of [`fold`](#fold).

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
import * as E from "fp-ts/lib/Either"
import { pipe } from "fp-ts/lib/function"

type A = number;
type B = "error"
type C = string;
type D = null;

function value(toggle: boolean): E.Either<B, A> {
    return toggle
        ? E.right(123)
        : E.left("error")
}

const v1: C | D = pipe(
    value(true),
    E.foldW(
        left => null,
        right => `Right: ${right}`,
    )
) // "Right 123"

const v2: C | D = pipe(
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
import * as E from "fp-ts/lib/Either"
import { pipe } from "fp-ts/lib/function"

type A = number;
type B = "error"

function value(toggle: boolean): E.Either<B, A> {
    return toggle
        ? E.right(123)
        : E.left("error")
}

const v1: A = pipe(
    value(true),
    E.getOrElse(
        err => -1
    ),
) // 123

const v2: A = pipe(
    value(false),
    E.getOrElse(
        err => -1
    )
) // -1
```


### `getOrElseW`

Method `getOrElseW` destruct `Either<B, A>` to `A | C`. Less strict version of [`getOrElse`](#getOrElse).

Type of output value can be different from type of `Right` value.

```mermaid
flowchart LR
    input("Either<<span>B, A</span>>") --> left[Left<<span>B</span>>]
    input --> right[Right<<span>A</span>>]
    right --> result([<span>C</span>])
    left --> | getOrElseW | resultLeft([<span>C</span>])
    resultLeft --> result(<span>A or C</span>)

```


```ts
import * as E from "fp-ts/lib/Either"
import { pipe } from "fp-ts/lib/function"

type A = number;
type B = "error"
type C = string;

function value(toggle: boolean): E.Either<B, A> {
    return toggle
        ? E.right(123)
        : E.left("error")
}

const v1: A | C = pipe(
    value(true),
    E.getOrElseW(
        err => `My stirng: ${err}`
    ),
) // 123

const v2: A | C = pipe(
    value(false),
    E.getOrElseW(
        err => `My stirng: ${err}`
    ),
) // "My stirng: error"
```