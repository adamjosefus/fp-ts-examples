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
{{./example.ts}}
```
</details>
