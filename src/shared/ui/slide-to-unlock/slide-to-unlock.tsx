import {
  animate,
  motion,
  type MotionValue,
  useMotionValue,
  useTransform,
} from 'motion/react'
import {
  type ComponentPropsWithoutRef,
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
} from 'react'

import { cn } from '@/lib/utils'
import { ArrowRightIcon } from 'lucide-react'

type SlideToUnlockContextValue = {
  x: MotionValue<number>
  trackRef: React.RefObject<HTMLDivElement | null>
  isDragging: boolean
  handleWidth: number
  textOpacity: MotionValue<number>
  maxX: number
  onDragStart: () => void
  onDragEnd: () => void
}

const SlideToUnlockContext = createContext<SlideToUnlockContextValue | null>(
  null,
)

function useSlideToUnlock() {
  const context = useContext(SlideToUnlockContext)
  if (!context) {
    throw new Error(
      `SlideToUnlock components must be used within SlideToUnlock`,
    )
  }
  return context
}

type SlideToUnlockRootProps = React.ComponentProps<'div'> & {
  handleWidth?: number
  onUnlock?: () => void
  disabled?: boolean
}

function SlideToUnlock({
  className,
  handleWidth = 56,
  children,
  onUnlock,
  disabled = false,
  ...props
}: SlideToUnlockRootProps) {
  const trackRef = useRef<HTMLDivElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [maxX, setMaxX] = useState(0)
  const x = useMotionValue(0)

  const fadeDistance = handleWidth
  const textOpacity = useTransform(x, [0, fadeDistance], [1, 0])

  const handleDragStart = useCallback(() => {
    setIsDragging(true)
    // Обновляем maxX при начале драга
    const trackWidth = trackRef.current?.offsetWidth || 0
    setMaxX(trackWidth - handleWidth)
  }, [handleWidth])

  const handleDragEnd = useCallback(() => {
    setIsDragging(false)

    // Небольшой порог в 3 пикселя для учёта округления
    const threshold = maxX - 3

    if (x.get() >= threshold) {
      onUnlock?.()
    } else {
      animate(x, 0, { type: 'spring', bounce: 0, duration: 0.25 })
    }
  }, [x, onUnlock, maxX])

  return (
    <SlideToUnlockContext.Provider
      value={{
        x,
        trackRef,
        isDragging,
        handleWidth,
        textOpacity,
        maxX,
        onDragStart: disabled ? () => {} : handleDragStart,
        onDragEnd: disabled ? () => {} : handleDragEnd,
      }}
    >
      <div
        data-slot="slide-to-unlock"
        data-disabled={disabled}
        className={cn(
          'w-[216px] rounded-xl bg-zinc-100 p-1 shadow-inner ring ring-black/5 ring-inset dark:bg-zinc-900 dark:ring-white/10',
          disabled && 'pointer-events-none opacity-50',
          className,
        )}
        {...props}
      >
        {children}
      </div>
    </SlideToUnlockContext.Provider>
  )
}

type SlideToUnlockTrackProps = React.ComponentProps<'div'>

function SlideToUnlockTrack({
  className,
  children,
  ...props
}: SlideToUnlockTrackProps) {
  const { trackRef } = useSlideToUnlock()

  return (
    <div
      ref={trackRef}
      data-slot="track"
      className={cn(
        'relative flex h-10 items-center justify-center',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}

type SlideToUnlockTextProps = Omit<
  ComponentPropsWithoutRef<typeof motion.div>,
  'children'
> & {
  children:
    | React.ReactNode
    | ((props: { isDragging: boolean }) => React.ReactNode)
}

function SlideToUnlockText({
  className,
  children,
  style,
  ...props
}: SlideToUnlockTextProps) {
  const { handleWidth, textOpacity, isDragging } = useSlideToUnlock()

  return (
    <motion.div
      data-slot="text"
      data-dragging={isDragging}
      className={cn('pl-1 text-lg ', className)}
      style={{ marginLeft: handleWidth, opacity: textOpacity, ...style }}
      {...props}
    >
      {typeof children === 'function' ? children({ isDragging }) : children}
    </motion.div>
  )
}

type SlideToUnlockHandleProps = ComponentPropsWithoutRef<typeof motion.div>

function SlideToUnlockHandle({
  className,
  children,
  style,
  ...props
}: SlideToUnlockHandleProps) {
  const {
    x,
    onDragStart,
    onDragEnd,
    handleWidth: width,
    maxX,
  } = useSlideToUnlock()

  return (
    <motion.div
      data-slot="handle"
      className={cn(
        'absolute top-0 left-0 flex h-10 cursor-grab items-center justify-center rounded-lg bg-white text-zinc-400 shadow-sm active:cursor-grabbing',
        "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-6",
        className,
      )}
      style={{ width, x, ...style }}
      drag="x"
      dragDirectionLock
      dragConstraints={{ left: 0, right: maxX }}
      dragElastic={0}
      dragMomentum={false}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      {...props}
    >
      {children ?? <ArrowRightIcon aria-hidden={true} aria-label="Confirm" />}
    </motion.div>
  )
}

const Component = Object.assign(SlideToUnlock, {
  Track: SlideToUnlockTrack,
  Text: SlideToUnlockText,
  Handle: SlideToUnlockHandle,
})

export { Component as SlideToUnlock }
