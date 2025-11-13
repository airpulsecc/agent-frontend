import { type QueryClient, useQueryClient } from '@tanstack/react-query'
import { createRouter, RouterProvider } from '@tanstack/react-router'

import { routeTree } from './routeTree.gen'

type RouterContext = {
  queryClient: QueryClient
}

const router = createRouter({
  routeTree,
  defaultPreload: 'intent',
  defaultPreloadDelay: 120,
  defaultPreloadStaleTime: 0,
  context: {
    queryClient: undefined as unknown as QueryClient,
  },
})

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

const Router = () => {
  const queryClient = useQueryClient()

  return <RouterProvider router={router} context={{ queryClient }} />
}

export { Router }
export { type RouterContext }
