/**
 * Generated by orval v6.17.0 🍺
 * Do not edit manually.
 * FE-23 OpenAI API
 * OpenAPI spec version: 1.0.0
 */
import { rest } from 'msw'
import { faker } from '@faker-js/faker'

export const getGetChatCompletionsMock = () => ({
  choices: Array.from(
    { length: faker.datatype.number({ min: 1, max: 10 }) },
    (_, i) => i + 1,
  ).map(() => ({
    message: { role: faker.random.word(), content: faker.random.word() },
  })),
  model: faker.random.word(),
  usage: {
    promptTokens: faker.datatype.number({ min: undefined, max: undefined }),
    completionTokens: faker.datatype.number({ min: undefined, max: undefined }),
    totalTokens: faker.datatype.number({ min: undefined, max: undefined }),
  },
  id: faker.random.word(),
})

export const getChatMSW = () => [
  rest.post('*/chat/completions', (_req, res, ctx) => {
    return res(
      ctx.delay(1000),
      ctx.status(200, 'Mocked status'),
      ctx.json(getGetChatCompletionsMock()),
    )
  }),
]
