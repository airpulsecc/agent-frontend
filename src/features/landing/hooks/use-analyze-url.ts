import { useState, useCallback } from "react";
import { useNavigate } from "@tanstack/react-router";
import { extractSlugFromUrl } from "../helpers/extract-slug";

type UseAnalyzeUrlReturn = {
  url: string;
  error: string | null;
  setUrl: (value: string) => void;
  handleAnalyze: () => void;
  clearError: () => void;
};

function useAnalyzeUrl(): UseAnalyzeUrlReturn {
  const [url, setUrl] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const handleUrlChange = useCallback((value: string) => {
    setUrl(value);
    setError(null);
  }, []);

  const handleAnalyze = useCallback(() => {
    const slug = extractSlugFromUrl(url);

    if (!slug) {
      setError("Invalid Polymarket URL. Please enter a valid event link.");
      return;
    }

    setError(null);
    navigate({
      to: "/analysis/$id",
      params: { id: slug },
    });
  }, [url, navigate]);

  return {
    url,
    error,
    setUrl: handleUrlChange,
    handleAnalyze,
    clearError,
  };
}

export { useAnalyzeUrl };
export type { UseAnalyzeUrlReturn };
