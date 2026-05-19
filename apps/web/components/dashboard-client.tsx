"use client";

import {
  Activity,
  BarChart3,
  BookOpen,
  Bot,
  Brain,
  CheckCircle2,
  ClipboardCheck,
  Cpu,
  Database,
  FileText,
  Gauge,
  GitBranch,
  Github,
  LayoutDashboard,
  LockKeyhole,
  Moon,
  Plug,
  Radio,
  Rocket,
  ShieldCheck,
  Sparkles,
  Sun,
  Users,
  Zap
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useMemo, useState } from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";
import { generateUseCases } from "@agentforce/ai-engine";
import { Badge, Button, Card, EmptyState, MetricCard, Progress, SectionHeading, cx } from "@agentforce/ui";
import { scoreReadiness, type ReadinessInput, type Role } from "@agentforce/checklist-engine";
import { demoOrganization, hubData, readinessLabels } from "../lib/demo-data";
import { useHubStore } from "../store/use-hub-store";

const nav = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "journeys", label: "Journeys", icon: Users },
  { id: "readiness", label: "Readiness", icon: Gauge },
  { id: "use-cases", label: "Use cases", icon: Sparkles },
  { id: "credits", label: "Credits", icon: BarChart3 },
  { id: "prompts", label: "Prompts", icon: Bot },
  { id: "accelerator", label: "Accelerator", icon: Rocket },
  { id: "knowledge", label: "Knowledge", icon: BookOpen }
];

const colors = ["#0891b2", "#10b981", "#f59e0b", "#6366f1", "#e11d48"];

const intelligenceSignals = [
  { label: "Grounded answers", value: "96%", detail: "Data Cloud indexed", icon: Database, tone: "success" as const },
  { label: "Agent latency", value: "1.8s", detail: "median response", icon: Zap, tone: "info" as const },
  { label: "Trust controls", value: "On", detail: "PII policy active", icon: LockKeyhole, tone: "success" as const }
];

const commandTelemetry = [
  { label: "Planner", value: "42 workflows", icon: Brain },
  { label: "Retriever", value: "18 sources", icon: Database },
  { label: "Action layer", value: "7 approvals", icon: Plug },
  { label: "Evaluation", value: "92% pass", icon: ShieldCheck }
];

