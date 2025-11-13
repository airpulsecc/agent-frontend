import * as React from 'react'

import { cn } from '@/lib/utils'
import { Label } from '../label/label'
import { useId } from 'react'

function Input({
  className,
  type,
  name,
  label,
  required,
  ...props
}: React.ComponentProps<'input'> & { label?: string }) {
  const id = useId()

  return (
    <div className="space-y-2">
      {label && (
        <Label htmlFor={id} aria-required={required} required={required}>
          {label}
        </Label>
      )}
      <input
        id={id}
        name={name}
        type={type}
        data-slot="input"
        required={required}
        className={cn(
          'file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file: disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
          'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
          'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
          className,
        )}
        {...props}
      />
    </div>
  )
}

export { Input }
