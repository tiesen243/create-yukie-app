import type { NextPage } from 'next'
import Link from 'next/link'

import { Form } from './_form'

const Page: NextPage = () => (
  <>
    <h3 className="mb-4 text-3xl font-bold">Register</h3>

    <Form />

    <p>
      Already have an account?{' '}
      <Link href="/login" className="underline-offset-4 hover:underline">
        login
      </Link>{' '}
      now.
    </p>
  </>
)

export default Page