export function DashboardClient({ focus = "overview" }: { focus?: string }) {
  const [active, setActive] = useState(focus);
  const [dark, setDark] = useState(true);
  const {
    selectedRole,
    industry,
    segment,
    businessFunction,
    readiness,
    setSelectedRole,
    setIndustry,
    setSegment,
    setBusinessFunction,
    setReadinessValue
  } = useHubStore();

  const readinessResult = useMemo(() => scoreReadiness(readiness), [readiness]);
  const currentJourney = hubData.journeys.find((journey) => journey.role === selectedRole) ?? hubData.journeys[0];
  const useCases = useMemo(
    () =>
      generateUseCases({
        industry,
        segment,
        teamSize: demoOrganization.teamSize,
        businessFunction,
        salesforceProducts: demoOrganization.salesforceProducts
      }),
    [industry, segment, businessFunction]
  );

  const activeLabel = nav.find((item) => item.id === active)?.label ?? "Overview";

  return (
    <main className={cx("min-h-screen", dark ? "dark bg-[#05070a] text-white" : "bg-[#eef6f8] text-slate-950")}>
      <div className="pointer-events-none fixed inset-0 ai-grid opacity-80" />
      <div
        className={cx(
          "pointer-events-none fixed inset-0",
          dark
            ? "bg-[linear-gradient(135deg,rgba(5,7,10,0.98),rgba(4,26,28,0.94)_48%,rgba(14,18,24,0.98))]"
            : "bg-[linear-gradient(135deg,rgba(255,255,255,0.86),rgba(236,254,255,0.58)_42%,rgba(240,253,250,0.82))]"
        )}
      />
      <div className="relative flex min-h-screen">
        <aside className="sticky top-0 hidden h-screen w-[19rem] overflow-y-auto border-r border-white/70 bg-white/72 px-4 py-5 shadow-[18px_0_70px_-55px_rgba(15,23,42,0.8)] backdrop-blur-xl dark:border-white/10 dark:bg-[#060a0d]/78 lg:block">
          <div className="flex items-center gap-3 px-2">
            <div className="agent-scan flex h-11 w-11 items-center justify-center rounded-lg border border-cyan-300/40 bg-cyan-500 text-white shadow-[0_18px_40px_-24px_rgba(6,182,212,0.95)] dark:bg-cyan-300 dark:text-slate-950">
              <Bot size={23} />
            </div>
            <div>
              <p className="text-sm font-semibold">Agentforce AI</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">Command Center</p>
            </div>
          </div>

          <div className="mt-6 rounded-lg border border-slate-200/80 bg-white/65 p-3 dark:border-white/10 dark:bg-white/[0.045]">
            <div className="flex items-center justify-between gap-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Live rollout</span>
              <span className="flex items-center gap-1.5 text-xs font-medium text-emerald-700 dark:text-emerald-300">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                Active
              </span>
            </div>
            <p className="mt-3 text-sm font-semibold">{demoOrganization.name}</p>
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
              {demoOrganization.segment} / {demoOrganization.industry} / {demoOrganization.teamSize} users
            </p>
          </div>

          <nav className="mt-6 space-y-1">
            {nav.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setActive(item.id)}
                  className={cx(
                    "group flex h-11 w-full items-center gap-3 rounded-md px-3 text-left text-sm font-medium transition",
                    active === item.id
                      ? "border border-cyan-200/70 bg-cyan-50 text-cyan-900 shadow-sm dark:border-cyan-300/20 dark:bg-cyan-300/10 dark:text-cyan-100"
                      : "border border-transparent text-slate-600 hover:bg-white/70 dark:text-slate-300 dark:hover:bg-white/[0.07]"
                  )}
                >
                  <Icon className={active === item.id ? "text-cyan-600 dark:text-cyan-300" : "text-slate-400 group-hover:text-cyan-600 dark:group-hover:text-cyan-300"} size={18} />
                  {item.label}
                </button>
              );
            })}
          </nav>

          <div className="mt-6 rounded-lg border border-slate-200/80 bg-white/65 p-4 dark:border-white/10 dark:bg-white/[0.045]">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Agent fabric</p>
            <div className="mt-4 space-y-3">
              {commandTelemetry.slice(0, 3).map((signal) => {
                const Icon = signal.icon;
                return (
                  <div key={signal.label} className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-md bg-slate-100 text-slate-600 dark:bg-white/[0.07] dark:text-cyan-200">
                      <Icon size={15} />
                    </div>
                    <div>
                      <p className="text-xs font-semibold">{signal.label}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">{signal.value}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </aside>

        <section className="min-w-0 flex-1">
          <header
            className={cx(
              "sticky top-0 z-10 px-4 py-4 backdrop-blur-xl md:px-8",
              dark ? "border-b border-white/10 bg-[#05070a]/95 shadow-[0_18px_65px_-50px_rgba(8,145,178,0.55)]" : "border-b border-white/70 bg-white/70"
            )}
          >
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge tone="info" className="hidden sm:inline-flex">
                    <Radio size={13} className="mr-1.5" />
                    AI telemetry live
                  </Badge>
                  <Badge tone="success" className="hidden sm:inline-flex">Trust layer active</Badge>
                </div>
                <h1 className={cx("mt-2 text-2xl font-semibold tracking-normal md:text-3xl", dark ? "text-white" : "text-slate-950")}>Agentforce Onboarding Hub</h1>
                <p className={cx("text-sm leading-6", dark ? "text-slate-300" : "text-slate-600")}>
                  {activeLabel} for adoption, readiness, grounded agents, credits, and implementation decisions.
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <Button variant="secondary" onClick={() => setDark(!dark)} aria-label="Toggle dark mode">
                  {dark ? <Sun size={16} /> : <Moon size={16} />}
                </Button>
                <Button variant="secondary" className="hidden sm:inline-flex"><Github size={16} /> GitHub OAuth</Button>
                <Button><Plug size={16} /> Salesforce OAuth</Button>
              </div>
            </div>
            <div className="mt-4 flex gap-2 overflow-x-auto pb-1 lg:hidden">
              {nav.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActive(item.id)}
                  className={cx(
                    "whitespace-nowrap rounded-md border px-3 py-2 text-sm font-medium",
                    active === item.id
                      ? "border-cyan-200 bg-cyan-600 text-white dark:border-cyan-300/30 dark:bg-cyan-300 dark:text-slate-950"
                      : "border-slate-200 bg-white/75 text-slate-700 dark:border-white/10 dark:bg-white/[0.06] dark:text-slate-200"
                  )}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </header>

          <div className="mx-auto max-w-[1500px] space-y-8 px-4 py-6 md:px-8">
            {active === "overview" && <Overview readinessScore={readinessResult.score} active={active} />}
            {active === "journeys" && (
              <Journeys selectedRole={selectedRole} setSelectedRole={setSelectedRole} currentJourney={currentJourney} readinessScore={readinessResult.score} />
            )}
            {active === "readiness" && (
              <Readiness readiness={readiness} setReadinessValue={setReadinessValue} readinessResult={readinessResult} />
            )}
            {active === "use-cases" && (
              <UseCases industry={industry} segment={segment} businessFunction={businessFunction} setIndustry={setIndustry} setSegment={setSegment} setBusinessFunction={setBusinessFunction} useCases={useCases} />
            )}
            {active === "credits" && <Credits />}
            {active === "prompts" && <Prompts />}
            {active === "accelerator" && <Accelerator />}
            {active === "knowledge" && <KnowledgeHub />}
          </div>
        </section>
      </div>
    </main>
  );
}

function Overview({ readinessScore, active }: { readinessScore: number; active: string }) {
  if (active !== "overview") return null;

  return (
    <div className="space-y-8">
      <section className="grid gap-5 2xl:grid-cols-[1.25fr_0.75fr]">
        <Card className="agent-scan overflow-hidden border-cyan-200/70 bg-[linear-gradient(135deg,rgba(255,255,255,0.96),rgba(236,254,255,0.82),rgba(240,253,250,0.94))] p-0 dark:border-cyan-300/20 dark:bg-[linear-gradient(135deg,rgba(5,15,18,0.96),rgba(6,33,36,0.84),rgba(9,13,20,0.96))]">
          <div className="grid gap-7 p-6 xl:grid-cols-[minmax(0,1fr)_320px] lg:p-7">
            <div className="flex min-w-0 flex-col justify-between gap-8">
              <div>
                <Badge tone="info">
                  <Cpu size={13} className="mr-1.5" />
                  Agent intelligence layer
                </Badge>
                <h2 className="mt-5 max-w-3xl text-3xl font-semibold leading-tight tracking-normal text-slate-950 dark:text-white md:text-4xl">
                  AI rollout cockpit for guided Agentforce adoption.
                </h2>
                <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-300 md:text-base">
                  Monitor grounded agents, trust controls, team journeys, credit pressure, and rollout risk from one implementation command surface.
                </p>
              </div>
              <div className="grid gap-3 sm:grid-cols-3">
                {intelligenceSignals.map((signal) => (
                  <SignalCard key={signal.label} {...signal} />
                ))}
              </div>
            </div>
            <AgentNetworkPanel readinessScore={readinessScore} />
          </div>
        </Card>
        <Card className="flex flex-col justify-between border-emerald-200/70 bg-emerald-50/70 dark:border-emerald-300/15 dark:bg-emerald-300/[0.055]">
          <div>
            <div className="flex items-center justify-between gap-3">
              <Badge tone="success">Executive ready</Badge>
              <Activity className="text-emerald-600 dark:text-emerald-300" size={20} />
            </div>
            <h3 className="mt-5 text-2xl font-semibold tracking-normal">Rollout signal is healthy.</h3>
            <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
              Sponsor decisions, sandbox work, governance, and pilot preparation are moving together with a moderate readiness profile.
            </p>
          </div>
          <div className="mt-6 space-y-3">
            {["Pilot scope approved", "Support quick wins identified", "Governance review in progress", "Credit optimization available"].map((item) => (
              <div key={item} className="flex items-center gap-3 rounded-md border border-white/70 bg-white/70 p-3 dark:border-white/10 dark:bg-white/[0.055]">
                <CheckCircle2 className="shrink-0 text-emerald-500" size={18} />
                <span className="text-sm">{item}</span>
              </div>
            ))}
          </div>
        </Card>
      </section>
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <MetricCard label="Readiness score" value={`${readinessScore}%`} detail="Moderate" tone="info" />
        <MetricCard label="Onboarding completion" value="78%" detail="+11%" tone="success" />
        <MetricCard label="Projected monthly cost" value={`$${hubData.analytics.projectedMonthlyCost.toLocaleString()}`} detail="Optimized" tone="warning" />
        <MetricCard label="ROI indicator" value={`${hubData.analytics.roiMultiple}x`} detail="Labor value" tone="success" />
      </section>
      <section className="grid gap-5 xl:grid-cols-[1.35fr_0.65fr]">
        <Card>
          <SectionHeading title="Adoption and usage trend" description="Track enablement completion against Agentforce usage growth across the rollout." />
          <div className="mt-6 h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={hubData.adoptionTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(148, 163, 184, 0.24)" />
                <XAxis dataKey="month" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip
                  contentStyle={{ backgroundColor: "#071014", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 8, color: "#e2e8f0" }}
                  labelStyle={{ color: "#f8fafc" }}
                />
                <Area type="monotone" dataKey="activeUsers" name="Active users" stroke="#06b6d4" fill="rgba(6, 182, 212, 0.18)" />
                <Area type="monotone" dataKey="completion" name="Completion %" stroke="#10b981" fill="rgba(16, 185, 129, 0.16)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>
        <Card>
          <SectionHeading title="AI system health" description="Realtime readiness for the orchestration layer." />
          <div className="mt-6 space-y-4">
            {commandTelemetry.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.label} className="flex items-center justify-between gap-3 rounded-md border border-slate-200/70 bg-slate-50/70 p-3 dark:border-white/10 dark:bg-white/[0.045]">
                  <div className="flex items-center gap-3">
                    <Icon className="text-cyan-600 dark:text-cyan-300" size={18} />
                    <span className="text-sm">{item.label}</span>
                  </div>
                  <span className="text-sm font-semibold">{item.value}</span>
                </div>
              );
            })}
          </div>
        </Card>
      </section>
      <section className="grid gap-5 xl:grid-cols-3">
        {hubData.implementationStages.map((stage) => (
          <Card key={stage.name}>
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-semibold">{stage.name}</p>
                <p className="text-sm text-slate-500 dark:text-slate-400">{stage.owner}</p>
              </div>
              <Badge tone={stage.status === "Complete" ? "success" : stage.status === "In progress" ? "info" : "default"}>{stage.status}</Badge>
            </div>
            <Progress className="mt-5" value={stage.progress} label="Implementation progress" />
          </Card>
        ))}
      </section>
    </div>
  );
}

