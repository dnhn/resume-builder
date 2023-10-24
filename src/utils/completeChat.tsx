import { getChatCompletions } from 'api'

export const completeChat = (prompt: string) =>
  getChatCompletions({
    user: 'nhnd',
    temperature: 1.2,
    messages: [
      {
        role: 'system',
        content:
          'You are a helpful and creative assistant that helps job seekers writing their résumés.',
      },
      {
        role: 'user',
        content: prompt,
      },
    ],
  })

export const completeQuote = () =>
  getChatCompletions({
    user: 'nhnd',
    temperature: 1.2,
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