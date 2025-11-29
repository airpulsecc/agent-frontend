import copyToClipboard from "copy-to-clipboard";
import { useState, useCallback } from "react";

const posponeFunc = (func?: Function) => {
  return setTimeout(() => {
    func && func();
  }, 1000);
}

const postponeCallback = (callback?: Function) => {
  posponeFunc(callback);
}

const useCopy = (resetDelay = 1500) => {
  const [copied, setCopied] = useState(false);

  const copy = useCallback(
    (text: string) => {
      try {
        setCopied(true);
        copyToClipboard(text);
        setTimeout(() => setCopied(false), resetDelay);
      } catch (error) {
        console.error(error);
        return Promise.reject(error);
      } finally {
        postponeCallback(() => setCopied(false));
      }
    },
    []
  );

  return [copied, copy] as const;
};

export { useCopy };
