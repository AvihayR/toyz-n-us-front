import { useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"
import { editToy, addNewMsg, loadReviews } from "../store/actions/toy.action"
import { MsgsList } from "../cmps/MsgsList"
import { AddMsg } from "../cmps/AddMsg"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPencil } from "@fortawesome/free-solid-svg-icons"
import _ from "lodash"
import { toyService } from "../services/toy.service"
import { reviewService } from "../services/review.service.js"
import { AddToyReview } from "../cmps/AddToyReview.jsx"
import { ReviewList } from "../cmps/ReviewList"


export function ToyDetails() {
    const loggedUser = useSelector(storeState => storeState.userModule.user)
    const isAdmin = !loggedUser ? false : loggedUser.isAdmin
    const [toy, setToy] = useState(null)
    const [reviews, setReviews] = useState(null)
    const { toyId } = useParams()
    const navigate = useNavigate()
    const defaultImgUrl = 'https://res.cloudinary.com/dgsfbxsed/image/upload/v1696193040/ljswqcggvljmgsxmnelj.png'

    useEffect(() => {
        loadToy()
        onloadReviews()
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

    async function onloadReviews() {
        try {
            const reviews = await loadReviews({ byToyId: toyId })
            setReviews(reviews)
        } catch (err) {
            console.log('Had issues in toy details', err)
            showErrorMsg('Cannot load reviews')
        }
    }

    async function onAddNewMsg(toyId, msg) {
        try {
            await addNewMsg(toyId, msg)
            showSuccessMsg(`Added new message!`)
            loadToy()
        } catch (err) {
            showErrorMsg('Could\'nt add message at this time..')
        }
    }

    async function onAddNewReview(review) {
        review.toyId = toyId
        try {
            await reviewService.add(review)
            showSuccessMsg(`Added new review!`)
            onloadReviews()
        } catch (err) {
            showErrorMsg('Could\'nt add review at this time..')
        }
    }

    async function onBlurEdit({ target }) {
        const field = target.dataset.name
        let value = target.innerText
        if (field === 'price') value = +value
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
    const { name, price, inStock, createdAt, labels, _id, imgUrl } = toy
    return (
        <>
            <form className="toy-details">
                {<img className="toy-img" src={imgUrl ? imgUrl : defaultImgUrl} alt="Toy image" />}
                <span className="editable">
                    <h2 contentEditable={isAdmin}
                        suppressContentEditableWarning={true}
                        onBlur={onBlurEdit}
                        data-name="name"
                        className="name">
                        {name}
                    </h2>
                    {isAdmin && <FontAwesomeIcon icon={faPencil} />}
                </span>
                <span className="editable">
                    <h3 className="price">$
                        <span contentEditable={isAdmin}
                            suppressContentEditableWarning={true}
                            onBlur={onBlurEdit}
                            data-name='price'>{price}
                        </span>
                    </h3>
                    {isAdmin && <FontAwesomeIcon icon={faPencil} />}
                </span>

                <h3 className={inStock ? 'stock' : 'out-of-stock'}>{inStock ? 'In stock!' : 'Currently not in stock.'}</h3>
                <h4 className="created-at">Created at: {new Date(createdAt).toUTCString()}</h4>
                <h4 className="labels">Labels: {labels.join(', ')}</h4>
                <h5 className="toy-id">Toy id: {_id}</h5>
                <Link className="back" to="/toy">Back</Link>
            </form>

            <section className="messages">
                {loggedUser && <AddMsg toyId={toyId} loggedUser={loggedUser} onAddNewMsg={onAddNewMsg} />}
                {toy.msgs && <MsgsList msgs={toy.msgs} />}
            </section>
            <section className="reviews">
                <AddToyReview onAddNewReview={onAddNewReview} />
                <ReviewList reviews={reviews} />
            </section>
        </>
    )
}
