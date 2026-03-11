// Demo 04 — Dynamic Few-Shot Retrieval
// ──────────────────────────────────────
// Examples are retrieved at runtime based on query topic.
// Same model, same system prompt. The examples are the variable.
//
// Run: node demo.js

import Anthropic from "@anthropic-ai/sdk";
import "dotenv/config";

const client = new Anthropic();

const SYSTEM =
  "You are a financial assistant for QuickBooks small business users. Follow the style and format of any examples provided closely.";

// ─── EXAMPLE BANK ────────────────────────────────────────────
// In production this might live in a database or vector store.
// Here it's a flat array we filter at runtime.

const EXAMPLE_BANK = [
  {
    topic: "cash_flow",
    query: "My cash flow was negative last month. What does that mean?",
    response:
      "Negative cash flow means more money left your business than came in during that period. It does not necessarily mean you are losing money — you might be profitable on paper but waiting on unpaid invoices, or you made a large one-time purchase. The key question is whether this is a pattern or an outlier. Check your last three months side by side.",
  },
  {
    topic: "cash_flow",
    query: "How do I improve my cash flow?",
    response:
      "Three levers: speed up what comes in, slow down what goes out, and smooth the gap between them. Practically — invoice immediately, follow up on overdue payments, negotiate longer payment terms with vendors, and keep a rolling 90-day cash forecast so surprises stop being surprises.",
  },
  {
    topic: "expenses",
    query: "My expenses went up 20% this month. Should I be worried?",
    response:
      "Depends on why. First, isolate which categories increased — payroll, software, contractors, inventory? Then ask whether revenue grew proportionally. A 20% expense increase alongside 25% revenue growth is healthy. The same increase with flat revenue is a margin problem. Pull your P&L and look at the expense breakdown before drawing conclusions.",
  },
  {
    topic: "expenses",
    query: "What is the difference between fixed and variable expenses?",
    response:
      "Fixed expenses stay the same regardless of how much business you do — rent, insurance, software subscriptions. Variable expenses scale with activity — materials, shipping, contractor hours. Knowing the split matters because in a slow month, you can cut variable costs but fixed costs stay. Most small businesses want fixed costs as low as possible.",
  },
  {
    topic: "revenue",
    query: "My revenue was up but my profit was down. How is that possible?",
    response:
      "Revenue going up while profit goes down usually means your costs grew faster than your sales. Common causes: you hired ahead of demand, took on lower-margin work to hit a revenue target, or had a one-time expense that hit in the same period. Check your gross margin first — if that held steady, the problem is in operating expenses.",
  },
  {
    topic: "revenue",
    query: "How should I think about revenue targets for next quarter?",
    response:
      "Start with what you know: last quarter actuals, any confirmed contracts or recurring revenue, and your pipeline. Build a conservative, base, and stretch scenario. The conservative number is what you can count on. The base is what you plan to. The stretch is what you chase. Most small businesses skip this and then either over-hire or under-invest.",
  },
];

// ─── QUERY CLASSIFIER ────────────────────────────────────────
// In production this could be an embedding similarity search,
// a lightweight classifier model, or keyword matching.
// Here we use simple keyword matching to keep the demo readable.

function classifyQuery(query) {
  const q = query.toLowerCase();
  if (
    q.includes("cash flow") ||
    q.includes("cashflow") ||
    q.includes("negative")
  )
    return "cash_flow";
  if (q.includes("expense") || q.includes("cost") || q.includes("spending"))
    return "expenses";
  if (
    q.includes("revenue") ||
    q.includes("sales") ||
    q.includes("income") ||
    q.includes("profit")
  )
    return "revenue";
  return null;
}

function retrieveExamples(topic) {
  if (!topic) return [];
  return EXAMPLE_BANK.filter((e) => e.topic === topic).slice(0, 2);
}

function buildUserTurn(examples, query) {
  if (examples.length === 0) {
    return query;
  }

  const exampleBlock = examples
    .map((e, i) => {
      return "Example " + (i + 1) + ":\nQ: " + e.query + "\nA: " + e.response;
    })
    .join("\n\n");

  return (
    "Here are some examples of the style and depth expected:\n\n" +
    exampleBlock +
    "\n\n---\n\nNow answer this question in the same style:\n\n" +
    query
  );
}

// ─── QUERIES ─────────────────────────────────────────────────

const QUERIES = [
  {
    label: "CASH FLOW QUERY",
    query:
      "I have money in my account but my cash flow report looks bad. What is going on?",
  },
  {
    label: "EXPENSE QUERY",
    query: "Is it normal for expenses to spike at the end of the year?",
  },
  {
    label: "REVENUE QUERY",
    query:
      "My biggest client pays late every month. How does that affect my revenue numbers?",
  },
  {
    label: "UNCLASSIFIED QUERY — no examples retrieved",
    query: "What is the difference between a sole proprietor and an LLC?",
  },
];

async function runDemo() {
  console.log("=".repeat(60));
  console.log("DEMO 04 — Dynamic Few-Shot Retrieval");
  console.log("=".repeat(60));
  console.log("\nSame model. Same system prompt.");
  console.log("The only variable is which examples get retrieved.\n");

  for (const item of QUERIES) {
    const topic = classifyQuery(item.query);
    const examples = retrieveExamples(topic);
    const userTurn = buildUserTurn(examples, item.query);

    console.log("\n" + "-".repeat(60));
    console.log(">> " + item.label);
    console.log('   Query: "' + item.query + '"');
    console.log(
      "   Classified as: " +
        (topic || "none") +
        " | Examples retrieved: " +
        examples.length,
    );

    if (examples.length > 0) {
      console.log("\n   EXAMPLES INJECTED:");
      examples.forEach((e, i) => {
        console.log("   [" + (i + 1) + "] " + e.query);
      });
    }

    console.log("\nMODEL RESPONSE:");

    const response = await client.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 300,
      system: SYSTEM,
      messages: [{ role: "user", content: userTurn }],
    });

    console.log(response.content[0].text);
  }

  console.log("\n" + "=".repeat(60));
  console.log("\nWHAT JUST HAPPENED:");
  console.log("Each query was classified at runtime.");
  console.log("Matching examples were pulled from the bank and injected.");
  console.log("The unclassified query got no examples — and the response");
  console.log("reflects that. Different depth, different structure.");
  console.log("\nThe example bank is the asset. Classification is the lever.");
  console.log(
    "Add better examples, get better responses. No prompt rewrite needed.\n",
  );
}

runDemo().catch(console.error);
