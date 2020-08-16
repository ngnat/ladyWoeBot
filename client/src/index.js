import React from "react"
import { Provider } from 'react-redux'
import ReactDOM from "react-dom"
import './index.css'
import "antd/dist/antd.css"
import store from './store'
import App from "./App"
import { BrowserRouter } from "react-router-dom"
import * as serviceWorker from "./serviceWorker"

ReactDOM.render(
  <Provider
    store={store}
  >
     <BrowserRouter>
      <App />
     </BrowserRouter>
  </Provider>
  ,
  document.getElementById("root")
)

serviceWorker.unregister()