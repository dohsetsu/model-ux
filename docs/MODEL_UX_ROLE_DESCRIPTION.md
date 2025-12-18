# Model UX: Role Description

*A leadership-ready overview of the Model UX discipline and its business value.*

---

## Role Summary

**Model UX** is a specialized discipline that ensures AI-powered products behave correctly and deliver high-quality user experiences at scale. 

While traditional Content Design focuses on what appears in a product's UI, Model UX focuses on the **systems that generate content** — the instructions, evaluations, and quality frameworks that shape how AI models respond to users.

> **One-liner:** Model UX ensures the AI does what it's supposed to do — and proves it.

---

## What Model UX Does

### 1. Evaluation Design & Quality Assurance

| Activity | Business Impact |
|----------|-----------------|
| Design evaluation rubrics that accurately measure model performance | Catch real problems before launch; avoid false confidence from flawed metrics |
| Create agent-aware criteria for multi-agent systems | Prevent false failures (e.g., analytics agent penalized for using tables) |
| Define "ground truth" and success criteria per agent type | Ensure evals measure what matters for each use case |
| Analyze eval results to diagnose root causes | Distinguish between model issues, instruction issues, and measurement issues |

### 2. Model Instruction Development

| Activity | Business Impact |
|----------|-----------------|
| Write and refine prompts/instructions that shape model behavior | Improve response quality at the source, not one response at a time |
| Define agent capabilities and limitations | Set clear boundaries; prevent overpromising |
| Create voice and personality guidelines for AI outputs | Ensure brand-consistent experiences across all touchpoints |
| Develop error handling and graceful degradation patterns | Maintain user trust when things go wrong |

### 3. Launch Readiness & Governance

| Activity | Business Impact |
|----------|-----------------|
| Define quality gates for product launches | Ship with confidence; block releases that don't meet standards |
| Connect qualitative research to quantitative eval data | Surface problems that metrics alone might miss |
| Identify routing failures and capability gaps | Catch issues where queries reach the wrong agent |
| Monitor for drift and degradation over time | Maintain quality post-launch |

### 4. Cross-Functional Enablement

| Activity | Business Impact |
|----------|-----------------|
| Translate design requirements into engineering-ready specifications | Reduce cycles and miscommunication |
| Create calibration materials for human raters | Ensure consistent quality judgments |
| Document agent capabilities for product and support teams | Enable accurate user-facing communication |
| Train other CDs/designers on Model UX practices | Scale expertise across the organization |

---

## Key Deliverables

| Deliverable | Description |
|-------------|-------------|
| **Evaluation rubrics** | Criteria used by LLM judges or human raters to score model outputs |
| **Model instructions/prompts** | The directives that shape how models respond |
| **Voice & tone specifications** | Brand-aligned guidelines for AI-generated content |
| **Agent capability documentation** | What each agent can/can't do; routing implications |
| **Quality gate definitions** | Pass/fail criteria for launch readiness |
| **Golden sets & test cases** | Representative examples for testing and calibration |
| **Root cause analyses** | Diagnoses of why metrics are failing and recommended fixes |

---

## How Model UX Differs from Traditional Content Design

| Dimension | Traditional CD | Model UX |
|-----------|---------------|----------|
| **Focus** | Product UI copy | Systems that generate content |
| **Output** | Static strings, guidelines | Instructions, rubrics, eval frameworks |
| **Quality check** | Manual review | Automated evaluation at scale |
| **Success metric** | "Does it read well?" | "Is the system behaving correctly?" |
| **Failure response** | Rewrite the copy | Diagnose: model, rubric, or instruction issue? |
| **Scope** | Individual screens/flows | Entire agent behavior across all interactions |
| **Collaboration** | Design ↔ Product | Design ↔ Engineering ↔ Data Science ↔ Product |

---

## Skills & Qualifications

### Foundational (transfers from CD)
- Strong writing and editing skills
- User empathy and UX principles
- Brand voice expertise
- Cross-functional communication
- Attention to detail

### Developed (new for Model UX)
- **Prompt engineering**: Writing instructions that shape model behavior
- **Evaluation design**: Creating rubrics that measure what matters
- **Data interpretation**: Reading eval results, identifying patterns
- **System thinking**: Understanding how components (routing, agents, instructions) interact
- **Technical fluency**: Enough to collaborate with engineering on implementation

### Mindset
- Comfort with ambiguity and iteration
- Diagnostic thinking (root cause, not symptoms)
- Willingness to challenge assumptions with data
- Balance between user advocacy and technical constraints

---

## Business Value

### Risk Mitigation
- **Prevents "false confidence"**: Identifies when metrics look good but users are frustrated
- **Catches failures before launch**: Quality gates based on meaningful criteria
- **Reduces post-launch fires**: Problems found in eval, not production

### Efficiency
- **Fixes at the source**: One instruction change > rewriting 1,000 responses
- **Reduces eng cycles**: Clear specs, fewer back-and-forth iterations
- **Scales quality**: Automated eval > manual review

### User Experience
- **Consistent quality**: Same standards across all agents and touchpoints
- **Appropriate responses**: Right format for right content (tables for data, prose for explanations)
- **Honest capabilities**: Users know what the AI can and can't do

### Organizational
- **Bridges design and engineering**: Shared vocabulary, aligned goals
- **Documents tribal knowledge**: Codifies what "good" looks like
- **Enables other teams**: Product, support, marketing can accurately describe AI capabilities

---

## Common Misconceptions

| Misconception | Reality |
|---------------|---------|
| "Model UX = voice & tone" | Voice is one small piece. Model UX owns system behavior, evaluation accuracy, and instruction alignment. |
| "Just make it sound more human" | How the model "sounds" is downstream of what it's instructed to do. Fix the instructions, not just the output. |
| "Shorter rubrics are better" | Rubrics should be as long as needed to measure the right things. Brevity is a UX virtue; completeness is an eval virtue. |
| "The eval failed, so the response is bad" | A failing eval might mean the rubric is miscalibrated. Diagnose before concluding. |
| "CDs don't need to understand the technical side" | Model UX requires enough technical fluency to collaborate on implementation and interpret eval data. |

---

## Where Model UX Sits in the Org

Model UX is inherently cross-functional. Reporting structure may vary, but effective Model UX requires:

- **Partnership with Engineering**: On prompt implementation, eval infrastructure, agent configuration
- **Partnership with Product**: On capability scoping, launch criteria, user requirements
- **Partnership with Data Science**: On eval metrics, data interpretation, quality measurement
- **Partnership with Design/Research**: On user needs, qualitative signals, experience standards

The role succeeds when it's embedded in the development process — not consulted after the fact.

---

## Summary

Model UX is not a rebrand of Content Design. It's an expansion into new territory created by the rise of AI-powered products.

The core question Model UX answers:

> **"Is this AI system behaving correctly — and how do we know?"**

Organizations that invest in Model UX ship AI products that work as intended, measure quality accurately, and deliver experiences users can trust.

---

*For the evolution of CD skills into Model UX, see: [MODEL_UX_EVOLUTION.md](MODEL_UX_EVOLUTION.md)*

