import useSWR from 'swr'
import useSWRMutation from 'swr/mutation'

import { api } from '@/lib/api/client'

export const usePost = () => {
  const {
    data: posts,
    error: getError,
    isLoading,
    mutate,
  } = useSWR('posts', () =>
    api.post.all.get().then(({ error, data }) => (error ? Promise.reject(error.value) : data)),
  )

  const {
    trigger: create,
    isMutating,
    error: createError,
  } = useSWRMutation<unknown, Error, string, { content: string }>('posts', (_, { arg }) =>
    api.post.create.post(arg).then(({ data, error }) => {
      if (error) throw error.value
      mutate()
      return data
    }),
  )

  const { trigger: del } = useSWRMutation<unknown, Error, string, string>('posts', (_, { arg }) =>
    api.post
      .del({ id: arg })
      .delete()
      .then(() => mutate()),
  )

  return {
    posts,
    getError,
    isLoading,
    mutate,

    create,
    isMutating,
    createError,

    del,
  }
}
