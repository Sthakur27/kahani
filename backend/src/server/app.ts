import express, { Request, Response, Express } from 'express'
import path from 'path'
import { User } from '../models/User'
import cors from 'cors'
import bodyParser from 'body-parser'

const app: Express = express()

app.use(cors())

app.use(bodyParser.json())

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

type UserCreateArgs = {
  email: string
  firstName: string
  lastName: string
  password: string
}

app.post(
  '/api/create',
  async (req: Request<UserCreateArgs>, res: Response): Promise<void> => {
    console.log('Creating new user')
    const { email, firstName, lastName, password } = req.body
    console.log(
      `Building User with following args: ${JSON.stringify({
        email,
        firstName,
        lastName,
        password,
      })}`
    )
    const user: User = await User.create({
      id: 1,
      email,
      firstName,
      lastName,
      password,
      rating: 0,
      deactivated: false,
    })
    res.setHeader('Content-Type', 'application/json')
    res.send({ data: JSON.stringify(user) })
  }
)

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
