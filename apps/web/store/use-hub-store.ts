"use client";

import { create } from "zustand";
import type { ReadinessInput, Role } from "@agentforce/checklist-engine";

type HubState = {
  selectedRole: Role;
  industry: string;
  segment: "SMB" | "Mid-Market" | "Enterprise";
  businessFunction: string;
  readiness: ReadinessInput;
  setSelectedRole: (role: Role) => void;
  setIndustry: (industry: string) => void;
  setSegment: (segment: HubState["segment"]) => void;
  setBusinessFunction: (businessFunction: string) => void;
  setReadinessValue: (key: keyof ReadinessInput, value: number) => void;
};

export const useHubStore = create<HubState>((set) => ({
  selectedRole: "Admin",
  industry: "SaaS",
  segment: "Enterprise",
  businessFunction: "Customer Support",
  readiness: {
    salesforceMaturity: 4,
    supportProcessMaturity: 3,
    aiReadiness: 3,
    dataQuality: 4,
    automationMaturity: 3,
    crmWorkflowCoverage: 3,
    knowledgeBaseReadiness: 3
  },
  setSelectedRole: (selectedRole) => set({ selectedRole }),
  setIndustry: (industry) => set({ industry }),
  setSegment: (segment) => set({ segment }),
  setBusinessFunction: (businessFunction) => set({ businessFunction }),
  setReadinessValue: (key, value) =>
    set((state) => ({
      readiness: { ...state.readiness, [key]: value }
    }))
}));
