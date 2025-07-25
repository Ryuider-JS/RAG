/** @format */

import { loadEnv } from '../loadEnv.js'
import { ChatOpenAI } from '@langchain/openai'
import { ChatPromptTemplate, MessagesPlaceholder } from '@langchain/core/prompts'
import { StringOutputParser } from '@langchain/core/output_parsers'
import { RunnableSequence, RunnablePassthrough } from '@langchain/core/runnables'

loadEnv()

const prompt = ChatPromptTemplate.fromMessages([
	['system', '당신은 친절한 AI 어시스턴트입니다. 당신의 이름은 {name} 입니다.'],
	new MessagesPlaceholder('history'),
	['human', '{userInput}'],
])

const partialPrompt = await prompt.partial({
	name: '지승',
	userInput: '추천해줘',
})

const model = new ChatOpenAI()

const parser = new StringOutputParser()

const chain = RunnableSequence.from([partialPrompt, model, parser])

const result = await chain.invoke({
	history: [
		['human', '안녕 하루가 너무 피곤하네'],
		['ai', '오늘 날씨가 더워서 피곤할 수도 있어요, 피로회복에 도움이 되는 것들을 추천해줄까요?'],
	],
})
console.log(result)
