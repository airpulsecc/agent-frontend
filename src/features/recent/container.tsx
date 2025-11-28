import { Text, AnalysisCard } from "@/shared/ui";
import { useGetRecentAnalyses } from "@/api";

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
              <AnalysisCard.Skeleton key={i} />
            ))}
          </div>
        ) : recentAnalyses && recentAnalyses.length > 0 ? (
          <div className="space-y-2">
            {recentAnalyses.map((analysis) => (
              <AnalysisCard
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
