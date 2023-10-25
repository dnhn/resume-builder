import { defineConfig } from 'orval'

export default defineConfig({
  app: {
    output: {
      mode: 'tags-split',
      workspace: './src/api',
      target: './app.ts',
      schemas: './model',
      client: 'swr',
      prettier: true,
      override: {
        mutator: {
          path: './mutator/requester.ts',
          name: 'requester',
        },
      },
    },
    input: {
      target: 'https://openrouter-api.dwarvesf.com/api/v1/openapi.json',
      validation: false,
    },
    hooks: {
      afterAllFilesWrite: 'eslint ./src/api --ext .ts,.tsx,.js --fix', // run lint fix after all files are written
    },
  },
})
