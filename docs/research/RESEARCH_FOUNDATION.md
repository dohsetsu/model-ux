# Model UX: Research Foundation

*Academic validation for the emerging discipline*

**Last updated:** December 18, 2025  
**Compiled by:** Jason Bice

---

## TL;DR for Leadership

Model UX is not a made-up role. It's an emerging discipline backed by peer-reviewed CHI research (2023-2025) that addresses a critical gap: **AI experts are not experts in the domains where AI is deployed**. The solution isn't to make everyone engineers—it's to **redesign AI development tools to match the language of domain experts**.

Content designers, with their expertise in language, user understanding, and communication clarity, are uniquely positioned to fill this gap.

---

## Research Overview

| Source | Year | Key Finding |
|--------|------|-------------|
| Lam (Stanford, UIST '24) | 2024 | Non-AI experts can lead evaluations, design objectives, and control end-to-end AI systems |
| CHI '25 Yokohama Sessions | 2025 | "Model UX" as a discipline; prompt modularity; ethics as emotional labor |
| IndieLabel Research | 2022 | End-users found issues in AI audits that experts missed |
| Model Sketching (CHI '23) | 2023 | Domain experts explore 136+ model concepts in 30 min vs. weeks for engineers |

---

## Paper 1: Granting Non-AI Experts Creative Control Over AI Systems

**Author:** Michelle S. Lam, Stanford University  
**Venue:** UIST Adjunct '24, Pittsburgh, PA  
**DOI:** [10.1145/3672539.3686714](https://doi.org/10.1145/3672539.3686714)

### The Problem

> "Many harmful behaviors and problematic deployments of AI stem from the fact that AI experts are *not* experts in the vast array of settings where AI is applied."

AI development requires substantial technical knowledge. But the people with that knowledge don't understand:
- The communities the AI will serve
- The language and values those communities use
- The specific harms that might emerge in context

### The Solution Framework

Instead of requiring domain experts to become engineers, **redesign AI development tools to match non-technical language**.

Lam's research demonstrates this across three areas:

#### 1. AI Objectives → Societal Objective Functions

| Traditional Approach | Model UX Approach |
|---------------------|-------------------|
| "Tune hyperparameters for engagement" | "Reduce partisan animosity using political science concepts" |
| Engineers guess at values | Domain experts define what "good" looks like |
| Generic optimization | Value-aligned objectives |

**Evidence:** Social scientists created feed ranking algorithms based on political science concepts. The AI-reranked feeds **significantly reduced partisan animosity** (d = .25, p = .02) while maintaining engagement.

#### 2. AI Evaluation → End-User Audits (IndieLabel)

| Traditional Approach | Model UX Approach |
|---------------------|-------------------|
| Expert-led audits | End-user-led audits |
| Limited to hypotheses experts think to test | Surfaces concepts users care about |
| Expensive, slow | From handful of labels → 100K+ predictions in minutes |

**Evidence:** 17 non-technical participants led audits of Perspective API (toxicity model):
- Replicated issues formal audits had found
- **Raised previously underreported issues** experts missed
- Completed audits in 30 minutes

**Key quote:**
> "Non-AI experts can see around corners and fill major gaps in AI evaluation."

#### 3. End-to-End AI Systems → "Brushes" (Personalized LLM Control)

| Traditional Approach | Model UX Approach |
|---------------------|-------------------|
| One model, one behavior | Many "brushes" per user |
| User adapts to model | Model adapts to user |
| Generic outputs | Personalized facets |

**Vision:** Instead of monolithic AI, users have personalized "brushes" (e.g., "Friendly Informal Tone," "Professional Networking") they can inspect, swap, and repair.

> "What if instead our guiding metaphor of AI interaction was not monolithic, but pluralistic?"

### Key Quote for Leadership

> "When non-AI experts design AI from start to finish, they notice gaps and build solutions that AI experts could not—such as creating new feed ranking models to mitigate partisan animosity, surfacing underreported issues with content moderation models, and activating unique pockets of LLM behavior to amplify their personal writing style."

---

## CHI 2025 Yokohama: Model UX Emerges as a Discipline

*Personal observations from me :) (this doc was also provided to Google leadership as PoC in support of the Model UX position. Fun fact: I introduced the "Model UX" terminology at the conference, and it caught on - I started seeing it echoed in LI post-conference!*

### Theme 1: Instruments, Not Interfaces

**Session:** AI-Instruments  

**Insight:** Model UX should treat prompts not as transient inputs but as **reified objects**—manipulable, inspectable, and combinable.

**Opportunity:** LLMs should support **prompt modularity**—let users apply, remix, and adapt prompt "tools" across tasks (via visual cards, lenses, or containers).

> "If we can push for broader interaction methods beyond text input, Model UX has an opportunity to potentially single-handedly design and build sets of 'prompt modules'"

### Theme 2: Multimodal Sensing & the Human Body

**Speakers:** Liang, Ahuja, Luo

**Insight:** Models that truly understand users must move beyond vision/text—touch, pressure, gait, and intent detection are *interface primitives* for future UX.

**Opportunity:** Design for **low-intrusion, embodied AI**. Fuse multimodal inputs (watch + phone + earbuds) to contextualize responses, not just classify inputs.

> "We need to be building in more surfaces (watches, glasses, environmental AI tools with sensors) so we can think about spatial and gestural inputs in 3D space—sooner rather than later!"

### Theme 3: Ethics as Emotional Labor

**Paper:** Moral Stress study

**Insight:** Interacting with ethical toolkits induced *moral stress*—not just usability friction but a personal, identity-level burden.

**Opportunity:** Model UX should anticipate emotional cost and design **reflective buffers**, not just rational toggles. Design for care, not just correctness.

> "This reminds me of the personal toll on those of us who were part of Sensitive Image and Prompt frameworks—getting it wrong didn't just make it a bad product, it felt like it made you a bad person."

### Theme 4: Precision Labor in AI Training

**Paper:** Precision Labor study

**Insight:** The push for "accuracy" often extracts *performative labor* from data workers, who align to machine judgments even when it devalues their own.

**Opportunity:** Model UX should help surface **confidence, ambiguity, and rationale**—helping us push back (when needed) on model assertions, not just accept them.

> "Even we ourselves have to be wary of overreliance on both data numbers and our own AI-generated help in things like prompt engineering and SI construction."

### Theme 5: Generative AI & Creativity

**Question:** Catalyst or Hollow Trend?

**Insight:** Users shift from creators to *curators*, iterating over model output, not ideas. Designers fear this hollowing of craft.

**Opportunity:** Design tools that allow **meaningful re-entry**—model outputs that *expose process*, invite constraint editing, and respect creative authorship.

> "Everything that is true for designers in this is doubly true for writers—we need to look at ways to have LLMs better supplement, rather than supplant, writing across the board, lest we all risk visual and verbal homogenization of design."

### Theme 6: Amplifying Lived Experience

**Keynote:** Masako Wakamiya (89-year-old app developer)

**Insight:** Age and emotion are assets, not liabilities. Curiosity, patience, and emotional knowledge deepen with time—and tech should make space for that.

**Opportunity:** Design model interfaces that **amplify lived experience**, don't flatten it. Support slow exploration. Let users *nurture* the model, not just prompt it.

> "We need to back off of 'ta dah!' prompt moments for users—it's great to see it do something amazing, but it's even more engaging for a user to discover it."

---

## How This Research Maps to Model UX Practice

| Research Finding | Model UX Application |
|-----------------|---------------------|
| Non-experts lead evaluations | Content designers own eval rubrics |
| Concepts over hyperparameters | Voice/tone rubrics, not just "similarity scores" |
| Expose process | Show reasoning chains, not just answers |
| Design for pluralism | Agent-aware outputs, not one-size-fits-all |
| Moral stress is real | Consider emotional cost of eval work |
| Prompt modularity | Build reusable prompt components |

---

## Why This Matters for Intuit

1. **The BI eval analysis proved the concept**: Agent-aware rubrics surfaced quality issues that generic rubrics missed.

2. **The "12/4 tuning" discovery**: When we found that subjective metrics jumped +20-26% while correctness barely moved, we identified leniency—not quality improvement. This is exactly the kind of "seeing around corners" Lam describes.

3. **The gap is real**: Engineers build models. Product designs interfaces. But **who designs the model's behavior?** That's Model UX.

---

## References

1. Lam, M.S. (2024). "Granting Non-AI Experts Creative Control Over AI Systems." *UIST Adjunct '24*. [DOI](https://doi.org/10.1145/3672539.3686714)

2. Lam, M.S. et al. (2023). "Model Sketching: Centering Concepts in Early-Stage Machine Learning Model Design." *CHI '23*. [DOI](https://doi.org/10.1145/3544548.3581290)

3. Lam, M.S. et al. (2022). "End-User Audits: A System Empowering Communities to Lead Large-Scale Investigations of Harmful Algorithmic Behavior." *CSCW '22*. [DOI](https://doi.org/10.1145/3555625)

4. Lam, M.S. et al. (2024). "Concept Induction: Analyzing Unstructured Text with High-Level Concepts Using LLooM." *CHI '24*. [DOI](https://doi.org/10.1145/3613904.3642830)

5. CHI 2025 Conference Notes, Yokohama, Japan (personal observations)

---

## Open Source Tools from This Research

- **ModelSketchBook**: [github.com/stanford-crfm/modelsketchbook](https://github.com/stanford-crfm/modelsketchbook)
- **LLooM**: [github.com/michelle123lam/lloom](https://github.com/michelle123lam/lloom)

---

*This document serves as the academic foundation for the Model UX discipline. Additional research will be added as the field evolves.*

