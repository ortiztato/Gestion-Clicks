// import "reflect-metadata"
// import path from 'path'
import next from 'next'
import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
// import { createConnection } from "typeorm"

dotenv.config()

const port = process.env.PORT || 3000
const env = process.env.NODE_ENV || `development`
// const isDev = env === `development`
const app = next({ dev: env !== `production` })
const host = process.env.HOST || `http://localhost`

const handle = app.getRequestHandler()

app.prepare().then(() => {
	const server = express()

	server.use(cors({
		origin: true,
		credentials: true
	}))

	server.all(`*`, (req, res) => {
		return handle(req, res)
	})

	server.listen(port, () => {
		console.log(`> Ready on ${host}:${port}\nConnecction db...`)
	})
})
