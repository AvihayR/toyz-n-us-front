import { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'
import { loadToys } from '../store/actions/toy.action.js'
import { ToyList } from '../cmps/ToyList.jsx';

export function ToyIndex() {
    const toys = useSelector(storeState => storeState.toyModule.toys)
    useEffect(() => {
        loadToys()
            .catch(err => showErrorMsg(err))
    }, [])

    return (
        <>
            <h1>Toy index</h1>
            <ToyList toys={toys} />
        </>
    )
}

