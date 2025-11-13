import { useProfile } from '@/providers/profile-provider'
import { AuthForm } from '../auth'
import { Avatar, Badge, Card, Text } from '@/shared/ui'
import { Alert } from '@/shared/ui/alert'
import { BadgeCheckIcon } from 'lucide-react'
import { formatAddress } from '@/shared/helpers'
import { TwitterLinkButton } from '../twitter-link/button'

const ProfileContainer = () => {
  const { address, isConnected, twitterInfo } = useProfile()

  return (
    <div className="container mx-auto flex grow flex-col items-center pt-15 px-4">
      <div className="w-full max-w-3xl">
        {!isConnected && <AuthForm className="mx-auto" />}

        {isConnected && (
          <div className="space-y-3">
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
                  <Text variant="md">{formatAddress(address!)}</Text>
                </div>

                <Badge variant="outline">{formatAddress(address!)}</Badge>
              </Card.Content>
            </Card>

            <Card className="w-full" variant="bordered">
              <Card.Content>
                <TwitterLinkButton />
              </Card.Content>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}

export { ProfileContainer }
