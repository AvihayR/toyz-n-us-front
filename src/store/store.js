import { combineReducers, legacy_createStore as createStore } from "redux"
// import { toyService } from "../services/toy.service"
// import { userService } from "../services/user.service.js"
import { toyReducer } from "./reducers/toy.reducer.js"
import { userReducer } from "./reducers/user.reducer.js"

// const { createStore, combineReducers } = Redux
// createStoreHook
const rootReducer = combineReducers({
    userModule: userReducer,
    toyModule: toyReducer
})

const middleware = (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__() : undefined
export const store = createStore(rootReducer, middleware)

store.subscribe(() => {
    console.log('Current state is:', store.getState())
})