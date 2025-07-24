/** @format */

import { ChatOpenAI } from '@langchain/openai'

import { loadEnv } from '../loadEnv.js'
import { ChatPromptTemplate } from '@langchain/core/prompts'
import { StringOutputParser } from '@langchain/core/output_parsers'

loadEnv()

const prompt = ChatPromptTemplate.fromTemplate('{topic}에 대해서 3문장으로 설명해줘.')
const model = new ChatOpenAI({
	model: 'gpt-4o',
	temperature: 0.1,
})

const parser = new StringOutputParser()

const chain = prompt.pipe(model).pipe(parser)

const result = await chain.batch([{ topic: '커피' }, { topic: '담배' }])

console.log(result)
