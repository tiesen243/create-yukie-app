'use client'

import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { z } from 'zod'

import { FormField } from '@/components/form-field'
import { Button } from '@/components/ui/button'
import { api } from '@/lib/api'
import { useAuth } from '@/lib/auth'

export const SigninForm: React.FC = () => {
  const router = useRouter()
  const { mutate: refresh } = useAuth()

  const { mutate, isPending, error } = useMutation({
    mutationFn: async (formData: FormData) => {
      const parsed = schema.safeParse(Object.fromEntries(formData))
      if (!parsed.success) throw parsed.error.flatten().fieldErrors
      const res = await api.auth.signin.post(parsed.data)
      if (res.error) throw res.error
    },
    onSuccess: () => refresh().then(() => router.push('/')),
  })

  return (
    <form action={mutate} className="space-y-4">
      {fields.map((field) => (
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        <FormField key={field.name} {...field} error={error?.[field.name]} disabled={isPending} />
      ))}

      <small>
        Don&apos;t have an account?{' '}
        <button
          type="button"
          onClick={() => router.push('/sign-up')}
          className="underline-offset-4 hover:underline"
        >
          Sign up
        </button>
      </small>

      <Button className="w-full" isLoading={isPending}>
        Log in
      </Button>
    </form>
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
const fields = [
  { label: 'Email', name: 'email', type: 'email', placeholder: 'yuki@tiesen.id.vn' },
  { label: 'Password', name: 'password', type: 'password', placeholder: '********' },
]
