import { useState, useCallback } from 'react'

const useDisclosure = (initiallyOpened = false) => {
  const [opened, setOpened] = useState(initiallyOpened)

  const open = useCallback(() => setOpened(true), [])
  const close = useCallback(() => setOpened(false), [])
  const toggle = useCallback(() => setOpened((prev) => !prev), [])
  const onOpenChange = useCallback((opened: boolean) => setOpened(opened), [])

  return [opened, { open, close, toggle, onOpenChange }] as const
}

export { useDisclosure }
