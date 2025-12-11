"""
Eval Playground - Interactive tool for learning about LLM-as-a-judge evaluations

Usage:
    1. Set your OpenAI API key: export OPENAI_API_KEY=your-key-here
    2. Run: streamlit run app.py
    3. Open browser to http://localhost:8501
"""

import streamlit as st
import openai
import json
import os
from dotenv import load_dotenv

load_dotenv()

# Initialize OpenAI client
client = openai.OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

# =============================================================================
# TEST CASES - Curated from BI eval analysis
# =============================================================================

TEST_CASES = [
    {
        "id": 1,
        "name": "Net Profit with Accrual Method",
        "agent": "BI",
        "response": """## Net Profit for Q3 2024

**Accounting method:** Accrual
**Date range:** July 1 - September 30, 2024

Your net profit for Q3 2024 was **$45,230.00**.

| Month | Revenue | Expenses | Net Profit |
|-------|---------|----------|------------|
| July | $52,100 | $38,200 | $13,900 |
| August | $48,500 | $35,100 | $13,400 |
| September | $55,800 | $37,870 | $17,930 |

**Total Net Profit:** $45,230.00""",
        "ground_truth": "Net profit for Q3 2024 was $45,230",
        "notes": "Detailed, structured response with accounting terminology"
    },
    {
        "id": 2,
        "name": "Simple Customer Count",
        "agent": "BI",
        "response": "You have 9 customers in total for this year.",
        "ground_truth": "9 customers",
        "notes": "Brief, conversational response"
    },
    {
        "id": 3,
        "name": "Graceful Refusal - No Data",
        "agent": "BI",
        "response": "No data was available for this analysis. The requested time period (Q1 2022) does not contain any recorded transactions in your QuickBooks account.",
        "ground_truth": "No transactions found for Q1 2022",
        "notes": "Standard refusal pattern"
    },
    {
        "id": 4,
        "name": "AR Aging Report",
        "agent": "BI",
        "response": """## Accounts Receivable Aging Report

**Accounting method:** Accrual
**As of:** November 30, 2024

| Customer | Current | 1-30 Days | 31-60 Days | 61-90 Days | 90+ Days | Total |
|----------|---------|-----------|------------|------------|----------|-------|
| Acme Corp | $2,500 | $1,200 | $0 | $0 | $0 | $3,700 |
| Tech Solutions | $0 | $0 | $3,400 | $0 | $0 | $3,400 |
| Global Inc | $800 | $0 | $0 | $1,500 | $2,200 | $4,500 |

**Total Outstanding:** $11,600
**Total Overdue (30+ days):** $7,100 (61.2%)

Your Days Sales Outstanding (DSO) is 42 days.""",
        "ground_truth": "Total AR: $11,600, Overdue: $7,100, DSO: 42 days",
        "notes": "Complex financial report with multiple metrics"
    },
    {
        "id": 5,
        "name": "Expense Comparison",
        "agent": "BI",
        "response": """Your total expenses for October 2024 were $28,450, compared to $31,200 in September 2024.

This represents a decrease of $2,750 (8.8%).

The largest decreases were in:
- Marketing: -$1,500 (reduced ad spend)
- Travel: -$800 (fewer client visits)
- Supplies: -$450 (bulk purchase in Sept)""",
        "ground_truth": "October expenses: $28,450. September: $31,200. Decrease of 8.8%",
        "notes": "Comparative analysis with explanation"
    },
    {
        "id": 6,
        "name": "Unable to Access - Graceful",
        "agent": "BI",
        "response": "I can't see your customer list directly. You can check it in QuickBooks by opening the **Customers** section under **Sales**. That will show you the total number.\n\nFor QuickBooks how-tos, go to Help (?) where you can search topics, browse articles, or connect with support.",
        "ground_truth": "Customer count: 15",
        "notes": "Deflection when data not accessible"
    },
    {
        "id": 7,
        "name": "P&L Summary - Detailed",
        "agent": "BI",
        "response": """## Profit & Loss Summary - YTD 2024

**Accounting method:** Accrual
**Date range:** January 1 - November 30, 2024

### Revenue
- Product Sales: $245,000
- Service Revenue: $128,500
- Other Income: $12,300
**Total Revenue:** $385,800

### Expenses
- Cost of Goods Sold: $98,200
- Payroll: $125,400
- Rent: $36,000
- Utilities: $8,900
- Marketing: $22,100
- Other Expenses: $18,700
**Total Expenses:** $309,300

### Net Income: $76,500

**Gross Margin:** 74.5%
**Net Profit Margin:** 19.8%""",
        "ground_truth": "YTD Net Income: $76,500. Revenue: $385,800. Expenses: $309,300. Net margin: 19.8%",
        "notes": "Full P&L with KPIs - highly structured"
    },
    {
        "id": 8,
        "name": "Top Vendors by Spend",
        "agent": "BI", 
        "response": """Here are your top 5 vendors by total spend this year:

1. **TriNet HR III** - $45,200 (payroll services)
2. **AWS** - $18,900 (cloud infrastructure)  
3. **WeWork** - $15,600 (office space)
4. **Gusto** - $8,400 (benefits administration)
5. **Google Workspace** - $4,800 (productivity tools)

**Total top 5 spend:** $92,900 (68% of total vendor spend)""",
        "ground_truth": "Top vendor: TriNet HR III at $45,200",
        "notes": "Ranked list with context"
    },
    {
        "id": 9,
        "name": "Balance Sheet Check",
        "agent": "BI",
        "response": "Yes, your balance sheet is balanced. Total Assets ($142,500) equals Total Liabilities ($67,300) plus Equity ($75,200).",
        "ground_truth": "Balance sheet is balanced. Assets = $142,500",
        "notes": "Direct, factual confirmation"
    },
    {
        "id": 10,
        "name": "Invoice Count - Search Style",
        "agent": "Search",
        "response": "Found 47 invoices from the last 30 days.",
        "ground_truth": "47 invoices in last 30 days",
        "notes": "Simple retrieval response (Search agent style)"
    }
]

