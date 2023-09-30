import { storageService } from './async-storage.service.js'
import { httpService } from './http.service.js'

const BASE_URL = 'auth/'
const STORAGE_KEY = 'userDB'
const STORAGE_KEY_LOGGEDIN = 'loggedinUser'



export const userService = {
    login,
    logout,
    signup,
    getById,
    getLoggedinUser,
    // updateScore
}

window.us = userService

async function getById(userId) {
    try {
        return await httpService.get(BASE_URL + userId)
    } catch (err) {
        throw new Error('Could not get toy..')
    }
}

async function login({ username, password }) {
    try {
        const user = await httpService.post(BASE_URL + 'login', { username, password })
        if (user) return _setLoggedinUser(user)
    } catch (err) {
        throw new Error('Oops, please try again..')
    }
}

async function signup({ username, password, fullname }) {
    try {
        const user = await httpService.post(BASE_URL + 'signup', { username, password, fullname })
        return _setLoggedinUser(user)
    } catch (err) {
        throw err
    }
}

// function updateScore(diff) {
//     return userService.getById(getLoggedinUser()._id)
//         .then(user => {
//             if (user.score + diff < 0) return Promise.reject('No credit')
//             user.score += diff
//             return storageService.put(STORAGE_KEY, user)

//         })
//         .then(user => {
//             _setLoggedinUser(user)
//             return user.score
//         })
// }

async function logout() {
    sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN)
    try {
        await httpService.post(BASE_URL + 'logout')
    } catch (err) {
        throw err
    }

    // return Promise.resolve()
}

function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN))
}

function _setLoggedinUser(user) {
    const userToSave = { _id: user._id, fullname: user.fullname, isAdmin: user.isAdmin }
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN, JSON.stringify(userToSave))
    return userToSave
}

// Test Data
// userService.signup({username: 'muki', password: 'muki1', fullname: 'Muki Ja'})
// userService.login({username: 'muki', password: 'muki1'})



