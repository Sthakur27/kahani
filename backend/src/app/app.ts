import express from 'express'
import path from 'path'
import { User } from '../models/User'
import sequelize from '../db'

User.initialize()
User.sync().then(() => {
  console.log('Updating tables');
}).catch((error) => {
  console.error('Unable to update database: ', error);
});

const app = express()
const port = 3201

app.use(express.static(path.resolve(__dirname, '../build/frontend')))

app.get('/', (req, res) => {
  res.send('Hello World!')
})

// Handle GET requests to /api route
app.get('/api', (req, res) => {
  res.json({ message: 'Hello from server!' })
})

app.get('/api/greeting', (req, res) => {
  const name = 'World'
  res.setHeader('Content-Type', 'application/json')
  res.send(JSON.stringify({ greeting: `Hello ${name}!` }))
})

app.get('/api/create', async (req, res) => {
  await User.create({
    email: 'sibthakur@gmail.com',
    firstName: 'Sid',
    lastName: 'Thakur',
    rating: 10,
    password: 'password' // The password will be automatically hashed by the setPassword() method in the model
  })
  res.setHeader('Content-Type', 'application/json')
  res.send(JSON.stringify({ greeting: `Hello ${name}!` }))
})

app.get('/api/greeting', (req, res) => {
  const name = 'World'
  res.setHeader('Content-Type', 'application/json')
  res.send(JSON.stringify({ greeting: `Hello ${name}!` }))
})


// All other GET requests not handled before will return our React app
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../build/frontend', 'index.html'))
})

app.listen(port, () => {
  console.log('STARTING BACKEND KAHANI SERVER')
  return console.log(`Express is listening at http://localhost:${port}`)
})