# =============================================================================
# RUBRICS - Generic vs Agent-Aware
# =============================================================================

RUBRICS = {
    "generic": {
        "correctness": """You are evaluating an AI assistant's response for CORRECTNESS.

Compare the response to the ground truth and score TRUE if:
- The key facts match the ground truth
- Numbers are accurate (minor rounding differences OK)
- No factual contradictions

Score FALSE if there are factual errors, wrong numbers, or contradictions with the ground truth.

Ground Truth: {ground_truth}

Response: {response}

Output your verdict as JSON: {{"verdict": true/false, "reasoning": "..."}}""",

        "completeness": """You are evaluating an AI assistant's response for COMPLETENESS.

Score TRUE if:
- The response addresses all parts of the question
- No significant information is missing
- The answer is not truncated

Score FALSE if the response is partial, missing key information, or doesn't fully address what was asked.

Ground Truth: {ground_truth}

Response: {response}

Output your verdict as JSON: {{"verdict": true/false, "reasoning": "..."}}""",

        "relevance": """You are evaluating an AI assistant's response for RELEVANCE.

Score TRUE if:
- The response directly addresses the user's question
- Information provided is useful and on-topic
- No unnecessary tangents or filler

Score FALSE if the response includes excessive irrelevant details, goes off-topic, or adds unnecessary information that wasn't requested.

Ground Truth: {ground_truth}

Response: {response}

Output your verdict as JSON: {{"verdict": true/false, "reasoning": "..."}}""",

        "voice_tone": """You are evaluating an AI assistant's response for VOICE & TONE.

Score TRUE if the response:
- Sounds plainspoken, clear, and genuine
- Avoids jargon and overly technical language
- Is conversational and approachable
- Is not overly formal, robotic, or corporate-sounding

Score FALSE if the response uses excessive jargon, is overly formal or structured like a report, or sounds robotic.

Response: {response}

Output your verdict as JSON: {{"verdict": true/false, "reasoning": "..."}}"""
    },
    
    "intuit_brand": {
        "correctness": """You are evaluating an AI assistant's response for CORRECTNESS.

Compare the response to the ground truth and score TRUE if:
- The key facts match the ground truth
- Numbers are accurate (minor rounding differences OK)
- No factual contradictions

Score FALSE if there are factual errors, wrong numbers, or contradictions with the ground truth.

Ground Truth: {ground_truth}

Response: {response}

Output your verdict as JSON: {{"verdict": true/false, "reasoning": "..."}}""",

        "completeness": """You are evaluating an AI assistant's response for COMPLETENESS.

Score TRUE if:
- The response addresses all parts of the question
- No significant information is missing
- The answer is not truncated

Score FALSE if the response is partial, missing key information, or doesn't fully address what was asked.

Ground Truth: {ground_truth}

Response: {response}

Output your verdict as JSON: {{"verdict": true/false, "reasoning": "..."}}""",

        "relevance": """You are evaluating an AI assistant's response for RELEVANCE.

Score TRUE if:
- The response directly addresses the user's question
- Information provided is useful and on-topic
- No unnecessary tangents or filler

Score FALSE if the response includes excessive irrelevant details, goes off-topic, or adds unnecessary information that wasn't requested.

Ground Truth: {ground_truth}

Response: {response}

Output your verdict as JSON: {{"verdict": true/false, "reasoning": "..."}}""",

        "voice_tone": """You are evaluating an AI assistant's response for VOICE & TONE alignment with Intuit brand standards.

## Intuit Voice Non-Negotiables (MUST have all):
- **Plainspoken**: Uses simple words and active voice; avoids passive constructions
- **Clear**: Brief and to the point; no overexplaining or verbose language
- **Genuine**: Conversational but not chatty; candid about limitations
- **Accessible**: Friendly and empathetic; no judgment or condescension
- **Readable**: Not repetitive; sentences are scannable

## Good-to-Haves (positive signals):
- Warm tone that encourages forward momentum
- Acknowledges user concerns with empathy when relevant
- Uses common contractions naturally

## Avoids (negative signals):
- Formal or robotic tone ("I would be pleased to assist you…")
- Vague or indirect phrasing
- Academic or overly polished language ("demonstrate," "discrepancies," "pertaining to")
- Repeating the question back in the answer
- Dense, unbroken blocks of text

## Output Format Guidance:
- Bulleted lists, numbered steps, and tables ARE APPROPRIATE formatting
- Short paragraphs for easy scanning ARE APPROPRIATE

Score TRUE if the response meets all Non-Negotiables and sounds like something a helpful person would actually say.

Score FALSE if the response violates any Non-Negotiable (robotic, formal, condescending, verbose) or uses academic/corporate language that obscures meaning.

Response: {response}

Output your verdict as JSON: {{"verdict": true/false, "reasoning": "..."}}"""
    },
    
    "agent_aware": {
        "correctness": """You are evaluating a Business Intelligence agent's response for CORRECTNESS.

Compare the response to the ground truth and score TRUE if:
- The key facts match the ground truth
- Numbers are accurate (minor rounding differences OK)
- No factual contradictions

Score FALSE if there are factual errors, wrong numbers, or contradictions with the ground truth.

Ground Truth: {ground_truth}

Response: {response}

Output your verdict as JSON: {{"verdict": true/false, "reasoning": "..."}}""",

        "completeness": """You are evaluating a Business Intelligence agent's response for COMPLETENESS.

For a BI agent serving accountants and financial professionals, a complete answer includes:
- The requested data/metrics
- Relevant financial context (date ranges, accounting method) that aids interpretation
- Supporting breakdowns when helpful

Score TRUE if the response provides the requested information with appropriate financial context.
Score FALSE only if key requested information is missing.

Note: Including date ranges, accounting method, or supporting details is GOOD for completeness, not excessive.

Ground Truth: {ground_truth}

Response: {response}

Output your verdict as JSON: {{"verdict": true/false, "reasoning": "..."}}""",

        "relevance": """You are evaluating a Business Intelligence agent's response for RELEVANCE.

For a BI agent, relevant information includes:
- Direct answers to the financial question
- Supporting context that helps interpret the numbers (date ranges, accounting method, breakdowns)
- Financial metrics and KPIs related to the query

Score TRUE if the information helps a financial professional understand and use the answer.
Score FALSE only if information is truly unrelated to the financial question asked.

Note: Accounting context, date ranges, and supporting breakdowns are RELEVANT for financial analysis.

Ground Truth: {ground_truth}

Response: {response}

Output your verdict as JSON: {{"verdict": true/false, "reasoning": "..."}}""",

        "voice_tone": """You are evaluating a Business Intelligence agent's response for VOICE & TONE.

For a BI agent serving CPAs, bookkeepers, and financial professionals:
- **Accounting terminology** (accrual, cash basis, net income, DSO, etc.) is EXPECTED professional language, not jargon
- **Structured formatting** (tables, headers, bullet points) is APPROPRIATE for financial data
- **Professional tone** is ACCEPTABLE - the persona is "Staff Accountant," not casual chatbot

Score TRUE if the response is clear, professional, and appropriate for a financial audience.
Score FALSE only if the response:
- Exposes internal system language (dataframe, SQL, error codes)
- Is confusing or unclear
- Uses truly unnecessary technical complexity

Response: {response}

Output your verdict as JSON: {{"verdict": true/false, "reasoning": "..."}}"""
    }
}

