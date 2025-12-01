import type { FC } from "react";
import { Share2 } from "lucide-react";
import { useCopy } from "@/hooks/use-copy";
import { Text, Button, Tooltip } from "@/shared/ui";
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
    <div className="space-y-6">
      <div className="flex items-center justify-end">
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
        {date && (
          <Text className="text-muted-foreground shrink-0 text-sm">
            {formatDate(date)}
          </Text>
        )}
      </div>
    </div>
  );
};

export { AnalysisHeader };
