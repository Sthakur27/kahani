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

app.post('/api/create', async (req: Request, res: Response): Promise<void> => {
  console.log('AYYLMAO')
  console.log(req.body)
  /* const user: User = await User.create({
    email: req.body.email,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    rating: req.body.rating,
    password: req.body.password,
  }) */
  res.setHeader('Content-Type', 'application/json')
  //res.send(JSON.stringify(user))
  res.send(JSON.stringify({ data: 'round trip done!' }))
})

app.get('/api/greeting', (req: Request, res: Response): void => {
  const name: string = 'World'
  console.log('AYYLMAO')
  res.setHeader('Content-Type', 'application/json')
  res.send(JSON.stringify({ greeting: `Hello ${name}!` }))
})

// All other GET requests not handled before will return our React app
app.get('*', (req: Request, res: Response): void => {
  console.log('hey')
  res.sendFile(path.resolve(__dirname, '../build/frontend', 'index.html'))
})

export default app