# Default weights (matching Omni eval)
DEFAULT_WEIGHTS = {
    "correctness": 45,
    "completeness": 15,
    "relevance": 15,
    "voice_tone": 5,
    # Simplified - not including hallucination and compliance for the playground
}

# =============================================================================
# JUDGE FUNCTIONS
# =============================================================================

def run_judge(response: str, ground_truth: str, rubric_template: str, model: str = "gpt-4o-mini") -> dict:
    """Call OpenAI to judge a response"""
    
    prompt = rubric_template.format(response=response, ground_truth=ground_truth)
    
    try:
        completion = client.chat.completions.create(
            model=model,
            messages=[
                {"role": "system", "content": "You are an expert evaluator. Always respond with valid JSON."},
                {"role": "user", "content": prompt}
            ],
            temperature=0.1,  # Low temperature for consistency
            response_format={"type": "json_object"}
        )
        
        result = json.loads(completion.choices[0].message.content)
        return {
            "verdict": result.get("verdict", False),
            "reasoning": result.get("reasoning", "No reasoning provided")
        }
    except Exception as e:
        return {
            "verdict": None,
            "reasoning": f"Error calling API: {str(e)}"
        }

def calculate_weighted_score(verdicts: dict, weights: dict) -> float:
    """Calculate weighted score from boolean verdicts"""
    total_weight = sum(weights.values())
    earned = sum(weights[k] for k, v in verdicts.items() if v)
    return (earned / total_weight) * 100 if total_weight > 0 else 0

