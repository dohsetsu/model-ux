# Rewriting a Rubric: Correctness (Worked Example)

*A step-by-step walkthrough of analyzing and improving a rubric*

---

## Why document this?

Rubric writing is a skill that's rarely taught explicitly. Most people either:
- Copy existing rubrics without examining them
- Write from instinct without structured analysis
- Edit for style when they should edit for precision

This document walks through a real rewrite so you can see the thinking, not just the output.

---

## Step 1: Read the original

Here's the current correctness rubric:

```xml
<Rubric>
  A correct answer:
  - Provides accurate information
  - Contains no factual errors
  - Is logically consistent
  - Uses precise and accurate terminology

  When scoring, you should penalize:
  - Factual errors or inaccuracies
  - Misleading or ambiguous statements
  - Incorrect terminology
  - Logical inconsistencies
</Rubric>

<Instructions>
  - Read the conversation transcript thoroughly
  - Check for factual accuracy of the provided responses
  - Focus on correctness of information rather than style, verbosity, 
    or comprehensiveness/completeness
  - The agent gracefully refusing to answer the question **specifically** 
    due to limited capability should not be penalized for factual correctness
    - An example of a graceful refusal is: "I can't do that yet, but I'm 
      learning. In the meantime, you can..."
    - Examples of refusals that are NOT graceful and thus SHOULD be penalized:
      - Inability to answer due to error states, failures, or issues retrieving data
      - Claiming data is not available when it is available in the ground truth
      - Misunderstanding the user's request
  - The ground truth may provide additional insights that surpass the scope 
    of the user question. DO NOT penalize for not providing those extras.
  - ONLY focus on FACTUAL correctness (information, instructions, 
    calculations, math, data, etc.)
</Instructions>

<Reminder>
  The goal is to evaluate factual correctness of the responses.
</Reminder>
```

---

## Step 2: Analyze what's there

Before fixing, understand what the rubric is trying to do and where it falls short.

### What's working

| Element | Why it helps |
|---------|--------------|
| Separate Rubric/Instructions/Reminder | Clear structure for the judge |
| "Focus on correctness not style" | Good boundary-setting with other metrics |
| Graceful refusal guidance | Addresses a real edge case |
| "Don't penalize for extras in GT" | Prevents over-penalizing |

### What's not working

| Problem | Example | Why it matters |
|---------|---------|----------------|
| **Circular definitions** | "Accurate information" and "no factual errors" mean the same thing | Judge gets no new information from the second bullet |
| **No examples** | None provided | Judge has to guess where the boundary is |
| **"Misleading" is undefined** | What counts as misleading vs. just incomplete? | Creates inconsistent verdicts |
| **"Too definitive" not addressed** | Agent says "You don't have X" when data unavailable | This is technically incorrect but rubric doesn't guide the judge |
| **No numerical guidance** | What about rounding? Off-by-one? Timing differences? | Small discrepancies get inconsistent treatment |
| **Graceful refusal is narrow** | Only covers capability limitations | Doesn't cover data limitations or scope boundaries |

---

## Step 3: Identify the failure patterns

What actual failures did this rubric produce? (From our Jan 5/6 analysis)

| Pattern | What happened | Rubric gap |
|---------|---------------|------------|
| 64 vs 63 customers | BI said 64, GT said 63, marked FALSE | No guidance on small discrepancies |
| "You don't have X" | Agent made definitive claim when data was unavailable | "Misleading" not defined clearly |
| No data but gave zero | Agent said "0 sales" for nonexistent entity | Not covered by graceful refusal guidance |
| Date interpretation | Agent used wrong reference for "last month" | No guidance on temporal ambiguity |
| GT might be wrong | Manual GT entry could have errors | Judge can't distinguish BI bug from GT error |

The rubric needs to help the judge handle these cases consistently.

---

## Step 4: Apply the principles

From our rubric craft notes, the key moves are:

