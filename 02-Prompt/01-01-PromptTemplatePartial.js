/** @format */

import { loadEnv } from '../loadEnv.js'
import { ChatOpenAI } from '@langchain/openai'
import { ChatPromptTemplate, PromptTemplate } from '@langchain/core/prompts'
import { StringOutputParser } from '@langchain/core/output_parsers'
import { RunnableSequence } from '@langchain/core/runnables'

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
