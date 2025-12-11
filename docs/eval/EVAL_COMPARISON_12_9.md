# Eval comparison: 11/24 vs 12/4 runs

**Author:** Jason Bice  
**Date:** December 9, 2025  
**Purpose:** Isolate judge tuning effects from test data changes

---

## Summary

By comparing **only the 261 test cases that appear in both eval runs**, we can isolate what the "judge tuning" actually changed — independent of the 35 new test cases added.

### Key finding

| Metric | Same tests (OLD) | Same tests (NEW) | Change | Interpretation |
|--------|------------------|------------------|--------|----------------|
| **completeness** | 62.8% | 90.8% | **+28.0%** | Judge more lenient |
| **relevance** | 82.4% | 93.5% | **+11.1%** | Judge more lenient |
| voice_tone | 90.0% | 94.2% | +4.2% | Modest change |
| **correctness** | 80.1% | 83.1% | **+3.0%** | Barely moved |

**The same agent responses, judged by the new criteria, now pass at much higher rates for completeness and relevance. Correctness — the factual accuracy metric — barely changed.**

---

## Methodology

1. Loaded both raw_results CSVs (11/24 and 12/4)
2. Created fingerprint for each test case: `(username, realmid, ground_truth[:150])`
3. Found 261 test cases present in both runs
4. Compared pass rates for identical test cases across the two judge configurations

---

## Per-agent breakdown (same tests only)

### BI Agent (133 matched rows)

| Metric | OLD | NEW | Δ |
|--------|-----|-----|---|
| correctness | 74.4% | 80.5% | +6.0% |
| completeness | 67.7% | 94.0% | **+26.3%** ⚠️ |
| relevance | 78.9% | 97.0% | **+18.0%** ⚠️ |
| voice_tone | 82.7% | 89.5% | +6.8% |

### Search Agent (64 matched rows)

| Metric | OLD | NEW | Δ |
|--------|-----|-----|---|
| correctness | 76.6% | 76.6% | **0.0%** |
| completeness | 57.8% | 81.2% | **+23.4%** ⚠️ |
| relevance | 81.2% | 84.4% | +3.1% |
| voice_tone | 98.4% | 100.0% | +1.6% |

### llm_direct (41 matched rows)

| Metric | OLD | NEW | Δ |
|--------|-----|-----|---|
| correctness | 95.1% | 92.7% | -2.4% |
| completeness | 46.3% | 92.7% | **+46.3%** ⚠️ |
| relevance | 92.7% | 95.1% | +2.4% |
| voice_tone | 100.0% | 100.0% | 0.0% |

---

## Test data changes

The new eval run also added test cases:

| Category | 11/24 rows | 12/4 rows | Change |
|----------|------------|-----------|--------|
| Total | 298 | 333 | +35 |
| BI | 141 | 145 | +4 |
| Search | 75 | 80 | +5 |
| llm_direct | 52 | 63 | +11 |
| no_tools | 10 | 26 | +16 |

The new test cases have different performance characteristics:
- **no_tools** completeness dropped from 90% → 61% (new tests are harder)
- **llm_direct** tool_usage improved from 13% → 35% (still failing)

---

## Implications

1. **The "improvements" in completeness/relevance are largely judge leniency**, not agent quality gains
2. **Correctness remains the real blocker** — it's harder to "tune away" factual accuracy
3. **Comparing runs is unreliable** when both judge prompts AND test data change simultaneously
4. **Search correctness didn't improve at all** on the same tests (76.6% → 76.6%)

---

## Questions for Omni team

1. What specific changes were made to the completeness and relevance judge prompts?
2. Was the intent to make these metrics more permissive, or is this an unintended side effect?
3. Can we get a run with the **old test data** (298 rows) + **new judge** to isolate effects cleanly?
4. Are there plans to address the underlying correctness issues (time alignment, data accuracy)?

---

## Raw data

- Old eval: `JYB_copy of omni_11_24_eval - raw_results_unhidden_unfiltered.csv`
- New eval: `12_4 Omni Eval (judge tuning, assume date fix, run 2) - raw_results.csv`

