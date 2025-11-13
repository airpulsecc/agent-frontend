import { Button, Text } from '@/shared/ui'
import { XLogo } from '@/assets/icons'
import { useCallback } from 'react'
import { XIcon } from 'lucide-react'
import { useProfile } from '@/providers/profile-provider'
import { getGetOwnProfileQueryKey, useDisconnectTwitter } from '@/api'
import { useQueryClient } from '@tanstack/react-query'
import { token } from '@/state/client/auth'

const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001'

const TwitterLinkButton = () => {
  const { twitterInfo, isTwitterLinked } = useProfile()
  const queryClient = useQueryClient()

  const { mutate: disconnect, isPending: isDisconnecting } =
    useDisconnectTwitter({
      mutation: {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: getGetOwnProfileQueryKey(),
          })
        },
      },
    })

  const handleLinkTwitter = useCallback(() => {
    const jwt = token.getToken()
    if (!jwt) {
      console.error('No JWT token found')
      return
    }

    // Редирект на OAuth endpoint с JWT в query (будет перенесён в cookie)
    window.location.href = `${API_URL}/api/auth/twitter/connect?token=${jwt}`
  }, [])

  const handleUnlinkTwitter = useCallback(() => {
    disconnect()
  }, [disconnect])

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
            <Text variant="md">@{twitterInfo?.username}</Text>
          </div>

          <Button
            variant="ghost"
            size="icon"
            onClick={handleUnlinkTwitter}
            disabled={isDisconnecting}
          >
            <XIcon />
          </Button>
        </div>
      )}
    </>
  )
}

export { TwitterLinkButton }
