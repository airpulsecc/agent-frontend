import { cn, getChanceColor } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import Big from "big.js";

const progressBarVariants = cva(
  "relative w-full overflow-hidden rounded-full bg-muted",
  {
    variants: {
      size: {
        sm: "h-1.5",
        default: "h-2",
        lg: "h-3",
        xl: "h-4",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
);

type ProgressBarProps = {
  value: number;
  max?: number;
  showValue?: boolean;
  label?: string;
  className?: string;
  indicatorClassName?: string;
  dynamicColor?: boolean;
} & VariantProps<typeof progressBarVariants>;

function ProgressBarRoot({
  value,
  max = 100,
  size = "default",
  showValue = false,
  label,
  className,
  indicatorClassName,
  dynamicColor = false,
}: ProgressBarProps) {
  // Используем big.js для точных вычислений без округления
  const bigValue = new Big(value);
  const bigMax = new Big(max);
  const bigHundred = new Big(100);

  // Вычисляем процент: (value / max) * 100
  const rawPercentage = bigValue.div(bigMax).times(100);

  // Ограничиваем диапазон от 0 до 100
  let percentage: Big;
  if (rawPercentage.lt(0)) {
    percentage = new Big(0);
  } else if (rawPercentage.gt(100)) {
    percentage = bigHundred;
  } else {
    percentage = rawPercentage;
  }

  const percentageNum = percentage.toNumber();

  return (
    <div data-slot="progress-bar" className="w-full space-y-1.5">
      {(label || showValue) && (
        <div className="flex items-center justify-between text-sm">
          {label && <span className="text-muted-foreground">{label}</span>}
          {showValue && (
            <span className="font-medium text-foreground">
              {percentage.toString()}%
            </span>
          )}
        </div>
      )}
      <div className={cn(progressBarVariants({ size }), className)}>
        <div
          data-slot="progress-bar-indicator"
          className={cn(
            "h-full rounded-full transition-all duration-500 ease-out",
            !dynamicColor && "bg-primary",
            indicatorClassName
          )}
          style={{
            width: `${percentage.toString()}%`,
            ...(dynamicColor && { backgroundColor: getChanceColor(percentageNum) }),
          }}
        />
      </div>
    </div>
  );
}

type CompareProgressBarProps = {
  values: { label: string; value: number; color?: string }[];
  className?: string;
} & VariantProps<typeof progressBarVariants>;

function CompareProgressBar({
  values,
  size = "default",
  className,
}: CompareProgressBarProps) {
  // Используем big.js для суммирования значений
  const total = values.reduce(
    (acc, v) => acc.plus(new Big(v.value)),
    new Big(0)
  );

  return (
    <div data-slot="compare-progress-bar" className="w-full space-y-2">
      <div className={cn(progressBarVariants({ size }), "flex", className)}>
        {values.map((item, index) => {
          // Вычисляем процент: (value / total) * 100
          const percentage = total.gt(0)
            ? new Big(item.value).div(total).times(100)
            : 0;

          return (
            <div
              key={item.label}
              className={cn(
                "h-full transition-all duration-500 ease-out first:rounded-l-full last:rounded-r-full",
                item.color ||
                  (index === 0 ? "bg-primary" : "bg-muted-foreground/30")
              )}
              style={{ width: `${percentage.toString()}%` }}
            />
          );
        })}
      </div>
      <div className="flex justify-between text-xs text-muted-foreground">
        {values.map((item) => (
          <div key={item.label} className="flex items-center gap-1.5">
            <div
              className={cn("size-2 rounded-full", item.color || "bg-primary")}
            />
            <span>{item.label}</span>
            <span className="font-medium text-foreground">{item.value}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ProgressBarSkeleton({
  size = "default",
  className,
}: VariantProps<typeof progressBarVariants> & { className?: string }) {
  return (
    <div data-slot="progress-bar-skeleton" className="w-full space-y-1.5">
      <div className="flex items-center justify-between">
        <div className="h-3 w-20 animate-pulse rounded bg-muted" />
        <div className="h-3 w-10 animate-pulse rounded bg-muted" />
      </div>
      <div
        className={cn(
          progressBarVariants({ size }),
          "animate-pulse",
          className
        )}
      />
    </div>
  );
}

const ProgressBar = Object.assign(ProgressBarRoot, {
  Compare: CompareProgressBar,
  Skeleton: ProgressBarSkeleton,
});

export { ProgressBar, progressBarVariants };
