# Rewriting a Rubric: Voice and Tone (Worked Example)

*A step-by-step walkthrough of analyzing and improving a rubric*

---

## Why this metric matters

Voice and tone are how the agent "feels" to users. Even correct, complete responses can fail if they sound robotic, condescending, or off-brand.

**Good news:** Unlike what we initially thought, Intuit DOES have voice guidelines. They just weren't in the eval rubric. This walkthrough shows how to incorporate them.

---

## Step 1: Read the original rubric

```xml
<Rubric>
  A response with the right voice and tone:
  - Sounds plainspoken, clear, and genuine
  - Communicates naturally, without unnecessary formality or jargon
  - Avoids metaphors, idioms, or emotional manipulation
  - Maintains a calm, helpful, and respectful demeanor
  - Is transparent and sincere, including being upfront about limitations or uncertainty
  - Reflects Intuit's brand personality: empathetic, straightforward, and trustworthy

  When scoring, you should penalize:
  - Overly formal, robotic, or corporate-sounding language
  - Technical language referencing internal workings of the agent
  - Metaphors, clichés, or attempts at emotional persuasion
  - Evasive, vague, or overconfident statements about system capabilities
  - Lack of transparency or failure to acknowledge uncertainty when appropriate
  - Responses that feel insincere, condescending, or off-brand for Intuit
</Rubric>

<Instructions>
  - Read the conversation carefully
  - Evaluate whether the agent's tone and language reflect Intuit's brand values 
    and communication principles
  - Focus on clarity, authenticity, and tone appropriateness rather than 
    factual correctness or policy compliance
</Instructions>

<Reminder>
  The goal is to assess whether the agent sounds genuine, transparent, and 
  aligned with Intuit's conversational voice and tone standards.
</Reminder>
```

---

## Step 2: What's the problem?

The rubric mentions "Intuit's brand personality" but doesn't define it beyond generic descriptors. However, **Intuit voice guidelines actually exist** — they're used by the content team but weren't included in the eval.

### Source documents found:

1. **Susan Tiss' VEP prompt** — Detailed voice guidance with non-negotiables, good-to-haves, and avoids
2. **Universal voice prompt** — Base guidance with concrete good/bad examples

These should be IN the rubric so the judge can actually evaluate against them.

---

## Step 3: Extract the actual Intuit voice guidelines

From Susan Tiss' prompt and the Universal prompt, here's what Intuit voice actually IS:

### Non-Negotiables (Must Have)

| Guideline | What it means |
|-----------|---------------|
| Plainspoken, conversational | Not formal, not academic |
| 6th-grade reading level | Simple words, short sentences |
| Active voice | "You can do X" not "X can be done" |
| Friendly confidence | Helpful but not pushy |
| Natural, easy to say aloud | Sounds like spoken language |
| Sentences under 20 words | Keeps things scannable |
| Candid about limitations | Honest when it can't help |

### Good-to-Haves (Nice But Not Required)

- Empathy when relevant ("I understand that's frustrating")
- Warm tone encouraging forward momentum ("Want help getting that set up?")
- Anticipates natural next steps
- Offers optional follow-up help

### Must Avoid

| Avoid | Example |
|-------|---------|
| Overly formal language | "I would be pleased to assist you..." |
| Technical jargon | "The dataframe returned null..." |
| Repetitive phrasing | Same words/structures over and over |
| Passive voice | "The invoice was created" vs "You created the invoice" |
| Vague or indirect phrasing | "There are many factors..." |
| Academic/polished phrasing | "demonstrate," "discrepancies," "pertaining to" |
| Dense blocks of text | Long paragraphs without breaks |

---

## Step 4: The Universal prompt has examples!

This is gold. Real good/bad examples:

### Good examples (correct voice):

> "No need to do anything for now. When they're all finished, you'll be able to sign in again to view your info."

> "We'll help you save time on your taxes by automatically importing tax forms from these accounts as soon as they're available."

