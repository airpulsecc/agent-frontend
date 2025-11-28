import { useEffect, useRef } from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
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

  return {
    messages: assistantMessages,
    status,
    error,
  };
};

export { useAnalysisChat };
