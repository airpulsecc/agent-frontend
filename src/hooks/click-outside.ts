import { useEffect, type RefObject } from 'react'

export const useClickOutside = <T extends HTMLElement>(
  ref: RefObject<T | null>,
  handler: () => void,
  isActive = true,
) => {
  useEffect(() => {
    if (!isActive) return

    const handleClick = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        handler()
      }
    }

    document.addEventListener('mousedown', handleClick)

    return () => document.removeEventListener('mousedown', handleClick)
  }, [ref, handler, isActive])
}
