import { Button, Text, HoverCard, DropdownMenu } from "@/shared/ui";
import { XLogo } from "@/assets/icons";
import { useCallback } from "react";
import { XIcon } from "lucide-react";
import { useProfile } from "@/hooks/use-profile";
import { getGetOwnProfileQueryKey, useDisconnectTwitter } from "@/api";
import { useQueryClient } from "@tanstack/react-query";
import { token } from "@/state/client/auth";

const API_URL = import.meta.env.VITE_API_URL;

const TwitterLinkButton = () => {
  const { data: profile } = useProfile();
  const isTwitterLinked = !!profile?.twitterId;
  const queryClient = useQueryClient();

  const { mutate: disconnect, isPending: isDisconnecting } =
    useDisconnectTwitter({
      mutation: {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: getGetOwnProfileQueryKey(),
          });
        },
      },
    });

  const handleLinkTwitter = useCallback(() => {
    const jwt = token.getToken();
    if (!jwt) {
      console.error("No JWT token found");
      return;
    }

    // Редирект на OAuth endpoint с JWT в query (будет перенесён в cookie)
    window.location.href = `${API_URL}/api/auth/twitter/connect?token=${jwt}`;
  }, []);

  const handleUnlinkTwitter = useCallback(() => {
    disconnect();
  }, [disconnect]);

  return (
    <>
      {!isTwitterLinked && (
        <Button size="lg" fullWidth onClick={handleLinkTwitter}>
          <XLogo />
          Link Twitter
        </Button>
      )}

      {isTwitterLinked && (
        <div className="flex items-center gap-3 justify-between w-full">
          <div className="flex items-center gap-2">
            <XLogo />
            <Text variant="md">@{profile?.twitterUsername}</Text>
          </div>

          <DropdownMenu>
            <DropdownMenu.Trigger asChild>
              <Button variant="ghost" size="icon" disabled={isDisconnecting}>
                <XIcon />
              </Button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content className="p-3 space-y-3">
              <Text variant="xs">
                Are you sure you want to unlink your Twitter account?
              </Text>
              <Button
                variant="destructive"
                size="sm"
                onClick={handleUnlinkTwitter}
                disabled={isDisconnecting}
                fullWidth
              >
                Unlink
              </Button>
            </DropdownMenu.Content>
          </DropdownMenu>
        </div>
      )}
    </>
  );
};

export { TwitterLinkButton };
