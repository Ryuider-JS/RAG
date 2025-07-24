/** @format */

import { RunnableParallel, RunnablePassthrough } from '@langchain/core/runnables'

const runnable = RunnableParallel.from({
	passed: new RunnablePassthrough(),
	extra: new RunnablePassthrough().assign({ mult: ({ num }) => 3 * num }),
	modified: ({ num }) => num + 1,
})

const result = await runnable.invoke({ num: 1 })
console.log(result)
