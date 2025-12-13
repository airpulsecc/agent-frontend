import { useAccount } from 'wagmi'
import { useGetOwnProfile } from '@/api'

const useProfile = () => {
  const { isConnected } = useAccount()
  return useGetOwnProfile({ query: { enabled: isConnected } })
}

export { useProfile }
