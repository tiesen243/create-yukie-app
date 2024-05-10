import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'

import { cn } from '@/lib/utils'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'

export interface FormFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  message?: string
  asChild?: boolean
}

const FormField = React.forwardRef<HTMLInputElement, FormFieldProps>(
  ({ label, message, className, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : Input

    return (
      <div className={cn('space-y-1', className)}>
        {label && <Label>{label}</Label>}
        <Comp ref={ref} className="w-full" {...props} />
        {message && <p className="text-sm text-destructive">{message}</p>}
      </div>
    )
  },
)
FormField.displayName = 'FormField'

export { FormField }
