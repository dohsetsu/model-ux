# Rewriting a Rubric: Completeness (Worked Example)

*A step-by-step walkthrough of analyzing and improving a rubric*

---

## Why this metric matters

Completeness measures whether the user got what they asked for. It's the "did you answer the whole question?" check.

The challenge: "Complete" is subjective. One judge might expect a detailed breakdown; another might accept a summary. We need to anchor this.

---

## Step 1: Read the original

```xml
<Rubric>
  A complete response:
  - Addresses ALL parts of the user's question or request comprehensively
  - Follows through on every instruction or task mentioned by the user
  - Maintains awareness of context provided in earlier parts of the conversation
  - Provides a full, non-truncated response without cutting off mid-thought
  - Includes all necessary steps when providing instructions to the user
  - Captures important nuances and subtleties relevant to the user's request
  - Demonstrates thorough understanding by addressing both explicit and implicit needs

  When scoring, you should penalize:
  - Not answering the user's question when the agent has the capability to do so
    - If a ground truth is provided, the agent has the capability to answer 
      the question and therefore MUST provide the core information in the ground truth
      - A wrong answer, even with a plausible explanation, should be penalized
  - Partial responses that only address some parts of a multi-part question
  - Forgetting or ignoring context from earlier in the conversation
  - Truncated responses that appear to be cut off or incomplete
  - Claiming to not have the capability on something that the agent is able to do
  - Missing steps in instructions to the user
  - Oversimplified responses that miss important nuances or edge cases
  - Responses that ignore implicit aspects of the user's request
  - Incomplete follow-through on promised actions or explanations
</Rubric>

<Instructions>
  - Carefully read the conversation transcript thoroughly
  - Check that all parts of multi-part questions are addressed
  - Verify that context from earlier messages is maintained and utilized
  - Ensure the response is not truncated or cut off
  - Confirm all necessary steps and details are included
  - Focus on completeness rather than style or presentation
</Instructions>

<Reminder>
  The goal is to evaluate whether the response fully addresses everything 
  the user asked for, maintains conversation context, and provides complete 
  information without gaps or truncation.
</Reminder>
```

---

## Step 2: Analyze what's there

### What's working

| Element | Why it helps |
|---------|--------------|
| Multi-part question guidance | Clear that ALL parts need addressing |
| Truncation check | Catches cut-off responses |
| "Focus on completeness not style" | Good boundary-setting |
| Context awareness | Addresses conversation flow |

### What's not working

| Problem | Example from our data | Why it matters |
|---------|----------------------|----------------|
| **"Comprehensively" is vague** | Row 29: Failed for not showing calculation steps | Judge interpreted "comprehensive" as "show your work" |
| **"Implicit needs" is subjective** | What the user "really" meant is guesswork | Creates inconsistent verdicts |
| **"Important nuances" undefined** | Who decides what's important? | Judge makes assumptions |
| **No examples** | None provided | Judge has no anchor |
| **Overlaps with correctness** | "MUST provide core information in GT" | This is correctness, not completeness |
| **"Show your work" not addressed** | Is calculation explanation required? | Caused failures in our data |
| **No guidance on truncation** | When is a list "truncated" vs "summarized"? | Top 5 of 20 — complete or not? |

---

## Step 3: Real failure patterns

From our Jan 5/6 analysis:

| Case | What happened | The problem |
|------|---------------|-------------|
| Row 29 (Jan 5) | Agent gave correct gross margin %, marked incomplete for not showing formula | Judge expected "work shown" — is that completeness? |
| "Top 5 customers" | User asked for "all", got top 5 | Legitimate completeness issue |
| Routing instruction | Jan 6 judge expected agent to acknowledge "Route to BI" | Experiment artifact, not real issue |
| No data response | Agent said "no data available" | Is that complete? (Yes, if honest) |

**The "show your work" problem is critical.** The rubric says "focus on completeness not style" but the judge still penalized for presentation choices.

---

