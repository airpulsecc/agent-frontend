import { createFileRoute } from "@tanstack/react-router";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport, type UIMessage } from "ai";
import { Button, Card, Badge, Collapsible } from "@/shared/ui";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/test")({
  component: RouteComponent,
});

type Status =
  | "recieving-data-from-polymarket"
  | "checking-data-from-polymarket"
  | "getting-top-markets"
  | "analyzing-sentiment"
  | "getting-structured-prediction"
  | "completed"
  | "error";

export interface Tweet {
  nickname?: string;
  text?: string;
}

export interface VoicesSentiment {
  sentimentOpninion?: string;
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
  status: Status;
  content: string;
  topMarkets?: TopMarket[];
  result?: AnalysisResult;
}

export type MyUiMessage = UIMessage<
  unknown,
  {
    "research-agent": ResearchAgentData;
  }
>;

const statusLabels: Record<Status, string> = {
  "recieving-data-from-polymarket": "Receiving Data from Polymarket",
  "checking-data-from-polymarket": "Checking Data from Polymarket",
  "getting-top-markets": "Getting Top Markets",
  "analyzing-sentiment": "Analyzing Sentiment",
  "getting-structured-prediction": "Getting Structured Prediction",
  completed: "Completed",
  error: "Error",
};

const statusColors: Record<
  Status,
  "default" | "secondary" | "success" | "destructive"
> = {
  "recieving-data-from-polymarket": "secondary",
  "checking-data-from-polymarket": "secondary",
  "getting-top-markets": "secondary",
  "analyzing-sentiment": "secondary",
  "getting-structured-prediction": "secondary",
  completed: "success",
  error: "destructive",
};

