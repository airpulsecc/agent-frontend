import { useCallback } from "react";
import { usePostHog } from "posthog-js/react";
import { useAccount } from "wagmi";

export const events = {
  PAGE_VIEW: "page_view",
  ANALYZE_CLICK: "analyze_click",
  SHOW_MORE_CLICK: "show_more_click",
  SHARE_CLICK: "share_click",
  DISCONNECT_CLICK: "disconnect_click",
  CONNECT_CLICK: "connect_click",
} as const;

type EventName = (typeof events)[keyof typeof events];

type EventProperties = Record<string, unknown>;

export const useTrack = () => {
  const posthog = usePostHog();
  const { address } = useAccount();

  const track = useCallback(
    (event: EventName, properties?: EventProperties) => {
      posthog.capture(event, {
        ...properties,
        wallet: address ?? null,
      });
    },
    [address]
  );

  return track;
};
