import * as React from 'react'
import * as AvatarPrimitive from '@radix-ui/react-avatar'

import { cn } from '@/lib/utils'
import { cva, type VariantProps } from 'class-variance-authority'

function Avatar({
  className,
  size = 'default',
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Root> & {
  size?: VariantProps<typeof imageStyles>['size']
}) {
  return (
    <AvatarPrimitive.Root
      data-slot="avatar"
      className={cn(
        'relative flex shrink-0 overflow-hidden rounded-full',
        imageStyles({ size }),
        className,
      )}
      {...props}
    />
  )
}

const imageStyles = cva('aspect-square rounded-full', {
  variants: {
    size: {
      default: 'size-13.5',
      sm: 'size-10',
      md: 'size-12',
      lg: 'size-14',
      xl: 'size-16',
    },
  },
})

function AvatarImage({
  className,
  size = 'default',
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Image> & {
  size?: VariantProps<typeof imageStyles>['size']
}) {
  return (
    <AvatarPrimitive.Image
      data-slot="avatar-image"
      className={cn(imageStyles({ size }), className)}
      {...props}
    />
  )
}

function AvatarFallback({
  className,
  size = 'default',
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Fallback> & {
  size?: VariantProps<typeof imageStyles>['size']
}) {
  return (
    <AvatarPrimitive.Fallback
      data-slot="avatar-fallback"
      className={cn(
        'bg-muted flex items-center justify-center rounded-full',
        imageStyles({ size }),
        className,
      )}
      {...props}
    />
  )
}

const Component = Object.assign(Avatar, {
  Image: AvatarImage,
  Fallback: AvatarFallback,
})

export { Component as Avatar }
