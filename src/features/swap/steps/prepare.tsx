import { Button, Card, Skeleton as SkeletonUI } from '@/shared/ui'
import { ArrowDownCircleIcon } from 'lucide-react'
import { SwapInput } from '../components/swap-input'
import type { FC } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { SwapFormSchema, type SwapFormValues } from '../shema'
import { zodResolver } from '@hookform/resolvers/zod'
import type { TokenType } from '@/api'

const SwapFormFields = {
  FROM_AMOUNT: 'fromAmount',
  TO_AMOUNT: 'toAmount',
} as const

type Props = {
  amount: string
  fromToken: TokenType
  toToken: TokenType
  onAmountChange: (value: string) => void
  next: () => void
  isUpdating: boolean
  actionType: 'swap' | 'bridge'
  isOperationInProgress?: boolean
  txStatus?: 'idle' | 'pending' | 'success' | 'error'
}

const PrepareStep: FC<Props> = ({
  amount,
  fromToken,
  toToken,
  onAmountChange,
  next,
  isUpdating,
  actionType,
  isOperationInProgress,
  txStatus,
}) => {
  const {
    control,
    formState: { isValid },
  } = useForm<SwapFormValues>({
    resolver: zodResolver(SwapFormSchema),
    mode: 'onChange',
    defaultValues: {
      fromAmount: amount,
    },
  })

  return (
    <Card className="w-full" variant="bordered">
      <Card.Header>
        <Card.Title>{actionType === 'swap' ? 'Swap' : 'Bridge'}</Card.Title>
      </Card.Header>

      <Card.Content className="space-y-4">
        <Controller
          name={SwapFormFields.FROM_AMOUNT}
          control={control}
          render={({ field }) => (
            <SwapInput
              isUpdating={isUpdating}
              name={SwapFormFields.FROM_AMOUNT}
              label="Amount to send"
              readOnly={isOperationInProgress}
              token={fromToken}
              value={field.value}
              onChange={(val) => {
                field.onChange(val)
                onAmountChange(val)
              }}
            />
          )}
        />

        <div className="flex justify-center text-text-secondary">
          <ArrowDownCircleIcon className="size-5" />
        </div>

        <SwapInput
          isUpdating={isUpdating}
          readOnly
          name={SwapFormFields.TO_AMOUNT}
          label="Amount to receive"
          token={toToken}
          value={isUpdating ? void 0 : toToken.amount}
        />

        <Button
          fullWidth
          size="xl"
          disabled={
            !isValid ||
            isUpdating ||
            isOperationInProgress ||
            txStatus === 'pending' ||
            txStatus === 'success' ||
            txStatus === 'error'
          }
          onClick={next}
        >
          Swap
        </Button>
      </Card.Content>
    </Card>
  )
}

const Skeleton = () => {
  return (
    <div className="border-card-border border p-4 rounded-xl">
      <SkeletonUI className="w-[70px] h-[30px] mb-4" />

      <div className="space-y-4">
        <div className="space-y-4 relative">
          <SwapInput
            value=""
            isUpdating={false}
            name={SwapFormFields.FROM_AMOUNT}
            label="Amount to send"
            token={{
              address: '',
              logo: '',
              symbol: '',
              decimals: 0,
              name: '',
              amount: '',
              chainId: 0,
            }}
          />
          <div className="flex justify-center text-text-secondary">
            <ArrowDownCircleIcon className="size-5" />
          </div>
          <SwapInput
            isUpdating={false}
            readOnly
            value=""
            name={SwapFormFields.TO_AMOUNT}
            label="Amount to receive"
            token={void 0}
          />
        </div>

        <SkeletonUI className="w-full h-[40px]" />
      </div>
    </div>
  )
}

const Component = Object.assign(PrepareStep, {
  Skeleton,
})

export { Component as PrepareStep }
