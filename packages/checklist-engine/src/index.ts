export type Role =
  | "Salesforce Developer"
  | "Admin"
  | "Business Analyst"
  | "CIO/CTO"
  | "Customer Support Team"
  | "Operations Team"
  | "AI Governance Team"
  | "Executive";

export type Journey = {
  role: Role;
  durationWeeks: number;
  readinessWeight: number;
  checklist: string[];
  roadmap: string[];
  milestones: string[];
  useCases: string[];
  certifications: string[];
};

export type ReadinessInput = {
  salesforceMaturity: number;
  supportProcessMaturity: number;
  aiReadiness: number;
  dataQuality: number;
  automationMaturity: number;
  crmWorkflowCoverage: number;
  knowledgeBaseReadiness: number;
};

export type ReadinessResult = {
  score: number;
  implementationComplexity: "Low" | "Moderate" | "High";
  quickWins: string[];
  riskAreas: string[];
  rolloutStrategy: string;
};

export const onboardingJourneys: Journey[] = [
  {
    role: "Salesforce Developer",
    durationWeeks: 4,
    readinessWeight: 0.18,
    checklist: ["Connect sandbox", "Review Agentforce builder concepts", "Implement first action", "Add guardrail tests", "Document deployment path"],
    roadmap: ["Data model review", "Agent actions", "Prompt testing", "CI deployment", "Observability"],
    milestones: ["Sandbox agent prototype", "Integration action library", "Security review complete"],
    useCases: ["Case summarization", "Knowledge retrieval action", "Order status assistant"],
    certifications: ["Agentforce Specialist", "Platform Developer I"]
  },
  {
    role: "Admin",
    durationWeeks: 3,
    readinessWeight: 0.16,
    checklist: ["Map permission sets", "Prepare knowledge content", "Configure topics", "Pilot with service queue", "Publish enablement guide"],
    roadmap: ["Org readiness", "Permissions", "Knowledge quality", "Pilot operations", "Release governance"],
    milestones: ["Admin configuration baseline", "Pilot group activated", "Release checklist approved"],
    useCases: ["Tier-1 deflection", "Case classification", "Agent guidance"],
    certifications: ["Salesforce Administrator", "Agentforce Specialist"]
  },
  {
    role: "Business Analyst",
    durationWeeks: 2,
    readinessWeight: 0.14,
    checklist: ["Identify high-volume workflows", "Define success metrics", "Draft automation briefs", "Validate handoff rules", "Measure baseline KPIs"],
    roadmap: ["Workflow inventory", "Value scoring", "Requirements", "Acceptance criteria", "ROI tracking"],
    milestones: ["Use case backlog", "Prioritized pilot scope", "Metric baseline"],
    useCases: ["Escalation analysis", "Customer intent clustering", "Post-call follow-up"],
    certifications: ["Business Analyst", "Agentforce Trailhead modules"]
  },
  {
    role: "CIO/CTO",
    durationWeeks: 2,
    readinessWeight: 0.12,
    checklist: ["Approve operating model", "Review security posture", "Set adoption targets", "Fund platform backlog", "Define AI governance council"],
    roadmap: ["Strategy", "Controls", "Funding", "Executive reporting", "Scale plan"],
    milestones: ["Governance model approved", "Budget and capacity aligned", "Executive dashboard live"],
    useCases: ["Enterprise service assistant", "IT support intake", "Cross-cloud productivity agent"],
    certifications: ["Executive AI strategy briefing"]
  },
  {
    role: "Customer Support Team",
    durationWeeks: 3,
    readinessWeight: 0.16,
    checklist: ["Complete agent simulation", "Review escalation rules", "Test knowledge suggestions", "Track CSAT impact", "Submit prompt feedback"],
    roadmap: ["Training", "Simulation", "Pilot", "Feedback", "Scaled adoption"],
    milestones: ["First cohort trained", "Pilot CSAT reviewed", "Workflow improvements shipped"],
    useCases: ["Reply drafting", "Case wrap-up", "Entitlement lookup"],
    certifications: ["Service Cloud basics", "Agentforce user enablement"]
  },
  {
    role: "Operations Team",
    durationWeeks: 3,
    readinessWeight: 0.12,
    checklist: ["Baseline operational KPIs", "Map repetitive workflows", "Define credit budgets", "Coordinate Slack and Jira reminders", "Publish productivity report"],
    roadmap: ["Operational baseline", "Workflow selection", "Pilot support", "Usage review", "Optimization"],
    milestones: ["Workflow inventory complete", "Credit dashboard reviewed", "Monthly productivity report shipped"],
    useCases: ["Knowledge gap detection", "Workflow automation backlog", "Adoption reminders"],
    certifications: ["Agentforce operations enablement"]
  },
  {
    role: "AI Governance Team",
    durationWeeks: 4,
    readinessWeight: 0.12,
    checklist: ["Define prompt review policy", "Set data handling standards", "Audit agent actions", "Approve monitoring model", "Run incident tabletop"],
    roadmap: ["Policy", "Risk controls", "Testing", "Monitoring", "Audit"],
    milestones: ["AI policy published", "Action audit complete", "Monitoring playbook approved"],
    useCases: ["Prompt approval workflow", "PII risk review", "Model behavior audit"],
    certifications: ["Responsible AI fundamentals"]
  },
  {
    role: "Executive",
    durationWeeks: 1,
    readinessWeight: 0.12,
    checklist: ["Review value thesis", "Approve pilot KPIs", "Attend ROI briefing", "Nominate change champions", "Inspect monthly adoption report"],
    roadmap: ["Business case", "Pilot governance", "Adoption review", "Expansion decision"],
    milestones: ["ROI model approved", "Executive sponsor assigned", "Scale decision scheduled"],
    useCases: ["Executive summary assistant", "Revenue risk briefing", "Support efficiency dashboard"],
    certifications: ["Agentforce executive overview"]
  }
];