1. **Definition → Detection**: Turn abstract criteria into observable checks
2. **Add examples**: Concrete anchors at the pass/fail boundary
3. **Handle edge cases explicitly**: If it caused failures, address it
4. **Separate concerns**: Make sure correctness doesn't overlap with other metrics

Let's apply each.

---

## Step 5: Draft the rewrite

### 5a. Rewrite the Rubric section

**Original:**
```
A correct answer:
- Provides accurate information
- Contains no factual errors
- Is logically consistent
- Uses precise and accurate terminology
```

**Problems:**
- "Accurate information" and "no factual errors" are redundant
- "Logically consistent" is vague
- "Precise terminology" overlaps with voice/tone

**Rewrite:**
```
A CORRECT response:
- States facts that match reality (the user's actual data, verified information, 
  or established knowledge)
- Makes claims the agent can support with available data
- Performs calculations accurately when numbers are involved
- Identifies the correct entities (customers, vendors, accounts) when asked

A response can still be CORRECT if:
- It provides less detail than the ground truth (that's completeness, not correctness)
- The tone is off (that's voice/tone, not correctness)
- It declines to answer due to genuine data limitations (as long as it doesn't 
  make false claims about what data exists)
```

**What changed:**
- Replaced circular "accurate/factual" with observable criteria
- Added explicit "what this metric DOESN'T cover" to prevent overlap
- Added the "calculations" and "entities" checks based on real failure patterns

---

### 5b. Add examples

**The key insight:** Examples should mark the boundary. One minimal PASS, one close-but-FAIL.

```
PASS EXAMPLES:

1. User asks: "What were my total expenses last month?"
   Agent says: "Your total expenses for December 2025 were $4,230."
   GT says: "Total expenses December 2025: $4,230.00"
   → PASS (numbers match, entity matches)

2. User asks: "Do I have any overdue invoices?"
   Agent says: "I don't see any overdue invoices in your records."
   GT says: "No overdue invoices found."
   → PASS (both indicate same state, different wording is fine)

3. User asks: "What's my gross profit margin?"
   Agent says: "Your gross profit margin is 42%."
   GT says: "Gross profit margin: 42.3%"
   → PASS (reasonable rounding, judge should not penalize minor precision differences)

4. User asks about an entity that doesn't exist in their data
   Agent says: "I couldn't find a customer named 'ABC Corp' in your records."
   GT says: "Customer not found."
   → PASS (accurately reflects data state)


FAIL EXAMPLES:

1. User asks: "What were my total expenses last month?"
   Agent says: "Your total expenses for December 2025 were $4,230."
   GT says: "Total expenses December 2025: $5,180."
   → FAIL (numbers don't match - this is a factual error)

2. User asks: "Do I have any overdue invoices?"
   Agent says: "You don't have any invoices at all."
   GT says: "3 overdue invoices totaling $1,200."
   → FAIL (agent claimed no invoices exist when they do)

3. User asks: "Who is my largest customer?"
   Agent says: "Your largest customer is ABC Corp with $50,000 in sales."
   GT says: "Largest customer: XYZ Inc with $50,000 in sales."
   → FAIL (wrong entity identified, even though amount is correct)

4. User asks about data that doesn't exist
   Agent says: "You don't have any purchase orders." 
   GT says: "No purchase order data available."
   → FAIL (see "Too Definitive" guidance below - agent asserted a fact about 
   the user's business when it should have stated a limitation about available data)
```

---

### 5c. Add edge case guidance

**The "Too Definitive" Problem:**

```
IMPORTANT: Distinguish between statements about DATA vs. statements about REALITY

- "I don't see any expenses in your records" → Statement about data (ACCEPTABLE)
- "You don't have any expenses" → Statement about reality (PROBLEMATIC)

The agent can only see what's in the data. It cannot know what the user's 
business actually has or doesn't have. When data is unavailable or missing:

- CORRECT: "I couldn't find data for X" / "There's no X in your records" / 
  "I don't have information about X"
- INCORRECT: "You don't have X" / "There is no X" / "X doesn't exist"

This distinction matters because users may make decisions based on agent 
assertions. "You don't have any overdue invoices" could lead someone to 
skip a collections review when the real issue is missing data.
```

