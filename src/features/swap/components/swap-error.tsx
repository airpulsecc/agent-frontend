import { Card } from '@/shared/ui'
import type { FC } from 'react'

type SwapErrorProps = {
  error: string | null
}

export const SwapError: FC<SwapErrorProps> = ({ error }) => {
  if (!error) return null

  return (
    <Card
      className="text-destructive p-3 bg-destructive/10 border border-destructive rounded-lg"
      variant="bordered"
    >
      <Card.Content>
        <div className="flex items-start justify-between gap-2">
          <span className="text-sm">{error}</span>
        </div>
      </Card.Content>
    </Card>
  )
}
