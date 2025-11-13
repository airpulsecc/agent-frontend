import { useCallback, useState } from 'react'

type SwapInfo = {
  step: SwapFormStepType

  // Prepare step
  nextFromPrepare: () => void

  // Preview step
  nextFromPreview: () => void

  // Amount in wei
  amount: string
  setAmount: (amount: string) => void

  // Transaction state
  error: string | undefined
  setError: (error: string | undefined) => void
}

const useSwapInfo = ({ fromAmount }: { fromAmount: string }): SwapInfo => {
  const [step, setStep] = useState<SwapFormStepType>(SwapFormSteps.PREPARE)
  const [amount, setAmount] = useState<string>(fromAmount)

  // Transaction state
  const [error, setError] = useState<string | undefined>(undefined)

  // Prepare step
  const nextFromPrepare = useCallback(() => {
    setStep(SwapFormSteps.PREVIEW)
  }, [])

  // Preview step
  const nextFromPreview = useCallback(() => {
    setStep(SwapFormSteps.PROGRESS)
  }, [])

  return {
    step,
    amount,
    setAmount,
    nextFromPrepare,
    nextFromPreview,
    error,
    setError,
  }
}

const SwapFormSteps = {
  PREPARE: 'prepare',
  PREVIEW: 'preview',
  PROGRESS: 'progress',
} as const

type SwapFormStepType = (typeof SwapFormSteps)[keyof typeof SwapFormSteps]

const SwapStatus = {
  PENDING: 'pending',
  SUCCESS: 'success',
  ERROR: 'error',
} as const

type SwapStatusType = (typeof SwapStatus)[keyof typeof SwapStatus]

export { useSwapInfo, type SwapFormStepType, type SwapStatusType }
