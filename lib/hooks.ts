import { useCallback, useState } from 'react'
import { toast } from 'sonner'
import { ZodError } from 'zod'

export const useMutation = <TData = unknown>(fetcher: (arg: FormData) => Promise<TData>) => {
  const [state, setState] = useState<{
    fieldErrors: Record<string, string[] | undefined>
    isMutating: boolean
  }>({
    fieldErrors: {},
    isMutating: false,
  })

  const trigger = useCallback(
    (arg: FormData) => {
      const fetch = async (arg: FormData) => {
        setState((prev) => ({ ...prev, isMutating: true }))

        try {
          const data = await fetcher(arg)
          if (data) toast.success(String(data))
        } catch (e) {
          if (e instanceof ZodError)
            setState((prev) => ({ ...prev, fieldErrors: e.flatten().fieldErrors }))
          else if (e instanceof Error) toast.error(e.message)
        } finally {
          setState((prev) => ({ ...prev, isMutating: false }))
        }
      }

      fetch(arg)
    },
    [fetcher],
  )

  return {
    trigger,
    fieldErrors: state.fieldErrors,
    isMutating: state.isMutating,
  }
}
