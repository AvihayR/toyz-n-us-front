// import ReactDOM from 'react-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'


export function AddBtn({ handleClickOpen }) {

    return (
        <button className='add-btn' onClick={handleClickOpen}>
            <FontAwesomeIcon icon={faPlus} />
        </button>
    )
}