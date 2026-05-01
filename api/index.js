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


server.get('/health', (req, res) => {
  res.status(200).send('OK')
})

server.use(jsonServer.rewriter({
  '/api/*': '/$1'
}))
server.use(router)

const port = process.env.PORT || 10000;
if (process.env.NODE_ENV !== 'production' || process.env.RENDER) {
  server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}

export default server
