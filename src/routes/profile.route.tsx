import { ProfileContainer } from '@/features/profile/container'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/profile')({
  component: ProfileContainer,
})
