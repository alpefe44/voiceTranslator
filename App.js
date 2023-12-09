import React from 'react'
import HomeScreen from './src/screen/HomeScreen'
import { Provider } from 'react-redux'
import { store } from './src/redux/store'

const App = () => {
  return (
    <Provider store={store}>
      <HomeScreen></HomeScreen>
    </Provider>
  )
}

export default App