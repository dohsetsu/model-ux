// Demo 03 — Injection When the System Prompt is Locked
// Run: node demo.js

import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic();

const LOCKED_SYSTEM =
  "You are a helpful assistant for small business owners. Answer questions clearly and helpfully.";

const USER_CONTEXT = {
  name: "Maria Chen",
  plan: "Simple Start",
  cashFlowStatus: "NEGATIVE",
  consecutiveNegativeMonths: 3,
  hasAccountant: false,
};

const RAW_QUERY = "My expenses went up $3,000 last month. Should I be worried?";

function buildBare() {
  return RAW_QUERY;
}

function buildContextPrepend(ctx) {
  return (
    "[Account context: " +
    ctx.name +
    " | Plan: " +
    ctx.plan +
    " | Cash flow: " +
    ctx.cashFlowStatus +
    " for " +
    ctx.consecutiveNegativeMonths +
    " months | Has accountant: " +
    ctx.hasAccountant +
    "]\n\n" +
    RAW_QUERY
  );
}

function buildSoftInstructionPrepend(ctx) {
  const urgency =
    ctx.cashFlowStatus === "NEGATIVE" && ctx.consecutiveNegativeMonths >= 3
      ? "This user may be under significant financial stress."
      : "Account status is normal.";

  return (
    "[Assistant note: " +
    urgency +
    " Lead with empathy before analysis. If situation is serious, suggest professional help.]\n\n" +
    RAW_QUERY
  );
}

function buildFormatNegotiation() {
  return (
    "Please respond using exactly this format:\n\nSUMMARY: [one sentence assessment]\nKEY INSIGHT: [the most important thing they should understand]\nACTION: [one concrete next step they can take this week]\nESCALATE: [yes or no]\n\n---\n\n" +
    RAW_QUERY
  );
}

const EXPERIMENTS = [
  {
    label: "BARE — no injection",
    description:
      "Raw query only. Model has nothing beyond the locked system prompt.",
    buildUserTurn: () => buildBare(),
  },
  {
    label: "CONTEXT PREPEND — inject account state",
    description:
      "Structured context prepended. Model can now reason from real data.",
    buildUserTurn: () => buildContextPrepend(USER_CONTEXT),
  },
  {
    label: "SOFT INSTRUCTION PREPEND — behavioral directive",
    description:
      "Metadata-style directive before the query. Shapes response without changing what the user asked.",
    buildUserTurn: () => buildSoftInstructionPrepend(USER_CONTEXT),
  },
  {
    label: "FORMAT NEGOTIATION — output structure in the user turn",
    description:
      "Exact output shape specified. Critical when output feeds a UI component.",
    buildUserTurn: () => buildFormatNegotiation(),
  },
];

async function runDemo() {
  console.log("=".repeat(60));
  console.log("DEMO 03 — Injection When the System Prompt is Locked");
  console.log("=".repeat(60));
  console.log('\n[LOCKED] System prompt: "' + LOCKED_SYSTEM + '"\n');
  console.log('User raw query: "' + RAW_QUERY + '"\n');

  for (const experiment of EXPERIMENTS) {
    console.log("\n" + "-".repeat(60));
    console.log(">> " + experiment.label);
    console.log("   " + experiment.description);

    const userTurn = experiment.buildUserTurn();
    console.log("\nFULL USER TURN SENT TO MODEL:");
    console.log(
      userTurn
        .split("\n")
        .map((l) => "   " + l)
        .join("\n"),
    );
    console.log("\nMODEL RESPONSE:");

    const response = await client.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 250,
      system: LOCKED_SYSTEM,
      messages: [{ role: "user", content: userTurn }],
    });

    console.log(response.content[0].text);
  }

  console.log("\n" + "=".repeat(60));
  console.log("\nWHAT JUST HAPPENED:");
  console.log("The system prompt never changed. The model is the same.");
  console.log("The behavioral differences came entirely from what was");
  console.log("prepended to the user message in your application layer.");
  console.log("\nThis is the technique for locked systems.");
  console.log("The lever is almost always there. Find it.\n");
}

runDemo().catch(console.error);
