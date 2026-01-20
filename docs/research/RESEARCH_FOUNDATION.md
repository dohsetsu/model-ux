# Model UX: Research Foundation

*Academic and industry research supporting the Model UX discipline*

**Last updated:** January 2026  
**Compiled by:** Jason Bice

---

## TL;DR for Leadership

Model UX is not a made-up role. It's an emerging discipline backed by peer-reviewed research (CHI, UIST, CSCW 2022-2025) that addresses a critical gap: **AI experts are not experts in the domains where AI is deployed**. 

The solution isn't to make everyone engineers—it's to **bring domain experts into AI development with tools designed for their language and expertise**.

Content designers, with their expertise in language, user understanding, and communication clarity, are uniquely positioned to fill this gap.

---

## Research Overview

| Source | Venue | Year | Key Finding |
|--------|-------|------|-------------|
| Lam et al. | UIST '24 | 2024 | Non-AI experts can lead evaluations, design objectives, and control end-to-end AI systems |
| Lam et al. | CSCW '22 | 2022 | End-users found issues in AI audits that experts missed |
| Lam et al. | CHI '23 | 2023 | Domain experts explore 136+ model concepts in 30 min vs. weeks for engineers |
| Lam et al. | CHI '24 | 2024 | High-level concepts (not code) enable non-experts to analyze unstructured text at scale |
| Subramonyam et al. | CHI '21 | 2021 | UX practitioners need new methods to prototype AI behavior, not just interfaces |
| Yang et al. | CHI '20 | 2020 | Identified fundamental challenges in designing human-AI interaction |

---

## Key Research Papers

### 1. Granting Non-AI Experts Creative Control Over AI Systems

