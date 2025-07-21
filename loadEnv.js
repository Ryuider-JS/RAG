/** @format */

// ESM에서는 이 방식으로 __dirname 대체
import * as dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export const loadEnv = () => {
	dotenv.config({
		path: path.resolve(__dirname, '.env'),
	})
}
