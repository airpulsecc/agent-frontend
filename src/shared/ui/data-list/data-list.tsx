import type { ComponentPropsWithoutRef, ElementRef, FC, ReactNode } from 'react'
import { forwardRef } from 'react'

import { Text } from '../text'
import { cn } from '@/lib/utils'

const DataListRoot = forwardRef<
  ElementRef<'dl'>,
  ComponentPropsWithoutRef<'dl'>
>(({ className, ...props }, ref) => {
  return (
    <dl
      className={cn('flex flex-col gap-3 py-1.5', className)}
      {...props}
      ref={ref}
    />
  )
})

DataListRoot.displayName = 'DataListRoot'

const Item: FC<{ label?: ReactNode; value?: ReactNode }> = ({
  label,
  value,
}) => {
  return (
    <div className="flex items-center justify-between gap-1">
      {label}
      <div
        aria-hidden="true"
        className="flex-1 self-end border-t border-dashed border-secondary"
      />
      {value}
    </div>
  )
}

const Label: FC<
  ComponentPropsWithoutRef<typeof Text> & { tooltip?: ReactNode }
> = ({ children, tooltip, ...props }) => {
  return (
    <Text as="dt" variant="xs" color="secondary" {...props}>
      {tooltip ? (
        <div className="flex items-center gap-1">
          {children}
          {tooltip}
        </div>
      ) : (
        children
      )}
    </Text>
  )
}

const Value: FC<ComponentPropsWithoutRef<typeof Text>> = ({
  color = 'main',
  ...props
}) => {
  return <Text as="dd" variant="xs" color={color} align="end" {...props} />
}

const Component = Object.assign(DataListRoot, { Item, Label, Value })

export { Component as DataList }
