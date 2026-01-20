# 🧪 Eval Playground

An interactive learning tool for understanding LLM-as-a-judge evaluations.

## What You'll Learn

- **How individual verdicts become scores** — See TRUE/FALSE → points → weighted percentage
- **How rubric wording affects results** — Compare generic vs agent-aware rubrics
- **Why weights matter** — Experiment with different weight distributions
- **The impact of rubric design** — Same response, different rubrics, different outcomes

## Quick Start

### 1. Install dependencies

```bash
cd tools/eval_playground
pip install -r requirements.txt
```

### 2. Set your OpenAI API key

```bash
export OPENAI_API_KEY=your-key-here
```

### 3. Run the app

```bash
streamlit run app.py
```

### 4. Open in browser

Navigate to `http://localhost:8501`

## Three Modes

### 📝 Single Response
Deep dive into one response:
- See all 4 metrics evaluated
- View verdict + reasoning for each
- See how weights create the final score

### 📊 Batch Test
Compare rubrics across multiple test cases:
- Run 5-10 responses through evaluation
- See pass rates per metric
- Compare Generic vs Agent-Aware rubrics side-by-side

### ⚖️ Weight Simulator
Experiment with metric weights:
- Adjust sliders for each metric
- See instant impact on sample score patterns
- Understand why weight changes alone don't fix rubric issues

## Test Cases

The playground includes 10 curated test cases from real BI agent evaluation scenarios:

1. **Net Profit with Accrual Method** — Detailed, structured response with accounting terminology
2. **Simple Customer Count** — Brief, conversational response
3. **Graceful Refusal - No Data** — Standard refusal pattern
4. **AR Aging Report** — Complex financial report with multiple metrics
5. **Expense Comparison** — Comparative analysis with explanation
6. **Unable to Access - Graceful** — Deflection when data not accessible
7. **P&L Summary - Detailed** — Full P&L with KPIs - highly structured
8. **Top Vendors by Spend** — Ranked list with context
9. **Balance Sheet Check** — Direct, factual confirmation
10. **Invoice Count - Search Style** — Simple retrieval response

## Rubric Comparison

### Generic Rubric (Omni Default)
- Voice/Tone: "Avoids jargon and overly technical language"
- Relevance: "No unnecessary tangents or filler"
- Penalizes accounting terminology as "jargon"
- Penalizes structured formatting as "overly formal"

### Agent-Aware Rubric (BI-Specific)
- Voice/Tone: "Accounting terminology is EXPECTED professional language"
- Relevance: "Financial context helps interpret the numbers"
- Recognizes that structured formatting is APPROPRIATE for financial data
- Judges BI by standards appropriate for CPAs and bookkeepers

## Key Insights

1. **Same response, different rubrics = different scores**
   - A detailed BI response might score 65% with generic rubric but 90% with agent-aware rubric

2. **Weight changes have limited impact**
   - Voice/tone is only 5% weight, but it still shows as "FAIL" in dashboards
   - Changing weights affects aggregate score but not individual metric status

3. **Rubric wording is the key lever**
   - "Avoid jargon" vs "Accounting terminology is expected" completely changes outcomes
   - This is why agent-aware rubrics matter more than weight adjustments

## Technical Notes

- Uses OpenAI's `gpt-4o-mini` for cost-effective evaluation
- Temperature set to 0.1 for consistency
- JSON response format for reliable parsing
- ~$0.01-0.02 per full evaluation run

## Related Docs

- [Eval Primer](../../docs/EVAL_PRIMER.md) — Background on evaluation concepts
- [Rubric Craft Guide](../../docs/eval/RUBRIC_CRAFT_GUIDE.md) — How to write effective rubrics

