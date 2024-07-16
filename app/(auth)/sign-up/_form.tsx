'use client'

import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { z } from 'zod'

import { FormField } from '@/components/form-field'
import { Button } from '@/components/ui/button'
import { api } from '@/lib/api'

export const SignupForm: React.FC = () => {
  const router = useRouter()
  const { mutate, isPending, error } = useMutation({
    mutationFn: async (formData: FormData) => {
      const parsed = schema.safeParse(Object.fromEntries(formData))
      if (!parsed.success) throw parsed.error.flatten().fieldErrors
      const res = await api.auth.signup.post(parsed.data)
      if (res.error) throw res.error
    },
    onSuccess: () => router.push('/'),
  })

  return (
    <form action={mutate} className="space-y-4">
      {fields.map((field) => (
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        <FormField key={field.name} {...field} error={error?.[field.name]} disabled={isPending} />
      ))}

      <small>
        Already have an account?{' '}
        <button
          onClick={() => router.push('/sign-in')}
          className="underline-offset-4 hover:underline"
        >
          Sign in
        </button>
      </small>
      <Button className="w-full" isLoading={isPending}>
        Register
      </Button>
    </form>
  )
}

const schema = z
  .object({
    name: z.string().min(1, 'Name is required'),
    email: z.string().email(),
    password: z
      .string()
      .regex(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}$/,
        'Password must contain at least 8 characters, including uppercase, lowercase, number, and special character.',
      ),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Passwords do not match',
  })

const fields = [
  { label: 'Name', name: 'name', type: 'text', placeholder: 'John Doe' },
  { label: 'Email', name: 'email', type: 'email', placeholder: 'yuki@tiesen.id.vn' },
  { label: 'Password', name: 'password', type: 'password', placeholder: '********' },
  { label: 'Confirm Password', name: 'confirmPassword', type: 'password', placeholder: '********' },
]
