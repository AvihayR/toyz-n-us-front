import { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'
import { loadToys } from '../store/actions/toy.action.js'
import { ToyList } from '../cmps/ToyList.jsx';
import { ToyFilter } from '../cmps/ToyFilter.jsx';
import { removeToy, setFilterBy } from '../store/actions/toy.action.js';

export function ToyIndex() {

    const toys = useSelector(storeState => storeState.toyModule.toys)
    const filterBy = useSelector(storeState => storeState.toyModule.filterBy)

    useEffect(() => {
        loadToys(filterBy)
            .catch(err => showErrorMsg(err))
    }, [filterBy])

    function onRemoveToy(toyId) {
        removeToy(toyId)
            .then(showSuccessMsg(`Removed toy -${toyId}`))
            .catch(err => showErrorMsg(err))
    }

    return (
        <>
            <ToyFilter filterBy={filterBy} onSetFilterBy={setFilterBy} />
            <ToyList toys={toys} onRemoveToy={onRemoveToy} />
        </>
    )
}

