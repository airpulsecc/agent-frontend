import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { PostHogProvider } from "posthog-js/react";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <PostHogProvider
      apiKey={import.meta.env.VITE_PUBLIC_POSTHOG_KEY}
      options={{
        api_host: import.meta.env.VITE_PUBLIC_POSTHOG_HOST,
        capture_exceptions: true,
        //debug: import.meta.env.MODE === "development",
        capture_pageview: false,
        autocapture: false,
        capture_pageleave: true,
        disable_external_dependency_loading: true,
      }}
    >
      <App />
    </PostHogProvider>
  </StrictMode>
);
