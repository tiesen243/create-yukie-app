import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'

type FormFieldProps<T extends HTMLInputElement | HTMLTextAreaElement> = (T extends HTMLInputElement
  ? React.InputHTMLAttributes<T>
  : React.TextareaHTMLAttributes<T>) & {
  label?: string
  multiline?: boolean
  message?: string
}

const FormField = <T extends HTMLInputElement | HTMLTextAreaElement = HTMLInputElement>({
  label,
  className,
  message,
  multiline = false,
  ...props
}: FormFieldProps<T>) => {
  const Comp = multiline ? Textarea : Input

  return (
    <div className={cn('space-y-1', className)}>
      {label && (
        <Label className={message ? 'text-destructive' : ''}>
          {label} {props.required && '(*)'}
        </Label>
      )}
      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
      <Comp {...(props as any)} className={message ? 'border-destructive' : ''} />
      <span className="text-sm text-destructive">{message ?? ''}</span>
    </div>
  )
}

export { FormField }
