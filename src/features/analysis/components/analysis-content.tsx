import type { FC } from "react";
import { AlertCircle } from "lucide-react";
import { Alert } from "@/shared/ui/alert";
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
  const { status, topMarkets, result, textAnalysis, betInfo, error } = data;

  if (status === "error" && error) {
    return (
      <div className="space-y-6">
        <AnalysisHeader betInfo={betInfo} />
        <Alert variant="destructive">
          <AlertCircle />
          <Alert.Title>Analysis Error</Alert.Title>
          <Alert.Description>{error.message}</Alert.Description>
        </Alert>
      </div>
    );
  }

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