## Step 4: Define what completeness IS and ISN'T

**Completeness IS:**
- Answering all parts of the question
- Not leaving the user hanging
- Providing enough info to be useful
- Not truncating mid-response

**Completeness IS NOT:**
- Showing calculation steps (that's presentation)
- Matching GT's level of detail (GT might be verbose)
- Anticipating questions not asked (that's going beyond scope)
- Being correct (that's correctness metric)

---

## Step 5: The GT problem

The current rubric says: *"If a ground truth is provided, the agent MUST provide the core information in the ground truth"*

This conflates completeness with correctness. Consider:

- Agent says: "Your expenses were $4,230"
- GT says: "Your expenses were $5,180"

Is this a completeness failure? No — the agent DID provide expense information. It's a **correctness** failure (wrong number).

Completeness should ask: "Did the agent address what was asked?"
Correctness should ask: "Is what they said accurate?"

---

## Step 6: Draft the rewrite

### 6a. Rewrite the Rubric section

```xml
<Rubric>
  A COMPLETE response:
  - Addresses the question or request the user actually asked
  - Covers all parts if the question has multiple parts
  - Provides enough information for the user to understand the answer
  - Does not cut off mid-thought or leave obvious gaps
  
  A response is STILL COMPLETE if:
  - It's shorter than the ground truth (GT may include extra context)
  - It doesn't show calculation steps (that's presentation, not completeness)
  - It summarizes instead of listing everything (if summary is useful)
  - It honestly states data is unavailable (that's a complete answer to "what is X?")
  
  A response is INCOMPLETE if:
  - It ignores part of a multi-part question
  - It stops mid-sentence or mid-thought
  - It says "I can help with that" but doesn't actually help
  - It refuses to answer when it has the capability
  - It gives a number without context that makes it usable
  
  IMPORTANT: Completeness is about COVERAGE, not DETAIL.
  - A concise answer that covers everything = COMPLETE
  - A detailed answer that misses a part of the question = INCOMPLETE
</Rubric>
```

---

### 6b. Add examples

```xml
<Examples>
  COMPLETE (even if brief):

  1. User: "What were my total expenses last month?"
     Agent: "Your total expenses for December 2025 were $4,230."
     → COMPLETE. Answered the question with necessary context.
  
  2. User: "What's my gross profit margin?"
     Agent: "Your gross profit margin is 42%."
     → COMPLETE. The user asked for the margin, got the margin.
     → Note: NOT incomplete just because it didn't show the formula.
  
  3. User: "Do I have any overdue invoices?"
     Agent: "I don't see any overdue invoices in your current data."
     → COMPLETE. User got an answer. (Whether it's correct is a different metric.)
  
  4. User: "What were my top expenses this quarter?"
     Agent: "Your top 5 expense categories this quarter were: [list]"
     → COMPLETE if user's question can be reasonably interpreted as "main" expenses.
     → If user explicitly said "ALL expenses," see below.


  INCOMPLETE:

  1. User: "What were my revenue and expenses last month?"
     Agent: "Your revenue last month was $10,000."
     → INCOMPLETE. Multi-part question, only one part answered.
  
  2. User: "List all my customers"
     Agent: "Here are your top 5 customers: [list]"
     → INCOMPLETE. User said "all," agent gave subset without acknowledgment.
     → Would be COMPLETE if agent said "Here are your top 5 of 23 total customers"
  
  3. User: "How do I create an invoice?"
     Agent: "To create an invoice, first go to..."
     [response ends abruptly]
     → INCOMPLETE. Truncated mid-instruction.
  
  4. User: "What's my cash flow situation?"
     Agent: "I can help you understand your cash flow."
     [no actual information provided]
     → INCOMPLETE. Promised help but didn't deliver.
  
  5. User: "What data do you have about my business?"
     Agent: "I have access to your QuickBooks data."
     → INCOMPLETE. Too vague to be useful. What data specifically?


  EDGE CASES:

  1. User asked for data that doesn't exist
     Agent: "I don't have expense data for that category in your records."
     → COMPLETE. Honestly addressing the question with available info.
  
  2. Agent gave summary when user might want details
     User: "Show me my transactions"
     Agent: "You had 47 transactions totaling $12,000 this month."
     → Judgment call. If user likely wanted the list, INCOMPLETE. 
       If summary is reasonable first response, COMPLETE.
  
  3. Agent didn't show calculation work
     User: "Calculate my profit margin"
     Agent: "Your profit margin is 23%"
     → COMPLETE. User asked for the calculation result, not the steps.
     → "Calculate" means "tell me the result," not "show me how."
</Examples>
```

---

### 6c. Address the "show your work" issue

This needs explicit guidance since it caused failures:

```xml
<Show_Work_Guidance>
  "SHOW YOUR WORK" CLARIFICATION:
  
  When a user says "calculate X" or "what is X":
  - They are asking for the RESULT
  - They are NOT necessarily asking for the FORMULA or STEPS
  
  Completeness does NOT require showing calculation steps unless:
  - User explicitly asks: "Show me how you calculated that"
  - User asks: "Walk me through the calculation"
  - User asks: "Explain the math"
  
  A response like "Your gross margin is 42%" IS COMPLETE for the question 
  "What's my gross margin?"
  
  Adding the formula (Revenue - COGS / Revenue × 100) is NICE but not REQUIRED 
  for completeness. That's presentation/educational style, not coverage.
  
  Do NOT penalize for:
  - Not showing formulas when user just asked for a number
  - Not explaining methodology unless asked
  - Giving a direct answer instead of a detailed breakdown
</Show_Work_Guidance>
```

---

### 6d. Address truncation and lists

```xml
<Truncation_Guidance>
  WHEN IS A LIST "TRUNCATED" VS "APPROPRIATELY SUMMARIZED"?
  
  INCOMPLETE (problematic truncation):
  - User asks for "all" and gets subset with no acknowledgment
  - Response cuts off mid-item
  - Agent says "here's the list..." and provides nothing
  
  COMPLETE (appropriate summarization):
  - "Here are your top 5 of 23 customers" — user knows there are more
  - "Your main expense categories are..." — reasonable interpretation of request
  - Response is concise but covers the ask
  
  KEY: Does the user know if there's more?
  - Yes → Can be COMPLETE
  - No → Likely INCOMPLETE
</Truncation_Guidance>
```

---

### 6e. Clarify the GT relationship

```xml
<Ground_Truth_Guidance>
  HOW TO USE GROUND TRUTH FOR COMPLETENESS:
  
  The ground truth shows what information IS available to answer the question.
  
  COMPARE:
  - Did the agent address the same TOPIC as the GT?
  - Did the agent cover the same SCOPE as the GT?
  
  DO NOT compare:
  - Exact wording (that's style)
  - Level of detail (GT may be verbose)
  - Numerical values (that's correctness)
  
  EXAMPLE:
  - User asks: "What were my sales last quarter?"
  - GT: "Q4 2025 sales totaled $150,000 across 47 transactions, 
        representing a 15% increase from Q3."
  - Agent: "Your Q4 2025 sales were $150,000."
  
  → This is COMPLETE. The agent answered the question.
  → The extra detail in GT (transaction count, comparison) is nice but not required.
  → If the numbers were wrong, that's a CORRECTNESS issue, not completeness.
</Ground_Truth_Guidance>
```

---

### 6f. Rewrite Instructions

```xml
<Instructions>
  1. Identify what the user actually asked:
     - Single question or multiple parts?
     - Asking for a specific value, a list, or an explanation?
     - Any explicit requests for detail level?
  
  2. Check coverage:
     - Did the agent address each part of the question?
     - Did the agent provide an actual answer (not just "I can help")?
     - Is there enough context to make the answer usable?
  
  3. Check for truncation:
     - Does the response end naturally?
     - If a list, does the user know if there's more?
  
  4. Do NOT penalize for:
     - Less detail than ground truth (GT may be verbose)
     - Not showing calculation steps (unless explicitly requested)
     - Concise answers (brevity ≠ incompleteness)
     - Honest "no data available" responses
  
  5. Final check:
     - Did the user get what they asked for?
     - If they walked away now, would they have an answer?
</Instructions>
```

---

## Step 7: Assemble the full rewrite

```xml
<Rubric>
  A COMPLETE response addresses what the user asked with enough information 
  to be useful. It covers all parts of multi-part questions and doesn't 
  leave obvious gaps.

  COMPLETE even if brief:
  - Direct answer to the question
  - Summary when detail not explicitly requested
  - Honest "no data available" for missing data
  - Concise response that covers the ask

  INCOMPLETE:
  - Multi-part question with parts unanswered
  - Truncated mid-thought
  - "I can help" without actual help
  - List subset without indicating there's more
  - Number without enough context to be usable
</Rubric>

<Examples>
  COMPLETE:
  - "Your gross margin is 42%" (asked for margin, got margin)
  - "No overdue invoices in your data" (answered the yes/no question)
  - "Your top 5 of 23 customers are..." (truncated but transparent)

  INCOMPLETE:
  - Asked revenue AND expenses, only got revenue
  - Asked for "all," got subset with no acknowledgment
  - "I can help with cash flow" [no actual info]
</Examples>

<Show_Work_Guidance>
  "Calculate X" = asking for the result, not the formula.
  Don't penalize for not showing steps unless explicitly requested.
</Show_Work_Guidance>

<Truncation_Guidance>
  Key question: Does the user know if there's more?
  - Yes → can be complete
  - No → likely incomplete
</Truncation_Guidance>

<Instructions>
  1. What did the user actually ask? (parts, specificity, detail level)
  2. Did the agent address each part?
  3. Did they provide an actual answer?
  4. Does the response end naturally?
  5. Final: Would the user have an answer if they walked away now?
</Instructions>

<Reminder>
  Completeness = Coverage, not Detail.
  A concise answer that covers everything > detailed answer that misses a part.
</Reminder>
```

---

## Step 8: Test against known failures

| Case | Old verdict | New rubric |
|------|-------------|------------|
| Row 29: Gross margin without formula | FAIL | PASS (user asked for result, got result) |
| Top 5 when asked for "all" | Inconsistent | FAIL (subset without acknowledgment) |
| "Route to BI" not acknowledged | FAIL | PASS (not a real completeness ask) |
| Brief but complete answer | Sometimes FAIL | PASS (brevity ≠ incompleteness) |
| Honest "no data" response | Inconsistent | PASS (complete answer to the question) |

---

## Step 9: What we learned

### The "show your work" trap

Content designers instinctively value explanation. But in an eval rubric, requiring "show your work" when the user just asked for a number is scope creep.

"Calculate my gross margin" ≠ "Explain how gross margin is calculated and then give me mine"

The rubric should match what users actually ask for, not what we think would be ideal.

### Coverage vs. Detail

These are different dimensions:
- **Coverage** = Did you address what was asked?
- **Detail** = How much information did you provide?

Completeness should measure coverage. Detail is a style/presentation choice.

### The GT trap

Ground truth exists to validate correctness, not to set a completeness standard. GT might be verbose. That doesn't mean the agent must match its verbosity.

---

## Appendix: Quick reference

| User asked for... | Complete response needs... |
|-------------------|---------------------------|
| A number | The number with basic context |
| A yes/no | Clear yes, no, or "can't determine" |
| A list | The list OR transparent summary |
| Multiple things | All of them addressed |
| Explanation | Actual explanation, not just "I can explain" |
| Help with X | Actual help, not just acknowledgment |

---

*This rubric should produce more consistent verdicts by anchoring "complete" to observable criteria rather than subjective judgment about "thoroughness."*
