'use client'

import type { NextPage } from 'next'
import { useRouter } from 'next/navigation'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { FormField } from '@/components/ui/form-field'
import { api } from '@/lib/api'
import { useMutation } from '@/lib/hooks'

const registerSchema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(6),
})

const Page: NextPage = () => {
  const router = useRouter()
  const { trigger, isMutating, fieldErrors } = useMutation(async (arg) => {
    const body = registerSchema.parse(Object.fromEntries(arg))
    const { data, error } = await api.user['sign-in'].post(body)
    if (error) throw new Error(error.value.message)
    router.push('/')
    router.refresh()
    return data.message
  })

  return (
    <form action={trigger} className="mx-auto max-w-screen-md space-y-4">
      <FormField label="Name" name="name" message={fieldErrors?.name?.at(0)} />
      <FormField label="Email" name="email" type="email" message={fieldErrors?.email?.at(0)} />
      <FormField
        label="Password"
        name="password"
        type="password"
        message={fieldErrors?.password?.at(0)}
      />
      <Button type="submit" className="w-full" isLoading={isMutating}>
        Register
      </Button>
    </form>
  )
}

export default Page
