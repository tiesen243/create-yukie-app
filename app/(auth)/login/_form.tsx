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
      const { error } = await api.auth.login.post({
        email: String(fd.get('email')),
        password: String(fd.get('password')),
      })
      if (error) throw error.value

      router.push('/')
      router.refresh()
      toast.success('Logged in successfully')
    },
    onError: (error) => !error.fieldErrors && toast.error(error.message),
  })

  return (
    <form action={mutate} className="mb-4 space-y-4">
      <FormField name="email" label="Email" type="email" error={error?.fieldErrors?.email} />
      <FormField
        name="password"
        label="Password"
        type="password"
        error={error?.fieldErrors?.password}
      />

      <Button className="w-full" isLoading={isPending}>
        Login
      </Button>
    </form>
  )
}
