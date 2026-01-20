# Context Summary: model-ux-projects

**Last Updated:** January 20, 2026  
**Owner:** Jason Bice (Model UX)

---

## What This Repo Is

**Home base** for Model UX discipline work — tools, guides, and practices that define what "Model UX" means as an evolved content design role.

**Not project-specific.** This repo is about the *discipline*, not a specific product eval. For Omni-specific work, see `omni-eval-improvements`.

---

## What's Here

```
model-ux-projects/
├── README.md                        # Start here — leadership + practitioner overview
├── CONTEXT_SUMMARY.md               # You are here
│
├── docs/
│   ├── MODEL_UX_ROLE_DESCRIPTION.md # For leadership: what the role does
│   ├── MODEL_UX_WHY_IT_EXISTS.md    # The gap before Model UX existed
│   ├── MODEL_UX_EVOLUTION.md        # How CD skills transfer to Model UX
│   ├── EVAL_PRIMER.md               # ⭐ Foundational eval explainer (long, comprehensive)
│   │
│   ├── eval/                        # Rubric craft resources
│   │   ├── RUBRIC_CRAFT_GUIDE.md    # How to write effective rubrics
│   │   └── RUBRIC_REWRITES.md       # Before/after examples for 6 metrics
│   │
│   ├── research/
│   │   └── RESEARCH_FOUNDATION.md   # Academic backing (CHI/UIST 2020-2024)
│   │
│   └── images/                      # Screenshots (debug, examples)
│
└── tools/
    ├── eval_playground/             # Interactive Streamlit demo
    │   ├── app.py
    │   ├── requirements.txt
    │   └── README.md
    │
    └── doc-extractor/               # Google Apps Script for doc extraction
        ├── Code.gs
        └── README.md
```

**Note:** Reference files (`.docx`, `.rtf`, `.pdf`, `.png`, personal notes) in `docs/eval/` are gitignored — they exist locally but aren't tracked.

---

## Reading Order for New Readers

If you're new to this repo, here's the recommended path:

| Order | Document | Time | What you'll learn |
|-------|----------|------|-------------------|
| 1 | [README.md](README.md) | 5 min | Overview of Model UX, quick links |
| 2 | [MODEL_UX_WHY_IT_EXISTS.md](docs/MODEL_UX_WHY_IT_EXISTS.md) | 5 min | The problem Model UX solves |
| 3 | [MODEL_UX_EVOLUTION.md](docs/MODEL_UX_EVOLUTION.md) | 10 min | How CD skills transfer |
| 4 | [EVAL_PRIMER.md](docs/EVAL_PRIMER.md) | 30 min | Deep dive on evals (the meat) |
| 5 | [RUBRIC_CRAFT_GUIDE.md](docs/eval/RUBRIC_CRAFT_GUIDE.md) | 20 min | How to write good rubrics |

For leadership presentations, use:
- [MODEL_UX_ROLE_DESCRIPTION.md](docs/MODEL_UX_ROLE_DESCRIPTION.md)
- [RESEARCH_FOUNDATION.md](docs/research/RESEARCH_FOUNDATION.md)

---

## What is "Model UX"?

Model UX is the evolution of content design for AI/LLM products. It bridges:

- **Content Design** — Voice, tone, clarity, user understanding
- **Prompt Engineering** — How to instruct models effectively  
- **Evaluation** — How to measure if AI responses are good

**Key insight:** Traditional CD instincts (brevity, simplicity) sometimes work *opposite* in LLM contexts. Rubrics can be long. Models don't have cognitive load. Few-shot examples matter more than elegant prose.

---

## Key Concepts

1. **Rubrics are prompts** — Everything we know about prompting applies to rubrics
2. **Few-shot examples anchor judgment** — Most important part of any rubric
3. **Definition vs Detection** — Rubrics need both "what good looks like" AND "how to check"
4. **One error, one penalty** — Avoid double-counting across metrics
5. **Agent-aware evaluation** — Different agents need different success criteria

---

## Tools

### Eval Playground

Interactive demo showing how rubric choice affects eval results.

```bash
cd tools/eval_playground
source venv/bin/activate
export OPENAI_API_KEY="your-key"
streamlit run app.py --server.headless true
```

Opens at http://localhost:8501

### Doc Extractor

Google Apps Script for extracting content from Google Docs (useful for pulling docs into Cursor).

See [tools/doc-extractor/README.md](tools/doc-extractor/README.md)

---

## Related Repos

| Repo | Purpose |
|------|---------|
| `omni-eval-improvements` | Omni-specific eval analysis and improvements |
| `bi-research-test` | BI agent development |

---

## When to Work Here vs. Elsewhere

**Work here when:**
- Building Model UX as a discipline
- Creating training materials or guides
- Developing tools for Model UX work
- Adding to the research foundation

**Work in `omni-eval-improvements` when:**
- Analyzing specific Omni eval results
- Proposing changes to Omni's eval setup
- Debugging agent-specific issues
