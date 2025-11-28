import type { FC } from "react";
import { Text } from "@/shared/ui";
import { PredictionCard } from "./prediction-card";
import type { MarketPrediction } from "../types";

type PredictionsSectionProps = {
  predictions: MarketPrediction[];
};

const PredictionsSection: FC<PredictionsSectionProps> = ({ predictions }) => {
  if (!predictions || predictions.length === 0) return null;

  return (
    <section className="space-y-4">
      <Text variant="xl">AI Predictions</Text>

      <div className="space-y-3">
        {predictions.map((prediction, idx) => (
          <PredictionCard key={idx} prediction={prediction} />
        ))}
      </div>
    </section>
  );
};

export { PredictionsSection };
