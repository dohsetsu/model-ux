// Demo 01 — Dynamic System Prompt Assembly
// Run: node demo.js

import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic();

const USERS = {
  new_user: {
    name: "Alex",
    plan: "trial",
    monthsActive: 0,
    cashFlowNegative: false,
    hasAccountant: false,
    expertiseLevel: "beginner",
  },
  struggling_owner: {
    name: "Maria",
    plan: "simple_start",
    monthsActive: 8,
    cashFlowNegative: true,
    consecutiveNegativeMonths: 3,
    hasAccountant: false,
    expertiseLevel: "intermediate",
  },
  power_user: {
    name: "David",
    plan: "advanced",
    monthsActive: 36,
    cashFlowNegative: false,
    hasAccountant: true,
    expertiseLevel: "advanced",
  },
};

function assembleSystemPrompt(user) {
  const base =
    "You are a financial assistant for QuickBooks small business users.";

  const expertise = {
    beginner:
      "The user is new to business finance. Avoid jargon. Explain terms when you use them. Prioritize orientation over completeness.",
    intermediate:
      "The user has some business finance experience. Be direct. Use standard accounting terms.",
    advanced:
      "The user is financially sophisticated. Be precise. Skip basic explanations. They may have an accountant — acknowledge that where relevant.",
  }[user.expertiseLevel];

  const accountHealth = user.cashFlowNegative
    ? "⚠ ACCOUNT SIGNAL: This user's cash flow has been negative for " +
      user.consecutiveNegativeMonths +
      " consecutive months. They may be under financial stress. Be empathetic but direct. Surface actionable options early."
    : "Account health appears stable. No urgent signals.";

  const escalation =
    user.cashFlowNegative && !user.hasAccountant
      ? "If the situation seems serious, suggest speaking with an accountant or QuickBooks Live Bookkeeping."
      : user.hasAccountant
        ? "The user works with an accountant. Suggest they discuss complex decisions with their accountant."
        : "Escalate to human support only for billing or account access issues.";

  const scope =
    "You help with: understanding financial reports, interpreting cash flow, explaining QuickBooks features, and general small business financial questions. You do not provide tax advice or make specific investment recommendations.";

  return [base, expertise, accountHealth, escalation, scope].join("\n\n");
}

const QUERY = "My expenses went up last month. Should I be worried?";

async function runDemo() {
  console.log("=".repeat(60));
  console.log("DEMO 01 — Dynamic System Prompt Assembly");
  console.log("=".repeat(60));
  console.log('\nUser query: "' + QUERY + '"\n');

  for (const [userId, user] of Object.entries(USERS)) {
    const systemPrompt = assembleSystemPrompt(user);

    console.log("\n" + "-".repeat(60));
    console.log("USER: " + user.name + " (" + userId + ")");
    console.log(
      "Plan: " +
        user.plan +
        " | Expertise: " +
        user.expertiseLevel +
        " | Cash flow negative: " +
        user.cashFlowNegative,
    );
    console.log("\nASSEMBLED SYSTEM PROMPT:");
    console.log(
      systemPrompt
        .split("\n\n")
        .map((s) => "  " + s)
        .join("\n\n"),
    );
    console.log("\nMODEL RESPONSE:");

    const response = await client.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 300,
      system: systemPrompt,
      messages: [{ role: "user", content: QUERY }],
    });

    console.log(response.content[0].text);
  }

  console.log("\n" + "=".repeat(60));
  console.log("\nWHAT JUST HAPPENED:");
  console.log("Same model. Same question. Three different assembled prompts.");
  console.log(
    "The behavior differences are entirely driven by assembleSystemPrompt().",
  );
  console.log("\nThat function is where Model UX lives.\n");
}

runDemo().catch(console.error);
