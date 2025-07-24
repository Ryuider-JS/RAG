/** @format */

import { ChatOpenAI } from '@langchain/openai'

import { loadEnv } from '../loadEnv.js'
import { ChatPromptTemplate } from '@langchain/core/prompts'
import { StringOutputParser } from '@langchain/core/output_parsers'
import { RunnableParallel, RunnableSequence } from '@langchain/core/runnables'

loadEnv()

const prompt1 = ChatPromptTemplate.fromTemplate('{place}의 특징을 설명해줘')
const prompt2 = ChatPromptTemplate.fromTemplate('{place}에서 인구가 가장 많은 동은 어디야?')

const model = new ChatOpenAI({
	model: 'gpt-4o',
	temperature: 0.1,
})

const parser = new StringOutputParser()

const chain1 = RunnableSequence.from([prompt1, model, parser])
const chain2 = RunnableSequence.from([prompt2, model, parser])

const combined = RunnableParallel.from({
	description: chain1,
	popular: chain2,
})

const result = await combined.invoke({ place: '강동구' })
console.log(result)
