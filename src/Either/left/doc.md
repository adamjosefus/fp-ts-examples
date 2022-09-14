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
{{./example.ts}}
```

</details>