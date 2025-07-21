/** @format */

import { ChatOpenAI } from '@langchain/openai'

import { loadEnv } from '../loadEnv.js'

loadEnv()

const llm = new ChatOpenAI({
	temperature: 0.1,
	model: 'gpt-3.5-turbo',
})

// const response = await llm.invoke('대한민국의 수도는 어디인가요?')

// console.log('답변:', response)

const result = await llm.stream('대한민국의 아름다운 관광지 10곳과 주소를 알려주세요!')
const chunks = []
for await (const chunk of result) {
	chunks.push(chunk.content)
	console.log(`${chunk.content}|`)
}

console.log(chunks.join(''))
