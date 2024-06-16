'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'

import { Button } from '@/components/ui/button'
import { api } from '@/lib/api'

export const DeletePost: React.FC<{ id: string }> = ({ id }) => {
  const queryClient = useQueryClient()
  const { mutate, isPending } = useMutation({
    mutationFn: async (_: FormData) => {
      await api.post.del.delete({ id })
      await queryClient.invalidateQueries({ queryKey: ['posts'] })
    },
  })
  return (
    <form action={mutate}>
      <Button variant="destructive" className="w-full" isLoading={isPending}>
        Delete
      </Button>
    </form>
  )
}
