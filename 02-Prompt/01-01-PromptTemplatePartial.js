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
//**
//  partial이 비동기로 처리되는 이유
// 변수가 아에 고정이 아닌 상황에 따라 변할 수 있기 때문
// 예를 들어서 특정 조건에 따라 DB에서 데이터를 호출해야한다고 가정해보면
// 이해하기가 쉽습니다.
// */
// const partialPrompt = await prompt.partial({ place: '강남' })
const partialPrompt = await prompt.partial({ date: getCurrentDate })

const model = new ChatOpenAI()

const parser = new StringOutputParser()

const chain = RunnableSequence.from([partialPrompt, model, parser])

const result = await chain.invoke({ adjective: 'funny' })
console.log(result)
