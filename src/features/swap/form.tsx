import { type FC } from 'react'

import { PrepareStep } from './steps/prepare'
import { PreviewStep } from './steps/preview'
import { Progress } from './steps/progress'
import type { SwapFormStepType, SwapStatusType } from './swap-info.hook'
import type { TransactionResponseType } from '@/api'

type SwapFormProps = {
  // Form state
  actionType: 'swap' | 'bridge'
  step: SwapFormStepType
  nextFromPrepare: () => void
  setAmount: (amount: string) => void
  amount: string

  // API data (can be null during loading or error)
  data: TransactionResponseType | undefined
  isLoading: boolean
  isFetching: boolean

  // Operation states
  isApproving: boolean
  isPending: boolean
  isOperationInProgress: boolean

  // Callbacks
  onSubmit: () => void

  // Transaction state
  txHash?: string
  txStatus?: 'idle' | 'pending' | 'success' | 'error'
}

const SwapForm: FC<SwapFormProps> = ({
  actionType,
  amount,
  data,
  isApproving,
  isPending,
  isOperationInProgress,
  onSubmit,
  txHash,
  txStatus,
  nextFromPrepare,
  setAmount,
  step,
  isLoading,
  isFetching,
}) => {
  if (!data) {
    return <PrepareStep.Skeleton />
  }

  const { fromToken, toToken, minReceiveAmount, slippage, explorer } = data

  return (
    <div className="space-y-4">
      <PrepareStep
        amount={amount}
        actionType={actionType}
        fromToken={fromToken}
        toToken={toToken}
        onAmountChange={setAmount}
        next={nextFromPrepare}
        isUpdating={isFetching && !isLoading}
        isOperationInProgress={isOperationInProgress}
        txStatus={txStatus}
      />

      {(step === 'preview' || step === 'progress') && (
        <PreviewStep
          fromToken={fromToken}
          toToken={toToken}
          minReceiveAmount={minReceiveAmount}
          slippage={slippage}
          isUpdating={isFetching && !isLoading}
          amount={amount}
          next={onSubmit}
          isApproving={isApproving}
          isPending={isPending}
          txStatus={txStatus}
        />
      )}

      {step === 'progress' && (
        <Progress
          status={txStatus === 'error' ? 'error' : (txStatus as SwapStatusType)}
          recieveToken={toToken}
          explorer={explorer}
          txHash={txHash as `0x${string}` | undefined}
        />
      )}
    </div>
  )
}

export { SwapForm }
