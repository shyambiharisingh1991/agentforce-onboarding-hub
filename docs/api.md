# API Reference

Base URL: `http://localhost:4000`

## Health

`GET /health`

Returns API status and version.

## Journeys

`GET /api/journeys`

Returns role-based onboarding journeys with checklists, milestones, recommended use cases, and estimated duration.

## Readiness

`POST /api/readiness`

Scores an organization profile.

```json
{
  "salesforceMaturity": 4,
  "supportProcessMaturity": 3,
  "aiReadiness": 3,
  "dataQuality": 4,
  "automationMaturity": 2,
  "crmWorkflowCoverage": 3,
  "knowledgeBaseReadiness": 2
}
```

## Use Cases

`POST /api/use-cases`

Generates recommended Agentforce use cases.

```json
{
  "industry": "SaaS",
  "segment": "Enterprise",
  "teamSize": 750,
  "businessFunction": "Customer Support",
  "salesforceProducts": ["Service Cloud", "Data Cloud"]
}
```

## Analytics

`POST /api/analytics/credits`

Estimates credit consumption, cost, ROI indicators, and optimization opportunities.

## Prompt Library

`GET /api/prompts`

Returns curated prompt templates, categories, ratings, and usage examples.