**Authors:** Michelle S. Lam  
**Venue:** UIST Adjunct '24, Pittsburgh, PA  
**DOI:** [10.1145/3672539.3686714](https://doi.org/10.1145/3672539.3686714)

#### The Problem

> "Many harmful behaviors and problematic deployments of AI stem from the fact that AI experts are *not* experts in the vast array of settings where AI is applied."

AI development requires substantial technical knowledge. But the people with that knowledge often don't understand:
- The communities the AI will serve
- The language and values those communities use
- The specific harms that might emerge in context

#### The Solution Framework

Instead of requiring domain experts to become engineers, **redesign AI development tools to match non-technical language**.

Lam's research demonstrates this across three areas:

**1. AI Objectives: Societal Objective Functions**

| Traditional Approach | Domain Expert Approach |
|---------------------|------------------------|
| "Tune hyperparameters for engagement" | "Reduce partisan animosity using political science concepts" |
| Engineers guess at values | Domain experts define what "good" looks like |
| Generic optimization | Value-aligned objectives |

*Evidence:* Social scientists created feed ranking algorithms based on political science concepts. The AI-reranked feeds **significantly reduced partisan animosity** (d = .25, p = .02) while maintaining engagement.

**2. AI Evaluation: End-User Audits (IndieLabel)**

| Traditional Approach | Domain Expert Approach |
|---------------------|------------------------|
| Expert-led audits | End-user-led audits |
| Limited to hypotheses experts think to test | Surfaces concepts users care about |
| Expensive, slow | From handful of labels to 100K+ predictions in minutes |

*Evidence:* 17 non-technical participants led audits of Perspective API (toxicity model):
- Replicated issues formal audits had found
- **Raised previously underreported issues** experts missed
- Completed audits in 30 minutes

**3. End-to-End AI Systems: Personalized Control**

| Traditional Approach | Domain Expert Approach |
|---------------------|------------------------|
| One model, one behavior | Many personalized configurations per user |
| User adapts to model | Model adapts to user |
| Generic outputs | Context-appropriate outputs |

#### Key Quote

> "When non-AI experts design AI from start to finish, they notice gaps and build solutions that AI experts could not—such as creating new feed ranking models to mitigate partisan animosity, surfacing underreported issues with content moderation models, and activating unique pockets of LLM behavior to amplify their personal writing style."

---

### 2. End-User Audits: Empowering Communities to Lead AI Investigations

**Authors:** Michelle S. Lam, Mitchell L. Gordon, Danae Metaxa, Jeffrey T. Hancock, James A. Landay, Michael S. Bernstein  
**Venue:** CSCW '22  
**DOI:** [10.1145/3555625](https://doi.org/10.1145/3555625)

#### Key Finding

Non-technical end users can effectively audit AI systems and **find issues that expert auditors miss**.

The IndieLabel system enabled participants to:
- Define their own audit concepts (not just use predefined categories)
- Scale from a handful of labels to 100K+ predictions
- Surface issues that formal expert audits had overlooked

#### Why This Matters for Model UX

> "Non-AI experts can see around corners and fill major gaps in AI evaluation."

This directly supports the case for content designers—domain experts in language and user experience—leading evaluation efforts rather than just reviewing engineer-designed metrics.

---

### 3. Model Sketching: Centering Concepts in Early-Stage ML Design

**Authors:** Michelle S. Lam, Zixian Ma, Anne Li, Izequiel Freitas, Dakuo Wang, James A. Landay, Michael S. Bernstein  
**Venue:** CHI '23  
**DOI:** [10.1145/3544548.3581290](https://doi.org/10.1145/3544548.3581290)

#### Key Finding

Domain experts can explore **136+ model design concepts in 30 minutes** using concept-based tools—work that would take engineers weeks.

#### The Insight

Traditional ML development requires domain experts to translate their knowledge into technical specifications that engineers implement. This translation is lossy and slow.

Model Sketching allows domain experts to directly explore model behaviors using **concepts they already understand**, without needing to specify technical details.

#### Why This Matters for Model UX

Content designers already think in concepts (tone, clarity, helpfulness, brand voice). Tools that let them directly shape model behavior—rather than translating requirements for engineers—unlock faster iteration and better outcomes.

---

### 4. Concept Induction: Analyzing Unstructured Text with High-Level Concepts

**Authors:** Michelle S. Lam, Janice Teoh, James Landay, Jeffrey Heer, Michael S. Bernstein  
**Venue:** CHI '24  
**DOI:** [10.1145/3613904.3642830](https://doi.org/10.1145/3613904.3642830)

#### Key Finding

The LLooM system enables non-experts to analyze large text datasets using **high-level concepts** rather than code or statistical methods.

#### Why This Matters for Model UX

Evaluation and analysis of AI outputs is a core Model UX responsibility. Tools that work with concepts (not code) make this work accessible to content designers and other domain experts.

---

### 5. Prototyping AI Systems: Challenges for UX Practitioners

**Authors:** Hariharan Subramonyam, Colleen Seifert, Eytan Adar  
**Venue:** CHI '21  
**DOI:** [10.1145/3411764.3445188](https://doi.org/10.1145/3411764.3445188)

#### Key Finding

UX practitioners face fundamental challenges when designing AI-powered products because existing design methods focus on **interfaces**, not **model behavior**.

#### The Gap Identified

- Traditional prototyping methods don't capture AI uncertainty, learning, and adaptation
- Designers struggle to communicate AI behavior to stakeholders
- There's no established practice for "prototyping" how an AI should behave

#### Why This Matters for Model UX

This research identifies the exact gap Model UX fills: the need for practitioners who can design and prototype **model behavior**, not just the UI around it.

---

### 6. Re-examining Whether, Why, and How Human-AI Interaction Is Uniquely Difficult to Design

**Authors:** Qian Yang, Aaron Steinfeld, Carolyn Rose, John Zimmerman  
**Venue:** CHI '20  
**DOI:** [10.1145/3313831.3376301](https://doi.org/10.1145/3313831.3376301)

#### Key Finding

Human-AI interaction design is uniquely challenging because:
- AI capabilities are uncertain and evolving
- AI behavior is probabilistic, not deterministic
- Users form mental models that may not match AI reality
- Failure modes are unpredictable

#### Why This Matters for Model UX

These challenges require practitioners who understand both **user experience** and **model behavior**—exactly the combination Model UX represents.

---

## The Core Argument

Across this research, a consistent pattern emerges:

1. **AI experts alone can't build good AI products** — they lack domain expertise
2. **Domain experts can lead AI development** — with the right tools
3. **Concept-based tools outperform technical tools** — for non-engineers
4. **Evaluation benefits from diverse perspectives** — experts miss things users catch

Content designers are domain experts in **language, communication, and user understanding**. The research supports bringing them into AI development not as reviewers, but as **designers of model behavior**.

---

## How This Maps to Model UX Practice

| Research Finding | Model UX Application |
|-----------------|---------------------|
| Non-experts lead evaluations | Content designers own eval rubrics |
| Concepts over hyperparameters | Voice/tone criteria, not just similarity scores |
| Domain experts explore faster | CDs iterate on prompts directly, not via engineering tickets |
| Users find issues experts miss | Qualitative review catches what metrics don't |
| Behavior design is missing | Model UX fills the gap between UI design and engineering |

---

## References

1. Lam, M.S. (2024). "Granting Non-AI Experts Creative Control Over AI Systems." *UIST Adjunct '24*. [DOI](https://doi.org/10.1145/3672539.3686714)

2. Lam, M.S. et al. (2022). "End-User Audits: A System Empowering Communities to Lead Large-Scale Investigations of Harmful Algorithmic Behavior." *CSCW '22*. [DOI](https://doi.org/10.1145/3555625)

3. Lam, M.S. et al. (2023). "Model Sketching: Centering Concepts in Early-Stage Machine Learning Model Design." *CHI '23*. [DOI](https://doi.org/10.1145/3544548.3581290)

4. Lam, M.S. et al. (2024). "Concept Induction: Analyzing Unstructured Text with High-Level Concepts Using LLooM." *CHI '24*. [DOI](https://doi.org/10.1145/3613904.3642830)

5. Subramonyam, H., Seifert, C., & Adar, E. (2021). "ProtoAI: Model-Informed Prototyping for AI-Powered Interfaces." *CHI '21*. [DOI](https://doi.org/10.1145/3411764.3445188)

6. Yang, Q., Steinfeld, A., Rose, C., & Zimmerman, J. (2020). "Re-examining Whether, Why, and How Human-AI Interaction Is Uniquely Difficult to Design." *CHI '20*. [DOI](https://doi.org/10.1145/3313831.3376301)

---

## Open Source Tools from This Research

- **ModelSketchBook**: [github.com/stanford-crfm/modelsketchbook](https://github.com/stanford-crfm/modelsketchbook)
- **LLooM**: [github.com/michelle123lam/lloom](https://github.com/michelle123lam/lloom)

---

## Further Reading

### Industry Perspectives

- Google Cloud: [A Methodical Approach to Agent Evaluation](https://cloud.google.com/blog/topics/developers-practitioners/a-methodical-approach-to-agent-evaluation)
- Anthropic: [Demystifying Evals for AI Agents](https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents)
- OpenAI: [Evaluation Best Practices](https://platform.openai.com/docs/guides/evaluation-best-practices)
- Hugging Face: [Evaluation Guidebook](https://huggingface.co/spaces/OpenEvals/evaluation-guidebook)

### Academic Venues

- **CHI** (Conference on Human Factors in Computing Systems) — Primary venue for human-AI interaction research
- **UIST** (User Interface Software and Technology) — Tools and systems for interaction
- **CSCW** (Computer-Supported Cooperative Work) — Collaborative and social aspects of AI

---

*This document compiles external research supporting the Model UX discipline. For internal observations and case studies, see other documentation in this repository.*
