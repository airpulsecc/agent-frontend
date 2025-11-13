import { formatUnits, parseUnits } from 'viem'

/**
 * Safely converts wei (smallest units) to human-readable format
 * @param weiValue - Value in wei (smallest units) as string
 * @param decimals - Token decimals (e.g., 18 for ETH, 6 for USDC)
 * @returns Human-readable string or '0' on error
 *
 * @example
 * formatTokenAmount('1000000000000000000', 18) // '1.0'
 * formatTokenAmount('1000000', 6) // '1.0'
 */
export const formatTokenAmount = (
  weiValue: string | undefined | null,
  decimals: number,
): string => {
  if (!weiValue || !decimals) return '0'

  try {
    return formatUnits(BigInt(weiValue), decimals)
  } catch (error) {
    console.error('Failed to format token amount:', {
      weiValue,
      decimals,
      error,
    })
    return '0'
  }
}

/**
 * Safely converts human-readable format to wei (smallest units)
 * @param readableValue - Human-readable value as string (e.g., '1.5')
 * @param decimals - Token decimals (e.g., 18 for ETH, 6 for USDC)
 * @returns Wei value as string or '0' on error
 *
 * @example
 * parseTokenAmount('1.5', 18) // '1500000000000000000'
 * parseTokenAmount('1.5', 6) // '1500000'
 */
export const parseTokenAmount = (
  readableValue: string | undefined | null,
  decimals: number,
): string => {
  if (!readableValue || readableValue === '' || !decimals) return '0'

  try {
    return parseUnits(readableValue, decimals).toString()
  } catch (error) {
    console.error('Failed to parse token amount:', {
      readableValue,
      decimals,
      error,
    })
    return '0'
  }
}

/**
 * Converts wei to number for use with NumberFormat component
 * @param weiValue - Value in wei as string
 * @param decimals - Token decimals
 * @returns Number or 0 on error
 *
 * @example
 * formatTokenAmountToNumber('1000000000000000000', 18) // 1.0
 */
export const formatTokenAmountToNumber = (
  weiValue: string | undefined | null,
  decimals: number,
): number => {
  const formatted = formatTokenAmount(weiValue, decimals)
  return Number(formatted)
}
