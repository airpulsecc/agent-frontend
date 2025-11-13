import { createFileRoute } from '@tanstack/react-router'
import { ChatContainer } from '@/features/chat/container'

export const Route = createFileRoute('/chat')({
  component: ChatContainer,
})
