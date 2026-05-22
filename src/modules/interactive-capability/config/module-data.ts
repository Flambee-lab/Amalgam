import type { InteractiveCapabilityModuleConfig, SelectionKey } from "../types";
import {
  mockActiveWhenForCard,
  mockHighlightWhenForCard,
} from "../lib/mock-highlight-keys";
import { defaultCentralHub } from "./orbital-layout";

/** Helpers to build selection keys without string typos */
const sel = (
  primary: "caregivers" | "patients" | "hcps",
  config: "config-a" | "config-b" | "custom"
): SelectionKey => `${primary}:${config}`;

const ALL_PRIMARY = ["caregivers", "patients", "hcps"] as const;
const ALL_CONFIG = ["config-a", "config-b", "custom"] as const;

function allCombinations(): SelectionKey[] {
  return ALL_PRIMARY.flatMap((p) =>
    ALL_CONFIG.map((c) => sel(p, c))
  );
}

/** Left grid — Patient & Caregiver Engagement (from Figma) */
const leftCards = [
  "appointment-scheduling",
  "dr-visit-prep",
  "find-provider",
  "chat-bot",
  "social-experience",
  "personalized-education",
  "learning-library",
  "nurse-chat",
  "medication-adherence",
  "medication-titration",
  "symptom-management",
  "photo-logging",
  "medical-device-integration",
  "journaling",
  "pro-capture",
  "cbt",
  "meditation",
  "care-journey-tasks",
  "consumer-device",
  "coaching-nudging",
  "caregiver-guidance",
  "task-support-education",
  "care-coordination",
  "emotional-wellness",
  "visit-preparation",
  "education-symptom-qa",
  "medication-support",
].map((id, i) => ({
  id,
  label: [
    "Appointment Scheduling",
    "Dr. Visit Prep",
    "Find a Provider",
    "Chat Bot",
    "Social Experience",
    "Personalized Education",
    "Learning Library",
    "Nurse Chat",
    "Medication Adherence",
    "Medication Titration",
    "Symptom Management",
    "Photo Logging",
    "Medical Device Integration",
    "Journaling",
    "PRO Capture",
    "Cognitive Behavioral Therapy",
    "Meditation",
    "Care Journey & Tasks",
    "Consumer Device Integration",
    "Coaching & Nudging",
    "Guidance for Caregiver",
    "Task Support & Education",
    "Care Coordination",
    "Emotional Support & Wellness Check-ins",
    "Visit Preparation (or leave in Mobile)",
    "Education & Symptom Q&A",
    "Medication Support (adherence, titration, reminders)",
  ][i],
  icon: "capability",
  activeWhen: mockActiveWhenForCard(i, "left"),
  highlightWhen: mockHighlightWhenForCard(i, "left"),
}));

/** Right grid — HCP Engagement */
const rightLabels = [
  "Site-Specific CDS Rules",
  "Population Health",
  "Formulary Management",
  "RPM Data",
  "Native EHR Workflows",
  "Prior Authorization",
  "Patient Identification & Targeting",
  "Device, Biomarker & Lab Integrations",
  "One-Click Enrollment (PSP, Specialty Drugs, DTx)",
  "Trial Recruiting & Enrollment",
  "Consumer App Integrations",
  "Diagnostics Support",
  "Silent Mode Analysis",
  "Clinical Summarization",
  "Guideline Lookups",
  "CDS Q&A",
  "Brand-Site Clinical Q&A",
  "Clinical Risk Highlighting (implicit)",
];

/** Placeholders temporales — equilibran ~3 filas vs columna izquierda (27 cards) */
const rightPlaceholderLabels = [
  "Care Pathway Analytics",
  "Referral Management",
  "Treatment Protocol Adherence",
  "Patient Panel Overview",
  "Clinical Alert Routing",
  "Multi-Site Care Coordination",
  "Therapeutic Area Insights",
  "Documentation Assistance",
  "Outcomes Benchmarking",
];

const rightCards = [...rightLabels, ...rightPlaceholderLabels].map((label, i) => ({
  id: `hcp-${i}`,
  label,
  icon: "capability",
  activeWhen: mockActiveWhenForCard(i, "right"),
  highlightWhen: mockHighlightWhenForCard(i, "right"),
}));

export const defaultModuleConfig: InteractiveCapabilityModuleConfig = {
  labels: {
    solutionsFor: "Solutions for",
    marketConfigFor: "with a market configuration for",
  },
  primaryTabs: [
    { id: "caregivers", label: "Caregivers" },
    { id: "patients", label: "Patients" },
    { id: "hcps", label: "HCPs" },
  ],
  configTabs: [
    { id: "config-a", label: "Config A", count: 24 },
    { id: "config-b", label: "Config B", count: 32 },
    { id: "custom", label: "Custom", count: "-" },
  ],
  defaultSelection: { primary: "caregivers", config: "config-a" },
  leftGrid: {
    id: "patient-caregiver",
    title: "Patient & Caregiver Engagement",
    subtitle: "(SMS, e-mail, App, SaMD, PDURS)",
    channelLabel: "Mobile/Web",
    columns: 3,
    cards: leftCards,
  },
  rightGrid: {
    id: "hcp-engagement",
    title: "HCP Engagement",
    subtitle: "(CDS / NBA / PopHealth)",
    channelLabel: "EHR/Mobile/Web",
    columns: 3,
    cards: rightCards,
  },
  centralHub: defaultCentralHub,
};
