import { useCallback } from 'react'

import { erc20Abi } from 'viem'
import {
  useReadContract,
  useWriteContract,
  useWaitForTransactionReceipt,
} from 'wagmi'

import { isNativeToken } from '../helpers'

/**
 * Custom hook for handling ERC-20 token approval workflow
 *
 * @param tokenAddress - Address of the ERC-20 token
 * @param spenderAddress - Address that will be approved to spend tokens (from LiFi response)
 * @param amountInWei - Amount to be approved in wei (smallest units)
 * @param userAddress - User's wallet address
 * @returns Object with approval state and functions
 */
export const useTokenApproval = (
  tokenAddress: string,
  spenderAddress: string | undefined,
  amountInWei: string,
  userAddress: string,
): {
  needsApproval: boolean
  approve: () => Promise<`0x${string}`>
  isApproving: boolean
  isApproveError: boolean
  approveError: Error | undefined
  allowance: bigint | undefined
  approveHash: `0x${string}` | undefined
} => {
  const isNative = isNativeToken(tokenAddress)

  // Read current allowance from the token contract
  const { data: allowance } = useReadContract({
    abi: erc20Abi,
    address: tokenAddress as `0x${string}`,
    functionName: 'allowance',
    args: [userAddress as `0x${string}`, spenderAddress as `0x${string}`],
    query: {
      enabled:
        !isNative &&
        !!spenderAddress &&
        !!userAddress &&
        Number(amountInWei) > 0,
      refetchOnWindowFocus: false,
    },
  })

  // Hook for writing approve transaction
  const {
    data: approveHash,
    isPending: isApprovePending,
    isError: isApproveError,
    error: approveError,
    writeContractAsync: approveTokenAsync,
  } = useWriteContract()

  // Wait for approve transaction confirmation
  const { isLoading: isWaitingForApproval } = useWaitForTransactionReceipt({
    hash: approveHash,
    query: {
      enabled: !!approveHash,
    },
  })

  // Calculate if approval is needed
  const amountBigInt = Number(amountInWei) > 0 ? BigInt(amountInWei) : 0n
  const needsApproval =
    !isNative && allowance !== undefined && allowance < amountBigInt

  // Execute approval transaction
  const approve = useCallback(async (): Promise<`0x${string}`> => {
    if (!spenderAddress || isNative) {
      throw new Error('Cannot approve: native token or missing spender')
    }

    const hash = await approveTokenAsync({
      abi: erc20Abi,
      address: tokenAddress as `0x${string}`,
      functionName: 'approve',
      args: [spenderAddress as `0x${string}`, amountBigInt], // Exact amount approval
    })

    return hash
  }, [approveTokenAsync, tokenAddress, spenderAddress, amountBigInt, isNative])

  return {
    needsApproval,
    approve,
    isApproving: isApprovePending || isWaitingForApproval, // Combined state
    isApproveError,
    approveError: approveError ?? undefined,
    allowance,
    approveHash,
  }
}
