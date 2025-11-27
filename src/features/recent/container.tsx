import { Text, ScrollArea, Avatar } from "@/shared/ui";
import { ArrowRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useGetRecentAnalyses } from "@/api";
import { DefaultLayout } from "@/layouts/default-layout";

function RecentAnalysisCard({
  title,
  description,
  image,
  slug,
}: {
  title: string;
  description?: string;
  image?: string;
  slug: string;
}) {
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

const RecentContainer = () => {
  const { data: recentAnalyses, isLoading } = useGetRecentAnalyses();

  return (
    <div className="container mx-auto max-w-4xl px-4 py-8">
      <div className="space-y-6">
        {/* Header */}
        <div className="space-y-2">
          <Text as="h1" className="text-3xl font-bold tracking-tight">
            Recent Analyses
          </Text>
          <Text color="secondary">
            Browse all recently analyzed Polymarket predictions
          </Text>
        </div>

        {/* Content */}
        {isLoading ? (
          <div className="space-y-2">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="h-20 rounded-xl border border-border/50 bg-card/30 animate-pulse"
              />
            ))}
          </div>
        ) : recentAnalyses && recentAnalyses.length > 0 ? (
          <div className="space-y-2">
            {recentAnalyses.map((analysis) => (
              <RecentAnalysisCard
                key={analysis.slug}
                title={analysis.title}
                description={analysis.description}
                image={analysis.image}
                slug={analysis.slug}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <Text color="secondary">No recent analyses found</Text>
          </div>
        )}
      </div>
    </div>
  );
};

export { RecentContainer };
