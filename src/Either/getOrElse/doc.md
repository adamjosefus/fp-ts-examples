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
{{./example.ts}}
```

</details>

---
