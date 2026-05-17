export type UsageSnapshot = {
  team: string;
  workflow: string;
  prompts: number;
  credits: number;
  estimatedCost: number;
  hoursSaved: number;
};

export type CreditAnalytics = {
  totalCredits: number;
  projectedMonthlyCost: number;
  hoursSaved: number;
  roiMultiple: number;
  highConsumptionWorkflows: UsageSnapshot[];
  optimizationRecommendations: string[];
  teamUsage: Array<{ team: string; credits: number; prompts: number }>;
};

export const usageSnapshots: UsageSnapshot[] = [
  { team: "Support", workflow: "Case triage", prompts: 18420, credits: 132800, estimatedCost: 3187, hoursSaved: 620 },
  { team: "Support", workflow: "Reply drafting", prompts: 12100, credits: 86400, estimatedCost: 2074, hoursSaved: 410 },
  { team: "Sales", workflow: "Opportunity coaching", prompts: 5400, credits: 35100, estimatedCost: 842, hoursSaved: 118 },
  { team: "Operations", workflow: "Knowledge gaps", prompts: 3900, credits: 24800, estimatedCost: 595, hoursSaved: 95 },
  { team: "Customer Success", workflow: "Renewal risk summary", prompts: 4600, credits: 31400, estimatedCost: 754, hoursSaved: 130 }
];

export const adoptionTrend = [
  { month: "Jan", activeUsers: 44, completion: 22, credits: 18600 },
  { month: "Feb", activeUsers: 72, completion: 38, credits: 41200 },
  { month: "Mar", activeUsers: 126, completion: 54, credits: 78900 },
  { month: "Apr", activeUsers: 184, completion: 67, credits: 126400 },
  { month: "May", activeUsers: 241, completion: 78, credits: 189600 },
  { month: "Jun", activeUsers: 318, completion: 86, credits: 242300 }
];

export function calculateCreditAnalytics(snapshots: UsageSnapshot[] = usageSnapshots): CreditAnalytics {
  const totalCredits = snapshots.reduce((sum, row) => sum + row.credits, 0);
  const projectedMonthlyCost = Math.round(snapshots.reduce((sum, row) => sum + row.estimatedCost, 0) * 1.18);
  const hoursSaved = Math.round(snapshots.reduce((sum, row) => sum + row.hoursSaved, 0));
  const laborValue = hoursSaved * 72;
  const roiMultiple = Number((laborValue / Math.max(projectedMonthlyCost, 1)).toFixed(1));
  const highConsumptionWorkflows = [...snapshots].sort((a, b) => b.credits - a.credits).slice(0, 3);
  const teamMap = new Map<string, { team: string; credits: number; prompts: number }>();
  for (const row of snapshots) {
    const current = teamMap.get(row.team) ?? { team: row.team, credits: 0, prompts: 0 };
    current.credits += row.credits;
    current.prompts += row.prompts;
    teamMap.set(row.team, current);
  }

  return {
    totalCredits,
    projectedMonthlyCost,
    hoursSaved,
    roiMultiple,
    highConsumptionWorkflows,
    teamUsage: Array.from(teamMap.values()),
    optimizationRecommendations: [
      "Cache repeat knowledge lookups for high-volume case triage prompts.",
      "Add prompt length budgets to reply drafting workflows.",
      "Review workflows over 30,000 monthly credits for routing or grounding improvements."
    ]
  };
}

export function calculateAdoptionRate(activeUsers: number, invitedUsers: number) {
  return Math.round((activeUsers / Math.max(invitedUsers, 1)) * 100);
}
