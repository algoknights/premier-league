import jsonServer from 'json-server'
import path from 'path'
import fs from 'fs'

const server = jsonServer.create()
const middlewares = jsonServer.defaults()

// Robust pathing for Vercel
const dbPath = path.join(process.cwd(), 'server', 'db.json')
const db = JSON.parse(fs.readFileSync(dbPath, 'utf-8'))
const router = jsonServer.router(db)

server.use(middlewares)
server.use(jsonServer.rewriter({
  '/api/*': '/$1'
}))
server.use(router)

export default server
