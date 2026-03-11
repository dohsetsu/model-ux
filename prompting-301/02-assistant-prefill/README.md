# Demo 02 — Assistant Pection

## The thing almost nobody knows about

The Anthropic API lets you **start the assistant's response for it**.

Not "tell it what to say." Actually begin the response text,
and the model continues from where you left off.

---

## The injection point
```javascript
messages: [
  { role: "user",      content: "Analyze my cash flow..." },
  { role: "assistant", content: "## Cash Flow Summary\n\n" }  // ← YOU PUT THIS
]                                                              // model continues here
```

The model doesn't "decide" to use that structure.
You **imposed** it before the model generated a single token.

---

## Why it beats instructions

| Approach | Reliability |
|----------|-------------|
| "Respond using a Summary header" | Medium — model may comply, may not |
| Prefill `## Summary\n\n` | High — model must continue from this point |

Critical when:
- First token must be `{` for downstream JSON parsing
- Output feeds a UI component with specific fields
- You need the model to comma stance

---

## Run it
```bash
node demo.js
```

Four versions: no prefill, markdown header, open brace (JSON), committed stance.
