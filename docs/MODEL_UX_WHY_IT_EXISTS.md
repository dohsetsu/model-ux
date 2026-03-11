# Why Model UX exists: the gap that had to be filled

*A forensic look at what was broken before—and how Model UX fixes it.*

**Author:** Jason Bice  
**Last updated:** January 2026

---

## TL;DR for leadership

Before Model UX existed, everyone was touching the model, but **no one was designing it**. Content Design focused on voice, Engineering focused on performance, Design built beautiful specs in Figma—and the experience of the model itself fell through the cracks.

**The uncomfortable truth:** Design teams craft detailed typography systems, component specs, and interaction patterns. Everyone reviews them. Everyone approves. Then someone asks: *"Why isn't the model doing this?"* Because no one asked the million-dollar question: **"Does the model know we want this?"**

Model UX fills the "missing layer" between user intent and model reasoning. It ensures the model's reasoning, behavior, and responses are **designed experiences**, not just byproducts of system tuning—and that what gets designed in Figma actually gets translated into what the model does.

---

## (._.) Before Model UX: who did what?

| Responsibility Layer | Who Owned It Before | Resulting Gap or Pain Point |
|---------------------|---------------------|----------------------------|
| **User experience & intent** | UX Research + Content Design | Intent captured, but not translated into model behavior—UX stopped at surface language |
| **Design systems & visual specs** | Product Design | Typography, components, and patterns designed in Figma—but never translated to model instructions |
| **Prompt / instruction design** | Engineers (ad hoc) or PMs | Prompting handled inconsistently—lacked linguistic or contextual nuance |
| **Model reasoning behavior** (CoT, schema, style) | No one clearly owned it | **"The missing layer"**—system behavior evolved accidentally, not intentionally |
| **Evaluation of model outputs** | Research / QA / Eng | Focused on accuracy, not experience or brand expression |
| **Response shaping** (tone, persona, narrative) | Content Design | Adjusted after the fact—couldn't influence underlying reasoning |
| **System documentation & reproducibility** | Engineering | Captured code-level detail, not design-level intent or method |
| **Bridging human experience ↔ model interpretation** | No clear owner | Designers couldn't see model internals; Engineers couldn't see user perception—**no connective tissue** |

---

## (@_@) What was actually happening (and why it failed)

| Responsibility Layer | Who Handled It | Symptoms / What Went Wrong | Why It Was Suboptimal |
|---------------------|----------------|---------------------------|----------------------|
| **Understanding user intent** | UX Research & Content Design | Intent documented in Figma or copydocs, but stopped at the interface | Intent was never expressed as model behavior—translation gap between "what user means" and "what model does" |
| **Design systems & visual specs** | Product Design | Beautiful typography specs, component libraries, and interaction patterns—all in Figma, none in the model | Teams surprised when model "doesn't do what we designed"—no one asked if the model knew about the spec |
| **Prompt / instruction design** | Engineers or PMs (ad hoc) | Prompts written for system efficiency, not linguistic nuance | No design discipline for "instruction writing"; outputs felt robotic, inconsistent, or brittle |
| **Reasoning scaffolds** (CoT, CoE, schema) | Nobody clearly | Model behavior emerged accidentally from examples or fine-tuning | Reasoning style inconsistent, leaky, noisy—no control over how the model thinks |
| **Response shaping** (tone, persona, phrasing) | Content Design | Polished surface-level copy after generation | Tone fixed after reasoning—couldn't address logic or structure errors underneath |
| **Output evaluation / QA** | Eng & Research | Focused on correctness or latency | No lens for user experience of model output—no framework for "feel," clarity, or voice alignment |
| **Behavior reproducibility / documentation** | Eng | Captured code, not intent | When things broke, teams couldn't trace why a model behaved that way—no behavioral audit trail |
| **Cross-functional handoff** (UX ↔ Eng) | PM as translator | Misinterpretations on both sides | UX couldn't affect the model's inner workings; Eng couldn't interpret human-centered requirements |

---

## (>_<) The systemic fails

| Failure Type | Description | Impact |
|--------------|-------------|--------|
| **Ownership gaps** | No one owned the space between user intent and model reasoning | Models behaved unpredictably and inconsistently |
| **Design-to-model disconnect** | Specs built in Figma never translated to model instructions | Teams surprised when model "doesn't do what we designed" |
| **Discipline mismatch** | Linguistic, ethical, or tonal judgment left to engineers; system-level design left to writers | Everyone was half-doing someone else's job badly |
| **Lack of observability** | No visibility into reasoning traces or data influence | Teams couldn't debug or iterate responsibly |
| **Shallow feedback loops** | Evaluation based on correctness, not experience | We optimized for precision, not trust or usability |
| **Post-hoc polish mindset** | Writers "fixed" outputs instead of designing better behaviors | Effort multiplied, results decayed over time |
| **Cultural blind spot** | "Language = copy" assumption | Organizations undervalued the behavioral design dimension entirely |

---

## (~'.')~ The design-to-model gap (a pattern we see constantly)

Here's a scenario that plays out across every AI product team:

1. **Design creates a beautiful spec** — typography scales, component behaviors, interaction patterns, all meticulously documented in Figma
2. **Stakeholders review and approve** — everyone nods, it looks great
3. **Engineering builds the frontend** — CSS matches (mostly)
4. **The model ships** — and doesn't follow any of it
5. **Someone asks:** *"Hey, the model isn't doing what we designed. Can you fix it?"*

The problem? **No one ever asked the million-dollar question:** *"Does the model know we want this?"*

### The pattern in practice

This shows up everywhere: formatting guidelines, response length expectations, when to use bullets vs. prose, how to handle edge cases, what tone to strike in error states. 

