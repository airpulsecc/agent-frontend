import { DynamicWagmiConnector } from "@dynamic-labs/wagmi-connector";
import { Web3Provider } from "@/providers/web3-provider";
import { Router } from "./router";
import { ReactQueryProvider } from "./state/server";

export default function App() {
  return (
    <Web3Provider>
      <ReactQueryProvider>
        <DynamicWagmiConnector>
          <Router />
        </DynamicWagmiConnector>
      </ReactQueryProvider>
    </Web3Provider>
  );
}
