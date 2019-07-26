import { createStore } from 'redux'
import productReducer from './reducers/productReducer'

const reduxDevTool = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

const store = createStore(productReducer, reduxDevTool)

export default store