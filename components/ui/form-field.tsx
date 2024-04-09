import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'

export type FieldProps = {
  label?: string
  multiline?: boolean
  inputClassName?: string
  message?: string
} & React.ComponentProps<typeof Input> &
  React.ComponentProps<typeof Textarea>

const FormField: React.FC<FieldProps> = ({
  label,
  multiline = false,
  className = '',
  inputClassName = '',
  message = '',
  ...props
}) => {
  const Comp = multiline ? Textarea : Input
  return (
    <div className={cn('space-y-2', className)}>
      {label && <Label htmlFor={props.name}>{label}</Label>}
      <Comp {...props} className={inputClassName} />
      {message && <p className="text-sm text-red-600">{message}</p>}
    </div>
  )
}

export { FormField }
