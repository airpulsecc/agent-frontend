import { createFileRoute } from "@tanstack/react-router";
import { type UIMessage, useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import {
  Button,
  Card,
  Avatar,
  Badge,
  Text,
  Collapsible,
  Shimmer,
  ShimmeringText,
  Spinner,
} from "@/shared/ui";
import { CheckIcon, ChevronDownIcon, BrainIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Streamdown } from "streamdown";

export const Route = createFileRoute("/analysis")({
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
    <div className="space-y-4">
      <Text variant="xl" bold>
        Analysis Progress
      </Text>
      <Card>
        <Card.Content className="pt-6">
          <div className="space-y-4">
            {STEPS.slice(0, -1).map((step, index) => {
              const isCompleted = index < currentStepIndex;
              const isCurrent = index === currentStepIndex;

              return (
                <div key={step.id} className="flex items-center gap-3">
                  <div
                    className={cn(
                      "flex size-6 items-center justify-center rounded-full border text-xs",
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
                  <div
                    className={cn(
                      "text-sm font-medium",
                      isCompleted
                        ? "text-foreground"
                        : isCurrent
                          ? "text-foreground"
                          : "text-muted-foreground/50"
                    )}
                  >
                    {isCurrent ? (
                      <Shimmer className="text-foreground">
                        {step.label}
                      </Shimmer>
                    ) : (
                      step.label
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </Card.Content>
      </Card>
    </div>
  );
}

export interface Tweet {
  nickname?: string;
  text?: string;
}

export interface VoicesSentiment {
  sentimentOpinion?: string;
  tweets?: Tweet[];
}

export interface MarketPrediction {
  marketTitle?: string;
  winChance?: number;
  reasoning?: string;
}

export interface AnalysisResult {
  topVoices?: VoicesSentiment;
  crowdVoices?: VoicesSentiment;
  predictions?: MarketPrediction[];
}

export interface TopMarket {
  title?: string;
  image?: string;
  volume?: string;
  winChance?: number;
  winChancePercent?: string;
}

interface ResearchAgentData {
  status: AnalysisStatus;
  content: string;
  topMarkets?: TopMarket[];
  result?: AnalysisResult;
  textAnalysis?: string;
}

export type AnalysisStreamMessage = UIMessage<
  unknown,
  {
    "research-agent": ResearchAgentData;
  }
>;

function RouteComponent() {
  const { messages, sendMessage, status } = useChat<AnalysisStreamMessage>({
    transport: new DefaultChatTransport({
      api: import.meta.env.VITE_API_URL + "/analytics/analyze-stream",
      headers: {
        "Content-Type": "application/json",
        Accept: "text/event-stream",
      },
      // body: {
      //   url: "https://polymarket.com/event/time-2025-person-of-the-year?tid=1763572618642",
      // },
    }),
  });

  return (
    <div className="container mx-auto p-4 space-y-4">
      <Button
        onClick={() =>
          sendMessage(
            {
              text: "",
            },
            {
              body: {
                url: "https://polymarket.com/event/time-2025-person-of-the-year?tid=1763572618642",
              },
            }
          )
        }
      >
        Send Message
      </Button>
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

                return (
                  <div key={part.id} className="space-y-6">
                    {status && (
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">{status}</Badge>
                      </div>
                    )}

                    {status && <ProgressSteps status={status} />}

                    {textAnalysis && (
                      <Collapsible defaultOpen={false}>
                        <Collapsible.Trigger className="flex w-full items-center gap-2 rounded-md p-2 text-sm hover:bg-muted/50 transition-colors [&[data-state=open]>svg:last-child]:rotate-180">
                          <BrainIcon className="size-4 text-muted-foreground" />
                          <span className="font-medium text-muted-foreground flex-1 text-left">
                            {status === "completed" ? (
                              "Analysis Reasoning"
                            ) : (
                              <ShimmeringText text="Analyzing market data..." />
                            )}
                          </span>
                          <ChevronDownIcon className="size-4 text-muted-foreground transition-transform duration-200" />
                        </Collapsible.Trigger>
                        <Collapsible.Content className="px-2 pt-2 pb-4 text-sm text-muted-foreground whitespace-pre-wrap animate-in slide-in-from-top-2 fade-in duration-200 data-[state=closed]:animate-out data-[state=closed]:slide-out-to-top-2 data-[state=closed]:fade-out">
                          <div className="pl-6 border-l-2 border-muted ml-2">
                            <Streamdown>{textAnalysis}</Streamdown>
                          </div>
                        </Collapsible.Content>
                      </Collapsible>
                    )}

                    {topMarkets && topMarkets.length > 0 && (
                      <div className="space-y-4">
                        <Text variant="xl" bold>
                          Top Markets (Polymarket data)
                        </Text>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                          {topMarkets.map((market) => (
                            <Card
                              key={market.title}
                              className="overflow-hidden"
                            >
                              <Card.Header className="flex flex-row items-center gap-4 space-y-0 pb-2">
                                <Avatar size="md">
                                  <Avatar.Image src={market.image} />
                                  <Avatar.Fallback>
                                    {market.title?.slice(0, 2).toUpperCase()}
                                  </Avatar.Fallback>
                                </Avatar>
                                <Card.Title className="text-base line-clamp-2">
                                  {market.title}
                                </Card.Title>
                              </Card.Header>
                              <Card.Content>
                                <div className="flex justify-between items-end mt-4">
                                  <div className="flex flex-col gap-1">
                                    <Text variant="sm" color="secondary">
                                      Volume
                                    </Text>
                                    <Text bold>{market.volume}</Text>
                                  </div>
                                  <div className="flex flex-col items-end gap-1">
                                    <Text variant="sm" color="secondary">
                                      Win Chance
                                    </Text>
                                    <Badge
                                      variant={
                                        (market.winChance || 0) > 0.5
                                          ? "default"
                                          : "secondary"
                                      }
                                    >
                                      {market.winChancePercent}
                                    </Badge>
                                  </div>
                                </div>
                              </Card.Content>
                            </Card>
                          ))}
                        </div>
                      </div>
                    )}

                    {result && (
                      <div className="space-y-6">
                        {/* Predictions */}
                        {result.predictions &&
                          result.predictions.length > 0 && (
                            <div className="space-y-4">
                              <Text variant="xl" bold>
                                Predictions
                              </Text>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {result.predictions.map((prediction, idx) => (
                                  <Card key={idx}>
                                    <Card.Header>
                                      <Card.Title>
                                        {prediction.marketTitle}
                                      </Card.Title>
                                    </Card.Header>
                                    <Card.Content className="space-y-2">
                                      <div className="flex items-center justify-between">
                                        <Text color="secondary">
                                          Win Chance
                                        </Text>
                                        <Badge
                                          variant={
                                            (prediction.winChance || 0) > 0.5
                                              ? "default"
                                              : "secondary"
                                          }
                                        >
                                          {Math.round(
                                            prediction.winChance || 0
                                          )}
                                          %
                                        </Badge>
                                      </div>
                                      <Text>{prediction.reasoning}</Text>
                                    </Card.Content>
                                  </Card>
                                ))}
                              </div>
                            </div>
                          )}

                        <div className="grid grid-cols-2 gap-4">
                          {/* Top Voices */}
                          {result.topVoices && (
                            <div className="space-y-4">
                              <Text variant="xl" bold>
                                Top Voices
                              </Text>
                              <Card>
                                <Card.Header>
                                  <Card.Title>Sentiment Analysis</Card.Title>
                                </Card.Header>
                                <Card.Content className="space-y-4">
                                  <Text>
                                    {result.topVoices.sentimentOpinion}
                                  </Text>
                                  <div className="space-y-2">
                                    {result.topVoices.tweets?.map(
                                      (tweet, idx) => (
                                        <div
                                          key={idx}
                                          className="bg-muted/50 rounded-lg p-3 text-sm"
                                        >
                                          <Text bold className="mb-1">
                                            {tweet.nickname}
                                          </Text>
                                          <Text color="secondary">
                                            {tweet.text}
                                          </Text>
                                        </div>
                                      )
                                    )}
                                  </div>
                                </Card.Content>
                              </Card>
                            </div>
                          )}

                          {/* Crowd Voices */}
                          {result.crowdVoices && (
                            <div className="space-y-4">
                              <Text variant="xl" bold>
                                Crowd Voices
                              </Text>
                              <Card>
                                <Card.Header>
                                  <Card.Title>Sentiment Analysis</Card.Title>
                                </Card.Header>
                                <Card.Content className="space-y-4">
                                  <Text>
                                    {result.crowdVoices.sentimentOpinion}
                                  </Text>
                                  <div className="space-y-2">
                                    {result.crowdVoices.tweets?.map(
                                      (tweet, idx) => (
                                        <div
                                          key={idx}
                                          className="bg-muted/50 rounded-lg p-3 text-sm"
                                        >
                                          <Text bold className="mb-1">
                                            {tweet.nickname}
                                          </Text>
                                          <Text color="secondary">
                                            {tweet.text}
                                          </Text>
                                        </div>
                                      )
                                    )}
                                  </div>
                                </Card.Content>
                              </Card>
                            </div>
                          )}
                        </div>
                      </div>
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
