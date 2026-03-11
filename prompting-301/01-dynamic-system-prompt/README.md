# Demo 01 — Dynamic System Prompt Assembly

## What most teams do

Paste a system prompt into a text field in the AI platform UI.
Set it once. Leave it.

## What this demo shows

The system prompt isn't a static string you write once and forget.
It's **assembled at runtime** from real product state — and the model's
behavior changes based on what's in it.

Same model. Same user question.
Different user context → different system prompt → **different behavior**.# The injection point
```
┌─────────────────────────────────┐
│  YOUR APP                       │
│                                 │
│  user = getUser(session)        │
│  account = getAccount(user)     │
│  features = getFeatures(user)   │
│                                 │
│  systemPrompt = assemble(       │  ← THIS IS THE LEVER
│    user, account, features      │
│  )                              │
│                                 │
│  callModel(systemPrompt, query) │
└─────────────────────────────────┘
```

This is software architecture, not copywriting.
The prompt is built in code, from data, every single time.

---

## Run it
```bash
node demo.js
```

Watch the same question answered three ways — not because the model
is different, but because the **assembled context** is different.

## What to look for

- **Scopeat's **behavior**.
