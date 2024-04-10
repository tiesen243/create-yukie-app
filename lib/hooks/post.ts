import useSWR from 'swr'
import useSWRMutation from 'swr/mutation'

import { api } from '@/lib/api'

export const usePost = () => {
  const {
    data: posts,
    error: getError,
    isLoading,
    mutate,
  } = useSWR('posts', async () => {
    const { data, error } = await api.post.getAll.get()
    if (error) throw error.value
    return data
  })

  const {
    trigger: create,
    isMutating,
    error: createError,
  } = useSWRMutation<unknown, Error, string, FormData>('createPost', async (_, { arg }) => {
    const content = String(arg.get('content'))
    const { data, error } = await api.post.create.post({ content })
    if (error) throw error.value
    mutate()
    return data
  })

  const { trigger: del } = useSWRMutation<unknown, Error, string, { id: string }>(
    'deletePost',
    async (_, { arg: { id } }) => {
      const { data, error } = await api.post.del.delete({ id })
      if (error) throw error.value
      mutate()
      return data
    },
  )

  return {
    /* get posts */
    posts,
    getError,
    isLoading,

    /* create post */
    create,
    isMutating,
    createError,

    /* delete post */
    del,
  }
}
