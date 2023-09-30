import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'
import { loadToys } from '../store/actions/toy.action.js'
import { ToyList } from '../cmps/ToyList.jsx';
import { ToyFilter } from '../cmps/ToyFilter.jsx';
import { AddToyDialog } from '../cmps/AddToyDialog.jsx';
import { PaginationBar } from '../cmps/PaginationBar.jsx';
import { addToy, removeToy, addNewMsg, setFilterBy } from '../store/actions/toy.action.js';

export function ToyIndex() {
    const loggedUser = useSelector(storeState => storeState.userModule.user)
    const isAdmin = !loggedUser ? false : loggedUser.isAdmin
    const toys = useSelector(storeState => storeState.toyModule.toys)
    const filterBy = useSelector(storeState => storeState.toyModule.filterBy)

    const [currPage, setCurrPage] = useState(1)
    const [toysPerPage, setToysPerPage] = useState(4)

    useEffect(() => {
        loadToys(filterBy)
            .catch(err => showErrorMsg(err))
    }, [filterBy])

    async function onRemoveToy(toyId) {
        try {
            await removeToy(toyId)
            showSuccessMsg(`Removed toy -${toyId}`)
        } catch (err) {
            showErrorMsg('Could\'t remove toy..')
        }
    }

    async function onAddToy(toy) {
        try {
            await addToy(toy)
            showSuccessMsg(`Added new toy - ${toy.name}.`)
        } catch (err) {
            showErrorMsg('Could\'nt add toy.. ')
        }
    }

    //Get current toys / Pagination:
    const LastToyIdx = currPage * toysPerPage
    const firstToyIdx = LastToyIdx - toysPerPage
    const currToys = toys.slice(firstToyIdx, LastToyIdx)

    return (
        <>
            {loggedUser && isAdmin && <AddToyDialog onAddToy={onAddToy} />}
            <ToyFilter filterBy={filterBy} onSetFilterBy={setFilterBy} />
            <ToyList toys={currToys} onRemoveToy={onRemoveToy} isAdmin={isAdmin} />
            <PaginationBar toysPerPage={toysPerPage} toysLength={toys.length} onSetPage={setCurrPage} currPage={currPage} />
        </>
    )
}

