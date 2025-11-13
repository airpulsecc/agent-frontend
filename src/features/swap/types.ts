type Token = {
  name: string
  symbol: string | undefined
  amount: string
  logo?: string
  decimals: number | undefined
  chainId?: number
}

type TokenWithAmountUSD = Token & {
  amountUSD?: string
}

export type { Token, TokenWithAmountUSD }
