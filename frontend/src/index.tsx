import React, { MouseEvent } from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'

const rootElement = document.getElementById('root')

function handleGetButtonClick(event: MouseEvent<HTMLButtonElement>): void {
  fetch('http://localhost:3201/api/greeting')
    .then((response) => response.json())
    .then((data) => console.log(data.greeting))
    .catch((error) => console.error('Error fetching greeting:', error))
}

function handlePostButtonClick(event: MouseEvent<HTMLButtonElement>): void {
  fetch('http://localhost:3201/api/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: 'sidbthakur@gmail.com',
      firstName: 'Sid',
      lastName: 'Thakur',
      password: 'password',
    }),
  })
    .then((response: Response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      return response.json()
    })
    .then((data: any) => {
      console.log(data)
    })
    .catch((error: Error) => {
      console.error('There was a problem with the fetch operation:', error)
    })
}

ReactDOM.render(
  <React.StrictMode>
    <App />
    <button onClick={handleGetButtonClick}>Get Stuff</button>
    <button onClick={handlePostButtonClick}>Create User</button>
  </React.StrictMode>,
  rootElement
)

reportWebVitals()
