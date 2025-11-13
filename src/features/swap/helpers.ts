/**
 * Helper to detect whether a token address represents a native currency
 * (LiFi uses 0x000..00 for native).
 */
function isNativeToken(address: string): boolean {
  return address.toLowerCase() === '0x0000000000000000000000000000000000000000'
}

export { isNativeToken }
