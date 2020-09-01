import express from 'express'
import path from 'path'
import cors from 'cors'
import bodyParser from 'body-parser'
import sockjs from 'sockjs'
import { renderToStaticNodeStream } from 'react-dom/server'
import React from 'react'

import cookieParser from 'cookie-parser'
import shortid from 'shortid'
import config from './config'
import Html from '../client/html'

const { readFile, writeFile, readdir } = require('fs').promises

const Root = () => ''

try {
  // eslint-disable-next-line import/no-unresolved
  // ;(async () => {
  //   const items = await import('../dist/assets/js/root.bundle')
  //   console.log(JSON.stringify(items))

  //   Root = (props) => <items.Root {...props} />
  //   console.log(JSON.stringify(items.Root))
  // })()
  console.log(Root)
} catch (ex) {
  console.log(' run yarn build:prod to enable ssr')
}

let connections = []

const port = process.env.PORT || 8090
const server = express()

const middleware = [
  cors(),
  express.static(path.resolve(__dirname, '../dist/assets')),
  bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }),
  bodyParser.json({ limit: '50mb', extended: true }),
  cookieParser()
]

middleware.forEach((it) => server.use(it))

const filteredKeys = (array) => {
  return array.reduce((acc, rec) => {
    // eslint-disable-next-line no-underscore-dangle
    if (rec._isDeleted) {
      return acc
    }
    return [...acc, { taskId: rec.taskId, title: rec.title, status: rec.status }]
  }, [])
}
const write = async (categ, newTask) => {
  await writeFile(`${__dirname}/categories/${categ}.json`, JSON.stringify(newTask, 1, 2), {
    encoding: 'utf8'
  })
}

const read = (cat) => {
  return readFile(`${__dirname}/categories/${cat}.json`, { encoding: 'utf8' })
    .then((result) => {
      return JSON.parse(result)
    })
    .catch(() => {
      return []
    })
}

server.get('/api/v1/tasks/:category', async (req, res) => {
  const { category } = req.params
  const tasks = filteredKeys(await read(category))
  res.json(tasks)
})
server.post('/api/v1/tasks/:category', async (req, res) => {
  const { category } = req.params
  if (Object.keys(req.body).length === 0) {
      await write(category,[])
      res.json({status: 'Added'})
  }
  else {
    const tasks = await read(category)
    const newTask = {
      taskId: shortid.generate(),
      title: req.body.title,
      status: 'new',
      _isDeleted: false,
      _createdAt: +new Date(),
      _deletedAt: null
    }
    const addedTasks = [...tasks, newTask]
    await write(category, addedTasks)
    res.json({ status: 'added successfully', newTask })
  }
})
server.patch('/api/v1/tasks/:category/:id', async (req, res) => {
  const { category, id } = req.params
  const newStatus = req.body.status
  const statuses = ['new', 'in progress', 'done', 'blocked']
  if (statuses.includes(newStatus)) {
    const tasks = await read(category)
    const updatedStatus = tasks.map((el) => (el.taskId === id ? { ...el, status: newStatus } : el))
    await write(category, updatedStatus)
    res.json({ status: 'updated successfully' })
  } else {
    res.status(501)
    res.json({ status: 'error', message: 'incorrect status' })
  }
})
server.delete('/api/v1/tasks/:category/:id', async (req, res) => {
  const { category, id } = req.params
  const tasks = await read(category)
  const deleted = tasks.map((el) => (el.taskId === id ? { ...el, _isDeleted: true } : el))
  await write(category, deleted)
  res.json({ status: 'deleted' })
})
server.get('/api/v1/tasks/:category/:timespan', async (req, res) => {
  const { category, timespan } = req.params
  const tasks = await read(category)
  const time = {
    day: 1000 * 60 * 60 * 24,
    week: 1000 * 60 * 60 * 24 * 7,
    month: 1000 * 60 * 60 * 24 * 30
  }
  const filteredTasks = filteredKeys(
    // eslint-disable-next-line no-underscore-dangle
    tasks.filter((el) => +new Date() - el._createdAt < time[timespan])
  )
  res.json(filteredTasks)
})
server.get('/api/v1/categories', async (req, res) => {
  const categories = (await readdir(`${__dirname}/categories`)).map((el) =>
    el.split('.json').join('')
  )
  res.json(categories)
})

server.use('/api/', (req, res) => {
  res.status(404)
  res.end()
})

const [htmlStart, htmlEnd] = Html({
  body: 'separator',
  title: 'Boilerplate'
}).split('separator')

server.get('/', (req, res) => {
  const appStream = renderToStaticNodeStream(<Root location={req.url} context={{}} />)
  res.write(htmlStart)
  appStream.pipe(res, { end: false })
  appStream.on('end', () => {
    res.write(htmlEnd)
    res.end()
  })
})

server.get('/*', (req, res) => {
  const initialState = {
    location: req.url
  }

  return res.send(
    Html({
      body: '',
      initialState
    })
  )
})

const app = server.listen(port)

if (config.isSocketsEnabled) {
  const echo = sockjs.createServer()
  echo.on('connection', (conn) => {
    connections.push(conn)
    conn.on('data', async () => {})

    conn.on('close', () => {
      connections = connections.filter((c) => c.readyState !== 3)
    })
  })
  echo.installHandlers(app, { prefix: '/ws' })
}
console.log(`Serving at http://localhost:${port}`)
