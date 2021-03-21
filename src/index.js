import React from 'react'
import ReactDOM from 'react-dom'
import './Styling/index.css'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { ContextProvider, initSockets } from './AppContext'
import { ToastContainer } from 'react-toastify'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.render(
    <React.StrictMode>
        <ContextProvider init={initSockets}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
            <ToastContainer />
        </ContextProvider>
    </React.StrictMode>,
    document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
