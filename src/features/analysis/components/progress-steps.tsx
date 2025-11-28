import type { FC } from "react";
import { CheckIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card, Shimmer, Spinner } from "@/shared/ui";
import { ANALYSIS_STEPS } from "../constants";
import type { AnalysisStatus } from "../types";

type ProgressStepsProps = {
  status: AnalysisStatus;
};

const ProgressSteps: FC<ProgressStepsProps> = ({ status }) => {
  const currentStepIndex = ANALYSIS_STEPS.findIndex((s) => s.id === status);

  if (status === "completed") return null;

  return (
    <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
      <Card.Header className="pb-2">
        <Card.Title className="text-base">Analysis Progress</Card.Title>
      </Card.Header>
      <Card.Content>
        <div className="space-y-3">
          {ANALYSIS_STEPS.slice(0, -1).map((step, index) => {
            const isCompleted = index < currentStepIndex;
            const isCurrent = index === currentStepIndex;

            return (
              <div key={step.id} className="flex items-center gap-3">
                <div
                  className={cn(
                    "flex size-6 shrink-0 items-center justify-center rounded-full border text-xs transition-all",
                    isCompleted
                      ? "border-primary bg-primary text-primary-foreground"
                      : isCurrent
                        ? "border-primary text-primary"
                        : "border-muted-foreground/30 text-muted-foreground/30"
                  )}
                >
                  {isCompleted ? (
                    <CheckIcon className="size-3.5" />
                  ) : isCurrent ? (
                    <Spinner />
                  ) : (
                    <span>{index + 1}</span>
                  )}
                </div>
                <span
                  className={cn(
                    "text-sm transition-colors",
                    isCompleted || isCurrent
                      ? "text-foreground"
                      : "text-muted-foreground/50"
                  )}
                >
                  {isCurrent ? (
                    <Shimmer className="text-foreground">{step.label}</Shimmer>
                  ) : (
                    step.label
                  )}
                </span>
              </div>
            );
          })}
        </div>
      </Card.Content>
    </Card>
  );
};

export { ProgressSteps };
