import type { ReactNode } from "react";

type FeaturePillProps = {
  icon: ReactNode;
  text: string;
};

function FeaturePill({ icon, text }: FeaturePillProps) {
  return (
    <div className="flex items-center gap-2 rounded-full border border-border/50 bg-card/50 px-3 py-1.5 text-xs text-muted-foreground backdrop-blur-sm">
      {icon}
      <span>{text}</span>
    </div>
  );
}

export { FeaturePill };
export type { FeaturePillProps };
