# Rewriting a Rubric: No Hallucination (Worked Example)

*A step-by-step walkthrough of analyzing and improving a rubric*

---

## Why this metric matters

"No hallucination" is the trust metric. Users need to know that when the agent states something as fact, it's actually true. Hallucinations erode trust faster than almost any other failure mode.

The challenge: This metric overlaps significantly with **correctness**. We need to clarify where the boundary is.

---

## Step 1: Read the original

```xml
<Rubric>
  A response without hallucinations:
  - Contains only verifiable facts that are directly supported by the internal 
    knowledge, training data, existing context, data from the user's QuickBooks, 
    and any references provided
  - Makes no unsupported claims or assumptions
  - Does not offer or describe functionality that the agent doesn't actually have
  - Does not add speculative or imagined details
  - Maintains perfect accuracy in dates, numbers, and specific details
  - Appropriately indicates uncertainty when information is incomplete
</Rubric>

<Agent Capabilities>
  The agent has the following capabilities:
  - Answer general business and accounting knowledge questions
  - Provide QuickBooks how-to guidance
  - Analyze data provided from a file uploaded by the user
  - Provide answers and insights provided from internal Quickbooks data

  The agent IS NOT able to:
  - Help with human-handoff requests by connecting to a live agent or expert
  - Perform actions in QuickBooks on behalf of the user
  - Search the web
</Agent Capabilities>

<Instructions>
  - Read the conversation transcript thoroughly
  - Identify all claims made in the agent's responses
  - Cross-reference each claim with the internal knowledge, training data, 
    existing context, data from the user's QuickBooks, and any references provided
  - Note any contradictory information
  - Note any actions the agent offers to do that is not part of the agent's capabilities
  - Consider the severity and quantity of hallucinations
</Instructions>

<Reminder>
  Focus solely on factual accuracy. Do not consider style, grammar, or presentation 
  in scoring. A shorter, factual response should score higher than a longer response 
  with unsupported claims.
</Reminder>
```

---

## Step 2: Analyze what's there

### What's working

| Element | Why it helps |
|---------|--------------|
| Agent Capabilities section | Explicitly lists what agent can/can't do |
| "Overpromising" concept | Covers capability hallucination, not just data |
| "Consider severity and quantity" | Acknowledges not all hallucinations are equal |

### What's not working

| Problem | Why it matters |
|---------|----------------|
| **Massive overlap with correctness** | "Perfect accuracy in dates, numbers, and specific details" is literally correctness |
| **Unclear boundary** | When is something a "correctness" issue vs "hallucination"? |
| **"Verifiable facts" is vague** | Verifiable by whom? The judge can't check QuickBooks data |
| **No examples** | Judge has to guess what hallucination looks like |
| **Capability list is generic** | Doesn't cover agent-specific capabilities |
| **"Unsupported claims" undefined** | What counts as unsupported? |

---

## Step 3: The core problem — what IS hallucination?

Let's get precise. Hallucination is NOT the same as being wrong.

