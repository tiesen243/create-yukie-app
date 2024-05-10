'use client'

import type { NextPage } from 'next'
import { useRouter } from 'next/navigation'
import { useState, useTransition } from 'react'
import { toast } from 'sonner'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { FormField } from '@/components/ui/form-field'
import { api } from '@/lib/api'

const schema = z
  .object({
    name: z.string().min(4, 'Name must be at least 4 characters'),
    email: z.string().email('Email is invalid'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Passwords do not match',
  })

const Page: NextPage = () => {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({})
  const action = (fd: FormData) =>
    startTransition(async () => {
      const inp = schema.safeParse(Object.fromEntries(fd))
      if (!inp.success) {
        setFieldErrors(inp.error.flatten().fieldErrors)
        return
      }

      const { error, data } = await api.user['sign-up'].post(inp.data)
      if (error) toast.error(error.value.message)
      else {
        router.push('/login')
        toast.success(data.message)
      }
    })

  return (
    <form action={action}>
      {fields.map((field) => (
        <FormField
          key={field.name}
          {...field}
          disabled={isPending}
          message={fieldErrors[field.name]?.at(0)}
        />
      ))}
      <Button className="w-full" isLoading={isPending}>
        Login
      </Button>
    </form>
  )
}

const fields = [
  { name: 'name', label: 'Name', placeholder: 'Enter your name' },
  { name: 'email', label: 'Email', placeholder: 'Enter your email', type: 'email' },
  { name: 'password', label: 'Password', placeholder: 'Enter your password', type: 'password' },
  {
    name: 'confirmPassword',
    label: 'Confirm Password',
    placeholder: 'Confirm your password',
    type: 'password',
  },
]

export default Page
