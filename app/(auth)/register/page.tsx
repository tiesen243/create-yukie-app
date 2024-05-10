'use client'

import type { NextPage } from 'next'
import { useRouter } from 'next/navigation'
import { useTransition } from 'react'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { FormField } from '@/components/ui/form-field'
import { api } from '@/lib/api'

const Page: NextPage = () => {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const action = (fd: FormData) =>
    startTransition(async () => {
      const inp = Object.fromEntries(fd)
      const { error, data } = await api.user['sign-up'].post({
        name: String(inp.name),
        email: String(inp.email),
        password: String(inp.password),
      })
      if (error) toast.error(error.value.message)
      else {
        router.push('/login')
        toast.success(data.message)
      }
    })

  return (
    <form action={action}>
      <FormField name="name" label="Name" placeholder="Enter your name" />
      <FormField name="email" label="Email" placeholder="Enter your email" />
      <FormField
        name="password"
        label="Password"
        type="password"
        placeholder="Enter your password"
      />
      <Button className="w-full" isLoading={isPending}>
        Login
      </Button>
    </form>
  )
}

export default Page