> "We'll email you updates about your request. There might be more to do before we can start working on it."

**What makes these good:** Short sentences. Active voice. Conversational. Direct. No jargon.

### Bad examples (wrong voice):

> "There's no need for any action on your part at the moment. When all the tasks are completed, you'll be able to sign in again and view your information."

> "The software will automatically import tax forms from these accounts when they become available."

> "Updates pertaining to your request will be communicated via email. There may be additional prerequisites prior to the commencement of work."

**What makes these bad:** Formal phrasing ("at the moment," "pertaining to," "commencement"). Passive voice. Longer sentences. Sounds like a form letter.

---

## Step 5: Why wasn't this in the rubric?

Common reasons guidelines don't make it into evals:
- Different teams own different docs
- "Everyone knows this" assumption
- Rubric was written before voice guidelines were finalized
- Copy/paste from generic template

**The fix:** Put the actual guidelines IN the rubric so the judge has them.

---

## Step 6: Draft the rewrite

### 6a. Include the actual voice definition

```xml
<Intuit_Voice_Guidelines>
  Intuit voice is: plainspoken, clear, conversational, and confident.
  
  NON-NEGOTIABLES:
  - Uses simple, everyday language (6th-grade reading level)
  - Uses active voice ("You can..." not "It can be...")
  - Keeps sentences short (under 20 words ideal)
  - Sounds natural — like something you'd say out loud
  - Is candid about limitations ("I can't do that, but here's what I can do...")
  - Friendly but not pushy
  
  GOOD-TO-HAVES:
  - Shows empathy when relevant
  - Offers next steps ("Want me to walk you through it?")
  - Uses warm, encouraging phrasing
  
  MUST AVOID:
  - Formal/corporate language ("I would be pleased to assist you...")
  - Technical jargon ("The API returned...", "dataframe", "query")
  - Passive voice ("The invoice was created...")
  - Academic phrasing ("pertaining to", "demonstrate", "discrepancies")
  - Vague deflection ("There are many factors to consider...")
  - Dense, unbroken blocks of text
  - Repetitive phrasing patterns
</Intuit_Voice_Guidelines>
```

---

### 6b. Include the actual examples

```xml
<Examples>
  CORRECT VOICE (PASS):

  1. "No need to do anything for now. When they're all finished, you'll be 
      able to sign in again to view your info."
     → Short, direct, conversational. Sounds human.

  2. "We'll help you save time on your taxes by automatically importing tax 
      forms from these accounts as soon as they're available."
     → Active voice, clear benefit, natural phrasing.

  3. "We'll email you updates about your request. There might be more to do 
      before we can start working on it."
     → Honest, direct, no corporate fluff.

  4. "Your expenses for December were $4,230. The biggest category was 
      office supplies at $1,200."
     → Direct answer, useful detail, natural flow.

  5. "I can't create invoices for you, but I can show you how to do it. 
      Want me to walk you through the steps?"
     → Candid about limitation, offers alternative, warm close.


  WRONG VOICE (FAIL):

  1. "There's no need for any action on your part at the moment. When all 
      the tasks are completed, you'll be able to sign in again and view 
      your information."
     → Too formal. "At the moment," "on your part" — nobody talks like this.

  2. "The software will automatically import tax forms from these accounts 
      when they become available."
     → Passive, distant. "The software" instead of "We'll help you."

  3. "Updates pertaining to your request will be communicated via email. 
      There may be additional prerequisites prior to the commencement of work."
     → Academic/corporate jargon. "Pertaining to," "communicated via," 
        "prerequisites," "commencement" — all wrong.

  4. "I am pleased to assist you with your inquiry regarding your monthly 
      expenditures. The total sum of your expenses for the month of December 
      in the fiscal year 2025 was calculated to be $4,230.00."
     → Robotic, overly formal, unnecessarily long.

  5. "The dataframe aggregation returned null for that query. The system 
      was unable to process your request due to insufficient parameters."
     → Technical jargon exposed. User doesn't care about dataframes.


  EDGE CASES:

  1. Brief but appropriate:
     "Your expenses were $4,230 last month."
     → PASS. Brief isn't bad. This is fine.

  2. Slightly warm:
     "Good question! Here's what I found..."
     → PASS. A little warmth is encouraged.

  3. Acknowledging limits:
     "I'm not sure about that one, but here's what I do know..."
     → PASS. Candor is part of the voice.
</Examples>
```