Design specs capture these decisions beautifully. But between "approved in Figma" and "live in the product," there's a translation step that doesn't have an owner. The model can't follow rules it was never told about—and no one's job description traditionally includes "make sure the model knows what Design decided."

It's not a failure of any individual or team. It's a structural gap. The workflow assumes the model will somehow inherit the spec, but models don't attend design reviews.

### Why this keeps happening

This isn't anyone's fault—it's a gap in how teams are structured:

- **Designers** build in Figma. They present. Everyone claps. Job done.
- **Engineers** implement the frontend. CSS matches the spec. Job done.
- **The model** was never in the room. No one's job description includes "translate Figma to model instructions."

**Model UX fills this gap.** When Model UX is in the room, we take that Figma spec like a short-order cook takes an order and bring it to the kitchen. We translate design intent into model-understandable instructions.

The problem is that all of this is so new—no one knows who to ask, what to ask for, or how to ask for it. Teams are genuinely surprised when the model doesn't magically inherit what they built in Figma.

### What Model UX does here

| Without Model UX | With Model UX |
|------------------|---------------|
| Design spec lives in Figma only | Design spec translated to prompt instructions |
| No one compares CSS to model output | Model instructions audited against design system |
| "Fix it" requests after launch | Alignment checked before launch |
| Teams surprised by model behavior | Teams informed about what the model knows |

---

## \(^o^)/ After Model UX: filling the missing layer

| Responsibility Layer | Who Owns It Now | What's Different / Improved | Why It Works Better |
|---------------------|-----------------|----------------------------|---------------------|
| **Understanding user intent** | Model UX + UX Research | Intent expressed as behavioral scaffolds (prompts, constraints, evaluation schemas) | Converts human goals → machine-understandable structure |
| **Design systems & visual specs** | Model UX + Product Design | Figma specs translated into model instructions; design system rules encoded in prompts | What gets designed actually gets built—in the model, not just the frontend |
| **Prompt / instruction design** | Model UX + Eng | Prompts designed as interfaces, not hacks | Consistent reasoning behavior; reusable patterns |
| **Reasoning scaffolds** (CoT, CoE, schema) | Model UX | Intentional reasoning style; transparent thinking layers | Makes reasoning inspectable, editable, teachable |
| **Response shaping** (tone, persona, phrasing) | Model UX + Content Design | Voice and tone applied at reasoning level, not just surface | The system "sounds right" because it thinks right |
| **Output evaluation / QA** | Model UX + UXR + Eng | Adds UX-quality metrics (clarity, trust, consistency) | Evaluations now measure experience, not just correctness |
| **Behavior reproducibility / documentation** | Model UX + Eng | Design-level reasoning captured alongside code | Enables behavioral debugging and repeatable improvements |
| **Cross-functional handoff** (UX ↔ Eng) | Model UX as bridge | Shared language and shared artifacts | Eliminates translation loss; both sides iterate on the same behavior |

---

## (°o°) Why this works (summary)

| Problem Before | How Model UX Fixes It |
|----------------|----------------------|
| Intent lost in translation | Encodes user intent directly into prompts, reasoning templates, and evaluations |
| Design specs never reached the model | Translates Figma specs, design systems, and style guides into model instructions |
| Inconsistent behavior | Introduces design governance for reasoning and response layers |
| "Copy polish" seen as surface work | Expands content design into system-level communication design |
| Engineering owned too much language responsibility | Returns linguistic and narrative control to design, where it belongs |
| Teams couldn't see or debug reasoning | Makes reasoning visible and tunable as a design surface |
| Evaluation focused on accuracy only | Adds trust, clarity, and tone fidelity to the metrics stack |
| PMs as translators between silos | Model UX creates a common behavioral framework both sides understand |

---

## (*_*) The core insight

> **Before, language was treated as decoration.**
> 
> **Now, language is treated as infrastructure**—it shapes the model's behavior, reasoning, and how humans experience intelligence itself.

---

## The missing layer visualized

```
┌─────────────────────────────────────────────────────────────┐
│                     USER EXPERIENCE                          │
│              (What the user sees and feels)                  │
├─────────────────────────────────────────────────────────────┤
│                   DESIGN SYSTEMS                             │
│     (Figma specs, typography, components, patterns)          │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│     ┌─────────────────────────────────────────────────┐     │
│     │              ('o') MODEL UX                      │     │
│     │         (The missing layer)                      │     │
│     │                                                  │     │
│     │   • Translates design specs → model instructions │     │
│     │   • Prompts as designed interfaces               │     │
│     │   • Reasoning as inspectable behavior            │     │
│     │   • Evaluation as experience measurement         │     │
│     │   • Documentation as behavioral audit trail      │     │
│     └─────────────────────────────────────────────────┘     │
│                                                              │
├─────────────────────────────────────────────────────────────┤
│                   MODEL REASONING                            │
│           (What the system thinks and does)                  │
├─────────────────────────────────────────────────────────────┤
│                   ENGINEERING                                │
│              (How the system is built)                       │
└─────────────────────────────────────────────────────────────┘
```

---

## Related documents

- [MODEL_UX_EVOLUTION.md](MODEL_UX_EVOLUTION.md) — How CD skills transfer to Model UX
- [MODEL_UX_ROLE_DESCRIPTION.md](MODEL_UX_ROLE_DESCRIPTION.md) — Leadership-ready role description
- [RESEARCH_FOUNDATION.md](research/RESEARCH_FOUNDATION.md) — Academic validation (CHI/UIST research)

---

*This document answers the question: "Why does Model UX need to exist?" For what Model UX actually does, see the role description.*
