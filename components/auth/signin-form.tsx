'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Form, FormField } from '@/components/ui/form'
import { api } from '@/lib/api'

export const SigninForm: React.FC = () => {
  const router = useRouter()
  const form = useForm<FormValues>({ resolver })

  const handleSubmit = form.handleSubmit(async (data) => {
    const res = await api.auth.signin.post(data)
    if (res.error) return toast.error('Failed to sign in', { description: res.error.value })

    toast.success('Signed in!')
    router.push('/')
    router.refresh()
  })

  return (
    <Form onSubmit={handleSubmit}>
      {fields.map((field) => (
        <FormField
          {...field}
          key={field.name}
          register={form.register}
          error={form.formState.errors[field.name]}
        />
      ))}

      <Button isLoading={form.formState.isSubmitting}>Sign in</Button>
    </Form>
  )
}

const schema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .regex(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}$/,
      'Password must contain at least 8 characters, including uppercase, lowercase, number, and special character.',
    ),
})

type FormValues = z.infer<typeof schema>

const resolver = zodResolver(schema)

const fields = [
  { name: 'email' as const, label: 'Email', type: 'email', placeholder: 'yuki@tiesen.id.vn' },
  { name: 'password' as const, label: 'Password', type: 'password', placeholder: '********' },
]
