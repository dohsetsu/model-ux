# Eval Rubric Alignment Proposal
## Starting with Voice & Tone, Applicable to All Metrics

**Author:** Jason Bice  
**Date:** December 10, 2025  
**Status:** Ready for Review

> **Location:** This doc lives in Roshni's BI team repo (`reporting/bi-research-test`) on the `jbice/eval-analysis` branch.  
> **Commenting:** A Google Doc copy is available for inline comments — this GitHub version is the source of truth.

---

## Why this matters (beyond the 5%)

While voice_tone carries only 5% weight, **the patterns observed here likely apply more broadly**:

- Rubrics appear to reference standards that we couldn't find embedded in agent prompts
- Agent-specific designs (documented in the routing config) don't seem to be reflected in evaluation criteria
- Some subjective metrics show inconsistency that raises questions about reliability

Voice_tone may be the "canary in the coal mine". If these patterns exist here, they likely exist across completeness, relevance, and potentially other metrics.

**This document proposes a methodology for rubric improvement that could be applied systematically — but we'd benefit from collaborating with the Omni team to validate these observations and align on solutions.**

---

## A note on collaboration

I'm relatively new to this team and don't have visibility into all the codebases, documentation, or conversations that have shaped the current eval. My observations are based on what I could find and analyze — I may be missing context.

The Omni team has clearly been working on improvements (the 12/4 eval shows changes were made). It would be valuable to discuss these findings together — more heads are always better, and they have context I don't. 

I've been working with evals since 2022 in various capacities, and I've seen (and built) a lot of them. I just want to help make ours more reliable. If any of my assumptions here are wrong, I'd love to be corrected.

---

## Future consideration: Voice_tone at the Omni level

I've discussed this with Sharon George, and we both think there's a case for rethinking where voice_tone lives architecturally.

### The idea

Voice_tone is about **how** you say things, not **what** you say. It's a brand-level concern that should be consistent across all agents. Rather than defining "what voice_tone sounds like for BI" and "what voice_tone sounds like for Search," etc., voice_tone could be:

- **Applied universally at the Omni level** as a "polish" layer
- **One rubric for all agents** based on Intuit Universal Voice
- **Agent-specific content** (accounting terms, step-by-step instructions, raw data) remains the agent's responsibility

### What this would look like

| Metric | Where it lives | Agent-aware? |
|--------|---------------|--------------|
| Correctness | Agent level | Yes — agents know their domain |
| Completeness | Agent level | Yes — depth varies by agent purpose |
| Relevance | Agent level | Yes — what's relevant depends on context |
| **Voice_tone** | **Omni level** | **No — universal Intuit standard** |

The voice_tone rubric would include a simple clarification: *"Professional terminology appropriate to the domain (accounting, product features, etc.) is acceptable as long as it's clear and accessible."* This isn't a per-agent rubric — it's a universal standard with a vocabulary exception.

### Why wait

This is a bigger architectural change. For now, we can:
1. **Stabilize the eval** with the improved rubrics proposed here
2. **Validate the methodology** works
3. **Then consider** moving voice_tone to a universal Omni-level check

This is a future improvement, not a blocker for the current proposal.

---

## Executive summary

The current Omni voice_tone rubric references "Intuit brand voice" and "Intuit's conversational voice and tone standards" — but there's no evidence these standards are actually embedded anywhere for our models or agents to learn from. We're measuring against criteria our systems were never taught.

