import type { FC } from "react";
import { useAnalysisChat } from "./hooks/use-analysis-chat";
import { AnalysisContent } from "./components/analysis-content";

type Props = {
  eventId: string;
};

const Container: FC<Props> = ({ eventId }) => {
  const { messages } = useAnalysisChat({ eventId });

  return (
    <div className="container mx-auto max-w-4xl space-y-6 px-4 py-8">
      {messages.map((message) =>
        message.parts.map((part) => {
          if (part.type === "data-research-agent") {
            return <AnalysisContent key={part.id} data={part.data} />;
          }
          return null;
        })
      )}
    </div>
  );
};

export { Container };
