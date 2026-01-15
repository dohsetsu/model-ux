# Learning to Write Rubrics (JYB Notes)

*Personal notes on developing rubric-writing as a skill*

---

## The creative constraint

We can't tell the judge which agent it's evaluating. That's the rule.

But here's what we CAN do: write rubrics so clear and well-anchored that the judge doesn't NEED to know. If we pull that off, we've actually built something more robust than agent-hinting would have been.

Think of it like writing dialogue for a character the reader hasn't met yet — you have to make the context self-evident.

---

## How rubrics actually work (mental model)

The judge is an LLM reading three things:
1. The user's query
2. The agent's response  
3. The rubric (your instructions)

It then outputs a verdict. That's it.

The rubric is essentially a **prompt** — and everything we know about prompting applies:
- Explicit > implicit
- Examples > descriptions
- Concrete > abstract
- Exhaustive edge cases > "use good judgment"

**The failure mode we're fighting:** The judge fills ambiguity with its own assumptions. If the rubric says "complete," the judge decides what "complete" means. Different queries, different vibes, different assumptions → inconsistent verdicts.

---

## The few-shot trick (and why it works)

When you give the judge examples, you're not just clarifying — you're **anchoring its judgment distribution**.

Without examples:
> "Is this response complete?"
> 
> Judge thinks: "Complete means... thorough? Covers everything? Detailed?"
> (Wide range of possible interpretations)

With examples:
> "Is this response complete?
> 
> PASS: 'Your total expenses were $4,230 for November 2025.'
> FAIL: 'Your expenses were $4,230.' (no time period)"
> 
> Judge thinks: "Oh, complete means it includes the relevant context, not just the number."
> (Narrow, calibrated interpretation)

**The craft:** Choosing examples that mark the boundary. You want one PASS that's **minimal-but-acceptable** and one FAIL that's **close-but-not-quite.** That teaches the judge where the line is.

---

## Worked example: Rewriting "completeness"

**Original:**
> "The response fully addresses the user's question without leaving out important information."

