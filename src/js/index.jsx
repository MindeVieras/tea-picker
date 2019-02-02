
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'

import { store } from 'Helpers'
import App from './App'

import 'bootstrap/dist/css/bootstrap.min.css'
import '../scss/main.scss'

/**
 * Tea member picker APP
 */
const TeaApp = () => (
  <Provider store={ store }>
    <App />
  </Provider>
)

render(<TeaApp />, document.getElementById('root'))
