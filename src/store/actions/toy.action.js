import { toyService } from "../../services/toy.service.js"
import { userService } from "../../services/user.service.js"
import { SET_FILTER_BY, ADD_TOY, REMOVE_TOY, TOGGLE_IS_DONE, LOAD_TOYS_FROM_STORAGE } from '../reducers/toy.reducer.js'
import { store } from "../store.js"


export function loadToys(filterBy = {}) {
    return toyService.query(filterBy)
        .then((toys) => {
            store.dispatch({ type: LOAD_TOYS_FROM_STORAGE, toys })
        })
        .catch(err => {
            console.log('Error:', err)
            throw err
        })
}

export function addToy(toy) {
    return toyService.save(toy)
        .then((res) => { store.dispatch({ type: ADD_TOY, toy: res }) })
        .catch(err => {
            console.log('Error:', err)
            throw err
        })
}

export function removeToy(toyId) {
    return toyService.remove(toyId)
        .then(
            store.dispatch({ type: REMOVE_TOY, _id: toyId })
        )
        .catch(err => {
            console.log('Error:', err)
            throw err
        })
}

export function saveToy(toy) {
    return toyService.save(toy)
}

export function editToy(toy) {
    return store.dispatch({ type: TOGGLE_IS_DONE, toy })
}

// export function toggleIsDone(toy) {
//     toy.isDone = !toy.isDone
//     return toyService.save(toy)
//         .then(
//             store.dispatch({ type: TOGGLE_IS_DONE, toy })
//         )
//         .catch(err => {
//             console.log('Error:', err)
//             throw err
//         })
// }

export function setFilterBy(filterBy) {
    store.dispatch({ type: SET_FILTER_BY, filterBy })
}
