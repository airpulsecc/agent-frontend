import { useEffect, useRef } from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { toast } from "sonner";
import type { AnalysisStreamMessage } from "../types";

type UseAnalysisChatOptions = {
  eventId: string;
};

const useAnalysisChat = ({ eventId }: UseAnalysisChatOptions) => {
  const hasSentMessage = useRef(false);

  const { messages, sendMessage, status, error } =
    useChat<AnalysisStreamMessage>({
      transport: new DefaultChatTransport({
        api: import.meta.env.VITE_API_URL + "/api/analytics/analyze-stream",
        headers: {
          "Content-Type": "application/json",
          Accept: "text/event-stream",
        },
      }),
    });

  useEffect(() => {
    if (eventId && !hasSentMessage.current) {
      hasSentMessage.current = true;
      const fullUrl = `https://polymarket.com/event/${eventId}`;
      sendMessage(
        { text: "" },
        { body: { url: fullUrl } }
      );
    }
  }, [eventId, sendMessage]);

  const assistantMessages = messages.filter(
    (message) => message.role === "assistant"
  );

  const hasShownToast = useRef(false);

  useEffect(() => {
    if (hasShownToast.current) return;

    for (const message of assistantMessages) {
      for (const part of message.parts) {
        if (
          part.type === "data-research-agent" &&
          part.data.status === "completed" &&
          part.data.cached === false
        ) {
          hasShownToast.current = true;
          toast.success("Analysis completed");
          return;
        }
      }
    }
  }, [assistantMessages]);

  return {
    messages: assistantMessages,
    status,
    error,
  };
};

export { useAnalysisChat };
