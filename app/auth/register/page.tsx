'use client'

import type { NextPage } from 'next'
import useSWRMutation from 'swr/mutation'
import { useRouter } from 'next/navigation'

import { Button } from '@/components/ui/button'
import { FormField } from '@/components/ui/form-field'
import { api } from '@/lib/api'

interface Form {
  name: string
  email: string
  password: string
}
const Page: NextPage = () => {
  const router = useRouter()
  const { trigger, isMutating, error } = useSWRMutation<unknown, Error, string, Form>(
    'sign-up',
    (_, { arg }) =>
      api.user['sign-up']
        .post(arg)
        .then(({ data, error }) => (error ? Promise.reject(error.value) : data)),
  )

  const action = (fd: FormData) => {
    const data = Object.fromEntries(fd) as unknown as Form
    trigger(data).then(() => router.push('/auth/login'))
  }

  return (
    <form action={action} className="mx-auto max-w-screen-md space-y-4">
      <FormField label="Name" name="name" type="text" message={error?.fieldsError?.name} />
      <FormField label="Email" name="email" type="email" message={error?.fieldsError?.email} />
      <FormField
        label="Password"
        name="password"
        type="password"
        message={error?.fieldsError?.password}
      />
      <Button type="submit" className="w-full" isLoading={isMutating}>
        Register
      </Button>
    </form>
  )
}

export default Page
