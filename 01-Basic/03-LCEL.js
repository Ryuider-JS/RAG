/** @format */

import { ChatOpenAI } from '@langchain/openai'
import { ChatPromptTemplate } from '@langchain/core/prompts'

import { loadEnv } from '../loadEnv.js'
import { StringOutputParser } from '@langchain/core/output_parsers'
import { RunnableSequence } from '@langchain/core/runnables'

loadEnv()

const prompt = ChatPromptTemplate.fromTemplate('{topic}에 대해 쉽게 설명해주세요')

const model = new ChatOpenAI({
	temperature: 0.1,
	model: 'gpt-3.5-turbo',
})

const parser = new StringOutputParser()

// const chain = prompt.pipe(model).pipe(parser)
const chain = RunnableSequence.from([prompt, model, parser])

const resultInvoke = await chain.invoke({ topic: '커피' })
const resultStream = await chain.stream({ topic: '커피' })

for await (const chunk of resultStream) {
	console.log(`${chunk}|`)
}
