/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_PUBLIC_DYNAMIC_ENV_ID: string;
  // добавьте другие env переменные здесь по мере необходимости
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
