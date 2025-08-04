/** @format */

import { loadEnv } from '../loadEnv.js'
import { ChatOpenAI } from '@langchain/openai'
import { z } from 'zod'

loadEnv()

const model = new ChatOpenAI({
	model: 'gpt-4o-mini',
	temperature: 0,
})

const joke = z.object({
	setup: z.string().describe('The setup of the joke'),
	punchline: z.string().describe('The punchline to the joke'),
	rating: z.number().describe('How funny the joke is, from 1 to 10'),
})

const structuredLlm = model.withStructuredOutput(joke)

const result = await structuredLlm.invoke('Tell me a joke about cats')
console.log(result)

// const joke = z.object({
// 	setup: z.optional(z.string()).describe('The setup of the joke'),
// 	punchline: z.optional(z.string()).describe('The punchline to the joke'),
// 	rating: z.optional(z.number()).optional().describe('How funny the joke is, from 1 to 10'),
// })

// const model = new ChatOpenAI({
// 	model: 'gpt-4o',
// })

// const structuredLlm = model.withStructuredOutput(joke)

// await structuredLlm.invoke('Tell me a joke about cats')

// console.log(result)
