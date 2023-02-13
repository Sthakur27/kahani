import express, { Request, Response, Express } from 'express'
import path from 'path'
import { User } from '../models/User'

const app: Express = express()

app.use(express.static(path.resolve(__dirname, '../build/frontend')))

app.get('/', (req: Request, res: Response): void => {
  res.send('Hello World!')
})

// Handle GET requests to /api route
app.get('/api', (req: Request, res: Response): void => {
  res.json({ message: 'Hello from server!' })
})

app.get('/api/greeting', (req: Request, res: Response): void => {
  const name: string = 'World'
  res.setHeader('Content-Type', 'application/json')
  res.send(JSON.stringify({ greeting: `Hello ${name}!` }))
})

app.get('/api/create', async (req: Request, res: Response): Promise<void> => {
  const user: User = await User.create({
    email: 'sibthakur@gmail.com',
    firstName: 'Sid',
    lastName: 'Thakur',
    rating: 10,
    password: 'password', // The password will be automatically hashed by the setPassword() method in the model
  })
  res.setHeader('Content-Type', 'application/json')
  res.send(JSON.stringify(user))
})

app.get('/api/greeting', (req: Request, res: Response): void => {
  const name: string = 'World'
  res.setHeader('Content-Type', 'application/json')
  res.send(JSON.stringify({ greeting: `Hello ${name}!` }))
})

// All other GET requests not handled before will return our React app
app.get('*', (req: Request, res: Response): void => {
  console.log('hey')
  res.sendFile(path.resolve(__dirname, '../build/frontend', 'index.h3tml'))
})

export default app
