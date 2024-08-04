import { Slot } from '@radix-ui/react-slot'
import { forwardRef } from 'react'
import type { FieldError, FieldValues, Path, UseFormRegister } from 'react-hook-form'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'

type FormProps = React.FormHTMLAttributes<HTMLFormElement>

export const Form = forwardRef<HTMLFormElement, FormProps>(({ className = '', ...props }, ref) => (
  <form {...props} ref={ref} className={cn('flex flex-col gap-4', className)} />
))
Form.displayName = 'Form'

interface FormFieldProps<T extends FieldValues = FieldValues>
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'name'> {
  name: Path<T>
  register: UseFormRegister<T>
  label?: string
  error?: FieldError
  asChild?: boolean
}

export const FormField = <T extends FieldValues>({
  register,
  label,
  error,
  className = '',
  asChild = false,
  ...props
}: FormFieldProps<T>): React.ReactElement => {
  const Comp = asChild ? Slot : Input

  return (
    <fieldset className={cn('space-y-2', className)}>
      {label && <Label htmlFor={props.name}>{label}</Label>}
      <Comp {...props} {...register(props.name)} />
      {error && <small className="text-destructive">{error.message}</small>}
    </fieldset>
  )
}
