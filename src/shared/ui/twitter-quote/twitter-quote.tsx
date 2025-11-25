import { cn } from "@/lib/utils";
import { XLogo } from "@/assets/icons";

type TwitterQuoteProps = {
  username: string;
  text: string;
  className?: string;
};

function TwitterQuoteRoot({ username, text, className }: TwitterQuoteProps) {
  return (
    <div
      data-slot="twitter-quote"
      className={cn(
        "relative overflow-hidden rounded-xl border border-border bg-card p-4 transition-all",
        className
      )}
    >
      <div className="absolute top-3 right-3 text-muted-foreground/20">
        <XLogo className="size-5" />
      </div>

      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-foreground">
            @{username}
          </span>
        </div>

        <p className="text-sm leading-relaxed text-muted-foreground">
          "{text}"
        </p>
      </div>
    </div>
  );
}

function TwitterQuoteSkeleton({ className }: { className?: string }) {
  return (
    <div
      data-slot="twitter-quote-skeleton"
      className={cn(
        "relative overflow-hidden rounded-xl border border-border bg-card p-4",
        className
      )}
    >
      <div className="absolute top-3 right-3 text-muted-foreground/20">
        <XLogo className="size-5" />
      </div>

      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <div className="size-8 animate-pulse rounded-full bg-muted" />
          <div className="h-4 w-24 animate-pulse rounded bg-muted" />
        </div>
        <div className="space-y-2">
          <div className="h-3 w-full animate-pulse rounded bg-muted" />
          <div className="h-3 w-3/4 animate-pulse rounded bg-muted" />
        </div>
      </div>
    </div>
  );
}

const TwitterQuote = Object.assign(TwitterQuoteRoot, {
  Skeleton: TwitterQuoteSkeleton,
});

export { TwitterQuote };
