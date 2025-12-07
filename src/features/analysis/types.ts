import type { UIMessage } from "@ai-sdk/react";

export type AnalysisStatus =
  | "getting-top-markets"
  | "creating-prompt"
  | "analyzing-sentiment"
  | "structuring-response"
  | "error"
  | "completed";

export type AnalysisStep = {
  id: AnalysisStatus;
  label: string;
};

export type Tweet = {
  nickname?: string;
  text?: string;
};

export type VoicesSentiment = {
  sentimentOpinion?: string;
  tweets?: Tweet[];
};

export type MarketPrediction = {
  marketTitle?: string;
  winChance?: number;
  reasoning?: string;
};

export type AnalysisResult = {
  topVoices?: VoicesSentiment;
  crowdVoices?: VoicesSentiment;
  predictions?: MarketPrediction[];
};

export interface PricePoint {
  t: number;
  p: number;
}


export type TopMarket = {
  title?: string;
  image?: string;
  volume?: string;
  winChance?: number;
  priceHistory?: PricePoint[];
};

export type BetInfo = {
  title?: string;
  description?: string;
  image?: string;
  startDate?: string;
  endDate?: string;
  volume?: string;
};

export type ResearchAgentData = {
  status: AnalysisStatus;
  content: string;
  topMarkets?: TopMarket[];
  result?: AnalysisResult;
  betInfo?: BetInfo;
  textAnalysis?: string;
  date?: string;
  cached?: boolean;
  error?: {
    code: string;
    message: string;
  };
};

export type AnalysisStreamMessage = UIMessage<
  unknown,
  {
    "research-agent": ResearchAgentData;
  }
>;
