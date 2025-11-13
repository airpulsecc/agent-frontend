import { defineConfig } from 'orval'

export default defineConfig({
  api: {
    input: {
      target: '../../openapi.json',
    },
    output: {
      mode: 'split',
      target: './src/api/generated/api.ts',
      schemas: './src/api/generated/models',
      client: 'react-query',
      mock: false,
      prettier: false, // Biome will handle formatting
      override: {
        mutator: {
          path: './src/api/axios-instance.ts',
          name: 'customInstance',
        },
        query: {
          useQuery: true,
          useMutation: true,
          version: 5, // TanStack Query v5
          options: {
            staleTime: 10000,
            cacheTime: 10000,
          },
        },
      },
    },
  },
})
