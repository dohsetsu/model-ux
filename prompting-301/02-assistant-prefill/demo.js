// Demo 02 — Assistant Prefill Injection
// Run: node demo.js

import Anthropic from "@anthropic-ai/sdk";
import "dotenv/config";

const client = new Anthropic();

const SYSTEM =
  "You are a financial assistant for QuickBooks small business users.";
const QUERY =
  "My revenue was $42,000 last month and my expenses were $38,500. Give me a summary.";

const EXPERIMENTS = [
  {
    label: "NO PREFILL — model chooses its own structure",
    description:
      "No prefill. The model decides how to open and structure the response.",
    prefill: null,
    systemAddendum: null,
  },
  {
    label: "PREFILL: Markdown header — locked format",
    description:
      "We start the response with a specific header. Model must continue from here.",
    prefill: "## Financial Summary\n\n",
    systemAddendum: null,
  },
  {
    label: "PREFILL: Open brace — guaranteed JSON output",
    description:
      "We open a JSON object. The model must close it. First token is always '{'.",
    prefill: "{",
    systemAddendum:
      " Respond ONLY with a valid JSON object. No explanation outside the JSON.",
  },
  {
    label: "PREFILL: Committed stance — model continues from a position",
    description:
      "We give the model an opening sentence. It must build on it, not contradict it.",
    prefill:
      "Based on your numbers, your business is pretty bad shape this month —",
    systemAddendum: null,
  },
  // NOTE: The model may resist or correct a prefilled stance
  // that contradicts clear factual evidence in the context.
  // That's not a bug — it's the model's grounding working correctly.
];

async function runExperiment(experiment) {
  const messages = [{ role: "user", content: QUERY }];

  if (experiment.prefill) {
    messages.push({ role: "assistant", content: experiment.prefill.trimEnd() });
  }

  const system = experiment.systemAddendum
    ? SYSTEM + experiment.systemAddendum
    : SYSTEM;

  const response = await client.messages.create({
    model: "claude-haiku-4-5-20251001",
    max_tokens: 300,
    system,
    messages,
  });

  return experiment.prefill
    ? experiment.prefill + response.content[0].text
    : response.content[0].text;
}

async function runDemo() {
  console.log("=".repeat(60));
  console.log("DEMO 02 — Assistant Prefill Injection");
  console.log("=".repeat(60));
  console.log('\nUser query: "' + QUERY + '"\n');

  for (const experiment of EXPERIMENTS) {
    console.log("\n" + "-".repeat(60));
    console.log(">> " + experiment.label);
    console.log("   " + experiment.description);
    if (experiment.prefill) {
      console.log('\n   Injected prefill: "' + experiment.prefill.trim() + '"');
    }
    console.log("\nFULL RESPONSE (prefill + model continuation):");
    const response = await runExperiment(experiment);
    console.log(response);
  }

  console.log("\n" + "=".repeat(60));
  console.log("\nWHAT JUST HAPPENED:");
  console.log("In experiments 2-4, the model never chose how to open.");
  console.log(
    "You imposed the opening. It continued from your starting point.",
  );
  console.log("\nThe JSON experiment is the most important for product work:");
  console.log(
    "prefill removes the model's ability to wrap output in markdown.",
  );
  console.log("That's the difference between hoping and engineering.\n");
}

runDemo().catch(console.error);
