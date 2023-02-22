```mermaid
sequenceDiagram
browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note
server->>server: PUSH https://studies.cs.helsinki.fi/exampleapp/notes
server->>browser: new note

```
