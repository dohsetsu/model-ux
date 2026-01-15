# Rubric Rewrite Guidance (v2)

*For Zip & Julia — practical recommendations for the next rubric pass*

---

## The constraint

We can't add agent-specific hints. So the rubrics need to work across all agents using only the information the judge has: the query, the response, and the rubric itself.

## What we can still do

### 1. Add explicit examples (few-shot)

The single highest-impact change. Instead of describing what "good" looks like, show it.

**Before:**
> "Response should be complete and address all aspects of the user's question."

**After:**
> "Response should be complete and address all aspects of the user's question.
> 
> **PASS example:** User asks 'What were my total expenses last month?' → Response includes the total, the time period, and optionally a breakdown.
> 
> **FAIL example:** User asks 'What were my total expenses last month?' → Response gives only a number with no time period context.
> 
> **Edge case (PASS):** If data is unavailable, stating 'I don't have expense data for that period' is complete — it fully addresses what the user can expect."

Few-shot examples reduce judge variance because the judge has concrete anchors, not just abstract criteria.

---

### 2. Clarify the "no data" edge case

This came up repeatedly in our analysis. When an agent can't answer because data doesn't exist, what's the right verdict?

**Recommendation:** Add explicit guidance for each metric:

| Metric | When data unavailable |
|--------|----------------------|
| correctness | PASS if agent accurately states data is unavailable; FAIL if agent guesses or makes assertions |
| completeness | PASS if agent clearly explains what they looked for and couldn't find |
| relevance | PASS if agent stays on topic while explaining the limitation |
| voice_tone | Apply normally — tone still matters when declining |
| no_hallucination | PASS if agent doesn't fabricate data; FAIL if agent invents specifics |

---

### 3. Separate "correct" from "not hallucinated"

These currently overlap, causing double-penalties. Clarify:

- **correctness** = Does the response match ground truth / factual reality?
- **no_hallucination** = Did the agent invent specific details not supported by data?

A response can be:
- Correct and not hallucinated (ideal)
- Incorrect but not hallucinated (wrong data pulled, but didn't make things up)
- Correct but hallucinated (got lucky with a guess)
- Incorrect and hallucinated (made up data that's also wrong)

The rubrics should help the judge distinguish these.

---

### 4. Define "Intuit voice" concretely (or remove it)

Current rubric says: *"Reflects Intuit's brand personality: empathetic, straightforward, and trustworthy"*

Problem: This is indistinguishable from any polite LLM response. The judge has no way to differentiate "on brand" from "generically professional."

**Options:**

A. **Remove brand reference** — Just evaluate tone on: professional, helpful, appropriate formality
B. **Add concrete markers** — If there ARE specific Intuit voice guidelines, include them
C. **Reframe as "not off-brand"** — Instead of rewarding on-brand, just penalize clearly inappropriate tone (sarcastic, condescending, overly casual for financial context)

Option C is probably most realistic given constraints.

---

### 5. Add "severity" guidance for edge cases

Not all failures are equal. Help the judge calibrate:

**Clear FAIL:**
- Response contains factually wrong numbers
- Response claims data exists when it doesn't (or vice versa)
- Response ignores the core question entirely

**Judgment call (lean PASS):**
- Response is correct but could have more detail
- Response uses slightly different terminology than user
- Response rounds numbers reasonably

**Judgment call (lean FAIL):**
- Response is technically correct but misleading
- Response answers a different question than asked
- Response makes definitive claims without supporting data

---

### 6. Length is fine — don't trim for readability

This is counterintuitive for content designers, but: **the judge doesn't experience cognitive load.**

Longer, more explicit rubrics → more consistent verdicts

If a rubric needs 3 paragraphs to be clear, use 3 paragraphs. The judge will process it all. Trimming for "readability" often removes the nuance that prevents edge-case confusion.

---

## What we probably can't fix with rubrics alone

Being honest about limitations:

1. **Agent capability mismatches** — Without knowing what each agent CAN do, the judge can't know if a refusal is appropriate or a failure.

2. **Context the judge doesn't have** — Query timestamp, user's actual data state, what the agent actually retrieved.

3. **Ground truth quality** — If GT is wrong, the rubric can't save us.

4. **True judge variance** — Some inconsistency is inherent to LLM-as-judge. Few-shot examples help but don't eliminate.

---

## Suggested process

1. **Pick 2-3 metrics to focus on** — Trying to fix everything at once = fixing nothing well
2. **Write examples from real failures** — Use the annotated sheets as source material
3. **Test on known cases** — Before deploying, run the new rubrics against cases where we know the "right" answer
4. **Iterate** — First pass won't be perfect; build in time for revision

---

## Summary

| Recommendation | Impact | Effort |
|----------------|--------|--------|
| Add few-shot examples | High | Medium |
| Clarify "no data" handling | High | Low |
| Separate correctness/hallucination | Medium | Low |
| Define or remove "Intuit voice" | Medium | Low |
| Add severity guidance | Medium | Medium |
| Don't trim for brevity | Low | Low |

The few-shot examples are the biggest lever. If there's only time for one thing, do that.

---

*This is our best shot within the constraints. If it doesn't move the needle much, that's useful data too — it tells us the issue isn't rubric wording, it's structural.*
