import {
  Avatar,
  TokenAmount,
  Skeleton,
  Text,
  Card,
  Label,
  Badge,
  Button,
  NumberFormat,
} from '@/shared/ui'
import type { FC } from 'react'
import { ArrowRightCircleIcon } from 'lucide-react'
import { DataList } from '@/shared/ui/data-list/data-list'
import type { TokenType } from '@/api'

type Props = {
  fromToken: TokenType
  toToken: TokenType
  minReceiveAmount: string
  slippage: number | void
  isUpdating: boolean
  amount: string
  next: () => void
  isApproving: boolean
  isPending: boolean
  txStatus?: 'idle' | 'pending' | 'success' | 'error'
}

const PreviewStep: FC<Props> = ({
  fromToken,
  toToken,
  minReceiveAmount,
  slippage,
  isUpdating,
  next,
  isApproving,
  isPending,
  txStatus,
  amount,
}) => {
  // Compute button text based on operation state
  const buttonText = isApproving
    ? 'Approving...'
    : isPending || txStatus === 'pending'
      ? 'Confirming...'
      : 'Confirm'

  // Disable button during operations, data updates, receipt confirmation, or after completion
  const isButtonDisabled =
    isUpdating ||
    isApproving ||
    isPending ||
    txStatus === 'pending' ||
    txStatus === 'success' ||
    txStatus === 'error'
  return (
    <Card className="w-full" variant="bordered">
      <Card.Header>
        <Card.Title>Review transaction</Card.Title>
        <Card.Description>Swapping via LiFi</Card.Description>
      </Card.Header>

      <Card.Content className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-x-2">
            {fromToken.logo ? (
              <Avatar size="sm">
                <Avatar.Image
                  src={fromToken.logo}
                  alt={fromToken.name}
                  size="sm"
                />
                <Avatar.Fallback size="sm">{fromToken.name}</Avatar.Fallback>
              </Avatar>
            ) : (
              <Skeleton className="size-10 rounded-full" />
            )}

            <div className="space-y-1">
              <Text variant="xs">{fromToken.symbol}</Text>

              {!isUpdating ? (
                <Text variant="xs">
                  <TokenAmount
                    weiValue={amount}
                    decimals={fromToken.decimals}
                    hideCurrency
                    fixedDecimalScale
                  />
                </Text>
              ) : (
                <Skeleton className="w-[60px] h-[21px]" />
              )}
            </div>
          </div>

          <ArrowRightCircleIcon className="size-5 text-secondary" />

          <div className="flex items-center gap-x-2">
            {toToken.logo ? (
              <Avatar size="sm">
                <Avatar.Image src={toToken.logo} alt={toToken.name} size="sm" />
                <Avatar.Fallback size="sm">{toToken.name}</Avatar.Fallback>
              </Avatar>
            ) : (
              <Skeleton className="size-10 rounded-full" />
            )}

            <div className="space-y-1">
              <Text variant="xs" align="end">
                {toToken.symbol}
              </Text>

              {!isUpdating ? (
                <Text variant="xs" align="end">
                  <TokenAmount
                    weiValue={toToken.amount}
                    decimals={toToken.decimals}
                    hideCurrency
                    fixedDecimalScale
                  />
                </Text>
              ) : (
                <Skeleton className="w-[60px] h-[21px]" />
              )}
            </div>
          </div>
        </div>

        <div className="w-full h-[1px] bg-card" />

        <DataList>
          <DataList.Item
            label={<DataList.Label>Minimum received</DataList.Label>}
            value={
              <DataList.Value className="flex gap-1 items-center">
                {!isUpdating ? (
                  <Text variant="xs" color="main">
                    <TokenAmount
                      weiValue={minReceiveAmount}
                      decimals={toToken.decimals}
                      symbol={toToken.symbol}
                      decimalScale={4}
                      fixedDecimalScale
                      hideCurrency
                    />
                  </Text>
                ) : (
                  <Skeleton className="w-[70px] h-[21px]" />
                )}
              </DataList.Value>
            }
          />
          <DataList.Item
            label={<DataList.Label>Slippage</DataList.Label>}
            value={
              <DataList.Value>
                {isUpdating ? (
                  <Skeleton className="w-[70px] h-[21px]" />
                ) : (
                  <Text variant="xs" color="main">
                    <NumberFormat
                      value={Number(slippage)}
                      displayType="text"
                      thousandSeparator=","
                      decimalScale={2}
                      fixedDecimalScale
                      hideCurrency
                    />
                    %
                  </Text>
                )}
              </DataList.Value>
            }
          />
          <DataList.Item
            label={<DataList.Label>Munar fee</DataList.Label>}
            value={
              <DataList.Value>
                <Badge variant="success" size="sm">
                  0.0%
                </Badge>
              </DataList.Value>
            }
          />
        </DataList>
      </Card.Content>

      <Card.Footer>
        <Button disabled={isButtonDisabled} onClick={next} fullWidth>
          {buttonText}
        </Button>
      </Card.Footer>
    </Card>
  )
}

export { PreviewStep }
