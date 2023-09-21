import { useSelector } from 'react-redux'
import { useEffect } from 'react'

import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'


export function ToyIndex() {
    useEffect(() => {
        // loadTodos(filterBy)
        // .catch(err => console.log(err))
        console.log('hello')
    },)
    return (<h1>Toy index</h1>)
}

