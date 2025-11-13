import { TwitterLinkButton } from '../twitter-link/button'
import { ConnectButton } from '../connect/button'

import {
  SlideToUnlock,
  ShimmeringText,
  Input,
  Label,
  Card,
  type cardVariants,
} from '@/shared/ui'
import type { VariantProps } from 'class-variance-authority'
import type { FC } from 'react'
import { cn } from '@/lib/utils'
import { useProfile } from '@/providers/profile-provider'

type Props = {
  variant?: VariantProps<typeof cardVariants>['variant']
  className?: string
  withHeader?: boolean
  contentClassName?: string
}

const AuthForm: FC<Props> = ({
  variant = 'outline',
  className,
  withHeader = true,
  contentClassName,
}) => {
  return (
    <Card
      className={cn('w-full max-w-md', className, !withHeader && 'pt-0')}
      variant={variant}
    >
      {withHeader && (
        <Card.Header>
          <Card.Title>Join to whitelist and create profile</Card.Title>
        </Card.Header>
      )}

      <Card.Content className={cn('space-y-8', contentClassName)}>
        <Input label="Username" required />

        <div className="space-y-2">
          <Label required>Connect Wallet</Label>
          <ConnectButton />
        </div>

        <div className="space-y-2">
          <Label required>Connect Twitter</Label>

          <TwitterLinkButton />
        </div>
      </Card.Content>

      <Card.Footer>
        <SlideToUnlock
          className="mx-auto"
          onUnlock={() => {
            alert('Unlocked')
          }}
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
    </Card>
  )
}

export { AuthForm }
