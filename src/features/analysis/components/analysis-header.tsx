import type { FC } from "react";
import { Text } from "@/shared/ui";
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
  if (!betInfo || (!betInfo.title && !betInfo.description)) return null;

  return (
    <div className="space-y-2">
      <div className="flex items-start justify-between gap-4">
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
