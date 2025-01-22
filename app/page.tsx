import { api } from '@/lib/api.rsc'

const Page = async () => {
  const { data } = await api.post.get()
  return <div>{JSON.stringify(data)}</div>
}

export default Page
