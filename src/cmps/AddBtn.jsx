// import ReactDOM from 'react-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'


export function AddBtn() {

    return (
        <button className='add-btn'>
            <FontAwesomeIcon icon={faPlus} />
        </button>
    )
}