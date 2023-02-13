import React, { MouseEvent } from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'

const rootElement = document.getElementById('root')

function handleButtonClick(event: MouseEvent<HTMLButtonElement>): void {
  fetch('http://localhost:3201/api/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    mode: 'no-cors',
    body: JSON.stringify({
      email: 'sibthakur@gmail.com',
      firstName: 'Sid',
      lastName: 'Thakur',
      rating: 10,
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
    <button onClick={handleButtonClick}>Create User</button>
  </React.StrictMode>,
  rootElement
)

reportWebVitals()
