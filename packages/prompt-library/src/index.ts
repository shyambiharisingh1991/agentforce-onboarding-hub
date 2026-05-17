export type PromptTemplate = {
  id: string;
  category: string;
  title: string;
  template: string;
  rating: number;
  variables: string[];
  usageExamples: string[];
};

export const promptTemplates: PromptTemplate[] = [
  {
    id: "support-case-triage",
    category: "Support Agents",
    title: "Case triage summary",
    template: "Summarize the issue, urgency, sentiment, likely cause, and next best action from {{case_history}}.",
    rating: 4.8,
    variables: ["case_history"],
    usageExamples: ["New tier-1 case intake", "Backlog review", "Priority queue routing"]
  },
  {
    id: "support-escalation",
    category: "Escalation Handling",
    title: "Escalation readiness review",
    template: "Review {{case_summary}} and identify missing facts, escalation reason, customer impact, and recommended specialist queue.",
    rating: 4.7,
    variables: ["case_summary"],
    usageExamples: ["Support manager review", "SLA breach prevention"]
  },
  {
    id: "sales-next-step",
    category: "Sales Agents",
    title: "Opportunity next step coach",
    template: "Given {{opportunity_context}}, recommend the next three actions, buyer questions, and mutual close plan updates.",
    rating: 4.6,
    variables: ["opportunity_context"],
    usageExamples: ["Pipeline inspection", "Account planning"]
  },
  {
    id: "onboarding-plan",
    category: "Onboarding Specialists",
    title: "Role-based onboarding plan",
    template: "Create a {{duration}} onboarding plan for {{role}} focused on {{business_goals}} with milestones and readiness checks.",
    rating: 4.9,
    variables: ["duration", "role", "business_goals"],
    usageExamples: ["New implementation kickoff", "Customer success onboarding"]
  },
  {
    id: "service-ops-review",
    category: "Service Operations",
    title: "Operational efficiency review",
    template: "Analyze {{support_metrics}} and recommend Agentforce workflows that reduce handle time without reducing CSAT.",
    rating: 4.7,
    variables: ["support_metrics"],
    usageExamples: ["Weekly service ops review", "Pilot success measurement"]
  },
  {
    id: "business-workflow-brief",
    category: "Business Analysis",
    title: "Automation brief",
    template: "Transform {{manual_workflow}} into an Agentforce implementation brief with actors, data, actions, guardrails, and KPIs.",
    rating: 4.9,
    variables: ["manual_workflow"],
    usageExamples: ["Discovery workshop", "Backlog grooming"]
  },
  {
    id: "customer-communication",
    category: "Customer Communications",
    title: "Customer-safe response draft",
    template: "Draft a concise customer response for {{customer_issue}} using approved facts only and include a confidence note for the agent.",
    rating: 4.5,
    variables: ["customer_issue"],
    usageExamples: ["Support reply drafting", "Follow-up after escalation"]
  }
];

export function findPromptsByCategory(category: string) {
  return promptTemplates.filter((prompt) => prompt.category === category);
}
