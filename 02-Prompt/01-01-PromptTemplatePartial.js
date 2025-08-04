/** @format */

import { ChatPromptTemplate, PromptTemplate } from '@langchain/core/prompts'

import { ChatOpenAI } from '@langchain/openai'
import { RunnableSequence } from '@langchain/core/runnables'
import { StringOutputParser } from '@langchain/core/output_parsers'
import { loadEnv } from '../loadEnv.js'

loadEnv()

const getCurrentDate = () => {
	return new Date().toISOString()
}

const template = 'Tell me a {adjective} joke about the day {date} and why is joke?'

const prompt = ChatPromptTemplate.fromTemplate(template)

const partialPrompt = await prompt.partial({ date: getCurrentDate })

const model = new ChatOpenAI()

const parser = new StringOutputParser()

const chain = RunnableSequence.from([partialPrompt, model, parser])

const result = await chain.invoke({ adjective: 'funny' })
console.log(result)
