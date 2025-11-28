import { ArrowRight } from "lucide-react";
import { Text, Input, Button } from "@/shared/ui";
import { cn } from "@/lib/utils";

type AnalyzeInputProps = {
  url: string;
  error: string | null;
  onUrlChange: (value: string) => void;
  onAnalyze: () => void;
};

function AnalyzeInput({
  url,
  error,
  onUrlChange,
  onAnalyze,
}: AnalyzeInputProps) {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onAnalyze();
    }
  };

  return (
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
          onChange={(e) => onUrlChange(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <Button
          className="absolute end-2 top-1/2 -translate-y-1/2 rounded-lg"
          size="default"
          onClick={onAnalyze}
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
  );
}

export { AnalyzeInput };
export type { AnalyzeInputProps };