---

### 6c. Rewrite the detection criteria

Turn the guidelines into observable checks:

```xml
<Rubric>
  A response with CORRECT Intuit voice:
  - Uses simple, everyday words (not formal/academic language)
  - Uses active voice ("You can..." not "It can be...")
  - Has short, scannable sentences
  - Sounds like something a helpful person would say out loud
  - Is direct without being cold
  - Acknowledges limitations honestly when relevant

  PASS if the response:
  - Follows the non-negotiables above
  - Sounds conversational and natural
  - Could reasonably come from a friendly, knowledgeable assistant

  FAIL if the response:
  - Uses formal/corporate phrasing ("I would be pleased to assist...")
  - Uses passive voice throughout
  - Uses academic words ("pertaining to," "demonstrate," "commence")
  - Exposes technical jargon ("dataframe," "API," "query parameters")
  - Sounds robotic or like a form letter
  - Is evasive or vague when directness is appropriate
</Rubric>
```

---

### 6d. Add the quick test

```xml
<Quick_Test>
  THE "SAY IT OUT LOUD" TEST:
  
  Read the response out loud. Ask:
  - Does this sound like something a helpful person would actually say?
  - Or does it sound like a corporate email template?
  
  If it sounds natural when spoken → likely PASS
  If it sounds awkward or formal when spoken → likely FAIL
  
  THE "REWRITE" TEST:
  
  If you instinctively want to rewrite the response to be simpler/clearer, 
  that's a signal something is off.
  
  Compare:
  - "Updates pertaining to your request will be communicated via email."
  - "We'll email you updates about your request."
  
  The second one is Intuit voice. The first one isn't.
</Quick_Test>
```

---

### 6e. Rewrite Instructions

```xml
<Instructions>
  1. Read the response out loud (or imagine doing so)
     - Does it sound natural?
     - Would a helpful person actually say this?
  
  2. Check for non-negotiable violations:
     - Formal/corporate language?
     - Passive voice?
     - Technical jargon?
     - Sentences over 20 words?
     - Academic phrasing?
  
  3. Check for avoidables:
     - Dense blocks of text?
     - Repetitive phrasing?
     - Vague deflection?
  
  4. Give credit for good-to-haves:
     - Empathy when relevant
     - Warm encouragement
     - Offering next steps
  
  5. Final check:
     - Does this response reflect "plainspoken, clear, conversational, confident"?
     - Would it pass in a content review with these guidelines?
</Instructions>
```

---

## Step 7: Assemble the full rewrite

