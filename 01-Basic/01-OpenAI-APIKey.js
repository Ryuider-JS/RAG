/** @format */

import { ChatOpenAI } from '@langchain/openai'

import * as dotenv from 'dotenv'

dotenv.config()

const model = new ChatOpenAI({
	model: 'gpt-4.1-nano',
})

const response = await model.invoke('Hello, world!')

console.log(response)
