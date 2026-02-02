import Anthropic from "@anthropic-ai/sdk";

async function main() {
  console.log("Simple test agent starting...");
  console.log("Session ID:", process.env.AGENTBOX_SESSION_ID);
  console.log("ANTHROPIC_BASE_URL:", process.env.ANTHROPIC_BASE_URL);

  // Parse input
  const input = JSON.parse(process.env.AGENTBOX_SESSION_INPUT || "{}");
  const prompt = input.prompt || "Say hello in one sentence.";
  console.log("Prompt:", prompt);

  // Create Anthropic client (will use ANTHROPIC_API_KEY and ANTHROPIC_BASE_URL from env)
  const client = new Anthropic();

  // Make a simple API call
  console.log("Calling Anthropic API...");
  const response = await client.messages.create({
    model: "claude-sonnet-4-20250514",
    max_tokens: 100,
    messages: [{ role: "user", content: prompt }],
  });

  console.log("Response:", JSON.stringify(response, null, 2));
  console.log("Simple test agent completed!");
}

main().catch((err) => {
  console.error("Agent failed:", err);
  process.exit(1);
});
