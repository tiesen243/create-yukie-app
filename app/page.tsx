import { env } from '@/env'

export default () => {
  return (
    <div>
      Page
      {env.NODE_ENV}
    </div>
  )
}
