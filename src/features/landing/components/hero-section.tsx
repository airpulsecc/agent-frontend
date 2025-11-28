import { TrendingUp, Zap, BarChart3 } from "lucide-react";
import { Text } from "@/shared/ui";
import { PolymarketLogoFull } from "@/assets/icons";
import { FeaturePill } from "./feature-pill";

const FEATURES = [
  { icon: TrendingUp, text: "Sentiment Analysis" },
  { icon: Zap, text: "AI Predictions" },
  { icon: BarChart3, text: "Market Data" },
] as const;

function HeroSection() {
  return (
    <>
      {/* Logo */}
      <div className="flex items-center gap-3">
        <PolymarketLogoFull className="h-5 text-primary" />
      </div>

      {/* Heading */}
      <div className="space-y-3 text-center">
        <Text
          as="h1"
          className="text-4xl font-bold tracking-tight md:text-5xl"
        >
          Munar
        </Text>
        <Text color="secondary" className="max-w-md text-base">
          AI-powered analysis for Polymarket predictions. Paste a link to get
          started.
        </Text>
      </div>

      {/* Feature pills */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        {FEATURES.map(({ icon: Icon, text }) => (
          <FeaturePill key={text} icon={<Icon className="size-3" />} text={text} />
        ))}
      </div>
    </>
  );
}

export { HeroSection };