| Scenario | Correctness | Hallucination |
|----------|-------------|---------------|
| Agent pulls wrong data from QuickBooks | FAIL | PASS (data exists, just retrieved wrong) |
| Agent invents a customer that doesn't exist | FAIL | FAIL (fabricated entity) |
| Agent says "I can transfer money for you" | N/A | FAIL (capability it doesn't have) |
| Agent rounds 42.3% to 42% | PASS | PASS (simplification, not fabrication) |
| Agent says "Based on your industry trends..." (no industry data) | Depends | FAIL (invoked non-existent data source) |

**The distinction:**
- **Correctness** = Does the response match ground truth?
- **Hallucination** = Did the agent invent/fabricate something that has no basis?

A response can be:
- **Incorrect but not hallucinated** — Agent got wrong data, but data exists
- **Hallucinated but accidentally correct** — Agent guessed and got lucky
- **Both incorrect AND hallucinated** — Agent made up something wrong

---

## Step 4: Real failure patterns

From our analysis, what hallucination-adjacent issues did we see?

| Pattern | What happened | Is it hallucination? |
|---------|---------------|---------------------|
| Wrong customer identified | Agent said ABC Corp, should be XYZ Inc | NO — data retrieval error, not fabrication |
| "You don't have purchase orders" | Agent asserted fact without data | MAYBE — depends if agent had data to check |
| Numbers don't match GT | Agent said $4,230, GT says $5,180 | NO — calculation/retrieval error |
| "I can help you create an invoice" | Agent offered capability it doesn't have | YES — overpromising |
| Agent cited "industry benchmarks" | No benchmark data was provided | YES — invoked non-existent source |

**Key insight:** Most of our failures were correctness issues, not hallucinations. The metrics were double-penalizing.

---

## Step 5: Define the boundary clearly

Here's how I'd separate the two metrics:

**Correctness asks:** "Does the information match reality/ground truth?"

**No Hallucination asks:** "Did the agent fabricate or invent something?"

The test: *Could this error have come from a data retrieval bug, or did the agent have to make something up?*

- Data retrieval bug → Correctness issue
- Made something up → Hallucination

---

## Step 6: Draft the rewrite

### 6a. Rewrite the Rubric section

**Original problems:**
- Overlaps with correctness ("perfect accuracy in numbers")
- Vague ("unsupported claims")

**Rewrite:**

```xml
<Rubric>
  A response WITHOUT hallucinations:
  - Does not invent or fabricate specific details (names, numbers, dates) that 
    have no basis in available data
  - Does not claim to have done something it didn't do
  - Does not offer or describe capabilities the agent doesn't have
  - Does not cite or invoke data sources that weren't provided
  - Acknowledges uncertainty when appropriate rather than guessing

  IMPORTANT: This metric is about FABRICATION, not accuracy.
  
  - If the agent retrieved wrong data → that's a CORRECTNESS issue, not hallucination
  - If the agent invented data that doesn't exist → that's HALLUCINATION
  - If the agent made a calculation error → that's CORRECTNESS
  - If the agent claimed to calculate something it didn't → that's HALLUCINATION
</Rubric>
```

---

### 6b. Add examples

```xml
<Examples>
  NOT HALLUCINATION (even if incorrect):
  
  1. Agent says: "Your total expenses were $4,230"
     GT says: "$5,180"
     → This is a CORRECTNESS issue. The agent retrieved/calculated wrong, 
       but expenses are a real category that exists.
  
  2. Agent says: "Your largest customer is ABC Corp"
     GT says: "Largest customer is XYZ Inc"
     → This is a CORRECTNESS issue. Agent identified wrong entity from real data.
  
  3. Agent rounds: "About 42%" when exact is 42.3%
     → Not hallucination. Reasonable simplification of real data.


  HALLUCINATION:
  
  1. Agent says: "Based on your industry's average profit margin of 15%..."
     → HALLUCINATION if no industry benchmark data was provided. Agent 
       invoked a data source that doesn't exist.
  
  2. Agent says: "I've scheduled that payment for you"
     → HALLUCINATION. Agent claimed to perform an action it cannot perform.
  
  3. Agent says: "Your customer John Smith at 123 Main Street..."
     → HALLUCINATION if no customer John Smith exists in the data. Agent 
       fabricated a specific entity.
  
  4. Agent says: "I can connect you to a live support agent"
     → HALLUCINATION. Agent offered capability it doesn't have.
  
  5. Agent says: "According to IRS guidelines updated last week..."
     → HALLUCINATION if agent has no access to current IRS updates. Agent 
       fabricated a source/timeframe.


  EDGE CASES:
  
  1. Agent says: "You don't have any overdue invoices"
     GT says: "No data available"
     → This is borderline. Agent asserted a business fact without data to 
       support it. Lean toward HALLUCINATION because agent fabricated 
       certainty about something it couldn't verify.
  
  2. Agent says: "This might take a few days to process"
     → NOT hallucination. General knowledge hedged appropriately.
  
  3. Agent says: "Processing typically takes 2-3 business days"
     → Acceptable IF this is established QuickBooks knowledge. Check if 
       this is a fabricated specific or documented fact.
</Examples>
```

---

### 6c. Clarify the capability section

The current capability list is generic. For this to work without multi-agent hinting, we need to be explicit:

```xml
<Capability_Guidance>
  The agent can claim to:
  - Look up data from the user's QuickBooks
  - Analyze financial data and provide insights
  - Answer questions about QuickBooks features
  - Explain accounting concepts
  - Help interpret financial reports

  The agent CANNOT claim to:
  - Perform actions (create invoices, send payments, modify data)
  - Connect to human support
  - Access external websites or current news
  - Know real-time information not in the data
  - Access data from other systems

  If the agent offers to do something in the "cannot" list → FAIL for hallucination
  If the agent claims to have data it couldn't have → FAIL for hallucination
</Capability_Guidance>
```

---

### 6d. Rewrite Instructions

```xml
<Instructions>
  1. Identify specific claims in the response:
     - Names, numbers, dates mentioned
     - Actions the agent claims to have done or can do
     - Sources the agent references
  
  2. For each claim, ask:
     - Could this have come from the user's QuickBooks data? 
     - Could this be established knowledge the agent would have?
     - Or did the agent have to MAKE THIS UP?
  
  3. Check for overpromising:
     - Does the agent offer to DO things it cannot do?
     - Does the agent claim access to data/systems it doesn't have?
  
  4. Distinguish from correctness:
     - Wrong data pulled from real source → Correctness (not hallucination)
     - Data fabricated from nothing → Hallucination
     - Wrong calculation → Correctness
     - Claimed to calculate when didn't → Hallucination
  
  5. When uncertain:
     - Ask: "Did the agent have ANY basis for this claim?"
     - If yes (even if used incorrectly) → not hallucination
     - If no (invented from nothing) → hallucination
</Instructions>
```

---

### 6e. Add the overlap clarification

This is crucial — prevent double-penalties:

```xml
<Overlap_With_Correctness>
  IMPORTANT: Do not penalize for hallucination if the issue is already 
  captured by correctness.
  
  Correctness handles:
  - Wrong numbers, dates, amounts
  - Wrong entities identified
  - Calculation errors
  - Misinterpretation of data
  
  Hallucination handles:
  - Fabricated entities that don't exist
  - Claimed capabilities agent doesn't have
  - Invented sources or references
  - Actions claimed but not performed
  
  If you're unsure which metric applies:
  - Could a bug have caused this? → Correctness
  - Did the agent have to invent this? → Hallucination
</Overlap_With_Correctness>
```

---

## Step 7: Assemble the full rewrite

```xml
<Rubric>
  A response WITHOUT hallucinations:
  - Does not invent or fabricate specific details (names, numbers, dates) that 
    have no basis in available data
  - Does not claim to have done something it didn't do
  - Does not offer or describe capabilities the agent doesn't have
  - Does not cite or invoke data sources that weren't provided
  - Acknowledges uncertainty when appropriate rather than guessing

  IMPORTANT: This metric is about FABRICATION, not accuracy.
  - Wrong data retrieved → CORRECTNESS issue
  - Data invented from nothing → HALLUCINATION
</Rubric>

<Examples>
  NOT HALLUCINATION (correctness issues):
  - Wrong amount: Agent says $4,230, GT says $5,180 (data retrieval error)
  - Wrong entity: Agent says ABC Corp, should be XYZ Inc (identification error)
  - Rounding: Agent says ~42% when exact is 42.3% (simplification)

  HALLUCINATION:
  - "Based on your industry's average of 15%..." (no industry data provided)
  - "I've scheduled that payment for you" (action agent can't perform)
  - "Customer John Smith at 123 Main St" (fabricated entity)
  - "I can connect you to support" (capability agent doesn't have)
  - "According to IRS updates last week" (fabricated source)

  EDGE CASE:
  - "You don't have any overdue invoices" when GT says "No data available"
    → Lean FAIL — agent asserted certainty without data basis
</Examples>

<Capability_Guidance>
  Agent CAN: Look up QuickBooks data, analyze finances, explain features, 
  answer accounting questions
  
  Agent CANNOT: Perform actions, connect to humans, access external sites, 
  know real-time info beyond data provided
  
  Offering "cannot" capabilities = HALLUCINATION
</Capability_Guidance>

<Instructions>
  1. Identify specific claims (names, numbers, actions, sources)
  2. Ask: Could this have come from real data, or was it invented?
  3. Check for overpromising (actions/capabilities claimed)
  4. Distinguish from correctness (wrong vs. fabricated)
  5. When uncertain: Did agent have ANY basis? If no → hallucination
</Instructions>

<Overlap_With_Correctness>
  Do not double-penalize. If it's a data retrieval/calculation error, 
  that's correctness. Hallucination is for fabrication.
</Overlap_With_Correctness>

<Reminder>
  Ask: "Did the agent make something up, or just get something wrong?"
  Made up = Hallucination. Got wrong = Correctness.
</Reminder>
```

---

## Step 8: Test against known cases

| Case | Old approach | New rubric |
|------|--------------|------------|
| $4,230 vs $5,180 | Might fail both metrics | PASS hallucination, FAIL correctness |
| Wrong customer identified | Might fail both | PASS hallucination, FAIL correctness |
| "I can create that invoice" | FAIL | FAIL (overpromising) |
| "Based on industry trends..." | Might miss | FAIL (fabricated source) |
| "You don't have X" (no data) | Inconsistent | FAIL (fabricated certainty) |

The new rubric prevents double-penalties while catching actual fabrication.

---

## Step 9: What we learned

### The key insight

**Hallucination ≠ Incorrectness**

This is the most important distinction. Many teams conflate these, leading to:
- Double-penalties for single errors
- Inflated "hallucination rates" that are really accuracy issues
- Missed actual hallucinations (overpromising, fabricated sources)

### The test

When evaluating a claim, ask: *"Could a bug have caused this, or did the agent have to invent it?"*

- Bug possible → Correctness
- Invention required → Hallucination

### The overlap problem

If two metrics penalize the same thing, you get:
- Inflated failure counts
- Unclear signal about what's actually wrong
- Harder to prioritize fixes

Explicitly stating what each metric does NOT cover prevents this.

---

## Appendix: Hallucination types

| Type | Example | Severity |
|------|---------|----------|
| **Fabricated entity** | Customer/vendor that doesn't exist | High |
| **Fabricated number** | Made-up statistic with no basis | High |
| **Overpromising** | "I can do X" when it can't | High |
| **Fabricated source** | "According to..." (no such source) | Medium |
| **False certainty** | Asserting fact when data unavailable | Medium |
| **Invented detail** | Adding specifics not in data | Medium |

Use this to calibrate severity when multiple issues exist.

---

*Next: Apply this same process to Completeness, Relevance, Voice/Tone, and Content Compliance.*