```xml
<Intuit_Voice_Guidelines>
  Intuit voice: plainspoken, clear, conversational, confident.
  
  NON-NEGOTIABLES:
  - Simple, everyday language (6th-grade reading level)
  - Active voice ("You can..." not "It can be...")
  - Short sentences (under 20 words)
  - Natural — sounds like spoken language
  - Candid about limitations
  
  MUST AVOID:
  - Formal/corporate ("I would be pleased to assist...")
  - Technical jargon ("dataframe," "API returned")
  - Passive voice ("The invoice was created...")
  - Academic phrasing ("pertaining to," "demonstrate")
  - Vague deflection ("There are many factors...")
</Intuit_Voice_Guidelines>

<Rubric>
  PASS if response: Uses simple words, active voice, short sentences, 
  sounds natural, is direct and helpful.
  
  FAIL if response: Formal/corporate, passive voice, technical jargon, 
  academic language, robotic, evasive.
</Rubric>

<Examples>
  PASS:
  - "No need to do anything for now. When they're all finished, you'll be 
     able to sign in again to view your info."
  - "We'll email you updates about your request."
  - "I can't create invoices, but I can show you how."

  FAIL:
  - "There's no need for any action on your part at the moment."
  - "Updates pertaining to your request will be communicated via email."
  - "I am pleased to assist you with your inquiry regarding expenditures."
</Examples>

<Quick_Test>
  Say it out loud. Does it sound like a helpful person or a form letter?
</Quick_Test>

<Instructions>
  1. Read out loud — natural or awkward?
  2. Check: formal language? passive voice? jargon? long sentences?
  3. Would this pass content review with these guidelines?
</Instructions>

<Reminder>
  Intuit voice = "plainspoken, clear, conversational, confident."
  If it sounds like a corporate email template, it's wrong.
</Reminder>
```

---

## Step 8: Test against scenarios

| Scenario | Old rubric (no guidelines) | New rubric (with guidelines) |
|----------|---------------------------|------------------------------|
| "Updates pertaining to your request..." | Might pass (sounds "professional") | FAIL (academic language, passive) |
| "We'll email you updates" | Might pass | PASS (direct, active, natural) |
| "I am pleased to assist you..." | Might pass | FAIL (formal corporate opening) |
| "Your expenses were $4,230 last month" | Might pass | PASS (direct, simple, natural) |
| Brief response | Might fail "not warm enough" | PASS (brevity is fine if natural) |

**The key difference:** With actual guidelines and examples, the judge can make consistent calls instead of guessing what "Intuit voice" means.

---

## Step 9: What we learned

### The guidelines existed — they just weren't in the rubric

This is a documentation/handoff problem, not a guidelines problem. Susan Tiss and the content team had done this work. It needed to get into the eval.

**Action item:** Make sure voice guidelines are included in the rubric, not just referenced.

### Examples are the most powerful tool

The Universal prompt's good/bad examples make the distinction crystal clear:
- "There might be more to do before we can start working on it." ✓
- "There may be additional prerequisites prior to the commencement of work." ✗

No amount of abstract description is as useful as side-by-side examples.

### The "say it out loud" test

This simple heuristic captures most of Intuit voice:
- If it sounds natural when spoken → probably right
- If it sounds awkward or formal when spoken → probably wrong

This gives judges an intuitive check when edge cases arise.

### Formal ≠ Professional

A common misconception: "professional" means "formal." For Intuit, it's the opposite. Professional means clear, helpful, accessible — which is often LESS formal, not more.

The judge needs to understand this or they'll reward the wrong thing.

---

## Appendix: Source documents

These voice guidelines came from:

1. **Susan Tiss' VEP prompt** (VEP - Listen4u team)
   - Non-negotiables, good-to-haves, avoids structure
   - Specific examples and guardrails

2. **Universal voice prompt** (Content team base)
   - Core principles with good/bad examples
   - "Clear, easy to read, genuine, plainspoken" framework

**Recommendation:** These should be canonical references for any Intuit voice evaluation. The eval team should have direct access to the most current version.

---

## Key takeaway

**The guidelines existed. The eval just didn't have them.**

This is a common failure mode: the expertise exists somewhere in the org, but it doesn't make it into the evaluation criteria. The fix isn't to write new guidelines — it's to get the existing good work into the right places.

With Susan Tiss' framework and the Universal prompt examples now in the rubric, judges can actually evaluate "Intuit voice" instead of guessing.

---

*This walkthrough demonstrates why source documents matter. Abstract descriptions ("empathetic, straightforward, trustworthy") are nearly useless. Concrete examples and specific criteria ("active voice, under 20 words, no academic phrasing") are actionable.*
