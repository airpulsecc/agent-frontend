import {
  type ComponentPropsWithoutRef,
  type ComponentRef,
  forwardRef,
} from 'react'

import { NumericFormat, type NumericFormatProps } from 'react-number-format'

type Props = Omit<NumericFormatProps, 'inputRef'> & { currency?: string }

const NumericInput = forwardRef<ComponentRef<'input'>, Props>(
  (
    {
      inputMode = 'decimal',
      allowLeadingZeros = false,
      allowNegative = false,
      thousandSeparator = ',',
      allowedDecimalSeparators = [',', '.'],
      readOnly,
      ...props
    },
    ref,
  ) => {
    return (
      <NumericFormat
        allowedDecimalSeparators={allowedDecimalSeparators}
        inputMode={inputMode}
        allowLeadingZeros={allowLeadingZeros}
        allowNegative={allowNegative}
        thousandSeparator={thousandSeparator}
        getInputRef={ref}
        readOnly={readOnly}
        {...props}
      />
    )
  },
)

NumericInput.displayName = 'NumericInput'

type _ExternalNumericInputProps = Omit<
  ComponentPropsWithoutRef<typeof NumericInput>,
  'value' | 'onValueChange' | 'onChange' | 'size'
>

export { NumericInput }
export type { _ExternalNumericInputProps }
