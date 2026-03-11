# Demo 04 — Dynamic Few-Shot Retrieval

## What most teams do

Either send no examples at all, or hardcode two or three
generic ones at the top of the system prompt and never touch them again.

## Why that's a problem

Zero examples: the model guesses at your preferred format, tone, and depth.
Hardcoded examples: the wrong examples show up for the wrong queries.

A cash flow question doesn't benefit from an expense categorization example.
A revenue question doesn't need a payroll example. Generic examples add noise.

## What this demo shows

A small bank of examples, tagged by topic.
At runtime, your app looks at the query, identifies the topic,
and pulls only the relevant examples before calling the model.

The model sees examples that actually match what the user asked.

---

## The injection point

```
query comes in
    ↓
classifyQuery(query) → "cash_flow" | "expenses" | "revenue"
    ↓
retrieveExamples(topic) → 2 relevant examples from the bank
    ↓
buildUserTurn(examples, query) → examples + query sent together
    ↓
model responds having seen exactly the right context
```

---

## Why this matters for Model UX

Few-shot examples are the most reliable form of instruction.
They show the model what you want instead of telling it.
When they're dynamic, they scale — add to the bank without touching prompt logic.

---

## Run it

```bash
node demo.js
```

Three queries, three different example sets pulled, three calibrated responses.
Watch how the format and depth shift based on what examples the model saw.

---

## What to look for

- Does the model mirror the structure of the examples it was shown?
- Does a query with no matching examples fall back gracefully?
- What happens when you swap examples from the wrong category in?
