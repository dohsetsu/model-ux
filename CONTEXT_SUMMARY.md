# Context Summary: model-ux-projects

**Last Updated:** January 15, 2026  
**Owner:** Jason Bice (Model UX)

---

## What This Repo Is

**Home base** for Model UX discipline work. This is the broader umbrella for tools, guides, and practices that define what "Model UX" means as an evolved content design role.

---

## What's Here

```
model-ux-projects/
├── docs/
│   └── eval/
│       ├── RUBRIC_CRAFT_GUIDE.md         # ⭐ Main teaching doc
│       ├── *_WALKTHROUGH.md              # Metric-specific deep dives (6 files)
│       ├── EVAL_RUBRICS_CD_GUIDE.md      # CD-focused eval guide
│       ├── REVISED_RUBRICS_PROPOSAL.md   # Agent-aware rubrics proposal
│       └── VOICE_TONE_RUBRIC_PROPOSAL.md # Voice/tone specific proposal
├── tools/
│   ├── doc-extractor/                    # Google Doc extraction tool
│   │   ├── server.py
│   │   ├── extractor.py
│   │   └── requirements.txt
│   └── eval_playground/                  # Eval experimentation tool
│       └── eval_runner.py
└── README.md
```

---

## What is "Model UX"?

Model UX is the evolution of content design for AI/LLM products. It bridges:
- **Content Design** — Voice, tone, clarity, user understanding
- **Prompt Engineering** — How to instruct models effectively
- **Evaluation** — How to measure if AI responses are good

Key insight: Traditional CD instincts (brevity, simplicity) sometimes work opposite in LLM contexts (rubrics can be long, models don't have cognitive load).

---

## Current State of Work

### Eval/Rubric Work
- ✅ Rubric Craft Guide — teaching doc for writing effective rubrics
- ✅ 6 metric walkthroughs (correctness, completeness, relevance, voice/tone, no hallucination, content compliance)
- ✅ CD Guide for evals — how CDs should think about evaluation

### Tools
- ✅ Doc Extractor — pulls content from Google Docs
- ✅ Eval Playground — for testing rubrics locally

### Discipline Definition
- 🔄 Ongoing — defining what Model UX means, what skills matter
- 🔄 Building case for Model UX as distinct from traditional CD

---

## Key Concepts to Remember

1. **Rubrics can be long** — Models don't have cognitive load like humans
2. **Few-shot examples** — Most important part of any rubric
3. **Definition vs Detection** — Rubrics need both "what good looks like" AND "how to check"
4. **Double-counting problem** — Single errors shouldn't penalize multiple metrics
5. **Capability-based evaluation** — Future direction for scalable rubrics

---

## When to Work Here

- Building Model UX as a discipline
- Creating tools for CD/Model UX work
- Developing training materials
- Anything that's about the *practice* not a specific project

---

## Related Repos

- `omni-eval-improvements` — Specific eval analysis (BI-focused)
- `bi-cot-archive` — Historical CoT project (good case study)
- `bi-research-test` — Team's BI agent (for hands-on agent work)