# =============================================================================
# STREAMLIT APP
# =============================================================================

st.set_page_config(
    page_title="Eval Playground",
    page_icon="🧪",
    layout="wide"
)

st.title("🧪 Eval Playground")
st.markdown("*Learn how LLM-as-a-judge evaluations work*")

# Check for API key
if not os.getenv("OPENAI_API_KEY"):
    st.error("⚠️ Please set your OPENAI_API_KEY environment variable")
    st.code("export OPENAI_API_KEY=your-key-here", language="bash")
    st.stop()

# Sidebar - Mode selection
mode = st.sidebar.radio(
    "Mode",
    ["📝 Single Response", "📊 Batch Test", "⚖️ Weight Simulator"],
    index=0
)

st.sidebar.markdown("---")
st.sidebar.markdown("### About")
st.sidebar.markdown("""
This tool helps you understand:
- How LLM judges evaluate responses
- How rubric wording affects verdicts
- How weights create aggregate scores
- Why agent-aware rubrics matter
""")

# =============================================================================
# MODE 1: SINGLE RESPONSE
# =============================================================================

if mode == "📝 Single Response":
    st.header("Single Response Evaluation")
    st.markdown("See how one response is judged across all metrics")
    
    col1, col2 = st.columns([1, 1])
    
    with col1:
        # Test case selection
        case_names = [f"{tc['id']}. {tc['name']} ({tc['agent']})" for tc in TEST_CASES]
        selected_idx = st.selectbox("Select test case", range(len(TEST_CASES)), format_func=lambda x: case_names[x])
        test_case = TEST_CASES[selected_idx]
        
        st.markdown(f"**Agent:** {test_case['agent']}")
        st.markdown(f"**Notes:** {test_case['notes']}")
        
        st.markdown("**Response:**")
        st.text_area("response_display", test_case['response'], height=200, disabled=True, label_visibility="collapsed")
        
        st.markdown("**Ground Truth:**")
        st.text_area("gt_display", test_case['ground_truth'], height=80, disabled=True, label_visibility="collapsed")
    
    with col2:
        # Rubric selection
        rubric_options = {
            "generic": "Generic (Omni default)",
            "intuit_brand": "Intuit Brand Standards (Enhanced)",
            "agent_aware": "Agent-Aware (BI-specific)"
        }
        rubric_type = st.radio("Rubric Type", list(rubric_options.keys()), format_func=lambda x: rubric_options[x])
        
        # Show rubric preview - full text with proper formatting
        with st.expander("Preview rubrics"):
            for metric, rubric in RUBRICS[rubric_type].items():
                st.markdown(f"**{metric}:**")
                # Clean up the rubric for display (remove the format placeholders shown)
                display_rubric = rubric.replace("{response}", "*[response]*").replace("{ground_truth}", "*[ground_truth]*")
                st.markdown(f"""<div style="background-color: #f0f2f6; padding: 12px; border-radius: 6px; margin-bottom: 16px; white-space: pre-wrap; font-family: monospace; font-size: 13px; line-height: 1.5;">{display_rubric}</div>""", unsafe_allow_html=True)
        
        if st.button("🔄 Run Evaluation", type="primary"):
            with st.spinner("Evaluating..."):
                results = {}
                for metric in ["correctness", "completeness", "relevance", "voice_tone"]:
                    results[metric] = run_judge(
                        test_case['response'],
                        test_case['ground_truth'],
                        RUBRICS[rubric_type][metric]
                    )
            
            st.markdown("### Results")
            
            # Results table
            verdicts = {}
            for metric in ["correctness", "completeness", "relevance", "voice_tone"]:
                result = results[metric]
                verdict = result['verdict']
                verdicts[metric] = verdict
                weight = DEFAULT_WEIGHTS[metric]
                points = weight if verdict else 0
                icon = "✅" if verdict else "❌" if verdict is False else "⚠️"
                
                with st.expander(f"{icon} **{metric.replace('_', ' ').title()}** — Weight: {weight}% — Points: {points}"):
                    st.markdown(f"**Verdict:** {verdict}")
                    st.markdown(f"**Reasoning:** {result['reasoning']}")
            
            # Calculate total
            weighted_score = calculate_weighted_score(verdicts, DEFAULT_WEIGHTS)
            passing = weighted_score >= 85
            
            st.markdown("---")
            col_score, col_status = st.columns([1, 1])
            with col_score:
                st.metric("Weighted Score", f"{weighted_score:.1f}%")
            with col_status:
                if passing:
                    st.success("✅ Passes 85% threshold")
                else:
                    st.error("❌ Below 85% threshold")

