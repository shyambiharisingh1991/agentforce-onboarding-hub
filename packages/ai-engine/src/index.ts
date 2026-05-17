export type OrganizationProfile = {
  industry: string;
  segment: "SMB" | "Mid-Market" | "Enterprise";
  teamSize: number;
  businessFunction: string;
  salesforceProducts: string[];
};

export type GeneratedUseCase = {
  title: string;
  businessValue: string;
  workflow: string;
  effort: "Low" | "Medium" | "High";
  expectedImpact: string;
  requiredProducts: string[];
  guardrails: string[];
};

const byFunction: Record<string, GeneratedUseCase[]> = {
  "Customer Support": [
    {
      title: "Autonomous case triage and routing",
      businessValue: "Reduces queue review time and improves SLA adherence.",
      workflow: "Agentforce summarizes case intent, checks entitlement, predicts priority, and routes to the right queue.",
      effort: "Medium",
      expectedImpact: "15-25% reduction in manual triage effort",
      requiredProducts: ["Service Cloud", "Data Cloud"],
      guardrails: ["Human review for escalations", "PII masking", "Audit routing decisions weekly"]
    },
    {
      title: "Knowledge-grounded reply drafting",
      businessValue: "Shortens response times while keeping answers consistent.",
      workflow: "Agentforce retrieves approved knowledge, drafts a response, and asks agents to approve or edit.",
      effort: "Low",
      expectedImpact: "10-20% handle-time reduction",
      requiredProducts: ["Service Cloud", "Knowledge"],
      guardrails: ["Approved sources only", "Confidence threshold", "No policy exceptions"]
    }
  ],
  Sales: [
    {
      title: "Opportunity risk coach",
      businessValue: "Improves deal inspection and next-step quality.",
      workflow: "Agentforce reviews activity, stage, competitors, and stakeholder gaps to recommend next actions.",
      effort: "Low",
      expectedImpact: "5-10% increase in qualified next steps",
      requiredProducts: ["Sales Cloud"],
      guardrails: ["Do not invent buyer facts", "Cite CRM fields", "Manager review for strategic accounts"]
    }
  ],
  "Customer Success": [
    {
      title: "Renewal risk briefing assistant",
      businessValue: "Helps CSMs prioritize accounts with service and usage risk signals.",
      workflow: "Agentforce combines cases, product usage, health score, and notes into renewal risk summaries.",
      effort: "Medium",
      expectedImpact: "Earlier risk detection and faster account planning",
      requiredProducts: ["Sales Cloud", "Service Cloud", "Data Cloud"],
      guardrails: ["Customer-visible claims require source citations", "Restrict sensitive account data"]
    }
  ],
  Operations: [
    {
      title: "Workflow automation discovery agent",
      businessValue: "Builds a reusable backlog of automation opportunities.",
      workflow: "Agentforce clusters manual work notes and suggests actions, owners, and expected savings.",
      effort: "Medium",
      expectedImpact: "Faster identification of high-ROI automation candidates",
      requiredProducts: ["Platform", "Flow"],
      guardrails: ["BA approval", "No production action without sandbox test"]
    }
  ]
};

export function generateUseCases(profile: OrganizationProfile): GeneratedUseCase[] {
  const defaults = byFunction[profile.businessFunction] ?? byFunction["Customer Support"];
  const segmentUseCase: GeneratedUseCase =
    profile.segment === "SMB"
      ? {
          title: "Two-week quick-win support assistant",
          businessValue: "Launches one measurable workflow with limited admin overhead.",
          workflow: "Agentforce drafts responses for one queue using approved knowledge and tracks saved time.",
          effort: "Low",
          expectedImpact: "Pilot-ready in 10 business days",
          requiredProducts: ["Service Cloud"],
          guardrails: ["Agent approval required", "Weekly prompt review"]
        }
      : {
          title: "Enterprise AI operating model rollout",
          businessValue: "Creates consistent governance and adoption visibility across business units.",
          workflow: "Agentforce implementation council reviews use cases, credit analytics, prompts, and rollout health.",
          effort: "High",
          expectedImpact: "Accelerates scale after pilot while reducing governance risk",
          requiredProducts: ["Service Cloud", "Data Cloud", "Slack"],
          guardrails: ["Executive sponsor", "AI governance review", "Credit budget controls"]
        };

  const industryUseCase: GeneratedUseCase = {
    title: `${profile.industry} knowledge assistant`,
    businessValue: `Turns ${profile.industry} policies and process knowledge into guided Agentforce answers.`,
    workflow: "Ground answers in approved knowledge sources, route low-confidence answers to experts, and capture content gaps.",
    effort: profile.teamSize > 500 ? "Medium" : "Low",
    expectedImpact: "Higher answer consistency and faster ramp for new team members",
    requiredProducts: profile.salesforceProducts.includes("Data Cloud") ? ["Data Cloud", "Service Cloud"] : ["Service Cloud"],
    guardrails: ["Approved content sources", "Low-confidence handoff", "Monthly knowledge QA"]
  };

  return [...defaults, segmentUseCase, industryUseCase];
}

export function generateOnboardingPlan(role: string, readinessScore: number) {
  const pace = readinessScore >= 75 ? "accelerated" : readinessScore >= 50 ? "standard" : "stabilization-first";
  return {
    title: `${role} ${pace} onboarding plan`,
    weeks: [
      "Baseline goals, access, and Agentforce concepts",
      "Role-specific workflow simulation and prompt practice",
      "Pilot execution, usage review, and feedback capture",
      "ROI review, governance checkpoint, and scale recommendation"
    ],
    reminders: ["Schedule weekly adoption office hours", "Review credit usage every Friday", "Capture blockers in Jira or the implementation backlog"]
  };
}

export async function generateWithOpenAI(prompt: string, apiKey?: string) {
  if (!apiKey) {
    return {
      mode: "fallback",
      text: "OPENAI_API_KEY is not configured. The deterministic recommendation engine returned curated onboarding guidance instead."
    };
  }

  const { default: OpenAI } = await import("openai");
  const client = new OpenAI({ apiKey });
  const response = await client.responses.create({
    model: "gpt-4.1-mini",
    input: prompt
  });

  return { mode: "openai", text: response.output_text };
}