function SignalCard({
  label,
  value,
  detail,
  icon: Icon,
  tone
}: {
  label: string;
  value: string;
  detail: string;
  icon: LucideIcon;
  tone: "default" | "success" | "warning" | "danger" | "info";
}) {
  return (
    <div className="rounded-lg border border-slate-200/80 bg-white/72 p-4 dark:border-white/10 dark:bg-white/[0.055]">
      <div className="flex items-center justify-between gap-3">
        <Icon className="text-cyan-600 dark:text-cyan-300" size={18} />
        <Badge tone={tone}>{detail}</Badge>
      </div>
      <p className="mt-5 text-2xl font-semibold tracking-normal">{value}</p>
      <p className="mt-1 text-xs font-medium text-slate-500 dark:text-slate-400">{label}</p>
    </div>
  );
}

function AgentNetworkPanel({ readinessScore }: { readinessScore: number }) {
  return (
    <div className="ai-grid rounded-lg border border-cyan-200/70 bg-slate-950 p-4 text-white shadow-[inset_0_0_0_1px_rgba(255,255,255,0.04)] dark:border-cyan-300/20">
      <div className="rounded-md border border-white/10 bg-white/[0.04] p-4">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-cyan-200">Agent core</p>
            <p className="mt-1 text-lg font-semibold">Autonomous onboarding copilot</p>
          </div>
          <div className="flex h-[3.25rem] w-[3.25rem] items-center justify-center rounded-lg bg-cyan-300 text-slate-950">
            <Bot size={26} />
          </div>
        </div>
        <div className="mt-5 grid gap-3">
          {commandTelemetry.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.label} className="flex items-center justify-between gap-3 rounded-md border border-white/10 bg-white/[0.055] px-3 py-2">
                <div className="flex items-center gap-3">
                  <Icon className="text-cyan-200" size={16} />
                  <span className="text-sm text-slate-200">{item.label}</span>
                </div>
                <span className="text-sm font-semibold">{item.value}</span>
              </div>
            );
          })}
        </div>
        <div className="mt-5 rounded-md border border-emerald-300/20 bg-emerald-300/10 p-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-emerald-100">Readiness confidence</span>
            <span className="font-semibold text-white">{readinessScore}%</span>
          </div>
          <Progress className="mt-3" value={readinessScore} />
        </div>
      </div>
    </div>
  );
}

