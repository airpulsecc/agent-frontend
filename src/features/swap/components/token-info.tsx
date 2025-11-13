import { Avatar, Text, Skeleton, NumberFormat } from '@/shared/ui'
import type { FC } from 'react'

type Props = {
  icon?: string
  symbol?: string
  network?: string
}

const TokenInfo: FC<Props> = ({ icon, symbol, network }) => {
  return (
    <div className="flex items-center gap-x-4">
      {icon ? (
        <Avatar size="sm">
          <Avatar.Image src={icon} alt={`${symbol} logo`} size="sm" />
          <Avatar.Fallback size="sm">{symbol}</Avatar.Fallback>
        </Avatar>
      ) : (
        <Skeleton className="size-10 rounded-full" />
      )}
      <div className="flex flex-col text-end">
        {symbol ? (
          <Text variant="basic" color="main">
            {symbol}
          </Text>
        ) : (
          <Skeleton className="w-[60px] h-[20px]" />
        )}

        {network ? (
          <Text variant="md" color="secondary">
            {network}
          </Text>
        ) : (
          <Skeleton className="w-[50px] h-[20px] ms-auto mt-1" />
        )}
      </div>
    </div>
  )
}

export { TokenInfo }
