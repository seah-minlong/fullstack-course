sequenceDiagram
    participant browser
    participant server

    Note over browser: User writes a new note and clicks "Save" within the SPA
    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/notes<br/>(note data)
    activate server
    server-->>browser: Confirmation/Updated note data
    deactivate server

    Note right of browser: SPA JavaScript dynamically updates the displayed notes list