function Journeys({
  selectedRole,
  setSelectedRole,
  currentJourney,
  readinessScore
}: {
  selectedRole: Role;
  setSelectedRole: (role: Role) => void;
  currentJourney: (typeof hubData.journeys)[number];
  readinessScore: number;
}) {
  return (
    <div className="space-y-6">
      <SectionHeading title="Role-based onboarding journeys" description="Each role gets checklists, learning roadmaps, implementation milestones, recommended use cases, readiness guidance, and certification tracking." />
      <div className="grid gap-5 xl:grid-cols-[0.8fr_1.2fr]">
        <Card>
          <div className="grid gap-2">
            {hubData.journeys.map((journey) => (
              <button
                key={journey.role}
                onClick={() => setSelectedRole(journey.role)}
                className={cx(
                  "rounded-md border p-3 text-left transition",
                  selectedRole === journey.role
                    ? "border-cyan-300 bg-cyan-50 dark:border-cyan-300/20 dark:bg-cyan-300/10"
                    : "border-slate-200 hover:bg-slate-50 dark:border-white/10 dark:hover:bg-white/[0.06]"
                )}
              >
                <p className="font-medium">{journey.role}</p>
                <p className="text-sm text-slate-500 dark:text-slate-400">{journey.durationWeeks} weeks • {journey.useCases[0]}</p>
              </button>
            ))}
          </div>
        </Card>
        <Card>
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <Badge tone="info">{readinessScore}% readiness</Badge>
              <h3 className="mt-3 text-xl font-semibold">{currentJourney.role}</h3>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Estimated onboarding duration: {currentJourney.durationWeeks} weeks</p>
            </div>
            <Button><FileText size={16} /> Export plan</Button>
          </div>
          <div className="mt-6 grid gap-5 md:grid-cols-2">
            <Checklist title="Checklist" items={currentJourney.checklist} />
            <Checklist title="Roadmap" items={currentJourney.roadmap} />
            <Checklist title="Milestones" items={currentJourney.milestones} />
            <Checklist title="Training" items={currentJourney.certifications} />
          </div>
        </Card>
      </div>
    </div>
  );
}

