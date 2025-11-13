import { processTransaction, type TransactionPayloadType } from "@/api";
import { SwapForm } from "./form";
import { SwapError } from "./components/swap-error";
import { useQuery } from "@tanstack/react-query";
import { useMemo, type FC } from "react";
import { useSwapInfo } from "./swap-info.hook";
import { useDebounce } from "@/hooks/debounce";
import {
  useChainId,
  useSendTransaction,
  useSwitchChain,
  useWaitForTransactionReceipt,
} from "wagmi";
import { useTokenApproval } from "./hooks/approval";

type Props = {
  actionType: "swap" | "bridge";
  initialAmount: string;
  fromAsset: string;
  fromChain: string;
  toAsset: string;
  toChain: string;
  address: string;
};

const SwapContainer: FC<Props> = ({
  actionType,
  initialAmount,
  fromAsset,
  fromChain,
  toAsset,
  toChain,
  address,
}) => {
  const chainId = useChainId();
  const { switchChainAsync } = useSwitchChain();

  const {
    step,
    nextFromPrepare,
    nextFromPreview,
    setAmount,
    amount,
    error,
    setError,
  } = useSwapInfo({
    fromAmount: initialAmount,
  });
  const debouncedAmount = useDebounce(amount, 300);

  const payload: TransactionPayloadType = useMemo(() => {
    return {
      actionType,
      amount: debouncedAmount,
      fromAsset,
      fromChain,
      toAsset,
      toChain,
      toAddress: address,
      eoaAddress: address,
    };
  }, [
    actionType,
    debouncedAmount,
    fromAsset,
    fromChain,
    toAsset,
    toChain,
    address,
  ]);

  const {
    sendTransactionAsync,
    isPending,
    data: txHash,
    isError,
  } = useSendTransaction({
    mutation: {
      onMutate: () => {
        nextFromPreview();
      },
      onError: (error) => {
        setError((error as any)?.shortMessage);
      },
    },
  });

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["transaction", payload],
    queryFn: () => processTransaction(payload),
    enabled: Number(debouncedAmount) > 0,
    placeholderData: (previousData) => previousData,
    refetchOnWindowFocus: !isPending && !isError,
    refetchInterval: isPending || step === "progress" ? false : 10000,
  });

  const { needsApproval, approve, isApproving, isApproveError } =
    useTokenApproval(
      data?.fromToken.address || "",
      data?.transaction.approvalAddress || undefined,
      debouncedAmount,
      address
    );

  const { status: receiptStatus, error: receiptError } =
    useWaitForTransactionReceipt({
      hash: txHash,
      confirmations: 3,
      query: {
        refetchOnWindowFocus: false,
        gcTime: Infinity,
        staleTime: Infinity,
      },
    });

  // Combined operation state (includes approval, transaction send, and receipt confirmation)
  const isOperationInProgress =
    isApproving || isPending || (txHash && receiptStatus === "pending");

  const handleSubmit = async () => {
    if (!data) return;

    // 1. Switch chain if needed
    try {
      if (data.transaction.data.chainId !== chainId) {
        await switchChainAsync({
          chainId: Number(data.transaction.data.chainId),
        });
      }
    } catch (error) {
      setError("Failed to switch chain");
      return;
    }

    // 2. Approve token if needed
    try {
      if (needsApproval) {
        const approveHash = await approve();
      }
    } catch (error) {
      setError("Failed to approve token");
      return;
    }

    const swapHash = await sendTransactionAsync(data.transaction.data);
  };

  // Compute transaction status for UI
  const txStatus =
    isError || isApproveError
      ? "error"
      : isPending
        ? "pending"
        : txHash
          ? receiptStatus
          : undefined;

  return (
    <div className="w-full max-w-[500px] space-y-4">
      <SwapForm
        actionType={actionType}
        step={step}
        nextFromPrepare={nextFromPrepare}
        setAmount={setAmount}
        amount={amount}
        data={data}
        isLoading={isLoading}
        isFetching={isFetching}
        isApproving={isApproving}
        isPending={isPending}
        isOperationInProgress={isOperationInProgress || false}
        onSubmit={handleSubmit}
        txHash={txHash}
        txStatus={txStatus}
      />

      {error && <SwapError error={error} />}
    </div>
  );
};

export { SwapContainer };
