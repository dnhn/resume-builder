import { getChatCompletions } from 'api'

export const completeChat = (prompt: string) =>
  getChatCompletions({
    temperature: 1.4,
    messages: [
      {
        role: 'system',
        content:
          'You are a creative copywriter that provides job seekers with content for their résumés.',
      },
      {
        role: 'user',
        content: prompt,
      },
    ],
  })

export const completeQuote = () =>
  getChatCompletions({
    temperature: 1.6,
    messages: [
      {
        role: 'system',
        content: 'You motivate and inspire the others.',
      },
      {
        role: 'user',
        content: 'Provide me with a motivational or inspirational quote.',
      },
    ],
  })
