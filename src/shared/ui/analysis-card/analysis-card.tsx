import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Text } from "../text";
import { Avatar } from "../avatar";
import { Skeleton } from "../skeleton";

type AnalysisCardProps = {
  title: string;
  description?: string;
  image?: string;
  slug: string;
};

function AnalysisCard({ title, description, image, slug }: AnalysisCardProps) {
  return (
    <Link
      to="/analysis/$id"
      params={{ id: slug }}
      className="group flex w-full items-center gap-4 rounded-xl border border-border/50 bg-card/30 p-4 text-left transition-all hover:border-primary/30 hover:bg-card/60"
    >
      <Avatar size="md" rounded="lg">
        <Avatar.Image src={image} rounded="lg" size="md" />
        <Avatar.Fallback rounded="lg" size="md">
          {title?.slice(0, 2).toUpperCase()}
        </Avatar.Fallback>
      </Avatar>

      <div className="min-w-0 flex-1 space-y-2">
        <Text className="truncate" color="main">
          {title || "Untitled analysis"}
        </Text>
        {description && (
          <Text className="line-clamp-1 text-xs" color="secondary">
            {description}
          </Text>
        )}
      </div>

      <ArrowRight className="size-4 text-muted-foreground opacity-0 transition-all group-hover:translate-x-1 group-hover:opacity-100" />
    </Link>
  );
}

function AnalysisCardSkeleton() {
  return (
    <div className="flex w-full items-center gap-4 rounded-xl border border-border/50 bg-card/30 p-4">
      <Skeleton className="size-10 rounded-lg" />
      <div className="min-w-0 flex-1 space-y-2">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-3 w-1/2" />
      </div>
    </div>
  );
}

const AnalysisCardComponent = Object.assign(AnalysisCard, {
  Skeleton: AnalysisCardSkeleton,
});

export { AnalysisCardComponent as AnalysisCard };
export type { AnalysisCardProps };
