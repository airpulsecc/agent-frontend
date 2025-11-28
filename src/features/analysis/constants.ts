import type { AnalysisStep } from "./types";

export const ANALYSIS_STEPS: AnalysisStep[] = [
  { id: "getting-top-markets", label: "Finding Top Markets" },
  { id: "creating-prompt", label: "Creating Analysis Prompt" },
  { id: "analyzing-sentiment", label: "Analyzing Sentiment" },
  { id: "structuring-response", label: "Structuring Response" },
  { id: "completed", label: "Analysis Completed" },
] as const;
