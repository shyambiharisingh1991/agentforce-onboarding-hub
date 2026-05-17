"use client";

import {
  Activity,
  BarChart3,
  BookOpen,
  Bot,
  Brain,
  CheckCircle2,
  ClipboardCheck,
  FileText,
  Gauge,
  GitBranch,
  Github,
  LayoutDashboard,
  Moon,
  Plug,
  Rocket,
  ShieldCheck,
  Sparkles,
  Sun,
  Users
} from "lucide-react";
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

export function DashboardClient({ focus = "overview" }: { focus?: string }) {
  const [active, setActive] = useState(focus);
  const [dark, setDark] = useState(false);
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

  return (
    <main className={cx(dark && "dark", "min-h-screen bg-slate-50 text-slate-950 dark:bg-slate-950 dark:text-white")}>
      <div className="flex min-h-screen">
        <aside className="sticky top-0 hidden h-screen w-72 border-r border-slate-200 bg-white px-4 py-5 dark:border-slate-800 dark:bg-slate-950 lg:block">
          <div className="flex items-center gap-3 px-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-600 text-white">
              <Bot size={22} />
            </div>
            <div>
              <p className="text-sm font-semibold">Agentforce</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">Onboarding Hub</p>
            </div>
          </div>
          <nav className="mt-8 space-y-1">
            {nav.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setActive(item.id)}
                  className={cx(
                    "flex h-10 w-full items-center gap-3 rounded-md px-3 text-left text-sm font-medium transition",
                    active === item.id
                      ? "bg-cyan-50 text-cyan-800 dark:bg-cyan-950 dark:text-cyan-200"
                      : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-900"
                  )}
                >
                  <Icon size={18} />
                  {item.label}
                </button>
              );
            })}
          </nav>
          <div className="mt-8 rounded-lg border border-slate-200 p-4 dark:border-slate-800">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Connected org</p>
            <p className="mt-2 text-sm font-semibold">{demoOrganization.name}</p>
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{demoOrganization.segment} • {demoOrganization.industry}</p>
          </div>
        </aside>

        <section className="flex-1">
          <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/90 px-4 py-4 backdrop-blur dark:border-slate-800 dark:bg-slate-950/90 md:px-8">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h1 className="text-2xl font-semibold tracking-normal">Agentforce Onboarding Hub</h1>
                <p className="text-sm text-slate-600 dark:text-slate-300">Adoption, readiness, AI usage, and ROI visibility for implementation teams.</p>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="secondary" onClick={() => setDark(!dark)} aria-label="Toggle dark mode">
                  {dark ? <Sun size={16} /> : <Moon size={16} />}
                </Button>
                <Button variant="secondary"><Github size={16} /> GitHub OAuth</Button>
                <Button><Plug size={16} /> Salesforce OAuth</Button>
              </div>
            </div>
            <div className="mt-4 flex gap-2 overflow-x-auto pb-1 lg:hidden">
              {nav.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActive(item.id)}
                  className={cx(
                    "whitespace-nowrap rounded-md px-3 py-2 text-sm font-medium",
                    active === item.id ? "bg-cyan-600 text-white" : "bg-slate-100 text-slate-700 dark:bg-slate-900 dark:text-slate-200"
                  )}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </header>

          <div className="space-y-8 px-4 py-6 md:px-8">
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
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="month" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip />
                <Area type="monotone" dataKey="activeUsers" name="Active users" stroke="#0891b2" fill="#cffafe" />
                <Area type="monotone" dataKey="completion" name="Completion %" stroke="#10b981" fill="#d1fae5" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>
        <Card>
          <SectionHeading title="Executive snapshot" description="A concise readout for steering committees and sponsors." />
          <div className="mt-6 space-y-4">
            {["Pilot scope approved", "Support quick wins identified", "Governance review in progress", "Credit optimization available"].map((item) => (
              <div key={item} className="flex items-center gap-3 rounded-md bg-slate-50 p-3 dark:bg-slate-900">
                <CheckCircle2 className="text-emerald-500" size={18} />
                <span className="text-sm">{item}</span>
              </div>
            ))}
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
                    ? "border-cyan-300 bg-cyan-50 dark:border-cyan-800 dark:bg-cyan-950"
                    : "border-slate-200 hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-900"
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
                  className="mt-2 w-full accent-cyan-600"
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
            <div className="flex flex-col items-center justify-center rounded-lg bg-slate-50 p-6 dark:bg-slate-900">
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
              <div className="rounded-md bg-cyan-50 p-4 text-sm text-cyan-900 dark:bg-cyan-950 dark:text-cyan-100">
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
              <Sparkles className="text-cyan-600" size={22} />
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
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="team" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip />
                <Bar dataKey="credits" fill="#0891b2" radius={[4, 4, 0, 0]} />
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
                <Tooltip />
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
            <p className="mt-3 rounded-md bg-slate-50 p-3 text-sm leading-6 text-slate-700 dark:bg-slate-900 dark:text-slate-200">{prompt.template}</p>
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
              <div className="mt-1 rounded-md bg-cyan-50 p-2 text-cyan-700 dark:bg-cyan-950 dark:text-cyan-200">
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
        className="mt-2 h-10 w-full rounded-md border border-slate-200 bg-white px-3 text-sm dark:border-slate-800 dark:bg-slate-950"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      >
        {options.map((option) => <option key={option}>{option}</option>)}
      </select>
    </label>
  );
}
