<h1><code>Either</code></h1>

- [combinators](#combinators)
  - [`apFirst`](#apfirst)
- [constructors](#constructors)
  - [`fromPredicate`](#frompredicate)
  - [`left`](#left)
  - [`right`](#right)
- [destructors](#destructors)
  - [`fold` / `match`](#fold--match)
  - [`foldW` / `matchW`](#foldw--matchw)
  - [`getOrElse`](#getorelse)
  - [`getOrElseW`](#getorelsew)


---


# combinators

## `apFirst`
Combine two effectful actions, keeping only the result of the first.


```mermaid
flowchart LR
    style apFirst stroke-width: 2px

    input( Either<<span>B, A</span>> )
    apFirst{ <b>apFirst</b> }
    second{{ second }}
    outputRight("Either<<span>never, A</span>>")
    outputLeft("Either<<span>B, never</span>>")

    input --> apFirst
    apFirst --> | right | second
    apFirst --> | left | outputLeft
    second --> | right | outputRight
    second --> | left | outputLeft
```


```ts
import * as E from "fp-ts/lib/Either"
import { pipe } from "fp-ts/lib/function"

type A = number
type B = "error"
type C = unknown

function value(toggle: boolean): E.Either<B, A> {
    return toggle
        ? E.right(123)
        : E.left("error")
}

function anotherValue(toggle: boolean): E.Either<B, C> {
    return toggle
        ? E.right("abc")
        : E.left("error")
}

const v1: E.Either<B, A> = pipe(
    value(true),
    E.apFirst(
        anotherValue(true)
    )
) // { _tag: 'Right', right: 123 }

const v2: E.Either<B, A> = pipe(
    value(true),
    E.apFirst(
        anotherValue(true)
    )
) // { _tag: 'Left', left: 'error' }

const v3: E.Either<B, A> = pipe(
    value(false),
    E.apFirst(
        anotherValue(true)
    )
) // { _tag: 'Left', left: 'error' }

const v4: E.Either<B, A> = pipe(
    value(false),
    E.apFirst(
        anotherValue(false)
    )
) // { _tag: 'Left', left: 'error' }
```


---


# constructors
Creates `Either` from value.


## `fromPredicate`

```mermaid
flowchart LR
    style fromPredicate stroke-width: 2px

    input( A )
    fromPredicate{ <b>fromPredicate</b> }
    predicate{{ predicate }}
    onFalse{{ onFalse }}
    leftValue( B )
    output( Either<<span>B, A</span>> )

    input --> fromPredicate
    fromPredicate --> predicate
    predicate --> | true | output
    predicate --> | false | onFalse
    onFalse --> leftValue
    leftValue --> output
    
```


```ts
import * as E from "fp-ts/lib/Either"
import { pipe } from "fp-ts/lib/function"

type A = number
type B = "error"

const v: E.Either<B, A> = pipe(
    123,
    E.fromPredicate(
        (n): boolean => n > 0,
        (n): B => "error"
    )
)
```


## `left`

```mermaid
flowchart LR
    style left stroke-width: 2px

    input("B")
    left{ <b>left<b> }
    output( Either<<span>B, never</span>> )

    input --> left
    left --> output
```

```ts
import * as E from "fp-ts/lib/Either"

type B = "error"

const v: E.Either<B, never> = E.left("error")
```


## `right`

```mermaid
flowchart LR
    style right stroke-width: 2px

    input("A")
    right{ <b>right<b> }
    output( Either<<span>never, A</span>> )

    input --> right
    right --> output
```

```ts
import * as E from "fp-ts/lib/Either"

type A = number

const v: E.Either<never, A> = E.right(123)
```


---


# destructors
Gets value from `Either`.


## `fold` / `match`
*Alias for [`match`](#match).*

Method `fold` destruct `Either<B, A>` to `C`.

Type of output value can be different from `Left` and `Right`.

```mermaid
flowchart LR
    input("Either<<span>B, A</span>>")
    input --> method
    method{fold}
    method --> | onLeft | resultLeft
    method --> | onRight | resultRight
    resultLeft([C])
    resultRight([C])
    resultLeft --> result
    resultRight --> result
    result(C)

```


```ts
import * as E from "fp-ts/lib/Either"
import { pipe } from "fp-ts/lib/function"

type A = number
type B = "error"
type C = string

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


## `foldW` / `matchW`
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

type A = number
type B = "error"
type C = string
type D = null

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


## `getOrElse`

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

type A = number
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


## `getOrElseW`

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

type A = number
type B = "error"
type C = string

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