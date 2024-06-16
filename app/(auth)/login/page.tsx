import type { NextPage } from 'next'
import Link from 'next/link'

import { Form } from './_form'

const Page: NextPage = () => (
  <>
    <h3 className="mb-4 text-3xl font-bold">Login</h3>

    <Form />

    <p>
      Don&apos;t have an account?{' '}
      <Link href="/register" className="underline-offset-4 hover:underline">
        register
      </Link>{' '}
      now.
    </p>
  </>
)

export default Page
