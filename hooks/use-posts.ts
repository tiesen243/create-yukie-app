import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { toast } from '@/hooks/use-toast'
import { api } from '@/lib/api'

export const usePosts = () => {
  const queryClient = useQueryClient()

  const { data: posts = [], isLoading } = useQuery({
    queryKey: ['post', 'all'],
    queryFn: () =>
      api.post.all
        .get()
        .then((res) => (res.error ? Promise.reject(res.error.value) : res.data)),
  })

  interface Input { title: string; content: string }
  const createPost = useMutation<unknown, Partial<Input>, Input>({
    mutationKey: ['post', 'create'],
    mutationFn: async (data) =>
      api.post.create.post(data).then((res) => {
        if (res.error) {
          if (typeof res.error.value === 'string')
            toast({
              description: res.error.value,
              variant: 'error',
            })

          return Promise.reject(res.error.value)
        }
        return res.data
      }),
    onSuccess: () => void queryClient.invalidateQueries({ queryKey: ['post', 'all'] }),
  })

  return {
    posts,
    createPost: createPost.mutate,
    fieldErrors: createPost.error,
    isLoading,
    isCreating: createPost.isPending,
  }
}
