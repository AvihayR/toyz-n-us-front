import { useEffect } from 'react'
import { useSelector } from 'react-redux';

import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'
import { loadToys } from '../store/actions/toy.action.js'


export function ToyIndex() {
    useEffect(() => {
        loadToys()
            .catch(err => showErrorMsg(err))
    },)
    return (
        <>
            <h1>Toy index</h1>
        </>
    )
}

