import type { FC } from "react";
import { AnalysisHeader } from "./analysis-header";
import { ProgressSteps } from "./progress-steps";
import { ResearchReasoning } from "./research-reasoning";
import { MarketsSection } from "./markets-section";
import { PredictionsSection } from "./predictions-section";
import { SocialSentimentSection } from "./social-sentiment-section";
import type { ResearchAgentData } from "../types";

type AnalysisContentProps = {
  data: ResearchAgentData;
};

const AnalysisContent: FC<AnalysisContentProps> = ({ data }) => {
  const { status, topMarkets, result, textAnalysis, betInfo } = data;

  return (
    <div className="space-y-6">
      <AnalysisHeader betInfo={betInfo} />

      {status && status !== "completed" && <ProgressSteps status={status} />}

      {textAnalysis && (
        <ResearchReasoning textAnalysis={textAnalysis} status={status} />
      )}

      {topMarkets && <MarketsSection markets={topMarkets} />}

      {result?.predictions && (
        <PredictionsSection predictions={result.predictions} />
      )}

      {result && <SocialSentimentSection result={result} />}
    </div>
  );
};

export { AnalysisContent };