function RouteComponent() {
  const { messages, sendMessage, status } = useChat<MyUiMessage>({
    transport: new DefaultChatTransport({
      api: import.meta.env.VITE_API_URL + "/analytics/test-stream-2",
    }),
  });

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Research Agent Test</h1>
        <Badge variant={status === "loading" ? "secondary" : "outline"}>
          {status}
        </Badge>
      </div>

      <Button
        onClick={() =>
          sendMessage(
            {
              text: "",
            },
            {
              body: {
                url: "https://polymarket.com/event/who-will-trump-nominate-as-fed-chair?tid=1763818710390",
              },
            }
          )
        }
        className="mb-6"
      >
        Send Message
      </Button>

      <div className="space-y-4">
        {messages
          .filter((message) => message.role === "assistant")
          .flatMap((message, msgIndex) =>
            message.parts.map((part, partIndex) => {
              switch (part.type) {
                case "data-research-agent": {
                  const agentStatus = part.data.status;
                  const content = part.data.content;
                  const result = part.data.result;

                  const topMarkets = part.data.topMarkets;

                  return (
                    <Card key={`${msgIndex}-${partIndex}`}>
                      <Card.Header>
                        <div className="flex items-center justify-between w-full">
                          <Card.Title>Research Update</Card.Title>
                          <Badge variant={statusColors[agentStatus]} size="sm">
                            {statusLabels[agentStatus]}
                          </Badge>
                        </div>
                      </Card.Header>

                      <Card.Content className="space-y-4">
                        {/* Top Markets Section */}
                        {topMarkets && topMarkets.length > 0 && (
                          <div className="space-y-3">
                            <h3 className="font-semibold text-lg">
                              Top Markets from Polymarket
                            </h3>
                            <div className="grid grid-cols-1 gap-3">
                              {topMarkets.map((market, idx) => (
                                <div
                                  key={idx}
                                  className="flex items-center gap-3 p-3 bg-muted rounded-lg"
                                >
                                  {market.image && (
                                    <img
                                      src={market.image}
                                      alt={market.title}
                                      className="w-12 h-12 rounded-lg object-cover"
                                    />
                                  )}
                                  <div className="flex-1">
                                    <p className="font-medium text-sm">
                                      {market.title}
                                    </p>
                                    <div className="flex items-center gap-3 mt-1">
                                      {market.volume && (
                                        <p className="text-xs text-muted-foreground">
                                          Vol: {market.volume}
                                        </p>
                                      )}
                                      {market.winChancePercent && (
                                        <Badge variant="outline" size="sm">
                                          {market.winChancePercent}
                                        </Badge>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Content Section with Collapsible */}
                        {agentStatus === "analyzing-sentiment" ? (
                          <ContentCollapsible content={content} />
                        ) : (
                          <p className="text-sm text-muted-foreground">
                            {content}
                          </p>
                        )}

                        {result && (
                          <>
                            {/* Top Voices Section */}
                            {result.topVoices && (
                              <AnalysisSentimentSection
                                title="Top Voices"
                                sentiment={result.topVoices}
                              />
                            )}

                            {/* Crowd Voices Section */}
                            {result.crowdVoices && (
                              <AnalysisSentimentSection
                                title="Crowd Voices"
                                sentiment={result.crowdVoices}
                              />
                            )}

                            {/* Predictions Section */}
                            {result.predictions &&
                              result.predictions.length > 0 && (
                                <div className="space-y-3">
                                  <h3 className="font-semibold text-lg">
                                    Market Predictions
                                  </h3>
                                  {result.predictions.map((pred, idx) => (
                                    <Card key={idx} variant="bordered">
                                      <Card.Header>
                                        <Card.Title className="text-base">
                                          {pred.marketTitle}
                                        </Card.Title>
                                        <Card.Description>
                                          Win Chance: {pred.winChance}%
                                        </Card.Description>
                                      </Card.Header>
                                      <Card.Content>
                                        <p className="text-sm">
                                          {pred.reasoning}
                                        </p>
                                      </Card.Content>
                                    </Card>
                                  ))}
                                </div>
                              )}
                          </>
                        )}
                      </Card.Content>
                    </Card>
                  );
                }
                default:
                  return null;
              }
            })
          )}
      </div>
    </div>
  );
}

type ContentCollapsibleProps = {
  content: string;
};

function ContentCollapsible({ content }: ContentCollapsibleProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="space-y-2">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <div className="border rounded-lg overflow-hidden">
          <div
            className={`p-3 text-sm text-muted-foreground ${
              !isOpen ? "h-[100px] overflow-hidden" : ""
            }`}
          >
            {content}
          </div>
          <Collapsible.Trigger asChild>
            <button className="flex items-center justify-center w-full p-2 border-t hover:bg-accent transition-colors">
              <ChevronDown
                className={`h-4 w-4 transition-transform ${
                  isOpen ? "rotate-180" : ""
                }`}
              />
            </button>
          </Collapsible.Trigger>
        </div>
      </Collapsible>
    </div>
  );
}

type AnalysisSentimentSectionProps = {
  title: string;
  sentiment: VoicesSentiment;
};

function AnalysisSentimentSection({
  title,
  sentiment,
}: AnalysisSentimentSectionProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="space-y-2">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <Collapsible.Trigger asChild>
          <button className="flex items-center justify-between w-full p-3 rounded-lg hover:bg-accent transition-colors">
            <h3 className="font-semibold text-lg">{title}</h3>
            <ChevronDown
              className={`h-5 w-5 transition-transform ${
                isOpen ? "rotate-180" : ""
              }`}
            />
          </button>
        </Collapsible.Trigger>

        <Collapsible.Content className="space-y-3 pt-2">
          {sentiment.sentimentOpninion && (
            <div className="p-3 bg-muted rounded-lg">
              <p className="text-sm font-medium mb-1">Sentiment Opinion:</p>
              <p className="text-sm text-muted-foreground">
                {sentiment.sentimentOpninion}
              </p>
            </div>
          )}

          {sentiment.tweets && sentiment.tweets.length > 0 && (
            <div className="space-y-2">
              <p className="text-sm font-medium">Tweets:</p>
              <div className="space-y-2">
                {sentiment.tweets.map((tweet, idx) => (
                  <div key={idx} className="p-3 bg-card border rounded-lg">
                    {tweet.nickname && (
                      <p className="text-xs font-semibold text-primary mb-1">
                        {tweet.nickname}
                      </p>
                    )}
                    {tweet.text && (
                      <p className="text-sm text-foreground">{tweet.text}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </Collapsible.Content>
      </Collapsible>
    </div>
  );
}
