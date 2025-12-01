/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_PUBLIC_DYNAMIC_ENV_ID: string;
  readonly VITE_PUBLIC_POSTHOG_KEY: string;
  readonly VITE_PUBLIC_POSTHOG_HOST: string;
  readonly VITE_PUBLIC_APP_URL: string;
  readonly VITE_PUBLIC_POSTHOG_HOST: string;
  // добавьте другие env переменные здесь по мере необходимости
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}