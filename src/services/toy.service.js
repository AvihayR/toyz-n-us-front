import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
import toyDemoData from './toy.demo.data.js'
import { httpService } from './http.service.js'
import { cond } from 'lodash'

const BASE_URL = 'toy/'
const STORAGE_KEY = 'toysDB'

const labels = ['On wheels', 'Box game', 'Art', 'Baby', 'Doll', 'Puzzle',
    'Outdoor', 'Battery Powered', 'Action figure', 'Board games']

export const toyService = {
    query,
    getById,
    save,
    remove,
    getEmptyToy,
    getLabels
}

// _createToys()

function query(filterBy = { txt: '', inStock: '' }) {
    return httpService.get(BASE_URL, filterBy)
    // return axios.get(BASE_URL).then(res => res.data)
    // return storageService.query(STORAGE_KEY)
    //     .then((toys) => {
    //         if (filterBy.txt)
    //             toys = toys.filter(t => t.name.toLowerCase().includes(filterBy.txt.toLowerCase()))
    //         if (filterBy.inStock === 'true') {
    //             return toys.filter(t => t.inStock)
    //         }
    //         else if (filterBy.inStock === 'false') {
    //             return toys.filter(t => !t.inStock)
    //         }
    //         else return toys

    //     })
}
function getById(toyId) {
    return httpService.get(BASE_URL + toyId)
}
function remove(toyId) {
    // return Promise.reject('Not now!')
    return httpService.delete(BASE_URL + toyId)
}

function save(toy) {
    if (toy._id) {
        return httpService.put(BASE_URL + toy._id, toy)
    } else {
        // when switching to backend - remove the next line
        return httpService.post(BASE_URL, toy)
        // todo.owner = userService.getLoggedinUser()
    }
}

function getEmptyToy() {
    return {
        name: '',
        price: 100,
        labels: ['Baby'],
        createdAt: Date.now(),
        inStock: true
    }
}

function getLabels() {
    return labels
}

function _createToys() {
    let toys = utilService.loadFromStorage(STORAGE_KEY)
    if (!toys || !toys.length) {
        toys = toyDemoData
        utilService.saveToStorage(STORAGE_KEY, toys)
    }
}