**Numerical Discrepancies:**

```
GUIDANCE ON NUMBERS:

Small differences (1-2% or rounding):
- If the difference is clearly due to rounding (42% vs 42.3%), PASS
- If the difference could be a display/precision issue, lean PASS

Larger differences:
- If the numbers are meaningfully different (64 vs 63 customers, $4,230 vs $5,180), 
  this is a correctness issue
- Even if we can't determine WHO is wrong (agent vs GT), the mismatch exists

When in doubt:
- If a user would make a different decision based on the agent's number vs the 
  GT number, it's a FAIL
- If the difference is immaterial to decision-making, lean PASS
```

**Temporal Ambiguity:**

```
GUIDANCE ON TIME REFERENCES:

"Last month," "this quarter," etc. depend on when the query was asked. 

If the agent interprets "last month" differently than the GT:
- Check if the agent's interpretation is reasonable given context
- If the agent used the wrong reference date and this led to wrong data, FAIL
- If the time interpretation is ambiguous and both readings are defensible, lean PASS

The key question: Did the agent answer about the time period the user 
likely meant?
```

---

### 5d. Rewrite the Instructions section

**Original instructions** were decent but can be tightened.

```
<Instructions>
  1. Read the conversation and the agent's response
  
  2. Compare specific claims to ground truth:
     - Do the NUMBERS match? (amounts, counts, percentages)
     - Do the ENTITIES match? (customers, vendors, accounts named)
     - Do the TIME PERIODS match? (dates, ranges referenced)
     - Do the STATES match? (exists/doesn't exist, overdue/current, etc.)
  
  3. For each mismatch, ask:
     - Is this a meaningful difference or just precision/rounding?
     - Would a user make a different decision based on this?
     - Is the agent making a claim it can't support?
  
  4. Special cases:
     - Agent declines due to missing data: PASS if honest about limitation, 
       FAIL if makes false claims about what exists
     - Agent gives less detail than GT: NOT a correctness issue (that's completeness)
     - Agent's tone is off: NOT a correctness issue (that's voice/tone)
     - GT has extra analysis beyond user's question: Don't penalize for not 
       including extras
  
  5. When uncertain:
     - Ask: "Did the agent give the user accurate information they can rely on?"
     - If yes → PASS
     - If the agent's response could lead to a wrong decision → FAIL
</Instructions>
```

---

## Step 6: Assemble the full rewrite

Putting it all together:

