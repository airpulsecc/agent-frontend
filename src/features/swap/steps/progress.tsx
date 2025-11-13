import type { FC } from "react";

import { CircleXIcon, CheckCircle2Icon, Loader2Icon } from "lucide-react";

import { Avatar, Button, Card, TokenAmount, Text } from "@/shared/ui";
import type { TokenType } from "@/api";
import { findChainNameById } from "@/lib/lifi";
import type { SwapStatusType } from "../swap-info.hook";

type Props = {
  status: SwapStatusType;
  recieveToken: TokenType;
  explorer: string;
  txHash: `0x${string}` | undefined;
};

const ProgressStatus: FC = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-y-4">
      <Loader2Icon className="size-10 animate-spin" />

      <Text variant="lg" color="main">
        Transaction processing...
      </Text>
    </div>
  );
};

const ProgressSuccess: FC = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-y-4">
      <CheckCircle2Icon className="size-10 text-success" />

      <Text variant="lg" color="main">
        Transaction successful
      </Text>
    </div>
  );
};

const ProgressError: FC = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-y-4">
      <CircleXIcon className="size-10 text-destructive" />

      <Text variant="lg" color="main">
        Transaction failed
      </Text>
    </div>
  );
};

const Progress: FC<Props> = ({ status, recieveToken, explorer, txHash }) => {
  return (
    <Card className="w-full" variant="bordered">
      {status === "pending" && <ProgressStatus />}
      {status === "success" && <ProgressSuccess />}
      {status === "error" && <ProgressError />}

      <Card.Content>
        <div className="flex items-center gap-x-2 justify-center">
          <Avatar size="sm">
            <Avatar.Image
              src={recieveToken.logo}
              alt={recieveToken.symbol}
              size="sm"
            />
            <Avatar.Fallback size="sm">{recieveToken.symbol}</Avatar.Fallback>
          </Avatar>

          <div>
            <div className="flex gap-x-1">
              <Text variant="lg" color="main">
                <TokenAmount
                  weiValue={recieveToken.amount}
                  decimals={recieveToken.decimals}
                  symbol={recieveToken.symbol}
                  decimalScale={recieveToken.decimals}
                />
              </Text>
            </div>

            <Text variant="md" color="secondary">
              on {` `}
              {findChainNameById(recieveToken.chainId)}
            </Text>
          </div>
        </div>
      </Card.Content>

      <Card.Footer>
        <Button
          size="sm"
          fullWidth
          disabled={!txHash || status === "pending"}
          onClick={() => {
            if (txHash) {
              window.open(`${explorer}/tx/${txHash}`, "_blank");
            }
          }}
        >
          View transaction
        </Button>
      </Card.Footer>
    </Card>
  );
};

export { Progress };
