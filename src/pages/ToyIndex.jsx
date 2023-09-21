import { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'
import { loadToys } from '../store/actions/toy.action.js'
import { ToyList } from '../cmps/ToyList.jsx';

import { removeToy } from '../store/actions/toy.action.js';

export function ToyIndex() {

    useEffect(() => {
        loadToys()
            .catch(err => showErrorMsg(err))
    }, [])

    const toys = useSelector(storeState => storeState.toyModule.toys)

    function onRemoveToy(toyId) {
        removeToy(toyId)
            .then(showSuccessMsg(`Removed toy -${toyId}`))
            .catch(err => showErrorMsg(err))
    }

    return (
        <>
            <ToyList toys={toys} onRemoveToy={onRemoveToy} />
        </>
    )
}

