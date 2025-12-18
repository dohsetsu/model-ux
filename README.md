# Model UX Resources

A collection of documentation, frameworks, and guides for the **Model UX** discipline — the practice of ensuring AI-powered products behave correctly and deliver high-quality user experiences at scale.

---

## What is Model UX?

Model UX sits at the intersection of Content Design, Product Design, and AI Engineering. While traditional Content Design focuses on what appears in a product's UI, Model UX focuses on the **systems that generate content** — the instructions, evaluations, and quality frameworks that shape how AI models respond to users.

> **Core question:** "Is this AI system behaving correctly — and how do we know?"

---

## Documentation

### For Leadership & Stakeholders

| Document | Description |
|----------|-------------|
| [Model UX Role Description](docs/MODEL_UX_ROLE_DESCRIPTION.md) | What the role does, key deliverables, business value, and how it differs from traditional CD |

### For Practitioners & Content Designers

| Document | Description |
|----------|-------------|
| [Model UX Evolution Guide](docs/MODEL_UX_EVOLUTION.md) | How Content Design skills translate to Model UX, new skills to develop, and getting started |
| [Eval Rubrics CD Guide](docs/eval/EVAL_RUBRICS_CD_GUIDE.md) | How to think about evals, write rubrics, and avoid common traps |

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

## Quick Links

- **Role definition:** [MODEL_UX_ROLE_DESCRIPTION.md](docs/MODEL_UX_ROLE_DESCRIPTION.md)
- **Career evolution:** [MODEL_UX_EVOLUTION.md](docs/MODEL_UX_EVOLUTION.md)
- **Eval guide:** [EVAL_RUBRICS_CD_GUIDE.md](docs/eval/EVAL_RUBRICS_CD_GUIDE.md)

---

## About

This repository is maintained by Jason Bice as a resource for anyone interested in the Model UX discipline — whether you're a Content Designer looking to expand your skills, a leader trying to understand the role, or an engineer wanting to collaborate more effectively with Model UX practitioners.

**Questions?** Reach out to Jason Bice (jbice@).

---

*Model UX isn't replacing Content Design — it's extending it into new territory created by the rise of AI-powered products.*
