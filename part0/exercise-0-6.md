```mermaid
sequenceDiagram
browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
Note right of browser: browser executes JS code that adds new note to page
server->>browser: 201 status returned
```
