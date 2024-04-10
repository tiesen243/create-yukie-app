'use client'

import type { NextPage } from 'next'

import { Button } from '@/components/ui/button'
import { FormField } from '@/components/ui/form-field'
import useSWRMutation from 'swr/mutation'
import { api } from '@/lib/api'
import { useRouter } from 'next/navigation'

const Page: NextPage = () => {
  const router = useRouter()
  const { trigger, isMutating, error } = useSWRMutation<unknown, Error, string, FormData>(
    'login',
    async (_, { arg }) => {
      const body = Object.fromEntries(arg.entries()) as { email: string; password: string }
      const { data, error } = await api.user['sign-in'].post(body)
      if (error) throw error.value
      return data
    },
  )

  return (
    <form
      action={(fd: FormData) => {
        trigger(fd).then(() => {
          router.push('/')
          router.refresh()
        })
      }}
      className="mx-auto max-w-screen-md space-y-4"
    >
      <FormField label="Email" name="email" type="email" message={error?.fieldErrors?.email} />
      <FormField
        label="Password"
        name="password"
        type="password"
        message={error?.fieldErrors?.password}
      />
      <Button type="submit" className="w-full" isLoading={isMutating}>
        Login
      </Button>
    </form>
  )
}

export default Page
