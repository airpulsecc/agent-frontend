import type { FC } from "react";
import { Text } from "@/shared/ui";
import type { BetInfo } from "../types";

type AnalysisHeaderProps = {
  betInfo?: BetInfo;
};

const AnalysisHeader: FC<AnalysisHeaderProps> = ({ betInfo }) => {
  if (!betInfo || (!betInfo.title && !betInfo.description)) return null;

  return (
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
  );
};

export { AnalysisHeader };
