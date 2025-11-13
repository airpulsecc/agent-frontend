import { Button, Dialog } from '@/shared/ui'
import { AuthForm } from './form'
import type { FC, ReactNode } from 'react'

const Trigger: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <Dialog.Trigger asChild>
      <Button variant="outline">{children}</Button>
    </Dialog.Trigger>
  )
}

type Props = {
  trigger: ReactNode
}

const AuthDialog: FC<Props> = ({ trigger }) => {
  return (
    <Dialog>
      {trigger}

      <Dialog.Content size="md">
        <Dialog.Header title="Join to whitelist and create profile" />
        <AuthForm variant="ghost" withHeader={false} contentClassName="px-0" />
      </Dialog.Content>
    </Dialog>
  )
}

const Component = Object.assign(AuthDialog, {
  Trigger: Trigger,
})

export { Component as AuthDialog }