export const industryTemplates = [
  {
    industry: "SaaS",
    segment: "Enterprise",
    overview: "Prioritize support deflection, renewal risk detection, and product knowledge assistance across global service teams.",
    recommendedRoles: ["Admin", "Salesforce Developer", "Business Analyst", "Customer Support Team"],
    rolloutStages: ["Support pilot", "Knowledge tuning", "Renewal workflow automation", "Executive ROI review"],
    successMetrics: ["Case handle time", "Deflection rate", "Expansion pipeline influenced", "CSAT"]
  },
  {
    industry: "Retail",
    segment: "Mid-Market",
    overview: "Start with order status, return policy support, and seasonal service surge workflows.",
    recommendedRoles: ["Admin", "Customer Support Team", "Business Analyst"],
    rolloutStages: ["Peak-season workflow mapping", "Order action integration", "Store support enablement"],
    successMetrics: ["First response time", "Return inquiry automation", "Peak backlog reduction"]
  },
  {
    industry: "Healthcare",
    segment: "Enterprise",
    overview: "Focus on governed patient support workflows, knowledge quality, escalation controls, and auditability.",
    recommendedRoles: ["AI Governance Team", "CIO/CTO", "Admin", "Business Analyst"],
    rolloutStages: ["Compliance review", "Knowledge source validation", "Limited pilot", "Audit review"],
    successMetrics: ["Escalation accuracy", "Policy adherence", "Staff hours saved"]
  },
  {
    industry: "Financial Services",
    segment: "Enterprise",
    overview: "Use Agentforce for advisor support, service intake, and compliance-safe knowledge retrieval.",
    recommendedRoles: ["AI Governance Team", "Salesforce Developer", "CIO/CTO", "Executive"],
    rolloutStages: ["Risk review", "Advisor pilot", "Action approval", "Line-of-business expansion"],
    successMetrics: ["Compliance exceptions", "Advisor productivity", "Case resolution time"]
  },
  {
    industry: "Manufacturing",
    segment: "Mid-Market",
    overview: "Accelerate warranty, parts, field service, and distributor support workflows.",
    recommendedRoles: ["Admin", "Salesforce Developer", "Operations Team", "Customer Support Team"],
    rolloutStages: ["Warranty workflow pilot", "Parts knowledge ingestion", "Field handoff automation"],
    successMetrics: ["Warranty cycle time", "Parts inquiry automation", "Field service handoff quality"]
  },
  {
    industry: "Customer Support Organizations",
    segment: "SMB",
    overview: "Launch fast with case triage, reply drafting, and knowledge article improvement loops.",
    recommendedRoles: ["Admin", "Customer Support Team", "Business Analyst"],
    rolloutStages: ["Queue selection", "Prompt library setup", "Two-week pilot", "Coaching review"],
    successMetrics: ["Agent ramp time", "Resolution speed", "QA score"]
  },
  {
    industry: "SMB Service Teams",
    segment: "SMB",
    overview: "Use a lightweight rollout that pairs admin configuration with simple measurable workflows.",
    recommendedRoles: ["Admin", "Executive", "Customer Support Team"],
    rolloutStages: ["Readiness assessment", "Quick-win assistant", "Usage review", "Scale or pause decision"],
    successMetrics: ["Monthly credits used", "Hours saved", "Customer response speed"]
  }
];

const clampScore = (value: number) => Math.max(1, Math.min(5, value));

export function scoreReadiness(input: ReadinessInput): ReadinessResult {
  const weights: Record<keyof ReadinessInput, number> = {
    salesforceMaturity: 0.17,
    supportProcessMaturity: 0.15,
    aiReadiness: 0.18,
    dataQuality: 0.18,
    automationMaturity: 0.12,
    crmWorkflowCoverage: 0.1,
    knowledgeBaseReadiness: 0.1
  };
  const weighted = Object.entries(weights).reduce((sum, [key, weight]) => {
    return sum + clampScore(input[key as keyof ReadinessInput]) * weight;
  }, 0);
  const score = Math.round((weighted / 5) * 100);
  const implementationComplexity = score >= 76 ? "Low" : score >= 52 ? "Moderate" : "High";
  const quickWins = [
    input.knowledgeBaseReadiness >= 3 ? "Launch knowledge-grounded support answer drafts" : "Clean top 50 knowledge articles before first pilot",
    input.supportProcessMaturity >= 3 ? "Automate case triage for the highest-volume support queue" : "Document escalation paths before enabling autonomous actions",
    input.automationMaturity >= 3 ? "Expose approved Flow actions to Agentforce" : "Start with human-in-the-loop recommendations"
  ];
  const riskAreas = [
    input.dataQuality < 3 ? "Customer and case data quality may reduce answer accuracy" : "Monitor data drift after launch",
    input.aiReadiness < 3 ? "Teams need AI literacy and governance enablement before scale" : "Maintain prompt and action review cadence",
    input.crmWorkflowCoverage < 3 ? "Unmapped CRM workflows can create brittle handoffs" : "Validate integrations for every expansion wave"
  ];
  const rolloutStrategy =
    implementationComplexity === "Low"
      ? "Run a 30-day pilot in two queues, then expand by business function with weekly ROI reviews."
      : implementationComplexity === "Moderate"
        ? "Start with a governed support pilot, invest two weeks in knowledge and workflow cleanup, then scale by role."
        : "Use a readiness sprint first: stabilize data, document workflows, train champions, and launch one human-reviewed use case.";

  return { score, implementationComplexity, quickWins, riskAreas, rolloutStrategy };
}

export function getJourney(role: Role) {
  return onboardingJourneys.find((journey) => journey.role === role);
}
