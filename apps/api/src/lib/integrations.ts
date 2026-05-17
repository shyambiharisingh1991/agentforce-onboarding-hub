export type IntegrationStatus = {
  name: "Salesforce" | "Slack" | "Jira" | "GitHub";
  configured: boolean;
  capability: string;
};

export function getIntegrationStatuses(): IntegrationStatus[] {
  return [
    {
      name: "Salesforce",
      configured: Boolean(process.env.SALESFORCE_CLIENT_ID && process.env.SALESFORCE_CLIENT_SECRET),
      capability: "OAuth connection, org metadata discovery, and implementation telemetry ingestion"
    },
    {
      name: "Slack",
      configured: Boolean(process.env.SLACK_BOT_TOKEN),
      capability: "Onboarding reminders, adoption nudges, and weekly readiness summaries"
    },
    {
      name: "Jira",
      configured: Boolean(process.env.JIRA_BASE_URL && process.env.JIRA_API_TOKEN),
      capability: "Implementation backlog synchronization and milestone tracking"
    },
    {
      name: "GitHub",
      configured: Boolean(process.env.GITHUB_CLIENT_ID && process.env.GITHUB_CLIENT_SECRET),
      capability: "OAuth login for implementation teams and open-source contributors"
    }
  ];
}