function Readiness({
  readiness,
  setReadinessValue,
  readinessResult
}: {
  readiness: ReadinessInput;
  setReadinessValue: (key: keyof ReadinessInput, value: number) => void;
  readinessResult: ReturnType<typeof scoreReadiness>;
}) {
  return (
    <div className="space-y-6">
      <SectionHeading title="Agentforce readiness assessment" description="Evaluate Salesforce maturity, AI readiness, data quality, automation coverage, CRM workflows, and knowledge readiness." />
      <div className="grid gap-5 xl:grid-cols-[0.9fr_1.1fr]">
        <Card>
          <div className="space-y-5">
            {(Object.keys(readinessLabels) as Array<keyof ReadinessInput>).map((key) => (
              <label key={key} className="block">
                <div className="flex justify-between text-sm">
                  <span>{readinessLabels[key]}</span>
                  <span className="font-semibold">{readiness[key]}/5</span>
                </div>
                <input
                  className="mt-2 w-full accent-cyan-500"
                  type="range"
                  min="1"
                  max="5"
                  value={readiness[key]}
                  onChange={(event) => setReadinessValue(key, Number(event.target.value))}
                />
              </label>
            ))}
          </div>
        </Card>
        <Card>
          <div className="grid gap-5 md:grid-cols-[0.45fr_0.55fr]">
            <div className="flex flex-col items-center justify-center rounded-lg border border-slate-200/70 bg-slate-50/80 p-6 dark:border-white/10 dark:bg-white/[0.045]">
              <div className="flex h-36 w-36 items-center justify-center rounded-full border-[12px] border-cyan-500 text-4xl font-semibold">
                {readinessResult.score}
              </div>
              <Badge className="mt-4" tone={readinessResult.implementationComplexity === "High" ? "danger" : "info"}>
                {readinessResult.implementationComplexity} complexity
              </Badge>
            </div>
            <div className="space-y-5">
              <Checklist title="Quick wins" items={readinessResult.quickWins} />
              <Checklist title="Risk areas" items={readinessResult.riskAreas} danger />
              <div className="rounded-md border border-cyan-200/80 bg-cyan-50/80 p-4 text-sm text-cyan-900 dark:border-cyan-300/20 dark:bg-cyan-300/10 dark:text-cyan-100">
                {readinessResult.rolloutStrategy}
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

function UseCases({
  industry,
  segment,
  businessFunction,
  setIndustry,
  setSegment,
  setBusinessFunction,
  useCases
}: {
  industry: string;
  segment: "SMB" | "Mid-Market" | "Enterprise";
  businessFunction: string;
  setIndustry: (value: string) => void;
  setSegment: (value: "SMB" | "Mid-Market" | "Enterprise") => void;
  setBusinessFunction: (value: string) => void;
  useCases: ReturnType<typeof generateUseCases>;
}) {
  return (
    <div className="space-y-6">
      <SectionHeading title="AI use case generator" description="Generate adoption-ready Agentforce recommendations by industry, segment, team size, business function, and Salesforce products." />
      <Card>
        <div className="grid gap-4 md:grid-cols-3">
          <Select label="Industry" value={industry} onChange={setIndustry} options={["SaaS", "Retail", "Healthcare", "Financial Services", "Manufacturing", "Customer Support Organizations", "SMB Service Teams"]} />
          <Select label="Segment" value={segment} onChange={(value) => setSegment(value as "SMB" | "Mid-Market" | "Enterprise")} options={["SMB", "Mid-Market", "Enterprise"]} />
          <Select label="Function" value={businessFunction} onChange={setBusinessFunction} options={["Customer Support", "Sales", "Customer Success", "Operations"]} />
        </div>
      </Card>
      <div className="grid gap-5 xl:grid-cols-2">
        {useCases.map((useCase) => (
          <Card key={useCase.title}>
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <Badge tone={useCase.effort === "Low" ? "success" : useCase.effort === "High" ? "warning" : "info"}>{useCase.effort} effort</Badge>
                <h3 className="mt-3 text-lg font-semibold">{useCase.title}</h3>
              </div>
              <Sparkles className="text-cyan-600 dark:text-cyan-300" size={22} />
            </div>
            <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">{useCase.businessValue}</p>
            <p className="mt-3 text-sm">{useCase.workflow}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {useCase.requiredProducts.map((product) => <Badge key={product}>{product}</Badge>)}
            </div>
            <Checklist className="mt-4" title="Guardrails" items={useCase.guardrails} />
          </Card>
        ))}
      </div>
    </div>
  );
}

function Credits() {
  const analytics = hubData.analytics;
  return (
    <div className="space-y-6">
      <SectionHeading title="Credit consumption dashboard" description="Estimate Agentforce credit usage, team-wise consumption, projected cost, high-consumption workflows, and optimization actions." />
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <MetricCard label="Monthly credits" value={analytics.totalCredits.toLocaleString()} detail="Current" tone="info" />
        <MetricCard label="Projected cost" value={`$${analytics.projectedMonthlyCost.toLocaleString()}`} detail="Monthly" tone="warning" />
        <MetricCard label="Hours saved" value={analytics.hoursSaved.toLocaleString()} detail="Tracked" tone="success" />
        <MetricCard label="ROI multiple" value={`${analytics.roiMultiple}x`} detail="Estimated" tone="success" />
      </section>
      <div className="grid gap-5 xl:grid-cols-[1fr_0.8fr]">
        <Card>
          <SectionHeading title="Team-wise usage" />
          <div className="mt-6 h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={analytics.teamUsage}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(148, 163, 184, 0.24)" />
                <XAxis dataKey="team" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip
                  contentStyle={{ backgroundColor: "#071014", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 8, color: "#e2e8f0" }}
                  labelStyle={{ color: "#f8fafc" }}
                />
                <Bar dataKey="credits" fill="#06b6d4" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
        <Card>
          <SectionHeading title="Workflow concentration" />
          <div className="mt-6 h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={analytics.highConsumptionWorkflows} dataKey="credits" nameKey="workflow" innerRadius={55} outerRadius={95}>
                  {analytics.highConsumptionWorkflows.map((entry, index) => <Cell key={entry.workflow} fill={colors[index % colors.length]} />)}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: "#071014", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 8, color: "#e2e8f0" }}
                  labelStyle={{ color: "#f8fafc" }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <Checklist title="Optimization recommendations" items={analytics.optimizationRecommendations} />
        </Card>
      </div>
    </div>
  );
}

function Prompts() {
  return (
    <div className="space-y-6">
      <SectionHeading title="Prompt library" description="Reusable, rated prompt templates for support, sales, onboarding, service operations, business analysis, escalations, and customer communications." />
      <div className="grid gap-5 xl:grid-cols-3">
        {hubData.prompts.map((prompt) => (
          <Card key={prompt.id}>
            <div className="flex items-start justify-between gap-3">
              <Badge tone="info">{prompt.category}</Badge>
              <Badge tone="success">{prompt.rating.toFixed(1)} rating</Badge>
            </div>
            <h3 className="mt-4 font-semibold">{prompt.title}</h3>
            <p className="mt-3 rounded-md border border-slate-200/70 bg-slate-50/80 p-3 text-sm leading-6 text-slate-700 dark:border-white/10 dark:bg-white/[0.045] dark:text-slate-200">{prompt.template}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {prompt.variables.map((variable) => <Badge key={variable}>{`{{${variable}}}`}</Badge>)}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

function Accelerator() {
  return (
    <div className="space-y-6">
      <SectionHeading title="Implementation accelerator" description="Deployment stages, sandbox guidance, governance recommendations, AI security practices, stakeholder templates, and rollout planning tools." />
      <div className="grid gap-5 xl:grid-cols-2">
        {hubData.implementationStages.map((stage) => (
          <Card key={stage.name}>
            <div className="flex items-start gap-3">
              <div className="mt-1 rounded-md border border-cyan-200/80 bg-cyan-50/80 p-2 text-cyan-700 dark:border-cyan-300/20 dark:bg-cyan-300/10 dark:text-cyan-200">
                <GitBranch size={18} />
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-semibold">{stage.name}</h3>
                  <Badge>{stage.owner}</Badge>
                </div>
                <Progress className="mt-4" value={stage.progress} label={stage.status} />
              </div>
            </div>
          </Card>
        ))}
        <Card>
          <SectionHeading title="Governance checklist" />
          <Checklist
            className="mt-5"
            title="Security and trust"
            items={["Prompt approval workflow", "Action audit logs", "PII handling policy", "Low-confidence escalation", "Credit budget review"]}
          />
        </Card>
      </div>
    </div>
  );
}

function KnowledgeHub() {
  return (
    <div className="space-y-6">
      <SectionHeading title="Knowledge hub and industry templates" description="Concepts, architecture explanations, best practices, FAQs, troubleshooting guides, sample workflows, and reusable industry templates." />
      <div className="grid gap-5 xl:grid-cols-[0.8fr_1.2fr]">
        <Card>
          <Checklist title="Knowledge topics" items={hubData.knowledgeTopics} />
        </Card>
        <div className="grid gap-5">
          {hubData.templates.map((template) => (
            <Card key={`${template.industry}-${template.segment}`}>
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h3 className="font-semibold">{template.industry}</h3>
                  <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{template.overview}</p>
                </div>
                <Badge tone="info">{template.segment}</Badge>
              </div>
              <div className="mt-4 grid gap-4 md:grid-cols-2">
                <Checklist title="Rollout stages" items={template.rolloutStages} />
                <Checklist title="Success metrics" items={template.successMetrics} />
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

function Checklist({ title, items, danger, className }: { title: string; items: string[]; danger?: boolean; className?: string }) {
  if (!items.length) {
    return <EmptyState title={title} body="No items have been added yet." />;
  }

  return (
    <div className={className}>
      <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">{title}</p>
      <ul className="mt-3 space-y-2">
        {items.map((item) => (
          <li key={item} className="flex gap-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
            {danger ? <ShieldCheck className="mt-1 shrink-0 text-amber-500" size={15} /> : <ClipboardCheck className="mt-1 shrink-0 text-emerald-500" size={15} />}
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Select({
  label,
  value,
  options,
  onChange
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
}) {
  return (
    <label className="block text-sm">
      <span className="font-medium text-slate-700 dark:text-slate-200">{label}</span>
      <select
        className="mt-2 h-10 w-full rounded-md border border-slate-200 bg-white/85 px-3 text-sm outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 dark:border-white/10 dark:bg-white/[0.06]"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      >
        {options.map((option) => <option key={option}>{option}</option>)}
      </select>
    </label>
  );
}
