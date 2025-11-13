import { SuggestionsList, Text } from '@/shared/ui'
import { AccessBanner } from './access-banner'
import { SwapContainer } from '../swap/container'

const payload = {
  actionType: 'swap',
  amount: '1000000',
  fromAsset: 'USDC',
  fromChain: 'base',
  toAsset: 'ETH',
  toChain: 'base',
  toAddress: '0x72D2Af8EF64196F8A9267803b775Bf2342910083',
  eoaAddress: '0x72D2Af8EF64196F8A9267803b775Bf2342910083',
}

const ChatContainer = () => {
  return (
    <div className="max-w-[850px] mx-auto flex grow flex-col px-4 w-full pb-10">
      <div className="space-y-6 flex mb-11 flex-col justify-center items-center">
        <Text variant="3xl" align="center">
          Welcome to Munar!
        </Text>
        <Text variant="basic" align="center" color="secondary">
          Your AI copilot for Web3. Swap, bridge, and explore across 599
          blockchains.
        </Text>
      </div>

      <div className="space-y-6">
        {/* <AccessBanner className="mx-auto" />

          <SuggestionsList /> */}

        <SwapContainer
          actionType={payload.actionType as 'swap' | 'bridge'}
          initialAmount={payload.amount}
          fromAsset={payload.fromAsset}
          fromChain={payload.fromChain}
          toAsset={payload.toAsset}
          toChain={payload.toChain}
          address={payload.toAddress}
        />
      </div>
    </div>
  )
}

export { ChatContainer }
