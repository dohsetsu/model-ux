# Eval Analysis Context Summary

*Quick reference for picking up where we left off*

**Last updated:** December 11, 2025

---

## Where everything lives

| Document | Location | Purpose |
|----------|----------|---------|
| **Proposal** (main) | `docs/eval/VOICE_TONE_RUBRIC_PROPOSAL.md` | Shareable methodology proposal |
| **Eval Primer** | `docs/eval/EVAL_PRIMER.md` | "What is an eval" explainer |
| **Eval Comparison** | `docs/eval/EVAL_COMPARISON_12_9.md` | 11/24 vs 12/4 apples-to-apples |
| **Eval Playground** | `tools/eval_playground/` | Interactive Streamlit demo |
| **Master Spreadsheet** | [Google Sheets](https://docs.google.com/spreadsheets/d/16UfkoCSJoepmmu7ZtWN7c0p9KcNptZ-XoSBaU5vhzlc/edit) | Annotated eval results |

---

## Key decisions made

1. **Voice_tone should be universal** (Omni-level), not per-agent rubrics — discussed with Sharon George
2. **Agent-aware hints** for content metrics (correctness, completeness, relevance)
3. **Stabilize eval first**, then consider architectural changes
4. **Softer tone** in proposal — acknowledge unknowns, invite collaboration

---

## Key discoveries

- **`tools-e2e.yml`** contains agent-specific descriptions (BI = "structured financial analysis") — rubrics don't reflect these
- **Universal Voice Prompt** exists but doesn't appear to be embedded in agent prompts
- **12/4 "judge tuning"** improved subjective metrics dramatically (+20-26%) while correctness barely moved (+4%) — suggests leniency, not quality improvement
- **Noise exists** across agents (same content, different verdicts)

---

## External references

- [Omni agent config (tools-e2e.yml)](https://github.intuit.com/accounting-core/omni-agent-config/blob/master/conversational-ai/tools-e2e.yml)
- [Intuit Universal Voice Prompt](https://docs.google.com/spreadsheets/d/1FOy6SohDc8xP8E_YvEtcLal8mAHfar8Hb6yJ9QYbJGQ/edit?gid=691212558#gid=691212558)
- [BI prompts.py](https://github.intuit.com/reporting/bi-research-test/blob/master/app/agents/prompts.py)

---

## Collaborators mentioned

- **Sharon George** — discussed voice_tone at Omni level
- **Omni team** — working on parallel improvements, would benefit from closer collaboration

---

## Tools created

### Google Sheets Apps Script (SxS Comparison)
- Compares two eval result tabs side-by-side
- Shows OLD/NEW metrics, reasoning, conversation history
- "Pattern Observed" column with neutral language
- Located in user's Google Sheet (Extensions → Apps Script)

### Eval Playground (Streamlit)
- Interactive demo of rubric impact
- Three rubric types: Generic, Intuit Brand, Agent-Aware
- Run: `cd tools/eval_playground && streamlit run app.py`
- Requires `OPENAI_API_KEY` environment variable

---

## Related repos

- **BI-specific analysis:** [reporting/bi-research-test](https://github.intuit.com/reporting/bi-research-test/blob/jbice/eval-analysis/docs/eval/BI_EVAL_ANALYSIS_v2.md) (Roshni's team repo, jbice/eval-analysis branch)

---

*Questions? Ping Jason Bice*

