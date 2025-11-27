import { Text, Input, Button, Avatar, Card, ScrollArea } from "@/shared/ui";
import { ArrowRight, TrendingUp, Zap, BarChart3 } from "lucide-react";
import { PolymarketLogoFull } from "@/assets/icons";
import { type FC, useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { useAnalyticsControllerGetRecentAnalyses } from "@/api";
import { cn } from "@/lib/utils";
import { CentredLayout } from "@/layouts/centred-layout";

function FeaturePill({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="flex items-center gap-2 rounded-full border border-border/50 bg-card/50 px-3 py-1.5 text-xs text-muted-foreground backdrop-blur-sm">
      {icon}
      <span>{text}</span>
    </div>
  );
}

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

function extractSlugFromUrl(input: string): string | null {
  const trimmed = input.trim();

  // Try to parse as URL
  try {
    const url = new URL(trimmed);
    // Check if it's a polymarket URL
    if (
      url.hostname === "polymarket.com" ||
      url.hostname === "www.polymarket.com"
    ) {
      // Extract slug from pathname like /event/slug-here
      const match = url.pathname.match(/^\/event\/([^/?]+)/);
      if (match) {
        return match[1];
      }
    }
  } catch {
    // Not a valid URL, check if it's already a slug
    // Slug format: lowercase letters, numbers, and hyphens
    if (/^[a-z0-9-]+$/.test(trimmed)) {
      return trimmed;
    }
  }

  return null;
}

const Container: FC = () => {
  const { data: recentAnalyses } = useAnalyticsControllerGetRecentAnalyses({
    limit: 5,
  });
  const [url, setUrl] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleAnalyze = () => {
    const slug = extractSlugFromUrl(url);

    if (!slug) {
      setError("Invalid Polymarket URL. Please enter a valid event link.");
      return;
    }

    setError(null);
    navigate({
      to: "/analysis/$id",
      params: { id: slug },
    });
  };

  return (
    <CentredLayout>
      {/* Subtle gradient background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-1/2 size-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-[120px]" />
      </div>

      <div className="relative z-10 flex w-full max-w-2xl flex-col items-center space-y-8">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <PolymarketLogoFull className="h-5 text-primary" />
        </div>
        {/* Heading */}
        <div className="space-y-3 text-center">
          <Text
            as="h1"
            className="text-4xl font-bold tracking-tight md:text-5xl"
          >
            Munar
          </Text>
          <Text color="secondary" className="max-w-md text-base">
            AI-powered analysis for Polymarket predictions. Paste a link to get
            started.
          </Text>
        </div>
        {/* Feature pills */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          <FeaturePill
            icon={<TrendingUp className="size-3" />}
            text="Sentiment Analysis"
          />
          <FeaturePill
            icon={<Zap className="size-3" />}
            text="AI Predictions"
          />
          <FeaturePill
            icon={<BarChart3 className="size-3" />}
            text="Market Data"
          />
        </div>
        {/* Input Section */}
        <div className="w-full space-y-2">
          <div className="relative">
            <Input
              placeholder="https://polymarket.com/event/..."
              className={cn(
                "h-14 rounded-xl border-border/50 bg-card/50 pr-32 text-base backdrop-blur-sm",
                "focus-visible:border-primary/50 focus-visible:ring-primary/20",
                error && "border-destructive focus-visible:border-destructive"
              )}
              value={url}
              onChange={(e) => {
                setUrl(e.target.value);
                if (error) setError(null);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleAnalyze();
                }
              }}
            />
            <Button
              className="absolute end-2 top-1/2 -translate-y-1/2 rounded-lg"
              size="default"
              onClick={handleAnalyze}
              disabled={!url.trim()}
            >
              Analyze
              <ArrowRight className="size-4" />
            </Button>
          </div>
          {error && (
            <Text variant="sm" color="destructive">
              {error}
            </Text>
          )}
        </div>
        {/* Recent Analyses */}
        {recentAnalyses && recentAnalyses.length > 0 && (
          <div className="w-full space-y-3">
            <div className="flex items-center justify-between">
              <Text variant="sm" color="secondary">
                Recent analyses
              </Text>
              <Button variant="ghost" size="sm" asChild>
                <Link to="/recent">
                  Show more
                  <ArrowRight className="size-3" />
                </Link>
              </Button>
            </div>
            <ScrollArea
              className={cn(
                "w-full rounded-xl",
                recentAnalyses.length > 1 ? "h-[190px]" : "h-[84px]"
              )}
            >
              <div className="space-y-2 pr-4">
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
            </ScrollArea>
          </div>
        )}
      </div>
    </CentredLayout>
  );
};

export { Container };
