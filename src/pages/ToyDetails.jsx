import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { toyService } from "../services/toy.service"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"
import { editToy } from "../store/actions/toy.action"
import _ from "lodash"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPencil } from "@fortawesome/free-solid-svg-icons"

export function ToyDetails() {
    const [toy, setToy] = useState(null)
    const { toyId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        loadToy()
    }, [toyId])

    async function loadToy() {
        try {
            const toy = await toyService.getById(toyId)
            setToy(toy)
        } catch (err) {
            console.log('Had issues in toy details', err)
            showErrorMsg('Cannot load toy')
            navigate('/toy')
        }
    }


    async function onBlurEdit({ target }) {
        const field = target.dataset.name
        const value = target.innerText
        const editedToy = { ...toy, [field]: value }

        const isEdited = !_.isEqual(editedToy, toy)

        if (isEdited) {
            try {
                await editToy(editedToy)
                setToy(editedToy)
                showSuccessMsg('Toy saved successfully')
            } catch (err) {
                console.log(err)
                target.innerText = toy[field]
                showErrorMsg('An error occured while saving Toy')
            }
        }
    }


    if (!toy) return <div>Loading...</div>
    const { name, price, inStock, createdAt, labels, _id, } = toy
    return (
        <form className="toy-details">
            <span className="editable">
                <h2 contentEditable
                    suppressContentEditableWarning={true}
                    onBlur={onBlurEdit}
                    data-name="name"
                    className="name">
                    {name}
                </h2>
                <FontAwesomeIcon icon={faPencil} />
            </span>
            <span className="editable">
                <h3 className="price">$ <span contentEditable
                    suppressContentEditableWarning={true}
                    onBlur={onBlurEdit}
                    data-name='price'>{price}
                </span>
                </h3>
                <FontAwesomeIcon icon={faPencil} />
            </span>

            <h3 className={inStock ? 'stock' : 'out-of-stock'}>{inStock ? 'In stock!' : 'Currently not in stock.'}</h3>
            <h4 className="created-at">Created at: {new Date(createdAt).toUTCString()}</h4>
            <h4 className="labels">Labels: {labels.join(', ')}</h4>
            <h5 className="toy-id">Toy id: {_id}</h5>
            <Link className="back" to="/toy">Back</Link>
        </form>
    )
}
