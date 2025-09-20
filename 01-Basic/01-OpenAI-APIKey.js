import { ChatOpenAI } from '@langchain/openai'

import { loadEnv } from '../loadEnv.js'

loadEnv()

const model = new ChatOpenAI({
	model: 'gpt-4.1-nano',
})

const response = await model.invoke('Hello, world!')

console.log(response)
