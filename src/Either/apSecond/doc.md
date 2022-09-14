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
{{./example.ts}}
```
</details>