**Key discovery:** The Omni agent routing config ([tools-e2e.yml](https://github.intuit.com/accounting-core/omni-agent-config/blob/master/conversational-ai/tools-e2e.yml)) DOES contain detailed, agent-specific definitions — BI is described as analyzing "financial data for accountants," Search is "retrieval only," etc. The problem is that **the eval rubric doesn't account for these differences**. The system knows what each agent should do; the rubric just doesn't know how to judge them appropriately.

This proposal offers:
1. **A quick fix for voice_tone** (improved rubric grounded in real Intuit docs)
2. **A reusable methodology** for aligning any rubric with agent design
3. **Evidence of systemic issues** that warrant a full eval framework review

---

## How my thinking evolved

As I dug into this, I corrected some of my own assumptions:

**Initial assumption:** "The orchestration layer probably doesn't have specific definitions for each agent."  
**What I found:** The `tools-e2e.yml` config actually has *detailed* agent-specific descriptions — BI is described as doing "structured financial analysis for accountants," Search is "retrieval only," etc. The definitions exist; they're just not reflected in the eval rubric.

**Initial assumption:** "The 12/4 eval improvements probably mean agents got better."  
**What I found:** An apples-to-apples comparison of 261 common test cases showed subjective metrics improved dramatically (+26% completeness, +22% relevance) while correctness barely moved (+4%). This pattern suggests judge tuning made metrics more lenient, though some cases did show genuine agent improvement (e.g., Search going from refusals to actual answers).

**What I still don't know:** Whether Intuit voice guidelines are embedded somewhere I couldn't find, what specific changes were made in the 12/4 "judge tuning," and whether other teams have context that would change these conclusions.

---

## Evidence base

This proposal is informed by:

- **Master eval analysis spreadsheet**: [JYB Eval Analysis](https://docs.google.com/spreadsheets/d/16UfkoCSJoepmmu7ZtWN7c0p9KcNptZ-XoSBaU5vhzlc/edit?gid=763139038#gid=763139038)
- **Omni agent config**: [tools-e2e.yml](https://github.intuit.com/accounting-core/omni-agent-config/blob/master/conversational-ai/tools-e2e.yml) (detailed tool/agent definitions)
- **11/24 vs 12/4 eval comparison**: Apples-to-apples analysis of 261 common test cases
- **Intuit Universal Voice Prompt**: [Voice Prompt Documentation](https://docs.google.com/spreadsheets/d/1FOy6SohDc8xP8E_YvEtcLal8mAHfar8Hb6yJ9QYbJGQ/edit?gid=691212558#gid=691212558)

---

## Observations

### 1. Rubric references standards we couldn't locate

The current voice_tone rubric includes phrases like:
- *"aligned with Intuit's conversational voice and tone standards"*
- *"reflects Intuit brand voice"*

**Open question:** Where are these standards defined for Omni or its agents to reference? In my review, I couldn't find evidence that:
- Omni's system prompt includes Intuit voice guidelines
- Agent prompts (BI, Help, Search) reference these standards
- Any model has been fine-tuned or prompted with Intuit voice examples

*If* agents haven't been taught what "Intuit brand voice" means, the eval may be measuring against criteria the agents were never given. But I may be missing where this lives.

### 2. Agent definitions exist but don't appear in the rubric

This was a key discovery that corrected my earlier assumption. The Omni agent routing config ([tools-e2e.yml](https://github.intuit.com/accounting-core/omni-agent-config/blob/master/conversational-ai/tools-e2e.yml)) actually contains detailed, agent-specific descriptions:

| Agent | Config Description |
|-------|-------------------|
| **BI** | "Analyzes QuickBooks Online financial data to generate reports, calculate metrics, and provide business insights with visualizations. Specializes in structured financial analysis..." |
| **Search** | "Retrieves QuickBooks Online records and returns raw entity data... does NOT calculate totals, counts, balances..." |
| **Help** | "Answers questions about how to use the QuickBooks software product... provides clear, step-by-step instructions..." |

So the system *does* know that BI should produce "structured financial analysis" and Search should return "raw entity data." But from what I can see, the voice_tone rubric doesn't reference these definitions — it uses generic criteria that may penalize BI for being "too structured."

**My hypothesis:** The rubric appears disconnected from agent design. But there may be context I'm missing about why it's structured this way.

### 3. Generic criteria create noise

The rubric uses subjective terms ("conversational," "approachable," "avoids jargon") without:
- Concrete definitions
- Good/bad examples
- Context for specialized agents

This leads to inconsistent verdicts — the same content passes in one row and fails in another.

### 4. Observations from 12/4 "judge tuning" comparison

I compared 261 test cases present in both the 11/24 and 12/4 eval runs:

| Metric | 11/24 Pass Rate | 12/4 Pass Rate | Change |
|--------|-----------------|----------------|--------|
| Completeness | 50% | 76% | **+26%** |
| Relevance | 63% | 85% | **+22%** |
| Voice Tone | 75% | 95% | **+20%** |
| **Correctness** | **63%** | **67%** | **+4%** |

Subjective metrics improved dramatically while correctness barely moved. One interpretation is that judge tuning made subjective metrics more lenient. But I don't have visibility into what changes were actually made, so I can't say for certain.

*(Note: Some cases did show what looks like genuine agent improvement — e.g., Search going from "I can't see your customers" to actually displaying customer data. The data is mixed, which is why discussing with the Omni team would help clarify what's happening.)*

---

## The alignment gap

```
┌─────────────────────────────────────────────────────────────────┐
│  INTUIT VOICE DOCS       AGENT CONFIG/PROMPTS      EVAL RUBRIC │
│  (what we aspire to)     (what agents are          (what we    │
│                           designed to do)           measure)   │
│                                                                │
│  Universal Voice         BI: "structured financial   Generic   │
│  Universal voice         analysis for accountants"   "avoid    │
│  guidelines              Help: "step-by-step"        jargon"   │
│                          Search: "raw entity data"             │
│                                                                │
│           ↑                        ↑                     ↑     │
│           └────── NOT CONNECTED ───┴──── NOT CONNECTED ──┘     │
└─────────────────────────────────────────────────────────────────┘
```

For evals to be meaningful, these three elements must align:
1. **Brand guidelines** define the standard
2. **Agent config/prompts** implement the standard  
3. **Eval rubrics** measure against the standard

Currently, agent definitions exist (in the config), but the rubric doesn't reference them.

---

## Proposed solution: Two-track approach

### Track 1: Quick fix (voice_tone rubric)

Replace the current generic voice_tone rubric with one that:
1. Is grounded in **actual Intuit voice documentation**
2. Uses the **Non-Negotiables / Good-to-Haves / Avoids** framework from the Universal Voice Prompt
3. Includes **agent-aware context** that aligns with existing agent definitions

This can be implemented immediately without agent changes.

### Track 2: Full overhaul (all rubrics)

Every rubric should be reviewed for:
- References to undefined standards
- Conflicts with agent design (as documented in the config)
- Subjective criteria that create noise

---

## Important: Expect more failures initially

If we implement accurate rubrics without updating agent prompts, **pass rates will drop**. This is the correct outcome.

| Approach | Short-term | Long-term |
|----------|------------|-----------|
| Lower the bar (easier rubric) | Pass rates up | No real improvement |
| **Raise the bar (accurate rubric)** | Pass rates drop | Real quality gains |

More failures = **signal, not noise**. They tell us exactly where to focus agent improvements.

We should not game metrics to make agents pass. We should measure accurately so we can improve.

---

## Proposed rubric: Universal voice & tone

```
You are evaluating an AI assistant's response for VOICE & TONE alignment with Intuit brand standards.

## Intuit Voice Non-Negotiables (MUST have all):
- **Plainspoken**: Uses simple words and active voice; avoids passive constructions
- **Clear**: Brief and to the point; no overexplaining or verbose language
- **Genuine**: Conversational but not chatty; candid about limitations
- **Accessible**: Friendly and empathetic; no judgment or condescension
- **Readable**: Not repetitive; sentences are scannable

## Good-to-Haves (positive signals):
- Warm tone that encourages forward momentum
- Acknowledges user concerns with empathy when relevant
- Uses common contractions naturally
- Anticipates logical next steps

## Avoids (negative signals):
- Formal or robotic tone ("I would be pleased to assist you…")
- Vague or indirect phrasing
- Academic or overly polished language ("demonstrate," "discrepancies," "pertaining to")
- Repeating the question back in the answer
- Saying "Remember" at the end (condescending)
- Dense, unbroken blocks of text

## Output Format Guidance:
- Bulleted lists for items are APPROPRIATE
- Numbered lists for sequential steps are APPROPRIATE  
- Tables for comparisons or structured data are APPROPRIATE
- Short paragraphs for easy scanning are APPROPRIATE

---

Score TRUE if the response:
- Meets all Non-Negotiables
- Uses formatting appropriate to the content type
- Sounds like something a helpful person would actually say

Score FALSE if the response:
- Violates any Non-Negotiable (robotic, formal, condescending, verbose)
- Uses academic/corporate language that obscures meaning
- Exposes internal system language (dataframe, SQL errors, technical stack)

Response: {response}

Output your verdict as JSON: {"verdict": true/false, "reasoning": "..."}
```

---

## Proposed rubric: Agent-aware enhancement

These adjustments align with the agent definitions already documented in [tools-e2e.yml](https://github.intuit.com/accounting-core/omni-agent-config/blob/master/conversational-ai/tools-e2e.yml):

```
## Agent Context Adjustments:

**For Business Intelligence / Financial Data agents:**
(Config: "Analyzes QuickBooks Online financial data to generate reports, 
calculate metrics, and provide business insights with visualizations")
- Accounting terminology (accrual, cash basis, net income, DSO) is EXPECTED 
  professional language for the CPA/bookkeeper audience—not jargon to avoid
- Structured tables and reports ALIGN with Intuit format guidance
- Professional tone is appropriate; persona is "Staff Accountant"
- Goal: Accessible without losing technical rigor

**For Help / How-To agents:**
(Config: "Answers questions about how to use the QuickBooks software product... 
provides clear, step-by-step instructions")
- Step-by-step numbered lists are ideal
- 6th-grade reading level target
- Warm, encouraging tone

**For Search / Retrieval agents:**
(Config: "Retrieves QuickBooks Online records and returns raw entity data... 
does NOT calculate totals, counts, balances")
- Brief, factual responses expected
- Minimal elaboration appropriate
- Raw data presentation is by design
```

---

## Why this works

### 1. Grounded in real guidelines
Based on actual Intuit voice documentation ([Universal Voice Prompt](https://docs.google.com/spreadsheets/d/1FOy6SohDc8xP8E_YvEtcLal8mAHfar8Hb6yJ9QYbJGQ/edit?gid=691212558#gid=691212558)), not generic AI evaluation criteria.

### 2. Aligned with existing agent definitions
The agent-aware layer references the same descriptions already in [tools-e2e.yml](https://github.intuit.com/accounting-core/omni-agent-config/blob/master/conversational-ai/tools-e2e.yml) — no new definitions needed.

### 3. Clearer judging criteria
The Non-Negotiables/Avoids framework gives the LLM judge concrete criteria rather than subjective vibes.

### 4. Legitimizes appropriate formatting
Explicitly states that tables, lists, and structured output are APPROPRIATE—removing false failures for well-formatted responses.

### 5. Reduces noise
Specific criteria reduce the "same content, different verdict" inconsistency we've observed.

---

## Good/bad examples (from Intuit docs)

### ✅ Good voice:
> "No need to do anything for now. When they're all finished, you'll be able to sign in again to view your info."

> "We'll help you save time on your taxes by automatically importing tax forms from these accounts as soon as they're available."

### ❌ Bad voice:
> "There's no need for any action on your part at the moment. When all the tasks are completed, you'll be able to sign in again and view your information."

> "Updates pertaining to your request will be communicated via email. There may be additional prerequisites prior to the commencement of work."

---

## Implementation path

### Immediate (Quick Fix)
- Replace current voice_tone rubric text with the Universal rubric above
- Add agent-aware context hints that align with existing config definitions
- This improves measurement accuracy without requiring agent changes
- Accept that pass rates may drop — this is signal

### Short-term (Calibration)
- Run parallel evals with old vs new rubric to quantify impact
- Identify which agents/cases are most affected
- Prioritize agent prompt updates based on findings

### Medium-term (Full Overhaul)
- Review ALL rubrics for similar issues (undefined standards, agent conflicts)
- Ensure rubrics reference the same agent definitions as the routing config
- Consider embedding Intuit voice guidelines into agent prompts where appropriate

---

## Open questions for the team

1. **Why does the rubric reference "Intuit brand voice" if it's not defined anywhere for agents?** Was this intended to be added later?

2. **Should agent-aware rubrics reference the existing config definitions directly?** This would ensure alignment as agents evolve.

3. **What's the appetite for short-term pass rate drops** in exchange for accurate measurement?

4. **Should we apply this same analysis to other rubrics** (completeness, relevance) that may have similar alignment issues?

5. **For BI specifically:** Is the "Staff Accountant" persona the right choice, or should BI become more conversational? (Agent-aware rubrics work either way, but we should decide intentionally.)

---

## Appendix: Source documents

- **Master eval spreadsheet**: [JYB Eval Analysis](https://docs.google.com/spreadsheets/d/16UfkoCSJoepmmu7ZtWN7c0p9KcNptZ-XoSBaU5vhzlc/edit?gid=763139038#gid=763139038)
- **Intuit Universal Voice Prompt**: [Voice Prompt Documentation](https://docs.google.com/spreadsheets/d/1FOy6SohDc8xP8E_YvEtcLal8mAHfar8Hb6yJ9QYbJGQ/edit?gid=691212558#gid=691212558)
- **Omni agent config**: [tools-e2e.yml](https://github.intuit.com/accounting-core/omni-agent-config/blob/master/conversational-ai/tools-e2e.yml)
- **BI Agent prompts.py** (agent-specific persona requirements)
- **11/24 vs 12/4 Eval Comparison** (`EVAL_COMPARISON_12_9.md`)

---

---

## The bigger picture

Voice_tone is just the starting point. The methodology here — grounding rubrics in real documentation, aligning with agent definitions, using concrete criteria instead of subjective vibes — should be applied to **every metric** in our eval framework.

**What we gain from this approach:**
- **Accurate measurement** that reflects actual quality, not gaming
- **Actionable signal** that tells us where to improve agents
- **Trust in results** through consistent, defensible criteria
- **Scalability** as we add new agents and capabilities

The 5% weight of voice_tone doesn't reflect the 100% importance of getting our evaluation methodology right.

---

*This proposal addresses voice_tone as a proof of concept for broader eval framework improvement. The patterns identified and solutions proposed are applicable across all evaluation metrics.*
