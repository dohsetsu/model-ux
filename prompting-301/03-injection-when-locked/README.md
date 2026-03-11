# Demo 03 — Injection When the System Prompt is Locked

## The scenario

You're consuming a third-party AI API.
The system prompt is set by someone else. You can't touch it.

Most teams give up here. **This is where Model UX gets interesting.**

---

## The injection point
```
System prompt: [locked — not yours]
                    ↓
User turn:     [YOURS — prepend what you need here]
               + the actual user query
                    ↓
Assistant:     [responds to everything it read]
```

---

## Three techniques

**1. Context — inject account state before the query
**2. Soft instruction prepend** — add a behavioral directive as metadata
**3. Format negotiation** — specify output structure in the user turn

---

## Run it
```bash
node demo.js
```

Four runs. Same locked system prompt. Watch the user turn do the work.

---

## The deeper lesson

If you can't reach the system prompt, write a better user turn.
If you can't control the user turn, use assistant prefill.

There's almost always a lever. You just have to find it.
