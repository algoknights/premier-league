import jsonServer from 'json-server'
import path from 'path'
import { fileURLToPath } from 'url'
import fs from 'fs'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Read the database file into memory
const dbPath = path.join(__dirname, '../server/db.json')
const db = JSON.parse(fs.readFileSync(dbPath, 'utf-8'))

const server = jsonServer.create()
const middlewares = jsonServer.defaults()

// Create the router using the in-memory object
const router = jsonServer.router(db)

server.use(middlewares)
server.use(jsonServer.rewriter({
  '/api/*': '/$1'
}))
server.use(router)

export default server
