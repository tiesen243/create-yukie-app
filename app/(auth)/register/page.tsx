'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import type { NextPage } from 'next'
import { useRouter } from 'next/navigation'
import { useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Form, TextField } from '@/components/ui/form'
import { api } from '@/lib/api'

const schema = z
  .object({
    name: z.string().min(4, 'Name is too short'),
    email: z.string().email('Email is invalid'),
    password: z.string().min(8, 'Password is too short'),
    confirmPassword: z.string().min(8, 'Password is too short'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Passwords do not match',
  })

const Page: NextPage = () => {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const form = useForm<z.infer<typeof schema>>({ resolver: zodResolver(schema) })
  const handleSubmit = form.handleSubmit((formData: z.infer<typeof schema>) =>
    startTransition(async () => {
      const { data, error } = await api.user['sign-up'].post(formData)
      if (error) {
        toast.error(error.value.message)
        return
      }
      toast.success(data.message)
      router.push('/login')
    }),
  )

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit}>
        {fields.map((field) => (
          <TextField key={field.name} control={form.control} disabled={isPending} {...field} />
        ))}
        <Button className="w-full" isLoading={isPending}>
          Register
        </Button>
      </form>
    </Form>
  )
}

const fields = [
  { name: 'name', label: 'Name', placeholder: 'Enter your name', type: 'text' },
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
