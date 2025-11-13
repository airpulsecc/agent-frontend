import { SUPPORTED_CHAINS } from "@/lib/lifi";
import { createConfig, WagmiProvider } from "wagmi";
import { createClient, http } from "viem";
import type { ReactNode } from "react";
import {
  DynamicContextProvider,
  getAuthToken,
} from "@dynamic-labs/sdk-react-core";
import { EthereumWalletConnectors } from "@dynamic-labs/ethereum";
import { login } from "@/api";
import { token } from "@/state/client/auth";

const DYNAMIC_ENV_ID = import.meta.env.VITE_PUBLIC_DYNAMIC_ENV_ID!;

const config = createConfig({
  chains: SUPPORTED_CHAINS,
  multiInjectedProviderDiscovery: false,
  client({ chain }) {
    return createClient({
      chain,
      transport: http(),
    });
  },
});

type Props = {
  children: ReactNode;
};

const Web3Provider = ({ children }: Props) => {
  return (
    <DynamicContextProvider
      settings={{
        environmentId: DYNAMIC_ENV_ID,
        walletConnectors: [EthereumWalletConnectors],
        events: {
          onAuthSuccess: async (args) => {
            try {
              // Получаем Dynamic JWT токен
              const dynamicJwt = getAuthToken();

              if (!dynamicJwt) {
                console.error("No Dynamic JWT token available");
                return;
              }

              // Временно сохраняем Dynamic JWT для запроса к /login
              token.setToken(dynamicJwt);

              // Обмениваем Dynamic JWT на внутренний JWT
              const { accessToken } = await login();

              // Сохраняем внутренний JWT для последующих запросов
              token.setToken(accessToken);
            } catch (error) {
              console.error("Authentication failed:", error);
              token.clearToken();
            }
          },
          onLogout: () => {
            token.clearToken();
          },
        },
      }}
    >
      <WagmiProvider config={config}>{children}</WagmiProvider>
    </DynamicContextProvider>
  );
};

export { Web3Provider };
