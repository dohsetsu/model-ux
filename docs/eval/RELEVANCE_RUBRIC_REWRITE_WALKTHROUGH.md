# Rewriting a Rubric: Relevance (Worked Example)

*A step-by-step walkthrough of analyzing and improving a rubric*

---

## Why this metric matters

Relevance measures whether the agent actually addressed what the user asked. A response can be correct, complete, and well-written — but still irrelevant if it answers the wrong question.

---

## Step 1: Read the original

```xml
<Rubric>
  Grade whether the assistant's responses:
  - Demonstrate clear understanding of the user's requests and intent
  - Provide useful or actionable information that addresses the user's needs
  - Directly relate to what the user asked for, without significant deviation
  - Contain information that would be valuable to the user in their specific context
  - Maintain relevance across the entire conversation context
  - Avoid adding unnecessary details or irrelevant information

  When scoring, you should penalize:
  - Adding unnecessary details or irrelevant information
  - Repeating information
  - Not answering the user's question when the agent has the capability to do so
    - If a ground truth is provided, the agent has the capability to answer 
      the question and therefore MUST provide the core information in the GT
      - A wrong answer, even with a plausible explanation, should be penalized
  - Asking unnecessary clarifying questions or unnecessary follow-up questions
  - Forgetting context from earlier in the conversation

  Redirecting the conversation back to core agent capabilities when the user:
  - Engages in harmful, illegal, or malicious activity
  - Engages in off-topic behavior not related to business/QuickBooks/accounting
  Is acceptable behavior and should not be penalized.

  Ignore style, grammar, or formatting issues. Focus solely on relevance and usefulness.
</Rubric>

<Instructions>
  - Read the conversation transcript thoroughly
  - Check for relevance and brevity of the agent's responses
  - Focus on relevance and brevity rather than accuracy
</Instructions>

<Reminder>
  The goal is to evaluate relevance and brevity of the response. A shorter, 
  relevant response should score higher than a longer response with unnecessary details.
</Reminder>
```

---

## Step 2: Analyze what's there

### What's working

| Element | Why it helps |
|---------|--------------|
| "Directly relate to what user asked" | Core relevance criterion |
| Penalize unnecessary details | Prevents rambling |
| Acceptable to redirect off-topic | Handles edge case well |
| "Focus on relevance not accuracy" | Good separation from correctness |

### What's not working

| Problem | Why it matters |
|---------|----------------|
| **Overlaps with completeness** | "Not answering when capable" is already in completeness |
| **Overlaps with correctness** | "MUST provide core information in GT" is correctness |
| **"Useful" is vague** | Useful to whom? For what? |
| **No examples** | What does "unnecessary detail" look like? |
| **Brevity conflated with relevance** | Short ≠ relevant; long ≠ irrelevant |
| **"Unnecessary clarifying questions"** | When IS a clarifying question necessary? |

---

## Step 3: Define what relevance IS and ISN'T

**Relevance IS:**
- Responding to the actual question asked
- Staying on topic
- Providing information the user can use for their purpose

