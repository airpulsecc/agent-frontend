import type { FC } from "react";
import { toast } from "sonner";
import { useGetRecentAnalyses } from "@/api";
import { Button } from "@/shared/ui/button";
import { CentredLayout } from "@/layouts/centred-layout";
import { HeroSection } from "./components/hero-section";
import { AnalyzeInput } from "./components/analyze-input";
import { RecentAnalyses } from "./components/recent-analyses";
import { useAnalyzeUrl } from "./hooks/use-analyze-url";

function GradientBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute left-1/2 top-1/2 size-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-[120px]" />
    </div>
  );
}

const Container: FC = () => {
  const { data: recentAnalyses, isLoading } = useGetRecentAnalyses({
    limit: 10,
  });
  const { url, error, setUrl, handleAnalyze } = useAnalyzeUrl();

  return (
    <CentredLayout>
      <GradientBackground />

      <div className="relative z-10 flex w-full max-w-2xl flex-col items-center space-y-8">
        <HeroSection />

        <AnalyzeInput
          url={url}
          error={error}
          onUrlChange={setUrl}
          onAnalyze={handleAnalyze}
        />

        <RecentAnalyses isLoading={isLoading} analyses={recentAnalyses || []} />
      </div>
    </CentredLayout>
  );
};

export { Container };