```xml
<Rubric>
  A CORRECT response:
  - States facts that match reality (the user's actual data, verified information, 
    or established knowledge)
  - Makes claims the agent can support with available data
  - Performs calculations accurately when numbers are involved
  - Identifies the correct entities (customers, vendors, accounts) when asked

  A response can still be CORRECT if:
  - It provides less detail than the ground truth (that's completeness, not correctness)
  - The tone is off (that's voice/tone, not correctness)
  - It declines to answer due to genuine data limitations (as long as it doesn't 
    make false claims about what data exists)

  PENALIZE for:
  - Numbers that don't match ground truth (beyond reasonable rounding)
  - Wrong entities identified (wrong customer, wrong account, etc.)
  - Claims that data exists when it doesn't (or vice versa)
  - Assertions about the user's business that go beyond what the data shows
</Rubric>

<Examples>
  PASS:
  - Agent: "Your expenses were $4,230 for December." / GT: "$4,230.00" → Match
  - Agent: "I don't see any overdue invoices." / GT: "No overdue invoices" → Match
  - Agent: "Gross margin is 42%." / GT: "42.3%" → Acceptable rounding
  - Agent: "I couldn't find that customer." / GT: "Customer not found" → Match

  FAIL:
  - Agent: "$4,230" / GT: "$5,180" → Numbers don't match
  - Agent: "Your largest customer is ABC" / GT: "Largest is XYZ" → Wrong entity
  - Agent: "You don't have any invoices" / GT: "3 overdue invoices" → False claim
  - Agent: "You don't have purchase orders" / GT: "No data available" → Too definitive 
    (agent asserted business fact when it should have stated data limitation)
</Examples>

<Too_Definitive_Guidance>
  IMPORTANT: The agent can only see available data. It cannot know what the 
  user's business actually has.

  CORRECT framing: "I don't see X in your records" / "I couldn't find data for X"
  INCORRECT framing: "You don't have X" / "X doesn't exist"

  If the agent makes definitive claims about the user's business (not just about 
  available data), and the ground truth indicates data was simply unavailable, 
  mark as FAIL.
</Too_Definitive_Guidance>

<Numerical_Guidance>
  - Rounding differences (42% vs 42.3%): PASS
  - Meaningful differences ($4,230 vs $5,180, 64 vs 63): FAIL
  - When uncertain: Would a user make a different decision? If yes → FAIL
</Numerical_Guidance>

<Instructions>
  1. Read the conversation and agent response
  
  2. Compare to ground truth:
     - Do NUMBERS match?
     - Do ENTITIES match?
     - Do TIME PERIODS match?
     - Do STATES match (exists/doesn't, overdue/current)?
  
  3. For mismatches: Is it meaningful or just precision?
  
  4. Special cases:
     - Declining due to missing data: PASS if honest, FAIL if false claims
     - Less detail than GT: Not a correctness issue
     - Tone issues: Not a correctness issue
  
  5. Final check: Did the agent give accurate, reliable information?
</Instructions>

<Reminder>
  Evaluate FACTUAL correctness only. 
  Ask: "Can the user rely on this information to make decisions?"
</Reminder>
```

---

## Step 7: Test against known failures

Before deploying, mentally run the new rubric against cases we know:

| Case | Old verdict | New rubric would... |
|------|-------------|---------------------|
| 64 vs 63 customers | FAIL (unclear why) | FAIL + clear reasoning (numbers don't match) |
| "You don't have X" when no data | Inconsistent | FAIL + clear reasoning (too definitive) |
| Rounding (42% vs 42.3%) | Sometimes FAIL | PASS (explicitly allowed) |
| Wrong customer identified | FAIL | FAIL + clear reasoning (wrong entity) |
| Agent declined, data missing | Inconsistent | PASS (honest about limitation) |

The new rubric should produce more **consistent** verdicts with **clearer reasoning**.

---

## Step 8: What we learned

### The process

1. **Read and understand** the original before changing anything
2. **Analyze systematically** — what works, what doesn't, why
3. **Ground in real failures** — what patterns does this need to catch?
4. **Apply principles** — definition→detection, add examples, handle edge cases
5. **Test mentally** — would this have caught the issues we saw?

### The transferable skills

- **Circular definitions** are common and easy to miss. Watch for them.
- **Examples at the boundary** do more work than paragraphs of description.
- **Edge cases** are where rubrics fail. If something caused inconsistent verdicts, address it explicitly.
- **Separation of concerns** prevents double-penalties. Be clear what this metric does NOT cover.

### The mindset

Rubric writing is **prompt engineering for evaluation**. Everything that makes a prompt better — explicit over implicit, examples over abstractions, handling edge cases — makes a rubric better too.

---

## Appendix: Quick checklist for any rubric rewrite

- [ ] Did I remove circular/redundant definitions?
- [ ] Did I add pass/fail examples at the boundary?
- [ ] Did I address the edge cases that caused real failures?
- [ ] Did I clarify what this metric does NOT evaluate?
- [ ] Did I give guidance for ambiguous situations?
- [ ] Did I test against known cases?
- [ ] Does the judge now have enough information to reach consistent verdicts?

---

*This walkthrough can be applied to any rubric. The specific content changes, but the process stays the same.*
