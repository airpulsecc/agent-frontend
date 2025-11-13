import { Link2 } from 'lucide-react'
import { UnstyledButton } from '../../button'
import { Text } from '../../text'

// Могут быть саджесты разных типов:
// Polymarket
// Onchain

// const SuggestionType = {
//   POLYMARKET: 'polymarket',
//   ONCHAIN: 'onchain',
// } as const

// type SuggestionType = (typeof SuggestionType)[keyof typeof SuggestionType]

// type Props = {
//   type: SuggestionType
// }

const Suggestion = () => {
  return (
    <UnstyledButton className="space-y-2.5 border rounded-xl py-3 px-4 hover:border-primary/80 transition-all duration-300">
      <Text
        variant="basic"
        align="start"
        color="secondary"
        className="flex items-center gap-2"
      >
        Onchain
        <Link2 className="size-4" />
      </Text>
      <Text variant="sm" align="start">
        Swap 0.01 ETH to USDC on Base
      </Text>
    </UnstyledButton>
  )
}

const SuggestionsList = () => {
  return (
    <div className="space-y-3">
      <Text variant="md" color="secondary" className="px-4">
        Just try it:
      </Text>
      <div className="flex gap-2">
        <Suggestion />
        <Suggestion />
        <Suggestion />
      </div>
    </div>
  )
}

export { Suggestion, SuggestionsList }
