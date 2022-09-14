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
{{./example.ts}}
```
</details>

---