**Relevance IS NOT:**
- Being correct (that's correctness)
- Being complete (that's completeness)
- Being brief (brevity is a style choice)
- Matching GT exactly (that's correctness)

**The test:** If you read only the user's question and then read only the agent's response, does the response address that question?

---

## Step 4: The overlap problem

The current rubric has this troubling line:

> "If a ground truth is provided, the agent has the capability to answer the question and therefore MUST provide the core information in the ground truth"

This is **correctness**, not relevance. Consider:

- User asks: "What were my expenses last month?"
- Agent says: "Your expenses were $5,000" (but GT says $4,230)

Is this **irrelevant**? No — the agent addressed expenses last month.
Is this **incorrect**? Yes — the number is wrong.

The rubric shouldn't penalize for correctness issues under the relevance metric. That's **double-counting.**

---

## Step 5: The brevity confusion

The rubric says: "A shorter, relevant response should score higher than a longer response with unnecessary details."

This conflates two things:
- **Relevance** = Does it address the question?
- **Conciseness** = Is it appropriately brief?

A long response can be highly relevant. A short response can be irrelevant.

| Response | Length | Relevant? |
|----------|--------|-----------|
| "Your expenses were $4,230 for December, broken down by category..." | Long | Yes |
| "The weather today is sunny." | Short | No |
| "$4,230." | Very short | Borderline (lacks context) |

Brevity is a style/voice concern, not a relevance concern.

---

## Step 6: Draft the rewrite

### 6a. Rewrite the Rubric section

```xml
<Rubric>
  A RELEVANT response:
  - Addresses the question or request the user actually asked
  - Stays on topic without significant tangents
  - Provides information the user can act on for their stated purpose
  
  A response is STILL RELEVANT if:
  - It's longer than necessary (that's a style issue, not relevance)
  - It includes some extra context (as long as the core question is addressed)
  - The information is wrong (that's correctness, not relevance)
  - It's incomplete (that's completeness, not relevance)
  
  A response is IRRELEVANT if:
  - It answers a different question than what was asked
  - It goes off on tangents that don't relate to the user's need
  - It provides information the user didn't ask for and can't use
  - It ignores the question entirely
  
  IMPORTANT: Relevance is about TOPIC, not accuracy or completeness.
  - Wrong answer to the right question → Relevant but incorrect
  - Right answer to the wrong question → Irrelevant
</Rubric>
```

---

### 6b. Add examples

```xml
<Examples>
  RELEVANT (even if imperfect):

  1. User: "What were my expenses last month?"
     Agent: "Your expenses for December were $4,230."
     → RELEVANT. Addressed the question asked.
  
  2. User: "What were my expenses last month?"
     Agent: "Your expenses for December were $5,000." (GT says $4,230)
     → STILL RELEVANT. Wrong number is a correctness issue, not relevance.
        The agent addressed expenses for last month.
  
  3. User: "How do I create an invoice?"
     Agent: "Here's how to create an invoice: [steps]. You might also want 
             to know about recurring invoices if you bill regularly."
     → RELEVANT. Extra info is fine as long as the core question is answered.
  
  4. User: "What's my cash flow situation?"
     Agent: "Your cash flow this month shows $15,000 in and $12,000 out, 
             leaving you with positive $3,000. Here's the breakdown by week..."
     → RELEVANT. Longer answer, but all on-topic.


  IRRELEVANT:

  1. User: "What were my expenses last month?"
     Agent: "Your revenue last month was $10,000."
     → IRRELEVANT. User asked about expenses, got revenue.
  
  2. User: "How do I create an invoice?"
     Agent: "QuickBooks has many great features for small businesses. 
             You can track expenses, manage payroll, and more."
     → IRRELEVANT. Generic response that doesn't address the question.
  
  3. User: "What's my profit margin?"
     Agent: "It's important to regularly review your financial statements. 
             Would you like tips on financial best practices?"
     → IRRELEVANT. Deflected instead of answering.
  
  4. User: "Who owes me the most money?"
     Agent: "Your total accounts receivable is $25,000."
     → PARTIALLY RELEVANT. Related topic but didn't answer the actual question
        (who owes the most, not the total).


  EDGE CASES:

  1. Agent asks clarifying question:
     User: "Show me my data"
     Agent: "I'd be happy to help. Are you looking for expenses, revenue, 
             customers, or something else?"
     → RELEVANT. Clarification is appropriate for vague requests.
  
  2. Agent redirects appropriately:
     User: "What's the stock price of Apple?"
     Agent: "I focus on your QuickBooks data and can't look up stock prices. 
             Is there something about your business finances I can help with?"
     → RELEVANT. Honest about scope, offers appropriate alternative.
  
  3. Agent provides extra context:
     User: "What were my sales last month?"
     Agent: "Your sales last month were $50,000. That's up 10% from the 
             previous month."
     → RELEVANT. Extra comparison is on-topic and potentially useful.
</Examples>
```

---

### 6c. Remove the overlaps

```xml
<Overlap_Clarification>
  DO NOT penalize under Relevance for:
  
  - Wrong information → That's CORRECTNESS
  - Missing parts of the answer → That's COMPLETENESS
  - Being too long or verbose → That's VOICE/TONE (if it matters at all)
  - Not matching GT exactly → That's CORRECTNESS
  
  ONLY penalize under Relevance for:
  - Answering a different question
  - Going off-topic
  - Providing unusable information
  - Ignoring the user's actual request
</Overlap_Clarification>
```

---

### 6d. Clarify when clarifying questions are OK

```xml
<Clarifying_Questions_Guidance>
  WHEN CLARIFYING QUESTIONS ARE APPROPRIATE:
  - User's request is genuinely ambiguous ("show me my data")
  - Multiple interpretations are possible
  - Getting it wrong would waste the user's time
  
  WHEN CLARIFYING QUESTIONS ARE INAPPROPRIATE:
  - The request is clear and the agent is stalling
  - The agent could make a reasonable assumption and offer to refine
  - The question is asked instead of attempting an answer
  
  GOOD: "Are you looking for expenses or revenue?" (genuinely ambiguous)
  BAD: "Could you please clarify what you mean by 'expenses'?" (clear term)
</Clarifying_Questions_Guidance>
```

---

### 6e. Rewrite Instructions

```xml
<Instructions>
  1. Identify what the user actually asked
     - What's the topic?
     - What specific information do they want?
  
  2. Check if the response addresses that topic
     - Does it answer the question asked?
     - Or does it answer a different question?
  
  3. Allow for:
     - Wrong answers (that's correctness)
     - Incomplete answers (that's completeness)
     - Extra context that's on-topic
     - Appropriate clarifying questions for ambiguous requests
  
  4. Penalize for:
     - Off-topic responses
     - Answering a different question than asked
     - Deflecting without attempting to help
     - Generic responses that don't address the specific request
  
  5. Final check:
     - If you only saw the question and response, would you say 
       "that's what they asked about"?
</Instructions>
```

---

## Step 7: Assemble the full rewrite

```xml
<Rubric>
  A RELEVANT response addresses the question the user actually asked and 
  stays on topic.

  RELEVANT even if imperfect:
  - Wrong answer to the right question (correctness issue, not relevance)
  - Incomplete answer on the right topic (completeness issue)
  - Long answer that stays on topic (style issue)
  - Extra context that relates to the question

  IRRELEVANT:
  - Answers a different question
  - Goes off on unrelated tangents
  - Deflects without addressing the request
  - Generic response that ignores specifics
</Rubric>

<Examples>
  RELEVANT:
  - Asked about expenses, got expenses (even if wrong number)
  - Asked how to create invoice, got invoice steps (even with extras)
  - Vague request, got appropriate clarifying question

  IRRELEVANT:
  - Asked about expenses, got revenue
  - Asked specific question, got generic product pitch
  - Asked direct question, got deflection
</Examples>

<Overlap_Clarification>
  Wrong info = Correctness. Missing info = Completeness. 
  Relevance ONLY = Did they address the right topic?
</Overlap_Clarification>

<Instructions>
  1. What did the user ask about?
  2. Does the response address that topic?
  3. Don't penalize for wrong/incomplete — that's other metrics
  4. Penalize for off-topic, deflection, or ignoring the question
</Instructions>

<Reminder>
  The test: Does the response address what was asked?
  Wrong answer to right question = Relevant.
  Right answer to wrong question = Irrelevant.
</Reminder>
```

---

## Step 8: Test against scenarios

| Scenario | Old rubric | New rubric |
|----------|------------|------------|
| Wrong expense number | Might fail (doesn't match GT) | PASS relevance, FAIL correctness |
| Long but on-topic answer | Might fail (not brief) | PASS (on-topic matters, not length) |
| Short off-topic answer | Might pass (brief!) | FAIL (wrong topic) |
| Clarifying question for vague request | Might fail | PASS (appropriate clarification) |

---

## Step 9: What we learned

### Relevance is simpler than it seems

At its core, relevance just asks: "Did the response address what was asked?"

The complications come from metric overlap. Once you cleanly separate relevance from correctness and completeness, the rubric gets much simpler.

### Brevity ≠ Relevance

This is a common conflation. The rubric shouldn't reward short responses just for being short. A detailed, thorough, on-topic response is highly relevant — even if it's long.

### The "wrong question" test

The clearest relevance failure: agent answers a question the user didn't ask.

- User asks about expenses → Agent talks about revenue = Irrelevant
- User asks about one customer → Agent gives aggregate data = Partially irrelevant

This is different from being wrong (correctness) or incomplete (completeness).

---

## Appendix: Quick reference

| User asked about... | Relevant response addresses... |
|--------------------|-------------------------------|
| Expenses | Expenses (not revenue, not general finances) |
| A specific customer | That customer (not all customers) |
| How to do X | How to do X (not why X is important) |
| A number | That number (not a related but different number) |

---

*This rubric should produce cleaner separation between metrics. Relevance = topic. Correctness = accuracy. Completeness = coverage.*
