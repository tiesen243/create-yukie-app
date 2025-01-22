import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { api } from '@/lib/api'
import { toast } from './use-toast'

export const usePost = (id: string) => {
  const queryClient = useQueryClient()

  const { data: post, isLoading } = useQuery({
    queryKey: ['post', id],
    queryFn: () =>
      api.post
        .byId({ id })
        .get()
        .then((res) => (res.error ? Promise.reject(res.error.value) : res.data)),
  })

  const deletePost = useMutation({
    mutationKey: ['post', 'delete'],
    mutationFn: () =>
      api.post
        .remove({ id })
        .post()
        .then((res) => {
          if (res.error && typeof res.error.value === 'string')
            toast({
              description: res.error.value,
              variant: 'error',
            })
          return res.data
        }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['post', 'all'] }),
  })

  return {
    post,
    deletePost: deletePost.mutate,
    deleteErrors: deletePost.error,
    isLoading,
    isDeleting: deletePost.isPending,
  }
}
