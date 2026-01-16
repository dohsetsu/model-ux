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
├── CONTEXT_SUMMARY.md              # You are here
├── README.md                       # Leadership-facing overview
│
├── docs/
│   ├── MODEL_UX_EVOLUTION.md       # How CD skills evolve into Model UX
│   ├── MODEL_UX_ROLE_DESCRIPTION.md # Role definition for leadership
│   ├── EVAL_PRIMER.md              # "What is an eval?" explainer
│   │
│   ├── eval/                       # ⭐ Rubric craft & eval work
│   │   ├── RUBRIC_CRAFT_GUIDE.md           # Main teaching doc
│   │   ├── RUBRIC_REWRITE_GUIDANCE.md      # How to approach rewrites
│   │   ├── JYB_RUBRIC_CRAFT_NOTES.md       # Personal notes
│   │   │
│   │   ├── CORRECTNESS_RUBRIC_REWRITE_WALKTHROUGH.md
│   │   ├── COMPLETENESS_RUBRIC_REWRITE_WALKTHROUGH.md
│   │   ├── RELEVANCE_RUBRIC_REWRITE_WALKTHROUGH.md
│   │   ├── VOICE_TONE_RUBRIC_REWRITE_WALKTHROUGH.md
│   │   ├── NO_HALLUCINATION_RUBRIC_REWRITE_WALKTHROUGH.md
│   │   ├── CONTENT_COMPLIANCE_RUBRIC_REWRITE_WALKTHROUGH.md
│   │   │
│   │   ├── EVAL_RUBRICS_CD_GUIDE.md        # CD-focused eval guide
│   │   ├── REVISED_RUBRICS_PROPOSAL.md     # Agent-aware rubrics proposal
│   │   └── VOICE_TONE_RUBRIC_PROPOSAL.md   # Voice/tone specific proposal
│   │
│   ├── research/
│   │   └── RESEARCH_FOUNDATION.md  # Academic backing (CHI/UIST)
│   │
│   └── images/                     # Debug/reference screenshots
│
└── tools/
    ├── doc-extractor/              # Google Apps Script tool
    │   ├── Code.gs                 # Apps Script code
    │   ├── DocContent.md           # Extracted content output
    │   └── README.md
    │
    └── eval_playground/            # Interactive Streamlit demo
        ├── app.py                  # Main app
        ├── requirements.txt
        └── README.md
```

**Note:** Reference files (.docx, .rtf, .pdf, .png, .txt) in `docs/eval/` are gitignored — they're local research materials.

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
- ✅ Revised rubrics proposal — agent-aware approach

### Tools
- ✅ Doc Extractor — Google Apps Script for pulling content from Google Docs
- ✅ Eval Playground — Streamlit app for testing rubrics interactively

### Discipline Definition
- ✅ Model UX Evolution guide — how CD skills transfer
- ✅ Role Description — leadership-facing definition
- ✅ Research Foundation — academic backing from CHI/UIST

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

---

## Quick Start

**Run the Eval Playground:**
```bash
cd tools/eval_playground
source venv/bin/activate
export OPENAI_API_KEY="your-key"
streamlit run app.py --server.headless true
```
Opens at http://localhost:8501
