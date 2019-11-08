import { createStore } from 'redux'
import TodoReducer from './reducer'

const store = createStore(TodoReducer)

export default store;