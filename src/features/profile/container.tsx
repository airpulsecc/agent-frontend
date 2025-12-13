import { useAccount } from "wagmi";
import { useProfile } from "@/hooks/use-profile";
import { AuthForm } from "../auth";
import { Avatar, Badge, Card, Text } from "@/shared/ui";
import { Alert } from "@/shared/ui/alert";
import { BadgeCheckIcon, Hourglass } from "lucide-react";
import { formatAddress } from "@/shared/helpers";
import { TwitterLinkButton } from "../twitter-link/button";
import { type FC } from "react";

const ProfileContainer: FC = () => {
  const { address } = useAccount();
  const { data: profile } = useProfile();

  const isPending = profile?.whitelistStatus === "pending";

  return (
    <div className="w-full max-w-3xl space-y-3">
      {/* Форма скрывается сама когда isInWhitelist */}
      {!isPending && !profile?.isInWhitelist && (
        <AuthForm className="mx-auto" />
      )}

      {/* Pending UI */}
      {isPending && (
        <Card className="w-full text-center" variant="bordered">
          <Card.Content className="flex flex-col items-center gap-6 py-10">
            {/* 
               PLACEHOLDER: Waiting/Processing Image
               Suggestion: A 3D hourglass, a robotic arm stamping a paper, or a 'VIP List' clipboard.
            */}
            <div className="flex h-32 w-32 items-center justify-center rounded-full bg-secondary/20">
              <Hourglass className="h-12 w-12 animate-pulse text-primary" />
            </div>

            <div className="mx-auto max-w-md space-y-2">
              <Text variant="2xl" className="font-semibold">
                Verification in Progress
              </Text>
              <Text className="text-muted-foreground">
                We've received your application. Please wait for approval. Hang
                tight!
              </Text>
            </div>
          </Card.Content>
        </Card>
      )}

      {/* Whitelist UI */}
      {profile?.isInWhitelist && (
        <>
          <Alert variant="primary" className="text-primary">
            <BadgeCheckIcon />
            <Alert.Title>You're in the whitelist</Alert.Title>
            <Alert.Description>
              Stay tuned for updates and new features.
            </Alert.Description>
          </Alert>

          <Card className="w-full" variant="bordered">
            <Card.Content className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar>
                  <Avatar.Fallback>
                    {address?.slice(0, 2).toUpperCase()}
                  </Avatar.Fallback>
                </Avatar>
                <Text variant="md">{profile?.name}</Text>
              </div>

              <Badge variant="outline">{formatAddress(address!)}</Badge>
            </Card.Content>
          </Card>

          <Card className="w-full" variant="bordered">
            <Card.Content>
              <TwitterLinkButton />
            </Card.Content>
          </Card>
        </>
      )}
    </div>
  );
};

export { ProfileContainer };
