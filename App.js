import React from 'react'
import { Provider } from 'react-redux'
import { store } from './src/redux/store'
import Navigation from './src/Router/Navigation'

const App = () => {
  return (
    <Provider store={store}>
      <Navigation></Navigation>
    </Provider>
  )
}

export default App