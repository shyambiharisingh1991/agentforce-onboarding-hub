import { calculateCreditAnalytics, adoptionTrend, usageSnapshots } from "@agentforce/analytics";
import { industryTemplates, onboardingJourneys, scoreReadiness } from "@agentforce/checklist-engine";
import { promptTemplates } from "@agentforce/prompt-library";

export const demoOrganization = {
  name: "Northstar SaaS",
  segment: "Enterprise",
  industry: "SaaS",
  teamSize: 850,
  salesforceProducts: ["Service Cloud", "Sales Cloud", "Data Cloud"]
};

export const readinessLabels = {
  salesforceMaturity: "Salesforce maturity",
  supportProcessMaturity: "Support process maturity",
  aiReadiness: "AI readiness",
  dataQuality: "Data quality",
  automationMaturity: "Automation maturity",
  crmWorkflowCoverage: "CRM workflow coverage",
  knowledgeBaseReadiness: "Knowledge base readiness"
};

export const hubData = {
  journeys: onboardingJourneys,
  templates: industryTemplates,
  prompts: promptTemplates,
  usage: usageSnapshots,
  adoptionTrend,
  analytics: calculateCreditAnalytics(),
  readiness: scoreReadiness({
    salesforceMaturity: 4,
    supportProcessMaturity: 3,
    aiReadiness: 3,
    dataQuality: 4,
    automationMaturity: 3,
    crmWorkflowCoverage: 3,
    knowledgeBaseReadiness: 3
  }),
  implementationStages: [
    { name: "Discovery", status: "Complete", owner: "Business Analyst", progress: 100 },
    { name: "Sandbox setup", status: "In progress", owner: "Admin", progress: 72 },
    { name: "Governance review", status: "In progress", owner: "AI Governance", progress: 58 },
    { name: "Pilot launch", status: "Next", owner: "Support Ops", progress: 34 },
    { name: "Scale decision", status: "Planned", owner: "Executive Sponsor", progress: 12 }
  ],
  knowledgeTopics: [
    "Agentforce architecture and trust boundaries",
    "Prompt grounding and knowledge source quality",
    "Salesforce sandbox setup guidance",
    "AI security and data handling best practices",
    "Troubleshooting low-confidence answers",
    "Stakeholder communication templates"
  ]
};
