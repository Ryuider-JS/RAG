import { loadEnv } from '../loadEnv.js'
import { HumanMessage } from '@langchain/core/messages'

import { ChatOpenAI } from '@langchain/openai'

loadEnv()

const llm = new ChatOpenAI({
	temperature: 0.1,
	model: 'gpt-4o',
})

const message = new HumanMessage({
	content: [
		{ type: 'text', text: '표를 요약해줘' },
		{
			type: 'image_url',
			image_url: {
				url: 'https://t3.ftcdn.net/jpg/03/77/33/96/360_F_377339633_Rtv9I77sSmSNcev8bEcnVxTHrXB4nRJ5.jpg',
			},
		},
	],
})
const response = await llm.stream([message])

console.log(response)
