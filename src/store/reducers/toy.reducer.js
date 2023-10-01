import { toyService } from "../../services/toy.service"
import { userService } from "../../services/user.service.js"

export const ADD_TOY = 'ADD_TOY'
export const REMOVE_TOY = 'REMOVE_TOY'
export const TOGGLE_IS_DONE = 'TOGGLE_IS_DONE'
export const EDIT_TOY = 'EDIT_TOY'
export const SET_FILTER_BY = 'SET_FILTER_BY'
export const LOAD_TOYS_FROM_STORAGE = 'LOAD_TOYS_FROM_STORAGE'


const initialState = {
    toys: [],
    filterBy: {},
}

export function toyReducer(state = initialState, action = {}) {
    switch (action.type) {
        case ADD_TOY:
            return { ...state, toys: [...state.toys, action.toy] }
        case REMOVE_TOY:
            return { ...state, toys: state.toys.filter(t => t._id !== action._id) }
        case EDIT_TOY:
            return { ...state, toys: state.toys.map(toy => toy._id === action.toy._id ? action.toy : toy) }
        case SET_FILTER_BY:
            return { ...state, filterBy: { ...state.filterBy, ...action.filterBy } }
        case LOAD_TOYS_FROM_STORAGE:
            return { ...state, toys: action.toys }
        // return { ...state, toys: action.toys.filter(t => !t.owner || t.owner && loggedUser && t.owner._id === loggedUser._id) }
        default:
            return state
    }
}