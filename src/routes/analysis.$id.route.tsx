import { createFileRoute } from "@tanstack/react-router";
import { type UIMessage, useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import {
  Card,
  Avatar,
  Badge,
  Text,
  Collapsible,
  Shimmer,
  ShimmeringText,
  Spinner,
  TwitterQuote,
  Gauge,
  ProgressBar,
  Tabs,
  NumberFormat,
} from "@/shared/ui";
import {
  CheckIcon,
  ChevronDownIcon,
  BrainIcon,
  TrendingUp,
  Users,
  Star,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Streamdown } from "streamdown";
import { useEffect, useRef } from "react";

export const Route = createFileRoute("/analysis/$id")({
  component: RouteComponent,
});

type AnalysisStatus =
  | "getting-top-markets"
  | "creating-prompt"
  | "analyzing-sentiment"
  | "structuring-response"
  | "completed";

const STEPS: { id: AnalysisStatus; label: string }[] = [
  { id: "getting-top-markets", label: "Finding Top Markets" },
  { id: "creating-prompt", label: "Creating Analysis Prompt" },
  { id: "analyzing-sentiment", label: "Analyzing Sentiment" },
  { id: "structuring-response", label: "Structuring Response" },
  { id: "completed", label: "Analysis Completed" },
];

function ProgressSteps({ status }: { status: AnalysisStatus }) {
  const currentStepIndex = STEPS.findIndex((s) => s.id === status);
  if (status === "completed") return null;

  return (
    <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
      <Card.Header className="pb-2">
        <Card.Title className="text-base">Analysis Progress</Card.Title>
      </Card.Header>
      <Card.Content>
        <div className="space-y-3">
          {STEPS.slice(0, -1).map((step, index) => {
            const isCompleted = index < currentStepIndex;
            const isCurrent = index === currentStepIndex;

            return (
              <div key={step.id} className="flex items-center gap-3">
                <div
                  className={cn(
                    "flex size-6 shrink-0 items-center justify-center rounded-full border text-xs transition-all",
                    isCompleted
                      ? "border-primary bg-primary text-primary-foreground"
                      : isCurrent
                        ? "border-primary text-primary"
                        : "border-muted-foreground/30 text-muted-foreground/30"
                  )}
                >
                  {isCompleted ? (
                    <CheckIcon className="size-3.5" />
                  ) : isCurrent ? (
                    <Spinner />
                  ) : (
                    <span>{index + 1}</span>
                  )}
                </div>
                <span
                  className={cn(
                    "text-sm transition-colors",
                    isCompleted || isCurrent
                      ? "text-foreground"
                      : "text-muted-foreground/50"
                  )}
                >
                  {isCurrent ? (
                    <Shimmer className="text-foreground">{step.label}</Shimmer>
                  ) : (
                    step.label
                  )}
                </span>
              </div>
            );
          })}
        </div>
      </Card.Content>
    </Card>
  );
}

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

export type TopMarket = {
  title?: string;
  image?: string;
  volume?: string;
  winChance?: number;
};

export type BetInfo = {
  title?: string;
  description?: string;
};

type ResearchAgentData = {
  status: AnalysisStatus;
  content: string;
  topMarkets?: TopMarket[];
  result?: AnalysisResult;
  betInfo?: BetInfo;
  textAnalysis?: string;
};

export type AnalysisStreamMessage = UIMessage<
  unknown,
  {
    "research-agent": ResearchAgentData;
  }
>;

function MarketCard({ market }: { market: TopMarket }) {
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

              <div className="text-end space-y-2">
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
}

function PredictionCard({ prediction }: { prediction: MarketPrediction }) {
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
}

function VoicesSection({
  topVoices,
  crowdVoices,
}: {
  topVoices?: VoicesSentiment;
  crowdVoices?: VoicesSentiment;
}) {
  if (!topVoices && !crowdVoices) return null;

  return (
    <Tabs defaultValue="top" className="w-full">
      <Tabs.List className="w-full">
        <Tabs.Trigger value="top" className="flex-1 gap-2">
          <Star className="size-3.5" />
          Top Voices
        </Tabs.Trigger>
        <Tabs.Trigger value="crowd" className="flex-1 gap-2">
          <Users className="size-3.5" />
          Crowd
        </Tabs.Trigger>
      </Tabs.List>

      <Tabs.Content value="top" className="mt-4 space-y-4">
        {topVoices && (
          <>
            {topVoices.sentimentOpinion && (
              <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                <Card.Content className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary/10">
                      <TrendingUp className="size-4 text-primary" />
                    </div>
                    <Text className="text-sm leading-relaxed text-muted-foreground">
                      {topVoices.sentimentOpinion}
                    </Text>
                  </div>
                </Card.Content>
              </Card>
            )}

            <div className="grid gap-3 sm:grid-cols-2">
              {topVoices.tweets?.map((tweet, idx) => (
                <TwitterQuote
                  key={idx}
                  username={tweet.nickname || "anonymous"}
                  text={tweet.text || ""}
                />
              ))}
            </div>
          </>
        )}
      </Tabs.Content>

      <Tabs.Content value="crowd" className="mt-4 space-y-4">
        {crowdVoices && (
          <>
            {crowdVoices.sentimentOpinion && (
              <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                <Card.Content className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary/10">
                      <Users className="size-4 text-primary" />
                    </div>
                    <Text className="text-sm leading-relaxed text-muted-foreground">
                      {crowdVoices.sentimentOpinion}
                    </Text>
                  </div>
                </Card.Content>
              </Card>
            )}

            <div className="grid gap-3 sm:grid-cols-2">
              {crowdVoices.tweets?.map((tweet, idx) => (
                <TwitterQuote
                  key={idx}
                  username={tweet.nickname || "anonymous"}
                  text={tweet.text || ""}
                />
              ))}
            </div>
          </>
        )}
      </Tabs.Content>
    </Tabs>
  );
}

function RouteComponent() {
  const { id } = Route.useParams();
  const { messages, sendMessage } = useChat<AnalysisStreamMessage>({
    transport: new DefaultChatTransport({
      api: import.meta.env.VITE_API_URL + "/api/analytics/analyze-stream",
      headers: {
        "Content-Type": "application/json",
        Accept: "text/event-stream",
      },
    }),
  });

  const hasSentMessage = useRef(false);

  useEffect(() => {
    if (id && !hasSentMessage.current) {
      hasSentMessage.current = true;
      const fullUrl = `https://polymarket.com/event/${id}`;
      sendMessage(
        {
          text: "",
        },
        {
          body: {
            url: fullUrl,
          },
        }
      );
    }
  }, [id]);

  return (
    <div className="container mx-auto max-w-4xl space-y-6 px-4 py-8 pt-[140px]">
      {messages
        .filter((message) => message.role === "assistant")
        .map((message) =>
          message.parts.map((part) => {
            switch (part.type) {
              case "data-research-agent": {
                const topMarkets = part.data.topMarkets;
                const status = part.data.status;
                const result = part.data.result;
                const textAnalysis = part.data.textAnalysis;
                const betInfo = part.data.betInfo;

                return (
                  <div key={part.id} className="space-y-6">
                    {/* Header */}
                    {betInfo && (betInfo.title || betInfo.description) && (
                      <div className="space-y-2">
                        {betInfo.title && (
                          <Text
                            as="h1"
                            className="text-2xl font-bold md:text-3xl"
                          >
                            {betInfo.title}
                          </Text>
                        )}
                        {betInfo.description && (
                          <Text className="text-muted-foreground">
                            {betInfo.description}
                          </Text>
                        )}
                      </div>
                    )}

                    {/* Progress */}
                    {status && status !== "completed" && (
                      <ProgressSteps status={status} />
                    )}

                    {/* Research Reasoning */}
                    {textAnalysis && (
                      <Collapsible defaultOpen={false}>
                        <Collapsible.Trigger className="flex w-full items-center gap-2 rounded-xl border border-border/50 bg-card/50 p-4 text-sm backdrop-blur-sm transition-all hover:bg-card/70 [&[data-state=open]>svg:last-child]:rotate-180">
                          <BrainIcon className="size-4 text-primary" />
                          <span className="flex-1 text-left font-medium">
                            {status === "completed" ? (
                              "Analysis Reasoning"
                            ) : (
                              <ShimmeringText text="Analyzing market data..." />
                            )}
                          </span>
                          <ChevronDownIcon className="size-4 text-muted-foreground transition-transform duration-200" />
                        </Collapsible.Trigger>
                        <Collapsible.Content className="overflow-hidden data-[state=closed]:animate-out data-[state=open]:animate-in data-[state=closed]:fade-out data-[state=open]:fade-in data-[state=closed]:slide-out-to-top-2 data-[state=open]:slide-in-from-top-2">
                          <div className="mt-3 rounded-xl border border-border/50 bg-card/30 p-4">
                            <div className="prose prose-sm prose-invert max-w-none text-muted-foreground">
                              <Streamdown>{textAnalysis}</Streamdown>
                            </div>
                          </div>
                        </Collapsible.Content>
                      </Collapsible>
                    )}

                    {/* Markets */}
                    {topMarkets && topMarkets.length > 0 && (
                      <section className="space-y-4">
                        <div className="flex items-center gap-2">
                          <Text variant="lg">Markets</Text>
                          <Badge variant="outline" size="sm">
                            Polymarket data
                          </Badge>
                        </div>

                        <div className="grid gap-3 sm:grid-cols-2">
                          {topMarkets.map((market) => (
                            <MarketCard key={market.title} market={market} />
                          ))}
                        </div>

                        {/* Compare bar for top 2 markets */}
                        {topMarkets.length >= 2 && (
                          <ProgressBar.Compare
                            size="lg"
                            values={topMarkets.slice(0, 2).map((m, i) => ({
                              label: m.title!,
                              value: m.winChance || 0,
                            }))}
                          />
                        )}
                      </section>
                    )}

                    {/* Predictions */}
                    {result?.predictions && result.predictions.length > 0 && (
                      <section className="space-y-4">
                        <Text variant="xl">AI Predictions</Text>

                        <div className="space-y-3">
                          {result.predictions.map((prediction, idx) => (
                            <PredictionCard key={idx} prediction={prediction} />
                          ))}
                        </div>
                      </section>
                    )}

                    {/* Voices */}
                    {result && (result.topVoices || result.crowdVoices) && (
                      <section className="space-y-4">
                        <Text variant="xl">Social Sentiment</Text>
                        <VoicesSection
                          topVoices={result.topVoices}
                          crowdVoices={result.crowdVoices}
                        />
                      </section>
                    )}
                  </div>
                );
              }
              default: {
                return null;
              }
            }
          })
        )}
    </div>
  );
}
