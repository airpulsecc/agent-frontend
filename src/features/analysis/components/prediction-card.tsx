import type { FC } from "react";
import { Card, Text, Gauge } from "@/shared/ui";
import type { MarketPrediction } from "../types";

type PredictionCardProps = {
  prediction: MarketPrediction;
};

const PredictionCard: FC<PredictionCardProps> = ({ prediction }) => {
  const winChance = prediction.winChance || 0;

  return (
    <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
      <Card.Content className="p-5">
        <div className="flex items-start gap-5">
          <Gauge value={winChance} size="default" />

          <div className="min-w-0 flex-1 space-y-2">
            <Text className="font-semibold">{prediction.marketTitle}</Text>
            <Text className="text-sm leading-relaxed text-muted-foreground">
              {prediction.reasoning}
            </Text>
          </div>
        </div>
      </Card.Content>
    </Card>
  );
};

export { PredictionCard };
