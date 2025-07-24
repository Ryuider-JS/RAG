/** @format */

import { loadEnv } from '../loadEnv.js'
import { ChatOpenAI } from '@langchain/openai'
import { ChatPromptTemplate } from '@langchain/core/prompts'
import { StringOutputParser } from '@langchain/core/output_parsers'
import { RunnableSequence } from '@langchain/core/runnables'

loadEnv()

const template = 'Tell me a {adjective} joke about the day {date} and why is joke?'

const prompt = ChatPromptTemplate.fromMessages([
	['system', '당신은 친절한 AI 어시스턴트입니다. 당신의 이름은 {name} 입니다.'],
	['human', '반가워요!'],
	['ai', '안녕하세요! 무엇을 도와드릴까요?'],
	['human', '{userInput}'],
])

console.log(prompt)

const model = new ChatOpenAI()

const parser = new StringOutputParser()

const chain = RunnableSequence.from([prompt, model, parser])

const result = await chain.invoke({
	name: '지승',
	userInput: '너 이름이 뭐야?',
})
console.log(result)
