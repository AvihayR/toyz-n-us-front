import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
import toyDemoData from './toy.demo.data.js'

const STORAGE_KEY = 'toyDB'

const labels = ['On wheels', 'Box game', 'Art', 'Baby', 'Doll', 'Puzzle',
    'Outdoor', 'Battery Powered']

// const toy = {
//     _id: 't101',
//     name: 'Talking Doll',
//     price: 123,
//     labels: ['Doll', 'Battery Powered', 'Baby'],
//     createdAt: 1631031801011,
//     inStock: true,
// }

export const toyService = {
    query,
    getById,
    save,
    remove,
    getEmptyTodo: getEmptyToy,
}

_createToys()

function query(filterBy = { txt: '', }) {
    // return axios.get(BASE_URL).then(res => res.data)
    return storageService.query(STORAGE_KEY)
        .then((toys) => {
            if (filterBy.txt)
                return toys.filter(t => t.name.toLowerCase().includes(filterBy.txt.toLowerCase()))
            // toys = toys.filter(t => t.name.includes(filterBy.txt))
            // if (filterBy.status === 'done') return toys.filter(t => t.isDone)
            // else if (filterBy.status === 'active') return toys.filter(t => !t.isDone)

            else return toys
        })
}
function getById(toyId) {
    return storageService.get(STORAGE_KEY, toyId)
}
function remove(toyId) {
    // return Promise.reject('Not now!')
    return storageService.remove(STORAGE_KEY, toyId)
}

function save(toy) {
    if (toy._id) {
        return storageService.put(STORAGE_KEY, toy)
    } else {
        // when switching to backend - remove the next line
        // todo.owner = userService.getLoggedinUser()
        return storageService.post(STORAGE_KEY, toy)
    }
}

function getEmptyToy() {
    return {
        name: '',
        price: 100,
        labels: [],
        createdAt: Date.now(),
        inStock: true
    }
}


function _createToys() {
    let toys = utilService.loadFromStorage(STORAGE_KEY)
    if (!toys || !toys.length) {
        toys = toyDemoData
        utilService.saveToStorage(STORAGE_KEY, toys)
    }
}