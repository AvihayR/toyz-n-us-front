import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { useSelector } from "react-redux"
import { toyService } from "../services/toy.service"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"
import { EDIT_TOY } from "../store/reducers/toy.reducer"
import { editToy } from "../store/actions/toy.action"
import _ from "lodash"

export function ToyDetails() {
    const [toy, setToy] = useState(null)
    const { toyId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        loadToy()
    }, [toyId])

    function loadToy() {
        toyService.getById(toyId)
            .then((toy) => setToy(toy))
            .catch((err) => {
                console.log('Had issues in toy details', err)
                showErrorMsg('Cannot load toy')
                navigate('/toy')
            })
    }


    function onBlurEdit({ target }) {
        const field = target.dataset.name
        const value = target.innerText
        const editedToy = { ...toy, [field]: value }

        const isEdited = !_.isEqual(editedToy, toy)

        if (isEdited) {
            // saveTeam(editedToy)
            editToy(editedToy)
                .then(_ => {
                    // setTeam(editedToy)
                    showSuccessMsg('Toy saved successfully')
                })
                .catch(err => {
                    console.log(err)
                    target.innerText = toy[field]
                    showErrorMsg('An error occured while saving Toy')
                })
        }
    }


    if (!toy) return <div>Loading...</div>
    const { name, price, inStock, createdAt, labels, _id, } = toy
    return (
        <form className="toy-details">
            <h2 contentEditable
                suppressContentEditableWarning={true}
                onBlur={onBlurEdit}
                data-name="name"
                className="name">
                {name}
            </h2>

            <h3>$ <span contentEditable
                suppressContentEditableWarning={true}
                onBlur={onBlurEdit}
                data-name='price'
                className="price">{price}
            </span>
            </h3>

            <h3>{inStock ? 'In stock!' : 'Currently not in stock.'}</h3>
            <h4>Created at: {new Date(createdAt).toUTCString()}</h4>
            <h4>Labels: {labels.join(', ')}</h4>
            <h5>Toy id: {_id}</h5>
            <Link to="/toy">Back</Link>
        </form>
    )
}

