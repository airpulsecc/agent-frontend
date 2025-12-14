import { useState, type FC } from "react";
import { useAccount } from "wagmi";
import { useQueryClient } from "@tanstack/react-query";
import type { VariantProps } from "class-variance-authority";

import { TwitterLinkButton } from "../twitter-link/button";
import { ConnectButton } from "../connect/button";
import { useProfile } from "@/hooks/use-profile";
import { getGetOwnProfileQueryKey, useSubmitWhitelist } from "@/api";
import { cn } from "@/lib/utils";
import {
  SlideToUnlock,
  ShimmeringText,
  Input,
  Card,
  Text,
  type cardVariants,
} from "@/shared/ui";

type Props = {
  variant?: VariantProps<typeof cardVariants>["variant"];
  className?: string;
  contentClassName?: string;
};

const AuthForm: FC<Props> = ({
  variant = "outline",
  className,
  contentClassName,
}) => {
  const { isConnected } = useAccount();
  const { data: profile } = useProfile();
  const queryClient = useQueryClient();
  const [username, setUsername] = useState("");

  const { mutate: submitWhitelist, isPending } = useSubmitWhitelist({
    mutation: {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: getGetOwnProfileQueryKey() });
      },
    },
  });

  // Если в whitelist — не рендерим форму
  if (profile?.isInWhitelist) return null;

  const isTwitterLinked = !!profile?.twitterId;
  const isUsernameValid = username.trim().length >= 4;
  const canSubmit = isUsernameValid && isTwitterLinked && !isPending;

  const handleSubmit = () => {
    submitWhitelist({ data: { name: username.trim() } });
  };

  return (
    <Card className={cn("w-full max-w-md", className)} variant={variant}>
      {!isConnected ? (
        // Шаг 1: подключение кошелька
        <>
          <Card.Header>
            <Card.Title>Join the whitelist</Card.Title>
          </Card.Header>
          <Card.Content className={cn("space-y-6", contentClassName)}>
            <Text variant="sm" className="text-muted-foreground">
              Connect your wallet to join
            </Text>
            <ConnectButton fullWidth />
          </Card.Content>
        </>
      ) : (
        // Шаг 2: форма регистрации
        <>
          <Card.Header>
            <Card.Title>Almost there!</Card.Title>
            <Card.Description>
              Fill in your username and link Twitter to complete registration
              join the whitelist
            </Card.Description>
          </Card.Header>
          <Card.Content className={cn("space-y-6", contentClassName)}>
            <Input
              label="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              minLength={4}
              placeholder="Min 4 characters"
              required
            />
            <TwitterLinkButton />
          </Card.Content>
          <Card.Footer>
            <SlideToUnlock
              className="mx-auto"
              onUnlock={handleSubmit}
              disabled={!canSubmit}
            >
              <SlideToUnlock.Track>
                <SlideToUnlock.Text>
                  {({ isDragging }) => (
                    <ShimmeringText text="Confirm" isStopped={isDragging} />
                  )}
                </SlideToUnlock.Text>
                <SlideToUnlock.Handle />
              </SlideToUnlock.Track>
            </SlideToUnlock>
          </Card.Footer>
        </>
      )}
    </Card>
  );
};

export { AuthForm };
