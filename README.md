# Model UX Resources

A collection of documentation, frameworks, and guides for the **Model UX** discipline — the practice of ensuring AI-powered products behave correctly and deliver high-quality user experiences at scale.

---

## Why this exists

We've heard it from every stage: *"AI changes everything."* CEOs promise transformation. Entire industries will evolve. Nothing will be the same.

And yet — when Content Designers suggest that *our* roles might change, that our responsibilities might expand, that we might have something essential to contribute to AI product development? Suddenly it's pearl-clutching time.

This disconnect isn't new. Content Design has historically been undervalued — given lip service about importance while being excluded from real decision-making. Our work shapes how millions of people experience products, but we've rarely had a true seat at the table.

**The AI era changes that — if we're willing to change with it.**

Model UX is an invitation: to evolve our craft, to claim expertise in territory that desperately needs it, and to finally be recognized for the strategic value we've always brought. The models are generating language at scale. *Someone* needs to ensure that language is good. That someone should be us.

---

## What is Model UX?

Model UX sits at the intersection of Content Design, Product Design, and AI Engineering. While traditional Content Design focuses on what appears in a product's UI, Model UX focuses on the **systems that generate content** — the instructions, evaluations, and quality frameworks that shape how AI models respond to users.

> **Core question:** "Is this AI system behaving correctly — and how do we know?"

---

## Documentation

### For Leadership & Stakeholders

| Document | Description |
|----------|-------------|
| [Model UX Role Description](docs/MODEL_UX_ROLE_DESCRIPTION.md) | What the role does, key deliverables, business value |
| [Why Model UX Exists](docs/MODEL_UX_WHY_IT_EXISTS.md) | The gap that existed before — who owned what, what broke, how Model UX fills it |
| [Research Foundation](docs/research/RESEARCH_FOUNDATION.md) | Academic validation from CHI/UIST research (2023-2025) |

### For Practitioners & Content Designers

| Document | Description |
|----------|-------------|
| [Model UX Evolution Guide](docs/MODEL_UX_EVOLUTION.md) | How Content Design skills translate to Model UX, new skills to develop |
| [Eval Primer](docs/EVAL_PRIMER.md) | Foundational explainer: what evals are, why they matter, how to read results |
| [Rubric Craft Guide](docs/eval/RUBRIC_CRAFT_GUIDE.md) | How to write effective rubrics — principles, techniques, examples |

---

## Tools

### Google Doc Extractor

A reusable Google Apps Script that extracts **tabs and images** from Google Docs into downloadable ZIP files. Perfect for pulling documentation into local environments (like Cursor) for analysis.

**Features:**
- Extract any Google Docs by URL (one or many)
- Preserves all tabs as separate text files
- Extracts images with markers (`[IMG_1]`, `[IMG_2]`, etc.)
- Tables formatted as text

**Setup:** Create a "Tool Doc" in Google Docs, add the script, and use it to extract any docs you have access to.

See [tools/doc-extractor/README.md](tools/doc-extractor/README.md) for setup instructions.

---

## Key Concepts

### The Instruction → Rubric → Output Triangle

When evaluating AI outputs, always ask:

1. What was the model **instructed** to do?
2. Does the **rubric** measure alignment with those instructions?
3. Does the **output** follow the instructions?

Misalignment at any layer produces different diagnoses and fixes.

### Agent-Aware Evaluation

Multi-agent systems (like Omni) route queries to specialized sub-agents. Each agent has different:
- Capabilities (what it can/can't do)
- Output formats (tables vs. prose vs. confirmations)
- Success criteria (correctness priority vs. relevance priority)

Rubrics must account for these differences to avoid false failures.

### Evals Measure Alignment, Not Style

The eval's job isn't to match human intuition — it's to check alignment with documented instructions. If your intuition says "pass" but the rubric says "fail," investigate which one aligns with the model's actual instructions.

---

## Research Validation

Model UX isn't a made-up role. It's backed by peer-reviewed CHI/UIST research (2023-2025):

> "When non-AI experts design AI from start to finish, they notice gaps and build solutions that AI experts could not." — Michelle S. Lam, Stanford (UIST '24)

Key findings from the research:
- **Non-experts lead better evaluations** — they find issues experts miss
- **Concepts beat hyperparameters** — domain experts explore 136+ model designs in 30 min
- **The gap is real** — AI experts don't understand the domains where AI is deployed

See [Research Foundation](docs/research/RESEARCH_FOUNDATION.md) for full citations and analysis.

---

## Quick Links

| If you want to... | Start here |
|-------------------|------------|
| Explain the role to leadership | [Role Description](docs/MODEL_UX_ROLE_DESCRIPTION.md) |
| Explain why this role needs to exist | [Why Model UX Exists](docs/MODEL_UX_WHY_IT_EXISTS.md) |
| Show academic backing for the discipline | [Research Foundation](docs/research/RESEARCH_FOUNDATION.md) |
| Understand how CD skills transfer | [Evolution Guide](docs/MODEL_UX_EVOLUTION.md) |
| Learn what evals are | [Eval Primer](docs/EVAL_PRIMER.md) |
| Learn to write rubrics | [Rubric Craft Guide](docs/eval/RUBRIC_CRAFT_GUIDE.md) |
| Extract Google Docs for analysis | [Doc Extractor](tools/doc-extractor/) |

---

## About

This repository is maintained by Jason Bice as a resource for anyone interested in the Model UX discipline — whether you're a Content Designer looking to expand your skills, a leader trying to understand the role, or an engineer wanting to collaborate more effectively with Model UX practitioners.

**Questions?** Reach out to Jason Bice (jbice@).

---

*Model UX isn't replacing Content Design — it's extending it into new territory created by the rise of AI-powered products.*
