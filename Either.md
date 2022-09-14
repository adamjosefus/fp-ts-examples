<h1><code>Either</code></h1>

- [instance operations](#instance-operations)
  - [`alt`](#alt)
  - [`altW`](#altw)
- [combinators](#combinators)
  - [`apFirst`](#apfirst)
  - [`apFirstW`](#apfirstw)
  - [`apSecond`](#apsecond)
  - [`apSecondW`](#apsecondw)
- [constructors](#constructors)
  - [`fromPredicate`](#frompredicate)
  - [`left`](#left)
  - [`right`](#right)
- [destructors](#destructors)
  - [`match` / `fold`](#match--fold)
  - [`matchW` / `foldW`](#matchw--foldw)
  - [`getOrElse`](#getorelse)
  - [`getOrElseW`](#getorelsew)


# instance operations

## `alt`

<!-- ## `alt` -->

Identifies an associative operation on a type constructor.
It is similar to `Semigroup`, except that it applies to types of kind `* → *`.

```mermaid
flowchart LR
    style input stroke-width: 2px
    style alt stroke-width: 2px

    input( Either<<span>E1, A</span>> )
    alt{ <b>alt</b> }
    that{{ that }}
    thatInput( Either<<span>E1, A</span>> )
    outputRight( Right<<span>A</span>> )
    outputLeft( Left<<span>E1</span>> )
    output("Either<<span>E1, A</span>>")

    input ---> alt
    alt --> | left | that
    alt --> | right | outputRight
    thatInput --> that
    that --> | left | outputLeft
    that --> | right | outputRight
    outputLeft --> output
    outputRight --> output
```


<details>
<summary>Code Example</summary>

```ts
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
```

</details>

---

## `altW`

<!-- ## `altW` -->

Less strict version of [`alt`](#alt).

```mermaid
flowchart LR
    style input stroke-width: 2px
    style altW stroke-width: 2px

    input( Either<<span>E1, A</span>> )
    altW{ <b>altW</b> }
    that{{ that }}
    thatInput( Either<<span>E2, B</span>> )
    altWOutputRight( Right<<span>A</span>> )
    thatOutputRight( Right<<span>B</span>> )
    thatOutputLeft( Left<<span>E2</span>> )
    output("Either<<span>E2, A | B</span>>")

    input ---> altW
    altW --> | left | that
    altW --> | right | altWOutputRight
    thatInput --> that
    that --> | left | thatOutputLeft
    that --> | right | thatOutputRight
    thatOutputLeft --> output
    altWOutputRight --> output
    thatOutputRight --> output
```

<details>
<summary>Code Example</summary>

```ts
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
```

</details>

---

# combinators

## `apFirst`

<!-- ## `apFirst` -->

Combine two effectful actions, keeping only the result of the first.

Derivable from `Apply`. <!-- TODO: Add link -->


```mermaid
flowchart LR
    style input stroke-width: 2px
    style apFirst stroke-width: 2px

    input( Either<<span>B, A</span>> )
    secondInput( Either<<span>B, C</span>> )
    
    apFirst{ <b>apFirst</b> }
    second{{ second }}
    outputLeft("Left<<span>B</span>>")
    secondOutputRight("Right<<span>A</span>>")
    output("Either<<span>B, A</span>>")

    input ---> apFirst
    secondInput --> second
    apFirst --> | right | second
    apFirst ---> | left | outputLeft
    second --> | right | secondOutputRight
    second --> | left | outputLeft
    outputLeft --> output
    secondOutputRight --> output
```

<details>
<summary>Code Example</summary>
  
```ts
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
```
</details>


---

## `apFirstW`

<!-- ## `apFirstW` -->

Less strict version of [apFirst](#apFirst).

```mermaid
flowchart LR
    style input stroke-width: 2px
    style apFirstW stroke-width: 2px

    input( Either<<span>B, A</span>> )
    secondInput( Either<<span>D, C</span>> )
    apFirstW{ <b>apFirstW</b> }
    second{{ second }}
    outputLeft("Left<<span>B</span>>")
    secondOutputLeft("Left<<span>D</span>>")
    secondOutputRight("Right<<span>A</span>>")
    output("Either<<span>B | D, A</span>>")

    second --> | right | secondOutputRight
    apFirstW --> | right | second
    input ---> apFirstW
    secondInput --> second
    apFirstW ---> | left | outputLeft
    second --> | left | secondOutputLeft
    outputLeft --> output
    secondOutputLeft --> output
    secondOutputRight --> output
```

<details>
<summary>Code Example</summary>

```ts
import { Either, left, right, apFirstW } from "fp-ts/lib/Either"
import { pipe } from "fp-ts/lib/function"

type A = number
type B = string
type E1 = "error"
type E2 = "exception"

function value(toggle: boolean): Either<E1 | E2, A> {
    return toggle
        ? right(123)
        : left("error")
}

function anotherValue(toggle: boolean): Either<E2, B> {
    return toggle
        ? right("abc")
        : left("exception")
}

const v1: Either<E1 | E2, A> = pipe(
    value(true),
    apFirstW(
        anotherValue(true)
    )
) // { _tag: 'Right', right: 123 }

const v2: Either<E1 | E2, A> = pipe(
    value(false),
    apFirstW(
        anotherValue(true)
    )
) // { _tag: 'Left', left: 'error' }

const v3: Either<E1 | E2, A> = pipe(
    value(true),
    apFirstW(
        anotherValue(false)
    )
) // { _tag: 'Left', left: 'exception' }

const v4: Either<E1 | E2, A> = pipe(
    value(false),
    apFirstW(
        anotherValue(false)
    )
) // { _tag: 'Left', left: 'error' }
```

</details>

---

## `apSecond`

<!-- ## `apSecond` -->

Combine two effectful actions, keeping only the result of the second.

Derivable from `Apply`. <!-- TODO: Add link -->


```mermaid
flowchart LR
    style input stroke-width: 2px
    style apSecond stroke-width: 2px

    input( Either<<span>B, A</span>> )
    apSecond{ <b>apSecond</b> }
    output("Either<<span>B, C</span>>")
    outputLeft("Left<<span>B</span>>")
    second{{ second }}
    secondInput( Either<<span>B, C</span>> )
    secondOutputRight("Right<<span>C</span>>")

    input ---> apSecond
    secondInput --> second
    apSecond --> | right | second
    apSecond ---> | left | outputLeft
    second --> | right | secondOutputRight
    second --> | left | outputLeft
    outputLeft --> output
    secondOutputRight --> output
```

<details>
<summary>Code Example</summary>

```ts
import { Either, left, right, apSecond } from "fp-ts/lib/Either"
import { pipe } from "fp-ts/lib/function"

type A = number
type B = "error"
type C = string

function value(toggle: boolean): Either<B, A> {
    return toggle
        ? right(123)
        : left("error")
}

function anotherValue(toggle: boolean): Either<B, C> {
    return toggle
        ? right("abc")
        : left("error")
}

const v1: Either<B, C> = pipe(
    value(true),
    apSecond(
        anotherValue(true)
    )
) // { _tag: 'Right', right: 'abc' }

const v2: Either<B, C> = pipe(
    value(false),
    apSecond(
        anotherValue(true)
    )
) // { _tag: 'Left', left: 'error' }

const v3: Either<B, C> = pipe(
    value(true),
    apSecond(
        anotherValue(false)
    )
) // { _tag: 'Left', left: 'error' }

const v4: Either<B, C> = pipe(
    value(false),
    apSecond(
        anotherValue(false)
    )
) // { _tag: 'Left', left: 'error' }
```
</details>

---

## `apSecondW`

<!-- ## `apSecondW` -->

Less strict version of (`apSecond`)[#apSecond].

```mermaid
flowchart LR
    style input stroke-width: 2px
    style apSecondW stroke-width: 2px

    input( Either<<span>B, A</span>> )
    apSecondW{ <b>apSecondW</b> }
    output("Either<<span>B | D, C</span>>")
    outputLeft("Left<<span>B</span>>")
    secondOutputLeft("Left<<span>D</span>>")
    second{{ second }}
    secondInput( Either<<span>B, C</span>> )
    secondOutputRight("Right<<span>C</span>>")

    input ---> apSecondW
    secondInput --> second
    apSecondW --> | right | second
    apSecondW ---> | left | outputLeft
    second --> | right | secondOutputRight
    second --> | left | secondOutputLeft
    outputLeft --> output
    secondOutputLeft --> output
    secondOutputRight --> output
```

<details>
<summary>Code Example</summary>

```ts
import { Either, left, right, apSecondW } from "fp-ts/lib/Either"
import { pipe } from "fp-ts/lib/function"

type A = number
type B = string
type E1 = "error"
type E2 = "exception"

function value(toggle: boolean): Either<E1 | E2, A> {
    return toggle
        ? right(123)
        : left("error")
}

function anotherValue(toggle: boolean): Either<E2, B> {
    return toggle
        ? right("abc")
        : left("exception")
}

const v1: Either<E1 | E2, B> = pipe(
    value(true),
    apSecondW(
        anotherValue(true)
    )
) // { _tag: 'Right', right: 'abc' }

const v2: Either<E1 | E2, B> = pipe(
    value(false),
    apSecondW(
        anotherValue(true)
    )
) // { _tag: 'Left', left: 'error' }

const v3: Either<E1 | E2, B> = pipe(
    value(true),
    apSecondW(
        anotherValue(false)
    )
) // { _tag: 'Left', left: 'exception' }

const v4: Either<E1 | E2, B> = pipe(
    value(false),
    apSecondW(
        anotherValue(false)
    )
) // { _tag: 'Left', left: 'error' }
```

</details>

---

# constructors
Creates `Either` from value.


## `fromPredicate`

<!-- ## `fromPredicate` -->

```mermaid
flowchart LR
    style input stroke-width: 2px
    style fromPredicate stroke-width: 2px

    input( A )
    fromPredicate{ <b>fromPredicate</b> }
    predicate{{ predicate }}
    onFalse([ onFalse ])
    leftValue( B )
    output( Either<<span>B, A</span>> )

    input ---> fromPredicate
    fromPredicate --> predicate
    predicate --> | true | output
    predicate --> | false | onFalse
    onFalse --> leftValue
    leftValue --> output
    
```

<details>
<summary>Code Example</summary>

```ts
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
```

</details>

---

## `left`

<!-- ## `left` -->

```mermaid
flowchart LR
    style input stroke-width: 2px
    style left stroke-width: 2px

    input("B")
    left{ <b>left<b> }
    output( Either<<span>B, never</span>> )

    input ---> left
    left --> output
```

<details>
<summary>Code Example</summary>

```ts
import { Either, left } from "fp-ts/lib/Either"

type E1 = "error"

const v: Either<E1, never> = left("error")
```

</details>

---

## `right`

<!-- ## `right` -->

```mermaid
flowchart LR
    style input stroke-width: 2px
    style right stroke-width: 2px

    input("A")
    right{ <b>right<b> }
    output( Either<<span>never, A</span>> )

    input ---> right
    right --> output
```

<details>
<summary>Code Example</summary>

```ts
import { Either, right } from "fp-ts/lib/Either"

type A = number

const v: Either<never, A> = right(123)
```
</details>

---

# destructors
Gets value from `Either`.


## `match` / `fold`

<!-- ## `match` / `fold` -->

Method `match` destruct `Either<E1, A>` to `B`.

Type of output value can be different from `Left` and `Right`.

```mermaid
flowchart LR
    style input stroke-width: 2px
    style match stroke-width: 2px

    input( Either<<span>E1, A</span>> )
    match{ match }
    onLeft([ onLeft ])
    onRight([ onRight ])
    leftOutput( B )
    rightOutput( B )
    output( B )

    input ---> match
    match --> | left | onLeft
    match --> | right | onRight
    onLeft --> leftOutput
    onRight --> rightOutput
    leftOutput --> output
    rightOutput --> output
```

<details>
<summary>Code Example</summary>

```ts
import { Either, left, right, match } from "fp-ts/lib/Either"
import { pipe } from "fp-ts/lib/function"

type A = number
type B = string
type E1 = "error"

function value(toggle: boolean): Either<E1, A> {
    return toggle
        ? right(123)
        : left("error")
}

const v1: B = pipe(
    value(true),
    match(
        left => `Left: ${left}`,
        right => `Right: ${right}`,
    )
) // "Right 123"

const v2: B = pipe(
    value(false),
    match(
        left => `Left: ${left}`,
        right => `Right: ${right}`,
    )
) // "Left error"
```
</details>

---


---

## `matchW` / `foldW`

<!-- ## `matchW` / `foldW` -->

Method `matchW` destruct `Either<B, A>` to `D | C`. Less strict version of [`match`](#match).

Type of output value can be different from `Left` and `Right`.

```mermaid
flowchart LR
    style input stroke-width: 2px
    style matchW stroke-width: 2px

    input( Either<<span>B, A</span>> )
    matchW{ matchW }
    onLeft([ onLeft ])
    onRight([ onRight ])
    leftOutput( D )
    rightOutput( C )
    output("D | C")

    input ---> matchW
    matchW --> | left | onLeft
    matchW --> | right | onRight
    onLeft --> leftOutput
    onRight --> rightOutput
    leftOutput --> output
    rightOutput --> output
```

<details>
<summary>Code Example</summary>

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

const v1: D | C = pipe(
    value(true),
    E.matchW(
        (left): D => null,
        (right): C => `Right: ${right}`,
    )
) // "Right 123"

const v2: D | C  = pipe(
    value(false),
    E.matchW(
        (left): D => null,
        (right): C => `Right: ${right}`,
    )
) // null
```

</details>


---

## `getOrElse`

<!-- ## `getOrElse` -->

Method `getOrElse` destruct `Either<B, A>` to `A`.

Type of output value must be same as type of `Right` value.

```mermaid
flowchart LR
    style input stroke-width: 2px
    style getOrElse stroke-width: 2px

    input("Either<<span>B, A</span>>")
    getOrElse{ getOrElse }
    onLeft([ onLeft ])
    leftOutput( A )
    rightOutput( A )
    output( A )

    input ---> getOrElse
    getOrElse --> | left | onLeft
    getOrElse --> | right | rightOutput
    onLeft --> leftOutput
    leftOutput --> output
    rightOutput --> output
```

<details>
<summary>Code Example</summary>

```ts
import { Either, left, right, getOrElse } from "fp-ts/lib/Either"
import { pipe } from "fp-ts/lib/function"

type A = number
type E1 = "error"

function value(toggle: boolean): Either<E1, A> {
    return toggle
        ? right(123)
        : left("error")
}

const v1: A = pipe(
    value(true),
    getOrElse(
        (err): A => -1
    ),
) // 123

const v2: A = pipe(
    value(false),
    getOrElse(
        (err): A => -1
    )
) // -1
```

</details>

---


---

## `getOrElseW`

<!-- ## `getOrElseW` -->

Method `getOrElseW` destruct `Either<B, A>` to `A | C`. Less strict version of [`getOrElse`](#getOrElse).

Type of output value can be different from type of `Right` value.

```mermaid
flowchart LR
    style input stroke-width: 2px
    style getOrElseW stroke-width: 2px

    input("Either<<span>B, A</span>>")
    getOrElseW{ getOrElseW }
    onLeft([ onLeft ])
    leftOutput( C )
    rightOutput( A )
    output("C | A")

    input ---> getOrElseW
    getOrElseW --> | left | onLeft
    getOrElseW --> | right | rightOutput
    onLeft --> leftOutput
    leftOutput --> output
    rightOutput --> output
```

<details>
<summary>Code Example</summary>

```ts
import { Either, left, right, getOrElseW } from "fp-ts/lib/Either"
import { pipe } from "fp-ts/lib/function"

type A = number
type B = string
type E1 = "error"

function value(toggle: boolean): Either<E1, A> {
    return toggle
        ? right(123)
        : left("error")
}

const v1: A | B = pipe(
    value(true),
    getOrElseW(
        (err): B => `My stirng: ${err}`
    ),
) // 123

const v2: A | B = pipe(
    value(false),
    getOrElseW(
        (err): B => `My stirng: ${err}`
    ),
) // "My stirng: error"
```

</details>
