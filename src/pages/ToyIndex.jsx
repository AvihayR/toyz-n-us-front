import { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'
import { loadToys } from '../store/actions/toy.action.js'
import { ToyList } from '../cmps/ToyList.jsx';
import { ToyFilter } from '../cmps/ToyFilter.jsx';
import { AddBtn } from '../cmps/AddBtn.jsx';
import { AddToyDialog } from '../cmps/AddToyDialog.jsx';
import { addToy, removeToy, setFilterBy } from '../store/actions/toy.action.js';

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

    function onAddToy(toy) {
        addToy(toy)
            .then(showSuccessMsg(`Added new toy - ${toy.name}.`))
            .catch(err => showErrorMsg(err))
    }

    return (
        <>
            <AddToyDialog onAddToy={onAddToy} />
            <ToyFilter filterBy={filterBy} onSetFilterBy={setFilterBy} />
            <ToyList toys={toys} onRemoveToy={onRemoveToy} />
        </>
    )
}

