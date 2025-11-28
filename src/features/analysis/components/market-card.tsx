import type { FC } from "react";
import { Card, Text, Badge, NumberFormat } from "@/shared/ui";
import type { TopMarket } from "../types";

type MarketCardProps = {
  market: TopMarket;
};

const MarketCard: FC<MarketCardProps> = ({ market }) => {
  return (
    <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
      <Card.Content className="p-4">
        <div className="flex items-start gap-4">
          <div className="min-w-0 flex-1 space-y-3">
            <Text className="leading-tight" variant="lg">
              {market.title}
            </Text>

            <div className="flex items-center justify-between gap-4">
              <div className="space-y-2">
                <Text color="secondary" variant="sm">
                  Volume
                </Text>

                <Text variant="lg" bold>
                  {market.volume ? (
                    <NumberFormat
                      value={Number(market.volume)}
                      decimalScale={2}
                      currency="$"
                    />
                  ) : (
                    "N/A"
                  )}
                </Text>
              </div>

              <div className="space-y-2 text-end">
                <Text color="secondary" variant="sm">
                  Win Chance
                </Text>
                <Badge
                  variant={
                    Number(market.winChance) > 50 ? "success" : "default"
                  }
                  size="sm"
                >
                  {market.winChance}%
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </Card.Content>
    </Card>
  );
};

export { MarketCard };
