import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Text, Button, ScrollArea, AnalysisCard } from "@/shared/ui";
import { cn } from "@/lib/utils";
import { events, useTrack } from "@/lib/posthog";
import type { FC } from "react";

type Analysis = {
  slug: string;
  title: string;
  description?: string;
  image?: string;
};

type RecentAnalysesProps = {
  analyses: Analysis[];
  isLoading: boolean;
};

const RecentAnalyses: FC<RecentAnalysesProps> = ({ analyses, isLoading }) => {
  const track = useTrack();

  if (!isLoading && !analyses.length) {
    return null;
  }

  const handleShowMoreClick = () => {
    track(events.SHOW_MORE_CLICK);
  };

  return (
    <div className="w-full space-y-3">
      <div className="flex items-center justify-between">
        <Text variant="sm" color="secondary">
          Recent analyses
        </Text>
        <Button variant="ghost" size="sm" asChild onClick={handleShowMoreClick}>
          <Link to="/recent">
            Show more
            <ArrowRight className="size-3" />
          </Link>
        </Button>
      </div>
      <ScrollArea
        className={cn(
          "w-full rounded-xl",
          isLoading || analyses.length > 1 ? "h-[190px]" : "h-[84px]"
        )}
      >
        <div className="space-y-2 pr-4">
          {isLoading
            ? [...Array(3)].map((_, i) => <AnalysisCard.Skeleton key={i} />)
            : analyses.map((analysis) => (
                <AnalysisCard
                  key={analysis.slug}
                  title={analysis.title}
                  description={analysis.description}
                  image={analysis.image}
                  slug={analysis.slug}
                />
              ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export { RecentAnalyses };
export type { RecentAnalysesProps, Analysis };
