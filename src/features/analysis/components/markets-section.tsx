import type { FC } from "react";
import { Text, Badge, ProgressBar } from "@/shared/ui";
import { MarketCard } from "./market-card";
import type { TopMarket } from "../types";

type MarketsSectionProps = {
  markets: TopMarket[];
};

const MarketsSection: FC<MarketsSectionProps> = ({ markets }) => {
  if (!markets || markets.length === 0) return null;

  return (
    <section className="space-y-4">
      <div className="flex items-center gap-2">
        <Text variant="lg">Markets</Text>
        <Badge variant="outline" size="sm">
          Polymarket data
        </Badge>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {markets.map((market) => (
          <MarketCard key={market.title} market={market} />
        ))}
      </div>

      {markets.length >= 2 && (
        <ProgressBar.Compare
          size="lg"
          values={markets.slice(0, 2).map((m) => ({
            label: m.title!,
            value: m.winChance || 0,
          }))}
        />
      )}
    </section>
  );
};

export { MarketsSection };
