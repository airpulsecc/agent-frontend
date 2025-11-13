import { memo, type ComponentPropsWithoutRef, type FC } from 'react'

import { NumericFormat } from 'react-number-format'

type OverrideProps<T, R> = Omit<T, keyof R> & R

type Props = OverrideProps<
  ComponentPropsWithoutRef<typeof NumericFormat>,
  {
    currency?: string
    hideCurrency?: boolean
    showFullValue?: boolean
    value?: number | null
  }
>

const NumberFormat: FC<Props> = ({
  displayType = 'text',
  thousandSeparator = ',',
  currency,
  fixedDecimalScale = true,
  hideCurrency = false,
  decimalScale,
  value,
  prefix,
  suffix,
  ...props
}) => {
  return (
    <NumericFormat
      fixedDecimalScale={fixedDecimalScale}
      thousandSeparator={thousandSeparator}
      displayType={displayType}
      prefix={
        currency && !hideCurrency
          ? `${currency} ${prefix ? prefix : ''}`
          : prefix
      }
      suffix={suffix ? ` ${suffix}` : void 0}
      renderText={(value) => value}
      decimalScale={decimalScale}
      value={value}
      {...props}
    />
  )
}

const Component = memo(NumberFormat)

export { Component as NumberFormat }