# =============================================================================
# MODE 2: BATCH TEST
# =============================================================================

elif mode == "📊 Batch Test":
    st.header("Batch Test Comparison")
    st.markdown("Compare aggregate metrics across different rubrics")
    
    col1, col2 = st.columns([1, 1])
    
    with col1:
        st.markdown("### Test Set")
        selected_cases = st.multiselect(
            "Select test cases",
            range(len(TEST_CASES)),
            default=list(range(min(5, len(TEST_CASES)))),
            format_func=lambda x: f"{TEST_CASES[x]['id']}. {TEST_CASES[x]['name']}"
        )
        
        if len(selected_cases) < 2:
            st.warning("Select at least 2 test cases for meaningful comparison")
    
    with col2:
        st.markdown("### Compare Rubrics")
        compare_mode = st.checkbox("Compare Generic vs Agent-Aware", value=True)
        
        if not compare_mode:
            single_rubric = st.radio("Rubric", ["generic", "agent_aware"])
    
    if st.button("🔄 Run Batch Evaluation", type="primary") and len(selected_cases) >= 2:
        
        rubrics_to_run = ["generic", "agent_aware"] if compare_mode else [single_rubric]
        all_results = {r: [] for r in rubrics_to_run}
        
        progress = st.progress(0)
        total_evals = len(selected_cases) * len(rubrics_to_run) * 4  # 4 metrics
        current = 0
        
        for rubric_type in rubrics_to_run:
            for case_idx in selected_cases:
                tc = TEST_CASES[case_idx]
                case_results = {"case": tc['name'], "verdicts": {}}
                
                for metric in ["correctness", "completeness", "relevance", "voice_tone"]:
                    result = run_judge(tc['response'], tc['ground_truth'], RUBRICS[rubric_type][metric])
                    case_results["verdicts"][metric] = result['verdict']
                    current += 1
                    progress.progress(current / total_evals)
                
                all_results[rubric_type].append(case_results)
        
        progress.empty()
        
        # Display results
        st.markdown("### Results")
        
        # Build comparison table
        metrics = ["correctness", "completeness", "relevance", "voice_tone"]
        
        if compare_mode:
            st.markdown("#### Pass Rates by Metric")
            
            data = []
            for metric in metrics:
                row = {"Metric": metric.replace("_", " ").title(), "Weight": f"{DEFAULT_WEIGHTS[metric]}%"}
                for rubric_type in rubrics_to_run:
                    passes = sum(1 for r in all_results[rubric_type] if r['verdicts'].get(metric))
                    total = len(all_results[rubric_type])
                    pct = (passes / total * 100) if total > 0 else 0
                    row[rubric_type.replace("_", " ").title()] = f"{pct:.0f}% ({passes}/{total})"
                data.append(row)
            
            st.table(data)
            
            # Overall weighted scores
            st.markdown("#### Overall Weighted Scores")
            for rubric_type in rubrics_to_run:
                scores = []
                for r in all_results[rubric_type]:
                    score = calculate_weighted_score(r['verdicts'], DEFAULT_WEIGHTS)
                    scores.append(score)
                avg_score = sum(scores) / len(scores) if scores else 0
                
                label = "Generic Rubric" if rubric_type == "generic" else "Agent-Aware Rubric"
                status = "✅" if avg_score >= 85 else "❌"
                st.metric(label, f"{avg_score:.1f}% {status}")
        
        else:
            # Single rubric results
            for r in all_results[single_rubric]:
                score = calculate_weighted_score(r['verdicts'], DEFAULT_WEIGHTS)
                st.markdown(f"**{r['case']}**: {score:.1f}%")

