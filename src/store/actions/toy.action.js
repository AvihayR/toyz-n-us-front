import { toyService } from "../../services/toy.service.js"
import { userService } from "../../services/user.service.js"
import { SET_FILTER_BY, ADD_TOY, REMOVE_TOY, LOAD_TOYS_FROM_STORAGE, EDIT_TOY } from '../reducers/toy.reducer.js'
import { store } from "../store.js"


export async function loadToys(filterBy = toyService.query()) {
    try {
        const toys = await toyService.query(filterBy)
        store.dispatch({ type: LOAD_TOYS_FROM_STORAGE, toys })
    } catch (err) {
        console.log('Error:', err)
        throw err
    }
}

export async function addToy(toy) {
    try {
        const res = await toyService.save(toy)
        store.dispatch({ type: ADD_TOY, toy: res })

    } catch (err) {
        console.log('Error:', err)
        throw err
    }
}

export async function removeToy(toyId) {
    try {
        await toyService.remove(toyId)
        store.dispatch({ type: REMOVE_TOY, _id: toyId })
    } catch (err) {
        console.log('Error:', err)
        throw err
    } finally {
        console.log('Finally!')
    }
}

export async function saveToy(toy) {
    try {
        return await toyService.save(toy)
    } catch (err) {
        throw err
    }
}

export async function editToy(toy) {
    try {
        await saveToy(toy)
        return store.dispatch({ type: EDIT_TOY, toy })
    } catch (err) {
        throw err
    }
}

export function setFilterBy(filterBy) {
    store.dispatch({ type: SET_FILTER_BY, filterBy })
}
