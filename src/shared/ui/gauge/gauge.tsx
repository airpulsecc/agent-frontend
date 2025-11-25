import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const gaugeVariants = cva("relative inline-flex items-center justify-center", {
  variants: {
    size: {
      sm: "size-16",
      default: "size-24",
      lg: "size-32",
      xl: "size-40",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

const strokeWidthMap = {
  sm: 4,
  default: 6,
  lg: 8,
  xl: 10,
} as const;

type GaugeProps = {
  value: number;
  max?: number;
  showValue?: boolean;
  label?: string;
  className?: string;
} & VariantProps<typeof gaugeVariants>;

function GaugeRoot({
  value,
  max = 100,
  size = "default",
  showValue = true,
  label,
  className,
}: GaugeProps) {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);
  const strokeWidth = strokeWidthMap[size || "default"];
  const radius = 50 - strokeWidth / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div
      data-slot="gauge"
      className={cn(gaugeVariants({ size }), className)}
    >
      <svg
        className="size-full -rotate-90"
        viewBox="0 0 100 100"
      >
        <circle
          className="text-muted"
          strokeWidth={strokeWidth}
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx="50"
          cy="50"
        />
        <circle
          className="text-primary transition-all duration-500 ease-out"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx="50"
          cy="50"
        />
      </svg>

      {showValue && (
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-lg font-bold text-foreground">
            {Math.round(percentage)}%
          </span>
          {label && (
            <span className="text-xs text-muted-foreground">{label}</span>
          )}
        </div>
      )}
    </div>
  );
}

function GaugeSkeleton({
  size = "default",
  className,
}: VariantProps<typeof gaugeVariants> & { className?: string }) {
  return (
    <div
      data-slot="gauge-skeleton"
      className={cn(gaugeVariants({ size }), "animate-pulse", className)}
    >
      <div className="size-full rounded-full border-4 border-muted bg-muted/30" />
    </div>
  );
}

const Gauge = Object.assign(GaugeRoot, {
  Skeleton: GaugeSkeleton,
});

export { Gauge, gaugeVariants };