# =============================================================================
# MODE 3: WEIGHT SIMULATOR
# =============================================================================

elif mode == "⚖️ Weight Simulator":
    st.header("Weight Simulator")
    st.markdown("Experiment with metric weights to see their impact")
    
    st.markdown("### Adjust Weights")
    
    col1, col2 = st.columns([1, 1])
    
    with col1:
        w_correctness = st.slider("Correctness", 0, 100, DEFAULT_WEIGHTS["correctness"], 5)
        w_completeness = st.slider("Completeness", 0, 100, DEFAULT_WEIGHTS["completeness"], 5)
    
    with col2:
        w_relevance = st.slider("Relevance", 0, 100, DEFAULT_WEIGHTS["relevance"], 5)
        w_voice_tone = st.slider("Voice/Tone", 0, 100, DEFAULT_WEIGHTS["voice_tone"], 5)
    
    custom_weights = {
        "correctness": w_correctness,
        "completeness": w_completeness,
        "relevance": w_relevance,
        "voice_tone": w_voice_tone
    }
    
    total_weight = sum(custom_weights.values())
    
    if total_weight != 100:
        st.warning(f"⚠️ Weights sum to {total_weight}%, not 100%. Results will be normalized.")
    
    st.markdown("### Impact Simulation")
    st.markdown("Using sample verdict patterns to show weight impact:")
    
    # Sample patterns
    patterns = [
        {"name": "All Pass", "verdicts": {"correctness": True, "completeness": True, "relevance": True, "voice_tone": True}},
        {"name": "Voice/Tone Fail Only", "verdicts": {"correctness": True, "completeness": True, "relevance": True, "voice_tone": False}},
        {"name": "Subjective Metrics Fail", "verdicts": {"correctness": True, "completeness": False, "relevance": False, "voice_tone": False}},
        {"name": "Correctness Fail Only", "verdicts": {"correctness": False, "completeness": True, "relevance": True, "voice_tone": True}},
        {"name": "All Fail", "verdicts": {"correctness": False, "completeness": False, "relevance": False, "voice_tone": False}},
    ]
    
    col_default, col_custom = st.columns([1, 1])
    
    with col_default:
        st.markdown("**Default Weights (45/15/15/5)**")
        for p in patterns:
            score = calculate_weighted_score(p['verdicts'], DEFAULT_WEIGHTS)
            status = "✅" if score >= 85 else "❌"
            st.markdown(f"{p['name']}: **{score:.1f}%** {status}")
    
    with col_custom:
        st.markdown("**Your Custom Weights**")
        for p in patterns:
            score = calculate_weighted_score(p['verdicts'], custom_weights)
            status = "✅" if score >= 85 else "❌"
            st.markdown(f"{p['name']}: **{score:.1f}%** {status}")
    
    st.markdown("---")
    st.markdown("### 💡 Insights")
    
    # Calculate impact of voice_tone
    vt_impact_default = DEFAULT_WEIGHTS["voice_tone"]
    vt_impact_custom = custom_weights["voice_tone"]
    
    st.markdown(f"""
    - **Voice/Tone at {vt_impact_custom}%**: A voice/tone failure costs {vt_impact_custom} points
    - **At default {vt_impact_default}%**: A voice/tone failure costs {vt_impact_default} points
    - **Correctness at {custom_weights['correctness']}%**: A correctness failure costs {custom_weights['correctness']} points
    
    *Even with adjusted weights, failures still appear as "failed" in dashboards — weight changes affect the aggregate score but not the individual metric pass/fail status.*
    """)

# Footer
st.markdown("---")
st.markdown("*Eval Playground v1.0 — Built for learning about LLM-as-a-judge evaluations*")

