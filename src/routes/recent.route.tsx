import { RecentContainer } from '@/features/recent/container'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/recent')({
  component: RecentContainer,
})
