/* redux最核心的管理对象store */

// import {applyMiddleware} from 'redux'
// import {createStore} from './自写redux/index'
import {createStore} from 'redux'
// import thunk from 'redux-thunk'
import reducers from './reducers'
// import {composeWithDevTools} from 'redux-devtools-extension'
//向外默认暴露store
const store = createStore(
    reducers,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
export default store