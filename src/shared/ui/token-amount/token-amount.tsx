import { memo, type FC, type ComponentPropsWithoutRef } from 'react'
import { NumberFormat } from '../number-format'
import { formatTokenAmountToNumber } from '@/lib/format-token-amount'

type Props = Omit<ComponentPropsWithoutRef<typeof NumberFormat>, 'value'> & {
  /** Token amount in wei (smallest units) */
  weiValue: string | undefined | null
  /** Token decimals (e.g., 18 for ETH, 6 for USDC) */
  decimals: number
  /** Token symbol to display as suffix (e.g., 'ETH', 'USDC') */
  symbol?: string
}

/**
 * Component for displaying token amounts with automatic wei → readable conversion
 *
 * @example
 * // Display ETH amount
 * <TokenAmount
 *   weiValue="1500000000000000000"
 *   decimals={18}
 *   symbol="ETH"
 * />
 * // Renders: "1.5 ETH"
 *
 * @example
 * // Display USDC amount with custom formatting
 * <TokenAmount
 *   weiValue="1500000"
 *   decimals={6}
 *   symbol="USDC"
 *   decimalScale={2}
 *   currency="$"
 * />
 * // Renders: "$1.50 USDC"
 */
const TokenAmount: FC<Props> = ({
  weiValue,
  decimals,
  symbol,
  suffix,
  ...props
}) => {
  const value = formatTokenAmountToNumber(weiValue, decimals)

  return (
    <NumberFormat
      value={value}
      suffix={symbol ? symbol : suffix}
      displayType="text"
      thousandSeparator=","
      {...props}
    />
  )
}

const Component = memo(TokenAmount)

export { Component as TokenAmount }
