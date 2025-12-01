import { useCallback, type FC } from "react";
import { cn } from "@/lib/utils";
import { useDisclosure } from "@/hooks/disclosure";
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import { useAccount } from "wagmi";
import { useIsMobile } from "@/hooks/use-mobile";
import { ChevronDown, WalletIcon, LogOut } from "lucide-react";
import { Button, DropdownMenu } from "@/shared/ui";
import { formatAddress } from "@/shared/helpers";
import { events, useTrack } from "@/lib/posthog";

type Props = {
  className?: string;
  fullWidth?: boolean;
};

const ConnectButton: FC<Props> = ({ className, fullWidth = false }) => {
  const { setShowAuthFlow, handleLogOut } = useDynamicContext();
  const isMobile = useIsMobile();
  const [isOpen, { onOpenChange }] = useDisclosure();
  const track = useTrack();

  const { address, isConnected, isConnecting } = useAccount();

  const signIn = useCallback(() => {
    track(events.CONNECT_CLICK);
    setShowAuthFlow(true);
  }, [setShowAuthFlow, track]);

  return (
    <div className={cn("relative", className, fullWidth && "w-full")}>
      {isConnected && (
        <DropdownMenu open={isOpen} onOpenChange={onOpenChange}>
          <DropdownMenu.Trigger asChild>
            <Button disabled={isConnecting} variant="secondary" size="xl">
              <WalletIcon className="size-4" />

              {formatAddress(address!)}

              <ChevronDown
                className={cn(
                  "h-4 w-4 transition-transform duration-200",
                  isOpen && "rotate-180"
                )}
              />
            </Button>
          </DropdownMenu.Trigger>

          <DropdownMenu.Content align="end">
            <Button
              onClick={() => {
                track(events.DISCONNECT_CLICK);
                handleLogOut();
              }}
              size="sm"
            >
              <LogOut className="size-4" />
              Disconnect
            </Button>
          </DropdownMenu.Content>
        </DropdownMenu>
      )}

      {!isConnected && (
        <Button
          onClick={signIn}
          disabled={isConnecting}
          variant="primary"
          size="xl"
        >
          {isMobile ? "Connect" : "Connect Wallet"}
        </Button>
      )}
    </div>
  );
};

export { ConnectButton };
