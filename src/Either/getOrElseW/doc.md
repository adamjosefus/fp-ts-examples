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
{{./example.ts}}
```

</details>