import type { FC } from "react";
import { BrainIcon, ChevronDownIcon } from "lucide-react";
import { Streamdown } from "streamdown";
import { Collapsible, ShimmeringText } from "@/shared/ui";
import type { AnalysisStatus } from "../types";

type ResearchReasoningProps = {
  textAnalysis: string;
  status: AnalysisStatus;
};

const ResearchReasoning: FC<ResearchReasoningProps> = ({
  textAnalysis,
  status,
}) => {
  const isCompleted = status === "completed";

  return (
    <Collapsible defaultOpen={false}>
      <Collapsible.Trigger className="flex w-full items-center gap-2 rounded-xl border border-border/50 bg-card/50 p-4 text-sm backdrop-blur-sm transition-all hover:bg-card/70 [&[data-state=open]>svg:last-child]:rotate-180">
        <BrainIcon className="size-4 text-primary" />
        <span className="flex-1 text-left font-medium">
          {isCompleted ? (
            "Analysis Reasoning"
          ) : (
            <ShimmeringText text="Analyzing market data..." />
          )}
        </span>
        <ChevronDownIcon className="size-4 text-muted-foreground transition-transform duration-200" />
      </Collapsible.Trigger>
      <Collapsible.Content className="overflow-hidden data-[state=closed]:animate-out data-[state=open]:animate-in data-[state=closed]:fade-out data-[state=open]:fade-in data-[state=closed]:slide-out-to-top-2 data-[state=open]:slide-in-from-top-2">
        <div className="mt-3 rounded-xl border border-border/50 bg-card/30 p-4">
          <div className="prose prose-sm prose-invert max-w-none text-muted-foreground">
            <Streamdown>{textAnalysis}</Streamdown>
          </div>
        </div>
      </Collapsible.Content>
    </Collapsible>
  );
};

export { ResearchReasoning };
