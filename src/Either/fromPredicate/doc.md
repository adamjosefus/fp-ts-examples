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
{{./example.ts}}
```

</details>