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
{{./example.ts}}
```

</details>
