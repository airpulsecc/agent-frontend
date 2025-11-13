import { NumericInput, Skeleton, Text, NumberFormat } from "@/shared/ui";
import { useCallback, useMemo, type FC } from "react";

import { TokenInfo } from "./token-info";
import { findChainNameById } from "@/lib/lifi";
import type { TokenType } from "@/api";
import { formatTokenAmount, parseTokenAmount } from "@/lib/format-token-amount";

type Props = {
  readOnly?: boolean;
  isUpdating: boolean;
  name: string;
  label?: string;
  /** Value in wei (smallest units) */
  value?: string;
  /** Callback receives value in wei (smallest units) */
  onChange?: (valueInWei: string) => void;
  token: TokenType | undefined;
};

const SwapInput: FC<Props> = ({
  name,
  label,
  value,
  onChange,
  token,
  readOnly,
  isUpdating,
}) => {
  // Convert wei to human-readable format for display
  const visibleValue = useMemo(() => {
    return formatTokenAmount(value, token?.decimals || 0);
  }, [value, token?.decimals]);

  // Convert human-readable input back to wei
  const handleChange = useCallback(
    (readableValue: string) => {
      if (!onChange || !token?.decimals) return;

      const weiValue = parseTokenAmount(readableValue, token?.decimals || 0);
      onChange(weiValue);
    },
    [onChange, token?.decimals]
  );

  return (
    <div className="flex bg-card w-full justify-between items-center gap-y-2 rounded-xl p-4 border-card-border border">
      <label htmlFor={name} className="sr-only">
        {label}
      </label>

      <div className="flex flex-col gap-y-2">
        {/* Editable numeric input */}
        {onChange ? (
          <NumericInput
            value={visibleValue}
            placeholder="0.1"
            readOnly={readOnly}
            className="w-full outline-none bg-transparent"
            onValueChange={({ value }) => handleChange(value)}
          />
        ) : value ? (
          /* Read-only numeric value */
          <NumericInput
            value={visibleValue}
            placeholder="1"
            decimalScale={7}
            readOnly={true}
            className="w-full outline-none bg-transparent"
          />
        ) : (
          <Skeleton className="w-[100px] h-[21px]" />
        )}

        {!isUpdating ? (
          <Text variant="sm" color="secondary">
            <NumberFormat
              value={Number(token?.amountUSD)}
              displayType="text"
              thousandSeparator=","
              decimalScale={4}
              fixedDecimalScale
              currency="$"
            />
          </Text>
        ) : (
          <Skeleton className="w-[80px] h-[21px]" />
        )}
      </div>

      <TokenInfo
        icon={token?.logo || ""}
        symbol={token?.symbol || ""}
        network={findChainNameById(token?.chainId || 0)}
      />
    </div>
  );
};

export { SwapInput };
