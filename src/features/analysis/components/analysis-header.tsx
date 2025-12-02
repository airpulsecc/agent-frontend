import type { FC } from "react";
import { Share2, Calendar, ArrowRight, Coins, Landmark } from "lucide-react";
import { useCopy } from "@/hooks/use-copy";
import { Text, Button, Tooltip, Avatar, NumberFormat } from "@/shared/ui";
import { events, useTrack } from "@/lib/posthog";
import type { BetInfo } from "../types";

type AnalysisHeaderProps = {
  betInfo?: BetInfo;
  date?: string;
};

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const AnalysisHeader: FC<AnalysisHeaderProps> = ({ betInfo, date }) => {
  const track = useTrack();
  const [copied, copy] = useCopy();

  const handleShare = () => {
    track(events.SHARE_CLICK);
    copy(window.location.href);
  };

  if (!betInfo || (!betInfo.title && !betInfo.description)) return null;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-2">
        <Text color="secondary" variant="xs">
          {date ? `Generated on ${formatDate(date)}` : "Generating..."}
        </Text>
        <Tooltip open={copied}>
          <Tooltip.Trigger asChild>
            <Button size="sm" onClick={handleShare}>
              <Share2 className="size-4" />
              Share
            </Button>
          </Tooltip.Trigger>
          <Tooltip.Content>Link copied!</Tooltip.Content>
        </Tooltip>
      </div>
      {betInfo.image && (
        <Avatar size="2xl" rounded="lg">
          <Avatar.Image src={betInfo.image} rounded="lg" size="2xl" />
          <Avatar.Fallback rounded="lg" size="2xl">
            {betInfo.title?.slice(0, 2).toUpperCase()}
          </Avatar.Fallback>
        </Avatar>
      )}
      {betInfo.volume && (
        <div className="flex items-center gap-2">
          <Landmark className="size-5 text-secondary" />
          <Text color="secondary" variant="md">
            Volume:{" "}
            <NumberFormat
              value={Number(betInfo.volume)}
              decimalScale={2}
              currency="$"
            />
          </Text>
        </div>
      )}

      {betInfo.startDate && betInfo.endDate && (
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2">
            <Calendar className="size-5 text-secondary" />
            <Text color="secondary" variant="md">
              Starts on {formatDate(betInfo.startDate)}
            </Text>
          </div>

          <ArrowRight className="size-4 text-secondary" />

          <div className="flex items-center gap-2">
            <Calendar className="size-4 text-secondary" />
            <Text color="secondary" variant="md">
              Ends on {formatDate(betInfo.endDate)}
            </Text>
          </div>
        </div>
      )}
      <div className="flex flex-col-reverse md:flex-row md:items-start md:justify-between gap-4">
        <div className="space-y-2">
          {betInfo.title && (
            <Text as="h1" className="text-2xl font-bold md:text-3xl">
              {betInfo.title}
            </Text>
          )}
          {betInfo.description && (
            <Text className="text-muted-foreground">{betInfo.description}</Text>
          )}
        </div>
      </div>
    </div>
  );
};

export { AnalysisHeader };
