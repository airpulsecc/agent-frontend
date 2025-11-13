import { createContext, useContext, useMemo, type ReactNode } from 'react'
import { useAccount } from 'wagmi'
import { useGetOwnProfile } from '@/api'

type ProfileData = {
  address?: string
  isConnected: boolean
}

const ProfileContext = createContext<ProfileData | undefined>(undefined)

type ProfileProviderProps = {
  children: ReactNode
}

const ProfileProvider = ({ children }: ProfileProviderProps) => {
  const { address, isConnected } = useAccount()

  // Получаем профиль из нашего API
  const { data: profile } = useGetOwnProfile({
    query: {
      enabled: isConnected,
    },
  })

  const isTwitterLinked = useMemo(() => {
    return !!profile?.twitterId
  }, [profile?.twitterId])

  const twitterInfo = useMemo(() => {
    if (!profile?.twitterUsername) return undefined
    return {
      username: profile.twitterUsername,
      id: profile.twitterId ?? undefined,
    }
  }, [profile?.twitterUsername, profile?.twitterId])

  const value = useMemo<ProfileData>(
    () => ({
      address,
      isConnected,
      isTwitterLinked,
      twitterInfo,
    }),
    [address, isConnected, isTwitterLinked, twitterInfo],
  )

  return (
    <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>
  )
}

const useProfile = (): ProfileData => {
  const context = useContext(ProfileContext)

  if (!context) {
    throw new Error('useProfile must be used within ProfileProvider')
  }

  return context
}

export { ProfileProvider, useProfile }
export type { ProfileData }
