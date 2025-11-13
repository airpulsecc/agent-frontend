import {
  type ComponentPropsWithoutRef,
  type ComponentRef,
  forwardRef,
} from 'react'

const UnstyledButton = forwardRef<
  ComponentRef<'button'>,
  ComponentPropsWithoutRef<'button'>
>(({ className, type, ...props }, ref) => {
  return <button type={type} className={className} {...props} ref={ref} />
})

UnstyledButton.displayName = 'UnstyledButton'

export { UnstyledButton }
