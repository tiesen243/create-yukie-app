'use client'

import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

import { FormField } from '@/components/form-field'
import { Button } from '@/components/ui/button'
import { api } from '@/lib/api'

export const Form: React.FC = () => {
  const router = useRouter()
  const { mutate, error, isPending } = useMutation({
    mutationFn: async (fd: FormData) => {
      const { error } = await api.auth.register.post({
        name: String(fd.get('name')),
        email: String(fd.get('email')),
        password: String(fd.get('password')),
        confirmPassword: String(fd.get('confirmPassword')),
      })
      if (error) throw error.value

      router.push('/')
      toast.success('Registered successfully')
    },
    onError: (error) => !error.fieldErrors && toast.error(error.message),
  })

  return (
    <form action={mutate} className="mb-4 space-y-4">
      {fields.map((field) => (
        <FormField {...field} key={field.name} error={error?.fieldErrors?.[field.name]} />
      ))}

      <Button className="w-full" isLoading={isPending}>
        Login
      </Button>
    </form>
  )
}

const fields = [
  { name: 'name', label: 'Name', type: 'text' },
  { name: 'email', label: 'Email', type: 'email' },
  { name: 'password', label: 'Password', type: 'password' },
  { name: 'confirmPassword', label: 'Confirm Password', type: 'password' },
]
