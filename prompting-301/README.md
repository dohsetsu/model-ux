# Prompting 301
### Model UX — beyond voice and tone

Most prompt engineering tutorials teach you how to make a model sound different.

These demos teach you how to make a model **behave** differently — at the code
level, in places the UI never shows you.

---

## The thing most teams don't know

There's no single "prompt." There are **layers**:
```
System prompt
  └─ User turn
       └─ Assistant prefill  ← most teams never touch this
            └─ Tool results  ← or this
              t  ← or this
```

Each layer is a behavioral lever. Each one can be written to, injected into,
or intercepted — programmatically, at runtime, based on real product logic.

**That's what this repo demonstrates.**

---

## Setup
```bash
npm install
export ANTHROPIC_API_KEY=your_key_here
```

## Run any demo
```bash
npm run demo:01
npm run demo:02
npm run demo:03
```

---

## Demos

| # | Demo | Core concept | Injection layer |
|---|------|-------------|-----------------|
| 01 | [Dynamic System Prompt](./01-dynamic-system-prompt/) | Build prompts at runtime from real product state | System |
| 02 | [Assistant Prefill](./02-assistant-prefill/) | Start the model's answer for it | Assistant turn |
| 03 | [Injection When Locked](./03-injection-when-locked/) | Behavioral control when the system prompt is untouchable | User turn |
| 04 | _Coming soon_ | Dynamic few-shot retrieval | User turn |
| 05 | _Coming soon_ | Structured output as contract | System |
| 06 | _Coming soon_ | Confidence elicitation + routing stem + app logic |
| 07 | _Coming soon_ | CoT visibility as UX decision | System |
| 08 | _Coming soon_ | Behavioral routing inside a prompt | System |
| 09 | _Coming soon_ | Diffusion: negative prompting + guidance scale | Separate API params |
| 10 | _Coming soon_ | Streaming + output interception | API stream |

---

> **The place to intervene is almost never where the UI suggests it is.**

*Part of the [Model UX](https://github.com/dohsetsu/model-ux) project.*
