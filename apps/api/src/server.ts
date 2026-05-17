import cors from "cors";
import "dotenv/config";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import { z } from "zod";
import { generateOnboardingPlan, generateUseCases, generateWithOpenAI } from "@agentforce/ai-engine";
import { calculateCreditAnalytics, usageSnapshots } from "@agentforce/analytics";
import { industryTemplates, onboardingJourneys, scoreReadiness } from "@agentforce/checklist-engine";
import { promptTemplates } from "@agentforce/prompt-library";
import { getIntegrationStatuses } from "./lib/integrations.js";

const app = express();
const port = Number(process.env.PORT ?? 4000);

app.use(helmet());
app.use(cors({ origin: process.env.NEXT_PUBLIC_APP_URL ?? true }));
app.use(express.json({ limit: "1mb" }));
app.use(morgan("tiny"));

const readinessSchema = z.object({
  salesforceMaturity: z.number().min(1).max(5),
  supportProcessMaturity: z.number().min(1).max(5),
  aiReadiness: z.number().min(1).max(5),
  dataQuality: z.number().min(1).max(5),
  automationMaturity: z.number().min(1).max(5),
  crmWorkflowCoverage: z.number().min(1).max(5),
  knowledgeBaseReadiness: z.number().min(1).max(5)
});

const useCaseSchema = z.object({
  industry: z.string().min(1),
  segment: z.enum(["SMB", "Mid-Market", "Enterprise"]),
  teamSize: z.number().int().positive(),
  businessFunction: z.string().min(1),
  salesforceProducts: z.array(z.string()).default([])
});

app.get("/health", (_req, res) => {
  res.json({ status: "ok", service: "agentforce-onboarding-hub-api", version: "0.1.0" });
});

app.get("/api/journeys", (_req, res) => {
  res.json({ data: onboardingJourneys });
});

app.get("/api/templates", (_req, res) => {
  res.json({ data: industryTemplates });
});

app.get("/api/prompts", (_req, res) => {
  res.json({ data: promptTemplates });
});

app.get("/api/integrations", (_req, res) => {
  res.json({ data: getIntegrationStatuses() });
});

app.post("/api/readiness", (req, res) => {
  const parsed = readinessSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: "Invalid readiness payload", details: parsed.error.flatten() });
  }

  res.json({ data: scoreReadiness(parsed.data) });
});

app.post("/api/use-cases", (req, res) => {
  const parsed = useCaseSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: "Invalid use-case payload", details: parsed.error.flatten() });
  }

  res.json({ data: generateUseCases(parsed.data) });
});

app.post("/api/ai/onboarding-plan", async (req, res) => {
  const body = z.object({ role: z.string(), readinessScore: z.number().min(0).max(100) }).safeParse(req.body);
  if (!body.success) {
    return res.status(400).json({ error: "Invalid onboarding plan payload", details: body.error.flatten() });
  }

  const deterministicPlan = generateOnboardingPlan(body.data.role, body.data.readinessScore);
  const ai = await generateWithOpenAI(
    `Create an executive-safe Agentforce onboarding plan for ${body.data.role} with readiness score ${body.data.readinessScore}.`,
    process.env.OPENAI_API_KEY
  );
  res.json({ data: { deterministicPlan, ai } });
});

app.post("/api/analytics/credits", (_req, res) => {
  res.json({ data: calculateCreditAnalytics(usageSnapshots) });
});

app.get("/auth/salesforce", (_req, res) => {
  res.json({
    message: "Salesforce OAuth stub",
    nextStep: "Redirect to Salesforce authorization URL when SALESFORCE_CLIENT_ID is configured."
  });
});

app.get("/auth/github", (_req, res) => {
  res.json({
    message: "GitHub OAuth stub",
    nextStep: "Redirect to GitHub authorization URL when GITHUB_CLIENT_ID is configured."
  });
});

app.use((_req, res) => {
  res.status(404).json({ error: "Route not found" });
});

app.listen(port, () => {
  console.log(`Agentforce Onboarding Hub API listening on ${port}`);
});
