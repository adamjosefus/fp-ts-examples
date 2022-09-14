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
{{./example.ts}}
```

</details>