Problems:
- "Fully" is subjective
- "Important" is undefined
- No guidance for edge cases (what if data doesn't exist?)

**My rewrite:**

> "The response addresses the user's question with sufficient context for the user to understand and act on the answer.
>
> **Evaluating completeness:**
> - Does the response include the core answer to what was asked?
> - Does it include necessary context (time period, entity, scope)?
> - If the answer is a number, is it clear what the number represents?
>
> **PASS examples:**
> - User asks 'What were my expenses last month?' → 'Your total expenses for December 2025 were $3,420.'
> - User asks 'Do I have any overdue invoices?' → 'You have 3 overdue invoices totaling $1,200. The oldest is 45 days past due.'
> - User asks about data that doesn't exist → 'I don't see any recorded expenses for that category in your books.'
>
> **FAIL examples:**
> - User asks 'What were my expenses last month?' → '$3,420' (no context)
> - User asks 'Who owes me the most?' → 'John Smith' (no amount, no context)
> - User asks for a list → Response gives only the top item without indicating there are more
>
> **Edge case guidance:**
> - If data is unavailable, clearly stating that IS complete — the user knows what to expect
> - Truncated lists are acceptable IF the response indicates truncation ('Here are your top 5...')
> - Additional context beyond what was asked is fine but not required for PASS"

**What I did:**
1. Replaced "fully" with observable criteria
2. Added concrete examples at the boundary
3. Explicitly handled the "no data" case
4. Gave guidance on truncation (a real source of failures)

---

## The "definition vs detection" frame

Here's a useful way to think about rubric writing:

**Definition rubrics** tell the judge what the concept MEANS:
> "Completeness means the response addresses all aspects of the query."

**Detection rubrics** tell the judge what to LOOK FOR:
> "Check: Does the response include a time period? Does it name the entity? Does it explain any limitations?"

Detection rubrics perform better because they turn judgment into checklist. The judge doesn't have to interpret "complete" — it just looks for specific things.

**The creative move:** Translate every abstract criterion into observable markers.

| Abstract | Observable |
|----------|------------|
| "Complete" | Includes time period, names entity, explains scope |
| "Relevant" | Directly addresses the question asked, doesn't go off-topic |
| "Professional tone" | No slang, no sarcasm, appropriate for financial context |
| "Not hallucinated" | All specific numbers/names are either from provided data or explicitly stated as unavailable |

---

## Writing for the judge's failure modes

The judge will:

1. **Over-interpret vague language** — "comprehensive" means different things in different contexts
2. **Apply inconsistent standards** — stricter when the response is short, lenient when it's long
3. **Penalize style when told to ignore it** — unless you're VERY explicit
4. **Double-count failures** — if correctness and hallucination overlap, it'll fail both

**Counter-moves:**

1. Replace vague words with specific criteria
2. Include examples at different lengths
3. Add explicit "do NOT penalize for..." statements
4. Clarify metric boundaries ("this is a correctness issue, not completeness")

---

## The "no data" case (worth getting right)

This single edge case caused maybe 20% of our ambiguous failures. Here's how I'd handle it across metrics:

**Correctness:**
> "If the response accurately states that data is unavailable or the entity doesn't exist, this is CORRECT — the agent is truthfully representing the state of the data. Only mark FALSE if the agent makes claims that contradict reality."

**Completeness:**
> "If data is unavailable, the response is COMPLETE if it clearly states what was looked for and what wasn't found. 'I don't have expense data for that period' is complete. 'I can't help with that' without explanation is incomplete."

**No hallucination:**
> "Stating 'no data available' is NOT hallucination — it's an accurate statement about data state. Hallucination would be inventing specific numbers or details. Be careful: 'You don't have any expenses' (assertion about reality) is different from 'I don't see any expenses in your records' (statement about available data)."

That last distinction — **assertion about reality vs. statement about data** — is subtle but important. It's the "too definitive" pattern we kept seeing.

---

## A note on length

Your instinct as a content designer is to tighten. Shorter = clearer = better.

In rubrics, that's often wrong.

The judge processes everything with zero fatigue. A 500-word rubric with examples performs better than a 50-word rubric that's "elegant." The extra words aren't friction — they're calibration.

**When to tighten:** Remove redundancy, remove genuinely confusing language
**When to expand:** Add examples, add edge cases, add explicit "do/don't" guidance

---

## What success looks like

A well-written rubric should make you feel like:

- "A reasonable person reading this would reach the same verdict I would"
- "The edge cases that tripped us up are now explicitly handled"
- "If the judge fails with this rubric, the issue is structural, not wording"

That last one is important. Good rubrics help you **isolate the problem**. If the eval still misbehaves with excellent rubrics, you know the fix isn't more rubric work — it's something deeper (judge context, GT quality, architectural limitations).

---

## The creative opportunity

Here's the reframe: We're being asked to write rubrics that work without agent hints. That's a harder problem. But if we solve it, we've built something that:

- Scales to any number of agents
- Doesn't require maintenance when agents change
- Forces us to articulate what "good" actually means (useful beyond eval)
- Proves out whether rubric-level fixes can work at all

Even if this pass doesn't nail it, we'll learn something. And the artifacts — the examples, the edge case handling, the detection criteria — those are reusable no matter what architecture comes next.

Constraints make you better. Let's see what we can build inside this one.

---

## Next steps for me

1. Pick one metric (probably completeness or correctness)
2. Write a full rewrite using the principles above
3. Test it mentally against the failures from Jan 5/6 — would the new rubric have helped?
4. Iterate
5. Share with Zip/Julia as a starting point, not a prescription

---

*"The test of a first-rate intelligence is the ability to hold two opposed ideas in mind at the same time and still retain the ability to function."* — Fitzgerald

We can believe this might not work AND give it our best shot. Both things are true.
