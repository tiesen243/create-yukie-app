import { Slot } from '@radix-ui/react-slot'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface FormFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string
  asChild?: boolean
}
export const FormField: React.FC<FormFieldProps> = ({
  label,
  error,
  asChild = false,
  ...props
}) => {
  const Comp = asChild ? Slot : Input
  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <Comp {...props} />

      {error && <span className="text-sm text-destructive">{error}</span>}
    </div>
  )
}
