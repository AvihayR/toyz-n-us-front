import { faTrashCan } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

export function ToyPreview({ toy, onRemoveToy, isAdmin }) {
    const { name, price, inStock, _id } = toy
    const navigate = useNavigate()

    return (
        <div className={'toy-preview'} onClick={() => navigate(`/toy/${toy._id}`)}>
            <h2 className="toy-name">{name}</h2>
            <h3 className={`stock ${inStock ? '' : 'out-of-stock'}`}>{inStock ? 'In stock!' : 'Out of stock'}</h3>
            <h4 className="price">$ {price}</h4>
            {isAdmin && <button className="remove-btn"
                onClick={(ev) => {
                    ev.stopPropagation()
                    onRemoveToy(_id)
                }}>
                <FontAwesomeIcon icon={faTrashCan} />
            </button>}
        </div>
    )
}