import type { FC } from "react";
import { Star, Users, TrendingUp } from "lucide-react";
import { Card, Text, Tabs, TwitterQuote } from "@/shared/ui";
import type { VoicesSentiment } from "../types";

type SentimentCardProps = {
  opinion: string;
  icon: "trending" | "users";
};

const SentimentCard: FC<SentimentCardProps> = ({ opinion, icon }) => {
  const Icon = icon === "trending" ? TrendingUp : Users;

  return (
    <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
      <Card.Content className="p-4">
        <div className="flex items-start gap-3">
          <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary/10">
            <Icon className="size-4 text-primary" />
          </div>
          <Text className="text-sm leading-relaxed text-muted-foreground">
            {opinion}
          </Text>
        </div>
      </Card.Content>
    </Card>
  );
};

type TweetGridProps = {
  tweets?: VoicesSentiment["tweets"];
};

const TweetGrid: FC<TweetGridProps> = ({ tweets }) => {
  if (!tweets || tweets.length === 0) return null;

  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {tweets.map((tweet, idx) => (
        <TwitterQuote
          key={idx}
          username={tweet.nickname || "anonymous"}
          text={tweet.text || ""}
        />
      ))}
    </div>
  );
};

type VoiceTabContentProps = {
  voices?: VoicesSentiment;
  icon: "trending" | "users";
};

const VoiceTabContent: FC<VoiceTabContentProps> = ({ voices, icon }) => {
  if (!voices) return null;

  return (
    <>
      {voices.sentimentOpinion && (
        <SentimentCard opinion={voices.sentimentOpinion} icon={icon} />
      )}
      <TweetGrid tweets={voices.tweets} />
    </>
  );
};

type VoicesSectionProps = {
  topVoices?: VoicesSentiment;
  crowdVoices?: VoicesSentiment;
};

const VoicesSection: FC<VoicesSectionProps> = ({ topVoices, crowdVoices }) => {
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
        <VoiceTabContent voices={topVoices} icon="trending" />
      </Tabs.Content>

      <Tabs.Content value="crowd" className="mt-4 space-y-4">
        <VoiceTabContent voices={crowdVoices} icon="users" />
      </Tabs.Content>
    </Tabs>
  );
};

export { VoicesSection };
