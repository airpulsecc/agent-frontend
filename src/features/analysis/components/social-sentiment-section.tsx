import type { FC } from "react";
import { Text } from "@/shared/ui";
import { VoicesSection } from "./voices-section";
import type { AnalysisResult } from "../types";

type SocialSentimentSectionProps = {
  result: AnalysisResult;
};

const SocialSentimentSection: FC<SocialSentimentSectionProps> = ({
  result,
}) => {
  if (!result.topVoices && !result.crowdVoices) return null;

  return (
    <section className="space-y-4">
      <Text variant="xl">Social Sentiment</Text>
      <VoicesSection
        topVoices={result.topVoices}
        crowdVoices={result.crowdVoices}
      />
    </section>
  );
};

export { SocialSentimentSection };
